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
  ArrowDownCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type ExpenseStatus = "pending" | "approved" | "rejected" | "reimbursed";

interface ExpenseRecord {
  id: string;
  description: string;
  category: string;
  amount: number;
  status: ExpenseStatus;
  submittedBy: string;
  date: string;
}

const expenses: ExpenseRecord[] = [
  { id: "1", description: "Office supplies - Q2", category: "Office", amount: 450, status: "approved", submittedBy: "Jane Doe", date: "2026-05-02" },
  { id: "2", description: "AWS Cloud Services", category: "Software", amount: 2400, status: "pending", submittedBy: "John Smith", date: "2026-05-10" },
  { id: "3", description: "Client dinner - Acme Corp", category: "Travel", amount: 320, status: "approved", submittedBy: "Sarah Lee", date: "2026-04-28" },
  { id: "4", description: "New laptops for engineering", category: "Equipment", amount: 8500, status: "pending", submittedBy: "Mike Chen", date: "2026-05-15" },
  { id: "5", description: "Domain renewals", category: "Software", amount: 180, status: "reimbursed", submittedBy: "Jane Doe", date: "2026-04-20" },
  { id: "6", description: "Marketing campaign - May", category: "Marketing", amount: 3000, status: "rejected", submittedBy: "Sarah Lee", date: "2026-05-05" },
  { id: "7", description: "Office rent - May", category: "Office", amount: 5000, status: "approved", submittedBy: "Finance", date: "2026-05-01" },
  { id: "8", description: "Figma Enterprise Plan", category: "Software", amount: 1200, status: "pending", submittedBy: "Mike Chen", date: "2026-05-12" },
];

const statusStyles: Record<ExpenseStatus, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  reimbursed: "bg-info/10 text-info",
};

const columns: ColumnDef<ExpenseRecord>[] = [
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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <span className="text-sm font-medium">{row.original.description}</span>
          <p className="text-xs text-muted-foreground">by {row.original.submittedBy}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span className="text-sm">{row.original.category}</span>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}</div>
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
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{formatDate(row.original.date)}</span>,
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
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Reject</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function ExpensesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Expenses</h1>
          <p className="text-sm text-muted-foreground">Track and manage business expenses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={expenses}
        toolbar={
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search expenses..."
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
              {expenses.length} total
            </Badge>
          </div>
        }
      />
    </div>
  );
}
