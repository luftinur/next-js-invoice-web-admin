import { create } from "zustand";
import type { AppUser, Role, RoleType, Permission, PermissionResource, PermissionAction, VisibilityScope } from "@/types";

interface RbacState {
  users: AppUser[];
  roles: Role[];
  currentUserRole: RoleType;
  hasPermission: (resource: PermissionResource, action: PermissionAction) => boolean;
  hasRole: (role: RoleType | RoleType[]) => boolean;
  getVisibilityScope: () => VisibilityScope;
  filterDataByVisibility: <T extends { assignedTo?: string; customerId?: string; region?: string; createdBy?: string }>(data: T[]) => T[];
  addUser: (user: AppUser) => void;
  updateUserRole: (userId: string, role: RoleType) => void;
  updateUserStatus: (userId: string, status: AppUser["status"]) => void;
  removeUser: (userId: string) => void;
  setCurrentUserRole: (role: RoleType) => void;
  updateRoleVisibility: (roleType: RoleType, scope: VisibilityScope) => void;
}

const defaultRoles: Role[] = [
  {
    id: "1", name: "Super Admin", type: "super_admin",
    description: "Full system access with all permissions",
    visibilityScope: "all",
    permissions: [
      { resource: "invoices", actions: ["create", "read", "update", "delete", "approve", "export"] },
      { resource: "customers", actions: ["create", "read", "update", "delete", "export"] },
      { resource: "payments", actions: ["create", "read", "update", "delete", "export"] },
      { resource: "users", actions: ["create", "read", "update", "delete"] },
      { resource: "roles", actions: ["create", "read", "update", "delete"] },
      { resource: "settings", actions: ["read", "update"] },
    ],
    userCount: 2, createdAt: "2026-01-01",
  },
  {
    id: "2", name: "Finance Admin", type: "finance_admin",
    description: "Full financial module access",
    visibilityScope: "department",
    permissions: [
      { resource: "invoices", actions: ["create", "read", "update", "delete", "approve", "export"] },
      { resource: "customers", actions: ["create", "read", "update", "export"] },
      { resource: "payments", actions: ["create", "read", "update", "export"] },
      { resource: "reports", actions: ["read", "export"] },
    ],
    userCount: 3, createdAt: "2026-01-15",
  },
  {
    id: "3", name: "Accountant", type: "accountant",
    description: "Read and manage financial records",
    visibilityScope: "assigned",
    permissions: [
      { resource: "invoices", actions: ["create", "read", "update", "export"] },
      { resource: "customers", actions: ["read"] },
      { resource: "payments", actions: ["read", "export"] },
      { resource: "reports", actions: ["read", "export"] },
    ],
    userCount: 5, createdAt: "2026-02-01",
  },
  {
    id: "4", name: "Staff", type: "staff",
    description: "Basic operational access",
    visibilityScope: "own",
    permissions: [
      { resource: "invoices", actions: ["create", "read", "update"] },
      { resource: "customers", actions: ["create", "read", "update"] },
      { resource: "payments", actions: ["read"] },
    ],
    userCount: 8, createdAt: "2026-02-15",
  },
  {
    id: "5", name: "Viewer", type: "viewer",
    description: "Read-only access to dashboards and reports",
    visibilityScope: "none",
    permissions: [
      { resource: "invoices", actions: ["read"] },
      { resource: "customers", actions: ["read"] },
      { resource: "payments", actions: ["read"] },
      { resource: "reports", actions: ["read"] },
    ],
    userCount: 12, createdAt: "2026-03-01",
  },
  {
    id: "6", name: "Customer Portal User", type: "customer_portal",
    description: "Self-service access for customers to view their invoices and payments",
    visibilityScope: "own",
    permissions: [
      { resource: "invoices", actions: ["read"] },
      { resource: "payments", actions: ["read"] },
      { resource: "customers", actions: ["read"] },
    ],
    userCount: 0, createdAt: "2026-05-15",
  },
];

