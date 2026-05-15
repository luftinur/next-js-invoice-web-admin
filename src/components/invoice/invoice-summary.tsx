import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatting";
import { cn } from "@/lib/utils";

interface InvoiceSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  currency?: string;
  className?: string;
}

export function InvoiceSummary({ subtotal, tax, total, currency, className }: InvoiceSummaryProps) {
  return (
    <div className={cn("space-y-1 text-sm", className)}>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="tabular-nums">{formatCurrency(subtotal, currency)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span className="tabular-nums">{formatCurrency(tax, currency)}</span>
      </div>
      <Separator className="my-2" />
      <div className="flex justify-between text-base font-semibold">
        <span>Total</span>
        <span className="tabular-nums">{formatCurrency(total, currency)}</span>
      </div>
    </div>
  );
}
