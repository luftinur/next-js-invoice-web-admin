"use client";

import { useState } from "react";
import { usePluginStore } from "@/store/plugin-store";

export function QuillEditorPlugin({ fallback }: { fallback?: React.ReactNode }) {
  const enabled = usePluginStore((s) => s.isEnabled("quill-editor"));
  const [content, setContent] = useState("");

  if (!enabled) {
    return fallback ?? null;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 rounded-t-lg border bg-muted/50 p-2">
        {["Bold", "Italic", "Underline", "Strike", "Link", "List", "Code"].map((tool) => (
          <button
            key={tool}
            type="button"
            className="rounded px-2 py-1 text-xs font-medium hover:bg-accent cursor-pointer"
          >
            {tool}
          </button>
        ))}
      </div>
      <textarea
        className="min-h-[150px] w-full rounded-b-lg border border-t-0 bg-background p-3 text-sm outline-none focus:ring-1 focus:ring-primary"
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
