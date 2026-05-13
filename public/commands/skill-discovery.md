<!-- keywords: skill discovery, weekly skill scan, scan sessions, what skills should I build, discover skills, skill audit, find skill candidates -->
# Weekly Skill Discovery

Scan Debjeet's recent activity across Claude Code, Codex, memory, and git to surface candidate skills worth building. Runs every Friday (or on demand). Output: a ranked report of 1–5 candidate skills with evidence and a one-paragraph stub for each.

Input: `$ARGUMENTS` — optional window override (e.g. `--days 14` or `--since 2026-05-01`). Default window: last 7 days.

---

## Why this skill exists

Skills compound. The ones that get built are usually the ones the user notices manually — but most opportunities go unnoticed because the same prompt typed 4 times in a week feels like "just my workflow," not a missing skill. This scans the actual signal (sessions, commits, memory edits) and asks: what pattern would have saved you the most time if it had been a skill?

The goal is **1–3 high-conviction recommendations per week**, not a long backlog. Quality over quantity.

---

## Step 1 — Define the window

Default: last 7 calendar days ending today.

Override via `$ARGUMENTS`:
- `--days N` → last N days
- `--since YYYY-MM-DD` → from that date forward

Record the window in the report header.

---

## Step 2 — Gather inputs (run in parallel)

1. **Claude Code sessions** — `~/.claude/projects/*/`*.jsonl, filter by mtime in window. For each session, extract:
   - First user prompt (the trigger)
   - Skills invoked (look for `Skill(` calls or `/<slash-command>` patterns)
   - Tool call count (proxy for complexity)
   - Final outcome (if traceable)

2. **Codex sessions** — `~/.codex/sessions/YYYY/MM/DD/*.jsonl` in window. Same fields.

