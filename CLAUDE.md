# CLAUDE.md

This file is the entry point for Claude Code. Read this first on every conversation.

## Who I Am

I'm **Brandon Khoo**, a Product Manager building AI-powered products and writing about the future of agentic AI.

- **Portfolio:** [brandonkhoo-portfolio.vercel.app](https://brandonkhoo-portfolio.vercel.app)
- **Substack:** [agentgoose.substack.com](https://agentgoose.substack.com)
- **GitHub:** brandonckhoo/brandonkhoo-portfolio

## What This System Is

This is my personal PM operating system — a workspace where I track my work, synthesize research, and use Claude as a thinking partner. It coexists with my portfolio codebase (a Next.js app in `src/`).

1. Stay on top of my initiatives and tasks
2. Prepare for meetings with context at my fingertips
3. Turn scattered notes into actionable insights
4. Ship my portfolio and AI side projects faster

## Folder Structure

```
Portfolio/
├── CLAUDE.md              ← You are here. Start here every session.
├── GOALS.md               ← My identity, ownership areas, and quarterly goals
│
├── Tasks/
│   ├── active.md          ← Current sprint tasks
│   ├── backlog.md         ← Future ideas and upcoming work
│   └── archive/           ← Completed tasks by month
│
├── Projects/              ← Active initiatives, specs, decision logs
├── Workflows/             ← Repeatable processes (e.g. publish Substack post)
├── Meetings/
│   ├── 1on1s/             ← 1:1 notes
│   └── standups/          ← Daily standup notes
│
├── Knowledge/
│   ├── Reference/         ← PM frameworks, notes I return to
│   ├── Research/          ← Market research, competitor intel
│   └── People/            ← Notes on key people
│
├── Templates/             ← Reusable doc templates
├── Tools/                 ← Scripts and utilities
├── _Registry/             ← System docs (MCPs, Tags, Tools)
├── _temp/                 ← Scratch space / drop zone
│
├── docs/                  ← Portfolio research docs
└── src/                   ← Next.js portfolio codebase
```

## Key Commands

### `/standup`
Morning briefing. Claude will:
- Summarize what's on my plate today
- Surface blockers or upcoming deadlines
- Suggest priorities based on my goals

### `/weekly-update`
End-of-week reflection. Claude will:
- Review what shipped this week
- Update progress against quarterly goals
- Draft a weekly summary

### `/new-post`
Starting a new Substack article. Claude will:
- Help outline the piece based on my current thinking
- Connect it to existing Knowledge/ research
- Track it in Tasks/ backlog

### `/ship-check`
Before deploying portfolio changes. Claude will:
- Check that content in `src/content/site.ts` is up to date
- Confirm the change is committed and pushed to Vercel
- Flag any broken links or missing images

## How to Work With Me

**When I ask about a project:** Check `Projects/` first for specs and decision logs.

**When I'm preparing for a meeting:** Look in `Meetings/` for past notes.

**When I need to make a decision:** Reference `GOALS.md` for my priorities.

**For portfolio code changes:** The content source of truth is `src/content/site.ts`. Design tokens are in `src/styles/tokens.css`.

**When I'm stuck:** Ask me clarifying questions. I value being challenged.

## Portfolio Codebase Notes

- **Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Content:** All copy lives in `src/content/site.ts` — never hardcode content in components
- **Sections (page order):** Hero → FeaturedWork → SideProjects → ProductPrinciples → PhotoMosaic → Experience → Footer
- **Nav:** Home, Case Studies, AI Side Projects, Principles, How I Ship, Gallery, Blog, Resume, Substack
- **Deploy:** Push to `main` → auto-deploys on Vercel

## Context Files

When starting work, Claude should read:
- `GOALS.md` — What I'm optimizing for
- `Tasks/active.md` — What I'm doing right now
