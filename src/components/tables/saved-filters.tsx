"use client";

import { useState } from "react";
import { useFilterStore } from "@/store/filter-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Filter, Save, Trash2, Check } from "lucide-react";

interface SavedFiltersProps {
  page: string;
  currentFilters: Record<string, unknown>;
  onApply: (filters: Record<string, unknown>) => void;
  className?: string;
}

export function SavedFilters({ page, currentFilters, onApply, className }: SavedFiltersProps) {
  const [saving, setSaving] = useState(false);
  const [filterName, setFilterName] = useState("");
  const { savedFilters, saveFilter, deleteFilter } = useFilterStore();
  const filters = savedFilters[page] || [];

  const handleSave = () => {
    if (!filterName.trim()) return;
    saveFilter(page, filterName.trim(), currentFilters);
    setFilterName("");
    setSaving(false);
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg border border-input bg-background h-7 gap-1 px-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-muted hover:text-foreground cursor-pointer">
          <Filter className="h-4 w-4" />
          Filters
          {filters.length > 0 && (
            <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
              {filters.length}
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>Saved Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {filters.length === 0 ? (
            <div className="px-2 py-4 text-center text-xs text-muted-foreground">
              No saved filters
            </div>
          ) : (
            filters.map((f) => (
              <div key={f.id} className="flex items-center gap-1 px-1">
                <DropdownMenuItem
                  onClick={() => onApply(f.filters)}
                  className="flex-1 cursor-pointer"
                >
                  {f.name}
                </DropdownMenuItem>
                <button
                  onClick={() => deleteFilter(page, f.id)}
                  className="p-1 text-muted-foreground hover:text-destructive cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu open={saving} onOpenChange={setSaving}>
        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg h-7 w-7 hover:bg-muted cursor-pointer">
          <Save className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 p-2">
          <div className="flex items-center gap-2">
            <Input
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Filter name..."
              className="h-8 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <Button size="sm" className="shrink-0 cursor-pointer" onClick={handleSave} disabled={!filterName.trim()}>
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
