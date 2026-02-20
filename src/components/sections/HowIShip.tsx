"use client";

import { useState, useRef, useId, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";

// ─────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────
interface Item { label: string; body: string }
interface TabData { id: string; label: string; title: string; subtitle: string; items: Item[] }

const tabs: TabData[] = [
  {
    id: "ship",
    label: "How I ship products",
    title: "How I ship products",
    subtitle: "From signal to shipped workflow, fast and repeatable",
    items: [
      {
        label: "Define the bet",
        body: "I write the hypothesis in 1 sentence, the user, the moment, and the expected behavior change. I pick 1 primary metric, 2 guardrails, and a decision date so we do not drift.",
      },
      {
        label: "Map the workflow and failure points",
        body: "I map the happy path plus the top 3 failure paths. I call out where trust breaks, where users get confused, and where handoffs fail.",
      },
      {
        label: "Prototype in code, on brand",
        body: "I use Claude Code plus a small set of Claude skills to generate the scaffold and a consistent design system. Cursor is where I tighten UX details and edge cases. I ship a Vercel preview so customers can click the workflow end to end within 24 to 72 hours.",
      },
      {
        label: "Validate with customers and behavior",
        body: "I test with 5 to 10 customers or community users. I pair calls with session replay to see what people do, then iterate the prototype quickly. I capture feedback on both workflow and trust — does it feel safe, does it feel like it belongs in their stack.",
      },
      {
        label: "Ship the thin slice behind a flag",
        body: "I move from preview to production by shipping the smallest version that delivers 1 clear outcome. Feature flags, staged rollout, and instrumentation from day 1.",
      },
      {
        label: "Iterate to stable and scalable",
        body: "I segment by cohort, find who is winning and who is stuck, then remove friction. Once stable, I invest in scale levers like templates, defaults, docs, and self-serve.",
      },
    ],
  },
  {
    id: "experiments",
    label: "How I run experiments",
    title: "How I run experiments",
    subtitle: "Clean measurement without slowing shipping",
    items: [
      {
        label: "Start with a decision, not curiosity",
        body: "Every experiment exists to make a decision. I write pass, fail, and stop criteria before launch.",
      },
      {
        label: "Choose the right test design",
        body: "If we can randomize cleanly, I run A/B tests behind feature flags. If not, I use matched cohorts, time-based holdout, stepped rollouts, or pre/post with adjustment.",
      },
      {
        label: "Instrument leading indicators",
        body: "I add leading indicators that explain why the outcome moved: time to value, step conversion, errors, latency, drop-offs, and support volume.",
      },
      {
        label: "Roll out safely",
        body: "I dogfood internally first, then 5%, then 25%, then 100% using staged releases. I monitor guardrails daily.",
      },
      {
        label: "Readout and learnings",
        body: "I publish a 1-page readout and decide: ship, iterate, or kill. Then I feed learnings back into the next prototype.",
      },
    ],
  },
  {
    id: "prototype",
    label: "How I prototype fast",
    title: "How I prototype fast",
    subtitle: "Prove value in 24 to 72 hours",
    items: [
      {
        label: "Start with the critical moment",
        body: "I pick the 1 moment that must feel inevitable in the workflow. That becomes the scope.",
      },
      {
        label: "Build a thin vertical slice with a design system",
        body: "Claude Code gets me from blank repo to working flow fast. I use Claude skills as a specialized designer to produce tokens, components, copy patterns, and states so the prototype feels like a real product, not a hack. Cursor is where I refine interaction details and implement the final UI.",
      },
      {
        label: "Make it testable and brand consistent",
        body: "I deploy on Vercel with realistic sample data, basic analytics, and a consistent visual language across screens. The goal is customers reacting to behavior and polish, not imagining what it could become.",
      },
      {
        label: "Run structured feedback loops",
        body: "I send the preview link and ask 3 questions: what were you trying to do, what confused you, would you trust this in production. Then I iterate 1 to 2 cycles.",
      },
    ],
  },
  {
    id: "feedback",
    label: "How I use customer feedback",
    title: "How I use customer feedback",
    subtitle: "Customers are part of the team",
    items: [
      {
        label: "Build the customer loop",
        body: "I keep a small group of power users and new users. Power users surface scale pain. New users surface onboarding friction.",
      },
      {
        label: "Treat brand and trust as part of feedback",
        body: "I validate not just usability but consistency. If the prototype feels off-brand or inconsistent, customers discount the experience — so I fix design debt early.",
      },
      {
        label: "Combine voice and behavior",
        body: "I triangulate calls, support tickets, community threads, and session replay. When what users say conflicts with behavior, I investigate the behavior first.",
      },
      {
        label: "Turn patterns into a backlog",
        body: "I tag replay clips by failure mode, quantify frequency, map to journey steps, then prioritize by impact and prevalence.",
      },
      {
        label: "Ship with customers watching",
        body: "I share Vercel previews early, ship incremental fixes, and follow up with the same customers after release. If the failure pattern still shows up in replay, it is not fixed yet.",
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function HowIShip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const uid = useId();

  const goTo = useCallback((i: number) => {
    setActiveIndex(i);
    tabRefs.current[i]?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo((i + 1) % tabs.length); }
    if (e.key === "ArrowLeft")  { e.preventDefault(); goTo((i - 1 + tabs.length) % tabs.length); }
    if (e.key === "Home")       { e.preventDefault(); goTo(0); }
    if (e.key === "End")        { e.preventDefault(); goTo(tabs.length - 1); }
  };

  const active = tabs[activeIndex];

  const fadeVariants = {
    enter: { opacity: 0, y: prefersReducedMotion ? 0 : 6 },
    show:  { opacity: 1, y: 0 },
    exit:  { opacity: 0, y: prefersReducedMotion ? 0 : -4 },
  };

  return (
    <section
      id="shipping"
      ref={sectionRef}
      className="section-py bg-bg"
    >
      <div className="max-w-content mx-auto content-px">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-10"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-ink flex-shrink-0">
            How I Ship Products
          </h2>
          <p className="text-ink-2 text-base leading-relaxed max-w-md md:text-right">
            My default operating system for shipping products fast, using Claude Code, Cursor, and Vercel previews to validate workflows with real customers.
          </p>
        </motion.div>

        {/* ── Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.32, ease: "easeOut", delay: 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#f0eeeb",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* ── Tab bar ── */}
          <div className="px-4 pt-5 pb-0 flex justify-center">
            <div
              role="tablist"
              aria-label="Shipping methodology tabs"
              className="flex gap-1 overflow-x-auto pb-4 scrollbar-none max-w-full"
              style={{ scrollbarWidth: "none" }}
            >
              {tabs.map((tab, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => { tabRefs.current[i] = el; }}
                    role="tab"
                    id={`${uid}-tab-${i}`}
                    aria-selected={isActive}
                    aria-controls={`${uid}-panel-${i}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
                    style={
                      isActive
                        ? {
                            background: "#ffffff",
                            color: "#0a1628",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)",
                          }
                        : { background: "transparent", color: "#888880" }
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Tab panels ── */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              id={`${uid}-panel-${activeIndex}`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${activeIndex}`}
              tabIndex={0}
              variants={fadeVariants}
              initial="enter"
              animate="show"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-6 md:p-8 outline-none"
            >
              {/* Panel header */}
              <div className="mb-7">
                <h3 className="font-display text-2xl text-ink mb-1">
                  {active.title}
                </h3>
                <p className="text-ink-3 text-sm">{active.subtitle}</p>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {active.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-xl bg-white"
                    style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    {/* Number */}
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold mt-0.5"
                      style={{
                        background: "rgba(0,0,0,0.06)",
                        color: "#888880",
                      }}
                    >
                      {i + 1}
                    </span>
                    {/* Text */}
                    <div>
                      <p className="text-ink font-semibold text-sm leading-snug mb-1">
                        {item.label}
                      </p>
                      <p className="text-ink-2 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
