<!-- keywords: install dojo, pm dojo setup, install pm brain, wiki setup -->
# Install the Full PM Dojo — Local setup guide

The [web app](https://app-two-omega-syz9qw9qo8.vercel.app) is just the arcade. The real system lives on your laptop, woven into every AI conversation you have.

This guide installs the full stack:
1. **Wiki brain** — 10 topic files, synthesized from 258+ PM sources
2. **Slash commands** — `/spar`, `/review`, `/prep`, `/debrief` for deliberate practice
3. **Dojo Moment protocol** — ambient coaching that fires on your own writing

Takes ~15 minutes.

---

## Prerequisites

- [Claude Code CLI](https://docs.claude.com/claude-code) installed (`npm install -g @anthropic-ai/claude-code`)
- A folder for your knowledge base (recommend `~/my-knowledge-base/`)

---

## Step 1 — Build your wiki (REQUIRED — do this first)

**The slash commands and Dojo Moment protocol both read from `~/my-knowledge-base/wiki/`. If you skip this step, every command will either error out or fall back to generic coaching — the "wiki-backed" layer is gone.**

Follow the [Wiki Builder guide](wiki-builder.md). The short version:

```bash
mkdir -p ~/my-knowledge-base/{raw,wiki,arena/scenarios,progress}
```

Drop your raw sources (podcast transcripts, blog posts, book notes) into `raw/`. Then point Claude at them with the synthesis prompt from the Wiki Builder guide.

Result: 8–12 topic files in `wiki/`, an `INDEX.md`, and an immutable `raw/` archive.

For a PM, the 10 topics I use: `communication-and-writing`, `managing-up`, `influence-and-leadership`, `meetings-and-real-time`, `feedback-and-difficult-conversations`, `analytical-thinking`, `product-strategy-and-execution`, `listening`, `ai-and-product-sense`, `self-development-and-mindset`.

---

## Step 2 — Install the slash commands

Download these four files into `~/.claude/commands/`:

```bash
mkdir -p ~/.claude/commands
cd ~/.claude/commands

# Download each command
curl -O https://debjeetswain.com/commands/spar.md
curl -O https://debjeetswain.com/commands/draft-review.md
curl -O https://debjeetswain.com/commands/meeting-prep.md
curl -O https://debjeetswain.com/commands/meeting-debrief.md

# Rename to match the slash trigger you want
mv draft-review.md review.md
mv meeting-prep.md prep.md
mv meeting-debrief.md debrief.md
```

Now in any Claude Code session:

- `/spar` — enter the sparring arena (Inbox Fire, Red Pen, First Principles, The Room)
- `/review [text or file]` — grade any draft against wiki principles
- `/prep [meeting]` — wiki-informed meeting prep with role-play
- `/debrief [what happened]` — post-meeting reflection with replay option

---

## Step 3 — Install the Dojo Moment protocol

This is the magic layer. It makes the wiki **ambient** — every Slack draft you write, every spec you outline, your AI silently consults the wiki AND flags your own bad patterns live.

Follow the [Dojo Moment guide](dojo-moment.md). Short version: paste the protocol block into `~/.claude/CLAUDE.md`.

After this, you don't need to remember to `/review` your own writing. The AI catches weak words, buried ledes, and missing tradeoffs automatically — and offers you three choices: spar, show me, or skip.

---

## Step 4 — Verify the install

Open any Claude Code session and:

1. Type `/spar` — you should see the arena menu (Inbox Fire, Red Pen, First Principles, The Room)
2. Paste a deliberately bad Slack draft (`"Hey, just wanted to maybe loop you in on something..."`) — the Dojo Moment should fire within your AI's first response
3. Run `/review` on any spec or doc — you should get scored feedback tied to wiki principles

If none of these fire, check:
- `~/.claude/commands/` contains the four `.md` files
- `~/my-knowledge-base/wiki/` has topic files
- `~/.claude/CLAUDE.md` contains the Dojo Moment Protocol block

---

## Step 5 — Optional: the practice web app

If you want a gamified practice surface with scored rounds, Trust/Effectiveness meters, and scenario replay:

- **Hosted:** [app-two-omega-syz9qw9qo8.vercel.app](https://app-two-omega-syz9qw9qo8.vercel.app) — free, rubric-based scoring out of the box. Optional: paste your own Anthropic key in Settings for AI scoring. The key stays in your browser; nothing is sent to my server.
- **Self-host:** fork [github.com/dswain8/pm-dojo](https://github.com/dswain8/pm-dojo) and deploy to your own Vercel. Same client-side BYO-key model — no server-side API key required or supported.

The web app is a deliberate-practice arcade. The real daily value is Steps 2 and 3 — the wiki ambient in every conversation you already have.

---

## How the pieces fit

```
┌─────────────────────────────────────────────────────────┐
│  ~/my-knowledge-base/                                   │
│    raw/          ← immutable sources                    │
│    wiki/         ← synthesized topic files              │
│    arena/        ← scenarios, scorecards                │
│    progress/     ← session log, backlog                 │
└─────────────────────────────────────────────────────────┘
                        │
          ┌─────────────┼──────────────┐
          ▼             ▼              ▼
   ~/.claude/       CLAUDE.md       Practice app
   commands/        Dojo Moment     (optional)
   /spar /review    Protocol         Arcade for
   /prep /debrief   (ambient)        deliberate reps
   (on-demand)
```

The wiki is the brain. The commands are muscle memory. The protocol is reflex.

Questions? Ping me.
