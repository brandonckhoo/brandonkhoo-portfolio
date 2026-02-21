"use client";

import Image from "next/image";
import { siteContent, AmplitudeBlogPost } from "@/content/site";
import FadeUp from "@/components/ui/FadeUp";

const { amplitudeBlog } = siteContent;

const categoryColor: Record<AmplitudeBlogPost["category"], string> = {
  Product:  "#7c5cdb",
  Insights: "#7c5cdb",
};

export default function AmplitudeBlog() {
  return (
    <section id="blog" className="section-py bg-bg">
      <div className="max-w-content mx-auto content-px">

        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl text-ink mb-2">
                {amplitudeBlog.title}
              </h2>
              <p className="text-ink-2 text-base leading-relaxed whitespace-nowrap">
                {amplitudeBlog.subtitle}
              </p>
            </div>
            <a
              href={amplitudeBlog.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink transition-colors group whitespace-nowrap"
            >
              View all 7 posts
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
        </FadeUp>

        {/* Cards grid — 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {amplitudeBlog.posts.map((post, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <BlogCard post={post} />
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}

function BlogCard({ post }: { post: AmplitudeBlogPost }) {
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md hover:border-border-strong transition-all duration-200 h-full"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-subtle flex-shrink-0">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category */}
        <span
          className="text-xs font-semibold"
          style={{ color: categoryColor[post.category] }}
        >
          {post.category}
        </span>

        {/* Title */}
        <h3 className="text-sm font-semibold text-ink leading-snug flex-1 group-hover:text-ink-2 transition-colors">
          {post.title}
        </h3>

        {/* Meta */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center gap-1.5 text-xs text-ink-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M1 5h10" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
            {post.date}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.readTime}
          </div>
        </div>
      </div>
    </a>
  );
}
