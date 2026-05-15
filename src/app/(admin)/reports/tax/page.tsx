"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatting";

interface TaxRecord {
  id: string;
  period: string;
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  status: "filed" | "pending" | "due";
}

const taxRecords: TaxRecord[] = [
  { id: "1", period: "Q1 2026", taxableAmount: 145000, taxRate: 10, taxAmount: 14500, status: "filed" },
  { id: "2", period: "Q2 2026", taxableAmount: 162000, taxRate: 10, taxAmount: 16200, status: "pending" },
  { id: "3", period: "Q3 2026", taxableAmount: 0, taxRate: 10, taxAmount: 0, status: "due" },
];

const columns: ColumnDef<TaxRecord>[] = [
  { accessorKey: "period", header: "Period" },
  {
    accessorKey: "taxableAmount",
    header: () => <div className="text-right">Taxable Amount</div>,
    cell: ({ row }) => <div className="text-right tabular-nums">{formatCurrency(row.original.taxableAmount)}</div>,
  },
  { accessorKey: "taxRate", header: "Rate", cell: ({ row }) => <div className="text-right">{row.original.taxRate}%</div> },
  {
    accessorKey: "taxAmount",
    header: () => <div className="text-right">Tax Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.taxAmount)}</div>,
  },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <span className="capitalize">{row.original.status}</span> },
];

export default function TaxReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Tax Reports</h1>
        <p className="text-sm text-muted-foreground">Tax collection and filing summary</p>
      </div>
      <DataTable columns={columns} data={taxRecords} />
    </div>
  );
}
