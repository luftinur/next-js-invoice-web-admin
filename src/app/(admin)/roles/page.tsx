"use client";

import { useRbacStore } from "@/store/rbac-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Plus, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisibilityScopeSelector } from "@/components/rbac/data-visibility";
import type { PermissionResource, PermissionAction, VisibilityScope } from "@/types";

const resources: PermissionResource[] = [
  "invoices", "quotations", "customers", "payments", "subscriptions",
  "reports", "expenses", "projects", "users", "roles", "settings",
];

const actions: PermissionAction[] = ["create", "read", "update", "delete", "approve", "export"];

const resourceLabels: Record<string, string> = {
  invoices: "Invoices", quotations: "Quotations", customers: "Customers",
  payments: "Payments", subscriptions: "Subscriptions", reports: "Reports",
  expenses: "Expenses", projects: "Projects", users: "Users",
  roles: "Roles", settings: "Settings",
};

function PermissionCell({ has }: { has: boolean }) {
  return (
    <div className="flex justify-center">
      {has ? (
        <Check className="h-4 w-4 text-success" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground/40" />
      )}
    </div>
  );
}

export default function RolesPage() {
  const { roles, updateRoleVisibility } = useRbacStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Roles & Permissions</h1>
          <p className="text-sm text-muted-foreground">Define roles and configure access permissions</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {roles.map((role) => (
          <Card key={role.id} className="lg:col-span-5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{role.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">{role.userCount} users</Badge>
                  <Button variant="outline" size="xs">Edit</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Data Visibility Scope</p>
                <VisibilityScopeSelector
                  value={role.visibilityScope}
                  onChange={(scope: VisibilityScope) => updateRoleVisibility(role.type, scope)}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 pr-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Resource</th>
                      {actions.map((action) => (
                        <th key={action} className="pb-2 px-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider capitalize">{action}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map((resource) => {
                      const perm = role.permissions.find((p) => p.resource === resource);
                      return (
                        <tr key={resource} className="border-b last:border-0">
                          <td className="py-2.5 pr-4 text-sm font-medium">{resourceLabels[resource]}</td>
                          {actions.map((action) => (
                            <td key={action} className="py-2.5 px-2">
                              <PermissionCell has={perm ? perm.actions.includes(action) : false} />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
