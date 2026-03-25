# Developer Portal — Talking Points & Anticipated Q&A

---

## Part 1: Product Deep Dive

### Why did you build a Developer Portal instead of just building integrations one by one?

One-off builds weren't sustainable. Each integration required dedicated ENG time, CS onboarding support, and manual catalog maintenance. With 40+ competitors like Segment offering 400+ integrations, we needed breadth — not depth. The portal let partners own their integrations, which scaled faster and reduced internal overhead.

### How did you validate the business case before investing in engineering?

Three-pronged approach:
1. **Embedded in-app surveys + prospect calls** → confirmed CSV exports and missing integrations were top CDP deal blockers
2. **Partner workshops** → generated interest and validated alpha partner list using JTBD for lifecycle marketers
3. **Business case framing** → anchored to three levers: revenue impact (deals stalling), competitive positioning (Segment's 400+ integrations), and scalability (one-off builds weren't credible at scale)

### What tradeoffs did you make in the MVP?

- Chose **API keys over OAuth** to ship fast — accepted short-term credibility gap, planned OAuth for Phase III
- Added **schema validation** even though it slowed MVP by ~1 sprint — worth it to prevent broken integrations in production
- **Deferred event streaming** to focus on Cohort Sync (core JTBD for lifecycle marketers)
- Let partners **self-define catalog listings** — required CMS-like backend, but eliminated ongoing manual maintenance

### What didn't work and what did you learn?

**Co-marketing gaps:** Alpha partners wanted launches promoted immediately, but Partnerships was focused on higher-ARR solution partners. Lesson → build a repeatable GTM playbook upfront, not reactively.

**No partner prioritization criteria:** ENG struggled to decide which integrations to build first. Lesson → used customer overlap + ARR impact (via Crossbeam) as selection criteria from Phase III onward.

**Outdated docs:** Help documentation went stale quickly with no ownership process. Lesson → assign doc ownership to partners as part of the tiering framework.

---

## Part 2: Technical Deep Dive

### What is the core architecture of the Developer Portal?

Three layers:

1. **Build layer** — Developer Portal UI (in-product, Settings → Developer Portal). Partners configure display name, auth params, endpoint URLs, payload templates (FreeMarker), and user property mappings. Includes a test panel with mock customer modal and live HTTP response preview.

2. **Platform layer** — Portal API → Integration Config Store (PostgreSQL). Stores integration definitions, schemas, partner metadata. On submission: schema validator runs, then Amplitude's integration team reviews (~1 week). On approval, a deployment job pushes the config to the Integration Registry — available in all customers' Sources/Destinations UI.

3. **Runtime layer** — Three execution paths depending on integration type:
   - **Event Ingestion:** Partner system calls Amplitude's HTTP v2 API with a `partner_id` for attribution (data flows partner → Amplitude)
   - **Cohort Sync:** Behavioral Cohorts API pushes audience lists to partner endpoints — 1,000 users/batch, 4 concurrent threads, 8 retries with exponential backoff
   - **Event Streaming:** FreeMarker template engine enriches events (merges event + user props) and renders partner JSON payload → POST/PUT/PATCH to partner endpoint, ~60s p95 latency

### How are partner credentials stored securely?

Customers enter credentials per integration setup (not partners). Here's how they're protected:

- **In transit:** TLS/HTTPS — credentials never sent in plaintext
- **At rest:** Encrypted in DB using AES-256, keys managed by KMS (AWS KMS)
- **Dedicated secrets vault:** Credentials stored in a secrets service (e.g. AWS Secrets Manager), separate from the main application DB — never logged or exposed
- **Per-customer scoping:** Customer A's credentials are cryptographically isolated from Customer B's
- **Rotatable:** Customers can update credentials without destroying the integration config

At runtime, the stored credential is injected directly into the outbound HTTP request header — the application layer never surfaces it in logs or responses.

### How does deployment work — both for partners and for engineers?

**Partners don't deploy code — they deploy config.** That's the key architectural insight:

