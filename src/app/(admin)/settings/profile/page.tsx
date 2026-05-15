"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useThemeStore, type Direction } from "@/store/theme-store";
import { colorPresets } from "@/lib/theme-config";
import { useI18nStore, type Locale } from "@/store/i18n-store";
import { Save, Languages, Palette, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function ProfileSettingsPage() {
  const { direction, setDirection, colorPreset, setColorPreset } = useThemeStore();
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, localeNames } = useI18nStore();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">Change Photo</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1"><Label>First Name</Label><Input defaultValue="John" /></div>
            <div className="space-y-1"><Label>Last Name</Label><Input defaultValue="Doe" /></div>
          </div>
          <div className="space-y-1"><Label>Email</Label><Input type="email" defaultValue="john@invoicecore.io" /></div>
          <div className="space-y-1"><Label>Phone</Label><Input defaultValue="+1 (555) 123-4567" /></div>
          <Separator />
          <div className="flex justify-end"><Button><Save className="h-4 w-4" /> Save Changes</Button></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Theme Mode</Label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme("light")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all cursor-pointer",
                  theme === "light"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input hover:bg-muted"
                )}
              >
                <Sun className="h-4 w-4" />
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all cursor-pointer",
                  theme === "dark"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input hover:bg-muted"
                )}
              >
                <Moon className="h-4 w-4" />
                Dark
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <Label>Color Preset</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setColorPreset(p.value)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all cursor-pointer",
                    colorPreset === p.value
                      ? "border-primary ring-1 ring-primary"
                      : "border-input hover:bg-muted"
                  )}
                >
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: p.primary }}
                  />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Label>Language</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.entries(localeNames) as [Locale, string][]).map(([key, name]) => (
                <button
                  key={key}
                  onClick={() => setLocale(key)}
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm transition-all cursor-pointer",
                    locale === key
                      ? "border-primary ring-1 ring-primary"
                      : "border-input hover:bg-muted"
                  )}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-muted-foreground" />
              <Label>Direction</Label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDirection("ltr")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all cursor-pointer",
                  direction === "ltr"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input hover:bg-muted"
                )}
              >
                LTR
              </button>
              <button
                onClick={() => setDirection("rtl")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all cursor-pointer",
                  direction === "rtl"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input hover:bg-muted"
                )}
              >
                RTL
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
