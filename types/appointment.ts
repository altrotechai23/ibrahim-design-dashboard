export interface Appointment {
  id: string;

  client_name: string;

  phone: string;

  email: string | null;

  fitting_date: string;

  collection_date: string | null;

  total_amount: number;

  deposit: number;

  due_balance: number;

  payment_method:| "cash" | "card";

  collection_status: | "pending" | "ready_for_collection" | "collected" | "cancelled";

  created_at: string;

  service_id: string;

  created_by: string

  service: {
    id: string;
    name: string;
  } | null;
}