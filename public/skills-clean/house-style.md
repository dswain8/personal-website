---
name: house-style
description: Gate every UI generation through Debjeet's house discipline. ALWAYS run §0 mode-selection FIRST — if the brief lacks explicit aesthetic guidance (tone, palette, typography, references), STOP and propose three directions before writing any markup. Triggers on any request to design, build, generate, scaffold, or mock up HTML/CSS/React/Vue/Tailwind UI — landing pages, dashboards, components, marketing sites, admin tools. Also triggers on "this looks AI-generated" / "audit this UI" → diagnostic mode against existing markup. Always emits the §3 pre-ship audit before declaring done.
---

# House Style

Personal aesthetic skill. Calibrated against the working reference: [debjeetswain.com](https://debjeetswain.com) (Vite + React + plain CSS). Two default modes, one slop list, one audit. Every direction is negotiable; the discipline is not.

> **Hard precondition.** Do not write a single line of markup, JSX, or CSS until §0 has run and either (a) the user has named a direction or (b) the brief explicitly specified tone/palette/typography. If you find yourself reaching for `<div>` before §0 has fired, stop and back up.

---

## 0. Mode selection (run first, every time)

Before generating, decide:

**A) Is the brief aesthetically vague?** A clear *topic* is not the same as a clear *aesthetic*. The brief is vague — and you MUST propose three directions — unless the user has explicitly named **at least one** of:

- a tone or mood ("brutalist", "editorial", "playful", "1990s magazine")
- a palette or temperature ("warm cream", "dark", "neon")
- typography ("use Tiempos", "system serif", "monospace everywhere")
- a reference URL, screenshot, or named site to mimic
- a direct instruction to use the default ("use your house style", "editorial-warm please")

"Build me a landing page for Postcard Desk" tells you the topic and nothing about the aesthetic. **That is vague. Propose three directions, ask, wait.** Don't auto-pick — even if the topic suggests an obvious tone. Format:

> Three directions for this:
> 1. **Editorial-warm** (the default) — paper, ink, asymmetric grids. Best when this is read.
> 2. **[Alternate A]** — e.g. brutalist-raw / dark-terminal / retro-arcade.
> 3. **[Alternate B]** — pick a third that genuinely fits the content.
>
> Default is #1 unless you say otherwise.

If the user replies "go ahead" or "default," use editorial-warm. If they name a number, use that. If they describe a tone in their own words, follow it.

**B) Is this brand or product?**
- **Brand-mode** — marketing pages, blog, personal site, landing, public-facing artifact. Design *is* the product. Embellish: warm gradient body, Fraunces hero, asymmetric grid, hover lifts, staggered reveals.
- **Product-mode** — admin tools, dashboards, internal apps, ops surfaces. Design *serves* the product. Same palette, less embellishment: solid `--bg`, denser type scale, restrained motion, tighter radii (12–16px on data cards), no decorative gradients, no hero standfirst.

**C) Diagnostic mode trigger.** If the user says "audit this UI", "this looks AI-generated", "review this design", or pastes existing UI and asks what's wrong — skip §1, run only §3 (Pre-ship audit) against the supplied UI. Report which items fail with specific quotes from the markup.

Otherwise: continue to §1.

---

> **Stop check before §1.** If you arrived here without §0 having actually emitted either (a) a 3-direction proposal the user replied to, or (b) a confirmation that the brief named a direction — go back to §0. The "default direction" is only the default *after* the user opts into it. Never silently.

## 1. Default direction — Editorial-warm (brand-mode)

**Mood:** A printed magazine spread. Considered. Ink that has weight. Paper that has warmth. Type that breathes.

**Typography**
- Display: **Fraunces** (variable, optical-size axis). Weights 400–500. Letter-spacing `-0.02em` to `-0.03em`. `text-wrap: balance` on h1. `max-width` in `ch` units, never px. *Fraunces is at risk of becoming the new Inter — keep it because the cream + DM Sans pairing differentiates, but never use it as a generic display partner on a different palette.* Acceptable distinctive alternates if the brief calls for swap: **Tiempos, GT Sectra, Editorial New, Reckless, Söhne Breit**. Avoid the new defaults: **Geist, Mona Sans, Plus Jakarta Sans, Recoleta, Instrument Sans, Space Grotesk**.
- Body: **DM Sans** (variable). Weights 300–500. Line-height `1.65–1.78`. Italic 300 for asides.
- Pair rule: distinctive serif display + refined sans body. Never two sans. Never two serifs.
- Kickers / labels: 11–12px, `letter-spacing: 0.10–0.14em`, `text-transform: uppercase`, weight 600. Color = `--text-tertiary`.

