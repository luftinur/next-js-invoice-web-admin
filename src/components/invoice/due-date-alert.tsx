import { differenceInDays, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { AlertTriangle, Clock } from "lucide-react";

interface DueDateAlertProps {
  dueDate: string;
  className?: string;
}

export function DueDateAlert({ dueDate, className }: DueDateAlertProps) {
  const now = new Date();
  const due = parseISO(dueDate);
  const daysUntilDue = differenceInDays(due, now);
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 7;

  if (!isOverdue && !isDueSoon) return null;

  if (isOverdue) {
    return (
      <div className={cn("inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive", className)}>
        <AlertTriangle className="h-3 w-3" />
        {Math.abs(daysUntilDue) === 0 ? "Due today" : `${Math.abs(daysUntilDue)}d overdue`}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-md bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning", className)}>
      <Clock className="h-3 w-3" />
      {daysUntilDue === 0 ? "Due today" : `${daysUntilDue}d remaining`}
    </div>
  );
}
