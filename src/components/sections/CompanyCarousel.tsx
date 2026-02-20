"use client";

import { siteContent } from "@/content/site";
import FadeUp from "@/components/ui/FadeUp";

const { companies } = siteContent;

export default function CompanyCarousel() {
  return (
    <section className="py-16 bg-bg">
      <div className="max-w-content mx-auto content-px">
        <FadeUp>
          <p className="text-xs font-medium text-ink-3 uppercase tracking-widest text-center mb-8">
            {companies.title}
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {companies.items.map((name) => (
              <span
                key={name}
                className="text-sm font-medium text-ink-2 hover:text-ink transition-colors duration-200"
              >
                {name}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
