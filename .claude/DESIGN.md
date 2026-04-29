# DESIGN.md

## 0. Purpose

This document defines the redesigned direction for **Jullien Lab**.

The site is a portfolio-style personal lab for AI development, AI agent development, AI-powered web apps, and practical implementation work. The home page carries almost all information. Only individual Work items have detail pages.

The site should feel minimal, spatial, cyber, and trustworthy. It should not feel like a generic AI SaaS landing page or a noisy creative demo.

---

## 1. Core Concept

### Site Name

```txt
Jullien Lab
```

### Identity

```txt
Jullien
Founder of Human+
```

### Positioning

```txt
A minimal cyber-space portfolio for AI systems, agents, and web applications.
```

### Design Keywords

```txt
minimal
space
cyber
trust
terminal
monochrome
interactive earth
human profile
3D project objects
practical AI
```

### Anti-Goals

```txt
sales landing page
AI-generated-looking design
overdecorated gradients
unnecessary lines
busy HUD UI
random neon
childish game UI
heavy unreadable 3D
unclear service scope
```

---

## 2. Information Architecture

### Home Page Sections

```txt
1. Jullien Lab
2. Terminal
3. About me
4. Work
5. Skill Stack
6. Contact me
```

### Detail Pages

Each Work item may have its own detail page.

```txt
/work/[slug]
```

### Navigation

The menu is placed at the top of the page. Each menu item scrolls to the corresponding section.

```txt
TOP       -> #top
TERMINAL  -> #terminal
ABOUT     -> #about
WORK      -> #work
SKILL     -> #skill
CONTACT   -> #contact
```

The menu should be visible, minimal, and precise. It should not dominate the first view.

---

## 3. Overall Visual Direction

### Direction

```txt
Minimal Space Cyber Trust
```

### Background

Use a unified monochrome/dark world across the page.

Do not divide sections by unrelated background colors. Do not use decorative gradients. Section separation should be created through spacing, layout, and component contrast.

### Color Mood

```txt
near-black
charcoal
soft white
muted gray
monochrome 3D earth
subtle glass blur only where needed
```

### Decoration Rules

Use only necessary decoration:

```txt
- 3D earth in the top section
- terminal window frame
- project 3D objects
- skill pentagon diagrams
- minimal hover/focus states
```

Avoid:

```txt
- decorative gradients
- unnecessary diagonal lines
- excessive glowing borders
- random stars everywhere
- heavy sci-fi panels
- colorful section backgrounds
```

---

## 4. Color System

### Base Tokens

```css
:root {
  --color-bg: #050505;
  --color-bg-soft: #0b0b0d;
  --color-bg-elevated: rgba(16, 16, 18, 0.72);

  --color-text: #f2f2f2;
  --color-text-muted: #a7a7a7;
  --color-text-subtle: #6f6f6f;

  --color-line: rgba(255, 255, 255, 0.12);
  --color-line-strong: rgba(255, 255, 255, 0.22);

  --color-glass: rgba(255, 255, 255, 0.055);
  --color-glass-strong: rgba(255, 255, 255, 0.09);

  --color-focus: #ffffff;
  --color-error: #ff6b6b;
}
```

### Color Rules

- Use monochrome as the primary visual system.
- Avoid decorative gradients.
- Avoid multiple accent colors.
- Use white/gray contrast and motion rather than color variety.
- If a functional accent is needed, use white or a very restrained cool gray.
- Do not introduce new colors without updating this file.

---

## 5. Typography

### Typography Direction

The site should combine:

```txt
minimal modern typography
+
terminal typography
+
Misaki Gothic for menu/detail labels
```

### Required Usage

```txt
Navigation:
Misaki Gothic or a visually similar bitmap/pixel Japanese font

Terminal:
terminal-emulator style monospace font

Body:
high-readability sans-serif

Work labels / metadata:
compact mono or Misaki-style label text
```

### Font Rules

- Misaki Gothic should be used mainly in the menu and small labels.
- Do not use Misaki Gothic for long body copy.
- Body text must remain highly readable.
- Terminal text should feel like a real engineer terminal emulator.
- Before committing any font file, verify license and source. Do not bundle unclear font files.

### Fallbacks

```css
--font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-terminal: "JetBrains Mono", "SFMono-Regular", "Cascadia Code", "Menlo", monospace;
--font-menu: "Misaki Gothic", "MS Gothic", monospace;
```

---

## 6. Section Design

## 6.1 Jullien Lab Section

### Purpose

Create the world. Do not explain everything here.

### Visible Content

The first view should show only:

```txt
Jullien Lab
```

The top navigation can exist, but the main section itself should not include tagline, CTA, service explanation, or long text.

### Visual

A monochrome interactive graphical 3D earth should exist in the background.

```txt
- monochrome
- slow rotation
- interactive with pointer movement
- calm and technical
- not realistic NASA imagery
- not colorful
- not noisy
```

### Fallback

If WebGL or motion is unavailable:

```txt
- static monochrome earth image
- or simple SVG/canvas circle representation
```

---

## 6.2 Terminal Section

### Purpose

Allow visitors to ask an AI about Jullien's background, work, skills, and contact options.

### UI Direction

The terminal should feel like a real terminal window floating above the page background.

```txt
terminal emulator
independent window
slightly frosted glass background
subtle blur
monochrome
engineering feel
```

### Terminal Behavior

The terminal should support:

