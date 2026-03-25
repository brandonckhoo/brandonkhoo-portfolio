# Go1 SPM Case Study: Content Intelligence & Discovery Strategy

**Role:** Senior Product Manager, Content Intelligence
**Company:** Go1
**Interview Panel:** Kristina Ryan (SVP Product), Jasneet Kaur (Director of Engineering)
**Assignment:** 12-month Content Intelligence & Discovery strategy + prototype

---

## Context

Go1 is shifting from a content library to an intelligent Employee Development Suite. The SPM role owns three tightly connected domains:

- **Content Intelligence:** understanding what content is, how good it is, and what context it belongs to
- **Discovery and Search:** getting the right content to the right person
- **Recommendations:** proactively surfacing learning at the right moment

Go1's strategy is organisation-led learning: every learner compliant, every learner skilled for their role, delivered at the right moment without them having to ask for it.

**Known gaps inherited:**
- Admins spending significant time manually curating content (top reason for churn)
- Learner utilisation is low
- Search is semantic and keyword-based but lacks personalisation
- Recommendations model trained on enrolment data, not engagement quality
- Metadata enrichment and behavioural signals are underdeveloped
- No systematic content intelligence layer

**Go1's confirmed tech stack:**
- Elasticsearch on Azure (9.8M learning objects, 500K search requests/hour at peak)
- 7,000+ skill taxonomy, 98% library coverage, up to 7 skills tagged per course
- Vector search announced, not yet fully deployed
- Go1 AI launched Feb 2024: semantic search, LLM chat, AI playlist generation
- Morgan AI agent (Jan 2026): operates inside Slack and Teams, currently in alpha
- 100+ HRIS integrations (Workday, BambooHR, SAP SuccessFactors, ADP)

---

## Deliverable 1: Vision, Strategy and Roadmap

### The Category Shift

The L&D technology market has gone through three distinct waves.

**Wave 1 — The LMS (1990s–2010s):** Learning Management Systems were built to solve an administration problem, not a learning problem. HR needed to assign mandatory training, record who completed it, and produce a compliance report. The learner experience was irrelevant; the audit trail was the product. Cornerstone, SAP SuccessFactors, and legacy Moodle deployments define this wave. The metric was completion, not growth.

**Wave 2 — The content library and LXP (2010s–2020s):** The rise of self-directed learning and the "Netflix for learning" narrative. Platforms like Go1, Coursera for Business, and LinkedIn Learning gave organisations access to vast catalogues of third-party content. The bet was that if you gave employees enough content and a decent search box, they would develop themselves. Go1 was built in this wave: 130,000+ courses from 250+ providers, sitting inside or alongside an existing LMS. Wave 2 solved access. It did not solve relevance. Access without relevance creates overwhelm, not growth — and content overwhelm is Go1's top churn driver today.

**Wave 3 — The intelligent Employee Development Suite (now):** The defining feature of Wave 3 is not content breadth. It is intelligence. The platform knows who the learner is, what their role requires, what their organisation is trying to achieve, and delivers the right learning at the right moment without anyone having to ask for it. LinkedIn Learning, Degreed, and Cornerstone are all competing on this axis. Go1's bet is that owning the content intelligence layer — the deepest and most accurate understanding of what content is and who it's for — gives them a defensible position in Wave 3 that pure recommendation platforms cannot replicate, because they don't own the content relationship.

Go1 is mid-transition from Wave 2 to Wave 3. The infrastructure exists. The intelligence layer does not — yet. That is the gap this strategy closes.

Morgan is the most visible signal of this shift. A learning agent that operates inside Slack and Teams, delivering nudges, assignments, and reminders without requiring a learner to open Go1 — that is not a feature. It is a category statement. Go1 is not trying to be a better destination. It is trying to be invisible infrastructure: learning that happens in the flow of work, owned by L&D, invisible to the learner.

