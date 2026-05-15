"use client";

import { useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalSearchProps {
  className?: string;
  placeholder?: string;
}

export function GlobalSearch({ className, placeholder = "Search invoices, customers..." }: GlobalSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        onFocus={() => {
          const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
          document.dispatchEvent(event);
        }}
        className={cn(
          "h-9 w-64 rounded-lg border bg-muted/50 pl-9 pr-14 text-sm",
          "placeholder:text-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
      />
      <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
        <span className="text-xs">&#8984;</span>K
      </kbd>
    </div>
  );
}
