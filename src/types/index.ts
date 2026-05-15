export type InvoiceStatus = "paid" | "pending" | "overdue" | "draft" | "cancelled" | "refunded";

export type PaymentStatus = "succeeded" | "pending" | "failed" | "refunded";

export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "incomplete";

export type CustomerStatus = "active" | "inactive" | "lead";

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  tax: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: string;
  issuedDate: string;
  paidDate?: string;
  description?: string;
  lineItems: InvoiceLineItem[];
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  amount: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company?: string;
  avatar?: string;
  status: CustomerStatus;
  totalInvoiced: number;
  totalPaid: number;
  outstanding: number;
  lifetimeValue: number;
  createdAt: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  taxId?: string;
  notes?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  gateway?: string;
  transactionId?: string;
  paidAt: string;
  fee?: number;
  netAmount?: number;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  customerName: string;
  customerEmail: string;
  status: SubscriptionStatus;
  amount: number;
  currency: string;
  interval: "monthly" | "yearly" | "weekly";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEnd?: string;
  canceledAt?: string;
}

export interface Report {
  id: string;
  name: string;
  type: "revenue" | "expense" | "tax" | "cashflow";
  period: string;
  generatedAt: string;
  data: Record<string, unknown>;
}

export type RoleType = "super_admin" | "finance_admin" | "accountant" | "staff" | "viewer" | "customer_portal";

export type PermissionAction = "create" | "read" | "update" | "delete" | "approve" | "export";

export type PermissionResource =
  | "invoices"
  | "quotations"
  | "customers"
  | "payments"
  | "subscriptions"
  | "reports"
  | "expenses"
  | "projects"
  | "users"
  | "roles"
  | "settings";

export interface Permission {
  resource: PermissionResource;
  actions: PermissionAction[];
}

export type VisibilityScope = "all" | "department" | "assigned" | "own" | "none";

export interface Role {
  id: string;
  name: string;
  type: RoleType;
  description: string;
  permissions: Permission[];
  visibilityScope: VisibilityScope;
  userCount: number;
  createdAt: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: RoleType;
  roleName: string;
  status: "active" | "inactive" | "invited";
  lastActive: string;
  createdAt: string;
  permissions?: Permission[];
}

export interface NavigationItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
  children?: NavigationItem[];
}
