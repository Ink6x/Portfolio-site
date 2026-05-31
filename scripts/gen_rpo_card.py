"""
Generate the Work card image for the RPO / scout-automation case study.
Monochrome, cyber/terminal aesthetic matching the portfolio brand.
Concept: candidate pool -> selection funnel -> scouted candidates + auto-send,
with a bold "RPO" wordmark so the domain reads instantly.

Output: public/images/work/scout-automation-platform/card.png (1024x1024)
"""
from __future__ import annotations
import math
import os
from PIL import Image, ImageDraw, ImageFont

S = 2  # supersample factor
W = 1024 * S
H = 1024 * S

# brand palette (from globals.css)
BG = (12, 12, 12)        # --color-surface #0c0c0c
GRID = (28, 28, 28)      # subtle grid (slightly > --color-line for visibility)
DIM = (42, 42, 42)       # candidate pool (unselected)
MID = (107, 107, 107)    # --color-text-subtle #6b6b6b
SOFT = (140, 140, 140)
BRIGHT = (237, 237, 237)  # --color-text #ededed
SUB = (120, 120, 120)

FONT_DIR = r"C:\Windows\Fonts"
def font(name, size):
    return ImageFont.truetype(os.path.join(FONT_DIR, name), size * S)

f_brand = font("arialbd.ttf", 132)
f_sub = font("consola.ttf", 24)
f_tag = font("consola.ttf", 20)
f_small = font("consola.ttf", 18)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img, "RGBA")


def person(cx, cy, h, color):
    """Draw a simple person glyph (head + shoulders) centered at (cx, cy)."""
    head_r = h * 0.30
    head_cy = cy - h * 0.5 + head_r
    d.ellipse([cx - head_r, head_cy - head_r, cx + head_r, head_cy + head_r], fill=color)
    bw = h * 0.78
    body_top = head_cy + head_r * 0.55
    body_bottom = cy + h * 0.5
    # top half of an ellipse = shoulders/torso
    d.chord([cx - bw / 2, body_top, cx + bw / 2, body_bottom * 2 - body_top],
            180, 360, fill=color)


# ---- 1. subtle grid background -------------------------------------------
step = 64 * S
for x in range(0, W + 1, step):
    d.line([(x, 0), (x, H)], fill=GRID, width=1 * S)
for y in range(0, H + 1, step):
    d.line([(0, y), (W, y)], fill=GRID, width=1 * S)

# faint scanlines for terminal feel
for y in range(0, H, 4 * S):
    d.line([(0, y), (W, y)], fill=(0, 0, 0, 40), width=1 * S)

# ---- 2. brand wordmark (top-left) ----------------------------------------
mx = 84 * S
d.text((mx, 70 * S), "RPO", font=f_brand, fill=BRIGHT)
# underline accent under the wordmark
bb = d.textbbox((mx, 70 * S), "RPO", font=f_brand)
d.line([(bb[0], bb[3] + 10 * S), (bb[2], bb[3] + 10 * S)], fill=MID, width=3 * S)
d.text((mx + 4 * S, bb[3] + 26 * S),
       "RECRUITMENT PROCESS OUTSOURCING", font=f_sub, fill=SUB)
d.text((mx + 4 * S, bb[3] + 58 * S),
       "// SCOUT AUTOMATION", font=f_sub, fill=SOFT)

# ---- 3. candidate pool (scattered, dim) ----------------------------------
pool_y = 470 * S
ph = 46 * S
cols = [x * S for x in (150, 270, 390, 510, 630, 750, 870)]
bright_idx = {1, 4}  # a couple "spotted" candidates glow a bit
for i, cx in enumerate(cols):
    jitter = int(18 * S * math.sin(i * 1.7))
    color = SOFT if i in bright_idx else DIM
    person(cx, pool_y + jitter, ph, color)
# second sparse row
for i, cx in enumerate([x * S for x in (210, 450, 690, 810)]):
    person(cx, pool_y - 70 * S, ph * 0.8, DIM)

# ---- 4. selection funnel -------------------------------------------------
fcx = 512 * S
top_y = 560 * S
top_half = 300 * S
bot_y = 740 * S
bot_half = 70 * S
neck_y = 800 * S
# funnel walls
d.line([(fcx - top_half, top_y), (fcx - bot_half, bot_y)], fill=MID, width=4 * S)
d.line([(fcx + top_half, top_y), (fcx + bot_half, bot_y)], fill=MID, width=4 * S)
# neck
d.line([(fcx - bot_half, bot_y), (fcx - bot_half, neck_y)], fill=MID, width=4 * S)
d.line([(fcx + bot_half, bot_y), (fcx + bot_half, neck_y)], fill=MID, width=4 * S)
# top rim
d.line([(fcx - top_half, top_y), (fcx + top_half, top_y)], fill=SOFT, width=4 * S)

# flow dots through the neck
for k, yy in enumerate(range(int(neck_y + 20 * S), int(neck_y + 110 * S), 30 * S)):
    r = 5 * S
    d.ellipse([fcx - r, yy - r, fcx + r, yy + r], fill=BRIGHT)

# ---- 5. scouted candidates (bright, selected) + auto-send ----------------
sel_y = 928 * S
sh = 70 * S
for cx in [x * S for x in (380, 512, 644)]:
    person(cx, sel_y, sh, BRIGHT)

# paper-plane (scout sent) icon to the right
px, py = 800 * S, 905 * S
sz = 60 * S
plane = [(px, py), (px + sz, py + sz * 0.42), (px + sz * 0.34, py + sz * 0.5),
         (px + sz * 0.18, py + sz * 0.9)]
d.polygon(plane, fill=BRIGHT)
d.line([(px, py), (px + sz * 0.34, py + sz * 0.5)], fill=BG, width=2 * S)

# small label under the selected row
d.text((300 * S, sel_y + 64 * S), "scouted  ->  auto-send", font=f_tag, fill=SUB)

# corner tag
d.text((W - 150 * S, H - 48 * S), ">_ rpa", font=f_small, fill=MID)

# ---- downscale & save ----------------------------------------------------
out_dir = os.path.join("public", "images", "work", "scout-automation-platform")
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, "card.png")
img = img.resize((1024, 1024), Image.LANCZOS)
img.save(out, "PNG")
print("WROTE", out, img.size)
