# Brightpage — format and app spec (draft)

Draft, November 2026.

## Purpose

**Brightpage helps teachers structure classroom and online teaching into interactive documents that students work through and complete, task by task.** It is for instruction and collaboration: content, lessons, directed tasks, quizzes and feedback. It is fast, light and easy to change. It is not a print layout tool, a graphic design tool or a secure exam system.

The format is one small HTML file that looks and presents like a PowerPoint, edits like Sway, runs on iPads, and sends scores and finished work back to the teacher.

| Tool | Problem in class |
| --- | --- |
| PowerPoint | Very large files, hard to move and open, no real interaction, can't embed other content well |
| Sway | Locked to Office 365 logins, no real export, work lives on Microsoft's servers |
| Prezi | Became slow and heavy: one huge zooming canvas, online-only, big media |

Who uses it: teachers make lessons and task templates; students complete tasks or build their own projects, mostly on iPads.

## Goals and non-goals

**Goals**

- One file per lesson or project, small enough to email (target under 3 MB for 20 pages, hard warning at 10 MB).
- Opens in any modern browser, no login, works offline.
- Editing anyone can do: PPT-style thumbnails, drag and drop, insert page, simple text tools.
- Works well on iPad with touch, camera and Apple Pencil.
- Interactive: quizzes and directed tasks with instant feedback.
- Results and finished work reach the teacher (PDF, share sheet, Google Drive/Sheet).
- Optional AI help that suggests changes, never makes them silently.
- Open source, free for any teacher.

**Non-goals (on purpose)**

- Not for print: no print layouts, page sizes or booklets. PDF is only for sharing or handing in.
- No free placement of boxes anywhere on a page. Fixed layouts keep it tidy and fast.
- No infinite zooming canvas, no fancy transitions (only fade or slide).
- No video stored inside the file; video is always a link.
- Not a secure exam tool: answers sit inside the file.
- No accounts or server of its own.

## Two modes, one file

The editor and the presentation are the **same file** in two modes, set by `"mode"` in the data.

- **Teacher mode** (`"mode": "teacher"`): page editor, block editor, Settings (teacher name, email, Google Drive link), Edit with AI, Preview, Save, and **Send out to students**.
- **Student mode** (`"mode": "student"`): made by *Send out to students*. Teacher pages are read-only; students interact, add their own pages and press SEND TO TEACHER. No AI or editing tools. Answers live in `student.answers` (by block id), never inside the teacher's blocks, and the file carries a `lessonId` fingerprint of the teacher content.

See [security.md](security.md) for prompt-injection protection.

## The file carries its own AI brief

Every teacher file starts with `<script type="text/plain" id="bp-ai" data-for="teacher">` holding [brightpage.md](../brightpage.md), then the lesson JSON (`bp-data`), then the app code. A teacher uploads the file to any web AI chat and says what they want; the AI follows the brief. brightpage.md defines the **product outcomes** that must hold whatever the code looks like, so the code can be regenerated freely. Student copies carry a short note instead, asking an AI to help the student learn rather than do the tasks for them.

Opening any file in Brightpage (whole file, broken file, a reply with a JSON code block, or bare JSON) finds the lesson and rebuilds a fresh, working file around it.

## File format

A Brightpage file is a normal `.html` file named like `water-cycle.brightpage.html`. It holds three parts:

1. **The player:** a small script and style (target under 300 KB) that draws the pages, runs quizzes and presents.
2. **The content:** all pages as plain data in `<script type="application/json" id="brightpage-data">`. Editing changes only this data, never the code, so layouts can't break.
3. **Media:** small images stored inside the data, already shrunk and compressed (WebP or JPEG, longest side 1600 px, about 150–300 KB each).

The file opens on its own in any PC or Mac browser. On iPad it opens through the hosted app (see below).

```json
{
  "format": "brightpage",
  "version": 1,
  "title": "The Water Cycle",
  "theme": "bright",
  "settings": { "submitUrl": "", "ai": false, "requireName": true },
  "pages": [
    { "id": "p1", "layout": "title", "blocks": [
      { "type": "heading", "text": "The Water Cycle" } ] },
    { "id": "p2", "layout": "task", "blocks": [
      { "type": "task", "kind": "photo", "required": true,
        "prompt": "Take a photo of your drawing", "locked": true } ] }
  ],
  "history": [ { "by": "ai", "page": "p2", "action": "added quiz" } ]
}
```

**Rules**

