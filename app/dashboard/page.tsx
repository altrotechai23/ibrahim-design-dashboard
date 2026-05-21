import {
  DollarSign,
  CalendarDays,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";

import { KpiCard } from "@/components/dashboard/kpi-card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { RecentAppointments } from "@/components/dashboard/recent-appointments";
import { getDashboardStats } from "@/actions/dashboard/get-dashboard-stats";

import { StatsCards } from "@/components/dashboard/stats-cards";

export  default async function DashboardPage() {
  const stats = await getDashboardStats();
  
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back, Ibrahim 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Here’s what’s happening with your business today.
        </p>
      </div>

      <StatsCards stats={stats} />

      {/* KPI GRID */}
      {/* <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Revenue"
          value="R 48,200"
          change="+12% from last month"
          positive
          icon={<DollarSign size={20} />}
        />

        <KpiCard
          title="Appointments"
          value="14"
          change="3 fittings today"
          positive
          icon={<CalendarDays size={20} />}
        />

        <KpiCard
          title="Sales"
          value="82"
          change="+8 new today"
          positive
          icon={<ShoppingBag size={20} />}
        />

        <KpiCard
          title="SMS Activity"
          value="24"
          change="-4% yesterday"
          positive={false}
          icon={<MessageSquare size={20} />}
        />
      </div> */}

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* RECENT APPOINTMENTS */}
        <div className="lg:col-span-2">
          <DashboardSection
            title="Recent Appointments"
            description="Latest fitting activities"
          >
            <RecentAppointments />
          </DashboardSection>
        </div>

        {/* REVENUE CHART */}
        <div className="lg:col-span-3">
          <DashboardSection
            title="Revenue Trend"
            description="Last 6 months"
          >
            <RevenueChart />
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}