"use client";

import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { Button } from "@/components/ui/button";
import { Download, History } from "lucide-react";

interface PaymentHistoryRecord {
  id: string;
  invoice: string;
  customer: string;
  amount: number;
  status: "succeeded" | "pending" | "failed" | "refunded";
  method: string;
  paidAt: string;
  description: string;
}

const payments: PaymentHistoryRecord[] = [
  { id: "1", invoice: "INV-000001", customer: "Acme Corp", amount: 4500, status: "succeeded", method: "Credit Card", paidAt: "2026-05-01", description: "Payment for Web Development" },
  { id: "2", invoice: "INV-000004", customer: "Umbrella Co", amount: 12000, status: "succeeded", method: "Wire Transfer", paidAt: "2026-04-28", description: "Full payment - Q2 retainer" },
  { id: "3", invoice: "INV-000008", customer: "Massive Dynamic", amount: 9500, status: "succeeded", method: "Credit Card", paidAt: "2026-04-25", description: "Payment for consulting services" },
  { id: "4", invoice: "INV-000002", customer: "Globex Inc", amount: 8200, status: "pending", method: "ACH", paidAt: "2026-05-12", description: "Awaiting clearance" },
  { id: "5", invoice: "INV-000010", customer: "Soylent Corp", amount: 2800, status: "failed", method: "Credit Card", paidAt: "2026-05-10", description: "Card declined - insufficient funds" },
  { id: "6", invoice: "INV-000003", customer: "Initech", amount: 2300, status: "refunded", method: "Credit Card", paidAt: "2026-04-20", description: "Refund for duplicate charge" },
  { id: "7", invoice: "INV-000005", customer: "Stark Industries", amount: 5500, status: "succeeded", method: "ACH", paidAt: "2026-05-08", description: "Monthly retainer - May" },
  { id: "8", invoice: "INV-000007", customer: "Oscorp", amount: 3400, status: "pending", method: "Wire Transfer", paidAt: "2026-05-14", description: "International payment pending" },
];

const columns: ColumnDef<PaymentHistoryRecord>[] = [
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <History className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <span className="text-sm font-medium">{row.original.description}</span>
          <p className="text-xs text-muted-foreground">{row.original.invoice}</p>
        </div>
      </div>
    ),
  },
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
  { accessorKey: "method", header: "Method" },
  {
    accessorKey: "paidAt",
    header: "Date",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.paidAt)}</span>,
  },
];

export default function PaymentHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Payment History</h1>
          <p className="text-sm text-muted-foreground">Complete record of all past payments</p>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>
      </div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}
