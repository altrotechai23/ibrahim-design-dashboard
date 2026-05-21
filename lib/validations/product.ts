import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),

  category: z.string().optional(),

  price: z.number(),

  stockQuantity: z.number(),

  sku: z.string().optional(),

  lowStockThreshold: z.number(),
});