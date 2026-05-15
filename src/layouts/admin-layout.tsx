"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { sidebar, density } = useThemeStore();
  const isCollapsed = sidebar === "collapsed";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={cn(
          "flex flex-1 flex-col transition-all duration-300",
          isCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <Header />
        <div className={cn("flex-1", density === "compact" ? "p-3" : "p-4 lg:p-6")}>{children}</div>
        <Footer />
      </main>
    </div>
  );
}