That shift has three implications for this role specifically. First, content intelligence is not a background capability that quietly improves recommendations. It is the core differentiator Go1 is betting the category transition on. If the metadata layer is wrong, Morgan delivers irrelevant nudges in Slack. That is worse than no nudge. It accelerates churn. Second, search is the bridge, not the destination. In Wave 3, intent-driven search still exists for specific queries, but it is no longer the primary discovery surface. The primary surface is the proactive recommendation, the Morgan nudge, the homepage rail. Search needs to be personalised enough to serve those intent moments well, not rebuilt as the central product. Third, recommendations are the category-defining capability, and they cannot be credible until content intelligence is trustworthy. The sequencing of this 12-month strategy is designed around that dependency — not by treating intelligence as a gate, but by building both in parallel with a clear handoff point.

**The commercial logic:** Wave 3 platforms command higher ACVs, higher retention, and stronger renewal conversations because the platform becomes organisational infrastructure rather than an optional content subscription. Go1's churn problem — content overwhelm, admin burnout, low learner utilisation — is a Wave 2 churn pattern. Solving it requires completing the Wave 3 transition, not optimising the Wave 2 experience.

---

### Diagnosis

Go1 has a cold-start problem on both sides of the recommendation match.

The system does not know enough about the learner: their role, skill gaps, compliance obligations, or development trajectory. And it does not know enough about the content: its actual quality, depth, role fit, or freshness. Without either input, the model optimises for what it can measure, which is enrolments. Enrolments measure intent, not outcomes. That is the wrong training signal.

The result is structural, not incidental. Learners receive generic suggestions and ignore them. Admins compensate by manually reviewing courses end to end before assigning them, absorbing a curation burden the platform should own. When those recommendations land poorly, the failure reflects on the admin, not the tool. Over time, that erodes confidence in Go1. Content overwhelm is not a UX problem. It is a trust collapse, and it is driving churn.

The three domains are a pipeline, not a portfolio. Content intelligence feeds search ranking. Search ranking generates behavioural signals. Behavioural signals train better recommendations. The current system treats them as independent surfaces. That is why improvements in one have not moved the needle on the others.

**What needs to be true across each domain:**

**Content Intelligence:** Every piece of content needs a machine-readable representation that Go1 owns, covering skills, role relevance, quality score, and freshness. This cannot come from providers. Partners have a structural incentive to over-tag broadly because wide tags maximise content exposure and therefore revenue. Provider metadata is not a source of truth. Importantly, Go1 already has the foundation to fix this: a 7,000-skill proprietary taxonomy with 98% library coverage. The task is not building from scratch. It is auditing and correcting provider-supplied tags using Go1's own taxonomy as ground truth, with AI enrichment running against course descriptions and learning outcomes.

The enrichment pipeline runs in two tiers by cost and accuracy need. The top 5,000 most-accessed content items — the ones that drive the majority of recommendations and admin assignments — are processed with a frontier reasoning model (Claude Sonnet or GPT-4o class) using structured JSON output against a defined rubric: skill tags from the 7,000 taxonomy, difficulty level, quality score, role relevance buckets, and a freshness flag. The remaining ~9.8M items are processed in batch with a smaller, cheaper model (Claude Haiku or GPT-4o mini) for taxonomy classification and basic signal generation. Batch API pricing on both Anthropic and OpenAI reduces cost by ~50%. Most content is static, so enrichment is a one-time cost plus delta updates on new ingestion. The model choice is not primarily a capability question — both tiers are capable enough. It is a cost-per-signal question at scale.

**Discovery and Search:** The semantic retrieval infrastructure is sound. What is missing is a personalisation layer on top, informed by role profile, org context, and prior behaviour, so the system ranks results for the person making the query, not the average query. Go1's HRIS integrations already surface employee role, department, manager, and compliance obligations. That data is the fastest available personalisation signal and it is largely unused today.

**Recommendations:** The model needs to shift from enrolment-based training signals to engagement quality signals. Go1 has a signal that Netflix and Spotify do not: assessment scores. A learner who completes a course and scores 90% on the assessment has genuinely learned. That is the primary engagement quality signal. Secondary signals include completion rate segmented by role, time to completion versus expected duration, and return behaviour after completion. The model also needs to distinguish voluntary completions from assigned completions. A compliance course completed because it was mandatory sends a different signal than one a learner chose and finished.

The recommendation architecture should follow the industry standard two-stage pipeline used by Netflix, LinkedIn Learning, and YouTube: a fast retrieval stage using content embeddings and learner role profile to pull candidate courses from 130,000, followed by a ranking stage that re-scores those candidates using engagement quality signals, compliance context, and org data. Go1 has the Elasticsearch and vector search infrastructure to support retrieval. What is missing is the ranking layer and the signals to train it.

