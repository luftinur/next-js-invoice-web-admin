"use client";

import { RevenueLineChart } from "@/components/charts/revenue-line-chart";
import { FinancialStatsCard } from "@/components/ui/financial-stats-card";
import { ComparisonCards } from "@/components/reports/comparison-cards";
import { FinancialHeatmap } from "@/components/reports/financial-heatmap";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";

const heatmapData = [
  [
    { label: "Jan", value: 24000 },
    { label: "Feb", value: 32000 },
    { label: "Mar", value: 28000 },
    { label: "Apr", value: 45000 },
    { label: "May", value: 52000 },
    { label: "Jun", value: 48000 },
    { label: "Jul", value: 58000 },
    { label: "Aug", value: 63000 },
    { label: "Sep", value: 55000 },
    { label: "Oct", value: 67000 },
    { label: "Nov", value: 72000 },
    { label: "Dec", value: 81000 },
  ],
];

export default function RevenueReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Revenue Reports</h1>
          <p className="text-sm text-muted-foreground">Monthly and yearly revenue analysis</p>
        </div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export Report</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <FinancialStatsCard title="Total Revenue" value={485000} icon={TrendingUp} change={12.5} changeLabel="vs last year" />
        <FinancialStatsCard title="Monthly Average" value={40417} icon={TrendingUp} change={8.3} changeLabel="vs last year" />
        <FinancialStatsCard title="Best Month" value={81000} icon={TrendingUp} change={15.2} changeLabel="December" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <ComparisonCards
          title="Revenue Comparison"
          current={{ label: "This Year", value: 485000 }}
          previous={{ label: "Last Year", value: 412000 }}
        />
        <ComparisonCards
          title="Expense Comparison"
          current={{ label: "This Year", value: 228000 }}
          previous={{ label: "Last Year", value: 195000 }}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-4">
          <h3 className="text-sm font-medium mb-4">Revenue Trend</h3>
          <RevenueLineChart />
        </div>
        <div className="rounded-xl border bg-card p-4">
          <FinancialHeatmap data={heatmapData} title="Monthly Revenue Density" />
        </div>
      </div>
    </div>
  );
}
