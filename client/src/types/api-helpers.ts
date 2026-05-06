import type { paths } from "@/types/api";

type JsonContent = {
  content: {
    "application/json": unknown;
  };
};

type ResponseFrom<R> = 200 extends keyof R
  ? R[200] extends JsonContent
    ? R[200]["content"]["application/json"]
    : never
  : 201 extends keyof R
  ? R[201] extends JsonContent
    ? R[201]["content"]["application/json"]
    : never
  : never;

// Response helper untuk GET
export type GetResponse<Path extends keyof paths> = paths[Path]["get"] extends {
  responses: infer R;
}
  ? R extends Record<PropertyKey, unknown>
    ? ResponseFrom<R>
    : never
  : never;

// Response helper untuk POST
export type PostResponse<Path extends keyof paths> = paths[Path]["post"] extends {
  responses: infer R;
}
  ? R extends Record<PropertyKey, unknown>
    ? ResponseFrom<R>
    : never
  : never;

// Request body helper untuk POST/PUT
export type RequestBody<
  Path extends keyof paths,
  Method extends "post" | "put"
> = paths[Path][Method] extends { requestBody: infer B }
  ? B extends { content: infer C }
    ? C extends { "application/json": infer V }
      ? V
      : never
    : never
  : never;
