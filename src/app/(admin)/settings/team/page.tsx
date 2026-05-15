"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, Shield } from "lucide-react";

const team = [
  { name: "John Doe", email: "john@invoicecore.io", role: "Finance Admin", status: "active" as const },
  { name: "Sarah Chen", email: "sarah@invoicecore.io", role: "Accountant", status: "active" as const },
  { name: "Mike Ross", email: "mike@invoicecore.io", role: "Staff", status: "active" as const },
  { name: "Rachel Zane", email: "rachel@invoicecore.io", role: "Viewer", status: "active" as const },
  { name: "Donna Paulsen", email: "donna@invoicecore.io", role: "Accountant", status: "inactive" as const },
];

export default function TeamSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">Manage team members and roles</p>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Invite Member</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {team.map((member, i) => (
            <div key={i}>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted text-xs">{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{member.role}</Badge>
                  <span className={`text-xs ${member.status === "active" ? "text-success" : "text-muted-foreground"}`}>{member.status}</span>
                </div>
              </div>
              {i < team.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