- `version` goes up when the format changes; newer players always open older files.
- Unknown block types are shown as a grey box, never deleted.
- A size meter shows the file size; orange over 5 MB, red over 10 MB.
- Saving writes a fresh copy of the same file with new data; the player code is refreshed to the latest version at the same time.

## The one-file rule

Every Brightpage file is one complete `.html` document. Nothing it needs to display can break.

- **Always inside the file:** all images (copied in and shrunk, even if they came from Drive, a website or AI), the player code and styles, fonts (small built-in set or device fonts, no Google Fonts), icons.
- **Allowed as links:** web pages and sources, YouTube/Vimeo videos, embedded online tools (simulations, Google Forms), and the account connections (Google sign-in, Drive save, Submit).
- **Not allowed:** images or files linked from Drive, OneDrive or any website; anything needed just to display the page.
- Pasting or dragging an image from the web or Drive downloads, shrinks and embeds it; if a site blocks that, the user is asked to save the image and add it.
- On save, a check confirms nothing needed for display points outside the file.
- Offline, videos and embeds show a neat card ("Video: needs internet") instead of a broken box.

## Editor

PowerPoint-like: page thumbnails on the left, the page in the middle, a small toolbar on top.

**Thumbnails**

- Live mini previews that update while typing.
- Drag to reorder (press and hold on iPad).
- A + between every two thumbnails inserts a page there; a + New page button sits at the bottom.
- Each thumbnail has a ⋯ menu: New page after, Duplicate, Delete, Change layout (right-click does the same on a PC).
- Ticks on thumbnails show finished task pages.
- Keys on a PC: Ctrl+M new page, Delete removes, Ctrl+Z undo.

**Inserting a page:** a picker shows the layouts: Title, Text + image, Two columns, Picture gallery, Video, Quiz, Task, Sketch.

**Editing on the page**

- Tap text to type. Toolbar: bold, italic, link, bullet list, highlight. No fonts or sizes.
- Drag an image in, paste it, or tap to pick or take a photo. Images are shrunk automatically.
- Undo and redo for every change.
- Themes: 3 to start, picked with one tap.

**Simple layout tools for student presentations**

- Layouts: Title, Title + text, Text + image (picture left or right), Big picture + caption, Two columns, Quote / key fact, End page.
- Text auto-fits its box so nothing spills off the page.
- Tap a picture to crop it, choose which part stays in view, or swap it.
- Switching layout keeps the text and pictures.
- Speaker notes under each page.
- Present full screen, then Share or Submit to the teacher.

## Page and block types

**Content blocks**

| Block | What it holds | Version |
| --- | --- | --- |
| Heading | Title text | 1 |
| Text | Paragraphs, lists, bold, links | 1 |
| Image | One photo with optional caption | 1 |
| Gallery | 2–6 photos, swipe through | 2 |
| Video | YouTube or Drive link, plays on the page | 2 |
| Embed | A web page or tool (e.g. a simulation) in a frame | 2 |
| Quote / callout | Highlighted box | 2 |

**Interactive blocks** (instant feedback, teacher writes the explanation)

| Block | How it works | Version |
| --- | --- | --- |
| Multiple choice | One correct answer | 1 |
| Gap fill | Type the missing words | 1 |
| Matching | Drag pairs together | 2 |
| Order | Drag items into the right order | 2 |
| Poll | Class vote, no right answer | 3 |

**Task blocks** (directed tasks): a locked prompt from the teacher, an answer area for the student, and a required flag.

| Task kind | Student does | Version |
| --- | --- | --- |
| Photo | Takes or picks a photo (e.g. of their drawing) | 1 |
| Written | Writes an answer, with a word guide (e.g. 50–100 words) | 1 |
| Research | Writes what they found + a source link | 1 |
| Choose | Picks from a list (e.g. one UN SDG) then answers | 1 |
| Sketch | Draws with finger or Apple Pencil | 2 |
| Voice note | Records up to 60 seconds | 3 |

- A progress bar shows tasks done (e.g. 2 of 4).
- Submit unlocks only when all required tasks are done.
- Teachers can allow free pages so students add their own pages.

## Views

| View | Feels like | Used for | Version |
| --- | --- | --- | --- |
| Present | PowerPoint slideshow | Teaching: full screen, arrow keys or swipe | 1 |
| Scroll | Sway story | Reading and student projects on phone or iPad | 2 |
| Overview | Prezi zoom-out | All pages as a grid; tap one to jump there | 2 |

## iPad and touch

