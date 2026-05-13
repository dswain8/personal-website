<!-- keywords: spec, prd, requirements, feature spec, product requirements, write spec, write prd, requirements doc, user stories, acceptance criteria -->
# Write a Feature Spec / PRD (with rubric-gated handoff)

Write a structured product requirements document that is genuinely ready to hand to engineering. The flow is **question gate → write → internal review → Codex review → rubric scoring → iterate to 10/10 → ask Debjeet to manual-review**.

Input: $ARGUMENTS — describe the feature, problem statement, or paste existing notes/Slack threads.

---

## CRITICAL — Do not skip steps

This skill is gated. You must:
1. Ask clarifying questions FIRST and wait for answers. Do not write a single line of spec until Debjeet has answered.
2. After writing, run `/review` (internal) — automatically, no need to ask permission.
3. Then run Codex CLI review — automatically, no need to ask permission.
4. Score the spec against the rubric below.
5. Iterate (edit the spec) until **every rubric criterion scores 10/10**.
6. Only escalate to Debjeet if you are stuck on a specific item that requires his input. State the specific question — never escalate vaguely.
7. Only present for manual review once 10/10 is achieved.

Auto mode does not skip the question gate. Even in auto mode, ASK before writing. The whole point of this skill is that the question gate prevents bad specs.

---

## Step 1 — Question gate (mandatory, before any writing)

Ask 4–6 focused questions tailored to the input. Always cover these dimensions:

1. **Primary user + use case** — who is this for, what's the one job they're trying to do
2. **Core capability** — what does the thing actually do (chat / action / extraction / etc.)
3. **System context** — which exact codebase/module/product surface this lives in (e.g. "the new CLM at `app/monetization_platform/cpq_clm/`")
4. **Builder profile + constraint** — who's building (intern, senior eng, team), what's the hard constraint (timeline, headcount, budget)
5. **Bar for "shipped"** — internal demo, design partner, GA, etc.
6. **Anything weird** — known constraints, political sensitivities, prior failed attempts, ongoing related work

Skip a dimension only if the input already answers it unambiguously. Never skip the bar-for-shipped question — it's the most common scope-creep vector.

Ask in plain prose (the AskUserQuestion tool is available but a numbered list in chat works fine for Debjeet).

**Wait for answers.** Do not proceed to Step 2 until Debjeet replies.

---

## Step 2 — Write the spec

Save to `~/work/projects/[project-slug]/YYYY-MM-DD-spec.md` (preferred for multi-week scope) or `~/work/specs/YYYY-MM-DD-[slug].md` (one-pager).

Use this structure. Every section is mandatory.

