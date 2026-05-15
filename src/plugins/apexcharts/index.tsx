"use client";

import { usePluginStore } from "@/store/plugin-store";

interface ApexChartProps {
  type?: "line" | "bar" | "area" | "donut";
  title?: string;
  fallback?: React.ReactNode;
}

export function ApexChartsPlugin({ type = "bar", title, fallback }: ApexChartProps) {
  const enabled = usePluginStore((s) => s.isEnabled("apexcharts"));

  if (!enabled) {
    return fallback ?? null;
  }

  const height = 200;

  return (
    <div className="rounded-lg border bg-card p-4">
      {title && <h4 className="text-sm font-medium mb-3">{title}</h4>}
      <svg viewBox={`0 0 300 ${height}`} className="w-full h-[${height}px]" preserveAspectRatio="none">
        {type === "donut" ? (
          <>
            <circle cx="150" cy={height / 2} r="60" fill="none" stroke="hsl(var(--muted))" strokeWidth="20" />
            <circle cx="150" cy={height / 2} r="60" fill="none" stroke="hsl(var(--primary))" strokeWidth="20" strokeDasharray={`${0.6 * Math.PI * 120} ${0.4 * Math.PI * 120}`} transform="rotate(-90 150 100)" />
          </>
        ) : (
          Array.from({ length: 8 }, (_, i) => (
            <rect
              key={i}
              x={20 + i * 35}
              y={height - 30 - Math.random() * 120}
              width="20"
              height={30 + Math.random() * 120}
              fill="hsl(var(--primary))"
              rx="2"
              opacity={0.6 + Math.random() * 0.4}
            />
          ))
        )}
      </svg>
    </div>
  );
}
