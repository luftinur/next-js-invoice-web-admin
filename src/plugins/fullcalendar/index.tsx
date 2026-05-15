"use client";

import { usePluginStore } from "@/store/plugin-store";
import { EmptyState } from "@/components/ui/empty-state";
import { CalendarDays } from "lucide-react";

export function FullCalendarPlugin({ fallback }: { fallback?: React.ReactNode }) {
  const enabled = usePluginStore((s) => s.isEnabled("fullcalendar"));

  if (!enabled) {
    return fallback ?? <EmptyState icon={<CalendarDays className="h-8 w-8" />} title="FullCalendar disabled" description="Enable the FullCalendar plugin in Plugin Manager." />;
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Calendar</h3>
        <span className="text-[10px] text-muted-foreground">FullCalendar</span>
      </div>
      <div className="grid grid-cols-7 gap-px rounded-lg border bg-muted text-center text-xs">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-card py-2 text-muted-foreground font-medium">{d}</div>
        ))}
        {Array.from({ length: 31 }, (_, i) => (
          <div key={i} className="bg-card py-2 hover:bg-accent cursor-pointer">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
