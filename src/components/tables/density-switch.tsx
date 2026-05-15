"use client";

import { useThemeStore } from "@/store/theme-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Columns2, Columns3 } from "lucide-react";

interface DensitySwitchProps {
  className?: string;
}

export function DensitySwitch({ className }: DensitySwitchProps) {
  const { density, toggleDensity } = useThemeStore();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleDensity}
      className={cn("gap-1 cursor-pointer", className)}
      title={`Switch to ${density === "normal" ? "compact" : "normal"} view`}
    >
      {density === "normal" ? (
        <Columns3 className="h-4 w-4" />
      ) : (
        <Columns2 className="h-4 w-4" />
      )}
      {density === "normal" ? "Compact" : "Normal"}
    </Button>
  );
}
