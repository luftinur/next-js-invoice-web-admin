"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  File, Download, Printer, ZoomIn, ZoomOut, Maximize2, Minimize2,
} from "lucide-react";

interface PDFPreviewPanelProps {
  url?: string;
  fileName?: string;
  className?: string;
}

export function PDFPreviewPanel({ url, fileName, className }: PDFPreviewPanelProps) {
  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);

  const displayName = fileName || (url ? url.split("/").pop() : "No file selected");

  const handlePrint = () => {
    const iframe = document.getElementById("pdf-preview-iframe") as HTMLIFrameElement;
    iframe?.contentWindow?.print();
  };

  if (!url) {
    return (
      <div className={cn("rounded-lg border bg-muted/30", className)}>
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <File className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm font-medium text-muted-foreground">No PDF selected</p>
          <p className="text-xs text-muted-foreground mt-1">Select a file to preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-lg border bg-card flex flex-col overflow-hidden",
      fullscreen && "fixed inset-0 z-50 rounded-none",
      className
    )}>
      <div className="flex items-center justify-between border-b px-3 py-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <File className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="text-xs text-muted-foreground truncate">{displayName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-xs" onClick={() => setZoom((z) => Math.max(25, z - 10))} disabled={zoom <= 25} title="Zoom out">
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs tabular-nums text-muted-foreground min-w-[3ch] text-center">{zoom}%</span>
          <Button variant="ghost" size="icon-xs" onClick={() => setZoom((z) => Math.min(200, z + 10))} disabled={zoom >= 200} title="Zoom in">
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <div className="mx-1 h-4 w-px bg-border" />
          <Button variant="ghost" size="icon-xs" onClick={handlePrint} title="Print PDF">
            <Printer className="h-3.5 w-3.5" />
          </Button>
          <a href={url} download={fileName} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon-xs" title="Download">
              <Download className="h-3.5 w-3.5" />
            </Button>
          </a>
          <Button variant="ghost" size="icon-xs" onClick={() => setFullscreen((f) => !f)} title={fullscreen ? "Exit fullscreen" : "Fullscreen"}>
            {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
      <div className="flex-1 bg-muted/20" style={{ height: fullscreen ? "100%" : "500px" }}>
        <iframe
          id="pdf-preview-iframe"
          src={url}
          className="h-full w-full"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          title="PDF Preview"
        />
      </div>
    </div>
  );
}
