const fs = require("fs");
const path = require("path");

// 1. Generate KrutiDevKeyboard.tsx
let kbCode = fs.readFileSync(
  path.join(__dirname, "src/components/typing/HindiKeyboard.tsx"),
  "utf8",
);
kbCode = kbCode.replace(/HindiKeyboard/g, "KrutiDevKeyboard");
kbCode = kbCode.replace(
  /import \{ keyboardRows, lookupChar, type Finger \} from "@\/lib\/typing-data";/g,
  'import { krutiDevKeyboardRows as keyboardRows, lookupKrutiDevChar as lookupChar, type Finger } from "@/lib/kruti-dev-typing-data";',
);
fs.writeFileSync(path.join(__dirname, "src/components/typing/KrutiDevKeyboard.tsx"), kbCode);

// 2. Generate KrutiDevTypingArena.tsx
let arenaCode = fs.readFileSync(
  path.join(__dirname, "src/components/typing/TypingArena.tsx"),
  "utf8",
);
arenaCode = arenaCode.replace(/TypingArena/g, "KrutiDevTypingArena");
arenaCode = arenaCode.replace(/HindiKeyboard/g, "KrutiDevKeyboard");
// replace imports from typing-data
arenaCode = arenaCode.replace(
  /import \{ HINDI_MAP, lessons, keyboardRows \} from "@\/lib\/typing-data";/g,
  'import { KRUTI_DEV_MAP as HINDI_MAP, krutiDevLessons as lessons, krutiDevKeyboardRows as keyboardRows } from "@/lib/kruti-dev-typing-data";',
);
arenaCode = arenaCode.replace(/tokenizeHindi/g, "tokenizeKrutiDev");
fs.writeFileSync(path.join(__dirname, "src/components/typing/KrutiDevTypingArena.tsx"), arenaCode);

console.log("Successfully generated KrutiDev components");
