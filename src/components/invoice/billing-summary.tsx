import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BillingSummaryProps {
  planName: string;
  amount: number;
  interval: string;
  status: string;
  nextBilling: string;
  currency?: string;
  className?: string;
}

export function BillingSummary({ planName, amount, interval, status, nextBilling, currency, className }: BillingSummaryProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Billing Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Plan</span>
          <span className="font-medium">{planName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-medium tabular-nums">{formatCurrency(amount, currency)}<span className="text-muted-foreground font-normal">/{interval}</span></span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Status</span>
          <StatusBadge status={status} />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Next Billing</span>
          <span className="font-medium">{formatDate(nextBilling)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
