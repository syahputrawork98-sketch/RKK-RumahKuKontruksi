import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { ROLES } from "@/constants/roles";
import { canManageAdminActions, normalizeRole } from "@/lib/rbac";
import { AdminUserManagement } from "@/components/sections/admin-user-management";
import { AdminApprovalQueue } from "@/components/sections/admin-approval-queue";
import { getAdminApprovals, getAdminManagedUsers } from "@/lib/admin-data";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Kelola user sistem dan approval operasional untuk role Owner/Admin.",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const role = normalizeRole(cookieStore.get(AUTH_COOKIE_NAMES.role)?.value) ?? ROLES.user;

  const users = getAdminManagedUsers();
  const approvals = getAdminApprovals();
  const canManage = canManageAdminActions(role);

  return (
    <section>
      <DashboardTopbar
        title="Admin Panel"
        subtitle="Kelola user, status akun, dan approval queue dengan permission enforcement."
      />

      <div className="space-y-6 p-6">
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            {canManage ? (
              <AdminUserManagement currentRole={role} initialUsers={users} />
            ) : (
              <p className="text-sm text-[var(--color-danger)]">
                Anda tidak memiliki akses untuk mengelola user.
              </p>
            )}
          </CardContent>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Approval Queue</CardTitle>
          </CardHeader>
          <CardContent>
            {canManage ? (
              <AdminApprovalQueue currentRole={role} initialApprovals={approvals} />
            ) : (
              <p className="text-sm text-[var(--color-danger)]">
                Anda tidak memiliki akses untuk memproses approval.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
