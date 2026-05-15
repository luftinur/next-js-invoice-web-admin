import { cn } from "@/lib/utils";

const dotStyles: Record<string, string> = {
  succeeded: "bg-success",
  paid: "bg-success",
  pending: "bg-warning",
  failed: "bg-destructive",
  refunded: "bg-info",
  cancelled: "bg-muted-foreground",
  overdue: "bg-destructive",
  active: "bg-success",
  trialing: "bg-info",
  past_due: "bg-warning",
};

const indicatorLabels: Record<string, string> = {
  succeeded: "Paid",
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
  refunded: "Refunded",
  cancelled: "Cancelled",
  overdue: "Overdue",
  active: "Active",
  trialing: "Trial",
  past_due: "Past Due",
};

interface PaymentIndicatorProps {
  status: string;
  showLabel?: boolean;
  className?: string;
}

export function PaymentIndicator({ status, showLabel = true, className }: PaymentIndicatorProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("inline-block h-2 w-2 rounded-full", dotStyles[status] ?? "bg-muted-foreground")} />
      {showLabel && (
        <span className="text-xs font-medium">{indicatorLabels[status] ?? status}</span>
      )}
    </span>
  );
}
