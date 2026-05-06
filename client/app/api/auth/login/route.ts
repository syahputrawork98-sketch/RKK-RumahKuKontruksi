import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { authService } from "@/services/auth.service";
import { NextResponse } from "next/server";

const ONE_DAY_SECONDS = 60 * 60 * 24;

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as { email?: unknown }).email !== "string" ||
    typeof (payload as { password?: unknown }).password !== "string"
  ) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Email dan password wajib diisi.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const session = await authService.login({
      email: (payload as { email: string }).email,
      password: (payload as { password: string }).password,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          user: session.user,
          role: session.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set(AUTH_COOKIE_NAMES.session, "1", {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: ONE_DAY_SECONDS,
    });
    response.cookies.set(AUTH_COOKIE_NAMES.role, session.role, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: ONE_DAY_SECONDS,
    });
    response.cookies.set(AUTH_COOKIE_NAMES.accessToken, session.accessToken, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: ONE_DAY_SECONDS,
    });

    if (session.refreshToken) {
      response.cookies.set(AUTH_COOKIE_NAMES.refreshToken, session.refreshToken, {
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        maxAge: ONE_DAY_SECONDS * 7,
      });
    }

    return response;
  } catch (error: unknown) {
    const message =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message)
        : "Login failed";

    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code?: unknown }).code)
        : "UNAUTHORIZED";

    return NextResponse.json(
      {
        error: {
          code,
          message,
        },
      },
      { status: 401 }
    );
  }
}
