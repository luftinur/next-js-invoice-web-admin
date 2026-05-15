import type { ColorPreset } from "@/store/theme-store";

export interface ColorPresetDef {
  name: string;
  value: ColorPreset;
  primary: string;
  primaryForeground: string;
  hue: number;
}

export const colorPresets: ColorPresetDef[] = [
  { name: "Zinc", value: "zinc", primary: "oklch(0.205 0.006 285)", primaryForeground: "oklch(0.985 0 0)", hue: 285 },
  { name: "Blue", value: "blue", primary: "oklch(0.488 0.243 264.376)", primaryForeground: "oklch(0.985 0 0)", hue: 264 },
  { name: "Green", value: "green", primary: "oklch(0.448 0.178 155)", primaryForeground: "oklch(0.985 0 0)", hue: 155 },
  { name: "Purple", value: "purple", primary: "oklch(0.472 0.208 296)", primaryForeground: "oklch(0.985 0 0)", hue: 296 },
  { name: "Orange", value: "orange", primary: "oklch(0.546 0.186 45)", primaryForeground: "oklch(0.985 0 0)", hue: 45 },
  { name: "Rose", value: "rose", primary: "oklch(0.483 0.203 15)", primaryForeground: "oklch(0.985 0 0)", hue: 15 },
];

export function getPreset(preset: ColorPreset): ColorPresetDef {
  return colorPresets.find((p) => p.value === preset) || colorPresets[0];
}

export const presetCSSVariables: Record<ColorPreset, Record<string, string>> = {
  zinc: {
    "--primary": "oklch(0.205 0.006 285)",
    "--primary-foreground": "oklch(0.985 0 0)",
    "--sidebar-primary": "oklch(0.205 0.006 285)",
    "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  },
  blue: {
    "--primary": "oklch(0.488 0.243 264.376)",
    "--primary-foreground": "oklch(0.985 0 0)",
    "--sidebar-primary": "oklch(0.488 0.243 264.376)",
    "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  },
  green: {
    "--primary": "oklch(0.448 0.178 155)",
    "--primary-foreground": "oklch(0.985 0 0)",
    "--sidebar-primary": "oklch(0.448 0.178 155)",
    "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  },
  purple: {
    "--primary": "oklch(0.472 0.208 296)",
    "--primary-foreground": "oklch(0.985 0 0)",
    "--sidebar-primary": "oklch(0.472 0.208 296)",
    "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  },
  orange: {
    "--primary": "oklch(0.546 0.186 45)",
    "--primary-foreground": "oklch(0.985 0 0)",
    "--sidebar-primary": "oklch(0.546 0.186 45)",
    "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  },
  rose: {
    "--primary": "oklch(0.483 0.203 15)",
    "--primary-foreground": "oklch(0.985 0 0)",
    "--sidebar-primary": "oklch(0.483 0.203 15)",
    "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  },
};
