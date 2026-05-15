"use client";

import { useTheme } from "next-themes";
import { useThemeStore, type AdminLayoutType } from "@/store/theme-store";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearch } from "@/components/ui/global-search";
import { NotificationCenter } from "@/components/ui/notification-center";
import {
  Sun,
  Moon,
  PanelLeftOpen,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Palette,
  Languages,
  Globe,
  Layout,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { colorPresets, getPreset } from "@/lib/theme-config";
import { useI18nStore, type Locale } from "@/store/i18n-store";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { toggleSidebar, direction, toggleDirection, colorPreset, setColorPreset, activeLayout, setActiveLayout } = useThemeStore();
  const { locale, setLocale, localeNames } = useI18nStore();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="shrink-0"
      >
        <PanelLeftOpen className="h-5 w-5" />
      </Button>

      <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">InvoiceCore</span>
        <span>/</span>
        <span>Dashboard</span>
      </div>

      <div className="flex-1" />

      <GlobalSearch className="hidden sm:block" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="shrink-0"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      <NotificationCenter />

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex items-center gap-2 px-2 shrink-0"
          )}
        >
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-left md:block">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground">Finance Admin</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4 rtl:ml-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4 rtl:ml-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HelpCircle className="mr-2 h-4 w-4 rtl:ml-2" />
            Help
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={() => toggleDirection()} className="cursor-pointer">
            <Languages className="mr-2 h-4 w-4 rtl:ml-2" />
            {direction === "ltr" ? "RTL Mode" : "LTR Mode"}
          </DropdownMenuItem>
          <div className="flex items-center gap-1 px-2 py-1.5">
            <Globe className="mr-1 h-4 w-4 shrink-0 text-muted-foreground" />
            {(Object.entries(localeNames) as [Locale, string][]).slice(0, 4).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setLocale(key)}
                className="rounded px-1.5 py-0.5 text-xs font-medium transition-colors cursor-pointer hover:bg-muted"
                style={{
                  backgroundColor: locale === key ? "var(--accent)" : undefined,
                  color: locale === key ? "var(--accent-foreground)" : undefined,
                }}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1.5">
            <Palette className="mr-1 h-4 w-4 shrink-0 text-muted-foreground" />
            {colorPresets.map((p) => (
              <button
                key={p.value}
                onClick={() => setColorPreset(p.value)}
                className="h-5 w-5 rounded-full border-2 transition-all cursor-pointer"
                style={{
                  backgroundColor: p.primary,
                  borderColor: colorPreset === p.value ? "var(--foreground)" : "transparent",
                }}
                title={p.name}
              />
            ))}
          </div>
          <div className="flex items-center gap-1 px-2 py-1.5">
            <Layout className="mr-1 h-4 w-4 shrink-0 text-muted-foreground" />
            {(["admin", "compact", "horizontal"] as AdminLayoutType[]).map((layout) => (
              <button
                key={layout}
                onClick={() => setActiveLayout(layout)}
                className="rounded px-1.5 py-0.5 text-xs font-medium capitalize transition-colors cursor-pointer hover:bg-muted"
                style={{
                  backgroundColor: activeLayout === layout ? "var(--accent)" : undefined,
                  color: activeLayout === layout ? "var(--accent-foreground)" : undefined,
                }}
              >
                {layout}
              </button>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive cursor-pointer">
            <LogOut className="mr-2 h-4 w-4 rtl:ml-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
