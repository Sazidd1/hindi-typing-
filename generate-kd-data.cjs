const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "src", "lib", "typing-data.ts");
const destPath = path.join(__dirname, "src", "lib", "kruti-dev-typing-data.ts");

let content = fs.readFileSync(srcPath, "utf8");

// Rename exports
content = content.replace(/export const keyboardRows/g, "export const krutiDevKeyboardRows");
content = content.replace(/export const HINDI_MAP/g, "export const KRUTI_DEV_MAP");
content = content.replace(/const charIndex/g, "const krutiDevCharIndex");
content = content.replace(/charIndex\[/g, "krutiDevCharIndex[");
content = content.replace(/charIndex;/g, "krutiDevCharIndex;");
content = content.replace(/export function lookupChar/g, "export function lookupKrutiDevChar");
content = content.replace(
  /export const lessons: Lesson\[\] = \[/g,
  "export const krutiDevLessons: Lesson[] = [",
);

// Update slug to have 'kd-' prefix in the lessons array
content = content.replace(/slug:\s*'ch/g, "slug: 'kd-ch");
content = content.replace(/slug:\s*'story-/g, "slug: 'kd-story-");

// We need to clear out the actual Hindi characters in the keyboardRows to use placeholders
// Or leave them as empty strings as requested "clearly marked/configured so the exact Kruti Dev key map can be populated later."
// The regex finds { en: "X", hi: "Y", shift: "Z" } and clears hi and shift values.
content = content.replace(/hi:\s*"[^"]*"/g, 'hi: "" /* TODO: Kruti Dev Map */');
content = content.replace(/shift:\s*"[^"]*"/g, 'shift: "" /* TODO: Kruti Dev Map */');

fs.writeFileSync(destPath, content);
console.log("Successfully generated kruti-dev-typing-data.ts");
