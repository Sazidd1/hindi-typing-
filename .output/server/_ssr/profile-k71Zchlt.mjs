import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useAuth } from "./auth-zFGTrjhs.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Gauge, i as Target, r as Trophy, w as CalendarDays } from "../_libs/lucide-react.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DkZiCYPI.mjs";
import { t as StatCard } from "./StatCard-iKT8oSZl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-k71Zchlt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { currentUser, isLoaded } = useAuth();
	const navigate = useNavigate();
	const [history, setHistory] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (isLoaded && !currentUser) {
			navigate({ to: "/login" });
			return;
		}
		if (currentUser) {
			const stored = localStorage.getItem("results_" + currentUser);
			if (stored) try {
				const parsed = JSON.parse(stored);
				setHistory(parsed);
			} catch (e) {
				console.error("Failed to parse results");
			}
		}
	}, [
		currentUser,
		isLoaded,
		navigate
	]);
	if (!isLoaded || !currentUser) return null;
	const bestWpm = history.length > 0 ? Math.max(...history.map((h) => parseInt(String(h.wpm).replace(" WPM", "")) || 0)) : 0;
	const bestAcc = history.length > 0 ? Math.max(...history.map((h) => parseInt(String(h.acc).replace("%", "")) || 0)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Account",
				title: "Your profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				className: "flex flex-col gap-6 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-20 items-center justify-center rounded-3xl font-bold text-4xl text-primary-foreground uppercase",
					style: { background: "var(--gradient-primary)" },
					children: currentUser[0]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-hindi text-2xl font-semibold text-foreground",
							children: currentUser
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Local Typist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4" }), " Account Active"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }),
									" Tests: ",
									history.length
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Gauge,
						label: "Best WPM",
						value: bestWpm
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Target,
						label: "Best accuracy",
						value: bestAcc,
						suffix: "%",
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Trophy,
						label: "Tests taken",
						value: history.length,
						tone: "muted"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				className: "p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold text-foreground",
						children: "Recent activity"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border/60",
					children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-muted-foreground",
						children: "No recent activity found. Start typing!"
					}) : history.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-white/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: "Practice Session"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: h.date
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-6 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-primary tabular-nums",
								children: h.wpm
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-success tabular-nums",
								children: h.acc
							})]
						})]
					}, i))
				})]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
