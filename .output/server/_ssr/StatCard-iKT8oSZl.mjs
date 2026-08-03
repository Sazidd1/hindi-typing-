import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatCard-iKT8oSZl.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ icon: Icon, label, value, suffix, tone = "primary", className }) {
	const toneClass = {
		primary: "text-primary bg-primary/10",
		success: "text-success bg-success/10",
		danger: "text-danger bg-danger/10",
		muted: "text-muted-foreground bg-muted"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("glass flex items-center gap-4 rounded-2xl px-5 py-4", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("flex size-11 items-center justify-center rounded-xl", toneClass),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-2xl leading-tight font-semibold text-foreground tabular-nums",
				children: [value, suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1 text-sm font-medium text-muted-foreground",
					children: suffix
				}) : null]
			})]
		})]
	});
}
//#endregion
export { StatCard as t };
