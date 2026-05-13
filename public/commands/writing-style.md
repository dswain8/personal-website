---
name: writing-style
description: Apply Debjeet's writing style guide to any prose artifact. Triggers on requests to draft, write, rewrite, edit, polish, sharpen, generate, or produce written content — memos, docs, specs, briefs, plans, announcements, status updates, Slack messages, emails, summaries, reviews, posts, narratives. Enforces short declarative sentences, no em dashes (an LLM tell), banned words list with replacements, no LLM patterns ("let's dive in", "in conclusion", symmetric bullets), active voice, contractions, specificity over vague superlatives. Does NOT apply to code, raw data tables, or pure technical reference. Always run the §6 final scan before delivering any artifact.
---

# Writing Style

Debjeet's house discipline for prose. The goal: artifacts that don't read as AI-generated. The rules are non-negotiable; the application is contextual.

> **Hard precondition.** Before delivering any prose artifact, run the §6 final scan. If the artifact contains an em dash, a banned word, a hedge stack, a symmetric paragraph pattern, or title-case headings, fix before submitting.

---

## 0. Scope

**Apply to:** memos, docs, specs, PRDs, briefs, status updates, Slack messages, emails, plans, announcements, reviews, summaries, blog posts, narratives, any prose artifact intended for human readers.

**Do NOT apply to:** code, raw data tables, structural technical reference (e.g., API docs that are mostly schema), JSON or YAML output, command-line examples, or content where the format is mechanical rather than narrative.

**Team-locked language is preserved verbatim.** When a vision sentence, mission, named artifact, or team-converged terminology has been finalized by the team, do not rewrite it to fit the style. Apply the style only to surrounding prose.

---

## 1. Sentence structure

- Write short, declarative sentences most of the time.
- Vary sentence length to avoid sounding robotic. Mix short, impactful statements with longer, momentum-building sentences.
- Every time you use a comma, ask whether you can use a period instead.
- Avoid repeating the same words in a paragraph. Use synonyms or rephrase.
- Don't create perfectly symmetrical paragraphs or lists that start with "Firstly... Secondly..."

## 2. Voice and tone

- Write like humans speak. Avoid corporate jargon and marketing fluff.
- Be confident and direct. Avoid softening phrases like "I think," "maybe," or "could."
- Use active voice instead of passive voice.
- Use positive phrasing. Say what something is rather than what it isn't.
- Say "you" more than "we" when addressing external audiences. For internal team artifacts, "we" is appropriate.
- Use contractions like "I'll," "won't," and "can't" for a warmer tone.

## 3. Specificity and evidence

- Be specific with facts and data instead of vague superlatives.
- Back up claims with concrete examples or metrics.
- Highlight customers and community members over company achievements.
- Use realistic, product-based examples instead of foo/bar/baz in code.
- Make content concrete, visual, and falsifiable.

## 4. Punctuation, especially em dashes

- **Replace every em dash (—).** Em dashes are the strongest LLM tell in prose.
  - Default replacement: period. Break the thought into two sentences.
  - Tight subordinate clause: comma.
  - Tightly related independent clauses: semicolon (sparingly).
  - Introducing elaboration or a list: colon.
  - True aside: parentheses.
  - Never em dash. Never en dash either, except in number ranges (4–6 weeks).
