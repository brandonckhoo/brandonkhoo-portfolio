// ─────────────────────────────────────────────────────────────────────────────
// site.ts — All copy and data for brandonkhoo.com
// Single source of truth. No copy lives in components.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface FloatingCard {
  label: string;
  value: string;
  accent: "blush" | "lavender" | "sage" | "sky" | "peach";
}

export interface WorkMetric {
  label: string;
  value: string;
  isPlaceholder?: boolean;
}

export interface WorkCard {
  slug: string;
  title: string;
  outcome: string;
  role: string;
  metric: WorkMetric;
  tags: string[];
  image?: string;
}

export interface ExperienceRole {
  title: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  awards?: string;
}

export interface ExperienceItem {
  company: string;
  location: string;
  companyPeriod: string;
  roles: ExperienceRole[];
}

export interface SideProjectLink {
  label: string;
  href: string;
  primary: boolean;
}

export interface DemoScenario {
  label: string;
  description: string;
}

export interface SideProject {
  slug: string;
  title: string;
  oneliner: string;
  type: "prototype" | "game" | "demo";
  callout?: string;
  links?: SideProjectLink[];
  demonstrates?: string[];
  trustAndControl?: string[];
  nextSteps?: string[];
  positioning?: string;
  learned?: string[];
  wouldImprove?: string[];
  demoScenarios?: DemoScenario[];
  steps?: string[];
  image?: string;
}

export interface WritingPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: "AI" | "Platform" | "Product";
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface AmplitudeBlogPost {
  title: string;
  category: "Product" | "Insights";
  date: string;
  readTime: string;
  href: string;
  imageUrl: string;
  source?: string; // e.g. "Amplitude" — used on the /blog page to attribute publication
}

// ── Detail page types ─────────────────────────────────────────────────────────

export interface TradeoffDecision {
  decision: string;
  rationale: string;
  tradeoff: string;
}

export interface MetricDefinition {
  term: string;
  definition: string;
}

export interface WorkCaseStudy {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  stack: string[];
  metrics: WorkMetric[];
  context: string;
  problem: string;
  approach: string[];
  whatIShipped: string[];
  impact: string[];
  learnings: string[];
  tradeoff: TradeoffDecision;
  metricDefinitions: MetricDefinition[];
}

export interface SideProjectDetail {
  slug: string;
  title: string;
  oneliner: string;
  type: "prototype" | "game" | "demo";
  links?: SideProjectLink[];
  whatIBuilt: string;
  whyItMatters: string;
  howItWorks: string[];
  stack: string[];
  improvements: string[];
  productRationale?: string;
  demonstrates?: string[];
  trustAndControl?: string[];
  nextSteps?: string[];
  demoScenarios?: DemoScenario[];
  steps?: string[];
  callout?: string;
}

export interface WritingPostDetail {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: "AI" | "Platform" | "Product";
  readingTime: string;
  toc: { label: string; anchor: string }[];
  intro: string;
  sections: { heading: string; anchor: string; paragraphs: string[] }[];
  closing: string;
}

// ── Site Content ──────────────────────────────────────────────────────────────

