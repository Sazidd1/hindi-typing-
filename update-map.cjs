const fs = require('fs');
const oldMap = { 'f':'ि', 'j':'र', 'd':'क', 'k':'ा', 's':'े', 'l':'स', 'a':'ं', ';':'य', 'g':'ह', 'h':'ी', 'r':'त', 'u':'न', 'e':'म', 'i':'प', 'w':'ू', 'o':'व', 'q':'ु', 'p':'च', 't':'ज', 'y':'ल', 'c':'ब', 'n':'द', 'x':'ग', 'm':'उ', 'v':'अ', 'z':'्र', ',':'ए', '.':'ण्', '/':'ध्' };
let code = fs.readFileSync('src/lib/typing-data.ts', 'utf8');

// Replace ch11
code = code.replace(
  /text: 'djs jks;k lkjs fdjk;k lg lgkjk fdjk;s dkslksa jgk fl;kjk ;s dkj jg lkg dslj dh jl fdl djk lgh dksl jks ldska fd;s gka djsa jksd lk gh lj fd;k ;gha dgh ldk gksa lhls lkgl fd lkjh dls'/g,
  "text: 'करे राेया सारे िकराया सह सहारा िकराये काेसाें रहा िसयाराें ये कार रह साह केसर की रस िकस करा सही काेस राे सकें िकये हां करें राेक सा ही सर िकया यहीं कही सका हाें सीसे साहस िक सारी कसे'"
);

// We need to update keyboardRows
let lines = code.split('\n');
let inKeyboardRows = false;
let newCode = '';

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export const keyboardRows')) {
    inKeyboardRows = true;
  }
  if (inKeyboardRows && lines[i].includes('{ en: ')) {
    let match = lines[i].match(/en:\s*"([^"]+)"/);
    if (match) {
      let enKey = match[1].toLowerCase();
      if (oldMap[enKey]) {
         lines[i] = lines[i].replace(/hi:\s*"[^"]*"/, `hi: "${oldMap[enKey]}"`);
      }
    }
  }
  newCode += lines[i] + (i < lines.length - 1 ? '\n' : '');
}

fs.writeFileSync('src/lib/typing-data.ts', newCode);
console.log('Done');
