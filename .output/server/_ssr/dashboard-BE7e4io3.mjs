import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { E as Award, _ as Flame, a as Star, g as Gauge, i as Target, r as Trophy, t as Zap, y as Clock } from "../_libs/lucide-react.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DkZiCYPI.mjs";
import { t as StatCard } from "./StatCard-iKT8oSZl.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BE7e4io3.js
var import_jsx_runtime = require_jsx_runtime();
var weekly = [
	{
		day: "सोम",
		wpm: 34,
		accuracy: 91
	},
	{
		day: "मंगल",
		wpm: 38,
		accuracy: 93
	},
	{
		day: "बुध",
		wpm: 41,
		accuracy: 94
	},
	{
		day: "गुरु",
		wpm: 39,
		accuracy: 95
	},
	{
		day: "शुक्र",
		wpm: 45,
		accuracy: 96
	},
	{
		day: "शनि",
		wpm: 48,
		accuracy: 97
	},
	{
		day: "रवि",
		wpm: 52,
		accuracy: 98
	}
];
var badges = [
	{
		icon: Flame,
		title: "7 दिन स्ट्रीक",
		desc: "लगातार सात दिन अभ्यास",
		earned: true
	},
	{
		icon: Zap,
		title: "50 WPM क्लब",
		desc: "50 शब्द प्रति मिनट पार",
		earned: true
	},
	{
		icon: Target,
		title: "शुद्धता मास्टर",
		desc: "98% शुद्धता प्राप्त",
		earned: true
	},
	{
		icon: Trophy,
		title: "परीक्षा तैयार",
		desc: "परीक्षा पाठ पूर्ण करें",
		earned: false
	},
	{
		icon: Star,
		title: "100 टेस्ट",
		desc: "सौ अभ्यास सत्र पूर्ण",
		earned: false
	},
	{
		icon: Award,
		title: "60 WPM क्लब",
		desc: "60 शब्द प्रति मिनट पार",
		earned: false
	}
];
function DashboardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Overview",
				title: "Your typing dashboard",
				subtitle: "आपकी प्रगति एक नज़र में — स्ट्रीक, गति, शुद्धता और उपलब्धियाँ।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Flame,
						label: "Daily streak",
						value: 7,
						suffix: "days",
						tone: "danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						label: "Practice time",
						value: "4h 20m",
						tone: "muted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Gauge,
						label: "Average WPM",
						value: 42
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Target,
						label: "Accuracy",
						value: 96,
						suffix: "%",
						tone: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-foreground",
							children: "Weekly progress"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success",
							children: "+18 WPM this week"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: weekly,
								margin: {
									left: -20,
									right: 8,
									top: 8
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "wpmFill",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--primary)",
											stopOpacity: .45
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--primary)",
											stopOpacity: .02
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "accFill",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--success)",
											stopOpacity: .3
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--success)",
											stopOpacity: .02
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "4 4",
										stroke: "var(--border)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tickLine: false,
										axisLine: false,
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tickLine: false,
										axisLine: false,
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										borderRadius: 16,
										border: "1px solid var(--border)",
										background: "rgba(255,255,255,0.95)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "wpm",
										stroke: "var(--primary)",
										strokeWidth: 3,
										fill: "url(#wpmFill)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "accuracy",
										stroke: "var(--success)",
										strokeWidth: 2,
										fill: "url(#accFill)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: false,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-foreground",
							children: "Daily goal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-hindi text-sm text-muted-foreground",
							children: "आज का लक्ष्य: 30 मिनट अभ्यास"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-5",
							children: [
								{
									label: "Practice minutes",
									value: 22,
									max: 30,
									tone: "var(--primary)"
								},
								{
									label: "Lessons completed",
									value: 3,
									max: 5,
									tone: "var(--accent-blue)"
								},
								{
									label: "Accuracy target",
									value: 96,
									max: 98,
									tone: "var(--success)"
								}
							].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: g.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground",
									children: [
										g.value,
										"/",
										g.max
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-2 overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full transition-all duration-700",
									style: {
										width: `${Math.min(100, g.value / g.max * 100)}%`,
										background: g.tone
									}
								})
							})] }, g.label))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold text-foreground",
				children: "Achievement badges"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
				children: badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					className: cn("flex items-center gap-4", !b.earned && "opacity-60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("flex size-12 shrink-0 items-center justify-center rounded-2xl", b.earned ? "text-primary-foreground" : "bg-muted text-muted-foreground"),
						style: b.earned ? { background: "var(--gradient-primary)" } : void 0,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-hindi font-semibold text-foreground",
						children: b.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-hindi text-sm text-muted-foreground",
						children: b.desc
					})] })]
				}, b.title))
			})] })
		]
	});
}
//#endregion
export { DashboardPage as component };
