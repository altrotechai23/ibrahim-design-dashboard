"use client";

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    name: string;
    stock: number;
  }[];
}

export function InventoryChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#09090b]/70 p-6">
      <h3 className="mb-6 text-lg font-semibold">
        Inventory Levels
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <Tooltip />

          <Bar
            dataKey="stock"
            fill="#22c55e"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}