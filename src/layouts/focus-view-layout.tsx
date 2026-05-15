"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { X, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export function FocusViewLayout({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <header className="flex h-12 items-center justify-between border-b px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Close
        </Button>
        <div className="flex items-center gap-2">
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
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
