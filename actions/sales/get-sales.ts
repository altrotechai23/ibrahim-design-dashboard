"use server";

import { supabase } from "@/lib/supabase/client";

import { Sale } from "@/types/sale";

export async function getSales(): Promise<
  Sale[]
> {
  const { data, error } =
    await supabase
      .from("sales")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(error);

    return [];
  }

  return data as Sale[];
}