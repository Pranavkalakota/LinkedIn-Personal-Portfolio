# 🎨 Design System — Pranav Kalakota Portfolio

> Extracted from `styles.css` and `index.html` | Stitch Project ID: `1525370321961831447`

---

## 📐 Typography

| Property        | Value                                              |
|-----------------|----------------------------------------------------|
| **Primary Font**    | `Inter` (Google Fonts)                             |
| **Monospace Font**  | `JetBrains Mono` (Google Fonts)                    |
| **Font Weights**    | 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold) |
| **Base Line Height**| `1.6`                                              |
| **Body Color**      | `#1f2937` (gray-900)                               |

### Heading Sizes (Desktop)

| Element | Tailwind Class           | Approximate Size |
|---------|--------------------------|------------------|
| `h1`    | `text-5xl md:text-6xl`   | 3rem → 3.75rem  |
| `h2`    | `text-5xl`               | 3rem             |
| `h3`    | `text-2xl` / `text-3xl`  | 1.5rem / 1.875rem |
| Body    | `text-lg`                | 1.125rem         |

### Responsive Typography (≤640px)

| Element | Size     |
|---------|----------|
| `h1`    | `2.5rem` |
| `h2`    | `2rem`   |
| `h3`    | `1.5rem` |

---

## 🎨 Color Palette

### CSS Custom Properties (`:root`)

| Variable             | Value       | Usage                    |
|----------------------|-------------|--------------------------|
| `--primary-color`    | `#4f46e5`   | Indigo — primary actions, focus rings |
| `--secondary-color`  | `#1f2937`   | Dark gray — body text    |
| `--accent-color`     | `#f9fafb`   | Near-white — subtle backgrounds |
| `--purdue-gold`      | `#cfb991`   | Purdue branding (reserved) |

### Dark Theme — Core Colors

| Token                        | Value                              | Usage                                     |
|------------------------------|------------------------------------|--------------------------------------------|
| **Background (base)**        | `#000000`                          | Network canvas / animated background       |
| **Section overlay (light)**  | `rgba(0, 10, 20, 0.85)`           | About, Projects, Skills, Volunteering      |
| **Section overlay (dark)**   | `rgba(0, 15, 25, 0.9)`            | Experience, Research, Education, Contact   |
| **Footer overlay**           | `rgba(0, 5, 15, 0.95)`            | Footer                                     |
| **Card background**          | `rgba(0, 20, 40, 0.6–0.7)`        | Experience/research/contact cards          |
| **Input background**         | `rgba(0, 30, 50, 0.8)`            | Form fields                                |

### Text Colors (Dark Theme)

| Token                   | Value                          | Usage                      |
|-------------------------|--------------------------------|----------------------------|
| **Headings**            | `#ffffff`                      | All section `h2`, `h3`     |
| **Body text**           | `rgba(255, 255, 255, 0.85)`    | Paragraphs, list items     |
| **Muted text**          | `rgba(255, 255, 255, 0.7)`     | Secondary/gray text        |
| **Placeholder text**    | `rgba(255, 255, 255, 0.4)`     | Form placeholders          |

### Accent / Brand Colors

| Color                      | Hex / Value                                  | Usage                                  |
|----------------------------|----------------------------------------------|----------------------------------------|
| **Cyan (Primary Accent)**  | `#00ffc8`                                    | Hover states, icons, highlights, links |
| **Cyan (Secondary)**       | `#00c9a7`                                    | Gradient start for CTAs and buttons    |
| **Navbar text**            | Tailwind `text-cyan-400`                     | Logo "PK", nav hover                   |
| **Navbar border**          | `rgba(0, 200, 200, 0.2)` / `border-cyan-500/20` | Subtle cyan borders                |
| **Card borders**           | `rgba(0, 200, 200, 0.2)`                    | Card outlines                          |
| **Card gradient bg**       | `linear-gradient(135deg, rgba(0,100,150,0.2), rgba(0,150,200,0.1))` | About/Skills/Education card fills |
| **Focus ring (form)**      | `rgba(0, 255, 200, 0.2)`                    | Input focus glow                       |
| **CTA button**             | `linear-gradient(135deg, #00c9a7, #00ffc8)` | Submit/CTA buttons                     |
| **CTA hover glow**         | `0 0 30px rgba(0, 255, 200, 0.4–0.5)`       | Button hover shadow                    |

### Section Accent Colors (Experience Border-Left)

| Section             | Tailwind Color       |
|---------------------|----------------------|
| Research Lead       | `border-indigo-600`  |
| Software Dev        | `border-purple-600`  |
| Event Manager       | `border-pink-600`    |
| Claude Builder      | `border-blue-600`    |
| SBI Intern          | `border-green-600`   |
| Center Assistant    | `border-yellow-600`  |

### Project Card Gradient Bars

