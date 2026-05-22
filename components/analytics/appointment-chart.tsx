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
    status: string;
    count: number;
  }[];
}

export function AppointmentChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#09090b]/70 p-6">
      <h3 className="mb-6 text-lg font-semibold">
        Appointment Status
      </h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="status" />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#3b82f6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}