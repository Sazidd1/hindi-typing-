import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CcoBRp2W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var USERS_KEY = "mock_db_users";
var SESSION_KEY = "mock_session_token";
var delay = (ms) => new Promise((res) => setTimeout(res, ms));
var mockHash = (str) => btoa(str).split("").reverse().join("");
var getUsers = () => {
	try {
		const data = localStorage.getItem(USERS_KEY);
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
};
var saveUsers = (users) => {
	localStorage.setItem(USERS_KEY, JSON.stringify(users));
};
var mockBackend = {
	async register(name, email, password) {
		await delay(600);
		const users = getUsers();
		if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) return {
			user: null,
			error: "An account with this email already exists."
		};
		const newUser = {
			id: name.trim(),
			name: name.trim(),
			email: email.trim(),
			passwordHash: mockHash(password),
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		users.push(newUser);
		saveUsers(users);
		const sessionToken = btoa(newUser.id + ":" + Date.now());
		localStorage.setItem(SESSION_KEY, sessionToken);
		const { passwordHash, ...user } = newUser;
		return {
			user,
			error: null
		};
	},
	async login(email, password) {
		await delay(500);
		const userRecord = getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
		if (!userRecord || userRecord.passwordHash !== mockHash(password)) return {
			user: null,
			error: "Invalid email or password."
		};
		const sessionToken = btoa(userRecord.id + ":" + Date.now());
		localStorage.setItem(SESSION_KEY, sessionToken);
		const { passwordHash, ...user } = userRecord;
		return {
			user,
			error: null
		};
	},
	async logout() {
		await delay(300);
		localStorage.removeItem(SESSION_KEY);
	},
	async getSessionUser() {
		await delay(200);
		const token = localStorage.getItem(SESSION_KEY);
		if (!token) return null;
		try {
			const [userId] = atob(token).split(":");
			const userRecord = getUsers().find((u) => u.id === userId);
			if (userRecord) {
				const { passwordHash, ...user } = userRecord;
				return user;
			}
		} catch {
			return null;
		}
		return null;
	},
	async resetPassword(email) {
		await delay(600);
		if (!getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())) return {
			success: false,
			error: "No account found with that email address."
		};
		return {
			success: true,
			error: null
		};
	}
};
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [userObject, setUserObject] = (0, import_react.useState)(null);
	const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
	const currentUser = userObject?.id || null;
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const initSession = async () => {
			const sessionUser = await mockBackend.getSessionUser();
			if (mounted) {
				setUserObject(sessionUser);
				setIsLoaded(true);
			}
		};
		initSession();
		return () => {
			mounted = false;
		};
	}, []);
	const login = async (email, password) => {
		const { user, error } = await mockBackend.login(email, password);
		if (user) {
			setUserObject(user);
			window.dispatchEvent(new Event("auth-change"));
		}
		return { error };
	};
	const signup = async (name, email, password) => {
		const { user, error } = await mockBackend.register(name, email, password);
		if (user) {
			setUserObject(user);
			window.dispatchEvent(new Event("auth-change"));
		}
		return { error };
	};
	const logout = async () => {
		await mockBackend.logout();
		setUserObject(null);
		window.dispatchEvent(new Event("auth-change"));
	};
	const resetPassword = async (email) => {
		const { error } = await mockBackend.resetPassword(email);
		return { error };
	};
	const updateProfileName = (newName) => {
		if (userObject) {
			setUserObject({
				...userObject,
				id: newName,
				name: newName
			});
			window.dispatchEvent(new Event("auth-change"));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			userObject,
			currentUser,
			isLoaded,
			login,
			signup,
			logout,
			resetPassword,
			updateProfileName
		},
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (context === void 0) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
//#endregion
export { useAuth as n, AuthProvider as t };
