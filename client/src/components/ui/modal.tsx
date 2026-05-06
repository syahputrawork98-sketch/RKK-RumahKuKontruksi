import * as React from "react";
import { cn } from "@/lib/cn";

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeButton?: boolean;
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onOpenChange, title, children, size = "md", closeButton = true }, ref) => {
    React.useEffect(() => {
      document.body.style.overflow = open ? "hidden" : "unset";
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [open]);

    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-[var(--color-overlay)]"
          onClick={() => onOpenChange(false)}
          aria-hidden="true"
        />

        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative z-10 mx-4 max-h-[90vh] w-full overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-[var(--color-text-primary)] shadow-[var(--shadow-2)]",
            sizeClasses[size]
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {closeButton && (
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-[var(--radius-sm)] p-1 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="text-[var(--color-text-secondary)]">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
));

ModalHeader.displayName = "ModalHeader";

export const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("py-4", className)} {...props} />
));

ModalBody.displayName = "ModalBody";

export const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-end gap-2 border-t border-[var(--color-border)] pt-4",
      className
    )}
    {...props}
  />
));

ModalFooter.displayName = "ModalFooter";
