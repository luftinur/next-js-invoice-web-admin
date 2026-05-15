"use client";

import { useState } from "react";
import { usePluginStore } from "@/store/plugin-store";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

export function FlatpickrPlugin({ fallback }: { fallback?: React.ReactNode }) {
  const enabled = usePluginStore((s) => s.isEnabled("flatpickr"));
  const [date, setDate] = useState("");

  if (!enabled) {
    return fallback ?? null;
  }

  return (
    <div className="relative">
      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="date"
        className="pl-8"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
}
