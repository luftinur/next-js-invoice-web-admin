"use client";

import { useState } from "react";
import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Download,
  Search,
  SlidersHorizontal,
  ChevronDown,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate, formatInvoiceId } from "@/lib/formatting";
import { DueDateAlert } from "@/components/invoice/due-date-alert";
import { AmountBadge } from "@/components/ui/amount-badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface InvoiceRecord {
  id: string;
  number: string;
  customer: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "draft" | "cancelled";
  dueDate: string;
  issuedDate: string;
}

const invoices: InvoiceRecord[] = [
  { id: "1", number: "INV-000001", customer: "Acme Corp", email: "billing@acme.com", amount: 4500, status: "paid", dueDate: "2026-05-01", issuedDate: "2026-04-15" },
  { id: "2", number: "INV-000002", customer: "Globex Inc", email: "ap@globex.com", amount: 8200, status: "pending", dueDate: "2026-05-30", issuedDate: "2026-05-01" },
  { id: "3", number: "INV-000003", customer: "Initech", email: "payables@initech.com", amount: 2300, status: "overdue", dueDate: "2026-04-15", issuedDate: "2026-03-20" },
  { id: "4", number: "INV-000004", customer: "Umbrella Co", email: "finance@umbrella.com", amount: 12000, status: "paid", dueDate: "2026-05-10", issuedDate: "2026-04-25" },
  { id: "5", number: "INV-000005", customer: "Stark Industries", email: "accounts@stark.com", amount: 5500, status: "draft", dueDate: "2026-06-01", issuedDate: "2026-05-12" },
  { id: "6", number: "INV-000006", customer: "Wayne Enterprises", email: "billing@wayne.com", amount: 18000, status: "pending", dueDate: "2026-06-15", issuedDate: "2026-05-14" },
  { id: "7", number: "INV-000007", customer: "Oscorp", email: "finance@oscorp.com", amount: 3400, status: "overdue", dueDate: "2026-04-01", issuedDate: "2026-03-10" },
  { id: "8", number: "INV-000008", customer: "Massive Dynamic", email: "ap@massive.com", amount: 9500, status: "paid", dueDate: "2026-05-20", issuedDate: "2026-04-28" },
  { id: "9", number: "INV-000009", customer: "Cyberdyne Systems", email: "billing@cyberdyne.com", amount: 7200, status: "cancelled", dueDate: "2026-05-05", issuedDate: "2026-04-10" },
  { id: "10", number: "INV-000010", customer: "Soylent Corp", email: "payments@soylent.com", amount: 2800, status: "pending", dueDate: "2026-06-10", issuedDate: "2026-05-08" },
];

const columns: ColumnDef<InvoiceRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: "Invoice",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <FileText className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <Link href={`/invoices/${row.original.id}`} className="font-mono text-sm font-medium hover:underline">
            {row.original.number}
          </Link>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.customer}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right">
        <AmountBadge amount={row.original.amount} status={row.original.status} />
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
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{formatDate(row.original.dueDate)}</span>
        <DueDateAlert dueDate={row.original.dueDate} />
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger className={cn("flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted")}>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Send</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function InvoiceListPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your invoices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Link href="/invoices/create">
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New Invoice
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={invoices}
        toolbar={
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-64 pl-9"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              Status
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Badge variant="outline" className="h-9 rounded-md px-3 text-sm font-normal">
              {invoices.length} total
            </Badge>
          </div>
        }
      />
    </div>
  );
}
