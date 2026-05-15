"use client";

import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";

interface Payout {
  id: string;
  recipient: string;
  amount: number;
  status: "succeeded" | "pending" | "failed";
  method: string;
  date: string;
}

const payouts: Payout[] = [
  { id: "1", recipient: "Jane Designer", amount: 3500, status: "succeeded", method: "Wire Transfer", date: "2026-05-01" },
  { id: "2", recipient: "Dev Agency", amount: 8200, status: "pending", method: "ACH", date: "2026-05-12" },
  { id: "3", recipient: "Consulting Co", amount: 2200, status: "succeeded", method: "PayPal", date: "2026-04-28" },
];

const columns: ColumnDef<Payout>[] = [
  { accessorKey: "recipient", header: "Recipient" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="flex justify-center"><StatusBadge status={row.original.status} /></div>,
  },
  { accessorKey: "method", header: "Method" },
  { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.date)}</span> },
];

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Payouts</h1>
        <p className="text-sm text-muted-foreground">Vendor and contractor payouts</p>
      </div>
      <DataTable columns={columns} data={payouts} />
    </div>
  );
}
