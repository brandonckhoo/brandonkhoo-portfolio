# Go1: Content Intelligence and Discovery
## Vision, Strategy, Roadmap and Success Metrics

**Role:** Senior Product Manager, Content Intelligence
**Interview Panel:** Kristina Ryan (SVP Product), Jasneet Kaur (Director of Engineering)

---

## 1) Vision

Go1's vision is to become the intelligent Employee Development Suite, where organisation-led learning ensures every employee is compliant, role-ready, and developing continuously.

The L&D market has moved from administration (Wave 1: Cornerstone, Workday), to catalogue access (Wave 2: LinkedIn Learning, Udemy), to proactive delivery of the right learning at the right moment (Wave 3: Gloat, Eightfold). Wave 3 players cannot deliver content. Go1's unique differentiator is owning both the content and delivery layer.

Go1 is at an inflection point, mid-transition from Wave 2 to Wave 3. The infrastructure is in place. What is missing is the intelligence layer that makes proactive recommendations possible. This strategy outlines our approach before the window closes.

---

### 1.1) Diagnosis

The system has a cold-start problem on both sides. Learner data (role, compliance obligations, skill gaps) is not connected to the recommendation engine. Content signals (quality, freshness, role relevance) do not exist systematically because providers tag broadly to maximise discoverability, not to capture fit. The model falls back on enrolments. Assessment scores go unused. Voluntary and assigned completions are conflated.

The downstream consequence is predictable: learners ignore generic recommendations, admins absorb the curation burden the system should carry, and when a recommendation misses, blame lands on the admin rather than the tool. Content overwhelm becomes the primary churn driver, not because of a UX problem but because trust has collapsed.

Content intelligence, search, and recommendations form a flywheel, not parallel workstreams. Better content signals improve search ranking, generating richer behavioural signals that train better recommendations, which drive more engagement and feed the next cycle.

Three things need to be true across the three domains:

1. **Content intelligence:** every piece of content needs a machine-readable signal Go1 owns, covering skill fit, quality, freshness, and role relevance, independent of provider tags.
2. **Discovery and search:** ranking needs a personalisation layer informed by role profile and compliance context so the system ranks results for the person rather than the average query.
3. **Recommendations:** the model must shift from enrolments to a richer signal set.
   - Engagement quality signals (voluntary completion rates, assessment pass rates, and explicit feedback) replace enrolment counts as the training input. Voluntary and assigned completions are logged and weighted separately: a voluntary completion signals genuine relevance, an assigned completion signals compliance.
   - Learner-declared skill goals are incorporated as a high-fidelity intent signal, currently absent from the model.

---

## 2) Strategy

### 2.1) What I Inherit

HRIS integration already provides role and department data sufficient to deliver materially better recommendations without waiting for the full intelligence layer to be built. Before locking in an approach, I would validate four things.

First, how complete and up to date the HRIS role data actually is. Stale or missing role data means the system cannot personalise by role from day one, which is the foundation everything else depends on.

Second, whether job titles map reliably to Go1's skill taxonomy at scale. If an Account Executive at one company translates to a different taxonomy node than at another, every model trained on that data inherits the inconsistency.

Third, the quality of content metadata across the catalog. Thin or unreliable metadata means the enrichment pipeline is correcting bad signals rather than building on good ones.

Fourth, whether completion data is split by voluntary versus admin-assigned. We suspect these are currently conflated, and without that split in place before day one, any A/B test I run cannot tell the difference between a recommendation that worked and one that was simply complied with.

There are also two assumptions I would push back on. The first is that the recommendation problem is a data volume problem. Go1 has abundant enrolment data. The issue is signal quality, not quantity. Enrolments measure whether someone was assigned a course, not whether it was relevant or useful. The second is that fixing content intelligence requires a full taxonomy rebuild. The taxonomy has sufficient coverage. What is broken is the provider tagging on top of it. The enrichment pipeline corrects that faster and at lower risk than a rebuild.

### 2.2) Strategic Approach

