import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, unknown>;
  createdAt: string;
}

interface FilterStore {
  savedFilters: Record<string, SavedFilter[]>;
  saveFilter: (page: string, name: string, filters: Record<string, unknown>) => void;
  deleteFilter: (page: string, filterId: string) => void;
  getFilters: (page: string) => SavedFilter[];
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      savedFilters: {},
      saveFilter: (page, name, filters) =>
        set((s) => {
          const existing = s.savedFilters[page] || [];
          const newFilter: SavedFilter = {
            id: `${Date.now()}`,
            name,
            filters,
            createdAt: new Date().toISOString(),
          };
          return {
            savedFilters: { ...s.savedFilters, [page]: [...existing, newFilter] },
          };
        }),
      deleteFilter: (page, filterId) =>
        set((s) => ({
          savedFilters: {
            ...s.savedFilters,
            [page]: (s.savedFilters[page] || []).filter((f) => f.id !== filterId),
          },
        })),
      getFilters: (page) => get().savedFilters[page] || [],
    }),
    { name: "invoicecore-filters" }
  )
);
