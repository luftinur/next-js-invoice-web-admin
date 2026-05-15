"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

interface CurrencyInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value" | "type"> {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
}

export function CurrencyInput({
  value,
  onChange,
  currency = "USD",
  className,
  ...props
}: CurrencyInputProps) {
  const formatDisplay = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const num = parseFloat(raw);
    onChange(isNaN(num) ? 0 : num);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-sm text-muted-foreground">
          {currency === "USD" ? "$" : currency}
        </span>
      </div>
      <Input
        type="text"
        inputMode="decimal"
        value={formatDisplay(value)}
        onChange={handleChange}
        className={cn("pl-8 tabular-nums", className)}
        {...props}
      />
    </div>
  );
}
