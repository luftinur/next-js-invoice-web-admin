"use client";

import { usePluginStore } from "@/store/plugin-store";
import { File } from "lucide-react";

export function PdfViewerPlugin({ url, fallback }: { url?: string; fallback?: React.ReactNode }) {
  const enabled = usePluginStore((s) => s.isEnabled("pdf-viewer"));

  if (!enabled) {
    return fallback ?? null;
  }

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/30 p-12 text-center">
        <File className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No PDF selected</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-xs text-muted-foreground">{url.split("/").pop()}</span>
        <span className="text-[10px] text-muted-foreground">PDF Viewer</span>
      </div>
      <div className="flex items-center justify-center bg-muted/20 p-12">
        <div className="text-center">
          <File className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium">PDF Preview</p>
          <p className="text-xs text-muted-foreground mt-1">
            Install react-pdf to enable inline preview
          </p>
        </div>
      </div>
    </div>
  );
}
