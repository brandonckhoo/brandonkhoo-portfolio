"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteContent } from "@/content/site";
import Section, { SectionHeader } from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import FadeUp, { Stagger } from "@/components/ui/FadeUp";

const { featuredWork } = siteContent;

export default function FeaturedWork() {
  return (
    <Section id="work">
      <FadeUp>
        <SectionHeader
          title={featuredWork.title}
          subtitle={featuredWork.subtitle}
        />
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Stagger staggerDelay={0.07}>
          {featuredWork.items.map((item) => (
            <WorkCard key={item.slug} item={item} />
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

function WorkCard({ item }: { item: (typeof featuredWork.items)[number] }) {
  return (
    <Link href={`/work/${item.slug}`} className="block group" tabIndex={0}>
      <motion.article
        className="h-full flex flex-col bg-surface rounded-2xl border border-border shadow-card p-6 cursor-pointer"
        whileHover={{
          scale: 1.01,
          y: -3,
          boxShadow: "var(--shadow-lg)",
          borderColor: "var(--color-border-strong)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-medium text-ink-3 uppercase tracking-wide mb-1">
              {item.role}
            </p>
            <h3 className="font-display text-xl text-ink leading-snug">
              {item.title}
            </h3>
          </div>
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-2 text-sm group-hover:border-border-strong group-hover:text-ink transition-all"
            aria-hidden
          >
            →
          </span>
        </div>

        {/* Outcome */}
        <p className="text-sm text-ink-2 leading-relaxed mb-5 flex-1">
          {item.outcome}
        </p>

        {/* Metric callout */}
        <div className="mb-5">
          <div
            className="inline-flex flex-col px-4 py-3 rounded-xl border border-border"
            style={{ background: "var(--gradient-hero-panel-subtle)" }}
          >
            <span className="text-[10px] font-medium text-ink-3 uppercase tracking-wider">
              {item.metric.label}
            </span>
            <span
              className={
                item.metric.isPlaceholder
                  ? "text-sm font-medium text-ink-3 italic mt-0.5"
                  : "text-base font-semibold text-ink mt-0.5"
              }
            >
              {item.metric.value}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </motion.article>
    </Link>
  );
}
