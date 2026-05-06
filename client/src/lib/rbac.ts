import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import type { UserRole } from "@/types/auth.types";

export type RoleNavItem = {
  href: string;
  label: string;
  roles: UserRole[];
};

export const PROTECTED_ROUTE_RULES: RoleNavItem[] = [
  {
    href: ROUTES.dashboard,
    label: "Overview",
    roles: [ROLES.owner, ROLES.admin, ROLES.kontraktor, ROLES.user],
  },
  {
    href: ROUTES.admin,
    label: "Admin",
    roles: [ROLES.owner, ROLES.admin],
  },
  {
    href: ROUTES.projects,
    label: "Projects",
    roles: [ROLES.owner, ROLES.admin, ROLES.kontraktor, ROLES.user],
  },
  {
    href: ROUTES.estimasi,
    label: "Estimasi",
    roles: [ROLES.owner, ROLES.admin, ROLES.kontraktor, ROLES.user],
  },
  {
    href: ROUTES.marketplace,
    label: "Marketplace",
    roles: [ROLES.owner, ROLES.admin, ROLES.kontraktor, ROLES.user],
  },
  {
    href: ROUTES.contracts,
    label: "Contracts",
    roles: [ROLES.owner, ROLES.admin, ROLES.kontraktor],
  },
  {
    href: ROUTES.clients,
    label: "Clients",
    roles: [ROLES.owner, ROLES.admin, ROLES.user],
  },
  {
    href: ROUTES.suppliers,
    label: "Suppliers",
    roles: [ROLES.owner, ROLES.admin, ROLES.kontraktor],
  },
];

function matchPath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function normalizeRole(value: string | null | undefined): UserRole | null {
  if (!value) return null;

  const role = value.toUpperCase();
  const validRoles: UserRole[] = [ROLES.owner, ROLES.admin, ROLES.kontraktor, ROLES.user];

  return validRoles.includes(role as UserRole) ? (role as UserRole) : null;
}

export function hasRouteAccess(pathname: string, role: UserRole): boolean {
  const matchedRule = PROTECTED_ROUTE_RULES.find((rule) => matchPath(pathname, rule.href));
  if (!matchedRule) return false;

  return matchedRule.roles.includes(role);
}

export function getNavItemsForRole(role: UserRole): RoleNavItem[] {
  return PROTECTED_ROUTE_RULES.filter((item) => item.roles.includes(role));
}

export function canManageAdminActions(role: UserRole): boolean {
  return role === ROLES.owner || role === ROLES.admin;
}
