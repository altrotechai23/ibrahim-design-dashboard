export interface Sale {
  id: string;

  item_name: string;

  quantity: number;

  unit_price: number;

  total_amount: number;

  client_name: string | null;

  client_phone: string | null;

  client_address: string | null;

  payment_status:
    | "paid"
    | "pending";

  payment_type: "cash"| "card";

  created_by: string | undefined;

  created_at: string;
}