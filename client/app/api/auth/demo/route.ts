import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { ROLES } from "@/constants/roles";
import type { UserRole } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";

const VALID_ROLES: UserRole[] = [ROLES.owner, ROLES.admin, ROLES.kontraktor, ROLES.user];

export async function GET(request: NextRequest) {
  const roleParam = request.nextUrl.searchParams.get("role")?.toUpperCase();
  const nextPath = request.nextUrl.searchParams.get("next") ?? "/dashboard";

  const role = VALID_ROLES.find((item) => item === roleParam);

  if (!role) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Role tidak valid.",
        },
      },
      { status: 400 }
    );
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = nextPath.startsWith("/") ? nextPath : "/dashboard";
  redirectUrl.search = "";

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(AUTH_COOKIE_NAMES.session, "1", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 12,
  });
  response.cookies.set(AUTH_COOKIE_NAMES.role, role, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 12,
  });
  response.cookies.set(AUTH_COOKIE_NAMES.accessToken, `demo-token-${role.toLowerCase()}`, {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 12,
  });

  return response;
}
