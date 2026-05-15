"use client";

import { useEffect } from "react";
import { useRegisterPlugins } from "@/lib/plugin-registry";

export function PluginProvider({ children }: { children: React.ReactNode }) {
  const { registerPlugins, manifests } = useRegisterPlugins();

  useEffect(() => {
    registerPlugins(manifests);
  }, [registerPlugins, manifests]);

  return <>{children}</>;
}
