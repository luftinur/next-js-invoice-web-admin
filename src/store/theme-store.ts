import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";
export type Density = "normal" | "compact";
export type SidebarState = "expanded" | "collapsed";
export type Direction = "ltr" | "rtl";
export type ColorPreset = "zinc" | "blue" | "green" | "purple" | "orange" | "rose";
export type AdminLayoutType = "admin" | "compact" | "horizontal";

interface ThemeState {
  mode: ThemeMode;
  density: Density;
  sidebar: SidebarState;
  direction: Direction;
  colorPreset: ColorPreset;
  activeLayout: AdminLayoutType;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setDensity: (density: Density) => void;
  toggleDensity: () => void;
  setSidebar: (state: SidebarState) => void;
  toggleSidebar: () => void;
  setDirection: (dir: Direction) => void;
  toggleDirection: () => void;
  setColorPreset: (preset: ColorPreset) => void;
  setActiveLayout: (layout: AdminLayoutType) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      density: "normal",
      sidebar: "expanded",
      direction: "ltr",
      colorPreset: "zinc",
      activeLayout: "admin",
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((s) => ({ mode: s.mode === "light" ? "dark" : "light" })),
      setDensity: (density) => set({ density }),
      toggleDensity: () =>
        set((s) => ({
          density: s.density === "normal" ? "compact" : "normal",
        })),
      setSidebar: (sidebar) => set({ sidebar }),
      toggleSidebar: () =>
        set((s) => ({
          sidebar: s.sidebar === "expanded" ? "collapsed" : "expanded",
        })),
      setDirection: (direction) => set({ direction }),
      toggleDirection: () =>
        set((s) => ({ direction: s.direction === "ltr" ? "rtl" : "ltr" })),
      setColorPreset: (colorPreset) => set({ colorPreset }),
      setActiveLayout: (activeLayout) => set({ activeLayout }),
    }),
    { name: "invoicecore-theme" }
  )
);
