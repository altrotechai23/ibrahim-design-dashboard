"use server";

import { revalidatePath } from "next/cache";

import { supabase } from "@/lib/supabase/client";

export async function createService(
  name: string
) {
  if (!name.trim()) {
    throw new Error(
      "Service name is required"
    );
  }

  const { data, error } = await supabase
    .from("services")
    .insert({
      name: name.trim(),
    })
    .select();

  console.log("SERVICE DATA:", data);

  console.log("SERVICE ERROR:", error);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(
    "/dashboard/services"
  );

  revalidatePath(
    "/dashboard/appointments"
  );

  return {
    success: true,
  };
}