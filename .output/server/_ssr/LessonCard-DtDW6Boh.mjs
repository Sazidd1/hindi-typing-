import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useAuth } from "./auth-CWdKt_1e.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as ArrowRight, T as CircleCheckBig, g as Lock, v as Gift } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LessonCard-DtDW6Boh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LessonCard({ item, setLockedLessonIntent }) {
	const Icon = item.icon;
	const isCompleted = item.progress === 100;
	const headerBg = isCompleted ? "bg-gradient-to-br from-[#16a34a] to-[#22c55e]" : item.isLocked ? "bg-[#e2e7ef]" : "bg-gradient-to-br from-[#2563eb] to-[#1d4ed8]";
	const headerTextColor = item.isLocked ? "text-slate-500" : "text-white";
	const { currentUser } = useAuth();
	const [isBonusClaimed, setIsBonusClaimed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (currentUser) {
			const date = /* @__PURE__ */ new Date();
			const dateStr = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
			const bonusKey = `daily_bonus_claimed_${currentUser}_${dateStr}`;
			setIsBonusClaimed(localStorage.getItem(bonusKey) === "true");
		}
	}, [currentUser]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group flex flex-col rounded-[16px] overflow-hidden border border-[#e6ebf2] bg-[#ffffff] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(20,30,60,0.08)] h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `px-[20px] py-[10px] ${headerBg}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `font-bold text-[11px] uppercase tracking-[0.5px] ${headerTextColor}`,
				children: item.title
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3 sm:p-3.5 flex-1 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`,
						children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "size-3.5" }) : Icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }) : null
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
						className: "flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md leading-none text-slate-500",
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
							children: [item.progress || 0, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-full overflow-hidden rounded-full bg-black/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full rounded-full transition-all duration-1000 ${isCompleted ? "bg-green-500" : "bg-blue-500"}`,
							style: { width: `${item.progress || 0}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2.5",
					children: [isBonusClaimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 opacity-60 mb-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[10px] font-bold text-slate-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Daily Bonus" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-slate-500 tracking-wide",
							children: "Claimed ✓"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-lg px-2.5 py-1.5 mb-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-[10px] font-bold text-amber-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Daily Bonus" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-amber-600 tracking-wide",
							children: "+100 XP"
						})]
					}), item.isLocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: (e) => {
							e.preventDefault();
							setLockedLessonIntent && setLockedLessonIntent(item);
						},
						className: "flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-bold leading-none transition-colors bg-slate-200 text-slate-500 hover:bg-slate-300 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start Lesson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.path || "/practice",
						search: item.search || { lesson: item.slug },
						className: `flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-bold leading-none transition-colors ${isCompleted ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isCompleted ? "Practice Again" : (item.progress || 0) > 0 ? "Continue" : "Start Lesson" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
					})]
				})
			]
		})]
	});
}
//#endregion
export { LessonCard as t };
