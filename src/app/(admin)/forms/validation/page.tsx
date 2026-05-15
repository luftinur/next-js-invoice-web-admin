"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

interface FieldState {
  value: string;
  error?: string;
  touched: boolean;
}

export default function ValidationFormsPage() {
  const [fields, setFields] = useState<Record<string, FieldState>>({
    name: { value: "", error: "Name is required", touched: true },
    email: { value: "john@", error: "Invalid email format", touched: true },
    password: { value: "abc", error: "Must be at least 8 characters", touched: true },
    confirm: { value: "xyz", error: "Passwords do not match", touched: true },
    phone: { value: "555-1234", touched: false },
    age: { value: "17", error: "Must be 18 or older", touched: true },
  });

  const updateField = (id: string, value: string) => {
    setFields((prev) => ({ ...prev, [id]: { ...prev[id], value, touched: true } }));
  };

  const validCount = Object.values(fields).filter((f) => !f.error || !f.touched).length;
  const totalCount = Object.keys(fields).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Validation Forms</h1>
        <p className="text-sm text-muted-foreground">{validCount} of {totalCount} fields valid</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Error States</CardTitle>
            <CardDescription>Fields with validation errors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["name", "email", "password", "confirm"].map((id) => {
              const field = fields[id];
              const hasError = field.touched && field.error;
              return (
                <div key={id} className="space-y-1">
                  <Label htmlFor={id} className={hasError ? "text-destructive" : ""}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </Label>
                  <div className="relative">
                    <Input
                      id={id}
                      type={id === "password" || id === "confirm" ? "password" : "text"}
                      value={field.value}
                      onChange={(e) => updateField(id, e.target.value)}
                      aria-invalid={!!hasError}
                      className={cn(hasError && "border-destructive")}
                      placeholder={`Enter ${id}...`}
                    />
                    {hasError && (
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      </div>
                    )}
                  </div>
                  {hasError && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3" /> {field.error}
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Success States</CardTitle>
            <CardDescription>Fields that pass validation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-success">Username</Label>
              <div className="relative">
                <Input
                  value="johndoe"
                  readOnly
                  className="border-success pr-8"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
              </div>
              <p className="flex items-center gap-1 text-xs text-success">
                <CheckCircle2 className="h-3 w-3" /> Username is available
              </p>
            </div>

            <div className="space-y-1">
              <Label className="text-success">Email</Label>
              <div className="relative">
                <Input
                  value="johndoe@example.com"
                  readOnly
                  className="border-success pr-8"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
              </div>
              <p className="flex items-center gap-1 text-xs text-success">
                <CheckCircle2 className="h-3 w-3" /> Email verified
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Helper & Hint Text</CardTitle>
            <CardDescription>Descriptive text below inputs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Password</Label>
              <Input type="password" placeholder="Create a strong password" />
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3 w-3" /> Must be at least 8 characters with 1 number and 1 special character
              </p>
            </div>
            <div className="space-y-1">
              <Label>Website</Label>
              <Input placeholder="https://example.com" />
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="h-3 w-3" /> Enter the full URL including https://
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Disabled & Read-only</CardTitle>
            <CardDescription>Non-interactive field states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Read-only</Label>
              <Input value="This value cannot be edited" readOnly />
            </div>
            <div className="space-y-1">
              <Label>Disabled</Label>
              <Input value="This field is disabled" disabled />
            </div>
            <div className="space-y-1">
              <Label>Disabled with placeholder</Label>
              <Input disabled placeholder="Not available" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
