"use server";

import { supabase } from "@/lib/supabase/client";

export async function getAdmins() {
  const { data, error } =
    await supabase
      .from("admins")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}