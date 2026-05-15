"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNavigation, secondaryNavigation, showcaseNavigation } from "@/lib/navigation";
import { useThemeStore } from "@/store/theme-store";
import {
  LayoutDashboard,
  FileText,
  FileSignature,
  Users,
  CreditCard,
  Repeat,
  BarChart3,
  ArrowRightLeft,
  ArrowDownCircle,
  Percent,
  LineChart,
  FolderKanban,
  CalendarDays,
  FileArchive,
  Bell,
  Shield,
  Settings,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Activity,
  ClipboardList,
  ChevronRight,
  List,
  PlusCircle,
  FileEdit,
  AlertTriangle,
  FileMinus,
  Layout,
  UserPlus,
  Undo2,
  Banknote,
  FileJson,
  Package,
  Calendar,
  TrendingDown,
  TrendingUp,
  Wallet,
  Download,
  User,
  Key,
  Puzzle,
  Building2,
  Table,
  Wrench,
  Copy,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  FileText,
  FileSignature,
  Users,
  CreditCard,
  Repeat,
  BarChart3,
  ArrowRightLeft,
  ArrowDownCircle,
  Percent,
  LineChart,
  FolderKanban,
  CalendarDays,
  FileArchive,
  Bell,
  Shield,
  Settings,
  List,
  PlusCircle,
  FileEdit,
  AlertTriangle,
  FileMinus,
  Layout,
  UserPlus,
  Undo2,
  Banknote,
  FileJson,
  Package,
  Calendar,
  TrendingDown,
  TrendingUp,
  Wallet,
  Download,
  User,
  Key,
  Puzzle,
  Building2,
  Activity,
  ClipboardList,
  Table,
  Wrench,
  Copy,
  BookOpen,
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebar, toggleSidebar } = useThemeStore();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set()
  );
  const isCollapsed = sidebar === "collapsed";

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname.startsWith("/dashboard"))
      return true;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-full flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center border-b px-4",
          isCollapsed && "justify-center px-0"
        )}
      >
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2 font-semibold",
            isCollapsed && "justify-center"
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <FileText className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="text-sm font-semibold text-sidebar-foreground">
              InvoiceCore
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = iconMap[item.icon] || FileText;
            const active = isActive(item.href);
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedGroups.has(item.label);

            if (isCollapsed) {
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-lg text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                    title={item.label}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                  </Link>
                </li>
              );
            }

            return (
              <li key={item.label}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleGroup(item.label)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                    {isExpanded && item.children && (
                      <ul className="mt-1 space-y-1 pl-10">
                        {item.children.map((child) => {
                          const ChildIcon = iconMap[child.icon] || ChevronRight;
                          const childActive = isActive(child.href);
                          return (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
                                  childActive
                                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                )}
                              >
                                <ChildIcon className="h-4 w-4 shrink-0" />
                                <span>{child.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {!isCollapsed && (
          <>
            <Separator className="my-3" />
            <p className="px-3 pb-1 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
              Activity
            </p>
            <ul className="space-y-1">
              {secondaryNavigation.map((item) => {
                const Icon = iconMap[item.icon] || FileText;
                const active = isActive(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Separator className="my-3" />
            <p className="px-3 pb-1 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
              Showcase
            </p>
            <ul className="space-y-1">
              {showcaseNavigation.map((item) => {
                const Icon = iconMap[item.icon] || FileText;
                const active = isActive(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </nav>

      <div className="border-t p-2">
        <button
          onClick={toggleSidebar}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <>
              <PanelLeftClose className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
