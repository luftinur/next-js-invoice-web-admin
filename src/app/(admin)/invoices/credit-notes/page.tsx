"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreditNote {
  id: string;
  number: string;
  customer: string;
  amount: number;
  status: "issued" | "applied" | "void";
  issuedDate: string;
}

const creditNotes: CreditNote[] = [
  { id: "1", number: "CN-000001", customer: "Acme Corp", amount: 500, status: "issued", issuedDate: "2026-05-10" },
  { id: "2", number: "CN-000002", customer: "Globex Inc", amount: 1200, status: "applied", issuedDate: "2026-04-28" },
  { id: "3", number: "CN-000003", customer: "Initech", amount: 300, status: "void", issuedDate: "2026-04-15" },
];

const columns: ColumnDef<CreditNote>[] = [
  { accessorKey: "number", header: "Credit Note", cell: ({ row }) => <span className="font-mono text-sm">{row.original.number}</span> },
  { accessorKey: "customer", header: "Customer" },
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
  {
    accessorKey: "issuedDate",
    header: "Issued",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.issuedDate)}</span>,
  },
];

export default function CreditNotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Credit Notes</h1>
          <p className="text-sm text-muted-foreground">Manage credit notes and adjustments</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> New Credit Note</Button>
      </div>
      <DataTable columns={columns} data={creditNotes} />
    </div>
  );
}
