"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

type MarketplaceProposalFormProps = {
  supplierId: string;
  supplierName: string;
};

type ProposalError = {
  error?: {
    code?: string;
    message?: string;
  };
};

export function MarketplaceProposalForm({ supplierId, supplierName }: MarketplaceProposalFormProps) {
  const [projectName, setProjectName] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function submitProposal(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/marketplace/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          supplierId,
          supplierName,
          projectName,
          budget: Number(budget),
          startDate,
          message,
        }),
      });

      const body = await response.json().catch(() => null);

      if (!response.ok) {
        const payload = body as ProposalError | null;
        setError(payload?.error?.message ?? "Proposal gagal dikirim.");
        return;
      }

      setSuccess("Proposal berhasil dikirim. Tim vendor akan menghubungi Anda.");
      setProjectName("");
      setBudget("");
      setStartDate("");
      setMessage("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={submitProposal}>
      <TextField
        label="Nama Proyek"
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        required
      />
      <TextField
        label="Budget (IDR)"
        type="number"
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
        required
      />
      <TextField
        label="Rencana Mulai"
        type="date"
        value={startDate}
        onChange={(event) => setStartDate(event.target.value)}
        required
      />
      <TextField
        label="Pesan"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />

      {error ? <p className="text-sm text-[var(--color-danger)]">{error}</p> : null}
      {success ? <p className="text-sm text-[var(--color-success)]">{success}</p> : null}

      <Button type="submit" isLoading={submitting}>
        {submitting ? "Mengirim..." : "Kirim Proposal"}
      </Button>
    </form>
  );
}
