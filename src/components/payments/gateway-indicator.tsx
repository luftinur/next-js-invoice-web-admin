import { cn } from "@/lib/utils";
import { CreditCard, Building2, Landmark, Wallet } from "lucide-react";

const gatewayIcons: Record<string, React.ReactNode> = {
  stripe: <CreditCard className="h-4 w-4" />,
  paypal: <Wallet className="h-4 w-4" />,
  square: <Building2 className="h-4 w-4" />,
  banking: <Landmark className="h-4 w-4" />,
  wire: <Landmark className="h-4 w-4" />,
  ach: <Building2 className="h-4 w-4" />,
};

const gatewayColors: Record<string, string> = {
  stripe: "bg-indigo-500/10 text-indigo-500",
  paypal: "bg-blue-500/10 text-blue-500",
  square: "bg-green-500/10 text-green-500",
  banking: "bg-muted text-muted-foreground",
  wire: "bg-muted text-muted-foreground",
  ach: "bg-muted text-muted-foreground",
};

interface GatewayIndicatorProps {
  gateway: string;
  showIcon?: boolean;
  className?: string;
}

export function GatewayIndicator({ gateway, showIcon = true, className }: GatewayIndicatorProps) {
  const key = gateway.toLowerCase().replace(/\s+/g, "");
  const Icon = gatewayIcons[key] || <Building2 className="h-4 w-4" />;

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {showIcon && (
        <span className={cn("flex h-6 w-6 items-center justify-center rounded-md", gatewayColors[key] || "bg-muted text-muted-foreground")}>
          {Icon}
        </span>
      )}
      <span className="text-sm">{gateway}</span>
    </span>
  );
}
