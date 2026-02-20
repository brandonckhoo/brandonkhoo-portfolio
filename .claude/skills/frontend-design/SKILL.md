# Skill: front-end-designer

## Mission
Design and implement polished, modern web UI that matches the ElevenLabs Creative aesthetic: clean layout, lots of whitespace, soft pastel gradients, rounded cards, subtle borders, minimal shadows, crisp typography, and calm motion.

## When to use
Use this skill when the user wants:
1. A landing page, portfolio, marketing site, or product UI
2. A visual refresh to match a pastel gradient brand
3. A component library and design tokens that feel premium and lightweight

## Inputs you should ask for (only if missing)
1. Page type: landing, portfolio, blog, docs, pricing
2. Primary CTA: what action matters most
3. Content blocks: headline, subhead, features, testimonials, logos, footer
4. Tech constraints: Next.js, React, Tailwind, plain HTML
5. Target device: desktop first or mobile first

If inputs are missing, make reasonable defaults and proceed.

## Output requirements
You must deliver:
1. Design tokens (CSS variables) for color, gradients, typography, radius, shadow, border
2. A layout spec (grid, spacing scale, breakpoints)
3. Component spec (buttons, cards, tabs, navbar, hero, sections)
4. Production ready code with clean structure
5. Accessibility baseline (contrast, focus, keyboard nav)

Prefer Tailwind plus CSS variables. If Tailwind is not available, use vanilla CSS with variables.

## Visual style rules

### Typography
Use a modern sans stack:
1. font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Inter, Helvetica, Arial

Type scale (desktop):
1. H1: 56px to 72px, tracking -0.02em, weight 600 to 700
2. H2: 36px to 44px, weight 600
3. Body: 16px to 18px, weight 400
4. Small: 13px to 14px

Line height:
1. Headings: 1.05 to 1.15
2. Body: 1.5 to 1.7

### Spacing and layout
1. Max content width: 1120px to 1200px
2. Section padding: 80px top and bottom on desktop, 56px on mobile
3. Use large gutters and generous vertical rhythm
4. Prefer 2 column hero: left text, right product preview
5. Use card grids: 4 across on desktop, 2 on tablet, 1 on mobile

### Surfaces
1. Background: warm off white, never pure white
2. Cards: slightly tinted surface, 1px border, large radius
3. Shadows: subtle only, use borders more than shadows

### Motion
1. Small fades and translateY 8px on section reveal
2. Hover: scale 1.01, border color shift, shadow increase slightly
3. Duration: 180ms to 240ms, easing: cubic-bezier(0.2, 0.8, 0.2, 1)

## Design tokens
Create these CSS variables in :root and use them everywhere.

### Base colors
1. --bg: #fbfaf8
2. --surface: #f4f1ec
3. --surface-2: #efece6
4. --text: #0b0b0c
5. --muted: #6b6f76
6. --border: rgba(12, 12, 13, 0.08)

### Pastel gradients (ElevenLabs like)
Use soft gradients. Provide 6 options and apply them to hero art, category icons, and media cards.

1. --g-1: radial-gradient(120% 120% at 30% 20%, rgba(255, 142, 178, 0.55) 0%, rgba(138, 196, 255, 0.55) 35%, rgba(255, 202, 140, 0.45) 70%, rgba(250, 250, 248, 0) 100%)
2. --g-2: radial-gradient(120% 120% at 70% 30%, rgba(155, 214, 255, 0.55) 0%, rgba(255, 154, 196, 0.45) 45%, rgba(255, 215, 160, 0.35) 75%, rgba(250, 250, 248, 0) 100%)
3. --g-3: radial-gradient(120% 120% at 40% 60%, rgba(170, 236, 216, 0.55) 0%, rgba(168, 186, 255, 0.45) 45%, rgba(255, 170, 210, 0.35) 78%, rgba(250, 250, 248, 0) 100%)
4. --g-4: radial-gradient(120% 120% at 60% 50%, rgba(255, 203, 140, 0.50) 0%, rgba(255, 148, 186, 0.45) 35%, rgba(136, 204, 255, 0.40) 70%, rgba(250, 250, 248, 0) 100%)
5. --g-5: radial-gradient(120% 120% at 50% 40%, rgba(180, 210, 255, 0.55) 0%, rgba(255, 170, 200, 0.40) 55%, rgba(255, 220, 170, 0.30) 85%, rgba(250, 250, 248, 0) 100%)
6. --g-6: radial-gradient(120% 120% at 45% 45%, rgba(255, 160, 190, 0.50) 0%, rgba(150, 210, 255, 0.45) 50%, rgba(250, 210, 150, 0.30) 85%, rgba(250, 250, 248, 0) 100%)

### Radii
1. --r-sm: 12px
2. --r-md: 18px
3. --r-lg: 28px
4. --r-xl: 36px

### Shadows
1. --shadow-1: 0 1px 0 rgba(12, 12, 13, 0.06)
2. --shadow-2: 0 10px 30px rgba(12, 12, 13, 0.08)

## Component patterns

### Navbar
1. Left logo, center nav, right CTA
2. CTA is a black pill button
3. Secondary action is an outline pill

### Buttons
Primary:
1. Background: #0b0b0c
2. Text: white
3. Radius: 999px
4. Padding: 12px 18px
5. Hover: opacity 0.92

Secondary:
1. Background: transparent
2. Border: 1px solid var(--border)
3. Radius: 999px
4. Hover: background rgba(12, 12, 13, 0.03)

### Cards
1. Background: var(--surface)
2. Border: 1px solid var(--border)
3. Radius: var(--r-xl)
4. Padding: 20px to 28px
5. Optional gradient orb thumbnail on top

### Feature grid
1. 4 cards desktop, 2 tablet, 1 mobile
2. Each card contains:
   1. Gradient orb or tile
   2. Title
   3. 1 sentence description

### Tabs
1. Pill segmented control
2. Active tab: surface with border and shadow 1

### Media tiles
1. Rounded rectangle with gradient overlay
2. Big title over image, subtle caption

## Implementation rules
1. Default build: Next.js plus React plus Tailwind
2. Use CSS variables for tokens, Tailwind for layout
3. Avoid heavy shadows and saturated colors
4. Prefer borders, blur, and low alpha layers
5. Keep copy short and confident

## Accessibility
1. Focus rings visible on all interactive elements
2. Buttons and tabs reachable by keyboard
3. Minimum 44px tap targets
4. Body text contrast must pass WCAG AA on background

## Deliverable template
When you generate code, include:
1. styles tokens file with variables
2. Components: Button, Card, Tabs, Navbar
3. Page sections: Hero, FeatureGrid, DemoPanel, UpdatesSection, Footer
4. Responsive behavior for 3 breakpoints
