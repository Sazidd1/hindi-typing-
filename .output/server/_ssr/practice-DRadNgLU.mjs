import { i as lessons } from "./typing-data-COXiq1J7.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as TypingArena } from "./TypingArena-i0blmZjZ.mjs";
import { t as Route } from "./practice-Ckj0ZZ_2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-DRadNgLU.js
var import_jsx_runtime = require_jsx_runtime();
function PracticePage() {
	const { lesson } = Route.useSearch();
	const active = lessons.find((l) => l.slug === lesson) ?? lessons[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingArena, {
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
