"use client";

import { ExpensePieChart } from "@/components/charts/expense-pie-chart";
import { FinancialStatsCard } from "@/components/ui/financial-stats-card";
import { ArrowDownCircle } from "lucide-react";

export default function ExpenseReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Expense Reports</h1>
        <p className="text-sm text-muted-foreground">Expense tracking and categorization</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <FinancialStatsCard title="Total Expenses" value={228000} icon={ArrowDownCircle} change={-5.2} changeLabel="vs last year" />
        <FinancialStatsCard title="Largest Category" value={95000} icon={ArrowDownCircle} />
        <FinancialStatsCard title="Avg Monthly" value={19000} icon={ArrowDownCircle} change={-3.1} changeLabel="vs last year" />
      </div>
      <div className="rounded-xl border bg-card p-4">
        <h3 className="text-sm font-medium mb-4">Expense by Category</h3>
        <ExpensePieChart />
      </div>
    </div>
  );
}
