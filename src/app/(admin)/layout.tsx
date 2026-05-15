"use client";

import { AdminLayout } from "@/layouts/admin-layout";
import { CompactLayout } from "@/layouts/compact-layout";
import { HorizontalLayout } from "@/layouts/horizontal-layout";
import { useThemeStore } from "@/store/theme-store";

function LayoutRenderer({ children }: { children: React.ReactNode }) {
  const activeLayout = useThemeStore((s) => s.activeLayout);

  switch (activeLayout) {
    case "compact":
      return <CompactLayout>{children}</CompactLayout>;
    case "horizontal":
      return <HorizontalLayout>{children}</HorizontalLayout>;
    default:
      return <AdminLayout>{children}</AdminLayout>;
  }
}

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutRenderer>{children}</LayoutRenderer>;
}
