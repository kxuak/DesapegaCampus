import { z } from "zod";

const baseProductFields = {
  title: z.string().min(3, "Título deve ter ao menos 3 caracteres."),
  description: z.string().min(5, "Descrição deve ter ao menos 5 caracteres."),
  category: z.string().min(2, "Categoria é obrigatória."),
  condition: z.string().optional(),
  price: z.number().positive("Preço deve ser maior que zero.").optional(),
  isDonation: z.boolean().optional().default(false),
  image: z.string().url("URL de imagem inválida.").optional(),
  sellerName: z.string().min(2, "Informe seu nome."),
  contact: z.string().min(3, "Informe um contato (e-mail, telefone, @ do Instagram etc).").optional(),
};

export const createProductSchema = z
  .object({
    ...baseProductFields,
    ownerId: z.string().min(8, "ownerId inválido."),
  })
  .refine((data) => data.isDonation || data.price !== undefined, {
    message: "Informe um preço ou marque o item como doação.",
    path: ["price"],
  });

export const updateProductSchema = z
  .object({
    ...baseProductFields,
    ownerId: z.string().min(8, "ownerId inválido."),
  })
  .refine((data) => data.isDonation || data.price !== undefined, {
    message: "Informe um preço ou marque o item como doação.",
    path: ["price"],
  });

export const listProductsQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});

export const deleteProductSchema = z.object({
  ownerId: z.string().min(8, "ownerId inválido."),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;