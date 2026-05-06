"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { getNavItemsForRole } from "@/lib/rbac";
import type { UserRole } from "@/types/auth.types";

const roleLabelMap: Record<UserRole, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  KONTRAKTOR: "Kontraktor",
  USER: "User",
};

type DashboardSidebarProps = {
  role: UserRole;
};

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navItems = getNavItemsForRole(role);

  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
      <div className="flex h-16 flex-col justify-center border-b border-[var(--color-border)] px-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Operations</span>
        <span className="text-sm font-medium text-[var(--color-text-secondary)]">Role: {roleLabelMap[role]}</span>
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-[var(--radius-md)] px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
