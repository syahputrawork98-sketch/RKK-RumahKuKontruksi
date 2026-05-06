"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AdminManagedUser } from "@/types/admin.types";
import type { UserRole } from "@/types/auth.types";

type AdminUserManagementProps = {
  currentRole: UserRole;
  initialUsers: AdminManagedUser[];
};

type UserActionError = {
  error?: {
    message?: string;
  };
};

export function AdminUserManagement({ currentRole, initialUsers }: AdminUserManagementProps) {
  const [users, setUsers] = useState(initialUsers);
  const [error, setError] = useState<string | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  async function toggleStatus(user: AdminManagedUser) {
    setError(null);
    setLoadingUserId(user.id);

    try {
      const nextStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const response = await fetch("/api/admin/users/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, status: nextStatus }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as UserActionError | null;
        setError(payload?.error?.message ?? "Gagal memperbarui status user.");
        return;
      }

      setUsers((prev) => prev.map((item) => (item.id === user.id ? { ...item, status: nextStatus } : item)));
    } finally {
      setLoadingUserId(null);
    }
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-[var(--color-danger)]">{error}</p> : null}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[var(--color-text-muted)]">
              <th className="px-2 py-2">Nama</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Role</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const canToggle = currentRole === "OWNER" || (currentRole === "ADMIN" && user.role !== "OWNER");
              const isLoading = loadingUserId === user.id;

              return (
                <tr key={user.id} className="border-b border-[var(--color-divider)]">
                  <td className="px-2 py-2 text-[var(--color-text-primary)]">{user.name}</td>
                  <td className="px-2 py-2 text-[var(--color-text-secondary)]">{user.email}</td>
                  <td className="px-2 py-2 text-[var(--color-text-secondary)]">{user.role}</td>
                  <td className="px-2 py-2">
                    <span
                      className={
                        user.status === "ACTIVE"
                          ? "text-[var(--color-success)]"
                          : "text-[var(--color-danger)]"
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={!canToggle || isLoading}
                      onClick={() => toggleStatus(user)}
                    >
                      {isLoading
                        ? "Memproses..."
                        : user.status === "ACTIVE"
                        ? "Nonaktifkan"
                        : "Aktifkan"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
