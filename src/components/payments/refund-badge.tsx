import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const refundStyles: Record<string, string> = {
  issued: "bg-info/10 text-info border-info/20",
  applied: "bg-success/10 text-success border-success/20",
  void: "bg-muted text-muted-foreground border-border",
  pending: "bg-warning/10 text-warning border-warning/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const refundLabels: Record<string, string> = {
  issued: "Issued",
  applied: "Applied",
  void: "Void",
  pending: "Pending",
  rejected: "Rejected",
};

interface RefundBadgeProps {
  status: string;
  className?: string;
}

export function RefundBadge({ status, className }: RefundBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize", refundStyles[status], className)}
    >
      {refundLabels[status] || status}
    </Badge>
  );
}
