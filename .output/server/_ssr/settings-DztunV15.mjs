import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { t as useTheme } from "./theme-CcnM0qqy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-DztunV15.js
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
				className: cn("rounded-full px-4 py-2 text-sm font-medium transition-all duration-200", o === value ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"),
				children: o
			}, o))
		})]
	});
}
/** Appearance section — controls the global light/dark theme. */
function AppearanceSection() {
	const { theme, setTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
		hover: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold text-foreground",
				children: "Appearance"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-0.5 mb-4",
				children: "Choose how the app looks across all pages."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTheme("light"),
					"aria-pressed": theme === "light",
					className: cn("flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold border transition-all duration-200", theme === "light" ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-secondary/50 text-muted-foreground border-border/60 hover:bg-secondary hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base leading-none",
						"aria-hidden": "true",
						children: "☀️"
					}), "Light"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTheme("dark"),
					"aria-pressed": theme === "dark",
					className: cn("flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold border transition-all duration-200", theme === "dark" ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-secondary/50 text-muted-foreground border-border/60 hover:bg-secondary hover:text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base leading-none",
						"aria-hidden": "true",
						children: "🌙"
					}), "Dark"]
				})]
			})
		]
	});
}
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Preferences",
				title: "Settings",
				subtitle: "अपने अभ्यास अनुभव को अपने अनुसार ढालें।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppearanceSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
