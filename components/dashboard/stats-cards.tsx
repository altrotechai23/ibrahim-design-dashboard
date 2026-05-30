"use client";

import CountUp from "react-countup";

import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats: DashboardStats;
}

const cards = [
  {
    key: "totalAppointments",
    label: "Total Appointments",
    gradient:
      "from-blue-500/20 to-cyan-500/10",
  },

  {
    key: "pendingCollection",
    label: "Pending Collection",
    gradient:
      "from-gray-500/20 to-zinc-500/10",
  },

  {
    key: "readyForCollection",
    label: "Ready For Collection",
    gradient:
      "from-green-500/20 to-emerald-500/10",
  },

  {
    key: "revenueThisMonth",
    label: "Revenue This Month",
    gradient:
      "from-purple-500/20 to-pink-500/10",
    prefix: "R ",
  },

  {
    key: "outstandingBalance",
    label: "Outstanding Balance",
    gradient:
      "from-orange-500/20 to-red-500/10",
    prefix: "R ",
  },

  {
    key: "collectionRate",
    label: "Collection Rate",
    gradient:
      "from-emerald-500/20 to-green-500/10",
    suffix: "%",
  },
];

export function StatsCards({
  stats,
}: Props) {
  return (
    <div
      className="
        grid gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {cards.map((card) => (
        <div
          key={card.key}
          className={`
            relative overflow-hidden
            rounded-3xl border
            border-white/10

            bg-linear-to-br
            ${card.gradient}

            p-6
            backdrop-blur-xl

            transition-all
            duration-300

            hover:-translate-y-1
            hover:border-white/20
          `}
        >
          <div
            className="
              absolute inset-0
              bg-black/30
            "
          />

          <div className="relative z-10">
            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {card.label}
            </p>

            <div
              className="
                mt-4 text-4xl
                font-semibold
                tracking-tight
              "
            >
              {card.prefix}

              <CountUp
                end={
                  stats[
                    card.key as keyof DashboardStats
                  ] as number
                }
                duration={1.5}
              />

              {card.suffix}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}