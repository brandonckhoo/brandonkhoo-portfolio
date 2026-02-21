"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteContent } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

const { hero, meta, companies } = siteContent;

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "$21M", label: "CDP ARR" },
  { value: "130+", label: "Integrations Built" },
  { value: "$25M+", label: "Revenue Impact" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center bg-bg overflow-hidden pt-16">
      <div className="max-w-2xl mx-auto content-px w-full pt-20 pb-12 flex flex-col items-center text-center">

        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-7"
        >
          <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-border shadow-md mx-auto bg-surface">
            <Image
              src="/profile.jpg"
              alt="Brandon Khoo"
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
          className="font-display text-5xl sm:text-6xl text-ink mb-2"
        >
          {meta.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.13 }}
          className="text-xl text-ink-2 font-medium mb-5"
        >
          AI Product Manager
        </motion.p>

        {/* Blurb */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.18 }}
          className="text-base text-ink-2 leading-relaxed max-w-lg mb-10"
        >
          {hero.subline}
        </motion.p>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.24 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-10"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-4 py-5 bg-surface rounded-2xl border border-border shadow-subtle"
            >
              <span className="text-2xl font-semibold text-ink mb-1">{stat.value}</span>
              <span className="text-xs text-ink-3 text-center leading-snug">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.30 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {hero.ctas.map((cta) => (
            <ButtonLink
              key={cta.href}
              href={cta.href}
              target={cta.href.startsWith("http") ? "_blank" : undefined}
              rel={cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
              variant={cta.variant as "primary" | "secondary"}
              size="lg"
              onClick={(e) => {
                if (cta.href.startsWith("#")) {
                  e.preventDefault();
                  const id = cta.href.replace("#", "");
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {cta.label}
              {cta.variant === "primary" && (
                <span className="ml-2 opacity-60">→</span>
              )}
            </ButtonLink>
          ))}
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.38 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <p className="text-xs font-medium text-ink-3 uppercase tracking-widest">
            {companies.title}
          </p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {companies.items.map((name) => (
              <span key={name} className="text-lg font-medium text-ink-2">
                {name}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
