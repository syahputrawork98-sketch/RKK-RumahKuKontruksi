import { mapRoleFromApi } from "@/types/auth.types";
import type { AuthSession, AuthUser } from "@/types/auth.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginResponse = {
  message?: string;
  accessToken?: string;
  refreshToken?: string;
};

type RegisterResponse = {
  message?: string;
};

type AuthApiError = {
  code: string;
  message: string;
};

function parseAuthError(body: unknown, fallbackMessage: string): AuthApiError {
  if (typeof body === "object" && body !== null && "error" in body) {
    const error = (body as { error?: unknown }).error;
    if (typeof error === "object" && error !== null) {
      const code = (error as { code?: unknown }).code;
      const message = (error as { message?: unknown }).message;
      if (typeof code === "string" && typeof message === "string") {
        return { code, message };
      }
    }
  }

  return {
    code: "UNKNOWN_ERROR",
    message: fallbackMessage,
  };
}

async function parseJsonSafe<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchMe(accessToken: string): Promise<AuthUser> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await parseJsonSafe<unknown>(response);
    throw parseAuthError(body, "Failed to retrieve current user.");
  }

  const user = await response.json();

  if (
    typeof user !== "object" ||
    user === null ||
    typeof (user as { id?: unknown }).id !== "string" ||
    typeof (user as { name?: unknown }).name !== "string" ||
    typeof (user as { email?: unknown }).email !== "string" ||
    !Array.isArray((user as { roles?: unknown }).roles)
  ) {
    throw {
      code: "INVALID_USER_PAYLOAD",
      message: "Invalid user profile payload from API.",
    } satisfies AuthApiError;
  }

  return {
    id: (user as { id: string }).id,
    name: (user as { name: string }).name,
    email: (user as { email: string }).email,
    roles: (user as { roles: string[] }).roles,
  };
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthSession> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const body = await parseJsonSafe<LoginResponse | unknown>(response);

    if (!response.ok) {
      throw parseAuthError(body, "Login failed.");
    }

    const accessToken =
      typeof body === "object" && body !== null && "accessToken" in body
        ? (body as LoginResponse).accessToken
        : undefined;

    if (!accessToken || typeof accessToken !== "string") {
      throw {
        code: "TOKEN_MISSING",
        message: "Access token not returned by API.",
      } satisfies AuthApiError;
    }

    const user = await fetchMe(accessToken);

    return {
      accessToken,
      refreshToken:
        typeof body === "object" && body !== null && "refreshToken" in body
          ? (body as LoginResponse).refreshToken
          : undefined,
      user,
      role: mapRoleFromApi(user.roles),
    };
  },

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const body = await parseJsonSafe<RegisterResponse | unknown>(response);

    if (!response.ok) {
      if (response.status === 404 || response.status === 405 || response.status === 501) {
        throw {
          code: "NOT_IMPLEMENTED",
          message: "Endpoint register belum tersedia di backend API saat ini.",
        } satisfies AuthApiError;
      }

      throw parseAuthError(body, "Register failed.");
    }

    return {
      message:
        typeof body === "object" && body !== null && "message" in body
          ? String((body as RegisterResponse).message ?? "Register successful")
          : "Register successful",
    };
  },

  async getMe(accessToken: string): Promise<AuthUser> {
    return fetchMe(accessToken);
  },

  async logout(accessToken?: string): Promise<void> {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : undefined,
      cache: "no-store",
    }).catch(() => undefined);
  },
};
