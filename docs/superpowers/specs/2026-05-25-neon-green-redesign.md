# Neon Green Redesign — Floating Header + Full Color System + Background Animations

## Goal

Transform the site's accent system from electric blue to full neon green, detach the header into a floating pill bar, and add helixearth-inspired drifting gradient orb background animations.

## 1. Floating Pill Header

The header detaches from the top edge and becomes a centered floating pill.

- **Position:** `fixed`, centered horizontally via flex container, `top: 16px`
- **Shape:** `rounded-full`, `max-width: 800px` on desktop, responsive on mobile
- **Background:** Dark glass — `backdrop-blur-xl` with `bg-background/60`
- **Border:** `1px solid oklch(0.85 0.25 145 / 0.15)` (faint neon green)
- **On scroll (scrollY > 40):**
  - Padding shrinks (`px-6 py-3` → `px-4 py-2`)
  - Max-width shrinks (`max-w-4xl` → `max-w-2xl`)
  - Border brightens to `oklch(0.85 0.25 145 / 0.3)`
  - Gains a neon green shadow: `0 0 12px oklch(0.85 0.25 145 / 0.15)`
- **Logo:** "Zero" in neon green, "Day" in foreground white
- **Nav links:** `text-muted-foreground`, on hover/active: `text-neon` with a centered 2px neon green underline that expands from center
- **CTA button:** Solid neon green background (`--neon`), dark text, `hover:shadow-neon hover:scale-105`
- **Mobile:** Same pill shape, hamburger button with green border. Menu expands inside the pill with a top border divider. Links get green hover/active states. CTA is full-width green pill.
- **Accessibility:** Skip-link preserved, aria-labels on toggle, focus-visible rings use neon green

## 2. Neon Green Color System

Replace all blue accent tokens and references site-wide.

### New CSS Custom Properties

```
--neon: oklch(0.85 0.25 145)        /* Vivid neon green — primary accent */
--neon-soft: oklch(0.72 0.18 155)   /* Deeper green — secondary/gradients */
```

### Removed Tokens

```
--accent-blue: oklch(0.62 0.2 255)   → replaced by --neon
--accent-cyan: oklch(0.78 0.13 200)  → replaced by --neon-soft
```

### Theme Variable Updates

```
--color-neon: var(--neon)
--color-neon-soft: var(--neon-soft)
--shadow-glow: 0 0 30px oklch(0.85 0.25 145 / 0.3), 0 0 60px oklch(0.85 0.25 145 / 0.15)
--shadow-neon: 0 0 20px oklch(0.85 0.25 145 / 0.4), 0 0 40px oklch(0.85 0.25 145 / 0.2)
--shadow-neon-sm: 0 0 12px oklch(0.85 0.25 145 / 0.15), 0 4px 16px oklch(0 0 0 / 0.3)
```

### What Changes Across the Site

- `--primary` stays as-is (foreground color for buttons) — only accent references change
- `--accent` variable: `var(--accent-blue)` → `var(--neon)`
- `--ring` variable: `var(--accent-blue)` → `var(--neon)`
- `::selection` background: neon green
- `:focus-visible` outline: neon green
- `.skip-link` background: neon green
- `.glass` border: green-tinted (`oklch(0.85 0.25 145 / 0.12)`)
- `.glass-card` border: green-tinted (`oklch(0.85 0.25 145 / 0.1)`)
- `.tech-grid` lines: green-tinted (`oklch(0.85 0.25 145 / 0.07)`)
- `.float-particles` color: green-tinted (`oklch(0.85 0.25 145 / 0.25)`)
- `.scan-line` gradient: neon green → neon-soft
- `.glitch` text-shadow: neon green + magenta complement
- `.terminal` border: green-tinted
- `.term-caret` color: neon green
- `.pill-dark` and `.pill-accent`: background neon green, dark text
- `.card-hover:hover` border-color: green glow
- `.hero-glow`: green-tinted radial gradient
- `.status-dot`: neon green with green box-shadow
- `.data-flow` gradient: neon green → neon-soft
- `.gradient-mesh`: green-tinted radial gradients

### Per-Component Color Changes

All `accent-blue` → `neon`, all `accent-cyan` → `neon-soft`:

- **hero.tsx:** Terminal prompts, second headline line, status pills, CTA
- **focus-grid.tsx:** Icon hover background
- **process-steps.tsx:** Step indicator dots
- **testimonials.tsx:** Avatar gradient
- **selected-works.tsx:** Card gradients (Specra AR, Vectra Flow, SyncBridge), "View all" link hover, arrow hover
- **about-timeline.tsx:** Brand name highlight
- **case-studies.tsx:** Card accents (Specra AR, Vectra Flow, SyncBridge), "The Challenge" label
- **site-footer.tsx:** Navigation link hover color
- **contact.tsx:** Mail/MapPin icon tint, form focus rings

## 3. Background Animations

Four CSS layers in `TechBackground` component, inspired by helixearth.com's atmospheric depth.

### Layer 1: Drifting Gradient Orbs

Four large blurred circles that float slowly around the viewport.

| Orb | Size | Color | Position Start | Animation Duration |
|-----|------|-------|----------------|-------------------|
| 1 | 500px | `oklch(0.85 0.25 145 / 0.5)` (neon green) | top: -10%, left: -5% | 25s |
| 2 | 400px | `oklch(0.72 0.18 155 / 0.35)` (soft green) | top: 30%, right: -8% | 30s |
| 3 | 350px | `oklch(0.65 0.15 170 / 0.3)` (green-teal) | bottom: 10%, left: 20% | 22s |
| 4 | 300px | `oklch(0.55 0.12 180 / 0.25)` (deep green-blue) | top: 60%, right: 25% | 28s |

All orbs: `border-radius: 50%`, `filter: blur(80px)`, `opacity: 0.35`, `will-change: transform`.

Each has a unique keyframe with 3-4 waypoints using `translate()` and `scale()` for organic, non-repetitive drift. Translations range ±50-120px, scale oscillates 0.9-1.1.

### Layer 2: Grain Texture

Existing SVG noise filter at 3% opacity. No changes needed.

### Layer 3: Mouse-Reactive Glow

A `div` covering the full viewport. JS `mousemove` event sets `--glow-x` and `--glow-y` CSS custom properties on the element. CSS renders a `radial-gradient(600px circle at var(--glow-x) var(--glow-y), oklch(0.85 0.25 145 / 0.04), transparent 60%)`.

- Starts at `opacity: 0`, transitions to `opacity: 1` on first mouse move
- Skipped on touch devices (`pointer: coarse` media query)
- `pointer-events: none` so it doesn't interfere with interaction

### Layer 4: Tech Grid

Existing grid but recolored to neon green tint: `oklch(0.85 0.25 145 / 0.07)`.

### Existing: Code Particles

Keep floating code snippets but recolor to `oklch(0.85 0.25 145 / 0.25)`.

## 4. Files Changed

| File | Change Type |
|------|-------------|
| `src/styles.css` | Color tokens, shadow tokens, orb keyframes, all blue→green references in utilities |
| `src/components/site-header.tsx` | Full rewrite — floating pill with green accents |
| `src/components/tech-background.tsx` | Add orb divs + mouse glow layer |
| `src/components/hero.tsx` | `accent-blue` → `neon`, `accent-cyan` → `neon-soft` |
| `src/components/focus-grid.tsx` | `accent-blue` → `neon` |
| `src/components/process-steps.tsx` | `accent-blue` → `neon` |
| `src/components/testimonials.tsx` | `accent-blue` → `neon` |
| `src/components/selected-works.tsx` | `accent-blue` → `neon`, `accent-cyan` → `neon-soft` |
| `src/components/about-timeline.tsx` | `accent-blue` → `neon` |
| `src/components/case-studies.tsx` | `accent-blue` → `neon`, `accent-cyan` → `neon-soft` |
| `src/components/site-footer.tsx` | `accent-blue` → `neon` |
| `src/routes/contact.tsx` | `accent-blue` → `neon` |
| `src/routes/__root.tsx` | No changes needed (fonts + TechBackground already correct) |

## 5. Constraints

- All animations respect `prefers-reduced-motion: reduce` — orbs stop, particles stop, grid stops
- Orbs use `will-change: transform` for GPU acceleration
- Mouse glow skips on touch devices
- Header remains accessible: skip-link, focus rings, aria-labels
- No new JS dependencies — pure CSS animations + one mousemove listener
- SSR-safe: orbs render statically, mouse glow initializes in useEffect
