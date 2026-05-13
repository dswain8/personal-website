---
name: prep
description: Pre-meeting prep skill for Debjeet (Billing PM POC at Rippling). Auto-fires on any request to prepare for, brief, or pre-game a meeting — including `/prep [meeting]`, "help me prep for X", "I have a meeting with Y about Z", and any pre-meeting drafting request. Produces a structured prep doc covering meeting goal, stakeholder map (role + stake + likely position + watchouts), what Debjeet specifically drives, anticipated objections + rebuttals, specific lines for key moments, success criteria, and walk-out actions. Always grounded in code/data — never opinion alone. Pulls from `~/work/knowledge/people/` for stakeholder profiles and the meetings wiki for live tactics.
---

# Meeting Prep

Debjeet's pre-meeting framework. Every meeting Debjeet walks into as Billing PM POC — quarterly review, cross-functional scoping, exec escalation, stakeholder 1:1 — gets run through this skill. The goal: walk in knowing what each person wants, what could go wrong, and exactly what to say at the moments that matter.

> **Hard precondition.** Prep is grounded in **code, data, and stakeholder profiles** — not vibes. If you're recommending a position on a technical question, cite the file. If you're predicting a stakeholder's reaction, cite their profile or prior thread.

---

## 0. Scope and triggers

**Apply to:** any request to prepare for a meeting — `/prep`, "help me prep for…", "I have a 1:1 with…", "pre-game this meeting", or any explicit meeting-prep ask. Also auto-fire when Debjeet shares a calendar invite or attendee list and asks for prep.

**Do NOT apply to:** post-meeting recaps (use `/debrief`), live meeting facilitation, or async Slack threads (use `slack-style` / Investigate-and-Draft).

**Pairs with:** `~/my-knowledge-base/wiki/meetings-and-real-time.md` for live tactics (parking lot, state change, eyes-light-up, reset moves). The prep skill is the *before*; the wiki is the *during*.

---

## 1. Inputs to gather (before drafting)

Run these in parallel where possible — speed matters when the meeting is imminent.

1. **Meeting basics**
   - Title, time, duration, channel/room
   - Stated agenda (calendar invite, Slack thread, prior doc)
   - Who called the meeting and why (signals power dynamics)

2. **Attendee list** — for each person:
   - Read `~/work/knowledge/people/{name}.md` if it exists
   - If not, check Slack for recent threads they've engaged in on the topic
   - Note: role, team, manager, communication style, prior position on this topic

3. **Topic grounding** (the non-negotiable layer)
   - Relevant code paths if technical (cite `file.py:line`)
   - Relevant data points if quantitative (Snowflake numbers, ticket volumes, $ figures)
   - Relevant decision history (`~/work/shared/decisions/`)
   - Active escalations (per `feedback_active_escalation_overrides_prep`)

4. **Open questions and ambiguity**
   - What's actually being asked vs. what's being said
   - Where stakeholders disagree (re-read prior threads)
   - What's been decided already vs. what's still up for grabs

---

## 2. The prep doc structure

Output is a single markdown doc, written to `~/work/projects/[project]/YYYY-MM-DD-prep-[slug].md` and shown inline. Use this skeleton:

```markdown
# [Meeting title] — Prep
**When:** [date, time, timezone] • **Duration:** [N min] • **Channel:** [room/zoom]
**Called by:** [name] • **My role:** [facilitator / contributor / observer]

## TL;DR — What I'm walking in to do
[1-3 sentences. The single outcome I want to leave with. State it as a decision, not a discussion. "Leave with agreement that X" not "Discuss X."]

## Meeting goal (as stated vs. as understood)
- **Stated:** [from invite / agenda]
- **Real:** [what's actually being negotiated — often different]
- **My non-negotiable:** [what I will NOT flex on]
- **My flex zone:** [what I can give to get the non-negotiable]

## Stakeholder map

For each attendee:

### [Name] — [role]
- **Stake:** [why they're in the room — what they win/lose]
- **Likely position:** [what they'll push for, grounded in profile or prior thread]
- **Watchouts:** [their pattern — e.g., "flips between auto-process and Churn Request object" or "will fork the decision into A/B without picking"]
- **What I need from them:** [the specific ask or signal]

(Repeat for every attendee. Group profile-less attendees together if low-signal.)

## Code/data grounding
[Cite specific files, line numbers, $ figures, ticket counts. This is the substance layer that turns opinions into facts. Without this section, the prep is incomplete.]

## Anticipated objections + rebuttals
For each likely objection, draft a 1-2 line response BEFORE the meeting:

- **"[Objection]"** → [Rebuttal with evidence]
- **"[Objection]"** → [Rebuttal with evidence]

## Specific lines for key moments
Pre-write the 3-5 sentences that have to land perfectly. Word-for-word.

1. **Opening (first 60 sec):** "[exact words]"
2. **The pivot to the real problem:** "[exact words]"
3. **The ask from [highest-leverage stakeholder]:** "[exact words]"
4. **The boundary on scope:** "[exact words]"
5. **The close / decision-forcing line:** "[exact words]"

## Success criteria (walk-out checklist)
- [ ] [Specific decision made or named]
- [ ] [DRI assigned for next step]
- [ ] [Date or milestone agreed]
- [ ] [Follow-up scheduled if blockers remain]

## If it goes sideways
- **If [stakeholder] reopens [closed topic]:** [parking-lot move + exact words]
- **If [stakeholder] expands scope:** [boundary line + redirect]
- **If [stakeholder] is silent / disengaged:** [pull-in move from meetings wiki]
- **If the room is circling:** [reset move from meetings wiki §"When backed into a corner"]

## What I'll send after (pre-drafted)
[1-2 sentence Slack recap. Pre-write so you can post it within 5 min of meeting end. Forces clarity on what was actually decided.]
```

