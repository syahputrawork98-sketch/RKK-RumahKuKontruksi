import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { getServerAuthHeaders } from "@/lib/auth-server";
import { api } from "@/lib/api";

type MarketplacePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Listing vendor dan kontraktor dengan filter untuk kebutuhan proyek konstruksi.",
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function MarketplacePage({ searchParams }: MarketplacePageProps) {
  const params = (await searchParams) ?? {};
  const q = typeof params.q === "string" ? params.q.trim().toLowerCase() : "";
  const category = typeof params.category === "string" ? params.category : "all";

  const result = await api
    .get("/suppliers", {
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((suppliers) => ({ suppliers, error: null as string | null }))
    .catch((error: unknown) => ({ suppliers: null, error: getErrorMessage(error) }));

  const suppliers =
    result.suppliers?.map((supplier) => {
      const tag = supplier.name.toLowerCase().includes("cv") ? "jasa" : "material";
      return { ...supplier, tag };
    }) ?? [];

  const filtered = suppliers.filter((supplier) => {
    const matchesSearch = !q || supplier.name.toLowerCase().includes(q) || supplier.contactEmail?.toLowerCase().includes(q);
    const matchesCategory = category === "all" || supplier.tag === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Marketplace</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Temukan vendor dan kontraktor untuk kebutuhan proyek.</p>
        </div>

        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Filter Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-3 sm:grid-cols-3" method="GET">
              <input
                name="q"
                defaultValue={q}
                placeholder="Cari nama/email vendor"
                className="h-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text-primary)]"
              />
              <select
                name="category"
                defaultValue={category}
                className="h-10 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text-primary)]"
              >
                <option value="all">Semua Kategori</option>
                <option value="material">Material</option>
                <option value="jasa">Jasa/Kontraktor</option>
              </select>
              <button
                type="submit"
                className="h-10 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-text-inverse)]"
              >
                Terapkan Filter
              </button>
            </form>
          </CardContent>
        </Card>

        {result.error ? (
          <ErrorState message={result.error} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Vendor tidak ditemukan"
            message="Tidak ada vendor yang cocok dengan filter saat ini. Coba ubah kata kunci atau kategori."
          />
        ) : (
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Hasil Pencarian Vendor</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((supplier) => (
                <Link
                  key={supplier.id}
                  href={`/marketplace/${supplier.id}`}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:bg-[var(--color-surface-secondary)]"
                >
                  <p className="font-semibold text-[var(--color-text-primary)]">{supplier.name}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{supplier.contactEmail}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{supplier.tag}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
      </Container>
    </main>
  );
}
