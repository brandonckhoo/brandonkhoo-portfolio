import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
}

export default function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-pill text-xs font-medium",
        "bg-surface-subtle border border-border text-ink-2",
        className
      )}
    >
      {label}
    </span>
  );
}
