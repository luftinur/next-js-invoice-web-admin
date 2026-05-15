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
  FileSignature,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate, formatQuoteId } from "@/lib/formatting";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type QuoteStatus = "draft" | "sent" | "accepted" | "declined" | "expired";

interface QuotationRecord {
  id: string;
  number: string;
  customer: string;
  email: string;
  amount: number;
  status: QuoteStatus;
  validUntil: string;
  issuedDate: string;
}

const quotations: QuotationRecord[] = [
  { id: "1", number: "QTE-000001", customer: "Acme Corp", email: "billing@acme.com", amount: 4500, status: "sent", validUntil: "2026-06-15", issuedDate: "2026-05-01" },
  { id: "2", number: "QTE-000002", customer: "Globex Inc", email: "ap@globex.com", amount: 8200, status: "draft", validUntil: "2026-06-30", issuedDate: "2026-05-10" },
  { id: "3", number: "QTE-000003", customer: "Initech", email: "payables@initech.com", amount: 2300, status: "accepted", validUntil: "2026-05-30", issuedDate: "2026-04-15" },
  { id: "4", number: "QTE-000004", customer: "Umbrella Co", email: "finance@umbrella.com", amount: 12000, status: "declined", validUntil: "2026-05-10", issuedDate: "2026-04-20" },
  { id: "5", number: "QTE-000005", customer: "Stark Industries", email: "accounts@stark.com", amount: 5500, status: "sent", validUntil: "2026-07-01", issuedDate: "2026-05-15" },
  { id: "6", number: "QTE-000006", customer: "Wayne Enterprises", email: "billing@wayne.com", amount: 18000, status: "expired", validUntil: "2026-05-01", issuedDate: "2026-03-15" },
  { id: "7", number: "QTE-000007", customer: "Oscorp", email: "finance@oscorp.com", amount: 3400, status: "draft", validUntil: "2026-07-15", issuedDate: "2026-05-20" },
  { id: "8", number: "QTE-000008", customer: "Massive Dynamic", email: "ap@massive.com", amount: 9500, status: "accepted", validUntil: "2026-06-20", issuedDate: "2026-05-05" },
];

const statusStyles: Record<QuoteStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-info/10 text-info",
  accepted: "bg-success/10 text-success",
  declined: "bg-destructive/10 text-destructive",
  expired: "bg-warning/10 text-warning",
};

const columns: ColumnDef<QuotationRecord>[] = [
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
    header: "Quote",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <FileSignature className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <span className="font-mono text-sm font-medium">{row.original.number}</span>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => <span className="text-sm">{row.original.customer}</span>,
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
    accessorKey: "validUntil",
    header: "Valid Until",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{formatDate(row.original.validUntil)}</span>,
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

export default function QuotationsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Quotations</h1>
          <p className="text-sm text-muted-foreground">Create and manage customer quotations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Quotation
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={quotations}
        toolbar={
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search quotations..."
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
              {quotations.length} total
            </Badge>
          </div>
        }
      />
    </div>
  );
}
