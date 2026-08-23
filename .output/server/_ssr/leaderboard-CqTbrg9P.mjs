import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { E as Crown, g as Medal, r as Trophy } from "../_libs/lucide-react.mjs";
import { n as calculateXP, t as XP_PER_LEVEL } from "./scoring-C2r0ix1P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leaderboard-CqTbrg9P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var podiumIcons = [
	Crown,
	Trophy,
	Medal,
	Medal
];
var podiumStyles = [
	{
		card: "relative z-10 md:-translate-y-3 md:scale-105 shadow-xl md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]",
		iconBox: "bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400",
		iconSize: "size-7"
	},
	{
		card: "shadow-lg",
		iconBox: "bg-slate-400/15 border border-slate-400/30 text-slate-600 dark:text-slate-300",
		iconSize: "size-6"
	},
	{
		card: "shadow-lg",
		iconBox: "bg-orange-700/15 border border-orange-700/30 text-orange-700 dark:text-orange-500",
		iconSize: "size-6"
	},
	{
		card: "shadow-md opacity-90",
		iconBox: "bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400",
		iconSize: "size-5"
	}
];
function LeaderboardPage() {
	const { currentUser } = useAuth();
	const [leaderboardMode, setLeaderboardMode] = (0, import_react.useState)("Typing Speed");
	const [period, setPeriod] = (0, import_react.useState)("Weekly");
	const [realPlayers, setRealPlayers] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const usersData = {};
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith("results_")) {
				const username = key.replace("results_", "");
				try {
					const results = JSON.parse(localStorage.getItem(key) || "[]");
					if (Array.isArray(results)) usersData[username] = results;
				} catch (e) {}
			}
		}
		const today = /* @__PURE__ */ new Date();
		today.setHours(0, 0, 0, 0);
		const sixDaysAgo = /* @__PURE__ */ new Date(today.getTime() - 5184e5);
		const aggregated = Object.keys(usersData).map((username) => {
			const results = usersData[username];
			let tests = 0;
			let highestWpm = 0;
			let highestAcc = 0;
			let totalXp = 0;
			if (results) results.forEach((r) => {
				if (!r.date || typeof r.date !== "string") return;
				if (leaderboardMode === "Typing Speed" && r.isBonus) return;
				let include = false;
				if (leaderboardMode === "XP") include = true;
				else if (period === "Overall") include = true;
				else {
					const d = /* @__PURE__ */ new Date(`${r.date} ${today.getFullYear()}`);
					if (!isNaN(d.getTime())) {
						d.setHours(0, 0, 0, 0);
						if (d.getTime() > today.getTime() + 6048e5) d.setFullYear(d.getFullYear() - 1);
						if (period === "Daily" && d.getTime() === today.getTime()) include = true;
						else if (period === "Weekly" && d.getTime() >= sixDaysAgo.getTime() && d.getTime() <= today.getTime()) include = true;
						else if (period === "Monthly" && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) include = true;
					}
				}
				if (include) if (leaderboardMode === "Typing Speed") {
					tests++;
					if (r.wpm > highestWpm) {
						highestWpm = r.wpm;
						highestAcc = r.accuracy || 0;
					}
				} else {
					if (!r.isBonus) tests++;
					if (typeof r.xp === "number" && !isNaN(r.xp)) totalXp += r.xp;
					else {
						const w = parseInt(String(r.wpm ?? 0).replace(" WPM", "")) || 0;
						const a = parseInt(String(r.accuracy || r.acc || "0").replace("%", "")) || 0;
						const errs = typeof r.errors === "number" ? r.errors : 0;
						totalXp += calculateXP(w, a, errs);
					}
				}
			});
			return {
				name: username,
				wpm: highestWpm,
				acc: highestAcc,
				tests,
				xp: totalXp
			};
		}).filter((p) => leaderboardMode === "XP" ? p.xp > 0 : p.tests > 0);
		if (leaderboardMode === "XP") aggregated.sort((a, b) => b.xp - a.xp);
		else aggregated.sort((a, b) => b.wpm - a.wpm);
		setRealPlayers(aggregated);
	}, [period, leaderboardMode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "animate-rise-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "en inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground uppercase",
						children: "Community"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "en mt-4 text-3xl font-[800] tracking-tight text-primary",
						children: leaderboardMode === "XP" ? "XP Leaderboard" : `${period} Leaderboard`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate-500 dark:text-slate-400",
						children: "इस सप्ताह के सबसे तेज़ और सटीक टाइपिस्ट।"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex items-center rounded-full border border-border/60 bg-card p-1 shadow-sm",
					children: ["Typing Speed", "XP"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setLeaderboardMode(m),
						className: cn("px-5 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-full transition-colors", leaderboardMode === m ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"),
						children: m
					}, m))
				}), leaderboardMode === "Typing Speed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex items-center rounded-full border border-border/60 bg-card p-1 shadow-sm transition-opacity duration-300",
					children: [
						"Daily",
						"Weekly",
						"Monthly"
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setPeriod(p),
						className: cn("px-5 py-1.5 text-xs font-semibold rounded-full transition-colors", period === p ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"),
						children: p
					}, p))
				})]
			}),
			realPlayers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 md:mt-8 grid gap-5 md:grid-cols-4 pt-2 md:pt-4",
				children: realPlayers.slice(0, 4).map((p, i) => {
					const Icon = podiumIcons[i];
					const style = podiumStyles[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						className: cn("text-center transition-transform", style.card),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mx-auto flex size-14 items-center justify-center rounded-2xl", style.iconBox),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: style.iconSize })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-hindi text-lg font-semibold text-foreground",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-[26px] font-[800] leading-none text-primary",
								children: leaderboardMode === "XP" ? p.xp.toLocaleString() : p.wpm
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-[11px] tracking-wider text-muted-foreground uppercase",
								children: leaderboardMode === "XP" ? "XP" : "WPM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 inline-block rounded-full bg-success/10 px-2.5 py-0.5 text-[11px] font-[800] text-success",
								children: leaderboardMode === "XP" ? `Level ${Math.min(50, Math.floor(p.xp / XP_PER_LEVEL) + 1)}` : `${p.acc}% accuracy`
							})
						]
					}, p.name);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 md:mt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
					hover: false,
					className: "overflow-x-auto p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[560px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 text-[11px] font-[700] tracking-wider text-slate-500 dark:text-slate-400 uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 text-center w-20",
									children: "Rank"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 text-left",
									children: "Typist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 text-center",
									children: leaderboardMode === "XP" ? "Level" : "WPM"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 text-center",
									children: leaderboardMode === "XP" ? "Total XP" : "Accuracy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-4 text-right",
									children: "Tests"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: realPlayers.map((p, i) => {
							const isCurrentUser = currentUser === p.name;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: cn("border-b transition-all duration-200 last:border-0", isCurrentUser ? "border-primary/20 bg-primary/5 hover:bg-primary/10" : "border-border/40 hover:bg-indigo-500/5 dark:hover:bg-indigo-400/10"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-4 text-center font-[700] text-indigo-500/90 dark:text-indigo-400",
										children: ["#", i + 1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-6 py-4 text-left font-hindi font-medium text-foreground",
										children: [p.name, isCurrentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-1.5 py-[1px] en text-[9px] font-bold text-primary uppercase translate-y-[-1px]",
											children: "You"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-center font-[800] text-primary tabular-nums",
										children: leaderboardMode === "XP" ? `Lvl ${Math.min(50, Math.floor(p.xp / XP_PER_LEVEL) + 1)}` : p.wpm
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-center font-[800] text-success tabular-nums",
										children: leaderboardMode === "XP" ? p.xp.toLocaleString() : `${p.acc}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-6 py-4 text-right text-muted-foreground tabular-nums",
										children: p.tests
									})
								]
							}, p.name);
						}) })]
					})
				})
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: false,
					className: "flex flex-col items-center justify-center py-20 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-semibold text-foreground/80",
						children: "No typing results yet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-2",
						children: "Take a new typing test or switch periods to see the leaderboard."
					})]
				})
			})
		]
	});
}
//#endregion
export { LeaderboardPage as component };
