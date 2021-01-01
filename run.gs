function runLine(config) {
  const notices = fetch(config)
  
  if (notices.length === 0) {
    Logger.log("info: 作成されたメールは0件です。")
    return
  }
  
  for (const notice of notices.reverse()) {
    send(notice,config)
    Logger.log("メールを送信しました。")
  }
  Logger.log("処理終了")
}
