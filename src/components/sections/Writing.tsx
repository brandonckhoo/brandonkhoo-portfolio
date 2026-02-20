"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site";
import Section, { SectionHeader } from "@/components/ui/Section";
import PillTabs from "@/components/ui/PillTabs";
import FadeUp from "@/components/ui/FadeUp";

const { writing } = siteContent;

const categoryColors: Record<string, string> = {
  AI: "var(--color-accent-blush)",
  Platform: "var(--color-accent-lavender)",
  Product: "var(--color-accent-sage)",
};

export default function Writing() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? writing.items
      : writing.items.filter((p) => p.category === activeCategory);

  return (
    <Section id="writing" subtle>
      <FadeUp>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeader
            title={writing.title}
            subtitle={writing.subtitle}
            className="mb-0"
          />
          <PillTabs
            tabs={writing.categories}
            active={activeCategory}
            onChange={setActiveCategory}
            className="flex-shrink-0"
          />
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map((post, i) => (
          <FadeUp key={post.slug} delay={i * 0.07}>
            <PostCard post={post} />
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

function PostCard({ post }: { post: (typeof writing.items)[number] }) {
  return (
    <Link href={`/writing/${post.slug}`} className="block group">
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
        {/* Category dot */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: categoryColors[post.category] }}
          />
          <span className="text-xs font-medium text-ink-3 uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-xs text-ink-3 ml-auto">{post.date}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl text-ink leading-snug mb-3 flex-1">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-ink-2 leading-relaxed mb-5">{post.excerpt}</p>

        {/* Read link */}
        <div className="flex items-center gap-1.5 text-sm font-medium text-ink group-hover:gap-2.5 transition-all">
          Read
          <span className="opacity-50 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
