"use client";

import { BalanceCard } from "@/components/ui/balance-card";
import { FinancialStatsCard } from "@/components/ui/financial-stats-card";
import { GrowthAreaChart } from "@/components/charts/growth-area-chart";
import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { TrendingUp, Users, Repeat, BarChart3 } from "lucide-react";

export default function ExecutiveDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          High-level business metrics and growth
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FinancialStatsCard
          title="Monthly Recurring Revenue"
          value={58000}
          icon={TrendingUp}
          change={18.3}
          changeLabel="vs last quarter"
        />
        <FinancialStatsCard
          title="Annual Recurring Revenue"
          value={696000}
          icon={Repeat}
          change={22.1}
          changeLabel="vs last quarter"
        />
        <FinancialStatsCard
          title="Active Customers"
          value={1248}
          icon={Users}
          change={8.7}
          changeLabel="vs last month"
        />
        <FinancialStatsCard
          title="Churn Rate"
          value={3200}
          icon={BarChart3}
          change={-2.4}
          changeLabel="vs last month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-1 text-sm font-medium">MRR & ARR Growth</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Quarterly recurring revenue trends
          </p>
          <GrowthAreaChart />
        </div>
        <div className="rounded-xl border bg-card p-4">
          <h3 className="mb-1 text-sm font-medium">Expense Breakdown</h3>
          <p className="mb-4 text-xs text-muted-foreground">
            Distribution by category
          </p>
          <ExpensePieChart />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <BalanceCard
          label="Net Cashflow"
          amount={142000}
          trend={{ value: 15.4, positive: true }}
        />
        <BalanceCard
          label="Collection Rate"
          amount={87300}
          trend={{ value: 3.2, positive: true }}
          variant="success"
        />
        <BalanceCard
          label="Outstanding Revenue"
          amount={29000}
          trend={{ value: 8.1, positive: false }}
          variant="warning"
        />
      </div>
    </div>
  );
}
