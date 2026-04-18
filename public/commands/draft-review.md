<!-- keywords: review, review draft, review doc, review prd, review message, wiki review, pm review, check writing -->
# PM Dojo — Review Any Draft Against Wiki Principles

Review a document, message, PRD, or any written artifact against the PM knowledge base. Returns specific, actionable feedback tied to wiki principles.

Input: $ARGUMENTS — the text to review, a file path, or "last" to review the most recent draft from this conversation.

---

## Step 1 — Load relevant wiki articles

Based on what's being reviewed, read the appropriate wiki files from `~/my-knowledge-base/wiki/`:

| Content type | Wiki articles to read |
|---|---|
| Slack message / email | `communication-and-writing.md`, `managing-up.md` (if to leadership) |
| PRD / spec | `product-strategy-and-execution.md`, `communication-and-writing.md`, `analytical-thinking.md` |
| Status update | `managing-up.md`, `communication-and-writing.md` |
| Meeting prep / agenda | `meetings-and-real-time.md`, `influence-and-leadership.md` |
| Feedback / difficult message | `feedback-and-difficult-conversations.md`, `communication-and-writing.md` |
| Strategy doc / roadmap | `product-strategy-and-execution.md`, `analytical-thinking.md`, `influence-and-leadership.md` |
| Escalation / bad news | `feedback-and-difficult-conversations.md`, `managing-up.md` |

## Step 2 — Run the review

Apply these checks in order:

### Communication Check
- **Weak words scan**: grep for "just", "maybe", "I think perhaps", "sort of", "kind of", "it might be worth", "does that make sense?" — flag each instance
- **Preamble check**: Is the actual point in the first sentence? Or buried in paragraph 2-3?
- **Throat-clearing close**: Does it end with "let me know if you have any questions" or similar filler?
- **Signal-per-word ratio**: Could this be 30% shorter without losing information?

### Strategy Check
- **Audience awareness**: Is this written for the reader or for the writer?
- **Outcome framing**: Does the reader know what you want them to DO after reading this?
- **Anti-sell test**: If recommending something, did you name the tradeoffs?
- **No-surprise rule**: Would anyone be caught off guard by this?

### Substance Check
- **Recommendation included?**: "Here's the issue" without "here's what I propose" is incomplete
- **Structured reasoning**: Is there a clear logic chain, or just assertions?
- **"What would need to be true?"**: For any claim, is the underlying assumption stated?

## Step 3 — Present the review

Format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⚔️  DOJO REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  VERDICT: [SHARP / NEEDS WORK / REWRITE]

  ✅ What's working:
     • [specific praise with principle name]

  🔧 Fix these:
     1. [specific issue] — [principle name (source)]
        → [concrete rewrite suggestion]
     2. ...

  ✂️ Cut these words/phrases:
     • Line N: "just wanted to" → delete
     • Line N: "I think maybe" → "I believe" or just state it

  📊 Quick score: Clarity N/10 | Strategy N/10 | Substance N/10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then show the rewritten version below with changes highlighted.

## Step 4 — Offer the dojo moment (optional)

If the draft had 2+ significant issues, offer:

```
Want to practice this? I can turn the weakest area into a quick spar round.
[Y]es — 60-second rewrite challenge | [N]o — just use the fixed version
```

If yes, run an inline Quick Draw using the original draft as the scenario.
If no, just provide the rewritten version.

## Rules

- **Be direct.** "This buries the lede" not "You might consider restructuring."
- **Every critique must have a fix.** Don't just point at problems.
- **Cite the wiki.** Every piece of feedback references a specific principle and source.
- **Praise what's good.** If the anti-sell framing is solid, say so.
- **Don't over-review.** If it's already sharp, say "This is sharp. Ship it." and stop.