**Where competitors have already moved:**

Degreed connects learning to career trajectory via a neural skill graph that derives relationships between skills from co-occurrence in content. Cornerstone integrates real-time labour market signals into recommendations. LinkedIn Learning uses the professional graph to seed cold-start recommendations before a learner opens their first course. Go1 has none of these signals today, but the HRIS integrations already in market provide the equivalent of a professional graph for enterprise learners. That is the fastest path to closing the cold-start gap.

---

### Inheriting the Foundations

Inheriting a product in transition is different from inheriting a broken product. Go1 is not broken. It has real infrastructure, a real taxonomy, and real integrations. What it does not have is a coherent intelligence layer connecting them. My job in the first 30 days is to be honest about what is a genuine asset, what is noise, and what is an assumption worth challenging — before I commit the team to building against it.

**What I would validate first:**

The most important thing to validate is not the code. It is the data. Specifically: HRIS integration completion rates and role field population quality across the customer base. Every near-term improvement I am proposing depends on knowing who the learner is. If role data is missing or inconsistently structured in more than 60% of accounts, the entire sequencing logic changes. I need that number in week two, not month three.

Beyond HRIS coverage: search query logs showing what learners search, click, and abandon — this reveals the gap between what the system thinks is relevant and what learners actually want. Metadata quality across the top 10,000 most accessed content, specifically whether provider-supplied tags match Go1's own taxonomy — not because coverage is low (it is 98%), but because accuracy is a separate question from coverage. Recommendation click-through and completion rates segmented by voluntary versus assigned enrolments — this is the baseline everything is measured against.

I would also want to speak to three to five admins in the first two weeks. Not to gather requirements. To understand what the curation burden actually feels like from their side, and whether the problem is time, confidence, or something else. Those are different problems with different solutions.

**What I would accept:**

The hybrid semantic and vector search infrastructure is not broken. It is unpersonalised. Rebuilding it would be a six-month detour from the actual problem. The 7,000-skill taxonomy with 98% library coverage is a genuine competitive asset. Most competitors building skills-based platforms are starting their taxonomy from scratch or licensing one. Go1 owns theirs. That matters. The provider ingestion pipeline, the HRIS integrations, the Elasticsearch and Azure infrastructure — these are not the problem. I would accept them and build on top.

I would also accept that Morgan is the right strategic direction even in alpha. The product bets that have the longest lead time to validate — embedded agentic delivery, org-led learning — are the ones worth making early. I would not deprioritise Morgan to focus on search. I would ask what Morgan needs from content intelligence and recommendations to become credible, and prioritise that.

**What I would challenge:**

Two assumptions specifically. The first is that metadata enrichment must precede better recommendations. It does not. Role data from HRIS integrations is already in the system and can power a meaningful first layer of personalisation immediately, with no enrichment required. Role-filtered recommendations are not the end state. They are the fastest path to demonstrating that personalisation works, generating labelled training data in the process, and building team confidence that the intelligence layer is worth building properly.

The second assumption is that enrolment data is a useful training signal for the recommendation model. It is not. Enrolments measure intent. They do not measure whether anyone learned anything. The recommendation model optimised on enrolments is a model that gets good at predicting clicks. Before investing further in model improvements, the target metric needs to change to completion quality — specifically, completion rate segmented by voluntary versus assigned enrolments, and assessment pass rate where available. Optimising the current model harder against enrolments would produce a better model of the wrong thing. That is the clearest technical debt in the system and it is not a rebuild. It is a retraining signal change.

---

### Sequencing: Near-Term Wins Without Waiting for Intelligence

The trap with a strategy like this is treating content intelligence as a prerequisite. It is not. The intelligence layer takes six months to build credibly. Learners and admins are experiencing the problem today. The sequencing challenge is: how do you ship meaningfully better recommendations now, using what exists, while the intelligence layer is being built underneath — and how do you ensure the two connect rather than diverge?

The answer is that near-term recommendation improvements should use the best available signal, not wait for the ideal signal. And they should be instrumented from day one so that the data they generate becomes an input to the intelligence layer, not a dead end.

