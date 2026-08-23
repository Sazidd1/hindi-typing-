import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatCard-Cac9fzfv.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ icon: Icon, label, value, suffix, tone = "primary", className }) {
	const toneClass = {
		primary: "text-primary bg-primary/10 border border-primary/20",
		success: "text-success bg-success/10 border border-success/20",
		danger: "text-danger bg-danger/10 border border-danger/20",
		muted: "text-muted-foreground bg-muted border border-border/40",
		blue: "text-accent-blue bg-accent-blue/10 border border-accent-blue/20",
		purple: "text-purple-500 bg-purple-500/10 border border-purple-500/20"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("glass flex h-full items-center gap-4 rounded-3xl p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md border border-white/60", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-xs", toneClass),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold tracking-wider text-muted-foreground uppercase truncate mb-0.5",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-1.5 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl sm:text-3xl leading-tight font-bold tracking-tight text-foreground tabular-nums",
					children: value
				}), suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs sm:text-sm font-semibold text-muted-foreground/80",
					children: suffix
				}) : null]
			})]
		})]
	});
}
//#endregion
export { StatCard as t };
