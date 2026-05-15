"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

const currencies = [
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
  { value: "GBP", label: "£ GBP" },
  { value: "JPY", label: "¥ JPY" },
  { value: "CAD", label: "C$ CAD" },
  { value: "AUD", label: "A$ AUD" },
];

interface AmountFieldProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  onCurrencyChange?: (currency: string) => void;
  showCurrency?: boolean;
  className?: string;
}

export function AmountField({
  value,
  onChange,
  currency = "USD",
  onCurrencyChange,
  showCurrency = true,
  className,
}: AmountFieldProps) {
  const formatDisplay = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const num = parseFloat(raw);
    onChange(isNaN(num) ? 0 : num);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {showCurrency && onCurrencyChange && (
          <Select value={currency} onValueChange={(v) => onCurrencyChange(v ?? "USD")}>
          <SelectTrigger className="w-28 shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5">
          <span className="text-sm text-muted-foreground">
            {currencies.find((c) => c.value === currency)?.label.split(" ")[0] || "$"}
          </span>
        </div>
        <Input
          type="text"
          inputMode="decimal"
          value={formatDisplay(value)}
          onChange={handleChange}
          className={cn("pl-8 tabular-nums", !showCurrency && "pl-8")}
        />
      </div>
    </div>
  );
}
