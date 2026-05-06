import * as React from "react";
import { cn } from "@/lib/cn";

export type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<TextFieldProps["size"]>, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, hint, error, size = "md", disabled, id, ...props }, ref) => {
    const isError = Boolean(error);
    const hasHint = Boolean(hint) && !isError;
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            "w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-colors",
            "placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]",
            sizeClasses[size],
            isError ? "border-[var(--color-danger)]" : "border-[var(--color-border)]",
            disabled && "cursor-not-allowed bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]",
            className
          )}
          {...props}
        />
        {hasHint && <p className="mt-1 text-xs text-[var(--color-text-muted)]">{hint}</p>}
        {isError && <p className="mt-1 text-xs text-[var(--color-danger)]">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
