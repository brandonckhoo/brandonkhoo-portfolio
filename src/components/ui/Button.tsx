"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-body font-medium rounded-pill transition-all duration-[220ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-ink text-white hover:bg-[var(--color-primary-hover)] active:scale-[0.98]",
      secondary:
        "bg-transparent text-ink border border-border hover:border-border-strong hover:bg-surface active:scale-[0.98]",
      ghost:
        "bg-transparent text-ink-2 hover:text-ink hover:bg-surface-subtle active:scale-[0.98]",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 min-h-[36px]",
      md: "text-sm px-5 py-2.5 min-h-[44px]",
      lg: "text-base px-7 py-3.5 min-h-[52px]",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;

// Link variant — wraps an anchor with Button styling
interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center font-body font-medium rounded-pill transition-all duration-[220ms] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer select-none";

  const variants = {
    primary:
      "bg-ink text-white hover:bg-[var(--color-primary-hover)] active:scale-[0.98]",
    secondary:
      "bg-transparent text-ink border border-border hover:border-border-strong hover:bg-surface active:scale-[0.98]",
    ghost:
      "bg-transparent text-ink-2 hover:text-ink hover:bg-surface-subtle active:scale-[0.98]",
  };

  const sizes = {
    sm: "text-sm px-4 py-2 min-h-[36px]",
    md: "text-sm px-5 py-2.5 min-h-[44px]",
    lg: "text-base px-7 py-3.5 min-h-[52px]",
  };

  return (
    <a
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}
