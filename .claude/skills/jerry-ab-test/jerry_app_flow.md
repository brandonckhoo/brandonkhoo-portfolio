# Jerry.ai App Flow — UI Reference
*Updated March 2026 — verified from Brandon's firsthand screenshots of the full signup flow.*
*Use this file to generate specific, grounded hypotheses when the skill is invoked.*

---

## FULL QUOTE FUNNEL (actual, as observed from screenshots)

The funnel is labeled "5 steps" initially but resets to "4 steps" after phone verification — account creation happens mid-funnel, not at the end.

### Pre-funnel — Landing Page
- jerry.ai homepage: "Make confident decisions about your car and home"
- CTA: "Get started" → leads to signup flow

### Select Services (pre-step, no step counter shown)
- "Which services are you interested in?" (choose all that apply)
- Options: **Insurance Shopping** *(MOST POPULAR, pre-checked)*, Car Maintenance Reminders, Drive Well Save More
- DataLock™ trust badge shown at bottom

### Step 1/5 — About You (8 sub-screens)

| Sub-step | Screen | What happens | Friction notes |
|---|---|---|---|
| 1a | **Current insurance status** | "Do you currently have a car insurance policy?" Yes (active policy) / No (uninsured) | First insurance question. Helper: "Insurers often ask for proof of previous policy." |
| 1b | **Living situation** | Rent apt/home / Live with family or friends / Own home (title in name) / Own home (title not in name) / Own mobile home | Helper: "If homeowner, we may require additional verification." |
| 1c | **Bundle upsell interstitial** | "Bundle for potential savings: combine your car and renters insurance." Yes / Skip for now | **Cross-sell before the user has seen any quote or savings estimate. Still fully pre-value.** |
| 1d | **Driving record** | "How many tickets or violations in the last 7 years?" None / 1–2 / 3–4 / 5+ / I don't remember | May trigger fear that honesty leads to higher prices. |
| 1e | **Credit range** | Less than 550 / 550–659 / 660–750 / More than 750 / I am not sure | "We don't run a credit check or hard pull." Heavy legal copy below despite no hard pull. |
| 1f | **Full name** | Text field — "as it appears on your driver's license." Social proof: 5M+ customers, spam-free promise. | First account commitment screen — user is committing before seeing any insurance value. |
| 1g | **Phone number** | "Let's confirm your phone number. No calls. 100% guaranteed!" 128-bit encryption badge. | **Account creation gate — phone required before any quote info collected.** |
| 1h | **OTP verification** | 4-digit SMS code. Dense legal consent: TCPA automated messages, arbitration + class waiver, ESIGN consent, Do-Not-Call disclaimer. | **Worst moment for legal wall — user hasn't answered a single insurance question yet. Account fully created here.** |

### Step 2/5 → resets to Step 2/4 — Account
*(Step counter resets from 5→4 after OTP verification)*

| Sub-step | Screen | What happens | Friction notes |
|---|---|---|---|
| 2a | **Date of birth** | "Welcome back, [Name]" — enter DOB to verify account. MM / DD / YYYY fields. | Low friction in isolation, but this is the 9th screen before any insurance profile is collected. |

### Step 2/4 — Personal Info

| Sub-step | Screen | What happens | Friction notes |
|---|---|---|---|
| 2b | **Living info review** | Pre-filled address + homeownership. "Review your information for your quotes." CTA: "Looks good." | Low friction — data pulled from records. User mostly confirms. |

### Step 3/4 — Cars

| Sub-step | Screen | What happens | Friction notes |
|---|---|---|---|
| 3a | **Vehicle review** | Pre-filled car(s) from DMV/prior policy data. Shows: make/model, daily miles, commute use, rideshare/business use. Can edit, remove, or add cars. | Low friction — pre-populated. User confirms. |
| 3b | **Car usage modal** | Per vehicle: commute (yes/no), rideshare/food delivery/business (toggles), daily miles (10–75+). "People typically drive 35 miles/day on average." | Low friction. |

### Step 4/4 — Drivers

| Sub-step | Screen | What happens | Friction notes |
|---|---|---|---|
| 4a | **Driver review** | Pre-filled household members (from DMV records). Name, covered status, marital status, age, gender, license status. Edit/remove/add. Legal warning: "Failure to list all household members age 14+ could result in claim denial or policy cancellation." | **Legal threat CTA at a late step — anxiety-inducing.** |

