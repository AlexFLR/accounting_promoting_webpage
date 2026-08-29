# Design system

The rules this site is built to. Every value here exists as a token in
[`src/styles/tokens.css`](src/styles/tokens.css) — if you are about to type a
raw hex or pixel value into a component, the answer is in here instead.

---

## 1. Colour

### Derived from the mark

The palette comes out of the logo. The two logo variants are not merely a
light and a dark file — between them they define both themes:

| | V + rule | A outline |
|---|---|---|
| light mark | `#0A1F33` | `#2E7BB4` |
| dark mark | `#DCE8F2` | `#7FB3D5` |

So the dark scheme is not an invented inversion: the mark's navy becomes the
page and its pale blue becomes the ink.

### Two scales, not a palette

Everything on screen is a step on one of two ramps, which is why the page
reads as one material rather than a set of chosen colours.

**Scale 1 — `--ledger-0..8`, paper to ink.** Warm cream at the light end,
cooling into the logo navy as it darkens. Surfaces, rules, borders and text
all come from this single ramp.

| Step | Value | Role | vs paper |
|---|---|---|---|
| `--ledger-0` | `#FDFBF7` | raised surfaces (cards) | 1.04 |
| `--ledger-1` | `#FAF7F0` | **the page** | — |
| `--ledger-2` | `#F3EEE4` | alternating section bands | 1.08 |
| `--ledger-3` | `#EAE3D5` | sunken wells, table header rows | 1.19 |
| `--ledger-4` | `#D6CFC2` | hairlines, table rules — *decorative only* | 1.45 |
| `--ledger-5` | `#8F8A81` | interactive borders (form fields) | 3.21 |
| `--ledger-6` | `#5C6B7A` | muted / secondary text | 5.11 |
| `--ledger-7` | `#27394B` | body text | 11.07 |
| `--ledger-8` | `#0A1F33` | headings — **the logo navy** | 15.62 |

**Scale 2 — `--blue-100..700`, the accent.** One hue, 206° — the mark's own.

| Step | Value | Role | vs paper |
|---|---|---|---|
| `--blue-100` | `#E4EFF7` | active-row wash | 1.09 |
| `--blue-200` | `#A8CDE6` | the headline dot's highlight | 1.57 |
| `--blue-400` | `#2E7BB4` | **the mark** — non-text use only | 4.26 |
| `--blue-500` | `#215F8D` | links, primary button | 6.36 |
| `--blue-600` | `#1A4B70` | hover | 8.59 |
| `--blue-700` | `#143A57` | active / pressed | 11.07 |

Components never reference a raw scale step. They use aliases
(`--color-ink-body`, `--color-line-strong`, …) that point into the scales, so
a palette change happens in one file.

### The warm paper is doing the work

Navy ink and a blue accent describe most accounting sites in Romania. What
keeps this one from joining them is what sits *underneath*: the paper stays
warm cream `#FAF7F0`, and the hairlines and table rules stay warm ledger-gray
`#D6CFC2` even as the ink turns navy.

That mismatch is deliberate. Navy on cream is a different object from navy on
white, and the warm rules stop the page settling into the standard cool
corporate blue. **If the paper is ever changed to white, the palette loses
the only thing distinguishing it from the field** — that is the load-bearing
decision here, not the accent.

### The accent budget: under 10% of any screen

The accent appears on links, the primary button, and active/hover states.
Nothing else. Currently exactly two areas are accent-filled — the brand mark
in the header and the CTA — plus inline link text.

This is a functional constraint, not restraint for its own sake. The primary
CTA is the only thing on a marketing page that must be found instantly. Every
additional blue element is a competing claim on that attention, and the
tenth one makes the button invisible. **The hero's radial wash was removed for
this reason**, not only because gradients on large surfaces are banned.

### Red and green are rationed

`--color-deadline` (`#A32A1C`) exists for **imminent fiscal deadline counters
only** — D112, D300, D394. `--color-filed` (`#2C6B3A`) exists for **"depus /
la termen" states only**.

Both are exposed exclusively through `.chip--deadline` and `.chip--filed` in
`global.css`, so the reservation is enforceable rather than a note somebody
will forget. If you need red and neither chip fits, red is not the answer.

The consequence, and it is deliberate: **there is no generic error red.**
`--color-error` resolves to ink, not red. Form validation signals with a dark
border, an icon and a text message. A validation error borrowing the deadline
colour is exactly how the urgency signal dies — after the third time red means
"you mistyped your email", it stops meaning "the filing is due Thursday".

