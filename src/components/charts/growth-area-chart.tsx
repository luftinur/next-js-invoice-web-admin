"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Q1", mrr: 24000, arr: 288000 },
  { name: "Q2", mrr: 32000, arr: 384000 },
  { name: "Q3", mrr: 45000, arr: 540000 },
  { name: "Q4", mrr: 58000, arr: 696000 },
];

export function GrowthAreaChart() {
  return (
    <div className="h-72 w-full [&_>_div]:h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
          <YAxis className="text-xs text-muted-foreground" tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Area type="monotone" dataKey="mrr" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={2} />
          <Area type="monotone" dataKey="arr" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.1} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
