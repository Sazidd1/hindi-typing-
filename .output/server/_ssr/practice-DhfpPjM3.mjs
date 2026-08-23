import { i as __toESM } from "../_runtime.mjs";
import { l as require_react_dom, u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as keyboardRows, r as lessons, t as HINDI_MAP } from "./typing-data-D0Th4K6Z.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as CircleX, M as CircleCheckBig, f as RotateCcw, i as TriangleAlert, j as CircleCheck, o as Target, p as Play, r as Trophy, t as Zap } from "../_libs/lucide-react.mjs";
import { r as validateSession } from "./scoring-C2r0ix1P.mjs";
import { t as Route } from "./practice-CZyeiKV_.mjs";
import { t as HindiKeyboard } from "./HindiKeyboard-DGIBPTxP.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-DhfpPjM3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function AnimatedCounter({ value, duration = 1e3 }) {
	const safeValue = Number.isFinite(value) ? value : 0;
	const [count, setCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let startTime = null;
		let animationFrame;
		const animate = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			setCount(Math.floor(easeOutQuart * safeValue));
			if (progress < 1) animationFrame = requestAnimationFrame(animate);
			else setCount(safeValue);
		};
		animationFrame = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrame);
	}, [safeValue, duration]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Number.isFinite(count) ? count : 0 });
}
function CircularProgress({ value, size = 64, strokeWidth = 6, className }) {
	const safeValue = Number.isFinite(value) ? value : 0;
	const [progress, setProgress] = (0, import_react.useState)(0);
	const radius = (size - strokeWidth) / 2;
	const circumference = radius * 2 * Math.PI;
	const strokeDashoffset = circumference - progress / 100 * circumference;
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => setProgress(safeValue), 100);
		return () => clearTimeout(timer);
	}, [safeValue]);
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
function ChapterMasteryModal({ wpm, accuracy, errors, isValid, grade, xp, nextLessonSlug, onPracticeAgain }) {
	const safeWpm = Number.isFinite(wpm) ? wpm : 0;
	const safeAccuracy = Number.isFinite(accuracy) ? accuracy : 0;
	const safeErrors = Number.isFinite(errors) ? errors : 0;
	const targetCompleted = isValid && safeWpm >= 20 && safeAccuracy >= 70;
	const modalContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			position: "fixed",
			inset: 0,
			zIndex: 9999,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "rgba(15, 23, 42, 0.12)"
		},
		className: "animate-in fade-in duration-300",
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
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-extrabold text-slate-800 tracking-tight",
								children: "Lesson Mastery"
							}),
							grade && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("px-3 py-1 text-sm font-bold rounded-full leading-none shadow-sm", grade === "A+" && "bg-gradient-to-r from-purple-500 to-indigo-500 text-white", grade === "A" && "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white", grade === "B" && "bg-blue-500 text-white", grade === "C" && "bg-slate-400 text-white"),
								children: ["Grade ", grade]
							}),
							!isValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 text-sm font-bold rounded-full leading-none shadow-sm bg-rose-500 text-white",
								children: "Invalid"
							})
						]
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
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: safeWpm })
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
										value: safeAccuracy,
										size: 46,
										strokeWidth: 4,
										className: "absolute inset-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline font-extrabold text-slate-800 text-sm z-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: safeAccuracy }), "%"]
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
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCounter, { value: safeErrors })
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
							children: targetCompleted ? "Target Completed!" : !isValid ? "Session Invalid. Too short or too many mistakes." : "Keep practicing to hit the target"
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
						nextLessonSlug && isValid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/practice",
							search: { lesson: nextLessonSlug },
							className: "w-full inline-flex justify-center items-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-bold text-white transition-all hover:scale-[1.02] shadow-md shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500",
							children: "Next Lesson"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onPracticeAgain,
							className: "w-full inline-flex justify-center items-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Practice Again"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lessons",
							className: "w-full inline-flex justify-center items-center rounded-2xl px-6 py-3 text-[14px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors mt-1",
							children: "Back to Lesson List"
						})
					]
				})
			]
		})
	});
	if (typeof document === "undefined") return null;
	return (0, import_react_dom.createPortal)(modalContent, document.body);
}
var multiCharTokens = Array.from(new Set(keyboardRows.flatMap((row) => row.flatMap((key) => {
	const tokens = [];
	if (key.hi && Array.from(key.hi).length > 1) tokens.push(key.hi);
	if (key.shift && Array.from(key.shift).length > 1) tokens.push(key.shift);
	return tokens;
})))).sort((a, b) => b.length - a.length);
function tokenizeHindi(text) {
	const tokens = [];
	let remaining = text;
	while (remaining.length > 0) {
		let matched = false;
		for (const token of multiCharTokens) if (remaining.startsWith(token)) {
			tokens.push(token);
			remaining = remaining.slice(token.length);
			matched = true;
			break;
		}
		if (!matched) {
			const char = Array.from(remaining)[0];
			if (!char) break;
			tokens.push(char);
			remaining = remaining.slice(char.length);
		}
	}
	return tokens;
}
function TypingArena({ lessonSlug, text, title, subtitle, timeLimit, showKeyboard = true, isParagraphMode = false, onComplete }) {
	const isWordPractice = [
		"ch11",
		"ch22",
		"ch23",
		"ch24",
		"ch35",
		"ch36",
		"ch37"
	].includes(lessonSlug || "");
	const isInfiniteMode = !isWordPractice && !!lessonSlug;
	const [dynamicText, setDynamicText] = (0, import_react.useState)(text);
	(0, import_react.useEffect)(() => {
		setDynamicText(text);
	}, [text, lessonSlug]);
	const normalizedText = (0, import_react.useMemo)(() => dynamicText.trim(), [dynamicText]);
	const chars = (0, import_react.useMemo)(() => tokenizeHindi(normalizedText), [normalizedText]);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [startedAt, setStartedAt] = (0, import_react.useState)(null);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const [isFocusMode, setIsFocusMode] = (0, import_react.useState)(false);
	const [showExitButton, setShowExitButton] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [errors, setErrors] = (0, import_react.useState)(0);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const [forceFinish, setForceFinish] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const activeWordRef = (0, import_react.useRef)(null);
	const completedRef = (0, import_react.useRef)(false);
	const lastActiveTimeRef = (0, import_react.useRef)(null);
	const mouseTimeoutRef = (0, import_react.useRef)(null);
	const cursorTimeoutRef = (0, import_react.useRef)(null);
	const charMistakesRef = (0, import_react.useRef)({});
	const { currentUser } = useAuth();
	const [keyboardPreset, setKeyboardPreset] = (0, import_react.useState)("Color Zones");
	(0, import_react.useEffect)(() => {
		const updatePreset = () => {
			let savedPreset = localStorage.getItem("settings_keyboard_preset");
			if (savedPreset === "Default") {
				savedPreset = "Classic Glass";
				localStorage.setItem("settings_keyboard_preset", "Classic Glass");
			}
			setKeyboardPreset(savedPreset || "Color Zones");
		};
		updatePreset();
		window.addEventListener("keyboardPresetUpdated", updatePreset);
		return () => window.removeEventListener("keyboardPresetUpdated", updatePreset);
	}, []);
	const typedChars = (0, import_react.useMemo)(() => tokenizeHindi(typed), [typed]);
	const validation = validateSession(typedChars, chars, elapsed, errors, !!isParagraphMode);
	const { wpm, accuracy, correctCharacters, totalAttempted } = validation;
	isInfiniteMode && timeLimit ? Math.min(100, Math.round(elapsed / timeLimit * 100)) : Math.min(100, Math.round(typedChars.length / chars.length * 100));
	timeLimit && Math.max(0, timeLimit - elapsed);
	const reset = (0, import_react.useCallback)(() => {
		setTyped("");
		setStartedAt(null);
		setIsPaused(false);
		setElapsed(0);
		setErrors(0);
		setFinished(false);
		completedRef.current = false;
		charMistakesRef.current = {};
		inputRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		reset();
		if (!lessonSlug || !currentUser) return;
		const savedStr = localStorage.getItem(`lesson_state_${currentUser}_${lessonSlug}`);
		if (savedStr) try {
			const saved = JSON.parse(savedStr);
			if (saved.typed && saved.typed.length > 0) if (saved.typed.length < text.length) {
				setTyped(saved.typed);
				if (saved.elapsed) setElapsed(saved.elapsed);
				if (saved.errors) setErrors(saved.errors);
			} else {
				setTyped("");
				setElapsed(0);
				setErrors(0);
			}
		} catch (e) {}
	}, [
		text,
		reset,
		lessonSlug,
		currentUser
	]);
	(0, import_react.useEffect)(() => {
		if (isInfiniteMode && startedAt !== null && !finished) {
			if (chars.length - typedChars.length < 150) {
				const activeLesson = lessons.find((l) => l.slug === lessonSlug);
				if (activeLesson) {
					const tokens = tokenizeHindi(activeLesson.text.replace(/\s+/g, ""));
					const pool = Array.from(new Set(tokens));
					let newWords = [];
					for (let i = 0; i < 40; i++) {
						let w = "";
						for (let j = 0; j < 5; j++) w += pool[Math.floor(Math.random() * pool.length)];
						newWords.push(w);
					}
					setDynamicText((prev) => prev + " " + newWords.join(" "));
				}
			}
		}
	}, [
		typedChars.length,
		chars.length,
		isInfiniteMode,
		startedAt,
		finished,
		lessonSlug
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
		const done = isInfiniteMode ? false : typedChars.length >= chars.length && chars.length > 0;
		if (timeUp || done || forceFinish) {
			const finalValidation = validateSession(typedChars, chars, elapsed, errors, !!isParagraphMode);
			completedRef.current = true;
			setFinished(true);
			if (currentUser && finalValidation.isValid) try {
				const key = "results_" + currentUser;
				const existing = JSON.parse(localStorage.getItem(key) || "[]");
				const date = /* @__PURE__ */ new Date();
				const newResult = {
					date: `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`,
					lessonSlug: lessonSlug || "unknown",
					wpm: finalValidation.wpm,
					accuracy: finalValidation.accuracy,
					errors,
					grade: finalValidation.grade,
					xp: finalValidation.xp,
					charMistakes: charMistakesRef.current,
					elapsedSeconds: elapsed
				};
				let updatedResults = [newResult, ...existing];
				if (lessonSlug) {
					const bonusKey = `lesson_completion_bonus_${currentUser}_${lessonSlug}`;
					if (localStorage.getItem(bonusKey) !== "true") {
						localStorage.setItem(bonusKey, "true");
						newResult.xp += 100;
						finalValidation.xp += 100;
						toast.success("+100 XP 🎉", { description: "Lesson Complete!" });
						window.dispatchEvent(new Event("xpUpdated"));
					}
				}
				localStorage.setItem(key, JSON.stringify(updatedResults.slice(0, 50)));
			} catch (e) {
				console.error("Failed to save result", e);
			}
			onComplete?.({
				wpm: finalValidation.wpm,
				accuracy: finalValidation.accuracy,
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
		currentUser,
		forceFinish,
		isInfiniteMode
	]);
	function handleChange(value) {
		if (finished) return;
		if (startedAt === null) setStartedAt(Date.now());
		if (isPaused) setIsPaused(false);
		let mappedValue = value;
		if (value.startsWith(typed) && value.length > typed.length) {
			const added = value.slice(typed.length);
			const mappedAdded = Array.from(added).map((ch) => HINDI_MAP[ch] || ch).join("");
			mappedValue = typed + mappedAdded;
		} else if (value.length < typed.length) return;
		else mappedValue = Array.from(value).map((ch) => HINDI_MAP[ch] || ch).join("");
		const next = tokenizeHindi(mappedValue).slice(0, chars.length);
		let newErrors = 0;
		let hasError = false;
		for (let i = 0; i < next.length; i++) if (next[i] !== chars[i]) {
			hasError = true;
			if (i >= typedChars.length || typedChars[i] === chars[i]) {
				newErrors++;
				const targetChar = chars[i];
				if (targetChar && targetChar !== " ") charMistakesRef.current[targetChar] = (charMistakesRef.current[targetChar] || 0) + 1;
			}
		}
		if (newErrors > 0) setErrors((e) => e + newErrors);
		if (hasError && !isParagraphMode) return;
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
			const w = words[i];
			if (w !== void 0) curr += w.length + 1;
		}
		return starts;
	}, [words]);
	let currentWordIndex = 0;
	for (let i = 0; i < wordStartIndices.length; i++) {
		const startIdx = wordStartIndices[i];
		if (startIdx !== void 0 && typedChars.length >= startIdx) currentWordIndex = i;
		else break;
	}
	(0, import_react.useEffect)(() => {
		if (isParagraphMode && activeWordRef.current) activeWordRef.current.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	}, [currentWordIndex, isParagraphMode]);
	const WORDS_PER_PAGE = 4;
	const startWordIdx = Math.floor(currentWordIndex / WORDS_PER_PAGE) * WORDS_PER_PAGE;
	const endWordIdx = Math.min(startWordIdx + WORDS_PER_PAGE, words.length);
	const visibleWords = words.slice(startWordIdx, endWordIdx);
	const pageStartCharIndex = wordStartIndices[startWordIdx] ?? 0;
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
			elapsed,
			errors,
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
			className: cn("mx-auto w-[98%] max-w-[1350px] flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-4 transition-all duration-300", isFocusMode ? "items-center justify-center min-h-[85vh]" : cn("items-start min-h-0", isWordPractice ? "-mt-6 sm:-mt-8" : "-mt-4 sm:-mt-6")),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col flex-1 w-full gap-0",
					children: [
						!isFocusMode && (title || subtitle) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-slate-900 dark:text-[#F4F7FB] text-center font-bold text-2xl sm:text-3xl leading-tight px-2 mt-0 mb-0 relative z-10",
							children: [
								title,
								" ",
								subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-hindi text-gray-500 dark:text-[#8FA2BC]",
									children: [
										"( ",
										subtitle,
										" )"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col w-full gap-6 sm:gap-8 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("relative mx-auto w-full cursor-text rounded-[24px] py-2 px-6 sm:py-3 sm:px-8 flex items-center justify-center bg-card/80 dark:bg-[linear-gradient(145deg,#101F34,#0D1A2D)] border border-border/60 dark:border-[rgba(255,255,255,0.09)] shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 group overflow-hidden shrink-0", isFocusMode && [
									"ch-full-practice",
									"ch-full-practice-2",
									"ch-full-practice-3",
									"ch-story-practice-1",
									"ch-story-practice-2",
									"ch-news-practice",
									"ch-dialogue-practice",
									"ch-adventure-story"
								].includes(lessonSlug || "") ? "h-[220px] sm:h-[240px]" : "h-[170px] sm:h-[190px]", isFocusMode ? "max-w-[1100px]" : "max-w-[1000px]"),
								onClick: () => inputRef.current?.focus(),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("flex flex-col w-full h-full items-center overflow-y-auto overflow-x-hidden custom-scrollbar", isParagraphMode ? "justify-start pt-4 sm:pt-6 pb-8" : "justify-center"),
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
													if (s === "ि") return true;
													return _dependentVowels.has(s[0] ?? "");
												};
												const _buildDisplayOrder = (hindiParts) => {
													const order = [];
													const buffer = [];
													for (let ki = 0; ki < hindiParts.length; ki++) {
														const part = hindiParts[ki];
														if (part !== void 0 && _isDependentVowelSign(part) && order.length === 0) buffer.push(ki);
														else {
															order.push(ki);
															if (part !== void 0 && !_isDependentVowelSign(part)) {
																for (const bki of buffer) order.push(bki);
																buffer.length = 0;
															}
														}
													}
													for (const bki of buffer) order.push(bki);
													return order;
												};
												let globalIndex = 0;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: cn("w-full text-left font-hindi select-none flex flex-wrap gap-y-2 px-2 transition-all duration-300", isFocusMode ? [
														"ch-full-practice",
														"ch-full-practice-2",
														"ch-full-practice-3",
														"ch-story-practice-1",
														"ch-story-practice-2",
														"ch-news-practice",
														"ch-dialogue-practice",
														"ch-adventure-story"
													].includes(lessonSlug || "") ? "text-[28px] sm:text-[32px] leading-[1.8]" : "text-[28px] sm:text-[32px] leading-[2.5]" : "text-2xl sm:text-[28px] leading-[2.2]"),
													children: words.map((word, wIdx) => {
														const mappedChars = [...tokenizeHindi(word), " "].map((ch, idxInWord) => {
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
															ref: wIdx === currentWordIndex ? activeWordRef : null,
															children: displayOrder.map((displayIdx) => {
																const mappedChar = mappedChars[displayIdx];
																if (!mappedChar) return null;
																const { ch, cIdx, isCurrent, state } = mappedChar;
																return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: cn("transition-colors duration-200", ch === " " && "inline-block w-[0.5em]", isCurrent && "text-[#F59E0B] dark:text-[#F7C843] underline decoration-2 underline-offset-4", state === "correct" && !isCurrent && "text-[#16A34A] dark:text-[#12B76A]", state === "wrong" && !isCurrent && "text-[#EF4444] dark:text-[#F04452]", state === "pending" && !isCurrent && "text-[#94A3B8] dark:text-[#9AAAC0]"),
																	children: ch
																}, cIdx);
															})
														}, wIdx);
													})
												});
											}
											let globalIndex = pageStartCharIndex;
											const renderWord = (word, wIdxInPage, isLastWordInText) => {
												const wordChars = tokenizeHindi(word);
												const charsWithSpace = isLastWordInText ? wordChars : [...wordChars, " "];
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-1.5 sm:gap-2 shrink-0",
													children: charsWithSpace.map((ch, cIdx) => {
														const i = globalIndex++;
														const typedCh = typedChars[i];
														const isCurrent = i === typedChars.length;
														const state = typedCh === void 0 ? "pending" : typedCh === ch ? "correct" : "wrong";
														const isSpace = ch === " ";
														return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: cn("flex items-center justify-center rounded-xl bg-card dark:bg-[#1C304A] shadow-sm border border-border/50 dark:border-[rgba(255,255,255,0.05)] transition-all duration-300 shrink-0", isSpace ? isFocusMode ? "w-16 sm:w-20" : "w-14 sm:w-16" : isFocusMode ? "size-12 sm:size-14" : "size-11 sm:size-12", state === "pending" && !isCurrent && "border border-border/60 text-[#94A3B8] dark:text-[#9AAAC0]", isCurrent && "outline outline-[2.5px] outline-offset-[2.5px] outline-[#F59E0B] dark:outline-[#F7C843] border-transparent z-10 shadow-[0_4px_14px_rgba(245,158,11,0.2)] dark:shadow-[0_4px_14px_rgba(247,200,67,0.25)] text-[#F59E0B] dark:text-[#F7C843] scale-105", state === "correct" && !isCurrent && "border border-[#16A34A]/30 dark:border-[#12B76A]/30 bg-[#16A34A]/8 dark:bg-[#12B76A]/8 text-[#16A34A] dark:text-[#12B76A]", state === "wrong" && !isCurrent && "border-2 border-[#EF4444] dark:border-[#F04452] bg-[#EF4444]/10 dark:bg-[#F04452]/10 text-[#EF4444] dark:text-[#F04452]"),
															children: isSpace ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: cn("font-bold uppercase tracking-widest transition-all duration-300", isFocusMode ? "text-[10px] sm:text-[11px]" : "text-[9px] sm:text-[10px]", state === "pending" ? "text-[#94A3B8] dark:text-[#9AAAC0]" : state === "correct" ? "text-[#16A34A]/70 dark:text-[#12B76A]/70" : state === "wrong" ? "text-[#EF4444] dark:text-[#F04452]" : "text-[#F59E0B] dark:text-[#F7C843]"),
																children: "Space"
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: cn("font-hindi font-bold transition-all duration-300", isFocusMode ? "text-2xl sm:text-[28px]" : "text-xl sm:text-2xl"),
																children: ch
															})
														}, cIdx);
													})
												});
											};
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-2 gap-x-10 sm:gap-x-16 gap-y-5 sm:gap-y-7 w-max mx-auto px-2",
												children: visibleWords.map((word, wIdx) => {
													const absoluteWIdx = startWordIdx + wIdx;
													const isLastWordInText = absoluteWIdx === words.length - 1;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex justify-start shrink-0",
														children: renderWord(word, absoluteWIdx, isLastWordInText)
													}, wIdx);
												})
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
										isValid: validation.isValid,
										grade: validation.grade,
										xp: validation.xp,
										nextLessonSlug: nextLesson?.slug,
										onPracticeAgain: reset
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("mx-auto w-full transition-all duration-300 ease-in-out", isFocusMode ? "h-0 max-w-[1050px] opacity-0 overflow-hidden m-0 p-0" : "h-auto max-w-[850px] opacity-100 -mt-2 sm:-mt-4"),
								children: showKeyboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HindiKeyboard, {
									nextChar,
									preset: keyboardPreset
								})
							})]
						}),
						" "
					]
				}),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("shrink-0 transition-all duration-300 ease-in-out", isFocusMode ? "w-0 h-0 opacity-0 overflow-hidden m-0 p-0" : "w-full lg:w-[30%] lg:max-w-[320px] lg:min-w-[280px] space-y-4 sm:space-y-6 mt-6 lg:mt-0 opacity-100"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card/60 dark:bg-[linear-gradient(145deg,#101F34,#0D1A2D)] rounded-[24px] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] border border-border/40 dark:border-[rgba(255,255,255,0.09)] flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-semibold tracking-tight text-foreground dark:text-[#F4F7FB]",
								children: "Live Session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background/80 dark:bg-[#071426] rounded-[20px] p-4 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground dark:text-[#8FA2BC] uppercase tracking-wider",
											children: "Speed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[28px] font-semibold tracking-tight text-primary dark:text-[#4B8BFF]",
												children: wpm
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[13px] font-semibold text-muted-foreground dark:text-[#8FA2BC]",
												children: "WPM"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background/80 dark:bg-[#071426] rounded-[20px] p-4 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground dark:text-[#8FA2BC] uppercase tracking-wider",
											children: "Accuracy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[28px] font-semibold tracking-tight text-success dark:text-[#12B76A]",
												children: accuracy
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[13px] font-semibold text-muted-foreground dark:text-[#8FA2BC]",
												children: "%"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background/80 dark:bg-[#071426] rounded-[20px] p-4 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground dark:text-[#8FA2BC] uppercase tracking-wider",
											children: "Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[22px] font-semibold tracking-tight text-foreground dark:text-[#F4F7FB]",
												children: formatTime(elapsed)
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-background/80 dark:bg-[#071426] rounded-[20px] p-4 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold text-muted-foreground dark:text-[#8FA2BC] uppercase tracking-wider",
											children: "Streak"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[22px] font-semibold tracking-tight text-orange-500 dark:text-[#F7C843]",
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
								className: cn("w-full text-white rounded-[14px] py-4 flex items-center justify-center gap-2 font-semibold transition-colors shadow-sm h-[56px]", isPaused ? "bg-primary/80 hover:bg-primary text-white" : "bg-primary hover:bg-primary/90 dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8]", finished && "opacity-50 cursor-not-allowed"),
								children: [finished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }) : isPaused || startedAt === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1 items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-3.5 bg-white/90 rounded-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-3.5 bg-white/90 rounded-sm" })]
								}), finished ? "Session Complete" : startedAt === null ? "Start Session" : isPaused ? "Resume Session" : "Pause Session"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setForceFinish(true),
								disabled: finished || startedAt === null,
								className: cn("w-full text-foreground rounded-[14px] py-4 flex items-center justify-center gap-2 font-semibold transition-colors shadow-sm h-[56px] border border-border/40", "bg-secondary/30 hover:bg-secondary/50 dark:bg-[#071426] dark:hover:bg-[#1C304A]", (finished || startedAt === null) && "opacity-50 cursor-not-allowed"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-4" }), "Submit Session"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => setIsFocusMode(true),
						className: "bg-background/80 dark:bg-[linear-gradient(145deg,#101F34,#0D1A2D)] rounded-[24px] p-5 sm:p-6 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.09)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.18)] flex items-center justify-between cursor-pointer hover:bg-secondary/30 dark:hover:bg-[#1C304A] transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-sm text-foreground dark:text-[#F4F7FB]",
								children: "Focus Mode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground dark:text-[#71839B] font-medium",
								children: "Hide distractions"
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
var DICTIONARY$1 = [
	"भारत",
	"देश",
	"मेरा",
	"महान",
	"राम",
	"सीता",
	"लक्ष्मण",
	"हनुमान",
	"कृष्ण",
	"राधा",
	"गीता",
	"ज्ञान",
	"विज्ञान",
	"सत्य",
	"धर्म",
	"कर्म",
	"शांति",
	"प्रेम",
	"करुणा",
	"दया",
	"क्षमा",
	"विद्या",
	"बुद्धि",
	"शक्ति",
	"साहस",
	"पराक्रम",
	"शौर्य",
	"वीर",
	"योद्धा",
	"राजा",
	"रानी",
	"राजकुमार",
	"राजकुमारी",
	"प्रजा",
	"नगर",
	"ग्राम",
	"शहर",
	"वन",
	"पर्वत",
	"नदी",
	"समुद्र",
	"आकाश",
	"पृथ्वी",
	"सूर्य",
	"चंद्र",
	"तारा",
	"ग्रह",
	"नक्षत्र",
	"वायु",
	"अग्नि",
	"जल",
	"मिट्टी",
	"वृक्ष",
	"फूल",
	"फल",
	"पशु",
	"पक्षी",
	"गाय",
	"कुत्ता",
	"बिल्ली",
	"घोड़ा",
	"हाथी",
	"शेर",
	"बाघ",
	"भालू",
	"हिरण",
	"मोर",
	"कबूतर",
	"कौआ",
	"चिड़िया",
	"मछली",
	"सांप",
	"मेंढक",
	"कीट",
	"तितली",
	"मकड़ी",
	"चींटी",
	"मक्खी",
	"मच्छर",
	"घर",
	"द्वार",
	"खिड़की",
	"छत",
	"दीवार",
	"फर्श",
	"आंगन",
	"कमरा",
	"रसोई",
	"स्नानघर",
	"शौचालय",
	"शयनकक्ष",
	"बैठक",
	"भोजन",
	"पानी",
	"दूध",
	"दही",
	"मक्खन",
	"घी",
	"तेल",
	"नमक",
	"चीनी",
	"गुड़",
	"मिठाई",
	"रोटी",
	"दाल",
	"चावल",
	"सब्जी",
	"फल",
	"मांस",
	"अंडा",
	"मछली",
	"चाय",
	"कॉफी",
	"शरबत",
	"पुस्तक",
	"कलम",
	"कागज",
	"स्याही",
	"दवात",
	"स्लेट",
	"पेंसिल",
	"रबड़",
	"स्कूल",
	"कॉलेज",
	"विश्वविद्यालय",
	"शिक्षक",
	"छात्र",
	"कक्षा",
	"परीक्षा",
	"परिणाम",
	"सफलता",
	"असफलता",
	"खेल",
	"मैदान",
	"गेंद",
	"बल्ला",
	"हॉकी",
	"फुटबॉल",
	"क्रिकेट",
	"टेनिस",
	"बैडमिंटन",
	"तैराकी",
	"दौड़",
	"कूद",
	"संगीत",
	"गीत",
	"वाद्ययंत्र",
	"नृत्य",
	"नाटक",
	"सिनेमा",
	"कला",
	"चित्रकला",
	"मूर्तिकला",
	"वास्तुकला",
	"विज्ञान",
	"गणित",
	"इतिहास",
	"भूगोल",
	"राजनीति",
	"अर्थशास्त्र",
	"समाजशास्त्र",
	"मनोविज्ञान",
	"दर्शनशास्त्र",
	"भाषा",
	"साहित्य",
	"कविता",
	"कहानी",
	"उपन्यास",
	"निबंध",
	"नाटक",
	"समाचार",
	"पत्र",
	"पत्रिका",
	"रेडियो",
	"टेलीविजन",
	"कंप्यूटर",
	"इंटरनेट",
	"मोबाइल",
	"फोन",
	"कैमरा",
	"घड़ी",
	"चश्मा",
	"कपड़े",
	"जूते",
	"टोपी",
	"मोज़े",
	"दस्ताने",
	"छाता",
	"बारिश",
	"धूप",
	"गर्मी",
	"सर्दी",
	"वसंत",
	"पतझड़",
	"मौसम",
	"जलवायु",
	"प्रकृति",
	"पर्यावरण",
	"प्रदूषण",
	"स्वच्छता",
	"स्वास्थ्य",
	"बीमारी",
	"दवा",
	"अस्पताल",
	"डॉक्टर",
	"नर्स",
	"मरीज",
	"उपचार",
	"ऑपरेशन",
	"एम्बुलेंस",
	"पुलिस",
	"चोर",
	"डाकू",
	"सिपाही",
	"बंदूक",
	"तलवार",
	"ढाल",
	"भाला",
	"तीर",
	"कमान",
	"युद्ध",
	"शांति",
	"समझौता",
	"संधि",
	"न्याय",
	"अन्याय",
	"कानून",
	"अदालत",
	"जज",
	"वकील",
	"अपराधी",
	"जेल",
	"दंड",
	"जुर्माना",
	"क्षमा",
	"दया",
	"प्रेम",
	"घृणा",
	"क्रोध",
	"लोभ",
	"मोह",
	"अहंकार",
	"काम",
	"क्रोध",
	"मद",
	"लोभ",
	"मत्सर",
	"ईर्ष्या",
	"द्वेष",
	"छल",
	"कपट",
	"झूठ",
	"सच",
	"ईमानदारी",
	"बेईमानी",
	"साहस",
	"कायरता",
	"वीरता",
	"डर",
	"भय",
	"आतंक",
	"साहस",
	"हिम्मत",
	"धैर्य",
	"जल्दबाजी",
	"शांति",
	"अशांति",
	"सुख",
	"दुख",
	"आनंद",
	"शोक",
	"खुशी",
	"गम",
	"हंसी",
	"रोना",
	"मुस्कान",
	"आंसू",
	"जीवन",
	"मृत्यु",
	"जन्म",
	"मरण",
	"यौवन",
	"बुढ़ापा",
	"बचपन",
	"जवानी",
	"लड़कपन",
	"खेलकूद",
	"पढ़ाई",
	"लिखाई",
	"काम",
	"काज",
	"रोजगार",
	"व्यापार",
	"व्यवसाय",
	"उद्योग",
	"कृषि",
	"खेती",
	"किसानी",
	"मजदूर",
	"मालिक",
	"नौकर",
	"स्वामी",
	"दास",
	"स्वतंत्र",
	"परतंत्र",
	"आजाद",
	"गुलाम",
	"स्वतंत्रता",
	"गुलामी",
	"आजादी",
	"दास्ता",
	"अधिकार",
	"कर्तव्य",
	"धर्म",
	"अधर्म",
	"पाप",
	"पुण्य",
	"स्वर्ग",
	"नर्क",
	"देव",
	"दानव",
	"यक्ष",
	"गंधर्व",
	"किन्नर",
	"नाग",
	"असुर",
	"सुर",
	"मुनि",
	"ऋषि",
	"तपस्वी",
	"संन्यासी",
	"साधु",
	"संत",
	"भक्त",
	"भगवान",
	"ईश्वर",
	"अल्लाह",
	"गॉड",
	"खुदा",
	"रब",
	"मालिक",
	"पालनहार",
	"सिरजनहार",
	"रचयिता",
	"स्रष्टा",
	"ब्रह्मांड",
	"विश्व",
	"दुनिया",
	"जगत",
	"संसार",
	"धरती",
	"आसमान",
	"पाताल",
	"लोक",
	"परलोक",
	"स्वर्ग",
	"नर्क",
	"बैकुंठ",
	"कैलाश",
	"गोलोक",
	"साकेत",
	"अयोध्या",
	"मथुरा",
	"वृंदावन",
	"द्वारका",
	"काशी",
	"प्रयाग",
	"हरिद्वार",
	"ऋषिकेश",
	"बद्रीनाथ",
	"केदारनाथ",
	"गंगोत्री",
	"यमुनोत्री",
	"चारधाम",
	"अमरनाथ",
	"वैष्णोदेवी",
	"कामाख्या",
	"तिरुपति",
	"मीनाक्षी",
	"रामेश्वरम",
	"सोमनाथ",
	"द्वारकाधीश",
	"जगन्नाथ",
	"पुरी",
	"कोणार्क",
	"खजुराहो",
	"अजंता",
	"एलोरा",
	"ताजमहल",
	"लालकिला",
	"कुतुबमीनार",
	"इंडियागेट",
	"गेटवेऑफइंडिया",
	"संसदभवन",
	"राष्ट्रपतिभवन",
	"सुप्रीमकोर्ट",
	"हाईकोर्ट",
	"पंचायत",
	"नगरपालिका",
	"नगरनिगम",
	"चुनाव",
	"मतदान",
	"नेता",
	"मंत्री",
	"मुख्यमंत्री",
	"प्रधानमंत्री",
	"राष्ट्रपति",
	"राज्यपाल",
	"सांसद",
	"विधायक",
	"पार्षद",
	"सरपंच",
	"पंच",
	"अधिकारी",
	"कर्मचारी",
	"क्लर्क",
	"चपरासी",
	"पुलिसकर्मी",
	"सैनिक",
	"जवान",
	"अफसर",
	"सेनापति",
	"सेना",
	"जलसेना",
	"थलसेना",
	"वायुसेना",
	"नौसेना",
	"हथियार",
	"गोलाबारूद",
	"मिसाइल",
	"टैंक",
	"तोप",
	"हवाईजहाज",
	"हेलीकॉप्टर",
	"पनडुब्बी",
	"जहाज",
	"नाव",
	"गाड़ी",
	"मोटर",
	"साइकिल",
	"स्कूटर",
	"बस",
	"ट्रक",
	"ट्रेन",
	"रेलगाड़ी",
	"हवाईजहाज",
	"अंतरिक्षयान",
	"रॉकेट",
	"उपग्रह",
	"कृत्रिमउपग्रह",
	"दूरबीन",
	"खुर्दबीन",
	"माइक्रोस्कोप",
	"टेलीस्कोप",
	"थर्मामीटर",
	"बैरोमीटर",
	"स्टेथोस्कोप",
	"एक्स-रे",
	"एमआरआई",
	"सीटीस्कैन",
	"अльтраसाउंड",
	"ईसीजी",
	"ईईजी",
	"ब्लडटेस्ट",
	"यूरिनटेस्ट",
	"मलेरिया",
	"टाइफाइड",
	"डेंगू",
	"चिकनगुनिया",
	"कोरोना",
	"वायरस",
	"बैक्टीरिया",
	"फंगस",
	"पैरासाइट",
	"इंफेक्शन",
	"एलर्जी",
	"अस्थमा",
	"डायबिटीज",
	"ब्लडप्रेशर",
	"कैंसर",
	"हार्टअटैक",
	"स्ट्रोक",
	"पैरालिसिस",
	"टीबी",
	"एचआईवी",
	"एड्स",
	"कुष्ठरोग",
	"पोलिओ",
	"खसरा",
	"रूबेला",
	"मम्प्स",
	"टिटनेस",
	"रेबीज",
	"सांपकाटना",
	"बिच्छूकाटना",
	"कुत्ताकाटना",
	"जलना",
	"कटना",
	"छिलना",
	"टूटना",
	"फ्रैक्चर",
	"मोच",
	"सूजन",
	"दर्द",
	"बुखार",
	"खांसी",
	"जुकाम",
	"सिरदर्द",
	"पेटदर्द",
	"बदनदर्द",
	"उल्टी",
	"दस्त",
	"कब्ज",
	"गैस",
	"एसिडिटी",
	"अल्सर",
	"पथरी",
	"पीलिया",
	"एनिमिया",
	"कमजोरी",
	"थकान",
	"चक्कर",
	"बेहोशी",
	"नींद",
	"अनिद्रा",
	"तनाव",
	"डिप्रेशन",
	"चिंता",
	"घबराहट",
	"डर",
	"फोबिया",
	"मेनिया",
	"सिजोफ्रेनिया",
	"पागलपन",
	"मूर्खता",
	"बुद्धिमानी",
	"चतुराई",
	"चालाकी",
	"धूर्तता",
	"मूर्ख",
	"विद्वान",
	"ज्ञानी",
	"अज्ञानी",
	"पंडित",
	"मूर्ख",
	"अमीर",
	"गरीब",
	"धनी",
	"निर्धन",
	"राजा",
	"रंक",
	"सेठ",
	"भिखारी",
	"साहूकार",
	"कर्जदार",
	"दाता",
	"याचक",
	"दानी",
	"कृपण",
	"कंजूस",
	"खर्चीला",
	"मितव्ययी",
	"अपव्ययी",
	"संचय",
	"त्याग",
	"भोग",
	"योग",
	"तप",
	"संयम",
	"नियम",
	"आसन",
	"प्राणायाम",
	"प्रत्याहार",
	"धारणा",
	"ध्यान",
	"समाधि",
	"यम",
	"नियम",
	"आसन",
	"प्राणायाम",
	"प्रत्याहार",
	"धारणा",
	"ध्यान",
	"समाधि",
	"अनुभव",
	"सुविधा",
	"निर्णय",
	"प्रक्रिया",
	"कार्यक्रम",
	"निर्माण",
	"परिस्थिति",
	"विशेषता",
	"संस्था",
	"सामग्री",
	"आधारित",
	"उपयोग",
	"आविष्कार",
	"सुरक्षा",
	"संभावना",
	"प्रस्तुत",
	"विचार",
	"परिवर्तन",
	"सहयोग",
	"प्रतिस्पर्धा",
	"प्रयास",
	"अध्ययन",
	"विकास",
	"सामाजिक",
	"सांस्कृतिक",
	"आर्थिक",
	"रणनीति",
	"प्रबंधन",
	"दृष्टिकोण",
	"विश्लेषण",
	"प्रौद्योगिकी",
	"सकारात्मक",
	"नकारात्मक",
	"प्रस्ताव",
	"समस्या",
	"समाधान",
	"उद्देश्य",
	"महत्वपूर्ण",
	"आकर्षक",
	"उपयुक्त",
	"परिणामस्वरूप",
	"सुनिश्चित",
	"विकल्प",
	"प्रोत्साहित",
	"उपलब्ध",
	"सफलतापूर्वक",
	"प्रणाली",
	"उपकरण",
	"विस्तृत",
	"संसाधन",
	"प्रतिशत",
	"व्यापारिक",
	"निवेश",
	"भविष्य",
	"अनुसंधान",
	"प्रशासन",
	"निर्धारित",
	"समर्थन",
	"प्रसारित",
	"योजना",
	"उपभोक्ता",
	"समीक्षा",
	"आवश्यकता",
	"गतिविधि",
	"परिचय",
	"उल्लेख",
	"उत्पादन",
	"प्रभावित",
	"प्रदर्शित",
	"मानक",
	"आधुनिक",
	"प्राचीन",
	"परंपरा",
	"प्रतीक",
	"विश्वास",
	"सृजन",
	"क्षमता",
	"विशिष्ट",
	"वितरण",
	"उत्कृष्ट",
	"परिमाण",
	"अधिकार",
	"न्यायालय",
	"सरकार",
	"मंत्रालय",
	"प्रवक्ता",
	"सम्मेलन",
	"विधेयक",
	"अनुदान",
	"संविधान",
	"प्रतिनिधि",
	"मुकाबला",
	"प्राथमिकता",
	"निर्देश",
	"पंजीकरण",
	"प्रमाणपत्र",
	"उपस्थिति",
	"संक्रमण",
	"महामारी",
	"चिकित्सा",
	"सुधार",
	"प्रदूषण",
	"जागरूकता",
	"पहल",
	"अंतर्राष्ट्रीय",
	"राष्ट्रीय",
	"स्थानीय",
	"क्षेत्रीय",
	"सार्वजनिक",
	"निजी",
	"माध्यम",
	"संचार",
	"नेटवर्क",
	"सॉफ्टवेयर",
	"हार्डवेयर",
	"डिज़ाइन",
	"आर्किटेक्चर",
	"इंजीनियरिंग",
	"वैज्ञानिक",
	"परियोजना",
	"लागत",
	"आय",
	"व्यय",
	"मुनाफा",
	"नुकसान",
	"बाजार",
	"ग्राहक",
	"सेवा",
	"उत्पाद",
	"अनुबंध",
	"शर्तें",
	"नियम",
	"कानून",
	"अपराध",
	"जांच",
	"अदालत",
	"सबूत",
	"गवाह",
	"मुकदमा",
	"सजा",
	"जमानत",
	"जेल",
	"न्यायाधीश",
	"वकील",
	"पुलिस",
	"एफआईआर",
	"शिकायत",
	"याचिका",
	"अपील",
	"सुप्रीम",
	"हाईकोर्ट",
	"जिला",
	"तहसील",
	"पंचायत",
	"सरपंच",
	"वार्ड",
	"पार्षद",
	"मेयर",
	"विधायक",
	"सांसद",
	"मंत्री",
	"मुख्यमंत्री",
	"प्रधानमंत्री",
	"राष्ट्रपति",
	"राज्यपाल",
	"लोकसभा",
	"राज्यसभा",
	"विधानसभा",
	"संसद",
	"मतदान",
	"चुनाव",
	"मतदाता",
	"उम्मीदवार",
	"पार्टी",
	"गठबंधन",
	"विपक्ष",
	"नीतियां",
	"योजनाएं",
	"वृद्धि",
	"प्रगति",
	"समृद्धि",
	"अर्थव्यवस्था",
	"मुद्रा",
	"बैंक",
	"ऋण",
	"ब्याज",
	"शेयर",
	"सूचकांक",
	"उद्योग",
	"कृषि",
	"व्यापार",
	"रोजगार",
	"बेरोजगारी",
	"गरीबी",
	"अमीरी",
	"शिक्षा",
	"स्वास्थ्य",
	"परिवहन",
	"ऊर्जा",
	"पर्यावरण",
	"जल",
	"वन",
	"भूमि",
	"संरक्षण",
	"कर्तव्य",
	"समानता",
	"स्वतंत्रता",
	"न्याय",
	"धर्मनिरपेक्ष",
	"लोकतंत्र",
	"गणतंत्र",
	"समाजवाद",
	"पूंजीवाद",
	"राष्ट्रवाद",
	"विद्रोह",
	"क्रांति",
	"आंदोलन",
	"हड़ताल",
	"प्रदर्शन",
	"रैली",
	"भाषण",
	"नारा",
	"पोस्टर",
	"मीडिया",
	"अखबार",
	"पत्रिका",
	"चैनल",
	"पत्रकार",
	"संपादक",
	"रिपोर्टर",
	"खबर",
	"समाचार",
	"विज्ञापन",
	"मनोरंजन",
	"सिनेमा",
	"फिल्म",
	"गीत",
	"संगीत",
	"नृत्य",
	"कला",
	"साहित्य",
	"कविता",
	"कहानी",
	"उपन्यास",
	"नाटक",
	"रंगमंच",
	"अभिनेता",
	"अभिनेत्री",
	"निर्देशक",
	"निर्माता",
	"गायक",
	"संगीतकार",
	"चित्रकार",
	"मूर्तिकार",
	"लेखक",
	"कवि",
	"विद्वान",
	"आविष्कारक",
	"खिलाड़ी",
	"कप्तान",
	"कोच",
	"रेफरी",
	"मैच",
	"टूर्नामेंट",
	"ओलंपिक",
	"विश्वकप",
	"स्टेडियम",
	"दर्शक",
	"प्रशंसक",
	"जीत",
	"हार",
	"पदक",
	"इनाम",
	"पुरस्कार",
	"सम्मान",
	"उपाधि",
	"डिग्री",
	"सर्टिफिकेट",
	"मेडल",
	"ट्रॉफी",
	"शिल्ड",
	"ताज",
	"आभूषण",
	"गहने",
	"सोना",
	"चांदी",
	"हीरा",
	"मोती",
	"रत्न",
	"नीलम",
	"पुखराज",
	"पन्ना",
	"कपड़े",
	"पोशाक",
	"लिबास",
	"सूट",
	"साड़ी",
	"सलवार",
	"कमीज",
	"पैंट",
	"शर्ट",
	"टीशर्ट",
	"जूते",
	"चप्पल",
	"सैंडल",
	"बूट",
	"मोजे",
	"दस्ताने",
	"टोपी",
	"स्कार्फ",
	"शॉल",
	"स्वेटर",
	"जैकेट",
	"कोट",
	"रेनकोट",
	"छाता",
	"घड़ी",
	"चश्मा",
	"बेल्ट",
	"पर्स",
	"बैग",
	"सूटकेस",
	"भोजन",
	"खाना",
	"नाश्ता",
	"दोपहर",
	"रात",
	"पानी",
	"चाय",
	"कॉफी",
	"दूध",
	"लस्सी",
	"जूस",
	"शरबत",
	"कोल्डड्रिंक",
	"मिठाई",
	"नमकीन",
	"बिस्किट",
	"चॉकलेट",
	"टॉफी",
	"आइसक्रीम",
	"केक",
	"पेस्ट्री",
	"समोसा",
	"कचौड़ी",
	"पकौड़ी",
	"जलेबी",
	"गुलाबजामुन",
	"रसगुल्ला",
	"बर्फी",
	"लड्डू",
	"पेड़ा",
	"सब्जी",
	"दाल",
	"चावल",
	"रोटी",
	"पूरी",
	"पराठा",
	"डोसा",
	"इडली",
	"सांभर",
	"चटनी",
	"पापड़",
	"अचार",
	"सलाद",
	"रायता",
	"दही",
	"मक्खन",
	"घी",
	"तेल",
	"मसाला",
	"नमक",
	"मिर्च",
	"हल्दी",
	"धनिया",
	"जीरा",
	"अजवाइन",
	"हींग",
	"लहसुन",
	"प्याज",
	"अदरक",
	"नींबू",
	"टमाटर",
	"आलू",
	"गोभी",
	"बैंगन",
	"भिंडी",
	"लौकी",
	"तरोई",
	"कद्दू",
	"करेला",
	"पालक",
	"मेथी",
	"बथुआ",
	"गाजर",
	"मूली",
	"शलजम",
	"चुकंदर",
	"मटर",
	"बींस",
	"शिमला",
	"कटहल",
	"केला",
	"आम",
	"सेब",
	"अमरूद",
	"पपीता",
	"अनार",
	"अंगूर",
	"संतरा",
	"मौसंबी",
	"चीकू",
	"तरबूज",
	"खरबूजा",
	"लीची",
	"स्ट्रॉबेरी",
	"अनानास",
	"नारियल",
	"खजूर",
	"अंजीर",
	"बादाम",
	"काजू",
	"किशमिश",
	"पिस्ता",
	"अखरोट",
	"मूंगफली",
	"मखाना",
	"तिल",
	"गुड़",
	"चीनी",
	"शहद",
	"मिश्री",
	"कंप्यूटर",
	"प्रोग्रामिंग",
	"डेवलपर",
	"वेबसाइट",
	"इंटरनेट",
	"ब्रॉडबैंड",
	"राउटर",
	"वायरलेस",
	"कनेक्शन",
	"अस्पताल",
	"ऑपरेशन",
	"दवाइयां",
	"इलाज",
	"मरीज",
	"डॉक्टर",
	"नर्स",
	"मेडिकल",
	"फार्मेसी",
	"एंबुलेंस",
	"रेलवे",
	"स्टेशन",
	"यात्री",
	"टिकट",
	"प्लेटफॉर्म",
	"इंजन",
	"डिब्बा",
	"सफर",
	"यात्रा",
	"ट्रेन",
	"हवाई",
	"अड्डा",
	"उड़ान",
	"विमान",
	"पायलट",
	"एयरहोस्टेस",
	"पासपोर्ट",
	"वीजा",
	"विद्यालय",
	"महाविद्यालय",
	"विश्वविद्यालय",
	"प्रधानाचार्य",
	"अध्यापक",
	"विद्यार्थी",
	"परीक्षा",
	"परिणाम",
	"कक्षा",
	"किताबें",
	"किताब",
	"कॉपी",
	"पेंसिल",
	"पेन",
	"रबर",
	"स्केल",
	"टिफिन",
	"बोतल",
	"यूनिफॉर्म",
	"त्योहार",
	"दीपावली",
	"होली",
	"दशहरा",
	"ईद",
	"क्रिसमस",
	"बैसाखी",
	"पोंगल",
	"ओणम",
	"मकर",
	"संक्रांति",
	"रक्षाबंधन",
	"जन्माष्टमी",
	"नवरात्रि",
	"गणेश",
	"चतुर्थी",
	"गुरुपर्व",
	"महावीर",
	"जयंती",
	"बुद्ध",
	"शादी",
	"विवाह",
	"सगाई",
	"दुल्हन",
	"दूल्हा",
	"बारात",
	"मेहमान",
	"भोज",
	"मंडप",
	"पंडित",
	"परिवार",
	"माता",
	"पिता",
	"भाई",
	"बहन",
	"दादा",
	"दादी",
	"नाना",
	"नानी",
	"चाचा",
	"चाची",
	"मामा",
	"मामी",
	"बुआ",
	"फूफा",
	"मौसा",
	"मौसी",
	"बेटा",
	"बेटी",
	"भतीजा",
	"भतीजी",
	"भांजा",
	"भांजी",
	"पोता",
	"पोती",
	"नाती",
	"नातिन",
	"सास",
	"ससुर",
	"दामाद",
	"बहू",
	"साला",
	"साली",
	"देवर",
	"देवरानी",
	"जेठ",
	"जेठानी",
	"ननद",
	"नंदोई",
	"रिश्तेदार",
	"दोस्त",
	"मित्र",
	"सहेली",
	"पड़ोसी",
	"जानकार",
	"अजनबी",
	"मुलाकात",
	"बातचीत",
	"संवाद",
	"संपर्क",
	"घर",
	"मकान",
	"इमारत",
	"बंगला",
	"झोपड़ी",
	"तंबू",
	"किराया",
	"मालिक",
	"दरवाजा",
	"खिड़की",
	"छत",
	"दीवार",
	"फर्श",
	"कमरा",
	"रसोई",
	"स्नानघर",
	"आंगन",
	"बालकनी",
	"सीढ़ियां",
	"लिफ्ट",
	"सोफा",
	"कुर्सी",
	"मेज",
	"पलंग",
	"बिस्तर",
	"गद्दा",
	"चादर",
	"कंबल",
	"तकिया",
	"पर्दा",
	"बर्तन",
	"थाली",
	"कटोरी",
	"गिलास",
	"चम्मच",
	"चाकू",
	"कांटा",
	"कड़ाही",
	"तवा",
	"कुकर",
	"फ्रिज",
	"टीवी",
	"कूलर",
	"पंखा",
	"एसी",
	"हीटर",
	"गीजर",
	"मिक्सर",
	"ओवन",
	"वाशिंग",
	"मशीन",
	"झाड़ू",
	"पोछा",
	"बाल्टी",
	"मग",
	"साबुन",
	"शैंपू",
	"तौलिया",
	"दर्पण",
	"कंघी",
	"समस्याएं",
	"सुविधाएं",
	"संभावनाएं",
	"नीतियों",
	"योजनाओं",
	"कार्यक्रमों",
	"गतिविधियों",
	"परिस्थितियों",
	"अधिकारियों",
	"कर्मचारियों",
	"सदस्यों",
	"प्रतिनिधियों",
	"नेताओं",
	"नागरिकों",
	"व्यक्तियों",
	"संस्थाओं",
	"कंपनियों",
	"उद्योगों",
	"उत्पादों",
	"सेवाओं",
	"बाजारों",
	"ग्राहकों",
	"उपभोक्ताओं",
	"निवेशकों",
	"शेयरधारकों",
	"बैंकों",
	"खातों",
	"ऋणों",
	"ब्याज",
	"बीमा",
	"पॉलिसी",
	"दावों",
	"भुगतान",
	"लेनदेन",
	"व्यापारियों",
	"दुकानदारों",
	"मजदूरों",
	"किसानों",
	"छात्रों",
	"शिक्षकों",
	"वैज्ञानिकों",
	"इंजीनियरों",
	"डॉक्टरों",
	"नर्सों",
	"मरीजों",
	"अस्पतालों",
	"दवाइयों",
	"उपकरणों",
	"मशीनों",
	"वाहनों",
	"गाड़ियों",
	"सड़कों",
	"पुलों",
	"इमारतों",
	"मकानों",
	"दुकानों",
	"कार्यालयों",
	"विद्यालयों",
	"महाविद्यालयों",
	"विश्वविद्यालयों",
	"संस्थानों",
	"संगठनों",
	"समितियों",
	"बोर्डों",
	"आयोगों",
	"विभागों",
	"मंत्रालयों",
	"सरकारों",
	"राज्यों",
	"जिलों",
	"शहरों",
	"गांवों",
	"कस्बों",
	"मोहल्लों",
	"गलियों",
	"चौराहों",
	"पार्कों",
	"मैदानों",
	"स्टेडियमों",
	"थियेटरों",
	"सिनेमाघरों",
	"मॉल",
	"त्योहारों",
	"मेलों",
	"आयोजनों",
	"समारोहों",
	"बैठकों",
	"सम्मेलनों",
	"गोष्ठियों",
	"कार्यशालाओं",
	"सेमिनारों",
	"प्रतियोगिताओं",
	"खेलों",
	"खिलाड़ियों",
	"टीमों",
	"पुरस्कारों",
	"पदकों",
	"प्रमाणपत्रों",
	"डिग्रियों",
	"छात्रवृत्तियों",
	"अनुदानों",
	"सब्सिडी",
	"परियोजनाओं",
	"प्रस्तावों",
	"दस्तावेजों",
	"फाइलों",
	"रिकॉर्ड",
	"रिपोर्टों",
	"आंकड़ों",
	"समीक्षाओं",
	"मूल्यांकनों",
	"जांच",
	"परीक्षणों",
	"निरीक्षणों",
	"सर्वेक्षणों",
	"अध्ययनों",
	"अनुसंधानों",
	"आविष्कारों",
	"खोजों",
	"तकनीकों",
	"विधियों",
	"प्रक्रियाओं",
	"प्रणालियों",
	"नेटवर्कों",
	"सिस्टमों",
	"सॉफ्टवेयर्स",
	"एप्लिकेशनों",
	"वेबसाइटों",
	"पोर्टलों",
	"प्लेटफार्मों",
	"सुविधाओं",
	"लाभों",
	"नुकसानों",
	"चुनौतियों",
	"समस्याओं",
	"समाधानों",
	"विकल्पों",
	"अवसरों",
	"खतरों",
	"जोखिमों",
	"सुरक्षा",
	"बचाव",
	"उपायों",
	"सावधानियों",
	"नियमों",
	"कानूनों",
	"शर्तों",
	"प्रावधानों",
	"अधिकारों",
	"कर्तव्यों",
	"जिम्मेदारियों",
	"दायित्वों",
	"अपेक्षाओं",
	"उम्मीदों",
	"आशंकाओं",
	"संदेहों",
	"सवालों",
	"जवाबों",
	"प्रश्नों",
	"उत्तरों",
	"तर्कों",
	"बहसों",
	"चर्चाओं",
	"संवादों",
	"भाषणों",
	"बयानों",
	"टिप्पणियों",
	"सुझावों",
	"शिकायतों",
	"अपीलों",
	"याचिकाओं",
	"मुकदमों",
	"फैसलों",
	"आदेशों",
	"निर्देशों",
	"दिशानिर्देशों",
	"कार्रवाइयों",
	"कदमों",
	"प्रयासों",
	"कोशिशों",
	"सफलताओं",
	"असफलताओं",
	"उपलब्धियों",
	"अनुभवों",
	"ज्ञान",
	"विज्ञान"
];
var FALLBACK_WORDS = [
	"१",
	"२",
	"३",
	"४",
	"५",
	"६",
	"७",
	"८",
	"९",
	"०",
	"ञ",
	"+",
	";",
	".",
	"‘",
	"’",
	"द्ध",
	"त्र",
	"ऋ",
	"।",
	"/",
	":",
	"*",
	"़",
	"द्य",
	"ृ",
	"्",
	"ु",
	"ू",
	"म",
	"त",
	"ज",
	"ल",
	"न",
	"प",
	"व",
	"च",
	"क",
	"ि",
	"ी",
	"र",
	"ा",
	"स",
	"य",
	"ह",
	"े",
	"ं",
	"अ",
	"इ",
	"द",
	"उ",
	"ए",
	"ण्",
	"ध्",
	"ग",
	"ब",
	"्र",
	"फ",
	"ॅ",
	"भ्",
	"श्र",
	"ज्ञ",
	"स्",
	"रू",
	"श्",
	"ष्",
	"र्",
	"ग्",
	"ब्",
	"ट",
	"ठ",
	"छ",
	"ड",
	"ढ",
	"झ",
	"घ्",
	"थ्",
	"ळ",
	"क्",
	"ै",
	",",
	"(",
	"|"
];
var FULL_DICT = Array.from(/* @__PURE__ */ new Set([...DICTIONARY$1, ...FALLBACK_WORDS]));
var charIndexCache = null;
var allTargetsCache$2 = null;
function buildCaches() {
	if (charIndexCache && allTargetsCache$2) return;
	charIndexCache = {};
	allTargetsCache$2 = [];
	keyboardRows.forEach((row, rowIndex) => {
		let rowName = "unknown";
		if (rowIndex === 0) rowName = "number";
		else if (rowIndex === 1) rowName = "top";
		else if (rowIndex === 2) rowName = "home";
		else if (rowIndex === 3) rowName = "bottom";
		row.forEach((key) => {
			if (rowName !== "unknown" && key.en.length === 1) {
				if (key.hi) {
					const targetId = `row:${rowName}:key:${key.en}:normal`;
					allTargetsCache$2.push(targetId);
					if (!charIndexCache[key.hi]) charIndexCache[key.hi] = [];
					charIndexCache[key.hi].push(targetId);
				}
				if (key.shift) {
					const targetId = `row:${rowName}:key:${key.en}:shift`;
					allTargetsCache$2.push(targetId);
					if (!charIndexCache[key.shift]) charIndexCache[key.shift] = [];
					charIndexCache[key.shift].push(targetId);
				}
			}
		});
	});
}
var globalLessonSessions = {};
function generateFullPracticeSession(lessonSlug) {
	buildCaches();
	const MIN_WORDS = 600;
	const remainingTargets = new Set(allTargetsCache$2);
	const totalTargets = remainingTargets.size;
	const usedWords = /* @__PURE__ */ new Set();
	const sessionWords = [];
	const coveredTargets = [];
	const excludeWords = /* @__PURE__ */ new Set();
	if (lessonSlug === "ch-full-practice-3" && globalLessonSessions["ch-full-practice-2"]) globalLessonSessions["ch-full-practice-2"].forEach((w) => excludeWords.add(w));
	else if (lessonSlug === "ch-full-practice-2" && globalLessonSessions["ch-full-practice-3"]) globalLessonSessions["ch-full-practice-3"].forEach((w) => excludeWords.add(w));
	const availableDict = FULL_DICT.filter((w) => !excludeWords.has(w));
	const shuffledDict = [...availableDict.length >= MIN_WORDS ? availableDict : FULL_DICT].sort(() => Math.random() - .5);
	let passes = 0;
	while (remainingTargets.size > 0 && passes < 3) {
		passes++;
		let bestWord = null;
		let bestCoveredCount = 0;
		let bestCoveredTargets = [];
		for (const word of shuffledDict) {
			if (usedWords.has(word)) continue;
			const currentWordCoveredTargets = /* @__PURE__ */ new Set();
			for (const hiChar of Object.keys(charIndexCache)) if (word.includes(hiChar)) {
				const targetIds = charIndexCache[hiChar];
				if (targetIds) {
					for (const tId of targetIds) if (remainingTargets.has(tId)) currentWordCoveredTargets.add(tId);
				}
			}
			if (currentWordCoveredTargets.size > bestCoveredCount) {
				bestCoveredCount = currentWordCoveredTargets.size;
				bestWord = word;
				bestCoveredTargets = Array.from(currentWordCoveredTargets);
			}
		}
		if (bestWord) {
			usedWords.add(bestWord);
			sessionWords.push(bestWord);
			bestCoveredTargets.forEach((t) => {
				remainingTargets.delete(t);
				coveredTargets.push(t);
			});
			passes = 0;
		}
	}
	const unusedWords = shuffledDict.filter((w) => !usedWords.has(w));
	for (const word of unusedWords) {
		if (sessionWords.length >= MIN_WORDS) break;
		usedWords.add(word);
		sessionWords.push(word);
	}
	const coveragePercentage = (totalTargets - remainingTargets.size) / totalTargets * 100;
	const finalString = sessionWords.join(" ");
	if (lessonSlug) globalLessonSessions[lessonSlug] = sessionWords;
	let overlapCount = 0;
	if (lessonSlug === "ch-full-practice-3" && globalLessonSessions["ch-full-practice-2"]) {
		const list = globalLessonSessions["ch-full-practice-2"];
		overlapCount = sessionWords.filter((w) => list.includes(w)).length;
	} else if (lessonSlug === "ch-full-practice-2" && globalLessonSessions["ch-full-practice-3"]) {
		const list = globalLessonSessions["ch-full-practice-3"];
		overlapCount = sessionWords.filter((w) => list.includes(w)).length;
	}
	return {
		totalUniqueWords: sessionWords.length,
		totalCharacters: finalString.length,
		text: finalString,
		coveredTargets,
		remainingTargets: Array.from(remainingTargets),
		coveragePercentage: parseFloat(coveragePercentage.toFixed(2)),
		overlapCount
	};
}
var story1Template = `
एक बार की बात है, {PLACE} में {HERO} नाम का एक {PROFESSION} रहता था। उसका जीवन बहुत ही सामान्य था, लेकिन एक दिन कुछ ऐसा हुआ जिसने उसकी पूरी दुनिया बदल दी।
यह बात {DATE} की है। समय करीब {TIME} हो रहा था। आसमान में {WEATHER} छाए हुए थे। {HERO} अपने घर के बरामदे में बैठा हुआ था और {OBJECT} पढ़ रहा था। 
अचानक, उसने एक तेज़ आवाज़ सुनी। ‘अरे। कोई मेरी मदद करो।’ यह आवाज़ {HERO} के बचपन के मित्र {FRIEND} की थी।
{HERO} तुरंत उठा और आवाज़ की दिशा में भागा। उसने देखा कि {FRIEND} एक {DANGER} में फँस गया था। {FRIEND} चिल्ला रहा था, ‘कृपया मुझे बचाओ।’ 
{HERO} ने अपनी पूरी ताक़त लगाई और {FRIEND} को सुरक्षित बाहर निकाल लिया। 
‘तुम ठीक तो हो।’ {HERO} ने पूछा। 
‘हाँ, शुक्रिया मेरे दोस्त। तुमने मेरी जान बचाई है,’ {FRIEND} ने काँपते हुए उत्तर दिया। 
(यह देखकर वहाँ खड़े लोग भी बहुत हैरान थे|) 
थोड़ी देर बाद, गाँव के सरपंच श्री {SARPANCH} भी वहाँ पहुँच गए। उन्होंने {HERO} की बहुत प्रशंसा की। 
सरपंच ने कहा - ‘हमारे गाँव को तुम जैसे साहसी युवाओं पर गर्व है। तुमने जो किया है, वह वास्तव में अकल्पनीय है।’ 
इस घटना के बाद, {HERO} की चर्चा हर जगह होने लगी। 
अब हम कुछ और बातों पर ध्यान देते हैं। {HERO} की शिक्षा बहुत उच्च स्तर की थी। उसने {UNIVERSITY} से गद्य और पद्य दोनों विधाओं में ज्ञान प्राप्त किया था। 
उसका मानना था कि विद्या ही सबसे बड़ा धन है। 
एक दिन, {HERO} ने अपने गाँव में एक विद्यालय खोलने का निर्णय लिया। 
‘मैं चाहता हूँ कि यहाँ का हर बच्चा पढ़-लिख कर महान बने,’ {HERO} ने एक सभा में कहा। 
गाँव वालों ने इस विचार का ज़ोरदार स्वागत किया। 
विद्यालय का निर्माण कार्य {START_MONTH} में शुरू हुआ और {END_MONTH} तक पूरा हो गया। 
उद्घाटन के दिन एक विशेष अतिथि को आमंत्रित किया गया था। वे थे प्रसिद्ध विद्वान डॉक्टर {SCHOLAR}। 
डॉक्टर {SCHOLAR} ने अपने भाषण में कहा, ‘शिक्षा वह प्रकाश है जो अज्ञान के अंधकार को मिटा देती है। ५ + ४ = ९ होता है, यह केवल गणित नहीं, बल्कि जीवन का सत्य भी हो सकता है। यदि हम अपने ज्ञान को बाँटें, तो वह कभी ९ - ५ = ४ की तरह कम नहीं होता, बल्कि हमेशा बढ़ता है।’ 
लोग यह सुनकर बहुत प्रेरित हुए। 
विद्यालय में बच्चों को ऋग्वेद, विज्ञान, और गणित जैसे विषय पढ़ाए जाने लगे। 
वहाँ के बच्चे बहुत ही चंचल और बुद्धिमान थे। वे हर नई चीज़ को जल्दी सीख लेते थे। 
कुछ बच्चे खेल-कूद में भी बहुत आगे थे। 
समय बीतता गया और वह विद्यालय पूरे राज्य में प्रसिद्ध हो गया। 
{HERO} की मेहनत रंग लाई थी। 
एक दिन, राज्य के मुख्यमंत्री ने {HERO} को राजधानी बुलाकर सम्मानित किया। 
‘आपके योगदान को कभी भुलाया नहीं जा सकता,’ मुख्यमंत्री ने कहा। 
{HERO} ने नम्रतापूर्वक उत्तर दिया, ‘यह मेरा कर्तव्य था। मैंने वही किया जो मुझे सही लगा।’ 
इस प्रकार, {HERO} ने अपने जीवन को एक उद्देश्य दे दिया। 
आज भी जब लोग {PLACE} जाते हैं, तो वे उस विद्यालय को ज़रूर देखते हैं। 
वहाँ की दीवारों पर बुद्ध के उपदेश, त्रिशूल के चित्र और महान ऋषियों की कहानियाँ लिखी हुई हैं। 
(यह सचमुच एक अद्भुत दृश्य होता है|) 
अंत में, हम यह कह सकते हैं कि एक व्यक्ति का दृढ़ निश्चय पूरे समाज को बदल सकता है। 
{HERO} की कहानी हमें यही सिखाती है कि कभी भी हार नहीं माननी चाहिए। 
जब भी कोई मुश्किल आए, तो उसका डटकर सामना करना चाहिए। 
चाहे परिस्थितियाँ कितनी भी कठिन क्यों न हों, सच्चाई और ईमानदारी का मार्ग कभी नहीं छोड़ना चाहिए। 

यहाँ कुछ और विशेष बातें हैं: ३ ६ ७ ८ * . ॅ थ् ळ भ् ष् ब् ण् घ्। 
उसका ३६वाँ जन्मदिन था, और उसने ७, ८ सेब खाए। 
उसने डॉक्टर (ॅ) से कहा कि थ्, ळ, भ्, ष्, ब्, ण्, और घ् जैसे शब्द उसे याद हैं।
* जैसे निशान और . जैसी बिंदियाँ उसे पसंद थीं।
और इस तरह, वह महान आत्मा हमेशा के लिए अमर हो गई। 
`;
var story2Template = `
बहुत समय पहले की बात है, एक घने जंगल में {HERO_ANIMAL} रहता था। उसका नाम {NAME} था। 
वह जंगल का सबसे {QUALITY} जानवर माना जाता था। 
एक दिन की बात है, तारीख थी {DATE_2} और समय था {TIME_2}। 
{NAME} जंगल में घूम रहा था, तभी उसने देखा कि एक {VILLAIN_ANIMAL} किसी का पीछा कर रहा है। 
वह कोई और नहीं बल्कि {NAME} का परम मित्र {FRIEND_ANIMAL} था। 
{FRIEND_ANIMAL} अपनी जान बचाने के लिए भाग रहा था। 
‘बचाओ। बचाओ।’ वह ज़ोर-ज़ोर से चिल्ला रहा था। 
{NAME} ने बिना कुछ सोचे-समझे {VILLAIN_ANIMAL} पर छलाँग लगा दी। 
दोनों के बीच एक भयंकर युद्ध शुरू हो गया। 
{VILLAIN_ANIMAL} बहुत क्रुद्ध था। उसने कहा, ‘तुम मेरे शिकार के बीच में क्यों आ रहे हो।’ 
{NAME} ने दृढ़ता से जवाब दिया, ‘मैं अपने मित्र को कभी मरने नहीं दूँगा।’ 
(यह सुनकर जंगल के बाकी जानवर भी वहाँ इकट्ठा हो गए|) 
काफी देर तक संघर्ष चलता रहा। अंततः, {NAME} की जीत हुई और {VILLAIN_ANIMAL} को वहाँ से भागना पड़ा। 
सभी जानवरों ने {NAME} की जय-जयकार की। 
जंगल के राजा, {KING}, ने {NAME} को दरबार में बुलाया। 
‘तुमने आज बहुत ही वीरता का काम किया है। मैं तुम्हें इस जंगल का सेनापति नियुक्त करता हूँ,’ राजा ने घोषणा की। 
{NAME} ने राजा को धन्यवाद दिया और अपनी नई ज़िम्मेदारी सँभाल ली। 
सेनापति बनने के बाद, {NAME} ने जंगल की सुरक्षा के लिए कई नए नियम बनाए। 
उसने सुनिश्चित किया कि कोई भी जानवर किसी कमज़ोर को परेशान न करे। 
अगर कोई ऐसा करता पाया जाता, तो उस पर ५/१०/२०२३ के नए कानून के तहत जुर्माना लगाया जाता था। 
(जुर्माने की राशि ५ + ५ = १० स्वर्ण मुद्राएँ होती थी|) 
एक बार, कुछ शिकारी जंगल में घुस आए। उनके पास खतरनाक हथियार थे। 
वे * जैसे चमकते हुए औजार लेकर आए थे। 
{NAME} ने अपनी सेना के साथ उन शिकारियों का सामना किया। 
‘हम तुम्हें यहाँ से एक भी जानवर नहीं ले जाने देंगे,’ {NAME} ने ललकारा। 
शिकारियों ने गोलियाँ चलानी शुरू कर दीं, लेकिन {NAME} की कुशल रणनीति के आगे उनकी एक न चली। 
उस दिन जंगल के सभी जानवरों ने मिलकर काम किया। 
चंचल बंदरों ने पेड़ों से पत्थर बरसाए, जबकि तेज़ दौड़ने वाले हिरणों ने शिकारियों को भ्रमित कर दिया। 
आखिरकार, शिकारियों को हार माननी पड़ी और वे भाग खड़े हुए। 
इस घटना के बाद, {NAME} का सम्मान और भी बढ़ गया। 
यहाँ तक कि दूर-दराज के जंगलों से भी जानवर उससे मिलने और ज्ञान प्राप्त करने आने लगे। 
{NAME} ने उन्हें सिखाया कि एकता में ही बल है। 
‘अगर हम सब मिलकर रहें, तो कोई भी हमारा कुछ नहीं बिगाड़ सकता,’ उसने एक विशाल सभा में कहा। 
उसकी बातें सुनकर सभी जानवरों में एक नई ऊर्जा का संचार हुआ। 
धीरे-धीरे, वह जंगल दुनिया का सबसे सुरक्षित और खुशहाल जंगल बन गया। 
वहाँ के निवासी शांति से रहने लगे। 
विद्यालयों में छोटे बच्चों को इस महान युद्ध की कहानियाँ पढ़ाई जाने लगीं। 
किताबों में शुद्ध गद्य रूप में लोकमान्य टिळक जैसी कहानियों के साथ {NAME} की वीरता के किस्से भी शामिल किए गए। 
आज भी, जब हवा पेड़ों के बीच से गुज़रती है, तो ऐसा लगता है मानो वह {NAME} की ही गाथा गा रही हो। 

यहाँ कुछ और विशेष बातें हैं: ७ ८ ९ ऋ . ॅ व् ख् थ् श्र ग् ब् ण् ध् घ् ४ ६ ष्। 
७, ८, ४, ६, और ९ बजे के बीच ऋषियों ने विशेष (ष्) पूजा की। 
उसने डॉक्टर (ॅ) से कहा कि व्, ख्, थ्, श्र, ग्, ब्, ण्, ध्, और घ् जैसे अक्षर कठिन हैं।
उसने कहा कि . यहाँ ख़त्म होता है।
यह कहानी हमें सिखाती है कि सच्ची मित्रता और साहस से बड़ी से बड़ी मुसीबत को भी टाला जा सकता है। 
`;
var vars$1 = {
	"PLACE": [
		"रामपुर",
		"शिमला",
		"काशी",
		"मथुरा",
		"उदयपुर",
		"भोपाल",
		"पटना"
	],
	"HERO": [
		"रवि",
		"आदित्य",
		"विक्रम",
		"रोहित",
		"संजय",
		"कमल",
		"अनिल"
	],
	"PROFESSION": [
		"शिक्षक",
		"किसान",
		"व्यापारी",
		"चित्रकार",
		"लेखक",
		"इंजीनियर"
	],
	"DATE": [
		"१५/०८/२०२३",
		"२६/०१/२०२४",
		"०२/१०/२०२५",
		"०५/०९/२०२३",
		"१४/११/२०२४"
	],
	"TIME": [
		"१०:३०",
		"११:४५",
		"०९:१५",
		"०८:२०",
		"१२:००"
	],
	"WEATHER": [
		"काले बादल",
		"घने बादल",
		"तूफानी बादल",
		"बरसाती बादल"
	],
	"OBJECT": [
		"एक किताब",
		"अखबार",
		"एक पत्रिका",
		"उपन्यास",
		"डायरी"
	],
	"FRIEND": [
		"सुरेश",
		"रमेश",
		"महेश",
		"अमित",
		"सुमित",
		"पंकज"
	],
	"DANGER": [
		"गहरी खाई",
		"नदी के भंवर",
		"जंगली जानवर के जाल",
		"आग की लपटों"
	],
	"SARPANCH": [
		"दीनदयाल",
		"रामलाल",
		"हरिप्रसाद",
		"शिवनाथ",
		"गोपाल"
	],
	"UNIVERSITY": [
		"दिल्ली विश्वविद्यालय",
		"बनारस हिंदू विश्वविद्यालय",
		"इलाहाबाद विश्वविद्यालय"
	],
	"START_MONTH": [
		"जनवरी",
		"फरवरी",
		"मार्च",
		"अप्रैल"
	],
	"END_MONTH": [
		"दिसंबर",
		"नवंबर",
		"अक्टूबर",
		"सितंबर"
	],
	"SCHOLAR": [
		"वर्मा",
		"शर्मा",
		"गुप्ता",
		"मिश्रा",
		"सिंह"
	],
	"HERO_ANIMAL": [
		"एक शेर",
		"एक हाथी",
		"एक भालू",
		"एक चीता"
	],
	"NAME": [
		"शेरू",
		"गज्जू",
		"भोलू",
		"चीकू"
	],
	"QUALITY": [
		"बहादुर",
		"समझदार",
		"चतुर",
		"ताकतवर"
	],
	"DATE_2": [
		"१२/०५/२०२२",
		"१५/०७/२०२३",
		"०१/०१/२०२४"
	],
	"TIME_2": [
		"०४:१५",
		"०५:३०",
		"०६:४५"
	],
	"VILLAIN_ANIMAL": [
		"एक खूंखार भेड़िया",
		"एक दुष्ट मगरमच्छ",
		"एक चालाक लोमड़ी"
	],
	"FRIEND_ANIMAL": [
		"खरगोश",
		"हिरण",
		"बंदर",
		"तोता"
	],
	"KING": [
		"शेरखान",
		"वनराज",
		"महाकाल",
		"बाहुबली"
	]
};
function fillTemplate$1(template) {
	let filled = template;
	for (const [key, values] of Object.entries(vars$1)) while (filled.includes(`{${key}}`)) {
		const randomValue = values[Math.floor(Math.random() * values.length)] ?? "";
		filled = filled.replace(`{${key}}`, randomValue);
	}
	return filled;
}
var allTargetsCache$1 = null;
function getTargets$1() {
	if (allTargetsCache$1) return allTargetsCache$1;
	const targets = /* @__PURE__ */ new Set();
	keyboardRows.forEach((row) => {
		row.forEach((k) => {
			if (k.hi) targets.add(k.hi);
			if (k.shift) targets.add(k.shift);
		});
	});
	allTargetsCache$1 = targets;
	return targets;
}
function generateStoryPracticeSession(storyId) {
	const text = fillTemplate$1(storyId === 1 ? story1Template : story2Template).replace(/\s+/g, " ").trim();
	const words = text.split(" ").filter((w) => w.length > 0);
	const allTargets = getTargets$1();
	const remainingTargets = new Set(allTargets);
	const coveredTargets = /* @__PURE__ */ new Set();
	for (const char of text) if (remainingTargets.has(char)) {
		remainingTargets.delete(char);
		coveredTargets.add(char);
	}
	for (const target of Array.from(remainingTargets)) if (text.includes(target)) {
		remainingTargets.delete(target);
		coveredTargets.add(target);
	}
	const coveragePercentage = (allTargets.size - remainingTargets.size) / allTargets.size * 100;
	return {
		text,
		totalUniqueWords: new Set(words).size,
		totalWords: words.length,
		totalCharacters: text.length,
		coveredTargets: Array.from(coveredTargets),
		remainingTargets: Array.from(remainingTargets),
		coveragePercentage: parseFloat(coveragePercentage.toFixed(2))
	};
}
var newsTemplate = `
आज की मुख्य ख़बरें:
शिक्षा के क्षेत्र में एक नई {TECH_INNOVATION} का अनावरण किया गया है। 
{CITY_NEWS} में आयोजित एक विशाल सम्मेलन में {MINISTER} ने इस नई योजना की घोषणा की। 
‘हमारा उद्देश्य हर बच्चे तक {TECH_INNOVATION} पहुँचाना है,’ {MINISTER} ने संवाददाताओं से कहा। 
इस योजना से ५ + ४ = ९ लाख से अधिक छात्रों को लाभ मिलेगा। 
एक अन्य समाचार में, विज्ञान के क्षेत्र में डॉ. {SCIENTIST} ने एक अभूतपूर्व खोज की है। 
उन्होंने एक ऐसे {MATERIAL} का आविष्कार किया है जो पर्यावरण के अनुकूल है। 
यह खोज आने वाले ५-१० वर्षों में प्रदूषण को कम करने में बड़ी भूमिका निभाएगी। 
डॉ. {SCIENTIST} को उनके इस कार्य के लिए {AWARD} से सम्मानित किया गया है। 
खेल जगत की बात करें तो, {CITY_SPORT} में खेले गए रोमांचक मैच में {TEAM_A} ने {TEAM_B} को हरा दिया है। 
यह मैच अंतिम समय तक बहुत ही तनावपूर्ण रहा। 
मैच के अंत में {TEAM_A} के कप्तान ने कहा, ‘यह जीत हमारे कठिन परिश्रम का परिणाम है।’ 
पर्यावरण की दृष्टि से, {RIVER} नदी में जल स्तर लगातार बढ़ रहा है। 
प्रशासन ने आस-पास के गाँवों में अलर्ट जारी कर दिया है। 
सभी नागरिकों को सुरक्षित स्थानों पर जाने की सलाह दी गई है। 
(यह स्थिति पिछले साल की तुलना में ज़्यादा गंभीर है|) 
इसके अलावा, नई खोजों के तहत अंतरिक्ष में एक नए क्षुद्रग्रह (Asteroid) की पहचान की गई है। 
विद्वानों का कहना है कि यह पृथ्वी के लिए कोई ख़तरा नहीं है। 
यहाँ कुछ और विशेष बातें हैं: ७ ८ ९ ऋ . ॅ व् ख् थ् श्र ग् ब् ण् ध् घ् ४ ६ ३ * ष्। 
तारीख १५/१०/२०२३ को एक नई रिपोर्ट में कहा गया है कि ६, ७, और ८ बजे के बीच मौसम में तेज़ी से बदलाव होगा। 
डॉक्टर (ॅ) ने सुझाव दिया है कि थ्, ळ, भ्, ष्, ब्, ण्, और घ् जैसे शब्द बच्चों को जल्दी सिखाए जाएँ।
* जैसे निशान और . जैसी बिंदियों का प्रयोग भी रिपोर्ट में किया गया है।
उन्होंने ‘हाँ’ और ‘ना’ में जवाब दिया और कहा कि यह एक शुद्ध (द्ध) कदम है।
अंत में, यात्रा प्रेमियों के लिए एक अच्छी ख़बर है। 
{MOUNTAIN} पर नई पर्यटन सुविधाएँ शुरू की जा रही हैं। 
इससे स्थानीय लोगों को रोज़गार मिलेगा और पर्यटन को बढ़ावा मिलेगा। 
यह थी आज की मुख्य ख़बरें। 
`;
var dialogueTemplate = `
{PERSON_A}: नमस्ते {PERSON_B}! आज तुम इतनी जल्दी कैसे आ गए?
{PERSON_B}: नमस्ते {PERSON_A}। मुझे एक ज़रूरी काम था, इसलिए सुबह ही निकल गया। 
{PERSON_A}: अच्छा, क्या काम था। क्या सब ठीक तो है।
{PERSON_B}: हाँ, सब ठीक है। दरअसल, मुझे अपने भाई के {EVENT} के लिए कुछ तैयारियाँ करनी थीं। 
{PERSON_A}: यह तो बहुत अच्छी बात है। क्या मैं तुम्हारी कुछ मदद कर सकता हूँ।
{PERSON_B}: अगर तुम मेरे साथ {PLACE_D} तक चल सको, तो बहुत मदद हो जाएगी। 
{PERSON_A}: बिल्कुल। हम वहाँ से क्या-क्या लाएँगे।
{PERSON_B}: हमें कुछ सजावट का सामान, {FOOD_ITEM}, और मेहमानों के लिए {GIFT} लानी हैं। 
{PERSON_A}: ठीक है, लेकिन हमें समय का ध्यान रखना होगा। अभी समय १०:३० हो रहा है। 
{PERSON_B}: हाँ, हमें दोपहर २:४५ तक वापस आना होगा, क्योंकि शाम को ४ बजे से {EVENT} शुरू है। 
{PERSON_A}: अरे। (चौंकते हुए) तो हमें जल्दी निकलना चाहिए। 
{PERSON_B}: हाँ, मेरी गाड़ी बाहर ही खड़ी है। 
{PERSON_A}: चलो चलते हैं। वैसे, तुम्हारे भाई की पढ़ाई कैसी चल रही है। 
{PERSON_B}: उसकी पढ़ाई बहुत अच्छी चल रही है। उसने अभी हाल ही में विज्ञान में एक प्रोजेक्ट पूरा किया है। 
{PERSON_A}: क्या उसने डॉ. {SCIENTIST_D} की थ्योरी का इस्तेमाल किया।
{PERSON_B}: हाँ। उसने बताया कि कैसे ५ + ४ = ९ होता है, लेकिन विज्ञान में कई बार समीकरण अलग तरीके से काम करते हैं। 
{PERSON_A}: बहुत बढ़िया।
यहाँ कुछ और विशेष बातें हैं: ७ ८ ९ ऋ . ॅ व् ख् थ् श्र ग् ब् ण् ध् घ् ४ ६ ३ * ष्। 
{PERSON_A}: तुम्हें पता है, कल मैंने एक डॉक्टर (ॅ) को देखा जो थ्, ळ, भ्, ष्, ब्, ण्, और घ् के उच्चारण पर बात कर रहा था।
{PERSON_B}: हाँ, मैंने भी सुना है कि ६, ७, और ८ साल के बच्चों को ये अक्षर सिखाने में * और . जैसे निशानों का प्रयोग होता है।
{PERSON_A}: यह दिलचस्प है। मैंने सुना है कि ५/१०/२०२३ को ‘शुद्ध’ (द्ध) उच्चारण के लिए एक क्लास है, क्या तुम भी ‘हाँ’ कहोगे।
{PERSON_B}: अच्छा, हम {PLACE_D} पहुँच गए हैं। चलो अपना काम शुरू करते हैं। 
{PERSON_A}: ठीक है। 
`;
var adventureTemplate = `
यह एक रहस्यमयी रात थी। {ADVENTURER} अपनी जीप से {DARK_PLACE} की ओर जा रहा था। 
अचानक, उसकी जीप का इंजन बंद हो गया। 
चारों तरफ घना अंधेरा था और तेज़ हवा चल रही थी। 
{ADVENTURER} ने टॉर्च निकाली और बाहर निकला। 
तभी उसे एक पुरानी, वीरान हवेली दिखाई दी। 
‘शायद वहाँ कोई मदद मिल जाए,’ उसने सोचा। 
वह धीरे-धीरे हवेली के मुख्य दरवाज़े की ओर बढ़ा। 
दरवाज़ा हल्का सा खुला था। उसने उसे धकेला तो एक डरावनी आवाज़ आई। 
(अंदर बहुत धूल और मकड़ी के जाले थे|) 
हवेली के अंदर एक बड़ी सी मेज़ पर एक {MYSTERY_OBJECT} रखा हुआ था। 
जैसे ही {ADVENTURER} ने उसे छुआ, वहाँ रोशनी हो गई। 
तभी एक आवाज़ गूँजी, ‘कौन हो तुम।’
{ADVENTURER} ने मुड़कर देखा, वहाँ एक बूढ़ा व्यक्ति खड़ा था, जिसके हाथ में एक प्राचीन किताब थी। 
‘मैं {ADVENTURER} हूँ। मेरी गाड़ी खराब हो गई है। क्या आप मेरी मदद कर सकते हैं।’ 
बूढ़े ने कहा, ‘यहाँ जो भी आता है, वह अपनी इच्छा से वापस नहीं जा सकता।’ 
{ADVENTURER} को कुछ अजीब लगा। ‘मतलब। आप कौन हैं।’ 
‘मेरा नाम {VILLAIN_A} है। मैं इस {MYSTERY_OBJECT} की रक्षा कर रहा हूँ।’ 
{ADVENTURER} ने देखा कि उस किताब में अजीबोगरीब चित्र और संकेत बने हुए थे। 
‘यह किताब क्या है।’ उसने पूछा। 
{VILLAIN_A} ने मुस्कुराते हुए कहा, ‘यह ऋग्वेद के छिपे हुए रहस्यों की कुंजी है।’ 
{ADVENTURER} समझ गया कि वह किसी बड़ी मुसीबत में फँस गया है। 
उसने चतुराई से काम लेने का फैसला किया। 
‘अगर मैं आपके लिए एक पहेली सुलझा दूँ, तो क्या आप मुझे जाने देंगे।’ 
{VILLAIN_A} ज़ोर से हँसा। ‘ठीक है। बताओ, ५ + ४ = ९ तो होता है, लेकिन ९ - ५ = ४ कब नहीं होता।’ 
{ADVENTURER} ने थोड़ी देर सोचा और जवाब दिया, ‘जब बात ज्ञान की हो।’ 
बूढ़ा हैरान रह गया। 
यहाँ कुछ और विशेष बातें हैं: ७ ८ ९ ऋ . ॅ व् ख् थ् श्र ग् ब् ण् ध् घ् ४ ६ ३ * ष्। 
उस रहस्यमयी किताब में ६, ७, ८, और ९ बजे के विशेष (ष्) अनुष्ठान लिखे थे। 
डॉक्टर (ॅ) की लिखावट में थ्, ळ, भ्, ष्, ब्, ण्, और घ् जैसे अक्षर थे।
हर पन्ने पर * और . के निशान बने हुए थे।
१, २, और ० के साथ ‘हाँ’ और ‘ना’ (’) के चिह्न भी थे, जो कि एक बुद्ध (द्ध) प्रतिमा (म्) के पास रखे थे, जिससे उसे रूमाल (रू) और १/२ हिस्से का ज्ञान हुआ।
बूढ़े ने कहा, ‘तुम बहुत चतुर हो। तुम जा सकते हो।’ 
{ADVENTURER} तुरंत हवेली से बाहर निकला। 
उसकी जीप अचानक चालू हो गई। 
उसने राहत की साँस ली और वापस शहर की ओर निकल पड़ा। 
यह रात वह कभी नहीं भूल पाएगा। 
`;
var vars = {
	TECH_INNOVATION: [
		"प्रौद्योगिकी",
		"सॉफ्टवेयर प्रणाली",
		"डिजिटल योजना",
		"ऑनलाइन प्लेटफॉर्म"
	],
	CITY_NEWS: [
		"नई दिल्ली",
		"मुंबई",
		"बेंगलुरु",
		"लखनऊ",
		"पुणे"
	],
	MINISTER: [
		"शिक्षामंत्री",
		"मुख्यमंत्री",
		"केंद्रीय मंत्री",
		"राज्य मंत्री"
	],
	SCIENTIST: [
		"शर्मा",
		"गुप्ता",
		"मिश्रा",
		"सिंह",
		"राव"
	],
	MATERIAL: [
		"प्लास्टिक विकल्प",
		"सौर बैटरी",
		"जल-शोधक",
		"कार्बन-अवशोषक"
	],
	AWARD: [
		"राष्ट्रीय पुरस्कार",
		"विज्ञान रत्न",
		"अंतर्राष्ट्रीय सम्मान"
	],
	CITY_SPORT: [
		"कोलकाता",
		"चेन्नई",
		"अहमदाबाद",
		"हैदराबाद"
	],
	TEAM_A: [
		"भारत",
		"मुंबई इंडियंस",
		"चेन्नई सुपर किंग्स",
		"रॉयल चैलेंजर्स"
	],
	TEAM_B: [
		"ऑस्ट्रेलिया",
		"राजस्थान रॉयल्स",
		"दिल्ली कैपिटल्स",
		"पंजाब किंग्स"
	],
	RIVER: [
		"गंगा",
		"यमुना",
		"नर्मदा",
		"गोदावरी",
		"ब्रह्मपुत्र"
	],
	MOUNTAIN: [
		"हिमालय",
		"अरावली",
		"सतपुड़ा",
		"विंध्याचल"
	],
	PERSON_A: [
		"रवि",
		"अमन",
		"मोहन",
		"सुरेश",
		"विकास"
	],
	PERSON_B: [
		"सुमित",
		"रोहित",
		"अमित",
		"राजू",
		"सोनू"
	],
	EVENT: [
		"शादी",
		"जन्मदिन",
		"सगाई",
		"समारोह"
	],
	PLACE_D: [
		"बाज़ार",
		"मॉल",
		"दुकान",
		"सुपरमार्केट"
	],
	FOOD_ITEM: [
		"मिठाइयाँ",
		"फल",
		"स्नैक्स",
		"कोल्ड ड्रिंक्स"
	],
	GIFT: [
		"उपहार",
		"कपड़े",
		"किताबें",
		"खिलौने"
	],
	SCIENTIST_D: [
		"कलाम",
		"भाभा",
		"बोस",
		"रामानुजन"
	],
	ADVENTURER: [
		"विक्रम",
		"आर्यन",
		"करण",
		"राहुल",
		"वीर"
	],
	DARK_PLACE: [
		"काले जंगल",
		"पुरानी घाटी",
		"भूतिया गाँव",
		"सुनसान पहाड़"
	],
	MYSTERY_OBJECT: [
		"चमकता हुआ पत्थर",
		"प्राचीन मूर्ति",
		"सोने का बक्सा",
		"रहस्यमयी यन्त्र"
	],
	VILLAIN_A: [
		"भैरव",
		"कालभैरव",
		"अघोरी",
		"तांत्रिक"
	]
};
var templates = {
	"ch-news-practice": newsTemplate,
	"ch-dialogue-practice": dialogueTemplate,
	"ch-adventure-story": adventureTemplate
};
function fillTemplate(template) {
	let filled = template;
	for (const [key, values] of Object.entries(vars)) while (filled.includes(`{${key}}`)) {
		const randomValue = values[Math.floor(Math.random() * values.length)] ?? "";
		filled = filled.replace(`{${key}}`, randomValue);
	}
	return filled;
}
var DICTIONARY = [
	"भारत",
	"देश",
	"मेरा",
	"महान",
	"राम",
	"सीता",
	"लक्ष्मण",
	"हनुमान",
	"रावण",
	"कृष्ण",
	"राधा",
	"गोपी",
	"मथुरा",
	"वृंदावन",
	"अयोध्या",
	"काशी",
	"प्रयाग",
	"गंगा",
	"यमुना",
	"सरस्वती",
	"नर्मदा",
	"कावेरी",
	"गोदावरी",
	"सिंधु",
	"ब्रह्मपुत्र",
	"हिमालय",
	"विंध्याचल",
	"अरावली",
	"सतपुड़ा",
	"नीलगिरी",
	"सागर",
	"महासागर",
	"नदी",
	"झील",
	"तालाब",
	"कुआं",
	"झरना",
	"पहाड़",
	"पर्वत",
	"घाटी",
	"अनुभव",
	"सुविधा",
	"निर्णय",
	"प्रक्रिया",
	"कार्यक्रम",
	"निर्माण",
	"परिस्थिति",
	"विशेषता",
	"संस्था",
	"सामग्री",
	"आधारित",
	"उपयोग",
	"आविष्कार",
	"सुरक्षा",
	"संभावना",
	"प्रस्तुत",
	"विचार",
	"परिवर्तन",
	"सहयोग",
	"प्रतिस्पर्धा",
	"प्रयास",
	"अध्ययन",
	"विकास",
	"सामाजिक",
	"सांस्कृतिक",
	"आर्थिक",
	"रणनीति",
	"प्रबंधन",
	"दृष्टिकोण",
	"विश्लेषण",
	"प्रौद्योगिकी",
	"सकारात्मक",
	"नकारात्मक",
	"प्रस्ताव",
	"समस्या",
	"समाधान",
	"उद्देश्य",
	"महत्वपूर्ण",
	"आकर्षक",
	"उपयुक्त",
	"परिणामस्वरूप",
	"सुनिश्चित",
	"विकल्प",
	"प्रोत्साहित",
	"उपलब्ध",
	"सफलतापूर्वक",
	"प्रणाली",
	"उपकरण",
	"विस्तृत",
	"संसाधन",
	"प्रतिशत",
	"व्यापारिक",
	"निवेश",
	"भविष्य",
	"अनुसंधान",
	"प्रशासन",
	"निर्धारित",
	"समर्थन",
	"प्रसारित",
	"योजना",
	"उपभोक्ता",
	"समीक्षा",
	"आवश्यकता",
	"गतिविधि",
	"परिचय",
	"उल्लेख",
	"उत्पादन",
	"प्रभावित",
	"प्रदर्शित",
	"मानक",
	"आधुनिक",
	"प्राचीन",
	"परंपरा",
	"प्रतीक",
	"विश्वास",
	"सृजन",
	"क्षमता",
	"विशिष्ट",
	"वितरण",
	"उत्कृष्ट",
	"समस्याएं",
	"सुविधाएं",
	"संभावनाएं",
	"नीतियों",
	"योजनाओं",
	"कार्यक्रमों",
	"गतिविधियों",
	"परिस्थितियों",
	"अधिकारियों",
	"कर्मचारियों",
	"सदस्यों",
	"प्रतिनिधियों",
	"नेताओं",
	"नागरिकों",
	"व्यक्तियों",
	"संस्थाओं",
	"कंपनियों",
	"उद्योगों",
	"उत्पादों",
	"सेवाओं",
	"बाजारों",
	"ग्राहकों",
	"उपभोक्ताओं",
	"निवेशकों",
	"शेयरधारकों"
];
var allTargetsCache = null;
function getTargets() {
	if (allTargetsCache) return allTargetsCache;
	const targets = /* @__PURE__ */ new Set();
	keyboardRows.forEach((row) => {
		row.forEach((k) => {
			if (k.hi) targets.add(k.hi);
			if (k.shift) targets.add(k.shift);
		});
	});
	allTargetsCache = targets;
	return targets;
}
function generateExtendedPracticeSession(slug) {
	const template = templates[slug];
	if (!template) throw new Error(`Template not found for ${slug}`);
	let text = fillTemplate(template).replace(/\s+/g, " ").trim();
	let words = text.split(" ").filter((w) => w.length > 0);
	const subjects = [
		"राम",
		"मोहन",
		"अमन",
		"शिक्षक",
		"विद्यार्थी",
		"सरकार",
		"वैज्ञानिक",
		"किसान",
		"व्यापारी",
		"डॉक्टर"
	];
	const objects = [
		"किताब",
		"गाड़ी",
		"पेड़",
		"पत्र",
		"खाना",
		"दवा",
		"काम",
		"योजना",
		"नियम",
		"समस्या"
	];
	const verbs = [
		"पढ़ता है",
		"चलाता है",
		"काटता है",
		"लिखता है",
		"खाता है",
		"देता है",
		"करता है",
		"बनाता है",
		"सुलझाता है",
		"देखता है"
	];
	const places = [
		"घर में",
		"स्कूल में",
		"बाजार में",
		"गाँव में",
		"शहर में",
		"खेत में",
		"दुकान पर",
		"अस्पताल में",
		"दफ्तर में",
		"पार्क में"
	];
	let usedFillerWords = /* @__PURE__ */ new Set();
	if (words.length < 800) {
		text += "\n\nअन्य विवरण:\n";
		while (words.length < 800) {
			const s = subjects[Math.floor(Math.random() * subjects.length)];
			const p = places[Math.floor(Math.random() * places.length)];
			const o = objects[Math.floor(Math.random() * objects.length)];
			const v = verbs[Math.floor(Math.random() * verbs.length)];
			const sentence = `${s} ${p} ${DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)]} के साथ ${o} ${v}।`;
			const sWords = sentence.split(" ");
			if (!usedFillerWords.has(sentence)) {
				usedFillerWords.add(sentence);
				text += " " + sentence;
				words.push(...sWords);
			}
		}
	}
	const allTargets = getTargets();
	const remainingTargets = new Set(allTargets);
	const coveredTargets = /* @__PURE__ */ new Set();
	for (const char of text) if (remainingTargets.has(char)) {
		remainingTargets.delete(char);
		coveredTargets.add(char);
	}
	for (const target of Array.from(remainingTargets)) if (text.includes(target)) {
		remainingTargets.delete(target);
		coveredTargets.add(target);
	}
	const coveragePercentage = (allTargets.size - remainingTargets.size) / allTargets.size * 100;
	return {
		text,
		totalUniqueWords: new Set(words).size,
		totalWords: words.length,
		totalCharacters: text.length,
		coveredTargets: Array.from(coveredTargets),
		remainingTargets: Array.from(remainingTargets),
		coveragePercentage: parseFloat(coveragePercentage.toFixed(2))
	};
}
function PracticePage() {
	const { lesson } = Route.useSearch();
	const active = lessons.find((l) => l.slug === lesson) ?? lessons[0];
	const [dynamicText, setDynamicText] = (0, import_react.useState)(active.text);
	(0, import_react.useEffect)(() => {
		if (active.slug.startsWith("ch-full-practice")) {
			const session = generateFullPracticeSession(active.slug);
			let title = "Drill 1";
			if (active.slug === "ch-full-practice-2") title = "Drill 2";
			if (active.slug === "ch-full-practice-3") title = "Drill 3";
			console.log(`[${title}]\nUnique words: ${session.totalUniqueWords}\nCoverage: ${session.coveragePercentage}%`);
			if (active.slug !== "ch-full-practice") console.log(`[Full Practice Overlap]\noverlapCount: ${session.overlapCount}`);
			setDynamicText(session.text);
		} else if (active.slug.startsWith("ch-story-practice")) {
			const storyId = active.slug === "ch-story-practice-1" ? 1 : 2;
			const session = generateStoryPracticeSession(storyId);
			let title = `Story Practice ${storyId}`;
			console.log(`[${title}]\nword count: ${session.totalWords}\ncharacter count: ${session.totalCharacters}\ncovered mappings: ${session.coveredTargets.length}\nremaining mappings: ${session.remainingTargets.length}\ncoverage percentage: ${session.coveragePercentage}%`);
			setDynamicText(session.text);
		} else if ([
			"ch-news-practice",
			"ch-dialogue-practice",
			"ch-adventure-story"
		].includes(active.slug)) {
			const session = generateExtendedPracticeSession(active.slug);
			let title = "";
			if (active.slug === "ch-news-practice") title = "News Practice";
			else if (active.slug === "ch-dialogue-practice") title = "Dialogue Practice";
			else if (active.slug === "ch-adventure-story") title = "Adventure Story";
			console.log(`[${title}]\nword count: ${session.totalWords}\ncharacter count: ${session.totalCharacters}\ncovered mappings: ${session.coveredTargets.length}\nremaining mappings: ${session.remainingTargets.length}\ncoverage percentage: ${session.coveragePercentage}%`);
			setDynamicText(session.text);
		} else setDynamicText(active.text);
	}, [active.slug, active.text]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingArena, {
			lessonSlug: active.slug,
			text: dynamicText,
			title: active.title,
			subtitle: active.hindiTitle,
			timeLimit: active.minutes * 60,
			isParagraphMode: active.title === "Word Practice" || [
				"ch11",
				"ch22",
				"ch23",
				"ch24",
				"ch35",
				"ch36",
				"ch37",
				"ch43",
				"ch44",
				"ch45",
				"ch-full-practice",
				"ch-full-practice-2",
				"ch-full-practice-3",
				"ch-story-practice-1",
				"ch-story-practice-2",
				"ch-news-practice",
				"ch-dialogue-practice",
				"ch-adventure-story"
			].includes(active.slug)
		})
	});
}
//#endregion
export { PracticePage as component };
