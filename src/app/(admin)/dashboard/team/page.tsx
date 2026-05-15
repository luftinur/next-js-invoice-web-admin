"use client";

import { BalanceCard } from "@/components/ui/balance-card";
import { Users, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

export default function TeamDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Team Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Team tasks, activity, and approvals
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BalanceCard label="Team Members" amount={12} icon={<Users className="h-4 w-4" />} />
        <BalanceCard label="Pending Approvals" amount={5} icon={<Clock className="h-4 w-4" />} variant="warning" />
        <BalanceCard label="Completed Today" amount={18} icon={<CheckCircle2 className="h-4 w-4" />} variant="success" />
        <BalanceCard label="Overdue Tasks" amount={3} icon={<AlertTriangle className="h-4 w-4" />} variant="destructive" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-4 text-sm font-medium">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { user: "Sarah Chen", action: "approved invoice INV-000042", time: "2 min ago" },
              { user: "Mike Ross", action: "created new invoice INV-000043", time: "15 min ago" },
              { user: "Rachel Zane", action: "sent quotation QTE-0012", time: "1 hour ago" },
              { user: "Harvey Spector", action: "marked invoice INV-000038 as paid", time: "2 hours ago" },
              { user: "Donna Paulsen", action: "added new customer Stark Industries", time: "3 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {activity.user.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p>
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-4 text-sm font-medium">Approval Queue</h3>
          <div className="space-y-3">
            {[
              { invoice: "INV-000039", user: "Acme Corp", amount: 12500 },
              { invoice: "INV-000040", user: "Globex Inc", amount: 8400 },
              { invoice: "INV-000041", user: "Initech", amount: 3200 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{item.invoice}</p>
                  <p className="text-xs text-muted-foreground">{item.user}</p>
                </div>
                <p className="text-sm font-medium tabular-nums">
                  ${item.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
