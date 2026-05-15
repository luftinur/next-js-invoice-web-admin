"use client";

import { DataTable } from "@/components/tables/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/lib/formatting";

interface ActivityEntry {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
}

const activities: ActivityEntry[] = [
  { id: "1", user: "John Doe", action: "Created invoice", resource: "INV-000010", timestamp: "2026-05-14T10:30:00" },
  { id: "2", user: "Sarah Chen", action: "Approved payment", resource: "INV-000008", timestamp: "2026-05-14T09:15:00" },
  { id: "3", user: "Mike Ross", action: "Updated customer", resource: "Acme Corp", timestamp: "2026-05-13T16:45:00" },
  { id: "4", user: "John Doe", action: "Sent invoice", resource: "INV-000007", timestamp: "2026-05-13T14:20:00" },
];

const columns: ColumnDef<ActivityEntry>[] = [
  { accessorKey: "user", header: "User" },
  { accessorKey: "action", header: "Action" },
  { accessorKey: "resource", header: "Resource" },
  { accessorKey: "timestamp", header: "Time", cell: ({ row }) => <span className="text-muted-foreground">{formatDate(row.original.timestamp)}</span> },
];

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Activity Logs</h1>
        <p className="text-sm text-muted-foreground">Track all user activities</p>
      </div>
      <DataTable columns={columns} data={activities} />
    </div>
  );
}
