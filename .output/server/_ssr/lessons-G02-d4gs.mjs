import { i as __toESM } from "../_runtime.mjs";
import { r as lessons } from "./typing-data-GALeOzeh.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useAuth } from "./auth-zFGTrjhs.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowRight, S as CircleCheckBig, T as BookOpen, _ as Flame, a as Star, d as Play, h as Keyboard, i as Target, l as Search, m as Lock, t as Zap } from "../_libs/lucide-react.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DkZiCYPI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons-G02-d4gs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var extendedCurriculumBase = [
	...lessons.map((l) => ({
		...l,
		type: "lesson",
		path: "/practice",
		search: { lesson: l.slug },
		icon: BookOpen
	})),
	{
		slug: "speed-test",
		title: "Speed Test",
		hindiTitle: "गति परीक्षण",
		description: "Tests",
		level: "उन्नत",
		keys: "पूर्ण कीबोर्ड",
		minutes: 5,
		type: "test",
		path: "/practice",
		search: { lesson: "speed-test" },
		icon: Zap
	},
	{
		slug: "accuracy-test",
		title: "Accuracy Test",
		hindiTitle: "शुद्धता परीक्षण",
		description: "Tests",
		level: "उन्नत",
		keys: "पूर्ण कीबोर्ड",
		minutes: 5,
		type: "test",
		path: "/practice",
		search: { lesson: "accuracy-test" },
		icon: Target
	}
];
var categories = [
	"All",
	"Home Row",
	"Top Row",
	"Bottom Row",
	"Mixed",
	"Tests"
];
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
	const dailyChallenge = extendedCurriculum.find((l) => l.slug === "ch11") || extendedCurriculum[10] || extendedCurriculum[0];
	const recommendedLesson = extendedCurriculum.find((l) => l.slug === "ch22") || extendedCurriculum[21] || extendedCurriculum[0];
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
						className: "relative p-7 sm:p-9 flex flex-col h-full justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5" }), " Daily Challenge"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-muted-foreground",
									children: "+50 XP"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl sm:text-3xl font-bold text-foreground mb-2",
								children: dailyChallenge.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-primary font-hindi text-lg font-semibold mb-3",
								children: dailyChallenge.hindiTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground font-hindi text-sm max-w-md",
								children: dailyChallenge.description
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: dailyChallenge.path,
								search: dailyChallenge.search,
								className: "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40",
								children: ["Accept Challenge ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current" })]
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
					className: "group relative overflow-hidden border-accent-blue/20 p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative p-7 sm:p-9 flex flex-col h-full justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2 mb-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5 rounded-full bg-accent-blue/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-blue",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" }), " Recommended"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-7" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl sm:text-2xl font-bold text-foreground",
								children: recommendedLesson.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground font-hindi text-sm mt-1.5",
								children: recommendedLesson.description
							})] })]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 space-y-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs font-bold tracking-wide uppercase",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Progress"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-foreground",
										children: [recommendedLesson.progress, "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-full overflow-hidden rounded-full bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-accent-blue transition-all duration-1000 ease-out rounded-full",
										style: { width: `${recommendedLesson.progress}%` }
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: recommendedLesson.path,
								search: recommendedLesson.search,
								className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-foreground hover:text-background",
								children: ["Continue Learning ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
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
				children: filteredItems.map((item, i) => {
					const Icon = item.icon;
					const isCompleted = item.progress === 100;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group flex flex-col p-3 sm:p-3.5 rounded-[22px] bg-gradient-to-br from-[#EAF6FF] to-[#E0F2FE] border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-[2px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`,
									children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 rounded-full px-2.5 py-[3px] text-[9px] font-bold uppercase tracking-wider leading-none bg-emerald-100/80 text-emerald-700",
									children: item.level
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 flex-1 flex flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-[13px] font-bold text-slate-800 transition-colors line-clamp-1 leading-snug",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-hindi text-[22px] sm:text-[25px] font-extrabold text-blue-600 leading-tight line-clamp-1 mt-0.5",
										children: item.hindiTitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-hindi text-[11px] text-slate-500 line-clamp-1 leading-snug mt-1",
										children: item.description
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 flex flex-wrap text-[10px] font-bold uppercase tracking-wider text-slate-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 bg-white/40 px-2 py-1 rounded-md leading-none",
									children: [
										"⏱ ",
										item.minutes,
										"m"
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1.5 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[9px] font-bold uppercase tracking-wider items-center leading-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400",
										children: "Progress"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: isCompleted ? "text-green-600" : "text-slate-700",
										children: [item.progress, "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 w-full overflow-hidden rounded-full bg-black/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full rounded-full transition-all duration-1000 ${isCompleted ? "bg-green-500" : "bg-blue-500"}`,
										style: { width: `${item.progress}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5",
								children: item.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setLockedLessonIntent(item),
									className: "flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-bold leading-none transition-colors bg-slate-200 text-slate-500 hover:bg-slate-300 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start Lesson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.path,
									search: item.search,
									className: `flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-bold leading-none transition-colors ${isCompleted ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isCompleted ? "Practice Again" : item.progress > 0 ? "Continue" : "Start Lesson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})
							})
						]
					}, item.slug);
				})
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
					className: "w-[90%] max-w-[400px] bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in zoom-in-95 duration-200",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-xl font-bold text-slate-800 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5 text-slate-400" }), "Lesson Locked"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3 text-[14px] text-slate-600 font-medium leading-snug",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Complete the previous chapter first to follow the recommended learning path." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "You can still continue if you prefer." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex items-center justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setLockedLessonIntent(null),
								className: "px-5 py-2.5 rounded-xl text-[13px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors",
								children: "Go Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: lockedLessonIntent.path,
								search: lockedLessonIntent.search,
								onClick: () => setLockedLessonIntent(null),
								className: "px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm",
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
