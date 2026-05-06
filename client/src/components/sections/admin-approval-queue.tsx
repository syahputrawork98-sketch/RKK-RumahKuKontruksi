"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { AdminApprovalItem } from "@/types/admin.types";
import type { UserRole } from "@/types/auth.types";

type ApprovalQueueProps = {
  currentRole: UserRole;
  initialApprovals: AdminApprovalItem[];
};

type ApprovalError = {
  error?: {
    message?: string;
  };
};

export function AdminApprovalQueue({ currentRole, initialApprovals }: ApprovalQueueProps) {
  const [approvals, setApprovals] = useState(initialApprovals);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canTakeAction = currentRole === "OWNER" || currentRole === "ADMIN";

  async function updateApproval(id: string, action: "APPROVE" | "REJECT") {
    setError(null);
    setProcessingId(id);

    try {
      const response = await fetch("/api/admin/approvals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approvalId: id, action }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as ApprovalError | null;
        setError(payload?.error?.message ?? "Gagal memperbarui approval.");
        return;
      }

      setApprovals((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: action === "APPROVE" ? "APPROVED" : "REJECTED" }
            : item
        )
      );
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="space-y-3">
      {error ? <p className="text-sm text-[var(--color-danger)]">{error}</p> : null}

      <div className="space-y-2">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3"
          >
            <p className="font-semibold text-[var(--color-text-primary)]">{item.projectCode} - {item.projectName}</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Requested by {item.requestedBy} at {item.requestedAt}
            </p>
            <p
              className={
                item.status === "APPROVED"
                  ? "mt-2 text-xs text-[var(--color-success)]"
                  : item.status === "REJECTED"
                  ? "mt-2 text-xs text-[var(--color-danger)]"
                  : "mt-2 text-xs text-[var(--color-warning)]"
              }
            >
              Status: {item.status}
            </p>

            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                disabled={!canTakeAction || item.status !== "PENDING" || processingId === item.id}
                onClick={() => updateApproval(item.id, "APPROVE")}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="danger"
                disabled={!canTakeAction || item.status !== "PENDING" || processingId === item.id}
                onClick={() => updateApproval(item.id, "REJECT")}
              >
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
