import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatting";
import { CheckCircle2, Clock, AlertTriangle, Ban } from "lucide-react";

interface RenewalEvent {
  date: string;
  label: string;
  status: "upcoming" | "completed" | "failed" | "skipped";
}

interface RenewalTimelineProps {
  events: RenewalEvent[];
  className?: string;
}

const statusIcons: Record<string, React.ReactNode> = {
  upcoming: <Clock className="h-4 w-4" />,
  completed: <CheckCircle2 className="h-4 w-4" />,
  failed: <AlertTriangle className="h-4 w-4" />,
  skipped: <Ban className="h-4 w-4" />,
};

const statusColors: Record<string, string> = {
  upcoming: "bg-info/10 text-info",
  completed: "bg-success/10 text-success",
  failed: "bg-destructive/10 text-destructive",
  skipped: "bg-muted text-muted-foreground",
};

export function RenewalTimeline({ events, className }: RenewalTimelineProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {events.map((event, index) => (
        <div key={index} className="relative flex gap-4 pb-6 last:pb-0">
          {index < events.length - 1 && (
            <div className="absolute left-[15px] top-8 h-full w-px bg-border" />
          )}
          <div
            className={cn(
              "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
              statusColors[event.status]
            )}
          >
            {statusIcons[event.status]}
          </div>
          <div className="flex-1 pt-1">
            <p className="text-sm font-medium">{event.label}</p>
            <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
