"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function InvoicePreviewPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-3">
        <h2 className="text-sm font-medium">Invoice Preview</h2>
        <Button variant="outline" size="sm">
          <Printer className="h-4 w-4" />
          Print
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-[800px] space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">INVOICE</h1>
              <p className="text-sm text-muted-foreground">INV-000001</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">$4,950.00</p>
              <p className="text-sm text-muted-foreground">Due May 15, 2026</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            This is a preview of how the invoice will appear when printed or
            viewed as PDF.
          </p>
        </div>
      </div>
    </div>
  );
}
