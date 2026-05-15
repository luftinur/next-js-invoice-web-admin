"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 24000, expenses: 12000 },
  { name: "Feb", revenue: 32000, expenses: 15000 },
  { name: "Mar", revenue: 28000, expenses: 13000 },
  { name: "Apr", revenue: 45000, expenses: 18000 },
  { name: "May", revenue: 52000, expenses: 20000 },
  { name: "Jun", revenue: 48000, expenses: 19000 },
  { name: "Jul", revenue: 58000, expenses: 22000 },
  { name: "Aug", revenue: 63000, expenses: 24000 },
  { name: "Sep", revenue: 55000, expenses: 21000 },
  { name: "Oct", revenue: 67000, expenses: 25000 },
  { name: "Nov", revenue: 72000, expenses: 26000 },
  { name: "Dec", revenue: 81000, expenses: 28000 },
];

export function RevenueLineChart() {
  return (
    <div className="h-80 w-full [&_>_div]:h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="name"
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            className="text-xs text-muted-foreground"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="var(--muted-foreground)"
            strokeWidth={2}
            dot={false}
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
