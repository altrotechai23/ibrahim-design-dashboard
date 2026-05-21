"use server";

import { revalidatePath } from "next/cache";

import { supabase } from "@/lib/supabase/client";

export async function updateAppointmentStatus(
  appointmentId: string,
  status: string
) {
  const { error } = await supabase
    .from("appointments")
    .update({
      collection_status: status,
    })
    .eq("id", appointmentId);

  if (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath(
    "/dashboard/appointments"
  );

  revalidatePath("/dashboard");

  return {
    success: true,
  };
}