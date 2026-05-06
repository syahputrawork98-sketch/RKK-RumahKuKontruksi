import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { getServerAuthHeaders } from "@/lib/auth-server";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contracts",
  description: "Daftar kontrak proyek dan keterkaitan vendor/kontraktor.",
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function ContractsPage() {
  const result = await api
    .get("/contracts", {
      query: { projectId: "prj_001" },
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((contracts) => ({ contracts, error: null as string | null }))
    .catch((err: unknown) => ({ contracts: null, error: getErrorMessage(err) }));

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Contracts</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Daftar kontrak terkait proyek.</p>
        </div>

        {result.error ? (
          <ErrorState message={result.error} />
        ) : result.contracts && result.contracts.length > 0 ? (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Contract List</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-[var(--color-divider)]">
                {result.contracts.map((contract) => (
                  <li key={contract.id} className="py-3">
                    <Link
                      href={`/contracts/${contract.id}`}
                      className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                    >
                      {contract.scope}
                    </Link>
                    <p className="text-sm text-[var(--color-text-muted)]">Project: {contract.projectId}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          <EmptyState
            title="Belum ada kontrak"
            message="Data kontrak belum tersedia pada environment mock saat ini."
          />
        )}
      </Container>
    </main>
  );
}


