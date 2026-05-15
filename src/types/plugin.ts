import type { ComponentType } from "react";

export type PluginCategory = "chart" | "ui" | "editor" | "file" | "calendar" | "table";

export interface PluginManifest {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  icon: string;
  category: PluginCategory;
  homepage?: string;
  npmPackage?: string;
  isBuiltIn: boolean;
  component?: ComponentType<PluginComponentProps>;
  settings?: ComponentType<PluginSettingsProps>;
}

export interface PluginConfig {
  id: string;
  enabled: boolean;
  config: Record<string, unknown>;
}

export interface PluginComponentProps {
  fallback?: React.ReactNode;
  [key: string]: unknown;
}

export interface PluginSettingsProps {
  pluginId: string;
  config: Record<string, unknown>;
  onConfigChange: (config: Record<string, unknown>) => void;
}
