import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  subtle?: boolean; // alternate background
}

export default function Section({
  id,
  className,
  children,
  subtle = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "section-py",
        subtle ? "bg-surface-subtle" : "bg-bg",
        className
      )}
    >
      <div className="max-w-content mx-auto content-px">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      <h2 className="font-display text-4xl text-ink mb-2">{title}</h2>
      {subtitle && (
        <p className="text-ink-2 text-base mt-1">{subtitle}</p>
      )}
    </div>
  );
}
