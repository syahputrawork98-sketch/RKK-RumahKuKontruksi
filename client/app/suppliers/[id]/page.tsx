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
  title: "Supplier Detail",
  description: "Detail supplier untuk kolaborasi vendor dan proses pengadaan.",
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function SupplierDetailPage({ params }: PageProps) {
  const result = await api
    .get("/suppliers/{id}", {
      path: { id: params.id },
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((supplier) => ({ supplier, error: null as string | null }))
    .catch((err: unknown) => ({ supplier: null, error: getErrorMessage(err) }));

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Supplier Detail</h1>

        {result.error ? (
          <ErrorState message={result.error} />
        ) : (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>{result.supplier?.name ?? "Supplier"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <p>ID: {result.supplier?.id}</p>
              <p>Name: {result.supplier?.name}</p>
              <p>Email: {result.supplier?.contactEmail}</p>
            </CardContent>
          </Card>
        )}
      </Container>
    </main>
  );
}


