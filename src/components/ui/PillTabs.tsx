"use client";

import { cn } from "@/lib/utils";

interface PillTabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  className?: string;
}

export default function PillTabs({
  tabs,
  active,
  onChange,
  className,
}: PillTabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-pill bg-surface-subtle border border-border",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
          className={cn(
            "px-4 py-1.5 rounded-pill text-sm font-medium transition-all duration-200 cursor-pointer",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
            active === tab
              ? "bg-ink text-white shadow-subtle"
              : "text-ink-2 hover:text-ink hover:bg-surface"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
