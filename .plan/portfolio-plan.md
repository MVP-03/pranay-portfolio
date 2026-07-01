# Pranay Personal Portfolio — Plan

## Goal
A personal site for Pranay that reads as multi-disciplinary (tech + creative),
not a generic dev-portfolio template. Visitors should leave remembering one
thing: Pranay builds things across disciplines and the craft shows in the
site itself, not just in the project descriptions.

## Stack
- React + Vite
- Deployed as a static site (host TBD — Vercel/Netlify)
- No CMS initially; content authored in code/MDX

## Sections
1. **Home** — intro, photo, one-line identity statement, one CTA, featured
   projects preview, brief about blurb. About is a homepage block, not a
   separate route (resolved below — no standalone About page in v1).
2. **Projects** — index at `/projects`, each project also has its own route
   `/projects/:slug` (case-study page): problem, approach, outcome, tech
   used, links (live/demo, repo).
3. **Resume / Experience** — work history, education, skills, downloadable
   PDF resume.
4. **Contact** — email, LinkedIn, GitHub, socials. Simple mailto or contact
   form (no backend initially — mailto link or a form service like Formspree).

Blog is out of scope for v1 (flagged as future scope, not a shortcut).

## Navigation (resolved)
Multi-route via React Router, not single-page anchors: `/`, `/projects`,
`/projects/:slug`, `/resume`, `/contact`. Rationale: project case studies
need shareable/indexable URLs (a recruiter should be able to link directly
to one project), and the back button must return from a case study to the
projects index rather than to the top of a single page. Anchors don't
survive a case-study page existing as a distinct piece of content, so this
is settled, not deferred.

