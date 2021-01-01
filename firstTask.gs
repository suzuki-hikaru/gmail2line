function firstTask() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  sheet.getRange("C20").setValue("完了済み");
  sheet.getRange("C21").setValue("30分毎に更新が保存されます。");
  ScriptApp.newTrigger("searchRun")
      .timeBased()
      .everyMinutes(30) 
      .create(); 
}
