import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { getAdminApprovals, updateAdminApprovalStatus } from "@/lib/admin-data";
import { normalizeRole } from "@/lib/rbac";
import { guardAdminAuth, guardApprovalPending, guardResourceExists } from "@/lib/admin-endpoint-guards";
import { NextRequest, NextResponse } from "next/server";

const VALID_ACTIONS = ["APPROVE", "REJECT"] as const;

type ApprovalAction = (typeof VALID_ACTIONS)[number];

function getRoleFromRequest(request: NextRequest) {
  return normalizeRole(request.cookies.get(AUTH_COOKIE_NAMES.role)?.value);
}

export async function GET(request: NextRequest) {
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

  return NextResponse.json({
    success: true,
    data: getAdminApprovals(),
  });
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

  const payload = await request.json().catch(() => null);
  const approvalId =
    typeof payload === "object" && payload ? (payload as { approvalId?: unknown }).approvalId : null;
  const action = typeof payload === "object" && payload ? (payload as { action?: unknown }).action : null;

  if (typeof approvalId !== "string" || typeof action !== "string" || !VALID_ACTIONS.includes(action as ApprovalAction)) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Payload approval tidak valid.",
        },
      },
      { status: 400 }
    );
  }

  const approvals = getAdminApprovals();
  const current = approvals.find((item) => item.id === approvalId);
  const existsGuard = guardResourceExists(Boolean(current), "Item approval");
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
  if (!current) {
    return NextResponse.json(
      {
        error: {
          code: "NOT_FOUND",
          message: "Item approval tidak ditemukan.",
        },
      },
      { status: 404 }
    );
  }

  const pendingGuard = guardApprovalPending(current.status);
  if (!pendingGuard.ok) {
    return NextResponse.json(
      {
        error: {
          code: pendingGuard.code,
          message: pendingGuard.message,
        },
      },
      { status: pendingGuard.status }
    );
  }

  const nextStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";
  const updated = updateAdminApprovalStatus(approvalId, nextStatus);

  if (!updated) {
    return NextResponse.json(
      {
        error: {
          code: "UPDATE_FAILED",
          message: "Gagal memperbarui approval.",
        },
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Approval ${nextStatus.toLowerCase()} berhasil.`,
    data: updated,
  });
}
