"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function CreateCustomerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/customers" className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Add Customer</h1>
          <p className="text-sm text-muted-foreground">Create a new customer record</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label>First Name</Label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-1">
                <Label>Last Name</Label>
                <Input placeholder="Smith" />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" placeholder="john@company.com" />
            </div>
            <div className="space-y-1">
              <Label>Company</Label>
              <Input placeholder="Company Inc." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label>Phone</Label>
                <Input placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-1">
                <Label>Tax ID</Label>
                <Input placeholder="XX-XXXXXXX" />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Address</Label>
              <Input placeholder="Street address" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <Label>City</Label>
                <Input placeholder="City" />
              </div>
              <div className="space-y-1">
                <Label>State</Label>
                <Input placeholder="State" />
              </div>
              <div className="space-y-1">
                <Label>ZIP</Label>
                <Input placeholder="ZIP code" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline">Cancel</Button>
              <Button><Save className="h-4 w-4" /> Save Customer</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
