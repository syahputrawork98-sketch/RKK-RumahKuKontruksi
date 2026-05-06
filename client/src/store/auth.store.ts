import type { AuthUser, UserRole } from "@/types/auth.types";

export type AuthStore = {
  isAuthenticated: boolean;
  role: UserRole | null;
  user: AuthUser | null;
};
