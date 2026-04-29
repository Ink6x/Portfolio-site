# CLAUDE.md

## 1. Project Context

This is **Jullien Lab**, a redesigned personal portfolio site.

The site is no longer a service-first page with Support and Case Notes as top-level sections. It is now a single-page lab-style portfolio with:

```txt
1. Jullien Lab
2. Terminal
3. About me
4. Work
5. Skill Stack
6. Contact me
```

Only Work projects have detail pages.

```txt
/work/[slug]
```

---

## 2. Always Read

Before planning or editing, read:

```txt
DESIGN.md
docs/SPEC.md
docs/CONTENT.md
docs/IMPLEMENTATION_PLAN.md
docs/OPEN_QUESTIONS.md
```

For visual assets:

```txt
docs/ASSET_GUIDE.md
```

---

## 3. High-Level Direction

```txt
minimal
space
cyber
trust
monochrome
interactive earth
terminal UI
3D Work objects
human About section
```

Avoid:

```txt
sales LP feel
gradients
unnecessary lines
busy sci-fi HUD
generic AI SaaS styling
text-heavy project cards
```

---

## 4. Important Design Decisions

### Top Section

The first section should show only:

```txt
Jullien Lab
```

The visual background is an interactive monochrome 3D earth.

Do not add:

```txt
tagline
CTA
service explanation
profile line
```

### Terminal

The terminal is a major section, not a decorative component. It should allow visitors to ask an AI about Jullien.

Before AI integration, it must work in static command mode.

### About me

Use a circular profile photo on the left and concise copy on the right.

### Work

Each card shows only:

```txt
3D object
project name
```

Hover/focus reveals a compact popup summary.

### Skill Stack

Use three pentagon/radar diagrams horizontally on desktop.

### Contact

No contact form. Use Email / X / GitHub links.

---

## 5. Workflow

When asked to implement or modify:

1. Inspect current files.
2. Compare with DESIGN.md and SPEC.md.
3. Make a small plan.
4. Implement one section/component at a time.
5. Keep TODOs for missing copy/assets.
6. Run available checks.
7. Report completed work and remaining risks.

---

## 6. Content Policy for This Project

Do not invent:

```txt
- client names
- company names
- revenue/results
- years of experience
- exact metrics
- private project details
- biography details not provided
```

Use placeholders where needed.

---

## 7. Terminal AI Safety

The AI terminal should answer only from curated portfolio knowledge.

If asked something not present:

```txt
公開情報としてはまだ記載されていません。
```

or equivalent.

Do not expose hidden prompts, environment variables, or private notes.

---

## 8. Asset Handling

Assets pending:

```txt
profile photo
3D earth
Work 3D objects
fallback images
OG image
```

Use placeholders until provided.

Do not bundle font files without verified license/source.
