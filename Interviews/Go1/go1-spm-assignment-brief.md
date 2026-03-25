# Go1 — Senior Product Manager Assignment Brief

**Role:** Senior Product Manager, Content Intelligence & Discovery
**Interview Panel:** Kristina Ryan (SVP Product), Jasneet Kaur (Director of Engineering)
**Time budget:** 4 hours
**Format:** Google Docs or Slides

---

## Context

Go1 is shifting from a content library to an intelligent Employee Development Suite. This SPM role owns three tightly connected domains:

- **Content intelligence** — understanding what content is, how good it is, and what context it belongs to
- **Discovery and search** — getting the right content to the right person
- **Recommendations** — proactively surfacing learning at the right moment

Go1's strategy is organisation-led learning: every learner compliant, every learner skilled for their role, delivered at the right moment without them having to ask for it. That makes this fundamentally a recommendations problem, not a search problem.

The system doesn't yet know enough about the learner, their role, or their organisation's goals to deliver the right learning proactively. The burden of relevance sits with the learner. It should sit with the system.

Admins have the same problem from the other direction. Without organisational intelligence, they resort to watching courses end-to-end just to decide if they're suitable for their team. The curation burden is high, the stakes feel personal — a poor recommendation reflects on the admin, not the tool — and over time that erodes confidence in Go1 as something worth investing in.

You are inheriting solid foundations in some parts. What you are not inheriting is the intelligence layer that makes proactive recommendations possible. Go1 has made strides but has not materially moved the needle on metadata enrichment or behavioural signals.

---

## Situation: What you've discovered in week one

- Admins are spending significant time manually curating content. Without organisational intelligence signals, they can't confidently match the right learning to the right people. When recommendations are missed, it reflects on them personally. Over time, this erodes confidence in Go1 as a tool worth their effort and creates content overwhelm — the top reason for churn.
- Learner utilisation is low. The system has no reliable way to deliver learning that feels relevant to a specific person's role, compliance obligations, or development needs — so it doesn't. Admins curate content for learners but aren't close enough to know their learning needs. Learners are left to find things themselves and mostly don't.
- Search is semantic and keyword-based with basic metadata filtering — relevance ranking logic is rudimentary and lacks personalization.
- The recommendations model is trained on enrolment data, not engagement quality. It lacks signals beyond standard content metadata.
- Metadata enrichment and behavioural signals are underdeveloped — content intelligence exists in pockets but has not been systematically built.
- There is no systematic content intelligence layer — quality scoring, freshness signals, and contextual tagging are largely manual or absent.
- Search and recommendations span agentic experiences, APIs, and platform experiences.

---

## Deliverable 1: Written Strategy (max 4 pages)

Provide a 12-month Content Intelligence & Discovery strategy. Include:

1. **Your diagnosis** — why is the system failing to deliver the right learning to the right learner at the right time, and what needs to be true across your three domains to fix that?
2. **How you'd approach inheriting the foundations** — what you'd validate, what you'd accept, and what you might challenge
3. **How you'd sequence near-term improvements** to recommendation quality alongside building the content intelligence layer — without treating intelligence as a blocker to shipping
4. **Your highest-risk assumption** and how you'd validate it in the first 60 days
5. **A sequenced roadmap** with clear rationale — including what you'd explicitly deprioritize
6. **How you'd measure success** — specific metrics, not categories. What does "the system is now delivering the right learning" look like in the data?

---

## Deliverable 2: Prototype or Wireframe (any fidelity)

Create a wireframe or prototype of **one discovery experience** that represents your highest-value bet. It does not need to be polished; it needs to be thoughtful. Show us how the intelligence layer makes decisions visible, explainable, and improvable.

---

## Evaluation criteria

- Problem framing before solutioning
- Clarity of trade-off thinking
- AI fluency — how you design responsibly with probabilistic systems
- Systems thinking — does your strategy connect to Go1's broader category shift?
- Commercial grounding — does success connect to business outcomes?
- Communication quality — can we trust this person to set direction for a cross-functional team?

---

## Notes

- Share document at least 24 hours before the interview
- No expectation of perfect answers — they're evaluating how you think, what you prioritise, and the calls you make under constraint

**My response:** See `go1-strategy.md` for the written strategy and `go1-wireframe.md` (if exists) for the prototype.
