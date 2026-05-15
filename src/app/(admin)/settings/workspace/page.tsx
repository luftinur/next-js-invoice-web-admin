"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Save, Building2, Globe, Clock } from "lucide-react";

export default function WorkspaceSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Workspace</h1>
        <p className="text-sm text-muted-foreground">Configure your workspace settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1"><Label>Workspace Name</Label><Input defaultValue="InvoiceCore" /></div>
          <div className="space-y-1"><Label>Workspace Slug</Label><Input defaultValue="invoicecore" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1"><Label>Time Zone</Label><Input defaultValue="America/New_York" /></div>
            <div className="space-y-1"><Label>Currency</Label><Input defaultValue="USD ($)" /></div>
          </div>
          <Separator />
          <div className="flex justify-end"><Button><Save className="h-4 w-4" /> Save</Button></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-destructive/20 p-4">
            <div>
              <p className="text-sm font-medium">Delete Workspace</p>
              <p className="text-xs text-muted-foreground">Permanently delete this workspace and all data</p>
            </div>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
