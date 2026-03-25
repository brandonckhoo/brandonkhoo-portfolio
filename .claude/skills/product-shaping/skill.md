---
name: product-shaping
version: 1.0.0
description: |
  Product shaping workflow — from problem framing through research and spec.
  Use when: (1) scoping a new product investment, (2) writing a spec for a feature,
  (3) researching competitors for a product decision, (4) gathering customer evidence,
  (5) auditing your codebase for existing infrastructure.
  Triggers: "shape", "spec", "new feature", "scope this", "research competitors".
author: Brandon Khoo
allowed-tools:
  - Read
  - Glob
  - Grep
  - Write
  - Edit
  - Bash
  - Agent
  - WebFetch
  - WebSearch
  - AskUserQuestion
---

# Product Shaping

Three-phase workflow for turning a product idea into a validated spec with a clear validation plan.

**Output:** `spec-draft.md` (local) + validation plan (what to build/test next to increase confidence)

---

## Claude's Role

You are a thinking partner, not a scribe. Throughout every phase:

- **Push for simplicity.** If a design takes more than 2 sentences to explain, it's too complex. Ask "do we actually need this?"
- **Surface trade-offs.** Don't present options neutrally — have a recommendation and defend it.
- **Question scope.** Every requirement should earn its place. If you can't point to evidence, push back.
- **Keep things tight.** No artifacts "for completeness." Every sentence, every section, every file earns its spot.
- **Use clear, declarative writing** when writing spec content. Lead with the punch, be declarative, kill LLM tells.

---

## Phase 1: Frame + Scope Research

*Goal: define the problem statement and decide what research to do.*

### Step 1 — Define the problem

Output this immediately when invoked:

```
PRODUCT SHAPING — Phase 1: Frame

Let's define the problem before doing any research. Answer what you can — I'll push on gaps.

1. What's the customer job to be done? (Not a feature description — what is the customer trying to accomplish?)
2. Why now? (What changed that makes this worth investing in?)
3. What does success look like? (If we ship this perfectly, what's different in 6 months?)
4. Who's the first customer? (Design partners, segments, deal types.)
5. What's the appetite? (Big bet or small bet? This constrains the shape.)
6. What's the business impact? (Revenue, deal velocity, attach rate — and how fast?)
7. What does this unlock beyond the feature? (GTM leverage — website, competitive, new segment?)
```

Wait for input, then push hard:
- **"Is this unique product thinking?"** Is this replicating what exists or pushing what's possible?
- **"Why are we building this?"** Don't accept at face value. Make the PM defend the problem.

### Step 2 — Scope the research

Once the problem is defined, propose a research plan. Tell the PM which streams are available and which require tools you don't have.

**Always available (web access only):**
- Competitive research (how do other platforms solve this job?)
- External API/docs review (relevant third-party API documentation)
- Domain learning (unfamiliar industry or concept — research it before designing)

**Available only if connected to internal tools (MCPs, codebase access, etc.). If not connected, skip and ask PM to paste relevant context manually:**
- Codebase exploration (what does the product already have?)
- Internal knowledge base lookup (docs, wiki, prior specs on this domain)
- Customer evidence (call transcripts, CRM notes, support tickets)
- Meeting transcript search (internal and customer calls for prior decisions)

**Also recommend streams you think would be valuable** based on the framing. Be specific:
- "This touches payments — I'd recommend reviewing Stripe/Marqeta docs for API patterns"
- "Construction domain — I'd suggest domain learning on lien waiver workflows before designing"
- "There's likely an existing API for this — I should audit the codebase to see what's reusable"

### Step 3 — Agree on search keywords

Before launching research, discuss keywords with the PM. The same problem has multiple terms — customers, sales, and engineers all describe it differently. Build a keyword list; ask PM to refine. These keywords drive transcript searches, CRM searches, and codebase exploration.

---

## Phase 2: Research

### Execution

Write each research stream to standalone markdown files in a `research/` subfolder. Future sessions reference structured files instead of re-doing the work.

**Only run streams that are available.** If a stream requires internal tool access you don't have, skip it. If the PM pastes in raw context as a substitute, incorporate it into the relevant file.

| Stream | Output file | Requires |
|--------|-------------|----------|
| Competitors | `research/{platform-name}.md` per platform + `research/best-practices.md` synthesis | Web access |
| Call transcripts | `research/call-evidence.md` — attributed quotes, call links, keyword hits | Call recording tool |
| CRM notes | `research/crm-evidence.md` — deal sizes, stage breakdown, attributed notes | CRM tool |
| Support tickets | `research/support-evidence.md` — ticket themes, volumes, customer pain patterns | Support tool |
| Meeting transcripts | `research/transcript-evidence.md` — closed questions, prior decisions with sources | Meeting notes tool |
| System audit | `research/system-audit.md` — existing code, data models, what's reusable | Codebase access |

