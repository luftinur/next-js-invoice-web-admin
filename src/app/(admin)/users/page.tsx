"use client";

import { useState } from "react";
import { DataTable } from "@/components/tables/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Shield, SlidersHorizontal, ChevronDown } from "lucide-react";
import { type ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/formatting";
import Link from "next/link";
import { useRbacStore } from "@/store/rbac-store";
import type { AppUser } from "@/types";

const roleBadgeStyles: Record<string, string> = {
  super_admin: "bg-destructive/10 text-destructive border-destructive/20",
  finance_admin: "bg-info/10 text-info border-info/20",
  accountant: "bg-success/10 text-success border-success/20",
  staff: "bg-muted text-muted-foreground border-border",
  viewer: "bg-warning/10 text-warning border-warning/20",
};

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  finance_admin: "Finance Admin",
  accountant: "Accountant",
  staff: "Staff",
  viewer: "Viewer",
};

const userColumns: ColumnDef<AppUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" checked={table.getIsAllPageRowsSelected()} onChange={table.getToggleAllPageRowsSelectedHandler()} />
    ),
    cell: ({ row }) => (
      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {row.original.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/users/${row.original.id}`} className="text-sm font-medium hover:underline">
            {row.original.name}
          </Link>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className={cn("font-medium", roleBadgeStyles[row.original.role])}>
        {roleLabels[row.original.role] || row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", status === "active" ? "bg-success" : status === "invited" ? "bg-warning" : "bg-muted-foreground")} />
          <span className="text-sm capitalize">{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.lastActive ? formatDate(row.original.lastActive) : "Never"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className={cn("flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted")}>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Edit Role</DropdownMenuItem>
          <DropdownMenuItem>Reset Password</DropdownMenuItem>
          <DropdownMenuSeparator />
          {row.original.status === "active" ? (
            <DropdownMenuItem variant="destructive">Deactivate</DropdownMenuItem>
          ) : (
            <DropdownMenuItem>Activate</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const { users } = useRbacStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Users & Roles</h1>
          <p className="text-sm text-muted-foreground">Manage team members and their access permissions</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/roles">
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4" />
              Roles
            </Button>
          </Link>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Invite User
          </Button>
        </div>
      </div>

      <DataTable
        columns={userColumns}
        data={users}
        toolbar={
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-64 pl-9"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              Role
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        }
        bulkActions={
          <>
            <Button size="xs" variant="outline">Change Role</Button>
            <Button size="xs" variant="outline">Deactivate</Button>
          </>
        }
      />
    </div>
  );
}
