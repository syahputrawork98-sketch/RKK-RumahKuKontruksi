import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AUTH_COOKIE_NAMES } from "@/constants/auth";
import { cookies } from "next/headers";

export async function Header() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(AUTH_COOKIE_NAMES.session)?.value === "1";

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-[var(--color-text-primary)]">
          RumahkuKonstruksi
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="tertiary" size="sm">
              Dashboard
            </Button>
          </Link>

          {isAuthenticated ? (
            <a href="/api/auth/logout">
              <Button size="sm" variant="secondary">
                Logout
              </Button>
            </a>
          ) : (
            <Link href="/login">
              <Button size="sm">Masuk</Button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
}
