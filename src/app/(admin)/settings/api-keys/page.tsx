"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Plus, Copy, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const apiKeys = [
  { name: "Production", key: "inv_pk_live_3R7aBcDeFgHiJkLmNoPqRsTu", created: "Jan 15, 2026", status: "active" as const },
  { name: "Development", key: "inv_pk_test_1A2bC3dE4fG5hI6jK7lM8nOp", created: "Mar 20, 2026", status: "active" as const },
];

export default function ApiKeysPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">API Keys</h1>
          <p className="text-sm text-muted-foreground">Manage API keys for integrations</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Create Key</Button>
      </div>

      {apiKeys.map((apiKey) => (
        <Card key={apiKey.name}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-base">{apiKey.name}</CardTitle>
              <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>{apiKey.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
              <code className="flex-1 text-xs font-mono">{apiKey.key}</code>
              <Button variant="ghost" size="icon-xs"><Copy className="h-3 w-3" /></Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Created {apiKey.created}</span>
              <Button variant="ghost" size="xs" className="text-destructive"><Trash2 className="h-3 w-3" /> Revoke</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
