function fetch(config) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  const objects = sheet.getRange('C4:G10').getValues();
  const memo = objects[1][config]
  
  const query = setQuery(config)
  Logger.log("query set: " + query)
  
  const threads = GmailApp.search(query)
  Logger.log("threads.length: " + threads.length)

  if (threads.length === 0) {
    Logger.log("info: threads.length = 0")
    return []
  }

  const mails = GmailApp.getMessagesForThreads(threads)
  const notices = []

  for (const messages of mails) {
    const latestMessage = messages.pop()
    const notice = `【${memo}】
----------------------------------
件名: ${latestMessage.getSubject()}
受信日: ${latestMessage.getDate().toLocaleString()}
From: ${latestMessage.getFrom()}
----------------------------------

${latestMessage.getPlainBody().slice(0, 350)}
`
    notices.push(notice)

    latestMessage.markRead()
  }
  Logger.log(threads.length + "件のメールを作成しました。")
  return notices
}

