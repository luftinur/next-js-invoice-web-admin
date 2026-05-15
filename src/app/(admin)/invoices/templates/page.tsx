"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, FileText, Plus } from "lucide-react";
import Link from "next/link";

const templates = [
  { name: "Standard", description: "Clean, professional layout for everyday invoices", popular: true },
  { name: "Minimal", description: "Minimal design with plenty of whitespace", popular: false },
  { name: "Detailed", description: "Comprehensive layout with full itemization", popular: false },
  { name: "Professional", description: "Formal design suited for enterprise clients", popular: false },
];

export default function InvoiceTemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Invoice Templates</h1>
        <p className="text-sm text-muted-foreground">Choose a template for your invoices</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {templates.map((template) => (
          <Card key={template.name} className={template.popular ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-2">
                <Layout className="h-6 w-6 text-muted-foreground" />
              </div>
              <CardTitle className="text-base">{template.name}</CardTitle>
              {template.popular && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Popular
                </span>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <FileText className="h-4 w-4" />
                Use Template
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
