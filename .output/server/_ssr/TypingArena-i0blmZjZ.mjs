import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useAuth } from "./auth-zFGTrjhs.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as HindiKeyboard } from "./HindiKeyboard-CroUj3y1.mjs";
import { r as Trophy, u as RotateCcw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TypingArena-i0blmZjZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function TypingArena({ text, title, subtitle, timeLimit, showKeyboard = true, isParagraphMode = false, onComplete }) {
	const chars = (0, import_react.useMemo)(() => Array.from(text), [text]);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [startedAt, setStartedAt] = (0, import_react.useState)(null);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [errors, setErrors] = (0, import_react.useState)(0);
	const [finished, setFinished] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const completedRef = (0, import_react.useRef)(false);
	const { currentUser } = useAuth();
	const typedChars = (0, import_react.useMemo)(() => Array.from(typed), [typed]);
	const correctCount = typedChars.filter((c, i) => c === chars[i]).length;
	const accuracy = typedChars.length ? Math.max(0, Math.round(correctCount / typedChars.length * 100)) : 100;
	const minutes = elapsed / 60;
	const wpm = minutes > 0 ? Math.max(0, Math.round(correctCount / 5 / minutes)) : 0;
	const progress = Math.min(100, Math.round(typedChars.length / chars.length * 100));
	timeLimit && Math.max(0, timeLimit - elapsed);
	const reset = (0, import_react.useCallback)(() => {
		setTyped("");
		setStartedAt(null);
		setElapsed(0);
		setErrors(0);
		setFinished(false);
		completedRef.current = false;
		inputRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		reset();
	}, [text, reset]);
	(0, import_react.useEffect)(() => {
		if (startedAt === null || finished) return;
		const id = window.setInterval(() => {
			setElapsed(Math.floor((Date.now() - startedAt) / 1e3));
		}, 200);
		return () => window.clearInterval(id);
	}, [startedAt, finished]);
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
				const newResult = {
					date: `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`,
					wpm: `${wpm} WPM`,
					acc: `${accuracy}%`
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
	let currentStreak = 0;
	for (let i = typedChars.length - 1; i >= 0; i--) if (typedChars[i] === chars[i]) currentStreak++;
	else break;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-[98%] max-w-[1300px] flex flex-col lg:flex-row gap-6 lg:gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 w-full space-y-4 sm:space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-full overflow-hidden rounded-full bg-secondary/50 shadow-inner",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full transition-all duration-300 ease-out",
							style: {
								width: `${progress}%`,
								background: "var(--gradient-primary)"
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto w-fit min-w-[50%] min-h-[140px] cursor-text rounded-3xl p-4 sm:p-6 bg-white/60 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 group overflow-hidden",
						onClick: () => inputRef.current?.focus(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-y-4 sm:gap-y-5 w-full items-center overflow-x-auto custom-scrollbar",
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
											className: "w-full text-2xl sm:text-[28px] leading-[2.2] text-left font-hindi select-none flex flex-wrap gap-x-3 gap-y-2 px-2",
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
															className: cn("transition-colors duration-200", isCurrent && "text-[#F59E0B] underline decoration-2 underline-offset-4", state === "correct" && !isCurrent && "text-[#16A34A]", state === "wrong" && !isCurrent && "text-[#EF4444]", state === "pending" && !isCurrent && "text-[#B8C1CC]"),
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
														className: cn("flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 transition-all duration-200 shrink-0", isSpace ? "w-14 sm:w-16" : "size-11 sm:size-12", state === "pending" && !isCurrent && "border border-border/60 text-[#B8C1CC]", isCurrent && "border-2 border-[#F59E0B] z-10 shadow-[0_4px_14px_rgba(245,158,11,0.2)] text-[#F59E0B] scale-105", state === "correct" && !isCurrent && "border border-[#16A34A]/30 bg-[#16A34A]/5 text-[#16A34A]", state === "wrong" && !isCurrent && "border-2 border-[#EF4444] bg-[#EF4444]/10 text-[#EF4444]"),
														children: isSpace ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("text-[9px] sm:text-[10px] font-bold uppercase tracking-widest", state === "pending" ? "text-[#B8C1CC]/70" : state === "correct" ? "text-[#16A34A]/70" : state === "wrong" ? "text-[#EF4444]" : "text-[#F59E0B]"),
															children: "Space"
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-hindi text-xl sm:text-2xl font-bold",
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
												row.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-[80px] sm:w-[120px] shrink-0" }),
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
								spellCheck: false,
								autoComplete: "off",
								autoCorrect: "off",
								autoCapitalize: "off",
								"aria-label": "Hindi typing input",
								className: "absolute inset-0 size-full resize-none rounded-3xl bg-transparent p-12 text-transparent caret-transparent outline-none z-10"
							}),
							!startedAt && !finished && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-background/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-md shadow-md border border-border",
									children: "Click anywhere to start typing"
								})
							}),
							finished && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 rounded-3xl bg-background/95 p-8 backdrop-blur-xl animate-in zoom-in-95 duration-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent-blue/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-10 text-primary drop-shadow-md" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-2xl font-bold text-foreground",
											children: "Session Complete!"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground font-hindi",
											children: subtitle
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4 w-full max-w-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center justify-center rounded-2xl bg-secondary/50 p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-bold uppercase tracking-wider text-muted-foreground",
												children: "Speed"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-3xl font-bold text-primary",
												children: [
													wpm,
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-lg",
														children: "WPM"
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col items-center justify-center rounded-2xl bg-secondary/50 p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-bold uppercase tracking-wider text-muted-foreground",
												children: "Accuracy"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-3xl font-bold text-success",
												children: [accuracy, "%"]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-6 text-sm font-semibold text-muted-foreground mt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Time: ", formatTime(elapsed)] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-border" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Errors: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-danger",
												children: errors
											})] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: reset,
										className: "mt-4 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-primary/30",
										style: { background: "var(--gradient-primary)" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-5" }), " Practice Again"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2 mx-auto max-w-[850px]",
						children: showKeyboard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HindiKeyboard, { nextChar })
					})
				]
			}),
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full lg:w-[320px] shrink-0 space-y-4 mt-6 lg:mt-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-secondary/40 rounded-[2rem] p-6 shadow-sm border border-border/50 flex flex-col gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-foreground",
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
										className: "flex items-baseline gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-3xl font-bold text-primary",
											children: wpm
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-muted-foreground",
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
										className: "flex items-baseline gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-3xl font-bold text-success",
											children: accuracy
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-muted-foreground",
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
										className: "flex items-baseline gap-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xl font-bold text-foreground",
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
										className: "flex items-baseline gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xl font-bold text-orange-500",
											children: currentStreak
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg",
											children: "🔥"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-background rounded-2xl p-4 h-32 flex items-end justify-between gap-1.5 shadow-sm border border-border/40 overflow-hidden",
							children: [
								40,
								55,
								45,
								75,
								65,
								90,
								85
							].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-primary rounded-t-sm transition-all duration-500",
								style: {
									height: `${h}%`,
									opacity: .3 + i * .1
								}
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: reset,
							className: "w-full bg-[#1a1b1e] hover:bg-black text-white rounded-xl py-4 flex items-center justify-center gap-2 font-semibold transition-colors shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-3.5 bg-white/90 rounded-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-3.5 bg-white/90 rounded-sm" })]
							}), "Pause Session"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background rounded-[2rem] p-5 shadow-sm border border-border/40 flex items-center justify-between cursor-pointer hover:bg-secondary/20 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-sm text-foreground",
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
	});
}
function formatTime(total) {
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}
//#endregion
export { TypingArena as t };