Both chips carry an icon and a text label, so state never depends on colour
alone. Counters use `font-variant-numeric: tabular-nums` so digits do not
jitter as they tick down.

### Never pure black or pure white

The page is `#FAF7F0`, not `#FFFFFF`; button labels are `#FAF7F0`, not
`#FFF`; the darkest ink is the logo navy `#0A1F33`, not `#000`.

Beyond the halation argument — pure white at 300–400 nits is a lamp pointed at
the reader — a cream page **restores the elevation ramp that pure white
destroys**. `--ledger-0` is genuinely lighter than the page, so a raised card
can get lighter, which is what the eye expects from something coming toward
it. On a pure-white page the only options are a grey card, which reads as
*disabled*, or borders doing all the work.

### No gradients on large surfaces

Flat fills only for sections, cards, bands and the page.

One deliberate exception: the headline dot carries a radial-gradient
highlight. It is 0.18em across — about 9px — and the asymmetry is
*functional*, not decorative. A uniform circle shows no rotation, so without
it the dot's roll is literally invisible. See §7.

### Contrast is a hard requirement, not a preference

Every combination must clear **WCAG AA at its real rendered size**, which is
the part usually skipped. Thresholds:

- Body text: **4.5:1**
- Large text — ≥24px, or ≥18.66px bold: **3:1**
- UI borders, icons, form-field outlines: **3:1** (WCAG 1.4.11)

Article body is `--text-lg` (18px regular). That is **not** large text under
WCAG — 18px only qualifies at bold. So it needs the full 4.5:1, and the
0.5-step of slack people assume they have is not there.

Measured against paper `#FAF7F0` — computed, not estimated:

| Pair | Ratio | Verdict |
|---|---|---|
| heading ink `#0A1F33` | 15.62 | AAA |
| body ink `#27394B` | 11.07 | AAA |
| muted `#5C6B7A` | 5.11 | AA |
| **logo blue `#2E7BB4` as text** | **4.26** | **fails AA — see below** |
| accent link `#215F8D` | 6.36 | AA |
| accent link on band `#F3EEE4` | 5.88 | AA |
| cream label on accent (button) | 6.36 | AA |
| interactive border `#8F8A81` | 3.21 | passes 1.4.11 |
| deadline red `#A32A1C` | 6.76 | AA |
| filed green `#2C6B3A` | 6.00 | AA |

Dark scheme against the logo navy `#0A1F33`: ink 13.42, body 11.01, muted
6.42, accent 7.41, border 3.87, red 6.45, green 7.29 — all passing.

#### The two corrections the brief needed

**1. `#D6CFC2` fails as a form-field border — 1.45:1 against paper.**
It is perfectly good for what you specified it for, hairlines and table
rules, where no minimum applies because nothing interactive is being bounded.
But WCAG 1.4.11 requires 3:1 for anything defining a *control*, so a text
input outlined in `#D6CFC2` fails at less than half the requirement.

The fix is not a new colour: it is another step on the same warm ramp.
`--ledger-5: #8F8A81` measures 3.21:1 and is the identical hue — the RGB
ratios of `#D6CFC2` and `#8F8A81` match to three decimal places. So the
system keeps two rule tiers:

- `--color-line` = `#D6CFC2` — hairlines, table rules
- `--color-line-strong` = `#8F8A81` — form fields, focusable edges

For reference, `#CBD5E1` — the border colour most design systems reach for —
measures **1.48:1** on white. Nearly everyone gets this wrong.

**2. The logo blue fails as text — `#2E7BB4` measures 4.26:1 on cream.**

Under the 4.5:1 that body-size text and button labels require. Narrowly, but
under. It does clear 3:1, so it is legal for the mark itself, for headings
≥24px, and for borders and other non-text content.

The fix is the same shape as the first: not a new colour, a darker step of
the identical hue. `--blue-500: #215F8D` measures 6.36:1 at hue 206°, which
is the mark's own hue. So the system separates the two jobs:

- `--color-brand-mark` = `#2E7BB4` — the logo, and nothing that is text
- `--color-brand-500` = `#215F8D` — links, primary button, active states

This is the normal relationship between a logo and a UI palette. Logo colours
are chosen at logo scale, where a 9px stroke carries the hue; body text at
17px does not have that luxury.

The dark scheme has no equivalent problem — `#7FB3D5` from the dark mark
measures 7.41:1 on the navy ground and is used directly.

Everything else you specified passed unchanged.

### Colour is never the only signal

