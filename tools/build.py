#!/usr/bin/env python3
"""Build Brightpage files: the app (app/index.html) and each example lesson.

Every output is one self-contained HTML file: player styles + player script + lesson data.
Run from anywhere:  python3 tools/build.py
"""
import html, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = (ROOT / "player/brightpage.css").read_text()
JS = (ROOT / "player/brightpage.js").read_text()
assert "</script" not in JS.lower(), "player script must not contain a closing script tag"


def build(data):
    title = data["title"] if data else "Brightpage"
    payload = json.dumps(data, indent=1, ensure_ascii=False).replace("<", "\\u003c") if data else "null"
    return (
        '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f"<title>{html.escape(title)}</title>\n"
        f'<style id="bp-style">{CSS}</style>\n</head>\n<body>\n<div id="app"></div>\n'
        f'<script type="application/json" id="bp-data">{payload}</script>\n'
        f'<script id="bp-player">{JS}</script>\n</body>\n</html>\n'
    )


(ROOT / "app/index.html").write_text(build(None))
print("app/index.html")
for src in sorted((ROOT / "examples/src").glob("*.json")):
    out = ROOT / "examples" / (src.stem + ".html")
    out.write_text(build(json.loads(src.read_text())))
    print(out.relative_to(ROOT), f"{out.stat().st_size // 1024} KB")
