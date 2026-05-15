"use client";

import { useState } from "react";
import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Download,
  Search,
  SlidersHorizontal,
  ChevronDown,
  MoreHorizontal,
  FolderKanban,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type ColumnDef } from "@tanstack/react-table";
import { formatCurrency, formatDate } from "@/lib/formatting";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type ProjectStatus = "active" | "on_hold" | "completed" | "cancelled";

interface ProjectRecord {
  id: string;
  name: string;
  client: string;
  budget: number;
  spent: number;
  status: ProjectStatus;
  deadline: string;
  progress: number;
}

const projects: ProjectRecord[] = [
  { id: "1", name: "Website Redesign", client: "Acme Corp", budget: 25000, spent: 18000, status: "active", deadline: "2026-07-15", progress: 72 },
  { id: "2", name: "Mobile App v2", client: "Globex Inc", budget: 45000, spent: 12000, status: "active", deadline: "2026-09-01", progress: 27 },
  { id: "3", name: "API Integration", client: "Initech", budget: 15000, spent: 15000, status: "completed", deadline: "2026-04-30", progress: 100 },
  { id: "4", name: "Brand Identity", client: "Umbrella Co", budget: 12000, spent: 8000, status: "on_hold", deadline: "2026-08-15", progress: 65 },
  { id: "5", name: "Data Migration", client: "Stark Industries", budget: 30000, spent: 5000, status: "active", deadline: "2026-10-01", progress: 17 },
  { id: "6", name: "Security Audit", client: "Wayne Enterprises", budget: 20000, spent: 20000, status: "completed", deadline: "2026-05-10", progress: 100 },
  { id: "7", name: "CRM Implementation", client: "Oscorp", budget: 35000, spent: 22000, status: "active", deadline: "2026-08-30", progress: 63 },
  { id: "8", name: "Legacy System Upgrade", client: "Massive Dynamic", budget: 55000, spent: 8000, status: "on_hold", deadline: "2026-12-01", progress: 15 },
];

const columns: ColumnDef<ProjectRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Project",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          <FolderKanban className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <span className="text-sm font-medium">{row.original.name}</span>
          <p className="text-xs text-muted-foreground">{row.original.client}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "budget",
    header: () => <div className="text-right">Budget</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">{formatCurrency(row.original.budget)}</div>
    ),
  },
  {
    accessorKey: "spent",
    header: () => <div className="text-right">Spent</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums text-muted-foreground">{formatCurrency(row.original.spent)}</div>
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${row.original.progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{row.original.progress}%</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{formatDate(row.original.deadline)}</span>,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger className={cn("flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted")}>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Add Task</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Archive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Track project budgets, timelines, and progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        toolbar={
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
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
              Status
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Badge variant="outline" className="h-9 rounded-md px-3 text-sm font-normal">
              {projects.length} total
            </Badge>
          </div>
        }
      />
    </div>
  );
}
