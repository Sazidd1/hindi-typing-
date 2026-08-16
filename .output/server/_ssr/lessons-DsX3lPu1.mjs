import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { r as lessons } from "./typing-data-Cr2qQ1sa.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as ArrowRight, N as BookOpen, f as Play, g as Lock, o as Star, u as Search, v as Keyboard, x as Flame } from "../_libs/lucide-react.mjs";
import { n as categories } from "./lessons-DmYyIIxH.mjs";
import { t as LessonCard } from "./LessonCard-DjgjN3oH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons-DsX3lPu1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getTodayString() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function seedRandom(seed) {
	let x = Math.sin(seed++) * 1e4;
	return x - Math.floor(x);
}
function shuffle(array, seedStr) {
	let seed = 0;
	for (let i = 0; i < seedStr.length; i++) seed += seedStr.charCodeAt(i);
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(seedRandom(seed++) * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
function generateDailyChallenge(userId, progressData) {
	const today = getTodayString();
	const cacheKey = `daily_challenge_${userId}`;
	try {
		const cached = localStorage.getItem(cacheKey);
		if (cached) {
			const parsed = JSON.parse(cached);
			if (parsed.date === today && parsed.challenge) return parsed.challenge;
		}
	} catch (e) {}
	let previousLessonCompleted = true;
	let highestUnlockedIndex = 0;
	const unlockedKeys = /* @__PURE__ */ new Set();
	const unlockedWords = /* @__PURE__ */ new Set();
	for (let i = 0; i < lessons.length; i++) {
		const l = lessons[i];
		if (!previousLessonCompleted) break;
		highestUnlockedIndex = i;
		if (l.keys) for (const char of l.keys.replace(/\s+/g, "")) unlockedKeys.add(char);
		if (l.text) l.text.split(/\s+/).filter((w) => w.length > 0).forEach((w) => unlockedWords.add(w));
		previousLessonCompleted = !!(progressData[l.slug] || {}).completed;
	}
	if (unlockedWords.size === 0) {
		unlockedWords.add("रिरि");
		unlockedWords.add("िििि");
	}
	const charMistakes = {};
	try {
		const resultsStr = localStorage.getItem(`results_${userId}`);
		if (resultsStr) {
			const recent = JSON.parse(resultsStr).slice(0, 5);
			for (const res of recent) if (res.charMistakes) {
				for (const [char, count] of Object.entries(res.charMistakes)) if (unlockedKeys.has(char) || Array.from(unlockedWords).some((w) => w.includes(char))) charMistakes[char] = (charMistakes[char] || 0) + count;
			}
		}
	} catch (e) {}
	const topWeaknesses = Object.entries(charMistakes).sort((a, b) => b[1] - a[1]).filter(([_, count]) => count > 1).map(([char]) => char).slice(0, 3);
	let practiceWords = [];
	let challengeTitle = "Daily Challenge";
	let challengeDesc = "Mixed Practice";
	if (topWeaknesses.length > 0) {
		challengeDesc = `Focus on: ${topWeaknesses.join(", ")}`;
		const focusWords = Array.from(unlockedWords).filter((word) => topWeaknesses.some((weakChar) => word.includes(weakChar)));
		if (focusWords.length >= 5) {
			let pool = focusWords;
			pool = pool.concat(Array.from(unlockedWords).slice(0, 10));
			const shuffled = shuffle(pool, today + userId);
			while (practiceWords.length < 30 && shuffled.length > 0) {
				practiceWords.push(shuffled[practiceWords.length % shuffled.length]);
				if (practiceWords.length >= 30) break;
			}
		} else {
			const drillWords = [];
			for (let i = 0; i < 30; i++) {
				let word = "";
				for (let j = 0; j < 4; j++) if (Math.random() > .5 && topWeaknesses.length > 0) word += topWeaknesses[i % topWeaknesses.length];
				else {
					const arrKeys = Array.from(unlockedKeys);
					word += arrKeys[Math.floor(Math.random() * arrKeys.length)] || "र";
				}
				drillWords.push(word);
			}
			practiceWords = drillWords;
		}
	} else {
		const shuffled = shuffle(Array.from(unlockedWords), today + userId);
		for (let i = 0; i < 30; i++) practiceWords.push(shuffled[i % shuffled.length]);
	}
	const challenge = {
		slug: "daily-challenge",
		title: challengeTitle,
		hindiTitle: "दैनिक चुनौती",
		description: challengeDesc,
		level: highestUnlockedIndex < 11 ? "शुरुआती" : highestUnlockedIndex < 21 ? "मध्यम" : "उन्नत",
		keys: topWeaknesses.length > 0 ? topWeaknesses.join(" ") : "Unlocked Keys",
		minutes: 3,
		text: practiceWords.join(" ")
	};
	try {
		localStorage.setItem(cacheKey, JSON.stringify({
			date: today,
			challenge
		}));
	} catch (e) {}
	return challenge;
}
var extendedCurriculumBase = [...lessons.map((l) => ({
	...l,
	type: "lesson",
	path: "/practice",
	search: { lesson: l.slug },
	icon: BookOpen
}))];
function LessonsPage() {
	const { currentUser } = useAuth();
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All");
	const [progressData, setProgressData] = (0, import_react.useState)({});
	const [lockedLessonIntent, setLockedLessonIntent] = (0, import_react.useState)(null);
	const loadProgress = (0, import_react.useCallback)(() => {
		if (!currentUser) return;
		const data = {};
		for (const l of extendedCurriculumBase) {
			const saved = localStorage.getItem(`lesson_state_${currentUser}_${l.slug}`);
			if (saved) try {
				data[l.slug] = JSON.parse(saved);
			} catch (e) {}
		}
		const savedDaily = localStorage.getItem(`lesson_state_${currentUser}_daily-challenge`);
		if (savedDaily) try {
			data["daily-challenge"] = JSON.parse(savedDaily);
		} catch (e) {}
		setProgressData(data);
	}, [currentUser]);
	(0, import_react.useEffect)(() => {
		loadProgress();
		window.addEventListener("lessonProgressUpdated", loadProgress);
		return () => window.removeEventListener("lessonProgressUpdated", loadProgress);
	}, [loadProgress]);
	const extendedCurriculum = (0, import_react.useMemo)(() => {
		let previousLessonCompleted = true;
		return extendedCurriculumBase.map((baseItem) => {
			const saved = progressData[baseItem.slug] || {
				progress: 0,
				completed: false
			};
			const isTest = baseItem.type === "test";
			const isLocked = !isTest && !previousLessonCompleted;
			const item = {
				...baseItem,
				progress: saved.progress || 0,
				isCompleted: saved.completed || false,
				isLocked
			};
			if (!isTest) previousLessonCompleted = item.isCompleted;
			return item;
		});
	}, [progressData]);
	const filteredItems = extendedCurriculum.filter((item) => {
		const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = activeCategory === "All" || item.description === activeCategory;
		return matchesSearch && matchesCategory;
	});
	const dailyChallenge = (0, import_react.useMemo)(() => {
		if (!currentUser) return {
			...extendedCurriculum.find((l) => l.slug === "ch11") || extendedCurriculum[10] || extendedCurriculum[0],
			isLocked: false
		};
		const challengeLesson = generateDailyChallenge(currentUser, progressData);
		const saved = progressData[challengeLesson.slug] || {
			progress: 0,
			completed: false
		};
		return {
			...challengeLesson,
			type: "lesson",
			path: "/practice",
			search: { lesson: challengeLesson.slug },
			icon: Flame,
			progress: saved.progress || 0,
			isCompleted: saved.completed || false,
			isLocked: false
		};
	}, [
		currentUser,
		progressData,
		extendedCurriculum
	]);
	const recommendedLesson = (0, import_react.useMemo)(() => {
		const nextUnfinished = extendedCurriculum.find((l) => !l.isLocked && !l.isCompleted && l.type !== "test");
		if (nextUnfinished) return nextUnfinished;
		return extendedCurriculum.find((l) => l.slug === "ch22") || extendedCurriculum[0];
	}, [extendedCurriculum]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-12 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 md:flex-row md:items-end md:justify-between animate-rise-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Curriculum",
					title: "Learning Center",
					subtitle: "हर पाठ आपको अगले स्तर के लिए तैयार करता है — क्रम से अभ्यास करें।"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full md:w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						className: "h-11 w-full rounded-full border border-border bg-white/50 pl-10 pr-4 text-sm outline-none backdrop-blur-md transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:bg-black/20",
						placeholder: "Search lessons...",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value)
					})]
				})]
			}),
			searchQuery === "" && activeCategory === "All" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2 animate-rise-in",
				style: { animationDelay: "100ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "group relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent-blue/5 border-primary/20 p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-surface-grid opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative p-4 sm:p-5 flex flex-col h-full justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3" }), " Daily Challenge"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold text-muted-foreground",
										children: "+50 XP"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 bg-white/40 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-none",
									children: [
										"⏱ ",
										dailyChallenge.minutes,
										"m"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg sm:text-xl font-bold text-foreground mb-1 leading-tight",
								children: dailyChallenge.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-primary font-hindi text-base font-bold mb-1.5 leading-tight",
								children: dailyChallenge.hindiTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground font-hindi text-[12px] max-w-md line-clamp-2 leading-snug",
								children: dailyChallenge.description
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: dailyChallenge.path,
								search: dailyChallenge.search,
								className: "inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-[12px] font-bold text-white shadow-sm hover:bg-blue-700 transition-all",
								children: ["Accept Challenge ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5 fill-current" })]
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
					className: "group relative overflow-hidden border-accent-blue/20 p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative p-4 sm:p-5 flex flex-col h-full justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 rounded-full bg-accent-blue/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-blue",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3" }), " Recommended"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 bg-white/40 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-none",
								children: [
									"⏱ ",
									recommendedLesson.minutes,
									"m"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base sm:text-lg font-bold text-foreground leading-tight",
									children: recommendedLesson.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground font-hindi text-[12px] mt-0.5 line-clamp-2 leading-snug",
									children: recommendedLesson.description
								})]
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[10px] font-bold tracking-wide uppercase items-center leading-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Progress"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-foreground",
										children: [recommendedLesson.progress, "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 w-full overflow-hidden rounded-full bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-accent-blue transition-all duration-1000 ease-out rounded-full",
										style: { width: `${recommendedLesson.progress}%` }
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: recommendedLesson.path,
								search: recommendedLesson.search,
								className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[12px] font-bold text-white transition-all hover:bg-blue-700 shadow-sm",
								children: ["Continue Learning ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none animate-rise-in",
				style: { animationDelay: "150ms" },
				children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setActiveCategory(cat),
					className: `whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-semibold transition-all ${activeCategory === cat ? "bg-foreground text-background shadow-md" : "bg-white/60 text-muted-foreground hover:bg-white/90 hover:text-foreground dark:bg-black/20 dark:hover:bg-black/40"}`,
					children: cat
				}, cat))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 animate-rise-in",
				style: { animationDelay: "200ms" },
				children: filteredItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonCard, {
					item,
					setLockedLessonIntent
				}, item.slug))
			}),
			filteredItems.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-24 text-center animate-rise-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-24 items-center justify-center rounded-full bg-secondary text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-12" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-6 text-2xl font-bold text-foreground",
						children: "No lessons found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Try adjusting your search or category filters."
					})
				]
			}),
			lockedLessonIntent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 transition-all duration-200 animate-in fade-in",
				onClick: () => setLockedLessonIntent(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-[90%] max-w-[400px] bg-background border border-border rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.18)] animate-in zoom-in-95 duration-200",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-xl font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5 text-muted-foreground" }), "Lesson Locked"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3 text-[14px] text-muted-foreground font-medium leading-snug",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Complete the previous lesson first to follow the recommended learning path." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You can still continue if you prefer." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex items-center justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLockedLessonIntent(null),
								className: "px-5 py-2.5 rounded-xl text-[13px] font-bold text-muted-foreground bg-secondary hover:bg-secondary/80 transition-colors",
								children: "Go Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: lockedLessonIntent.path,
								search: lockedLessonIntent.search,
								onClick: () => setLockedLessonIntent(null),
								className: "px-5 py-2.5 rounded-xl text-[13px] font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm",
								children: "Continue Anyway"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { LessonsPage as component };
