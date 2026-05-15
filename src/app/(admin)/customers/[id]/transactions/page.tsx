"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: string;
  invoice: string;
  amount: number;
  status: string;
  method: string;
  date: string;
}

const transactions: Transaction[] = [
  { id: "1", invoice: "INV-000001", amount: 4500, status: "paid", method: "Credit Card", date: "2026-05-14" },
  { id: "2", invoice: "INV-000003", amount: 2300, status: "overdue", method: "Bank Transfer", date: "2026-04-20" },
  { id: "3", invoice: "INV-000004", amount: 12000, status: "paid", method: "Wire Transfer", date: "2026-05-10" },
  { id: "4", invoice: "INV-000005", amount: 5500, status: "draft", method: "Credit Card", date: "2026-05-15" },
];

const columns: ColumnDef<Transaction>[] = [
  { accessorKey: "invoice", header: "Invoice" },
  { accessorKey: "amount", header: () => <div className="text-right">Amount</div>, cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}</div> },
  { accessorKey: "status", header: () => <div className="text-center">Status</div>, cell: ({ row }) => <div className="flex justify-center"><StatusBadge status={row.original.status} /></div> },
  { accessorKey: "method", header: "Method" },
  { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.date)}</span> },
];

export default function CustomerTransactionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={transactions} />
      </CardContent>
    </Card>
  );
}
