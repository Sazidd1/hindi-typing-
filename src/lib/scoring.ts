export type Grade = "A+" | "A" | "B" | "C";

export function calculateGrade(wpm: number, accuracy: number, targetWpm: number): Grade {
  if (accuracy >= 98 && wpm >= targetWpm) return "A+";
  if (accuracy >= 95) return "A";
  if (accuracy >= 90) return "B";
  return "C";
}

export function calculateXP(wpm: number, accuracy: number, errors: number): number {
  let xp = wpm * 2;
  if (accuracy >= 90) xp += 20;
  if (errors === 0) xp += 30;
  return Math.round(xp);
}

export const DEFAULT_TARGET_WPM = 20;
