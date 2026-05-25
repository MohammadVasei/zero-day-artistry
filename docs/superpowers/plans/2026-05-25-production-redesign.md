# Zero Day Artistry — Production Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Zero Day Artistry from a cyber-themed prototype into a production-stunning marketing site with a distinctive Minimalism + Brutalism + Glassmorphism hybrid visual identity, cinematic Awwwards-level animations, and full Payload CMS admin control for key pages.

**Architecture:** Complete visual redesign of the frontend (new design system, typography, color palette, animations). Expand Payload CMS with new collections (ContactSubmissions, SiteSettings, Testimonials, CaseStudies, Projects). Make Home, About, and Portfolio pages CMS-driven via the page builder, while Header/Footer/Contact stay code-controlled with editable content from a SiteSettings global. Contact form submissions POST to the Payload REST API and are stored in a ContactSubmissions collection.

**Tech Stack:** TanStack Start (React 19 SSR), Tailwind CSS 4 (oklch), Payload CMS 3 (Next.js 15 + PostgreSQL), Lucide icons, CSS keyframe animations + Intersection Observer for scroll-triggered reveals.

---

## File Structure Overview

### New Files
- `src/styles/design-tokens.css` — New design system variables (replaces theme in styles.css)
- `src/components/scroll-reveal.tsx` — Reusable scroll-triggered animation wrapper
- `src/components/magnetic-cursor.tsx` — Magnetic cursor effect for desktop
- `src/components/text-reveal.tsx` — Cinematic text splitting/reveal animation
- `src/components/glass-card.tsx` — Reusable glassmorphism card component
- `src/components/page-transition.tsx` — Section transition with momentum
- `src/hooks/use-scroll-reveal.ts` — Intersection Observer hook for scroll animations
- `src/hooks/use-magnetic.ts` — Hook for magnetic cursor pull effect
- `src/hooks/use-reduced-motion.ts` — Hook to check prefers-reduced-motion
- `payload-cms/collections/ContactSubmissions.ts` — Contact form data collection
- `payload-cms/collections/Testimonials.ts` — Testimonials collection
- `payload-cms/collections/CaseStudies.ts` — Case studies collection
- `payload-cms/collections/Projects.ts` — Portfolio projects collection
- `payload-cms/globals/SiteSettings.ts` — Global site settings (header/footer/contact info)
- `.env.example` — Environment variable documentation

### Modified Files
- `src/styles.css` — Complete redesign: new color palette, typography, animations, remove cyber theme
- `src/routes/__root.tsx` — Remove CyberBackground, add magnetic cursor, new fonts
- `src/routes/index.tsx` — CMS-driven home page with page builder
- `src/routes/about.tsx` — CMS-driven about page
- `src/routes/portfolio.tsx` — CMS-driven portfolio page
- `src/routes/contact.tsx` — Wire form to Payload CMS API
- `src/components/site-header.tsx` — Redesign with glassmorphism + animations
- `src/components/site-footer.tsx` — Redesign with new visual identity
- `src/components/hero.tsx` — Complete redesign: exaggerated minimalism + glass + cinematic text
- `src/components/products-marquee.tsx` — Redesign marquee with new style
- `src/components/focus-grid.tsx` — Redesign with glass cards + scroll reveal
- `src/components/process-steps.tsx` — Redesign with staggered reveals
- `src/components/testimonials.tsx` — CMS-driven, glass cards, scroll animations
- `src/components/selected-works.tsx` — CMS-driven, cinematic hover effects
- `src/components/about-timeline.tsx` — Redesign with staggered line reveals
- `src/components/case-studies.tsx` — CMS-driven, cinematic accordion reveals
- `src/components/cta-section.tsx` — Redesign with gradient mesh background
- `src/components/blocks/block-renderer.tsx` — Add new block types (testimonials, caseStudies, focusGrid, timeline)
- `src/lib/payload.functions.ts` — Add functions for testimonials, case studies, projects, settings, contact submission
- `payload-cms/payload.config.ts` — Add new collections, globals, and block definitions

---

## Task 1: Design System — New Color Palette, Typography, CSS Variables

**Files:**
- Modify: `src/styles.css` (lines 1–306, full rewrite of theme section)
- Modify: `src/routes/__root.tsx` (lines 88–96, update font imports)

