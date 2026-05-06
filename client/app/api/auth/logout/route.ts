import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { authService } from "@/services/auth.service";
import { NextRequest, NextResponse } from "next/server";

function clearSessionCookies(response: NextResponse) {
  response.cookies.delete(AUTH_COOKIE_NAMES.session);
  response.cookies.delete(AUTH_COOKIE_NAMES.role);
  response.cookies.delete(AUTH_COOKIE_NAMES.accessToken);
  response.cookies.delete(AUTH_COOKIE_NAMES.refreshToken);
}

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  await authService.logout(accessToken);

  const response = NextResponse.json({
    success: true,
    message: "Logout successful",
  });

  clearSessionCookies(response);
  return response;
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(AUTH_COOKIE_NAMES.accessToken)?.value;

  await authService.logout(accessToken);

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.search = "";

  const response = NextResponse.redirect(redirectUrl);
  clearSessionCookies(response);

  return response;
}
