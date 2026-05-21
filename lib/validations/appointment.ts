import { z } from "zod";

export const appointmentSchema = z.object({
  clientName: z
    .string()
    .min(2, "Client name is required"),

  phone: z
  .string()
  .regex(
    /^\+[1-9]\d{7,14}$/,
    "Enter a valid international phone number"
  ),

  email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),

  serviceId: z
    .string()
    .min(1, "Please select a service"),

  fittingDate: z
    .string()
    .min(1, "Fitting date is required"),

  deposit: z.coerce.number(),

  totalAmount: z.coerce.number(),

  collectionDate: z.string().optional(),
});

export type AppointmentFormValues =  z.infer<typeof appointmentSchema>;
