# Zelos UI Implementation PRD — V1

## Overview

This document defines the implemented design system, component architecture, and UX decisions for Zelos V1 frontend. The implementation supersedes the earlier `Zelos_V1_Frontend_PRD.md` wherever they conflict.

---

## Design Philosophy

**"Premium Cognitive Companion"**

The product should feel like a luxury productivity tool crossed with a calm mental health app. Not a chatbot. Not a project management tool. A trusted companion that transforms overwhelm into action.

Users should feel within 10 seconds:
- "I can breathe."
- "I can handle this."

### Reference Points

| Product | What we take from it |
|---------|---------------------|
| Linear | Polish, typography, spacing, density |
| Headspace | Emotional safety, calm palette, breathing room |
| Duolingo | Progress visualization, streaks, habit loop |
| Helpun | Structured task breakdown workflow |

**None of these should be directly recognizable in the final product.**

---

## Color System

### Dark Mode (Default)

```
Background base:    #0F0F0F  — near black, very calm
Background elevated:#151515  — sidebar and right panel
Card surface:       #202020  — primary card background
Card hover:         #262626  — interactive card state

Accent (muted gold):
  Primary:          #C6A969  — main CTAs, active states
  Secondary:        #B89B5E  — gradients, subtle accents
  Bright:           #D4AF37  — hover states, celebration moments

Text:
  Primary:          #FFFFFF
  Secondary:        #B5B5B5
  Muted:            #7A7A7A
  Placeholder:      #555555
  Ghost:            #3A3A3A

Success:            #4A8C6F  — muted emerald, completions
Error:              #8C4A4A  — soft, non-alarming

Borders:
  Subtle:           rgba(255,255,255,0.06)
  Accent:           rgba(198,169,105,0.25)
  Focus:            rgba(198,169,105,0.5)
```

### Blocker Type Colors

Each psychological blocker type has a distinct color identity:

