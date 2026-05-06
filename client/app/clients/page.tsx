import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { getServerAuthHeaders } from "@/lib/auth-server";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Clients",
  description: "Daftar klien RumahkuKonstruksi beserta informasi kontak utama.",
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function ClientsPage() {
  const result = await api
    .get("/clients", {
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((clients) => ({ clients, error: null as string | null }))
    .catch((err: unknown) => ({ clients: null, error: getErrorMessage(err) }));

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Clients</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Daftar klien yang terhubung ke sistem.</p>
        </div>

        {result.error ? (
          <ErrorState message={result.error} />
        ) : result.clients && result.clients.length > 0 ? (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Client List</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-[var(--color-divider)]">
                {result.clients.map((client) => (
                  <li key={client.id} className="py-3">
                    <Link
                      href={`/clients/${client.id}`}
                      className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                    >
                      {client.name}
                    </Link>
                    <p className="text-sm text-[var(--color-text-muted)]">{client.contactEmail}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          <EmptyState title="Belum ada klien" message="Data klien belum tersedia pada environment mock saat ini." />
        )}
      </Container>
    </main>
  );
}


