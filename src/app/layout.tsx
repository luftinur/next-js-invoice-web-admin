import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeManager } from "@/components/ui/theme-manager";
import { CommandPalette } from "@/components/ui/command-palette";
import { PluginProvider } from "@/components/providers/plugin-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoiceCore - Invoice Management",
  description: "Component-Based Admin Dashboard Theme for Invoice Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeManager>
            <TooltipProvider>
              <PluginProvider>
                {children}
                <Toaster richColors position="top-right" />
                <CommandPalette />
              </PluginProvider>
            </TooltipProvider>
          </ThemeManager>
        </ThemeProvider>
      </body>
    </html>
  );
}
