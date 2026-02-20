"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

const { hero } = siteContent;

const accentStyles: Record<string, string> = {
  blush: "bg-[var(--color-accent-blush)]",
  lavender: "bg-[var(--color-accent-lavender)]",
  sage: "bg-[var(--color-accent-sage)]",
  sky: "bg-[var(--color-accent-sky)]",
  peach: "bg-[var(--color-accent-peach)]",
};

const floatClasses = [
  "animate-float",
  "animate-float-delayed",
  "animate-float-delayed-2",
];

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-bg overflow-hidden pt-16">
      {/* Background noise grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      <div className="max-w-content mx-auto content-px w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-center">
          {/* ── Left: copy ──────────────────────────────── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-sm font-medium text-ink-2 mb-6 tracking-wide uppercase"
            >
              Brandon Khoo
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.06 }}
              className="font-display text-5xl sm:text-6xl lg:text-[64px] leading-[1.05] text-ink text-balance mb-6"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.14 }}
              className="text-lg text-ink-2 leading-relaxed max-w-[520px] mb-10"
            >
              {hero.subline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.22 }}
              className="flex flex-wrap gap-3"
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
          </div>

          {/* ── Right: pastel panel ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main gradient panel */}
            <div
              className="relative rounded-3xl overflow-hidden p-8 min-h-[420px]"
              style={{ background: "var(--gradient-hero-panel)" }}
            >
              {/* Soft inner glow */}
              <div className="absolute inset-0 bg-white/10 rounded-3xl" />

              {/* Floating metric cards */}
              <div className="relative flex flex-col gap-4 pt-4">
                {hero.floatingCards.map((card, i) => (
                  <div
                    key={card.label}
                    className={[
                      "bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60",
                      "shadow-card px-5 py-4 w-fit",
                      floatClasses[i],
                      i === 1 ? "self-end" : i === 2 ? "self-center" : "",
                    ].join(" ")}
                  >
                    <p className="text-[11px] font-medium text-ink-2 uppercase tracking-wider mb-1">
                      {card.label}
                    </p>
                    <p className="text-base font-semibold text-ink">
                      {card.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Decorative blobs */}
              <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full bg-white/20 blur-2xl" />
              <div className="absolute top-8 left-4 w-14 h-14 rounded-full bg-white/25 blur-xl" />
            </div>

            {/* Subtle decorative ring behind panel */}
            <div className="absolute -inset-3 rounded-[32px] border border-border -z-10" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-3"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-border animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
