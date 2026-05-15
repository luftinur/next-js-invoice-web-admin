"use client";

import { useRbacStore } from "@/store/rbac-store";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Users, UserCheck, User, ShieldBan } from "lucide-react";
import type { VisibilityScope } from "@/types";

const scopeConfig: Record<VisibilityScope, { label: string; icon: typeof Eye; color: string }> = {
  all: { label: "All Data", icon: Eye, color: "text-success" },
  department: { label: "Department", icon: Users, color: "text-info" },
  assigned: { label: "Assigned", icon: UserCheck, color: "text-warning" },
  own: { label: "Own Only", icon: User, color: "text-muted-foreground" },
  none: { label: "No Access", icon: ShieldBan, color: "text-destructive" },
};

export function DataVisibilityIndicator({ className }: { className?: string }) {
  const scope = useRbacStore((s) => s.getVisibilityScope());
  const cfg = scopeConfig[scope];
  const Icon = cfg.icon;

  return (
    <Badge variant="outline" className={cn("gap-1 font-normal", className)}>
      <Icon className={cn("h-3 w-3", cfg.color)} />
      <span className={cfg.color}>{cfg.label}</span>
    </Badge>
  );
}

const scopeOptions: VisibilityScope[] = ["all", "department", "assigned", "own", "none"];

export function VisibilityScopeSelector({
  value,
  onChange,
}: {
  value: VisibilityScope;
  onChange: (scope: VisibilityScope) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {scopeOptions.map((s) => {
        const cfg = scopeConfig[s];
        const Icon = cfg.icon;
        const isActive = s === value;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            <Icon className="h-3 w-3" />
            {cfg.label}
          </button>
        );
      })}
    </div>
  );
}
