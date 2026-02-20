"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { siteContent, SideProject } from "@/content/site";
import Section, { SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import FadeUp from "@/components/ui/FadeUp";
import Tag from "@/components/ui/Tag";

const { sideProjects } = siteContent;

const typeLabel: Record<string, string> = {
  prototype: "Prototype",
  game: "Game",
  demo: "Demo",
};

const typeAccent: Record<string, string> = {
  prototype: "var(--color-accent-blush)",
  game: "var(--color-accent-sage)",
  demo: "var(--color-accent-lavender)",
};

export default function SideProjects() {
  return (
    <Section id="side-projects">
      <FadeUp>
        <SectionHeader
          title={sideProjects.title}
          subtitle={sideProjects.subtitle}
        />
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {sideProjects.items.map((project, i) => (
          <FadeUp key={project.slug} delay={i * 0.08} className="h-full">
            <SideProjectCard project={project} />
          </FadeUp>
        ))}
      </div>
    </Section>
  );
}

function SideProjectCard({ project }: { project: SideProject }) {
  return (
    <motion.article
      className="flex flex-col bg-surface rounded-2xl border border-border shadow-card overflow-hidden h-full"
      whileHover={{
        scale: 1.01,
        y: -3,
        boxShadow: "var(--shadow-lg)",
        borderColor: "var(--color-border-strong)",
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Hero image */}
      {project.image ? (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
          />
        </div>
      ) : (
        <div
          className="h-1 w-full"
          style={{ background: typeAccent[project.type] }}
        />
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Type badge + title */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span
              className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-pill mb-2 border"
              style={{
                background: typeAccent[project.type] + "33",
                borderColor: typeAccent[project.type] + "66",
                color: "var(--color-text)",
              }}
            >
              {typeLabel[project.type]}
            </span>
            <h3 className="font-display text-xl text-ink leading-snug">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Oneliner */}
        <p className="text-sm text-ink-2 leading-relaxed mb-4">
          {project.oneliner}
        </p>

        {/* Callout (Cosmo Labs) */}
        {project.callout && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-surface-subtle border border-border text-sm text-ink-2 leading-relaxed">
            <span className="font-medium text-ink">Retell AI · </span>
            {project.callout.replace("Built with Retell AI voice agents to prototype and showcase agent behaviour in production-realistic scenarios.", "Retell AI voice agents used to prototype and showcase agent behaviour.")}
          </div>
        )}

        {/* Demonstrates */}
        {project.demonstrates && (
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-ink-3 uppercase tracking-wider mb-2">
              Demonstrates
            </p>
            <ul className="flex flex-col gap-1.5">
              {project.demonstrates.map((d, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-2">
                  <span className="text-accent-sage mt-0.5 flex-shrink-0">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Steps (Space Shooter) */}
        {project.steps && (
          <div className="mb-4">
            <p className="text-[11px] font-semibold text-ink-3 uppercase tracking-wider mb-2">
              How it was built
            </p>
            <ol className="flex flex-col gap-1.5 counter-reset-[step]">
              {project.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-surface-subtle border border-border text-[10px] font-semibold flex items-center justify-center text-ink-3 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Links */}
        <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
          {project.links?.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variant={link.primary ? "primary" : "secondary"}
              size="sm"
              className="w-full justify-center"
            >
              {link.label}
              <span className="ml-1.5 opacity-60 text-xs">↗</span>
            </ButtonLink>
          ))}
          <Link
            href={`/side/${project.slug}`}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm text-ink-2 hover:text-ink transition-colors border border-transparent hover:border-border rounded-pill"
          >
            View details <span className="opacity-50">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
