import { i as __toESM } from "../_runtime.mjs";
import { t as accuracyTexts } from "./typing-data-GALeOzeh.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as TypingArena } from "./TypingArena-CJYDzVby.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DkZiCYPI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accuracy-test-GF93Lq9I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccuracyTestPage() {
	const [index, setIndex] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Precision",
				title: "Accuracy test",
				subtitle: "बिना समय दबाव के शुद्धता पर ध्यान दें — हर त्रुटि गिनी जाती है।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				className: "flex flex-wrap items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-xl bg-success/10 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-hindi text-sm text-muted-foreground",
						children: "लक्ष्य: 98% या उससे अधिक शुद्धता।"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIndex((i) => (i + 1) % accuracyTexts.length),
					className: "rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105",
					children: "Change passage"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingArena, {
				text: accuracyTexts[index],
				title: "Accuracy challenge",
				subtitle: "शुद्धता परीक्षण"
			}, index)
		]
	});
}
//#endregion
export { AccuracyTestPage as component };
