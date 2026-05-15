import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatting";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ComparisonPeriod {
  label: string;
  value: number;
}

interface ComparisonCardsProps {
  title: string;
  current: ComparisonPeriod;
  previous: ComparisonPeriod;
  currency?: string;
  format?: "currency" | "number" | "percentage";
  className?: string;
}

export function ComparisonCards({ title, current, previous, currency, format = "currency", className }: ComparisonCardsProps) {
  const change = previous.value !== 0 ? ((current.value - previous.value) / Math.abs(previous.value)) * 100 : 0;
  const positive = change >= 0;

  const formatValue = (val: number) => {
    switch (format) {
      case "currency": return formatCurrency(val, currency);
      case "percentage": return `${(val * 100).toFixed(1)}%`;
      default: return val.toLocaleString();
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">{current.label}</p>
            <p className="text-lg font-semibold tabular-nums">{formatValue(current.value)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{previous.label}</p>
            <p className="text-lg font-semibold tabular-nums text-muted-foreground">{formatValue(previous.value)}</p>
          </div>
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-medium", positive ? "text-success" : "text-destructive")}>
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(change).toFixed(1)}% vs {previous.label}
        </div>
      </CardContent>
    </Card>
  );
}
