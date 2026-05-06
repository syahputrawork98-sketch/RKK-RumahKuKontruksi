import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { getAdminUserById, updateAdminUserStatus } from "@/lib/admin-data";
import { normalizeRole } from "@/lib/rbac";
import { guardAdminAuth, guardResourceExists, guardUserStatusMutation } from "@/lib/admin-endpoint-guards";
import type { AdminUserStatus } from "@/types/admin.types";
import { NextRequest, NextResponse } from "next/server";

const VALID_STATUSES: AdminUserStatus[] = ["ACTIVE", "INACTIVE"];

function getRoleFromRequest(request: NextRequest) {
  return normalizeRole(request.cookies.get(AUTH_COOKIE_NAMES.role)?.value);
}

export async function POST(request: NextRequest) {
  const role = getRoleFromRequest(request);
  const hasSession = request.cookies.get(AUTH_COOKIE_NAMES.session)?.value === "1";
  const authGuard = guardAdminAuth(hasSession, role);

  if (!authGuard.ok) {
    return NextResponse.json(
      {
        error: {
          code: authGuard.code,
          message: authGuard.message,
        },
      },
      { status: authGuard.status }
    );
  }
  if (!role) {
    return NextResponse.json(
      {
        error: {
          code: "UNAUTHORIZED",
          message: "Role tidak valid.",
        },
      },
      { status: 401 }
    );
  }

  const payload = await request.json().catch(() => null);
  const userId = typeof payload === "object" && payload ? (payload as { userId?: unknown }).userId : null;
  const status = typeof payload === "object" && payload ? (payload as { status?: unknown }).status : null;

  if (typeof userId !== "string" || typeof status !== "string" || !VALID_STATUSES.includes(status as AdminUserStatus)) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Payload update status user tidak valid.",
        },
      },
      { status: 400 }
    );
  }

  const targetUser = getAdminUserById(userId);
  const existsGuard = guardResourceExists(Boolean(targetUser), "User");
  if (!existsGuard.ok) {
    return NextResponse.json(
      {
        error: {
          code: existsGuard.code,
          message: existsGuard.message,
        },
      },
      { status: existsGuard.status }
    );
  }
  if (!targetUser) {
    return NextResponse.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "User tidak ditemukan.",
        },
      },
      { status: 404 }
    );
  }

  const mutationGuard = guardUserStatusMutation(role, targetUser.role);
  if (!mutationGuard.ok) {
    return NextResponse.json(
      {
        error: {
          code: mutationGuard.code,
          message: mutationGuard.message,
        },
      },
      { status: mutationGuard.status }
    );
  }

  const updatedUser = updateAdminUserStatus(userId, status as AdminUserStatus);
  if (!updatedUser) {
    return NextResponse.json(
      {
        error: {
          code: "UPDATE_FAILED",
          message: "Gagal memperbarui status user.",
        },
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Status user berhasil diperbarui.",
    data: updatedUser,
  });
}