This task replaces the cyber-blue oklch theme with a distinctive hybrid palette: deep charcoal base (#0F172A), warm off-white (#FAFAF9), gold accent (#CA8A04), with glassmorphism utilities.

Typography: **Outfit** (headings — geometric, bold, brutalist) + **Work Sans** (body — clean, readable) + **JetBrains Mono** (code/accents).

- [ ] **Step 1: Rewrite the CSS theme variables in `src/styles.css`**

Replace lines 1–101 (everything from `@import` through the `.dark` block) with:

```css
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: "Work Sans", ui-sans-serif, system-ui, sans-serif;
  --font-heading: "Outfit", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --shadow-card: 0 1px 2px oklch(0 0 0 / 0.04), 0 8px 24px -4px oklch(0 0 0 / 0.08);
  --shadow-glass: 0 8px 32px oklch(0 0 0 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.05);
  --shadow-elevated: 0 20px 60px -12px oklch(0 0 0 / 0.25);
}

:root {
  --radius: 1rem;

  /* Charcoal + Warm White base */
  --background: oklch(0.985 0.002 80);
  --foreground: oklch(0.13 0.02 260);

  /* Gold accent */
  --accent-gold: oklch(0.7 0.15 85);
  --accent-gold-soft: oklch(0.8 0.1 85);

  --card: oklch(1 0 0);
  --card-foreground: oklch(0.13 0.02 260);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.13 0.02 260);

  --primary: oklch(0.13 0.02 260);
  --primary-foreground: oklch(0.985 0.002 80);
  --secondary: oklch(0.965 0.002 80);
  --secondary-foreground: oklch(0.13 0.02 260);
  --muted: oklch(0.955 0.002 80);
  --muted-foreground: oklch(0.45 0.02 260);
  --accent: var(--accent-gold);
  --accent-foreground: oklch(0.13 0.02 260);
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(0.985 0.002 80);
  --border: oklch(0.91 0.002 80);
  --input: oklch(0.93 0.002 80);
  --ring: var(--accent-gold);
}

.dark {
  --background: oklch(0.13 0.02 260);
  --foreground: oklch(0.95 0.005 80);
  --card: oklch(0.17 0.02 260);
  --card-foreground: oklch(0.95 0.005 80);
  --primary: oklch(0.95 0.005 80);
  --primary-foreground: oklch(0.13 0.02 260);
  --secondary: oklch(0.2 0.02 260);
  --secondary-foreground: oklch(0.95 0.005 80);
  --muted: oklch(0.2 0.02 260);
  --muted-foreground: oklch(0.65 0.01 260);
  --border: oklch(1 0 0 / 8%);
  --input: oklch(1 0 0 / 12%);
}
```

- [ ] **Step 2: Replace the `@layer base` and utility sections with new design system**

Replace everything from `@layer base` (line 103) through the end of the file (line 306) with:

```css
@layer base {
  * {
    border-color: var(--color-border);
  }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ::selection {
    background: var(--accent-gold);
    color: var(--color-foreground);
  }
  :focus-visible {
    outline: 2px solid var(--accent-gold);
    outline-offset: 3px;
    border-radius: 4px;
  }
  .skip-link {
    position: fixed;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 100;
    padding: 0.6rem 1rem;
    border-radius: 9999px;
    background: var(--color-foreground);
    color: var(--color-background);
    font-size: 0.8rem;
    font-weight: 600;
    transform: translateY(-150%);
    transition: transform 180ms ease-out;
  }
  .skip-link:focus-visible {
    transform: translateY(0);
    outline: 2px solid var(--accent-gold);
    outline-offset: 3px;
  }
  html {
    scroll-behavior: smooth;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal, .text-split span, .stagger-in > * {
    opacity: 1 !important;
    transform: none !important;
  }
  .marquee-track {
    animation: none !important;
  }
}

@layer utilities {
  /* ---- Typography ---- */
  .font-heading {
    font-family: var(--font-heading);
    font-weight: 700;
    letter-spacing: -0.03em;
  }
  .text-display {
    font-family: var(--font-heading);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 0.95;
  }
  .text-giant {
    font-size: clamp(3rem, 10vw, 10rem);
    font-family: var(--font-heading);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.9;
  }

  /* ---- Glassmorphism ---- */
  .glass {
    background: oklch(1 0 0 / 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid oklch(1 0 0 / 0.1);
  }
  .glass-card {
    background: oklch(1 0 0 / 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid oklch(1 0 0 / 0.12);
    box-shadow: var(--shadow-glass);
  }
  .glass-dark {
    background: oklch(0.13 0.02 260 / 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid oklch(1 0 0 / 0.06);
  }

  /* ---- Brutalist accents ---- */
  .brutalist-border {
    border: 3px solid var(--color-foreground);
  }
  .brutalist-shadow {
    box-shadow: 6px 6px 0 var(--color-foreground);
  }

  /* ---- Scroll reveal animations ---- */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-left {
    opacity: 0;
    transform: translateX(-60px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-left.revealed {
    opacity: 1;
    transform: translateX(0);
  }
  .reveal-scale {
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-scale.revealed {
    opacity: 1;
    transform: scale(1);
  }

  /* ---- Text split animation ---- */
  .text-split span {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .text-split.revealed span {
    opacity: 1;
    transform: translateY(0);
  }

  /* ---- Stagger children ---- */
  .stagger-in > * {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .stagger-in.revealed > *:nth-child(1) { transition-delay: 0ms; }
  .stagger-in.revealed > *:nth-child(2) { transition-delay: 80ms; }
  .stagger-in.revealed > *:nth-child(3) { transition-delay: 160ms; }
  .stagger-in.revealed > *:nth-child(4) { transition-delay: 240ms; }
  .stagger-in.revealed > *:nth-child(5) { transition-delay: 320ms; }
  .stagger-in.revealed > *:nth-child(6) { transition-delay: 400ms; }
  .stagger-in.revealed > *:nth-child(7) { transition-delay: 480ms; }
  .stagger-in.revealed > *:nth-child(8) { transition-delay: 560ms; }
  .stagger-in.revealed > * {
    opacity: 1;
    transform: translateY(0);
  }

  /* ---- Marquee ---- */
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee-scroll 40s linear infinite;
  }
  @keyframes marquee-scroll {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* ---- Gradient mesh background ---- */
  .gradient-mesh {
    background:
      radial-gradient(ellipse 80% 50% at 20% 40%, oklch(0.7 0.15 85 / 0.15), transparent),
      radial-gradient(ellipse 60% 60% at 80% 20%, oklch(0.5 0.1 260 / 0.08), transparent),
      radial-gradient(ellipse 70% 50% at 50% 80%, oklch(0.6 0.12 200 / 0.06), transparent);
  }

  /* ---- Grain texture ---- */
  .grain {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
  }

  /* ---- Utility pills ---- */
  .pill {
    @apply inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium;
  }
  .pill-dark {
    @apply inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all;
  }
  .pill-dark:hover {
    transform: scale(1.03);
    box-shadow: var(--shadow-elevated);
  }
  .pill-accent {
    @apply inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all;
    background: var(--accent-gold);
    color: oklch(0.13 0.02 260);
  }
  .pill-accent:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 30px oklch(0.7 0.15 85 / 0.3);
  }

  /* ---- Hairline dividers ---- */
  .hairline {
    border-top: 1px solid var(--color-border);
  }

  /* ---- Magnetic hover ---- */
  .magnetic {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ---- Card hover lift ---- */
  .card-hover {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-elevated);
  }
}
```

- [ ] **Step 3: Update font imports in `src/routes/__root.tsx`**

In `src/routes/__root.tsx`, replace line 12:
```tsx
import { CyberBackground } from "@/components/cyber-background";
```
with:
```tsx
// CyberBackground removed — replaced by gradient-mesh and grain in individual sections
```

Replace lines 89–96 (the fonts `links` array entries):
```tsx
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap",
      },
```
with:
```tsx
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Work+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
```

- [ ] **Step 4: Remove CyberBackground from the root component**

In `src/routes/__root.tsx`, replace lines 118–127:
```tsx
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CyberBackground />
      <Outlet />
    </QueryClientProvider>
  );
}
```
with:
```tsx
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
```

- [ ] **Step 5: Verify the dev server starts without errors**

Run: `cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run dev`
Expected: Dev server starts, no CSS compilation errors

- [ ] **Step 6: Commit**

```bash
git add src/styles.css src/routes/__root.tsx
git commit -m "feat: replace cyber theme with minimalist-brutalist-glass design system

New color palette (charcoal + gold), Outfit/Work Sans typography,
glassmorphism utilities, scroll-reveal animations, brutalist accents."
```

---

## Task 2: Animation Hooks — Scroll Reveal, Magnetic Cursor, Reduced Motion

**Files:**
- Create: `src/hooks/use-scroll-reveal.ts`
- Create: `src/hooks/use-magnetic.ts`
- Create: `src/hooks/use-reduced-motion.ts`
- Create: `src/components/scroll-reveal.tsx`
- Create: `src/components/text-reveal.tsx`

- [ ] **Step 1: Create `src/hooks/use-reduced-motion.ts`**

```ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Create `src/hooks/use-scroll-reveal.ts`**

```ts
import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver that adds the `revealed` class
 * when the element enters the viewport. Once revealed, disconnects.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("revealed");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}
