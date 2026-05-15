import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { PlanBadge } from "./plan-badge";
import { UsageMeter } from "./usage-meter";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { CalendarDays, CreditCard } from "lucide-react";

interface SubscriptionCardProps {
  customer: string;
  plan: string;
  amount: number;
  interval: string;
  status: string;
  nextBilling: string;
  currency?: string;
  usage?: { label: string; used: number; limit: number; unit?: string };
  className?: string;
}

export function SubscriptionCard({
  customer,
  plan,
  amount,
  interval,
  status,
  nextBilling,
  currency,
  usage,
  className,
}: SubscriptionCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium">{customer}</p>
            <PlanBadge plan={plan} className="mt-1" />
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="rounded-lg bg-muted/50 p-3 text-center">
          <p className="text-2xl font-bold tabular-nums">{formatCurrency(amount, currency)}</p>
          <p className="text-xs text-muted-foreground">per {interval}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Next billing: <span className="font-medium text-foreground">{formatDate(nextBilling)}</span></span>
          </div>
          {usage && <UsageMeter label={usage.label} used={usage.used} limit={usage.limit} unit={usage.unit} />}
        </div>
      </CardContent>
    </Card>
  );
}
