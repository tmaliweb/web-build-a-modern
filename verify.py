"""Acceptance check for a Forge static website (the coder runs `python verify.py`).
Exits 0 only when the site is real and self-contained:
  - index.html exists, is substantial, and has a <body>;
  - every LOCAL asset the HTML references (href/src to a relative path) exists on disk
    (catches links to CSS/JS/images the coder mentioned but never created);
  - no obvious leftover scaffold placeholder text.
Remote URLs (http/https///) and anchors (#...) are ignored."""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
problems = []

idx = os.path.join(HERE, "index.html")
if not os.path.isfile(idx):
    print("FAIL: no index.html at the site root")
    sys.exit(1)
html = open(idx, encoding="utf-8", errors="replace").read()
low = html.lower()

if len(html.strip()) < 500:
    problems.append("index.html is too small (%d chars) — build the real page" % len(html.strip()))
if "<body" not in low:
    problems.append("index.html has no <body>")
if "Build the site here." in html or "Build the site's behavior here." in html:
    problems.append("scaffold placeholder text is still present — replace it with the real content")

# Local assets referenced by href/src must exist.
for m in re.finditer(r'(?:href|src)\s*=\s*["\']([^"\']+)["\']', html, re.I):
    ref = m.group(1).strip()
    if not ref or ref.startswith(("http://", "https://", "//", "#", "data:", "mailto:", "tel:")):
        continue
    ref = ref.split("?")[0].split("#")[0]
    if not os.path.isfile(os.path.join(HERE, *ref.split("/"))):
        problems.append("referenced asset is missing on disk: %s" % ref)

if problems:
    print("FAIL:\n - " + "\n - ".join(problems))
    sys.exit(1)
print("OK: site is substantial and self-contained")
sys.exit(0)
