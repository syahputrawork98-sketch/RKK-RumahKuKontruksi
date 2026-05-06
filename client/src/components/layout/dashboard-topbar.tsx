import { Badge } from "@/components/ui/badge";

type DashboardTopbarProps = {
  title: string;
  subtitle?: string;
};

export function DashboardTopbar({ title, subtitle }: DashboardTopbarProps) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-[var(--color-text-muted)]">{subtitle}</p> : null}
        </div>
        <Badge variant="info" size="sm">System Ready</Badge>
      </div>
    </header>
  );
}
