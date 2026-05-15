"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { mainNavigation } from "@/lib/navigation";
import { useThemeStore } from "@/store/theme-store";
import { GlobalSearch } from "@/components/ui/global-search";
import { NotificationCenter } from "@/components/ui/notification-center";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sun,
  Moon,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MAX_VISIBLE = 6;

export function HorizontalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { density } = useThemeStore();

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname.startsWith("/dashboard"))
      return true;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const visible = mainNavigation.slice(0, MAX_VISIBLE);
  const overflow = mainNavigation.slice(MAX_VISIBLE);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">InvoiceCore</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {visible.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors",
                  isActive(item.href)
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            {overflow.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "cursor-pointer"
                  )}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {overflow.map((item) => (
                    <Link key={item.label} href={item.href}>
                      <DropdownMenuItem
                        className={cn(
                          "cursor-pointer",
                          isActive(item.href) && "font-medium"
                        )}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          <div className="flex-1" />

          <GlobalSearch className="hidden sm:block" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <NotificationCenter />

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" })
              )}
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1">
        <div className={cn("flex-1", density === "compact" ? "p-3" : "p-4 lg:p-6")}>
          {children}
        </div>
      </main>
    </div>
  );
}
