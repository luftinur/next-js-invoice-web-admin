"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface RepeaterField {
  key: string;
  label: string;
  placeholder?: string;
}

interface RepeaterFormProps {
  fields: RepeaterField[];
  value: Record<string, string>[];
  onChange: (value: Record<string, string>[]) => void;
  addLabel?: string;
  className?: string;
}

export function RepeaterForm({
  fields,
  value,
  onChange,
  addLabel = "Add Row",
  className,
}: RepeaterFormProps) {
  const addRow = () => {
    const row: Record<string, string> = {};
    fields.forEach((f) => (row[f.key] = ""));
    onChange([...value, row]);
  };

  const removeRow = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, key: string, val: string) => {
    const updated = value.map((row, i) =>
      i === index ? { ...row, [key]: val } : row
    );
    onChange(updated);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-start gap-2">
          <div className="flex h-8 items-center text-muted-foreground">
            <GripVertical className="h-4 w-4" />
          </div>
          <div className="flex flex-1 flex-wrap gap-2">
            {fields.map((field) => (
              <input
                key={field.key}
                type="text"
                value={row[field.key] || ""}
                onChange={(e) => updateRow(rowIndex, field.key, e.target.value)}
                placeholder={field.placeholder}
                className="h-8 flex-1 min-w-[120px] rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 placeholder:text-muted-foreground"
              />
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => removeRow(rowIndex)}
            className="shrink-0 cursor-pointer"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addRow}
        className="w-full cursor-pointer"
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </Button>
    </div>
  );
}
