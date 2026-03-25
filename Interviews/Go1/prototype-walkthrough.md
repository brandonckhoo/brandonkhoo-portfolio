# Go1 Intelligence Layer — Prototype Walkthrough

## Overview

A Go1 learner homepage experience showing what the product looks like once the intelligence layer is live. The persona is Sarah, an Account Executive in Voice AI Sales with a compliance deadline and active learning goals. She arrives from a Morgan Slack message and navigates through recommendations, explainability, feedback, and goal management in one continuous flow. The prototype is not a collection of screens but a single discovery journey demonstrating how the intelligence layer makes decisions visible, explainable, and improvable.

---

## User Journey

### 1. The right learning finds her

So this is Sarah. She is an Account Executive in Voice AI Sales, she is busy, and she has not opened Go1 this week. But on Monday morning, Morgan sends her a message in Slack. There is a compliance deadline in 14 days, and the right course is already there waiting for her. She did not search for it. She did not ask an admin to assign it. The system found her.

That is the product shift I want to highlight. The burden of relevance moves from the user to the system.

### 2. The system makes its judgment visible

When Sarah clicks through, she lands on a recommendation card. What matters is that it does not look like a generic content tile. It immediately gives her context. She sees a label that says "Recommended for your role." That seems small, but it matters. It tells her this is not random content being pushed into her feed. It is a deliberate recommendation based on who she is and what she needs.

### 3. The system explains why

Then she taps "Why this?" — and this is where trust starts to get built. The system explains itself in plain language. Her role has a compliance deadline in 14 days. People in similar roles complete this course at a 91% rate voluntarily, not just because it was assigned. And the course was updated 6 months ago, so the content is still current.

She can immediately understand why this recommendation appeared and why it is relevant now. That is important, because with proactive learning, a weak recommendation does not just get ignored. It chips away at trust. If we want proactive recommendations to work, the system has to show its reasoning.

### 4. The system learns from the miss

Now let's say Sarah dismisses it. Maybe the timing is wrong. Maybe she has already done something similar elsewhere. Maybe it is a good recommendation in theory, but not useful right now.

In most systems, that feedback just disappears. Here, it becomes learning data. A reason selector appears, Sarah chooses why she dismissed it, and that signal goes back into the ranking model. The system learns from the miss, not just the hit.

That is a critical design choice, because it turns recommendations from a one-way output into a feedback loop.

### 5. The loop closes automatically

Then the loop closes. Two weeks later, Sarah completes the course. It is logged as user-initiated rather than admin-assigned. Her compliance status updates automatically. Morgan surfaces the next recommendation.

The important point is that no admin had to manually curate any of it. The system identified the need, explained the recommendation, learned from feedback, and adapted the next step. That is what Go1 looks like when the intelligence layer is working.
