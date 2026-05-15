"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { Plus } from "lucide-react";
import Link from "next/link";

interface RecurringInvoice {
  id: string;
  customer: string;
  amount: number;
  interval: string;
  nextBilling: string;
  status: "active" | "paused" | "cancelled";
}

const recurringInvoices: RecurringInvoice[] = [
  { id: "1", customer: "Acme Corp", amount: 4500, interval: "Monthly", nextBilling: "2026-06-01", status: "active" },
  { id: "2", customer: "Globex Inc", amount: 8200, interval: "Monthly", nextBilling: "2026-06-15", status: "active" },
  { id: "3", customer: "Stark Industries", amount: 12000, interval: "Quarterly", nextBilling: "2026-07-01", status: "active" },
  { id: "4", customer: "Wayne Enterprises", amount: 5000, interval: "Monthly", nextBilling: "2026-06-01", status: "paused" },
  { id: "5", customer: "Oscorp", amount: 3400, interval: "Yearly", nextBilling: "2027-01-15", status: "cancelled" },
];

const columns: ColumnDef<RecurringInvoice>[] = [
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}</div>,
  },
  { accessorKey: "interval", header: "Interval" },
  {
    accessorKey: "nextBilling",
    header: "Next Billing",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.nextBilling)}</span>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="flex justify-center"><StatusBadge status={row.original.status} /></div>,
  },
];

export default function RecurringInvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Recurring Invoices</h1>
          <p className="text-sm text-muted-foreground">Manage automated recurring billing</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> New Recurring</Button>
      </div>
      <DataTable columns={columns} data={recurringInvoices} />
    </div>
  );
}
