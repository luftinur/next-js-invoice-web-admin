"use client";

import { useState } from "react";
import { FocusViewLayout } from "@/layouts/focus-view-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TaxInput } from "@/components/forms/tax-input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatting";
import { usePluginStore } from "@/store/plugin-store";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Trash2, Save, Send, FileText, GripVertical } from "lucide-react";
import Link from "next/link";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export default function CreateInvoicePage() {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, taxRate: 0 },
  ]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      {
        id: String(Date.now()),
        description: "",
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
      },
    ]);
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const tax = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice * (item.taxRate / 100),
    0
  );
  const total = subtotal + tax;

  const sortableEnabled = usePluginStore((s) => s.isEnabled("sortable"));

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = lineItems.findIndex((i) => i.id === active.id);
      const newIndex = lineItems.findIndex((i) => i.id === over.id);
      setLineItems(arrayMove(lineItems, oldIndex, newIndex));
    }
  };

  return (
    <FocusViewLayout>
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Create Invoice</h1>
            <p className="text-sm text-muted-foreground">
              Fill in the details below to create a new invoice
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button size="sm">
              <Send className="h-4 w-4" />
              Send Invoice
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">From</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Company Name</Label>
                    <Input defaultValue="Your Company Inc." />
                  </div>
                  <div className="space-y-1">
                    <Label>Company Email</Label>
                    <Input type="email" defaultValue="billing@company.com" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Address</Label>
                  <Textarea defaultValue="123 Business Ave, Suite 100" rows={2} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bill To</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Customer</Label>
                    <Select defaultValue="">
                      <option value="" disabled>Select customer...</option>
                      <option value="1">Acme Corp</option>
                      <option value="2">Globex Inc</option>
                      <option value="3">Initech</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Line Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="hidden sm:grid sm:grid-cols-12 gap-2 text-xs font-medium text-muted-foreground px-2">
                  <div className="sm:col-span-5">Description</div>
                  <div className="sm:col-span-2 text-right">Quantity</div>
                  <div className="sm:col-span-2 text-right">Unit Price</div>
                  <div className="sm:col-span-2 text-right">Tax %</div>
                  <div className="sm:col-span-1" />
                </div>
                {sortableEnabled ? (
                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={lineItems.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                      {lineItems.map((item) => (
                        <SortableLineItemRow
                          key={item.id}
                          item={item}
                          onUpdate={updateLineItem}
                          onRemove={removeLineItem}
                          isOnly={lineItems.length === 1}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                ) : (
                  lineItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-12 sm:col-span-5">
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) =>
                            updateLineItem(item.id, "description", e.target.value)
                          }
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateLineItem(
                              item.id,
                              "quantity",
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="text-right"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateLineItem(
                              item.id,
                              "unitPrice",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="text-right"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <TaxInput
                          value={item.taxRate}
                          onChange={(val) => updateLineItem(item.id, "taxRate", val)}
                        />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => removeLineItem(item.id)}
                          disabled={lineItems.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                <Button variant="outline" size="sm" onClick={addLineItem}>
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Payment terms, additional notes..."
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium tabular-nums">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium tabular-nums">
                    {formatCurrency(tax)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-semibold tabular-nums">
                    {formatCurrency(total)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">
                  <Send className="h-4 w-4" />
                  Send Invoice
                </Button>
                <Button variant="outline" className="w-full">
                  <Save className="h-4 w-4" />
                  Save as Draft
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4" />
                  Preview
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FocusViewLayout>
  );
}

function SortableLineItemRow({
  item,
  onUpdate,
  onRemove,
  isOnly,
}: {
  item: LineItem;
  onUpdate: (id: string, field: keyof LineItem, value: string | number) => void;
  onRemove: (id: string) => void;
  isOnly: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="grid grid-cols-12 gap-2 items-end">
      <div className="col-span-1 flex items-center justify-center" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
      </div>
      <div className="col-span-11 sm:col-span-4">
        <Input
          placeholder="Description"
          value={item.description}
          onChange={(e) => onUpdate(item.id, "description", e.target.value)}
        />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <Input
          type="number" min="1"
          value={item.quantity}
          onChange={(e) => onUpdate(item.id, "quantity", parseInt(e.target.value) || 0)}
          className="text-right"
        />
      </div>
      <div className="col-span-3 sm:col-span-2">
        <Input
          type="number" min="0" step="0.01"
          value={item.unitPrice}
          onChange={(e) => onUpdate(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
          className="text-right"
        />
      </div>
      <div className="col-span-3 sm:col-span-2">
        <TaxInput
          value={item.taxRate}
          onChange={(val) => onUpdate(item.id, "taxRate", val)}
        />
      </div>
      <div className="col-span-1 flex justify-end">
        <Button variant="ghost" size="icon-xs" onClick={() => onRemove(item.id)} disabled={isOnly}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
