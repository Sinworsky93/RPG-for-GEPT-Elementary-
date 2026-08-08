// ============================================================
// GEPT-CORE 遊戲後台記錄程式
// 這個檔案要貼到「Google 試算表」裡的 Apps Script 編輯器，
// 不是貼到 index.html 裡面。詳細步驟請看老師收到的說明訊息。
// ============================================================

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('答題紀錄');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('答題紀錄');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['時間', '學生', '關卡', '題型', '題目', '學生的答案', '正確答案']);
  }

  var data = JSON.parse(e.postData.contents);
  var typeNameMap = { grammar: '文法', vocab: '單字', puzzle: '重組句子' };

  sheet.appendRow([
    new Date(),
    data.player || '',
    data.stage || '',
    typeNameMap[data.type] || data.type || '',
    data.question || '',
    data.userAnswer || '',
    data.correctAnswer || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
