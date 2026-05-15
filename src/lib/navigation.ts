import type { NavigationItem } from "@/types";

export const mainNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  {
    label: "Invoices",
    href: "/invoices",
    icon: "FileText",
    children: [
      { label: "All Invoices", href: "/invoices", icon: "List" },
      { label: "Create Invoice", href: "/invoices/create", icon: "PlusCircle" },
      { label: "Recurring", href: "/invoices/recurring", icon: "Repeat" },
      { label: "Drafts", href: "/invoices/drafts", icon: "FileEdit" },
      { label: "Overdue", href: "/invoices/overdue", icon: "AlertTriangle" },
      { label: "Credit Notes", href: "/invoices/credit-notes", icon: "FileMinus" },
      { label: "Templates", href: "/invoices/templates", icon: "Layout" },
    ],
  },
  {
    label: "Quotations",
    href: "/quotations",
    icon: "FileSignature",
  },
  {
    label: "Customers",
    href: "/customers",
    icon: "Users",
    children: [
      { label: "All Customers", href: "/customers", icon: "List" },
      { label: "Add Customer", href: "/customers/create", icon: "UserPlus" },
    ],
  },
  {
    label: "Payments",
    href: "/payments/transactions",
    icon: "CreditCard",
    children: [
      { label: "Transactions", href: "/payments/transactions", icon: "ArrowRightLeft" },
      { label: "Payment History", href: "/payments/history", icon: "History" },
      { label: "Refunds", href: "/payments/refunds", icon: "Undo2" },
      { label: "Payouts", href: "/payments/payouts", icon: "Banknote" },
      { label: "Gateway Logs", href: "/payments/gateway-logs", icon: "FileJson" },
    ],
  },
  {
    label: "Subscriptions",
    href: "/subscriptions/list",
    icon: "Repeat",
    children: [
      { label: "All Subscriptions", href: "/subscriptions/list", icon: "List" },
      { label: "Plans", href: "/subscriptions/plans", icon: "Package" },
      { label: "Billing Cycles", href: "/subscriptions/billing-cycles", icon: "Calendar" },
      { label: "Churn", href: "/subscriptions/churn", icon: "TrendingDown" },
    ],
  },
  {
    label: "Reports",
    href: "/reports/revenue",
    icon: "BarChart3",
    children: [
      { label: "Revenue", href: "/reports/revenue", icon: "TrendingUp" },
      { label: "Expenses", href: "/reports/expense", icon: "ArrowDownCircle" },
      { label: "Tax", href: "/reports/tax", icon: "Percent" },
      { label: "Cashflow", href: "/reports/cashflow", icon: "Wallet" },
      { label: "Export", href: "/reports/export", icon: "Download" },
    ],
  },
  { label: "Expenses", href: "/expenses", icon: "ArrowDownCircle" },
  { label: "Analytics", href: "/dashboard/executive", icon: "LineChart" },
  { label: "Projects", href: "/projects", icon: "FolderKanban" },
  {
    label: "Forms",
    href: "/forms",
    icon: "FileEdit",
    children: [
      { label: "Basic Forms", href: "/forms", icon: "FileEdit" },
      { label: "Advanced Forms", href: "/forms/advanced", icon: "SlidersHorizontal" },
      { label: "Wizard", href: "/forms/wizard", icon: "Workflow" },
      { label: "Validation", href: "/forms/validation", icon: "CheckCircle2" },
    ],
  },
  { label: "Plugins", href: "/plugins", icon: "Puzzle" },
  { label: "Calendar", href: "/calendar", icon: "CalendarDays" },
  { label: "Files", href: "/files", icon: "FileArchive" },
  { label: "Notifications", href: "/notifications", icon: "Bell" },
  {
    label: "Users & Roles",
    href: "/users",
    icon: "Shield",
    children: [
      { label: "All Users", href: "/users", icon: "Users" },
      { label: "Roles", href: "/roles", icon: "Shield" },
    ],
  },
  {
    label: "Settings",
    href: "/settings/profile",
    icon: "Settings",
    children: [
      { label: "Profile", href: "/settings/profile", icon: "User" },
      { label: "Team", href: "/settings/team", icon: "Users" },
      { label: "Billing", href: "/settings/billing", icon: "CreditCard" },
      { label: "API Keys", href: "/settings/api-keys", icon: "Key" },
      { label: "Integrations", href: "/settings/integrations", icon: "Puzzle" },
      { label: "Workspace", href: "/settings/workspace", icon: "Building2" },
    ],
  },
];

export const secondaryNavigation: NavigationItem[] = [
  { label: "Activity Logs", href: "/activity-logs", icon: "Activity" },
  { label: "Audit Trail", href: "/audit-trail", icon: "ClipboardList" },
];

export const showcaseNavigation: NavigationItem[] = [
  { label: "Tables", href: "/tables", icon: "Table" },
  { label: "Charts", href: "/charts", icon: "BarChart3" },
  { label: "Layouts", href: "/layouts", icon: "Layout" },
  { label: "Components", href: "/components", icon: "Puzzle" },
  { label: "Utilities", href: "/utilities", icon: "Wrench" },
  { label: "Page Templates", href: "/page-templates", icon: "Copy" },
  { label: "Documentation", href: "/documentation", icon: "BookOpen" },
];
