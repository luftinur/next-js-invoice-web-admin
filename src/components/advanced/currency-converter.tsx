"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightLeft, RefreshCw } from "lucide-react";

type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "CAD" | "AUD" | "CHF" | "CNY" | "INR" | "BRL";

interface ExchangeRates {
  base: CurrencyCode;
  rates: Record<CurrencyCode, number>;
}

const currencies: { code: CurrencyCode; name: string; symbol: string }[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "\u20AC" },
  { code: "GBP", name: "British Pound", symbol: "\u00A3" },
  { code: "JPY", name: "Japanese Yen", symbol: "\u00A5" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "CN\u00A5" },
  { code: "INR", name: "Indian Rupee", symbol: "\u20B9" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
];

const defaultRates: ExchangeRates = {
  base: "USD",
  rates: {
    USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151.50, CAD: 1.36,
    AUD: 1.52, CHF: 0.88, CNY: 7.24, INR: 83.20, BRL: 5.05,
  },
};

function formatCurrencyValue(amount: number, code: CurrencyCode): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: code,
    minimumFractionDigits: code === "JPY" ? 0 : 2,
    maximumFractionDigits: code === "JPY" ? 0 : 2,
  }).format(amount);
}

interface CurrencyConverterProps {
  className?: string;
}

export function CurrencyConverter({ className }: CurrencyConverterProps) {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState<CurrencyCode>("USD");
  const [to, setTo] = useState<CurrencyCode>("EUR");
  const [rates, setRates] = useState<ExchangeRates>(defaultRates);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  const fromRate = rates.rates[from];
  const toRate = rates.rates[to];
  const baseRate = rates.rates[rates.base];
  const numericAmount = parseFloat(amount) || 0;
  const converted = (numericAmount / fromRate) * toRate;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const refreshRates = () => {
    const jitter = () => 0.95 + Math.random() * 0.1;
    const newRates: Record<string, number> = { USD: 1 };
    Object.keys(defaultRates.rates).forEach((code) => {
      if (code !== "USD") newRates[code] = +(defaultRates.rates[code as CurrencyCode] * jitter()).toFixed(4);
    });
    setRates({ base: "USD", rates: newRates as ExchangeRates["rates"] });
    setLastUpdated(new Date().toLocaleTimeString());
  };

  return (
    <Card className={cn("p-4", className)}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Currency Converter</h3>
          <Button variant="ghost" size="icon-xs" onClick={refreshRates} title="Refresh rates">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-2 items-end">
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">From</label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value as CurrencyCode)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center pb-1">
              <Button variant="ghost" size="icon-sm" onClick={swap} className="mt-5" title="Swap currencies">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-2 space-y-1">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Converted</label>
              <div className="flex h-9 w-full items-center rounded-md border bg-muted/30 px-3 text-sm font-medium tabular-nums">
                {converted ? formatCurrencyValue(converted, to) : "\u2014"}
              </div>
            </div>
            <div className="col-span-3 space-y-1">
              <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">To</label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value as CurrencyCode)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-md bg-muted/30 px-3 py-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Exchange rate</span>
              <span className="font-medium tabular-nums">
                1 {from} = {(toRate / fromRate).toFixed(6)} {to}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>Base: {rates.base}</span>
              <span>Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
