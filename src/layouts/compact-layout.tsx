"use client";

import { Header } from "@/components/ui/header";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation, showcaseNavigation, secondaryNavigation } from "@/lib/navigation";
import { FileText, type LucideIcon } from "lucide-react";
import { iconMap } from "@/components/ui/sidebar";

export function CompactLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { density } = useThemeStore();

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname.startsWith("/dashboard"))
      return true;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="fixed left-0 top-0 z-40 flex h-full w-16 flex-col border-r bg-sidebar">
        <div className="flex h-14 items-center justify-center border-b">
          <Link href="/dashboard">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <FileText className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {mainNavigation.map((item) => {
              const Icon = (iconMap[item.icon] || FileText) as LucideIcon;
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-lg transition-colors",
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
            })}
            {secondaryNavigation.map((item) => {
              const Icon = (iconMap[item.icon] || FileText) as LucideIcon;
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-lg transition-colors",
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
            })}
          </ul>
        </nav>
      </aside>
      <main className="ml-16 flex flex-1 flex-col">
        <Header />
        <div className={cn("flex-1", density === "compact" ? "p-3" : "p-4 lg:p-6")}>
          {children}
        </div>
      </main>
    </div>
  );
}
