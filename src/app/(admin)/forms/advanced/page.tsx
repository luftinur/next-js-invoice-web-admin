"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Code, Eye } from "lucide-react";
import { useState } from "react";
import { CurrencyInput } from "@/components/forms/currency-input";
import { AmountField } from "@/components/forms/amount-field";
import { PercentageField } from "@/components/forms/percentage-field";
import { TaxInput } from "@/components/forms/tax-input";
import { DatePicker } from "@/components/forms/date-picker";
import { MultiSelect } from "@/components/forms/multi-select";
import { TagInput } from "@/components/forms/tag-input";
import { OtpInput } from "@/components/forms/otp-input";
import { RichTextEditor } from "@/components/forms/rich-text-editor";
import { MarkdownEditor } from "@/components/forms/markdown-editor";
import { RepeaterForm } from "@/components/forms/repeater-form";

export default function AdvancedFormsPage() {
  const [showCode, setShowCode] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountCcy, setAmountCcy] = useState("USD");
  const [pct, setPct] = useState(25);
  const [tax, setTax] = useState(0);
  const [date, setDate] = useState("");
  const [multi, setMulti] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [otp, setOtp] = useState("");
  const [rte, setRte] = useState("");
  const [md, setMd] = useState("");
  const [repeater, setRepeater] = useState([{ item: "", qty: "", price: "" }]);

  const multiOptions = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" },
  ];

  const repeaterFields = [
    { key: "item", label: "Item", placeholder: "Item name" },
    { key: "qty", label: "Qty", placeholder: "Quantity" },
    { key: "price", label: "Price", placeholder: "Unit price" },
  ];

  const sections = [
    {
      title: "Financial Inputs",
      desc: "Currency, amount, tax, and percentage fields",
      content: (
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Currency Input</Label>
            <CurrencyInput value={amount} onChange={setAmount} />
          </div>
          <div className="space-y-1">
            <Label>Amount Field (with currency selector)</Label>
            <AmountField value={amount} onChange={setAmount} currency={amountCcy} onCurrencyChange={setAmountCcy} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Percentage Field</Label>
              <PercentageField value={pct} onChange={setPct} />
            </div>
            <div className="space-y-1">
              <Label>Tax Rate</Label>
              <TaxInput value={tax} onChange={setTax} />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Data Selection",
      desc: "Date, multi-select, and tag inputs",
      content: (
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Date Picker</Label>
            <DatePicker value={date} onChange={setDate} />
          </div>
          <div className="space-y-1">
            <Label>Multi-Select</Label>
            <MultiSelect options={multiOptions} value={multi} onChange={setMulti} />
          </div>
          <div className="space-y-1">
            <Label>Tag Input</Label>
            <TagInput value={tags} onChange={setTags} placeholder="Type and press Enter..." />
          </div>
          <div className="space-y-1">
            <Label>OTP Input</Label>
            <OtpInput value={otp} onChange={setOtp} length={6} />
          </div>
        </div>
      ),
    },
    {
      title: "Rich Content Editors",
      desc: "WYSIWYG and Markdown editors",
      content: (
        <div className="space-y-6">
          <div className="space-y-1">
            <Label>Rich Text Editor</Label>
            <RichTextEditor value={rte} onChange={setRte} placeholder="Start typing..." />
          </div>
          <div className="space-y-1">
            <Label>Markdown Editor</Label>
            <MarkdownEditor value={md} onChange={setMd} placeholder="Write markdown here..." />
          </div>
        </div>
      ),
    },
    {
      title: "Dynamic Form Repeater",
      desc: "Add/remove rows of grouped fields",
      content: (
        <div className="space-y-1">
          <Label>Line Items</Label>
          <RepeaterForm fields={repeaterFields} value={repeater} onChange={(v) => setRepeater(v as typeof repeater)} addLabel="Add Line Item" />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Advanced Forms</h1>
          <p className="text-sm text-muted-foreground">Custom form components and complex inputs</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)} className="cursor-pointer">
          {showCode ? <Eye className="h-4 w-4" /> : <Code className="h-4 w-4" />}
          {showCode ? "Preview" : "Code"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-base">{section.title}</CardTitle>
              <CardDescription>{section.desc}</CardDescription>
            </CardHeader>
            <CardContent>{section.content}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
