import { randomUUID } from "node:crypto";
import * as db from "../db";
import { AppError } from "../types/AppError";
import { ProductRecord } from "../types/models";
import { CreateProductInput, ListProductsQuery, UpdateProductInput } from "../types/products.schema";

function serialize(row: ProductRecord) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    condition: row.condition,
    price: row.price,
    isDonation: !!row.is_donation,
    image: row.image,
    contact: row.contact,
    ownerId: row.owner_id,
    createdAt: row.created_at,
  };
}

export function createProduct(data: CreateProductInput) {
  const id = randomUUID();
  const price = data.isDonation ? null : data.price ?? null;

  db.run(
    `INSERT INTO products (id, title, description, category, "condition", price, is_donation, image, contact, owner_id)
     VALUES (:id, :title, :description, :category, :condition, :price, :is_donation, :image, :contact, :owner_id)`,
    {
      ":id": id,
      ":title": data.title,
      ":description": data.description,
      ":category": data.category,
      ":condition": data.condition ?? null,
      ":price": price,
      ":is_donation": data.isDonation ? 1 : 0,
      ":image": data.image ?? null,
      ":contact": data.contact ?? null,
      ":owner_id": data.ownerId,
    }
  );

  const created = db.get<ProductRecord>("SELECT * FROM products WHERE id = :id", {
    ":id": id,
  })!;

  return serialize(created);
}

export function listProducts(query: ListProductsQuery) {
  const { category, search, page, limit } = query;

  const conditions: string[] = [];
  const params: Record<string, unknown> = {};

  if (category) {
    conditions.push("category = :category");
    params[":category"] = category;
  }

  if (search) {
    conditions.push("(title LIKE :search OR description LIKE :search)");
    params[":search"] = `%${search}%`;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const items = db.all<ProductRecord>(
    `SELECT * FROM products
     ${whereClause}
     ORDER BY created_at DESC
     LIMIT :limit OFFSET :offset`,
    { ...params, ":limit": limit, ":offset": (page - 1) * limit }
  );

  const totalRow = db.get<{ total: number }>(
    `SELECT COUNT(*) as total FROM products ${whereClause}`,
    params
  );
  const total = totalRow?.total ?? 0;

  return {
    items: items.map(serialize),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export function getProductById(id: string) {
  const product = db.get<ProductRecord>("SELECT * FROM products WHERE id = :id", {
    ":id": id,
  });

  if (!product) {
    throw new AppError("Anúncio não encontrado.", 404);
  }

  return serialize(product);
}

export function listMyProducts(ownerId: string) {
  const items = db.all<ProductRecord>(
    "SELECT * FROM products WHERE owner_id = :owner_id ORDER BY created_at DESC",
    { ":owner_id": ownerId }
  );

  return items.map(serialize);
}

export function updateProduct(id: string, data: UpdateProductInput) {
  const product = db.get<ProductRecord>("SELECT * FROM products WHERE id = :id", {
    ":id": id,
  });

  if (!product) {
    throw new AppError("Anúncio não encontrado.", 404);
  }

  if (product.owner_id !== data.ownerId) {
    throw new AppError("Você não tem permissão para editar este anúncio.", 403);
  }

  const price = data.isDonation ? null : data.price ?? null;

  db.run(
    `UPDATE products
     SET title = :title,
         description = :description,
         category = :category,
         "condition" = :condition,
         price = :price,
         is_donation = :is_donation,
         image = :image,
         contact = :contact
     WHERE id = :id`,
    {
      ":id": id,
      ":title": data.title,
      ":description": data.description,
      ":category": data.category,
      ":condition": data.condition ?? null,
      ":price": price,
      ":is_donation": data.isDonation ? 1 : 0,
      ":image": data.image ?? null,
      ":contact": data.contact ?? null,
    }
  );

  const updated = db.get<ProductRecord>("SELECT * FROM products WHERE id = :id", {
    ":id": id,
  })!;

  return serialize(updated);
}

export function deleteProduct(id: string, ownerId: string) {
  const product = db.get<ProductRecord>("SELECT * FROM products WHERE id = :id", {
    ":id": id,
  });

  if (!product) {
    throw new AppError("Anúncio não encontrado.", 404);
  }

  if (product.owner_id !== ownerId) {
    throw new AppError("Você não tem permissão para excluir este anúncio.", 403);
  }

  db.run("DELETE FROM products WHERE id = :id", { ":id": id });
}