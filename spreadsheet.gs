const setQuery = (config) =>{
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  const objects = sheet.getRange('C4:G10').getValues();
  const now = Math.floor(new Date().getTime() / 1000)
  const memo = objects[1][config]
  const ADDRESS = [objects[2][config]].join(' OR ')
  const IS = objects[3][config]
  const KEY1 = objects[4][config]
  const KEY2 = objects[5][config]
  let INTERVAL = objects[6][config]
  if (INTERVAL === null){
    INTERVAL = 15;
  }
  const RUN = now - (60 * INTERVAL)
  const query = `(from:(${ADDRESS}) is:${IS} ${KEY1} ${KEY2} after:${RUN} )`
  return query;
}

const getToken = (config) =>{
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  const token = sheet.getRange(4,config+3).getValue();
  return token;
}

const searchRun = () =>{
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート1');
  const date = new Date();
  const runTime = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy年MM月dd日: H時mm分');
  sheet.getRange("C19").setValue(runTime);
  const objects = sheet.getRange('C10:G11').getValues();
  for (i=0; i<5; i++){
    if(objects[1][i] == true){
      let INTERVAL = objects[0][i]
      Logger.log(INTERVAL)
      if (INTERVAL === null){
        interval = 15;
      }
      createTrigger(`config${i+1}`, INTERVAL)
    }else{
      deleteTrigger(`config${i+1}`)
    }
  }
}