- Use Oxford commas consistently.
- Use exclamation points sparingly.
- Sentences can start with "But" and "And." Don't overuse.
- Use periods instead of commas when possible for clarity.
- Use straight quotes (' and ") instead of curly quotes (' ' and " ").

## 5. Banned words and phrases

### Banned words (replace with the suggested alternative or remove)

| Word | Replacement |
|---|---|
| a bit | remove |
| a little | remove |
| actually / actual | remove |
| agile | remove |
| arguably | remove |
| assistance | help |
| attempt | try |
| battle tested | remove |
| best practices | proven approaches |
| blazing fast / lightning fast | build XX% faster (specific) |
| business logic | remove |
| cognitive load | remove |
| commence | start |
| delve | go into |
| disrupt / disruptive | remove |
| facilitate | help or ease |
| game-changing | specific benefit |
| great | remove or be specific |
| implement | do |
| individual | man or woman |
| initial | first |
| innovative | remove |
| just | remove |
| leverage | use |
| mission-critical | important |
| modern / modernized | remove |
| numerous | many |
| out of the box | remove |
| performant | fast and reliable |
| pretty / quite / rather / really / very | remove |
| referred to as | called |
| remainder | rest |
| robust | strong |
| seamless / seamlessly | automatic |
| sufficient | enough |
| that | often removable, context dependent |
| thing | be specific |
| utilize | use |
| webinar | online event |

### Banned phrases

- I think / I believe / we believe → state directly
- it seems → remove
- sort of / kind of → remove
- pretty much → remove
- a lot / a little → be specific
- By developers, for developers → remove
- We can't wait to see what you'll build → remove
- We obsess over ___ → remove
- The future of ___ → remove
- We're excited → "We look forward"
- Today, we're excited to → remove

### Hedge words and stacks

- Avoid hedge words: "might," "perhaps," "potentially" unless the uncertainty is real.
- Don't stack hedging phrases: "may potentially," "it's important to note that."

## 6. LLM patterns to avoid

These are the patterns that flag text as AI-generated. Strip every one.

- Em dashes (—). Replace per §4.
- "Great question!", "You're right!", "Let me help you." → just answer.
- "Let's dive into..." / "Let's explore..." → just start.
- Cliché intros: "In today's fast-paced digital world," "In the ever-evolving landscape of." → cut.
- "It's not just [x], it's [y]." → state X. State Y. Don't pretend it's a revelation.
- Self-referential disclaimers: "As an AI," "I'm here to help you with." → cut.
- High-school essay closers: "In conclusion," "Overall," "To summarize." → state directly.
- "Hope this helps!" / similar closers → cut.
- Transition words overused: "Furthermore," "Additionally," "Moreover." → vary or cut.
- Sounds-profound-but-filler closers: "And that's the cost we are choosing to never pay." "This is the work." "That's the bar." → cut unless they earn their place.
- Numbered lists when bullets work better → use bullets.
- Title-case headings → use sentence case.
- Smart quotes, em-dashes, non-breaking spaces from copy-paste → strip to ASCII.
- Empty citation placeholders like "[1]" with no source → delete.

## 7. Title creation

- Make a promise in the title so readers know exactly what they'll get.
- Tap into controversial points your audience holds and back them up with data. Avoid clickbait.
- Share something uniquely helpful that makes readers better at meaningful aspects of their lives.
- Avoid vague titles like "My Thoughts On XYZ." Titles should be opinions or shareable facts.
- Write placeholder titles first, complete the content, then iterate on titles at the end.

## 8. Final scan checklist (run before delivering)

Before submitting any artifact, scan against this list. Fix any hits.

- [ ] Zero em dashes in the text? (Use grep equivalent. Title and body both.)
- [ ] No banned words from §5? (Quick scan for: leverage, robust, modern, just, very, really, seamless, performant, innovative.)
- [ ] No hedge stacks? ("may potentially," "might possibly," "it's worth noting that.")
- [ ] No symmetric paragraph patterns? (First paragraph and last paragraph shouldn't have the same structure.)
- [ ] No title-case headings? (Headings in sentence case.)
- [ ] No LLM closers? ("In conclusion," "Hope this helps," "Let me know if you have questions.")
- [ ] No filler-flourish sentences that don't add information?
- [ ] Did I respect team-locked language verbatim?

If any check fails, fix before delivering.

---

## How to invoke

- Implicit: any request to write, draft, rewrite, edit, or polish a prose artifact triggers this skill.
- Explicit: `/writing-style` to invoke directly, or "rewrite using my writing style" / "apply the house style guide."
- Audit mode: "audit this for AI-generated patterns" → run §6 final scan against an existing artifact and report violations.

## Example transformations

**Before (LLM-flavored):**
> *We're excited to announce a robust, modern monetization platform that leverages cutting-edge technology — enabling businesses to seamlessly scale their billing operations and unlock numerous opportunities for growth.*

**After (house style):**
> *Rippling now has a single platform for pricing, contracting, billing, and revenue recognition. It runs on the new architecture. The first products are live; more are migrating this quarter.*

**Before (LLM-flavored):**
> *Let's dive into the key considerations for this initiative. It's not just about speed — it's about quality. Furthermore, by leveraging best practices, we can ensure seamless adoption.*

**After (house style):**
> *Two questions matter here: how fast can we ship, and how good will it be when it does. Speed without quality is rework. Quality without speed is irrelevance. We need both, and the existing process gives us neither.*
