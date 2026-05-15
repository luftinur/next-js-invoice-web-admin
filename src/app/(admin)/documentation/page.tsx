"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BookOpen, FileCode, Layers, Palette, Puzzle, Shield, Zap } from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { q: "What is InvoiceCore?", a: "InvoiceCore is a comprehensive admin dashboard theme for invoice management built with Next.js 16, shadcn/ui (Base UI), Tailwind CSS v4, TypeScript, and Zustand. It provides a complete UI system for managing invoices, customers, payments, subscriptions, and reports." },
      { q: "How do I run the project?", a: "Run `npm install` to install dependencies, then `npm run dev` to start the development server. The app runs on http://localhost:3000 by default." },
      { q: "What is the project structure?", a: "The app uses the App Router with `src/app/(admin)/` for authenticated pages. Layouts are in `src/layouts/`, components in `src/components/`, stores in `src/store/`, and types in `src/types/`." },
    ],
  },
  {
    title: "Architecture",
    icon: Layers,
    items: [
      { q: "What stack does InvoiceCore use?", a: "Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui v4 (based on @base-ui/react), Zustand for state management, Recharts for charts, and TanStack Table for data tables." },
      { q: "How is state management handled?", a: "Zustand is used throughout with persist middleware for theme (sidebar state, dark mode, direction), i18n (locale selection), RBAC (permissions), plugins (enabled/disabled state), invoices (filter/draft state), and notifications." },
      { q: "What layout system is available?", a: "Six layout variants: Admin (sidebar+header), Compact (denser), Horizontal (top nav), Focus View (minimal), Fullscreen (no chrome), and Blank (auth/error pages)." },
    ],
  },
  {
    title: "Components",
    icon: Puzzle,
    items: [
      { q: "What UI primitives are available?", a: "40+ shadcn/ui primitives including Button, Card, Badge, Avatar, Dialog, Dropdown Menu, Tabs, Accordion, Alert, Breadcrumb, Sheet, Tooltip, Popover, Table, Select, Checkbox, Switch, Input, Textarea, Label, Separator, Pagination, Skeleton, and more." },
      { q: "What custom components exist?", a: "Custom components include StatusBadge, BalanceCard, FinancialStatsCard, EmptyState, KanbanBoard, ActivityFeed, FileUpload, DataTable, KpiWidgets, and 5 chart components (RevenueLineChart, ExpensePieChart, PaymentBarChart, CashflowChart, GrowthAreaChart)." },
      { q: "What form components are available?", a: "11 form components: CurrencyInput, AmountField, PercentageField, TaxInput, DatePicker, MultiSelect, TagInput, OtpInput, RichTextEditor, MarkdownEditor, and RepeaterForm." },
      { q: "What customer components exist?", a: "5 customer components: CompanyAvatar, CustomerCard, ContactWidget, CustomerStats, and LifetimeValueWidget." },
    ],
  },
  {
    title: "Features",
    icon: Zap,
    items: [
      { q: "What modules are included?", a: "Dashboard (3 variants), Invoices (12 pages), Customers (3 pages), Payments (5 pages), Subscriptions (4 pages), Reports (5 pages), Settings (6 pages), Users & Roles (3 pages), plus utility pages (Activity Logs, Audit Trail, Notifications, Files, Calendar)." },
      { q: "Is RTL supported?", a: "Yes. Toggle direction in the theme store. The layout and all components respect the `dir` attribute." },
      { q: "Is i18n supported?", a: "Yes. 6 locales (en, es, fr, de, ja, zh) with Zustand persist. Toggle in the settings/header." },
      { q: "Is dark mode supported?", a: "Yes. Full dark mode with CSS custom properties. Toggle via ThemeProvider or theme store." },
      { q: "What is the plugin ecosystem?", a: "10 plugin wrappers (FullCalendar, Dropzone, Quill, Flatpickr, Sortable, PDF Viewer, ApexCharts, Chart.js, Tom Select, DataTables) with a toggle-based management UI at /plugins." },
    ],
  },
  {
    title: "Theming",
    icon: Palette,
    items: [
      { q: "How do I customize colors?", a: "Edit `src/lib/theme-config.ts` for color presets (6 available). CSS custom properties are in the :root block. Use the ThemeSwitcher component to toggle presets." },
      { q: "How does dark mode work?", a: "Dark mode toggles a `.dark` class on `<html>` which triggers alternate CSS custom property values. All components use CSS variables for colors." },
      { q: "Can I add new color presets?", a: "Yes. Add a new entry to the `themePresets` array in `src/lib/theme-config.ts` with your custom palette." },
    ],
  },
  {
    title: "Security & Access Control",
    icon: Shield,
    items: [
      { q: "How does RBAC work?", a: "Roles (super_admin, finance_admin, accountant, staff, viewer) with granular permissions per resource (invoices, customers, payments, etc.). Managed via Zustand store and the Roles page at /roles." },
      { q: "What auth pages are included?", a: "Login, Register, Forgot Password, Reset Password, Verify Email, Two-Factor Auth, and Session Timeout pages." },
    ],
  },
  {
    title: "Code Standards",
    icon: FileCode,
    items: [
      { q: "What naming conventions are used?", a: "PascalCase for components, kebab-case for filenames. Props interfaces follow `interface XxxProps`. Uses `cn()` for classname merging and `tabular-nums` for financial data." },
      { q: "What is the component pattern?", a: "Components use functional components with explicit Props interfaces. Internal state uses `useState`/`useReducer`. Global state uses Zustand stores. Side effects use `useEffect`." },
      { q: "How are API calls structured?", a: "The service layer at `src/services/api.ts` provides an ApiClient class with request/response interceptors, token management, and error handling." },
    ],
  },
];

export default function DocumentationPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Documentation</h1>
        <p className="text-sm text-muted-foreground">InvoiceCore admin theme — developer guide and reference</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">InvoiceCore v0.1.0</p>
              <p className="text-xs text-muted-foreground">Next.js 16 · shadcn/ui (Base UI) · Tailwind v4 · TypeScript · Zustand</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">{section.title}</CardTitle>
                <Badge variant="outline" className="ml-2">{section.items.length} topics</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion className="space-y-1">
                {section.items.map((item, i) => (
                  <AccordionItem key={i} value={`${section.title}-${i}`}>
                    <AccordionTrigger className="cursor-pointer">{item.q}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground">{item.a}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
