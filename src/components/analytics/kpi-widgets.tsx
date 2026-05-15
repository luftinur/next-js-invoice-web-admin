import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage } from "@/lib/formatting";
import { TrendingUp, TrendingDown, Users, Receipt, Banknote, Percent } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  trend?: { value: number; positive: boolean };
  icon: React.ReactNode;
  className?: string;
}

function KpiCard({ title, value, trend, icon, className }: KpiCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          {icon}
        </div>
        {trend && (
          <span className={cn("flex items-center gap-0.5 text-xs font-medium", trend.positive ? "text-success" : "text-destructive")}>
            {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{title}</p>
    </div>
  );
}

export interface AnalyticsData {
  mrr: number;
  arr: number;
  churnRate: number;
  paidRatio: number;
  outstandingRevenue: number;
  collectionRate: number;
}

export function KpiWidgets({ data, className }: { data: AnalyticsData; className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      <KpiCard title="Monthly Recurring Revenue" value={formatCurrency(data.mrr)} icon={<Receipt className="h-5 w-5 text-muted-foreground" />} />
      <KpiCard title="Annual Recurring Revenue" value={formatCurrency(data.arr)} icon={<Banknote className="h-5 w-5 text-muted-foreground" />} />
      <KpiCard
        title="Churn Rate"
        value={formatPercentage(data.churnRate)}
        trend={{ value: 0.5, positive: data.churnRate < 0.05 }}
        icon={<Percent className="h-5 w-5 text-muted-foreground" />}
      />
      <KpiCard
        title="Paid Ratio"
        value={formatPercentage(data.paidRatio)}
        trend={{ value: 2.1, positive: true }}
        icon={<Receipt className="h-5 w-5 text-muted-foreground" />}
      />
      <KpiCard title="Outstanding Revenue" value={formatCurrency(data.outstandingRevenue)} icon={<Banknote className="h-5 w-5 text-muted-foreground" />} />
      <KpiCard
        title="Collection Rate"
        value={formatPercentage(data.collectionRate)}
        trend={{ value: 1.8, positive: true }}
        icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
      />
    </div>
  );
}

export { KpiCard };
