"""Shrink oversized photos in place.

Backstop for the Media Cell admin (/admin): Sveltia CMS already converts and
resizes photos in the browser before upload, but a photo that still ends up
over the limit (or one added to the repo some other way) is recompressed here.
File names and formats are kept, so nothing that references a photo breaks.

Usage: python compress_images.py DIR [DIR ...]
"""
import io
import os
import sys

from PIL import Image, ImageOps

LIMIT_BYTES = 200 * 1000   # photos larger than this are recompressed
MAX_SIDE = 1600            # longest side after resizing, in pixels
MIN_SIDE = 480             # never shrink below this; give up instead
QUALITIES = (80, 70, 60, 50)
FORMATS = {".jpg": "JPEG", ".jpeg": "JPEG", ".webp": "WEBP", ".png": "PNG"}


def encode(img, fmt, quality):
    buf = io.BytesIO()
    if fmt == "JPEG":
        img.convert("RGB").save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    elif fmt == "WEBP":
        img.save(buf, "WEBP", quality=quality, method=6)
    else:  # PNG has no quality setting; only resizing makes it smaller
        img.save(buf, "PNG", optimize=True)
    return buf.getvalue()


def compress(path):
    """Return the new size in bytes, or None if the file was left alone."""
    fmt = FORMATS[os.path.splitext(path)[1].lower()]
    original = os.path.getsize(path)
    with Image.open(path) as opened:
        if getattr(opened, "is_animated", False):
            print(f"skip (animated): {path}")
            return None
        img = ImageOps.exif_transpose(opened)
        img.load()

    best = None
    side = min(MAX_SIDE, max(img.size))
    while True:
        scale = side / max(img.size)
        resized = img if scale >= 1 else img.resize(
            (max(1, round(img.width * scale)), max(1, round(img.height * scale))), Image.LANCZOS)
        for quality in (QUALITIES if fmt != "PNG" else (None,)):
            data = encode(resized, fmt, quality)
            if best is None or len(data) < len(best):
                best = data
            if len(data) <= LIMIT_BYTES:
                break
        if len(best) <= LIMIT_BYTES or side <= MIN_SIDE:
            break
        side = max(MIN_SIDE, int(side * 0.85))

    if len(best) >= original:
        print(f"skip (could not make smaller): {path}")
        return None
    with open(path, "wb") as out:
        out.write(best)
    return len(best)


def main(dirs):
    changed = 0
    for top in dirs:
        for root, _, files in os.walk(top):
            for name in sorted(files):
                path = os.path.join(root, name)
                if os.path.splitext(name)[1].lower() not in FORMATS:
                    continue
                before = os.path.getsize(path)
                if before <= LIMIT_BYTES:
                    continue
                after = compress(path)
                if after is not None:
                    changed += 1
                    note = "" if after <= LIMIT_BYTES else "  (still over the limit)"
                    print(f"compressed: {path}  {before // 1000} KB -> {after // 1000} KB{note}")
    print(f"{changed} photo(s) compressed")


if __name__ == "__main__":
    main(sys.argv[1:] or ["assets/events"])