```
Partner submits form → config saved as JSON in Integration Config Store
→ Amplitude reviews → approval triggers deployment job
→ config pushed to Integration Registry (production)
→ tile appears in all customers' Sources/Destinations UI
```

The "deployment" is a config record becoming active — no code ships. This is what makes it a platform, not a feature list.

**For Amplitude engineers:** the portal infrastructure itself is containerized and deployed via CI/CD. Config changes propagate via cache invalidation (~5 min for internal release, immediate on approval). The FreeMarker runtime engine is deployed as part of the event streaming service — schema validation runs at submission time (not runtime) to keep the critical path fast.

### How did engineering constraints shape your strategy?

The decision to start with API keys over OAuth wasn't just speed — it reflected where our partner base was. Most early partners (Insider, Statsig) only needed server-to-server connections and didn't require OAuth. We validated this pattern before investing in the more complex auth flow. When enterprise deals required OAuth, we had enough proof of value to justify the infra investment.

### How did you handle the catalog at scale?

PostgreSQL backend storing partner-defined metadata (name, logo, category, description, payload schema). This data powers both the in-product Data Catalog and the external-facing integration catalog. The key design decision was making partners own their data — self-serve submission rather than manual ENG input — which eliminated a maintenance bottleneck.

### What was the versioning approach in Phase IV?

Introduced a JSON/YAML manifest so partners declared their schemas, versions, and endpoints explicitly. This enabled v1, v2, v3 to coexist — customers could stay on a stable version while partners upgraded, reducing disruption to live integrations.

### How did you balance speed vs. quality?

**Speed-biased decisions:**
- API keys over OAuth in MVP
- Cohort sync first, streaming deferred
- 2-step submission flow (lightweight, not exhaustive)

**Quality-biased decisions:**
- Schema/payload validation at submission (added ~1 sprint)
- Test endpoint with CSV upload (delayed Phase III by ~1 sprint)
- Staged publishing (draft → beta → public) instead of one-step publish

The pattern: defer complexity that isn't load-bearing in the current phase, but don't skip quality gates that prevent compounding technical or trust debt.

---

## Architecture Diagram — Speaker Notes

*Walk through left to right. Aim for 5–7 minutes.*

---

**Opening:**
> "Let me walk you through the technical architecture of the Developer Portal. What I want to show here is not just what we built, but the key design decisions that made this scalable — and where the hard problems actually lived."

---

### 1. Partner Developer *(left actor box)*

> "The story starts here — a technology partner. Think CleverTap, Braze, Statsig — companies who have their own platforms and want to offer native integrations with Amplitude so their mutual customers don't have to manually export and import data.

> Before the Developer Portal existed, if a partner wanted to build an integration, they had to come to us, get on our roadmap, wait for an Amplitude engineer to build it, and then wait again for it to be maintained. That process took months per integration and didn't scale. We had 40 integrations. Segment was advertising 400+. Every enterprise deal that came up, the first question from the customer was: 'Do you integrate with X?' And we kept saying no.

> The portal flips that model entirely. Now the partner is in the driver's seat. They self-serve. No ticket, no roadmap dependency, no waiting."

---

### 2. Developer Portal UI *(blue box)*

> "One thing worth noting before we get into the UI itself — access to the Developer Portal wasn't open to all partners by default. We used a feature flag to control which partner accounts could see and use the portal. This let us onboard partners in a controlled, staged way — we could flip the flag for a specific alpha partner, watch how they used it, gather feedback, and iterate before opening it to the next cohort. It also meant we didn't need a separate partner portal with its own auth system — partners were already authenticated in their Amplitude account, and the feature flag just unlocked the Developer Portal section for them."

> "So what does the partner actually interact with? An in-product builder, accessed under Settings → Developer Portal inside their Amplitude account. We deliberately kept it in-product — partners are already authenticated, already in context, and it gave us control over the experience rather than maintaining a separate developer site.

> The UI has three main surfaces. First, the configuration page — this is where partners define their integration's identity: display name, category, a short description, logo. But more importantly, they define their 'parameters' — named key-value fields like API key, endpoint URL, subdomain — that customers will fill in during setup. Think of parameters as the interface contract between the partner's system and the customer.

