# IMPLEMENTATION_PLAN.md

## 1. Implementation Principle

Build the redesigned **Jullien Lab** as a single-page portfolio with Work detail pages.

The site now depends on interactive visual elements, but should remain controlled and performant.

Core principle:

```txt
Minimal first. Interactive where it matters.
```

---

## 2. Recommended Stack

```txt
Next.js
TypeScript
Tailwind CSS
React Three Fiber
Three.js
Vercel
Playwright
```

Recommended additions:

```txt
@react-three/drei
ESLint
Prettier
sharp or image optimization tooling
```

Avoid unless necessary:

```txt
heavy chart libraries
large animation frameworks
CMS
video backgrounds
uncompressed GLB assets
```

---

## 3. Recommended Repository Structure

```txt
jullien-lab/
  DESIGN.md
  AGENTS.md
  CLAUDE.md
  README.md

  docs/
    BRIEF.md
    SPEC.md
    CONTENT.md
    REFERENCE.md
    IMPLEMENTATION_PLAN.md
    ASSET_GUIDE.md
    OPEN_QUESTIONS.md

  src/
    app/
      layout.tsx
      page.tsx
      globals.css
      work/
        [slug]/
          page.tsx
      api/
        terminal-chat/
          route.ts

    components/
      layout/
        SiteHeader.tsx
        SiteFooter.tsx
        PageShell.tsx
      sections/
        JullienLabSection.tsx
        TerminalSection.tsx
        AboutMeSection.tsx
        WorkSection.tsx
        SkillStackSection.tsx
        ContactMeSection.tsx
      terminal/
        TerminalWindow.tsx
        TerminalInput.tsx
        TerminalOutput.tsx
      three/
        MonochromeEarth.tsx
        WorkObjectViewer.tsx
        ThreeFallback.tsx
      work/
        WorkCard.tsx
        WorkPopup.tsx
      skill/
        PentagonSkillChart.tsx
        SkillDiagramGroup.tsx
      ui/
        Container.tsx
        SectionLabel.tsx
        LinkButton.tsx

    content/
      site.ts
      links.ts
      terminal-knowledge.ts
      works.ts
      skills.ts

    lib/
      cn.ts
      terminal.ts
      work.ts
      metadata.ts

    types/
      work.ts
      skill.ts
      terminal.ts

  public/
    images/
      profile/
      work-fallbacks/
      og/
    models/
      earth/
      work/
    fonts/
```

---

## 4. Phase 0: Documentation Sync

### Goal

Ensure all project documents match the new design.

### Tasks

```txt
- Update DESIGN.md.
- Update SPEC.md.
- Update CONTENT.md.
- Update ASSET_GUIDE.md.
- Update OPEN_QUESTIONS.md.
- Update AGENTS.md and CLAUDE.md.
```

### Done When

```txt
No top-level Support / Case Notes section remains in documents.
New structure is used consistently.
```

---

## 5. Phase 1: Project Scaffold

### Goal

Create the Next.js project structure.

### Tasks

```txt
- Set up Next.js with TypeScript.
- Add Tailwind CSS.
- Add base CSS variables from DESIGN.md.
- Create route /.
- Create route /work/[slug].
- Create /api/terminal-chat placeholder.
- Create content files.
- Create section components with placeholders.
```

### Done When

```txt
- npm run lint passes
- npm run typecheck passes
- npm run build passes
- page renders all six sections
```

---

## 6. Phase 2: Navigation and Page Shell

### Goal

Create fixed/minimal top menu with anchor scroll.

### Tasks

```txt
- Build SiteHeader.
- Add menu labels: TOP / TERMINAL / ABOUT / WORK / SKILL / CONTACT.
- Use Misaki Gothic or fallback for nav.
- Implement anchor scroll.
- Ensure keyboard focus and mobile layout.
```

### Done When

```txt
- Each menu item scrolls correctly.
- Mobile navigation is usable.
- Header does not overpower Jullien Lab first view.
```

---

## 7. Phase 3: Jullien Lab Section

### Goal

Create the first view with only Jullien Lab and monochrome interactive earth.

### Tasks

```txt
- Build JullienLabSection.
- Build MonochromeEarth placeholder.
- Add static fallback.
- Ensure text remains readable.
- Add reduced motion behavior.
```

### Done When

```txt
- First viewport shows Jullien Lab as the only main content.
- Earth is monochrome and calm.
- Fallback works without WebGL.
```

---

## 8. Phase 4: Terminal Section

### Goal

Create interactive terminal UI.

### Tasks

```txt
- Build TerminalWindow.
- Add static commands: help, whoami, work, skills, contact, clear.
- Build input and output state.
- Add /api/terminal-chat route placeholder.
- Add terminal knowledge file.
- Add AI provider integration only after secrets are configured.
```

### Done When

```txt
- Terminal works without AI provider using static commands.
- Terminal can later call /api/terminal-chat.
- Terminal is keyboard usable.
```

---

## 9. Phase 5: About me Section

### Goal

Add concise human introduction with circular profile photo.

### Tasks

```txt
- Build AboutMeSection.
- Add circular profile image placeholder.
- Add draft copy from CONTENT.md.
- Prepare image path for final photo.
```

### Done When

```txt
- Layout works desktop and mobile.
- Placeholder can be replaced by final photo.
```

---

## 10. Phase 6: Work Section

### Goal

Build visual Work cards with 3D object placeholders.

### Tasks

```txt
- Build WorkSection.
- Build WorkCard.
- Build WorkObjectViewer.
- Add object placeholder for each Work.
- Add hover/focus popup.
- Add touch behavior.
- Link to /work/[slug].
```

### Done When

```txt
- Cards show only object + project name by default.
- Hover/focus reveals summary.
- Click opens detail page.
- Fallback images work.
```

---

## 11. Phase 7: Work Detail Pages

### Goal

Build project detail pages.

### Tasks

```txt
- Create /work/[slug].
- Add content lookup from works.ts.
- Create shared detail layout.
- Add placeholder content where needed.
```

### Done When

```txt
- At least two Work detail pages render.
- Missing Work returns notFound.
- Confidentiality notes are included where needed.
```

---

## 12. Phase 8: Skill Stack Section

### Goal

Show three pentagon diagrams.

### Tasks

```txt
- Build PentagonSkillChart as SVG.
- Build SkillDiagramGroup.
- Add three diagrams horizontally on desktop.
- Stack vertically on mobile.
- Add text summary for accessibility.
- Add StackShare link placeholder.
```

### Done When

```txt
- Charts render without a heavy chart library.
- Mobile layout works.
- Screen-reader text exists.
```

---

## 13. Phase 9: Contact me Section

### Goal

Add contact links only.

### Tasks

```txt
- Build ContactMeSection.
- Add Email / X / GitHub links.
- No form.
- Add concise copy.
```

### Done When

```txt
- Links are visible and keyboard accessible.
- No contact form exists.
```

---

## 14. Phase 10: Asset Replacement

### Goal

Replace placeholders with final assets.

### Assets Needed

```txt
- profile photo
- monochrome earth asset or implementation
- Work 3D objects
- Work fallback images
- OG image
```

### Done When

```txt
- Assets are optimized.
- GLB files are compressed.
- Fallback images exist.
- LCP is acceptable.
```

---

## 15. Phase 11: QA

### Required Checks

```txt
- lint
- typecheck
- build
- Playwright desktop screenshot
- Playwright mobile screenshot
- keyboard navigation check
- reduced motion check
- terminal fallback check
- WebGL fallback check
```

### Viewports

```txt
390px mobile
768px tablet
1440px desktop
1920px wide
```
