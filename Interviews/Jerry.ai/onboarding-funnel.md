# Jerry.ai Insurance Signup Funnel

Documented from firsthand walkthrough (screenshots taken 2026-03-19).

---

## Pre-funnel — Landing Page
- URL: jerry.ai
- Headline: "Make confident decisions about your car and home"
- Subline: "From insurance to repairs, driver safety and more."
- Primary CTA: "Get started" → leads to signup flow
- Nav: Services, Insurance, Repairs, Resources, Reviews, About | Log in / Sign up

---

## Select Services (pre-step)
- "Which services are you interested in? Choose all that apply"
- Options:
  - **Insurance Shopping** *(MOST POPULAR)* ✓ pre-checked
  - Car Maintenance Reminders
  - Drive Well, Save More
- CTA: Continue
- DataLock™ trust badge shown at bottom

---

## Step 1/5 — About You

### 1. Current insurance status
- "Do you currently have a car insurance policy?"
- Options: "Yes, I have an active insurance policy" / "No, I am not insured"
- Helper text: "Insurers often ask for proof of your previous policy when you buy a new one."
- Social proof below: ★4.7 · 22k Reviews · 5M+ Active customers · $950M+ Savings found

### 2. Living situation
- "What best describes your living situation?"
- Options:
  - I rent an apt or home
  - I live with my family or friends
  - I own a home & my name is on the title
  - I own a home but the title is not in my name
  - I own a mobile home
- Helper: "If you indicate homeowner, we may require additional verification."

### 3. Bundle upsell interstitial
- "Bundle for potential savings: combine your car and renters insurance"
- Bullet points: free/fast quotes, starts at $8/mo, no commitment required
- Fine print: "25% of Jerry renters customers paid $8/mo or less in past 12 months"
- CTAs: "Yes, show me bundle options" / "Skip for now"

### 4. Driving record
- "How many tickets or violations in the last 7 years?"
- Applies to all drivers covered by the policy
- Options: None / 1 to 2 / 3 to 4 / 5 or more / I don't remember
- What counts: DUI, speeding, didn't stop at stop sign, failure to yield
- What doesn't count: Parking tickets

### 5. Credit range
- "What is your credit range?"
- "We don't run a credit check or hard pull, so this will not impact your credit score."
- Options: Less than 550 / 550–659 / 660–750 / More than 750 / I am not sure
- Fine print: partners may obtain credit-based insurance score where permitted by law

### 6. Full name
- "What is your full name?"
- "Over 5 million customers shop with Jerry — create your spam-free account and start saving today."
- Helper: "Enter your full name (First Middle Last) as it appears on your driver's license."

### 7. Phone number
- "Let's confirm your phone number"
- "We use your phone number to create your account so you can review your saved quotes anytime. No calls. 100% guaranteed!"
- 128-bit encryption badge

### 8. OTP verification
- "Enter the 4 digit confirmation code below"
- Sent via SMS, options to resend or call
- ToS / ESIGN consent shown here (arbitration + class waiver)

---

## Step 2/5 → Step 2/4 — Account
*(Step counter resets after phone verification — account is created mid-funnel)*

### 9. Date of birth
- "Welcome back, [Name]"
- "Please enter your date of birth to verify your account"
- MM / DD / YYYY fields

---

## Step 2/4 — Personal Info

### 10. Review living info
- "Review your information for your quotes"
- Pre-filled: Address + Homeownership status (pulled from records)
- Editable inline
- CTA: "Looks good"

---

## Step 3/4 — Cars

### 11. Vehicle review
- Lists pre-filled cars (pulled from DMV/prior policy data)
- Each car shows: make/model, daily miles, commute use, rideshare/delivery use
- Can edit or remove cars, add more

### 12. Car usage modal (per vehicle)
- "Is it used to commute to work or school?" (No / Yes)
- "Is this car used for any of the following?" (Rideshare, Food delivery, Business — toggles)
- "On average, how many miles do you drive per day?" (10, 15, 20, 25, 30, 35, 40, 45, 50, 75+)
- Reference: "People typically drive 35 miles per day on average"

---

## Step 4/4 — Drivers

### 13. Driver review
- "Let's make sure we have the right people"
- Pre-filled list of household members (from DMV/records), each showing: name, coverage status, marital status, age, gender, license status
- Can edit each driver or add more
- Warning: "Please list all household members age 14 or older… Failure to do so could result in claim denial or policy cancellation."
- CTAs: "I have included all drivers" / "I need to add another driver"

---

## Post-form — Quote Generation

### 14. Loading screen
- "We are searching for the best prices"
- Shows insurer logos with progress bars (e.g. Progressive)
- "30 seconds or faster" · "9 Insurers checked"
- Value props shown while waiting: customized coverages, shop every 6 months, cancel old policy, track car value, recalls, repair costs

### 15. Quotes ready
- "YOUR QUOTES ARE READY"
- Shows: starting price (e.g. $24/mo), yearly savings estimate (e.g. $750), # of companies checked (24)
- QR code to download the Jerry app
- "Everything's saved. Just log in to see your quotes." — pushes to mobile app, NOT web purchase
- "It only takes ~1 minute" to sign in on app

---

## Key Observations

1. **Account creation happens mid-funnel** — phone + OTP verification at step 1/5 end, not at the end of the flow. Step counter resets from 5→4 after this.
2. **Heavy pre-fill** — Jerry pulls car make/model, spouse/household info, and address from DMV and credit bureau data. User mostly confirms, not inputs.
3. **Final CTA is app download, not web purchase** — quotes shown on web, but actual policy purchase happens in the mobile app.
4. **Trust signals throughout** — DataLock™ badge, "no spam calls guaranteed", "no hard credit pull", 128-bit encryption, 4.7★ / 22k reviews — all placed at high-anxiety moments.
5. **Bundle upsell inserted early** — renters insurance offer appears before driving record or credit, when user intent is highest.