---

## 3. Rules

1. **Stakeholder profiles are mandatory.** Before the prep doc is delivered, check `~/work/knowledge/people/` for every named attendee. If a profile doesn't exist and the person comes up frequently, flag it: "No profile for [name] — want me to create one?"

2. **Code/data grounding is mandatory.** If the meeting is about a technical decision, cite specific files and line numbers. If it's a business decision, cite specific numbers. Vague prep produces vague meetings.

3. **Pre-write the lines that matter.** The 3-5 critical sentences must be drafted word-for-word. "I'll figure it out in the moment" is how meetings get lost.

4. **One decision per meeting.** Identify THE thing the meeting must produce. Everything else is supporting structure. If the meeting could produce 3 decisions, pick the one with the highest cost of delay.

5. **Predict the failure modes.** What happens if the loudest voice dominates? What happens if the decision-maker is silent? What happens if a new objection lands cold? Pre-write the response.

6. **Apply silent principles from the wiki.** Front-load the point, anti-sell where relevant, audience-map every line. Don't lecture about it — just apply it.

7. **Active escalation overrides prep.** If a live exec escalation is in flight on the same topic, lead with that — not the prepped agenda. (Per `feedback_active_escalation_overrides_prep`.)

8. **Save the artifact.** Write to `~/work/projects/[project]/YYYY-MM-DD-prep-[slug].md`. End with a markdown link using the **absolute path** so the doc opens in the side panel (per `feedback_open_artifacts_in_side_panel`).

---

## 4. Final scan checklist

Before delivering the prep doc, verify:

- [ ] Every attendee has a stakeholder block (no "and others")
- [ ] Stake + likely position + watchouts + ask filled for each
- [ ] Code paths or $ figures cited for any technical/quantitative claim
- [ ] 3-5 critical lines written word-for-word
- [ ] At least 3 anticipated objections with rebuttals
- [ ] At least 3 "if it goes sideways" branches
- [ ] Walk-out checklist has specific named outcomes (not "alignment on X")
- [ ] Post-meeting Slack recap is pre-drafted
- [ ] Doc saved to `~/work/projects/[project]/...` with absolute-path markdown link

If any check fails, fix before delivering.

---

## 5. How to invoke

- **Implicit:** any meeting-prep request triggers this skill.
- **Explicit:** `/prep [meeting name or link to invite]`
- **Quick mode (under 15 min until meeting):** Drop stakeholder profile reads, focus on TL;DR + specific lines + walk-out checklist. Flag the skipped sections.

---

## 6. What Debjeet specifically drives as Billing PM POC

This is the role layer that runs through every prep doc. As the Billing PM POC, Debjeet's job in any cross-functional meeting is to:

1. **Anchor the problem narrowly.** Cross-functional meetings drift toward expanded scope ("while we're at it, can we also…"). Debjeet's job is to defend the v1 boundary with code evidence.
2. **Translate code reality into business framing.** Engineers will say "the on_change handler in `company_churn_plan.py:162` gates this on `is_logo_churn()`." Debjeet's job is to say "product churn doesn't sync to SFDC today — that's what creates the $4M leak."
3. **Force decisions, not discussions.** Walk out with a named DRI and a date. Avoid the "let's circle back" trap.
4. **Surface tradeoffs over recommendations.** When stakeholders push for option A, Debjeet's job is to name the cost of A — even when recommending A. (Anti-sell pattern.)
5. **Protect engineering time.** Debjeet is the buffer between "everything is critical" stakeholders and the engineers who have to build it. Every yes to scope creep is a no to v1 ship date.
6. **Capture decisions in writing.** Within 5 minutes of meeting end, post a recap with named decisions, DRIs, and dates. Auto-log to `~/work/shared/decisions/` per CLAUDE.md.

If a prep doc doesn't help Debjeet do these six things, it's incomplete.

---

## 7. Example invocation flow

```
User: "Help me prep for the 12pm churn automation meeting today"

Skill response:
1. Reads calendar invite (or asks for attendee list if not provided)
2. Reads ~/work/knowledge/people/ for each attendee
3. Reads recent Slack threads in the relevant channel
4. Greps code for relevant files (if technical topic)
5. Produces the prep doc per §2
6. Saves to ~/work/projects/churn/YYYY-MM-DD-prep-[slug].md
7. Returns: "Prep doc saved: [absolute-path link]. Key moves: [3-bullet summary]."
```

---

## 8. Anti-patterns (do not do)

- Generic prep ("come prepared with data") — always cite specific files/numbers
- Skipping stakeholder profiles ("they're all engineers, same prep") — every person has a distinct stake
- Drafting "talking points" instead of word-for-word lines for critical moments
- Listing objections without rebuttals
- Walk-out checklist that says "alignment on direction" — must be specific, named, dated
- Forgetting the post-meeting recap — the meeting isn't done until the Slack message is posted
