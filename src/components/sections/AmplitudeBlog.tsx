"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteContent, AmplitudeBlogPost } from "@/content/site";
import FadeUp from "@/components/ui/FadeUp";

const { amplitudeBlog } = siteContent;

const categoryStyle: Record<AmplitudeBlogPost["category"], { bg: string; text: string; bar: string }> = {
  Product: { bg: "bg-teal-50", text: "text-teal-700", bar: "#00a07a" },
  Insights: { bg: "bg-blue-50",  text: "text-blue-700",  bar: "#2563eb" },
};

export default function AmplitudeBlog() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const preview = amplitudeBlog.posts.slice(0, 4);

  return (
    <section id="blog" ref={sectionRef} className="section-py bg-bg">
      <div className="max-w-content mx-auto content-px">

        {/* Header */}
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl text-ink mb-2">
                {amplitudeBlog.title}
              </h2>
              <p className="text-ink-2 text-base leading-relaxed max-w-lg">
                {amplitudeBlog.subtitle}
              </p>
            </div>
            <a
              href={amplitudeBlog.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium text-ink-2 hover:text-ink transition-colors group"
            >
              View all 7 posts
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
          </div>
        </FadeUp>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {preview.map((post, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <BlogCard post={post} />
            </FadeUp>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="mt-8 text-center"
        >
          <a
            href={amplitudeBlog.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill border border-border text-sm font-medium text-ink-2 hover:text-ink hover:border-border-strong transition-colors"
          >
            See all 7 articles on Amplitude Blog
            <span>↗</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

function BlogCard({ post }: { post: AmplitudeBlogPost }) {
  const style = categoryStyle[post.category];

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl border border-border hover:border-border-strong hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Category accent bar */}
      <div className="h-1 w-full" style={{ background: style.bar }} />

      <div className="p-5">
        {/* Category pill */}
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${style.bg} ${style.text}`}>
          {post.category}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-ink text-sm leading-snug mb-4 group-hover:text-ink-2 transition-colors line-clamp-3">
          {post.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-ink-3">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-ink-3/40" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </a>
  );
}