Form errors get a dark border **and** an inset bar **and** a `⚠` icon **and**
a text message — deliberately no red, per the rationing rule above. Deadline
and filed chips likewise carry an icon and a label, never colour alone.

Roughly 1 in 12 men has a colour vision deficiency. On a site whose primary
conversion is a form, and whose most important signal is a red deadline
counter, that is not an edge case.

### Proportion: 60 / 30 / 10

60% paper, 30% supporting (text, rules, bands), **under 10% accent**. The
blue is for what you want clicked: the primary CTA, active nav state,
links. The moment blue is also a section background or a decorative wash,
the CTA stops announcing itself and click-through drops.

---

## 2. Typography

### Scale

A **1.25 (major third)** ratio, fluid via `clamp()` so it interpolates between
viewports instead of jumping at breakpoints — no `@media` query needed for type.

```
--text-sm    0.875rem              captions, meta, labels
--text-base  1rem                  body — never smaller
--text-lg    1.125rem              lead paragraphs
--text-xl    1.25rem → 1.5rem      h3
--text-2xl   1.5rem  → 2.25rem     h2
--text-3xl   2rem    → 3.25rem     h1
```

**16px is the floor for body text.** On iOS, an input with `font-size` below
16px triggers a forced zoom on focus — which on a page whose whole purpose is
a contact form is an own goal.

### Line height scales inversely with size

- Body: **1.6** — long lines need vertical room to let the eye return
- Headings: **1.2** — large type already has visual separation; loose leading
  makes a headline read as unrelated fragments

### Measure: 65–75 characters

`--width-content: 68ch`. Below ~45 characters the eye returns too often; past
~85 it loses the line on return. This is the single most-ignored typographic
rule on business sites and the one most visible when broken.

### The three roles

| Token | Family | Used for | Cost |
|---|---|---|---|
| `--font-display` | **Vollda** Bold | Headings only | 64 KB, preloaded |
| `--font-sans` | system UI stack | Nav, buttons, forms, body | 0 KB |
| `--font-serif` | **Garamontio** | Article bodies only | 94 KB, article pages only |

All SIL Open Font License 1.1 — free for commercial use, licences in
`public/fonts/LICENSES/`. Darwin Serif is in the repo but unused.

**Vollda is display-only.** It ships Bold alone, which is correct for what it
is; never set it below ~24px and never expect a lighter weight. That is why
`h1–h4` are pinned to 700.

**The system sans is deliberate.** Not loading a UI font is the single
biggest performance decision on the site — it removes the largest font from
the critical path entirely, and at UI sizes almost nobody can tell Segoe UI
from Inter.

### Never ship OTF/TTF, and always subset

`npm run fonts` runs `scripts/build-fonts.mjs`: subset to Latin + Romanian,
then convert to woff2. **2,040 KB → 373 KB, an 82% reduction.**

Most of that is the *subsetting*, not the format change. The originals carry
thousands of glyphs for scripts this site will never render. Note that
Romanian `ș`/`ț` are U+0218–U+021B (comma below), **not** the Turkish cedilla
forms at U+015E–U+0163; the subset keeps both, because text pasted from Word
often uses the cedilla versions and dropping them renders tofu.

Self-hosted rather than Google Fonts: one fewer third-party connection, and
no question about a US font CDN receiving EU visitor IPs.

### Metric-matched fallbacks are not optional here

`font-display: swap` renders a fallback first and replaces it. If the two
fonts are different widths, that swap reflows the page. Measured from the
`hmtx` tables:

- Georgia Bold is **6.6% wider** than Vollda
- Georgia Regular is **14.1% wider** than Garamontio

The second would be a very visible jump on every article. `fonts.css`
therefore defines `Vollda Fallback` and `Garamontio Fallback` — local Georgia
re-scaled with `size-adjust` (93.8% / 87.6%) plus ascent and descent
overrides. Ascent/descent are divided by the size-adjust factor, because
those percentages resolve against the already-adjusted em.

This also protects the hero headline specifically: it is `white-space:
nowrap` and sized from a measured `0.54em`-per-character figure. Unmatched
Georgia Bold runs `0.5511em/char` and would overflow that during the swap.

> Re-measure with `scripts/build-fonts.mjs` as the starting point if you ever
> change a family. Do not carry these numbers over to a different typeface.

### Detail settings

- `text-wrap: balance` on headings — stops the lonely one-word last line
- `text-wrap: pretty` on body — prevents orphans
- Sentence case for headings, not Title Case; sentence case reads faster and
  ages better
- Never centre more than ~2 lines of text; ragged left edges kill scan speed

---

## 3. Layout

### 8-point spacing grid

