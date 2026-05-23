"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";

interface CreateAdminProps {
  name: string;
  phone_number: string;
  role: "owner" | "manager" | "staff";
}

export async function createAdmin(
  values: CreateAdminProps
) {
  const { error } = await supabase
    .from("admins")
    .insert(values);

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