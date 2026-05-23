export interface Admin {
  id: string;
  name: string;
  phone_number: string;
  role: "owner" | "manager" | "staff";
  is_active: boolean;
  created_at: string;
}