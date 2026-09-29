const fs = require("fs");

const path = "src/lib/english-typing-data.ts";
let content = fs.readFileSync(path, "utf8");

let newContent = content.replace(
  /slug:\s*"eng-ch\d+",[\s\S]*?text:\s*"(.*?)"/g,
  (match, textContent) => {
    if (match.includes('level: "Beginner"')) {
      let chars = textContent.replace(/\s+/g, "");
      let newText = "";
      for (let i = 0; i < chars.length; i += 4) {
        newText += chars.slice(i, i + 4) + " ";
      }
      return match.replace(`text: "${textContent}"`, `text: "${newText.trim()}"`);
    }
    return match;
  },
);

fs.writeFileSync(path, newContent);
console.log("Updated english-typing-data.ts");
