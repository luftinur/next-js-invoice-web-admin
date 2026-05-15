import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatting";
import { CompanyAvatar } from "./company-avatar";
import { Mail } from "lucide-react";
import Link from "next/link";

interface CustomerCardProps {
  id: string;
  name: string;
  email: string;
  company?: string;
  totalInvoiced: number;
  status: string;
  className?: string;
}

export function CustomerCard({ id, name, email, company, totalInvoiced, status, className }: CustomerCardProps) {
  return (
    <Card className={cn("cursor-pointer transition-colors hover:bg-muted/50", className)}>
      <Link href={`/customers/${id}`} className="block">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <CompanyAvatar name={company || name} size="default" />
            <StatusBadge status={status} />
          </div>
          <div className="mt-3 space-y-1">
            <p className="text-sm font-medium">{name}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{email}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t pt-3">
            <span className="text-xs text-muted-foreground">Total Invoiced</span>
            <span className="text-sm font-semibold tabular-nums">{formatCurrency(totalInvoiced)}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
