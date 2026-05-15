"use client";

import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { GatewayIndicator } from "@/components/payments/gateway-indicator";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/formatting";

interface GatewayLog {
  id: string;
  gateway: string;
  event: string;
  status: "succeeded" | "failed";
  timestamp: string;
  reference: string;
}

const logs: GatewayLog[] = [
  { id: "1", gateway: "Stripe", event: "payment_intent.succeeded", status: "succeeded", timestamp: "2026-05-14T10:30:00", reference: "pi_3R7abc" },
  { id: "2", gateway: "PayPal", event: "checkout.order.approved", status: "succeeded", timestamp: "2026-05-14T09:15:00", reference: "ORD-12345" },
  { id: "3", gateway: "Stripe", event: "payment_intent.payment_failed", status: "failed", timestamp: "2026-05-13T14:20:00", reference: "pi_3R6xyz" },
];

const columns: ColumnDef<GatewayLog>[] = [
  { accessorKey: "gateway", header: "Gateway", cell: ({ row }) => <GatewayIndicator gateway={row.original.gateway} /> },
  { accessorKey: "event", header: "Event" },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="flex justify-center"><StatusBadge status={row.original.status} /></div>,
  },
  { accessorKey: "reference", header: "Reference", cell: ({ row }) => <span className="font-mono text-xs">{row.original.reference}</span> },
  { accessorKey: "timestamp", header: "Time", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.timestamp)}</span> },
];

export default function GatewayLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Gateway Logs</h1>
        <p className="text-sm text-muted-foreground">Payment gateway event logs</p>
      </div>
      <DataTable columns={columns} data={logs} />
    </div>
  );
}
