"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { BillingSummary } from "@/components/invoice/billing-summary";
import { SubscriptionCard } from "@/components/subscription/subscription-card";
import { PlanBadge } from "@/components/subscription/plan-badge";
import { RenewalTimeline } from "@/components/subscription/renewal-timeline";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const plans = [
  { name: "Starter", price: 29, interval: "monthly", features: ["Up to 50 invoices", "1 user", "Basic reports"], popular: false },
  { name: "Professional", price: 79, interval: "monthly", features: ["Unlimited invoices", "5 users", "Advanced reports", "API access"], popular: true },
  { name: "Enterprise", price: 199, interval: "monthly", features: ["Everything in Pro", "Unlimited users", "Custom integrations", "Priority support"], popular: false },
];

interface SubscriptionRow {
  id: string;
  customer: string;
  plan: string;
  amount: number;
  status: "active" | "trialing" | "past_due" | "canceled";
  nextBilling: string;
}

const subscriptions: SubscriptionRow[] = [
  { id: "1", customer: "Acme Corp", plan: "Professional", amount: 79, status: "active", nextBilling: "2026-06-01" },
  { id: "2", customer: "Globex Inc", plan: "Enterprise", amount: 199, status: "active", nextBilling: "2026-06-15" },
  { id: "3", customer: "Initech", plan: "Starter", amount: 29, status: "trialing", nextBilling: "2026-06-10" },
  { id: "4", customer: "Umbrella Co", plan: "Professional", amount: 79, status: "past_due", nextBilling: "2026-05-01" },
  { id: "5", customer: "Stark Industries", plan: "Enterprise", amount: 199, status: "active", nextBilling: "2026-07-01" },
];

const columns: ColumnDef<SubscriptionRow>[] = [
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "plan", header: "Plan", cell: ({ row }) => <PlanBadge plan={row.original.plan} /> },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.amount)}<span className="text-muted-foreground text-xs">/mo</span></div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="flex justify-center"><StatusBadge status={row.original.status} /></div>,
  },
  { accessorKey: "nextBilling", header: "Next Billing" },
];

export default function SubscriptionListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Subscriptions</h1>
        <p className="text-sm text-muted-foreground">All active and past subscriptions</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {subscriptions.filter((s) => s.status === "active").slice(0, 3).map((sub) => (
          <BillingSummary
            key={sub.id}
            planName={sub.plan}
            amount={sub.amount}
            interval="monthly"
            status={sub.status}
            nextBilling={sub.nextBilling}
          />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Renewal Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <RenewalTimeline
              events={[
                { date: "2026-05-01", label: "May Renewal", status: "completed" },
                { date: "2026-06-01", label: "June Renewal", status: "upcoming" },
                { date: "2026-07-01", label: "July Renewal", status: "upcoming" },
              ]}
            />
          </CardContent>
        </Card>
        {subscriptions.filter((s) => s.status === "active").map((sub) => (
          <SubscriptionCard
            key={sub.id}
            customer={sub.customer}
            plan={sub.plan}
            amount={sub.amount}
            interval="monthly"
            status={sub.status}
            nextBilling={sub.nextBilling}
            usage={{ label: "Invoices", used: sub.amount > 100 ? 42 : 18, limit: 100 }}
          />
        ))}
      </div>

      <h2 className="text-lg font-semibold tracking-tight pt-4">Available Plans</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn("flex flex-col h-full", plan.popular && "border-primary relative")}>
            {plan.popular && (
              <span className="absolute right-2 inline-flex items-center rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                Popular
              </span>
            )}
            <CardHeader>
              <CardTitle className="text-base">{plan.name}</CardTitle>
              <p className="text-2xl font-bold">${plan.price}<span className="text-sm font-normal text-muted-foreground">/{plan.interval}</span></p>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-3">
              <div className="flex-1 space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    {f}
                  </div>
                ))}
              </div>
              <Button className="w-full mt-auto" variant={plan.popular ? "default" : "outline"}>
                {plan.popular ? "Subscribe" : "Choose Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
