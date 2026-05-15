"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";

interface BillingCycle {
  id: string;
  customer: string;
  plan: string;
  amount: number;
  periodStart: string;
  periodEnd: string;
  status: "paid" | "pending" | "failed";
}

const cycles: BillingCycle[] = [
  { id: "1", customer: "Acme Corp", plan: "Professional", amount: 79, periodStart: "2026-05-01", periodEnd: "2026-06-01", status: "paid" },
  { id: "2", customer: "Globex Inc", plan: "Enterprise", amount: 199, periodStart: "2026-05-15", periodEnd: "2026-06-15", status: "paid" },
  { id: "3", customer: "Initech", plan: "Starter", amount: 29, periodStart: "2026-05-10", periodEnd: "2026-06-10", status: "pending" },
];

const columns: ColumnDef<BillingCycle>[] = [
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "plan", header: "Plan" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}</div>,
  },
  { accessorKey: "periodStart", header: "Period Start", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.periodStart)}</span> },
  { accessorKey: "periodEnd", header: "Period End", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.periodEnd)}</span> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="capitalize">{row.original.status}</span> },
];

export default function BillingCyclesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Billing Cycles</h1>
        <p className="text-sm text-muted-foreground">Subscription billing cycle history</p>
      </div>
      <DataTable columns={columns} data={cycles} />
    </div>
  );
}
