import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-CY6kbSv6.js
var $$splitComponentImporter = () => import("./practice-Ch69LdVp.mjs");
var searchSchema = objectType({ lesson: stringType().optional() });
var Route = createFileRoute("/practice")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "Hindi Typing Practice Area — Abhyas Studio" },
		{
			name: "description",
			content: "Practice Hindi typing with highlighted characters, live WPM, accuracy, errors, timer and a virtual Remington keyboard."
		},
		{
			property: "og:title",
			content: "Hindi Typing Practice Area"
		},
		{
			property: "og:description",
			content: "Live WPM, accuracy, error count and animated Hindi keyboard guidance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
