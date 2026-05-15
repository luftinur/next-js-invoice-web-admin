import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatting";

const amountStyles: Record<string, string> = {
  paid: "bg-success/10 text-success border-success/20",
  succeeded: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  refunded: "bg-info/10 text-info border-info/20",
  cancelled: "bg-muted text-muted-foreground border-border",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  draft: "bg-muted text-muted-foreground border-border",
};

interface AmountBadgeProps {
  amount: number;
  currency?: string;
  status?: string;
  className?: string;
}

export function AmountBadge({ amount, currency, status, className }: AmountBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-fit items-center rounded-md border px-2 py-0.5 text-xs font-medium tabular-nums",
        status ? amountStyles[status] ?? "bg-muted text-foreground border-border" : "bg-muted text-foreground border-border",
        className
      )}
    >
      {formatCurrency(amount, currency)}
    </span>
  );
}
