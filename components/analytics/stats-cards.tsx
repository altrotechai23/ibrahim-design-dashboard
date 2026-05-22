import {
  DollarSign,
  ShoppingBag,
  Calendar,
  Package,
} from "lucide-react";

interface Props {
  stats: {
    revenue: number;
    sales: number;
    appointments: number;
    products: number;
  };
}

export function StatsCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Revenue",
      value: `R ${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: "Sales",
      value: stats.sales,
      icon: ShoppingBag,
    },
    {
      title: "Appointments",
      value: stats.appointments,
      icon: Calendar,
    },
    {
      title: "Products",
      value: stats.products,
      icon: Package,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-3xl
              border border-white/10
              bg-[#09090b]/70
              p-6
              backdrop-blur-xl
            "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {card.title}
              </p>

              <Icon className="h-5 w-5 text-blue-500" />
            </div>

            <h2 className="mt-4 text-3xl font-bold">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}