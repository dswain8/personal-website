---
name: slack-style
description: Final-pass editor for Slack messages. Auto-fires on ANY request to draft, write, rewrite, polish, or respond to a Slack message — including `/slack-reply` invocations, the Investigate-and-Draft Pipeline in CLAUDE.md, and ad-hoc "reply to this thread" / "draft a Slack message" / "write a Slack response" prompts. Improves clarity, structure, and actionability while preserving Debjeet's conversational voice. Strips LLM tells, keeps things informal, sparing on bullets, capitalizes "I", acknowledges context, never emoji-adds. ALWAYS append the trace marker `_(polished via slack-style)_` on its own line BELOW the Slack message block — never inside it. Always run §4 final scan before delivering.
---

# Slack Style

Debjeet's editor pass for Slack messages. Every Slack draft goes through this skill before it's shown for approval. The goal: messages that read like Debjeet wrote them — clear, action-forward, conversational, never AI-flavored.

> **Hard precondition.** Before delivering any Slack draft, run the §4 final scan. The trace marker must appear OUTSIDE the copy-paste block. Drafts without the marker are not finished.

---

## 0. Scope and triggers

**Apply to:** any Slack message — replies, DMs, channel posts, thread comments, drafts requested via `/slack-reply`, drafts produced via the Investigate-and-Draft Pipeline in CLAUDE.md, and any prompt that asks for a Slack-bound message.

**Do NOT apply to:** code, JSON/YAML output, Jira tickets, email drafts (use `writing-style` for those), DACI docs, specs, PRDs, or any non-Slack prose.

**Pairs with `writing-style`.** `writing-style` is the prose-wide LLM-detector pass (em-dashes, banned words, hedge stacks). `slack-style` adds the Slack-specific layer on top. Both run on Slack drafts; `writing-style` first, then `slack-style`.

---

## 1. Goals

1. **Clarity** — organize so ideas are easy to follow. Break dense text into digestible chunks. Add transitions where needed for smooth flow.
2. **Actionability** — surface takeaways and asks clearly. Make them easy to spot without sounding directive.
3. **Personality** — match Debjeet's voice. Conversational, approachable, dry, direct. No corporate polish, no robot phrasing.
4. **Slack-friendly** — concise, casual, natural. Reads like a person typed it on Slack, not a memo.

---

## 2. Rules

- **No emojis** unless the original draft already had them or the user's voice clearly uses them. Never add.
- **Bullets sparingly.** Use only when the structure genuinely helps. Default to flowing prose.
- **DMs aren't memos.** Default structure for DMs and short channel replies is 1–3 short paragraphs of flowing prose. NO bold section headers like `*1. Migration script*` or numbered subsections — those are PRD/doc patterns, not chat. If the message has multiple parts, separate them with a blank line, not headers. Bold is reserved for inline emphasis on a single phrase, never as a header.
- **Inline questions, don't bullet them.** Two or three short questions read more naturally inlined into a sentence ("how were the subs created, was billing involved? and do we have legal sign-off?") than as a bulleted list. Bullets force checklist parsing; sentences flow like speech. Only bullet when items are genuinely parallel and >3.
- **Open by signaling you absorbed the input** when responding to a doc, thread, or long message. Patterns like "Caught up —", "Went through the PRD —", "Read through —", "Looked at this —" land as a peer responding, not a bot delivering a status. Avoid declarative status openers like "Two asks for billing, confirming:" — that's memo voice.
- **Conversational vocab.** Default to the shorter, more casual word:
  - "customers" → "folks" (in chat, not in formal asks)
  - "engineering effort" → "eng" / "eng effort"
  - "clarifications" / "clarifying questions" → "Qs" / "few Qs"
  - "loop in engineering" → "pull eng in"
  - "from a $0 entitlement to a paid plan" → "from $0 to paid"
  - "Once those are settled" → "Once those land"