```txt
- free-form questions about Jullien
- short command-like interactions
- suggested commands
- visible prompt
- loading state
- error state
- keyboard interaction
```

Suggested starter commands:

```txt
whoami
work
skills
contact
ask "What kind of AI projects can Jullien build?"
```

### Safety / Product Rule

The AI should answer only from curated portfolio knowledge. It should not invent experience, clients, numbers, or private details.

---

## 6.3 About me Section

### Purpose

Humanize the site and increase trust.

### Layout

```txt
left: circular profile photo
right: short personal introduction
```

### Rules

- Keep text concise.
- Do not over-explain career history.
- Add enough personality to reduce AI-tool-like coldness.
- Use real photo or prepared portrait asset when available.
- Use placeholder silhouette until the profile photo is provided.

---

## 6.4 Work Section

### Purpose

Show portfolio projects with strong visual memory and minimal text.

### Card Design

Each Work card should contain:

```txt
- one 3D object derived from the project
- project name
```

On hover/focus:

```txt
- the 3D object moves subtly
- a small popup appears
- popup shows a compact summary
- click opens the Work detail page
```

On touch devices:

```txt
- first tap or focus reveals summary
- second tap / explicit link opens detail page
```

### Rules

- Do not fill cards with long text by default.
- Do not make project cards look like SaaS feature cards.
- 3D object is the visual anchor.
- Text should remain minimal.
- Provide image fallback for every 3D object.

---

## 6.5 Skill Stack Section

### Purpose

Show practical technical capability visually, not as a random tag list.

### Display

Use pentagon/radar-style diagrams.

```txt
- 3 diagrams horizontally on desktop
- each diagram has 5 axes
- each diagram represents a skill group
- mobile stacks them vertically
```

### Suggested Groups

```txt
AI Systems
Web Application
Cloud / Automation
```

### Rules

- Include mainly technologies used in practical work.
- Put broader/secondary tools on StackShare instead of overloading the page.
- Use monochrome diagram styling.
- No colorful chart palette.
- Include a StackShare link if available.

---

## 6.6 Contact me Section

### Purpose

Provide contact routes without adding a contact form.

### Links

```txt
Email
X
GitHub
```

### Rules

- No form in the initial version.
- Keep copy short.
- Make contact links obvious and accessible.

---

## 7. Work Detail Pages

Each Work detail page should explain the project more clearly than the top page.

Recommended structure:

```txt
Project Name
Short Summary
Role
Problem / Context
What I Built
Technical Stack
Result / Output
Links
```

If confidentiality applies:

```txt
- anonymize client/project details
- do not include private metrics
- do not reveal internal architecture beyond allowed scope
```

---

## 8. Motion and Interaction

### Motion Direction

```txt
slow
controlled
technical
minimal
```

### Use Motion For

```txt
- 3D earth pointer response
- slow earth rotation
- Work object hover movement
- terminal cursor/blink
- small popup transitions
- anchor scroll
```

### Avoid

```txt
- scroll-jacking
- excessive parallax
- full-page animated transitions
- heavy animation on all sections
- motion that blocks reading
```

### Reduced Motion

Respect reduced motion. Disable or simplify:

```txt
- earth auto-rotation
- work object hover animation
- popup animation
- smooth scroll
```

---

## 9. Accessibility

Requirements:

```txt
- Navigation links must work by keyboard.
- Terminal must be usable with keyboard.
- Terminal output must be readable by screen readers where practical.
- Work cards must expose summaries on focus, not hover only.
- Every 3D object must have a static fallback and text alternative.
- Important information must not exist only inside canvas/WebGL.
- Focus states must be visible.
- Text contrast must be high.
- Reduced motion must be respected.
```

---

## 10. Performance Budget

The new design uses 3D, so performance must be treated as a design constraint.

### Rules

```txt
- Lazy-load below-the-fold 3D Work objects.
- Keep the 3D earth lightweight.
- Use static fallback images for all 3D assets.
- Compress GLB files.
- Do not load all Work 3D assets in the first viewport.
- Prefer custom SVG for skill diagrams instead of a heavy chart library.
- Keep terminal AI client lightweight.
```

### Targets

```txt
Initial load should remain fast.
Top 3D earth should not block text rendering.
Work section assets should load only near viewport.
```

---

## 11. Implementation Rules for AI Agents

When implementing or editing UI:

1. Read `DESIGN.md` first.
2. Preserve the new section order.
3. Do not reintroduce Support / Case Notes as top-level sections.
4. Keep the top section visually limited to `Jullien Lab`.
5. Use monochrome and minimal styling.
6. Do not add decorative gradients.
7. Do not overuse lines or HUD elements.
8. Use Misaki Gothic only for menu/small labels.
9. Keep Work cards minimal by default.
10. Provide fallback for 3D assets and profile photo.
11. Keep all undecided copy as TODO placeholders.

---

## 12. QA Checklist

Before release, verify:

```txt
- First view shows Jullien Lab clearly.
- The 3D earth is monochrome, calm, and not noisy.
- Navigation scrolls to each section.
- Terminal UI works with keyboard.
- Terminal AI does not invent facts.
- About me includes a circular profile photo or placeholder.
- Work cards show project names only by default.
- Work hover/focus reveals compact summary.
- Work cards link to detail pages.
- Skill Stack shows three pentagon diagrams on desktop.
- Contact links work.
- Site does not rely on gradients.
- Site remains readable on mobile.
- Reduced motion mode works.
```
