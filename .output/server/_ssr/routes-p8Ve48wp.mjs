import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { n as SectionTitle } from "./GlassCard-DIxNQspi.mjs";
import { r as lessons } from "./typing-data-D0Th4K6Z.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Award, I as ChartColumn, N as ChevronRight, R as BookOpen, S as Gauge, b as Keyboard, c as Sparkles, n as X } from "../_libs/lucide-react.mjs";
import { n as categories } from "./lessons-D_j7lGJZ.mjs";
import { t as LessonCard } from "./LessonCard-Cwivbwqd.mjs";
import { t as HindiKeyboard } from "./HindiKeyboard-Bk1uhYz0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-p8Ve48wp.js
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
	const [isTutorModalOpen, setIsTutorModalOpen] = (0, import_react.useState)(false);
	const [activeLang, setActiveLang] = (0, import_react.useState)("Hindi");
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
					className: "flex-[1_1_min(100%,500px)] lg:max-w-[55%] flex flex-col gap-6 lg:gap-8 relative z-10 pt-4 lg:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "en inline-flex items-center gap-2 rounded-full bg-secondary/80 border border-border/40 px-4 py-1.5 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold tracking-wide text-primary uppercase w-fit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Premium Hindi typing trainer"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 py-1 pl-1 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.25] font-extrabold tracking-tight text-foreground",
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
									className: "bg-white/90 backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-[0_6px_18px_rgba(30,80,140,0.08)] rounded-[20px] px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1 transition-colors duration-200 group-hover:bg-primary/5 group-hover:border-primary/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none",
										children: s.k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance",
										children: s.v
									})]
								}, s.v))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/90 backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-[0_6px_18px_rgba(30,80,140,0.08)] rounded-[20px] px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1",
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-float-soft p-4 sm:p-[24px] rounded-[20px] bg-white/80 dark:bg-[linear-gradient(145deg,#162943,#102139)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.85)] dark:border-[rgba(80,130,220,0.28)] shadow-[0_8px_32px_rgba(30,80,140,0.12)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col gap-3 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 -mt-10 -mr-10 size-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "en text-[clamp(0.7rem,1.5vw,0.75rem)] font-bold tracking-widest text-muted-foreground dark:text-[#71839B] uppercase mb-1 px-1",
								children: "Explore"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group relative flex flex-col rounded-[20px] p-5 bg-white dark:bg-slate-800 border border-primary/30 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 relative z-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-[#0D203A] dark:text-[#3B82F6]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[26px]",
												children: "⌨️"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 flex flex-col justify-center min-h-[56px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "en font-bold text-slate-900 dark:text-[#F4F7FB] text-[20px] leading-tight",
												children: "Typing Tutor"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "en text-[13px] text-slate-500 dark:text-[#71839B] font-medium mt-0.5",
												children: "5 layouts available"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 relative z-10 flex flex-col gap-2",
										onClick: (e) => e.stopPropagation(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex bg-[#f1f5f9] dark:bg-[rgba(8,20,38,0.45)] p-1.5 rounded-[16px] border border-slate-200/50 dark:border-[rgba(255,255,255,0.06)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												onClick: () => setActiveLang("Hindi"),
												className: `flex-1 flex items-center justify-center h-[44px] rounded-[12px] text-[13px] font-bold cursor-pointer transition-all ${activeLang === "Hindi" ? "bg-white dark:bg-[#334762] text-slate-900 dark:text-[#FFFFFF] shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-[#91A2B8] dark:hover:bg-[rgba(255,255,255,0.05)] font-medium"}`,
												children: "Hindi"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												onClick: () => setActiveLang("English"),
												className: `flex-1 flex items-center justify-center h-[44px] rounded-[12px] text-[13px] font-bold cursor-pointer transition-all ${activeLang === "English" ? "bg-white dark:bg-[#334762] text-slate-900 dark:text-[#FFFFFF] shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-[#91A2B8] dark:hover:bg-[rgba(255,255,255,0.05)] font-medium"}`,
												children: "English"
											})]
										}), activeLang === "Hindi" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2 bg-[#f1f5f9] dark:bg-transparent p-3 rounded-[16px] border border-slate-200/50 dark:border-none",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/lessons",
													className: "flex items-center justify-center text-center h-[54px] px-2 rounded-[12px] text-[13px] leading-tight font-bold bg-[#2563eb] dark:bg-[#2B6FFF] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)] dark:shadow-[0_8px_20px_rgba(43,111,255,0.22)] transition-all cursor-pointer hover:opacity-90",
													children: "Remington GAIL"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-center text-center h-[54px] px-2 rounded-[12px] text-[13px] leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer",
													children: "Remington CBI"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-center text-center h-[54px] px-2 rounded-[12px] text-[13px] leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer",
													children: "Kruti Dev"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-center text-center h-[54px] px-2 rounded-[12px] text-[13px] leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer",
													children: "Mangal InScript"
												})
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/practice",
									className: "group relative flex flex-col rounded-[18px] p-4 bg-white/70 dark:bg-[#111F35] border border-slate-200 shadow-[0_4px_12px_rgba(30,80,140,0.06)] dark:border-[rgba(255,255,255,0.10)] transition-all duration-300 hover:bg-white/90 dark:hover:bg-[#1C304D] hover:shadow-[0_6px_16px_rgba(30,80,140,0.1)] hover:-translate-y-1 cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-[#172943] text-slate-400 transition-colors group-hover:bg-[#2563eb] group-hover:text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[12px] leading-none",
												children: "→"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-[#172943] text-slate-600 dark:text-[#F4F7FB] mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[20px]",
												children: "⚡"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "en font-bold text-slate-800 dark:text-[#F4F7FB] text-[15px] leading-tight",
											children: "Typing Test"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "en text-[12px] text-slate-600 dark:text-[#A9B8CC] font-medium mt-1",
											children: "Speed & Accuracy"
										})] })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/translator",
									className: "group relative flex flex-col rounded-[18px] p-4 bg-white/70 dark:bg-[#111F35] border border-slate-200 shadow-[0_4px_12px_rgba(30,80,140,0.06)] dark:border-[rgba(255,255,255,0.10)] transition-all duration-300 hover:bg-white/90 dark:hover:bg-[#1C304D] hover:shadow-[0_6px_16px_rgba(30,80,140,0.1)] hover:-translate-y-1 cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-[#172943] text-slate-400 transition-colors group-hover:bg-[#2563eb] group-hover:text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[12px] leading-none",
												children: "→"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-[#172943] text-slate-600 dark:text-[#F4F7FB] mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[20px]",
												children: "🌐"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "en font-bold text-slate-800 dark:text-[#F4F7FB] text-[15px] leading-tight",
											children: "Translator"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "en text-[12px] text-slate-600 dark:text-[#A9B8CC] font-medium mt-1",
											children: "Hindi ↔ English"
										})] })
									]
								})]
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
							className: "en text-[16px] font-bold text-foreground dark:text-[#0f172a] mb-[6px]",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-hindi text-[13px] text-[#64748b] dark:text-[#64748b] leading-[1.6]",
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
			})] }),
			isTutorModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md",
				style: { animation: "fadeIn 200ms ease-out" },
				onClick: (e) => {
					if (e.target === e.currentTarget) setIsTutorModalOpen(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-[460px] rounded-[24px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.75)] shadow-[0_24px_48px_rgba(30,80,140,0.12),0_0_40px_rgba(56,189,248,0.15)] p-6 sm:p-7",
					style: { animation: "scaleIn 200ms ease-out" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
            ` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsTutorModalOpen(false),
							className: "absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-800 hover:bg-white/40 rounded-full transition-colors focus:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "en text-[22px] font-extrabold text-slate-800 mb-5 px-1 tracking-tight",
							children: "Choose Typing Tutor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/lessons",
								onClick: () => setIsTutorModalOpen(false),
								className: "group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[18px] bg-white/50 border border-white/80 shadow-sm hover:shadow-md hover:bg-white/80 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative overflow-hidden gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "en font-bold text-slate-900 text-[15px] sm:text-[16px]",
											children: "Hindi Typing — Remington GAIL"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "en text-[13px] text-slate-600 mt-0.5 font-medium",
											children: "Hindi Remington GAIL typing practice"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 flex items-center justify-between sm:justify-end gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "en text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-widest",
											children: "Available"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-primary transition-transform group-hover:translate-x-1 hidden sm:block" })]
									})
								]
							}), [
								{
									title: "Hindi Typing — Remington CBI",
									sub: "Hindi Remington CBI typing practice"
								},
								{
									title: "Hindi Typing — KrutiDev",
									sub: "KrutiDev typing practice"
								},
								{
									title: "Hindi Typing — Mangal Inscript",
									sub: "Mangal Inscript typing practice"
								},
								{
									title: "English Typing Tutor",
									sub: "English typing practice"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[18px] bg-white/20 border border-white/30 cursor-not-allowed gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col opacity-75",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "en font-bold text-slate-700 text-[15px] sm:text-[16px]",
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "en text-[13px] text-slate-600 mt-0.5 font-medium",
										children: item.sub
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "en text-[10px] font-bold text-slate-600 bg-white/40 px-2.5 py-1 rounded-full uppercase tracking-widest",
										children: "Coming Soon"
									})
								})]
							}, item.title))]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
