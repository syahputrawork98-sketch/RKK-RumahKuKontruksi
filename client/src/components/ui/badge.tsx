import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "secondary";
type BadgeSize = "sm" | "md" | "lg";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]",
  success: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
  error: "bg-[var(--color-danger)]/15 text-[var(--color-danger)]",
  info: "bg-[var(--color-info)]/15 text-[var(--color-info)]",
  secondary: "bg-[var(--color-background)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs font-medium rounded-[var(--radius-sm)]",
  md: "px-3 py-1 text-sm font-medium rounded-[var(--radius-md)]",
  lg: "px-4 py-1.5 text-base font-medium rounded-[var(--radius-md)]",
};

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("inline-flex items-center justify-center whitespace-nowrap", variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";
