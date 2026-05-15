"use client";

import { useState } from "react";
import { useRbacStore } from "@/store/rbac-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Shield, Mail, CalendarDays, Activity } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatting";

const roleBadgeStyles: Record<string, string> = {
  super_admin: "bg-destructive/10 text-destructive",
  finance_admin: "bg-info/10 text-info",
  accountant: "bg-success/10 text-success",
  staff: "bg-muted text-muted-foreground",
  viewer: "bg-warning/10 text-warning",
};

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { users, roles, updateUserRole } = useRbacStore();
  const [id, setId] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  params.then((p) => {
    if (!id) {
      setId(p.id);
      const user = users.find((u) => u.id === p.id);
      if (user) setSelectedRole(user.role);
    }
  });

  const user = users.find((u) => u.id === id);
  if (!user) return <div className="p-6 text-sm text-muted-foreground">User not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/users" className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight">{user.name}</h1>
            <span className={cn("h-2 w-2 rounded-full", user.status === "active" ? "bg-success" : user.status === "invited" ? "bg-warning" : "bg-muted-foreground")} />
            <span className="text-sm capitalize text-muted-foreground">{user.status}</span>
          </div>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user.email} type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={selectedRole} onValueChange={(v) => { const val = v || ""; setSelectedRole(val); updateUserRole(user.id, val as any); }}>
                  <SelectTrigger id="role" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.type}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Save Changes</Button>
                <Button variant="outline" size="sm">Reset Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Logged in", date: "2026-05-14T09:30:00" },
                  { action: "Updated invoice INV-000001", date: "2026-05-14T09:15:00" },
                  { action: "Created new invoice", date: "2026-05-13T14:30:00" },
                  { action: "Changed password", date: "2026-05-10T11:00:00" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1">{log.action}</span>
                    <span className="text-xs text-muted-foreground">{formatDate(log.date)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Role Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 rounded-lg bg-primary/10 p-1.5 text-primary" />
                <div>
                  <Badge variant="outline" className={cn(roleBadgeStyles[user.role])}>
                    {user.roleName}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Permissions</p>
                {[
                  { label: "Invoices", count: "5 actions" },
                  { label: "Customers", count: "4 actions" },
                  { label: "Payments", count: "4 actions" },
                ].map((perm, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{perm.label}</span>
                    <span className="text-xs text-muted-foreground">{perm.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Joined {formatDate(user.createdAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
