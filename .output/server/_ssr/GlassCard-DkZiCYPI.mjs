import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GlassCard-DkZiCYPI.js
var import_jsx_runtime = require_jsx_runtime();
function GlassCard({ children, className, hover = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("glass rounded-3xl p-6 transition-all duration-300", hover && "hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]", className),
		children
	});
}
function SectionTitle({ eyebrow, title, subtitle, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("animate-rise-in", className),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-wide text-accent-foreground uppercase",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl",
				children: title
			}),
			subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted-foreground md:text-base",
				children: subtitle
			}) : null
		]
	});
}
//#endregion
export { SectionTitle as n, GlassCard as t };
