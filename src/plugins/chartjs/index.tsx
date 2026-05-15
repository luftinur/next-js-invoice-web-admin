"use client";

import { usePluginStore } from "@/store/plugin-store";

interface ChartJsProps {
  type?: "line" | "bar" | "radar" | "doughnut";
  title?: string;
  fallback?: React.ReactNode;
}

export function ChartJsPlugin({ type = "line", title, fallback }: ChartJsProps) {
  const enabled = usePluginStore((s) => s.isEnabled("chartjs"));

  if (!enabled) {
    return fallback ?? null;
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      {title && <h4 className="text-sm font-medium mb-3">{title}</h4>}
      <svg viewBox="0 0 300 160" className="w-full">
        {type === "line" && (
          <polyline
            points="30,130 70,100 110,110 150,60 190,80 230,40 270,50"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
        )}
        {type === "bar" && (
          Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={25 + i * 37} y={30 + Math.random() * 100} width="20" height={100 - Math.random() * 100} fill="hsl(var(--primary))" rx="2" opacity={0.7} />
          ))
        )}
        {type === "doughnut" && (
          <>
            <circle cx="150" cy="80" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="18" />
            <circle cx="150" cy="80" r="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="18" strokeDasharray="188.5 125.7" transform="rotate(-90 150 80)" />
            <circle cx="150" cy="80" r="50" fill="none" stroke="hsl(var(--chart-2))" strokeWidth="18" strokeDasharray="94.2 219.9" transform="rotate(120 150 80)" />
          </>
        )}
      </svg>
    </div>
  );
}
