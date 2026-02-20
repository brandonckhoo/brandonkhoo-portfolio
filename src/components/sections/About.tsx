"use client";

import { siteContent } from "@/content/site";
import Section, { SectionHeader } from "@/components/ui/Section";
import FadeUp from "@/components/ui/FadeUp";

const { about } = siteContent;

export default function About() {
  return (
    <Section id="about">
      <FadeUp>
        <SectionHeader title={about.title} />
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
        {/* Left: Bio */}
        <FadeUp delay={0.06}>
          <div className="flex flex-col gap-4">
            {about.bio.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-xl text-ink leading-relaxed font-light"
                    : "text-base text-ink-2 leading-relaxed"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeUp>

        {/* Right: Quick facts */}
        <FadeUp delay={0.12}>
          <div className="flex flex-col gap-3">
            {about.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col px-5 py-4 bg-surface rounded-2xl border border-border shadow-subtle"
              >
                <span className="text-[10px] font-semibold text-ink-3 uppercase tracking-widest mb-1">
                  {fact.label}
                </span>
                <span className="text-sm text-ink font-medium">{fact.value}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}
