"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Printer, Sun, Moon, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function FullscreenLayout({
  children,
  title = "Invoice",
  onClose,
}: {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
}) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleClose = () => {
    if (onClose) onClose();
    else router.back();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background print:bg-white">
      <header className="flex h-12 items-center justify-between border-b px-4 print:hidden">
        <Button variant="ghost" size="sm" onClick={handleClose} className="gap-2">
          <X className="h-4 w-4" />
          Close
        </Button>
        <span className="text-sm font-medium">{title}</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 print:overflow-visible print:p-0">
        {children}
      </div>
    </div>
  );
}
