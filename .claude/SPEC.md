# SPEC.md

## 1. Product Definition

**Jullien Lab** is a single-page portfolio site with separate detail pages only for individual Work projects.

The home page should communicate:

```txt
- world and identity
- interactive AI terminal experience
- short personal introduction
- portfolio projects
- practical skill stack
- contact routes
```

The site should be minimal, space-themed, cyber, and trustworthy.

---

## 2. Site Architecture

### Home Page

Path:

```txt
/
```

Sections:

```txt
1. Jullien Lab
2. Terminal
3. About me
4. Work
5. Skill Stack
6. Contact me
```

### Work Detail Pages

Path:

```txt
/work/[slug]
```

Only Work projects have their own detail pages.

---

## 3. Navigation Requirements

A top menu should be present on the page.

Menu items:

```txt
TOP
TERMINAL
ABOUT
WORK
SKILL
CONTACT
```

Anchor mapping:

```txt
TOP       -> #top
TERMINAL  -> #terminal
ABOUT     -> #about
WORK      -> #work
SKILL     -> #skill
CONTACT   -> #contact
```

Requirements:

```txt
- Clicking a menu item scrolls to the corresponding section.
- Keyboard focus must work.
- Active section indication is optional but recommended.
- Menu font should use Misaki Gothic or a similar bitmap/pixel fallback.
```

---

## 4. Home Section Specifications

## 4.1 Section 1: Jullien Lab

### ID

```txt
#top
```

### Purpose

Create a strong first impression and world view.

### Visible Content

The main visible text should be only:

```txt
Jullien Lab
```

No subtitle, CTA, service explanation, or profile copy in the first view.

### Visual Requirement

The background contains an interactive monochrome graphical 3D earth.

Requirements:

```txt
- monochrome
- slow rotation
- subtle pointer interaction
- does not block readability
- has static fallback
- respects reduced motion
```

Implementation candidates:

```txt
React Three Fiber / Three.js
or lightweight canvas/WebGL implementation
```

---

## 4.2 Section 2: Terminal

### ID

```txt
#terminal
```

### Purpose

Visitors can interact with an AI that answers questions about Jullien's background, Work, skills, and contact routes.

### UI

A terminal-style window independent from the page background.

Requirements:

```txt
- terminal emulator feel
- frosted glass / backdrop blur
- monochrome
- terminal-style monospace font
- visible prompt
- scrollable output area
- command input
- keyboard-first interaction
```

### Suggested Starter Commands

```txt
whoami
work
skills
contact
ask "What can Jullien help with?"
```

### AI Behavior

The AI should answer from curated portfolio knowledge only.

Rules:

```txt
- Do not invent experience.
- Do not invent client names.
- Do not invent metrics.
- Do not reveal private details.
- If information is unknown, say that it is not public or not listed.
- Keep answers concise.
```

### API

Initial API route candidate:

```txt
/api/terminal-chat
```

Request shape:

```ts
type TerminalChatRequest = {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
};
```

Response shape:

```ts
type TerminalChatResponse = {
  answer: string;
  sources?: string[];
};
```

### Fallback Mode

If no AI provider is configured, terminal should still support static commands:

```txt
whoami
work
skills
contact
help
clear
```

---

## 4.3 Section 3: About me

### ID

```txt
#about
```

### Purpose

Humanize the site and increase trust.

### Layout

```txt
left: circular profile photo
right: concise personal introduction
```

### Requirements

```txt
- profile photo should be circular
- if no photo exists, use placeholder
- copy will be finalized later
- mention Human+ if appropriate
- keep text short and personal
```

---

## 4.4 Section 4: Work

### ID

```txt
#work
```

### Purpose

Show portfolio projects as visual objects, not text-heavy cards.

### Card Default State

Each card shows:

```txt
- 3D object derived from the project
- project name
```

### Hover / Focus State

On hover/focus:

```txt
- 3D object moves subtly
- compact popup appears
- popup shows short summary
- project can be opened
```

### Click

Clicking a Work card opens:

```txt
/work/[slug]
```