**Color (CSS custom properties — use these names verbatim, default values shown)**
```
--bg:              #f3eee6   /* warm cream, NOT pure white */
--bg-elevated:     #fbf8f2   /* lighter cream for cards */
--bg-muted:        #ece4d7   /* sand */
--text:            #23313a   /* ink, deep teal-gray, NOT pure black */
--text-secondary:  #5b6973
--text-tertiary:   #7a8791
--accent:          #4f7699   /* dusty editorial blue, NOT vibrant */
--accent-strong:   #365a79
--accent-soft:     rgba(79, 118, 153, 0.12)
--border:          #ddd4c7   /* warm sandstone, NOT cool gray */
--border-strong:   #c4b7a4
```

Body background uses both gradients together — this gives the "paper" depth:
```css
body {
  background:
    radial-gradient(circle at top left, rgba(79, 118, 153, 0.12), transparent 28%),
    linear-gradient(180deg, #f7f2eb 0%, var(--bg) 28%, #f1ebe2 100%);
}
```

**Spatial rules**
- Use `clamp()` for almost every spacing value (`clamp(20px, 3vw, 32px)`). Pages should breathe at every viewport.
- Two shell widths: `760px` narrow (reading), `1160px` wide (work surfaces). Pick one per page.
- Asymmetric splits: `minmax(0, 1.4fr) minmax(240px, 0.8fr)` for hero sections. Never 50/50.
- Generous corner radii on cards: `20–28px`. Pills are `999px`. Inputs are `12px`.
- Sticky header at `72px` (mobile `64px`), `backdrop-filter: blur(14px)`, transitions border-color when scrolled.

**Motion**
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (named `--ease-out`). For everything.
- Durations: 0.18s for hover/focus, 0.24s for card lifts, 0.30–0.35s for nav drawers. Never longer.
- Hover lift: `translateY(-1px)` for buttons, `translateY(-2px)` for cards. Always with shadow swap, never alone.
- Page enter: stagger reveals at 0/90/180/270/360ms. Five children max. No more.
- **Always** include `@media (prefers-reduced-motion: reduce)` block that flattens transforms and disables transitions.

**Interaction surfaces**
- Buttons are pill-shaped (`border-radius: 999px`), `min-height: 46px`, `padding: 12px 20px`, `font-weight: 600`, `font-size: 14px`.
- Primary = ink fill on cream. Secondary = `--border-strong` outline on translucent cream. Tertiary = link with bottom-border-on-hover.
- Cards have `backdrop-filter: blur(8px)` over translucent cream `rgba(251, 248, 242, 0.82)` — this gives the soft-paper feel without glassmorphism.
- Tags / badges: pill-shaped, uppercase 12px, soft tinted backgrounds. Color-coded by intent.

**Editorial details**
- Kicker → title → standfirst → support is the canonical hero rhythm.
- Pull-quotes: 2px left border in `--accent-medium`, Fraunces, `clamp(24px, 3vw, 34px)`.
- Section headings get a small uppercase kicker above. Always.
- "Proof strips" — 3-column metric rows with a thin top border per item, uppercase label above value.

---

## 1b. Product-mode variant (utility surfaces)

When mode is **product** (admin tool, dashboard, ops surface, internal app):

**Keep** — palette tokens, font families, `--ease-out`, `prefers-reduced-motion`, custom-property discipline, asymmetric grids where layout permits.

**Change**
- Background: solid `var(--bg)`. Drop the radial+linear gradient stack — it competes with data.
- Card radii: `12–16px` (denser, more screens-per-screen), not `20–28px`.
- Card surfaces: solid `--bg-elevated`, no `backdrop-filter`. Translucency reads as decoration in a tool.
- Type scale: tighter. Body 14px (not 16px). Section titles 18–20px (not `clamp(24px, 3vw, 34px)`).
- Motion: hover-only. No staggered page reveals. No reveal-on-scroll. Just the hover lift + the focus ring.
- Hero rhythm: kicker + title only. No standfirst, no support paragraph, no CTA cluster.
- Buttons: still pill-shaped, but `min-height: 36px` (denser), `padding: 8px 14px`.
- Density: tables, lists, grids should feel a click denser than the marketing site.

The aesthetic stays consistent (someone hopping between brand and product feels the same family). Only the *tempo* changes.

---

## 2. Hard Nos (apply universally, every mode, every direction)

Each of these is a tell. If the model produces one, the output reads as ChatGPT-default.

