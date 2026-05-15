import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatting";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface FinancialStatsCardProps {
  title: string;
  value: number;
  currency?: string;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  className?: string;
}

export function FinancialStatsCard({
  title,
  value,
  currency = "USD",
  icon: Icon,
  change,
  changeLabel,
  className,
}: FinancialStatsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-foreground" />
        </div>
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
        {formatCurrency(value, currency)}
      </p>
      {change !== undefined && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositive ? "+" : ""}
            {change}%
          </span>
          {changeLabel && (
            <span className="text-muted-foreground">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
