import { r as lessons } from "./typing-data-GALeOzeh.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as TypingArena } from "./TypingArena-CJYDzVby.mjs";
import { t as Route } from "./practice-VzAy-Blq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-DSDamBNu.js
var import_jsx_runtime = require_jsx_runtime();
function PracticePage() {
	const { lesson } = Route.useSearch();
	const active = lessons.find((l) => l.slug === lesson) ?? lessons[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingArena, {
			lessonSlug: active.slug,
			text: active.text,
			title: active.title,
			subtitle: active.hindiTitle,
			isParagraphMode: [
				"ch11",
				"ch22",
				"ch23",
				"ch24"
			].includes(active.slug)
		})
	});
}
//#endregion
export { PracticePage as component };
