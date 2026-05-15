import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatting";

interface HeatmapData {
  label: string;
  value: number;
  date?: string;
}

interface FinancialHeatmapProps {
  data: HeatmapData[][];
  title?: string;
  currency?: string;
  className?: string;
}

function getIntensity(value: number, max: number): string {
  if (max === 0) return "bg-muted";
  const ratio = value / max;
  if (ratio > 0.8) return "bg-success/30 dark:bg-success/40";
  if (ratio > 0.6) return "bg-success/20 dark:bg-success/30";
  if (ratio > 0.4) return "bg-success/15 dark:bg-success/20";
  if (ratio > 0.2) return "bg-success/10 dark:bg-success/10";
  if (ratio > 0) return "bg-success/5";
  return "bg-muted/50";
}

export function FinancialHeatmap({ data, title, currency, className }: FinancialHeatmapProps) {
  const allValues = data.flatMap((row) => row.map((d) => d.value));
  const maxValue = Math.max(...allValues, 1);

  return (
    <div className={cn("space-y-2", className)}>
      {title && <p className="text-sm text-muted-foreground">{title}</p>}
      <div className="space-y-1">
        {data.map((row, ri) => (
          <div key={ri} className="flex items-center gap-2">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">{row[0]?.label || ""}</span>
            <div className="flex flex-1 gap-1">
              {row.map((cell, ci) => (
                <div
                  key={ci}
                  className={cn(
                    "flex flex-1 items-center justify-center rounded px-1 py-2 text-xs font-medium tabular-nums transition-colors",
                    getIntensity(cell.value, maxValue)
                  )}
                  title={`${cell.label}: ${formatCurrency(cell.value, currency)}`}
                >
                  <span className="hidden sm:inline">{formatCurrency(cell.value, currency)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Low</span>
        <div className="flex gap-0.5">
          {[0, 0.2, 0.4, 0.6, 0.8].map((r) => (
            <div key={r} className={cn("h-3 w-6 rounded", getIntensity(r, 1))} />
          ))}
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
