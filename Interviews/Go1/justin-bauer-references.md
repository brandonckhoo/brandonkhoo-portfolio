# Justin Bauer Writing References

## Article 1: "Growing into AI Builders" (Feb 25, 2026)
Co-authored with Sandhya Hegde. Amplitude x Reforge partnership announcement.

**Key ideas:**
- Two new skills for AI PMs: AI Sense and Evaluation
- AI Sense = understanding agent mechanics, jagged frontier, UX design, performance tradeoffs
- Evaluation = the craft of defining and improving quality in probabilistic systems
- "AI PRDs are no longer documents but living prototypes with quality metrics and datasets attached"
- Managing a probabilistic system with deterministic tools breaks down

**Style:** Short punchy sentences. Active voice. Talks directly to the reader. Grounds claims with concrete examples (Cursor's Tab Accept Rate, Sierra's simulation process). Blunt when needed.

---

## Article 2: "Building an AI Product Flywheel" (Jan 24, 2026)
Co-authored with Sandhya Hegde. How to systematically improve enterprise agents after launch.

**Key ideas:**
- Most enterprise AI agent launches go stagnant after ship — the outlier teams build a flywheel
- New north star metric: Agent Success Rate (composite of user feedback, actions, semantic analysis)
- Agents deliver work, not workflows — old north star metrics don't translate
- Trace Analysis is the new source of truth — traces feed debugging, UX research, and roadmap
- Five flywheel components:
  1. Agent Success Rate — composite north star
  2. Trace Analysis — sample traces by user intent, code error modes, prioritise improvements
  3. Reference Datasets — user intent mapping, golden outputs, edge cases
  4. Offline Evals — unit tests for agents; essential for context engineering iteration
  5. User Monitoring and Feedback — real-world logging, semantic analysis, support tickets

**Relevance to Go1:**
- The Go1 recommendation system is essentially an agent delivering work (course recommendations)
- Phase 1 labelling infrastructure = building the reference datasets and monitoring layer
- Phase 3 XGBoost model = offline eval improvement loop
- Arize/LangSmith = the user monitoring and trace analysis layer
- "Agent Success Rate" maps directly to recommendation acceptance rate + completion rate

**Key quote:** "This is why most enterprise agent launches end up stagnant, while the outlier teams seem to get better every week."
