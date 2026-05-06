import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section className="bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <Container className="flex min-h-[calc(100vh-4rem)] flex-col items-start justify-center gap-8 py-24">
        <div className="flex max-w-3xl flex-col gap-4">
          <span className="text-sm font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
            RumahkuKonstruksi Frontend
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Sistem UI terstruktur untuk operasi konstruksi yang serius dan terpercaya
          </h1>
          <p className="max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Fondasi desain, komponen reusable, dan kesiapan API contract untuk pengembangan frontend yang konsisten.
          </p>
        </div>

        <div className="flex w-full max-w-md flex-col gap-3">
          <Input placeholder="Masukkan email tim..." />
          <div className="flex gap-3">
            <Button>Mulai</Button>
            <Button variant="secondary">Dokumentasi</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
