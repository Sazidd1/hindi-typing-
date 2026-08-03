import { i as lessons } from "./typing-data-COXiq1J7.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as HindiKeyboard } from "./HindiKeyboard-CroUj3y1.mjs";
import { C as Award, b as ChartColumn, h as Gauge, i as Target, m as Keyboard, o as Sparkles } from "../_libs/lucide-react.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DkZiCYPI.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-AF6MH2oT.js
var import_jsx_runtime = require_jsx_runtime();
var features = [
	{
		icon: Keyboard,
		title: "Remington Keyboard",
		text: "एनिमेटेड वर्चुअल कीबोर्ड और उंगली मार्गदर्शन के साथ सही तकनीक सीखें।"
	},
	{
		icon: Gauge,
		title: "Live WPM",
		text: "हर कीस्ट्रोक पर गति, शुद्धता और त्रुटियाँ रीयल-टाइम में देखें।"
	},
	{
		icon: ChartColumn,
		title: "Progress Analytics",
		text: "साप्ताहिक चार्ट, स्ट्रीक और अभ्यास समय एक ही डैशबोर्ड पर।"
	},
	{
		icon: Award,
		title: "Achievements",
		text: "बैज और लीडरबोर्ड आपको हर दिन अभ्यास के लिए प्रेरित करते हैं।"
	}
];
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-rise-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Premium Hindi typing trainer"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 text-4xl leading-tight font-semibold tracking-tight text-foreground md:text-6xl",
							children: ["हिंदी टाइपिंग सीखें,", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient block",
								children: "तेज़ी और शुद्धता के साथ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl font-hindi text-base text-muted-foreground md:text-lg",
							children: "संरचित पाठ, परीक्षा-स्तरीय अभ्यास और रीयल-टाइम विश्लेषण — सब कुछ एक सुंदर, सहज इंटरफ़ेस में।"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/practice",
								className: "rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-105",
								style: { background: "var(--gradient-primary)" },
								children: "अभ्यास शुरू करें"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lessons",
								className: "rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white",
								children: "पाठ देखें"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid max-w-lg grid-cols-3 gap-4",
							children: [
								{
									k: "40+",
									v: "Practice sets"
								},
								{
									k: "7",
									v: "Lesson tracks"
								},
								{
									k: "100%",
									v: "Free to use"
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl px-4 py-3 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-semibold text-primary",
									children: s.k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: s.v
								})]
							}, s.v))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "animate-float-soft p-6",
					hover: false,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-wide text-muted-foreground uppercase",
							children: "Live preview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-hindi text-2xl leading-relaxed",
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
							className: "mt-6 grid grid-cols-3 gap-3 text-center",
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
								className: "rounded-2xl bg-white/70 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-xl font-semibold ${s.c}`,
									children: s.v
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] tracking-wide text-muted-foreground uppercase",
									children: s.l
								})]
							}, s.l))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Why Abhyas",
				title: "A learning experience built for Hindi typists",
				subtitle: "हर सुविधा आपकी गति और आत्मविश्वास बढ़ाने के लिए डिज़ाइन की गई है।"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4",
				children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: "animate-rise-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-11 items-center justify-center rounded-xl text-primary-foreground",
							style: {
								background: "var(--gradient-primary)",
								animationDelay: `${i * 60}ms`
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 text-lg font-semibold text-foreground",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-hindi text-sm text-muted-foreground",
							children: f.text
						})
					]
				}, f.title))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Curriculum",
				title: "Seven structured lesson tracks",
				subtitle: "होम रो से लेकर परीक्षा अभ्यास तक — क्रमबद्ध रूप से आगे बढ़ें।"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3",
				children: lessons.slice(0, 6).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practice",
					search: { lesson: l.slug },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: "h-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary/10 px-3 py-1 font-hindi text-xs font-semibold text-primary",
									children: l.level
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [l.minutes, " min"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-semibold text-foreground",
								children: l.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-hindi text-sm text-primary",
								children: l.hindiTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-hindi text-sm text-muted-foreground",
								children: l.description
							})
						]
					})
				}, l.slug))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Virtual keyboard",
				title: "Hindi Remington layout with finger guidance",
				subtitle: "हर अक्षर के लिए सही उंगली और शिफ्ट संकेत।"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HindiKeyboard, { nextChar: "क" })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-strong flex flex-col items-center gap-4 rounded-3xl px-6 py-14 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-8 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "max-w-2xl text-3xl font-semibold text-foreground",
						children: "Ready to beat your personal best?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl font-hindi text-muted-foreground",
						children: "एक मिनट का स्पीड टेस्ट लें और देखें आप कहाँ खड़े हैं।"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/speed-test",
						className: "rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105",
						style: { background: "var(--gradient-primary)" },
						children: "Start speed test"
					})
				]
			})
		]
	});
}
//#endregion
export { Index as component };
