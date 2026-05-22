"use server";

import { revalidatePath } from "next/cache";

import { supabase } from "@/lib/supabase/client";

interface CreateSaleProps {
  itemName: string;

  quantity: number;

  unitPrice: number;

  clientName?: string;

  clientPhone?: string;

  clientAddress?: string;

  paymentStatus:
    | "paid"
    | "pending";
  paymentType: "card" | "cash" ;
  createdBy?: string,
}

export async function createSale(
  values: CreateSaleProps
) {
  try {
    const totalAmount =
      values.quantity *
      values.unitPrice;

    const { error } = await supabase.from("sales")
      .insert({
        item_name: values.itemName,
        quantity: values.quantity,
        unit_price: values.unitPrice,
        total_amount: totalAmount,
        client_name:
          values.clientName || null,
        client_phone:
          values.clientPhone || null,
        client_address:
          values.clientAddress ||
          null,
        payment_status:
          values.paymentStatus,
         created_by:values.createdBy || "Unknown",
          
      });

    if (error) {
      console.error(error);

      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath(
      "/dashboard/sales"
    );

    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        "Failed to create sale",
    };
  }
}