> Second is the FreeMarker template editor. This is where the real technical work happens for event streaming integrations. Partners write a template that defines exactly what JSON payload structure Amplitude will send to their endpoint — they can reference the event's properties, the user's properties, and any of those customer-filled parameters. It's expressive enough to handle most partner APIs without us needing to write any partner-specific code.

> Third is the test panel. This was something we added based on early partner feedback — partners kept submitting integrations that looked right in config but failed in production because they'd never seen a real end-to-end request. So we built a mock customer setup modal right in the builder, plus a 'Send Test Event' button that fires a real HTTP request to their endpoint and shows the response inline. That alone cut our review cycle time significantly because partners caught their own bugs before submission."

---

### 3. Portal API *(blue box)*

> "When the partner submits, it goes through our Portal API — a standard REST API. A few things happen here that are worth highlighting.

> First, authentication. In Phase II, we used API keys — simple server-to-server auth. The decision to start there was deliberate. Most of our early partners didn't need OAuth; they just needed a reliable way to authenticate requests. Starting simple let us ship fast and onboard our first wave of partners. OAuth came in Phase III once we had proven demand from enterprise partners who needed delegated access.

> Second, schema and payload validation. When a partner submits their integration, we run lightweight validation against the payload schema they've defined — checking format, required fields, connectivity. This is a critical design decision: we validate at submission time, not at runtime. If we let bad configs through to production and validated at runtime, every bad request would be a performance hit on the critical data path for customers. By catching it at submission, we slow the partner down by maybe a day, but we protect every customer using that integration."

---

### 4. PostgreSQL *(green cylinder)*

> "Validated configs are stored in PostgreSQL. I want to spend a moment on this because the data model here was one of the more interesting design challenges.

> We're storing three distinct types of data in here. First, integration configurations — the FreeMarker templates, endpoint URLs, authentication schemes, parameter definitions. Second, partner catalog metadata — the logos, descriptions, categories that power the public-facing integration catalog. We made a deliberate choice to let partners own and self-manage this data rather than having an Amplitude team maintain it manually. That eliminated a whole category of ongoing operational work.

> Third — and this is the security-sensitive part — customer credentials. When a customer sets up an integration and enters their API key for CleverTap, that credential gets stored here, but never in plaintext. It's encrypted at rest using AES-256, with encryption keys managed by KMS — AWS Key Management Service. The application layer never logs credentials, never surfaces them in API responses, and never exposes them to other customers. They're isolated per customer, per integration setup. At runtime, the credential is fetched, decrypted in memory, and injected directly into the outbound HTTP request header — and then it's gone from memory.

> This architecture is what lets us tell enterprise customers: your API keys are cryptographically isolated. Even Amplitude employees can't read them in plaintext."

---

### 5. Publishing Pipeline *(yellow box, branching down)*

> "Before any integration goes live to customers, it passes through a gated publishing pipeline. We designed this with three stages: Draft, Beta, and Public.

> Draft is the working state — partners can iterate freely, no one sees it. Beta is gated — this is where Amplitude's integration team reviews the submission, verifies the test events actually reach the partner's endpoint correctly, checks the customer setup flow makes sense, and looks for any edge cases in the template. This review typically took about a week. Some partners pushed back on this — they wanted instant publishing. But we held the line because the alternative — a bad integration surfacing to thousands of customers — would have destroyed trust in the entire ecosystem.

> Public means it's live in the Integration Registry, which feeds the product. One thing I want to emphasize: we never had a production incident from a bad partner integration making it through. That's not luck — that's because we built the quality gate into the architecture from the start, not as an afterthought."

---

### 6. Integration Registry *(green box)*

> "Once approved, the config gets pushed from PostgreSQL into the Integration Registry. I want to explain why these are two separate stores, because this is a deliberate architectural decision.

> PostgreSQL is the write-optimized store — it handles all the complexity of versioning, staging states, partner metadata updates. But at runtime, when a customer is loading the Destinations page in Amplitude and we need to show them 140+ integration tiles in under 200ms, we can't afford to query that full relational store every time.

