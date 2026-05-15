"use client";

import { PluginManager } from "@/components/plugins/plugin-manager";

export default function PluginsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Plugin Manager</h1>
        <p className="text-sm text-muted-foreground">Enable, disable, and configure plugins for extended functionality</p>
      </div>
      <PluginManager />
    </div>
  );
}
