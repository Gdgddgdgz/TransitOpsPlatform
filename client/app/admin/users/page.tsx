"use client";

import { useOrgUsers } from "@/lib/backend-queries";
import AdminLayout from "@/features/admin/shared/components/AdminLayout";
import { Users, ShieldCheck, Loader2, UserX } from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Admin",
  FLEET_MANAGER: "Fleet Manager",
  DRIVER: "Driver",
  SAFETY_OFFICER: "Safety Officer",
  FINANCIAL_ANALYST: "Financial Analyst",
  DISPATCHER: "Dispatcher",
};

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  FLEET_MANAGER: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  DRIVER: "bg-lime-500/15 text-lime-400 border-lime-500/30",
  SAFETY_OFFICER: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  FINANCIAL_ANALYST: "bg-pink-500/15 text-pink-400 border-pink-500/30",
  DISPATCHER: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export default function UsersPage() {
  const { data: users = [], isLoading, error } = useOrgUsers();

  const activeCount = users.filter((u) => u.isActive).length;
  const pendingCount = users.filter((u) => !u.isActive).length;

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-display font-semibold tracking-tight">Users</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isLoading ? "Loading..." : `${users.length} total · ${activeCount} active · ${pendingCount} pending`}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            Unable to load users. Make sure you are signed in as an Admin.
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-muted-foreground gap-3">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading users...</span>
          </div>
        )}

        {/* Users Table */}
        {!isLoading && !error && (
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-muted-foreground text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      <UserX className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No users found in this organization.
                    </td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-pink flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-foreground">
                          {user.name || <span className="text-muted-foreground italic">Not set</span>}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                          ROLE_COLORS[user.role] ?? "bg-secondary text-muted-foreground border-border"
                        }`}
                      >
                        {ROLE_LABELS[user.role] ?? user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-lime-500/15 text-lime-400 border border-lime-500/30">
                          <ShieldCheck className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          <Users className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {user.createdAt
                        ? new Date(user.createdAt as string).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