### Touch Behavior

Touch devices must not depend on hover only.

Recommended:

```txt
- tap reveals summary
- visible detail link opens project page
```

### Initial Work Candidates

```txt
- 業務効率化AIエージェント
- コーチング事業向けAI導入
- AI Output Review Studio
- AI開発の個人研究
```

### Asset State

3D assets are pending. Use placeholders until final models are provided.

---

## 4.5 Section 5: Skill Stack

### ID

```txt
#skill
```

### Purpose

Show practical skill capability visually.

### Display

Use three pentagon/radar diagrams placed horizontally on desktop.

```txt
Diagram 1: AI Systems
Diagram 2: Web Application
Diagram 3: Cloud / Automation
```

Each diagram has five axes.

### Mobile

Stack diagrams vertically.

### Content Rule

Only show mainly technologies used in practical work. Put broader surrounding technologies on StackShare.

### StackShare

Include a link to StackShare when URL is available.

---

## 4.6 Section 6: Contact me

### ID

```txt
#contact
```

### Purpose

Provide contact routes.

### Links

```txt
Email
X
GitHub
```

### Requirements

```txt
- no contact form
- links must be accessible
- copy should be short
```

---

## 5. Work Detail Page Specification

### Path

```txt
/work/[slug]
```

### Required Content

```txt
Project Name
Short Summary
Role
Context
What I Built
Technical Stack
Result / Output
Links
```

### Optional Content

```txt
Architecture diagram
Screenshots
Demo link
GitHub link
Notes
```

### Confidential Work

If a Work item is anonymized:

```txt
- do not reveal client name
- do not reveal internal data
- do not invent metrics
- describe structure and contribution at an allowed level
```

---

## 6. Data Model

## 6.1 Site

```ts
type SiteConfig = {
  name: "Jullien Lab";
  owner: "Jullien";
  organization: "Human+";
  links: {
    email?: string;
    x?: string;
    github?: string;
    stackshare?: string;
  };
};
```

## 6.2 Work

```ts
type Work = {
  slug: string;
  name: string;
  summary: string;
  role: string[];
  stack: string[];
  status?: "public" | "anonymized" | "private-demo";
  detailPage: boolean;
  githubUrl?: string;
  demoUrl?: string;
  objectAsset?: {
    glb?: string;
    fallbackImage?: string;
    alt: string;
  };
};
```

## 6.3 Skill Diagram

```ts
type SkillDiagram = {
  title: string;
  axes: Array<{
    label: string;
    value: number; // 0-5
  }>;
  tools: string[];
};
```

## 6.4 Terminal Knowledge

```ts
type TerminalKnowledge = {
  profile: string;
  works: Work[];
  skills: SkillDiagram[];
  links: SiteConfig["links"];
  rules: string[];
};
```

---

## 7. Technical Requirements

Recommended stack:

```txt
Next.js
TypeScript
Tailwind CSS
React Three Fiber / Three.js
Vercel
```

Recommended utilities:

```txt
Playwright
ESLint
Prettier
Custom SVG radar chart
```

Avoid unless necessary:

```txt
heavy chart libraries
large animation frameworks
unoptimized GLB assets
video backgrounds
CMS in initial release
```

---

## 8. SEO / Metadata

Minimum metadata:

```txt
Title: Jullien Lab
Description: AI systems, agents, and web apps by Jullien, Founder of Human+.
OG image: TODO
```

Work detail pages should have individual titles and descriptions.

---

## 9. Accessibility Requirements

```txt
- navigation anchors are keyboard accessible
- terminal is keyboard usable
- terminal has readable output
- work hover summaries are also available on focus/touch
- WebGL content has fallback
- profile photo has alt text
- skill diagrams have text summaries
- contact links have clear labels
- reduced motion is supported
```

---

## 10. Open Dependencies

Implementation requires:

```txt
- final profile photo
- 3D earth implementation decision
- Work 3D object assets or placeholders
- final Work copy
- final skill diagram scores
- Email / X / GitHub links
- StackShare URL if used
```
