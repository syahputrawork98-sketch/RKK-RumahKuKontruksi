import { authService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (
    !payload ||
    typeof payload !== "object" ||
    typeof (payload as { name?: unknown }).name !== "string" ||
    typeof (payload as { email?: unknown }).email !== "string" ||
    typeof (payload as { password?: unknown }).password !== "string"
  ) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Name, email, dan password wajib diisi.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const result = await authService.register({
      name: (payload as { name: string }).name,
      email: (payload as { email: string }).email,
      password: (payload as { password: string }).password,
    });

    return NextResponse.json(
      {
        success: true,
        message: result.message ?? "Register successful",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as { message?: unknown }).message)
        : "Register failed";

    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code?: unknown }).code)
        : "REGISTER_ERROR";

    const status = code === "NOT_IMPLEMENTED" ? 501 : 400;

    return NextResponse.json(
      {
        error: {
          code,
          message,
        },
      },
      { status }
    );
  }
}
