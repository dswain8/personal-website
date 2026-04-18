# Wiki Builder — Turn raw transcripts into a structured PM knowledge base

Build a personal, AI-maintained wiki from podcasts, blog posts, and interviews. This is how the PM Dojo knowledge base was built — 258+ raw sources (Lenny's Podcast transcripts, Shreyas Doshi essays, Wes Kao frameworks, April Dunford positioning content) synthesized into 10 cross-linked topic files.

The wiki becomes your second brain: every draft you write, every meeting you prep for, every decision you make can silently consult it.

## Folder structure

```
~/my-knowledge-base/
  raw/                      ← unprocessed transcripts, PDFs, blog exports. NEVER edit these.
    lenny-podcast-shreyas-doshi.txt
    wes-kao-managing-up.pdf
    april-dunford-positioning-talk.md
    ...
  wiki/                     ← organized, AI-maintained. One .md per topic.
    INDEX.md                ← master index. One line per topic.
    communication-and-writing.md
    managing-up.md
    analytical-thinking.md
    ...
  arena/                    ← (optional) practice scenarios derived from the wiki
  progress/                 ← (optional) session logs if you build a practice layer on top
```

## Step 1 — Collect raw sources

Dump everything into `raw/`. Don't filter, don't edit. Accepted formats:

- Podcast transcripts (export from Snipd, Overcast, or use Whisper on audio)
- Blog posts (save as .md or .txt)
- Substack/newsletter archives
- YouTube transcripts
- Book notes (your own highlights)
- Talks, interview transcripts

**Rule:** once a file is in `raw/`, it is immutable. The wiki layer synthesizes — it never modifies source material.

## Step 2 — Define your topics

Before processing anything, decide the topics that matter for your role. For a PM, the 10 topics that emerged from my sources:

| File | What it covers |
|------|---------------|
| `communication-and-writing.md` | Conciseness, weak words, front-loading, signal-per-word |
| `managing-up.md` | Influence upward, no-surprise rule, proactive framing |
| `influence-and-leadership.md` | Anti-sell, CEDAF delegation, steelmanning |
| `meetings-and-real-time.md` | Controlling meetings, handling surprises, de-risking |
| `feedback-and-difficult-conversations.md` | Bad news delivery, apologies, strategic framing |
| `analytical-thinking.md` | "What would need to be true?", structured reasoning |
| `product-strategy-and-execution.md` | Why products fail, positioning, roadmap defense |
| `listening.md` | Active listening as PM superpower |
| `ai-and-product-sense.md` | AI product management, product sense as moat |
| `self-development-and-mindset.md` | Ceiling thinking, humility trap, growth patterns |

For a different role (engineering lead, designer, founder), define your own 8–12 topics. Fewer than 8 is too broad, more than 12 is hard to navigate.

## Step 3 — The synthesis prompt

Give Claude (or whatever model) this instruction, pointing at `raw/`:

```
Read every file in ~/my-knowledge-base/raw/.

For each topic listed in wiki/INDEX.md:
1. Extract every relevant idea, framework, or quote from the raw sources.
2. De-duplicate across speakers (e.g., both Shreyas and Wes talk about
   front-loading — merge into one principle, credit both).
3. Write a topic file starting with a 1-paragraph summary.
4. Structure the rest as: Core Principles → Frameworks → Examples → Anti-patterns.
5. Cite sources inline as [[source: lenny-podcast-shreyas-doshi]].
6. Cross-link related topics with [[topic-name]] syntax.

Never modify raw/. Only write to wiki/.
```

## Step 4 — The wiki file template

Every wiki file follows this structure:

```markdown
# [Topic Name]

**Summary (1 paragraph):** What this topic covers and why it matters.
The hook a reader needs to know in 30 seconds.

## Core Principles

### Principle name (source: Shreyas Doshi)
The principle itself, 2-3 sentences. Why it works.

**Example:** Concrete application.
**Anti-pattern:** What it looks like when ignored.

### Another principle (source: Wes Kao)
...

## Frameworks

### CEDAF (Context, Expected outcome, Deliverable, Authority, Fallback)
Source: Shreyas Doshi. When to use it. Worked example.

## Cross-links

See also: [[communication-and-writing]], [[feedback-and-difficult-conversations]]
```

## Step 5 — Maintain INDEX.md

One line per topic, with a one-line description. This is the only file a human should curate by hand.

```markdown
# Wiki Index

- [[communication-and-writing]] — Conciseness, weak words, front-loading
- [[managing-up]] — Influence upward, no-surprise rule
- [[analytical-thinking]] — "What would need to be true?"
...
```

## Step 6 — Integrate into your daily workflow

The wiki is useless if it just sits there. Wire it into your AI assistant's instructions so it gets consulted silently:

```
For any PM task (drafting Slack, writing a spec, prepping a meeting):
1. Silently consult the relevant wiki article before responding.
2. Apply the principles — don't lecture.
3. If you spot a teachable moment (weak words, buried lede, missing
   recommendation), offer a "Dojo Moment" — a 3-option inline game.
```

## Maintenance loop

- When a new raw source is added → update affected wiki topics, refresh INDEX.md
- When a principle is contradicted by new evidence → note the debate in the wiki file
- Every 3 months → re-read INDEX.md and consolidate overlapping topics

## Why this works

- **Raw stays raw.** You can always go back to the source.
- **Synthesis is AI's job.** Humans curate the index; AI writes the prose.
- **Cross-links create compound value.** Every new source strengthens every existing topic.
- **Silent application beats overt advice.** The wiki shapes output invisibly, not through lectures.

Full example (my PM wiki, 10 topics built from 258+ sources) is the knowledge base behind [PM Dojo](https://pm-dojo.vercel.app) — a practice arena that grades your PM moves against the wiki.
