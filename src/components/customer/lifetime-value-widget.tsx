import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatting";
import { TrendingUp, TrendingDown, Users } from "lucide-react";

interface LifetimeValueWidgetProps {
  customerLtv: number;
  averageLtv: number;
  currency?: string;
  className?: string;
}

export function LifetimeValueWidget({ customerLtv, averageLtv, currency, className }: LifetimeValueWidgetProps) {
  const ratio = customerLtv / averageLtv;
  const isAboveAverage = ratio >= 1;

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Lifetime Value</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-3xl font-semibold tabular-nums tracking-tight">
            {formatCurrency(customerLtv, currency)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Customer lifetime value</p>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Average LTV</span>
            </div>
            <span className="font-medium tabular-nums">{formatCurrency(averageLtv, currency)}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted-foreground/20">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isAboveAverage ? "bg-success" : "bg-warning"
                )}
                style={{ width: `${Math.min(ratio * 100, 100)}%` }}
              />
            </div>
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                isAboveAverage ? "text-success" : "text-destructive"
              )}
            >
              {isAboveAverage ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {((ratio - 1) * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {isAboveAverage
            ? "This customer has above-average lifetime value."
            : "This customer is below the average lifetime value."}
        </p>
      </CardContent>
    </Card>
  );
}
