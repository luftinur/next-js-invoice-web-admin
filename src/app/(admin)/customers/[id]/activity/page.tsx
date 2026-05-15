"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock } from "lucide-react";
import { formatDateTime } from "@/lib/formatting";

const activities = [
  { action: "Invoice INV-000001 was paid", time: "2026-05-14T09:30:00", type: "payment" },
  { action: "Invoice INV-000003 became overdue", time: "2026-05-01T00:00:00", type: "warning" },
  { action: "New invoice INV-000005 created", time: "2026-05-15T14:00:00", type: "create" },
  { action: "Customer profile updated", time: "2026-05-10T11:22:00", type: "update" },
  { action: "Invoice INV-000004 sent via email", time: "2026-05-09T08:15:00", type: "email" },
];

export default function CustomerActivityPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-3 border-b py-3 last:border-0">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted shrink-0 mt-0.5">
                <Activity className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{a.action}</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDateTime(a.time)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
