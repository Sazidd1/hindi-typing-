import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { p as Medal, r as Trophy, v as Crown } from "../_libs/lucide-react.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DkZiCYPI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-BQHNDzH7.js
var import_jsx_runtime = require_jsx_runtime();
var players = [
	{
		name: "आरव शर्मा",
		city: "जयपुर",
		wpm: 68,
		acc: 99,
		tests: 142
	},
	{
		name: "मीरा वर्मा",
		city: "इंदौर",
		wpm: 64,
		acc: 98,
		tests: 128
	},
	{
		name: "कबीर सिंह",
		city: "लखनऊ",
		wpm: 61,
		acc: 97,
		tests: 119
	},
	{
		name: "सान्वी गुप्ता",
		city: "पटना",
		wpm: 58,
		acc: 98,
		tests: 110
	},
	{
		name: "रोहन मिश्रा",
		city: "भोपाल",
		wpm: 55,
		acc: 96,
		tests: 104
	},
	{
		name: "अन्विता राव",
		city: "पुणे",
		wpm: 53,
		acc: 97,
		tests: 96
	},
	{
		name: "देव पटेल",
		city: "सूरत",
		wpm: 51,
		acc: 95,
		tests: 88
	},
	{
		name: "इशा नायर",
		city: "कोच्चि",
		wpm: 49,
		acc: 96,
		tests: 81
	}
];
var podiumIcons = [
	Crown,
	Trophy,
	Medal
];
function LeaderboardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Community",
				title: "Weekly leaderboard",
				subtitle: "इस सप्ताह के सबसे तेज़ और सटीक टाइपिस्ट।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: players.slice(0, 3).map((p, i) => {
					const Icon = podiumIcons[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: cn("text-center", i === 0 && "md:-translate-y-3 md:scale-105"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-auto flex size-12 items-center justify-center rounded-2xl text-primary-foreground",
								style: { background: "var(--gradient-primary)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-hindi text-lg font-semibold text-foreground",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-hindi text-sm text-muted-foreground",
								children: p.city
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-3xl font-semibold text-primary",
								children: p.wpm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-wide text-muted-foreground uppercase",
								children: "WPM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-success",
								children: [p.acc, "% accuracy"]
							})
						]
					}, p.name);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
				hover: false,
				className: "overflow-x-auto p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-xs tracking-wide text-muted-foreground uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Rank"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Typist"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "City"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "WPM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Accuracy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-6 py-4",
								children: "Tests"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: players.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 transition-colors last:border-0 hover:bg-white/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-6 py-4 font-semibold text-primary",
								children: ["#", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 font-hindi font-medium text-foreground",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 font-hindi text-muted-foreground",
								children: p.city
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 font-semibold tabular-nums",
								children: p.wpm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-6 py-4 text-success tabular-nums",
								children: [p.acc, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-6 py-4 text-muted-foreground tabular-nums",
								children: p.tests
							})
						]
					}, p.name)) })]
				})
			})
		]
	});
}
//#endregion
export { LeaderboardPage as component };
