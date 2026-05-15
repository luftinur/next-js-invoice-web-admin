"use client";

import { useState } from "react";
import { usePluginStore } from "@/store/plugin-store";
import { PluginCard } from "@/components/plugins/plugin-card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Puzzle, Plug, Zap } from "lucide-react";

const categories = [
  { value: "all", label: "All", icon: Puzzle },
  { value: "chart", label: "Charts", icon: Zap },
  { value: "ui", label: "UI", icon: Plug },
  { value: "editor", label: "Editor", icon: Puzzle },
  { value: "file", label: "File", icon: Puzzle },
  { value: "calendar", label: "Calendar", icon: Puzzle },
  { value: "table", label: "Table", icon: Puzzle },
];

export function PluginManager() {
  const registry = usePluginStore((s) => s.registry);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = registry.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  if (registry.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Puzzle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No plugins registered</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Plugins will appear here once registered.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search plugins..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={category} onValueChange={setCategory}>
        <TabsList className="flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <TabsTrigger key={cat.value} value={cat.value} className="cursor-pointer">
                <Icon className="h-3.5 w-3.5" />
                {cat.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((plugin) => (
          <PluginCard key={plugin.id} plugin={plugin} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No plugins match your search.
          </p>
        </div>
      )}
    </div>
  );
}