**Phase 1a: Ship immediately (Days 1 to 30).** We connect HRIS role data to the recommendation surface. It is already in the system but nothing is wired to it. We keep Go1's existing recommendation model running and layer role-based filtering on top so the output is personalised by role rather than ranked by enrolment count alone. We put a "Why this was recommended" label on every card. No retraining required. Learners get role-relevant recommendations immediately without waiting for the intelligence layer.

**Phase 1b: Build the labelling foundation (Days 30 to 90).** We add a dismissal reason selector to every card so learners can tell us why they rejected a recommendation. We update the event schema to record whether each enrolment was user-initiated or admin-assigned, which is the field that makes voluntary and assigned completions separable later in Phase 3. We write labelled events to Databricks for model training and use Redis for fast retrieval at ranking time. We run the foundations audit in parallel to lock in the baselines every subsequent decision gate depends on.

**Phase 2: Build the intelligence layer (Months 1 to 6).** We run two workstreams in parallel.

**Content enrichment pipeline.** We pass each content item's title, description, learning objectives, and provider tags to Claude with a structured prompt. We ask it to reclassify the course against Go1's 7,000-skill taxonomy more accurately than the provider's own tags, score the content for quality and freshness, and infer role relevance from what the course actually signals. Providers tag broadly to maximise discoverability. We tag based on what the content actually covers. We use Sonnet 4.6 for the top 5,000 items by enrolment and Haiku 4.5 for bulk classification across the wider catalog, tiered by cost.

**Learner profile service.** We pull role, compliance obligations, and learning history from HRIS into a single unified profile per learner. We serve the hot profile via Azure Redis Cache at sub-5ms latency for every ranking call, with a PostgreSQL backing store for durability and webhook-based HRIS sync to keep role data current as the organisation changes.

**Phase 3: Upgrade the recommendation engine (Months 6 to 9).** We replace the enrolment-ranked model with a two-stage system. Elasticsearch narrows the catalog to a relevant candidate set. XGBoost then scores and ranks each course on role match, content quality, freshness, and completion history. We choose XGBoost over a neural model because the training data is tabular and its feature attributions are interpretable, which makes Arize drift monitoring viable. We train the model on Databricks using Phase 1b labels and Phase 2 content signals, retraining monthly and moving to bi-weekly as label volume grows.

**Phase 4: Extend intelligence to workflows and close the loop (design Month 8, rollout Months 9 to 12).** Learners spend most of their day in Slack and Teams, not Go1. We extend Morgan to surface intelligence layer recommendations where learners already are, with "Why this?" labels and a dismissal reason selector that routes feedback directly back into the ranking model. We add a goal declaration flow so learners can state the skills they want to develop, giving the system an explicit intent signal it cannot infer from role data alone. Admin feedback feeds retraining directly, and recommendation quality becomes a reportable metric in renewal conversations.

### 2.3) Highest-Risk Assumption

The highest-risk assumption is that learners will trust and act on recommendations. I have not seen Go1's internal recommendation data, so this is a hypothesis rather than a conclusion. My concern is that better recommendations do not automatically change behaviour. Even if relevance improves, learners may still ignore recommendations if the system has not earned trust. Relevance is necessary, but trust is what converts relevance into action.

Before touching the model, I want to know which failure mode is driving weak performance. Trust failure is when the recommendation is directionally right but the learner has no confidence in why it appeared. Relevance failure is when the recommendation itself does not feel useful, so a clear explanation will not change behaviour either way.

That is why my first validation is a trust test. The control sees the existing experience. The treatment sees the same recommendations plus a "Why this was recommended" label. Because the logic stays constant, I can isolate the effect of explainability alone.

If acceptance improves, trust is the bottleneck and explainability becomes a core part of the experience. If acceptance does not move, relevance is the problem and I accelerate Phase 2. If engagement is too low to generate signal, I pull Morgan delivery forward into Slack or Teams to close the loop faster.

---

## 3) Success Metrics

