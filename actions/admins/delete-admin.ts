"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";

export async function deleteAdmin(
  id: string
) {
  const { error } = await supabase
    .from("admins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/dashboard/admins");

  return {
    success: true,
  };
}