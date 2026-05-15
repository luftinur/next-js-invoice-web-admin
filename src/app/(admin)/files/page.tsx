"use client";

import { useState } from "react";
import { usePluginStore } from "@/store/plugin-store";
import { DropzonePlugin } from "@/plugins/dropzone";
import { PdfViewerPlugin } from "@/plugins/pdf-viewer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { FileArchive, FolderOpen, Upload, Puzzle } from "lucide-react";
import Link from "next/link";

export default function FilesPage() {
  const dropzoneEnabled = usePluginStore((s) => s.isEnabled("dropzone"));
  const pdfEnabled = usePluginStore((s) => s.isEnabled("pdf-viewer"));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Files</h1>
          <p className="text-sm text-muted-foreground">Manage your documents and attachments</p>
        </div>
        <Link href="/plugins" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <Puzzle className="h-3.5 w-3.5" />
          Manage Plugins
        </Link>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all" className="cursor-pointer"><FolderOpen className="h-3.5 w-3.5" /> All Files</TabsTrigger>
          <TabsTrigger value="upload" className="cursor-pointer"><Upload className="h-3.5 w-3.5" /> Upload</TabsTrigger>
          <TabsTrigger value="preview" className="cursor-pointer"><FileArchive className="h-3.5 w-3.5" /> Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <EmptyState
            icon={<FileArchive className="h-8 w-8" />}
            title="No files yet"
            description="Upload invoices, receipts, and other documents."
            actionLabel="Upload File"
          />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <DropzonePlugin />
          {!dropzoneEnabled && (
            <EmptyState
              icon={<Upload className="h-8 w-8" />}
              title="Dropzone plugin disabled"
              description="Enable the Dropzone plugin for drag-and-drop file uploads."
              actionLabel="Open Plugin Manager"
            />
          )}
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <PdfViewerPlugin />
          {!pdfEnabled && (
            <EmptyState
              icon={<FileArchive className="h-8 w-8" />}
              title="PDF Viewer disabled"
              description="Enable the PDF Viewer plugin to preview documents inline."
              actionLabel="Open Plugin Manager"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
