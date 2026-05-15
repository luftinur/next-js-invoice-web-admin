import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const planStyles: Record<string, string> = {
  free: "bg-muted text-muted-foreground border-border",
  starter: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  professional: "bg-primary/10 text-primary border-primary/20",
  enterprise: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

const planLabels: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  professional: "Professional",
  enterprise: "Enterprise",
};

interface PlanBadgeProps {
  plan: string;
  className?: string;
}

export function PlanBadge({ plan, className }: PlanBadgeProps) {
  const key = plan.toLowerCase().replace(/\s+/g, "");
  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize", planStyles[key] || "bg-muted text-muted-foreground", className)}
    >
      {planLabels[key] || plan}
    </Badge>
  );
}