Every gap is a multiple of `0.5rem`. The scale (`--space-1` … `--space-24`) is
the *only* source of spacing values. Arbitrary `13px` margins are what make a
site feel subtly amateur even when nobody can point at why.

### Vertical rhythm beats horizontal decoration

Related elements sit closer together than unrelated ones — proximity does the
grouping work that people usually try to do with boxes and borders. If a
section needs a border to look separate, it probably needs more space instead.

### Container

`--width-container: 72rem` with `--space-6` inline padding, centred. Content
never touches the viewport edge on mobile.

### Grid over media queries

`repeat(auto-fit, minmax(<min>, 1fr))` handles most responsive layout with
zero breakpoints. Reach for `@media` only when the layout needs to genuinely
*change*, not merely reflow.

---

## 4. Responsiveness

### Mobile-first, and mobile-real

Base styles target small screens; `min-width` queries add complexity upward.
Breakpoints are placed where *this* layout breaks, not at device widths —
chasing specific phone models is a losing game.

```
48rem  (768px)   nav collapses to the expandable island
64rem  (1024px)  multi-column sections
```

### Touch targets: 44×44px minimum

Every link, button and form control. This is the Apple HIG figure and it is
not negotiable on a site where the mobile visitor is trying to tap a phone
number while standing up.

### Units

- `rem` for type and spacing — respects the user's browser font size
- `ch` for measure
- `%` / `fr` / `dvh` for layout — `dvh`, not `vh`, so mobile browser chrome
  does not clip the viewport
- `px` only for hairlines and shadows

### No horizontal scroll, ever

Wide things — tables, code blocks — scroll inside their own
`overflow-x: auto` container. The page body does not.

---

## 5. Motion

Transitions are 150–250ms with `ease-out`. Anything slower feels broken;
anything that moves without the user causing it is noise.

Every animation sits behind `prefers-reduced-motion: reduce` (already handled
globally in `global.css`). Vestibular disorders are common enough that this is
an accessibility requirement, not a nicety.

---

## 6. The floating header ("the island")

A pill-shaped bar floating clear of the top edge, in the spirit of the iPhone
Dynamic Island.

**Why it suits this site.** The header is not content — it is a persistent
control. Detaching it from the page edge says exactly that: it hovers *over*
the document rather than being the document's first row. It also lets the hero
background run to the top of the viewport, which makes a five-page brochure
site feel considered rather than templated.

**How it is built.**

- `position: fixed`, horizontally centred, `width: fit-content` — it is only
  as wide as its contents, which is what makes it read as an island rather
  than a bar
- `border-radius: 999px` (fully round ends, the defining Dynamic Island trait)
- Translucent surface + `backdrop-filter: blur(16px) saturate(180%)` so page
  content is *implied* through it while scrolling. A solid fallback is
  supplied via `@supports` for browsers without backdrop-filter
- The outer `<header>` is `pointer-events: none` and the pill re-enables them,
  so the gutter either side of the island stays clickable

**The shadow is deliberately bottom-biased and barely there:**

```css
--shadow-island:
  0 6px 16px -6px rgb(28 25 23 / 0.10),
  0 2px 5px -2px rgb(28 25 23 / 0.06);
```

Positive Y-offset with a *negative* spread pulls the blur inward and downward,
so it pools under the lower edge and does not halo the sides. Two stacked
layers — one tight and one diffuse — is how real light behaves; a single
large blur reads as a grey smudge. Opacity stays at 6–10%: the shadow should
be felt, not seen. If you can identify it as "a shadow" at a glance, it is
too strong.

A hairline `1px` border at ~8% opacity does the actual edge definition. The
shadow suggests height; the border draws the boundary. Shadow alone, cranked
up until the edge is legible, is the most common way this pattern goes wrong.

**It responds to scroll.** At the top of the page the island is roomy and its
shadow is minimal — nothing is beneath it yet. Once content scrolls under, it
tightens and the shadow deepens slightly, reinforcing that it is now floating
above something. Driven by an `IntersectionObserver` on a sentinel element, not
a scroll listener, so it costs nothing per frame.

**On mobile** it stays a pill — brand plus a menu button — and expands
downward into a rounded card, `border-radius` easing from `999px` toward
`--radius-lg`. The island metaphor holds at both sizes instead of degrading
into a conventional hamburger bar.

---

---

## 7. The animated headline

`Punem cifrele la punct.` — the words fade up, then the full stop drops in
from above the viewport, bounces, and rolls left into place.