| Banned | Why |
|---|---|
| **Inter, Roboto, Arial, system-ui** as the primary face | Default LLM picks. |
| **Space Grotesk, Geist, Mona Sans, Plus Jakarta Sans, Recoleta, Instrument Sans** | The new defaults. Once an "elevated" choice, now the next Inter. |
| **Italic serif display hero** (e.g. *"reimagine"* in italic Recoleta) | A specific structural fingerprint of AI landing pages. Don't. |
| **"Eyebrow chip"** above the hero (small pill saying "AI Platform" or "v2.0 →") | Same fingerprint. Use a kicker (uppercase letter-spaced label) instead. |
| **Pure white `#fff` backgrounds** | Cold. Screen-feel. Always tint warm or cool. |
| **Pure black `#000` text** | Reads harsh. Use ink (`#23313a`) or near-black with hue. |
| **Purple → violet → pink gradients** (especially diagonal) | The single loudest AI tell. |
| **Gradient text on the hero headline** | Specific tell. Solid color, well-chosen. |
| **Glassmorphism with frosted blur over photographs** | Cliché. Blur is fine; over a photo, it isn't. |
| **Centered hero + 3 feature cards below in a row** | The default landing layout. Use asymmetry. |
| **"Get started" CTA with → arrow icon** | Banal. Write a verb that says what happens. |
| **Lucide / Heroicon walls** — 8+ icons in a grid as decoration | Filler. |
| **Gradient-mesh blob backgrounds** | Filler. |
| **"Gradient orb" representing AI** (the glowing sphere on every AI startup page) | Specific tell. |
| **Nested cards** — card inside card inside card | Visual hierarchy collapses. One card or a list, not nested. |
| **Rounded-cards-with-left-border** ("alert" style decoration on every list item) | Default Tailwind component pattern. |
| **CSS-silhouettes-as-product-shots** (a fake browser chrome with grey rectangles) | If you don't have the screenshot, write copy. Don't fake the shot. |
| **Emoji bullets in feature lists** (✨ Fast / 🚀 Scalable / 🔒 Secure) | The loudest LLM tell in body copy. |
| **Tailwind-default color names anywhere visible** (`bg-blue-500`, `text-gray-400`) | Nothing was designed. Use custom properties. |
| **Drop-shadow defaults** (`shadow-lg`, `0 4px 6px rgba(0,0,0,0.1)`) | Use warm shadow tokens with hue. |
| **Border-radius: 8px on cards in brand-mode** | Too tight for editorial. Use 20–28px brand, 12–16px product. |
| **All four corners equally rounded on every surface** | Asymmetry is a tool. |
| **Low-contrast labels** (`text-gray-400` on `bg-gray-50`) | Reads as decoration, not information. |
| **`text-align: center` on body copy** | Hard to read past 60ch. Left-align prose. |
| **Animation everywhere** — every element fades in on scroll | Motion should have a moment, not be ambient. |
| **Neumorphic soft shadows** | Dated. |
| **Three-color logo dots + "© 2024 Yourself" footer** | Make the footer say something. |

---

## 3. Pre-ship audit

Before declaring a UI done, run this **out loud** in the response (six bullets, one sentence each, marked `## Pre-ship audit`). If any answer is "no" or weak, fix before shipping.

1. **Typography distinctive?** Did I pick a face the user would not get by default? Is the display ↔ body pairing intentional?
2. **Color committed?** Is there a dominant temperature, and one disciplined accent? Or did I sprinkle four hues evenly?
3. **Motion has a moment?** One well-orchestrated reveal, not ambient fade-ins everywhere? `prefers-reduced-motion` included?
4. **Layout breaks the grid?** Asymmetry, overlap, off-axis element — or a centered card stack?
5. **Backgrounds have texture?** (Brand-mode: warmth/depth from gradient or paper. Product-mode: solid is correct — check that nothing decorative was added.)
6. **Anything say "ChatGPT made me"?** Walk the Hard Nos. If even one item triggers, redo that part.

In **diagnostic mode**, run the same six against the *user's* UI and report which fail with markup quotes.

---

## 4. When the user names a different direction

If the user names a tone — "make it brutalist", "build a dark dashboard", "give it a retro-arcade feel" — switch the **direction** wholesale (typography, color, mood, motion all re-pick) but keep:

- The **Hard Nos** (every row, every mode, every direction).
- The **Pre-ship audit** (every step).
- The **structural rules**: `clamp()` for spacing, `prefers-reduced-motion`, asymmetric grids over centered stacks, CSS custom properties not tailwind-default tokens.

The aesthetic is negotiable. The discipline isn't.

---

## 5. Reference

The canonical implementation of this style lives in [github.com/dswain8/personal-website](https://github.com/dswain8/personal-website). When a generation feels off, read `src/index.css` from that repo and recalibrate against the actual tokens.
