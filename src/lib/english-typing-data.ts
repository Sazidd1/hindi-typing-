export type Finger =
  | "l-pinky" | "l-ring" | "l-middle" | "l-index"
  | "r-index" | "r-middle" | "r-ring" | "r-pinky" | "thumb";

export const englishFingerLabels: Record<Finger, string> = {
  "l-pinky": "Left Pinky",
  "l-ring": "Left Ring",
  "l-middle": "Left Middle",
  "l-index": "Left Index",
  "r-index": "Right Index",
  "r-middle": "Right Middle",
  "r-ring": "Right Ring",
  "r-pinky": "Right Pinky",
  thumb: "Thumb",
};

export const fingerColors: Record<Finger, string> = {
  "l-pinky": "oklch(0.62 0.19 300)",
  "l-ring": "oklch(0.62 0.18 265)",
  "l-middle": "oklch(0.65 0.16 232)",
  "l-index": "oklch(0.66 0.14 200)",
  "r-index": "oklch(0.66 0.15 165)",
  "r-middle": "oklch(0.68 0.16 140)",
  "r-ring": "oklch(0.72 0.15 95)",
  "r-pinky": "oklch(0.7 0.17 55)",
  thumb: "oklch(0.6 0.05 258)",
};

export type KeyDef = {
  en: string;
  shift?: string;
  finger: Finger;
  width?: number;
};

export const englishKeyboardRows: KeyDef[][] = [
  [
    { en: "`", shift: "~", finger: "l-pinky" },
    { en: "1", shift: "!", finger: "l-pinky" },
    { en: "2", shift: "@", finger: "l-ring" },
    { en: "3", shift: "#", finger: "l-middle" },
    { en: "4", shift: "$", finger: "l-index" },
    { en: "5", shift: "%", finger: "l-index" },
    { en: "6", shift: "^", finger: "r-index" },
    { en: "7", shift: "&", finger: "r-index" },
    { en: "8", shift: "*", finger: "r-middle" },
    { en: "9", shift: "(", finger: "r-ring" },
    { en: "0", shift: ")", finger: "r-pinky" },
    { en: "-", shift: "_", finger: "r-pinky" },
    { en: "=", shift: "+", finger: "r-pinky" },
    { en: "⌫", finger: "r-pinky", width: 2 },
  ],
  [
    { en: "Tab", finger: "l-pinky", width: 1.6 },
    { en: "q", shift: "Q", finger: "l-pinky" },
    { en: "w", shift: "W", finger: "l-ring" },
    { en: "e", shift: "E", finger: "l-middle" },
    { en: "r", shift: "R", finger: "l-index" },
    { en: "t", shift: "T", finger: "l-index" },
    { en: "y", shift: "Y", finger: "r-index" },
    { en: "u", shift: "U", finger: "r-index" },
    { en: "i", shift: "I", finger: "r-middle" },
    { en: "o", shift: "O", finger: "r-ring" },
    { en: "p", shift: "P", finger: "r-pinky" },
    { en: "[", shift: "{", finger: "r-pinky" },
    { en: "]", shift: "}", finger: "r-pinky" },
    { en: "\\", shift: "|", finger: "r-pinky", width: 1.4 },
  ],
  [
    { en: "Caps", finger: "l-pinky", width: 1.9 },
    { en: "a", shift: "A", finger: "l-pinky" },
    { en: "s", shift: "S", finger: "l-ring" },
    { en: "d", shift: "D", finger: "l-middle" },
    { en: "f", shift: "F", finger: "l-index" },
    { en: "g", shift: "G", finger: "l-index" },
    { en: "h", shift: "H", finger: "r-index" },
    { en: "j", shift: "J", finger: "r-index" },
    { en: "k", shift: "K", finger: "r-middle" },
    { en: "l", shift: "L", finger: "r-ring" },
    { en: ";", shift: ":", finger: "r-pinky" },
    { en: "'", shift: "\"", finger: "r-pinky" },
    { en: "Enter", finger: "r-pinky", width: 2.1 },
  ],
  [
    { en: "Shift", finger: "l-pinky", width: 2.4 },
    { en: "z", shift: "Z", finger: "l-pinky" },
    { en: "x", shift: "X", finger: "l-ring" },
    { en: "c", shift: "C", finger: "l-middle" },
    { en: "v", shift: "V", finger: "l-index" },
    { en: "b", shift: "B", finger: "l-index" },
    { en: "n", shift: "N", finger: "r-index" },
    { en: "m", shift: "M", finger: "r-index" },
    { en: ",", shift: "<", finger: "r-middle" },
    { en: ".", shift: ">", finger: "r-ring" },
    { en: "/", shift: "?", finger: "r-pinky" },
    { en: "Shift", finger: "r-pinky", width: 2.4 },
  ],
  [
    { en: "Space", finger: "thumb", width: 6 },
  ],
];

