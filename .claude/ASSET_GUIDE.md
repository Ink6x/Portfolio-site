# ASSET_GUIDE.md

## 1. Purpose

This document defines visual asset requirements for the redesigned **Jullien Lab** site.

The new design uses:

```txt
- monochrome interactive 3D earth
- profile photo
- 3D objects for each Work project
- fallback images for all 3D assets
```

Assets are pending and should be treated as replaceable placeholders during implementation.

---

## 2. Top Section: Monochrome 3D Earth

### Purpose

Create the world of Jullien Lab without adding explanatory copy.

### Visual Direction

```txt
monochrome
graphical
interactive
calm
minimal
cyber-space
not realistic stock NASA
not colorful
not busy
```

### Behavior

```txt
- slow rotation
- subtle pointer response
- no aggressive zoom
- no distracting particles
- respects reduced motion
```

### Implementation Options

```txt
Option A: React Three Fiber sphere with monochrome material
Option B: custom shader/canvas earth
Option C: lightweight static fallback for first release, interactive later
```

### Required Files

```txt
public/models/earth/earth.glb              TODO if model-based
public/images/work-fallbacks/earth.webp   TODO fallback
```

### Fallback

If WebGL fails:

```txt
- static monochrome earth image
- or CSS/SVG circular graphic
```

---

## 3. Profile Photo

### Usage

Used in About me section.

### Requirements

```txt
- circular crop
- calm and trustworthy
- human, not overly staged
- works in monochrome/dark UI
- clear face or intentional portrait style
```

### Required Files

```txt
public/images/profile/jullien.webp
public/images/profile/jullien-fallback.jpg
```

### Placeholder

Before final photo is ready:

```txt
- use neutral circular silhouette
- or simple monochrome avatar placeholder
```

---

## 4. Work 3D Objects

### Purpose

Each Work card should be recognized visually by a project-derived 3D object.

### Card Default State

```txt
3D object
project name
```

### Hover / Focus

```txt
object moves subtly
small popup shows summary
```

### Required Per-Project Asset Set

```txt
public/models/work/[slug].glb
public/images/work-fallbacks/[slug].webp
```

### 3D Object Principles

```txt
- one symbolic object per project
- minimal and readable silhouette
- monochrome or near-monochrome material
- low poly / optimized
- not overly cute
- not game collectible style
- not noisy
```

### Suggested Object Directions

#### business-automation-agent

```txt
symbolic object ideas:
- small automation core
- connected nodes
- mechanical document processor
- abstract workflow engine
```

#### coaching-ai-implementation

```txt
symbolic object ideas:
- dialogue orb
- notebook and signal object
- calm coaching interface device
- human-support module
```

#### ai-output-review-studio

```txt
symbolic object ideas:
- comparison panels
- review lens
- output inspection cube
- evaluation console
```

#### ai-development-research

```txt
symbolic object ideas:
- lab notebook
- experimental module
- small satellite/probe
- research archive cube
```

---

## 5. Skill Stack Diagrams

### Asset Type

Prefer generated SVG/CSS rather than raster images.

### Style

```txt
pentagon radar chart
monochrome
thin lines only where necessary
no colorful chart palette
minimal labels
```

### Diagrams

```txt
AI Systems
Web Application
Cloud / Automation
```

---

## 6. Terminal Visual

### Asset Needs

No image asset required.

### UI Requirements

```txt
terminal window
frosted glass
monochrome
terminal font
visible prompt and cursor
```

### Avoid

```txt
fake hacking aesthetic
green-on-black cliche if it feels cheap
excessive scanlines
unreadable pixel text
```

---

## 7. Image / Model Optimization

### Images

```txt
- export WebP or AVIF
- provide fallback JPG/PNG if needed
- avoid oversized profile images
- use responsive sizes
```

### GLB Models

```txt
- reduce polygon count
- compress textures
- use Draco or Meshopt where appropriate
- lazy-load Work assets
- provide static fallback image
```

---

## 8. Pending Assets

```txt
- final profile photo
- 3D earth or implementation decision
- Work 3D object for each project
- Work fallback images
- OG image
```

Do not block layout implementation on these assets. Use placeholders that match the final dimensions and behavior.
