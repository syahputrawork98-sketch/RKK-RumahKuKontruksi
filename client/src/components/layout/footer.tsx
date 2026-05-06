import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Container className="flex h-16 items-center justify-between text-sm text-[var(--color-text-muted)]">
        <span>© 2026 RumahkuKonstruksi</span>
        <span>Frontend System v1</span>
      </Container>
    </footer>
  );
}
