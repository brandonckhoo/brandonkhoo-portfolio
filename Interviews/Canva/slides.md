# Developer Portal — Canva Presentation Slides

Mapped to the Canva template: https://www.canva.com/design/DAXEQq-sIxE/qvn0WCSSj6sOhxl9jSRfdw/edit

---

## Slide 1 — Title

**Developer Portal**
Brandon Khoo | Product Review

---

## Part 1: Product Deep Dive (25 mins)

### Slide 3 — Product Description

**Amplitude Developer Portal (Integration Portal)**

A self-serve platform that enables technology partners to build, configure, and publish integrations with Amplitude's CDP — replacing one-off manual builds and scaling the integration ecosystem from 40 to 140+ integrations.

> **Visual:** 7-step integration flow diagram
> Partner journey: choose integration type → enter details → configure payload → preview setup experience → submit for review → end user selects integration → fills credentials

---

### Slide 4 — Key Features (intro)

*Transition slide — no text needed beyond section heading*

---

### Slide 5 — Key Features (description)

1. **Configuration Page** — Partners configure auth + payload mapping via UI with live preview; no raw API exposure
2. **2-step Submission Workflow** — connect → test/submit with schema & payload validation to catch bad integrations before production
3. **Self-serve Catalog Listing** — Partners define their own logo, category, and description; data stored in PostgreSQL and powers the external Integration Catalog
4. **Staged Publishing** — Draft → Beta → Public gated release process to reduce production risk
5. **Test Endpoint** — CSV upload + real-time request/response preview so partners can validate before submitting
6. **Partner Tiering (Premier / Standard)** — Co-marketing, featured placement & support SLAs as flywheel incentives

---

### Slide 6 — Key Features (visual)

> **Visual:** Integration Portal overview diagram (same 7-step flow as Slide 3, or screenshot of the Configuration Page UI)

---

### Slide 7 — Impact

| Metric | Result |
|--------|--------|
| CDP ARR | $6M → $24M (4x increase) |
| Integrations | 40 → 140+ |
| CDP Rip & Replaces | 10+ |
| Sales cycle | 6 months → 3 months (↓50%) |

> **Brief description:** By building a scalable self-serve integration ecosystem, we turned the Developer Portal into a growth flywheel — unlocking new pipeline, accelerating deals, and establishing Amplitude as an extensible CDP platform rather than a closed ecosystem.

---

## Part 2: Technical Deep Dive (20 mins)

### Slide 9 — Architecture

**4-phase delivery model:**

| Phase | Focus | Key deliverables |
|-------|-------|-----------------|
| Phase 1: Business Case | Validate demand, secure investment | ENG design doc, alpha partner list, leadership sign-off |
| Phase 2: MVP | Ship initial version, unblock sales | Cohort Sync API, API key auth, config UI, external catalog (PostgreSQL) |
| Phase 3: Scale | Improve quality & partner experience | OAuth, test endpoint, staged publishing, event streaming, partner tiering |
| Phase 4: Maturity | Ecosystem governance | Versioning (JSON/YAML manifest), open to all customers, Premier/Standard SLAs |

**Key technical decisions:**
- Auth evolution: API keys (MVP speed) → OAuth (Phase III, enterprise-grade)
- Backend: PostgreSQL stores all partner catalog metadata; powers both in-product and external catalogs
- Schema validation at submission: added ~1 sprint but eliminated broken integrations reaching production

---

### Slide 10 — Key Integrations

**Cohort Sync API**
Push audience lists from Amplitude to downstream MarTech tools (CleverTap, Braze, Statsig, Insider). Core JTBD for lifecycle marketers — enabled by the Configuration Page with payload mapping.

**Data Sources**
Partners self-create catalog tiles with setup instructions. Displayed in both in-product Data Catalog and external Catalog. Eliminated manual ENG/CS onboarding support.

**Event Streaming**
Expanded portal beyond cohort sync to support real-time sync of user profiles, events, and event attributes — opened new use cases like real-time personalization and bidirectional sync.

**OAuth**
Rolled out in Phase III to replace API key auth for enterprise partners requiring delegated access — removed the credibility gap and unlocked larger accounts.

---

## Slide 11 — Thank You

*No content needed*
