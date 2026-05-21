export interface Product {
  id: string;

  name: string;

  category: string | null;

  price: number;

  stock_quantity: number;

  sku: string | null;

  low_stock_threshold: number;

  created_at: string;
}