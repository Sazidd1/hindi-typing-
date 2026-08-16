import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { r as lessons } from "./typing-data-Cr2qQ1sa.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Award, N as BookOpen, b as Gauge, j as ChartColumn, s as Sparkles, v as Keyboard } from "../_libs/lucide-react.mjs";
import { n as categories } from "./lessons-DmYyIIxH.mjs";
import { t as LessonCard } from "./LessonCard-DjgjN3oH.mjs";
import { t as HindiKeyboard } from "./HindiKeyboard-DPfL05b-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BHxtk_KJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: Keyboard,
		title: "Remington Keyboard",
		text: "एनिमेटेड वर्चुअल कीबोर्ड और उंगली मार्गदर्शन के साथ सही तकनीक सीखें।",
		bg: "linear-gradient(135deg, #2563eb, #3b82f6)",
		to: "/practice"
	},
	{
		icon: Gauge,
		title: "Live WPM",
		text: "हर कीस्ट्रोक पर गति, शुद्धता और त्रुटियाँ रीयल-टाइम में देखें।",
		bg: "linear-gradient(135deg, #16a34a, #22c55e)",
		to: "/practice"
	},
	{
		icon: ChartColumn,
		title: "Progress Analytics",
		text: "साप्ताहिक चार्ट, स्ट्रीक और अभ्यास समय एक ही डैशबोर्ड पर।",
		bg: "linear-gradient(135deg, #ea580c, #f97316)",
		to: "/dashboard"
	},
	{
		icon: Award,
		title: "Achievements",
		text: "बैज और लीडरबोर्ड आपको हर दिन अभ्यास के लिए प्रेरित करते हैं।",
		bg: "linear-gradient(135deg, #ca8a04, #eab308)",
		to: "/profile"
	}
];
function Index() {
	const { currentUser } = useAuth();
	const [progressData, setProgressData] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (!currentUser) return;
		const loadData = () => {
			const data = {};
			for (const l of lessons) {
				const saved = localStorage.getItem(`lesson_state_${currentUser}_${l.slug}`);
				if (saved) try {
					data[l.slug] = JSON.parse(saved);
				} catch (e) {}
			}
			setProgressData(data);
		};
		loadData();
		window.addEventListener("lessonProgressUpdated", loadData);
		return () => window.removeEventListener("lessonProgressUpdated", loadData);
	}, [currentUser]);
	const displayLessons = (0, import_react.useMemo)(() => {
		let previousLessonCompleted = true;
		return lessons.slice(0, 6).map((baseItem) => {
			const saved = progressData[baseItem.slug] || {
				progress: 0,
				completed: false
			};
			const isLocked = !previousLessonCompleted;
			const item = {
				...baseItem,
				icon: BookOpen,
				path: "/practice",
				search: { lesson: baseItem.slug },
				progress: saved.progress || 0,
				isCompleted: saved.completed || false,
				isLocked
			};
			previousLessonCompleted = item.isCompleted;
			return item;
		});
	}, [progressData]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-wrap items-center justify-between gap-10 lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-[1_1_min(100%,450px)] lg:max-w-[55%] animate-rise-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "en inline-flex items-center gap-2 rounded-full bg-secondary/80 border border-border/40 px-4 py-1.5 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold tracking-wide text-primary uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Premium Hindi typing trainer"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 py-1 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.25] font-extrabold tracking-tight text-foreground",
							children: ["हिंदी टाइपिंग सीखें,", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient block mt-1",
								children: "तेज़ी और शुद्धता के साथ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl font-hindi text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-muted-foreground",
							children: "संरचित पाठ, परीक्षा-स्तरीय अभ्यास और रीयल-टाइम विश्लेषण — सब कुछ एक सुंदर, सहज इंटरफ़ेस में।"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/practice",
								className: "btn-primary inline-flex justify-center items-center w-full sm:w-auto",
								children: "अभ्यास शुरू करें"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lessons",
								className: "inline-flex justify-center items-center rounded-full border border-border bg-card/80 px-6 py-3.5 sm:py-3 text-[clamp(0.875rem,2vw,0.875rem)] sm:text-[1rem] font-semibold text-foreground transition-colors hover:bg-card",
								children: "पाठ देखें"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid max-w-lg grid-cols-3 gap-3 sm:gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lessons",
								className: "col-span-2 grid grid-cols-2 gap-3 sm:gap-4 group cursor-pointer hover:-translate-y-0.5 transition-transform duration-200",
								children: [{
									k: `${lessons.length}+`,
									v: "Lessons"
								}, {
									k: `${categories.length}+`,
									v: "Lesson Tracks"
								}].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1 transition-colors duration-200 group-hover:bg-primary/5 group-hover:border-primary/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none",
										children: s.k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance",
										children: s.v
									})]
								}, s.v))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none",
									children: "100%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance",
									children: "Free to use"
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-[1_1_min(100%,350px)] lg:max-w-[42%]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: "animate-float-soft p-5 sm:p-6",
						hover: false,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "en text-[clamp(0.7rem,1.5vw,0.75rem)] font-semibold tracking-wide text-muted-foreground uppercase",
								children: "Live preview"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-hindi text-[clamp(1.25rem,3vw,1.5rem)] leading-relaxed",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-success",
										children: "कर कब कहा"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md bg-primary px-1 text-primary-foreground",
										children: "दि"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "न दिया सिर सदा"
									}),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-danger/15 text-danger underline",
										children: "हरा"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-3 gap-2 sm:gap-3 text-center",
								children: [
									{
										l: "WPM",
										v: "42",
										c: "text-primary"
									},
									{
										l: "Accuracy",
										v: "97%",
										c: "text-success"
									},
									{
										l: "Errors",
										v: "3",
										c: "text-danger"
									}
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-card/70 border border-border/50 py-2 sm:py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `en text-[clamp(1.125rem,2.5vw,1.25rem)] font-semibold ${s.c}`,
										children: s.v
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "en text-[clamp(0.65rem,1.5vw,0.6875rem)] tracking-wide text-muted-foreground uppercase",
										children: s.l
									})]
								}, s.l))
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-[32px] animate-rise-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "en block text-[#2563eb] font-bold text-[12px] tracking-[1px] uppercase mb-2",
						children: "Why Abhyas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "en text-[30px] font-extrabold text-foreground leading-tight",
						children: "A learning experience built for Hindi typists"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[14.5px] text-[#64748b] max-w-2xl font-hindi leading-relaxed",
						children: "हर सुविधा आपकी गति और आत्मविश्वास बढ़ाने के लिए डिज़ाइन की गई है।"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-[20px] grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
				children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: f.to,
					className: "group block bg-[#ffffff] border border-[#e6ebf2] rounded-[16px] px-[22px] py-[26px] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(20,30,60,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 animate-rise-in cursor-pointer",
					style: { animationDelay: `${i * 60}ms` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex w-[46px] h-[46px] items-center justify-center rounded-[12px] mb-[16px] transition-transform duration-200 group-hover:scale-110",
							style: { background: f.bg },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "w-[20px] h-[20px] text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "en text-[16px] font-bold text-foreground mb-[6px]",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-hindi text-[13px] text-[#64748b] leading-[1.6]",
							children: f.text
						})
					]
				}, f.title))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Curriculum",
					title: "Six structured lesson tracks",
					subtitle: "होम रो से लेकर परीक्षा अभ्यास तक — क्रमबद्ध रूप से आगे बढ़ें।"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lessons",
					className: "group mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground shrink-0",
					children: ["More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "transition-transform group-hover:translate-x-0.5",
						children: "→"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
				children: displayLessons.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonCard, { item: l }, l.slug))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Virtual keyboard",
				title: "Hindi Remington layout with finger guidance",
				subtitle: "हर अक्षर के लिए सही उंगली और शिफ्ट संकेत।"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HindiKeyboard, { nextChar: "क" })
			})] })
		]
	});
}
//#endregion
export { Index as component };
