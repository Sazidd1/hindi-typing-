export type Finger =
  | "l-pinky"
  | "l-ring"
  | "l-middle"
  | "l-index"
  | "r-index"
  | "r-middle"
  | "r-ring"
  | "r-pinky"
  | "thumb";

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
    { en: "'", shift: '"', finger: "r-pinky" },
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
  [{ en: "Space", finger: "thumb", width: 6 }],
];

const englishCharIndex: Record<
  string,
  { key: KeyDef; shift: boolean; rowIndex: number; colIndex: number }
> = {};
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
  // Home Row
  {
    slug: "eng-ch1",
    title: "Lesson 1",
    englishTitle: "Home Row: f j",
    description: "Home Row",
    level: "Beginner",
    keys: "f j",
    minutes: 3,
    text: "fjfj fjfj ffjj fjjf ffjj fjjf fjfj fjfj fjfj fjfj ffjj fjjf",
  },
  {
    slug: "eng-ch2",
    title: "Lesson 2",
    englishTitle: "Home Row: d k",
    description: "Home Row",
    level: "Beginner",
    keys: "d k",
    minutes: 3,
    text: "dkdk dkdk ddkk dkkd ddkk dkkd dkdk dkdk dkdk dkdk ddkk dkkd",
  },
  {
    slug: "eng-ch3",
    title: "Lesson 3",
    englishTitle: "Home Row: s l",
    description: "Home Row",
    level: "Beginner",
    keys: "s l",
    minutes: 3,
    text: "slsl slsl ssll slls ssll slls slsl slsl slsl slsl ssll slls",
  },
  {
    slug: "eng-ch4",
    title: "Lesson 4",
    englishTitle: "Home Row: a ;",
    description: "Home Row",
    level: "Beginner",
    keys: "a ;",
    minutes: 3,
    text: "a;a; a;a; aa;; a;;a aa;; a;;a a;a; a;a; a;a; a;a; aa;; a;;a",
  },
  {
    slug: "eng-ch5",
    title: "Lesson 5",
    englishTitle: "Home Row: a s d f",
    description: "Home Row",
    level: "Beginner",
    keys: "a s d f",
    minutes: 3,
    text: "asdf asdf asdf asdf fdsa fdsa fdsa fdsa afsd afsd afsd afsd",
  },
  {
    slug: "eng-ch6",
    title: "Lesson 6",
    englishTitle: "Home Row: j k l ;",
    description: "Home Row",
    level: "Beginner",
    keys: "j k l ;",
    minutes: 3,
    text: "jkl; jkl; jkl; jkl; ;lkj ;lkj ;lkj ;lkj j;kl j;kl j;kl j;kl",
  },
  {
    slug: "eng-ch7",
    title: "Lesson 7",
    englishTitle: "Home Row: g h",
    description: "Home Row",
    level: "Beginner",
    keys: "g h",
    minutes: 3,
    text: "ghgh ghgh gghh ghhg gghh ghhg fghj fghj ghgh ghgg hhgh hggh",
  },
  {
    slug: "eng-ch8",
    title: "Lesson 8",
    englishTitle: "Home Row: a s d f g",
    description: "Home Row",
    level: "Beginner",
    keys: "L-5 + G",
    minutes: 3,
    text: "asdfg asdfg asdfg",
  },
  {
    slug: "eng-ch9",
    title: "Lesson 9",
    englishTitle: "Home Row: j k l ; h",
    description: "Home Row",
    level: "Beginner",
    keys: "L-6 + H",
    minutes: 3,
    text: "jkl;h jkl;h jkl;h",
  },
  {
    slug: "eng-ch10",
    title: "Lesson 10",
    englishTitle: "Home Row Words",
    description: "Home Row",
    level: "Intermediate",
    keys: "Home Row Words",
    minutes: 3,
    text: "sad fad lad dad lass fall glass flak flask alas alas add all ask ash dash flash slash gash hash jag lag sag flag",
  },
  {
    slug: "eng-ch11",
    title: "Lesson 11",
    englishTitle: "Home Row: All Keys",
    description: "Home Row",
    level: "Intermediate",
    keys: "ALL HOME ROW",
    minutes: 3,
    text: "ask dad all salads fall; lass as ads add salsa jaff kad; flask sad alfa jak kaj",
  },
  // Top Row
  {
    slug: "eng-ch12",
    title: "Lesson 12",
    englishTitle: "Top Row: r u",
    description: "Top Row",
    level: "Beginner",
    keys: "r u",
    minutes: 2,
    text: "ruru ruru rruu ruur rruu ruur frju frju ruru ruru rruu ruur",
  },
  {
    slug: "eng-ch13",
    title: "Lesson 13",
    englishTitle: "Top Row: e i",
    description: "Top Row",
    level: "Beginner",
    keys: "e i",
    minutes: 2,
    text: "eiei eiei eeii eiie eeii eiie deki deki eiei eiei eeii eiie",
  },
  {
    slug: "eng-ch14",
    title: "Lesson 14",
    englishTitle: "Top Row: w o",
    description: "Top Row",
    level: "Beginner",
    keys: "w o",
    minutes: 2,
    text: "wowo wowo wwoo woow wwoo woow swlo swlo wowo wowo wwoo woow",
  },
  {
    slug: "eng-ch15",
    title: "Lesson 15",
    englishTitle: "Top Row: q p",
    description: "Top Row",
    level: "Beginner",
    keys: "q p",
    minutes: 2,
    text: "qpqp qpqp qqpp qppq qqpp qppq aq;p aq;p qpqp qpqp qqpp qppq",
  },
  {
    slug: "eng-ch16",
    title: "Lesson 16",
    englishTitle: "Top Row: t y",
    description: "Top Row",
    level: "Beginner",
    keys: "t y",
    minutes: 3,
    text: "tyty tyty ttyy tyyt ttyy tyyt ftjy ftjy tyty tytt yyty ytty",
  },
  {
    slug: "eng-ch17",
    title: "Lesson 17",
    englishTitle: "Top Row Words",
    description: "Top Row",
    level: "Intermediate",
    keys: "Top Row Words",
    minutes: 3,
    text: "their there where what why who how are you today good great well tree free see out our pout route quiet pet pit put",
  },
  // Bottom Row
  {
    slug: "eng-ch18",
    title: "Lesson 18",
    englishTitle: "Bottom Row: v m",
    description: "Bottom Row",
    level: "Beginner",
    keys: "v m",
    minutes: 2,
    text: "vmvm vmvm vvmm vmmv vvmm vmmv fvjm fvjm vmvm vmvm vvmm vmmv",
  },
  {
    slug: "eng-ch19",
    title: "Lesson 19",
    englishTitle: "Bottom Row: c ,",
    description: "Bottom Row",
    level: "Beginner",
    keys: "c ,",
    minutes: 2,
    text: "c,c, c,c, cc,, c,,c cc,, c,,c dck, dck, c,c, c,c, cc,, c,,c",
  },
  {
    slug: "eng-ch20",
    title: "Lesson 20",
    englishTitle: "Bottom Row: x .",
    description: "Bottom Row",
    level: "Beginner",
    keys: "x .",
    minutes: 2,
    text: "x.x. x.x. xx.. x..x xx.. x..x sxl. sxl. x.x. x.x. xx.. x..x",
  },
  {
    slug: "eng-ch21",
    title: "Lesson 21",
    englishTitle: "Bottom Row: z /",
    description: "Bottom Row",
    level: "Beginner",
    keys: "z /",
    minutes: 2,
    text: "z/z/ z/z/ zz// z//z zz// z//z az;/ az;/ z/z/ z/z/ zz// z//z",
  },
  {
    slug: "eng-ch22",
    title: "Lesson 22",
    englishTitle: "Bottom Row: b n",
    description: "Bottom Row",
    level: "Beginner",
    keys: "b n",
    minutes: 3,
    text: "bnbn bnbn bbnn bnnb bbnn bnnb fbjn fbjn bnbn bnbb nnbn nbbn",
  },
  {
    slug: "eng-ch23",
    title: "Lesson 23",
    englishTitle: "Bottom Row Words",
    description: "Bottom Row",
    level: "Intermediate",
    keys: "Bottom Row Words",
    minutes: 3,
    text: "can came bam van man pan ban bin pin win tin sin din fin x-ray zip zap zoom zed zone none bone cone done",
  },
  // Mixed
  {
    slug: "eng-ch24",
    title: "Lesson 24",
    englishTitle: "Mixed QWERTY Words",
    description: "Mixed",
    level: "Advanced",
    keys: "Mixed QWERTY Words",
    minutes: 5,
    text: "keyboard typing practice learn quick fast slow steady rhythm focus mind fingers touch screen monitor computer mouse table chair house school education progress",
  },
  {
    slug: "eng-ch25",
    title: "Lesson 25",
    englishTitle: "English Sentences",
    description: "Mixed",
    level: "Advanced",
    keys: "English Sentences",
    minutes: 5,
    text: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How quickly daft jumping zebras vex. Sphinx of black quartz, judge my vow. Two driven jocks help fax my big quiz.",
  },
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
  ...englishLessons
    .filter((l) => l.description === "Home Row")
    .map((l) => ({ ...l, category: "Home Row", isCategory: false })),
  {
    category: "Top Row",
    slug: "eng-top-row-category",
    title: "Top Row",
    englishTitle: "Top Row",
    description: "Learn the top row of the keyboard.",
    isCategory: true,
  },
  ...englishLessons
    .filter((l) => l.description === "Top Row")
    .map((l) => ({ ...l, category: "Top Row", isCategory: false })),
  {
    category: "Bottom Row",
    slug: "eng-bottom-row-category",
    title: "Bottom Row",
    englishTitle: "Bottom Row",
    description: "Learn the bottom row of the keyboard.",
    isCategory: true,
  },
  ...englishLessons
    .filter((l) => l.description === "Bottom Row")
    .map((l) => ({ ...l, category: "Bottom Row", isCategory: false })),
  {
    category: "Mixed",
    slug: "eng-mixed-category",
    title: "Word Practice",
    englishTitle: "Word Practice",
    description: "Practice typing words.",
    isCategory: true,
  },
  ...englishLessons
    .filter((l) => l.description === "Mixed")
    .map((l) => ({ ...l, category: "Mixed", isCategory: false })),
];
