<!-- keywords: launch, launch draft, launch announcement, release post, ship post, GA post, launches-platform, launches-payroll -->
# Launch Draft — Slack Launch Announcement from Codebase Truth

Drafts a Slack launch announcement for a product or platform capability that just shipped, grounded in code-verified facts. Frames around the *capability* the team owns, not the products on top.

> **Mandatory pre-flight.** Before showing any draft to the user, run TWO scans:
> 1. `writing-style` §6 — zero em dashes, no banned words ("actually," "leverage," "robust," "modern," "seamless," "just," "very," "really," "performant," "innovative"), no LLM closers, no symmetric paragraph patterns.
> 2. **The launch-specific AI-tells table** at the bottom of this skill — demonstrative-pronoun openers, capability-not-proof framing, generic CTA boilerplate, listy enumerations, plain-bold headers, mixed-state Availability sections, double-tagged CC, wrong product names.
>
> The whole point of a launch post is leaders skim it. If it reads as AI-generated, it gets ignored. Match the canonical reference `~/work/projects/metered-billing/2026-05-11-launch-announcement-final-posted.md` in voice and structure.
>
> **Delivery — 10/10 IS the approval gate.** When the Step 4 Codex review loop reaches 10/10 on every dimension, treat that as approval to deliver: immediately call `send_message` to the requesting PM's self-DM (Debjeet: `U09E4BAFP4H`) with the final draft as the message body. The PM reviews it inside their own DM (where mentions render as real pills) and forwards to the public launch channel themselves. Do not wait for a second "yes" from chat once 10/10 is hit; the rubric pass IS the yes.
>
> **When NOT to auto-DM:**
> 1. The loop hit the 5-iteration cap without reaching 10/10. Surface the highest-scoring draft and the residual blocking issues to the user; require explicit approval before sending.
> 2. The user said "just draft it" / "don't send it" / "show me first" in the original request — honor the override.
> 3. `send_message` errors or rate-limits — DO NOT fall back to `slack_send_message_draft`. That tool expects standard markdown (`**bold**`, `_italic_`) and will mangle Slack mrkdwn syntax (`_*x*_` italic-bold, `*bold*`, `:emoji:` shortcodes), producing a visibly broken draft. Instead: save the final draft to `/Users/dswain/work/projects/[capability]/[date]-launch-announcement-draft.md`, tell the user it's saved, and either (a) schedule a retry of `send_message` after the rate-limit window, or (b) ask the user to retry manually. Never use `slack_send_message_draft` for launch posts.
>
> **Never auto-post to public channels.** Auto-delivery is to the PM's self-DM only. The PM chooses the public channel and forwards.

**Input:** Free-form description of what shipped. Ideal inputs include:
- Capability name (e.g. "metered billing", "permissions v2", "real-time payroll preview")
- Owning team
- Launch type (GA / Beta / Alpha)
- Repo / module path(s) to verify against
- Products or surfaces this powers
- Stakeholder Slack IDs (PM lead, EM, GTM partner)
- Optional: vetted traction numbers

If any input is missing, ask once for the minimum set: capability name, owning team, launch type, and one repo path to verify against. Don't ask for more than that — make reasonable assumptions on the rest and flag them as TODOs in the output.

---

## Step 1 — Verify against the codebase

Before drafting any "What's shipped" bullet, read the repo paths the user provided. List the actual capabilities found, with `file:line` references. Drop anything that can't be substantiated. Move unfinished work to the `:soon:` section.

If the user did not provide a repo path, ask once. Do not draft "What's shipped" from imagination.

## Step 2 — Apply hard rules

