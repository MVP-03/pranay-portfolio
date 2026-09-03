#!/usr/bin/env python
"""
Turn a source logo/mark into a pixel-art project card image.

    python scripts/pixelate-project-image.py <src> <slug> [options]
    -> public/projects/<slug>.png

Why it works this way:

* Output is 16:9 to match ProjectCard's `aspect-video` image well, so the
  card never letterboxes or crops the subject.
* The background is left TRANSPARENT rather than filled. The card's own
  `bg-accent-soft` shows through, so the image repaints with the
  light/dark theme instead of baking in a fixed-colour block that would
  glare in one of them.
* Pixel art comes from a smooth LANCZOS downscale to a small logical grid
  (which averages colour properly) followed by a NEAREST upscale (which
  keeps the blocks hard-edged). Downscaling with NEAREST instead drops
  pixels and shreds thin strokes.
* Feed this the icon/mark, NOT a lockup with a wordmark - text below
  ~14 logical px turns to mush and reads as a low-res JPEG rather than
  deliberate pixel art. The card renders the project title as real text
  right underneath anyway. Big display lettering is the exception.

Dark mode is where these images go wrong, in two ways:

* Flat art on an opaque near-white background shows up as a white slab.
  --circle-mask handles round marks: it keeps everything inside the
  circle, whites included, and clears only the outside. Keying white
  globally instead would punch holes through white artwork.
* Hollow outline art (a document drawn as a stroke) loses its silhouette
  when a dark stroke sits on a dark ground. --paper fills the enclosed
  area so the shape survives.
"""

import argparse
import math
import pathlib

import numpy as np
from PIL import Image
from scipy import ndimage

ACCENT = (0, 122, 204)   # --color-accent, legible on cream and on dark
RING_ALPHA = 130


def alpha_from_circle(im, tol, inset):
    """Crop a round mark off its flat background and give it a circular alpha.

    Finds the mark by distance from the corner colour, then masks by geometry
    rather than by colour - so white *inside* the circle survives.

    `tol` matters more than it looks: generated art often carries faint
    off-white texture across the whole canvas, so too low a tolerance makes
    the bounding box the entire image and the mask circle ends up far larger
    than the artwork, leaving a bright ring of background behind.
    """
    rgb = np.asarray(im.convert("RGB"), dtype=np.int16)
    bg = rgb[0, 0]
    art = np.abs(rgb - bg).sum(axis=2) > tol
    if not art.any():
        return im
    ys, xs = np.where(art)
    im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))

    cw, ch = im.size
    side = min(cw, ch)
    # Bite well inside the rim: the artwork-to-background transition is
    # anti-aliased over several pixels, and a mask landing in that band
    # leaves a pale halo that is glaring in dark mode. Eating a little of
    # the rim is invisible at pixel-art scale.
    radius = side / 2 - max(1.0, side * inset)

    # supersampled circle so the later LANCZOS downscale averages a clean edge
    ss = 4
    yy, xx = np.mgrid[0:ch * ss, 0:cw * ss]
    dist = np.hypot((xx + 0.5) / ss - cw / 2, (yy + 0.5) / ss - ch / 2)
    mask = Image.fromarray(np.where(dist <= radius, 255, 0).astype(np.uint8))

    out = im.convert("RGBA")
    out.putalpha(mask.resize((cw, ch), Image.LANCZOS))
    return out


def fill_enclosed(im, color, min_frac, seal):
    """Fill transparent regions *enclosed* by artwork with a solid colour.

    Only regions that touch no image edge and cover at least `min_frac` of the
    canvas are filled - so the "paper" inside a document outline gets filled
    while the small triangles inside a network-graph motif are left alone.

    `seal` closes gaps in the outline before deciding what counts as enclosed.
    Logos are rarely watertight - a motif crossing the outline leaves the
    interior leaking into the background, which makes every region touch the
    edge and nothing fill. Closing over a radius slightly wider than the gap
    seals it. The seal only informs the decision; the fill still uses the
    original alpha, so strokes keep their exact shape.
    """
    a = np.asarray(im.split()[3])
    hollow = a <= 32
    if seal:
        r = int(seal)
        disk = np.hypot(*np.mgrid[-r:r + 1, -r:r + 1]) <= r
        hollow = ~ndimage.binary_closing(~hollow, structure=disk)
    labels, n = ndimage.label(hollow)
    if not n:
        return im

    edge = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
    min_area = min_frac * a.size
    keep = [
        i for i in range(1, n + 1)
        if i not in edge and (labels == i).sum() >= min_area
    ]
    if not keep:
        return im

    # intersect back with the true alpha, so a seal that swallowed a thin
    # stroke cannot paint paper over artwork
    holes = np.isin(labels, keep) & (np.asarray(im.split()[3]) <= 32)
    holes = Image.fromarray(holes.astype(np.uint8) * 255)
    paper = Image.new("RGBA", im.size, (*color, 255))
    paper.alpha_composite(im)              # artwork back on top of the paper
    out = im.copy()
    out.paste(paper, (0, 0), holes)
    return out


