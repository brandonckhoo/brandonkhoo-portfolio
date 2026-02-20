"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

export default function Card({
  children,
  className,
  hover = true,
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const base = cn(
    "bg-surface rounded-2xl border border-border shadow-card",
    paddings[padding],
    className
  );

  if (!hover) {
    return <div className={base}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(base, "cursor-default")}
      whileHover={{
        scale: 1.01,
        y: -3,
        boxShadow: "var(--shadow-lg)",
        borderColor: "var(--color-border-strong)",
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
