<!-- keywords: dojo moment, auto-coach, wiki coach, silent coaching, pm dojo protocol -->
# Dojo Moment — Auto-triggered PM coaching protocol

**This is not a slash command.** It's a protocol to paste into your `CLAUDE.md` so your AI assistant silently applies PM principles to every piece of writing you generate — and offers live coaching moments when it spots a teachable pattern.

Pairs with the [PM wiki](wiki-builder.md), [/spar](spar.md), [/review](draft-review.md), [/prep](meeting-prep.md), and [/debrief](meeting-debrief.md).

---

## What it does

During any PM task — drafting Slack, writing a spec, prepping a meeting — your AI silently consults the wiki and applies principles to its output (front-loading, cutting weak words, anti-sell framing, etc.).

When it spots a **significant** wiki-applicable pattern in YOUR writing (not its own), it offers a 3-choice inline mini-game:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚔️ DOJO MOMENT — [principle name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I spotted [specific pattern] in your [draft/plan/message].

[1] SPAR — Try rewriting it yourself. I'll score you. (60 sec)
[2] SHOW ME — I'll fix it and explain the principle.
[3] SKIP — Fix it silently, I'll save this for later.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Install

1. Make sure you have the wiki installed (see [install-dojo](install-dojo.md))
2. Copy the protocol below into your `~/.claude/CLAUDE.md` (or your project's `CLAUDE.md`)
3. Create `~/my-knowledge-base/progress/` if it doesn't exist

---

## The protocol (paste this into CLAUDE.md)

```markdown
## Dojo Moment Protocol

During ANY PM task (drafting Slack, writing a spec, prepping a meeting),
silently consult the relevant wiki article at ~/my-knowledge-base/wiki/
and apply the principles. When you spot a teachable moment in the user's
writing, offer a Dojo Moment.

### When to trigger

Trigger when you detect a significant wiki-applicable pattern:
- **Hedging / weak words** ("just wanted to", "maybe we could", "I think perhaps")
- **Buried lede** — the actual point is in paragraph 2 or 3
- **Missing recommendation** — problem stated without a proposed solution
- **No anti-sell** — recommending something without naming tradeoffs
- **Audience mismatch** — writing for yourself, not the reader
- **"What do you want me to do?" framing** — lazy delegation upward

Do NOT trigger for minor issues or every draft. Save it for moments where
the principle would genuinely change the outcome. Aim for at most 1–2
dojo moments per conversation, not per message — best-effort throttle,
not a hard limit the assistant can reliably track. When in doubt, skip
the visible dojo moment and apply the fix silently.

### The Dojo Moment format

Present this inline — between your analysis and your output:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚔️ DOJO MOMENT — [principle name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I spotted [specific pattern] in your [draft/plan/message].

[1] SPAR — Try rewriting it yourself. I'll score you. (60 sec)
[2] SHOW ME — I'll fix it and explain the principle.
[3] SKIP — Fix it silently, I'll save this for later.

(Reply with 1, 2, or 3. Reply "skip" to take the fixed version.)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### What each choice does

**[1] SPAR** — Inline mini-game:
- Show the problematic section
- Ask the user to rewrite it
- Score their rewrite on the relevant axis (Clarity/Strategy/Substance, 0-10)
- Show a model version with the principle applied
- Log to ~/my-knowledge-base/progress/sessions.jsonl

**[2] SHOW ME** — Teaching mode:
- Apply the fix
- Explain the principle in 2-3 sentences with the source
  (e.g., "This is the preamble pattern — Wes Kao's conciseness framework")
- Show before/after
- Log to ~/my-knowledge-base/progress/sessions.jsonl

**[3] SKIP** — Escape hatch:
- Apply the fix silently
- Save the moment to ~/my-knowledge-base/progress/backlog.jsonl
  so it can be replayed later via /spar backlog
- Do NOT lecture. Just fix and move on.

### Backlog entry format

{"date": "YYYY-MM-DD", "principle": "front-load-the-point", "context": "Slack draft to David about metered billing delay", "original_text": "Before I get into the details, I wanted to give some context...", "wiki_article": "communication-and-writing.md"}

### Silent application (no dojo moment needed)

For every PM task, ALWAYS silently apply wiki principles — even without
triggering a visible Dojo Moment:

- Slack drafts → auto-scan for weak words, auto-front-load the point
- Specs / PRDs → structure around decisions, not just information
- Status updates → proactive framing, solutions-oriented
- Escalations → issue → tried → propose structure
- Meeting prep → audience mapping, one-thing framing

The Dojo Moment is the FUN layer on top. Silent application is the
VALUE layer underneath. Both always run.
```

---

## Why this exists

A wiki is useless if it just sits there. Slash commands only fire when you
remember to type them. This protocol makes the wiki **ambient** — it
shapes every piece of writing your AI helps you with, and catches your
own bad patterns before they ship.

Three behaviors stack:
- **Silent:** Your AI's output is already better because it consulted the wiki.
- **Spotted:** When your writing has a teachable flaw, you get a live dojo option.
- **On-demand:** `/spar`, `/review`, `/prep`, `/debrief` for deliberate practice.
