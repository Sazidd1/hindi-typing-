const fs = require("fs");
const content = fs.readFileSync("src/lib/typing-data.ts", "utf8");
const slugs = ["ch35", "ch36", "ch37", "ch46"];
let allWords = [];
slugs.forEach((s) => {
  const regex = new RegExp("{?\\s*slug:\\s*'" + s + "'[\\s\\S]*?text:\\s*'([^']+)'");
  const m = content.match(regex);
  if (m) allWords.push(...m[1].split(" "));
});
allWords = [...new Set(allWords)];
console.log("Found words:", allWords.length);

const lessons = [];
for (let i = 11; i <= 15; i++) {
  let shuffled = [...allWords].sort(() => 0.5 - Math.random());
  let lessonWords = [];
  while (lessonWords.length < 100) {
    lessonWords.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
  }
  const text = lessonWords.join(" ");
  lessons.push(
    "  { slug: 'ch" +
      (i + 44) +
      "', title: 'Word Practice', hindiTitle: 'अभ्यास " +
      i +
      "', description: 'Mixed', level: 'शुरुआती', keys: 'अभ्यास', minutes: 3, text: '" +
      text +
      "' },",
  );
}

fs.writeFileSync("new_lessons_fixed.txt", lessons.join("\n"));
