"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const remove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const selectedLabels = options
    .filter((o) => value.includes(o.value))
    .map((o) => o.label);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        onClick={() => setOpen(!open)}
        className="flex min-h-9 w-full cursor-pointer flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {selectedLabels.length > 0 ? (
          selectedLabels.map((label, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium"
            >
              {label}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  remove(value[i]);
                }}
                className="cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
      </div>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-popover p-1 shadow-md">
          {options.map((option) => {
            const selected = value.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => toggle(option.value)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent",
                  selected && "bg-accent"
                )}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => {}}
                  className="h-4 w-4 rounded border-gray-300"
                />
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
