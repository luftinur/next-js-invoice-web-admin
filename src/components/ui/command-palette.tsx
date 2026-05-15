"use client";

import { useEffect, useState, useCallback } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { FileText, Users, CreditCard, BarChart3, Settings, LayoutDashboard, FileSignature, Repeat, FolderKanban, CalendarDays, Bell, Shield } from "lucide-react";

const actions = [
  { id: "dashboard", label: "Go to Dashboard", href: "/dashboard", icon: LayoutDashboard, keywords: "home main" },
  { id: "invoices", label: "View Invoices", href: "/invoices", icon: FileText, keywords: "list all bills" },
  { id: "create-invoice", label: "Create Invoice", href: "/invoices/create", icon: FileText, keywords: "new add bill" },
  { id: "customers", label: "View Customers", href: "/customers", icon: Users, keywords: "clients list" },
  { id: "payments", label: "View Payments", href: "/payments/transactions", icon: CreditCard, keywords: "transactions" },
  { id: "reports", label: "View Reports", href: "/reports/revenue", icon: BarChart3, keywords: "analytics stats" },
  { id: "settings", label: "Settings", href: "/settings/profile", icon: Settings, keywords: "preferences" },
  { id: "quotations", label: "Quotations", href: "/quotations", icon: FileSignature, keywords: "quotes estimates" },
  { id: "subscriptions", label: "Subscriptions", href: "/subscriptions/list", icon: Repeat, keywords: "recurring plans" },
  { id: "projects", label: "Projects", href: "/projects", icon: FolderKanban, keywords: "tasks" },
  { id: "calendar", label: "Calendar", href: "/calendar", icon: CalendarDays, keywords: "schedule events" },
  { id: "notifications", label: "Notifications", href: "/notifications", icon: Bell, keywords: "alerts" },
  { id: "users", label: "Users & Roles", href: "/users", icon: Shield, keywords: "team permissions rbac" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runAction = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen} showCloseButton>
      <CommandInput placeholder="Search pages and actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Actions">
          {actions.map((action) => (
            <CommandItem
              key={action.id}
              keywords={[action.label, action.keywords]}
              onSelect={() => runAction(action.href)}
              className="cursor-pointer"
            >
              <action.icon className="mr-2 h-4 w-4" />
              <span>{action.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
