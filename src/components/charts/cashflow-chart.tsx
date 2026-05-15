"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", inflow: 45000, outflow: 32000 },
  { month: "Feb", inflow: 52000, outflow: 38000 },
  { month: "Mar", inflow: 48000, outflow: 35000 },
  { month: "Apr", inflow: 61000, outflow: 41000 },
  { month: "May", inflow: 55000, outflow: 39000 },
  { month: "Jun", inflow: 67000, outflow: 43000 },
  { month: "Jul", inflow: 72000, outflow: 46000 },
  { month: "Aug", inflow: 58000, outflow: 42000 },
  { month: "Sep", inflow: 63000, outflow: 44000 },
  { month: "Oct", inflow: 59000, outflow: 40000 },
  { month: "Nov", inflow: 68000, outflow: 45000 },
  { month: "Dec", inflow: 75000, outflow: 48000 },
];

export function CashflowChart({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-success, #16a34a)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-success, #16a34a)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-destructive, #ef4444)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-destructive, #ef4444)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />
          <Area type="monotone" dataKey="inflow" stroke="var(--color-success, #16a34a)" fill="url(#inflow)" strokeWidth={2} name="Inflow" />
          <Area type="monotone" dataKey="outflow" stroke="var(--color-destructive, #ef4444)" fill="url(#outflow)" strokeWidth={2} name="Outflow" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
