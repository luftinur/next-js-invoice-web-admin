"use client";

import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { PaymentIndicator } from "@/components/ui/payment-indicator";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

interface Transaction {
  id: string;
  invoice: string;
  customer: string;
  amount: number;
  status: "succeeded" | "pending" | "failed";
  method: string;
  date: string;
}

const transactions: Transaction[] = [
  { id: "1", invoice: "INV-000001", customer: "Acme Corp", amount: 4500, status: "succeeded", method: "Credit Card", date: "2026-05-01" },
  { id: "2", invoice: "INV-000004", customer: "Umbrella Co", amount: 12000, status: "succeeded", method: "Wire Transfer", date: "2026-04-28" },
  { id: "3", invoice: "INV-000008", customer: "Massive Dynamic", amount: 9500, status: "succeeded", method: "Credit Card", date: "2026-04-25" },
  { id: "4", invoice: "INV-000002", customer: "Globex Inc", amount: 8200, status: "pending", method: "ACH", date: "2026-05-12" },
  { id: "5", invoice: "INV-000010", customer: "Soylent Corp", amount: 2800, status: "failed", method: "Credit Card", date: "2026-05-10" },
];

const columns: ColumnDef<Transaction>[] = [
  { accessorKey: "invoice", header: "Invoice", cell: ({ row }) => <span className="font-mono text-sm">{row.original.invoice}</span> },
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="flex justify-center"><PaymentIndicator status={row.original.status} /></div>,
  },
  { accessorKey: "method", header: "Method" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.date)}</span>,
  },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground">All payment transactions</p>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
      </div>
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
