# Brightpage

**Lessons and student projects as one small HTML file.** Looks and presents like PowerPoint, edits like Sway, runs on iPads, and sends scores and finished work back to the teacher.

## What it is for

**Brightpage helps teachers structure classroom and online teaching into interactive documents that students work through and complete, task by task.**

- It is for **instruction and collaboration**: content, lessons, directed tasks, quizzes and feedback.
- It is **fast, light and easy to change**: anyone can add a page, fix a typo or drop in a photo in seconds.
- It is **not** a print layout tool, a graphic design tool or a secure exam system. PDF export exists only to share or hand in work.

> Status: early design. Version 1 is being built. See the [spec](docs/spec.md).

## Why

| Tool | Problem in class |
| --- | --- |
| PowerPoint | Very large files, hard to move and open, no real interaction |
| Sway | Locked to Office 365 logins, no real export |
| Prezi | Slow and heavy: one huge zooming canvas, online-only |

A Brightpage file is a normal `.html` file (e.g. `water-cycle.brightpage.html`). It opens in any browser, needs no login, works offline, and is small enough to email.

## Features (planned)

- PowerPoint-style page thumbnails: drag to reorder, **+** to insert a page
- Simple editing: bold, italic, link, list, highlight; drag in or take photos
- Quizzes with instant feedback (multiple choice, gap fill, matching…)
- **Directed tasks** for students: take a photo, write a summary, research a topic
- iPad friendly: add to home screen, works offline, camera and Apple Pencil
- Present, Scroll (Sway-style) and Overview views
- PDF export, Share button, Submit to Google Drive/Sheet
- Optional AI polish that only ever *suggests* changes

## Repo layout

```
app/          the editor (published with GitHub Pages)
player/       the small script copied into every file
examples/     sample lesson + sample STEM task project
apps-script/  Google Drive/Sheet/email submit script + setup steps
docs/         spec and file format
```

## Licence

MIT: free for any teacher or school to use and change.
