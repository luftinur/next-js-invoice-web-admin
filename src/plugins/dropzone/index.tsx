"use client";

import { useState } from "react";
import { usePluginStore } from "@/store/plugin-store";
import { Button } from "@/components/ui/button";
import { Upload, File, X } from "lucide-react";

export function DropzonePlugin({ fallback }: { fallback?: React.ReactNode }) {
  const enabled = usePluginStore((s) => s.isEnabled("dropzone"));
  const [files, setFiles] = useState<{ name: string; size: number }[]>([]);

  if (!enabled) {
    return fallback ?? null;
  }

  const handleDrop = () => {
    setFiles([...files, { name: `file-${files.length + 1}.pdf`, size: Math.floor(Math.random() * 1000000) + 10000 }]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div
        className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
        onClick={handleDrop}
      >
        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm font-medium">Drop files here or click to upload</p>
        <p className="text-xs text-muted-foreground mt-1">Up to 10 MB per file</p>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border p-2.5">
              <div className="flex items-center gap-2">
                <File className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(0)} KB)</span>
              </div>
              <Button variant="ghost" size="icon-xs" onClick={() => removeFile(i)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
