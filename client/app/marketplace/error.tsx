"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { ErrorState } from "@/components/error-state";

export default function MarketplaceError({ reset }: { reset: () => void }) {
  return (
    <main className="bg-[var(--color-background)] py-12">
      <Container className="space-y-4">
        <ErrorState message="Terjadi kesalahan saat memuat modul marketplace." />
        <Button onClick={reset}>Coba Lagi</Button>
      </Container>
    </main>
  );
}