| Theme | Metric | What it measures | Target | Timing |
|---|---|---|---|---|
| Instrumentation | Baselines locked | All 6 core metrics measured and documented before any changes ship | Baselines instrumented and documented across all 6 metrics | Day 30 |
| Trust | Recommendation acceptance rate (early signal) | Does showing "Why this was recommended" move acceptance rate vs. control? | +5 to 10pp vs. control (directional, not final target) | Day 60 |
| Loop viability | Feedback loop health | Dismissal reasons are being captured and generating enough labelled data to make Phase 3 viable | >20% of dismissals include a labelled reason | Day 90 |
| Engagement quality | Voluntary completion rate on recommended content | Recommendations driving genuine learning engagement, not compliance activity. Measured on user-initiated enrolments only, split from admin-assigned. | +15 to 20pp vs control | By month 6 |
| Relevance at scale | Assessment pass rate | Recommendations improving learning quality, not just driving activity. Measured on courses with assessments attached. | +10 to 15pp vs control | By month 9 |
| Relevance at scale | Recommendation acceptance rate | Surfaced recommendations feel relevant enough for learners to act on | +30% vs baseline | By month 9 |
| Business outcomes | Admin curation time | System reducing the manual curation effort L&D teams currently absorb | 30 to 40% reduction | By month 12 |
| Business outcomes | Content library penetration | More of the catalog being used in relevant ways across the organisation | +20 to 25% | By month 12 |
| Business outcomes | NRR and renewal rate | Recommendation adoption and learner outcomes contributing to renewal conversations | +5pp NRR in accounts with acceptance above 40% | By month 12 |

---

## 4) Roadmap

Each phase earns the right to the next. Intelligence is never a blocker to delivery. Phase 1a ships on existing signals while Phases 1b and 2 build the foundations Phase 3 depends on.

| Phase | Bet | Expected Outcome | Timeline |
|---|---|---|---|
| 1a) Ship immediately | Role-based recommendation rails | Learners start receiving recommendations relevant to their role and compliance obligations. Every card shows why it was recommended. No model retraining required. | Days 1 to 30 |
| 1b) Build the labelling foundation | Foundations audit and labelling infrastructure | We know our baselines and the system starts learning from every interaction. Learners can tell us why they dismissed a recommendation. We can tell the difference between a course someone chose and one they were assigned. | Days 30 to 90 |
| 2) Build the intelligence layer | Content enrichment pipeline | Admins can see at a glance why a course is relevant, how current it is, and who it is best suited for. They stop watching courses end-to-end to decide suitability. | Months 1 to 6 |
| | Learner profile service | The system knows each learner's role, compliance obligations, and learning history in real time. Recommendations are personalised to the individual, not just the average person in their department. | Months 1 to 6 |
| 3) Upgrade the ranking engine | Retrieval and ranking upgrade | Recommendations are no longer based on what most people enrolled in. They are based on what people like this learner actually completed and found valuable. Quality improves measurably and is validated by an A/B test before full rollout. | Months 6 to 9 |
| 4) Extend to workflows and close the loop | Improve recommendations in Morgan | Learners receive recommendations in Slack and Teams without needing to open Go1. Enrolments happen in the flow of work. Outcomes feed directly into renewal conversations. | Design Month 8, rollout Months 9 to 12 |
| | Admin curation assistant | Admins spend 30 to 40% less time on manual curation. Every decision they make improves future recommendations automatically. | Months 9 to 12 |
| | Learner goal declaration | Learners can tell the system what they want to develop. Recommendations shift from what the system thinks they need to what they have asked for. | Months 9 to 12 |
| | Feedback loop and observability | The system improves continuously without manual intervention. We can show exactly how recommendation quality is trending and use it as evidence in renewal conversations. | Months 9 to 12 |

**Deprioritised bets:**

