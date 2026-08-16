import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lessons-DpODvTx7.js
var $$splitComponentImporter = () => import("./lessons-CMkI4kSe.mjs");
var Route = createFileRoute("/lessons")({
	head: () => ({ meta: [
		{ title: "Hindi Typing Lessons — Home Row to Exam Practice" },
		{
			name: "description",
			content: "Seven structured Hindi typing lessons: home row, upper row, lower row, numbers, symbols, paragraphs and exam practice."
		},
		{
			property: "og:title",
			content: "Hindi Typing Lessons"
		},
		{
			property: "og:description",
			content: "Structured Hindi typing curriculum from home row to exam-level practice."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var categories = [
	"All",
	"Home Row",
	"Top Row",
	"Bottom Row",
	"Mixed",
	"Tests"
];
//#endregion
export { categories as n, Route as t };
