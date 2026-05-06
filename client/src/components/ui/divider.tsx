import * as React from "react";
import { cn } from "@/lib/cn";

type DividerOrientation = "horizontal" | "vertical";
type DividerVariant = "default" | "subtle" | "bold";

const variantClasses: Record<DividerVariant, string> = {
  default: "bg-[var(--color-border)]",
  subtle: "bg-[var(--color-divider)]",
  bold: "bg-[var(--color-text-muted)]/30",
};

export type DividerProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  withLabel?: React.ReactNode;
};

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", variant = "default", withLabel, ...props }, ref) => {
    if (orientation === "vertical") {
      return <div ref={ref} className={cn("h-full w-px", variantClasses[variant], className)} {...props} />;
    }

    if (withLabel) {
      return (
        <div ref={ref} className={cn("flex items-center gap-4", className)} {...props}>
          <div className={cn("h-px flex-1", variantClasses[variant])} />
          <span className="whitespace-nowrap text-sm text-[var(--color-text-muted)]">{withLabel}</span>
          <div className={cn("h-px flex-1", variantClasses[variant])} />
        </div>
      );
    }

    return <div ref={ref} className={cn("h-px w-full", variantClasses[variant], className)} {...props} />;
  }
);

Divider.displayName = "Divider";
