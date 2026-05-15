"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useThemeStore, type AdminLayoutType } from "@/store/theme-store";
import { Grid3x3, PanelLeft, Square, Maximize2, Columns3, PanelRight, ArrowRight } from "lucide-react";

const layouts = [
  {
    id: "admin" as AdminLayoutType,
    title: "Admin Layout",
    description: "Default layout with 280px sidebar + sticky header. Used for most admin pages.",
    icon: PanelLeft,
    features: ["Collapsible sidebar (280px / 64px)", "Sticky header with search & user menu", "Responsive: collapses to icon-only on smaller screens", "Main content area with max-width constraint"],
  },
  {
    id: "compact" as AdminLayoutType,
    title: "Compact Layout",
    description: "Reduced spacing for data-dense interfaces. Same structure as Admin.",
    icon: Grid3x3,
    features: ["Reduced padding / margins throughout", "Smaller header height", "Denser sidebar items", "Ideal for tables and dashboards"],
  },
  {
    id: "horizontal" as AdminLayoutType,
    title: "Horizontal Layout",
    description: "Navigation moved to a top horizontal bar. No sidebar.",
    icon: Columns3,
    features: ["Top navigation bar replaces sidebar", "Wider content area", "Good for simpler apps with fewer routes", "Compact header integration"],
  },
  {
    title: "Focus View Layout",
    description: "Minimal chrome for focused work. No sidebar, minimal header.",
    icon: Maximize2,
    features: ["No sidebar", "Minimal header (only breadcrumbs + actions)", "Maximum content area width", "Great for invoice editing, document creation"],
  },
  {
    title: "Fullscreen Layout",
    description: "No navigation at all. Pure content. Good for presentations, print previews, embedded views.",
    icon: Square,
    features: ["No sidebar, no header", "Full viewport takeover", "Custom exit button (ESC / button)", "Used for print preview and presentations"],
  },
  {
    title: "Blank Layout",
    description: "No chrome. Just the page content. Good for auth pages, error pages, landing pages.",
    icon: PanelRight,
    features: ["No sidebar, no header, no footer", "Centered content area", "Used for Login, Register, 404, etc.", "Fully customizable per page"],
  },
];

export default function LayoutsShowcasePage() {
  const { activeLayout, setActiveLayout } = useThemeStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Layouts</h1>
        <p className="text-sm text-muted-foreground">Layout system overview — 6 layout variants for different use cases</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {layouts.map((layout) => {
          const Icon = layout.icon;
          const isSwitchable = layout.id && ["admin", "compact", "horizontal"].includes(layout.id);

          return (
            <Card key={layout.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{layout.title}</CardTitle>
                    <Badge variant="outline" className="mt-1">Layout</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-3">
                <p className="text-sm text-muted-foreground">{layout.description}</p>
                <Separator />
                <ul className="space-y-1.5 flex-1">
                  {layout.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                {isSwitchable && layout.id && (
                  <Button
                    size="sm"
                    variant={activeLayout === layout.id ? "default" : "outline"}
                    onClick={() => setActiveLayout(layout.id!)}
                    className="w-full gap-1.5 mt-2"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    {activeLayout === layout.id ? "Active" : "Switch to this"}
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
