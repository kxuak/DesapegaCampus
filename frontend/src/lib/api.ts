import type { Anuncio } from "../data/anuncios";
import { formatarTempo } from "./tempo";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface ApiProduct {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string | null;
  price: number | null;
  isDonation: boolean;
  image: string | null;
  contact: string | null;
  ownerId: string;
  createdAt: string;
}

interface ListProductsResponse {
  items: ApiProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductPayload {
  title: string;
  description: string;
  category: string;
  condition?: string;
  price?: number;
  isDonation?: boolean;
  image?: string;
  contact?: string;
  ownerId: string;
}

interface ListProductsParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

function buildQuery(
  params: Record<string, string | number | undefined> | ListProductsParams
): string {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const mensagem = body?.error ?? "Não foi possível se comunicar com o servidor.";
    throw new Error(mensagem);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function listProducts(params: ListProductsParams = {}): Promise<ListProductsResponse> {
  return request<ListProductsResponse>(`/products${buildQuery(params)}`);
}

export function listMyProducts(ownerId: string): Promise<ApiProduct[]> {
  return request<ApiProduct[]>(`/products/mine${buildQuery({ ownerId })}`);
}

export function createProduct(payload: ProductPayload): Promise<ApiProduct> {
  return request<ApiProduct>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateProduct(id: string, payload: ProductPayload): Promise<ApiProduct> {
  return request<ApiProduct>(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(id: string, ownerId: string): Promise<void> {
  return request<void>(`/products/${id}${buildQuery({ ownerId })}`, {
    method: "DELETE",
  });
}

export function toAnuncio(product: ApiProduct): Anuncio {
  return {
    id: product.id,
    titulo: product.title,
    categoria: product.category,
    preco: product.isDonation ? null : product.price,
    tempo: formatarTempo(product.createdAt),
    imagem: product.image ?? undefined,
    descricao: product.description,
    condicao: product.condition ?? undefined,
    contato: product.contact ?? undefined,
  };
}