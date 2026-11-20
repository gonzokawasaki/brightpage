# Brightpage

### 👉 [Click here to start Brightpage](https://gonzokawasaki.github.io/brightpage/app/)

**Brightpage helps teachers structure classroom and online teaching into interactive documents that students work through and complete, task by task.**

Think of it as a simpler, lighter PowerPoint or Sway:

- 📄 **One small file per lesson or project.** Easy to email, upload and open. No huge PowerPoint files.
- ✏️ **Easy to edit.** Page thumbnails on the left like PowerPoint. Tap **+** to add a page, drag to reorder, tap text to type.
- ✅ **Tasks for students.** "Take a photo of your drawing", "Write a summary of your idea", "Find out about one of the UN Global Goals". Students complete them on the page.
- ❓ **Quizzes with instant feedback**, and scores can be sent to your Google Sheet.
- 📱 **Works on iPads**, laptops and phones. No login needed to open a file.
- 🎤 **Students can make their own simple presentations** and hand them in.
- 🤖 **AI friendly.** An AI can tidy up a lesson or add a quiz, and you accept or reject each change.

**Try the demos** (open in any browser, on a laptop or an iPad):

- 📊 [Spreadsheets: Formulas](https://gonzokawasaki.github.io/brightpage/examples/spreadsheet-formulas.html): live mini spreadsheet, flip cards, quiz, Excel checklist
- ⚔ [Character Builder](https://gonzokawasaki.github.io/brightpage/examples/character-builder.html): roll dice to build a character, then write how they react

Each demo opens in **teacher mode**. Click **▶ Preview** to see what students see, or **Send out to students** to make the student copy.

> **Status:** first working version (November 2026). Expect rough edges.

### One file, two modes

- **Teacher mode:** edit pages, set your name, email and Google Drive link, preview, and send out to students.
- **Student mode:** made with **Send out to students**. Students work through the pages, roll dice, answer, add their own pages and press **SEND TO TEACHER**. They can't change your content, and there are no AI tools.

### Make and change lessons with the AI you already use

No AI keys, no setup. Use ChatGPT, Gemini, Claude or Copilot in your browser:

1. **[Download the starter file](https://gonzokawasaki.github.io/brightpage/examples/brightpage-starter.html)** (or any Brightpage lesson, or just [brightpage.md](https://raw.githubusercontent.com/gonzokawasaki/brightpage/main/brightpage.md)).
2. **Upload it to your AI chat**, with your worksheet, slides or notes if you like, and say what you want: *"Make a 45-minute lesson for Year 8 on the water cycle with a quiz and a photo task."*
3. **Open the file the AI gives back.** If it looks wrong, open it with [Brightpage](https://gonzokawasaki.github.io/brightpage/app/) → *Open a lesson*, which repairs it.

Every teacher file carries its own instructions for the AI ([brightpage.md](brightpage.md)), so you never have to explain Brightpage to it. The AI asks you a few quick questions first, then builds.

### Brightpage is a simple standard

The code isn't the precious part: any AI can rewrite it. What matters is:

1. **[brightpage.md](brightpage.md):** one plain-English file that is the whole of Brightpage: what a good lesson is, the rules (privacy, safety, what may not change) and the **product outcomes** every Brightpage file must keep (one file, teacher and student modes, SEND TO TEACHER, student safety, works on iPad).
2. **The lesson data:** plain JSON inside the file, so any AI or tool can read and write it.

The app in this repo is one way of meeting that standard. Any AI can build another from brightpage.md alone, and the **[Brightpage Checker](https://gonzokawasaki.github.io/brightpage/app/check.html)** tests any file against the standard: drop it in and see what passes. The brief sits at the top of every teacher file, so it travels with the lesson.

SEND TO TEACHER saves the work in your Google Drive. [Set it up in 5 minutes](apps-script/SETUP.md). Worried about students tricking an AI? See [security and prompt injection](docs/security.md).

---

## Why I made this

I am a teacher in a secondary school, and I wanted a simple, lightweight, free tool that lets me give students direction and tasks to complete, and then collect that work and give feedback, all in one interactive tool.

Office documents are often slow and don't allow for interaction. Students can get lost in the whole "send your documents to me @..." routine.

What if there was an interactive tool that sent work to me straight from the presentation the students are working in, instead of me showing it to them and them forgetting everything?

At the end of the lesson, students hit **SEND TO TEACHER**. Brightpage links to your Google Drive and stores the work they send there.

## What it is for, and what it isn't

| ✅ It is for | ❌ It is not for |
| --- | --- |
| Lessons, content and class instruction | Printing or print layouts |
| Directed tasks students complete | Graphic design or posters |
| Simple student presentations | Secure tests or exams |
| Collaboration and feedback | Storing videos (use YouTube links) |

---

## How you will use it (no technical knowledge needed)

1. **Open the Brightpage link** in Safari or Chrome. On an iPad, tap **Share → Add to Home Screen** so it works like an app, even offline.
2. **Make a lesson:** add pages, type, add photos, add quizzes and tasks.
3. **Save it** to your iPad, Google Drive or computer. It's a single `.html` file.
4. **Share it** with students by email, Google Classroom, Teams or Drive.
5. **Students open it, do the tasks, and tap Submit or Share** to send it back.

Every Brightpage file is **one complete file**: all pictures are inside it, so nothing goes missing when you move or email it. Only online extras (like YouTube videos) need the internet.

---

## Works best with Google (free)

Brightpage works with anything, but the first and best-supported tools are **Google Drive, Sheets and Classroom**, because they're free and most schools and students already have them.

- Save and open files from **Google Drive**
- Send quiz scores and finished work to a **Google Sheet / Drive folder**
- Share to **Google Classroom**

Set-up guides will be in the [`apps-script`](apps-script/) folder.

---

## Help, problems and ideas

- **Something not working?** or **Have an idea?** → go to the [**Issues**](../../issues) tab and click **New issue**. Simple forms ask a few questions. (You need a free GitHub account.)
- **Want to chat or ask a question?** → use the [**Discussions**](../../discussions) tab.

You don't need to understand code to help. Telling us what worked in your classroom and what didn't is just as useful.

---

## ⚠️ Use at your own risk

Brightpage is free, open-source software provided **as is, with no warranty**. You are responsible for how you use it, including what personal or student information you put into files, where you store them, who you share them with, and which online services (Google, AI tools or others) you connect it to. Brightpage has no servers of its own and does not collect any data. **Check your school's privacy and safeguarding rules before using it with students.**

---

## For developers and the curious

- [Full specification](docs/spec.md): how the file format and app work
- [brightpage.md](brightpage.md): the standard. Give it to any AI to make a lesson or build the whole app

```
app/          the editor (published with GitHub Pages)
player/       the small script copied into every file
examples/     sample lessons and student projects
apps-script/  Google Drive / Sheets submit script + set-up guide
docs/         specification
```

Licence: [MIT](LICENSE). Free for any teacher or school to use, share and change.
