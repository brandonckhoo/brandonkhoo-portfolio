# Skill: job-application

## Mission
Generate a "Why X Company?" response for job applications in Brandon's voice — conversational, direct, personal where relevant, backed by real market stats, and structured as three reasons.

## When to use
Use this skill when Brandon:
- Pastes a job description and asks "why do I want to join X?"
- Needs to answer the "why us?" question for a cover letter or interview
- Asks to generate job application talking points

## Inputs you need
1. The job description (required)
2. Any personal connection Brandon has to the company, mission, or problem (optional — ask if not provided)

If the personal connection is missing, proceed without it but flag that adding one would strengthen reason #1.

## Brandon's background (always relevant)

**Current role:** Product Lead, Ecosystem at Amplitude (Feb 2025 – Present)
- Launched unified User Profile increasing activation by 17% across key workflows
- Featured speaker at Twilio SIGNAL 2025 presenting to 200+ attendees on scaling personalization

**Previous roles at Amplitude (Mar 2022 – Jan 2025):**
- Product Lead, Session Replay: owned product vision and growth charter across two eng teams; launched AI replay summaries (reduced review time 50%); grew adoption 25% by embedding replay insights into Experiment results
- Senior PM, CDP: defined 1-year vision and roadmap driving 3.5x revenue increase ($6M to $21M); built AI-powered audience segmentation using LLMs and statistical clustering; improved engagement 20% for customers like HBO
- PM, CDP: launched Amplitude's Developer Portal (0 to 1), grew integration ecosystem from 40 to 130+ partners in one year; launched Amplitude Plus PLG bundle driving $3M incremental revenue

**Uber (Apr 2019 – Oct 2020):**
- Co-founded and launched Uber Moments (0 to 1 on UberEats), featured in Forbes, TechCrunch, Engadget
- Led A/B tests with CRM campaigns increasing courier retention 1.6%

**KPMG Brisbane (Jul 2016 – Apr 2019):**
- Senior Consultant; identified $100M+ cost saving initiatives for QLD Transport executives

**Education:** Bachelor of Electrical Engineering & Finance, QUT Brisbane. Dean's List, Golden Key Honor Award.

**Identity:** Australian citizen, based in Australia. Writes "Agent Goose" Substack on the future of AI agents.

**Tools:** Claude, Cursor, Vercel, Bolt, Figma, Magic Patterns, Salesforce, Jira, Loom, Confluence, Miro, Productboard, Discourse, DataDog, Braze, Intercom, Hubspot, Amazon S3, Snowflake, Userflow

**Interests (use sparingly for personal color):** Avid traveler (20 countries, hiked Falljokull — Europe's largest glacier in Iceland), Tennis, NBA, E-Sports (Dota 2, Starcraft 2), PADI certified open water diver, Motorbikes (Ninja 300, Ducati 899)

**Strongest talking points for most roles:**
- 0-to-1 builds with measurable outcomes (Developer Portal, Uber Moments, Amplitude Plus)
- AI product experience: LLM-powered segmentation, AI replay summaries, personalization engines
- Growth and experimentation: A/B testing, activation metrics, adoption growth, PLG
- Enterprise B2B SaaS at scale (Amplitude serves Fortune 500 customers)
- Cross-functional leadership across eng, design, data science, sales, and operations
- Australian roots + US tech experience (unique combination for AU roles)

## Output structure
Write three reasons in this exact style and format:

**Why [Company Name]?**
First, [mission/personal connection reason]. [1-2 sentences grounding this in something real — a personal story, a data point, or a specific observation about the company's impact.]

Second, [market/category reason]. [Include 1-2 real stats showing the category is growing or underpenetrated. Frame it as an opportunity, not just a fact. Highlight why now is the right time.]

Third, [skills/fit reason]. [Connect Brandon's specific background to what the role explicitly asks for. Reference the job description language. End with something like "so I think I could ramp quickly and add value."]

## Style rules
- Conversational, first-person, no corporate filler
- No bullet points inside the reasons
- Stats should feel woven in naturally, not bolted on
- Keep each reason to 2-4 sentences max
- No em dashes
- Sound like a smart person talking, not a cover letter template

## Process
1. Read the job description carefully — extract: company name, product focus, role level, key responsibilities, preferred qualifications
2. Search the web for 2-3 real, current stats on the company's market or category (use the country/region the role is based in if relevant)
3. Match the role's key requirements to Brandon's strongest talking points from the background section above
4. Write the three reasons following the output structure and style rules above
5. Offer to convert to cover letter paragraph or interview talking points

## Example output (reference — do not copy verbatim)
See the Hinge Health example for tone:

"First, the mission feels personal. My step dad has mobility issues in his back and neck, so I have seen firsthand how pain and limited movement can affect someone's independence and day to day life.

Second, I think this is a very compelling category because musculoskeletal care is a growing problem. Around 1.71B people globally live with musculoskeletal conditions, and that burden is expected to rise further with ageing populations and increasing obesity rates. That creates a real need for better, more scalable care models like Hinge Health.

Third, the role is a strong fit with my background. I have spent a lot of time working on growth, experimentation, activation, and improving user journeys, so I think I could ramp quickly and add value."
