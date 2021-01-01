function createTrigger(funcName,setInterval) {
  Logger.log(setInterval)
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    if (trigger.getHandlerFunction() == funcName) {
      Logger.log("update:" + trigger.getHandlerFunction())
      ScriptApp.deleteTrigger(trigger);
    }
  }
  ScriptApp.newTrigger(funcName)
    .timeBased()
    .everyMinutes(setInterval)
    .create();
}

function deleteTrigger(funcName) {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i];
    if (trigger.getHandlerFunction() == funcName) {
      Logger.log("delete:" + trigger.getHandlerFunction())
      ScriptApp.deleteTrigger(trigger);
    }
  }
}