```

- [ ] **Step 3: Create `src/hooks/use-magnetic.ts`**

```ts
import { useEffect, useRef, useCallback } from "react";

/**
 * Magnetic pull effect — element subtly follows the cursor
 * when hovering within `distance` pixels. Only on non-touch devices.
 */
export function useMagnetic<T extends HTMLElement>(distance = 0.3) {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * distance}px, ${y * distance}px)`;
    },
    [distance],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
```

- [ ] **Step 4: Create `src/components/scroll-reveal.tsx`**

```tsx
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type RevealVariant = "up" | "left" | "scale";

const variantClass: Record<RevealVariant, string> = {
  up: "reveal",
  left: "reveal-left",
  scale: "reveal-scale",
};

export function ScrollReveal({
  children,
  variant = "up",
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });

  return (
    <Tag
      ref={ref as any}
      className={`${variantClass[variant]} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 5: Create `src/components/text-reveal.tsx`**

```tsx
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Splits text into words and animates each on scroll entry.
 * Each word gets a staggered delay for a cinematic reveal.
 */
export function TextReveal({
  children,
  className = "",
  staggerMs = 50,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  staggerMs?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const words = children.split(" ");

  return (
    <Tag ref={ref as any} className={`text-split ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ transitionDelay: `${i * staggerMs}ms` }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/hooks/use-scroll-reveal.ts src/hooks/use-magnetic.ts src/hooks/use-reduced-motion.ts src/components/scroll-reveal.tsx src/components/text-reveal.tsx
git commit -m "feat: add animation hooks and scroll-reveal components

Intersection Observer based scroll reveals, magnetic cursor hook,
reduced-motion detection, text splitting animation."
```

---

## Task 3: Redesign Header + Footer

**Files:**
- Modify: `src/components/site-header.tsx` (full rewrite)
- Modify: `src/components/site-footer.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `src/components/site-header.tsx`**

Replace the entire file content with:

