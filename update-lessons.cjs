const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/typing-data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// The replacement mapping
const replacements = {
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
  '0': '०',
  ';': 'ञ', // Only in text, where it was produced by the - key
  'ृ': '+'  // Only in text, where it was produced by the = key
};

content = content.replace(/(keys:\s*'[^']*'|hindiTitle:\s*'[^']*'|text:\s*'[^']*')/g, (match) => {
  let updated = match;
  for (const [oldChar, newChar] of Object.entries(replacements)) {
    updated = updated.split(oldChar).join(newChar);
  }
  return updated;
});

fs.writeFileSync(filePath, content);
console.log('Updated lessons in typing-data.ts');