> The Integration Registry is read-optimized. It holds only the approved, active configs in a format that's fast to query. It's essentially the production view of the catalog. When a partner upgrades their integration from v1 to v2, the old version stays live in the Registry until customers explicitly migrate — so we never break existing integrations while a partner is iterating."

---

### 7. Runtime Services *(purple box)*

> "The Integration Registry feeds three distinct runtime services, and these represent the three integration patterns the portal supports.

> Cohort Sync — this is the most common pattern. When an Amplitude customer builds a behavioral cohort — say, 'all users who completed onboarding in the last 7 days but haven't made a purchase' — and wants to push that audience to CleverTap to run a campaign, Cohort Sync handles that. It calls our Behavioral Cohorts API, batches users into groups of 1,000, runs 4 concurrent threads in parallel, and POSTs to the partner's list endpoints. If the partner's endpoint returns a 429 rate limit, we back off with exponential retry — up to 8 retries. The partner defined those endpoint URLs in the portal; we just execute against them.

> Event Streaming is the more technically sophisticated service. Every event that flows through Amplitude — a user clicking a button, completing a purchase, anything — can be forwarded to the partner in near real-time. The FreeMarker template engine picks up the raw event, enriches it by merging in the user's current properties and the customer's configured parameters, renders the final JSON payload, and fires it to the partner's endpoint. The target latency is 60 seconds end-to-end at p95. There's a retry pipeline — up to 10 retries over a 4-hour window — so transient partner failures don't cause data loss.

> HTTP v2 ingestion is the reverse direction — instead of Amplitude pushing data out, the partner's system sends data into Amplitude. They use our HTTP v2 API and include a unique partner ID in every event payload, which lets us attribute events to the correct integration for analytics and debugging."

---

### 8. Partner Endpoints *(red box, right)*

> "At the far right of the diagram, we have the partner endpoints — CleverTap, Braze, Statsig, Insider, and 140+ others. These are completely external systems that the partner has defined in their portal configuration.

> From Amplitude's side, we don't care what stack they're running. We just know: here is the endpoint URL, here is the authentication method, here is the payload template. The portal model means we've abstracted away all partner-specific logic into config. If CleverTap changes their API, they update their template in the portal and submit a new version — no Amplitude engineer involved, no code deployment on our end."

---

### 9. Amplitude Customer + Sources/Destinations UI *(bottom row)*

> "The last piece is the customer experience, which is what ties everything together. An Amplitude customer — a lifecycle marketer at some SaaS company — goes to the Destinations tab in Amplitude. They see a catalog of tiles. They click CleverTap, fill in their API key and endpoint URL — those are the 'parameters' the partner defined in the portal — and hit Save. That's it.

> Under the hood, what just happened is: we fetched the CleverTap integration config from the Integration Registry, rendered the setup modal dynamically based on the parameter definitions, and stored the customer's credentials in PostgreSQL with AES-256 encryption. From that point on, every time a cohort sync runs or a qualifying event fires, the runtime services pick up the config, decrypt the credential, and execute.

> The customer sees a clean, consistent UI across all 140+ integrations. The complexity is entirely encapsulated in the config layer."

---

**Closing line:**
> "The core architectural insight I want to leave you with is this: partners deploy config, not code. There is no Amplitude engineer in the loop once the portal is built. A partner can go from zero to a live integration without touching our codebase. That abstraction — config as the deployment artifact — is what let us scale from 40 to 140+ integrations, 4x our CDP ARR, and cut the sales cycle in half. The portal didn't just solve an integration problem. It created a growth flywheel."

---

## Questions to Ask Canva (Part 3)

1. How does Canva think about the developer/partner ecosystem as a growth lever — is there a specific team or initiative owning this?
2. What does the relationship between platform PMs and feature PMs look like at Canva? How do you avoid stepping on each other's roadmaps?
3. How does Canva approach technical decision-making at the PM level — how close to the architecture are PMs expected to get?
4. What does success look like in the first 90 days for this role?
5. How does Canva handle the tension between consumer-grade design expectations and developer/API product surfaces?
