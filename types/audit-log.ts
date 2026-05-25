export interface AuditLog {
  id: string;

  action: string;

  table_name: string;

  record_id: string | null;

  description: string;

  admin_name: string | null;

  admin_role: string | null;

  created_at: string;
}