"use client";

import { usePluginStore } from "@/store/plugin-store";
import { FullCalendarPlugin } from "@/plugins/fullcalendar";
import { EmptyState } from "@/components/ui/empty-state";
import { CalendarDays, Puzzle } from "lucide-react";
import Link from "next/link";

export default function CalendarPage() {
  const enabled = usePluginStore((s) => s.isEnabled("fullcalendar"));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Calendar</h1>
          <p className="text-sm text-muted-foreground">View due dates, events, and billing schedules</p>
        </div>
        {!enabled && (
          <Link href="/plugins" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Puzzle className="h-3.5 w-3.5" />
            Enable FullCalendar plugin
          </Link>
        )}
      </div>
      <FullCalendarPlugin
        fallback={
          <EmptyState
            icon={<CalendarDays className="h-8 w-8" />}
            title="Calendar coming soon"
            description="Enable the FullCalendar plugin in Plugin Manager to use the calendar."
            actionLabel="Open Plugin Manager"
          />
        }
      />
    </div>
  );
}
