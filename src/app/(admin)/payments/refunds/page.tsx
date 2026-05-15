"use client";

import { DataTable } from "@/components/tables/data-table";
import { RefundBadge } from "@/components/payments/refund-badge";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Refund {
  id: string;
  invoice: string;
  customer: string;
  amount: number;
  reason: string;
  status: "issued" | "applied" | "void";
  date: string;
}

const refunds: Refund[] = [
  { id: "1", invoice: "INV-000001", customer: "Acme Corp", amount: 500, reason: "Customer requested", status: "applied", date: "2026-05-10" },
  { id: "2", invoice: "INV-000005", customer: "Stark Industries", amount: 1200, reason: "Service not rendered", status: "issued", date: "2026-05-08" },
  { id: "3", invoice: "INV-000009", customer: "Cyberdyne Systems", amount: 300, reason: "Duplicate charge", status: "void", date: "2026-04-20" },
];

const columns: ColumnDef<Refund>[] = [
  { accessorKey: "invoice", header: "Invoice", cell: ({ row }) => <span className="font-mono text-sm">{row.original.invoice}</span> },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums text-destructive">-{formatCurrency(row.original.amount)}</div>,
  },
  { accessorKey: "reason", header: "Reason" },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="flex justify-center"><RefundBadge status={row.original.status} /></div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.date)}</span>,
  },
];

export default function RefundsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Refunds</h1>
          <p className="text-sm text-muted-foreground">Manage refunds and adjustments</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Issue Refund</Button>
      </div>
      <DataTable columns={columns} data={refunds} />
    </div>
  );
}
