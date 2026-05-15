"use client";

import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CustomerStats } from "@/components/customer/customer-stats";
import { CompanyAvatar } from "@/components/customer/company-avatar";

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  company: string;
  totalInvoiced: number;
  status: "active" | "inactive" | "lead";
  createdAt: string;
}

const customers: CustomerRecord[] = [
  { id: "1", name: "John Smith", email: "john@acme.com", company: "Acme Corp", totalInvoiced: 45000, status: "active", createdAt: "2025-01-15" },
  { id: "2", name: "Sarah Johnson", email: "sarah@globex.com", company: "Globex Inc", totalInvoiced: 82000, status: "active", createdAt: "2025-03-20" },
  { id: "3", name: "Mike Wilson", email: "mike@initech.com", company: "Initech", totalInvoiced: 23000, status: "active", createdAt: "2025-02-10" },
  { id: "4", name: "Emily Davis", email: "emily@umbrella.com", company: "Umbrella Co", totalInvoiced: 120000, status: "active", createdAt: "2024-11-01" },
  { id: "5", name: "Tony Stark", email: "tony@stark.com", company: "Stark Industries", totalInvoiced: 155000, status: "active", createdAt: "2024-08-15" },
  { id: "6", name: "Bruce Wayne", email: "bruce@wayne.com", company: "Wayne Enterprises", totalInvoiced: 98000, status: "inactive", createdAt: "2025-04-01" },
  { id: "7", name: "Peter Parker", email: "peter@oscorp.com", company: "Oscorp", totalInvoiced: 14000, status: "lead", createdAt: "2026-05-01" },
];

const columns: ColumnDef<CustomerRecord>[] = [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <CompanyAvatar name={row.original.name} size="sm" showName={false} />
        <div>
          <Link href={`/customers/${row.original.id}`} className="text-sm font-medium hover:underline">{row.original.name}</Link>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  { accessorKey: "company", header: "Company" },
  {
    accessorKey: "totalInvoiced",
    header: () => <div className="text-right">Total Invoiced</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.totalInvoiced)}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="flex justify-center"><StatusBadge status={row.original.status} /></div>,
  },
  {
    accessorKey: "createdAt",
    header: "Customer Since",
    cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>,
  },
];

export default function CustomerListPage() {
  const activeCount = customers.filter((c) => c.status === "active").length;
  const newThisMonth = customers.filter((c) => {
    const d = new Date(c.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground">{customers.length} total customers</p>
        </div>
        <Link href="/customers/create">
          <Button size="sm"><Plus className="h-4 w-4" /> Add Customer</Button>
        </Link>
      </div>
      <CustomerStats total={customers.length} active={activeCount} newThisMonth={newThisMonth} churnRate={0.028} />
      <DataTable columns={columns} data={customers} />
    </div>
  );
}