1. **Capability-framed, not product-framed.** If the billing team ships metered billing, the headline is "metered billing", not "Rippling AI." Products on top get their own announcements.
2. **No aspirational claims.** No "audit-grade", "enterprise-ready", "best-in-class", or marketing adjectives unless a code path proves it.
3. **Anti-sell.** Name what's NOT in scope. Future-state work goes under `:soon:`, not the headline.
4. **Numbers must be vetted.** If the user hasn't provided traction numbers, leave a `[TODO: get from analytics]` placeholder. Never invent or estimate.
5. **Slack mrkdwn formatting.** Use **italic-bold (`_*Header*_`) for all section headers and product names** — it visually outweighs plain bold in Slack and signals "this is a heading" without using markdown headings. Plain bold (`*text*`) is fine for inline emphasis inside body copy. No `#` headings.
6. **One vocabulary, used consistently.** Pick one term for the core concept (e.g. "usage-based" *or* "consumption-based", "credit pool" *or* "allowance") and use it everywhere. Before output, scan the draft for synonyms of the chosen term and flag mismatches as a pre-flight check.
7. **Distinguish GA from "platform-ready."** When the same launch touches multiple products at different launch states (one shipped, one infra-ready but pre-GA), call it out explicitly. Don't list both as "live" — readers will assume both products are GA and you'll have to walk it back. Use the pattern:
   - `*Product A* — live in production on the new rails`
   - `*Product B* — billing infrastructure complete; ready to bill the moment the product GAs`
8. **No em dashes anywhere.** Em dashes are the strongest LLM signal in prose. Replace per `writing-style` §4: default to period (break into two sentences), comma for tight subordinate clauses, colon for elaboration, parentheses for asides. This applies to body copy AND to list-item separators (`*Billing Eng* — @user` becomes `*Billing Eng*: @user`).
9. **Skip optional sections that are placeholders.** The Resources section is optional. If there's no live doc link, drop the section rather than leaving a `<link — TODO>` placeholder in the post. Same for Early traction if no vetted numbers exist.

10. **Availability is `:white_check_mark:` only.** Anything not yet live belongs in "What's next," not Availability. Mixing live and `:soon:` items in Availability makes the section noisy and readers stop trusting the checkmarks. Strict rule: if you can't reach for it in prod today, it's not in Availability.

11. **No "What this means for you" boilerplate.** Drop the section by default. Include it only if there's a *specific* action the reader takes: a new channel to join, a new workflow to follow, a self-serve link. Generic "DM me with questions" or "reach out for onboarding" reads as boilerplate and gets ignored.

12. **CC excludes anyone already in Kudos.** Leaders who were named in the Kudos block don't get re-tagged in the CC line. CC is for leadership-chain visibility (skip-levels, directors, VPs, partner-product PMs) who need to *see* the launch but weren't on the build team. No double-tagging the same person in two sections of the same post.

13. **Match official product names exactly.** Use the team's canonical spelling and spacing for every product mentioned. Confirm before drafting: "Rippling Intelligence" (not "Rippling AI"), "Data Cloud" (not "DataCloud"), etc. Wrong product name in a launch post is a tell that the writer wasn't close to the product.

14. **Proof beats capability.** In customer-journey or feature bullets, don't describe what customers *can* do in the abstract ("Customers can start a trial via API"). Cite the working example that proves it ("The Data Cloud trial flow already exercises this path"). Working examples > theoretical capabilities. Bonus: harder to refute, easier to verify.

15. **Strip preamble subjects.** Inside customer-journey items where the subject is obvious from context (product names already in the headline/hook), drop "[Product A] and [Product B] are sold per user…" → "Sold per user…". Direct sentence starts read more confident.

16. **Drop demonstrative "This" at sentence starts.** "This unblocks X" → "Unblocks X." "This is the rail that…" → "The rail that…". Demonstrative-pronoun openers are a strong AI tell.

17. **Verb economy.** Replace long verb phrases with single strong verbs or metaphor verbs. "Gives X a billing path the moment it launches" → "puts X on the runway." "Enables Y to begin charging when the product is GA" → "lets Y bill on day one." Pick the verb that does the most work.

18. **Comma-splice parallels are OK when parallelism is the point.** "Heavy users get underpriced, light users overpriced" is tighter and more parallel than the grammatically-correct version with a period. Don't over-correct splices that preserve rhythm.

19. **Frame "What's shipped" for leadership, not for the build team.** Leadership (product + engineering) does not care which internal endpoints, services, or modules were replaced. Never enumerate legacy endpoint names ("Replaces `create_contract_for_company`, `get_order_form_for_self_signup`, …"). Frame each bullet at the **capability shift** layer: what the system can now do that it could not before, what consolidated, what the architectural or product implication is. Quantify the surface reduction as a number (e.g. "five legacy services collapse to one") without naming the five. Use bullets that answer "what changed for a customer / for the architecture / for the next team that builds on this" — not "what files moved." Section header may be `_*What's shifted*_` instead of `_*What's shipped*_` when the launch is a re-platforming rather than a net-new feature.

