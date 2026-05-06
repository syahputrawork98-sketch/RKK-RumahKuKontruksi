import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/error-state";
import { getServerAuthHeaders } from "@/lib/auth-server";
import { api } from "@/lib/api";

type PageProps = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Contract Detail",
  description: "Detail kontrak proyek termasuk kontraktor, ruang lingkup, dan tanggal tanda tangan.",
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function ContractDetailPage({ params }: PageProps) {
  const result = await api
    .get("/contracts/{id}", {
      path: { id: params.id },
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((contract) => ({ contract, error: null as string | null }))
    .catch((err: unknown) => ({ contract: null, error: getErrorMessage(err) }));

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Contract Detail</h1>

        {result.error ? (
          <ErrorState message={result.error} />
        ) : (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>{result.contract?.scope ?? "Contract"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p>ID: {result.contract?.id}</p>
              <p>Project: {result.contract?.projectId}</p>
              <p>Contractor: {result.contract?.contractorId}</p>
              <p>Signed At: {result.contract?.signedAt}</p>
            </CardContent>
          </Card>
        )}
      </Container>
    </main>
  );
}


