import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { getServerAuthHeaders } from "@/lib/auth-server";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Suppliers",
  description: "Daftar supplier material dan jasa yang tersedia pada sistem.",
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function SuppliersPage() {
  const result = await api
    .get("/suppliers", {
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((suppliers) => ({ suppliers, error: null as string | null }))
    .catch((err: unknown) => ({ suppliers: null, error: getErrorMessage(err) }));

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Suppliers</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Daftar supplier material dan jasa.</p>
        </div>

        {result.error ? (
          <ErrorState message={result.error} />
        ) : result.suppliers && result.suppliers.length > 0 ? (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Supplier List</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-[var(--color-divider)]">
                {result.suppliers.map((supplier) => (
                  <li key={supplier.id} className="py-3">
                    <Link
                      href={`/suppliers/${supplier.id}`}
                      className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                    >
                      {supplier.name}
                    </Link>
                    <p className="text-sm text-[var(--color-text-muted)]">{supplier.contactEmail}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          <EmptyState title="Belum ada supplier" message="Data supplier belum tersedia pada environment mock saat ini." />
        )}
      </Container>
    </main>
  );
}


