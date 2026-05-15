"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, FileText, Users, CreditCard, Repeat, BarChart3, Settings, Shield, FileSignature, ArrowRight } from "lucide-react";

const pageGroups = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    pages: [
      { name: "Finance Dashboard", href: "/dashboard/finance", desc: "KPI widgets, revenue chart, payment bar chart, recent invoices" },
      { name: "Executive Dashboard", href: "/dashboard/executive", desc: "High-level metrics, growth chart, MRR/ARR, churn rate" },
      { name: "Team Dashboard", href: "/dashboard/team", desc: "Team performance, task distribution, activity feed" },
    ],
  },
  {
    label: "Invoicing",
    icon: FileText,
    pages: [
      { name: "All Invoices", href: "/invoices", desc: "Data table with sorting, filtering, status badges" },
      { name: "Create Invoice", href: "/invoices/create", desc: "Form with line items, tax input, drag-and-drop reorder" },
      { name: "Invoice Detail", href: "/invoices/1", desc: "Full invoice view with timeline, payment progress" },
      { name: "Recurring", href: "/invoices/recurring", desc: "Recurring invoice templates and schedules" },
      { name: "Overdue", href: "/invoices/overdue", desc: "Overdue invoices with due date alerts" },
      { name: "Credit Notes", href: "/invoices/credit-notes", desc: "Credit note management" },
    ],
  },
  {
    label: "Customers & Payments",
    icon: Users,
    pages: [
      { name: "Customers List", href: "/customers", desc: "Customer table with stats, status badges" },
      { name: "Customer Profile", href: "/customers/1", desc: "Profile with contact widget, LTV, transaction tabs" },
      { name: "Transactions", href: "/payments/transactions", desc: "Payment transactions with payment indicators" },
      { name: "Payment History", href: "/payments/history", desc: "Historical payment records" },
      { name: "Refunds", href: "/payments/refunds", desc: "Refund processing and tracking" },
    ],
  },
  {
    label: "Subscriptions & Reports",
    icon: Repeat,
    pages: [
      { name: "Subscription Plans", href: "/subscriptions/plans", desc: "Pricing cards with feature comparison" },
      { name: "All Subscriptions", href: "/subscriptions/list", desc: "Subscription list with billing summary" },
      { name: "Billing Cycles", href: "/subscriptions/billing-cycles", desc: "Billing cycle calendar" },
      { name: "Revenue Reports", href: "/reports/revenue", desc: "Revenue charts and financial stats" },
      { name: "Expense Reports", href: "/reports/expense", desc: "Expense breakdown with pie chart" },
      { name: "Cashflow", href: "/reports/cashflow", desc: "Cashflow chart and analysis" },
    ],
  },
  {
    label: "Settings & Admin",
    icon: Settings,
    pages: [
      { name: "Profile Settings", href: "/settings/profile", desc: "User profile and preferences" },
      { name: "Team Management", href: "/settings/team", desc: "Team member management" },
      { name: "API Keys", href: "/settings/api-keys", desc: "API key management" },
      { name: "Integrations", href: "/settings/integrations", desc: "Third-party integrations and plugins" },
      { name: "Users & Roles", href: "/users", desc: "User management with RBAC" },
      { name: "Roles (RBAC)", href: "/roles", desc: "Role matrix with permission toggles" },
    ],
  },
  {
    label: "Utility & System",
    icon: Shield,
    pages: [
      { name: "Activity Logs", href: "/activity-logs", desc: "System activity tracking" },
      { name: "Audit Trail", href: "/audit-trail", desc: "Security audit trail" },
      { name: "Notifications", href: "/notifications", desc: "Notification center with filters" },
      { name: "Files", href: "/files", desc: "File management with Dropzone and PDF viewer" },
      { name: "Calendar", href: "/calendar", desc: "FullCalendar integration" },
      { name: "Plugins", href: "/plugins", desc: "Plugin ecosystem manager" },
    ],
  },
  {
    label: "Auth & Error",
    icon: FileSignature,
    pages: [
      { name: "Login", href: "/login", desc: "Authentication with social login options" },
      { name: "Register", href: "/register", desc: "Registration form" },
      { name: "Forgot Password", href: "/forgot-password", desc: "Password recovery flow" },
      { name: "404", href: "/404", desc: "Not found error page" },
      { name: "500", href: "/500", desc: "Server error page" },
      { name: "Maintenance", href: "/maintenance", desc: "Maintenance mode page" },
    ],
  },
];

export default function PagesShowcasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Pages</h1>
        <p className="text-sm text-muted-foreground">Complete page template gallery across all modules</p>
      </div>

      {pageGroups.map((group) => {
        const Icon = group.icon;
        return (
          <Card key={group.label}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-base">{group.label}</CardTitle>
                <Badge variant="outline" className="ml-2">{group.pages.length} pages</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.pages.map((page) => (
                  <Link key={page.name} href={page.href} className="group block rounded-lg border p-3 transition-colors hover:bg-muted/50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium group-hover:text-primary">{page.name}</p>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{page.desc}</p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
