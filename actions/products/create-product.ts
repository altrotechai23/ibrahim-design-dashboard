"use server";

import { supabase } from "@/lib/supabase/client";

interface CreateProductInput {
  name: string;
  category?: string;
  price: number;
  stockQuantity: number;
  sku?: string;
  lowStockThreshold: number;
}

export async function createProduct(
  values: CreateProductInput
) {
  const { error } = await supabase
    .from("products")
    .insert({
      name: values.name,
      category: values.category || null,
      price: values.price,
      stock_quantity: values.stockQuantity,
      sku: values.sku || null,
      low_stock_threshold:
        values.lowStockThreshold,
    });

  if (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}