## Step 3 — Draft the post

Use this format, in order:

1. **Headline** — `:rocket: _*Now Live: [Capability Name]*_ _*[GA | Beta | Alpha]*_`
2. **One-line hook** — the entire announcement in a single sentence so a skimmer gets it.
3. **_*Problem*_** *(optional)* — 2–4 short sentences naming the pricing/UX/architectural gap this closes. Skip if the hook already conveys it.
4. **_*Why it matters*_** — the problem this unblocks, and what becomes possible now that wasn't before. Open with a strong verb, not "This." Example: "Unblocks X today and puts Y on the runway."
5. **_*What's shipped*_** — Pick one of two structures:
   - **`bullets` (default)** — 4–7 bullets, each leading with an italic-bolded capability name, grounded in a real code path. Best when shipped items are independent features.
   - **`customer-journey`** — numbered lifecycle (e.g. Trial → Pricing → Contract → Subscription → Overages → Visibility). Best when the capability spans a buyer's full lifecycle and you want a cross-functional audience to grok the end-to-end story. Each step still cites a code path; the journey ordering replaces the bullet list. **Each item should cite proof (a working example or shipped path), not just capability.**
   Use `customer-journey` when a non-engineering audience (Sales, CS, RevOps) is in the readership and the lifecycle framing makes the impact obvious. Default to `bullets` otherwise.
6. **_*Availability*_** — `:white_check_mark:` items ONLY. No `:soon:` items here. Anything not yet live goes in "What's next" instead.
7. **_*Early traction*_** *(optional)* — only if vetted numbers exist. Frame as products-on-top, not platform revenue. Format named subjects with a comma, not em dash or colon: "Largest single deal: _FlexGen_, $75K ARR, 300 seats."
8. **_*What's next*_** — Q-by-Q roadmap in 1–2 sentences. Concrete named items. Avoid product-name enumeration when the strategic point is general.
9. **_*Resources*_** *(optional)* — docs, support guide, eng reconciliation, Loom if there's UI. **Skip entirely if there's no live link.** Don't ship `<link — TODO>` placeholders.
10. **Kudos** — Two formats:
   - **Short** (default for small launches): `Huge kudos to <@USERID> ... for shipping this :raised_hands:`
   - **By-org** (for cross-functional launches): a per-org breakdown so partner teams see themselves named. Template:
     ```
     *Kudos*
     Massive thanks to everyone who shipped this :raised_hands:
     • *[Owning team] Eng* — <@ID> <@ID> ...
     • *[Owning team] EM* — <@ID> <@ID>
     • *[Owning team] PM* — <@ID>
     • *[Partner product 1]* — <@ID> <@ID> ...
     • *[Partner product 2]* — <@ID> <@ID> ...
     • *Sales and Business* — <@ID> <@ID> ...
     ```
     Use by-org when the launch involves 2+ partner products or a GTM partner. Default to short otherwise.
