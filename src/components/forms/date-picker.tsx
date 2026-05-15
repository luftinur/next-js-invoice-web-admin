"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CalendarDays } from "lucide-react";

interface DatePickerProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value" | "type"> {
  value: string;
  onChange: (value: string) => void;
}

export function DatePicker({
  value,
  onChange,
  className,
  ...props
}: DatePickerProps) {
  return (
    <div className="relative">
      <CalendarDays className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("pl-9", className)}
        {...props}
      />
    </div>
  );
}
