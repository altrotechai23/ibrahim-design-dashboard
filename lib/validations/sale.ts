import { z } from "zod";

export const saleSchema = z.object({
  itemName: z.string().min(1),

  quantity: z.number().min(1),

  unitPrice: z.number().min(0),

  clientName: z.string().optional(),

  clientPhone: z.string().optional(),

  clientAddress: z.string().optional(),

  paymentStatus: z.enum([
    "paid",
    "pending",
  ]),
  paymentType: z.enum([
  "cash",
  "card",
]),

createdBy: z.string().optional(),
});