- **Capitalize "I"** as a standalone word and in contractions (I'm, I'll, I've, I'd). Always.
- **Match the input's case style** for everything else. Don't impose title case on lowercase drafts or vice versa.
- **Acknowledge context.** If the recipient asked a question or made a suggestion, address it directly. Don't repeat points they already addressed.
- **Front-load the answer.** Recipient should know the takeaway in the first sentence. Context comes after.
- **Skip preamble.** No "just wanted to circle back," no "hope this finds you well," no "thanks for flagging." Get to the point.
- **Add small touches of personality** in phrasing — "makes it easier to follow" beats "improves clarity." Opinion words like "really" ("this really belongs in the contract") signal a human stance; bots avoid them.
- **Include @mentions** with Slack user IDs when responding to specific people (per CLAUDE.md).
- **Use straight quotes.** Strip smart quotes from any paste-in.
- **No LLM closers.** No "let me know if you have questions," no "happy to discuss," no "hope this helps."

---

## 3. Output format

Deliver ONLY the revised Slack message in a copy-paste-ready block, then the trace marker on its own line below.

```
<revised message text — multi-line if needed, ready to paste into Slack>
```

_(polished via slack-style)_

The marker is the trace. It signals the editor pass ran. It must appear AFTER the message block, never inside it. The user pastes only the block contents into Slack.

If presenting to Debjeet for approval (the typical flow), include a one-line note ABOVE the block stating who it's going to and which thread/channel — that's metadata, not part of the message.

---

## 4. Final scan checklist

Before delivering, scan the revised message:

- [ ] First sentence carries the answer or main point?
- [ ] Zero emojis added that weren't in the original?
- [ ] No LLM closers ("hope this helps," "let me know," "happy to discuss")?
- [ ] No preamble ("just wanted to," "circling back," "thanks for flagging")?
- [ ] "I" capitalized everywhere it appears as a standalone word or in a contraction?
- [ ] Bullets only where they genuinely aid scan-ability?
- [ ] Recipient's points acknowledged, not repeated?
- [ ] @mentions included with Slack IDs where addressing specific people?
- [ ] Straight quotes throughout?
- [ ] Trace marker `_(polished via slack-style)_` on its own line below the message block?
- [ ] No bold/numbered section headers (`*1. Migration script*`, `*2. Long-term*`)? DMs aren't memos.
- [ ] Multiple short questions inlined into sentences, not bulleted?
- [ ] Opens with an "absorbed-the-input" signal (Caught up / Went through / Read through) if responding to a doc or long message — not a declarative status header?
- [ ] Conversational vocab applied (folks not customers, eng not engineering, Qs not clarifications)?

If any check fails, fix before delivering.

---

## 5. How to invoke

- **Implicit (most common):** any request to draft, write, rewrite, or polish a Slack message triggers this skill automatically. The agent calling `/slack-reply` or running the Investigate-and-Draft Pipeline hands off to `slack-style` as the final step.
- **Explicit:** `/slack-style <draft text>` to run the editor on an existing draft.
- **Audit mode:** "audit this Slack message" → run §4 against an existing draft and report violations.

---

## 6. Example transformations

**Before (LLM-flavored, hedge-stacked):**
> Hey Parvesh, just wanted to circle back on the metered billing thread from yesterday. I think we should probably consider rolling this out gradually, maybe starting with a small subset of customers, to ensure we don't run into any unexpected issues. Let me know your thoughts! Happy to discuss further.

**After (slack-style):**
> Let's roll metered billing out gradually. Start with a 10-customer pilot, then expand once we've cleared the obvious failure modes. The risk of a big-bang rollout is too high given how many edge cases we're still finding.
>
> Want to align on the pilot list this week?

_(polished via slack-style)_

---

**Before (buried lede, no clear ask):**
> Thanks for flagging this! I took a look at the suspension logic and there's a lot going on. Basically the way it works is that the system checks a bunch of conditions and then triggers different flows depending on the state. So I think there might be a bug in how we handle the offboarding case but I'm not 100% sure. Could be worth digging into more.

**After (slack-style):**
> There's likely a bug in the offboarding suspension flow — looks like it skips the data-deletion check when the company is already in a paused state. Tracing it now.
>
> Can you point me at the customer report that surfaced this? Want to confirm before I file a Jira.

_(polished via slack-style)_
