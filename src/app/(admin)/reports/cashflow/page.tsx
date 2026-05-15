"use client";

import { BalanceCard } from "@/components/ui/balance-card";
import { CashflowChart } from "@/components/charts/cashflow-chart";

export default function CashflowReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Cashflow Reports</h1>
        <p className="text-sm text-muted-foreground">Cash inflow and outflow analysis</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <BalanceCard label="Operating Cashflow" amount={257000} trend={{ value: 12.3, positive: true }} />
        <BalanceCard label="Free Cashflow" amount={185000} trend={{ value: 8.7, positive: true }} variant="success" />
        <BalanceCard label="Net Cashflow" amount={72000} trend={{ value: -2.1, positive: false }} variant="warning" />
      </div>
      <div className="rounded-xl border bg-card p-6">
        <h3 className="mb-4 text-sm font-medium">Cashflow Trend</h3>
        <CashflowChart />
      </div>
    </div>
  );
}