| Blocker | Color |
|---------|-------|
| Perfectionism | Warm gold (#C6A969) |
| Overwhelm | Soft violet (#A78BFA) |
| Ambiguity | Soft blue (#93C5FD) |
| Avoidance | Soft pink (#F9A8D4) |
| Fear | Soft red (#FCA5A5) |
| Procrastination | Warm yellow (#FCD34D) |

### Color Rules

- 90% of UI: neutral dark surfaces and muted text
- 8% of UI: accent gold used intentionally (active states, CTAs, progress)
- 2% of UI: celebration moments only (brief, transient)
- Never use bright colors for chrome, navigation, or informational content

---

## Typography

System fonts only — no web font downloads:
```
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
             "Segoe UI", "Helvetica Neue", Arial, sans-serif;
```

### Scale

| Use | Size | Weight | Color |
|-----|------|--------|-------|
| Page hero | 32–40px | 300–400 (light) | #FFFFFF |
| Hero accent | 32–40px | 600 (semibold) | Gold gradient |
| Section heading | 20–24px | 600 | #FFFFFF |
| Card heading | 14–16px | 500–600 | #E0E0E0 |
| Body text | 14–15px | 400 | #B5B5B5 |
| Action text | 14px | 500 | #E0E0E0 |
| Labels / meta | 10–12px | 600 | #555555 (uppercase, tracked) |
| Captions | 11px | 400 | #555555 |

### Typography Rules

- Labels always uppercase with `letter-spacing: 0.12em`
- Body text at 16px line-height (relaxed) = 1.65
- No font weight below 300 except in carefully controlled hero contexts
- Timer display uses `font-variant-numeric: tabular-nums`

---

## Layout

### Desktop (≥ 1280px) — 3 Column

```
┌─────────────────────────────────────────────────────────────────┐
│  Sidebar (240px) │   Center Content (flex)   │ Right Panel (300px)│
│                  │                           │                    │
│  ZELOS           │  Hero / Task Input        │  Today's Focus     │
│  ─────           │  Quick Start Cards        │  Streak            │
│  Home            │  Task Breakdown           │  XP Progress       │
│  History         │  Learn Mode               │  Recent Wins       │
│  Insights        │  Focus Mode (overlay)     │                    │
│  Streaks         │                           │                    │
│  Achievements    │                           │                    │
│  ─────           │                           │                    │
│  Settings        │                           │                    │
│  Help            │                           │                    │
└─────────────────────────────────────────────────────────────────┘
```

### Tablet (768px–1280px) — 2 Column (sidebar + center, no right panel)
### Mobile (<768px) — 1 Column (hamburger menu, no right panel)

### Content Max-Widths

- Task input / breakdown: `max-width: 672px` (centered in flex area)
- Settings, history: `max-width: 560px`
- Stats pages: `max-width: 672px`

---

## Component Architecture

### Foundation Layer

```
globals.css          — CSS custom properties (design tokens)
app/lib/types.ts     — TypeScript types (BlockerType, Action, Session, etc.)
app/lib/mock-data.ts — Static mock data (stats, sessions, achievements)
app/lib/mock-ai.ts   — Mock AI response generator
```

### UI Primitives

```
Button     — primary / secondary / ghost / danger; sm / md / lg
Card       — surface with optional hover, accent, padding variants
Badge      — BlockerBadge (per-type color), StatBadge
Chip       — follow-up question buttons (Learn Mode)
Skeleton   — shimmer loading states; ActionCardSkeleton, TaskBreakdownSkeleton
```

### Layout Components

```
Sidebar    — fixed left, 240px, nav items + streak pill
RightPanel — fixed right, 300px, stacked insight cards
AppShell   — wraps everything; handles mobile header + menu overlay
```

### Feature Components

```
TaskInput        — textarea with rotating placeholders, gold focus ring
QuickStartCards  — 2-col grid of preset task prompts
TaskBreakdown    — blocker badge + explanation + action checklist + CTA
LearnMode        — article-style card + follow-up chips + CTA
FocusMode        — full-screen overlay with timer, dots, ESC to close
AuthModal        — triggered after first AI response, dismissible
```

### Right Panel Cards (inside RightPanel)

```
TodaysFocusCard  — most prominent; active task + progress + Continue button
StreakCard       — current streak + 7-day dot bar
XPCard           — XP progress bar + level badge
StatsRow         — 3-col mini grid: tasks, focus, actions
RecentWinsCard   — last 3 completions with XP values
```

---

## User Flow

```
Home (hero + quick start + input)
  │
  ├── User types or selects quick start
  │
  ▼
Loading (skeleton + step-by-step status text)
  │
  ▼
Result
  ├── Task Mode → TaskBreakdown (checkboxes + Focus button)
  │     └── Focus Session → FocusMode (full-screen, timer, mark done)
  │
  └── Learn Mode → LearnMode (article + follow-up chips → re-submit)
  │
  └── [After first response] → AuthModal (dismissible, save progress)
```

---

## Mock Mode

All UI flows work without any backend connection. The mock layer:

1. **`generateMockResponse(input)`** — keyword-matches the input string to return one of 5 task breakdowns or 3 learn responses. Simulates 1.8–2.6s network delay.
2. **Mock data** — realistic pre-populated stats (streak: 7, level: 4, XP: 320/500, 18 tasks completed).
3. **No visual distinction** — users cannot tell they are in mock mode except for a small "Mock mode" pill shown after a response.

---

## Animation Spec

All animations use Framer Motion. Respect `prefers-reduced-motion`.

| Interaction | Animation |
|-------------|-----------|
| Page/view transition | `opacity: 0→1, y: 12→0, 300ms ease-out` |
| Breakdown reveal | Same + staggered children 60ms apart |
| Checkbox complete | Scale 1→1.22→1 + fill, 220ms |
| XP float | `translateY 0→-32px, opacity 1→0, 900ms` |
| Auth modal | `scale 0.94→1, opacity 0→1, 250ms` |
| Focus mode enter | `opacity 0→1, 300ms` full-screen |
| Action timer card | Keyed to action ID — auto-resets on change |
| Dropdown menu | `opacity 0→1, y -6→0, scale 0.96→1, 150ms` |

---

## Accessibility

- All interactive elements keyboard-navigable (Tab / Shift+Tab / Enter / Space / Escape)
- ARIA labels on all icon-only buttons
- `role="checkbox"` + `aria-checked` on action items
- `role="switch"` + `aria-checked` on toggle components
- Color contrast: text-primary (#FFFFFF) on bg-card (#202020) = 12.6:1 ✓
- Focus ring: `2px solid #C6A969, offset 2px` on all focusable elements
- `prefers-reduced-motion`: all transitions collapse to 0.01ms

---

## Pages

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Home — hero, task input, quick starts, result display | Complete |
| `/history` | Past sessions grouped by date | Complete |
| `/insights` | Activity heatmap, blocker breakdown, completion ring | Complete |
| `/streaks` | Streak hero, calendar, leaderboard | Complete |
| `/achievements` | Unlocked + locked achievement grid | Complete |
| `/settings` | Appearance, notifications, account | Complete |

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.x | Framework |
| `react` / `react-dom` | 19.x | UI runtime |
| `framer-motion` | latest | Animations |
| `lucide-react` | latest | Icons |
| `clsx` | latest | Conditional classnames |
| `tailwind-merge` | latest | Safe Tailwind merging |
| `tailwindcss` | v4 | Utility CSS |

---

## What Comes Next (Backend Integration)

When connecting to the real backend:

1. Replace `generateMockResponse()` in `mock-ai.ts` with a `POST /api/v1/breakdown` call
2. Wire Supabase auth (Google OAuth) into the `AuthModal` callbacks
3. Replace `mockUserStats` with `GET /api/v1/streaks/stats`
4. Replace `mockSessions` with `GET /api/v1/sessions`
5. Wire action completion to `PATCH /api/v1/actions/{id}/complete`
6. Wire streak check-in to `POST /api/v1/streaks/check-in`

The component API is stable — only the data sources need to change.
