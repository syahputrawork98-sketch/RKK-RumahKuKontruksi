import assert from "node:assert/strict";
import { ROLES } from "../src/constants/roles";
import {
  guardAdminAuth,
  guardApprovalPending,
  guardResourceExists,
  guardUserStatusMutation,
} from "../src/lib/admin-endpoint-guards";

function runAdminAuthCases() {
  const unauthorized = guardAdminAuth(false, null);
  assert.equal(unauthorized.ok, false);
  if (!unauthorized.ok) {
    assert.equal(unauthorized.status, 401);
    assert.equal(unauthorized.code, "UNAUTHORIZED");
  }

  const forbidden = guardAdminAuth(true, ROLES.user);
  assert.equal(forbidden.ok, false);
  if (!forbidden.ok) {
    assert.equal(forbidden.status, 403);
    assert.equal(forbidden.code, "FORBIDDEN");
  }
}

function runUserStatusCases() {
  const forbidden = guardUserStatusMutation(ROLES.admin, ROLES.owner);
  assert.equal(forbidden.ok, false);
  if (!forbidden.ok) {
    assert.equal(forbidden.status, 403);
    assert.equal(forbidden.code, "FORBIDDEN");
  }

  const notFound = guardResourceExists(false, "User");
  assert.equal(notFound.ok, false);
  if (!notFound.ok) {
    assert.equal(notFound.status, 404);
    assert.equal(notFound.code, "NOT_FOUND");
  }
}

function runApprovalCases() {
  const notFound = guardResourceExists(false, "Item approval");
  assert.equal(notFound.ok, false);
  if (!notFound.ok) {
    assert.equal(notFound.status, 404);
    assert.equal(notFound.code, "NOT_FOUND");
  }

  const conflict = guardApprovalPending("APPROVED");
  assert.equal(conflict.ok, false);
  if (!conflict.ok) {
    assert.equal(conflict.status, 409);
    assert.equal(conflict.code, "CONFLICT");
  }
}

runAdminAuthCases();
runUserStatusCases();
runApprovalCases();

console.log("Admin endpoint guard tests passed (401/403/409/404).");