12. **CC / FYI** — `cc:` for stakeholders, `fyi:` for downstream functions. Walk through the **stakeholder-CC checklist** before output:
   - [ ] Owning team EMs and director chain (eng leadership above the EMs, e.g. Director of Finance Platform, Snr Director / VP of the eng group)
   - [ ] PM manager and skip-level (the PM's manager + VP of the platform area)
   - [ ] Site / Eng SVP if cross-region launch (e.g. India site SVP for any launch with significant IST contribution)
   - [ ] Partner-product PMs / EMs (each product on top of this capability)
   - [ ] RevOps / GTM Ops (if it changes how things are sold or contracted)
   - [ ] Customer-facing leaders (Sales, CS, Support directors who own the surface)
   - [ ] Finance / Accounting (if it changes how revenue is recognized or invoiced)
   - [ ] Compliance / Legal (if pricing model changes affect contracts or disclosures)
   Skip a bucket only if the launch genuinely doesn't touch it. Don't default to "just my team."

   **Leadership CC is separate from Kudos.** Kudos names the people who built it. The CC line names the leaders who need to *see* it landed: EMs, eng directors, the PM's manager + skip-level, the site/Eng SVP. It's OK for EMs to appear in both. The CC line goes on its own at the bottom of the post, after Kudos. Format: `cc: <@EM1> <@EM2> <@Director> <@SrDirector> <@SVP> <@PM-Manager> <@Skip-Level>`.

### Emoji vocabulary

| Emoji | Use |
|---|---|
| `:rocket:` | Headline (always) |
| `:bulb:` | Why it matters |
| `:wrench:` | Engineering / how it works |
| `:white_check_mark:` | Already shipped |
| `:soon:` | Coming next |
| `:date:` | Dated commitment |
| `:movie_camera:` | Loom |
| `:page_facing_up:` | Help article / docs |
| `:raised_hands:` | Kudos |

## Step 4 — Codex review loop (iterate until 10/10 on every dimension)

Before showing anything to the user, hand the draft to Codex CLI and iterate. Codex is the external reviewer — it doesn't see this conversation, so it judges the draft cold, the way a skim-reader on `#launches-platform` would.

### The rubric (6 dimensions, 0–10 each, target = 10 on every dimension)

| # | Dimension | What 10/10 looks like | Auto-fail triggers (force 0) |
|---|---|---|---|
| 1 | **Clarity** | A skimmer gets the entire launch from the headline + hook in under 10 seconds. No section requires re-reading. Every section has one job and does it. Capability framing throughout — no internal endpoint/service/module name enumeration in "What's shipped/shifted". | Hook is longer than two sentences. Headline buries the capability. Any section's purpose is unclear on first read. Any "What's shipped/shifted" bullet enumerates internal endpoint/service/module names ("Replaces `foo_endpoint`, `bar_endpoint`, …") instead of framing the capability shift. |
| 2 | **Completeness** | Headline, hook, problem, why-it-matters, what's-shipped, availability, what's-next, kudos, cc all present (or deliberately skipped per the skill's rules with no placeholder residue). No `<TODO>` text leaks into copy that's framed as ready-to-post. | Section is missing without justification. `[TODO: ...]` placeholders left inside a fenced code block as if shippable. Resources section with a `<link — TODO>` placeholder. |
| 3 | **Mapping to reality** | Every "What's shipped" item cites a real `file:line` reference (verified in Step 1). Every number cites its source. Every product name matches its canonical spelling. Latency/traction figures are vetted, not invented. | Any uncited capability claim. Any invented number. Any wrong product name. |
| 4 | **Human voice** | Reads like a senior PM wrote it on a Sunday. Strong verbs, comma-splice parallels where they earn it, no demonstrative-pronoun openers, no LLM closers. Passes the full `writing-style` §6 scan and the launch AI-tells table. | Any em dash. Any banned word ("actually," "leverage," "robust," "modern," "seamless," "just," "very," "really," "performant," "innovative"). Any sentence starting with "This [verb]" / "These [noun]". Symmetric paragraph rhythm (three sentences of equal length in a row). Listy enumerations where a single strategic phrase would work. |
| 5 | **Anti-sell honesty** | Names what's NOT in scope. Distinguishes GA from platform-ready. Calls out the next-quarter gaps in "What's next" without burying them. If a metric has a caveat (channel mix, small sample, missing observability), the caveat is in the post or stripped from the claim. | Aspirational adjectives unsubstantiated by code ("audit-grade", "enterprise-ready", "best-in-class"). GA framing when only some products are actually GA. Headline metric with a hidden caveat. |
| 6 | **Structure & formatting** | Matches the canonical reference's section ordering and emoji vocab. Italic-bold (`_*…*_`) for every section header and product name. Kudos by-org for cross-functional launches. CC excludes anyone already in Kudos. Availability is `:white_check_mark:` only. | Plain-bold headers. `:soon:` items mixed into Availability. EM/PM double-tagged across Kudos and CC. Wrong emoji on a section. |

**Acceptance:** every dimension must score 10. A 9 anywhere = iterate.

### Iteration protocol

1. Write the current draft to `/tmp/launch-draft-iter-N.md` (N starts at 1).
2. Run:
   ```bash
   codex exec --skip-git-repo-check "$(cat <<'EOF'
   You are reviewing a Slack launch announcement against a strict rubric. The author cannot see this conversation — judge the draft cold.

   Score each of the 6 dimensions 0–10 using the rubric below. Apply the auto-fail triggers literally: if a trigger fires, that dimension is 0, no exceptions.

   Rubric:
   1. Clarity — skimmable in 10s, every section has one job.
   2. Completeness — all sections present, no leaked placeholders.
   3. Mapping to reality — every claim has a code/data source.
   4. Human voice — no em dashes, no banned LLM words, no demonstrative-pronoun openers, no symmetric three-sentence paragraphs.
   5. Anti-sell honesty — names what's NOT in scope, no unsubstantiated adjectives.
   6. Structure & formatting — italic-bold headers, Availability is :white_check_mark: only, CC excludes Kudos people.

   Return STRICT JSON with this shape (no prose outside the JSON):
   {
     "scores": { "clarity": N, "completeness": N, "mapping": N, "voice": N, "anti_sell": N, "structure": N },
     "total": N,
     "blocking_issues": [ "one-line description of each <10 issue, with the exact quoted phrase that triggered it" ],
     "revised_draft": "the full revised draft, ready to score again. Apply every fix needed to reach 10/10 on every dimension. Preserve all verified code references and Slack IDs."
   }

   Draft to review:
   <<<DRAFT
   $(cat /tmp/launch-draft-iter-N.md)
   DRAFT
   EOF
   )"
   ```
3. Parse the JSON. If every score = 10, **exit the loop AND immediately deliver**:
   - Call `send_message` with `userIds: ['U09E4BAFP4H']` (Debjeet's self-DM) and the final draft as the `text` body. Mentions render as real Slack pills in the DM, so Debjeet can copy/forward to the public channel intact.
   - Only after the DM send succeeds, show the iteration evidence + final draft inline as a receipt (see "What to show the user" below).
   - Skip the auto-DM only if: (a) the user said "draft it" / "show me first" in the original request, or (b) `send_message` errors/rate-limits — fall back to `slack_send_message_draft` and tell the user.
   - Otherwise (scores < 10):
   - Log the scores and `blocking_issues` to a running table (shown to the user at the end).
   - Replace the draft with `revised_draft`.
   - Increment N and repeat.
4. **Iteration cap: 5.** If still not 10/10 after 5 rounds, stop, do NOT auto-DM, surface the remaining gaps to the user, and require explicit approval before sending. Do not silently ship a sub-10 draft.

### What to show the user

When the loop exits (either at 10/10 after auto-DM, or at iteration cap), show:

1. **Iteration table.** Compact view of each round's scores:
   ```
   Iter  Clar  Cmpl  Map  Voice  AS  Struct  Total  Status
   1     8     9     10   7      8   9       51     iterate
   2     9     10    10   9      9   10      57     iterate
   3     10    10    10   10     10  10      60     ✅ done
   ```
2. **Final draft.** The 10/10 version (or the highest-scoring version at cap).
3. **Diff highlights.** 3–5 bullets on the edits Codex made that mattered most. This is the lesson for next time.
4. **Remaining gaps** (only if cap was hit before 10/10). Explicit list of what would need a human call to resolve.

### Rules for the loop

- **Don't argue with Codex.** If it scored Voice 8 and quoted a banned word, accept the fix. The point of an external reviewer is to catch what you missed.
- **Don't game the rubric.** If Codex's revised draft drops a section to score higher, restore the section before scoring the next round. Completeness is non-negotiable.
- **Don't lose verified facts.** Every iteration must preserve the `file:line` references and Slack IDs from Step 1. If Codex deletes them, re-insert before the next round.
- **Don't loop past cap.** Five rounds is the limit. If voice keeps slipping back, escalate to the user with the highest-scoring draft and the residual issues — there's a structural problem the rubric isn't catching.

## Step 5 — Output

Produce three things, in this order:

1. **The Slack-postable copy** in a fenced code block (ready to paste — no surrounding commentary inside the block).
2. **Verification table** — what was confirmed in code, with `file:line` references.
3. **TODO list** — placeholders the user must fill before posting (Slack IDs, doc links, traction numbers, channel choice).

## Step 6 — Channel routing reminder

Append a one-line recommendation:

| Channel | When to post |
|---|---|
| `#launches-platform` | Cross-cutting platform capability (billing, permissions, search, infra) |
| `#launches-payroll` | Payroll-adjacent (incl. PEPM-relevant changes) |
| `#ask-[team]` | Always mirror, Support / CS need the same context |
| `#announcements` | Reserve for company-defining launches only, do NOT default here |

Rule of thumb: post once in the primary `#launches-*` channel; cross-link from ops channels (don't duplicate the body).

---

## Rules

- **Don't draft "What's shipped" without code references.** If you can't cite it, cut it.
- **Don't write marketing copy.** Mechanism over adjectives.
- **Don't invent numbers.** TODO placeholders are fine; fabricated stats are not.
- **Don't over-elaborate.** A launch post is scanned, not read. Cut anything that doesn't earn its line.
- **10/10 from Codex IS the approval gate.** When Step 4 hits 10/10 on every dimension, immediately `send_message` to the PM's self-DM (Debjeet: `U09E4BAFP4H`) with the final draft. They review/forward from their own DM. Never auto-post to a public channel. If the loop hits the 5-iter cap without reaching 10/10, surface the gaps and require explicit approval before sending. Honor explicit overrides like "draft it" / "show me first" if the user said them in the original request.
- **Don't ship em dashes.** Run the `writing-style` §6 final scan against every draft before showing it. Zero em dashes, no banned words.
- **Don't conflate GA with platform-ready.** If a product is metered-billing-ready but not yet GA, say so. Don't let readers assume both products are launched.

## AI-tells specific to launch posts (final scan, in addition to `writing-style` §6)

After running `writing-style` §6, run this launch-specific scan. Every one of these fired on a recent metered-billing draft and got edited out before posting. Catch them before showing the draft.

| AI tell | Smell test | Fix |
|---|---|---|
| "This unblocks..." / "This enables..." | Demonstrative-pronoun sentence opener | Drop "This." Start with the verb. |
| "Customers can [do X] via [system Y]" | Capability claim with no proof | Replace with the working example that demonstrates it. "The [Product] [flow] already exercises this." |
| "[Product A] and [Product B] are sold per..." | Subject preamble in customer-journey items where context already supplies the subject | Strip the preamble. "Sold per..." |
| Long verb phrase: "gives X a billing path the moment it launches" | Symmetric, neat, over-engineered phrasing | Strong-verb metaphor. "puts X on the runway." |
| Availability section mixing live and `:soon:` | Reader scans the checkmarks, sees `:soon:` items beside them, starts mistrusting the section | Strip `:soon:` from Availability. Move to "What's next." |
| "*What this means for you*" with generic "DM me with questions" | Boilerplate CTA reads as AI filler | Drop the section. Include only if there's a *specific* action (a new channel to join, a new workflow). |
| Product-list parenthetical in "What's next": "(Spend, Payroll runs, Global Payroll, App Connect)" | Listy/enumerative; AI loves to list | Replace with the general strategic statement when the specific names don't add value. |
| EM/PM appears in both Kudos AND CC | Double-tagging the same person in two sections of the same post | CC excludes anyone already in Kudos. CC is leadership-chain visibility, not build-team recognition. |
| Plain bold (`*Header*`) for sections | Visually thin in Slack against a long post | Italic-bold (`_*Header*_`) for all section headers and product names. |
| Comma splice "fixed" by splitting parallels into two sentences | Loses the rhythm that made the parallel work | Keep the splice when parallelism is the point. "Heavy users get underpriced, light users overpriced." |
| Wrong product names: "Rippling AI", "DataCloud" | Reader closest to the product spots it immediately and the post loses credibility | Verify canonical spelling. "Rippling Intelligence", "Data Cloud", etc. |

If any row matches, fix before showing the draft.

## Example output

Worked examples (in order of how closely they match the current rules — newest is the canonical reference):
- **`~/work/projects/metered-billing/2026-05-11-launch-announcement-final-posted.md`** — **canonical good example.** What Debjeet actually posted to `#launches-platform`, with a diff catalog of AI-draft → final edits. Every row in the "AI-tells specific to launch posts" table above came from this diff. **Match this voice and structure for future launch posts.**
- `~/work/projects/metered-billing/2026-05-08-launch-announcement-hybrid.md` — pre-final hybrid draft (customer-journey + by-org kudos) before the AI-flavor edits. Useful for structure reference but the voice still reads as AI in spots.
- `~/work/projects/metered-billing/2026-04-30-launch-announcement-draft.md` — capability-bullets structure (metered billing v7), older.
