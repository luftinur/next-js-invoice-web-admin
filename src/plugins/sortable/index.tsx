"use client";

import { useState } from "react";
import { usePluginStore } from "@/store/plugin-store";
import { Button } from "@/components/ui/button";
import { GripVertical, X } from "lucide-react";

interface SortableItem {
  id: string;
  label: string;
}

export function SortablePlugin({ items: initialItems, onChange }: { items?: SortableItem[]; onChange?: (items: SortableItem[]) => void; fallback?: React.ReactNode }) {
  const enabled = usePluginStore((s) => s.isEnabled("sortable"));
  const [items, setItems] = useState<SortableItem[]>(initialItems ?? []);

  if (!enabled) {
    return null;
  }

  const moveItem = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const newItems = [...items];
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
    onChange?.(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange?.(newItems);
  };

  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
          <div className="flex flex-col gap-0.5">
            <button type="button" onClick={() => moveItem(index, -1)} className="text-[8px] text-muted-foreground hover:text-foreground cursor-pointer leading-none">&uarr;</button>
            <button type="button" onClick={() => moveItem(index, 1)} className="text-[8px] text-muted-foreground hover:text-foreground cursor-pointer leading-none">&darr;</button>
          </div>
          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="flex-1 text-sm">{item.label}</span>
          <Button variant="ghost" size="icon-xs" onClick={() => removeItem(index)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
}
