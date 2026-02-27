"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Tool {
  label: string;
  badge?: string;
}

interface Category {
  id: string;
  label: string;
  description: string;
  tools: Tool[];
  accent: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "ai",
    label: "AI & Prototyping",
    description: "Rapid AI-assisted research, ideation and prototyping",
    tools: [{ label: "Claude" }, { label: "Cursor" }, { label: "Bolt" }, { label: "Lovable", badge: "L4 Platinum" }, { label: "Perplexity" }, { label: "Manus" }, { label: "Wispr" }],
    accent: "rgba(124, 92, 219, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 1.5L10.8 6.3H16L11.7 9.3L13.5 14.1L9 11.1L4.5 14.1L6.3 9.3L2 6.3H7.2L9 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "design",
    label: "Design & Collaboration",
    description: "End-to-end design, async communication, and documentation",
    tools: [{ label: "Figma" }, { label: "Miro" }, { label: "Loom" }, { label: "Confluence" }, { label: "Discourse" }, { label: "Zoom" }, { label: "Google Meet" }, { label: "Slack" }, { label: "Notion" }, { label: "GAMMA" }],
    accent: "rgba(37, 99, 235, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="13" cy="13" r="3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics & Experimentation",
    description: "Product analytics, funnels, retention, and A/B testing",
    tools: [{ label: "Amplitude" }, { label: "Mixpanel" }],
    accent: "rgba(0, 160, 122, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="10" width="3" height="6" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="7.5" y="6" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" />
        <rect x="13" y="2" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "delivery",
    label: "Delivery & Roadmapping",
    description: "Backlog management, sprint tracking, and prioritisation",
    tools: [{ label: "Jira" }, { label: "Productboard" }],
    accent: "rgba(217, 119, 6, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M2 14L6 10L10 12L16 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="10" r="1.5" fill="currentColor" />
        <circle cx="10" cy="12" r="1.5" fill="currentColor" />
        <circle cx="16" cy="4" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "crm",
    label: "CRM & Growth Systems",
    description: "Pipeline management and revenue operations",
    tools: [{ label: "Salesforce" }, { label: "HubSpot" }, { label: "GHL" }, { label: "Gong" }],
    accent: "rgba(0, 160, 122, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2C6.24 2 4 4.24 4 7C4 9.76 6.24 12 9 12C11.76 12 14 9.76 14 7C14 4.24 11.76 2 9 2Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 16C2 16 4 13 9 13C14 13 16 16 16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "lifecycle",
    label: "Lifecycle & Support",
    description: "Onboarding flows, messaging automation, and in-app guidance",
    tools: [{ label: "Braze" }, { label: "Intercom" }, { label: "Userflow" }, { label: "Zendesk" }],
    accent: "rgba(224, 61, 96, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 4H15C15.55 4 16 4.45 16 5V12C16 12.55 15.55 13 15 13H5L2 16V5C2 4.45 2.45 4 3 4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M6 8H12M6 10.5H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "reliability",
    label: "Reliability & Observability",
    description: "Uptime monitoring, alerting, and production visibility",
    tools: [{ label: "DataDog" }, { label: "Arize" }, { label: "LangSmith" }],
    accent: "rgba(217, 119, 6, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L9 5M14.5 3.5L12.4 5.6M16 9H13M14.5 14.5L12.4 12.4M9 16V13M3.5 14.5L5.6 12.4M2 9H5M3.5 3.5L5.6 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "data",
    label: "Data & Storage",
    description: "Warehousing, querying, and scalable object storage",
    tools: [{ label: "Snowflake" }, { label: "Amazon S3" }, { label: "Supabase" }, { label: "Pinecone" }],
    accent: "rgba(37, 99, 235, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <ellipse cx="9" cy="5" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 5V9C3 10.38 5.69 11.5 9 11.5C12.31 11.5 15 10.38 15 9V5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 9V13C3 14.38 5.69 15.5 9 15.5C12.31 15.5 15 14.38 15 13V9" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    id: "voice",
    label: "Voice Agents",
    description: "AI voice agent infrastructure, workflows, and integrations",
    tools: [{ label: "Retell AI" }, { label: "ElevenLabs" }],
    accent: "rgba(224, 61, 96, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2a3 3 0 0 1 3 3v4a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 9a5 5 0 0 0 10 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9 14v2M7 16h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "deployment",
    label: "Deployment",
    description: "Frontend hosting, CI/CD, and zero-config previews",
    tools: [{ label: "Vercel" }],
    accent: "rgba(124, 92, 219, 0.75)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L16 14H2L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const highlights = [
  { label: "AI-first", icon: "✦" },
  { label: "Systems thinker", icon: "◎" },
  { label: "Ship fast", icon: "⚡" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToolChip({ tool, accent }: { tool: Tool; accent: string }) {
  return (
    <motion.span
      className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full cursor-default select-none"
      style={{
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.22)",
        color: "rgba(255,255,255,0.9)",
      }}
      whileHover={{
        background: accent.replace("0.75", "0.12"),
        borderColor: accent,
        color: "rgba(255,255,255,0.95)",
        boxShadow: `0 0 10px ${accent.replace("0.75", "0.3")}`,
      }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      {tool.label}
      {tool.badge && (
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{
            background: accent.replace("0.75", "0.25"),
            color: accent.replace("0.75", "1)").replace("rgba(", "rgb(").replace(", 1)", ")"),
          }}
        >
          {tool.badge}
        </span>
      )}
    </motion.span>
  );
}

interface CategoryCardProps {
  cat: Category;
  delay: number;
  isInView: boolean;
}

function CategoryCard({ cat, delay, isInView }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
    >
      <motion.div
        className="h-full rounded-2xl p-5 flex flex-col gap-4"
        style={{
          background: "#152847",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
        whileHover={{
          background: "#1a3058",
          borderColor: "rgba(255,255,255,0.22)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {/* Card header */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: cat.accent.replace("0.75", "0.15"),
              color: cat.accent.replace("rgba(", "rgba(").replace(", 0.75)", ", 1)"),
            }}
          >
            {cat.icon}
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-snug">
              {cat.label}
            </p>
            <p className="text-white/45 text-xs leading-snug mt-0.5">
              {cat.description}
            </p>
          </div>
        </div>

        {/* Tool chips */}
        <div className="flex flex-wrap gap-1.5">
          {cat.tools.map((tool) => (
            <ToolChip key={tool.label} tool={tool} accent={cat.accent} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ProductStackSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="stack"
      ref={ref}
      style={{ background: "#0a1628" }}
      className="section-py"
    >
      <div className="max-w-content mx-auto content-px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-3">
            My Product and Data Stack
          </h2>
          <p className="text-white/50 text-base leading-relaxed whitespace-nowrap">
            The tools I use to prototype, ship, measure, and collaborate across
            the product lifecycle.
          </p>

          {/* Stack highlights */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {highlights.map((h) => (
              <span
                key={h.label}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                  letterSpacing: "0.02em",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px" }}>
                  {h.icon}
                </span>
                {h.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              delay={0.08 + i * 0.06}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
