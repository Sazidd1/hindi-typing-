import { i as __toESM } from "../_runtime.mjs";
import { o as speedTexts } from "./typing-data-COXiq1J7.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as Shuffle } from "../_libs/lucide-react.mjs";
import { t as TypingArena } from "./TypingArena-i0blmZjZ.mjs";
import { n as SectionTitle } from "./GlassCard-DkZiCYPI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/speed-test-KUkB3WhR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var durations = [
	30,
	60,
	120
];
function SpeedTestPage() {
	const [duration, setDuration] = (0, import_react.useState)(60);
	const [index, setIndex] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Speed",
				title: "Hindi speed test",
				subtitle: "निर्धारित समय में अधिकतम शब्द टाइप करें और अपना WPM जानें।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [durations.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setDuration(d),
					className: cn("rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200", d === duration ? "bg-primary text-primary-foreground shadow-[var(--shadow-glass)]" : "glass text-muted-foreground hover:text-foreground"),
					children: [d, " sec"]
				}, d)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setIndex((i) => (i + 1) % speedTexts.length),
					className: "glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "size-4" }), " New passage"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingArena, {
				text: speedTexts[index],
				title: `${duration} second speed test`,
				subtitle: "गति परीक्षण",
				timeLimit: duration
			}, `${duration}-${index}`)
		]
	});
}
//#endregion
export { SpeedTestPage as component };
