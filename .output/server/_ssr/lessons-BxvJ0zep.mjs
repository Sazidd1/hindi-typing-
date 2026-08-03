import { i as __toESM } from "../_runtime.mjs";
import { i as lessons } from "./typing-data-COXiq1J7.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as BookOpen, a as Star, d as Play, g as Flame, i as Target, l as Search, m as Keyboard, t as Zap, w as ArrowRight, y as CircleCheckBig } from "../_libs/lucide-react.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DkZiCYPI.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons-BxvJ0zep.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var extendedCurriculum = [
	...lessons.map((l) => ({
		...l,
		type: "lesson",
		path: "/practice",
		search: { lesson: l.slug },
		icon: BookOpen,
		progress: 0
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
		icon: Zap,
		progress: 0
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
		icon: Target,
		progress: 0
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
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All");
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
					className: `whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${activeCategory === cat ? "bg-foreground text-background shadow-md" : "bg-white/60 text-muted-foreground hover:bg-white/90 hover:text-foreground dark:bg-black/20 dark:hover:bg-black/40"}`,
					children: cat
				}, cat))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3 animate-rise-in",
				style: { animationDelay: "200ms" },
				children: filteredItems.map((item, i) => {
					const Icon = item.icon;
					const isCompleted = item.progress === 100;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: "group flex h-full flex-col p-6 hover:border-primary/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${isCompleted ? "bg-success/15 text-success" : "bg-gradient-to-br from-primary to-accent-blue text-primary-foreground shadow-lg shadow-primary/20"}`,
									children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-7" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-7" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-end gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider ${item.level === "शुरुआती" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : item.level === "मध्यम" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"}`,
										children: item.level
									}), item.type === "lesson" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold text-muted-foreground",
										children: ["Module ", String(i + 1).padStart(2, "0")]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground group-hover:text-primary transition-colors",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-hindi text-[15px] font-semibold text-primary mb-2.5",
										children: item.hindiTitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-hindi text-sm text-muted-foreground line-clamp-2 leading-relaxed",
										children: item.description
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5",
									children: [
										"⏱ ",
										item.minutes,
										" min"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5 font-hindi",
									children: ["⌨ ", item.keys]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[11px] font-bold uppercase tracking-wider",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Completion"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: isCompleted ? "text-success" : "text-foreground",
										children: [item.progress, "%"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 w-full overflow-hidden rounded-full bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `h-full rounded-full transition-all duration-1000 ${isCompleted ? "bg-success" : "bg-primary"}`,
										style: { width: `${item.progress}%` }
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-7",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.path,
									search: item.search,
									className: `inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${isCompleted ? "bg-success/10 text-success hover:bg-success/20" : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[0_8px_16px_-6px_var(--color-primary)] hover:-translate-y-0.5"}`,
									children: [isCompleted ? "Practice Again" : item.progress > 0 ? "Continue Lesson" : "Start Lesson", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
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
			})
		]
	});
}
//#endregion
export { LessonsPage as component };
