---
name: daci-draft
description: Draft a decision doc (DACI-style) from a Slack thread, conversation context, or a freeform problem statement. Pulls stakeholder profiles from ~/work/knowledge/people/ to tailor the framing. Saves to ~/work/shared/decisions/YYYY-MM-DD-<slug>.md. Use when Debjeet says "draft a DACI", "write a decision doc", "we need to capture this decision", or shares a thread that contains a product decision needing formal capture. NOT for retrospective decision logs — those are auto-captured by the decision-capture loop.
---

# DACI Draft Skill

Produce a publish-ready first draft of a product decision doc. The goal is to take Debjeet from "I have a decision brewing" to "here's a draft I can edit and ship" in one round.

## Inputs (how the skill is invoked)

The skill should handle any of:
1. **Slack thread link** — fetch the thread, read all messages, identify the decision being debated.
2. **Freeform description** — Debjeet describes the situation in chat.
3. **Existing doc / spec link** — extract the decision point.
4. **Conversation context** — if Debjeet has been discussing this decision in the current session, use that context.

If the input is ambiguous (e.g., multiple decisions in one thread), ask ONE clarifying question, then proceed. Do not interrogate.

## Required output structure

Match Debjeet's actual format (richer than the README template — see a past decision doc as the gold standard):

```markdown
# <Decision Title — descriptive, not a question>

**Date:** YYYY-MM-DD
**Owner:** Debjeet Swain
**Status:** Drafted — pending <approver name> sign-off
   <or: Decided / Deferred / Superseded>

## Context

<2-4 sentences. What's the situation? What customer pain or business need is driving this? Cite tickets, threads, or docs by ID.>

## Options considered

1. **<Option A name>** — <one-line summary>. <Why it's tempting / who proposed it>.
2. **<Option B name>** — <one-line summary>. <Why it's tempting / who proposed it>.
3. **<Option C, if applicable>** — ...

## Decision

<One sentence — which option, by whom (Driver). State it definitively, no hedging.>

## Reasoning / key reframe

<The intellectual move that made this decision obvious. Often a reframe of the problem itself. If there's no reframe, just the 2-3 reasons that tipped it.>

## DACI

- **Driver:** <name — usually Debjeet>
- **Approver:** <name — typically your manager or exec sponsor depending on scope>
- **Consulted:** <list — pull from people profiles + thread context>
- **Informed:** <list — typically the owning team, plus sales leadership if revenue-impacting>

## Implementation

<Numbered list of concrete next steps. Who does what. Closes which tickets.>

## Follow-up (not blocking)

<Items that came up but shouldn't block the decision. Flag for separate workstream.>

## References

- Slack: <thread URL if available>
- Tickets: <BILL-XXXXX, comma-separated>
- Related docs: <paths>
```

## How to populate each section well

### Title
- Descriptive noun phrase, not a question. "Refund limit for annual plans" — good. "Should we cap annual refunds?" — bad.
- Slug version (for filename): lowercase, dashes, max 6 words. `annual-plan-refund-limit`.

### Context
- Open with the customer-facing pain or business outcome at risk. Not the internal mechanics.
- Cite specifics: ticket IDs, customer names, deal sizes, NPS quotes — anything concrete.

### Options
- Always at least 2 options. If only 1 is real, the other is "do nothing" — and explain why doing nothing isn't viable.
- Attribute proposals to people. "Sukhdeep's counter-proposal" beats "another option".
- Mention the cost of each, even if briefly.

### Decision
- One sentence. Definitive. "Go with option 2 (Sukhdeep's `orderId` approach)." not "We're leaning toward option 2."
- If the decision is "defer", state what you're waiting for.

### Reasoning / reframe
- This is the highest-value section. The reframe is what unlocked the decision.
- Example: reframing the noun at the centre of the debate — the entire industry-standard objection collapsed once that reframe was named.
- If you can't name a reframe, write the 2-3 specific reasons that tipped it. No "weighing pros and cons" — pick the load-bearing one.

### DACI population strategy
1. **Driver** — usually the PM who owns the area.
2. **Approver** — read `~/work/knowledge/people/` to identify the right approver:
   - Pricing / revenue / strategy → your exec sponsor
   - Tactical engineering tradeoff → engineering DRI + the PM
   - Cross-functional with Sales → your manager plus Sales leadership
3. **Consulted** — pull from thread participants AND from `~/work/knowledge/people/` based on stakeholder relevance:
   - Product change → the owning team, relevant engineering DRIs
   - Customer-facing change → Sales leadership, RevOps
   - Revenue impact → Finance / RevRec
   - Legal-relevant → Legal (note explicitly if absent)
4. **Informed** — broader stakeholders who need to know but don't need to weigh in.

If a name is unclear, leave a `<TBD>` placeholder rather than guess.

### Implementation
- Numbered, concrete, owner-tagged. "1. Payments adds field X. 2. Support updates macro Y. 3. Closes TICKET-123." Not "implement the change."
- Always close with which tickets / threads this resolves.

### Follow-up
- Anything that came up but shouldn't block. This protects the decision from scope creep.

## Filename + save location

- Path: a past decision doc
- Date: today's date from the system context (do NOT make this up).
- Slug: lowercase, dashes, max 6 words, derived from the decision title.

## Output protocol

1. Write the draft to disk at the path above.
2. Show Debjeet a 5-line summary of what you drafted:
   - **Title:** <title>
   - **Decision:** <one-line decision>
   - **Approver named:** <name>
   - **DACI gaps:** <any TBDs>
   - **Path:** `<path>`
3. Ask: "Want me to (a) post this to Slack for stakeholder review, (b) edit any section, or (c) leave as-is?"
4. **Never post to Slack without explicit approval** (per CLAUDE.md).

## What this skill is NOT

- Not a research tool. If the decision needs more context (e.g., "I don't know what Sukhdeep proposed"), say so and ask Debjeet — don't hallucinate.
- Not for retrospective logging. The Decision Capture loop in CLAUDE.md handles that. This skill is for forward-looking, in-progress decisions.
- Not generic — every output should feel like Debjeet wrote it, with the team's vocabulary and the right stakeholders pre-filled.

## Self-improvement loop (lightweight)

Drafts are saved at a past decision doc. If Debjeet meaningfully edits a draft before publishing (renames sections, adds stakeholders, changes the framing), and you're invoked again later, briefly check the most recent published file vs. your last draft — if there's a clear pattern (e.g., "always adds Finance to Consulted for AR-related decisions"), note it inline at the top of your next draft as: `_Note: applying learned pattern — added <X> to <section>._`

Do not maintain a separate learner.md for this skill. Keep it lightweight.
