import * as React from "react";
import { cn } from "@/lib/cn";

export type RadioProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<RadioProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const labelSizeClasses: Record<NonNullable<RadioProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, size = "md", disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          id={inputId}
          type="radio"
          disabled={disabled}
          className={cn(
            "cursor-pointer rounded-full border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]",
            sizeClasses[size],
            disabled && "cursor-not-allowed opacity-60",
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "select-none text-[var(--color-text-secondary)]",
              labelSizeClasses[size],
              disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