3. **Memory edits** — `~/.claude/projects/-Users-dswain-github-rippling-main/memory/*.md` with mtime in window. New `feedback_*` memories often signal a missing skill (the user had to correct the agent's approach more than once).

4. **Git commits** — across Debjeet's active repos (`~/github/rippling-main`, `~/github/rippling-webapp`, `~/github/postcard-desk`, `~/github/personal-website`, `~/github/prototyping-playground`). Author = Debjeet, since window start. Extract commit messages and changed files.

5. **TASKS.md log** — `~/work/TASKS.md` daily log entries in window. What was planned each day.

6. **Existing skill inventory** — list contents of `~/.claude/skills/`, `~/.claude/commands/*.md`, `~/.codex/skills/`. Needed to avoid recommending duplicates.

If any source is empty or unreadable, log it and continue — don't block on a single missing input.

---

## Step 3 — Detect patterns

Run these passes. Each yields candidate skill ideas; dedupe at the end.

### Pass A — Repeated prompts (frequency signal)
Group session-opening prompts by semantic similarity. If 3+ prompts in the window match the same intent (e.g. "write a weekly update," "review this draft," "find me a past session about X"), it's a strong signal that either (a) the existing skill isn't being auto-invoked, or (b) the skill doesn't exist yet.

For each cluster, check the existing skill inventory:
- Skill exists + was invoked → ✅ working as designed, no action
- Skill exists + was NOT invoked → ⚠️ keyword routing miss, fix the trigger keywords
- No skill exists → 🆕 candidate

### Pass B — High-iteration tasks (complexity signal)
Sessions with 20+ tool calls but no skill invocation. These are the "I just kept typing instructions" sessions. The 20+ tool calls suggest the user re-derived the same workflow steps from scratch.

For each, summarize the workflow in one sentence and ask: would crystallizing this as a skill have saved future runs?

### Pass C — Memory corrections (feedback signal)
New `feedback_*.md` memories in the window. Each one is a place where the agent's default behavior was wrong. If multiple corrections cluster around the same domain (e.g. 3 separate feedback memories about Slack delivery), that domain probably needs either an updated skill or a new one.

### Pass D — Manual flows in TASKS.md (recurring-work signal)
Look for daily-log entries that describe doing the same thing manually multiple times in the window (e.g. "processed YouTube transcript from McPocock", "ingested article on token optimization"). Recurring manual flows are the highest-ROI skill candidates because they replace work the user is *already* doing.

### Pass E — Skill-keyword-matcher misses
Read `~/.claude/skills/` and `~/.claude/commands/*.md` keyword headers. For each session-opening prompt in the window, check whether *any* skill's keywords should have matched but didn't. False negatives = trigger fix needed (not a new skill).

---

## Step 4 — Score candidates

For each candidate, score on three dimensions (0–10 each):

| Dim | What it measures | 10/10 |
|---|---|---|
| **Frequency** | How often the pattern fired in the window | 5+ times |
| **Time saved** | Estimated minutes per invocation × frequency | 60+ min/week reclaimed |
| **Generalizability** | Will this pattern keep recurring beyond the window? | Stable recurring workflow, not a one-off project |

Score floor: any candidate scoring < 6 on any dimension is dropped to honorable mentions, not promoted as a recommendation.

Sort by total score. Take top 1–5.

---

## Step 5 — Draft each candidate as a skill stub

For each top candidate, write a one-paragraph stub in this shape:

```markdown
### [Candidate name]

**Pattern observed:** [one sentence describing the recurring behavior]

**Evidence:**
- [date] — [session summary or commit message or memory note]
- [date] — [same]
- [date] — [same]

**Proposed skill description (1-line, would go in SKILL.md frontmatter):**
[Brief description of capability. Use when [specific triggers].]

**Approx scope:** [Small (under 30 lines) / Medium (30–100 lines) / Large (multi-file with scripts)]

**Replaces or extends:** [name of existing skill if applicable, or "new"]

**Score:** Frequency N/10 · Time saved N/10 · Generalizability N/10 · Total N/30
```

---

## Step 6 — Write the report

Save to `~/work/shared/skill-discovery/YYYY-MM-DD-skills.md`. Structure:

```markdown
# Skill Discovery — week of [YYYY-MM-DD]

**Window:** [start] → [end]
**Sessions scanned:** N Claude + M Codex
**Commits scanned:** N
**New memory edits:** N

## Top recommendations

[Top 1–3 candidates with full stubs from Step 5]

## Honorable mentions

- [name] — [one-line] — [why didn't make top 3]

## Trigger fixes (existing skills not firing)

- `/[skill]` — should have fired on [example prompt], didn't because [reason]. Proposed keyword add: `[keyword]`.

## Skip list (looked like candidates, weren't)

- [name] — [why this isn't worth building]

## Diff vs last week

[Compare to previous `~/work/shared/skill-discovery/` file. What's new, what dropped off, what got built since last scan.]
```

Output an absolute-path markdown link at the end so the report opens in the side panel.

---

## Step 7 — Hand off to action

After presenting the report:

1. Ask Debjeet which candidate(s) to build now. Default option: "build top 1, defer the rest."
2. For each chosen candidate, invoke `/write-a-skill` with the stub from Step 5 as the starting brief.
3. For each trigger fix, propose the keyword edit and apply once approved.

Do not auto-build skills without explicit selection. The point of weekly discovery is *informed* prioritization, not automatic accumulation.

---

## Rules

1. **One report per week.** If a report already exists for the current window, ask before overwriting.
2. **Evidence is mandatory.** Every candidate must cite at least 2 specific dated occurrences. No "I think the user might want X."
3. **Existing skills get the benefit of the doubt.** If a skill exists, suggest fixing its triggers before proposing a duplicate.
4. **Honor the floor.** Anything scoring < 6 on any dimension is honorable mention, not a recommendation.
5. **Keep it scannable.** The report is for skimming on a Friday afternoon — top recommendations in the first screen, everything else below.

---

## Cadence

- **Weekly (automatic):** schedule via `~/.claude/scheduled-tasks/` to fire every Friday at 16:00 local time. Output goes to `~/work/shared/skill-discovery/` and a one-line summary is appended to TASKS.md.
- **On-demand:** Debjeet can invoke `/skill-discovery` or say "scan my sessions for new skill ideas" any time.

---

## Anti-patterns (do not do)

- Recommend a skill based on a single occurrence — needs ≥ 2 dated cites
- Propose a duplicate of an existing skill instead of fixing its trigger keywords
- Generate a "top 10" list — the value is in the top 1–3, not a long backlog
- Skip the diff-vs-last-week section — it's how the user knows the system is learning
- Auto-build the recommended skill without Debjeet's selection
