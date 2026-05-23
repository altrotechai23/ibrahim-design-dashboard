"use client";

import { useAdmin } from "@/contexts/admin-context";

import { SalesTable } from "@/components/sales/sales-table";
import { Sale } from "@/types/sale";

interface Props {
  sales: Sale[];
}

export function SalesPageContent({
  sales,
}: Props) {
  const { admin } = useAdmin();

  const filteredSales =
    admin?.role === "staff"
      ? sales.filter((sale) => {
          const today = new Date()
            .toISOString()
            .split("T")[0];

          return sale.created_at.startsWith(
            today
          );
        })
      : sales;

  return (
    <SalesTable
      data={filteredSales}
    />
  );
}