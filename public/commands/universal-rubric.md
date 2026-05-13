<!-- keywords: rubric, universal rubric, review rubric, quality bar, output quality -->
# Universal Output Rubric (the spine)

The shared quality bar for any substantive product/work output — Slack drafts, specs, prep docs, debriefs, decision logs, weekly updates, briefs, escalations, status notes.

Skills that produce specific output types **inherit this spine** and add a thin overlay for type-specific failure modes (e.g. `/spec` adds spec-shape criteria like "tables with Why columns"). New overlays get added here when a pattern recurs across multiple runs.

---

## How to invoke

**Standalone** — `/review` on any output reads this file and applies the seven universal criteria + the communication scan. Default if no overlay matches the output type.

**Inherited** — a producing skill (`/spec`, `/prep`, `/weekly-update`, etc.) reads this file first, scores the universal criteria, then layers its own overlay criteria on top. Total score = universal criteria + overlay criteria.

The spine is **mandatory** in every layered run. Never skip universal criteria because an overlay also covers them — universal is the floor, overlay is the ceiling.

---

## The seven universal criteria

| # | Criterion | What 10/10 looks like | Common failure |
|---|---|---|---|
| U1 | **Front-loaded** | The actual point is in the first sentence. A reader who stops after sentence one knows what this is and what's being asked. | Buried lede — the point is in paragraph 2 or 3. Preamble. Context before claim. |
| U2 | **Specific, not vague** | Every claim has a number, name, date, file path, or other concrete anchor. No "significant", "a lot of", "soon", "various stakeholders". | Adjectival hedging. "Substantial improvement" without the number. "Soon" without the date. |
| U3 | **Recommendation present** | Every problem has a proposed action. If it's informational, the "so do X" is explicit. | "Here's the issue" with no "here's what I propose." Decision-less FYIs. |
| U4 | **Audience-matched** | Written for the reader's role, knowledge, and constraints — not for the writer's. Eng-level detail removed for execs; product-level abstraction removed for engineers. | Same artifact sent to everyone. PM-speak to engineers. Implementation detail to execs. |
| U5 | **Tradeoffs named (anti-sell)** | Costs, risks, second-order effects, and what we give up are surfaced honestly. The reader trusts the recommendation more, not less. | One-sided sell. "This is great because..." with no "the cost is...". Hidden downsides. |
| U6 | **Assumptions surfaced** | Load-bearing assumptions are named explicitly. Where relevant, each has a "we know it's true if X" falsification check. | "What would need to be true?" framing missing. Implicit assumptions the reader has to guess at. |
| U7 | **Actionable close** | Reader knows what to DO after reading — approve, decide, respond by date, no action needed. No throat-clearing filler. | "Let me know your thoughts." "Happy to discuss." "Does that make sense?" No clear ask. |

---

## Communication scan (mechanical pre-check)

Run this scan **before** scoring U1–U7. It catches the easy wins that don't need judgment.

- **Weak words** — grep for: `just`, `maybe`, `I think perhaps`, `sort of`, `kind of`, `it might be worth`, `wanted to`, `quick`, `wondering if`. Flag every instance and either delete or replace with the direct statement.
- **Preamble** — does the actual point arrive in sentence one, or after throat-clearing ("Before I get into the details...", "I wanted to give some context...")? Cut the preamble.
- **Throat-clearing close** — does it end with "let me know if you have any questions", "happy to discuss", "does that make sense?", "thoughts?", or similar filler? Replace with a specific ask or delete.
- **Signal-per-word** — could this be 30% shorter without losing information? If yes, cut.
- **Hedge stack** — multiple hedges in one sentence ("I think maybe we could perhaps") is a tell. Pick one position or none.

A communication scan failure on its own does not block ship if U1–U7 score 10/10 — but it almost always means at least one universal criterion isn't actually 10/10 yet.

---

## Scoring guidance

Each criterion: **0–10**.

- **10/10** — Fully meets, with specific evidence in the output itself
- **7–9** — Mostly meets but has a fixable gap → iterate
- **4–6** — Significant gap → iterate, possibly rewrite section
- **0–3** — Critical gap → rewrite that section before further review

### Ship bars by output type

Different outputs warrant different bars. The universal criteria don't change — the threshold for "ship" does.

| Output type | Universal bar | Notes |
|---|---|---|
| **Spec / PRD / strategy doc** | 10/10 on every universal + every overlay criterion | High-stakes, durable, handed to engineering or execs. No exceptions. |
| **Slack draft to manager / exec** | 10/10 on U1, U3, U7; ≥9/10 on rest | Front-load, recommend, close-action are non-negotiable for managing up. |
| **Slack draft to peer / team** | ≥8/10 average; no criterion <7/10 | Lower stakes; speed matters; don't over-polish casual messages. |
| **Prep doc / meeting brief** | 10/10 on U1, U4, U7; ≥8/10 on rest | The "what's the one thing" and "what do I want from this meeting" framing. |
| **Debrief / retro** | 10/10 on U2, U5, U6; ≥8/10 on rest | Specifics, tradeoffs honestly named, assumptions surfaced are the whole point. |
| **Decision log entry** | 10/10 on U2, U5, U6; ≥7/10 on rest | Future-readability hinges on specifics, tradeoffs, and assumptions. |
| **Weekly update / status note** | 10/10 on U1, U3, U7; ≥8/10 on rest | Justin Smith preferences: bottom-line first, blockers + asks, no fluff. |
| **Other / novel** | ≥8/10 average; no criterion <6/10 | Default bar. If this output type recurs, register an overlay. |

---

## Type overlays (registered as patterns recur)

Overlays add criteria on top of the universal spine. They live in this directory and get referenced by name from the producing skill.

| Output type | Overlay file | Owning skill |
|---|---|---|
| Spec / PRD | `spec-overlay.md` *(currently embedded in `/spec`)* | `/spec` |

**Rule for adding a new overlay:** create one only after a failure mode recurs across **two or more** runs for the same output type. Don't preemptively design overlays for hypothetical types.

When promoting an overlay from embedded (inside a skill file) to standalone (its own file in this directory), update the producing skill to reference it and add a row to the table above.

---

## Reviewer workflow (when invoked via `/review` or inherited by another skill)

1. **Detect output type** — read the artifact, classify it (Slack/spec/prep/debrief/etc.). If ambiguous, ask.
2. **Run the communication scan** — surface weak words, preamble, throat-clearing closes, signal-per-word gains.
3. **Score U1–U7** — 0–10 each, with one-line evidence per score.
4. **Apply overlay** — if a registered overlay exists for the detected type, layer its criteria on top.
5. **Compare to ship bar** — use the table above (or the overlay's bar, if stricter).
6. **Report** — verdict (Ship / Revise / Reject), per-criterion scores, top 2–3 specific fixes with concrete rewrites. Never just diagnose without prescribing.

---

## Why this rubric exists

A universal spine prevents two opposite failure modes:
- **Without it** — each output type drifts to its own rubric, and the same failure (buried lede, missing recommendation, vague language) gets caught in some skills but missed in others.
- **With only it** — a generic rubric can't catch type-specific failures (e.g. "this spec is really an engineering doc"; "this Slack draft has weak words"; "this prep doc has no one-thing framing"). The overlay system solves that.

The spine is the floor. Overlays are the ceiling. Both run, every time.