const englishCharIndex: Record<string, { key: KeyDef; shift: boolean; rowIndex: number; colIndex: number }> = {};
englishKeyboardRows.forEach((row, ri) => {
  row.forEach((key, ci) => {
    englishCharIndex[key.en] = { key, shift: false, rowIndex: ri, colIndex: ci };
    if (key.shift) {
      englishCharIndex[key.shift] = { key, shift: true, rowIndex: ri, colIndex: ci };
    }
  });
});

export function englishLookupChar(ch: string) {
  return englishCharIndex[ch];
}

export type Lesson = {
  slug: string;
  title: string;
  englishTitle: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  keys: string;
  minutes: number;
  text: string;
};

export const englishLessons: Lesson[] = [
  { slug: 'eng-ch1', title: 'Lesson 1', englishTitle: 'a s d f j k l ;', description: 'Home Row', level: 'Beginner', keys: 'a s d f j k l ;', minutes: 3, text: 'asdf jkl; asdf jkl; asdf jkl; a s d f j k l ; fdsa ;lkj fdsa ;lkj asdf jkl; fdsa ;lkj asdf jkl;' },
  { slug: 'eng-ch2', title: 'Lesson 2', englishTitle: 'q w e r t y u i o p', description: 'Top Row', level: 'Beginner', keys: 'q w e r t y u i o p', minutes: 3, text: 'qwer tyui op qwer tyui op qwer tyui op q w e r t y u i o p rewq poiu ytre rewq poiu ytre qwer tyui op' },
  { slug: 'eng-ch3', title: 'Lesson 3', englishTitle: 'z x c v b n m , . /', description: 'Bottom Row', level: 'Beginner', keys: 'z x c v b n m , . /', minutes: 3, text: 'zxcv bnm, ./ zxcv bnm, ./ z x c v b n m , . / vcxx mnb, ./ zxcv bnm, ./' },
  { slug: 'eng-ch4', title: 'Word Practice 1', englishTitle: 'Home Row Words', description: 'Mixed', level: 'Beginner', keys: 'Home Row Words', minutes: 3, text: 'sad fad lad dad lass fall glass flak flask alas alas add all ask' },
  { slug: 'eng-ch5', title: 'Word Practice 2', englishTitle: 'Top & Home Row Words', description: 'Mixed', level: 'Intermediate', keys: 'Top & Home Row Words', minutes: 3, text: 'their there where what why who how are you today good great well' },
];

export const englishCurriculumBase = [
  {
    category: "Home Row",
    slug: "eng-home-row-category",
    title: "Home Row",
    englishTitle: "Home Row",
    description: "Learn the middle row of the keyboard.",
    isCategory: true,
  },
  ...englishLessons.filter((l) => l.description === "Home Row").map((l) => ({ ...l, category: "Home Row", isCategory: false })),
  {
    category: "Top Row",
    slug: "eng-top-row-category",
    title: "Top Row",
    englishTitle: "Top Row",
    description: "Learn the top row of the keyboard.",
    isCategory: true,
  },
  ...englishLessons.filter((l) => l.description === "Top Row").map((l) => ({ ...l, category: "Top Row", isCategory: false })),
  {
    category: "Bottom Row",
    slug: "eng-bottom-row-category",
    title: "Bottom Row",
    englishTitle: "Bottom Row",
    description: "Learn the bottom row of the keyboard.",
    isCategory: true,
  },
  ...englishLessons.filter((l) => l.description === "Bottom Row").map((l) => ({ ...l, category: "Bottom Row", isCategory: false })),
  {
    category: "Mixed",
    slug: "eng-mixed-category",
    title: "Word Practice",
    englishTitle: "Word Practice",
    description: "Practice typing words.",
    isCategory: true,
  },
  ...englishLessons.filter((l) => l.description === "Mixed").map((l) => ({ ...l, category: "Mixed", isCategory: false })),
];
