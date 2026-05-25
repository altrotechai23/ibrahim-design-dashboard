"use server";

import { supabase } from "@/lib/supabase/client";
import { AuditLog } from "@/types/audit-log";

export async function getAuditLogs(): Promise<
  AuditLog[]
> {
  const { data, error } =
    await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(error);

    return [];
  }

  return data as AuditLog[];
}