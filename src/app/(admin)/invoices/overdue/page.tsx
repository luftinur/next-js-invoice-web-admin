"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { DueDateAlert } from "@/components/invoice/due-date-alert";
import { AlertTriangle } from "lucide-react";

interface OverdueInvoice {
  id: string;
  customer: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
}

const overdueInvoices: OverdueInvoice[] = [
  { id: "1", customer: "Initech", amount: 2300, dueDate: "2026-04-15", daysOverdue: 29 },
  { id: "2", customer: "Oscorp", amount: 3400, dueDate: "2026-04-01", daysOverdue: 43 },
  { id: "3", customer: "Soylent Corp", amount: 1800, dueDate: "2026-04-20", daysOverdue: 24 },
];

const columns: ColumnDef<OverdueInvoice>[] = [
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums text-destructive">{formatCurrency(row.original.amount)}</div>,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{formatDate(row.original.dueDate)}</span>
        <DueDateAlert dueDate={row.original.dueDate} />
      </div>
    ),
  },
  {
    accessorKey: "daysOverdue",
    header: () => <div className="text-right">Days Overdue</div>,
    cell: ({ row }) => <div className="text-right"><StatusBadge status="overdue" /> <span className="ml-1 text-sm text-muted-foreground">({row.original.daysOverdue}d)</span></div>,
  },
];

export default function OverdueInvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Overdue Invoices</h1>
        <p className="text-sm text-muted-foreground">
          <span className="text-destructive font-medium">{overdueInvoices.length}</span> invoices past due
        </p>
      </div>
      <DataTable columns={columns} data={overdueInvoices} />
    </div>
  );
}
