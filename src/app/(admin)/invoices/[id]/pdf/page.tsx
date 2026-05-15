"use client";

import { FullscreenLayout } from "@/layouts/fullscreen-layout";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, formatInvoiceId } from "@/lib/formatting";
import { Download } from "lucide-react";

const invoice = {
  id: "1",
  number: "INV-000001",
  status: "pending" as const,
  amount: 4500,
  tax: 450,
  total: 4950,
  currency: "USD",
  issuedDate: "2026-04-15",
  dueDate: "2026-05-15",
  customer: {
    name: "Acme Corp",
    email: "billing@acme.com",
    address: "123 Innovation Drive, Suite 400, San Francisco, CA 94105",
  },
  company: {
    name: "InvoiceCore Inc.",
    email: "billing@invoicecore.io",
    address: "456 Business Ave, Floor 12, New York, NY 10001",
  },
  lineItems: [
    { description: "Web Development - Monthly Retainer", quantity: 1, unitPrice: 3000, taxRate: 10, amount: 3300 },
    { description: "Hosting Services - Q2 2026", quantity: 3, unitPrice: 500, taxRate: 10, amount: 1650 },
  ],
  notes: "Payment due within 30 days. Please include invoice number with payment.",
};

export default function InvoicePdfPage() {
  return (
    <FullscreenLayout title={`PDF - ${formatInvoiceId(invoice.id)}`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-end print:hidden">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.print()}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="rounded-xl border bg-card p-8 print:border-0 print:shadow-none print:p-0">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{invoice.company.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{invoice.company.email}</p>
              <p className="text-sm text-muted-foreground">{invoice.company.address}</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold tabular-nums">{formatCurrency(invoice.total)}</p>
              <p className="mt-1 text-sm text-muted-foreground">Due {formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bill To</p>
              <p className="mt-1.5 font-medium">{invoice.customer.name}</p>
              <p className="text-sm text-muted-foreground">{invoice.customer.email}</p>
              <p className="text-sm text-muted-foreground">{invoice.customer.address}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Invoice Details</p>
              <div className="mt-1.5 space-y-1">
                <p className="text-sm"><span className="text-muted-foreground">Number: </span><span className="font-mono">{formatInvoiceId(invoice.id)}</span></p>
                <p className="text-sm"><span className="text-muted-foreground">Issued: </span>{formatDate(invoice.issuedDate)}</p>
                <p className="text-sm"><span className="text-muted-foreground">Due: </span>{formatDate(invoice.dueDate)}</p>
                <p className="text-sm"><span className="text-muted-foreground">Status: </span><StatusBadge status={invoice.status} /></p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 text-right font-medium">Qty</th>
                <th className="pb-3 text-right font-medium">Unit Price</th>
                <th className="pb-3 text-right font-medium">Tax</th>
                <th className="pb-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.lineItems.map((item, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3 text-sm">{item.description}</td>
                  <td className="py-3 text-right text-sm">{item.quantity}</td>
                  <td className="py-3 text-right text-sm tabular-nums">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-3 text-right text-sm">{item.taxRate}%</td>
                  <td className="py-3 text-right text-sm font-medium tabular-nums">{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Separator className="my-6" />

          <div className="ml-auto w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">{formatCurrency(invoice.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="tabular-nums">{formatCurrency(invoice.tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{formatCurrency(invoice.total)}</span>
            </div>
          </div>

          {invoice.notes && (
            <>
              <Separator className="my-8" />
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{invoice.notes}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </FullscreenLayout>
  );
}
