import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");
const port = 4310;
const baseUrl = `http://127.0.0.1:${port}`;

let serverProcess = null;

function buildCookie(values) {
  return Object.entries(values)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");
}

async function waitForServerReady(timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(`${baseUrl}/`);
      if (response.ok) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  throw new Error("Next.js dev server gagal start untuk admin endpoint tests.");
}

async function requestJson(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  return { status: response.status, body };
}

before(async () => {
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  serverProcess = spawn(npmCmd, ["run", "dev", "--", "--port", String(port)], {
    cwd: workspaceRoot,
    stdio: "ignore",
  });

  await waitForServerReady();
});

after(async () => {
  if (!serverProcess) return;

  serverProcess.kill("SIGTERM");
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (!serverProcess.killed) {
    serverProcess.kill("SIGKILL");
  }
});

test("admin users/status endpoint enforces 401, 403, and 404", async () => {
  const unauthorized = await requestJson("/api/admin/users/status", {
    method: "POST",
    body: JSON.stringify({ userId: "usr-002", status: "INACTIVE" }),
  });
  assert.equal(unauthorized.status, 401);
  assert.equal(unauthorized.body?.error?.code, "UNAUTHORIZED");

  const forbiddenByRole = await requestJson("/api/admin/users/status", {
    method: "POST",
    headers: {
      Cookie: buildCookie({ rk_session: "1", rk_role: "USER" }),
    },
    body: JSON.stringify({ userId: "usr-002", status: "INACTIVE" }),
  });
  assert.equal(forbiddenByRole.status, 403);
  assert.equal(forbiddenByRole.body?.error?.code, "FORBIDDEN");

  const forbiddenOwnerChange = await requestJson("/api/admin/users/status", {
    method: "POST",
    headers: {
      Cookie: buildCookie({ rk_session: "1", rk_role: "ADMIN" }),
    },
    body: JSON.stringify({ userId: "usr-001", status: "INACTIVE" }),
  });
  assert.equal(forbiddenOwnerChange.status, 403);
  assert.equal(forbiddenOwnerChange.body?.error?.code, "FORBIDDEN");

  const notFound = await requestJson("/api/admin/users/status", {
    method: "POST",
    headers: {
      Cookie: buildCookie({ rk_session: "1", rk_role: "OWNER" }),
    },
    body: JSON.stringify({ userId: "usr-404", status: "INACTIVE" }),
  });
  assert.equal(notFound.status, 404);
  assert.equal(notFound.body?.error?.code, "NOT_FOUND");
});

test("admin approvals endpoint enforces 401, 403, 404, and 409", async () => {
  const unauthorized = await requestJson("/api/admin/approvals", {
    method: "POST",
    body: JSON.stringify({ approvalId: "apr-001", action: "APPROVE" }),
  });
  assert.equal(unauthorized.status, 401);
  assert.equal(unauthorized.body?.error?.code, "UNAUTHORIZED");

  const forbiddenByRole = await requestJson("/api/admin/approvals", {
    method: "POST",
    headers: {
      Cookie: buildCookie({ rk_session: "1", rk_role: "KONTRAKTOR" }),
    },
    body: JSON.stringify({ approvalId: "apr-001", action: "APPROVE" }),
  });
  assert.equal(forbiddenByRole.status, 403);
  assert.equal(forbiddenByRole.body?.error?.code, "FORBIDDEN");

  const notFound = await requestJson("/api/admin/approvals", {
    method: "POST",
    headers: {
      Cookie: buildCookie({ rk_session: "1", rk_role: "OWNER" }),
    },
    body: JSON.stringify({ approvalId: "apr-404", action: "APPROVE" }),
  });
  assert.equal(notFound.status, 404);
  assert.equal(notFound.body?.error?.code, "NOT_FOUND");

  const alreadyProcessed = await requestJson("/api/admin/approvals", {
    method: "POST",
    headers: {
      Cookie: buildCookie({ rk_session: "1", rk_role: "OWNER" }),
    },
    body: JSON.stringify({ approvalId: "apr-002", action: "APPROVE" }),
  });
  assert.equal(alreadyProcessed.status, 409);
  assert.equal(alreadyProcessed.body?.error?.code, "CONFLICT");
});