### Post-form — Quote Generation

| Step | Screen | What happens | Friction notes |
|---|---|---|---|
| Loading | **Quote search** | "We are searching for the best prices." ~30 seconds. Shows insurer logo progress bars (Progressive, etc.). "9 insurers checked." Value props shown while waiting. | Good trust-building moment while waiting. |
| Result | **Quotes ready** | "YOUR QUOTES ARE READY." Starting price (e.g. $24/mo), yearly savings (e.g. $750 saved), 24 companies checked. QR code to download Jerry app. "Everything's saved. Just log in to see your quotes." | **Web users must download the app to view full quotes. QR code is web-only friction — app-native users skip this entirely.** |

---

## CRITICAL STRUCTURAL INSIGHT

**Account creation (sub-steps 1f–1h + 2a) is a full gate before the user has entered a single insurance-related field.**

The actual sequence:
1. Service selection
2. Current insurance status ← first insurance question
3. Living situation
4. Bundle cross-sell
5. Driving record
6. Credit range
7. **Full name** ← account starts here
8. **Phone number** ← account gate
9. **OTP + legal consent** ← account fully created, TCPA/ESIGN wall
10. **Date of birth** ← account verified
11. *Then* pre-filled profile review begins

This means:
- Users must enter name, phone, OTP, and DOB across 4 screens before reaching the pre-filled profile review
- The OTP legal wall (TCPA arbitration waiver, ESIGN consent, Do-Not-Call disclaimer) appears BEFORE the user has seen any quote or savings estimate
- The step counter resets mid-flow (5→4), which may feel disorienting to users

This is the biggest structural friction point in the funnel.

---

## POST-SIGNUP IN-APP SCREENS

### Home Tab
- **PriceProtect** feature: Latest quotes shown ($151/mo), Reshopping Alerts (on/off), "Get new quotes" tab
- **DriveShield** section: Driving score (? = no score yet), 200 points
- **Family tracking** card (invite Shellena)
- **GarageGuard** section (to-dos)
- Nav: Home / Shop / Garage / Drive / Inbox / Account

### Shop Tab (PriceProtect)
- Shows existing quotes: "$151/mo — Insurance quotes are ready"
- Tabs: Shop now / Reshopping alerts
- "Start a new quote": Car / Home / Renters / Motorcycle tiles

### Garage Tab (GarageGuard)
- Car tools: Recalls, Glovebox (3 docs), Car value, Estimate repair costs, Diagnose car issues, Find a trusted shop, Maintenance schedule
- To-dos: "Upload registration to glovebox" for 2024 Mercedes Benz

### Drive Tab (DriveShield)
- Tabs: Driving / Family / Points
- No score yet ("Start driving! Nice, trip tracking is ON.")
- Weekly challenges (4 days left): Spin the wheel (+100 pts), Test your knowledge (+75 pts)
- "Set your own goal" section

### Account Tab
- Policies & Billing, Payment Methods, Documents
- Personal Information, Notification Settings
- Driving Safety, Learning Hub
- FAQ, Report Technical Problem, Legal
- Log out

---

## KEY HYPOTHESES TO GENERATE FROM THIS FLOW

When the skill is invoked and the question is about quote completion or onboarding drop-off, use these grounded hypotheses:

### HIGH PRIORITY — most likely to drive drop-off

1. **Full account creation gate before any insurance questions (Steps 2–4)**
   - Users must enter name, phone, OTP, and DOB before they've answered a single insurance question or seen any savings estimate
   - This is the largest pre-value commitment in the funnel — 4 screens of personal/account data before any signal of what Jerry will offer
   - Hypothesis: Defer phone verification to post-profile or post-quote. Collect name + insurance profile first, then gate account creation at the point of saving quotes or binding
   - Metric: Profile start rate, profile completion rate, quote reach rate
   - **Note: Any change to OTP timing requires legal sign-off — TCPA and ESIGN consent timing is regulated**

2. **Dense OTP legal consent copy (Step 3)**
   - Arbitration waiver, ESIGN consent, Do-Not-Call disclaimer all appear at the phone verification screen — step 3, before the user has entered any insurance information
   - This is the worst possible moment: the user doesn't yet know if Jerry can help them
   - Hypothesis: Collapse non-essential legal copy into a "By continuing you agree to our Terms" link with a modal for full detail. Keep only the minimum required consent inline.
   - Metric: Phone verification completion rate, time-on-screen at OTP step

