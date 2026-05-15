"use client";

import { useState } from "react";
import { usePluginStore } from "@/store/plugin-store";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TomSelectOption {
  value: string;
  label: string;
}

interface TomSelectPluginProps {
  options?: TomSelectOption[];
  placeholder?: string;
  multiple?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  fallback?: React.ReactNode;
}

export function TomSelectPlugin({
  options = [],
  placeholder = "Search or type...",
  multiple = true,
  value = [],
  onChange,
  fallback,
}: TomSelectPluginProps) {
  const enabled = usePluginStore((s) => s.isEnabled("tom-select"));
  const [isOpen, setIsOpen] = useState(false);

  if (!enabled) {
    return fallback ?? null;
  }

  const selectedLabels = value
    .map((v) => options.find((o) => o.value === v)?.label)
    .filter(Boolean);

  const toggleOption = (optValue: string) => {
    if (!multiple) {
      onChange?.([optValue]);
      setIsOpen(false);
      return;
    }
    if (value.includes(optValue)) {
      onChange?.(value.filter((v) => v !== optValue));
    } else {
      onChange?.([...value, optValue]);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex min-h-[36px] flex-wrap items-center gap-1 rounded-lg border bg-background px-3 py-1.5 text-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabels.length > 0 ? (
          selectedLabels.map((label, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs">
              {label}
              <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleOption(value[i]); }} />
            </span>
          ))
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-lg border bg-popover p-1 shadow-md">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={cn(
                "flex items-center gap-2 rounded px-2 py-1.5 text-sm cursor-pointer hover:bg-accent",
                value.includes(opt.value) && "bg-accent font-medium"
              )}
              onClick={() => toggleOption(opt.value)}
            >
              {multiple && (
                <input type="checkbox" checked={value.includes(opt.value)} readOnly className="h-3 w-3" />
              )}
              {opt.label}
            </div>
          ))}
          {options.length === 0 && (
            <p className="px-2 py-3 text-center text-xs text-muted-foreground">No options available</p>
          )}
        </div>
      )}
    </div>
  );
}