```markdown
# [Feature Name]

**Status:** Draft (rev N)
**Author:** Debjeet Swain
**Date:** [today's date]
**Mentors:** [names — if intern project]
**Post-launch owners (if successful):** [names — pre-declare, don't leave as Open Q]
**Stakeholders:** [manager, eng lead, design partner — anyone else affected]
**Timeline:** [duration, with builder type]
**Bar to clear:** [internal demo / design partner / GA — be specific]

---

## Problem Statement
[1–2 paragraphs. Front-load the actual pain with a number. Then state the thesis crisply.]

## Goals (outcomes, not deliverables)
| # | Outcome | Target |
|---|---|---|
| 1 | [measurable user outcome] | [number] |

## Non-Goals
| Out of scope | Why |
|---|---|
[Aggressive list. Should be at least as long as Goals for tight-scope projects. Pre-answer anything that would otherwise be an Open Question about scope.]

## Primary Use Case
[One concrete story. Include sample input and expected output.]

## Agent Behavior / Product Behavior (the product contract)
[**For AI agents / flexible products:** define capability via tables, NOT a "lock everything" guardrail list. Three sub-tables:]

### P0/P1 capability support matrix
| Capability | P0 — create/do | P0 — clarify/refuse | P1 |
|---|---|---|---|
[Every capability the user might attempt. Mark which phase handles it. Forces you to be honest about overpromising.]

### Per-field default policy (for create flows)
| Field | If user specifies | If user doesn't | Single-turn? |
|---|---|---|---|
[Single-turn semantics: if a safe default exists, fill it and surface the assumption. If not, ask before creating. This distinguishes "clarify before create" from "iterate after create."]

### Always refuse
| Situation | Behavior |
|---|---|
[Out-of-catalog requests, multi-X requests when X must be 1, legal/policy work, etc.]

## User Stories
- As a [user], I want to [action] so that [outcome].

## Requirements (all tables, all have "Why" rationale columns)

### P0 — must ship
| # | Requirement | Why P0 |
|---|---|---|

### P1 — stretch
| # | Requirement | Why later (not P0) |
|---|---|---|

### P2 — explicitly cut
| # | Requirement | Why cut |
|---|---|---|

## Key Assumptions
| # | Assumption | Validated if | Falsified if | Owner | Deadline |
[Load-bearing only. Each has an explicit falsification check, owner, and week. If invalidated, escalate immediately.]

## Open Questions (PRD-level — for the author/approver only)
| # | Question | Why it matters | Owner | Deadline |
[Real product decisions. NOT logistics like "who's the mentor" or "who owns post-launch" — those go in the header. NOT contradictions that should just be answered — answer them in Non-Goals instead.]

## Success Metrics

### What "shipped" means (binary, demo)
[Pass/fail criteria. Be specific about test vs real customer use.]

### Leading indicators (post-demo)
| Indicator | Target |

### What we're explicitly NOT measuring
[Revenue, win rate, etc. — anti-attribution clarity.]

## Kill Criteria
| When | Condition |
[Specific triggers to stop investment. By week.]

## Risks & Mitigations
| Risk | Likelihood | Mitigation |

## Demo Data Scope (if applicable — for AI/agent specs)
[**Separate from agent capability.** What seed data the demo exercises. Which dimensions are real P0 constraints (refuse outside) vs demo-only seeds (agent should still handle).]

---

## Implementation Notes (engineering appendix)
[**Everything code-grounded goes here, not in the body.** File:line citations, field name mappings, auth model gotchas, silent-skip surprises, draft URL TODOs, etc. The body reads as a product spec; this appendix is the engineering reality the intern/eng needs.]

### [Code entry point] — what to call, what NOT to call
[Function paths, citations, "do not call X because Y" gotchas]

### Field name mapping (agent-friendly → backend DTO)
| Friendly | DTO field | Citation |

### Silent-failure gotchas
[Things that fail silently without exceptions. Cite line numbers.]

### Week-1 Technical Plan — N artifacts, sign-off before week 2
| # | Artifact | Why |
[Concrete deliverables. Schemas, spike results, surface decisions, fixtures, eval-set v0.]
```

---

## Step 3 — Internal review (automatic)

Invoke `/review` against the saved spec. Apply all findings as edits to the spec, not as commentary. Bump rev number in the Status line.

---

## Step 4 — Codex review (automatic, code-grounded)

Run Codex CLI to get a code-grounded second opinion:

```bash
codex exec --skip-git-repo-check "Review the PRD/spec at [absolute path] as if you were a senior engineering manager about to hand this to [builder type]. Product context: [1-line product context]. Read the actual codebase at [relevant paths] before responding.

Be direct and opinionated. Identify:
1. Anything technically unrealistic for the timeline given the builder
2. Missing scope guardrails that will cause scope creep
3. Gaps in engineering handoff — what would you push back on?
4. Things that look fine but will bite during implementation
5. Anything overly conservative that could be tightened

Output as structured review: VERDICT (Ship / Revise / Reject), then numbered findings with severity (BLOCKER / MAJOR / MINOR) and a concrete fix for each. Under 600 words."
```

Run with timeout 180000 (3 min). When complete, read the output and apply every BLOCKER and MAJOR finding as edits. Apply MINORs unless they would expand scope.

If Codex's review surfaces an actual code reality that contradicts the spec (e.g., "the API you're naming doesn't exist, but `save_quote_with_lines` does"), trust Codex — it just read the code.

---

## Step 5 — Rubric scoring (mandatory)

Score the spec against **two layers**: the universal spine (applies to any output) + the spec overlay (spec/PRD-specific). **Ship bar is 10/10 on every criterion in both layers.** Anything less, iterate.

### Layer 1 — Universal spine (mandatory)

Read and apply `~/.claude/commands/rubrics/universal.md`. Score all seven universal criteria (U1–U7) and run the communication scan. The universal file is authoritative; do not duplicate its criteria here.

For specs, the ship bar from the universal rubric is **10/10 on every universal criterion** (see the "Ship bars by output type" table in the universal file).

### Layer 2 — Spec overlay (spec/PRD-specific failure modes)

These criteria are not in the universal spine — they catch failure modes specific to product specs. Score each 0–10.

