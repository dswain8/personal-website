<!-- keywords: debrief, after meeting, reflect, retro, what went well, meeting review, post-meeting, post mortem -->
# PM Dojo — Debrief

Reflect on a meeting, conversation, or interaction using wiki frameworks. Captures what worked, what didn't, and what to practice next.

Input: $ARGUMENTS — description of what happened, e.g., "just finished the churn review with David", "had a tough 1:1 with Simran", "leadership review didn't go well"

---

## Step 1 — Get the story

Ask these three questions (one at a time, keep it conversational):

1. **What happened?** (1-2 sentences — the key moment or outcome)
2. **What felt off?** (or what felt right — either works)
3. **What would you do differently?** (optional — they might not know yet, that's fine)

If the user gives a detailed account upfront, skip the questions and go straight to analysis.

## Step 2 — Load relevant wiki

Based on the situation, read from `~/my-knowledge-base/wiki/`:
- Meeting dynamics → `meetings-and-real-time.md`
- Stakeholder interaction → `managing-up.md`, `influence-and-leadership.md`
- Difficult conversation → `feedback-and-difficult-conversations.md`
- Communication miss → `communication-and-writing.md`
- Decision/analysis → `analytical-thinking.md`

## Step 3 — The debrief

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚔️  DOJO DEBRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  WHAT HAPPENED
  [1-sentence summary of the situation]

  ✅ WHAT YOU DID WELL
  • [specific thing] — this maps to [principle (source)]

  🔧 THE COACHING MOMENT
  [The one thing that would have changed the outcome most.
   Explained through a specific wiki principle with a concrete
   example of what to say/do differently.]

  📖 PRINCIPLE TO PRACTICE
  [principle name] — [one-line description]
  Source: [wiki article]

  💡 NEXT TIME, TRY THIS
  "[Exact sentence or approach to use in a similar situation]"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Step 4 — Offer a replay

```
Want to replay the hard moment? I'll play [the other person] — you try the new approach.
[Y]es — 2-minute replay | [N]o — I've got it
```

If yes, run a mini Scenario Replay based on the actual situation. Grade the new response.

## Step 5 — Log it

Append to `~/my-knowledge-base/progress/sessions.jsonl`:

```json
{"date": "YYYY-MM-DD", "mode": "debrief", "context": "[brief meeting description]", "principle_surfaced": "[principle name]", "practice_area": "[e.g., managing-up, anti-sell]"}
```

## Rules

- **One coaching moment, not five.** The debrief should surface THE thing to work on, not a laundry list.
- **No judgment.** This is a training tool, not a performance review. Frame as growth.
- **Make the "next time" line speakable.** Something they can literally say in the next meeting.
- **Connect to patterns.** If previous sessions show the same weakness, name it: "This is the third time 'escalate with a recommendation' came up — it's your pattern to break."
