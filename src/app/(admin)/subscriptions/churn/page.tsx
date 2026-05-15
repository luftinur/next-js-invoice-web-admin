"use client";

import { BalanceCard } from "@/components/ui/balance-card";
import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { TrendingDown } from "lucide-react";

interface ChurnEntry {
  id: string;
  customer: string;
  plan: string;
  churnedAt: string;
  reason: string;
  ltv: number;
}

const churnData: ChurnEntry[] = [
  { id: "1", customer: "Wayne Enterprises", plan: "Professional", churnedAt: "2026-04-15", reason: "Budget constraints", ltv: 12000 },
  { id: "2", customer: "Oscorp", plan: "Starter", churnedAt: "2026-03-20", reason: "Switched to competitor", ltv: 4500 },
];

const columns: ColumnDef<ChurnEntry>[] = [
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "plan", header: "Plan" },
  { accessorKey: "reason", header: "Reason" },
  {
    accessorKey: "ltv",
    header: () => <div className="text-right">LTV</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.ltv)}</div>,
  },
  { accessorKey: "churnedAt", header: "Churned", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.churnedAt)}</span> },
];

export default function ChurnReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Churn Reports</h1>
        <p className="text-sm text-muted-foreground">Customer churn analysis</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <BalanceCard label="Churn Rate" amount={2.4} currency="USD" icon={<TrendingDown className="h-4 w-4" />} trend={{ value: -0.3, positive: true }} />
        <BalanceCard label="Lost Revenue" amount={16500} />
        <BalanceCard label="At Risk Customers" amount={3} />
      </div>
      <DataTable columns={columns} data={churnData} />
    </div>
  );
}
