"use client";

import { usePluginStore } from "@/store/plugin-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PluginManifest } from "@/types/plugin";

interface PluginCardProps {
  plugin: PluginManifest;
}

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const iconName = name as keyof typeof Icons;
  const Icon = Icons[iconName] as LucideIcon | undefined;
  if (!Icon) {
    return <Icons.Puzzle className={className} />;
  }
  return <Icon className={className} />;
}

const categoryColors: Record<string, string> = {
  chart: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  ui: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  editor: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  file: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  calendar: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  table: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
};

export function PluginCard({ plugin }: PluginCardProps) {
  const plugins = usePluginStore((s) => s.plugins);
  const togglePlugin = usePluginStore((s) => s.togglePlugin);
  const config = plugins[plugin.id];
  const enabled = config?.enabled ?? false;
  const categoryLabel = plugin.category.charAt(0).toUpperCase() + plugin.category.slice(1);

  return (
    <Card className={cn("transition-all", enabled && "ring-1 ring-primary/20")}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <DynamicIcon name={plugin.icon} className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">{plugin.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">v{plugin.version}</p>
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={() => togglePlugin(plugin.id)}
        />
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {plugin.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0", categoryColors[plugin.category])}>
            {categoryLabel}
          </Badge>
          <span className="text-[10px] text-muted-foreground">{plugin.author}</span>
        </div>
      </CardContent>
    </Card>
  );
}