**What we can ship before the intelligence layer is ready (days 30 to 90)**

The fastest available personalisation signal is not in the content metadata. It is in the HRIS integrations already live in Go1. Role, department, manager, and compliance obligations are already structured and connected. Use them. Introduce role-filtered recommendation rails: not ML, not probabilistic — deterministic. You are in Sales Operations, so here are the courses most completed by Sales Operations roles across the platform. This is not a sophisticated recommendation. It is a relevant one, and right now relevant is the gap.

From the moment these rails launch, every recommendation gets a "Why this was recommended" label. Every negative feedback interaction gets a reason selector — "Not relevant to my role", "Already know this", "Wrong level". This matters because it generates the labelled signal data that the intelligence layer will eventually be trained on. Near-term relevance work and foundational intelligence work are not separate efforts. The near-term work is seeding the foundational work.

**What we are building underneath (months 1 to 6)**

Running in parallel: an AI-powered metadata audit and enrichment pipeline against the full content library, using Go1's own 7,000-skill taxonomy as ground truth — not provider-supplied tags. This is a correction exercise, not a rebuild. Provider tags over-cover by design; the task is finding where they diverge from Go1's taxonomy and resolving it with AI enrichment against course descriptions and learning outcomes. Priority order: top 5,000 most-accessed content to 80% high-confidence coverage by day 90, then full library by month 6. Quality scoring and freshness signals surface to admins as context — not an opaque number, but an explainable signal ("Last updated 2019", "High completion rate in similar roles").

**Where they connect (months 4 to 9)**

By month 4, the near-term rails have been live for two to three months. We have labelled feedback data. We have enriched metadata on the top 5,000 content items. The HRIS assumption has been validated or the fallback has been activated. Now the two workstreams converge into a two-stage recommendation model: a retrieval stage using content and role embeddings to pull candidate courses, followed by a ranking stage that re-scores those candidates using engagement quality signals — assessment scores, voluntary completion rates, and the feedback data from the near-term rails. A/B tested against the deterministic baseline. The admin curation assistant ships in this window: AI-generated content suggestions matched to team role profiles, with confidence signals and one-click assignment, credible because the content quality layer is now stable enough to trust.

**Explicitly not doing:** Rebuilding search retrieval (the problem is ranking, not retrieval). Rebuilding the skills taxonomy (98% coverage exists; correction is faster than rebuild). Consumer-grade personalisation UI before model quality warrants it (surfacing intelligence the system cannot yet deliver destroys trust faster than a generic feed). Cross-platform behavioural signals until internal signals are reliable.

---

### Highest-Risk Assumption and 60-Day Validation

**The assumption:** That role-filtered recommendations materially improve completion rates — and that Go1 can map HRIS job titles to meaningful learning categories at the scale needed.

The HRIS data quality concern is a secondary risk, not the primary one. Workday, BambooHR, SAP SuccessFactors are systems of record — if a company has provisioned employees through them, role and department data exists and tends to be reliable. That is what these systems are for.

The harder problem is the translation layer. An HRIS job title like "Senior Associate, Commercial Banking" or "Operations Analyst II" does not map cleanly to Go1's learning taxonomy without significant classification work. Job titles are company-specific, inconsistently formatted, and often carry internal grade levels that mean nothing outside the org. Go1's 7,000-skill taxonomy is built around skills and content categories, not job titles. The gap between "what Workday knows about a person" and "what learning Go1 should surface for that person" is not a data quality problem. It is a mapping problem, and it is non-trivial at scale across thousands of enterprise customers with different job architectures.

The second risk is more fundamental: even with clean role mapping, people in the same role have heterogeneous learning needs. A Sales Operations Manager at a 50-person startup and a Sales Operations Manager at a global bank have the same title and radically different development priorities. If role-filtered rails produce the same popular compliance courses for everyone in a role, we have improved relevance marginally and called it personalisation. That destroys trust faster than a generic feed.

**Validation plan:**

Select 5 to 8 design partner accounts that span company size and sector. For each, map their top 20 job titles to Go1's skill taxonomy manually — this takes a day per account and tells us immediately how tractable the automated mapping problem is. Then run role-filtered recommendations against a matched control group for 30 days. The signal we are looking for is not just completion rate lift overall, but whether the lift is consistent across roles or concentrated in a handful of roles where mapping happens to be clean.

