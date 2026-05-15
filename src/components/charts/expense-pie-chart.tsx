"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Software", value: 35000 },
  { name: "Consulting", value: 22000 },
  { name: "Design", value: 18000 },
  { name: "Hosting", value: 12000 },
  { name: "Other", value: 8000 },
];

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function ExpensePieChart() {
  return (
    <div className="h-64 w-full [&_>_div]:h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "13px",
            }}
            formatter={(value) => [`$${Number(value).toLocaleString()}`, "Amount"]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
