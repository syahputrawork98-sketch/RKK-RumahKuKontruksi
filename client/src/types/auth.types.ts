import { ROLES } from "@/constants/roles";

export type UserRole = "OWNER" | "KONTRAKTOR" | "USER" | "ADMIN";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

export type AuthSession = {
  accessToken: string;
  refreshToken?: string;
  role: UserRole;
  user: AuthUser;
};

const ROLE_FALLBACK: UserRole = ROLES.user;

const ROLE_MAP: Record<string, UserRole> = {
  OWNER: ROLES.owner,
  ADMIN: ROLES.admin,
  KONTRAKTOR: ROLES.kontraktor,
  CONTRACTOR: ROLES.kontraktor,
  VENDOR: ROLES.kontraktor,
  PROJECT_MANAGER: ROLES.user,
  USER: ROLES.user,
};

export function mapRoleFromApi(roles: string[]): UserRole {
  for (const role of roles) {
    const normalized = role.trim().toUpperCase();
    if (normalized in ROLE_MAP) {
      return ROLE_MAP[normalized];
    }
  }

  return ROLE_FALLBACK;
}
