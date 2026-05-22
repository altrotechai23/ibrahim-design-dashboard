import { supabase } from "@/lib/supabase/client";

export async function getAnalytics() {
  const [
    sales,
    products,
    appointments,
  ] = await Promise.all([
    supabase.from("sales").select("*"),
    supabase.from("products").select("*"),
    supabase
      .from("appointments")
      .select("*"),
  ]);

  return {
    sales: sales.data || [],
    products: products.data || [],
    appointments:
      appointments.data || [],
  };
}