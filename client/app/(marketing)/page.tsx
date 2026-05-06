import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QUICK_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/estimasi", label: "Estimasi" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/contracts", label: "Contracts" },
  { href: "/clients", label: "Clients" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/showcase", label: "Showcase" },
];

const ROLE_BUTTONS = ["OWNER", "ADMIN", "KONTRAKTOR", "USER"] as const;

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Beranda",
  description: "Beranda RumahkuKonstruksi untuk akses cepat modul operasional dan role demo.",
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const nextPath = typeof params.next === "string" ? params.next : "/dashboard";

  return (
    <>
      <Hero />
      <Features />

      <section className="border-t border-[var(--color-border)] bg-[var(--color-background)] py-16">
        <Container className="space-y-6">
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Akses Sistem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Link href={`/login?next=${encodeURIComponent(nextPath)}`}>
                  <Button>Masuk ke Dashboard</Button>
                </Link>
                <Link href="/register">
                  <Button variant="secondary">Daftar Akun</Button>
                </Link>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
                  Demo Role (quick access)
                </p>
                <div className="flex flex-wrap gap-2">
                  {ROLE_BUTTONS.map((role) => (
                    <a key={role} href={`/api/auth/demo?role=${role}&next=/dashboard`}>
                      <Button size="sm" variant="tertiary">
                        Masuk sebagai {role}
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Akses Cepat Modul</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {QUICK_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
