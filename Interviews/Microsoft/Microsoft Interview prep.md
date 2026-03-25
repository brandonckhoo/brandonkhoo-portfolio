# Microsoft PM Interview Prep
**Role:** AI-powered product mockup feature (website builder)
**Type:** Take-home case study follow-up interview

---

## 1. Assumptions

**Primary users**
Small business owners, solo creators, and side hustle sellers using a website builder to sell simple physical goods (candles, skincare, ceramics, packaged products). Novice creators — not designers. Limited budget, time, and confidence in photography or editing.

**What they're trying to achieve**
Turn a basic product photo into a polished, trustworthy image they can confidently publish on their storefront. Goal: make the store look more credible, help customers understand the product faster, increase conversion. Use cases: product detail pages, homepage hero placements, collection tiles.

**What makes this hard today**
1. They often start with weak inputs — phone photos, inconsistent lighting, cluttered backgrounds, or only 1 usable angle
2. They don't know how to art direct an image — open-ended prompting or expert editing tools feel intimidating
3. The stakes are high — the image sits on a live storefront. If it looks fake, inconsistent, or unlike the real product, trust drops immediately

**Key assumptions**
- Users usually have 0–3 decent product photos, not a full studio shoot
- They care more about speed and trust than deep creative control
- They want AI to do the heavy lifting, not ask them to design from scratch
- They need guidance toward safe, publishable outputs rather than infinite flexibility

---

## 2. Outputs, Quality & Success Definition

**What does "good" look like?**

My point of view: **good means publishable with trust.**

A good mockup is not the most visually impressive image — it's the image a novice merchant feels confident putting live on their storefront. That means:
- The product still looks like the real item
- The setting feels believable
- The composition works for commerce
- The result feels consistent with the brand

If the image is beautiful but changes the product in a misleading way → not high quality. If it's creative but hard to use on a real product page → not high quality.

**Quality bar: "Would a merchant trust this enough to publish it?"**

**4 quality dimensions**

| Dimension | Definition |
|---|---|
| Product fidelity | Preserves the real product's key attributes — shape, proportions, packaging, label, color, material — so the merchant and shopper still recognize it as the same product |
| Commercial usability | Product remains the focal point and works in the intended placement (PDP, hero, collection tile) |
| Context realism | Setting feels believable and appropriate for the product — looks like a polished commerce image, not an AI experiment |
| Brand coherence | Matches the intended visual direction and feels consistent with the merchant's storefront |

Product fidelity and commercial usability are **hard gates** — if either fails, the image fails. Context realism and brand coherence matter, but only after trust is established.

**Evaluation rubric (1–5)**

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| Product fidelity | Clearly changed | Mostly similar with some drift | Clearly the same product |
| Commercial usability | Not usable | Usable with concerns | Ready to publish |
| Context realism | Unrealistic or distracting | Somewhat believable | Natural and credible |
| Brand coherence | Random or off-brand | Somewhat aligned | Clearly aligned |

**3 layers of evaluation**

| Layer | Purpose | Example |
|---|---|---|
| Human benchmark set | Create a fixed quality bar for v1 categories | Review real product photos and generated mockups using the rubric |
| Automated checks | Scale evaluation for measurable failure modes | Image similarity for product preservation, OCR for label preservation, subject visibility/crop checks, blur/resolution checks, moderation/safety |
| Production monitoring | Validate real-world value after launch | Track selection rate, regeneration rate, apply rate, publish rate, whether users later remove or replace the image |

**What does success look like?**

Success = users can get to a trustworthy, publishable result quickly and are willing to actually use it on their live storefront.

| Success area | What I'd look for |
|---|---|
| Workflow efficiency | Users get from upload to selected mockup quickly, with limited regeneration |
| Adoption | Users select generated mockups and apply them to their product pages |
| Real usage | Users publish the mockups live rather than just experimenting |
| Retention of value | Users keep the mockups live instead of replacing or removing them |
| Expanded usage | Users repeat the workflow across more products |

**Strongest signal:** Image published and stays live — that shows it cleared the real quality bar.

---

## 3. Experience & AI-Level Judgment

**Where should AI be opinionated vs. flexible?**

AI should be **opinionated** on:
- Whether the uploaded photo is good enough to use
- What type of product it is
- How to preserve important product details
- Which scene directions are most relevant
- How to frame the image based on where it will be used

AI should be **flexible** on:
- Intended placement
- Preferred style direction
- Whether the user wants 1 image or a full set
- Which generated option they prefer

Core principle: **AI handles the hard creative decisions; the user chooses from a small number of meaningful options.**

**Essential controls and defaults for novice users**

Controls: photo upload, quality check before generation, intended placement selection, curated style directions, compare view against original, apply to 1 image or all related images.

Defaults: product stays centered and clearly visible, scene is believable, number of options stays limited. Goal is not more control — it's the **right** control.

**What established creation patterns to avoid and why**

Avoid recreating expert workflows with AI layered on top:
- Photoshop-style editing panels
- Blank prompt box as the main entry point
- Chat-first art direction
- Too many camera, lighting, or composition controls
- Large uncurated galleries of outputs

These patterns are built for expert users and push too much complexity onto the novice. The right AI-first model for this audience is a **guided workflow**, not an infinite creative sandbox.

---

## 4. V1 Scope & Shaping Process

**How to get from broad idea → tightly scoped v1**

Start with the job to be done: *"Help a novice merchant publish a better product image on their storefront quickly."* That framing immediately pushes away from a general-purpose AI image tool toward a commerce workflow.

