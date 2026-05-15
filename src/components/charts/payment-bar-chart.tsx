"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", paid: 18000, pending: 6000, overdue: 2000 },
  { name: "Feb", paid: 25000, pending: 7000, overdue: 1500 },
  { name: "Mar", paid: 22000, pending: 5000, overdue: 3000 },
  { name: "Apr", paid: 35000, pending: 8000, overdue: 2500 },
  { name: "May", paid: 40000, pending: 9000, overdue: 3000 },
  { name: "Jun", paid: 38000, pending: 7000, overdue: 2000 },
];

export function PaymentBarChart() {
  return (
    <div className="h-72 w-full [&_>_div]:h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          <Bar dataKey="paid" fill="var(--success)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pending" fill="var(--warning)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="overdue" fill="var(--destructive)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