| # | Criterion | What 10/10 looks like |
|---|---|---|
| S1 | **Product spec, not engineering spec** | Body reads as product behaviors, user stories, outcomes. All code-grounded content (file:line citations, field maps, auth gotchas, silent-skip bugs, redirect_url TODOs, week-1 plan) lives in a clearly-labeled "Implementation Notes (engineering appendix)" section after the product body. **The cutting question: would a PM peer who doesn't know the code understand this spec? If no → it's an engineering spec.** |
| S2 | **Outcome goals, not output goals** | Every goal is a measurable user outcome with a target number. "Ship feature X" is an output, not a goal. |
| S3 | **Non-goals aggressive** | Non-goals list is at least as long as goals. Pre-answers anything that would otherwise be an Open Question about scope (e.g., "no customer demos in rev-0"). |
| S4 | **Scope guardrails right-sized** | Hard constraints listed for product/country/currency/segment. For AI/flexible products: capability matrix (P0 create / P0 clarify-refuse / P1) replaces a "lock everything" table — agent capability and demo seed data are explicitly separated. No "TBD" or "engineering picks" on anything load-bearing. |
| S5 | **Tool/API contracts real** | Every external dependency points to a real code path, endpoint, or DTO. Cited in the **Implementation Notes appendix**, not the body. Silent-failure gotchas (e.g. "service silently skips lines lacking ext_ref_id at quote_service.py:189") explicitly called out. If unknown, named as a Week-1 spike with an owner. No fictional APIs. |
| S6 | **Binary success metrics + kill criteria** | Demo metrics are pass/fail. Kill criteria specify week + threshold. No aspirational metrics ("good adoption"). What we're NOT measuring is explicit. |
| S7 | **Engineering handoff complete** | Week-1 deliverable artifacts named in the appendix. Schemas defined or scheduled. Field name maps (friendly → DTO) tabled. Auth-model gotchas surfaced. No "engineering decides later" on anything load-bearing. |
| S8 | **Realism for builder + timeline** | Scope matches the named builder profile (intern vs senior) and the named timeline. Aggressive but not impossible. Sanity-checked by Codex against actual code. |
| S9 | **Requirements are tables with "Why" rationale** | P0/P1/P2 are tables (not bullet lists). Each row has a "Why P0 / Why later / Why cut" column. Forces explicit justification per item; surfaces overstuffed P0 lists. |
| S10 | **Open Questions are PRD-level, not logistics** | Only decisions the author/approver must make remain. Internal staffing (who's mentor, who owns post-launch) lives in the header, pre-declared. Contradictions inside the spec (e.g. "is customer demo OK?") are answered in Non-Goals, not left open. |

### How to score

For each criterion (U1–U7 + S1–S10):
- 10/10 — Fully meets, with specific evidence cited in the spec
- 7–9 — Mostly meets but has a fixable gap → iterate
- 4–6 — Significant gap → iterate, possibly rewrite section
- 0–3 — Critical gap → rewrite that section

Present the combined rubric (universal + overlay) to Debjeet with the score for each criterion and what was fixed in this iteration. Use this format:

```
Universal spine:
  U1 Front-loaded — 10/10 — [evidence]
  U2 Specific not vague — 10/10 — [evidence]
  ...

Spec overlay:
  S1 Product spec not engineering spec — 10/10 — [evidence]
  S2 Outcome goals — 10/10 — [evidence]
  ...

Communication scan: clean / [list of remaining weak words]
```

---

## Step 6 — Iterate until 10/10 (Codex re-review every loop, no exceptions)

If any criterion is < 10/10:
1. Edit the spec to close the gap (do not write a separate analysis — edit the source doc directly)
2. **Re-run Codex review (Step 4) on the edited spec.** Every iteration. No skipping. The whole point of Codex is code-grounded validation — and rubric-driven edits are exactly the kind of changes that can drift from code reality. If you find yourself thinking "this iteration is small enough to skip Codex," you are wrong. Run it.
3. Apply any new BLOCKER/MAJOR findings from Codex
4. Re-score against the rubric
5. If still < 10/10 after **3 iterations on the same criterion**, you are stuck — escalate (see Step 7)

Bump the rev number on the Status line every time you edit. The rev number must equal the number of Codex reviews completed.

Do not show Debjeet partial scores. Only show the rubric when you've finished iterating (either at 10/10 or stuck).

**Anti-corner-cutting rule:** Never declare 10/10 on a revision that hasn't been Codex-reviewed. If the last Codex pass was on rev N and the current spec is rev N+1, you are not done — run Codex on N+1 before scoring.

---

## Step 7 — Escalation (only if stuck)

You may only escalate to Debjeet during iteration if you hit a question that **only he can answer**. Examples of valid escalations:
- "I need to know which product family to lock in Scope Guardrails — this is a strategy call, not a research question."
- "The Codex review surfaced a fundamental architectural conflict between [X] and [Y]. Which way should I scope?"
- "The timeline doesn't fit the requirements after 3 iterations. We either cut [A] or extend to [B weeks]. Which?"

Examples of **invalid** escalations:
- "I'm not sure about the wording" → fix it yourself
- "The non-goals could be longer" → make it longer yourself
- "Codex flagged 9 things and I'm overwhelmed" → work through them one at a time

When escalating, state:
1. The specific criterion you're stuck on (rubric # and name)
2. What you tried (one sentence)
3. The exact question or decision you need from Debjeet
4. Optionally, your default if he doesn't reply

---

## Step 8 — Present for manual review

Once every rubric criterion scores 10/10, present:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  📋 SPEC READY FOR YOUR REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  [Absolute markdown link to the spec — open in side panel]

  Iterations: N (started at avg score X.X/10, ended at 10/10)

  Major changes vs initial draft:
  • [bullet]
  • [bullet]
  • [bullet]

  Rubric scorecard (final): all 10/10
  [table]

  Where I'd want you to push back:
  • [the 1–2 most subjective calls I made]

  Ready for your manual review.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then wait for Debjeet's feedback. Do not auto-share anywhere (Confluence, Slack, Jira). Sharing is a separate, explicit ask.

---

## Notes on tone

- This is internal artifact production, not customer comms. No need for the slack-style trace marker.
- Be brutal in the rubric scoring. A 10/10 is rare on first pass. If everything scored 10/10 on the first internal review, you scored too softly — recheck against the wiki principles (`product-strategy-and-execution.md`, `communication-and-writing.md`, `analytical-thinking.md`).
- The Codex review will often surface things the internal review missed, because Codex actually reads the code. Trust code-grounded findings over aesthetic feedback.

## Notes on auto mode

Auto mode lets you skip permission for /review and Codex invocations. It does **not** let you skip the question gate. Always wait for human answers before writing.

## Why this skill exists

Specs handed to engineering without rubric gating produce: scope creep, fake API contracts, ambiguous handoff, no kill criteria, and Week-1 surprises that blow the timeline. The rubric exists to catch those before they reach engineering, not after.

---

## Lessons baked in from prior runs (read before writing)

These are real failure modes that triggered explicit Debjeet pushback. The rubric now catches them, but call them out *while writing*, not in iteration #5:

1. **"Is this a product spec or an engineering spec?"** — The single most cutting critique. If you find yourself citing `file.py:line` in the body, **stop**. Move it to Implementation Notes. The body is product behaviors. Citations belong in the appendix.

2. **Over-constrained AI agents look incompetent.** Locking down "monthly only, ≤2 line items, no amendments, 0–20% discount" makes the agent look like it can't handle real input. The right framing: agent capability is broad; demo seed data is narrow; per-field defaults handle the gap. Use the capability matrix + per-field default policy, not a "lock everything" guardrail table.

3. **"Single-turn" is ambiguous without explicit semantics.** If the agent "proposes defaults and asks the user to confirm," that's multi-turn. Define: happy-path = one round trip with assumptions surfaced; one pre-create clarification is allowed for genuinely ambiguous inputs (account/product); post-create chat edits are P1. Anything else creates a contradiction.

4. **Requirements as bullet lists are not consumable.** Convert P0/P1/P2 to tables with explicit "Why P0 / Why later / Why cut" columns. Forces justification per item and surfaces overstuffed P0 lists immediately.

5. **Open Questions are not a dumping ground.** "Who's the mentor?" is logistics — answer it in the header. "Should we demo to real customers?" is a contradiction — answer it in Non-Goals. Only real PRD decisions for the author/approver belong in Open Questions.

6. **Names matter, and voice-input mangles them.** When the user gives stakeholder names verbally, never invent confident-sounding versions. Ask once, confirm spellings, and capture them in the header — not buried in an open question.

7. **Codex re-review every iteration. No exceptions.** Even tiny edits can introduce contradictions (stale "Open Question #5" reference, "no state carryover" wording that fights an allowed clarification turn). The rev number must equal the count of Codex reviews. Cutting this corner gets caught.