#### Competitors

How do others solve this job to be done?

- Launch one agent per platform in parallel if your tool supports background agents
- Each agent: 3–5 web searches + 2–4 page fetches
- Give each agent the problem framing from Phase 1 so they search with the right lens
- Each agent writes `research/{platform-name}.md`
- After all complete, synthesize into `research/best-practices.md`: patterns, anti-patterns, how they handle open questions

**Gotcha:** Review sites (G2, GetApp, Capterra) often block automated fetching. Use search result summaries as fallback.

#### Customer evidence

Search call transcripts and CRM notes using the agreed keywords from Phase 1. For each piece of evidence, attribute it: who said it, what deal stage, how large the account. Quantity matters — "12 enterprise prospects asked for this in Q4" is stronger than "customers want this."

If tools aren't connected, ask the PM to paste in relevant customer quotes, support ticket summaries, or sales notes. Organize whatever is provided into the appropriate `research/` file.

#### Meeting transcripts

Search internal meeting recordings and notes for prior decisions on this topic. Flag anything already decided so you don't re-litigate settled questions.

If not connected, ask the PM: "Are there any prior decisions or context from past meetings I should know about? I want to avoid re-opening things that are already settled."

#### System audit

If you have codebase access, investigate in parallel:
- Existing user flows this feature touches
- Data models, API surfaces, DB schemas
- Integration points (ERPs, partner systems)
- What can be reused vs. what's net new
- Internal docs, prior specs, prior art

Split into multiple parallel agents by area if supported (e.g., one for data models, one for existing APIs, one for integration points).

If codebase access isn't available, ask the PM to describe the current system architecture, existing APIs, and what they think is reusable. Document answers in `research/system-audit.md`.

### After research completes

Present a synthesis — don't dump raw findings. Distill into:
1. Key patterns from competitors (what the best platforms do, what to avoid)
2. Customer signal strength (how many deals, what stage, attributed quotes)
3. What already exists (what's reusable, what's missing)
4. Initial list of open questions the research raised

If streams were skipped, flag what's missing and recommend the PM gather that context before finalizing the spec.

---

## Phase 3: Shape

*Goal: converge on a design through conversation.*
*Output: `spec-draft.md` + validation plan.*

### How shaping works

This is conversational, not template-driven. The shape emerges from iterating with the PM on the research. Claude's job:

1. **Present research synthesis** as a starting point
2. **Ask pointed questions** that force design decisions: "Should this be a new API or extend the existing one?" "Do you need X or is that scope creep?"
3. **Surface competitor patterns** when relevant: "Stripe does X, Unit does Y — which fits our constraints?"
4. **Track requirements** using R-notation (R0, R1, R2...). Ground each in evidence. Challenge any that can't be grounded.
5. **Mine transcripts for closed questions** — things already decided in internal or customer calls. Don't re-litigate settled decisions.
6. **Track open questions** — things that need customer input or internal alignment.

### When multiple shapes emerge

Sometimes the conversation produces 2–3 distinct approaches. When that happens, capture them with a lightweight comparison table: trade-offs, complexity, which customer segments each serves best.

### Spec format

Write to `spec-draft.md` in the project folder. Keep it tight — 20 lines max for context. Readable in 2 minutes.

```markdown
# [Feature Name]

## Context
[High-level context. ≤20 lines. Problem statement, why now, who it's for.]

## Principles
[Design principles and key requirements that constrain the solution. Non-negotiable truths the design must respect.]

## Design
[The proposed design. High-level architecture: endpoints, happy path, flow diagram if helpful. "What," not "how."]

## Alternatives
[Other shapes considered. Why they were rejected.]

## Open Questions
[What we still need to figure out. For each: why it matters.]

## Closed Questions
[Decisions already made, with source (call transcript, internal alignment, etc.)]
```

---

## When to Skip Phases

- Strong customer evidence + competitive context already in hand → skip to Phase 3
- Problem is understood but need to audit the codebase → run only the system audit from Phase 2, then shape
- Small bet or quality-of-life fix → compress all three phases into a single conversation

---

## What Comes Next

| Next step | When |
|-----------|------|
| Build a prototype | Validate the shape with customers before committing engineering resources |
| Write a pitch deck | Package for stakeholder buy-in or leadership review |
| Deep domain learning | Unfamiliar industry or concept that needs more research before building |
| Start building | Shape is validated, open questions are resolved, ready to ship |
