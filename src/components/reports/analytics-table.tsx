"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatPercentage } from "@/lib/formatting";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalyticsRow {
  metric: string;
  value: number;
  previous: number;
  change: number;
  trend: "up" | "down" | "flat";
}

const columns: ColumnDef<AnalyticsRow>[] = [
  { accessorKey: "metric", header: "Metric", cell: ({ row }) => <span className="font-medium">{row.original.metric}</span> },
  { accessorKey: "value", header: () => <div className="text-right">Current</div>, cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.value)}</div> },
  { accessorKey: "previous", header: () => <div className="text-right">Previous</div>, cell: ({ row }) => <div className="text-right tabular-nums text-muted-foreground">{formatCurrency(row.original.previous)}</div> },
  {
    accessorKey: "change", header: () => <div className="text-right">Change</div>,
    cell: ({ row }) => {
      const val = row.original.change;
      return (
        <div className={cn("text-right font-medium tabular-nums", val > 0 ? "text-success" : val < 0 ? "text-destructive" : "")}>
          {val > 0 ? "+" : ""}{val.toFixed(1)}%
        </div>
      );
    },
  },
  {
    accessorKey: "trend", header: () => <div className="text-center">Trend</div>,
    cell: ({ row }) => <div className="flex justify-center"><StatusBadge status={row.original.trend === "up" ? "paid" : row.original.trend === "down" ? "overdue" : "pending"} /></div>,
  },
];

const data: AnalyticsRow[] = [
  { metric: "Total Revenue", value: 485000, previous: 431000, change: 12.5, trend: "up" },
  { metric: "Paid Invoices", value: 384000, previous: 355000, change: 8.2, trend: "up" },
  { metric: "Pending Payments", value: 72000, previous: 81000, change: -11.1, trend: "down" },
  { metric: "Overdue Amount", value: 29000, previous: 22000, change: 31.8, trend: "down" },
  { metric: "Avg Invoice Value", value: 3200, previous: 2950, change: 8.5, trend: "up" },
  { metric: "Collection Rate", value: 87300, previous: 84600, change: 3.2, trend: "up" },
];

interface AnalyticsTableProps {
  className?: string;
  title?: string;
  description?: string;
}

export function AnalyticsTable({ className, title = "Performance Metrics", description = "Period-over-period comparison" }: AnalyticsTableProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} pageSize={10} />
      </CardContent>
    </Card>
  );
}
