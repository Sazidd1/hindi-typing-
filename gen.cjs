const fs = require("fs");
const content = fs.readFileSync("src/lib/typing-data.ts", "utf8");
const m = content.match(/{\s*slug:\s*'ch34'[\s\S]*?text:\s*'([^']+)'/);
const ch34Words = m ? m[1].split(" ") : [];
const m2 = content.match(/{\s*slug:\s*'ch37'[\s\S]*?text:\s*'([^']+)'/);
const ch37Words = m2 ? m2[1].split(" ") : [];
const allWords = [...new Set([...ch34Words, ...ch37Words])];

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

fs.writeFileSync("new_lessons.txt", lessons.join("\n"));