Nav bar (persistent, all routes): logo/mark (Home), Projects, Resume,
Contact — satisfies the trunk test (what site, what page, what's here).

## Open design questions (for review)
- Visual identity: what makes this feel "multi-disciplinary" rather than a
  generic SaaS/dev-portfolio template?
- Information hierarchy on the homepage — what's the primary visual anchor?
- Project card design — how much detail up front vs. behind a click?
- Empty/loading/error states for the contact form.
- Responsive behavior for project cards and resume section on mobile.
- Accessibility: keyboard nav, contrast, focus states.

## Visual Identity: Hybrid (professional base + pixel-art accents)

Inspiration: retro 8-bit aesthetic (ref: bearlike/Pixel-Portfolio-Website —
pixel cursors, pixel social icons, playful 404). Adopted selectively, not
wholesale, so the site still reads as credible to a recruiter skimming in
5 seconds while still being memorable.

**What's professional (the base):**
- Layout: clean grid, generous whitespace, real typographic hierarchy —
  not a retro CRT/scanline layout.
- Body copy, project descriptions, resume section: standard readable
  sans-serif (e.g. Inter or system-ui stack), normal weight, no pixel font.
- Color: warm-neutral base (off-white/cream background, near-black text,
  one warm accent — e.g. terracotta or amber) — NOT a SaaS blue/purple
  gradient, NOT a full 8-bit palette.

**What's pixel-art (the accent, used sparingly, max 3 places):**
1. **Custom pixel cursor** on desktop only (default + pointer-hover state)
   — signature touch, first thing a visitor notices on mouse move.
2. **Pixel-art favicon + a small pixel-art mark next to the name** in the
   header/hero — not a full pixel hero image.
3. **Pixel-art social icons** (GitHub/LinkedIn/email) in the footer/contact
   section, replacing generic icon-font icons.

**Explicitly NOT pixel-art:** navigation, buttons/CTAs, project card
chrome, resume/experience section, body text, form fields. These stay in
the clean professional system so usability and scanability aren't
compromised by novelty.

**Hard rejection check:** this avoids the generic-SaaS-card-grid trap
(distinctive accent + real typographic anchor, not stock hero imagery) and
avoids "cute but unusable" (pixel elements are decorative accents, not the
interaction model — no pixel-font body text, no custom pixel cursor that
breaks precision clicking on interactive elements).

## Homepage Information Hierarchy

1. **First (visceral, 0-3s):** Name + one-line identity statement, set in
   a large, confident type size (e.g. 56-72px desktop / 32-40px mobile).
   The pixel-art mark sits beside the name — small, not competing for
   primary attention.
2. **Second (0-5s):** Single CTA button — "See my work" — visually
   distinct via the warm accent color and underline-on-hover, positioned
   directly below the identity statement. Only one CTA on the fold; no
   competing secondary buttons.
3. **Third (5s+, scroll):** Featured projects preview — 2-3 project cards
   max on the homepage (not the full list), each with a one-line outcome
   statement, not just a title. "View all projects" link below.
4. **Fourth:** Brief about blurb (2-3 sentences) — homepage block, not a
   separate route (see Navigation).

**Identity statement (resolved copy):** "I build software — and bonds with
people." Pranay's stated differentiator isn't a second craft discipline
but relational/people-first work alongside engineering. This reframes the
about blurb too: it should give one concrete example of that (e.g. how a
project involved collaborating with/for people, not just shipping code)
rather than staying abstract — an abstract claim about "bonds with
people" with no evidence reads as filler, the specific example is what
makes a recruiter remember it.

Trunk test: covering everything except the header, a visitor still knows
whose site this is (name + mark), what they do (identity statement), and
what to do next (CTA) — satisfies wayfinding.

## Project Card Design

- **Upfront (card face):** Project title, one-line outcome statement
  (what changed / what shipped — not a feature list), 2-3 tech tags,
  a single representative visual (screenshot/diagram, not a generic
  icon).
- **Behind a click (case-study page or expand):** Problem, approach,
  outcome in more detail, links (live demo, repo).
- Card is a real card only if it earns it: no shadow/border decoration
  without content need. Whole card is a clickable region (not just a
  small "read more" link) — larger hit target, follows Fitts's law.
- Hover state (desktop): subtle lift/accent-color border, signals
  clickability without relying on it (card is a `<button>`/link
  semantically, so keyboard/touch users aren't dependent on hover).
- **Image loading/fallback:** low-color placeholder (blurred/solid swatch
  matching the palette) while the screenshot loads; if the image fails to
  load, fall back to the project title on a solid accent-color background
  — never a broken-image icon.
- **Optional links:** if a project has no live demo (repo-only), show only
  the repo link — do not render a disabled/greyed-out "Live demo" link.
  Never show a link that goes nowhere.
- **Zero projects (pre-launch safety):** if the projects array is empty,
  the homepage preview section and `/projects` index both render a plain
  "Projects coming soon" state instead of an empty grid — this should
  never actually ship empty, but the component must not render broken.

## States: Contact Form

- **Empty/default:** Name, email, message fields with visible labels
  (not placeholder-only labels — placeholders disappear on focus and
  users forget what they typed).
- **Validation error (inline, on blur):** e.g. "Enter a valid email" under
  the field, red text + red field border, not just a color change (for
  colorblind users).
- **Submitting:** Button shows a loading state ("Sending…") and disables
  to prevent double-submit.
- **Success:** Replace form with a confirmation message ("Thanks — I'll
  get back to you soon") — not a redirect, no modal, stays in place.
- **Error (network/service failure):** Inline message with a direct
  mailto fallback ("Something went wrong — email me directly at
  [address] instead") so a form outage never fully blocks contact.
- **Post-submit expectation-setting:** success message states a response
  window ("I'll reply within 2 business days") — closes the emotional
  loop instead of leaving the visitor wondering if it worked.

## Resume Section (resolved)

The `/resume` route is a skimmable inline list (roles, dates, one-line
impact per role, education, skills) — not a bare "download the PDF"
prompt. Recruiters frequently won't download a file just to check
qualifications. A "Download PDF" button sits above the inline list for
those who do want the file (e.g. to attach to an application).

## Dark Mode (resolved)

Out of scope for v1. Light mode only, ship the warm-neutral palette
first. Flagged as real future scope (not a corner cut) because: (a) the
pixel-art accent assets (mark, icons, cursor) need separate light/dark
variants to keep contrast correct, which is extra asset work, and (b) v1
priority is getting the professional base and identity right before
adding a second theme surface to maintain.

## Responsive Behavior

- **Breakpoints:** mobile (<640px), tablet (640-1024px), desktop (>1024px)
  — not just "stacks on mobile."
- **Mobile:** Single-column project cards, full-width CTA button (min
  44px touch target height), pixel cursor accent disabled (no cursor
  concept on touch — pixel mark stays as a static favicon/header element
  only).
- **Tablet:** 2-column project grid.
- **Desktop:** 3-column project grid on the full Projects page; homepage
  preview stays at 2-3 cards regardless of width (don't stretch to fill).
- Resume section: table-like experience list becomes stacked cards on
  mobile (no horizontal scroll of a table).

## Accessibility

- Keyboard nav: all interactive elements (project cards, CTA, form
  fields, social links) reachable via Tab in logical order; visible focus
  ring (not `outline: none` without replacement).
- Contrast: body text and accent-on-background combinations meet WCAG AA
  (4.5:1 for body text, 3:1 for large text/UI components) — verify the
  warm accent color against the cream background specifically, warm
  accent colors often fail contrast at default saturation.
- Touch targets: minimum 44x44px for buttons/links on mobile.
- Pixel-art decorative elements (mark, icons) get `alt=""`/`aria-hidden`
  if purely decorative; social icons get accessible labels ("GitHub
  profile") since they're functional links, not decoration.
- Custom cursor is a progressive enhancement (CSS `cursor` property with
  a standard fallback) — never required for interaction.

## GSTACK REVIEW REPORT

| Pass | Status | Notes |
|---|---|---|
| Visual identity | Resolved | Hybrid: professional base + pixel-art accents (cursor, mark, social icons only). Avoids generic-SaaS and full-retro-gimmick extremes. |
| Homepage hierarchy | Resolved | Identity statement → CTA → featured projects → about blurb. Trunk test passes. |
| Copy specificity | Resolved | Identity statement drafted with real content ("I build software — and bonds with people"), not left as a placeholder. |
| Navigation / IA | Resolved (was left "TBD" pre-review) | Multi-route (React Router): `/`, `/projects`, `/projects/:slug`, `/resume`, `/contact`. About is a homepage block, not a route. |
| Project cards | Resolved | Card content model, click target, hover state, image loading/fallback, optional-link handling, zero-state all specified. |
| States (contact form) | Resolved | Empty, validation, submitting, success, error, and post-submit expectation-setting all specified. |
| Responsive | Resolved | Breakpoints, per-breakpoint grid behavior, cursor-accent disabled on touch, resume table→cards on mobile. |
| Accessibility | Resolved | Keyboard nav, focus rings, WCAG AA contrast (flagged warm-accent risk), touch targets, decorative vs. functional icon labeling. |
| Resume format | Resolved | Skimmable inline list + PDF download button, not PDF-only. |
| Dark mode | Explicitly deferred | Out of scope for v1, named as real future scope (asset variants needed), not a silent cut. |
| Independent design critique | Run | General-purpose agent review — found nav/case-study routing left unresolved (critical) and 4 missing-state/content gaps (high/medium). All findings addressed above. |

Outside voices: Codex not invoked (not requested by user; independent
Claude subagent critique used instead per the confirmed second-opinion
step).

Runs: 1 plan-authoring pass, 1 independent critique pass, 1 remediation
pass (this document).

VERDICT: Plan is implementation-ready for v1 scope. All critical/high
findings from the independent critique were resolved in-document. Medium
finding (resume PDF vs. inline) and low finding (post-submit expectation
copy) also resolved. Dark mode intentionally deferred, not silently cut.

**UNRESOLVED DECISIONS:**
- Deploy host (Vercel vs. Netlify) — functionally interchangeable for a
  static Vite site, not a design decision, left for implementation time.
- Contact form backend (Formspree vs. another no-backend form service) —
  implementation choice, does not affect the specified states/UX above.