If mapping success rate is below 60% across account job title variants, the near-term bet shifts: instead of HRIS-derived role filtering, we use a lightweight role self-declaration at onboarding — one question, five to eight standardised role categories — as the primary personalisation signal. This is a simpler and less accurate input, but it is accurate enough to be directionally useful and it does not depend on HRIS integration depth or job title normalisation. The 30-day design partner experiment tells us which path to commit to before we build it at scale.

---

### Vision

Go1 becomes the intelligence layer that delivers the right learning to the right person at the right time — without anyone having to ask for it. Admins stop curating manually and start steering a system that already knows their team. Learners receive learning that feels relevant without opening a catalog. Every outcome feeds the next recommendation. The platform earns trust with every decision rather than eroding it.

### Strategy

Build the content intelligence and learner context layers that search, ranking, and Morgan all depend on — while shipping near-term recommendation improvements using signals that already exist. Nothing waits for everything. The two workstreams compound into a closed intelligence loop by month 12.

### Roadmap

| Bet | Description | Effort | Impact | Timeline |
|---|---|---|---|---|
| Foundations audit | Validate HRIS role data quality across the customer base, run search query log analysis, audit metadata accuracy on top 10K content, instrument recommendations with a baseline completion rate split by voluntary vs. assigned. Do not build until baselines exist. | Low | High | Days 1 to 30 |
| Role-based recommendation rails | Use HRIS role and department data to introduce deterministic role-filtered recommendation rails. Ship a "Why this was recommended" label on every surface. Add a negative feedback reason selector. Generates labelled training data from day one without waiting for the intelligence layer. | Low | High | Days 30 to 90 |
| Content intelligence pipeline | AI enrichment pipeline (Claude Sonnet 4.6 for quality and role relevance scoring on top 5K, Claude Haiku 4.5 for bulk classification across 9.8M items) corrects provider-supplied tags against Go1's 7,000-skill taxonomy. Quality scoring and freshness signals surfaced to admins as explainable context. | High | High | Months 1 to 6 |
| Learner profile service | Consolidate HRIS role data, compliance obligations, assignment history, and platform behaviour into a low-latency learner profile stored in Azure Redis Cache. This profile feeds every retrieval and ranking call. The data already exists — this wires it in. | Medium | High | Months 2 to 5 |
| Two-stage ranking model | Replace enrolment-based recommendations with a two-stage pipeline: Elasticsearch retrieval using role and content embeddings, followed by XGBoost ranking on engagement quality signals (assessment scores, voluntary completion rates, admin feedback from the rails). A/B tested against the deterministic baseline. | High | High | Months 4 to 8 |
| Admin curation assistant | AI-generated content shortlists matched to team role profiles with confidence signals, freshness flags, and one-click assignment. Credible only after enrichment is stable. Directly reduces the curation burden driving churn. Every admin action is a labelled training signal. | Medium | High | Months 6 to 9 |
| Close the loop | Voluntary vs. assigned signal separation fully live in the ranking model. Admin feedback from the curation assistant integrated into retraining. Recommendation quality surfaced as a reportable metric — making the intelligence layer visible in renewal conversations. | Medium | High | Months 9 to 12 |

**Explicitly deprioritised:** Search retrieval rebuild (the problem is ranking, not retrieval). Full taxonomy rebuild (98% coverage exists; correction is faster). External labour market signals (internal signals must be reliable first). Consumer-grade personalisation UI before model quality warrants it (surfacing intelligence the system cannot yet deliver destroys trust faster than a generic feed).

---

### How I Would Measure Success

The system is delivering the right learning when three things are true in the data simultaneously. Recommended content gets completed at a higher rate than content learners find on their own. Assessment scores on recommended content are higher than on self-discovered content, meaning the match is producing actual learning outcomes and not just clicks. And admin curation time drops while admin-assigned content has higher completion rates, meaning the platform is absorbing the work instead of the person.

If those three signals are moving together, the intelligence layer is working. If only one or two are moving, the system has a partial fix, not a real one.