The line is a pun: *a pune la punct* (to get in order) and *punct* (the full
stop). The animation performs the wordplay, which is the only reason motion
this elaborate is justified on a hero — it carries meaning rather than
decorating. The English line is written to preserve the payoff ("on point"),
because a dot animation attached to a sentence that does not end in a
conceptual point is just fidgeting.

**Zero JavaScript.** Framer Motion would cost ~34KB and force the hero to
become a hydrated island. This is CSS keyframes end to end.

### Alignment — anchor to the baseline, never to a guess

The real `.` stays in the markup at `color: transparent`. It reserves the
exact advance width and remains in the accessibility tree, so screen readers
and copy-paste get `Punem cifrele la punct.` intact.

The dot is then anchored with a **zero-size inline-block**:

```css
.headline__stage {
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: baseline;
  position: relative;
}
```

An inline-block containing no in-flow line boxes takes its baseline from its
*bottom margin edge* (CSS 2.1 §10.8.1). So this box's bottom edge lands
exactly on the text baseline — which is precisely where a period's ink sits.
The dot is then absolutely positioned at `bottom: 0` inside it.

The first version instead used `bottom: 0.3em` measured from the bottom of
the period's inline box. That is a guess: the distance from an inline box's
bottom edge to the baseline depends on `line-height` *and* the font's
descender metric, so it was wrong — and wrong by a different amount at every
step of the fluid type scale. **If you find yourself tuning a vertical offset
by eye against text, you are anchoring to the wrong edge.** There is almost
always a baseline-relative construction that is exact.

> The whitespace in the component's template is load-bearing. JSX indentation
> becomes text nodes; the first build rendered `punct .` with a visible gap
> before the period. Word gaps come from explicit `{' '}` only.

### Fitting one line

The headline is `white-space: nowrap`, so it has to shrink rather than wrap.
CSS cannot measure text — but the component knows the string at build time,
so it passes the character count as `--chars` and the width is predicted:

```css
font-size: min(var(--text-3xl), calc(100cqi / (var(--chars) * 0.56 + 1.4)));
```

`cqi` rather than `vw`, because the viewport ignores the container's
`max-width` and padding. The `+ 1.4` reserves the dot's landing position,
1.4em to the right of the period, which would otherwise be pushed into
horizontal overflow by a line that exactly fills its container.

The `0.56em`-per-character figure is deliberately generous. The line cannot
wrap, so an underestimate causes horizontal page scroll while an overestimate
merely makes the headline a little smaller than it had to be. Err large.

The cost, stated plainly: at 375px the headline renders at ~23px instead of
the 33px the type scale would otherwise give it. One line is a real
constraint, not a free choice — **keep both language strings short and
roughly equal in length**, since the longer of the two sets the size.

### Four transforms, four elements

`translateX`, `translateY`, `rotate` and `scale` each get their own nested
element. One element cannot carry four animations with different durations,
delays and easings — they would fight over the single `transform` property.

### Physics

- **Gravity needs per-keyframe easing.** `animation-timing-function` is set
  *inside* the keyframes: accelerating on the way down, decelerating on the
  way up. A single easing across the whole animation cannot express a bounce.
- **Squash on impact.** Shares the drop's duration and delay so its
  percentages line up exactly with the two contact moments.
- **The spin is derived, not guessed.** A rolling circle turns
  distance ÷ circumference times: `1.4em ÷ (π × 0.16em)` = 2.79 turns ≈
  **1000°**. Both values are in `em`, so the relationship holds at any size.
- **The dot needs an off-centre highlight.** A uniform circle shows no
  rotation whatsoever — without the asymmetry the roll is literally invisible.
  This is the detail that decides whether the effect reads at all.
- **The roll starts 60ms before the bounce settles.** Strict sequencing reads
  as robotic; slight overlap reads as physical.

### Constraints it has to respect

`max-width: 16ch` on the headline is not only a measure decision — it keeps
the last line clear of the container edge, so the dot's landing position
(1.4em to the *right* of the period) can never create horizontal overflow.
Transforms do generate scrollable overflow in the inline direction.

Under `prefers-reduced-motion: reduce` there is no travel, no bounce and no
spin — the content cross-fades in place.

---

## Checklist before shipping any new component

- [ ] No raw hex values, no off-scale spacing
- [ ] Text contrast measured, not eyeballed
- [ ] Keyboard reachable, visible `:focus-visible` ring
- [ ] Touch targets ≥ 44px
- [ ] Works at 320px wide and at 200% browser zoom
- [ ] Readable in both colour schemes
- [ ] Nothing conveyed by colour alone
