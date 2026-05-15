import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/formatting";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FileText,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  type LucideIcon,
} from "lucide-react";

const activityIcons: Record<string, LucideIcon> = {
  invoice_created: FileText,
  invoice_paid: CheckCircle2,
  invoice_overdue: AlertTriangle,
  customer_added: Users,
  payment_received: CreditCard,
  subscription_renewed: Clock,
  refund_issued: CreditCard,
  user_joined: Users,
};

const activityColors: Record<string, string> = {
  invoice_created: "bg-info/10 text-info",
  invoice_paid: "bg-success/10 text-success",
  invoice_overdue: "bg-destructive/10 text-destructive",
  customer_added: "bg-success/10 text-success",
  payment_received: "bg-success/10 text-success",
  subscription_renewed: "bg-info/10 text-info",
  refund_issued: "bg-warning/10 text-warning",
  user_joined: "bg-info/10 text-info",
};

interface ActivityItem {
  id: string;
  type: string;
  user: { name: string; initials: string };
  description: string;
  timestamp: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
  className?: string;
}

export function ActivityFeed({ items, className }: ActivityFeedProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, index) => {
        const Icon = activityIcons[item.type] || Plus;
        return (
          <div key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
            {index < items.length - 1 && (
              <div className="absolute left-[17px] top-9 h-full w-px bg-border" />
            )}
            <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", activityColors[item.type] || "bg-muted text-muted-foreground")}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[9px] bg-primary/10 text-primary">{item.user.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{item.user.name}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{formatDateTime(item.timestamp)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
