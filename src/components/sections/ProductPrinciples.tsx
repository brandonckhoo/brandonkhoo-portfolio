"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

interface STARStory {
  situation: string;
  task: string;
  action: string;
  result: string;
}

interface Principle {
  title: string;
  belief: string;
  star: STARStory;
}

const principles: Principle[] = [
  {
    title: "Customer is part of the team",
    belief:
      "We treat customers as teammates, not feedback tickets. We watch them use the product, debug with them, and design alongside them. The fastest path to the right product is building with users, not for them.",
    star: {
      situation:
        "A key workflow showed healthy top-line conversion, but enterprise accounts were still complaining about setup friction and time to first value.",
      task: "Find the exact moments users got stuck and turn that into a weekly ship loop.",
      action:
        "Pulled session replays for new enterprise workspaces in their first 7 days, tagged failure patterns, then paired those clips with customer calls to confirm intent. Found repeated confusion around a permissions gate and a hidden configuration step that caused users to loop between pages. Shipped a clearer inline explanation, better defaults, and a guided checklist, then re-reviewed new replays to confirm behavior changed.",
      result:
        "Fewer stuck sessions, faster setup completion, improved time to first value, and fewer CS escalations because customers could see their feedback turned into fixes within 1 to 2 releases.",
    },
  },
  {
    title: "Ship fast to get signal and iterate",
    belief:
      "Speed is a strategy. Ship the smallest version that can generate real behavior, measure it, then iterate. Opinions do not scale. Signal does. The goal is learning velocity, not feature velocity.",
    star: {
      situation:
        "Partners hesitated to adopt because breaking changes could disrupt production workflows.",
      task: "Make the platform safe to integrate with and upgrade.",
      action:
        "Introduced explicit schemas, versioning, backward compatibility expectations, and clearer contracts so integrations did not break silently.",
      result:
        "Higher partner confidence, fewer incidents, and smoother upgrades.",
    },
  },
  {
    title: "Think in systems and workflows",
    belief:
      "Features do not exist in isolation. Map the end to end workflow and optimize the full system. If the workflow is broken, no individual feature will save it. Great products remove friction across the entire journey.",
    star: {
      situation:
        "CDP had to become a sellable product, but the experience felt like disconnected parts.",
      task: "Define the smallest workflow that creates value and supports a credible Sales narrative.",
      action:
        "Mapped the activation workflow from data selection to audience creation to downstream action, then prioritized the outbound activation surface first because it tied directly to customer outcomes and monetization.",
      result:
        "A clearer product story, faster time to first value, and a roadmap anchored to outcomes not a feature list.",
    },
  },
  {
    title: "Build systems that compound",
    belief:
      "Use AI to automate decisions, not just assist them. Create workflows that improve with usage and ecosystems that extend beyond your team. The goal is output per person, not team size.",
    star: {
      situation:
        "Sales struggled to build pipeline because integration coverage was thin, while engineering time was being consumed by bespoke builds.",
      task: "Create a scalable motion to grow integrations without becoming a services team.",
      action:
        "Aligned on the highest leverage partner categories, hardened the API contract with schemas and versioning, and created repeatable patterns for partners to build on.",
      result:
        "Faster partner throughput and less dependency on custom engineering, improving ecosystem credibility.",
    },
  },
];

const starLabels: { key: keyof STARStory; label: string }[] = [
  { key: "situation", label: "Situation" },
  { key: "task", label: "Task" },
  { key: "action", label: "Action" },
  { key: "result", label: "Result" },
];

export default function ProductPrinciples() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="principles"
      ref={ref}
      style={{ background: "#0a1628" }}
      className="section-py"
    >
      <div className="max-w-content mx-auto content-px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
            How I Think
          </h2>
          <p className="text-white/55 text-base mx-auto leading-relaxed whitespace-nowrap">
            Product principles that guide how I build platforms, integrations, and agent workflows.{" "}
            <span className="text-white/35">Click to expand.</span>
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {principles.map((principle, i) => {
            const isOpen = openIndex === i;
            const cardId = `principle-card-${i}`;
            const panelId = `principle-panel-${i}`;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                  delay: 0.1 + i * 0.07,
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {/* Accordion trigger */}
                  <button
                    id={cardId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(i);
                      }
                    }}
                    className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 group cursor-pointer"
                    style={{
                      background: isOpen
                        ? "rgba(255,255,255,0.07)"
                        : "transparent",
                      transition: "background 200ms ease",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-base leading-snug mb-1.5">
                        {principle.title}
                      </p>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {principle.belief}
                      </p>
                    </div>

                    {/* Chevron */}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white/40"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 4L6 8L10 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  {/* Accordion panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={cardId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="px-6 pb-6 pt-1 flex flex-col gap-3.5"
                          style={{
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {starLabels.map(({ key, label }) => (
                            <div key={key}>
                              <p className="text-sm text-white/80 leading-relaxed">
                                <span className="font-semibold text-white">
                                  {label}:{" "}
                                </span>
                                {principle.star[key]}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
