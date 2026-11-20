/**
 * Brightpage receiver: saves work sent with SEND TO TEACHER into your Google Drive.
 *
 * Each submission makes:
 *   Drive / Brightpage submissions / <lesson> / <student> - <date time> /
 *       work.html               (easy-to-read copy of the answers)
 *       for-ai-marking.txt      (answers wrapped safely for an AI marker)
 *       photos                  (any photos the student added)
 *   and one row in the "Brightpage results" Google Sheet.
 *
 * Setup: see SETUP.md. Free. Runs in your own Google account. MIT licence.
 */
const ROOT_FOLDER = 'Brightpage submissions';
const SHEET_NAME = 'Brightpage results';
const MAX_BYTES = 12 * 1024 * 1024;
const MAX_PHOTOS = 20;

function doGet() {
  return ContentService.createTextOutput('Brightpage receiver is running. Paste this page\'s address into Brightpage → Settings.');
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const body = (e && e.postData && e.postData.contents) || '';
    if (body.length > MAX_BYTES) return reply({ ok: false, error: 'too big' });
    const p = JSON.parse(body);
    if (p.format !== 'brightpage-submission') return reply({ ok: false, error: 'not a Brightpage submission' });

    lock.waitLock(20000);
    const name = cleanName(p.student && p.student.name) || 'No name';
    const lesson = cleanName(p.lesson && p.lesson.title) || 'Lesson';
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm');
    const folder = child(child(DriveApp.getRootFolder(), ROOT_FOLDER), lesson).createFolder(name + ' - ' + stamp);

    folder.createFile('work.html', report(p), MimeType.HTML);
    folder.createFile('for-ai-marking.txt', String(p.forAI || ''), MimeType.PLAIN_TEXT);
    (p.photos || []).slice(0, MAX_PHOTOS).forEach(function (ph) {
      const m = String(ph.data || '').match(/^data:(image\/(jpeg|png|webp));base64,(.+)$/);
      if (!m) return;
      folder.createFile(Utilities.newBlob(Utilities.base64Decode(m[3]), m[1], cleanName(ph.name) || 'photo.jpg'));
    });

    sheet().appendRow([new Date(), lesson, name, cleanName(p.student && p.student.cls), num(p.score && p.score.right), num(p.score && p.score.total),
      num(p.progress && p.progress.done), num(p.progress && p.progress.total), (p.flags || []).map(String).join(' | '), folder.getUrl()].map(safeCell));
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

function sheet() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID'), ss = null;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_NAME);
    ss.getSheets()[0].appendRow(['Sent', 'Lesson', 'Student', 'Class', 'Score', 'Out of', 'Tasks done', 'Tasks', 'Warnings', 'Work folder']);
    ss.getSheets()[0].setFrozenRows(1);
    props.setProperty('SHEET_ID', ss.getId());
  }
  return ss.getSheets()[0];
}

function child(parent, name) {
  const it = parent.getFoldersByName(name);
  return it.hasNext() ? it.next() : parent.createFolder(name);
}
function cleanName(s) { return String(s == null ? '' : s).replace(/[\u0000-\u001f​-‏‪-‮⁠-⁤﻿\/\\:*?"<>|]/g, '').trim().slice(0, 80); }
function num(n) { return typeof n === 'number' && isFinite(n) ? n : ''; }
// Stop students' text being run as a spreadsheet formula (e.g. a name starting with =).
function safeCell(v) { return typeof v === 'string' && /^[=+\-@\t\r]/.test(v) ? "'" + v : v; }
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function reply(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function report(p) {
  const s = p.student || {}, sc = p.score || {}, pr = p.progress || {};
  const rows = (p.items || []).map(function (i) {
    const mark = i.ok === true ? ' ✓' : i.ok === false ? ' ✗' : (i.max ? ' (' + num(i.score) + '/' + num(i.max) + ')' : '');
    return '<tr><td>' + esc(i.page) + '</td><td>' + esc(i.kind) + '</td><td>' + esc(i.prompt) + '</td><td style="white-space:pre-wrap">' + esc(i.answer) + esc(mark) + '</td></tr>';
  }).join('');
  const flags = (p.flags || []).length ? '<p style="background:#fdecec;padding:8px;border-radius:6px"><b>Warnings:</b> ' + (p.flags || []).map(esc).join('<br>') + '</p>' : '';
  return '<!doctype html><meta charset="utf-8"><title>' + esc(s.name) + ' – ' + esc(p.lesson && p.lesson.title) + '</title>' +
    '<body style="font-family:system-ui,sans-serif;max-width:900px;margin:20px auto;padding:0 16px">' +
    '<h1>' + esc(p.lesson && p.lesson.title) + '</h1><p><b>' + esc(s.name) + '</b> ' + esc(s.cls) + ' · sent ' + esc(p.sentAt) + '</p>' +
    '<p>Tasks done: ' + num(pr.done) + ' of ' + num(pr.total) + ' · Score: ' + num(sc.right) + ' of ' + num(sc.total) + '</p>' + flags +
    '<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%"><tr><th>Page</th><th>Type</th><th>Task</th><th>Answer</th></tr>' + rows + '</table></body>';
}
