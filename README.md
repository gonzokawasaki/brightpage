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

> **Status:** being designed and built (November 2026). A demo will be linked here when it's ready.

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
- [AI guidelines](AI.md): rules any AI must follow when editing a Brightpage file

```
app/          the editor (published with GitHub Pages)
player/       the small script copied into every file
examples/     sample lessons and student projects
apps-script/  Google Drive / Sheets submit script + set-up guide
docs/         specification
```

Licence: [MIT](LICENSE). Free for any teacher or school to use, share and change.
