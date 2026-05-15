"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

export default function ExportReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Export Reports</h1>
        <p className="text-sm text-muted-foreground">Export data in various formats</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <FileSpreadsheet className="h-8 w-8 text-muted-foreground mb-2" />
            <CardTitle className="text-base">CSV Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Export data as comma-separated values</p>
            <Button variant="outline" className="w-full"><Download className="h-4 w-4" /> Export CSV</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <CardTitle className="text-base">Excel Export</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Export data as Excel spreadsheet</p>
            <Button variant="outline" className="w-full"><Download className="h-4 w-4" /> Export XLSX</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <CardTitle className="text-base">PDF Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">Generate a complete PDF report</p>
            <Button variant="outline" className="w-full"><Download className="h-4 w-4" /> Generate PDF</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
