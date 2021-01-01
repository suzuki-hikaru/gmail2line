function send(notice,config) {
  const ENDPOINT = 'https://notify-api.line.me/api/notify'
  const LINE_NOTIFY_TOKEN = getToken(config)
  if (LINE_NOTIFY_TOKEN === null) {
    Logger.log('error: LINE_NOTIFY_TOKEN is not set.')
    return
  }
  const options = {
    'method': 'POST',
    'headers': {'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`},
    'payload': {'message': notice},
  }
  UrlFetchApp.fetch(ENDPOINT, options)
}
