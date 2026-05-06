import { ROLES } from "../constants/roles";
import type { AdminApprovalStatus } from "../types/admin.types";
import type { UserRole } from "../types/auth.types";

type GuardResult =
  | { ok: true }
  | {
      ok: false;
      status: 401 | 403 | 404 | 409;
      code: "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT";
      message: string;
    };

export function guardAdminAuth(hasSession: boolean, role: UserRole | null): GuardResult {
  if (!hasSession || !role) {
    return {
      ok: false,
      status: 401,
      code: "UNAUTHORIZED",
      message: "Authentication required.",
    };
  }

  if (role !== ROLES.owner && role !== ROLES.admin) {
    return {
      ok: false,
      status: 403,
      code: "FORBIDDEN",
      message: "Akses ditolak untuk aksi ini.",
    };
  }

  return { ok: true };
}

export function guardUserStatusMutation(actorRole: UserRole, targetRole: UserRole): GuardResult {
  if (actorRole === ROLES.admin && targetRole === ROLES.owner) {
    return {
      ok: false,
      status: 403,
      code: "FORBIDDEN",
      message: "Admin tidak dapat mengubah status Owner.",
    };
  }

  return { ok: true };
}

export function guardResourceExists(exists: boolean, resourceName: string): GuardResult {
  if (!exists) {
    return {
      ok: false,
      status: 404,
      code: "NOT_FOUND",
      message: `${resourceName} tidak ditemukan.`,
    };
  }

  return { ok: true };
}

export function guardApprovalPending(status: AdminApprovalStatus): GuardResult {
  if (status !== "PENDING") {
    return {
      ok: false,
      status: 409,
      code: "CONFLICT",
      message: "Approval sudah diproses sebelumnya.",
    };
  }

  return { ok: true };
}
