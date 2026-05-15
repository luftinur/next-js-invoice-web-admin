import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { FileText } from "lucide-react";

interface InvoiceCardProps {
  number: string;
  customer: string;
  amount: number;
  status: string;
  dueDate: string;
  onClick?: () => void;
}

export function InvoiceCard({ number, customer, amount, status, dueDate, onClick }: InvoiceCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:bg-muted/50",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-mono text-sm font-medium">{number}</p>
              <p className="text-sm text-muted-foreground">{customer}</p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="mt-3 flex items-center justify-between border-t pt-3">
          <p className="text-lg font-semibold tabular-nums">{formatCurrency(amount)}</p>
          <p className="text-xs text-muted-foreground">Due {formatDate(dueDate)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

