import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { t as StatCard } from "./StatCard-Cac9fzfv.mjs";
import { r as lessons } from "./typing-data-D0Th4K6Z.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Flame, N as ChevronRight, O as Clock, R as BookOpen, S as Gauge, o as Target, p as Play, r as Trophy, t as Zap } from "../_libs/lucide-react.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Bd6uRyWW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { currentUser, isLoaded } = useAuth();
	const [history, setHistory] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const activeUser = currentUser || "Guest";
		try {
			const stored = localStorage.getItem("results_" + activeUser);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) setHistory(parsed);
				else setHistory([]);
			} else setHistory([]);
		} catch (e) {
			console.error("Failed to parse results from localStorage", e);
			setHistory([]);
		}
	}, [currentUser, isLoaded]);
	const userName = currentUser || "Guest";
	userName.trim() && userName.trim()[0]?.toUpperCase();
	const validHistory = (0, import_react.useMemo)(() => {
		if (!Array.isArray(history)) return [];
		return history.filter((h) => {
			if (!h || typeof h !== "object") return false;
			const w = parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0;
			const a = parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0;
			return w > 0 && w < 250 && a > 0 && a <= 100;
		});
	}, [history]);
	const totalSeconds = (0, import_react.useMemo)(() => {
		return validHistory.reduce((sum, h) => {
			return sum + (typeof h?.elapsedSeconds === "number" && !isNaN(h.elapsedSeconds) ? h.elapsedSeconds : 0);
		}, 0);
	}, [validHistory]);
	const practiceHours = Math.floor(totalSeconds / 3600);
	const practiceMins = Math.floor(totalSeconds % 3600 / 60);
	const practiceTimeStr = totalSeconds > 0 ? practiceHours > 0 ? `${practiceHours}h ${practiceMins}m` : `${practiceMins}m` : "0m";
	const avgWpm = validHistory.length > 0 ? Math.round(validHistory.reduce((sum, h) => sum + (parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0), 0) / validHistory.length) : 0;
	const avgAcc = validHistory.length > 0 ? Math.round(validHistory.reduce((sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0), 0) / validHistory.length) : 0;
	const bestWpm = validHistory.length > 0 ? Math.max(...validHistory.map((h) => parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0)) : 0;
	const bestAcc = validHistory.length > 0 ? Math.max(...validHistory.map((h) => parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0)) : 0;
	const uniqueDates = (0, import_react.useMemo)(() => {
		return Array.from(new Set(validHistory.map((h) => h && h.date).filter((d) => Boolean(d))));
	}, [validHistory]);
	const streak = (0, import_react.useMemo)(() => {
		if (uniqueDates.length === 0) return 0;
		let count = 0;
		const curr = /* @__PURE__ */ new Date();
		for (let i = 0; i < 60; i++) {
			const dStr = `${curr.getDate()} ${curr.toLocaleString("default", { month: "short" })}`;
			if (uniqueDates.includes(dStr)) count++;
			else if (i !== 0) break;
			curr.setDate(curr.getDate() - 1);
		}
		return count > 0 ? count : uniqueDates.length > 0 ? 1 : 0;
	}, [uniqueDates]);
	const aggregateMistakes = (0, import_react.useMemo)(() => {
		const mistakes = {};
		validHistory.forEach((session) => {
			if (session && session.charMistakes && typeof session.charMistakes === "object") Object.entries(session.charMistakes).forEach(([char, count]) => {
				if (char && typeof count === "number" && !isNaN(count)) mistakes[char] = (mistakes[char] || 0) + count;
			});
		});
		return mistakes;
	}, [validHistory]);
	const weakKeysData = (0, import_react.useMemo)(() => {
		return Object.entries(aggregateMistakes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([char, count]) => ({
			char,
			count
		}));
	}, [aggregateMistakes]);
	(0, import_react.useMemo)(() => weakKeysData.map((d) => d.char), [weakKeysData]);
	const todayStr = `${(/* @__PURE__ */ new Date()).getDate()} ${(/* @__PURE__ */ new Date()).toLocaleString("default", { month: "short" })}`;
	const todaysSessions = (0, import_react.useMemo)(() => validHistory.filter((h) => h.date === todayStr), [validHistory, todayStr]);
	const todaySeconds = (0, import_react.useMemo)(() => todaysSessions.reduce((sum, h) => sum + (typeof h.elapsedSeconds === "number" ? h.elapsedSeconds : 0), 0), [todaysSessions]);
	const todayPracticeMins = Math.floor(todaySeconds / 60);
	const todayLessonsCompleted = (0, import_react.useMemo)(() => new Set(todaysSessions.map((h) => h.lessonSlug).filter((s) => Boolean(s))), [todaysSessions]).size;
	const todayAvgAcc = todaysSessions.length > 0 ? Math.round(todaysSessions.reduce((sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0), 0) / todaysSessions.length) : 0;
	const weeklyData = (0, import_react.useMemo)(() => {
		const data = [];
		const startD = /* @__PURE__ */ new Date();
		startD.setDate(startD.getDate() - 6);
		const dayNames = [
			"रवि",
			"सोम",
			"मंगल",
			"बुध",
			"गुरु",
			"शुक्र",
			"शनि"
		];
		for (let i = 0; i < 7; i++) {
			const d = new Date(startD);
			d.setDate(d.getDate() + i);
			const dStr = `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`;
			const daySessions = validHistory.filter((h) => h && h.date === dStr);
			if (daySessions.length > 0) {
				const dWpm = Math.round(daySessions.reduce((sum, h) => sum + (parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0), 0) / daySessions.length);
				const dAcc = Math.round(daySessions.reduce((sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0), 0) / daySessions.length);
				data.push({
					day: dayNames[d.getDay()],
					dateStr: dStr,
					wpm: dWpm,
					accuracy: dAcc,
					hasData: true
				});
			} else data.push({
				day: dayNames[d.getDay()],
				dateStr: dStr,
				wpm: null,
				accuracy: null,
				hasData: false
			});
		}
		return data;
	}, [validHistory]);
	const activeDaysCount = (0, import_react.useMemo)(() => {
		return weeklyData.filter((d) => d.hasData).length;
	}, [weeklyData]);
	const completedSlugs = (0, import_react.useMemo)(() => new Set(validHistory.map((h) => h.lessonSlug).filter((s) => Boolean(s))), [validHistory]);
	const beginnerTotal = (0, import_react.useMemo)(() => Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "शुरुआती").length : 0, []);
	const beginnerCompleted = (0, import_react.useMemo)(() => Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "शुरुआती" && completedSlugs.has(l.slug)).length : 0, [completedSlugs]);
	const interTotalCount = (0, import_react.useMemo)(() => Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "मध्यम").length : 0, []);
	const interTotal = interTotalCount > 0 ? interTotalCount : 15;
	const interCompleted = (0, import_react.useMemo)(() => Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "मध्यम" && completedSlugs.has(l.slug)).length : 0, [completedSlugs]);
	const advTotalCount = (0, import_react.useMemo)(() => Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "उन्नत").length : 0, []);
	const advTotal = advTotalCount > 0 ? advTotalCount : 10;
	const advCompleted = (0, import_react.useMemo)(() => Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "उन्नत" && completedSlugs.has(l.slug)).length : 0, [completedSlugs]);
	const tracks = (0, import_react.useMemo)(() => [
		{
			name: "Beginner Track",
			subName: "शुरुआती पाठ",
			completed: beginnerCompleted,
			total: beginnerTotal,
			color: "bg-orange-500",
			badgeColor: "text-orange-500 bg-orange-500/15 border-orange-500/25"
		},
		{
			name: "Intermediate Track",
			subName: "मध्यम पाठ",
			completed: interCompleted,
			total: interTotal,
			color: "bg-accent-blue",
			badgeColor: "text-accent-blue bg-accent-blue/15 border-accent-blue/25"
		},
		{
			name: "Advanced Track",
			subName: "उन्नत पाठ",
			completed: advCompleted,
			total: advTotal,
			color: "bg-teal-500",
			badgeColor: "text-teal-500 bg-teal-500/15 border-teal-500/25"
		}
	], [
		beginnerCompleted,
		beginnerTotal,
		interCompleted,
		interTotal,
		advCompleted,
		advTotal
	]);
	const badges = (0, import_react.useMemo)(() => [
		{
			icon: Flame,
			title: "7 दिन स्ट्रीक",
			desc: "लगातार सात दिन अभ्यास",
			earned: streak >= 7,
			iconClass: "text-orange-500 bg-orange-500/10 border border-orange-500/20"
		},
		{
			icon: Zap,
			title: "50 WPM क्लब",
			desc: "50 शब्द प्रति मिनट पार",
			earned: bestWpm >= 50,
			iconClass: "text-purple-500 bg-purple-500/10 border border-purple-500/20"
		},
		{
			icon: Target,
			title: "शुद्धता मास्टर",
			desc: "98% शुद्धता प्राप्त",
			earned: bestAcc >= 98,
			iconClass: "text-success bg-success/10 border border-success/20"
		},
		{
			icon: Trophy,
			title: "परीक्षा तैयार",
			desc: "परीक्षा पाठ पूर्ण करें",
			earned: completedSlugs.has("ch25") || completedSlugs.has("ch28"),
			iconClass: "text-accent-blue bg-accent-blue/10 border border-accent-blue/20"
		}
	], [
		streak,
		bestWpm,
		bestAcc,
		completedSlugs
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 sm:space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Overview",
				title: "Your typing dashboard",
				subtitle: "आपकी प्रगति एक नज़र में — स्ट्रीक, गति, शुद्धता और उपलब्धियाँ।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Flame,
						label: "Daily streak",
						value: streak,
						suffix: "days",
						tone: "danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						label: "Practice time",
						value: practiceTimeStr,
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Gauge,
						label: "Average WPM",
						value: avgWpm,
						suffix: "WPM",
						tone: "purple"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Target,
						label: "Accuracy",
						value: avgAcc,
						suffix: "%",
						tone: "success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.35fr_1fr] xl:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: false,
					className: "flex flex-col p-6 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-foreground",
							children: "Weekly progress"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Last 7 days performance"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-xs font-medium bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground font-semibold",
									children: "Speed (WPM)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground font-semibold",
									children: "Accuracy (%)"
								})]
							})]
						})]
					}), activeDaysCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-secondary/20 p-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: "No weekly session data yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground max-w-xs",
								children: "Complete typing lessons to automatically track your daily WPM and Accuracy trends here."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 min-h-[260px] min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: weeklyData,
								margin: {
									left: -20,
									right: 12,
									top: 12,
									bottom: 4
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
											stopOpacity: .35
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--primary)",
											stopOpacity: .01
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
											stopOpacity: .25
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--success)",
											stopOpacity: .01
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "var(--border)",
										opacity: .6,
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										tickLine: false,
										axisLine: false,
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 12,
											fontWeight: 500
										},
										dy: 8
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										domain: [0, 100],
										tickLine: false,
										axisLine: false,
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 12
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
										if (!active || !payload || !payload.length) return null;
										const d = payload[0]?.payload;
										if (!d || !d.hasData) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-semibold text-foreground",
												children: label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "No practice sessions"
											})]
										});
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs font-semibold text-muted-foreground",
													children: [
														label,
														" (",
														d.dateStr,
														")"
													]
												}),
												d.wpm !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs font-bold text-primary flex items-center justify-between gap-4",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Speed:" }),
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [d.wpm, " WPM"] })
													]
												}),
												d.accuracy !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs font-bold text-success flex items-center justify-between gap-4",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Accuracy:" }),
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [d.accuracy, "%"] })
													]
												})
											]
										});
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "wpm",
										name: "WPM",
										stroke: "var(--primary)",
										strokeWidth: 3,
										fill: "url(#wpmFill)",
										connectNulls: true,
										dot: {
											r: 4,
											stroke: "var(--primary)",
											strokeWidth: 2,
											fill: "#fff"
										},
										activeDot: {
											r: 6,
											fill: "var(--primary)",
											stroke: "#fff",
											strokeWidth: 2
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "accuracy",
										name: "Accuracy %",
										stroke: "var(--success)",
										strokeWidth: 2,
										fill: "url(#accFill)",
										connectNulls: true,
										dot: {
											r: 4,
											stroke: "var(--success)",
											strokeWidth: 2,
											fill: "#fff"
										},
										activeDot: {
											r: 6,
											fill: "var(--success)",
											stroke: "#fff",
											strokeWidth: 2
										}
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						hover: false,
						className: "flex-1 flex flex-col justify-between p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold text-foreground",
									children: "Daily goal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-secondary/80 px-2.5 py-1 rounded-full border border-border/50",
									children: "Target"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-hindi text-xs font-medium text-muted-foreground mt-0.5",
								children: "आज का लक्ष्य: 30 मिनट अभ्यास"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 space-y-4",
								children: [
									{
										label: "Practice minutes",
										value: todayPracticeMins,
										max: 30,
										tone: "bg-accent-blue",
										icon: Clock,
										iconClass: "text-accent-blue bg-accent-blue/10 border border-accent-blue/20"
									},
									{
										label: "Lessons completed",
										value: todayLessonsCompleted,
										max: 5,
										tone: "bg-teal-500",
										icon: BookOpen,
										iconClass: "text-teal-500 bg-teal-500/10 border border-teal-500/20"
									},
									{
										label: "Accuracy target",
										value: todayAvgAcc,
										max: 98,
										tone: "bg-success",
										icon: Target,
										iconClass: "text-success bg-success/10 border border-success/20"
									}
								].map((g) => {
									const pct = Math.min(100, Math.round(g.value / g.max * 100));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("flex size-6 items-center justify-center rounded-lg border", g.iconClass),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(g.icon, { className: "size-3.5" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground/90 font-semibold",
													children: g.label
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-foreground tabular-nums bg-secondary/60 px-2 py-0.5 rounded-md border border-border/40",
												children: [
													g.value,
													"/",
													g.max
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-2.5 w-full rounded-full bg-secondary/80 border border-border/40 p-0.5 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: cn("h-full rounded-full transition-all duration-700 ease-out shadow-xs", g.tone),
												style: { width: `${pct}%` }
											})
										})]
									}, g.label);
								})
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 pt-4 border-t border-border/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/practice",
								className: "flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4 fill-current group-hover:scale-110 transition-transform" }), " Continue Lesson"]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						hover: false,
						className: "flex flex-col justify-between p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold text-foreground",
								children: "Weakest keys"
							}) }), weakKeysData.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-danger bg-danger/10 px-2.5 py-1 rounded-full border border-danger/20 uppercase tracking-wider",
								children: "Needs Practice"
							})]
						}), weakKeysData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: weakKeysData.map(({ char, count }, i) => {
								const accents = [
									{
										b: "bg-orange-500/10",
										br: "border-orange-500/20",
										t: "text-orange-500",
										tb: "border-orange-500/15"
									},
									{
										b: "bg-accent-blue/10",
										br: "border-accent-blue/20",
										t: "text-accent-blue",
										tb: "border-accent-blue/15"
									},
									{
										b: "bg-teal-500/10",
										br: "border-teal-500/20",
										t: "text-teal-500",
										tb: "border-teal-500/15"
									}
								];
								const a = accents[i % accents.length];
								if (!a) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: cn("flex items-center gap-2.5 border px-3.5 py-2 rounded-2xl transition-transform hover:scale-105", a.b, a.br),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("font-hindi text-2xl font-bold leading-none", a.t),
										children: char
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: cn("text-[11px] font-bold tabular-nums bg-background/80 px-2 py-0.5 rounded-lg shadow-2xs border", a.t, a.tb),
										children: [
											count,
											" ",
											count === 1 ? "mistake" : "mistakes"
										]
									})]
								}, char);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-h-[56px] items-center justify-center rounded-2xl bg-secondary/40 border border-border/40 px-4 py-3 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground",
								children: "No major weaknesses yet. Keep typing."
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.35fr_1fr] xl:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-foreground",
							children: "Achievement badges"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-semibold text-muted-foreground",
							children: [
								badges.filter((b) => b.earned).length,
								"/",
								badges.length,
								" Unlocked"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							hover: false,
							className: cn("flex items-center gap-3.5 p-4 rounded-2xl transition-all duration-300 border min-w-0", b.earned ? "bg-primary/5 border-primary/20 shadow-xs hover:border-primary/40" : "bg-secondary/20 border-border/40 opacity-75 hover:opacity-90"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-11 shrink-0 items-center justify-center rounded-2xl shadow-xs", b.earned ? b.iconClass : "bg-muted/80 text-muted-foreground/60 border border-border/40"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-1 mb-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-hindi font-semibold text-sm text-foreground truncate",
										children: b.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0", b.earned ? "text-success bg-success/15 border-success/25" : "text-muted-foreground/70 bg-secondary border-border/40"),
										children: b.earned ? "Unlocked" : "Locked"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-hindi text-xs text-muted-foreground leading-tight",
									children: b.desc
								})]
							})]
						}, b.title))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
						hover: false,
						className: "p-0 overflow-hidden flex flex-col flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border/80 px-6 py-4 flex items-center justify-between bg-background/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold text-foreground",
									children: "Recent activity"
								}), validHistory.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold text-muted-foreground bg-secondary/80 px-2.5 py-0.5 rounded-full border border-border/50 tabular-nums",
									children: validHistory.length
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/profile",
								className: "text-xs font-semibold text-primary flex items-center gap-1 hover:underline group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View all" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 transition-transform group-hover:translate-x-0.5" })]
							})]
						}), validHistory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center justify-center p-8 text-center bg-secondary/10 min-h-[200px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 shadow-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-foreground",
									children: "No recent typing sessions"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground max-w-xs",
									children: "Complete a lesson or practice session to build your typing history."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/practice",
									className: "mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 px-3.5 py-1.5 rounded-xl transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start Practice" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-[480px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[1.8fr_1fr_1fr_1.1fr] items-center px-6 py-2.5 bg-secondary/40 border-b border-border/60 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Session / Lesson" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center",
											children: "WPM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center",
											children: "Accuracy"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-right",
											children: "Date"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-border/50 max-h-[320px] overflow-y-auto",
									children: validHistory.slice(0, 5).map((h, i) => {
										const wpmVal = parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0;
										const accVal = parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0;
										const lessonObj = lessons.find((l) => l.slug === h.lessonSlug);
										const lessonName = lessonObj ? lessonObj.title : h.lessonSlug === "daily-challenge" ? "Daily Challenge" : h.lessonSlug === "custom" ? "Custom Practice" : h.lessonSlug ? `Lesson (${h.lessonSlug})` : "Practice Session";
										const subText = lessonObj ? lessonObj.hindiTitle : null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-[1.8fr_1fr_1fr_1.1fr] items-center px-6 py-3 transition-colors hover:bg-secondary/30",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 pr-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-medium text-sm text-foreground truncate",
														children: lessonName
													}), subText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground font-hindi truncate",
														children: subText
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground truncate",
														children: "Free Practice"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 font-semibold text-xs text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg tabular-nums",
														children: [
															wpmVal,
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] opacity-75 font-normal",
																children: "WPM"
															})
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex justify-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 font-semibold text-xs text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded-lg tabular-nums",
														children: [accVal, "%"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-right text-xs font-medium text-muted-foreground tabular-nums whitespace-nowrap",
													children: h.date || "Today"
												})
											]
										}, i);
									})
								})]
							})
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
					hover: false,
					className: "h-fit flex flex-col p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2 bg-accent-blue/10 rounded-xl text-accent-blue shadow-xs border border-accent-blue/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold text-foreground",
								children: "Lesson Tracks"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Course progress by tier"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3.5 flex-1",
							children: tracks.map((track) => {
								const pct = track.total > 0 ? Math.min(100, Math.round(track.completed / track.total * 100)) : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 p-3.5 rounded-2xl bg-secondary/30 border border-border/40 transition-colors hover:bg-secondary/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-semibold text-sm text-foreground",
											children: track.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-hindi mt-0.5",
											children: track.subName
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", track.badgeColor),
												children: pct === 100 ? "Completed" : pct > 0 ? `${pct}%` : "Not Started"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-bold text-foreground tabular-nums bg-background px-2 py-0.5 rounded-md border border-border/50",
												children: [
													track.completed,
													"/",
													track.total
												]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2.5 w-full bg-secondary/80 rounded-full overflow-hidden border border-border/40 p-0.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("h-full rounded-full transition-all duration-700 ease-out shadow-xs", track.color),
											style: { width: `${pct}%` }
										})
									})]
								}, track.name);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 pt-4 border-t border-border/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium text-muted-foreground text-center",
								children: "Complete lessons in each tier to unlock advanced tracks"
							})
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
