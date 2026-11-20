#!/usr/bin/env python3
"""Build Brightpage files: the app (app/index.html) and each example lesson.

Every output is one self-contained HTML file: player styles + player script + lesson data.
Run from anywhere:  python3 tools/build.py
"""
import html, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CSS = (ROOT / "player/brightpage.css").read_text()
JS = (ROOT / "player/brightpage.js").read_text()
BRIEF = (ROOT / "AI.md").read_text().strip()  # the brief for AI: the heart of the standard
for name, text in (("player script", JS), ("AI.md", BRIEF)):
    assert "</script" not in text.lower() and "<!--" not in text, f"{name} must not contain </script or <!--"


def build(data):
    title = data["title"] if data else "Brightpage"
    payload = json.dumps(data, indent=1, ensure_ascii=False).replace("<", "\\u003c") if data else "null"
    # Same layout as buildFile() in the player: brief, lesson, then app code.
    return (
        '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f"<title>{html.escape(title)}</title>\n"
        f'<script type="text/plain" id="bp-ai" data-for="teacher">\n{BRIEF}\n</script>\n'
        f'<script type="application/json" id="bp-data">\n{payload}\n</script>\n</head>\n<body>\n<div id="app"></div>\n'
        f'<style id="bp-style">{CSS}</style>\n<script id="bp-player">{JS}</script>\n</body>\n</html>\n'
    )


(ROOT / "app/index.html").write_text(build(None))
print("app/index.html")
for src in sorted((ROOT / "examples/src").glob("*.json")):
    out = ROOT / "examples" / (src.stem + ".html")
    out.write_text(build(json.loads(src.read_text())))
    print(out.relative_to(ROOT), f"{out.stat().st_size // 1024} KB")