The iPad can't open and run a local HTML file directly (the Files app only previews it), so on iPad the editor runs from GitHub Pages and students add it to their home screen. It then works offline, opens files from Files/OneDrive/Drive, and saves back to Files or shares to Teams, Classroom or Mail.

- Buttons and handles at least 44 px; no hover or right-click needed.
- Portrait: thumbnails move to a strip along the bottom.
- Camera button; HEIC photos converted and shrunk.
- Apple Pencil Scribble works in text boxes.

## Images (keeping files light)

Every image is shrunk on the device the moment it is added, before it is saved or uploaded. The full-size original is never stored.

- Longest side at most 1600 px (1024 px "Small" option); JPEG about 80% quality, WebP where the browser can encode it (iPad Safari falls back to JPEG).
- Screenshots and drawings with transparency stay WebP/PNG so lines stay sharp.
- Rotation fixed; GPS location and camera data stripped.
- Several images are processed one at a time with a progress message, so the iPad does not run out of memory.
- Videos and non-image files are refused with a friendly message (use a video link instead).
- The same image added twice is stored once.
- Limits (teacher can change): about 250 KB per image, 6 images per page, warning at 5 MB, no new images over 10 MB, with a "Make file smaller" button that re-shrinks everything to 1024 px.
- Typical result: a 4 MB iPad photo becomes about 150–250 KB.
- Submit shows the size and a progress bar, is capped at 10 MB, and retries later if the Wi-Fi drops.

## Output and submission

A web page can't send email by itself, so finished work leaves through the share sheet or through the teacher's own Google Apps Script.

- **PDF export:** one simple layout (one page per screen) for sharing or handing in work. Not a print tool.
- **Share button:** builds the PDF and opens the share sheet. Nothing to set up.
- **Submit button:** posts to `settings.submitUrl`; the Apps Script saves the PDF + file to Drive → Class → Student, adds a sheet row (name, class, time, tasks done, score), and can email a copy. Offline results wait and send later.

## Connectors: platform-agnostic, Google first

The file and editor work anywhere. Saving and sending go through small connectors; Google is the first and best supported because it is free and most schools and students already have accounts.

| Step | Google (first) | Later options |
| --- | --- | --- |
| Open / save | Drive via the iPad Files app (no setup); then Open from Drive / Save to Drive with Google sign-in, asking only for files Brightpage opens or creates (`drive.file`) | OneDrive, Dropbox, plain files |
| Scores and results | Google Sheet via Apps Script (reference connector) | Microsoft Forms / Power Automate, Moodle, own server |
| Handing in | Drive folder per class + Share to Classroom | Teams, email |
| Hosting the app | GitHub Pages | School website |

The Submit connector is a simple, documented POST so any platform can receive it.

## AI polish and collaboration

AI only ever suggests; a person accepts or rejects every change, and every AI change is logged in `history`. All AI must follow [brightpage.md](../brightpage.md), which is stored inside every teacher file.

- One-tap: Polish, Add interaction, Add images, Shorten.
- Collaboration mode: chat panel; changes highlighted on thumbnails with Accept / Reject.
- Connect via Copy/Paste for AI (free, any chatbot) or built-in through the teacher's Apps Script holding the API key.
- AI can be switched off per file (`settings.ai: false`).

## Privacy, security and limits

**Use at your own risk.** Brightpage is free, open-source software provided as is, with no warranty. Users are responsible for how they use it, including what personal or student information they put into files, where they store them, who they share them with, and which online services they connect it to. Brightpage has no servers of its own and collects no data. Users should check their school's privacy and safeguarding rules. The app shows this in an About box and as a reminder before the first Submit or AI use.

- Answers are inside the file: fine for class quizzes, not for tests.
- Check school policy before storing student work in a personal Google Drive.
- No student data or Submit addresses in this repo.
- Embeds run sandboxed; the file loads no outside scripts.
- Pasted text is cleaned so no scripts get into a file.
- API keys never sit in a file.

## Release plan

1. **v1 — Core:** thumbnails, drag and drop, insert page, text tools, photos and camera, multiple choice, gap fill, photo/written/research/choose tasks, progress bar, Present, Open/Save.
2. **v2 — Output:** PDF, Share, Submit, Scroll and Overview views, gallery, video, embed, matching, order, sketch, iPad home-screen app (offline).
3. **v3 — Extras:** Copy/Paste for AI, presenter view, poll, voice note, teacher feedback block.
4. **v4 — AI built-in:** chat panel with Accept/Reject, image suggestions, maybe .pptx import.
