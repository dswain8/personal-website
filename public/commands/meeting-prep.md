<!-- keywords: prep, meeting prep, prepare, meeting, leadership review, design critique, 1:1, one on one, skip level -->
# PM Dojo — Meeting Prep

Prepare for a meeting using wiki-informed frameworks. Produces a structured prep doc with audience analysis, key decisions, and anti-sell framing.

Input: $ARGUMENTS — meeting description, e.g., "churn review with Kyle and David", "skip-level with Parker", "design critique for BSC redesign", or a calendar event link.

---

## Step 1 — Understand the meeting

Parse the input to determine:
- **Who's in the room?** (check `~/work/knowledge/people/` for stakeholder profiles)
- **What type of meeting?** (leadership review, 1:1, design critique, cross-functional alignment, escalation)
- **What's the goal?** (get a decision, align on direction, present work, resolve conflict)

If the meeting context is unclear, ask one focused question — don't interrogate.

## Step 2 — Load wiki frameworks

Read from `~/my-knowledge-base/wiki/`:
- `meetings-and-real-time.md` — always
- `managing-up.md` — if leadership is in the room
- `influence-and-leadership.md` — if you need buy-in or are navigating disagreement
- `feedback-and-difficult-conversations.md` — if delivering bad news or giving feedback
- `communication-and-writing.md` — for framing and conciseness

## Step 3 — Generate the prep doc

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚔️  DOJO PREP — [Meeting Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  THE ONE THING
  What is the single most important outcome from this meeting?
  → [one sentence]

  AUDIENCE MAP
  [Name] — [their incentive/concern] — [what they need to hear]
  [Name] — [their incentive/concern] — [what they need to hear]

  YOUR OPENING LINE
  If you only get 30 seconds, say this:
  → "[draft opening that front-loads the point]"

  ANTI-SELL FRAMING
  Name your tradeoffs before anyone else does:
  → "[the honest tradeoff or risk you should surface proactively]"

  LANDMINES
  Questions or objections you should prepare for:
  1. [likely challenge] → [your prepared response]
  2. [likely challenge] → [your prepared response]

  IF THINGS GO SIDEWAYS
  Fallback phrases (from wiki):
  → "That's a fair point. Here's what I'd need to see to change my mind..."
  → "Can we separate the decision from the timeline?"
  → [situation-specific fallback]

  DECISION TO DRIVE
  What specific decision or commitment are you leaving with?
  → [explicit ask]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4 — Offer the dojo moment

```
Want to rehearse? I'll play [most senior person in the room] and throw the hardest question at you.
[Y]es — 2-minute role-play | [N]o — I'm prepped
```

If yes, run a mini Scenario Replay where Claude plays the most challenging attendee and throws the landmine questions. Grade the response using the standard scorecard.

## Rules

- **"The one thing" must be ONE sentence.** If you can't articulate the meeting's purpose in one sentence, the meeting isn't ready.
- **Audience map must reflect real incentives**, not org chart. What does each person actually care about?
- **The opening line should be speakable.** Not a paragraph — a sentence you could actually say aloud.
- **Landmines must be realistic.** Base them on stakeholder profiles and meeting context.
- Save the prep doc to `~/work/projects/[relevant-project]/YYYY-MM-DD-[meeting]-prep.md`
