"use client";

import { Header } from "@/components/ui/header";
import { cn } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNavigation } from "@/lib/navigation";
import { FileText } from "lucide-react";

export function CompactLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { density } = useThemeStore();

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
            {mainNavigation.slice(0, 8).map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    title={item.label}
                    className={cn(
                      "flex h-10 w-full items-center justify-center rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <span className="text-xs font-medium leading-none tracking-tight [writing-mode:vertical-rl]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="ml-16 flex flex-1 flex-col">
        <Header />
        <div
          className={cn(
            "flex-1",
            density === "compact" ? "p-3" : "p-4 lg:p-6"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
