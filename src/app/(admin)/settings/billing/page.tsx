"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Download } from "lucide-react";

export default function BillingSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your subscription and payment methods</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Professional Plan</p>
              <p className="text-sm text-muted-foreground">$79/month • Next billing Jun 1, 2026</p>
            </div>
            <Button variant="outline" size="sm">Change Plan</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2028</p>
            </div>
            <Button variant="ghost" size="sm">Update</Button>
          </div>
          <div className="space-y-1">
            <Label>Billing Email</Label>
            <Input defaultValue="billing@invoicecore.io" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline"><Download className="h-4 w-4" /> Invoices</Button>
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
