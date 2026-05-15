"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { EmptyState } from "@/components/ui/empty-state";
import { FileEdit } from "lucide-react";
import Link from "next/link";

interface DraftInvoice {
  id: string;
  customer: string;
  amount: number;
  updatedAt: string;
}

const drafts: DraftInvoice[] = [
  { id: "1", customer: "Acme Corp", amount: 3500, updatedAt: "2026-05-14" },
  { id: "2", customer: "Initech", amount: 2200, updatedAt: "2026-05-12" },
  { id: "3", customer: "Massive Dynamic", amount: 7800, updatedAt: "2026-05-10" },
  { id: "4", customer: "Cyberdyne Systems", amount: 1500, updatedAt: "2026-05-08" },
];

const columns: ColumnDef<DraftInvoice>[] = [
  { accessorKey: "customer", header: "Customer" },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.updatedAt)}</span>,
  },
];

export default function DraftInvoicesPage() {
  if (drafts.length === 0) {
    return (
      <EmptyState
        icon={<FileEdit className="h-8 w-8 text-muted-foreground" />}
        title="No draft invoices"
        description="Save invoices as drafts to come back to them later."
        actionLabel="Create Invoice"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Draft Invoices</h1>
        <p className="text-sm text-muted-foreground">Invoices saved as drafts</p>
      </div>
      <DataTable columns={columns} data={drafts} />
    </div>
  );
}
