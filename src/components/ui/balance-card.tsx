import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatting";

interface BalanceCardProps {
  label: string;
  amount: number;
  currency?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
}

export function BalanceCard({
  label,
  amount,
  currency = "USD",
  icon: Icon,
  trend,
  variant = "default",
  className,
}: BalanceCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-4 transition-colors",
        variant === "success" && "border-success/20 bg-success/5",
        variant === "warning" && "border-warning/20 bg-warning/5",
        variant === "destructive" && "border-destructive/20 bg-destructive/5",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            {Icon}
          </div>
        )}
      </div>
      <p
        className={cn(
          "mt-1 text-2xl font-semibold tracking-tight tabular-nums",
          variant === "success" && "text-success",
          variant === "warning" && "text-warning",
          variant === "destructive" && "text-destructive"
        )}
      >
        {formatCurrency(amount, currency)}
      </p>
      {trend && (
        <p
          className={cn(
            "mt-1 text-xs",
            trend.positive ? "text-success" : "text-destructive"
          )}
        >
          {trend.positive ? "+" : ""}
          {trend.value}% from last month
        </p>
      )}
    </div>
  );
}
