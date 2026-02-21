"use client";

import { siteContent } from "@/content/site";
import Section, { SectionHeader } from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import FadeUp from "@/components/ui/FadeUp";

const { experience } = siteContent;

export default function Experience() {
  return (
    <Section id="experience" subtle>
      <FadeUp>
        <div className="flex items-start justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-4xl text-ink mb-2">{experience.title}</h2>
          </div>
          <a
            href="/brandon-khoo-resume.pdf"
            download="Brandon Khoo Resume.pdf"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-[#0a1628] text-white text-sm font-medium hover:bg-[#1a2d4e] transition-colors shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download CV
          </a>
        </div>
      </FadeUp>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-3 bottom-0 w-px bg-border hidden sm:block" />

        <div className="flex flex-col gap-10">
          {experience.items.map((item, i) => (
            <FadeUp key={item.company} delay={i * 0.07}>
              <div className="sm:pl-10 relative">
                {/* Company dot */}
                <div className="hidden sm:block absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-ink bg-bg" />

                {/* Company header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-5">
                  <div>
                    <h3 className="font-semibold text-ink text-xl">{item.company}</h3>
                    <p className="text-xs text-ink-3 mt-0.5">{item.location}</p>
                  </div>
                  <span className="text-xs font-medium text-ink-3 bg-surface border border-border px-3 py-1 rounded-pill whitespace-nowrap self-start sm:mt-0">
                    {item.companyPeriod}
                  </span>
                </div>

                {/* Roles within the company */}
                <div className="flex flex-col gap-6">
                  {item.roles.map((role, j) => (
                    <div key={role.title} className="relative">
                      {/* Role connector line (only between roles) */}
                      {j < item.roles.length - 1 && (
                        <div className="absolute left-[5px] top-6 bottom-[-18px] w-px bg-border/60 hidden sm:block" />
                      )}

                      <div className="sm:pl-7 relative">
                        {/* Role dot */}
                        <div className="hidden sm:block absolute left-0 top-[5px] w-2.5 h-2.5 rounded-full border border-border-strong bg-surface-subtle" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2.5">
                          <p className="font-medium text-ink text-sm">{role.title}</p>
                          <span className="text-[11px] text-ink-3 whitespace-nowrap">
                            {role.period}
                          </span>
                        </div>

                        <ul className="flex flex-col gap-2">
                          {role.bullets.map((bullet, k) => (
                            <li
                              key={k}
                              className="flex gap-3 text-sm text-ink-2 leading-relaxed"
                            >
                              <span className="flex-shrink-0 text-ink-3 mt-0.5">·</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Strengths row */}
      <FadeUp delay={0.3}>
        <div className="mt-14 pt-10 border-t border-border">
          <p className="text-xs font-medium text-ink-3 uppercase tracking-widest mb-4">
            Core strengths
          </p>
          <div className="flex flex-wrap gap-2">
            {experience.strengths.map((s) => (
              <Tag key={s} label={s} className="bg-surface border-border-strong text-ink-2" />
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Education */}
      <FadeUp delay={0.36}>
        <div className="mt-10 pt-10 border-t border-border">
          <p className="text-xs font-medium text-ink-3 uppercase tracking-widest mb-5">
            Education
          </p>
          <div className="flex flex-col gap-4">
            {experience.education.map((edu) => (
              <div
                key={edu.degree}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{edu.degree}</p>
                  <p className="text-sm text-ink-2 mt-0.5">
                    {edu.institution}
                    {edu.location ? ` · ${edu.location}` : ""}
                  </p>
                  {edu.awards && (
                    <p className="text-xs text-ink-3 mt-1">{edu.awards}</p>
                  )}
                </div>
                <span className="text-xs text-ink-3 whitespace-nowrap sm:mt-0.5">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
