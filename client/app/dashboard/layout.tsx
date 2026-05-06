import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { ROLES } from "@/constants/roles";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { normalizeRole } from "@/lib/rbac";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get(AUTH_COOKIE_NAMES.role)?.value;
  const role = normalizeRole(roleCookie) ?? ROLES.user;

  return (
    <div className="flex min-h-[calc(100vh-8rem)] bg-[var(--color-background)]">
      <DashboardSidebar role={role} />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
