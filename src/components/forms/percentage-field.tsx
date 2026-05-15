"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface PercentageFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showSlider?: boolean;
  className?: string;
}

export function PercentageField({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showSlider = true,
  className,
}: PercentageFieldProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const num = parseFloat(raw);
    if (isNaN(num)) onChange(min);
    else if (num > max) onChange(max);
    else if (num < min) onChange(min);
    else onChange(num);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="relative">
        <Input
          type="text"
          inputMode="decimal"
          value={value === 0 ? "" : value}
          onChange={handleInputChange}
          className="pr-8 tabular-nums"
          placeholder="0"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
          <span className="text-sm text-muted-foreground">%</span>
        </div>
      </div>
      {showSlider && (
        <Slider
          value={[value]}
          onValueChange={(val) => { const v = Array.isArray(val) ? val[0] : val; if (typeof v === "number") onChange(v); }}
          min={min}
          max={max}
          step={step}
        />
      )}
    </div>
  );
}