def draw_rings(canvas, base):
    """Dotted concentric rings radiating from the centre, hugging the subject."""
    lw, lh = canvas.size
    px = canvas.load()
    cx, cy = lw / 2, lh / 2
    bands = [(base * m, step) for m, step in ((1.15, 3), (1.4, 4), (1.65, 5))]
    for y in range(lh):
        for x in range(lw):
            r = math.hypot((x + 0.5 - cx) * 0.62, y + 0.5 - cy)
            for ring, step in bands:
                if abs(r - ring) < 0.75 and (x + y) % step == 0:
                    px[x, y] = (*ACCENT, RING_ALPHA)


def parse_color(v):
    v = v.lstrip("#")
    return tuple(int(v[i:i + 2], 16) for i in (0, 2, 4))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("slug")
    ap.add_argument("--grid", default="144x81", help="logical pixel grid, 16:9")
    ap.add_argument("--scale", type=int, default=6, help="NEAREST upscale factor")
    ap.add_argument("--fill", type=float, default=0.9, help="fraction of the grid the subject fills")
    ap.add_argument("--no-rings", action="store_true")
    ap.add_argument("--circle-mask", action="store_true",
                    help="round mark on a flat background: crop it out and mask to the circle")
    ap.add_argument("--bg-tolerance", type=int, default=80,
                    help="how far a pixel must differ from the corner colour to count as artwork")
    ap.add_argument("--circle-inset", type=float, default=0.02,
                    help="with --circle-mask, shrink the mask by this fraction of the diameter")
    ap.add_argument("--paper", metavar="HEX",
                    help="fill areas enclosed by artwork with this colour (e.g. faf7f2), "
                         "so hollow outline logos keep their silhouette in dark mode")
    ap.add_argument("--paper-min-area", type=float, default=0.04,
                    help="with --paper, smallest enclosed region to fill, as a fraction of canvas")
    ap.add_argument("--paper-seal", type=int, default=0,
                    help="with --paper, close outline gaps up to roughly this radius in source "
                         "px before deciding what is enclosed (try 12-16 on a ~800px logo)")
    args = ap.parse_args()

    lw, lh = (int(v) for v in args.grid.lower().split("x"))

    im = Image.open(args.src)
    if args.circle_mask:
        im = alpha_from_circle(im, args.bg_tolerance, args.circle_inset)
    im = im.convert("RGBA")
    if args.paper:
        im = fill_enclosed(im, parse_color(args.paper), args.paper_min_area, args.paper_seal)

    bbox = im.split()[3].getbbox()
    if bbox:
        im = im.crop(bbox)          # trim transparent margin so --fill means what it says

    s = min(lw * args.fill / im.width, lh * args.fill / im.height)
    w, h = max(1, round(im.width * s)), max(1, round(im.height * s))
    subject = im.resize((w, h), Image.LANCZOS)

    canvas = Image.new("RGBA", (lw, lh), (0, 0, 0, 0))
    if not args.no_rings:
        draw_rings(canvas, base=h / 2)
    canvas.alpha_composite(subject, ((lw - w) // 2, (lh - h) // 2))

    out = pathlib.Path("public/projects") / f"{args.slug}.png"
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.resize((lw * args.scale, lh * args.scale), Image.NEAREST).save(out, optimize=True)
    print(f"{out}  {lw * args.scale}x{lh * args.scale}  (subject {w}x{h} logical px)")


if __name__ == "__main__":
    main()
