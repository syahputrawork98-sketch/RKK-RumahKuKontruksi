import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/error-state";
import { MarketplaceProposalForm } from "@/components/sections/marketplace-proposal-form";
import { getServerAuthHeaders } from "@/lib/auth-server";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Detail Vendor",
  description: "Lihat detail vendor marketplace dan kirim proposal proyek.",
};

type MarketplaceDetailPageProps = {
  params: Promise<{ id: string }>;
};

function getErrorMessage(err: unknown): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const message = (err as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return "Unknown error";
}

export default async function MarketplaceDetailPage({ params }: MarketplaceDetailPageProps) {
  const { id } = await params;

  const result = await api
    .get("/suppliers/{id}", {
      path: { id },
      headers: {
        ...(await getServerAuthHeaders()),
        Prefer: "example=sample",
      },
    })
    .then((supplier) => ({ supplier, error: null as string | null }))
    .catch((error: unknown) => ({ supplier: null, error: getErrorMessage(error) }));

  if (result.error || !result.supplier) {
    return (
      <main className="bg-[var(--color-background)] py-12">
        <Container>
          <ErrorState message={result.error ?? "Vendor tidak ditemukan."} />
        </Container>
      </main>
    );
  }

  const supplier = result.supplier;

  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-6">
        <Link href="/marketplace" className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
          ← Kembali ke Marketplace
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card variant="bordered" className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{supplier.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <p>Email kontak: {supplier.contactEmail ?? "-"}</p>
              <p>Rating demo: 4.7 / 5.0</p>
              <p>Proyek terselesaikan: 24</p>
              <p>
                Vendor ini tersedia untuk material konstruksi dan layanan pelaksanaan proyek skala menengah hingga besar.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Kirim Proposal</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketplaceProposalForm supplierId={supplier.id} supplierName={supplier.name} />
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}
