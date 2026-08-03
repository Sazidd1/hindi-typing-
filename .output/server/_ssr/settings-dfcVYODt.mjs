import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DkZiCYPI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-dfcVYODt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Toggle({ label, hint, defaultOn = false }) {
	const [on, setOn] = (0, import_react.useState)(defaultOn);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-hindi text-sm text-muted-foreground",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			role: "switch",
			"aria-checked": on,
			"aria-label": label,
			onClick: () => setOn((v) => !v),
			className: cn("relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300", on ? "bg-primary" : "bg-muted"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute top-1 size-5 rounded-full bg-white shadow transition-all duration-300", on ? "left-6" : "left-1") })
		})]
	});
}
function OptionRow({ label, options, initial }) {
	const [value, setValue] = (0, import_react.useState)(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium text-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setValue(o),
				className: cn("rounded-full px-4 py-2 text-sm font-medium transition-all duration-200", o === value ? "bg-primary text-primary-foreground" : "bg-white/80 text-muted-foreground hover:text-foreground"),
				children: o
			}, o))
		})]
	});
}
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
			eyebrow: "Preferences",
			title: "Settings",
			subtitle: "अपने अभ्यास अनुभव को अपने अनुसार ढालें।"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 xl:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-foreground",
					children: "Typing experience"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionRow, {
							label: "Keyboard layout",
							options: [
								"Remington GAIL",
								"Remington CBI",
								"Inscript"
							],
							initial: "Remington GAIL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionRow, {
							label: "Text size",
							options: [
								"Comfort",
								"Large",
								"Extra large"
							],
							initial: "Large"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionRow, {
							label: "Default test duration",
							options: [
								"30 sec",
								"60 sec",
								"120 sec"
							],
							initial: "60 sec"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold text-foreground",
					children: "Guidance & feedback"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "divide-y divide-border/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Show virtual keyboard",
							hint: "अभ्यास के दौरान वर्चुअल कीबोर्ड दिखाएँ",
							defaultOn: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Finger guidance",
							hint: "सही उंगली का रंग संकेत दिखाएँ",
							defaultOn: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Key press sound",
							hint: "हर कीस्ट्रोक पर हल्की ध्वनि"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Stop on error",
							hint: "गलती होने पर आगे बढ़ना रोकें"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							label: "Daily practice reminder",
							hint: "रोज़ अभ्यास की याद दिलाएँ",
							defaultOn: true
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { SettingsPage as component };
