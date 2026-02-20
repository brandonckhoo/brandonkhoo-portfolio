"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

export default function FadeUp({
  children,
  delay = 0,
  className,
  once = true,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.22, ease: "easeOut", delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  baseDelay?: number;
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.06,
  baseDelay = 0,
}: StaggerProps) {
  const items = Array.isArray(children)
    ? (children as React.ReactNode[])
    : [children];
  return (
    <>
      {items.map((child, i) => (
        <FadeUp key={i} delay={baseDelay + i * staggerDelay} className={className}>
          {child}
        </FadeUp>
      ))}
    </>
  );
}
