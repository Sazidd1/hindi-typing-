import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-CcnM0qqy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var THEME_KEY = "theme";
var THEME_EVENT = "theme-change";
/** Apply or remove the .dark class on <html> and persist to localStorage. */
function applyTheme(theme) {
	const root = document.documentElement;
	if (theme === "dark") root.classList.add("dark");
	else root.classList.remove("dark");
	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch (e) {}
}
/** Read the current theme from the DOM (source of truth after FOUC script runs). */
function readThemeFromDom() {
	return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
/**
* Global theme hook.
*
* Uses a TWO-PHASE approach for SSR compatibility:
*  - Phase 1 (server + client first render): theme is `undefined` — components
*    render their "light" fallback. suppressHydrationWarning on <html> prevents
*    React from complaining about the class attribute.
*  - Phase 2 (after mount): reads the real value from the DOM (which the FOUC
*    script has already set correctly) and updates state. This never causes a
*    server/client HTML mismatch because it only runs on the client.
*
* The toggle/setTheme functions always read directly from the DOM, so they
* work correctly regardless of phase.
*/
function useTheme() {
	const [theme, setThemeState] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		setThemeState(readThemeFromDom());
		const handleChange = () => {
			setThemeState(readThemeFromDom());
		};
		window.addEventListener(THEME_EVENT, handleChange);
		window.addEventListener("storage", (e) => {
			if (e.key === THEME_KEY) handleChange();
		});
		return () => {
			window.removeEventListener(THEME_EVENT, handleChange);
		};
	}, []);
	const setTheme = (0, import_react.useCallback)((newTheme) => {
		applyTheme(newTheme);
		window.dispatchEvent(new Event(THEME_EVENT));
	}, []);
	const toggleTheme = (0, import_react.useCallback)(() => {
		applyTheme(document.documentElement.classList.contains("dark") ? "light" : "dark");
		window.dispatchEvent(new Event(THEME_EVENT));
	}, []);
	return {
		theme: theme ?? "light",
		setTheme,
		toggleTheme
	};
}
//#endregion
export { useTheme as t };
