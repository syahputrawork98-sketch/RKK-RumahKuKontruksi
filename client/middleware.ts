import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { hasRouteAccess, normalizeRole } from "@/lib/rbac";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get(AUTH_COOKIE_NAMES.session)?.value === "1";
  const role = normalizeRole(request.cookies.get(AUTH_COOKIE_NAMES.role)?.value);
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  if (!session || !role || !accessToken) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(redirectUrl);
  }

  if (!hasRouteAccess(pathname, role)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard";
    redirectUrl.searchParams.set("forbidden", "1");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/projects/:path*",
    "/estimasi/:path*",
    "/marketplace/:path*",
    "/contracts/:path*",
    "/clients/:path*",
    "/suppliers/:path*",
  ],
};