- **Search retrieval rebuild.** Retrieval is functional. The ranking layer is broken. Rebuilding retrieval changes how many courses surface, not which rise to the top.
- **Full taxonomy rebuild.** The taxonomy has sufficient coverage. The enrichment pipeline corrects unreliable provider tags faster and at lower risk.
- **Consumer-grade personalisation UI.** The interface earns complexity when the model earns trust.

---

## 5) Appendix

### 5.1) Competitive Landscape

**Gloat and Eightfold** are the strongest threat. They have deep skills taxonomy capabilities and workforce intelligence, and they are actively positioning for intelligent delivery. But they do not own content. They depend on integrations. If Go1 builds the intelligence layer before they close that content gap through partnerships, the window is gone for them.

**Degreed** has gone all in on the learner-directed model. Their AI-driven curation numbers are real: 83% accuracy in skills-to-content matching, curation time down from weeks to hours. The weakness is admin overhead and completion rates. The product is complex to operate and learners still do not finish what is assigned.

**LinkedIn Learning** has the personalisation data advantage. Professional profiles, social graphs, network activity. The problem is that their recommendation engine is built for consumer behaviour, not enterprise compliance or structured learning. It does not translate.

**Go1's structural advantage** is unique. We sit at the intersection of content access and delivery. None of these players can replicate that without a major acquisition. That advantage only holds if we build the intelligence layer before the window closes.

---

### 5.2) FAQ

---

#### Product and Commercial

**1. Why is this primarily a recommendations problem rather than a search problem?**

Search requires intent. Most people do not know what they need to learn next. Recommendations deliver the right learning at the moment it is needed without requiring that self-awareness. As the recommendation engine improves, search quality improves as a downstream effect. You get both, but we fix the bigger problem first.

**2. How does this connect to churn, renewal, and commercial outcomes?**

Content overwhelm drives churn. The intelligence layer addresses this directly by reducing admin curation burden and improving learner relevance. When recommendations perform, Go1 earns credit for the outcome instead of absorbing blame for the miss. The renewal conversation shifts from "are we getting enough value" to "here is what the system delivered for your team this year."

**3. What happens after month 12?**

The loop is closed and the system is self-improving. The strategy is organisation-led by design, learner-directed by choice. By month 12 the system delivers based on role, compliance, and behavioural signals without the learner having to ask. The next move is letting learners steer it further with declared goals and certification ambitions. These are individual intent signals the system cannot infer from role data alone. Recommendation quality becomes a reportable metric in renewal conversations. The platform stops being a tool admins manage and starts earning credit for learning outcomes.

**4. How do recommendations work for a brand new customer with no behavioural data?**

**Phase 1a (role-based recommendation rails):** The first 30 days use HRIS role data alone. No completion history, no dismissal signals, no assessment scores required. Role filters the catalog down to relevant content. Compliance deadlines narrow it further. The "Why this was recommended" label explains the logic. That is useful on day one.

**Phase 1b (labelling foundation):** Behavioural signals start accumulating over the first weeks and improve ranking as the system learns from each interaction. A new customer does not get a cold generic experience. They get a role-filtered one that gets smarter over time.

**5. How does this change the admin experience?**

Right now admins absorb the curation burden the system should carry. When recommendations miss, blame lands on them, not the tool. The intelligence layer changes this in three ways. First, the content enrichment pipeline in **Phase 2 (intelligence layer)** gives admins readable context on every content item: quality score, freshness signal, role relevance. They stop watching courses end-to-end to decide suitability. Second, the admin curation assistant in **Phase 4 (Morgan and workflow integration)** surfaces pre-ranked recommendations for their team with explanations. Admins review and approve rather than build from scratch. Third, every admin approval, edit, and rejection becomes a training signal that improves recommendations for future decisions. The admin stops being a manual filter and becomes a quality signal.

Underpinning all of this is an admin dashboard. Admins need a high-level view of how the system is performing across their organisation: recommendation acceptance rate by team, content engagement trends, compliance coverage, and how recommendation quality is trending over time. Without that visibility, the admin has no way to know whether the system is working or whether it needs intervention. The dashboard also matters commercially. It gives Go1 a concrete artefact to present in renewal conversations, shifting the conversation from "are we getting value" to "here is what the intelligence layer delivered for your teams this quarter."

