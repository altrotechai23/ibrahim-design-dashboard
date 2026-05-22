import { StatsCards } from "./stats-cards";
import { RevenueChart } from "./revenue-chart";
import { PaymentChart } from "./payment-chart";
import { AppointmentChart } from "./appointment-chart";
import { InventoryChart } from "./inventory-chart";
import { TopProducts } from "./top-products";
import { RecentActivity } from "./recent-activity";

type RevenueData = {
  day: string;
  revenue: number;
};

type PaymentData = {
  name: string;
  value: number;
};

interface AppointmentData {
  status: string;
  count: number;
}

type InventoryData = {
  name: string;
  stock: number;
};

type TopProduct = {
  name: string;
  quantity: number;
  revenue: number;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  date: string;
};

interface AnalyticsOverviewProps {
  stats: {
    revenue: number;
    sales: number;
    appointments: number;
    products: number;
  };

  revenueData: RevenueData[];
  paymentData: PaymentData[];
  appointmentData: AppointmentData[];
  inventoryData: InventoryData[];
  topProducts: TopProduct[];
  recentActivity: RecentActivityItem[];
}

export function AnalyticsOverview({
  stats,
  revenueData,
  paymentData,
  appointmentData,
  inventoryData,
  topProducts,
  recentActivity,
}: AnalyticsOverviewProps) {
  return (
    <div className="space-y-8">
      <StatsCards stats={stats} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={revenueData} />
        <PaymentChart data={paymentData} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AppointmentChart data={appointmentData} />
        <InventoryChart data={inventoryData} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TopProducts products={topProducts} />
        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  );
}