import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CWdKt_1e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var CURRENT_USER_KEY = "currentUser";
function useAuth() {
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const user = localStorage.getItem(CURRENT_USER_KEY);
		setCurrentUser(user);
		setIsLoaded(true);
		const handleStorageChange = () => {
			setCurrentUser(localStorage.getItem(CURRENT_USER_KEY));
		};
		window.addEventListener("storage", handleStorageChange);
		window.addEventListener("auth-change", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener("auth-change", handleStorageChange);
		};
	}, []);
	const login = (username) => {
		const trimmed = username.trim();
		if (!trimmed) return;
		localStorage.setItem(CURRENT_USER_KEY, trimmed);
		const createdKey = "account_created_" + trimmed;
		if (!localStorage.getItem(createdKey)) localStorage.setItem(createdKey, (/* @__PURE__ */ new Date()).toISOString());
		window.dispatchEvent(new Event("auth-change"));
	};
	const logout = () => {
		localStorage.removeItem(CURRENT_USER_KEY);
		window.dispatchEvent(new Event("auth-change"));
	};
	return {
		currentUser,
		login,
		logout,
		isLoaded
	};
}
//#endregion
export { useAuth as t };