| Metric | What it measures | Target |
|---|---|---|
| Role-matched completion rate | % of recommended content completed at 50%+ by role-filtered cohort vs. control | +20pp by month 6 |
| Assessment pass rate on recommended content | Quality of match: did the learner actually learn? | Baseline month 1, +15pp by month 9 |
| Recommendation acceptance rate | Click-through on surfaced recommendations, new baseline set month 1 | +35% by month 9 |
| Admin curation time | Hours per week on manual content review and assignment | -40% by month 9 |
| Content library penetration | Unique content accessed per learner per quarter | +25% by month 12 |
| Churn risk correlation | Accounts with role-based recommendations vs. control, tracked against renewal intent flag | -15% churn risk signal by month 9 |

---

---

## Deliverable 2: Prototype — Admin Curation Assistant

### Why this experience

The admin is Go1's most important user to retain. They are the person who decides whether Go1 renews. They are also the person most burdened by the current system: watching courses end-to-end, manually matching content to teams, absorbing blame when recommendations land poorly.

The highest-value bet is not a learner-facing recommendation rail. It is giving admins an experience where the intelligence layer does the matching work and shows its reasoning — so the admin can trust it, override it, and improve it. That is the shift from "Go1 is a library I have to curate" to "Go1 is an assistant that knows my team."

This wireframe shows the moment an admin wants to assign learning to a team. The intelligence layer surfaces course suggestions, makes the confidence and reasoning visible, and makes it easy to act or correct.

---