| Project               | Gradient                                          |
|------------------------|---------------------------------------------------|
| Custom MCP Server      | `from-indigo-500 via-purple-500 to-pink-500`      |
| VEDA                   | `from-yellow-400 via-amber-500 to-orange-500`     |
| VibeCheck              | `from-red-500 via-orange-500 to-yellow-500`       |
| Restaurant Management  | `from-purple-500 via-pink-500 to-rose-500`        |

---

## ✨ Animations & Transitions

### Keyframe Animations

| Name              | Duration | Easing                           | Description                                  |
|-------------------|----------|----------------------------------|----------------------------------------------|
| `fadeInHero`      | 1.5s     | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero entrance: fade + slide up + blur        |
| `float`           | 3s       | `ease-in-out` (infinite)         | Subtle vertical float for profile image      |
| `gradientShift`   | 8s       | `ease` (infinite)                | Section title gradient text animation        |
| `slideUpFadeIn`   | 1s       | `cubic-bezier(0.16, 1, 0.3, 1)` | Project cards: slide up + rotate reveal      |
| `fadeInUp`        | 0.6s     | `ease`                           | Staggered children animation on scroll       |
| `fadeInScale`     | 0.6s     | `ease`                           | Skills cards scale-in                        |
| `pulse-soft`      | 2s       | `ease-in-out` (infinite)         | CTA button shadow pulse                      |
| `pulse-slow`      | 2s       | `cubic-bezier(0.4, 0, 0.6, 1)`  | Tech badge glow pulse                        |

### Transition Defaults

| Element                     | Duration | Easing                              |
|-----------------------------|----------|--------------------------------------|
| Buttons, links, cards       | `0.3s`   | `ease`                               |
| Section fade-in             | `0.8s`   | `cubic-bezier(0.4, 0, 0.2, 1)`      |
| Project card hover          | `0.6s`   | `cubic-bezier(0.16, 1, 0.3, 1)`     |
| Experience/research cards   | `0.5s`   | `cubic-bezier(0.4, 0, 0.2, 1)`      |
| Social link hover           | `0.3s`   | `cubic-bezier(0.4, 0, 0.2, 1)`      |

### Hover Effects

| Element          | Effect                                                              |
|------------------|----------------------------------------------------------------------|
| Project cards    | `translateY(-16px) scale(1.03) rotateX(2deg)` + enhanced box-shadow |
| Experience cards | `translateY(-4px) scale(1.01)` + shimmer sweep (`::before`)        |
| Social links     | `translateY(-3px) scale(1.15)` + `rotate(5deg)` on SVG             |
| Tech tags        | `translateY(-2px)` + subtle shadow                                  |
| Nav links        | Underline grows from left (`::after` width 0→100%)                  |

---

## 🏗 Layout Patterns

| Token               | Value                            |
|----------------------|----------------------------------|
| **Max content width**| `max-w-7xl` (80rem / 1280px)     |
| **Section padding**  | `py-20` (5rem vertical)          |
| **Card border radius** | `rounded-xl` (0.75rem) / `rounded-lg` (0.5rem) |
| **Backdrop blur**    | `blur(10px)` on dark overlays    |
| **Navbar height**    | `h-16` (4rem)                    |
| **Navbar z-index**   | `100`                            |
| **Section z-index**  | `10`                             |

---

## 🖌 Gradient Text (Section Titles)

Applied to `.experience-title`, `.research-title`, `.project-title`, `.skills-title`, `.education-title`, `.volunteering-title`, `.contact-title`:

```css
background: linear-gradient(135deg, #1f2937 0%, #4f46e5 25%, #7c3aed 50%, #ec4899 75%, #4f46e5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
animation: gradientShift 8s ease infinite;
background-size: 300% 300%;
```

---

## 🌊 Animated Network Background

- **Type**: HTML5 Canvas (`#network-canvas`) with JavaScript particle system
- **Base color**: Pure black (`#000000`)
- **Particle/node colors**: Cyan-tinted (`rgba(0, 200, 200, ...)`)
- **Effect**: Floating nodes connected by lines, creating a tech-network feel
- **Z-index**: `0` (behind all content)

---

## 📱 Responsive Breakpoints

Uses Tailwind's default breakpoints:

| Breakpoint | Min Width | Usage                               |
|------------|-----------|--------------------------------------|
| `sm`       | 640px     | Typography scale-down               |
| `md`       | 768px     | Grid switches, nav visibility       |
| `lg`       | 1024px    | Grid column counts, layout tweaks   |

---

## 🔗 Stitch Project Reference

| Property      | Value                          |
|---------------|--------------------------------|
| **Project ID**    | `1525370321961831447`          |
| **Project Name**  | `LinkedIn Personal Portfolio`  |
| **Visibility**    | Private                        |
| **Origin**        | Stitch                         |
| **Created**       | 2026-03-23                     |
