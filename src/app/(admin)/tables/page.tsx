"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { StickyTable } from "@/components/tables/sticky-table";
import { ExpandableTable } from "@/components/tables/expandable-table";
import { ServerSideTable } from "@/components/tables/server-side-table";
import { SavedFilters } from "@/components/tables/saved-filters";
import { DensitySwitch } from "@/components/tables/density-switch";
import { type ColumnDef, type Row } from "@tanstack/react-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileSpreadsheet } from "lucide-react";
import { exportToExcel } from "@/lib/export-utils";
import { useState } from "react";

interface UserRecord { id: string; name: string; email: string; role: string; status: string; lastActive: string; }
interface InvoiceRecord { id: string; number: string; customer: string; amount: number; status: string; date: string; }

const users: UserRecord[] = [
  { id: "1", name: "Alice Johnson", email: "alice@acme.com", role: "Admin", status: "active", lastActive: "2026-05-14" },
  { id: "2", name: "Bob Smith", email: "bob@globex.com", role: "Editor", status: "active", lastActive: "2026-05-13" },
  { id: "3", name: "Carol White", email: "carol@initech.com", role: "Viewer", status: "inactive", lastActive: "2026-04-28" },
  { id: "4", name: "David Brown", email: "david@umbrella.com", role: "Editor", status: "active", lastActive: "2026-05-15" },
  { id: "5", name: "Eve Davis", email: "eve@stark.com", role: "Admin", status: "active", lastActive: "2026-05-12" },
];

const invoices: InvoiceRecord[] = [
  { id: "1", number: "INV-001", customer: "Acme Corp", amount: 4500, status: "paid", date: "2026-05-01" },
  { id: "2", number: "INV-002", customer: "Globex Inc", amount: 8200, status: "pending", date: "2026-05-05" },
  { id: "3", number: "INV-003", customer: "Initech", amount: 2300, status: "overdue", date: "2026-04-20" },
  { id: "4", number: "INV-004", customer: "Umbrella Co", amount: 12000, status: "paid", date: "2026-05-10" },
  { id: "5", number: "INV-005", customer: "Stark Industries", amount: 15500, status: "draft", date: "2026-05-15" },
];

const userColumns: ColumnDef<UserRecord>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role", cell: ({ row }) => <Badge variant="outline">{row.original.role}</Badge> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <StatusBadge status={row.original.status} /> },
  { accessorKey: "lastActive", header: "Last Active", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.lastActive)}</span> },
];

const invoiceColumns: ColumnDef<InvoiceRecord>[] = [
  { accessorKey: "number", header: "Number" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "amount", header: () => <div className="text-right">Amount</div>, cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}</div> },
  { accessorKey: "status", header: () => <div className="text-center">Status</div>, cell: ({ row }) => <div className="flex justify-center"><StatusBadge status={row.original.status} /></div> },
  { accessorKey: "date", header: "Date", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.date)}</span> },
];

const serverData: InvoiceRecord[] = Array.from({ length: 53 }, (_, i) => ({
  id: String(i + 1),
  number: `INV-${String(i + 1).padStart(3, "0")}`,
  customer: ["Acme Corp", "Globex Inc", "Initech", "Umbrella Co", "Stark Industries"][i % 5],
  amount: Math.floor(Math.random() * 15000) + 500,
  status: ["paid", "pending", "overdue", "draft"][i % 4],
  date: `2026-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
}));

export default function TablesShowcasePage() {
  const [serverPage, setServerPage] = useState(0);
  const pageSize = 10;
  const totalPages = Math.ceil(serverData.length / pageSize);
  const pageData = serverData.slice(serverPage * pageSize, (serverPage + 1) * pageSize);

  const handleExportExcel = () => {
    exportToExcel(invoices, [
      { header: "Invoice", accessor: (r) => r.number as string },
      { header: "Customer", accessor: (r) => r.customer as string },
      { header: "Amount", accessor: (r) => r.amount as number },
      { header: "Status", accessor: (r) => r.status as string },
      { header: "Date", accessor: (r) => r.date as string },
    ], "invoices-export");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Tables</h1>
        <p className="text-sm text-muted-foreground">Data table system with 6 variants</p>
      </div>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="sticky">Sticky</TabsTrigger>
          <TabsTrigger value="expandable">Expandable</TabsTrigger>
          <TabsTrigger value="server">Server-side</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
          <TabsTrigger value="filters">Saved Filters</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Standard DataTable with sorting, pagination, selection</p>
            <DensitySwitch />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Users Table</CardTitle>
              <CardDescription>Basic table with sorting and pagination</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={userColumns} data={users} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Invoices Table</CardTitle>
              <CardDescription>Formatted currency, status badges, CSV export</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={invoiceColumns} data={invoices} exportFileName="invoices" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sticky" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sticky Header</CardTitle>
              <CardDescription>Header stays visible while scrolling through many rows</CardDescription>
            </CardHeader>
            <CardContent>
              <StickyTable columns={userColumns} data={[...users, ...users, ...users, ...users]} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expandable" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Expandable Rows</CardTitle>
              <CardDescription>Click to expand rows with additional detail content</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpandableTable
                columns={userColumns}
                data={users}
                getRowCanExpand={() => true}
                renderSubRow={(row: Row<UserRecord>) => (
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Full Name:</span> {row.original.name}</p>
                    <p><span className="font-medium">Email:</span> {row.original.email}</p>
                    <p><span className="font-medium">Role:</span> {row.original.role}</p>
                    <p><span className="font-medium">Status:</span> {row.original.status}</p>
                    <p><span className="font-medium">Last Active:</span> {formatDate(row.original.lastActive)}</p>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="server" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Server-Side Pagination</CardTitle>
              <CardDescription>53 records, 10 per page — simulated server pagination</CardDescription>
            </CardHeader>
            <CardContent>
              <ServerSideTable
                columns={invoiceColumns}
                data={pageData}
                pageCount={totalPages}
                pageIndex={serverPage}
                pageSize={pageSize}
                total={serverData.length}
                onPageChange={setServerPage}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Excel Export</CardTitle>
              <CardDescription>Export table data to .xlsx format using xlsx library</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-6 text-center">
                <FileSpreadsheet className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Export 5 invoices to Excel</p>
                <p className="text-xs text-muted-foreground mt-1">Invoice Number, Customer, Amount, Status, Date</p>
                <Button onClick={handleExportExcel} className="mt-4 gap-2 cursor-pointer">
                  <Download className="h-4 w-4" /> Export Excel
                </Button>
              </div>
              <DataTable columns={invoiceColumns} data={invoices} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filters" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Saved Filters</CardTitle>
                  <CardDescription>Save and restore filter configurations</CardDescription>
                </div>
                <SavedFilters
                  page="invoices"
                  currentFilters={{}}
                  onApply={(f) => console.log("Applied filters:", f)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <DataTable columns={invoiceColumns} data={invoices} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
