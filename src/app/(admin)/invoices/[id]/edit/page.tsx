"use client";

import { FocusViewLayout } from "@/layouts/focus-view-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatting";
import { Plus, Trash2, Save, Send } from "lucide-react";
import { useState } from "react";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export default function EditInvoicePage() {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "Web Development - Monthly Retainer", quantity: 1, unitPrice: 3000, taxRate: 10 },
    { id: "2", description: "Hosting Services - Q2 2026", quantity: 3, unitPrice: 500, taxRate: 10 },
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { id: String(Date.now()), description: "", quantity: 1, unitPrice: 0, taxRate: 0 }]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice * (item.taxRate / 100), 0);
  const total = subtotal + tax;

  return (
    <FocusViewLayout>
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Edit Invoice INV-000001</h1>
            <p className="text-sm text-muted-foreground">Update invoice details</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Save className="h-4 w-4" /> Save</Button>
            <Button size="sm"><Send className="h-4 w-4" /> Send</Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border bg-card p-4 space-y-3">
              <h3 className="text-sm font-medium">Bill To</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label>Customer</Label>
                  <Input defaultValue="Acme Corp" />
                </div>
                <div className="space-y-1">
                  <Label>Due Date</Label>
                  <Input type="date" defaultValue="2026-05-15" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-4 space-y-3">
              <h3 className="text-sm font-medium">Line Items</h3>
              {lineItems.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <Input value={item.description} onChange={(e) => updateLineItem(item.id, "description", e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" value={item.quantity} onChange={(e) => updateLineItem(item.id, "quantity", parseInt(e.target.value) || 0)} className="text-right" />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" value={item.unitPrice} onChange={(e) => updateLineItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)} className="text-right" />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" value={item.taxRate} onChange={(e) => updateLineItem(item.id, "taxRate", parseFloat(e.target.value) || 0)} className="text-right" />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button variant="ghost" size="icon-xs" onClick={() => removeLineItem(item.id)} disabled={lineItems.length === 1}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addLineItem}>
                <Plus className="h-4 w-4" /> Add Item
              </Button>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4 space-y-3">
            <h3 className="text-sm font-medium">Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="tabular-nums">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="tabular-nums">{formatCurrency(tax)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-lg tabular-nums">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </FocusViewLayout>
  );
}