### Screen: Admin Curation Assistant — "Assign learning to your team"

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Go1  Admin Console                                    [Settings]  [Help]  [BK] │
├──────────────┬──────────────────────────────────────────────────────────────────┤
│              │                                                                  │
│  Dashboard   │  Assign learning to your team                                   │
│  Library     │                                                                  │
│▶ Assign      │  Team: Sales Operations (42 people)  ▾   [+ Add another team]   │
│  Reports     │                                                                  │
│  Settings    │  Goal (optional): ___________________________________            │
│              │  e.g. "Prepare team for Q3 product launch"                       │
│              │                                                                  │
│              │  ─────────────────────────────────────────────────────────────  │
│              │                                                                  │
│              │  Suggested for Sales Operations                        [Refresh] │
│              │  Based on: role profile · completion patterns · your past picks  │
│              │                                                                  │
│              │  ┌──────────────────────────────────────────────────────────┐   │
│              │  │ ★ Top match                                               │   │
│              │  │                                                           │   │
│              │  │ Consultative Selling Fundamentals          Sandler · 45m  │   │
│              │  │ ████████████████████░░░ 87% relevance                    │   │
│              │  │                                                           │   │
│              │  │ Why: Completed by 91% of Sales Ops roles who enrolled ·  │   │
│              │  │      Covers 4 of 5 skills flagged in your team profile ·  │   │
│              │  │      Updated 3 months ago · Assessment pass rate 84%      │   │
│              │  │                                                           │   │
│              │  │ [Assign to team]  [Preview]  [Not relevant ▾]             │   │
│              │  └──────────────────────────────────────────────────────────┘   │
│              │                                                                  │
│              │  ┌──────────────────────────────────────────────────────────┐   │
│              │  │ Negotiation Skills for B2B Sales         LinkedIn · 30m  │   │
│              │  │ ████████████████░░░░░░░ 72% relevance                    │   │
│              │  │                                                           │   │
│              │  │ Why: Strong completion in similar-sized Sales Ops teams · │   │
│              │  │      3 of 5 skills match · Content from 2022 — verify    │   │
│              │  │      if still current for your context     ⚠ Dated       │   │
│              │  │                                                           │   │
│              │  │ [Assign to team]  [Preview]  [Not relevant ▾]             │   │
│              │  └──────────────────────────────────────────────────────────┘   │
│              │                                                                  │
│              │  ┌──────────────────────────────────────────────────────────┐   │
│              │  │ Handling Objections in Complex Deals     Coursera · 1h   │   │
│              │  │ █████████████░░░░░░░░░░ 61% relevance                    │   │
│              │  │                                                           │   │
│              │  │ Why: New to your team's history — based on skill gap     │   │
│              │  │      analysis, not prior completions  ◉ Exploratory      │   │
│              │  │                                                           │   │
│              │  │ [Assign to team]  [Preview]  [Not relevant ▾]             │   │
│              │  └──────────────────────────────────────────────────────────┘   │
│              │                                                                  │
│              │  [Load more suggestions]                                         │
│              │                                                                  │
│              │  ─────────────────────────────────────────────────────────────  │
│              │  Or search the full library  [🔍 Search 130,000+ courses...]    │
│              │                                                                  │
└──────────────┴──────────────────────────────────────────────────────────────────┘
```

---

### What each element is doing and why

**Team selector at the top**
The admin's primary context is their team, not a search query. Starting with team selection means the intelligence layer can immediately apply role profile, past assignment history, and skill gap data before the admin types anything. The goal field is optional — adding a goal shifts the suggestions toward that outcome. This is where org context enters the recommendation.

**"Based on: role profile · completion patterns · your past picks"**
Every suggestion surface tells the admin what signals it is using. This is not a tooltip or a "learn more" link. It is inline and permanent. Admins who have been burned by opaque recommendations need to see the reasoning before they trust the output, not after they click Preview.

**Relevance score bar**
Not a star rating. Not a percentage in isolation. A filled bar that makes the relative confidence of each suggestion scannable at a glance. The number matters less than the relative ordering and the transparency that there is a score at all. The admin now understands that Go1 is ranking these, not just listing them.

**"Why" reasoning block — three-part structure**
Each card surfaces exactly three signals: completion evidence from similar roles, skill match against the team profile, and a content quality flag (freshness or confidence level). Three signals is enough to be credible without being overwhelming. The admin can verify any one of them independently. That is what makes it trustworthy rather than authoritative.

**Content quality flags — ⚠ Dated and ◉ Exploratory**
These are the content intelligence layer made visible. "Dated" surfaces when the freshness signal is below threshold — the admin is warned before they assign, not after a learner flags it. "Exploratory" flags when a suggestion is based on skill gap inference rather than completion evidence — it signals lower confidence without hiding the suggestion. The admin can choose to take the bet or skip it. Making uncertainty explicit is what makes the system trustworthy over time.

**"Not relevant ▾" dropdown on every card**
This is the feedback loop. When an admin marks something as not relevant, they get a reason selector: "Wrong level", "Already covered this", "Not a priority for this team", "Content quality". That signal goes back into the intelligence layer — it is labelled training data that improves future suggestions for this admin and, in aggregate, for admins with similar team profiles. The curation assistant gets better the more it is corrected. That is what "improvable" means in practice.

**Search bar at the bottom, not the top**
Intentional positioning. The intelligence layer's suggestions are the primary surface. Search is the escape hatch for when the admin knows specifically what they want. Leading with search would replicate the current experience. Leading with suggestions signals that the system is doing the work.

---

### What this experience enables

For the admin: the curation burden drops from watching courses end-to-end to scanning a ranked, reasoned shortlist. The decision they are making is "do I trust this reasoning" — not "is this course good." That is a faster, lower-stakes decision that reflects on the system if wrong, not on them.

For Go1: every interaction with this surface — accepts, rejections, reason codes — is a signal that feeds the ranking model. The curation assistant is not just a productivity tool. It is the primary mechanism for generating labelled, high-quality training data from the most expert users in the system.

For renewal conversations: admin curation time is now a measurable metric. When it drops 40% by month 9, that is a concrete ROI number Go1 can put in front of an account manager. The intelligence layer becomes a renewal argument, not just a product feature.

---

## Research Notes

### Go1 Architecture (Confirmed)
- Elasticsearch on Azure: 8M+ users, 9.8M learning objects, 84M enrolment records
- 500K search requests per hour at peak
- 7,000+ skills taxonomy, 98% of library tagged, up to 7 skills per course
- Vector search: planned via Elasticsearch kNN, not yet fully in production
- Go1 AI (Feb 2024): semantic search, LLM chat, AI playlist generation
- Morgan (Jan 2026): AI agent in Slack/Teams, alpha stage
- 100+ HRIS/LMS integrations

### Competitive Landscape

| Competitor | Key Differentiator | Go1's Gap |
|---|---|---|
| Degreed | Neural skill graph, career trajectory recommendations | Skill relationship graph, adaptive learning |
| Cornerstone | Real-time labour market signals (SkyHive) | External market signals |
| LinkedIn Learning | Professional network graph for cold start | Network-based signals, 58% higher engagement proven |
| 360Learning | Peer-sourced curation via community reactions | Social/community quality signals |
| Docebo | Matrix factorisation, UGC at scale | Collaborative filtering model |

### Content Intelligence: Model Architecture Opinion

The enrichment pipeline needs to generate five signals per content item: skill taxonomy tags, quality score, difficulty level, role relevance, and freshness. At 9.8M items the primary constraint is cost-per-signal, not capability. The pipeline should be tiered.

**What the task actually requires**

Each signal has different reasoning demands:
- **Skill taxonomy classification** — matching content to the right subset of 7,000 skills. This is a structured retrieval and classification task. The full taxonomy cannot fit in a single prompt, so the practical approach is a two-step: embed the course description, retrieve the top-N candidate skills via similarity against taxonomy embeddings, then use an LLM to confirm or reject from that shortlist. Cheaper models handle confirmation well once candidates are pre-filtered.
- **Quality scoring** — assessing clarity of learning objectives, depth of coverage, and practical vs. theoretical balance. This requires genuine reasoning about content structure. Needs a stronger model.
- **Difficulty level** — beginner / intermediate / advanced. Simpler classification with clear criteria. A smaller model handles this reliably.
- **Role relevance** — mapping content to standard role buckets (Sales, Engineering, HR, Finance, Operations, Compliance, Leadership, Customer Success). Simpler once role buckets are defined; maps well to classification.
- **Freshness flag** — detecting signals of dated content: regulatory references with specific years, deprecated tools and frameworks, pre-2020 statistics. Can be rule-based with LLM fallback for ambiguous cases.

**Recommended model stack**

| Signal | Model | Rationale |
|---|---|---|
| Skill taxonomy classification (top 5K) | Claude Sonnet / GPT-4o | High accuracy on nuanced skill boundaries. Top content drives most recommendations — worth the cost. |
| Skill taxonomy classification (bulk 9.8M) | Claude Haiku / GPT-4o mini (batch API) | ~50% cheaper on batch. Acceptable accuracy for long-tail content. Pre-filter with embeddings to reduce candidate set first. |
| Quality scoring | Claude Sonnet | Rubric-based reasoning across multiple dimensions. Cheaper models produce shallower assessments. |
| Difficulty + role relevance | Claude Haiku / GPT-4o mini | Well-defined criteria, clear output schema. Classification, not reasoning. Cost-sensitive at scale. |
| Freshness detection | Rule-based + Haiku fallback | Regex catches most year/tool references. LLM fallback for ambiguous signals only. |
| Content embeddings (retrieval) | OpenAI text-embedding-3-large or Cohere Embed v3 | Fast, cheap, one-time cost per item. Enables semantic search and pre-filtering for taxonomy classification. |

**Why Claude-class models specifically for the hard signals**

Claude Sonnet is particularly strong at following complex structured schemas in prompts and at calibrated uncertainty — it is more likely to return a low-confidence tag than hallucinate a confident wrong one. For taxonomy classification where a wrong tag directly degrades recommendation quality, that calibration matters. GPT-4o is comparable on accuracy; the practical choice between them comes down to Go1's existing vendor relationships and API cost structure at the volume they need.

**Human-in-the-loop gate**

Flag for human review when: (a) provider tags and AI-enriched tags disagree by more than 2 skills, (b) model confidence is below threshold on quality or role relevance scoring, or (c) content is in a high-stakes compliance domain (legal, medical, financial regulation). This is not a bottleneck — it is a calibration mechanism. The human review queue teaches the pipeline where its edge cases are, which informs prompt improvements and, eventually, fine-tuning on Go1's own labelled data.

**Fine-tuning as a later stage bet**

Once Go1 has 6+ months of admin feedback data (accepts, rejections, reason codes from the curation assistant), there is a case for fine-tuning a smaller model on Go1's specific taxonomy and quality rubric. A fine-tuned Haiku-class model on Go1's own labelled data would likely outperform a zero-shot Sonnet on taxonomy classification at a fraction of the cost. That is a month 9 to 12 decision, not a day one investment.

---
