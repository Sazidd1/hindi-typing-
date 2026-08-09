//#region node_modules/.nitro/vite/services/ssr/assets/scoring-D8JtVBFj.js
function calculateGrade(wpm, accuracy, targetWpm) {
	if (accuracy >= 98 && wpm >= targetWpm) return "A+";
	if (accuracy >= 95) return "A";
	if (accuracy >= 90) return "B";
	return "C";
}
function calculateXP(wpm, accuracy, errors) {
	let xp = wpm * 2;
	if (accuracy >= 90) xp += 20;
	if (errors === 0) xp += 30;
	return Math.round(xp);
}
var XP_PER_LEVEL = 1e3;
function validateSession(typedChars, expectedChars, elapsedSeconds, recordedErrors, isParagraphMode) {
	let correctCount = 0;
	for (let i = 0; i < typedChars.length; i++) if (typedChars[i] === expectedChars[i]) correctCount++;
	let minutes = elapsedSeconds / 60;
	if (minutes <= 0) minutes = .001;
	let wpm = Math.max(0, Math.round(correctCount / 5 / minutes));
	const totalAttempted = isParagraphMode ? Math.max(typedChars.length, expectedChars.length > 0 && typedChars.length === expectedChars.length ? typedChars.length : 0) : typedChars.length + recordedErrors;
	let accuracy = totalAttempted > 0 ? Math.max(0, Math.round(correctCount / totalAttempted * 100)) : 0;
	let isValid = true;
	let reason = void 0;
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
	if (!isValid) return {
		isValid,
		wpm: 0,
		accuracy: 0,
		correctCharacters: correctCount,
		totalAttempted,
		grade: null,
		xp: 0,
		reason
	};
	return {
		isValid,
		wpm,
		accuracy,
		correctCharacters: correctCount,
		totalAttempted,
		grade: calculateGrade(wpm, accuracy, 20),
		xp: calculateXP(wpm, accuracy, recordedErrors)
	};
}
//#endregion
export { calculateXP as n, validateSession as r, XP_PER_LEVEL as t };
