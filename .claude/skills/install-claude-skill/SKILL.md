---
name: install-claude-skill
description: |
  Install a Claude Code skill from a GitHub repo into a specific project. Use when:
  (1) user asks to install a skill "for this project" or "on this project",
  (2) a skill was installed globally but isn't being recognized in the project,
  (3) installing a skill that includes a hook (UserPromptSubmit, etc.).
  Covers the difference between global (~/.claude/skills/) and project-level
  (.claude/skills/) skill installation, and how to wire hooks via settings.json.
author: Claude Code
version: 1.0.0
date: 2026-02-23
---

# Installing Claude Code Skills (Project-Level)

## Problem

Skills installed globally (`~/.claude/skills/`) are not automatically available
inside a specific project. A project only loads skills from its own `.claude/skills/`
directory. Cloning to the global location and expecting it to work in a project will
fail with "Unknown skill".

## Context / Trigger Conditions

- User asks to install a skill from GitHub for a specific project
- `/skill-name` returns "Unknown skill" after a global install
- Skill works in other sessions but not in the current project
- Skill includes a hook script that needs wiring

## Solution

### Basic skill (SKILL.md only)

```bash
# Clone to a temp location
git clone https://github.com/author/repo.git /tmp/skill-install

# Copy into the project
mkdir -p .claude/skills/skill-name
cp -r /tmp/skill-install .claude/skills/skill-name
```

### Skill with a hook (e.g. UserPromptSubmit)

```bash
# 1. Clone
git clone https://github.com/author/repo.git /tmp/skill-install

# 2. Copy skill files
cp -r /tmp/skill-install .claude/skills/skill-name

# 3. Copy and enable the hook script
mkdir -p .claude/hooks
cp /tmp/skill-install/scripts/activator.sh .claude/hooks/
chmod +x .claude/hooks/activator.sh
```

Then create or update `.claude/settings.json` with the hook:

```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/activator.sh"
          }
        ]
      }
    ]
  }
}
```

## Verification

After installation, the skill name should appear in the `system-reminder` skills list
at the top of the next prompt. You can also check:

```bash
ls .claude/skills/
```

## Notes

- `settings.local.json` is for per-user permissions (allow/deny tool calls). Hooks go in `settings.json`.
- If the project already has a `settings.json`, add the hooks key rather than overwriting.
- Global skills (`~/.claude/skills/`) work across all sessions but are not project-scoped.
- Project skills (`.claude/skills/`) are checked first, then global ones as fallback.
- To customize an installed skill (e.g. add a rule), edit `.claude/skills/skill-name/SKILL.md` directly.
