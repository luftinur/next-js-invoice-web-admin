import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { InvoiceStatus, PaymentStatus, SubscriptionStatus } from "@/types";

const statusStyles: Record<string, string> = {
  paid: "bg-success/10 text-success hover:bg-success/20 border-success/20",
  pending: "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20",
  overdue: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
  draft: "bg-muted text-muted-foreground hover:bg-muted/80 border-border",
  cancelled: "bg-muted text-muted-foreground hover:bg-muted/80 border-border",
  refunded: "bg-info/10 text-info hover:bg-info/20 border-info/20",
  succeeded: "bg-success/10 text-success hover:bg-success/20 border-success/20",
  failed: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
  active: "bg-success/10 text-success hover:bg-success/20 border-success/20",
  trialing: "bg-info/10 text-info hover:bg-info/20 border-info/20",
  past_due: "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20",
  canceled: "bg-muted text-muted-foreground hover:bg-muted/80 border-border",
  incomplete: "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20",
  sent: "bg-info/10 text-info hover:bg-info/20 border-info/20",
  accepted: "bg-success/10 text-success hover:bg-success/20 border-success/20",
  declined: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
  expired: "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20",
  approved: "bg-success/10 text-success hover:bg-success/20 border-success/20",
  rejected: "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20",
  reimbursed: "bg-info/10 text-info hover:bg-info/20 border-info/20",
  on_hold: "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20",
  completed: "bg-success/10 text-success hover:bg-success/20 border-success/20",
};

const statusLabels: Record<string, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  draft: "Draft",
  cancelled: "Cancelled",
  refunded: "Refunded",
  succeeded: "Succeeded",
  failed: "Failed",
  active: "Active",
  trialing: "Trial",
  past_due: "Past Due",
  canceled: "Canceled",
  incomplete: "Incomplete",
};

interface StatusBadgeProps {
  status: InvoiceStatus | PaymentStatus | SubscriptionStatus | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium capitalize",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status] || status}
    </Badge>
  );
}