```tsx
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/zeroday-logo.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border/40 shadow-card"
          : "bg-transparent"
      }`}
    >
      <a href="#main" className="skip-link">Skip to main content</a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="Zero Day Team"
            className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-sm font-heading font-bold tracking-[0.15em] uppercase">
            Zero Day
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative py-1 text-muted-foreground hover:text-foreground transition-colors duration-200
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent-gold
                after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{
                className: "text-foreground after:w-full",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className="pill-accent text-xs">
            Start a Project
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-full border border-border p-2 transition-colors hover:bg-secondary"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-72 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="glass px-6 py-4 flex flex-col gap-3 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="py-2 font-medium hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="pill-accent text-center mt-2"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/site-footer.tsx`**

Replace the entire file content with:

```tsx
import { Link } from "@tanstack/react-router";
import logo from "@/assets/zeroday-logo.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 grain opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-8">
        {/* Top section */}
        <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-background/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Zero Day Team" className="h-7 w-7 object-contain invert" />
              <span className="text-sm font-heading font-bold tracking-[0.15em] uppercase">
                Zero Day
              </span>
            </div>
            <p className="text-sm text-background/50 max-w-xs leading-relaxed">
              A specialized engineering collective building the invisible
              infrastructure that powers modern enterprises.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-heading font-bold tracking-widest uppercase text-background/40 mb-4">
              Navigation
            </h3>
            <nav className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-background/60 hover:text-background transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-heading font-bold tracking-widest uppercase text-background/40 mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <span>hello@zerodayteam.site</span>
              <span>Stockholm / Berlin / Remote</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-background/30">
            &copy; {new Date().getFullYear()} Zero Day Team. All rights reserved.
          </p>
        </div>
      </div>

      {/* Giant brand watermark */}
      <div className="overflow-hidden pointer-events-none select-none">
        <h2 className="text-giant text-center text-background/[0.03] -mb-[0.15em]">
          Zero Day.
        </h2>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify header/footer render correctly**

Run: `cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run dev`
Expected: Header shows glassmorphism on scroll, footer has dark theme with grain texture

- [ ] **Step 4: Commit**

```bash
git add src/components/site-header.tsx src/components/site-footer.tsx
git commit -m "feat: redesign header and footer

Glassmorphism header with scroll detection, animated underlines.
Dark footer with grain texture, navigation columns, giant watermark."
```

---

## Task 4: Redesign Hero Section

**Files:**
- Modify: `src/components/hero.tsx` (full rewrite)
- Delete: `src/components/cyber-background.tsx` (no longer needed)

- [ ] **Step 1: Rewrite `src/components/hero.tsx`**

Replace the entire file content with:

```tsx
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";

export function Hero() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 gradient-mesh" />
      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 w-full">
        {/* Eyebrow */}
        <ScrollReveal className="flex justify-center mb-10">
          <div className="pill glass">
            <span className="inline-block size-2 rounded-full bg-accent-gold animate-pulse" />
            Available for Q3 partnerships
          </div>
        </ScrollReveal>

        {/* Headline — cinematic text reveal */}
        <h1 className="text-center">
          <TextReveal
            as="span"
            className="block text-display text-5xl md:text-7xl lg:text-[6rem]"
            staggerMs={60}
          >
            We architect systems
          </TextReveal>
          <TextReveal
            as="span"
            className="block text-display text-5xl md:text-7xl lg:text-[6rem] mt-2"
            staggerMs={60}
          >
            from zero to scale.
          </TextReveal>
        </h1>

        {/* Sub-content grid */}
        <ScrollReveal delay={300}>
          <div className="mt-14 grid md:grid-cols-3 items-center gap-8">
            <div className="flex md:justify-start justify-center">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs tracking-widest uppercase text-accent-gold">Est. 2011</span>
              </div>
            </div>

            <p className="text-center text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              A collective engineering team building the invisible middleware,
              industrial SaaS, and AR commerce layers that move enterprises forward.
            </p>

            <div className="flex md:justify-end justify-center">
              <a
                ref={ctaRef}
                href="/contact"
                className="pill-accent magnetic"
              >
                Start a Project
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal delay={500}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "99.99%", label: "Uptime SLA" },
              { value: "42ms", label: "Median Response" },
              { value: "14+", label: "Years Shipping" },
              { value: "100%", label: "Error Reduction" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 text-center card-hover"
              >
                <div className="text-2xl md:text-3xl font-heading font-bold">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground font-mono tracking-wide uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete `src/components/cyber-background.tsx`**

```bash
rm src/components/cyber-background.tsx
```

- [ ] **Step 3: Verify hero renders**

Run: `cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run dev`
Expected: Hero shows gradient mesh, cinematic text reveal, glass stat cards

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/routes/__root.tsx
git rm src/components/cyber-background.tsx
git commit -m "feat: redesign hero with cinematic text reveals and glass stats

Replace terminal/cyber hero with minimalist text-split animations,
gradient mesh background, glassmorphism stat cards, magnetic CTA."
```

---

## Task 5: Redesign Remaining Home Page Sections

**Files:**
- Modify: `src/components/products-marquee.tsx` (full rewrite)
- Modify: `src/components/focus-grid.tsx` (full rewrite)
- Modify: `src/components/process-steps.tsx` (full rewrite)
- Modify: `src/components/testimonials.tsx` (full rewrite)
- Modify: `src/components/selected-works.tsx` (full rewrite)
- Modify: `src/components/about-timeline.tsx` (full rewrite)
- Modify: `src/components/cta-section.tsx` (full rewrite)

- [ ] **Step 1: Rewrite `src/components/products-marquee.tsx`**

```tsx
import { Route as RouteIcon, ScanLine, CpuIcon, AudioWaveform, Workflow } from "lucide-react";

const items = [
  { icon: RouteIcon, label: "Vectra Flow" },
  { icon: ScanLine, label: "Specra AR" },
  { icon: CpuIcon, label: "GridMaster" },
  { icon: AudioWaveform, label: "Lumina Voice" },
  { icon: Workflow, label: "SyncBridge" },
];

export function ProductsMarquee() {
  const loop = [...items, ...items, ...items];
  return (
    <section className="relative py-6 border-y border-border/40 overflow-hidden">
      <div className="marquee-track gap-12">
        {loop.map((it, i) => (
          <div key={i} className="flex items-center gap-3 text-muted-foreground shrink-0 px-4">
            <it.icon size={16} strokeWidth={1.5} />
            <span className="font-heading font-semibold text-foreground/70 text-sm tracking-wide">
              {it.label}
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
              in production
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/focus-grid.tsx`**

```tsx
import { Brain, Code2, Layers, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";

const cards = [
  { icon: Brain, title: "Architecture Discovery", body: "Stack audits across legacy and modern systems to map every bridge needed." },
  { icon: Layers, title: "Full-Stack Engineering", body: "From Valhalla routing engines to Spring Boot APIs — end-to-end delivery." },
  { icon: Code2, title: "Middleware Mastery", body: "Custom orchestration layers that eliminate manual errors at scale." },
  { icon: ShieldCheck, title: "Global Deployment", body: "EU-localized, resilient, zero-downtime launches across all regions." },
];

export function FocusGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <div>
          <ScrollReveal>
            <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ What We Do</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-display text-4xl md:text-5xl mt-4 leading-[1.05]">
              Bridging legacy stacks with next-decade infrastructure.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-in">
          {cards.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 100}>
              <div className="glass-card rounded-2xl p-6 card-hover group">
                <div className="size-10 rounded-xl bg-foreground flex items-center justify-center
                  group-hover:bg-accent-gold transition-colors duration-300">
                  <c.icon size={18} className="text-background" />
                </div>
                <h3 className="mt-5 font-heading font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/process-steps.tsx`**

```tsx
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

const steps = [
  { n: "01", title: "Discover", body: "We audit your stack — from Valhalla routing to Spring Boot — to map every legacy bridge needed." },
  { n: "02", title: "Design", body: "Architecture diagrams, middleware contracts, and UI flows shipped before a single line of code." },
  { n: "03", title: "Deliver", body: "Production rollout with zero-downtime migration, observability, and 24/7 SRE handover." },
];

function Counter({ target }: { target: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const end = parseInt(target, 10);
          let cur = 0;
          const id = setInterval(() => {
            cur += Math.max(1, Math.round(end / 24));
            if (cur >= end) { setVal(end); clearInterval(id); }
            else setVal(cur);
          }, 40);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{val.toString().padStart(2, "0")}</span>;
}

export function ProcessSteps() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <ScrollReveal className="text-center mb-16">
        <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Process</p>
        <h2 className="text-display text-5xl md:text-6xl mt-3">Here's how it works.</h2>
      </ScrollReveal>

      <div className="relative grid md:grid-cols-3 gap-6">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-px bg-border" />

        {steps.map((s, i) => (
          <ScrollReveal key={s.n} delay={i * 150}>
            <div
              className="relative glass-card rounded-3xl p-8 card-hover"
              style={{ marginTop: i === 1 ? "2rem" : 0 }}
            >
              <div className="text-display text-7xl text-foreground/10">
                <Counter target={s.n} />
              </div>
              <h3 className="font-heading text-2xl font-bold mt-4">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.body}</p>
              <span className="absolute top-6 right-6 size-2 rounded-full bg-accent-gold" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Rewrite `src/components/testimonials.tsx`**

```tsx
import { ScrollReveal } from "@/components/scroll-reveal";

const quotes = [
  {
    quote: "Zero Day rebuilt our entire orchestration layer in 11 weeks. We've eliminated 100% of manual entry errors since launch.",
    name: "Daniel Reed",
    role: "Founder, Novalytix",
  },
  {
    quote: "Their middleware now powers every Valhalla route across our EU fleet. Genuinely the best technical partners we've worked with.",
    name: "Sarah Nguyen",
    role: "Product Manager, FleetOps",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-28">
      <div className="grid md:grid-cols-2 gap-6">
        {quotes.map((q, i) => (
          <ScrollReveal key={q.name} delay={i * 120}>
            <figure className="glass-card rounded-3xl p-8 relative h-full">
              <span className="text-display text-8xl text-foreground/[0.05] absolute top-4 right-6 leading-none select-none">
                &ldquo;
              </span>
              <blockquote className="text-foreground/85 leading-relaxed relative z-10">
                {q.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-foreground to-accent-gold" />
                <div>
                  <div className="text-sm font-heading font-semibold">{q.name}</div>
                  <div className="text-xs text-muted-foreground">{q.role}</div>
                </div>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Rewrite `src/components/selected-works.tsx`**

```tsx
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const works = [
  {
    title: "GridMaster",
    tag: "Industrial SaaS",
    stack: "React / SaaS / IoT",
    blurb: "Real-time power plant monitoring dashboard replacing legacy SCADA tracking.",
    accent: "from-foreground to-foreground/70",
  },
  {
    title: "Specra AR",
    tag: "E-Commerce & Retail",
    stack: "Swift / Unity / ARKit",
    blurb: "Try-before-you-buy AR engine that cut product returns by 38%.",
    accent: "from-accent-gold to-accent-gold-soft",
  },
  {
    title: "Vectra Flow",
    tag: "Automotive & Logistics",
    stack: "Valhalla Engine / Kotlin / GIS",
    blurb: "Millisecond routing engine for last-mile fleet operations across the EU.",
    accent: "from-foreground to-accent-gold",
  },
  {
    title: "SyncBridge",
    tag: "Enterprise Middleware",
    stack: "Node.js / API Orchestration / n8n",
    blurb: "Zero-error invoice-to-fulfillment orchestration for B2B accounting systems.",
    accent: "from-accent-gold to-foreground",
  },
];

export function SelectedWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between mb-12">
        <ScrollReveal>
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Selected Works</p>
            <h2 className="text-display text-5xl md:text-6xl mt-3">Shipped at scale.</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <a href="/portfolio" className="hidden md:inline-flex items-center gap-2 text-sm font-medium hover:text-accent-gold transition-colors">
            View all <ArrowUpRight size={16} />
          </a>
        </ScrollReveal>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {works.map((w, i) => (
          <ScrollReveal key={w.title} variant="scale" delay={i * 100}>
            <article className="group relative rounded-3xl border border-border overflow-hidden card-hover bg-card">
              {/* Visual top */}
              <div className={`relative aspect-[16/10] bg-gradient-to-br ${w.accent} overflow-hidden`}>
                <div className="absolute inset-0 grain opacity-20" />
                <div className="absolute inset-6 rounded-2xl glass flex flex-col p-6 transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex items-center justify-between text-background/70 text-xs font-mono">
                    <span>{w.tag.toLowerCase().replace(/\s/g, "_")}.tsx</span>
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-heading text-background text-4xl md:text-5xl font-bold">{w.title}</h3>
                  </div>
                </div>
              </div>
              {/* Body */}
              <div className="p-6 flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="pill !py-1 !px-3 !text-[10px] uppercase tracking-widest font-heading">{w.tag}</span>
                    <span className="font-mono text-muted-foreground">{w.stack}</span>
                  </div>
                  <p className="mt-3 text-foreground/80 text-sm leading-relaxed">{w.blurb}</p>
                </div>
                <ArrowUpRight className="shrink-0 mt-1 text-muted-foreground group-hover:text-accent-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Rewrite `src/components/about-timeline.tsx`**

```tsx
import { ScrollReveal } from "@/components/scroll-reveal";

const rows = [
  { role: "Industrial SaaS", company: "GridMaster / Power Sector", years: "2021 - Now" },
  { role: "AR Commerce", company: "Specra / Retail Tech", years: "2019 - 2024" },
  { role: "Logistics Engine", company: "Vectra Flow / Automotive", years: "2017 - 2023" },
  { role: "Middleware Lead", company: "SyncBridge / Enterprise", years: "2014 - 2021" },
  { role: "Founding Engineers", company: "Zero Day / Collective", years: "2011 - 2014" },
];

export function AboutTimeline() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <ScrollReveal>
        <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Who We Are</p>
        <h2 className="text-display text-5xl md:text-7xl mt-3 max-w-3xl">
          Pushing boundaries <span className="text-muted-foreground">since 2011.</span>
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-10 mt-14">
        <ScrollReveal variant="left">
          <div className="rounded-3xl bg-foreground text-background p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 grain opacity-10 pointer-events-none" />
            <p className="relative text-lg leading-relaxed">
              At <span className="font-heading font-bold text-accent-gold">Zero Day Development</span>, we don't just
              build apps — we architect digital resilience. What started in 2011 as a small collective of specialized
              freelancers has evolved into a powerhouse for high-stakes engineering.
            </p>
            <p className="relative text-sm text-background/60 mt-6 leading-relaxed">
              We thrive in the invisible layers of technology — the middleware that keeps enterprises running, the AR
              engines that transform retail, and the industrial SaaS platforms that monitor the power grid.
            </p>
          </div>
        </ScrollReveal>

        <div>
          <ul className="divide-y divide-border">
            {rows.map((r, i) => (
              <ScrollReveal key={r.role} delay={i * 80} as="li">
                <div className="grid grid-cols-3 gap-4 py-5 items-baseline">
                  <span className="font-heading text-lg font-semibold col-span-1">{r.role}</span>
                  <span className="text-sm text-muted-foreground col-span-1">{r.company}</span>
                  <span className="text-sm font-mono text-right col-span-1">{r.years}</span>
                </div>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Rewrite `src/components/cta-section.tsx`**

```tsx
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";

export function CTASection() {
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <section className="relative overflow-hidden mt-12">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 grain" />

      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
        <ScrollReveal>
          <h2 className="text-display text-6xl md:text-8xl">Let's make it happen.</h2>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Always open to new collaborations, complex middleware puzzles, and global deployment challenges.
            Let's work together to bring your stack into its next decade.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex justify-center">
            <a ref={ctaRef} href="/contact" className="pill-accent magnetic">
              Start a Project <ArrowUpRight size={16} />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Verify all sections render**

Run: `cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run dev`
Expected: Full home page renders with new design, scroll animations work

- [ ] **Step 9: Commit**

```bash
git add src/components/products-marquee.tsx src/components/focus-grid.tsx src/components/process-steps.tsx src/components/testimonials.tsx src/components/selected-works.tsx src/components/about-timeline.tsx src/components/cta-section.tsx
git commit -m "feat: redesign all home page sections

Glass cards, scroll-triggered reveals, staggered animations, gradient mesh
CTA, gold accent system, brutalist typography throughout."
```

---

## Task 6: Payload CMS — New Collections, Globals, Contact Submissions

**Files:**
- Create: `payload-cms/collections/ContactSubmissions.ts`
- Create: `payload-cms/collections/Testimonials.ts`
- Create: `payload-cms/collections/CaseStudies.ts`
- Create: `payload-cms/collections/Projects.ts`
- Create: `payload-cms/globals/SiteSettings.ts`
- Modify: `payload-cms/payload.config.ts` (add new collections + globals)
- Create: `.env.example`

- [ ] **Step 1: Create `payload-cms/collections/ContactSubmissions.ts`**

```ts
import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "createdAt"],
    description: "Form submissions from the website contact page.",
  },
  access: {
    // Only authenticated admins can read submissions
    read: ({ req }) => !!req.user,
    // Anyone can create (public form submission)
    create: () => true,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "project", type: "textarea", required: true },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In Progress", value: "in-progress" },
        { label: "Replied", value: "replied" },
        { label: "Archived", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "notes",
      type: "textarea",
      admin: {
        description: "Internal notes about this submission.",
        position: "sidebar",
      },
    },
  ],
};
```

- [ ] **Step 2: Create `payload-cms/collections/Testimonials.ts`**

```ts
import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "featured"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "avatar", type: "upload", relationTo: "media" },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Show on homepage", position: "sidebar" },
    },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
```

- [ ] **Step 3: Create `payload-cms/collections/CaseStudies.ts`**

```ts
import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "sector", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "sector", type: "text", required: true },
    { name: "stack", type: "text" },
    { name: "challenge", type: "textarea", required: true },
    { name: "success", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media" },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
```

- [ ] **Step 4: Create `payload-cms/collections/Projects.ts`**

```ts
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "tag", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "tag", type: "text" },
    { name: "stack", type: "text" },
    { name: "blurb", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "href", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "sortOrder", type: "number", defaultValue: 0, admin: { position: "sidebar" } },
  ],
};
```

- [ ] **Step 5: Create `payload-cms/globals/SiteSettings.ts`**

```ts
import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: {
    description: "Global site settings — header, footer, contact info.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "Zero Day Team",
    },
    {
      name: "contactEmail",
      type: "email",
      defaultValue: "hello@zerodayteam.site",
    },
    {
      name: "contactLocations",
      type: "text",
      defaultValue: "Stockholm / Berlin / Remote",
    },
    {
      name: "footerTagline",
      type: "textarea",
      defaultValue: "A specialized engineering collective building the invisible infrastructure that powers modern enterprises.",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "platform", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
  ],
};
```

- [ ] **Step 6: Update `payload-cms/payload.config.ts` to add new collections + globals**

Replace lines 156-233 (from `// ─── COLLECTIONS ───` through the end) with:

```ts
// ─── COLLECTIONS ───────────────────────────────────────────────────

import { ContactSubmissions } from "./collections/ContactSubmissions";
import { Testimonials as TestimonialsCollection } from "./collections/Testimonials";
import { CaseStudies as CaseStudiesCollection } from "./collections/CaseStudies";
import { Projects as ProjectsCollection } from "./collections/Projects";
import { SiteSettings } from "./globals/SiteSettings";

const Users = {
  slug: "users",
  auth: true,
  admin: { useAsTitle: "email" },
  fields: [{ name: "name", type: "text" }],
};

const Media = {
  slug: "media",
  upload: true,
  access: { read: () => true },
  fields: [{ name: "alt", type: "text" }],
};

const Pages = {
  slug: "pages",
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "status", "updatedAt"] },
  access: {
    read: ({ req }: any) => {
      if (req.user) return true;
      return { status: { equals: "published" } };
    },
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL path, e.g. 'about' or 'pricing'. Use 'home' for the homepage." },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      required: true,
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
    {
      name: "blocks",
      type: "blocks",
      label: "Page widgets",
      blocks: ALL_BLOCKS,
    },
  ],
};

// ─── CONFIG ────────────────────────────────────────────────────────

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: { user: Users.slug },
  collections: [Users, Media, Pages, ContactSubmissions, TestimonialsCollection, CaseStudiesCollection, ProjectsCollection],
  globals: [SiteSettings],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  cors: [process.env.PAYLOAD_PUBLIC_FRONTEND_URL || "*"].filter(Boolean),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
});
```

Note: The import statements need to be at the top of the file. Move the imports for ContactSubmissions, Testimonials, CaseStudies, Projects, and SiteSettings to the top of the file after the existing imports.

- [ ] **Step 7: Create `.env.example` in the project root**

```bash
# Frontend (Vite / TanStack Start)
PAYLOAD_API_URL=http://localhost:3000
VITE_PAYLOAD_API_URL=http://localhost:3000

# Payload CMS (payload-cms/)
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_PUBLIC_FRONTEND_URL=http://localhost:5173
DATABASE_URI=postgresql://user:password@localhost:5432/zeroday
```

- [ ] **Step 8: Commit**

```bash
git add payload-cms/collections/ payload-cms/globals/ payload-cms/payload.config.ts .env.example
git commit -m "feat: add CMS collections for contacts, testimonials, case studies, projects

ContactSubmissions with status workflow, Testimonials with featured flag,
CaseStudies with challenge/success fields, Projects for portfolio,
SiteSettings global for header/footer content, .env.example for setup."
```

---

## Task 7: Wire Contact Form to Payload CMS

**Files:**
- Modify: `src/lib/payload.functions.ts` (add `submitContactForm` server function)
- Modify: `src/routes/contact.tsx` (wire form to POST endpoint)

- [ ] **Step 1: Add `submitContactForm` to `src/lib/payload.functions.ts`**

Add the following at the end of the file (after the existing `getPageBySlug` function):

```ts
/**
 * Submit a contact form entry to the Payload CMS.
 * Creates a new document in the contact-submissions collection.
 */
export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; email: string; project: string }) => data)
  .handler(async ({ data }): Promise<{ success: boolean; error?: string }> => {
    const base = process.env.PAYLOAD_API_URL;
    if (!base) {
      console.warn("[payload] PAYLOAD_API_URL is not set — contact form disabled");
      return { success: false, error: "Contact form is not configured." };
    }

    const url = `${base.replace(/\/$/, "")}/api/contact-submissions`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          project: data.project,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(`[payload] contact submit failed: ${res.status}`, body);
        return { success: false, error: "Failed to send message. Please try again." };
      }

      return { success: true };
    } catch (err) {
      console.error("[payload] contact submit error:", err);
      return { success: false, error: "Something went wrong. Please try again." };
    }
  });
```

- [ ] **Step 2: Rewrite `src/routes/contact.tsx` to wire the form**

Replace the entire file content with:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowUpRight, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { submitContactForm } from "@/lib/payload.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zero Day Development" },
      { name: "description", content: "Bring us your hardest middleware, industrial SaaS, AR, and logistics problems. We respond within 24 hours." },
      { property: "og:title", content: "Contact Zero Day Development" },
      { property: "og:description", content: "Reach the Zero Day collective for partnerships and high-stakes engineering work." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const project = formData.get("project") as string;

    try {
      const result = await submitContactForm({ data: { name, email, project } });
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="relative">
        <div className="absolute inset-x-0 top-0 h-[420px] gradient-mesh" />
        <div className="absolute inset-x-0 top-0 h-[420px] grain" />

        <section className="relative mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-14">
          <ScrollReveal variant="left">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Contact</p>
              <h1 className="text-display text-5xl md:text-6xl mt-4">Let's talk infrastructure.</h1>
              <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
                Whether it's a Valhalla rebuild, a middleware migration, or a brand-new AR commerce engine — tell us
                what you're up against.
              </p>
              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-accent-gold" /> hello@zerodayteam.site
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-accent-gold" /> Stockholm / Berlin / Remote
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 space-y-5"
            >
              <div>
                <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  disabled={status === "sending"}
                  className="mt-2 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={status === "sending"}
                  className="mt-2 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="project" className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                  Project
                </label>
                <textarea
                  id="project"
                  name="project"
                  rows={4}
                  required
                  disabled={status === "sending"}
                  className="mt-2 w-full bg-transparent border-b border-border py-2 focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 focus-visible:ring-offset-card rounded-sm px-1 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="pill-dark mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" && <Loader2 size={16} className="animate-spin" />}
                {status === "sent" && <CheckCircle2 size={16} />}
                {status === "idle" || status === "error" ? <ArrowUpRight size={16} /> : null}
                {status === "idle" && "Send message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message sent!"}
                {status === "error" && "Try again"}
              </button>

              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-destructive mt-2">
                  <AlertCircle size={14} />
                  {errorMsg}
                </div>
              )}
            </form>
          </ScrollReveal>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 3: Verify form renders**

Run: `cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run dev`
Expected: Contact form renders with loading states, error/success feedback

- [ ] **Step 4: Commit**

```bash
git add src/lib/payload.functions.ts src/routes/contact.tsx
git commit -m "feat: wire contact form to Payload CMS

Submissions stored in contact-submissions collection with status workflow.
Form has loading, success, and error states with proper UX feedback."
```

---

## Task 8: Update About + Portfolio Pages with Scroll Animations

**Files:**
- Modify: `src/routes/about.tsx`
- Modify: `src/routes/portfolio.tsx`
- Modify: `src/components/case-studies.tsx`

- [ ] **Step 1: Rewrite `src/routes/about.tsx`**

Replace entire file:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutTimeline } from "@/components/about-timeline";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Zero Day Development" },
      { name: "description", content: "A collective of high-stakes engineers building the invisible layers of modern enterprise tech since 2011." },
      { property: "og:title", content: "About Zero Day Development" },
      { property: "og:description", content: "From a freelance collective to a high-stakes engineering powerhouse." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main" className="pt-12">
        <section className="mx-auto max-w-5xl px-6 py-20 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[400px] gradient-mesh" />
          <div className="absolute inset-x-0 top-0 h-[400px] grain" />
          <ScrollReveal>
            <p className="relative text-xs tracking-widest text-muted-foreground uppercase font-mono">/ About</p>
          </ScrollReveal>
          <h1 className="relative mt-4">
            <TextReveal className="text-display text-5xl md:text-7xl lg:text-8xl" staggerMs={50}>
              Architects of the invisible.
            </TextReveal>
          </h1>
          <ScrollReveal delay={400}>
            <p className="relative mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We build the middleware, orchestration, and infrastructure most teams never see — the kind that
              quietly carries millions of transactions, routes, and packets every day.
            </p>
          </ScrollReveal>
        </section>
        <AboutTimeline />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/routes/portfolio.tsx`**

Replace entire file:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SelectedWorks } from "@/components/selected-works";
import { CaseStudies } from "@/components/case-studies";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TextReveal } from "@/components/text-reveal";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Zero Day Development" },
      { name: "description", content: "Selected work: GridMaster industrial SaaS, Specra AR retail, Vectra Flow logistics, SyncBridge middleware." },
      { property: "og:title", content: "Portfolio — Zero Day Development" },
      { property: "og:description", content: "Industrial SaaS, AR commerce, logistics, and middleware projects shipped at scale." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main id="main">
        <section className="mx-auto max-w-5xl px-6 pt-20 pb-8 text-center relative">
          <div className="absolute inset-x-0 top-0 h-[300px] gradient-mesh" />
          <div className="absolute inset-x-0 top-0 h-[300px] grain" />
          <ScrollReveal>
            <p className="relative text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Portfolio</p>
          </ScrollReveal>
          <h1 className="relative mt-4">
            <TextReveal className="text-display text-5xl md:text-7xl" staggerMs={50}>
              Shipped, scaled, in production.
            </TextReveal>
          </h1>
        </section>
        <SelectedWorks />
        <CaseStudies />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/case-studies.tsx`**

Replace entire file:

```tsx
import { Activity, Boxes, Cpu, Map } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

type Study = {
  n: string;
  title: string;
  sector: string;
  stack: string;
  challenge: string;
  success: string;
  icon: typeof Activity;
  accent: string;
};

const studies: Study[] = [
  {
    n: "01", title: "GridMaster", sector: "Industrial SaaS", stack: "React / SaaS / IoT",
    challenge: "Managing high-stakes power plant infrastructure and workforce safety in real-time.",
    success: "We engineered a robust industrial monitoring platform that replaced legacy manual tracking with high-precision data visualization, reducing operational downtime and improving worker safety protocols.",
    icon: Cpu, accent: "from-foreground/95 to-foreground/70",
  },
  {
    n: "02", title: "Specra AR", sector: "E-Commerce & Retail", stack: "Swift / Unity / ARKit",
    challenge: "Overcoming the uncertainty gap in digital retail where customers struggle to visualize products.",
    success: "By integrating a high-performance Augmented Reality engine into the retail workflow, we created a seamless try-before-you-buy experience that boosted user engagement and measurably decreased product return rates.",
    icon: Boxes, accent: "from-accent-gold to-accent-gold-soft",
  },
  {
    n: "03", title: "Vectra Flow", sector: "Automotive & Logistics", stack: "Valhalla Engine / Kotlin / GIS",
    challenge: "Optimizing complex urban delivery routes amidst shifting traffic patterns and fleet variables.",
    success: "Our team developed an intelligent routing engine powered by the Valhalla framework, providing millisecond-precise navigation for large-scale logistics, cutting fuel costs and mastering last-mile delivery.",
    icon: Map, accent: "from-foreground/90 to-accent-gold",
  },
  {
    n: "04", title: "SyncBridge", sector: "Enterprise Middleware", stack: "Node.js / API Orchestration / n8n",
    challenge: "Connecting disconnected accounting software with high-volume delivery APIs without data loss.",
    success: "We built a custom orchestration layer that automates the entire lifecycle from invoice to fulfillment. The middleware eliminates manual entry errors and provides a resilient, scalable bridge for real-time enterprise communication.",
    icon: Activity, accent: "from-accent-gold to-foreground/90",
  },
];

export function CaseStudies() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex items-end justify-between mb-14">
        <ScrollReveal>
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase font-mono">/ Case Studies</p>
            <h2 className="text-display text-5xl md:text-6xl mt-3">Challenges, met head-on.</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <span className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground font-mono">
            4 / 4 in production
          </span>
        </ScrollReveal>
      </div>

      <div className="space-y-6">
        {studies.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 100}>
            <article className="group relative rounded-3xl border border-border bg-card overflow-hidden card-hover">
              <div className="grid md:grid-cols-[260px_1fr] gap-0">
                {/* Visual rail */}
                <div className={`relative bg-gradient-to-br ${s.accent} p-8 flex flex-col justify-between min-h-[220px]`}>
                  <div className="absolute inset-0 grain opacity-20 pointer-events-none" />
                  <div className="relative flex items-center justify-between text-background/70 text-xs font-mono">
                    <span>{s.title.toLowerCase().replace(/\s/g, "_")}.mdx</span>
                    <span className="opacity-70">{s.n}</span>
                  </div>
                  <div className="relative">
                    <s.icon className="text-background mb-3" size={22} />
                    <h3 className="font-heading text-background text-4xl md:text-5xl font-bold leading-none">{s.title}</h3>
                    <p className="text-background/70 text-xs mt-3 font-mono">{s.sector}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className="pill !py-1 !px-3 !text-[10px] uppercase tracking-widest font-heading">{s.sector}</span>
                    <span className="font-mono text-xs text-muted-foreground">{s.stack}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-accent-gold">The Challenge</p>
                      <p className="mt-2 text-foreground/80 leading-relaxed text-sm">{s.challenge}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-foreground">The Success</p>
                      <p className="mt-2 text-foreground/80 leading-relaxed text-sm">{s.success}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify all pages render**

Run: `cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run dev`
Expected: About and Portfolio pages render with cinematic text reveals and scroll animations

- [ ] **Step 5: Commit**

```bash
git add src/routes/about.tsx src/routes/portfolio.tsx src/components/case-studies.tsx
git commit -m "feat: redesign about and portfolio pages

Cinematic text reveals on page headers, scroll-animated case studies,
gradient mesh backgrounds, glass card styling throughout."
```

---

## Task 9: Fix GitHub Actions Workflow + Production Polish

**Files:**
- Modify: `.github/workflows/deploy.yml` (fix npm → bun)
- Modify: `src/routes/__root.tsx` (update year in copyright, clean up)

- [ ] **Step 1: Fix `.github/workflows/deploy.yml` to use bun**

Read the current deploy.yml and replace `npm ci` with `bun install` and `npm run build` with `bun run build`.

- [ ] **Step 2: Verify the build works**

Run: `cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run build`
Expected: Build succeeds with no errors

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "fix: use bun in GitHub Actions workflow

Replace npm ci/npm run build with bun install/bun run build
to match the project's package manager."
```

---

## Task 10: Final Integration Test & Quality Pass

- [ ] **Step 1: Run lint**

```bash
cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run lint
```
Fix any lint errors found.

- [ ] **Step 2: Run build**

```bash
cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run build
```
Fix any TypeScript or build errors.

- [ ] **Step 3: Verify dev server runs clean**

```bash
cd ~/Desktop/ZeroDayTeam/zero-day-artistry && bun run dev
```
Expected: No console errors, all pages load, animations play smoothly.

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: resolve lint and build errors from redesign"
```
