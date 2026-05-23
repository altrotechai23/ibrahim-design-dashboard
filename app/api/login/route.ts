import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase/client";

export async function POST(
  request: Request
) {
  const {
    name,
    phone,
  } = await request.json();

  const { data } =
    await supabase
      .from("admins")
      .select("*")
      .eq("name", name)
      .eq(
        "phone_number",
        phone
      )
      .single();

  if (!data) {
    return NextResponse.json({
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
    admin: {
      id: data.id,
      name: data.name,
      role: data.role,
      phone_number:
        data.phone_number,
    },
  });
}