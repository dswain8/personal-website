---
name: prd-review
description: Review a PRD, spec, or product two-pager against Debjeet's billing/CPQ-tailored checklist and apply learned patterns from past reviews. Use when the user shares a PRD, spec, two-pager, or asks for a "review" of a product doc. Saves input + output to ~/work/projects/_reviews/ and self-improves via learner.md.
---

# PRD Review Skill

Run this skill when the user shares a PRD, spec, or product two-pager and wants a review. It applies Debjeet's billing/CPQ-specific checklist + accumulated learnings from past reviews.

## How to run a review

1. **Identify the doc.** It may be a file path, pasted text, or a Google Doc/Confluence link. If a link, fetch and read the content first.

2. **Slug the review.** Pick a short slug from the doc title (e.g., `metered-billing-prorations`). Today's date is in the system context.

3. **Create the review folder:**
   ```
   ~/work/projects/_reviews/YYYY-MM-DD-<slug>/
   ├── input.md          ← original doc as provided
   ├── checklist.md      ← snapshot of checklist used (frozen for traceability)
   ├── output.md         ← your review with comments
   └── user-edited.md    ← (created later when user edits/corrects you)
   ```

4. **Read these files before reviewing:**
   - `~/.claude/skills/prd-review/checklist.md` — the master checklist
   - `~/.claude/skills/prd-review/learner.md` — patterns Debjeet has corrected before. Treat these as STRONG priors. If a past correction applies, apply it without being told again.

5. **Produce `output.md`** in this format:
   ```markdown
   # Review: <doc title>
   _Reviewed YYYY-MM-DD against checklist v<N>_

   ## Verdict
   <One sentence: ship as-is / ship with changes / not ready, and why.>

   ## Top 3 issues (in priority order)
   1. **<short label>** — <one-line problem>
      - Where: <quote a 1-line anchor from the doc>
      - Why it matters: <1 sentence>
      - Fix: <concrete suggestion>

   ## Checklist results
   <For each checklist item: ✅ pass / ⚠ partial / ❌ fail / N/A. One line each.>

   ## Inline comments
   <Anchored quotes from the doc, each with a 1-2 line comment. Group related comments.>
   ```

6. **Tone:** Direct, concrete, billing/CPQ-literate. Don't hedge. Cite Rippling-specific surfaces (multi-EIN, prorations, RQL, Z-Objects, BSC, CPQ state machine, RevRec) where relevant. No generic SaaS platitudes.

## The learner loop (run on EVERY invocation, before reviewing)

Before producing today's review, look for `user-edited.md` files in past review folders that don't yet have a `learned.flag` file:

```
for folder in ~/work/projects/_reviews/*/; do
  if [ -f "$folder/user-edited.md" ] && [ ! -f "$folder/learned.flag" ]; then
    # diff output.md vs user-edited.md, extract patterns
  fi
done
```

For each unprocessed user-edited review:
1. Read `output.md` (what you produced) and `user-edited.md` (what Debjeet kept/changed).
2. Identify patterns: comments he REMOVED (false positives), comments he REWROTE (your framing was wrong), comments he ADDED (you missed a category).
3. Append to `~/.claude/skills/prd-review/learner.md` in this format:
   ```
   ## YYYY-MM-DD — <slug>
   - **Missed:** <category> — Debjeet added "<his comment>". Lesson: <generalizable rule>.
   - **Wrong frame:** <your original> → <his version>. Lesson: <what to learn>.
   - **False positive:** <comment he removed>. Lesson: <when not to flag this>.
   ```
4. Touch `learned.flag` in that folder so it's not re-processed.

## Checklist update prompt (after every learner update)

After updating `learner.md`, count occurrences of each `Lesson:` theme. If any single theme appears **5+ times across distinct reviews**, surface a recommendation to Debjeet:

> 🔔 **Checklist update suggested.** I've seen this pattern 5+ times: "<theme>". Want me to add it to the master checklist? Here's the proposed addition: `<draft line>`. Reply yes to apply.

Do NOT modify `checklist.md` without explicit approval.

## What this skill is NOT

- Not a research tool. Don't go fetch market data, competitor analysis, or customer quotes unless the user explicitly asks.
- Not a writing tool. Don't rewrite the PRD — comment on it.
- Not a green-light. Default verdict is "ship with changes" unless the doc is genuinely tight.
