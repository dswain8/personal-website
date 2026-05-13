<!-- keywords: ingest, process video, process article, process transcript, process screenshot, youtube transcript, diff against my setup, adopt from, what should I adopt, claude tips, codex tips, AI workflow video -->
# External Ingest — Diff Any Source Against Debjeet's Setup

Take any external source (YouTube transcript, article URL, screenshot, PDF, pasted text) and produce a structured diff against Debjeet's current Claude + Codex setup. Output: a ranked list of techniques in the source, each tagged "already done," "worth adopting," "skip," or "needs research" — plus proposed implementation stubs for everything in "worth adopting."

Input: `$ARGUMENTS` — the source. One of:
- A YouTube URL (`youtube.com/watch?...` or `youtu.be/...`)
- An article URL
- An absolute path to a screenshot, PDF, or local file
- A pasted transcript (when the input is multi-line and not a URL or path)

If no input, ask once: "What source? (YouTube URL, article URL, file path, or paste the transcript)"

---

## Why this skill exists

Debjeet watches a lot of "how I use Claude / Codex / AI agents" content. The manual flow today:
1. Watch video → grab transcript from a transcript generator
2. Paste transcript into chat
3. Ask Claude to break it down into what's relevant
4. Identify what's not yet implemented
5. Pick what to adopt
6. Implement

That's six steps every time, and most of the value is in step 4 (the diff). This skill collapses it to one invocation. Same pattern for articles, screenshots, blog posts, conference slides — any external knowledge source.

Past examples this would have replaced: TeamOS adoption, token-consumption optimization, McPocock skills, Hamel's blog posts, "How I AI" YouTube series.

---

## Step 1 — Detect source type and extract content

| Pattern in `$ARGUMENTS` | Source type | How to extract |
|---|---|---|
| Contains `youtube.com/watch` or `youtu.be/` | YouTube | Try in order: (a) `yt-dlp --write-auto-sub --skip-download --sub-format vtt -o '/tmp/ingest-%(id)s' [URL]`, then read the `.vtt` file. (b) If yt-dlp fails or isn't installed, fall back to asking Debjeet to paste the transcript and re-run with the pasted text. Do not invent transcript content. |
| Other URL | Article | Use WebFetch with prompt: "Extract the main content of this article. Preserve headings, lists, and code blocks. Skip nav/ads/footer." |
| Absolute path ending `.png|.jpg|.jpeg|.webp` | Screenshot | Read with the Read tool (multimodal). Transcribe visible text and describe diagrams/screenshots of UI. |
| Absolute path ending `.pdf` | PDF | Read with the Read tool, pages 1–10 by default. If longer, ask Debjeet which pages matter. |
| Absolute path otherwise | Local file | Read with the Read tool. |
| Multi-line pasted text | Pasted transcript | Use as-is. |

Save the extracted content to `/tmp/ingest-source-[short-hash].md` for reference. Cite the source URL/path/hash in the final report.

If extraction fails, surface the failure with the specific error and stop. Do not proceed with partial content.

---

## Step 2 — Identify techniques in the source

Read the extracted content and enumerate every distinct **technique, pattern, skill, setting, hook, prompt, workflow, or configuration** mentioned. For each, capture:

- **Name** — what the speaker/author calls it
- **One-line description** — what it does
- **Domain** — claude-code / codex / mcp / hook / skill / settings / prompt-pattern / workflow / tool / model-routing / cache / other
- **Quoted evidence** — the exact phrase or sentence from the source (so Debjeet can verify)

Be exhaustive in this pass — over-enumerate. The next step filters. If you find yourself "summarizing" instead of enumerating, you're doing it wrong.

Output internally as a structured list. Do not show to Debjeet yet.

---

## Step 3 — Scan Debjeet's current setup

Read in parallel:

1. `~/.claude/skills/` — directory listing + each SKILL.md frontmatter
2. `~/.claude/commands/*.md` — file listing + first 20 lines of each (keywords + description)
3. `~/.codex/skills/` — directory listing
4. `~/.claude/settings.json` — hooks, env vars, permissions, status line
5. `~/.claude/settings.local.json` — local overrides
6. `~/.claude/CLAUDE.md` — global instructions (Debjeet's preferences)
7. `~/.claude/projects/-Users-dswain-github-rippling-main/memory/MEMORY.md` — memory index
8. `~/work/tools/` — manual tool inventory
9. `~/work/projects/personal-website/` (if accessible) — what's already publicized

Build a single in-memory inventory of "what Debjeet already has." Keyed by feature name + domain.

---

## Step 4 — Diff and categorize

For each technique from Step 2, tag with one of four labels:

| Label | When to apply |
|---|---|
| ✅ **Already done** | A skill, hook, setting, or workflow in Debjeet's setup matches the technique. Cite the file/skill name. |
| 🆕 **Worth adopting** | The technique fills a gap that fits Debjeet's stated workflow (Billing PM, Rippling backend reference, Slack-heavy comms, etc.) AND doesn't conflict with an existing setup choice. Propose a one-paragraph stub. |
| ⏭️ **Skip** | Doesn't fit Debjeet's role/stack OR conflicts with an existing choice (e.g. video advocates Cursor, Debjeet uses Claude Code + Codex). State the reason in one line. |
| 🔍 **Needs research** | Interesting but not enough info in the source to decide. State what Debjeet needs to check before deciding. |

Tagging rules:
- Default to **skip** for anything Debjeet has already explicitly rejected (check CLAUDE.md feedback memories, e.g. "no Rippling on personal Vercel")
- Default to **already done** when in doubt between that and "worth adopting" — favor the existing skill and surface the keyword/trigger gap instead
- **Worth adopting** is the highest-stakes label. Be conservative. If you wouldn't bet a Friday afternoon on it, it's "needs research" not "worth adopting"

---

## Step 5 — Score and rank "worth adopting"

For each adopt candidate, score 0–10 on:

| Dim | Measures |
|---|---|
| **Fit** | How closely does this match Debjeet's actual workflow? |
| **Effort** | Inverse — how cheap is it to implement? (10 = under 30 min, 0 = multi-day) |
| **Compounding** | Does this unlock future work, or is it a one-off improvement? |

Sort by total. Promote top 3 as "adopt now"; the rest land in "adopt later."

---

## Step 6 — Write the report

Save to `~/work/shared/ingest/YYYY-MM-DD-[source-slug].md`. Slug = first 3 words of video title / article title / file name, kebab-cased.

Structure:

```markdown
# Ingest report — [source title]

**Source:** [URL or absolute path]
**Type:** [youtube / article / screenshot / pdf / pasted]
**Date ingested:** [YYYY-MM-DD]
**Source content saved to:** /tmp/ingest-source-[hash].md

---

## TL;DR

[2–3 sentences. What this source is about. The single most interesting thing Debjeet should know.]

## Adopt now (top 3)

For each:

### [Technique name]
- **What it is:** [one-line]
- **Why it fits:** [one-line tied to Debjeet's workflow]
- **Where it lands:** [target file/skill, e.g. "new ~/.claude/commands/X.md" or "edit existing ~/.claude/settings.json"]
- **Proposed stub:**
  ```
  [Draft frontmatter + one-paragraph skill body, OR draft settings.json snippet, OR draft hook script]
  ```
- **Effort:** [estimate]
- **Score:** Fit N/10 · Effort N/10 · Compounding N/10 · Total N/30
- **Source evidence:** "[quoted phrase from source]"

## Adopt later

| Technique | Why later | Score |
|---|---|---|
[Concise table.]

## Already done ✅

| Technique from source | Existing implementation |
|---|---|
[Concise table — cite the existing skill or setting that already covers this.]

## Skip ⏭️

| Technique | Reason |
|---|---|

## Needs research 🔍

| Technique | What to check first |
|---|---|

---

## Suggested next action

[One sentence. Usually: "Pick one of the Adopt-now items and I'll invoke /write-a-skill to scaffold it."]
```

Output an absolute-path markdown link at the end so the report opens in the side panel.

---

## Step 7 — Hand off to action

After presenting the report:

1. Ask Debjeet which Adopt-now item to implement first. Default: "top 1."
2. For each chosen item:
   - If it's a new skill → invoke `/write-a-skill` with the stub as the starting brief
   - If it's a settings/hook edit → propose the diff and apply after approval (use the `/update-config` skill if available)
   - If it's a prompt pattern → save to `~/.claude/CLAUDE.md` or appropriate memory file
3. After implementation, note in the report which items got built (so the next ingest run sees them as "already done").

Do not auto-implement without explicit selection. The whole point is informed adoption, not accumulation.

---

## Rules

1. **One source per run.** If Debjeet pastes two URLs, ask which to process first. Mixing sources muddies the diff.
2. **Evidence is mandatory.** Every "Worth adopting" item must include a quoted phrase from the source. No paraphrases that lose the actual technique.
3. **Honor explicit rejections.** Memory entries like "no Rippling on personal Vercel" or stated preferences in CLAUDE.md override any "worth adopting" recommendation that conflicts.
4. **Don't recommend duplicates.** If the technique matches an existing skill ≥80%, tag it "already done" and surface the keyword/trigger gap as a separate suggestion.
5. **Don't manufacture interest.** If a video has nothing relevant for Debjeet's setup, the report can be three lines: "Nothing worth adopting. Speaker focuses on [X] which doesn't fit your stack because [Y]." That's a valid output.

---

## Anti-patterns (do not do)

- Summarize the source as if it's a book review — the output is a *diff*, not a recap
- Recommend everything as "worth adopting" — be conservative; most techniques don't fit
- Skip the "already done" section — it's how Debjeet validates the diff is actually grounded in his setup
- Invent technique names the source didn't use — quote the source's vocabulary
- Auto-implement without selection

---

## Example invocations

- `/ingest https://youtube.com/watch?v=abc123` (auto-extract transcript)
- `/ingest /Users/dswain/Downloads/anthropic-cookbook-screenshot.png`
- `/ingest https://hamel.dev/blog/posts/evals/`
- `/ingest` then paste a transcript block when prompted

---

## Notes

- yt-dlp install: `brew install yt-dlp` if not present. Surface this once if extraction fails on the first YouTube run; don't re-prompt on subsequent runs.
- For long sources (>30 min video, >5000 words article), Step 2 enumeration can balloon. Cap at the 20 most distinct techniques and note "[N more techniques omitted — re-run with focus area if needed]".
- This skill pairs with `/skill-discovery` — that one finds patterns in your *own* work; this one finds patterns in *others'* work. Together they cover both directions of skill growth.