3. **Web → App handoff gap (Step 10 — web entry only)**
   - The web flow ends with a QR code requiring app download to view full quotes
   - Users who start inside the app skip this entirely — no QR code, quotes shown directly
   - The QR code handoff is specific to web-originated users; mixing web + app users in analysis will obscure the true drop-off rate
   - Hypothesis: Test SMSing a deep link to quotes (leveraging the phone number collected at step 3) vs. QR code only for web users
   - Metric: App install rate / quote view rate within 24hrs of flow completion (web segment only)

4. **Credit range + tickets/violations in same step (Step 5)**
   - Two sensitive questions (credit range and violations history) appear in the same step, post-account-creation
   - Credit range screen has heavy legal copy even though no hard pull is done; "No hard pull" messaging may be below the fold
   - Tickets/violations may trigger fear that honesty leads to higher prices
   - Hypothesis (credit): Pin "No hard pull. Won't affect your credit score." as a persistent banner above the credit range options
   - Hypothesis (violations): Add a helper showing that violations have limited impact on Jerry's comparison, or reorder to show violations after credit range
   - Metric: Step 5 completion rate, sub-screen abandonment by field in Metabase

5. **Cross-sell before first quote (Step 6)**
   - Bundle renters insurance prompt appears after account creation and profile but before the user has seen any quote or savings estimate
   - User still has zero evidence Jerry can save them money — asking them to consider a second product at this moment adds decision complexity
   - Hypothesis: Move bundle cross-sell to post-quotes page (after savings estimate is shown) or post-bind
   - Metric: Quote reach rate, bundle attach rate (ensure deferral doesn't hurt attach)

### MEDIUM PRIORITY

6. **Drivers legal threat CTA (Step 9)**
   - "Failure to do so could result in claim denial or policy cancellation" is a strong anxiety trigger at a late step
   - Hypothesis: Replace threat language with trust language ("We want to make sure everyone in your household is protected")
   - Metric: Driver step completion rate, support ticket rate

7. **Post-quote inaction on home screen**
   - Home shows "$151/mo — View quotes" but no urgency signal
   - Hypothesis: Add time-limited "Your quotes expire in 7 days" or savings comparison nudge
   - Metric: Quote view rate within 24hrs of app install, policy bind rate D7

### LOWER PRIORITY (partially addressed by current design)

8. **Savings anchor** — Quotes page already shows "$750 yearly savings" prominently. Test is whether users reach it — many may not, due to account creation friction and web QR code handoff above.

9. **Trust signals** — DataLock™, 4.7 stars, 5M+ customers, 128-bit encryption are present throughout the flow. Likely already optimized.

---

## POST-SIGNUP ENGAGEMENT HYPOTHESES

(For questions about D7/D30 retention, cross-sell, or DriveShield activation)

- **DriveShield activation**: Users who opted in see "NO SCORE" and "Start driving!" — no clear first action. Hypothesis: Show a first-trip challenge with immediate reward to trigger first session
- **Glovebox to-do**: "Upload registration" to-do is shown but passive. Hypothesis: Prompt with push notification tied to a reward (e.g., "+50 points for completing your glovebox")
- **Cross-sell from Garage**: GarageGuard features (recalls, repair costs) are buried in the Garage tab. Hypothesis: Surface a personalized alert (e.g., recall found for 2024 Mercedes) on the Home screen to drive Garage engagement

---

## TRUST / BRAND SIGNALS OBSERVED

- **DataLock™** — Appears on nearly every screen. "Jerry protects your data. We'll ask your permission before sharing it with insurers."
- **"No calls. 100% guaranteed!"** — Prominent on phone entry screen
- **"No hard pull"** — On credit range screen
- **128-bit encryption** — Bottom of phone entry screen
- **Partner carriers**: Progressive, Clearcover, GEICO, Root, Dairyland, Allstate, Nationwide, Bristol West, National General, Safeco, Aspire, Bluefire, Mercury Insurance, The General
- **Social proof stats**: 4.7/5 (22k reviews), 5M+ active customers, $950M+ savings found, 1100K policies sold
