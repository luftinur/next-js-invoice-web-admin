import { formatCurrency, formatPercentage } from "@/lib/formatting";
import { cn } from "@/lib/utils";

interface TaxBreakdownItem {
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}

interface TaxBreakdownProps {
  items: TaxBreakdownItem[];
  currency?: string;
  className?: string;
}

export function TaxBreakdown({ items, currency, className }: TaxBreakdownProps) {
  const totalTax = items.reduce((sum, item) => sum + item.taxAmount, 0);
  const totalTaxable = items.reduce((sum, item) => sum + item.taxableAmount, 0);

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tax Breakdown</p>
      <div className="space-y-1 text-sm">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span>
              {formatPercentage(item.rate / 100)} VAT
              <span className="text-muted-foreground">
                {" "}on {formatCurrency(item.taxableAmount, currency)}
              </span>
            </span>
            <span className="tabular-nums">{formatCurrency(item.taxAmount, currency)}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t pt-1 text-sm font-medium">
        <span>Total Tax</span>
        <span className="tabular-nums">{formatCurrency(totalTax, currency)}</span>
      </div>
    </div>
  );
}
