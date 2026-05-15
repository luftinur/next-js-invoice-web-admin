import { cn } from "@/lib/utils";

interface UsageMeterProps {
  label: string;
  used: number;
  limit: number;
  unit?: string;
  showPercentage?: boolean;
  className?: string;
}

export function UsageMeter({ label, used, limit, unit, showPercentage = true, className }: UsageMeterProps) {
  const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const isNearLimit = percentage >= 80;
  const isAtLimit = percentage >= 100;

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("font-medium tabular-nums", isAtLimit && "text-destructive", isNearLimit && !isAtLimit && "text-warning")}>
          {used.toLocaleString()}{unit ? ` ${unit}` : ""} / {limit.toLocaleString()}{unit ? ` ${unit}` : ""}
          {showPercentage && <span className="text-muted-foreground ml-1">({percentage.toFixed(0)}%)</span>}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300",
            isAtLimit ? "bg-destructive" : isNearLimit ? "bg-warning" : "bg-success"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
