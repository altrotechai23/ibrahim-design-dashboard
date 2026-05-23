import { StatsCards } from "@/components/analytics/stats-cards";
import { RevenueChart } from "@/components/analytics/revenue-chart";
import { PaymentChart } from "@/components/analytics/payment-chart";
import { AppointmentChart } from "@/components/analytics/appointment-chart";
import { InventoryChart } from "@/components/analytics/inventory-chart";
import { TopProducts } from "@/components/analytics/top-products";
import { RecentActivity } from "@/components/analytics/recent-activity";

import { supabase } from "@/lib/supabase/client";

export default async function AnalyticsPage() {
  const [salesResult, appointmentsResult, productsResult,] = await Promise.all([supabase
      .from("sales")
      .select("*")
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("appointments")
      .select("*")
      .order("created_at", {
        ascending: false,
      }),

    supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false,
      }),
  ]);

  const sales = salesResult.data ?? [];
  const appointments = appointmentsResult.data ?? [];
  const products = productsResult.data ?? [];

  const totalRevenue = sales.reduce((sum, sale) => sum + Number( sale.total_amount || 0), 0);

  const totalSales = sales.length;


  // Weekly Revenue
  const weeklyRevenue = Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date();

      date.setDate(
        date.getDate() -
          (6 - index)
      );

      const day =
        date
          .toISOString()
          .split("T")[0];

      const revenue = sales
        .filter((sale) =>
          sale.created_at?.startsWith(
            day
          )
        )
        .reduce(
          (sum, sale) =>
            sum +
            Number(
              sale.total_amount ||
                0
            ),
          0
        );

      return {
        day: date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),
        revenue,
      };
    }
  );

  // Payment Breakdown
  const paymentBreakdown = [
    {
      name: "Cash",
      value: sales.filter(
        (sale) =>
          sale.payment_type ===
          "cash"
      ).length,
    },
    {
      name: "Card",
      value: sales.filter(
        (sale) =>
          sale.payment_type ===
          "card"
      ).length,
    },
  ];

  // Appointment Breakdown
  const appointmentBreakdown = [
  {
    status: "Pending",
    count: appointments.filter(
      (appointment) =>
        appointment.status ===
        "pending"
    ).length,
  },
  {
    status: "Ready",
    count: appointments.filter(
      (appointment) =>
        appointment.status ===
        "ready_for_collection"
    ).length,
  },
  {
    status: "Collected",
    count: appointments.filter(
      (appointment) =>
        appointment.status ===
        "collected"
    ).length,
  },
];

  // Inventory Data
  const inventoryData = products
    .slice(0, 10)
    .map((product) => ({
      name: product.name,
      stock:
        product.stock_quantity,
    }));

  // Top Products
  const topProductsMap =
    sales.reduce(
      (
        acc: Record<
          string,
          {
            name: string;
            quantity: number;
            revenue: number;
          }
        >,
        sale
      ) => {
        const item =
          acc[sale.item_name] || {
            name: sale.item_name,
            quantity: 0,
            revenue: 0,
          };

        item.quantity += Number(
          sale.quantity || 0
        );

        item.revenue += Number(
          sale.total_amount || 0
        );

        acc[sale.item_name] =
          item;

        return acc;
      },
      {}
    );

  const topProducts =
    Object.values(
      topProductsMap
    )
      .sort(
        (a, b) =>
          b.quantity -
          a.quantity
      )
      .slice(0, 5);

  // Recent Activity
  const recentActivity = [
  ...sales.slice(0, 5).map((sale) => ({
    id: `sale-${sale.id}`,
    title: `Sale • ${sale.item_name}`,
    subtitle:
      sale.client_name ||
      "Walk-in customer",
    amount: `R ${sale.total_amount}`,
    date: sale.created_at,
  })),

  ...appointments
    .slice(0, 5)
    .map((appointment) => ({
      id: `appointment-${appointment.id}`,
      title: "Appointment",
      subtitle:
        appointment.client_name,
      amount: `R ${appointment.amount}`,
      date: appointment.created_at,
    })),
]
  .sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  )
  .slice(0, 10);

  return (
    <div className="space-y-8">
      <StatsCards
    stats={{
        revenue: totalRevenue,
        sales: totalSales,
        appointments: appointments.length,
        products: products.length,
    }}
    />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart
          data={weeklyRevenue}
        />

        <PaymentChart
          data={
            paymentBreakdown
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AppointmentChart
          data={
            appointmentBreakdown
          }
        />

        <InventoryChart
          data={inventoryData}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopProducts
          products={topProducts}
        />

        <RecentActivity
          activities={
            recentActivity
          }
        />
      </div>
    </div>
  );
}