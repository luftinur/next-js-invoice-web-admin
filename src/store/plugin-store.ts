import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PluginManifest, PluginConfig } from "@/types/plugin";

interface PluginState {
  registry: PluginManifest[];
  plugins: Record<string, PluginConfig>;
  registerPlugin: (manifest: PluginManifest) => void;
  registerPlugins: (manifests: PluginManifest[]) => void;
  enablePlugin: (id: string) => void;
  disablePlugin: (id: string) => void;
  togglePlugin: (id: string) => void;
  configurePlugin: (id: string, config: Record<string, unknown>) => void;
  isEnabled: (id: string) => boolean;
  getPlugin: (id: string) => PluginManifest | undefined;
  getEnabledPlugins: () => PluginManifest[];
  getPluginsByCategory: (category: string) => PluginManifest[];
}

export const usePluginStore = create<PluginState>()(
  persist(
    (set, get) => ({
      registry: [],
      plugins: {},

      registerPlugin: (manifest) =>
        set((s) => {
          if (s.registry.some((p) => p.id === manifest.id)) return s;
          return {
            registry: [...s.registry, manifest],
            plugins: {
              ...s.plugins,
              [manifest.id]: s.plugins[manifest.id] || {
                id: manifest.id,
                enabled: false,
                config: {},
              },
            },
          };
        }),

      registerPlugins: (manifests) =>
        set((s) => {
          const newRegistry = [...s.registry];
          const newPlugins = { ...s.plugins };
          for (const m of manifests) {
            if (!newRegistry.some((p) => p.id === m.id)) {
              newRegistry.push(m);
              newPlugins[m.id] = newPlugins[m.id] || {
                id: m.id,
                enabled: false,
                config: {},
              };
            }
          }
          return { registry: newRegistry, plugins: newPlugins };
        }),

      enablePlugin: (id) =>
        set((s) => ({
          plugins: {
            ...s.plugins,
            [id]: { ...s.plugins[id], enabled: true },
          },
        })),

      disablePlugin: (id) =>
        set((s) => ({
          plugins: {
            ...s.plugins,
            [id]: { ...s.plugins[id], enabled: false },
          },
        })),

      togglePlugin: (id) =>
        set((s) => ({
          plugins: {
            ...s.plugins,
            [id]: {
              ...s.plugins[id],
              enabled: !s.plugins[id]?.enabled,
            },
          },
        })),

      configurePlugin: (id, config) =>
        set((s) => ({
          plugins: {
            ...s.plugins,
            [id]: { ...s.plugins[id], config },
          },
        })),

      isEnabled: (id) => get().plugins[id]?.enabled ?? false,

      getPlugin: (id) => get().registry.find((p) => p.id === id),

      getEnabledPlugins: () =>
        get().registry.filter((p) => get().plugins[p.id]?.enabled),

      getPluginsByCategory: (category) =>
        get().registry.filter((p) => p.category === category),
    }),
    {
      name: "invoicecore-plugins",
      partialize: (state) => ({ plugins: state.plugins }),
    }
  )
);
