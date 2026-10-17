<!-- keywords: review, review draft, review doc, review prd, review message, wiki review, pm review, check writing -->
# PM Dojo — Review Any Draft Against the Universal Rubric

Review any document, message, spec, prep doc, debrief, or written artifact. Returns specific, actionable feedback grounded in the universal rubric + (when applicable) a type-specific overlay + relevant wiki principles.

Input: $ARGUMENTS — the text to review, a file path, or "last" to review the most recent draft from this conversation.

---

## Step 1 — Detect output type

Classify what's being reviewed. This determines (a) which wiki articles to load and (b) which overlay to layer on top of the universal rubric.

| Output type | Wiki articles | Registered overlay |
|---|---|---|
| Slack message / email | `communication-and-writing.md`, `managing-up.md` (if to leadership) | — |
| PRD / spec | `product-strategy-and-execution.md`, `communication-and-writing.md`, `analytical-thinking.md` | `/spec` rubric (Layer 2) |
| Status update / weekly update | `managing-up.md`, `communication-and-writing.md` | — |
| Meeting prep / agenda | `meetings-and-real-time.md`, `influence-and-leadership.md` | — |
| Feedback / difficult message | `feedback-and-difficult-conversations.md`, `communication-and-writing.md` | — |
| Strategy doc / roadmap | `product-strategy-and-execution.md`, `analytical-thinking.md`, `influence-and-leadership.md` | — |
| Escalation / bad news | `feedback-and-difficult-conversations.md`, `managing-up.md` | — |
| Debrief / retro | `analytical-thinking.md`, `feedback-and-difficult-conversations.md` | — |
| Decision log entry | `analytical-thinking.md` | — |

If a type doesn't fit cleanly, ask Debjeet once. Don't guess.

---

## Step 2 — Load the universal rubric (mandatory)

Read `~/.claude/commands/rubrics/universal.md`. The seven universal criteria (U1–U7) + communication scan apply to **every** review, regardless of type.

If the detected type has a registered overlay, also load that. For PRD/spec, the overlay lives inside `~/.claude/commands/spec.md` under "Layer 2 — Spec overlay" (S1–S10).

Use the **Ship bars by output type** table in the universal file to determine the threshold for "Ship" vs "Revise" vs "Reject" for this specific output.

---

## Step 3 — Run the review

In this order:

1. **Communication scan** — weak words, preamble, throat-clearing close, signal-per-word, hedge stack (mechanical pre-check from the universal file)
2. **Score U1–U7** — 0–10 each, with one-line evidence per score
3. **Apply overlay** (if registered) — score overlay criteria 0–10 each
4. **Cross-check with wiki articles** — anything the rubric missed that the wiki principles catch (anti-sell, no-surprise rule, audience awareness — these often overlap with U-criteria but the wiki adds nuance)
5. **Compare to ship bar** for this output type

---

## Step 4 — Present the review

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚔️  DOJO REVIEW — [output type]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  VERDICT: [SHIP / REVISE / REJECT]
  Ship bar for this type: [from universal rubric table]

  ✅ What's working:
     • [specific praise tied to U-criterion or overlay criterion]

  📊 Universal spine:
     U1 Front-loaded         — N/10 — [one-line evidence]
     U2 Specific not vague   — N/10 — [one-line evidence]
     U3 Recommendation       — N/10 — [one-line evidence]
     U4 Audience-matched     — N/10 — [one-line evidence]
     U5 Tradeoffs named      — N/10 — [one-line evidence]
     U6 Assumptions surfaced — N/10 — [one-line evidence]
     U7 Actionable close     — N/10 — [one-line evidence]

  📊 Overlay ([type]): [or "none registered"]
     S1 ... — N/10 — [evidence]
     ...

  🔧 Fix these (top 2–3, ordered by impact):
     1. [specific issue, criterion #, principle source]
        → [concrete rewrite]
     2. ...

  ✂️ Cut these words/phrases:
     • Line N: "just wanted to" → delete
     • Line N: "I think maybe" → "I believe" or just state it

  Communication scan: [clean / N issues — listed above]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then show the rewritten version below with changes highlighted (for short outputs only — for specs, edit the source doc directly).

---

## Step 5 — Offer the dojo moment (optional)

If the draft had 2+ significant universal-criterion misses, offer:

```
Want to practice this? I can turn the weakest area into a quick spar round.
[Y]es — 60-second rewrite challenge | [N]o — just use the fixed version
```

If yes, run an inline Quick Draw using the original draft as the scenario.
If no, just provide the rewritten version.

---

## Rules

- **Universal spine is mandatory.** Every review scores U1–U7. The overlay is optional (only when registered). Don't skip the spine because the overlay also covers ground.
- **Be direct.** "This buries the lede (U1)" not "You might consider restructuring."
- **Every critique must have a fix.** Don't just point at problems.
- **Cite the criterion AND the wiki principle.** "U3 Recommendation missing — anti-sell framework (influence-and-leadership.md)."
- **Praise what's working** — name the U-criterion that scored 10/10 and why.
- **Don't over-review.** If it's already at the ship bar, say "This is sharp. Ship it." and stop. Don't manufacture findings.
- **For specs**, after presenting the review, hand control back to `/spec`'s iteration loop — don't try to edit the spec yourself.

---

## When overlays get added

New overlays get registered in `~/.claude/commands/rubrics/universal.md` only after a failure mode recurs across **two or more** runs for the same output type. If you notice a pattern recurring while reviewing, flag it to Debjeet — don't preemptively invent overlay criteria.
