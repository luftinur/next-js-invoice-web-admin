import { cn } from "@/lib/utils";
import { Users, UserPlus, UserCheck, UserX, TrendingUp, TrendingDown } from "lucide-react";

interface CustomerStatsItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: number; positive: boolean };
  variant?: "default" | "success" | "warning" | "destructive";
}

interface CustomerStatsProps {
  total: number;
  active: number;
  newThisMonth: number;
  churnRate: number;
  className?: string;
}

export function CustomerStats({ total, active, newThisMonth, churnRate, className }: CustomerStatsProps) {
  const stats: CustomerStatsItem[] = [
    {
      label: "Total Customers",
      value: total.toLocaleString(),
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
    },
    {
      label: "Active",
      value: active.toLocaleString(),
      icon: <UserCheck className="h-5 w-5 text-success" />,
      variant: "success",
      trend: { value: Math.round((active / total) * 100), positive: active / total > 0.7 },
    },
    {
      label: "New This Month",
      value: newThisMonth.toLocaleString(),
      icon: <UserPlus className="h-5 w-5 text-info" />,
      trend: { value: 12, positive: true },
    },
    {
      label: "Churn Rate",
      value: `${(churnRate * 100).toFixed(1)}%`,
      icon: <UserX className="h-5 w-5 text-destructive" />,
      variant: "destructive",
      trend: { value: Math.round(churnRate * 100), positive: churnRate < 0.05 },
    },
  ];

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "rounded-xl border bg-card p-4",
            stat.variant === "success" && "border-success/20 bg-success/5",
            stat.variant === "warning" && "border-warning/20 bg-warning/5",
            stat.variant === "destructive" && "border-destructive/20 bg-destructive/5"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              {stat.icon}
            </div>
            {stat.trend && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  stat.trend.positive ? "text-success" : "text-destructive"
                )}
              >
                {stat.trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {stat.trend.value}%
              </span>
            )}
          </div>
          <p className="mt-3 text-2xl font-semibold tabular-nums tracking-tight">{stat.value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
