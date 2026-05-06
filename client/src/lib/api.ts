import type { paths } from "@/types/api";

type ApiError = {
  code: string;
  message: string;
};

type JsonContent = {
  content: {
    "application/json": unknown;
  };
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

export function authHeaders(token?: string): HeadersInit {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

type HttpMethod = "get" | "post" | "put" | "delete";
type ParamPrimitive = string | number | boolean | null | undefined;

type Operation<Path extends keyof paths, Method extends HttpMethod> = paths[Path][Method];
type OperationParams<Path extends keyof paths, Method extends HttpMethod> =
  Operation<Path, Method> extends { parameters: infer P } ? P : never;

type ResponseFrom<R> = 200 extends keyof R
  ? R[200] extends JsonContent
    ? R[200]["content"]["application/json"]
    : never
  : 201 extends keyof R
  ? R[201] extends JsonContent
    ? R[201]["content"]["application/json"]
    : never
  : never;

type ResponseJson<Path extends keyof paths, Method extends HttpMethod> =
  Operation<Path, Method> extends { responses: infer R }
    ? R extends Record<PropertyKey, unknown>
      ? ResponseFrom<R>
      : never
    : never;

type RequestBody<Path extends keyof paths, Method extends "post" | "put"> =
  Operation<Path, Method> extends { requestBody: infer B }
    ? B extends { content: infer C }
      ? C extends { "application/json": infer V }
        ? V
        : never
      : never
    : never;

type PathParams<Path extends keyof paths, Method extends HttpMethod> =
  OperationParams<Path, Method> extends { path?: infer PP } ? PP : never;

type QueryParams<Path extends keyof paths, Method extends HttpMethod> =
  OperationParams<Path, Method> extends { query?: infer QP } ? QP : never;

function toPathRecord(value: unknown): Record<string, string | number> | undefined {
  if (!value || typeof value !== "object") return undefined;

  const output: Record<string, string | number> = {};
  for (const [key, rawValue] of Object.entries(value as Record<string, unknown>)) {
    if (typeof rawValue === "string" || typeof rawValue === "number") {
      output[key] = rawValue;
    }
  }

  return output;
}

function toQueryRecord(value: unknown): Record<string, ParamPrimitive> | undefined {
  if (!value || typeof value !== "object") return undefined;

  const output: Record<string, ParamPrimitive> = {};
  for (const [key, rawValue] of Object.entries(value as Record<string, unknown>)) {
    if (
      rawValue === null ||
      rawValue === undefined ||
      typeof rawValue === "string" ||
      typeof rawValue === "number" ||
      typeof rawValue === "boolean"
    ) {
      output[key] = rawValue;
    }
  }

  return output;
}

function buildUrl(
  path: string,
  pathParams?: Record<string, string | number>,
  query?: Record<string, ParamPrimitive>
) {
  let url = path;

  if (pathParams) {
    for (const [key, value] of Object.entries(pathParams)) {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
  }

  const queryString = query
    ? Object.entries(query)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        )
        .join("&")
    : "";

  return queryString ? `${url}?${queryString}` : url;
}

function parseApiError(body: unknown, fallbackMessage: string): ApiError {
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

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    let errBody: unknown = null;
    try {
      errBody = await res.json();
    } catch {
      errBody = null;
    }

    throw parseApiError(errBody, res.statusText);
  }

  if (res.status === 204) {
    return null as T;
  }

  return (await res.json()) as T;
}

export const api = {
  get<Path extends keyof paths>(
    path: Path,
    params?: {
      path?: PathParams<Path, "get">;
      query?: QueryParams<Path, "get">;
      headers?: HeadersInit;
    }
  ) {
    const url = buildUrl(path, toPathRecord(params?.path), toQueryRecord(params?.query));
    return request<ResponseJson<Path, "get">>(url, {
      method: "GET",
      headers: params?.headers,
    });
  },

  post<Path extends keyof paths>(
    path: Path,
    body: RequestBody<Path, "post">,
    params?: {
      path?: PathParams<Path, "post">;
      query?: QueryParams<Path, "post">;
      headers?: HeadersInit;
    }
  ) {
    const url = buildUrl(path, toPathRecord(params?.path), toQueryRecord(params?.query));
    return request<ResponseJson<Path, "post">>(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: params?.headers,
    });
  },

  put<Path extends keyof paths>(
    path: Path,
    body: RequestBody<Path, "put">,
    params?: {
      path?: PathParams<Path, "put">;
      query?: QueryParams<Path, "put">;
      headers?: HeadersInit;
    }
  ) {
    const url = buildUrl(path, toPathRecord(params?.path), toQueryRecord(params?.query));
    return request<ResponseJson<Path, "put">>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: params?.headers,
    });
  },

  delete<Path extends keyof paths>(
    path: Path,
    params?: {
      path?: PathParams<Path, "delete">;
      query?: QueryParams<Path, "delete">;
      headers?: HeadersInit;
    }
  ) {
    const url = buildUrl(path, toPathRecord(params?.path), toQueryRecord(params?.query));
    return request<ResponseJson<Path, "delete">>(url, {
      method: "DELETE",
      headers: params?.headers,
    });
  },
};
