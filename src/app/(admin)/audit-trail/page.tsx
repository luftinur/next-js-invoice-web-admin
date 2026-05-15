"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/formatting";

interface AuditEntry {
  id: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

const auditLogs: AuditEntry[] = [
  { id: "1", user: "john@invoicecore.io", action: "invoice.create", details: "Created INV-000010", ipAddress: "192.168.1.1", timestamp: "2026-05-14T10:30:00" },
  { id: "2", user: "sarah@invoicecore.io", action: "payment.approve", details: "Approved payment $9,500", ipAddress: "192.168.1.2", timestamp: "2026-05-14T09:15:00" },
  { id: "3", user: "mike@invoicecore.io", action: "customer.update", details: "Updated Acme Corp address", ipAddress: "10.0.0.5", timestamp: "2026-05-13T16:45:00" },
];

const columns: ColumnDef<AuditEntry>[] = [
  { accessorKey: "user", header: "User", cell: ({ row }) => <span className="font-mono text-xs">{row.original.user}</span> },
  { accessorKey: "action", header: "Action", cell: ({ row }) => <span className="font-mono text-xs">{row.original.action}</span> },
  { accessorKey: "details", header: "Details" },
  { accessorKey: "ipAddress", header: "IP Address", cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.original.ipAddress}</span> },
  { accessorKey: "timestamp", header: "Time", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.timestamp)}</span> },
];

export default function AuditTrailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Audit Trail</h1>
        <p className="text-sm text-muted-foreground">Immutable audit log of system changes</p>
      </div>
      <DataTable columns={columns} data={auditLogs} />
    </div>
  );
}
