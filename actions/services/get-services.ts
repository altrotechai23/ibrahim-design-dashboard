"use server";

import { supabase } from "@/lib/supabase/client";

export async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error(error);

    return [];
  }

  return data;
}