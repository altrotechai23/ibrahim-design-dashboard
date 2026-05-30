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
     const product = await supabase.from("products").select("stock_quantity").eq("name", values.itemName).single();
    if (
      product.data?.stock_quantity <
      values.quantity
    ) {
      return {
        success: false,
        error:
          "Not enough stock available",
      };
    }

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
          payment_type: values.paymentType,
         created_by:values.createdBy || "Unknown",
          
      });

    if (error) {
      console.error(error);
    
      return {
        success: false,
        error: error.message,
      };
    }
   
  
    if (product.data){
      const newStock = product.data?.stock_quantity - values.quantity;
      await supabase.from("products").update({ stock_quantity: newStock,}).eq("name", values.itemName);
      
      revalidatePath("dashboard/products")
      console.log(`New stock : ${newStock}`)
    }

    await supabase
    .from("audit_logs")
    .insert({
      action: "UPDATE",
      table_name: "sales",
      record_id: values.unitPrice,
      description:
        `Updated by ${values.createdBy}`,
    });

    revalidatePath("/dashboard/sales");
    revalidatePath("/dashboard/analytics");
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