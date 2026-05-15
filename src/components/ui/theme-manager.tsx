"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";
import { presetCSSVariables } from "@/lib/theme-config";

export function ThemeManager({ children }: { children: React.ReactNode }) {
  const { direction, colorPreset, density } = useThemeStore();

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  useEffect(() => {
    const root = document.documentElement;
    const vars = presetCSSVariables[colorPreset];
    if (vars) {
      Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [colorPreset]);

  useEffect(() => {
    document.documentElement.dataset.density = density;
  }, [density]);

  return <>{children}</>;
}
