"use client";

import { siteContent } from "@/content/site";
import FadeUp from "@/components/ui/FadeUp";
import AppleLogo from "@/components/logos/AppleLogo";
import KPMGLogo from "@/components/logos/KPMGLogo";
import UberLogo from "@/components/logos/UberLogo";
import AmplitudeLogo from "@/components/logos/AmplitudeLogo";
import { cn } from "@/lib/utils";

const { companies } = siteContent;

const logoMap: Record<string, React.FC<{ className?: string }>> = {
  Apple: AppleLogo,
  KPMG: KPMGLogo,
  Uber: UberLogo,
  Amplitude: AmplitudeLogo,
};

// Duplicate the items so the loop is seamless
const marqueeItems = [...companies.items, ...companies.items];

export default function CompanyCarousel() {
  return (
    <section className="py-14 bg-surface border-y border-border overflow-hidden">
      <div className="max-w-content mx-auto content-px mb-7">
        <FadeUp>
          <p className="text-xs font-medium text-ink-3 uppercase tracking-widest text-center">
            {companies.title}
          </p>
        </FadeUp>
      </div>

      {/* Marquee track */}
      <div
        className="relative"
        aria-label="Companies worked with"
        role="list"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-4" aria-hidden="false">
          {marqueeItems.map((name, i) => {
            const Logo = logoMap[name];
            return (
              <div
                key={`${name}-${i}`}
                role="listitem"
                aria-label={i < companies.items.length ? name : undefined}
                aria-hidden={i >= companies.items.length}
                className={cn(
                  "flex-shrink-0 flex items-center justify-center",
                  "px-8 py-4 rounded-pill border border-border bg-surface",
                  "shadow-subtle min-w-[180px] transition-colors duration-200",
                  "hover:border-border-strong hover:shadow-card"
                )}
              >
                <Logo className="h-5 w-auto text-ink-2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
