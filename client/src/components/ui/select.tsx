import * as React from "react";
import { cn } from "@/lib/cn";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  label?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  options: SelectOption[];
  placeholder?: string;
};

const sizeClasses: Record<NonNullable<SelectProps["size"]>, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      hint,
      error,
      size = "md",
      disabled,
      options,
      placeholder = "Select an option",
      id,
      ...props
    },
    ref
  ) => {
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
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full appearance-none rounded-[var(--radius-md)] border bg-[var(--color-surface)] pr-10 text-[var(--color-text-primary)] transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]",
              sizeClasses[size],
              isError ? "border-[var(--color-danger)]" : "border-[var(--color-border)]",
              disabled && "cursor-not-allowed bg-[var(--color-surface-secondary)] text-[var(--color-text-muted)]",
              className
            )}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[var(--color-text-muted)]">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 8 4 4 4-4" />
            </svg>
          </span>
        </div>
        {hasHint && <p className="mt-1 text-xs text-[var(--color-text-muted)]">{hint}</p>}
        {isError && <p className="mt-1 text-xs text-[var(--color-danger)]">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
