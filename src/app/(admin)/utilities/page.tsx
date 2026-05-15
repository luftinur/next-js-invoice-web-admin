"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Palette, Type, Ruler, Sun } from "lucide-react";

const colorTokens = [
  { name: "Primary", var: "bg-primary text-primary-foreground" },
  { name: "Secondary", var: "bg-secondary text-secondary-foreground" },
  { name: "Destructive", var: "bg-destructive/10 text-destructive" },
  { name: "Success", var: "bg-success/10 text-success" },
  { name: "Warning", var: "bg-warning/10 text-warning" },
  { name: "Info", var: "bg-info/10 text-info" },
  { name: "Muted", var: "bg-muted text-muted-foreground" },
  { name: "Accent", var: "bg-accent text-accent-foreground" },
  { name: "Card", var: "bg-card text-card-foreground border" },
  { name: "Popover", var: "bg-popover text-popover-foreground border" },
  { name: "Border", var: "bg-background text-foreground border-2 border-border" },
  { name: "Input", var: "bg-background text-foreground border-2 border-input" },
];

const fontSizeScale = [
  { name: "xs", size: "0.75rem" },
  { name: "sm", size: "0.875rem" },
  { name: "base", size: "1rem" },
  { name: "lg", size: "1.125rem" },
  { name: "xl", size: "1.25rem" },
  { name: "2xl", size: "1.5rem" },
  { name: "3xl", size: "1.875rem" },
];

const spacingScale = [
  { name: "1", value: "4px" },
  { name: "2", value: "8px" },
  { name: "3", value: "12px" },
  { name: "4", value: "16px" },
  { name: "6", value: "24px" },
  { name: "8", value: "32px" },
  { name: "12", value: "48px" },
  { name: "16", value: "64px" },
];

const fontWeightScale = [
  { name: "Normal", weight: 400, class: "font-normal" },
  { name: "Medium", weight: 500, class: "font-medium" },
  { name: "Semibold", weight: 600, class: "font-semibold" },
  { name: "Bold", weight: 700, class: "font-bold" },
];

export default function UtilitiesShowcasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Utilities</h1>
        <p className="text-sm text-muted-foreground">Design tokens, colors, typography, and spacing</p>
      </div>

      <Tabs defaultValue="colors">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Color Tokens</CardTitle>
              </div>
              <CardDescription>CSS custom properties used throughout the theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {colorTokens.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-lg border p-3">
                    <div className={cn("h-8 w-8 rounded-md", c.var)} />
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">--{c.name.toLowerCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base">Font Size Scale</CardTitle>
                </div>
                <CardDescription>Type scale from xs to 3xl</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {fontSizeScale.map((s) => (
                  <div key={s.name} className="flex items-center gap-4">
                    <Badge variant="outline" className="w-12 shrink-0">{s.name}</Badge>
                    <span className={cn("tabular-nums", `text-${s.name}`)}>
                      The quick brown fox
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground font-mono">{s.size}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Font Weights</CardTitle>
                <CardDescription>Weight scale from normal to bold</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {fontWeightScale.map((w) => (
                  <div key={w.name} className="flex items-center gap-4">
                    <Badge variant="outline" className="w-24 shrink-0">{w.name}</Badge>
                    <span className={cn(w.class)}>The quick brown fox</span>
                    <span className="ml-auto text-xs text-muted-foreground font-mono">{w.weight}</span>
                  </div>
                ))}
              </CardContent>

              <Separator className="my-4" />

              <div className="px-6 pb-6 space-y-3">
                <p className="text-xs text-muted-foreground font-medium">HEADING EXAMPLES</p>
                <h1 className="text-3xl font-semibold tracking-tight">Heading 1</h1>
                <h2 className="text-2xl font-semibold tracking-tight">Heading 2</h2>
                <h3 className="text-xl font-semibold tracking-tight">Heading 3</h3>
                <h4 className="text-lg font-medium">Heading 4</h4>
                <p className="text-sm text-muted-foreground">Body text with muted foreground color for secondary information.</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spacing" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">Spacing Scale</CardTitle>
              </div>
              <CardDescription>Tailwind spacing tokens used in layouts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {spacingScale.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <Badge variant="outline" className="w-16 shrink-0">p-{s.name}</Badge>
                  <div className="flex-1">
                    <div className="h-6 rounded bg-primary/20" style={{ width: s.value }} />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono w-14 text-right">{s.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
