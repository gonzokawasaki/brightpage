# Connect SEND TO TEACHER to your Google Drive

About 5 minutes, free, once. After this, every time a student presses **SEND TO TEACHER**:

- their answers and photos are saved in your Google Drive, in **Brightpage submissions → lesson → student**
- a row is added to a **Brightpage results** Google Sheet (name, class, score, tasks done, warnings, link to the work)

Everything stays in your own Google account. Brightpage has no server of its own.

## Steps

1. Go to **[script.google.com](https://script.google.com)** and sign in with the Google account that should receive the work.
2. Click **New project**. Name it `Brightpage receiver`.
3. Delete what is in the editor. Copy everything from **[Code.gs](Code.gs)** and paste it in. Click **Save** 💾.
4. Click **Deploy → New deployment**. Click the ⚙ next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone** (students don't need to sign in; they can only *send*, never read)
5. Click **Deploy**, then **Authorize access** and allow it. (Google warns that the app isn't verified, because you made it yourself. Click *Advanced → Go to Brightpage receiver*.)
6. Copy the **Web app URL**. It looks like `https://script.google.com/macros/s/…/exec`.
7. In Brightpage, open your lesson, click **⚙ Settings**, and paste it into **Google Drive link**. Click **Send out to students** to make a new student copy.

**Test it:** open the student copy, type a name, press SEND TO TEACHER, then look in your Drive for the *Brightpage submissions* folder.

## Good to know

- The same link works for all your lessons.
- If you change Code.gs later, use **Deploy → Manage deployments → Edit → New version** so the link stays the same.
- Check your school's rules before storing student work in a personal Google account.
- `for-ai-marking.txt` in each folder has the answers wrapped so an AI treats them as student work, not instructions. See [docs/security.md](../docs/security.md).
