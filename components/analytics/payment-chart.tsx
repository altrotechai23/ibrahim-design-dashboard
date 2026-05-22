"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#22c55e",
];

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export function PaymentChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#09090b]/70 p-6">
      <h3 className="mb-6 text-lg font-semibold">
        Payment Methods
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}