export const siteContent = {
  meta: {
    name: "Brandon Khoo",
    title: "Brandon Khoo — Product Manager",
    description:
      "Product Manager building AI-powered growth and voice automation. I ship 0→1 products, build scalable ecosystems, and turn messy signals into revenue.",
    url: "https://brandonkhoo.com",
  },

  nav: {
    links: [
      { label: "Home", href: "#" },
      { label: "Case Studies", href: "#work" },
      { label: "AI Side Projects", href: "#side-projects" },
      { label: "Principles", href: "#principles" },
      { label: "How I Ship", href: "#shipping" },
      { label: "Gallery", href: "#gallery" },
      { label: "Blog", href: "#blog" },
      { label: "Resume", href: "#experience" },
    ] as NavLink[],
    cta: { label: "Book a call →", href: "https://calendly.com/brandoncharleskhoo" } as NavLink,
  },

  hero: {
    headline: "AI Product Manager building platforms, integrations, and agent experiences teams rely on",
    subline:
      "AI product leader with 10+ years across consulting, operations, and product, building B2B SaaS in San Francisco and Australia. Led 0 to 1 launches, growth experiments, and AI powered workflows in data and personalization. Scaled an ecosystem from 40 to 130+ integrations and drove $25M+ revenue impact.",
    ctas: [
      { label: "Book a call", href: "https://calendly.com/brandoncharleskhoo", variant: "primary" },
    ] as Cta[],
    floatingCards: [
      {
        label: "CDP ARR",
        value: "$6M → $21M",
        accent: "blush",
      },
      {
        label: "Voice AI demos",
        value: "Booking · Triage · Qualify",
        accent: "sage",
      },
      {
        label: "Built with",
        value: "Claude + Cursor",
        accent: "lavender",
      },
    ] as FloatingCard[],
  },

  companies: {
    title: "Trusted by",
    items: ["Apple", "KPMG", "Uber", "Amplitude"] as string[],
  },

  featuredWork: {
    title: "Case Studies",
    subtitle: "Selected professional case studies",
    items: [
      {
        slug: "ai-summaries",
        title: "AI Summaries for Session Replay",
        outcome: "Built an eval-driven LLM feature that surfaces instant replay insights, cutting review time in half and lifting new user activation",
        role: "Product Lead",
        metric: { label: "Activation lift", value: "+17%" },
        tags: ["AI", "LLM", "Evals", "Activation"],
        image: "/case-studies/AI-powered summaries.png",
      },
      {
        slug: "amplitude-recommendations",
        title: "Amplitude Recommendations",
        outcome: "Upgraded the real-time User Profile service to serve fresher behavioral signals, driving measurable lifts in content engagement for customers like HBO",
        role: "Product Lead",
        metric: { label: "Engagement lift", value: "+20%" },
        tags: ["AI", "Personalization", "Real-time", "ML"],
        image: "/case-studies/Amplitude Recommendations.png",
      },
      {
        slug: "ai-audience-segmentation",
        title: "AI Audience Segmentation",
        outcome: "Replaced manual segment-building with auto-generated cohorts using clustering and LLM labeling, improving activation targeting precision",
        role: "Product Lead",
        metric: { label: "Targeting performance lift", value: "+15%" },
        tags: ["AI", "Segmentation", "LLM", "Activation"],
        image: "/case-studies/AI-Audience Segmentation.png",
      },
      {
        slug: "amplitude-cdp-integrations",
        title: "Amplitude Platform & Integrations",
        outcome:
          "Built the CDP and developer platform that scaled revenue 3.5× and grew the integration ecosystem from 40 to 130+ partners",
        role: "Product Manager & Senior PM",
        metric: { label: "CDP ARR", value: "$6M → $21M" },
        tags: ["CDP", "APIs", "Developer Platform", "Partnerships", "Platform"],
        image: "/cdp.png",
      },
      {
        slug: "uber-eats-growth",
        title: "Uber Moments",
        outcome:
          "Co-founded a first-of-its-kind experience marketplace on UberEats, covered in 16+ media outlets",
        role: "Strategy & Operations Manager",
        metric: { label: "Avg ticket (vs $22 Eats avg)", value: "$109" },
        tags: ["Marketplace", "0→1", "Growth", "Experimentation"],
        image: "/uber-moments.png",
      },
    ] as WorkCard[],
  },

  experience: {
    title: "Experience",
    items: [
      {
        company: "Amplitude",
        location: "San Francisco, CA",
        companyPeriod: "Nov 2020 – Present",
        roles: [
          {
            title: "Product Lead, Ecosystem",
            period: "Feb 2025 – Present",
            bullets: [
              "Launched unified User Profile deepening connections across Session Replay, Guides, Surveys, and Experiment — increasing activation by 17% across key workflows.",
              "Introduced multi-agent AI system (Model Context Protocols) to automate root cause analysis across Confluence, DataDog, and Zendesk, reducing engineering support load by 30%.",
              "Delivered AI-powered Webhook Copilot, improving integration setup completion by 50% and org activation rates by 15%.",
            ],
          },
          {
            title: "Product Lead, Session Replay",
            period: "Aug 2024 – Jan 2025",
            bullets: [
              "Owned product vision and strategy for Session Replay, leading delivery across two engineering teams (SDK and Core).",
              "Launched AI replay summaries, reducing review time by 50% and auto-surfacing key interaction patterns for teams.",
              "Integrated replays into the experimentation platform, enabling 25% adoption lift through variant-level session insights.",
            ],
          },
          {
            title: "Senior Product Manager, CDP",
            period: "Mar 2024 – Aug 2024",
            bullets: [
              "Defined 1-year vision, strategy, and roadmap for Amplitude's CDP, driving a 3.5× revenue increase ($6M to $21M).",
              "Built AI-powered audience segmentation using LLMs and statistical clustering, improving activation targeting by 15%.",
            ],
          },
          {
            title: "Product Manager, CDP",
            period: "Mar 2022 – Feb 2024",
            bullets: [
              "Launched Amplitude's Developer Portal (0→1), expanding the integration ecosystem from 40 to 130+ partners including Insider, Statsig, CleverTap, Optimizely, and LaunchDarkly.",
              "Rolled out Amplitude Plus plan, a cost-effective SMB bundle that generated $3M in incremental revenue.",
            ],
          },
          {
            title: "Product Operations Manager",
            period: "Nov 2020 – Feb 2022",
            bullets: [
              "Joined Amplitude pre-IPO (Series E); company went public at $7B. Spearheaded launches of Amplitude Audiences, Experiment, and Snowflake Export across Sales, Ops, Marketing, and Product.",
            ],
          },
        ],
      },
      {
        company: "Uber",
        location: "San Francisco, CA",
        companyPeriod: "Apr 2019 – Oct 2020",
        roles: [
          {
            title: "Strategy & Operations Manager",
            period: "Apr 2019 – Oct 2020",
            bullets: [
              "Co-founded and launched Uber Moments — an experience marketplace on UberEats with $109 avg ticket (5× Eats avg), 15% above industry satisfaction, and coverage in Forbes, TechCrunch, Engadget, and Fox Business.",
              "Led A/B tests with CRM campaigns increasing courier retention by 1.6% (+$0.6M annualised).",
            ],
          },
        ],
      },
      {
        company: "KPMG",
        location: "Brisbane, Australia",
        companyPeriod: "Jul 2016 – Apr 2019",
        roles: [
          {
            title: "Senior Consultant",
            period: "Jul 2016 – Apr 2019",
            bullets: [
              "Identified and presented 45 cost-saving initiatives totalling $100M+ to QLD Transport (QTMR) executives.",
              "Developed a Performance Management Framework for United Care Queensland with projected annualised savings of $65M.",
            ],
          },
        ],
      },
    ] as ExperienceItem[],
    strengths: [
      "Platform thinking",
      "Ecosystem design",
      "AI product",
      "Experimentation",
      "Analytics",
      "GTM alignment",
      "Agent workflows",
      "Execution in ambiguity",
    ] as string[],
    education: [
      {
        degree: "Bachelor of Electrical Engineering & Bachelor of Finance",
        institution: "Queensland University of Technology",
        location: "Brisbane, Australia",
        period: "Jul 2016",
        awards: "Dean's List & Distinction, Golden Key Honor Award (Top 15%)",
      },
      {
        degree: "Scrum Product Owner Certificate",
        institution: "Scrum Alliance",
        period: "Jan 2020",
      },
    ] as EducationItem[],
  },

  sideProjects: {
    title: "AI Side Projects",
    subtitle: "Builder mode — shipping fast with Claude and Cursor over the weekend",
    items: [
      {
        slug: "alice-abm-prototype",
        title: "Alice ABM Prototype",
        oneliner:
          "Built an end-to-end account-based workflow prototype showing how 11x Alice could move from target accounts to pipeline — with tighter control, better coordination, and measurable outcomes.",
        type: "prototype",
        image: "/alice-abm.png",
        positioning:
          "Product improvement prototype focused on enterprise ABM workflows rather than single-lead outbound.",
        links: [
          {
            label: "Live demo",
            href: "https://alice-abm-prototype.vercel.app/",
            primary: true,
          },
        ],
        demonstrates: [
          "Account selection and prioritisation based on ICP and intent signals",
          "Buying committee discovery, persona mapping, and account coverage",
          "Coordinated multi-persona messaging and campaign execution with review points",
        ],
        trustAndControl: [
          "Guardrails for deliverability and brand risk",
          "Human-in-the-loop approval for high-risk sends and account-level changes",
          "Measurement design: lift vs control for meetings, opportunities, and pipeline",
        ],
        nextSteps: [
          "Reporting layer for meetings, opportunities, pipeline, and attribution",
          "Integration points with Salesforce, enrichment, and sequence tools",
        ],
      },
      {
        slug: "cosmo-labs",
        title: "Cosmo Labs",
        oneliner: "Building voice AI agent demos for real business workflows.",
        type: "demo",
        image: "/cosmo-labs.png",
        links: [
          {
            label: "Live demo",
            href: "https://cosmo-voice-spark.lovable.app/",
            primary: true,
          },
        ],
        callout:
          "Built with Retell AI voice agents to prototype and showcase agent behaviour in production-realistic scenarios.",
        demonstrates: [
          "How voice agents can handle structured business workflows end-to-end",
          "What trust and handoff patterns look like in real deployments",
          "How to prototype agent demos fast without a full backend",
        ],
        learned: [
          "Retell AI handles turn-taking and latency better than expected at demo quality",
          "The hardest part is defining the failure modes and escalation paths",
          "Voice agents need a tight script and strong fallback logic to feel trustworthy",
        ],
        wouldImprove: [
          "Add call analytics to track drop-off and intent signals per call",
          "Test with real SMB customers to validate the booking and triage flows",
        ],
        demoScenarios: [
          {
            label: "Booking & scheduling",
            description:
              "Agent handles inbound appointment requests and calendar coordination.",
          },
          {
            label: "Lead qualification",
            description:
              "Agent qualifies inbound leads on key criteria and routes to the right rep.",
          },
          {
            label: "Support triage",
            description:
              "Agent handles tier-1 queries and escalates with full context attached.",
          },
        ],
      },
      {
        slug: "retro-space-shooter",
        title: "Retro Space Shooter",
        oneliner:
          "Recreated a retro space shooter and shipped it end-to-end using Cursor, Claude, GitHub, and Vercel.",
        type: "game",
        image: "/space-shooter.png",
        links: [
          {
            label: "Play live",
            href: "https://space-shooter-game-nu.vercel.app/",
            primary: true,
          },
          {
            label: "GitHub",
            href: "https://github.com/brandonckhoo/space-shooter-game",
            primary: false,
          },
        ],
        steps: [
          "Set up the project in Cursor with a clean repo structure",
          "Found free pixel art assets from itch.io",
          "Drafted the spec and game loop logic with Claude",
          "Built the MVP: movement, shooting, enemies, and scoring",
          "Debugged the boss battle — collision detection and phase transitions",
          "Shipped with GitHub Actions and deployed to Vercel",
        ],
      },
    ] as SideProject[],
  },

  writing: {
    title: "Writing",
    subtitle: "Notes on product, AI, and building",
    items: [
      {
        slug: "shipping-voice-ai-agents-without-breaking-trust",
        title: "Shipping voice AI agents without breaking trust",
        date: "January 2025",
        excerpt:
          "The hardest part of deploying voice agents isn't the tech. It's knowing when to hand off — and designing for the moments when the agent shouldn't try.",
        category: "AI",
      },
      {
        slug: "integration-factories-scaling-ecosystems",
        title:
          "Integration factories: scaling ecosystems without burning engineering",
        date: "November 2024",
        excerpt:
          "How a schema-first, partner-led model let us ship 3x more integrations with the same team — and what we had to unlearn to get there.",
        category: "Platform",
      },
      {
        slug: "proving-roi-autonomous-workflows",
        title: "Proving ROI for autonomous workflows",
        date: "September 2024",
        excerpt:
          "Executives want proof before they commit. Here's how to build the measurement layer before the workflow — and why that sequencing changes everything.",
        category: "Product",
      },
    ] as WritingPost[],
    categories: ["All", "AI", "Platform", "Product"] as string[],
  },

  about: {
    title: "About",
    bio: [
      "I build AI powered product platforms that scale. My background spans enterprise consulting, marketplace operations, and B2B SaaS platform work at KPMG, Uber, and Amplitude.",
      "At Amplitude I led the CDP from $6M to $21M ARR, grew the integration ecosystem from 40 to 130 partners, and shipped AI powered features across session replay, audience segmentation, and developer tooling. I think in systems: data pipelines, APIs, agent workflows, and the measurement layer that makes them trustworthy.",
      "I prototype fast with Claude and Cursor, run experiments before committing to roadmaps, and treat evaluation as a core product requirement.",
    ] as string[],
    quickFacts: [
      { label: "Based in", value: "Australia, open to US roles" },
      { label: "Focus", value: "AI powered platforms, voice automation, agent workflows" },
      { label: "Strengths", value: "Integrations and APIs, workflow design, measurement and experimentation" },
      { label: "Selected companies", value: "Apple, Uber, Amplitude, KPMG" },
    ] as QuickFact[],
  },

  contact: {
    title: "Let's talk",
    availability:
      "Open to new opportunities and interesting conversations. Usually respond within 48 hours.",
    email: "brandon@brandonkhoo.com",
    links: [
      {
        label: "Book a call",
        href: "https://calendly.com/brandoncharleskhoo",
      },
      {
        label: "Email",
        href: "mailto:brandon@brandonkhoo.com",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/brandoncharleskhoo/",
      },
      {
        label: "GitHub",
        href: "https://github.com/brandonckhoo",
      },
    ] as ContactLink[],
  },

  amplitudeBlog: {
    title: "Blog",
    subtitle: "Authored 7 thought leadership pieces on Data, Governance, and Product Management.",
    authorUrl: "https://amplitude.com/blog/author/brandon-khoo",
    posts: [
      {
        title: "Maximize the Power of Your Data Ecosystem: Introducing Amplitude's Connections Overview",
        category: "Product",
        date: "Jun 20, 2024",
        readTime: "3 min read",
        href: "https://amplitude.com/blog/connections-overview",
        imageUrl: "https://cdn.sanity.io/images/l5rq9j6r/production/26ce5c950a694d2d4ab9cc5aeb0a94370bd7e2ee-1920x1080.png",
        source: "Amplitude",
      },
      {
        title: "The Amplitude Integration Portal: Connecting Your Data Ecosystem",
        category: "Product",
        date: "Jun 18, 2024",
        readTime: "7 min read",
        href: "https://amplitude.com/blog/integration-portal",
        imageUrl: "https://cdn.sanity.io/images/l5rq9j6r/production/a28a4dd9227c8c743ad4e58430db03e7c96482b0-1920x1440.png",
        source: "Amplitude",
      },
      {
        title: "Is Your Data Actually Reliable? 8 Ways to Determine Data Quality",
        category: "Insights",
        date: "Nov 29, 2022",
        readTime: "10 min read",
        href: "https://amplitude.com/blog/data-quality",
        imageUrl: "https://cdn.sanity.io/images/l5rq9j6r/production/b1f3a9666ec857d4339df18092c6c31f093ece31-1500x938.jpg",
        source: "Amplitude",
      },
      {
        title: "First-Party Data: What It Is, Importance, & How to Gather It",
        category: "Insights",
        date: "Oct 27, 2022",
        readTime: "12 min read",
        href: "https://amplitude.com/blog/first-party-data",
        imageUrl: "https://cdn.sanity.io/images/l5rq9j6r/production/d968cfb62335158d575f3761f507d366274de546-1500x938.jpg",
        source: "Amplitude",
      },
      {
        title: "Attrition & Retention Analytics to Increase Repeat Buyers",
        category: "Insights",
        date: "Aug 26, 2022",
        readTime: "16 min read",
        href: "https://amplitude.com/blog/attrition-retention-analytics",
        imageUrl: "https://cdn.sanity.io/images/l5rq9j6r/production/e1c6b2d433de77217f38bb607e71a42bc6245e23-2250x1407.jpg",
        source: "Amplitude",
      },
      {
        title: "32 Product Management Interview Questions & How to Answer",
        category: "Insights",
        date: "Jun 16, 2022",
        readTime: "11 min read",
        href: "https://amplitude.com/blog/product-management-interview-questions",
        imageUrl: "https://cdn.sanity.io/images/l5rq9j6r/production/de78be29e998e526845887efe5c566444e5137ed-1500x938.jpg",
        source: "Amplitude",
      },
      {
        title: "The Modern Business Software Stack for Product & Growth",
        category: "Insights",
        date: "Oct 18, 2021",
        readTime: "9 min read",
        href: "https://amplitude.com/blog/business-software",
        imageUrl: "https://cdn.sanity.io/images/l5rq9j6r/production/3d93ad3125293f17d2029ac45adbd01bdeaba5b2-1500x938.jpg",
        source: "Amplitude",
      },
    ] as AmplitudeBlogPost[],
  },

  footer: {
    name: "Brandon Khoo",
    year: 2026,
    links: [
      { label: "GitHub", href: "https://github.com/brandonckhoo" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/brandoncharleskhoo/" },
    ] as NavLink[],
  },
};

// ── Work Case Study Detail Content ───────────────────────────────────────────

export const workCaseStudies: WorkCaseStudy[] = [
  {
    slug: "amplitude-cdp-integrations",
    title: "Amplitude CDP Integrations Factory",
    role: "Senior Product Manager",
    timeline: "2022 — 2024",
    stack: ["REST APIs", "JSON Schema", "OAuth 2.0", "Amplitude CDP", "Partner SDK"],
    metrics: [
      { label: "CDP ARR", value: "$6M → $21M" },
      { label: "Partner integrations shipped", value: "50+" },
      {
        label: "Time-to-integrate reduction",
        value: "Placeholder metric",
        isPlaceholder: true,
      },
    ],
    context:
      "Amplitude was entering the CDP market in a competitive landscape dominated by Segment and mParticle. The integrations ecosystem was a critical differentiator — customers needed to connect Amplitude to their existing data stack, and the more connectors we had, the stickier the platform became.",
    problem:
      "The integrations backlog was 80+ requests deep. Engineering was building each integration one at a time, every one bespoke. There was no shared schema, no partner self-serve path, and no way to scale. We were losing deals because the integration customers needed wasn't available.",
    approach: [
      "Audited the integration backlog by revenue potential, customer frequency, and engineering cost — identified the top 15 high-ROI connectors to prioritise.",
      "Designed a JSON Schema-based integration spec that standardised how data mappings, auth flows, and sync configurations were described — enabling reuse across integrations.",
      "Built a partner portal that let technology partners self-certify integrations using the SDK, reducing the engineering touch required per integration.",
      "Launched a tiered partner programme: Certified, Verified, and Community — with clear SLAs and co-marketing criteria at each tier.",
    ],
    whatIShipped: [
      "Integration factory architecture: shared schema, auth library, and validation tooling used across 50+ connectors",
      "Partner self-serve certification portal with documentation, sandbox environment, and testing checklist",
      "Tiered partner programme with onboarding playbook and go-to-market support for Certified-tier partners",
      "Integration quality metrics dashboard for ongoing monitoring of sync health and error rates",
    ],
    impact: [
      "CDP ARR grew from $6M to $21M over 18 months — integration coverage was cited in 70%+ of CDP expansion deals.",
      "Time from integration request to GA dropped significantly after the factory model launched.",
      "50+ integrations shipped in 18 months vs 12 in the prior 18 — without increasing the integrations team headcount.",
    ],
    learnings: [
      "Schema design is strategy. The JSON Schema decisions we made early constrained everything downstream — investing 6 weeks in schema design before writing a single integration saved months of rework.",
      "Partners are customers. Treating the self-serve portal like a user-facing product — with real dogfooding and feedback loops — was the unlock for partner adoption.",
      "Metrics need to lag revenue, not lead. We initially tracked integrations shipped; switching to integration-influenced ARR changed how the team prioritised the backlog entirely.",
    ],
    tradeoff: {
      decision:
        "Build a standardised schema vs. support fully custom integration contracts per partner",
      rationale:
        "Custom contracts would have let us onboard a few large partners faster, but created a maintenance nightmare at scale. Standardisation sacrificed short-term speed for long-term leverage.",
      tradeoff:
        "We lost 2 potential Certified partners in the first 6 months who couldn't adapt to the schema. In hindsight, the schema was correct and those partners would have been high-maintenance.",
    },
    metricDefinitions: [
      {
        term: "CDP ARR",
        definition:
          "Annual Recurring Revenue from customers on Amplitude CDP plans, measured at end-of-quarter.",
      },
      {
        term: "Integration-influenced ARR",
        definition:
          "Closed or expanded deals where the customer cited integration availability as a factor in their decision.",
      },
      {
        term: "Time-to-integrate",
        definition:
          "Days from a partner submitting their integration spec to GA launch on the marketplace.",
      },
    ],
  },
  {
    slug: "uber-eats-growth",
    title: "Uber Eats Growth Strategy",
    role: "Strategy & Operations",
    timeline: "2020 — 2022",
    stack: ["SQL", "Looker", "Excel", "Presentation decks"],
    metrics: [
      {
        label: "GMV impact",
        value: "Placeholder metric",
        isPlaceholder: true,
      },
      {
        label: "Conversion rate lift",
        value: "Placeholder metric",
        isPlaceholder: true,
      },
      {
        label: "Restaurant supply added",
        value: "Placeholder metric",
        isPlaceholder: true,
      },
    ],
    context:
      "Uber Eats was in hyper-growth mode in Australia and New Zealand, competing with Menulog and DoorDash. The strategy team was responsible for identifying growth opportunities across the three-sided marketplace: restaurants, consumers, and couriers.",
    problem:
      "Growth was slowing in mature cities while newer markets were still finding their footing. The team needed to identify which levers had the most impact on GMV, and sequence them for maximum compounding effect.",
    approach: [
      "Built a marketplace diagnostic model to decompose GMV by supply density, consumer demand, and delivery reliability — identifying where each city was underperforming.",
      "Ran supply expansion sprints in restaurants-light suburbs to improve cuisine coverage and reduce choice fatigue for consumers.",
      "Designed A/B experiments to test pricing nudges, cart suggestions, and re-engagement messaging.",
      "Created an ops playbook for launching new suburbs that could be replicated across markets.",
    ],
    whatIShipped: [
      "Marketplace diagnostic model used by city teams to identify growth priorities",
      "Restaurant acquisition playbook for supply-constrained suburbs",
      "Experiment framework for consumer-side conversion tests with clear hypothesis and success metrics",
      "Suburb launch playbook adopted by 3 additional ANZ markets",
    ],
    impact: [
      "Supply expansion in targeted suburbs improved estimated consumer choice metrics.",
      "Conversion experiments provided learnings that shaped the regional experiment roadmap.",
      "Ops playbooks reduced suburb launch time by standardising the activation checklist.",
    ],
    learnings: [
      "Marketplace thinking requires holding three customer types simultaneously. Optimising one side often hurts another — the diagnostic model forced us to think systemically.",
      "Ops playbooks compound. The first suburb launch was painful. The fifth was easy. Documentation and standardisation are leverage.",
    ],
    tradeoff: {
      decision: "Prioritise supply expansion vs. consumer demand activation in underperforming suburbs",
      rationale:
        "Data showed that low restaurant density was the primary driver of low conversion in target suburbs — consumers were leaving because they couldn't find what they wanted, not because the app was broken.",
      tradeoff:
        "We delayed consumer marketing in those suburbs for 2 months to give supply time to establish. This was the right call — restaurants needed customers to stay, and volume alone wouldn't help them do that.",
    },
    metricDefinitions: [
      {
        term: "GMV",
        definition: "Gross Merchandise Value — total value of food orders processed through the platform before refunds.",
      },
      {
        term: "Supply density",
        definition:
          "Number of active restaurant partners per 1km radius of the delivery zone centroid.",
      },
    ],
  },
  {
    slug: "ai-summaries",
    title: "AI Summaries for Session Replay",
    role: "Product Lead",
    timeline: "2023 — 2024",
    stack: ["LLM", "Structured Event Data", "AI Summarisation", "Experimentation Platform", "Amplitude Analytics"],
    metrics: [
      { label: "Replay review time reduction", value: "~50%" },
      { label: "First-time user activation lift", value: "+17%" },
    ],
    context: "Amplitude Session Replay gives teams visibility into how users move through their product. After launch, over 50% of new customers never opened Replay. Among those who did, many dropped off — scrubbing through 10 to 15 minute recordings to find what mattered was too slow. Replay felt like a storage tool, not an insight tool.",
    problem: "New users couldn't find value fast enough. The workflow required watching replays end to end, which slowed time to first insight and made it hard to justify the tool during onboarding.",
    approach: [
      "Built an evaluation framework before writing any prompts. We pulled real customer replays and defined what a good summary had to include: key user actions, meaningful friction points, and behavioral signals. That became our labeled eval set. We tracked groundedness, signal capture, and noise — every prompt or model change ran against that dataset. When we found a new failure mode, we added it as a permanent test case.",
      "Reduced hallucination risk by grounding the LLM on structured event data rather than raw video or loosely formatted logs. The model handled reasoning; we controlled the inputs and enforced a strict output format to keep summaries consistent and auditable.",
      "Shipped the product changes: a Summary Card on every replay showing instant AI-generated insights, and updated onboarding so new users saw the summary first instead of being dropped into a raw recording.",
    ],
    whatIShipped: [
      "Summary Card surfaced on every session replay with AI-generated insight highlights",
      "Labeled eval dataset built from real customer replays, used to validate every model and prompt change",
      "Eval framework tracking groundedness, signal capture, and noise — with regression tests for known failure modes",
      "Updated onboarding flow prioritising the Summary Card as the activation entry point",
    ],
    impact: [
      "Replay review time dropped by approximately 50% — users could scan summaries and jump directly to important moments.",
      "First-time user activation increased 17% across key workflows.",
      "Users could quickly decide what to investigate without watching full sessions.",
    ],
    learnings: [
      "LLM quality has to be treated like a product surface. If the summary is wrong one in ten times, trust drops fast. Defining a labeled eval set from real replays and testing every prompt change against it was critical — it forced us to measure groundedness and signal capture rather than relying on gut feel.",
      "Grounding beats clever prompting. The biggest quality lift came from constraining the model to structured event data rather than raw video. Controlled inputs produced consistent, reliable outputs.",
      "AI alone doesn't move activation — workflow does. The model was necessary but not sufficient. Activation moved when we changed the entry point and pushed users to the Summary Card first. The onboarding changes were just as important as the model quality.",
    ],
    tradeoff: {
      decision: "Summarise structured event data vs. attempt direct video or transcript summarisation",
      rationale: "Structured events gave us a clean, auditable input format with far lower hallucination risk. Video or transcript summarisation would have been richer in theory but unpredictable in practice.",
      tradeoff: "We gave up some nuance — tone, emotional cues, visual context — that a transcript might have captured. For an analytics tool where precision matters more than colour, that was the right trade.",
    },
    metricDefinitions: [
      {
        term: "Replay review time",
        definition: "Median time from opening a session replay to the user taking an action or closing — measured via instrumentation on the replay player.",
      },
      {
        term: "First-time user activation",
        definition: "Percentage of new Replay users who completed a defined activation event (e.g. jumping to a flagged moment or sharing a replay) within their first session.",
      },
    ],
  },
  {
    slug: "amplitude-recommendations",
    title: "Amplitude Recommendations",
    role: "Product Lead",
    timeline: "2022 — 2023",
    stack: ["User Profile API", "Streaming Infrastructure", "ML Ranking Models", "Experimentation Platform", "Amplitude Analytics"],
    metrics: [
      { label: "Engagement lift", value: "+20%" },
      { label: "Content consumption lift", value: "+15%" },
    ],
    context: "Amplitude Recommendations is the ML-powered personalization engine used by media and commerce customers like HBO to drive content engagement. The system ranked content based on user behavior signals — but those signals were bottlenecked by the User Profile API, which wasn't optimised for low-latency real-time updates and lacked richer attributes like genre, SKU, or structured metadata.",
    problem: "In practice, HBO's 'Recommended For You' row could feel stale. If a user binged a crime series or explored a new genre, the homepage might still serve generic or older titles because profile updates weren't fast or expressive enough for the ranking model to react in near real time.",
    approach: [
      "Partnered with engineering to upgrade the User Profile service from a batch-oriented update model to streaming profile updates. Introduced a low-latency serving layer so ranking models could read fresh user state in near real time.",
      "Expanded the profile schema to support richer attributes including product category, SKU, and structured content metadata. This gave ranking models more granular behavioral and content signals to work with.",
      "Worked closely with data science to ensure enriched profile data was incorporated into the ranking logic. Ran controlled experiments comparing the baseline model against the enhanced real-time profile-driven model, instrumenting engagement at the recommendation unit level.",
    ],
    whatIShipped: [
      "Upgraded User Profile service with streaming update support and a low-latency serving layer",
      "Expanded profile schema supporting richer content and behavioral attributes",
      "Experiment framework comparing baseline vs. real-time profile-driven ranking models",
      "Instrumentation at the recommendation unit level for engagement measurement",
    ],
    impact: [
      "20% higher engagement for customers on the upgraded recommendation stack.",
      "15% more content consumption, measured at the recommendation unit level.",
      "Recommendations became dynamic and responsive — reflecting what users just watched rather than serving stale suggestions.",
    ],
    learnings: [
      "Infrastructure quality determines product quality. The ranking model was only as good as the profile data feeding it. Investing in the serving layer wasn't glamorous, but it was the actual unlock.",
      "Real-time beats batch for personalization. The latency gap between when something happened and when the model knew about it was the core problem. Closing that gap — not improving the ranking algorithm — drove the result.",
      "Measure at the unit level. Aggregate engagement metrics masked what was happening at the recommendation row. Instrumenting individual recommendation units let us attribute impact cleanly and run tighter experiments.",
    ],
    tradeoff: {
      decision: "Upgrade the shared User Profile service vs. build a lightweight real-time profile layer just for Recommendations",
      rationale: "A Recommendations-specific layer would have been faster to ship but created divergent profile representations across the platform. Upgrading the shared service took longer but benefited every downstream consumer of user data.",
      tradeoff: "The shared service approach added coordination overhead and slowed the initial rollout by about 6 weeks. Worth it — the improved profile layer was later used by the Audiences and Cohorts products as well.",
    },
    metricDefinitions: [
      {
        term: "Engagement lift",
        definition: "Relative increase in click-through rate on recommended content, measured via A/B experiment with the prior recommendation model as control.",
      },
      {
        term: "Content consumption lift",
        definition: "Relative increase in content play-through events (watch time, article reads) attributed to recommended content in the test group.",
      },
    ],
  },
  {
    slug: "ai-audience-segmentation",
    title: "AI Audience Segmentation",
    role: "Product Lead",
    timeline: "2023 — 2024",
    stack: ["Clustering Algorithms", "LLM Labeling", "Amplitude Analytics", "Experimentation Platform", "Activation Workflows"],
    metrics: [
      { label: "Activation targeting performance lift", value: "+15%" },
    ],
    context: "My product area covered how marketers built cohorts for downstream personalization — targeted email, push, and in-app campaigns. Segments were built manually using filters and SQL, which meant they were often stale, overly broad, and dependent on the marketer's technical skill. Conversion rates were inconsistent across campaigns as a result.",
    problem: "Targeting quality was a function of who built the segment. Advanced marketers built precise cohorts; less technical ones built blunt ones. The floor was too low and the ceiling too hard to reach consistently.",
    approach: [
      "Instead of building a smarter segmentation tool, we generated high-intent cohorts automatically. We clustered behavioral event data to surface natural user groups based on recency, frequency, engagement depth, and product interactions.",
      "Used an LLM to interpret and label those clusters, producing activation-ready cohorts with human-readable names like 'high intent trial users' or 'churn risk accounts'. The LLM handled interpretation; the clustering handled the actual grouping logic.",
      "Surfaced the generated cohorts directly inside the activation workflow so marketers could use them in one click, without needing to understand how they were built. Cohorts refreshed dynamically. Validated impact with controlled experiments comparing AI-generated cohorts against manually defined segments.",
    ],
    whatIShipped: [
      "Behavioral clustering pipeline grouping users by recency, frequency, engagement depth, and product interactions",
      "LLM labeling layer interpreting clusters into activation-ready cohort names and descriptions",
      "Cohort surface integrated directly into activation workflows with one-click use",
      "Dynamic cohort refresh so segments stayed current without manual maintenance",
      "A/B experiment framework validating AI cohorts against manually built segments",
    ],
    impact: [
      "AI-generated cohorts improved activation targeting performance by 15% compared to manually defined segments.",
      "Targeting quality became consistent and scalable — no longer dependent on how advanced a marketer was at building filters.",
      "Reduced the time marketers spent on segment creation, freeing them to focus on campaign strategy.",
    ],
    learnings: [
      "Automation works best when it raises the floor, not just the ceiling. The goal wasn't to replace expert marketers — it was to make every marketer perform like an expert. Consistent quality at scale was the metric that mattered.",
      "LLM labeling made the output usable. Clusters without labels are just numbers. The labeling step was what turned a data science artifact into a product feature marketers could actually trust and act on.",
      "Controlled experiments are non-negotiable for AI features. Self-reported improvement isn't enough — we needed a clean comparison against the baseline to prove the cohorts were actually better, not just different.",
    ],
    tradeoff: {
      decision: "Auto-generate cohorts vs. build AI-assisted tooling to help marketers build better segments themselves",
      rationale: "Assisted tooling would have preserved marketer control but still required expertise to use well. Auto-generation removed the skill dependency entirely and let us own the quality outcome.",
      tradeoff: "Some power users wanted more control over cluster parameters and labeling. We added an override path post-launch, but the default auto-generated cohorts drove the majority of usage and impact.",
    },
    metricDefinitions: [
      {
        term: "Activation targeting performance",
        definition: "Conversion rate of campaigns using the target cohort — measured as the percentage of targeted users who completed the defined activation event within the campaign window.",
      },
    ],
  },
];

// ── Side Project Detail Content ───────────────────────────────────────────────

export const sideProjectDetails: SideProjectDetail[] = [
  {
    slug: "alice-abm-prototype",
    title: "Alice ABM Prototype",
    oneliner:
      "Built an end-to-end account-based workflow prototype showing how 11x Alice could move from target accounts to pipeline.",
    type: "prototype",
    links: [
      {
        label: "Live demo",
        href: "https://alice-abm-prototype.vercel.app/",
        primary: true,
      },
    ],
    whatIBuilt:
      "A fully interactive prototype demonstrating how an AI SDR like 11x Alice could be redesigned for enterprise ABM — moving from single-lead outbound to coordinated account-level campaigns with measurable outcomes.",
    whyItMatters:
      "Most AI SDR tools are built around high-volume, single-lead outbound. Enterprise buyers don't buy that way. They buy through committees. This prototype shows what an ABM-native workflow looks like — account selection, committee mapping, coordinated sequencing, and human-in-the-loop review at every high-risk step.",
    howItWorks: [
      "Account selection: upload a target list, apply ICP filters, and score accounts by fit and intent signal",
      "Committee mapping: discover key personas per account and assign coverage responsibilities",
      "Sequence design: build multi-persona, multi-channel campaigns with branching logic and review gates",
      "Execution: run campaigns with guardrails, flag anomalies, and log all activity at the account level",
      "Measurement: track meetings booked, opportunities created, and pipeline by cohort vs control",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    improvements: [
      "Reporting layer: meetings, opportunities, pipeline, and multi-touch attribution",
      "Integration with Salesforce for two-way sync on account and contact data",
      "Enrichment layer (Clay, Apollo) for real-time contact and signal data",
      "Sequence tool integrations (Outreach, Salesloft) for execution",
    ],
    productRationale:
      "ABM isn't a channel — it's a coordination problem. The gap in most AI SDR tools is that they're built to maximise outbound volume, not account-level precision. Enterprise deals involve 5–10 decision-makers, long sales cycles, and brand risk from bad outreach. A truly enterprise-grade AI SDR needs to think in accounts, not contacts — and that requires fundamentally different workflows: committee coverage, coordinated sequencing, and measurement that tracks pipeline, not just replies.",
    demonstrates: [
      "Account selection and prioritisation based on ICP and intent signals",
      "Buying committee discovery, persona mapping, and account coverage",
      "Coordinated multi-persona messaging and campaign execution with review points",
    ],
    trustAndControl: [
      "Guardrails for deliverability and brand risk",
      "Human-in-the-loop approval for high-risk sends and account-level changes",
      "Measurement design: lift vs control for meetings, opportunities, and pipeline",
    ],
    nextSteps: [
      "Reporting layer for meetings, opportunities, pipeline, and attribution",
      "Integration points with Salesforce, enrichment, and sequence tools",
    ],
  },
  {
    slug: "cosmo-labs",
    title: "Cosmo Labs",
    oneliner: "Building voice AI agent demos for real business workflows.",
    type: "demo",
    links: [
      {
        label: "Live demo",
        href: "https://cosmo-voice-spark.lovable.app/",
        primary: true,
      },
    ],
    callout:
      "Built with Retell AI voice agents to prototype and showcase agent behaviour in production-realistic scenarios.",
    whatIBuilt:
      "A set of voice AI agent demos built using Retell AI, designed to showcase what production-grade voice agents look and sound like in real business contexts — booking, lead qualification, and support triage.",
    whyItMatters:
      "Voice AI is moving fast but most demos are shallow — they show a single exchange in perfect conditions. These demos are designed to handle real edge cases: ambiguous answers, pushback, escalation requests, and fallback paths. The goal is to help buyers understand what they're actually getting before they commit.",
    howItWorks: [
      "Each agent is configured in Retell AI with a structured script, intent detection, and escalation logic",
      "Agents handle common edge cases: unclear input, off-script questions, escalation to a human",
      "Call recordings and transcripts are reviewed to identify failure patterns and improve scripts",
      "Demo scenarios are designed around real SMB use cases, not synthetic examples",
    ],
    stack: ["Retell AI", "Next.js", "TypeScript", "Vercel"],
    improvements: [
      "Add call analytics to track drop-off points and intent signals per call",
      "Test with real SMB customers to validate the booking and triage flows against actual usage",
      "Add a CRM integration to log call outcomes and follow-up tasks automatically",
    ],
    demoScenarios: [
      {
        label: "Booking & scheduling",
        description:
          "Agent handles inbound appointment requests and calendar coordination.",
      },
      {
        label: "Lead qualification",
        description:
          "Agent qualifies inbound leads on key criteria and routes to the right rep.",
      },
      {
        label: "Support triage",
        description:
          "Agent handles tier-1 queries and escalates with full context attached.",
      },
    ],
  },
  {
    slug: "retro-space-shooter",
    title: "Retro Space Shooter",
    oneliner:
      "Recreated a retro space shooter and shipped it end-to-end using Cursor, Claude, GitHub, and Vercel.",
    type: "game",
    links: [
      {
        label: "Play live",
        href: "https://space-shooter-game-nu.vercel.app/",
        primary: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/brandonckhoo/space-shooter-game",
        primary: false,
      },
    ],
    whatIBuilt:
      "A browser-based retro space shooter built with JavaScript and pixel art assets. Ship, shoot, survive — classic arcade mechanics, shipped end-to-end using AI-assisted development tools.",
    whyItMatters:
      "This project was about proving a workflow: can a non-engineer ship a functioning game from scratch using Claude and Cursor? The answer is yes — with the right prompting, fast iteration, and willingness to debug. The game is the output; the process is the point.",
    howItWorks: [
      "Canvas-based rendering loop with requestAnimationFrame for smooth 60fps gameplay",
      "Sprite sheets and pixel art assets sourced from open-licensed itch.io packs",
      "Enemy waves with increasing difficulty, power-ups, and a multi-phase boss battle",
      "Score tracking with local high score persistence via localStorage",
      "Deployed as a static site on Vercel with a GitHub Actions CI pipeline",
    ],
    stack: ["JavaScript", "HTML Canvas", "CSS", "GitHub Actions", "Vercel"],
    improvements: [
      "Add online leaderboard with edge function backend",
      "Mobile touch controls for phone play",
      "Sound effects and background music with Web Audio API",
      "More enemy types and a second boss battle phase",
    ],
    steps: [
      "Set up the project in Cursor with a clean repo structure",
      "Found free pixel art assets from itch.io",
      "Drafted the spec and game loop logic with Claude",
      "Built the MVP: movement, shooting, enemies, and scoring",
      "Debugged the boss battle — collision detection and phase transitions",
      "Shipped with GitHub Actions and deployed to Vercel",
    ],
  },
];

// ── Writing Post Detail Content ───────────────────────────────────────────────

export const writingPostDetails: WritingPostDetail[] = [
  {
    slug: "shipping-voice-ai-agents-without-breaking-trust",
    title: "Shipping voice AI agents without breaking trust",
    date: "January 2025",
    excerpt:
      "The hardest part of deploying voice agents isn't the tech. It's knowing when to hand off.",
    category: "AI",
    readingTime: "5 min read",
    toc: [
      { label: "The trust problem", anchor: "trust-problem" },
      { label: "Where agents break down", anchor: "where-agents-break" },
      { label: "Designing for handoff", anchor: "designing-for-handoff" },
      { label: "What good looks like", anchor: "what-good-looks-like" },
    ],
    intro:
      "Voice AI agents are getting good fast. But fast isn't the same as trustworthy. The companies shipping voice agents that customers actually like aren't the ones with the most sophisticated models — they're the ones who've thought carefully about the moments where the agent should stop.",
    sections: [
      {
        heading: "The trust problem",
        anchor: "trust-problem",
        paragraphs: [
          "Trust in voice AI breaks the same way trust in humans breaks: slowly, then all at once. A customer might tolerate a clunky response or an awkward pause. But one moment where the agent confidently gets it wrong — misunderstands a name, books the wrong thing, misses an obvious cue — and the relationship is damaged.",
          "The challenge is that voice adds an emotional layer that chat doesn't have. A bad chatbot reply feels like a broken form. A bad voice agent response feels like being ignored. The bar for perceived competence is higher, and the consequences of failure are more visceral.",
        ],
      },
      {
        heading: "Where agents break down",
        anchor: "where-agents-break",
        paragraphs: [
          "In my experience building and testing voice demos, agents tend to fail in predictable places: edge-case inputs, ambiguous intent, and escalation requests. These aren't hard engineering problems — they're design problems. The agent's script didn't account for them.",
          "The most common failure mode is over-confidence. An agent that says 'Got it, I've booked that for you' when it hasn't understood the request correctly is worse than an agent that says 'I'm not sure I caught that — can you confirm?' The first erodes trust. The second builds it.",
        ],
      },
      {
        heading: "Designing for handoff",
        anchor: "designing-for-handoff",
        paragraphs: [
          "The best voice agent interactions I've seen share one property: they know when to stop. Not because the agent is limited, but because the designer made a deliberate choice about where automation ends and human judgment begins.",
          "Handoff design should be treated as a first-class product feature. That means defining: what triggers a handoff (ambiguity threshold, sentiment signal, explicit request), how the handoff is communicated to the caller, and what context is passed to the human who picks up.",
          "A warm handoff — where the agent summarises the call and hands off to a named person — converts a potential failure into a positive experience. The caller feels heard, not abandoned.",
        ],
      },
      {
        heading: "What good looks like",
        anchor: "what-good-looks-like",
        paragraphs: [
          "Good voice AI deployment has three properties: it does what it claims to do reliably, it fails gracefully when it can't, and it doesn't try to be more than it is. That last one is the hardest.",
          "The temptation is to make the agent seem more capable than it is — to paper over the gaps and hope customers don't notice. They notice. Design for honesty, and you'll build something people trust.",
        ],
      },
    ],
    closing:
      "If you're building voice agents, start with the failure modes. What happens when the caller asks something you didn't script? What happens when they're frustrated? Design those moments first, and the rest of the product will be better for it.",
  },
  {
    slug: "integration-factories-scaling-ecosystems",
    title: "Integration factories: scaling ecosystems without burning engineering",
    date: "November 2024",
    excerpt:
      "How a schema-first, partner-led model let us ship 3x more integrations with the same team.",
    category: "Platform",
    readingTime: "6 min read",
    toc: [
      { label: "The integration bottleneck", anchor: "integration-bottleneck" },
      { label: "What a factory model looks like", anchor: "factory-model" },
      { label: "Schema design is strategy", anchor: "schema-strategy" },
      { label: "What we got wrong", anchor: "what-we-got-wrong" },
    ],
    intro:
      "Every platform team reaches the same inflection point: the integrations backlog is 80 tickets deep, engineering is at capacity, and sales is losing deals because the connector a customer needs doesn't exist. The instinct is to hire. The better answer is to redesign the system.",
    sections: [
      {
        heading: "The integration bottleneck",
        anchor: "integration-bottleneck",
        paragraphs: [
          "When I joined the integrations team at Amplitude, we were building every integration from scratch. Each one was bespoke: custom auth handling, custom data mapping logic, custom error handling. An engineer would spend 3–6 weeks on each connector, and we still couldn't keep up with demand.",
          "The root cause wasn't velocity — it was architecture. There was no shared foundation. Every integration was its own island. And because there was no standard, there was no path to partner self-service.",
        ],
      },
      {
        heading: "What a factory model looks like",
        anchor: "factory-model",
        paragraphs: [
          "A factory model for integrations has three components: a shared schema that defines how integrations are described, a shared library that implements the common parts (auth, sync, retry logic), and a self-serve path that lets partners build and certify their own integrations using that foundation.",
          "The schema is the most important piece. Get it right, and everything downstream becomes easier. Get it wrong, and you've created a new form of tech debt that's harder to escape than the original problem.",
          "We spent six weeks on schema design before writing a single integration. That felt slow at the time. In hindsight, it was the best investment we made.",
        ],
      },
      {
        heading: "Schema design is strategy",
        anchor: "schema-strategy",
        paragraphs: [
          "A well-designed integration schema isn't just a technical spec — it's a product decision. It defines what integrations can and can't do. It sets the ceiling on partner flexibility and the floor on integration quality. It determines how easy it is for partners to onboard, and how easy it is for customers to configure.",
          "We used JSON Schema for our integration definitions. This gave us validation tooling out of the box, made integration specs human-readable, and gave partners a clear contract to build against. The spec described data mappings, auth requirements, sync frequency, and error handling expectations.",
        ],
      },
      {
        heading: "What we got wrong",
        anchor: "what-we-got-wrong",
        paragraphs: [
          "We underestimated the partner onboarding problem. Building the factory was hard; getting partners to use it was harder. Partners had their own timelines, their own engineering priorities, and their own ideas about what a good integration looked like. We needed a partner success function — not just documentation.",
          "We also underestimated how long it would take for the factory benefits to compound. The first ten integrations were still slow. The cost reduction only became visible after we'd built a critical mass of connectors on the shared foundation. Leadership patience was required.",
        ],
      },
    ],
    closing:
      "If you're scaling an integration ecosystem, the question isn't how to hire faster. It's how to design a system where you don't have to. Schema-first, partner-led, with a clear self-serve path — that's the model that scales.",
  },
  {
    slug: "proving-roi-autonomous-workflows",
    title: "Proving ROI for autonomous workflows",
    date: "September 2024",
    excerpt:
      "Executives want proof before they commit. Here's how to build the measurement layer first.",
    category: "Product",
    readingTime: "5 min read",
    toc: [
      { label: "The proof problem", anchor: "proof-problem" },
      { label: "Why measurement design comes first", anchor: "measurement-first" },
      { label: "The lift vs control framework", anchor: "lift-vs-control" },
      { label: "Selling the framework", anchor: "selling-the-framework" },
    ],
    intro:
      "The hardest sale in enterprise AI isn't getting a pilot approved. It's getting the pilot results trusted. Executives have seen too many promising pilots that didn't survive contact with the P&L. The way to change that is to agree on measurement before you start.",
    sections: [
      {
        heading: "The proof problem",
        anchor: "proof-problem",
        paragraphs: [
          "Autonomous workflows are hard to measure because their outputs are often intangible or difficult to attribute. Did the AI SDR book that meeting, or would the rep have booked it anyway? Did the voice agent save support costs, or would those calls have been handled efficiently regardless?",
          "When measurement is ambiguous, attribution fights happen. Procurement teams discount outcomes. Champions can't defend results. Renewals stall. The ROI conversation that should be easy becomes a negotiation over methodology.",
        ],
      },
      {
        heading: "Why measurement design comes first",
        anchor: "measurement-first",
        paragraphs: [
          "The instinct is to ship the workflow, see what happens, and then figure out how to measure it. This is backwards. If you don't agree on measurement upfront, you'll spend the first three months of a deployment arguing about what the numbers mean instead of improving the product.",
          "Measurement design should happen before a pilot starts. That means: defining the outcomes you're trying to move, identifying a comparison baseline, agreeing on attribution methodology, and locking in the metrics with the economic buyer before go-live.",
        ],
      },
      {
        heading: "The lift vs control framework",
        anchor: "lift-vs-control",
        paragraphs: [
          "The cleanest way to measure autonomous workflow impact is lift vs. control: run the workflow on a treatment group, hold a matched control group, measure the delta. This is the same framework used in product experimentation, and it works for the same reasons — it controls for external variables and produces a defensible number.",
          "For an AI SDR pilot, this might look like: treatment group gets Alice-managed sequences, control group gets rep-managed sequences, measure meetings booked, opportunities created, and pipeline generated over 90 days. The lift is the case for renewal.",
          "Not every deployment can run a clean control. In those cases, pre/post measurement with historical baseline works — but it requires more negotiation on what counts as the right baseline period.",
        ],
      },
      {
        heading: "Selling the framework",
        anchor: "selling-the-framework",
        paragraphs: [
          "The measurement framework itself is a sales tool. Walking a CFO or COO through a pre-agreed lift vs. control design before the pilot starts does two things: it signals that you've thought rigorously about outcomes, and it makes the eventual ROI conversation much easier to have.",
          "Buyers who have agreed to measurement upfront are more likely to trust results, more likely to expand, and more likely to become internal champions. The measurement conversation is a trust-building exercise as much as it's a methodology question.",
        ],
      },
    ],
    closing:
      "Before you ship the workflow, ship the measurement plan. Agree on it with the economic buyer. Document it. And then run the pilot against it. The number you produce at the end will be worth far more than one that was assembled after the fact.",
  },
];