**5b. How are you thinking about the admin experience at a high level?**

Right now the admin is the system. When Go1 does not know what to recommend, the admin fills the gap manually. When a recommendation misses, blame lands on them, not the tool. That is the failure mode we are designing against.

The north star is to shift the admin from operator to curator to strategist across the roadmap. Each phase changes their job description.

In **Phase 1**, the admin's burden decreases immediately. Role-based filtering narrows the catalog automatically and every card shows a reason. The admin is still involved but they are reviewing, not building from scratch.

In **Phase 2**, content enrichment gives the admin context they have never had before: quality scores, freshness signals, role relevance. They stop needing to watch courses end-to-end to make a call. The metadata does the pre-screening.

In **Phase 4**, the admin curation assistant surfaces ranked recommendations for their team with explanations attached. Every approval, edit, or rejection they make becomes a training signal that improves the next round automatically. The admin becomes a quality signal rather than a manual filter.

The deeper design principle is that the admin should trust the system before the learner does. If admins do not believe the recommendations are good, they will override everything and we are back to manual curation with extra steps. So explainability, editorial control, and visible improvement over time are not nice-to-haves for the admin experience. They are the conditions for adoption.

---

#### Responsible Design

**6. How do you design responsibly with a probabilistic system?**

Monitoring scales with the system, not ahead of it. Here is how that plays out across each phase.

In **Phase 1 (role-based recommendation rails)**, Go1's existing recommendation infrastructure is still running. We do not replace it. We build on it. The existing model surfaces enrolment-ranked content. Phase 1 wires HRIS role data into that surface and uses it to filter and rerank the output by role. It is a wiring change, not a model change. No retraining happens. Because the ranking logic is deterministic at this stage, quality assurance is human: acceptance rate is tracked through basic event logging and someone reviews whether role-filtered results look sensible. As the dismissal reason selector goes live in **Phase 1b (labelling foundation)**, structured feedback starts flowing from learner interactions and Morgan Slack messages. That is the first layer of signal, labelled, human-generated, and grounded in real usage.

In **Phase 2 (intelligence layer)**, the Claude enrichment pipeline runs at scale and LangSmith comes in. You cannot manually review thousands of classification calls. LangSmith makes every call auditable, surfaces failure patterns across large batches, and flags where output quality falls below the ground truth threshold built from approximately 500 human-labelled items. That is what keeps enrichment quality defensible as the catalog grows from 5,000 to 180,000 items.

In **Phase 3 (ranking engine upgrade)**, the underlying ranking model is replaced with XGBoost trained on richer signals: voluntary completions, assessment scores, and dismissal reasons. This is where the system becomes genuinely probabilistic. Arize monitors the model in real time for drift and degradation. At scale, a model that has drifted on role profiles or content distribution quietly serves worse recommendations to thousands of people before anyone raises a flag. Org restructures, new content categories, and seasonal compliance spikes all shift the data distribution the model was trained on. Arize catches this before the drift compounds. Without it, the feedback you get is learner disengagement or an admin complaint, not an alert.

The system earns trust incrementally. The instrumentation earns the right to scale with it.

---

#### Technical Decisions

**7. Why Sonnet instead of Opus for enrichment?**

The enrichment task is structured classification against a defined rubric. Map content to a known taxonomy, score freshness and quality, return structured output. That is not open-ended reasoning. My default is to start with the cheapest model that reliably hits the quality threshold and escalate only when I see specific failure modes. Sonnet handles bulk classification. A more capable model is reserved for genuinely ambiguous cases like transcript synthesis or evaluator workflows.

**8. How are you thinking about infrastructure cost in Phase 2?**

