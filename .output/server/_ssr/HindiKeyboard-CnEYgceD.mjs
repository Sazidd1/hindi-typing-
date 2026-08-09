import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as lookupChar, t as keyboardRows } from "./typing-data-Bb8KDxq1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HindiKeyboard-CnEYgceD.js
var import_jsx_runtime = require_jsx_runtime();
function getFingerColorHex(finger) {
	if (!finger) return "#e2e8f0";
	if (finger.includes("pinky")) return "#f97316";
	if (finger.includes("ring")) return "#eab308";
	if (finger.includes("middle")) return "#16a34a";
	if (finger.includes("index")) return "#0891b2";
	if (finger === "thumb") return "#7c3aed";
	return "#e2e8f0";
}
function getFingerBgRgba(finger) {
	if (!finger) return "rgba(226, 232, 240, 0.1)";
	if (finger.includes("pinky")) return "rgba(249, 115, 22, 0.1)";
	if (finger.includes("ring")) return "rgba(234, 179, 8, 0.1)";
	if (finger.includes("middle")) return "rgba(22, 163, 74, 0.1)";
	if (finger.includes("index")) return "rgba(8, 145, 178, 0.1)";
	if (finger === "thumb") return "rgba(124, 58, 237, 0.1)";
	return "rgba(226, 232, 240, 0.1)";
}
function HindiKeyboard({ nextChar }) {
	const target = nextChar ? lookupChar(nextChar) : void 0;
	const activeKey = nextChar === " " ? "Space" : target?.key.en;
	const needsShift = target?.shift ?? false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-strong rounded-3xl p-6 sm:p-8 mx-auto w-full border border-white/60 dark:border-white/10 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2 w-full",
			children: keyboardRows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex w-full gap-2",
				children: row.map((key, ki) => {
					const isActive = activeKey === key.en;
					const isShiftHint = needsShift && key.en === "Shift";
					const fColor = getFingerColorHex(key.finger);
					const fBg = getFingerBgRgba(key.finger);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flexGrow: key.width ?? 1,
							flexBasis: `${(key.width ?? 1) * 2.25}rem`,
							borderBottomColor: fColor,
							borderBottomWidth: "3px",
							borderBottomStyle: "solid",
							backgroundColor: fBg
						},
						className: cn("key relative flex flex-col items-center justify-center rounded-[10px] h-[58px] transition-all duration-200 border border-white/70 dark:border-white/12", isActive && "active z-10", isShiftHint && "ring-2 ring-primary bg-primary/20"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-hindi leading-none font-semibold", isActive ? "text-[19px] text-white" : "text-sm sm:text-base text-foreground"),
							children: key.hi || key.en
						}), key.hi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-0.5 leading-none", isActive ? "text-white/80 text-[11px]" : "text-muted-foreground text-[9px]"),
							children: key.en
						}) : null]
					}, `${ri}-${ki}`);
				})
			}, ri))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-wrap justify-center gap-4 text-[13px] text-muted-foreground",
			children: [
				{
					c: "#f97316",
					l: "Little finger"
				},
				{
					c: "#eab308",
					l: "Ring finger"
				},
				{
					c: "#16a34a",
					l: "Middle finger"
				},
				{
					c: "#0891b2",
					l: "Index finger"
				},
				{
					c: "#7c3aed",
					l: "Thumb"
				},
				{
					c: "linear-gradient(135deg, #2563eb, #1d4ed8)",
					l: "Current key"
				}
			].map((lg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-block w-[13px] h-[13px] rounded-[3px]",
					style: { background: lg.c }
				}), lg.l]
			}, lg.l))
		})]
	});
}
//#endregion
export { HindiKeyboard as t };
