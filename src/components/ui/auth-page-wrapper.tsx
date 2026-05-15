"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface AuthPageWrapperProps {
  children: React.ReactNode;
}

export function AuthPageWrapper({ children }: AuthPageWrapperProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-muted p-12 relative">
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-6">
            <FileText className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">InvoiceCore</h2>
          <p className="mt-2 text-muted-foreground">
            Component-based admin dashboard theme for invoice management systems.
            Clean, fast, and developer-friendly.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-background p-3">
              <p className="text-lg font-bold">50+</p>
              <p className="text-xs text-muted-foreground">Pages</p>
            </div>
            <div className="rounded-lg bg-background p-3">
              <p className="text-lg font-bold">24/7</p>
              <p className="text-xs text-muted-foreground">Support</p>
            </div>
            <div className="rounded-lg bg-background p-3">
              <p className="text-lg font-bold">99.9%</p>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/dashboard/finance" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary lg:hidden">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold lg:hidden">InvoiceCore</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="lg:hidden"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
