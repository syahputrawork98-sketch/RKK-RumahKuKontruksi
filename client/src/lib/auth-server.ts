import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { authHeaders } from "@/lib/api";
import { cookies } from "next/headers";

export async function getServerAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAMES.accessToken)?.value;
}

export async function getServerAuthHeaders(): Promise<HeadersInit> {
  const token = await getServerAccessToken();
  return authHeaders(token);
}