Identify the riskiest assumption: **Novice users will trust and use AI-generated mockups if the workflow is simple and the product remains visually accurate.** That means v1 should optimize for trust, ease, and publishability — not breadth.

Constrain both the product category and use case:
- **In scope for v1:** Simple physical goods with clear silhouettes and packaging — candles, skincare, jars, cosmetics
- **Out of scope for v1:** Apparel, furniture, reflective objects, bundles — too many edge cases and fidelity risk
- **Placements:** Product detail pages, homepage hero images, collection tiles

**Rough v1 experience**
1. User uploads a product photo
2. System checks whether it's good enough to use
3. User selects where the image will be used
4. AI offers a small set of relevant scene directions
5. User reviews a few generated outputs, compares with original
6. User applies chosen style to 1 image or all related images

**Outputs unlocked in v1**
- Turn a plain product photo into a polished in-context image
- Choose a direction that suits the storefront
- Create a more consistent product page
- Apply a similar look across a product's image set

**Key trade-off: guided scene selection vs. open prompt freedom**

Chose **guided scene selection** because:
- Reduces cognitive load
- Improves consistency
- Increases the odds of a usable result
- Makes quality easier to manage

Downside: less creative flexibility, less power user appeal. Right trade for v1 — the goal is not a flexible image generation playground, it's helping novice users get to a trustworthy, publishable result quickly.

**Process summary:** Job to be done → riskiest assumption → narrow category and use case → define the smallest end-to-end loop → make the trade-off explicit.

---

## 5. Follow-Up Questions

### 5A. Clarify

**What are you optimizing for in v1?**
Speed to a trustworthy, publishable result. Not maximum creative flexibility — helping a novice merchant go from a basic product photo to a storefront-ready image with as little friction and uncertainty as possible.

**What should be explicitly avoided in v1?**
Turning this into a mini design tool. No blank prompt-first workflow, no Photoshop-style editing panel, no broad support for complex product categories.

**What's your top risky assumption, and how would you validate it?**
That users will trust and publish AI-generated mockups if the product stays visually accurate and the workflow feels simple. Validate by measuring whether users actually select, apply, and publish generated images — and whether those images stay live.

**"Good" is subjective — how do you approach defining it?**
Define good as **publishable with trust**. That gives the team a concrete quality bar: preserves product fidelity, feels believable, works for commerce, fits the brand. If it looks impressive but fails any of those, it's not good enough.

**What user feedback are you expecting at v1 launch?**
1. Positive: saves time, makes the store look more professional
2. Trust-related: whether the product still looks accurate
3. Control requests: once users understand the core workflow

### 5B. Stress Test: Constraints, Failure Modes, Tradeoffs

**What if users only have bad phone photos?**
The system should catch that early — include a photo quality check before generation. If the photo is too dark, blurry, badly cropped, or missing important product details, guide the user to retake it rather than generate a misleading result from a weak input.

**What if outputs look inconsistent across multiple products?**
That signals the system needs stronger styling constraints. For v1, keep style directions curated and allow users to apply a selected style across related images. Over time, strengthen with brand-level presets.

**What if it takes ~30 seconds to generate?**
Acceptable only if the value feels worth the wait. Manage with clear progress feedback, a small number of high-quality outputs, and a workflow that keeps the user moving. If generation time becomes a major source of drop-off, speed becomes part of the product problem, not just an engineering detail.

**What if website visitors complain about AI images?**
Treat it as a trust signal, not just a support issue. Probably means outputs are drifting too far from the real product or looking too synthetic. Tighten fidelity standards, improve quality gates, bias the system more toward realistic enhancement than dramatic transformation.

### 5C. Deep Dive: Quality, Evals, Controls

**What if users ask for more control?**
Good sign if it comes after they're already getting value. Use progressive disclosure: start with a simple guided workflow, then add a small number of higher-leverage controls later (style intensity, crop preference) without exposing full manual editing complexity.

**What if users get overwhelmed?**
The experience is too open-ended. For this audience, constrain the workflow rather than give infinite options. Fewer, better choices — that's why curated directions and limited output sets beat prompt-heavy creation.

**Why not a chat UX?**
Chat asks users to know how to describe visual outcomes well. That works for power users, not novice merchants. A guided visual workflow is more predictable, lower friction, and better aligned with the job to be done.

**Is there another product with a UX you'd compare to?**
Products that succeed by simplifying creative workflows rather than exposing expert complexity. The comparison that matters: does it help users move from intent to usable output with low friction and high confidence?

### 5D. Scale & Boundaries

**A new image model comes out — how do you assess whether to use it?**
Don't switch based on demos alone. Test it against the existing quality bar: evaluate whether it improves product fidelity, commercial usability, realism, speed, and consistency on the benchmark set. If it looks more impressive but causes more drift or unpredictability → don't use it.

**This feature isn't unique — how would it be differentiated?**
Differentiation comes from workflow fit, not raw generation quality. Strongest differentiation: embed the feature directly into the merchant flow, use placement-aware generation, preserve product trust, and help users create consistent storefront imagery — not just single images. Makes it feel like a commerce product, not an AI demo.

**If users love it, what would you do next?**
Deepen the workflow rather than broaden too fast:
- Better consistency across a full product catalog
- Stronger brand-level styling
- Support for more product categories
- More reusable patterns across the storefront

Expand from single image generation → helping merchants create a **coherent visual merchandising system**.
