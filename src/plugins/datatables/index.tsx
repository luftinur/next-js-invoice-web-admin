"use client";

import { useState } from "react";
import { usePluginStore } from "@/store/plugin-store";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableColumn {
  key: string;
  label: string;
}

interface DataTablesPluginProps {
  columns?: DataTableColumn[];
  data?: Record<string, unknown>[];
  pageSize?: number;
  fallback?: React.ReactNode;
}

export function DataTablesPlugin({
  columns = [],
  data = [],
  pageSize = 10,
  fallback,
}: DataTablesPluginProps) {
  const enabled = usePluginStore((s) => s.isEnabled("datatables"));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  if (!enabled) {
    return fallback ?? null;
  }

  const filtered = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key] ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey] ?? "";
    const bVal = b[sortKey] ?? "";
    const cmp = String(aVal).localeCompare(String(bVal));
    return sortDir === "asc" ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-8 text-sm"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        />
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground"
                  onClick={() => toggleSort(col.key)}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1">{sortDir === "asc" ? "\u2191" : "\u2193"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, i) => (
              <tr key={i} className={cn("border-b last:border-0 hover:bg-muted/30", i % 2 === 0 && "bg-muted/10")}>
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2 text-sm">
                    {String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{sorted.length} total rows</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-xs" disabled={page === 0} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <span className="px-2">{page + 1} / {totalPages}</span>
          <Button variant="outline" size="icon-xs" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
