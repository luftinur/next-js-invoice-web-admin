"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Code, Eye } from "lucide-react";
import { useState } from "react";

export default function BasicFormsPage() {
  const [showCode, setShowCode] = useState(false);

  const fields = [
    { id: "text", label: "Text Input", type: "text", placeholder: "Enter text..." },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { id: "password", label: "Password", type: "password", placeholder: "••••••••" },
    { id: "number", label: "Number", type: "number", placeholder: "0" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Basic Forms</h1>
          <p className="text-sm text-muted-foreground">Standard HTML form elements and controls</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowCode(!showCode)} className="cursor-pointer">
          {showCode ? <Eye className="h-4 w-4" /> : <Code className="h-4 w-4" />}
          {showCode ? "Preview" : "Code"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input Fields</CardTitle>
            <CardDescription>Basic text, email, password, and number inputs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((f) => (
              <div key={f.id} className="space-y-1">
                <Label htmlFor={f.id}>{f.label}</Label>
                <Input id={f.id} type={f.type} placeholder={f.placeholder} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Select & Textarea</CardTitle>
            <CardDescription>Dropdown and multi-line text input</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="select-country">Country</Label>
              <Select defaultValue="us">
                <SelectTrigger id="select-country" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." className="min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Selection Controls</CardTitle>
            <CardDescription>Checkboxes, switches, and radio buttons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium">Checkboxes</p>
              {["Option A", "Option B", "Option C"].map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <Checkbox id={`cb-${option}`} />
                  <Label htmlFor={`cb-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-3">
              <p className="text-sm font-medium">Switches</p>
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications</Label>
                <Switch id="notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-save">Auto-save</Label>
                <Switch id="auto-save" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Form Actions</CardTitle>
            <CardDescription>Common button groups and form submission</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="John Doe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message..." className="min-h-[80px]" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
              <Button className="cursor-pointer">Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
