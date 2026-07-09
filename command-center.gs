/**
 * Piedmondo Command Center — pipeline API
 * Google Apps Script web app backing piedmondo.com/command/.
 * The sheet is the database; this script is the keyed read/write API.
 *
 * SETUP: see COMMAND-SETUP.md. In short — create a Google Sheet named
 * "Piedmondo Pipeline", paste this into Extensions -> Apps Script, set KEY
 * below to the password you choose, then Deploy -> Web app
 * (Execute as: Me · Who has access: Anyone). Share the sheet with Brady.
 *
 * SECURITY MODEL: every request must carry the key. Wrong/missing key gets
 * an error and zero data. The key lives only here and in the heads of the
 * team — never in the public website repo.
 */

var KEY = 'CHANGE-ME';           // <-- set this to your chosen password before deploying
var TAB = 'Pipeline';

// Column order — the dashboard depends on this exact order.
var HEADERS = [
  'id', 'date_added', 'business', 'industry', 'city_state', 'channel',
  'contact_detail', 'pitch_angle', 'demo_slug', 'demo_url', 'status',
  'built', 'sent', 'last_touch', 'takedown_done', 'notes'
];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(TAB) || ss.insertSheet(TAB);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function rows_(sh) {
  var last = sh.getLastRow();
  if (last < 2) return [];
  var values = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  return values.map(function (v) {
    var o = {};
    HEADERS.forEach(function (h, i) {
      var cell = v[i];
      if (cell instanceof Date) {
        cell = Utilities.formatDate(cell, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      }
      o[h] = cell === '' ? '' : String(cell);
    });
    return o;
  }).filter(function (o) { return o.id; });
}

/** GET  ?key=...&action=list  -> { ok, rows } */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.key !== KEY || KEY === 'CHANGE-ME') return json_({ ok: false, error: 'bad key' });
  return json_({ ok: true, rows: rows_(sheet_()) });
}

/** POST body: { key, action: "upsert"|"delete", row: {...} } */
function doPost(e) {
  var body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad body' }); }
  if (body.key !== KEY || KEY === 'CHANGE-ME') return json_({ ok: false, error: 'bad key' });

  var sh = sheet_();
  var row = body.row || {};
  if (!row.id) return json_({ ok: false, error: 'row.id required' });

  // find existing row by id
  var last = sh.getLastRow();
  var idx = -1;
  if (last >= 2) {
    var ids = sh.getRange(2, 1, last - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(row.id)) { idx = i + 2; break; }
    }
  }

  if (body.action === 'delete') {
    if (idx > -1) sh.deleteRow(idx);
    return json_({ ok: true, deleted: idx > -1 });
  }

  // upsert
  var values = HEADERS.map(function (h) { return row[h] !== undefined ? row[h] : ''; });
  if (idx > -1) {
    // merge: only overwrite provided fields
    var existing = sh.getRange(idx, 1, 1, HEADERS.length).getValues()[0];
    values = HEADERS.map(function (h, i) {
      return row[h] !== undefined ? row[h] : existing[i];
    });
    sh.getRange(idx, 1, 1, HEADERS.length).setValues([values]);
  } else {
    sh.appendRow(values);
  }
  return json_({ ok: true, rows: rows_(sh) });
}

/** Open the /exec URL in a browser (no params) to confirm deployment. */
function doGetNoKeyCheckHint_() {} // (doGet already answers; bad key -> {ok:false})
