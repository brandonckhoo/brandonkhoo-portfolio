# MCPs

Model Context Protocol servers configured for this workspace.
Config lives in `.claude/settings.json` under `mcpServers`.

---

## Configured MCPs

### GitHub
- **Purpose:** Read/write repos, issues, PRs, code search
- **Package:** `@github/github-mcp-server`
- **Setup:**
  1. Go to https://github.com/settings/tokens → Generate new token (classic)
  2. Scopes: `repo`, `read:org`, `read:user`
  3. Add token to `.claude/settings.json` → `mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN`

### Notion
- **Purpose:** Read/write Notion pages and databases
- **Transport:** HTTP (hosted by Notion — no token management needed)
- **Setup:** Run `claude mcp add --transport http notion https://mcp.notion.com/mcp` → authenticates via browser
- **Status:** ✅ Connected (stored in `~/.claude.json` global config)

### Linear
- **Purpose:** Read/write issues, projects, and cycles in Linear
- **Transport:** HTTP (OAuth via Linear)
- **Setup:** Run `claude mcp add --transport http linear https://mcp.linear.app/sse` → authenticates via browser
- **Status:** ✅ Connected (stored in `~/.claude.json` global config)

### Slack
- **Purpose:** Read channels, send messages, search Slack
- **Package:** `@modelcontextprotocol/server-slack`
- **Setup:**
  1. Go to https://api.slack.com/apps → Create New App → From scratch
  2. Add OAuth scopes: `channels:read`, `channels:history`, `chat:write`, `users:read`
  3. Install app to workspace → copy Bot User OAuth Token
  4. Add to `.claude/settings.json`:
     - `SLACK_BOT_TOKEN` → the `xoxb-...` token
     - `SLACK_TEAM_ID` → your workspace ID (from Slack URL: `app.slack.com/client/TXXXXXXX`)

---

## Verifying MCPs Work

After adding your tokens, restart Claude Code. Run:
```
/mcp
```
to see connected servers. A green dot = connected.

---

## Common Issues

- **"Cannot find module"** — Run `npm install -g <package>` globally first
- **"Unauthorized"** — Token is wrong or expired, regenerate it
- **Notion pages not found** — Make sure you've shared the page with your integration
