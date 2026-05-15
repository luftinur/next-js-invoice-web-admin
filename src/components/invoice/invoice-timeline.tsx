import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/formatting";
import { CheckCircle2, Clock, Send, AlertTriangle, FileText, Ban } from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "created" | "sent" | "viewed" | "paid" | "overdue" | "cancelled" | "refunded" | "reminder";
  date: string;
  description: string;
}

const eventIcons: Record<string, React.ReactNode> = {
  created: <FileText className="h-4 w-4" />,
  sent: <Send className="h-4 w-4" />,
  viewed: <Clock className="h-4 w-4" />,
  paid: <CheckCircle2 className="h-4 w-4" />,
  overdue: <AlertTriangle className="h-4 w-4" />,
  cancelled: <Ban className="h-4 w-4" />,
  refunded: <Ban className="h-4 w-4" />,
  reminder: <Send className="h-4 w-4" />,
};

const eventColors: Record<string, string> = {
  created: "bg-muted text-muted-foreground",
  sent: "bg-info/10 text-info",
  viewed: "bg-muted text-muted-foreground",
  paid: "bg-success/10 text-success",
  overdue: "bg-destructive/10 text-destructive",
  cancelled: "bg-muted text-muted-foreground",
  refunded: "bg-info/10 text-info",
  reminder: "bg-warning/10 text-warning",
};

interface InvoiceTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function InvoiceTimeline({ events, className }: InvoiceTimelineProps) {
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