**Phase 2 (intelligence layer)** carries the highest infrastructure cost in the plan. Running Sonnet across the full catalog does not justify the marginal accuracy gain on long-tail content, so the tiered approach is a deliberate cost decision. Azure Redis Cache is the right call for ranking latency, but a cheaper database store with 50 to 100ms additional latency is a viable alternative worth validating. The deeper trade-off is opportunity cost. **Phase 2 (intelligence layer)** requires dedicated engineering capacity that could otherwise accelerate **Phase 1 (role-based recommendation rails)**. The investment is not optional if **Phase 3 (ranking engine upgrade)** is the goal.

**9. How does the enrichment pipeline work if content metadata is already underdeveloped?**

The metadata is unreliable, not absent. Every provider supplies title, description, learning objectives, duration, difficulty, and tags on ingestion. But providers tag broadly to maximise discoverability, not to accurately describe what a course covers. A course on negotiation for enterprise sales might be tagged as "communication" and "leadership" because those terms surface it in more searches. Claude's job is to cut through that and reclassify each course against Go1's taxonomy based on what the content actually signals, not what the provider wants learners to find. It also scores freshness from publication dates and infers role relevance from structured metadata.

Hallucination risk here is lower than people expect. Claude is not writing descriptions or generating free-form content. It picks from a defined taxonomy and returns structured output in fixed fields. The real risks are narrower: misclassifying a course into the wrong taxonomy node with high confidence, or inferring role relevance from a vague title and getting it wrong. Both are caught before they reach the catalog. Low-confidence outputs route to a staging layer for human review. Periodic evaluation runs compare output against approximately 500 human-labelled items to catch patterns of misclassification before they reach the ranking model.

There is one thing Claude cannot do from metadata alone: verify whether a course actually teaches what it claims, or measure whether learners retained anything. Assessment scores and completion depth are the only signals that tell you that. It is why **Phase 1b (labelling foundation)** starts collecting that signal from day one, and why it feeds directly into **Phase 3 (ranking engine upgrade)** when the model is ready to train on it.

**10. How do you handle data privacy and GDPR with the learner profile service?**

The learner profile service stores role, compliance obligations, and behavioural history per learner. That is sensitive data. Three things need to be true before it goes live.

**Data minimisation.** The profile stores only what the ranking model actually needs: role, compliance state, completion and dismissal history. Performance reviews, salary data, and communication records never enter the system. If the model does not need it, it does not get stored.

**Transparency over individual consent.** In enterprise B2B, individual learner consent is not the right legal mechanism for processing employee learning data. The employer is the data controller. They sign the contract with Go1 and are responsible for informing employees that their learning data is processed, typically through an employment agreement or internal privacy policy. Go1 acts as the data processor on the employer's behalf. That said, transparency at the product level still matters regardless of legal basis. Learners see "Why this was recommended" from day one so the system's reasoning is always visible. The goal declaration flow in **Phase 4 (Morgan and workflow integration)** is opt-in by design because that is personal intent data the learner volunteers beyond what the employer requires, and forcing it would produce low-quality signals anyway.

**Deletion.** GDPR right-to-erasure requests must propagate across the PostgreSQL backing store, the Redis cache, and the Databricks training dataset. A database delete is not enough on its own. A full deletion pipeline needs to be in place before **Phase 1b (labelling foundation)** ships, and I would validate that with legal and engineering before we start collecting any behavioural data.

**11. What happens when HRIS data is stale or wrong?**

HRIS data is the foundation of **Phase 1 (role-based recommendation rails)**. If it is wrong, role-filtered recommendations become irrelevant. Org restructures, promotions, and team changes happen constantly, and HRIS sync is notoriously laggy in enterprise. There are two mitigations.

**Webhook-based sync.** Rather than waiting for a nightly batch, role changes trigger an update event in the learner profile service that refreshes the profile within minutes. This keeps the system current as org changes happen rather than catching up the next day.

**Staleness fallback.** If a role has not been updated in more than 30 days, the system flags the profile as stale and falls back to department-level filtering rather than role-level. The recommendations are less precise, but the system does not break.