const defaultUsers: AppUser[] = [
  { id: "1", name: "John Doe", email: "john@invoicecore.io", role: "super_admin", roleName: "Super Admin", status: "active", lastActive: "2026-05-14T09:30:00", createdAt: "2026-01-01" },
  { id: "2", name: "Jane Smith", email: "jane@invoicecore.io", role: "finance_admin", roleName: "Finance Admin", status: "active", lastActive: "2026-05-14T08:15:00", createdAt: "2026-01-15" },
  { id: "3", name: "Mike Chen", email: "mike@invoicecore.io", role: "accountant", roleName: "Accountant", status: "active", lastActive: "2026-05-13T16:45:00", createdAt: "2026-02-01" },
  { id: "4", name: "Sarah Lee", email: "sarah@invoicecore.io", role: "staff", roleName: "Staff", status: "active", lastActive: "2026-05-14T10:00:00", createdAt: "2026-03-10" },
  { id: "5", name: "Alex Rivera", email: "alex@invoicecore.io", role: "viewer", roleName: "Viewer", status: "active", lastActive: "2026-05-12T14:30:00", createdAt: "2026-03-15" },
  { id: "6", name: "Emily Watson", email: "emily@invoicecore.io", role: "staff", roleName: "Staff", status: "inactive", lastActive: "2026-05-01T11:00:00", createdAt: "2026-04-01" },
  { id: "7", name: "Tom Bradley", email: "tom@invoicecore.io", role: "accountant", roleName: "Accountant", status: "invited", lastActive: "", createdAt: "2026-05-14" },
];

const rolePermissions: Record<RoleType, Permission[]> = {
  super_admin: [
    { resource: "invoices", actions: ["create", "read", "update", "delete", "approve", "export"] },
    { resource: "customers", actions: ["create", "read", "update", "delete", "export"] },
    { resource: "payments", actions: ["create", "read", "update", "delete", "export"] },
    { resource: "users", actions: ["create", "read", "update", "delete"] },
    { resource: "roles", actions: ["create", "read", "update", "delete"] },
    { resource: "settings", actions: ["read", "update"] },
  ],
  finance_admin: [
    { resource: "invoices", actions: ["create", "read", "update", "delete", "approve", "export"] },
    { resource: "customers", actions: ["create", "read", "update", "export"] },
    { resource: "payments", actions: ["create", "read", "update", "export"] },
    { resource: "reports", actions: ["read", "export"] },
  ],
  accountant: [
    { resource: "invoices", actions: ["create", "read", "update", "export"] },
    { resource: "customers", actions: ["read"] },
    { resource: "payments", actions: ["read", "export"] },
    { resource: "reports", actions: ["read", "export"] },
  ],
  staff: [
    { resource: "invoices", actions: ["create", "read", "update"] },
    { resource: "customers", actions: ["create", "read", "update"] },
    { resource: "payments", actions: ["read"] },
  ],
  viewer: [
    { resource: "invoices", actions: ["read"] },
    { resource: "customers", actions: ["read"] },
    { resource: "payments", actions: ["read"] },
    { resource: "reports", actions: ["read"] },
  ],
  customer_portal: [
    { resource: "invoices", actions: ["read"] },
    { resource: "payments", actions: ["read"] },
    { resource: "customers", actions: ["read"] },
  ],
};

export const useRbacStore = create<RbacState>((set, get) => ({
  users: defaultUsers,
  roles: defaultRoles,
  currentUserRole: "super_admin",

  hasPermission: (resource, action) => {
    const { currentUserRole } = get();
    const perms = rolePermissions[currentUserRole];
    const resourcePerm = perms.find((p) => p.resource === resource);
    return resourcePerm ? resourcePerm.actions.includes(action) : false;
  },

  hasRole: (role) => {
    const { currentUserRole } = get();
    return Array.isArray(role) ? role.includes(currentUserRole) : currentUserRole === role;
  },

  getVisibilityScope: () => {
    const { currentUserRole, roles } = get();
    return roles.find((r) => r.type === currentUserRole)?.visibilityScope ?? "none";
  },

  filterDataByVisibility: (data) => {
    const { currentUserRole } = get();
    const scope = get().getVisibilityScope();
    if (scope === "all") return data;
    if (scope === "none") return [];
    return data.filter((item) => {
      if (scope === "own" && item.createdBy) return item.createdBy === currentUserRole;
      if (scope === "assigned" && item.assignedTo) return item.assignedTo === currentUserRole;
      if (scope === "department" && item.customerId) return true;
      return true;
    });
  },

  setCurrentUserRole: (role) => set({ currentUserRole: role }),

  updateRoleVisibility: (roleType, scope) =>
    set((s) => ({
      roles: s.roles.map((r) =>
        r.type === roleType ? { ...r, visibilityScope: scope } : r
      ),
    })),

  addUser: (user) => set((s) => ({ users: [...s.users, user] })),
  updateUserRole: (userId, role) =>
    set((s) => ({
      users: s.users.map((u) =>
        u.id === userId ? { ...u, role, roleName: s.roles.find((r) => r.type === role)?.name || role } : u
      ),
    })),
  updateUserStatus: (userId, status) =>
    set((s) => ({
      users: s.users.map((u) => (u.id === userId ? { ...u, status } : u)),
    })),
  removeUser: (userId) =>
    set((s) => ({ users: s.users.filter((u) => u.id !== userId) })),
}));
