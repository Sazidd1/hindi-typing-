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

export const XP_PER_LEVEL = 1000;
export const MAX_DISPLAY_LEVEL = 50;

export type ValidationResult = {
  isValid: boolean;
  wpm: number;
  accuracy: number;
  correctCharacters: number;
  totalAttempted: number;
  grade: Grade | null;
  xp: number;
  reason?: string;
};

export function validateSession(
  typedChars: string[],
  expectedChars: string[],
  elapsedSeconds: number,
  recordedErrors: number,
  isParagraphMode: boolean
): ValidationResult {
  // 1. Recalculate strictly matching correct characters (index-by-index)
  let correctCount = 0;
  for (let i = 0; i < typedChars.length; i++) {
    if (typedChars[i] === expectedChars[i]) {
      correctCount++;
    }
  }

  // 2. WPM Calculation
  let minutes = elapsedSeconds / 60;
  // Prevent divide-by-zero
  if (minutes <= 0) minutes = 0.001;
  
  let wpm = Math.max(0, Math.round((correctCount / 5) / minutes));

  // 3. Accuracy Calculation
  // Total attempted is based strictly on typed characters plus any blocked errors
  const totalAttempted = isParagraphMode 
    ? Math.max(typedChars.length, expectedChars.length > 0 && typedChars.length === expectedChars.length ? typedChars.length : 0) 
    : typedChars.length + recordedErrors;
    
  let accuracy = totalAttempted > 0 
    ? Math.max(0, Math.round((correctCount / totalAttempted) * 100))
    : 0;

  // 4. Session Validation Rules
  let isValid = true;
  let reason = undefined;

  if (elapsedSeconds < 5) {
    isValid = false;
    reason = "Session time too short (minimum 5s required).";
  } else if (wpm > 200) {
    isValid = false;
    reason = "Unrealistic WPM detected.";
  } else if (accuracy < 70 && typedChars.length >= expectedChars.length) {
    isValid = false;
    reason = "Accuracy below 70%.";
  }

  // 5. Output Validation Result
  if (!isValid) {
    return {
      isValid,
      wpm: 0,
      accuracy: 0,
      correctCharacters: correctCount,
      totalAttempted,
      grade: null,
      xp: 0,
      reason: reason ?? "Invalid session"
    };
  }

  return {
    isValid,
    wpm,
    accuracy,
    correctCharacters: correctCount,
    totalAttempted,
    grade: calculateGrade(wpm, accuracy, DEFAULT_TARGET_WPM),
    xp: calculateXP(wpm, accuracy, recordedErrors),
  };
}
