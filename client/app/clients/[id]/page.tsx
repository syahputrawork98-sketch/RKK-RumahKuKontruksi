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
  title: "Client Detail",
  description: "Detail klien untuk keperluan kontrak dan manajemen proyek.",
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function ClientDetailPage({ params }: PageProps) {
  const result = await api
    .get("/clients/{id}", {
      path: { id: params.id },
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((client) => ({ client, error: null as string | null }))
    .catch((err: unknown) => ({ client: null, error: getErrorMessage(err) }));

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Client Detail</h1>

        {result.error ? (
          <ErrorState message={result.error} />
        ) : (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>{result.client?.name ?? "Client"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p>ID: {result.client?.id}</p>
              <p>Name: {result.client?.name}</p>
              <p>Email: {result.client?.contactEmail}</p>
            </CardContent>
          </Card>
        )}
      </Container>
    </main>
  );
}


