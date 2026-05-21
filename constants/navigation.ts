import {
  LayoutDashboard,
  CalendarDays,
  ShoppingBag,
  Users,
  BarChart3,
  ClipboardList,
  Package,
} from "lucide-react";

export const navigationLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
    icon: ShoppingBag,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Admins",
    href: "/dashboard/admins",
    icon: Users,
  },
  {
    name: "Audit Logs",
    href: "/dashboard/logs",
    icon: ClipboardList,
  },
];