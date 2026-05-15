import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/formatting";
import { CreditCard, CheckCircle2, Clock, AlertTriangle, Ban, ArrowLeftRight } from "lucide-react";

interface PaymentEvent {
  id: string;
  type: "initiated" | "processed" | "settled" | "failed" | "refunded" | "disputed";
  date: string;
  description: string;
}

const eventIcons: Record<string, React.ReactNode> = {
  initiated: <CreditCard className="h-4 w-4" />,
  processed: <ArrowLeftRight className="h-4 w-4" />,
  settled: <CheckCircle2 className="h-4 w-4" />,
  failed: <AlertTriangle className="h-4 w-4" />,
  refunded: <Ban className="h-4 w-4" />,
  disputed: <Clock className="h-4 w-4" />,
};

const eventColors: Record<string, string> = {
  initiated: "bg-muted text-muted-foreground",
  processed: "bg-info/10 text-info",
  settled: "bg-success/10 text-success",
  failed: "bg-destructive/10 text-destructive",
  refunded: "bg-warning/10 text-warning",
  disputed: "bg-warning/10 text-warning",
};

interface PaymentTimelineProps {
  events: PaymentEvent[];
  className?: string;
}

export function PaymentTimeline({ events, className }: PaymentTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
          {index < events.length - 1 && (
            <div className="absolute left-[15px] top-8 h-full w-px bg-border" />
          )}
          <div
            className={cn(
              "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              eventColors[event.type] || "bg-muted text-muted-foreground"
            )}
          >
            {eventIcons[event.type] || <Clock className="h-4 w-4" />}
          </div>
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium">{event.description}</p>
            <p className="text-xs text-muted-foreground">{formatDateTime(event.date)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
