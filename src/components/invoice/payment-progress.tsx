import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage } from "@/lib/formatting";
import { CheckCircle2, Clock } from "lucide-react";

interface PaymentProgressProps {
  total: number;
  paid: number;
  currency?: string;
  className?: string;
}

export function PaymentProgress({ total, paid, currency, className }: PaymentProgressProps) {
  const percentage = total > 0 ? paid / total : 0;
  const isFullyPaid = paid >= total;
  const isPartial = paid > 0 && paid < total;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {isFullyPaid ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <Clock className="h-4 w-4 text-warning" />
          )}
          <span className="font-medium">
            {isFullyPaid ? "Paid in Full" : isPartial ? "Partially Paid" : "Unpaid"}
          </span>
        </div>
        <span className="text-muted-foreground">{formatPercentage(percentage)}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-2 rounded-full transition-all",
            isFullyPaid ? "bg-success" : "bg-warning"
          )}
          style={{ width: `${Math.min(percentage * 100, 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Paid: {formatCurrency(paid, currency)}</span>
        <span>Total: {formatCurrency(total, currency)}</span>
      </div>
    </div>
  );
}
