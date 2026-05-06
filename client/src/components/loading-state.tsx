import { cn } from "@/lib/cn";

type LoadingStateProps = {
  lines?: number;
  className?: string;
};

export function LoadingState({ lines = 4, className }: LoadingStateProps) {
  return (
    <div className={cn("space-y-3", className)} aria-live="polite" aria-busy="true">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 w-full animate-pulse rounded-[var(--radius-sm)] bg-[var(--color-surface-secondary)]"
        />
      ))}
    </div>
  );
}
