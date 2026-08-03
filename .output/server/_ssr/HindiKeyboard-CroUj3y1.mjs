import { a as lookupChar, n as fingerColors, r as keyboardRows } from "./typing-data-COXiq1J7.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HindiKeyboard-CroUj3y1.js
var import_jsx_runtime = require_jsx_runtime();
function HindiKeyboard({ nextChar }) {
	const target = nextChar ? lookupChar(nextChar) : void 0;
	const activeKey = nextChar === " " ? "Space" : target?.key.en;
	const needsShift = target?.shift ?? false;
	nextChar === " " || target?.key.finger;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glass-strong rounded-3xl p-4 md:p-5 mx-auto w-fit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1 overflow-x-auto",
			children: keyboardRows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-w-max gap-1",
				children: row.map((key, ki) => {
					const isActive = activeKey === key.en;
					const isShiftHint = needsShift && key.en === "Shift";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							flexGrow: key.width ?? 1,
							flexBasis: `${(key.width ?? 1) * 2.25}rem`,
							borderBottomColor: fingerColors[key.finger]
						},
						className: cn("relative flex h-10 sm:h-11 flex-col items-center justify-center rounded-lg border border-b-2 border-white/70 bg-white/75 px-1 transition-all duration-200", isActive && "animate-key-pop scale-105 border-primary bg-primary text-primary-foreground shadow-[0_8px_16px_-6px_var(--primary)]", isShiftHint && "border-primary/60 bg-primary/15"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-hindi text-sm sm:text-base leading-none font-semibold", isActive ? "text-primary-foreground" : "text-foreground"),
							children: key.hi || key.en
						}), key.hi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-0.5 text-[9px] leading-none", isActive ? "text-primary-foreground/80" : "text-muted-foreground"),
							children: key.en
						}) : null]
					}, `${ri}-${ki}`);
				})
			}, ri))
		})
	});
}
//#endregion
export { HindiKeyboard as t };