Before **Phase 1a (ship immediately)** goes broadly live, the foundations audit at day 30 validates HRIS data coverage and freshness across accounts. If coverage falls below threshold, Phase 1a scopes to accounts where data is clean rather than shipping to everyone on a weak foundation.

---

#### Execution and Contingency

**12. What does the product surface look like between months four and six, when enrichment is still in progress but ranking is already being upgraded?**

**Phase 3 (ranking engine upgrade)** does not require complete enrichment before it launches. The two-stage retrieval model runs on the best available signals at any point in time and improves continuously as enrichment processes more content. Ranking uses HRIS role data plus whatever enrichment has completed on the highest-priority content. The A/B test gate at month four determines whether quality has improved enough to roll out broadly. This is a continuous improvement model, not a big-bang replacement.

**13. Phase 3 (ranking engine upgrade) is gated on Phase 2 (intelligence layer). What is the contingency if enrichment slips?**

If enrichment slips past month six, **Phase 3 (ranking engine upgrade)** launches on HRIS-only ranking inputs rather than fully enriched content signals. That reduces ranking quality at launch but does not block the upgrade. The A/B test gate at month four is designed to catch this. If the quality bar falls below threshold in the test cohort, the full rollout holds until enrichment catches up. The design is tolerant of partial enrichment, not dependent on complete enrichment.

**14. Who owns the foundations audit, product or engineering?**

Product owns the definition of what to measure and the success thresholds. Engineering owns instrumentation. Both need to commit before month one closes or every downstream decision gate moves with it. The first commitment I would lock from the engineering lead is shared ownership of the audit instrumentation with a hard deadline at day 30. Without that, the audit becomes advisory rather than decision-forcing.

**15. How do you ensure model reliability as the system scales?**

Four layers work together. Each one catches a different type of failure before it reaches learners.

**Content quality checks.** Every Claude call in the enrichment pipeline is traced and compared against a human-labelled ground truth set of approximately 500 content items. If classification quality drops below threshold, the pipeline flags it and low-confidence outputs go to a human reviewer before going live. This means bad content signals never quietly corrupt the recommendations learners receive.

**Model health monitoring.** As the organisation grows and content changes, the data the ranking model was trained on can drift away from the data it is now seeing. Arize monitors the model in real time and triggers a retraining run when that drift becomes material, before it compounds into degraded recommendations at scale.

**Controlled rollout gates.** The upgraded ranking model in **Phase 3 (ranking engine upgrade)** does not go to everyone at once. It is A/B tested against a controlled cohort first. If it does not clear the quality bar, the system stays on the **Phase 1 (role-based recommendation rails)** deterministic logic rather than serving worse recommendations to the full learner population.

**Human feedback as the correction loop.** All three layers above are automated. But the most reliable signal of all is a learner dismissing a recommendation and saying why, or an admin overriding a suggestion. That reflects actual relevance failure at the moment of delivery, something no monitoring tool can fully replicate. These signals feed retraining on a regular cadence. The system gets more reliable over time not because of engineering sophistication but because the feedback loop is tight and every correction is labelled.

**16. Should learning happen inside Slack or does Morgan send learners to Go1?**

Slack is a launchpad, not a learning environment. Morgan's job is to move the learner from distracted to enrolled in under 30 seconds. It surfaces the recommendation with role context, explains why it is relevant, offers to block calendar time, and handles dismissal with a reason selector. The learner clicks "Start in Go1" and deep-links directly into the course.

All actual learning, assessment, and completion recording happens in Go1. This is not just a product decision. It is what makes the feedback loop work. If learning happened inside Slack, Go1 would receive no completion data or assessment scores back, and the signals that **Phase 3 (ranking engine upgrade)** trains on would never exist. Morgan is the delivery mechanism. Go1 is the system of record.

The one exception worth flagging is microlearning under 3 minutes. For content that short, in-Slack delivery is a reasonable future bet in **Phase 4 (Morgan and workflow integration)**. But it is additive to the core loop, not a replacement for it, and only viable once the feedback loop is already running.
