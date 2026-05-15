import { create } from "zustand";
import type { InvoiceStatus } from "@/types";

interface InvoiceFilters {
  search: string;
  status: InvoiceStatus | "all";
  dateFrom: string;
  dateTo: string;
  customerId: string;
}

interface InvoiceState {
  filters: InvoiceFilters;
  selectedIds: string[];
  setFilter: <K extends keyof InvoiceFilters>(key: K, value: InvoiceFilters[K]) => void;
  resetFilters: () => void;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
}

const defaultFilters: InvoiceFilters = {
  search: "",
  status: "all",
  dateFrom: "",
  dateTo: "",
  customerId: "",
};

export const useInvoiceStore = create<InvoiceState>((set) => ({
  filters: { ...defaultFilters },
  selectedIds: [],
  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
  toggleSelection: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id)
        ? s.selectedIds.filter((i) => i !== id)
        : [...s.selectedIds, id],
    })),
  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),
}));
