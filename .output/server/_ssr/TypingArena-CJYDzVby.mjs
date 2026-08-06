import { i as __toESM } from "../_runtime.mjs";
import { r as lessons } from "./typing-data-GALeOzeh.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useAuth } from "./auth-zFGTrjhs.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as HindiKeyboard } from "./HindiKeyboard-if5D-Fpe.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as CircleX, d as Play, i as Target, r as Trophy, t as Zap, u as RotateCcw, x as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TypingArena-CJYDzVby.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function AnimatedCounter({ value, duration = 1e3 }) {
	const [count, setCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let startTime = null;
		let animationFrame;
		const animate = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			setCount(Math.floor(easeOutQuart * value));
			if (progress < 1) animationFrame = requestAnimationFrame(animate);
			else setCount(value);
		};
		animationFrame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrame);
	}, [value, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: count });
}
function CircularProgress({ value, size = 64, strokeWidth = 6, className }) {
	const [progress, setProgress] = (0, import_react.useState)(0);
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDashoffset = circumference - progress / 100 * circumference;
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setProgress(value), 100);
		return () => clearTimeout(timer);
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative inline-flex items-center justify-center", className),
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "-rotate-90 transform",
			width: size,
			height: size,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "text-slate-100",
				strokeWidth,
				stroke: "currentColor",
				fill: "transparent",
				r: radius,
				cx: size / 2,
				cy: size / 2
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "text-success transition-all duration-1000 ease-out",
				strokeWidth,
				strokeDasharray: circumference,
				strokeDashoffset,
				strokeLinecap: "round",
				stroke: "currentColor",
				fill: "transparent",
				r: radius,
				cx: size / 2,
				cy: size / 2
			})]
		})
	});
}
function ChapterMasteryModal({ wpm, accuracy, errors, nextLessonSlug, onPracticeAgain }) {
	const [grade, setGrade] = (0, import_react.useState)("C");
	const [xp, setXp] = (0, import_react.useState)(0);
	const targetCompleted = wpm >= 20;
	(0, import_react.useEffect)(() => {
		setGrade(calculateGrade(wpm, accuracy, 20));
		setXp(calculateXP(wpm, accuracy, errors));
	}, [
		wpm,
		accuracy,
		errors
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-30 flex items-center justify-center bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-[90%] max-w-[480px] bg-white rounded-[28px] p-8 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 pointer-events-none overflow-hidden opacity-30",
					children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute size-2 rounded-full bg-yellow-400 animate-pulse",
						style: {
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 2}s`,
							animationDuration: `${2 + Math.random() * 2}s`
						}
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center text-center relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-200/50 shadow-sm mb-4 animate-bounce",
						style: {
							animationIterationCount: 1,
							animationDuration: "0.8s"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-8 text-yellow-600 drop-shadow-sm" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-extrabold text-slate-800 tracking-tight",
							children: "Chapter Mastery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("px-3 py-1 text-sm font-bold rounded-full leading-none shadow-sm", grade === "A+" && "bg-gradient-to-r from-purple-500 to-indigo-500 text-white", grade === "A" && "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white", grade === "B" && "bg-blue-500 text-white", grade === "C" && "bg-slate-400 text-white"),
							children: ["Grade ", grade]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3 relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center p-4 rounded-[20px] bg-slate-50 border border-slate-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-5 text-blue-500 mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1",
									children: "Speed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-extrabold text-slate-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: wpm })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-slate-500",
										children: "WPM"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center p-4 rounded-[20px] bg-slate-50 border border-slate-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5 text-emerald-500 mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2",
									children: "Accuracy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-center justify-center size-[46px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircularProgress, {
										value: accuracy,
										size: 46,
										strokeWidth: 4,
										className: "absolute inset-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline font-extrabold text-slate-800 text-sm z-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: accuracy }), "%"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center justify-center p-4 rounded-[20px] bg-slate-50 border border-slate-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5 text-rose-500 mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1",
									children: "Errors"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-baseline gap-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl font-extrabold text-slate-800",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: errors })
									})
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex items-center justify-between p-4 rounded-[20px] border relative z-10 transition-colors", targetCompleted ? "bg-emerald-50 border-emerald-100" : "bg-orange-50 border-orange-100"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("flex size-10 rounded-full items-center justify-center", targetCompleted ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-500"),
							children: targetCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-bold text-slate-800",
							children: [
								"Target: ",
								20,
								" WPM"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("text-[13px] font-semibold", targetCompleted ? "text-emerald-600" : "text-orange-600"),
							children: targetCompleted ? "Target Completed!" : "Keep practicing to hit the target"
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-[20px] border border-indigo-100 relative z-10 animate-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-extrabold text-indigo-900",
						children: [
							"+",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: xp }),
							" XP Earned"
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2.5 mt-2 relative z-10",
					children: [
						nextLessonSlug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/practice",
							search: { lesson: nextLessonSlug },
							className: "w-full inline-flex justify-center items-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-bold text-white transition-all hover:scale-[1.02] shadow-md shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
							children: "Next Chapter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onPracticeAgain,
							className: "w-full inline-flex justify-center items-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Practice Again"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lessons",
							className: "w-full inline-flex justify-center items-center rounded-2xl px-6 py-3 text-[14px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors mt-1",
							children: "Back to Chapter List"
						})
					]
				})
			]
		})
	});
}
var HINDI_MAP = {
	"f": "ि",
	"j": "र",
	"d": "क",
	"k": "ा",
	"s": "े",
	"l": "स",
	"a": "ं",
	";": "य",
	"g": "ह",
	"h": "ी",
	"r": "त",
	"u": "न",
	"e": "म",
	"i": "प",
	"w": "ू",
	"o": "व",
	"q": "ु",
	"p": "च",
	"t": "ज",
	"y": "ल",
	"c": "ब",
	"n": "द",
	"x": "ग",
	"m": "उ",
	"v": "अ",
	"z": "्र",
	",": "ए",
	".": "ण्",
	"/": "ध्"
};
function TypingArena({ lessonSlug, text, title, subtitle, timeLimit, showKeyboard = true, isParagraphMode = false, onComplete }) {
	const chars = (0, import_react.useMemo)(() => Array.from(text), [text]);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [startedAt, setStartedAt] = (0, import_react.useState)(null);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const [isFocusMode, setIsFocusMode] = (0, import_react.useState)(false);
	const [showExitButton, setShowExitButton] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [errors, setErrors] = (0, import_react.useState)(0);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const completedRef = (0, import_react.useRef)(false);
	const lastActiveTimeRef = (0, import_react.useRef)(null);
	const mouseTimeoutRef = (0, import_react.useRef)(null);
	const cursorTimeoutRef = (0, import_react.useRef)(null);
	const { currentUser } = useAuth();
	const typedChars = (0, import_react.useMemo)(() => Array.from(typed), [typed]);
	const correctCount = typedChars.filter((c, i) => c === chars[i]).length;
	const totalAttempted = isParagraphMode ? typedChars.length : typedChars.length + errors;
	const accuracy = totalAttempted > 0 ? Math.max(0, Math.round(correctCount / totalAttempted * 100)) : 100;
	const minutes = Math.max(elapsed, 1) / 60;
	const wpm = startedAt !== null ? Math.max(0, Math.round(correctCount / 5 / minutes)) : 0;
	Math.min(100, Math.round(typedChars.length / chars.length * 100));
	timeLimit && Math.max(0, timeLimit - elapsed);
	const reset = (0, import_react.useCallback)(() => {
		setTyped("");
		setStartedAt(null);
		setIsPaused(false);
		setElapsed(0);
		setErrors(0);
		setFinished(false);
		completedRef.current = false;
		inputRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		reset();
		if (!lessonSlug || !currentUser) return;
		const savedStr = localStorage.getItem(`lesson_state_${currentUser}_${lessonSlug}`);
		if (savedStr) try {
			const saved = JSON.parse(savedStr);
			if (saved.typed && saved.typed.length > 0) if (saved.typed.length < text.length) setTyped(saved.typed);
			else setTyped("");
		} catch (e) {}
	}, [
		text,
		reset,
		lessonSlug,
		currentUser
	]);
	const togglePause = (0, import_react.useCallback)(() => {
		if (finished) return;
		if (startedAt === null) {
			setStartedAt(Date.now());
			inputRef.current?.focus();
			return;
		}
		setIsPaused((p) => {
			if (p) setTimeout(() => inputRef.current?.focus(), 10);
			return !p;
		});
	}, [startedAt, finished]);
	(0, import_react.useEffect)(() => {
		if (!isFocusMode) {
			setShowExitButton(false);
			return;
		}
		setShowExitButton(false);
		const handleMouseMove = () => {
			document.body.classList.remove("hide-cursor-active");
			if (cursorTimeoutRef.current) window.clearTimeout(cursorTimeoutRef.current);
			cursorTimeoutRef.current = window.setTimeout(() => {
				document.body.classList.add("hide-cursor-active");
			}, 2e3);
			setShowExitButton(true);
			if (mouseTimeoutRef.current) window.clearTimeout(mouseTimeoutRef.current);
			mouseTimeoutRef.current = window.setTimeout(() => {
				setShowExitButton(false);
			}, 2500);
		};
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setIsFocusMode(false);
		};
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("keydown", handleKeyDown);
		cursorTimeoutRef.current = window.setTimeout(() => {
			document.body.classList.add("hide-cursor-active");
		}, 2e3);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("keydown", handleKeyDown);
			document.body.classList.remove("focus-mode-active");
			document.body.classList.remove("hide-cursor-active");
			if (mouseTimeoutRef.current) window.clearTimeout(mouseTimeoutRef.current);
			if (cursorTimeoutRef.current) window.clearTimeout(cursorTimeoutRef.current);
		};
	}, [isFocusMode]);
	(0, import_react.useEffect)(() => {
		if (isFocusMode) document.body.classList.add("focus-mode-active");
		else document.body.classList.remove("focus-mode-active");
	}, [isFocusMode]);
	(0, import_react.useEffect)(() => {
		if (startedAt === null || finished || isPaused) {
			lastActiveTimeRef.current = null;
			return;
		}
		lastActiveTimeRef.current = Date.now();
		const id = window.setInterval(() => {
			const now = Date.now();
			if (lastActiveTimeRef.current !== null) {
				const delta = (now - lastActiveTimeRef.current) / 1e3;
				setElapsed((prev) => prev + delta);
				lastActiveTimeRef.current = now;
			}
		}, 100);
		return () => window.clearInterval(id);
	}, [
		startedAt,
		finished,
		isPaused
	]);
	(0, import_react.useEffect)(() => {
		if (finished || completedRef.current) return;
		const timeUp = timeLimit != null && elapsed >= timeLimit && startedAt !== null;
		const done = typedChars.length >= chars.length && chars.length > 0;
		if (timeUp || done) {
			completedRef.current = true;
			setFinished(true);
			if (currentUser) try {
				const key = "results_" + currentUser;
				const existing = JSON.parse(localStorage.getItem(key) || "[]");
				const date = /* @__PURE__ */ new Date();
				const dateString = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
				const grade = calculateGrade(wpm, accuracy, 20);
				const xp = calculateXP(wpm, accuracy, errors);
				const newResult = {
					date: dateString,
					lessonSlug: lessonSlug || "unknown",
					wpm,
					accuracy,
					errors,
					grade,
					xp
				};
				localStorage.setItem(key, JSON.stringify([newResult, ...existing].slice(0, 50)));
			} catch (e) {
				console.error("Failed to save result", e);
			}
			onComplete?.({
				wpm,
				accuracy,
				errors,
				seconds: elapsed
			});
		}
	}, [
		elapsed,
		timeLimit,
		typedChars.length,
		chars.length,
		finished,
		startedAt,
		wpm,
		accuracy,
		errors,
		onComplete,
		currentUser
	]);
	function handleChange(value) {
		if (finished) return;
		if (startedAt === null) setStartedAt(Date.now());
		if (isPaused) setIsPaused(false);
		const mappedValue = Array.from(value).map((ch) => HINDI_MAP[ch] || ch).join("");
		const next = Array.from(mappedValue).slice(0, chars.length);
		if (next.length < typedChars.length) return;
		if (next.length > typedChars.length) {
			const idx = next.length - 1;
			if (!isParagraphMode && next[idx] !== chars[idx]) {
				setErrors((e) => e + 1);
				return;
			}
			if (isParagraphMode && next[idx] !== chars[idx]) setErrors((e) => e + 1);
		}
		setTyped(next.join(""));
	}
	const nextChar = chars[typedChars.length];
	const currentLessonIndex = lessons.findIndex((l) => l.slug === lessonSlug);
	const nextLesson = currentLessonIndex !== -1 && currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;
	const words = (0, import_react.useMemo)(() => text.split(" "), [text]);
	const wordStartIndices = (0, import_react.useMemo)(() => {
		const starts = [];
		let curr = 0;
		for (let i = 0; i < words.length; i++) {
			starts.push(curr);
			curr += words[i].length + (i === words.length - 1 ? 0 : 1);
		}
		return starts;
	}, [words]);
	let currentWordIndex = 0;
	for (let i = 0; i < wordStartIndices.length; i++) if (typedChars.length >= wordStartIndices[i]) currentWordIndex = i;
	else break;
	const WORDS_PER_PAGE = 4;
	const startWordIdx = Math.floor(currentWordIndex / WORDS_PER_PAGE) * WORDS_PER_PAGE;
	const endWordIdx = Math.min(startWordIdx + WORDS_PER_PAGE, words.length);
	const visibleWords = words.slice(startWordIdx, endWordIdx);
	const pageStartCharIndex = wordStartIndices[startWordIdx];
	(0, import_react.useEffect)(() => {
		if (!lessonSlug || !currentUser) return;
		const totalUnits = isParagraphMode ? words.length : chars.length;
		const completedUnits = isParagraphMode ? currentWordIndex : typedChars.length;
		const currentProgress = totalUnits > 0 ? Math.min(100, Math.floor(completedUnits / totalUnits * 100)) : 0;
		const isCompleted = typedChars.length >= chars.length && chars.length > 0;
		const key = `lesson_state_${currentUser}_${lessonSlug}`;
		const existingStr = localStorage.getItem(key);
		let existing = {
			progress: 0,
			completed: false,
			bestWpm: 0,
			bestAccuracy: 0
		};
		if (existingStr) try {
			existing = JSON.parse(existingStr);
		} catch (e) {}
		const stateToSave = {
			...existing,
			typed,
			progress: Math.max(existing.progress || 0, isCompleted ? 100 : currentProgress),
			completed: existing.completed || isCompleted
		};
		localStorage.setItem(key, JSON.stringify(stateToSave));
		window.dispatchEvent(new Event("lessonProgressUpdated"));
	}, [
		typed,
		currentUser,
		lessonSlug,
		currentWordIndex,
		typedChars.length,
		chars.length,
		isParagraphMode,
		words.length
	]);
	let currentStreak = 0;
	for (let i = typedChars.length - 1; i >= 0; i--) if (typedChars[i] === chars[i]) currentStreak++;
	else break;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setIsFocusMode(false),
			className: cn("fixed top-6 right-6 z-50 rounded-full bg-secondary/80 backdrop-blur-md px-6 py-2.5 text-sm font-semibold text-foreground shadow-lg border border-border transition-all duration-300", isFocusMode && showExitButton ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"),
			children: "Exit Focus (ESC)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        body.focus-mode-active header, body.focus-mode-active footer {
          max-height: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          opacity: 0 !important;
          overflow: hidden !important;
          border: none !important;
          margin: 0 !important;
        }
        header, footer {
          transition: all 0.3s ease-in-out !important;
        }
        body.hide-cursor-active, body.hide-cursor-active * {
          cursor: none !important;
        }
      ` }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mx-auto w-[98%] max-w-[1300px] flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-4 transition-all duration-300", isFocusMode ? "items-center justify-center min-h-[85vh]" : "items-start min-h-0"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 w-full space-y-4 sm:space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative mx-auto w-full min-h-[140px] cursor-text rounded-3xl p-4 sm:p-6 bg-white/60 border border-white/60 shadow-sm backdrop-blur-xl transition-all duration-300 group overflow-hidden", isFocusMode ? "max-w-[1000px]" : "max-w-[850px]"),
						onClick: () => inputRef.current?.focus(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-y-4 sm:gap-y-5 w-full items-center overflow-x-auto custom-scrollbar p-2",
								children: (() => {
									if (isParagraphMode) {
										const _dependentVowels = /* @__PURE__ */ new Set([
											"ा",
											"ि",
											"ी",
											"ु",
											"ू",
											"े",
											"ै",
											"ो",
											"ौ",
											"ृ",
											"ं",
											"ँ",
											"ः",
											"्",
											"़"
										]);
										const _isDependentVowelSign = (s) => {
											if (!s || s.length === 0) return false;
											if (s.startsWith("ि") || s.startsWith("्")) return true;
											for (let i = 0; i < s.length; i++) if (_dependentVowels.has(s[i])) return true;
											return false;
										};
										const _buildDisplayOrder = (hindiParts) => {
											const order = [];
											const buffer = [];
											for (let ki = 0; ki < hindiParts.length; ki++) if (_isDependentVowelSign(hindiParts[ki]) && order.length === 0) buffer.push(ki);
											else {
												order.push(ki);
												if (!_isDependentVowelSign(hindiParts[ki])) {
													for (const bki of buffer) order.push(bki);
													buffer.length = 0;
												}
											}
											for (const bki of buffer) order.push(bki);
											return order;
										};
										let globalIndex = 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("w-full text-left font-hindi select-none flex flex-wrap gap-x-3 gap-y-2 px-2 transition-all duration-300", isFocusMode ? "text-[28px] sm:text-[32px] leading-[2.5]" : "text-2xl sm:text-[28px] leading-[2.2]"),
											children: words.map((word, wIdx) => {
												const isLastWordTotal = wIdx === words.length - 1;
												const wordChars = Array.from(word);
												const mappedChars = (isLastWordTotal ? wordChars : [...wordChars, " "]).map((ch, idxInWord) => {
													const i = globalIndex++;
													const typedCh = typedChars[i];
													return {
														ch,
														cIdx: idxInWord,
														isCurrent: i === typedChars.length,
														state: typedCh === void 0 ? "pending" : typedCh === ch ? "correct" : "wrong"
													};
												});
												const displayOrder = _buildDisplayOrder(mappedChars.map((m) => m.ch));
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "whitespace-pre",
													children: displayOrder.map((displayIdx) => {
														const { ch, cIdx, isCurrent, state } = mappedChars[displayIdx];
														return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("transition-colors duration-200", isCurrent && "text-[#F59E0B] underline decoration-2 underline-offset-4", state === "correct" && !isCurrent && "text-[#16A34A]", state === "wrong" && !isCurrent && "text-[#EF4444]", state === "pending" && !isCurrent && "text-[#94A3B8]"),
															children: ch
														}, cIdx);
													})
												}, wIdx);
											})
										});
									}
									let globalIndex = pageStartCharIndex;
									const rows = [];
									for (let i = 0; i < visibleWords.length; i += 2) rows.push(visibleWords.slice(i, i + 2));
									return rows.map((row, rIdx) => {
										const renderWord = (word, wIdxInRow) => {
											const isLastWordTotal = startWordIdx + rIdx * 2 + wIdxInRow === words.length - 1;
											const wordChars = Array.from(word);
											const charsWithSpace = isLastWordTotal ? wordChars : [...wordChars, " "];
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex gap-1.5 sm:gap-2 shrink-0",
												children: charsWithSpace.map((ch, cIdx) => {
													const i = globalIndex++;
													const typedCh = typedChars[i];
													const isCurrent = i === typedChars.length;
													const state = typedCh === void 0 ? "pending" : typedCh === ch ? "correct" : "wrong";
													const isSpace = ch === " ";
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: cn("flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 transition-all duration-300 shrink-0", isSpace ? isFocusMode ? "w-16 sm:w-20" : "w-14 sm:w-16" : isFocusMode ? "size-12 sm:size-14" : "size-11 sm:size-12", state === "pending" && !isCurrent && "border border-border/60 text-[#94A3B8]", isCurrent && "outline outline-[2.5px] outline-offset-[2.5px] outline-[#F59E0B] border-transparent z-10 shadow-[0_4px_14px_rgba(245,158,11,0.2)] text-[#F59E0B] scale-105", state === "correct" && !isCurrent && "border border-[#16A34A]/30 bg-[#16A34A]/5 text-[#16A34A]", state === "wrong" && !isCurrent && "border-2 border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444]"),
														children: isSpace ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("font-bold uppercase tracking-widest transition-all duration-300", isFocusMode ? "text-[10px] sm:text-[11px]" : "text-[9px] sm:text-[10px]", state === "pending" ? "text-[#94A3B8]" : state === "correct" ? "text-[#16A34A]/70" : state === "wrong" ? "text-[#EF4444]" : "text-[#F59E0B]"),
															children: "Space"
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("font-hindi font-bold transition-all duration-300", isFocusMode ? "text-2xl sm:text-[28px]" : "text-xl sm:text-2xl"),
															children: ch
														})
													}, cIdx);
												})
											}, wIdxInRow);
										};
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-row items-center justify-center w-max mx-auto px-2 shrink-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex shrink-0",
													children: row.length > 0 && renderWord(row[0], 0)
												}),
												row.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[60px] sm:w-[90px] shrink-0" }),
												row.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex shrink-0",
													children: renderWord(row[1], 1)
												})
											]
										}, rIdx);
									});
								})()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								ref: inputRef,
								value: typed,
								onChange: (e) => handleChange(e.target.value),
								onKeyDown: () => {
									if (isPaused) setIsPaused(false);
								},
								spellCheck: false,
								autoComplete: "off",
								autoCorrect: "off",
								autoCapitalize: "off",
								"aria-label": "Hindi typing input",
								className: "absolute inset-0 size-full resize-none rounded-3xl bg-transparent p-12 text-transparent caret-transparent outline-none z-10"
							}),
							!startedAt && !finished && !isPaused && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-background/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-md shadow-md border border-border",
									children: "Click anywhere to start typing"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("absolute inset-0 z-20 flex items-center justify-center rounded-3xl transition-all duration-200 pointer-events-none", isPaused && !finished ? "bg-primary/10 backdrop-blur-[2px] opacity-100" : "bg-primary/0 backdrop-blur-none opacity-0"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-[18px] sm:text-[20px] font-semibold text-primary drop-shadow-sm transition-all duration-200 animate-pulse", isPaused && !finished ? "scale-100 opacity-100" : "scale-95 opacity-0"),
									children: "⌨️ Press any key to resume"
								})
							}),
							finished && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChapterMasteryModal, {
								wpm,
								accuracy,
								errors,
								nextLessonSlug: nextLesson?.slug,
								onPracticeAgain: reset
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("mx-auto w-full max-w-[850px] transition-all duration-300 ease-in-out", isFocusMode ? "h-0 opacity-0 overflow-hidden m-0 p-0" : "pt-2 h-auto opacity-100"),
						children: showKeyboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HindiKeyboard, { nextChar })
					})]
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("shrink-0 transition-all duration-300 ease-in-out", isFocusMode ? "w-0 h-0 opacity-0 overflow-hidden m-0 p-0" : "w-full lg:w-[320px] space-y-4 sm:space-y-6 mt-6 lg:mt-0 opacity-100"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-secondary/30 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border/40 flex flex-col gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-semibold tracking-tight text-foreground",
								children: "Live Session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background rounded-2xl p-4 shadow-sm border border-border/40 flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider",
											children: "Speed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[28px] font-semibold tracking-tight text-primary",
												children: wpm
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[13px] font-semibold text-muted-foreground",
												children: "WPM"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background rounded-2xl p-4 shadow-sm border border-border/40 flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider",
											children: "Accuracy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[28px] font-semibold tracking-tight text-success",
												children: accuracy
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[13px] font-semibold text-muted-foreground",
												children: "%"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background rounded-2xl p-4 shadow-sm border border-border/40 flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider",
											children: "Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[22px] font-semibold tracking-tight text-foreground",
												children: formatTime(elapsed)
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background rounded-2xl p-4 shadow-sm border border-border/40 flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider",
											children: "Streak"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[22px] font-semibold tracking-tight text-orange-500",
												children: currentStreak
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[20px]",
												children: "🔥"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: togglePause,
								disabled: finished,
								className: cn("w-full hover:bg-black text-white rounded-xl py-4 flex items-center justify-center gap-2 font-semibold transition-colors shadow-sm", isPaused ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-[#1a1b1e]", finished && "opacity-50 cursor-not-allowed"),
								children: [finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }) : isPaused || startedAt === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1 items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-3.5 bg-white/90 rounded-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-3.5 bg-white/90 rounded-sm" })]
								}), finished ? "Session Complete" : startedAt === null ? "Start Session" : isPaused ? "Resume Session" : "Pause Session"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setIsFocusMode(true),
						className: "bg-background rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border/40 flex items-center justify-between cursor-pointer hover:bg-secondary/20 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-sm text-foreground",
								children: "Focus Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground font-medium",
								children: "Hide all UI distractions"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-11 h-6 bg-secondary/80 rounded-full relative shadow-inner border border-border/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 bg-muted-foreground/50 rounded-full absolute left-1 top-1 transition-all" })
						})]
					})]
				})
			]
		})
	] });
}
function formatTime(total) {
	const t = Math.floor(total);
	const m = Math.floor(t / 60);
	const s = t % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}
//#endregion
export { TypingArena as t };
