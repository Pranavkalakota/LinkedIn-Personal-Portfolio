# Portfolio Design Implementation

> Generated via **ui-ux-pro-max** skill | Theme: **Warm Noir Editorial**  
> Last updated: June 2026

This file is the source of truth for colors, typography, layout, and page structure. All HTML pages and `styles.css` must follow these rules.

---

## Design Direction

| Property | Value |
|----------|-------|
| **Pattern** | Portfolio Grid → split hero landing + dedicated section pages |
| **Style** | Vibrant & Block-based — bold geometry, high contrast, editorial spacing |
| **Mood** | Creative developer portfolio — warm, confident, dark-first |
| **Stack** | HTML + Tailwind CDN + custom CSS |

### Anti-patterns to avoid
- Generic corporate templates
- Rainbow / per-card border colors
- Text-heavy walls without visual hierarchy
- Emoji as UI icons

---

## Color Palette

Warm dark base with a single orange accent (Podcast Platform palette + Developer green for status only).

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-base` | `#0F0F23` | Page background |
| `--bg-elevated` | `#1A1835` | Cards, sidebar, panels |
| `--bg-surface` | `#252347` | Hover states, input backgrounds |
| `--primary` | `#312E81` | Secondary surfaces, tags |
| `--accent` | `#F97316` | CTAs, links, focus rings, highlights |
| `--accent-hover` | `#EA580C` | Button hover |
| `--accent-muted` | `rgba(249, 115, 22, 0.15)` | Tag backgrounds, glows |
| `--text-primary` | `#F8FAFC` | Headings, body |
| `--text-secondary` | `#A8A29E` | Supporting copy |
| `--text-muted` | `#78716C` | Labels, placeholders |
| `--border` | `rgba(168, 162, 158, 0.2)` | All borders — **solid, uniform** |
| `--success` | `#22C55E` | Form success messages only |
| `--purdue-gold` | `#CFB991` | Reserved brand accent (stats only) |

### Background animation
- Subtle indigo/orange gradient mesh (CSS orbs)
- Optional canvas particle network at 35% opacity
- Colors: particles `#78716C`, lines `rgba(249, 115, 22, 0.06)`

---

## Typography

| Role | Font | Weights | Fallback |
|------|------|---------|----------|
| **Headings** | [Archivo](https://fonts.google.com/specimen/Archivo) | 600, 700 | system-ui, sans-serif |
| **Body** | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | 400, 500, 600 | system-ui, sans-serif |
| **Mono** (optional labels) | JetBrains Mono | 400, 500 | monospace |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;700&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Scale

| Element | Size | Font |
|---------|------|------|
| Landing `h1` | `clamp(2.75rem, 6vw, 4.5rem)` | Archivo 700 |
| Page `h1` | `clamp(2rem, 4vw, 3rem)` | Archivo 700 |
| Section labels | `0.75rem` uppercase tracking | Space Grotesk 600 |
| Body | `1rem` (16px base) | Space Grotesk 400 |
| Line height | `1.65` body, `1.15` headings | — |

---

## Layout System

### Landing (`index.html`)
```
┌─────────────────────────────────────────────┐
│  Nav: logo · Resume                         │
├──────────────────┬──────────────────────────┤
│  Eyebrow label   │                          │
│  Display name    │   Profile (geometric     │
│  Role + tagline  │   frame block)           │
│  Social + CTAs   │                          │
├──────────────────┴──────────────────────────┤
│  "Explore" — 2×4 block grid of section cards│
├─────────────────────────────────────────────┤
│  Footer                                     │
└─────────────────────────────────────────────┘
```

### Inner pages (`about.html`, `experience.html`, …)
```
┌──────────┬──────────────────────────────────┐
│ Sidebar  │  Page header (label + title)     │
│ nav      │  ─────────────────────────────   │
│ (fixed)  │  Content (cards, lists, forms)   │
│          │                                  │
├──────────┴──────────────────────────────────┤
│  Footer (full width)                        │
└─────────────────────────────────────────────┘
```

| Token | Value |
|-------|-------|
| Max content width | `72rem` (1152px) |
| Sidebar width | `16rem` (256px) |
| Section padding | `3rem` vertical, `1.5rem` horizontal |
| Card radius | `1rem` (16px) |
| Block gap | `1.5rem` (24px) grid, `3rem` (48px) sections |
| Nav height | `4rem` |

---

## Components

### Buttons
- **Primary**: `bg accent`, white text, `rounded-lg`, hover `accent-hover`, 200ms ease-out
- **Ghost**: transparent, `border border`, hover `accent-muted` background

### Cards
- Background `--bg-elevated`
- Border `1px solid var(--border)` — never gradient borders
- Hover: `translateY(-4px)` + shadow, border unchanged

### Tags / badges
- Background `--accent-muted`, text `--accent`, solid border `--border`

### Navigation
- Landing: minimal top bar
- Inner: sidebar with active link = orange left bar + `--accent-muted` bg
- Mobile: slide-down menu, same links

---

## Page Map

| File | Purpose | Active nav key |
|------|---------|----------------|
| `index.html` | Landing / home | `home` |
| `about.html` | About Me + stats | `about` |
| `experience.html` | Work experience | `experience` |
| `projects.html` | Featured projects | `projects` |
| `research.html` | Research work | `research` |
| `skills.html` | Skills grid | `skills` |
| `education.html` | Education & achievements | `education` |
| `contact.html` | Contact form + info | `contact` |

All section **content and copy** preserved from the original single-page site.

---

## Motion

| Effect | Duration | Easing | Notes |
|--------|----------|--------|-------|
| Hover transitions | 200ms | ease-out | Buttons, cards, links |
| Page enter | 400ms | ease-out | Fade + translateY(12px) |
| Scroll reveal | 500ms | ease-out | Intersection Observer |
| Background orbs | 24–32s | ease-in-out | Infinite, decorative |

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable animations, hide canvas/orbs */
}
```

---

## Pre-delivery checklist

- [x] No emojis as icons (SVG only)
- [x] `cursor-pointer` on all clickable elements
- [x] Hover states 150–300ms
- [x] Focus rings visible (`outline accent`)
- [x] `prefers-reduced-motion` respected
- [x] Responsive: 375px, 768px, 1024px, 1440px
- [x] All original sections and information retained
