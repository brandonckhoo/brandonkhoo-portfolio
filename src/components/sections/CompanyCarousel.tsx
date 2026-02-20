"use client";

import { siteContent } from "@/content/site";
import FadeUp from "@/components/ui/FadeUp";
import AppleLogo from "@/components/logos/AppleLogo";
import KPMGLogo from "@/components/logos/KPMGLogo";
import UberLogo from "@/components/logos/UberLogo";
import AmplitudeLogo from "@/components/logos/AmplitudeLogo";

const { companies } = siteContent;

const logoMap: Record<string, React.FC<{ className?: string }>> = {
  Apple: AppleLogo,
  KPMG: KPMGLogo,
  Uber: UberLogo,
  Amplitude: AmplitudeLogo,
};

// Repeat enough times to fill the track seamlessly
const row1Items = [...companies.items, ...companies.items, ...companies.items, ...companies.items];
const row2Items = [...companies.items, ...companies.items, ...companies.items, ...companies.items];

export default function CompanyCarousel() {
  return (
    <section className="py-16 bg-bg overflow-hidden">
      <div className="max-w-content mx-auto content-px mb-10">
        <FadeUp>
          <p className="text-xs font-medium text-ink-3 uppercase tracking-widest text-center">
            {companies.title}
          </p>
        </FadeUp>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-5" aria-label="Companies worked with" role="list">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-10 items-center">
          {row1Items.map((name, i) => {
            const Logo = logoMap[name];
            return (
              <div
                key={`row1-${name}-${i}`}
                role="listitem"
                aria-label={i < companies.items.length ? name : undefined}
                aria-hidden={i >= companies.items.length}
                className="flex-shrink-0 flex items-center gap-2.5 text-ink-2 hover:text-ink transition-colors duration-200 min-w-max"
              >
                <Logo className="h-5 w-auto" />
                <span className="text-sm font-medium">{name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative" role="list">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-reverse gap-10 items-center">
          {row2Items.map((name, i) => {
            const Logo = logoMap[name];
            return (
              <div
                key={`row2-${name}-${i}`}
                role="listitem"
                aria-hidden
                className="flex-shrink-0 flex items-center gap-2.5 text-ink-2 hover:text-ink transition-colors duration-200 min-w-max"
              >
                <Logo className="h-5 w-auto" />
                <span className="text-sm font-medium">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
