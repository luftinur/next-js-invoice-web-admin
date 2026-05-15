"use client";

import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("border-t bg-background px-4 lg:px-6 py-3", className)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} InvoiceCore. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
