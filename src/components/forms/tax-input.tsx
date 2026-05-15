"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface TaxInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value" | "type"> {
  value: number;
  onChange: (value: number) => void;
}

export function TaxInput({
  value,
  onChange,
  className,
  ...props
}: TaxInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const num = parseFloat(raw);
    if (num > 100) onChange(100);
    else if (num < 0 || isNaN(num)) onChange(0);
    else onChange(num);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        inputMode="decimal"
        value={value === 0 ? "" : value}
        onChange={handleChange}
        className={cn("pr-7 tabular-nums", className)}
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
        <span className="text-sm text-muted-foreground">%</span>
      </div>
    </div>
  );
}
