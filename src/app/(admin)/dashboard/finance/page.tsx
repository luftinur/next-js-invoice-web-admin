"use client";

import { BalanceCard } from "@/components/ui/balance-card";
import { FinancialStatsCard } from "@/components/ui/financial-stats-card";
import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { PaymentBarChart } from "@/components/charts/payment-bar-chart";
import {
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  Download,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";

import { formatCurrency, formatDate, formatInvoiceId } from "@/lib/formatting";

interface RecentInvoice {
  id: string;
  number: string;
  customer: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "draft";
  date: string;
}

const recentInvoices: RecentInvoice[] = [
  { id: "1", number: "INV-000001", customer: "Acme Corp", amount: 4500, status: "paid", date: "2026-05-14" },
  { id: "2", number: "INV-000002", customer: "Globex Inc", amount: 8200, status: "pending", date: "2026-05-12" },
  { id: "3", number: "INV-000003", customer: "Initech", amount: 2300, status: "overdue", date: "2026-05-01" },
  { id: "4", number: "INV-000004", customer: "Umbrella Co", amount: 12000, status: "paid", date: "2026-05-10" },
  { id: "5", number: "INV-000005", customer: "Stark Industries", amount: 5500, status: "draft", date: "2026-05-15" },
];

const columns: ColumnDef<RecentInvoice>[] = [
  {
    accessorKey: "number",
    header: "Invoice",
    cell: ({ row }) => (
      <span className="font-mono text-xs font-medium">{formatInvoiceId(row.original.id)}</span>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {formatCurrency(row.original.amount)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.date)}</span>,
  },
];

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Finance Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your financial performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FinancialStatsCard
          title="Total Revenue"
          value={485000}
          icon={DollarSign}
          change={12.5}
          changeLabel="vs last month"
        />
        <FinancialStatsCard
          title="Paid Invoices"
          value={384000}
          icon={TrendingUp}
          change={8.2}
          changeLabel="vs last month"
        />
        <FinancialStatsCard
          title="Pending"
          value={72000}
          icon={Clock}
          change={-3.1}
          changeLabel="vs last month"
        />
        <FinancialStatsCard
          title="Overdue"
          value={29000}
          icon={AlertTriangle}
          change={5.7}
          changeLabel="vs last month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-1 text-sm font-medium">Revenue Overview</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Monthly revenue vs expenses
          </p>
          <RevenueLineChart />
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-1 text-sm font-medium">Payment Status</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Paid vs pending vs overdue
          </p>
          <PaymentBarChart />
        </div>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-medium">Recent Invoices</h3>
        <p className="mb-4 text-xs text-muted-foreground">
          Latest 5 invoice transactions
        </p>
        <DataTable columns={columns} data={recentInvoices} pageSize={5} />
      </div>
    </div>
  );
}
