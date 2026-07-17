import { Request, Response } from "express";
import * as productsService from "../services/products.service";
import { AppError } from "../types/AppError";
import {
  createProductSchema,
  deleteProductSchema,
  listProductsQuerySchema,
} from "../types/products.schema";

export async function create(req: Request, res: Response) {
  const data = createProductSchema.parse(req.body);
  const product = productsService.createProduct(data);
  return res.status(201).json(product);
}

export async function list(req: Request, res: Response) {
  const query = listProductsQuerySchema.parse(req.query);
  const result = productsService.listProducts(query);
  return res.status(200).json(result);
}

export async function getById(req: Request, res: Response) {
  const product = productsService.getProductById(req.params.id);
  return res.status(200).json(product);
}

export async function listMine(req: Request, res: Response) {
  const ownerId = req.query.ownerId;
  if (typeof ownerId !== "string" || ownerId.length < 8) {
    throw new AppError("Parâmetro ownerId é obrigatório.", 400);
  }
  const products = productsService.listMyProducts(ownerId);
  return res.status(200).json(products);
}

export async function remove(req: Request, res: Response) {
  const { ownerId } = deleteProductSchema.parse(req.query);
  productsService.deleteProduct(req.params.id, ownerId);
  return res.status(204).send();
}