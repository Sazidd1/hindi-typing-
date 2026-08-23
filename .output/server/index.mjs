globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/auth-BqalzaMc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9ae-yd+qF4gxMzbtqKC1YV6drSpzQ7s\"",
		"mtime": "2026-08-23T15:35:04.365Z",
		"size": 2478,
		"path": "../public/assets/auth-BqalzaMc.js"
	},
	"/assets/book-open-D5-VjScL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117-jFkkNuTdrUXXL8e+DbpYWB3Bh90\"",
		"mtime": "2026-08-23T15:35:04.365Z",
		"size": 279,
		"path": "../public/assets/book-open-D5-VjScL.js"
	},
	"/assets/check-36OnHiEM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-hapva/WwzvTwZU6QqEoeORO0Jac\"",
		"mtime": "2026-08-23T15:35:04.365Z",
		"size": 124,
		"path": "../public/assets/check-36OnHiEM.js"
	},
	"/assets/chevron-right-CHJcvRU6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-oMSlE/9qmYUped9y4jXXvKId5aE\"",
		"mtime": "2026-08-23T15:35:04.365Z",
		"size": 130,
		"path": "../public/assets/chevron-right-CHJcvRU6.js"
	},
	"/assets/circle-check-big-CKDJV1eo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-yrR9Ss+AinK2qYg9rWFSLhMnnQU\"",
		"mtime": "2026-08-23T15:35:04.367Z",
		"size": 194,
		"path": "../public/assets/circle-check-big-CKDJV1eo.js"
	},
	"/assets/createLucideIcon-CLdWFMku.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-rMBxsqcPKrcnF/JzamLtMRV6aPw\"",
		"mtime": "2026-08-23T15:35:04.367Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-CLdWFMku.js"
	},
	"/assets/flame-PRX9Ejhe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-HKJXWQH88WI2K9RxCR74IR20Xqc\"",
		"mtime": "2026-08-23T15:35:04.369Z",
		"size": 199,
		"path": "../public/assets/flame-PRX9Ejhe.js"
	},
	"/assets/forgot-password-BjHbR2Ms.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e3c-3gU0+OLuaB7rEBNIkdzBEQckkt0\"",
		"mtime": "2026-08-23T15:35:04.369Z",
		"size": 3644,
		"path": "../public/assets/forgot-password-BjHbR2Ms.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-02T13:10:47.766Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-02T13:10:47.758Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/gauge-gxv4Qjm8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b0-6z/2pOKqB3xbCvegnwivI6dVV3A\"",
		"mtime": "2026-08-23T15:35:04.369Z",
		"size": 176,
		"path": "../public/assets/gauge-gxv4Qjm8.js"
	},
	"/assets/GlassCard-DTkfYs2Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355-uomnzwOA1ahJaX5H+iXP5zAZUCk\"",
		"mtime": "2026-08-23T15:35:04.363Z",
		"size": 853,
		"path": "../public/assets/GlassCard-DTkfYs2Z.js"
	},
	"/assets/HindiKeyboard-DhDMwT_a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1810-EDvOwcmKmjn0HyzFHaiOSMQqhgo\"",
		"mtime": "2026-08-23T15:35:04.364Z",
		"size": 6160,
		"path": "../public/assets/HindiKeyboard-DhDMwT_a.js"
	},
	"/assets/jsx-runtime-B-hcVAMW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216d-pcqlp1Bv4Kt7yFmWJlJC8xMXx/k\"",
		"mtime": "2026-08-23T15:35:04.369Z",
		"size": 8557,
		"path": "../public/assets/jsx-runtime-B-hcVAMW.js"
	},
	"/assets/keyboard-kMJgIfGT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c5-02TbZxoa+BgwwwN4zzSiwobBDQg\"",
		"mtime": "2026-08-23T15:35:04.371Z",
		"size": 453,
		"path": "../public/assets/keyboard-kMJgIfGT.js"
	},
	"/assets/leaderboard-C6GPbRT8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f82-AmDvRpWO5fTmKy7uLSilvzCuc4I\"",
		"mtime": "2026-08-23T15:35:04.371Z",
		"size": 8066,
		"path": "../public/assets/leaderboard-C6GPbRT8.js"
	},
	"/assets/LessonCard-Bu06ESL1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"feb-EQdIJZ5ETu8r18QLZoEAk0/LW94\"",
		"mtime": "2026-08-23T15:35:04.364Z",
		"size": 4075,
		"path": "../public/assets/LessonCard-Bu06ESL1.js"
	},
	"/assets/dashboard-DmQVwcMg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61dc7-m7wfKZGxfMq2T00/CBVc4eJAFvo\"",
		"mtime": "2026-08-23T15:35:04.367Z",
		"size": 400839,
		"path": "../public/assets/dashboard-DmQVwcMg.js"
	},
	"/assets/lessons-B0SYJBcC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fab-fKrpn9dUlX8pxL92vWip0s3cySk\"",
		"mtime": "2026-08-23T15:35:04.371Z",
		"size": 12203,
		"path": "../public/assets/lessons-B0SYJBcC.js"
	},
	"/assets/lessons-CNb3VMxz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c5-1nXi10ORij28+AEo5UYActBCw7Y\"",
		"mtime": "2026-08-23T15:35:04.371Z",
		"size": 1221,
		"path": "../public/assets/lessons-CNb3VMxz.js"
	},
	"/assets/link-CzqW9V16.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6894-jESATF3XxOGjfcQhHdBSGJa6N2o\"",
		"mtime": "2026-08-23T15:35:04.373Z",
		"size": 26772,
		"path": "../public/assets/link-CzqW9V16.js"
	},
	"/assets/loader-circle-NEOay2w5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-EwxFegbzh0ZbZxF5+7pxmz/q38Q\"",
		"mtime": "2026-08-23T15:35:04.374Z",
		"size": 144,
		"path": "../public/assets/loader-circle-NEOay2w5.js"
	},
	"/assets/login-B3OzRW_X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3127-50IzW2TRKI/QCqwG8deoposC3zY\"",
		"mtime": "2026-08-23T15:35:04.374Z",
		"size": 12583,
		"path": "../public/assets/login-B3OzRW_X.js"
	},
	"/assets/play-CPV0a6Tn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-LH8ER39j+C7YuhpHH/+qxNjUsbY\"",
		"mtime": "2026-08-23T15:35:04.374Z",
		"size": 190,
		"path": "../public/assets/play-CPV0a6Tn.js"
	},
	"/assets/index-D1jGCKZu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"642c3-d8F2yn8OfIO0DVcgXsgWLgcA4qI\"",
		"mtime": "2026-08-23T15:35:04.363Z",
		"size": 410307,
		"path": "../public/assets/index-D1jGCKZu.js"
	},
	"/assets/practice-CZmLayVV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e064-zBUVGcxh/L+Xlp7weNa0luFBCwg\"",
		"mtime": "2026-08-23T15:35:04.374Z",
		"size": 57444,
		"path": "../public/assets/practice-CZmLayVV.js"
	},
	"/assets/preload-helper-D42ASfUS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184c-7oKw+m1FLioD0e8OF+V5PKMiqVQ\"",
		"mtime": "2026-08-23T15:35:04.376Z",
		"size": 6220,
		"path": "../public/assets/preload-helper-D42ASfUS.js"
	},
	"/assets/profile-DegsLwjQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57da-HtDAiLZBJNmonJm1WF1Qv9L4zu4\"",
		"mtime": "2026-08-23T15:35:04.378Z",
		"size": 22490,
		"path": "../public/assets/profile-DegsLwjQ.js"
	},
	"/assets/practice-f3GFV_ja.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c567-zF0lQtkbXCw+RXR49OdAgIL2EGE\"",
		"mtime": "2026-08-23T15:35:04.376Z",
		"size": 116071,
		"path": "../public/assets/practice-f3GFV_ja.js"
	},
	"/assets/routes-BlDbUNyl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ae5-m2aIHYC2BURCrus2QyDCjSws9tI\"",
		"mtime": "2026-08-23T15:35:04.378Z",
		"size": 19173,
		"path": "../public/assets/routes-BlDbUNyl.js"
	},
	"/assets/settings-BDzqT05A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1188-GZTk6YqozxEprYQZeEeWHQKk2Z8\"",
		"mtime": "2026-08-23T15:35:04.380Z",
		"size": 4488,
		"path": "../public/assets/settings-BDzqT05A.js"
	},
	"/assets/scoring-CxwDst-S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32d-s9H4qtovknbHdb7hHdfaovTwb/M\"",
		"mtime": "2026-08-23T15:35:04.378Z",
		"size": 813,
		"path": "../public/assets/scoring-CxwDst-S.js"
	},
	"/assets/signup-EnFy9ASJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14eb-s0HpKdzkhe+2wO13fMHMz3eA/M0\"",
		"mtime": "2026-08-23T15:35:04.380Z",
		"size": 5355,
		"path": "../public/assets/signup-EnFy9ASJ.js"
	},
	"/assets/sparkles-DZ5Pl1vD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-iq5/zvIByGNJzwVVOKaFoa+gD8s\"",
		"mtime": "2026-08-23T15:35:04.380Z",
		"size": 494,
		"path": "../public/assets/sparkles-DZ5Pl1vD.js"
	},
	"/assets/StatCard-D17gXVvJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"633-bzbQJ5hEzR5lwtXG9jrbLx66abQ\"",
		"mtime": "2026-08-23T15:35:04.365Z",
		"size": 1587,
		"path": "../public/assets/StatCard-D17gXVvJ.js"
	},
	"/assets/theme-DQKZaIZ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33a-dRZfFfa4TyCDik1WUtNEvFxACG0\"",
		"mtime": "2026-08-23T15:35:04.424Z",
		"size": 826,
		"path": "../public/assets/theme-DQKZaIZ_.js"
	},
	"/assets/translator-BQUnJwXr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17be-aOpLSh/XXhnudnKrtrWV/XdXVrE\"",
		"mtime": "2026-08-23T15:35:04.433Z",
		"size": 6078,
		"path": "../public/assets/translator-BQUnJwXr.js"
	},
	"/assets/trophy-BiN7Vuj2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1dc-zwckDcxB9wTfje0nqfQ2gMZsFGQ\"",
		"mtime": "2026-08-23T15:35:04.451Z",
		"size": 476,
		"path": "../public/assets/trophy-BiN7Vuj2.js"
	},
	"/assets/useNavigate-BkLYxs6i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-BzadoXe///GF/zFg2fSSZoeO5CM\"",
		"mtime": "2026-08-23T15:35:04.454Z",
		"size": 228,
		"path": "../public/assets/useNavigate-BkLYxs6i.js"
	},
	"/assets/useRouter-BGpAXxmD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97-+ISDMDd0jCDVZNcQqLKhSYvsP+8\"",
		"mtime": "2026-08-23T15:35:04.455Z",
		"size": 151,
		"path": "../public/assets/useRouter-BGpAXxmD.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-08-23T15:35:04.455Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/x-CGuQtexA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-hbysndGGD769HshBV70OaTPzDQY\"",
		"mtime": "2026-08-23T15:35:04.455Z",
		"size": 154,
		"path": "../public/assets/x-CGuQtexA.js"
	},
	"/assets/zap-D1212EZv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b3-TKFaoaGt6+28GadBmcoggW7FJzA\"",
		"mtime": "2026-08-23T15:35:04.459Z",
		"size": 435,
		"path": "../public/assets/zap-D1212EZv.js"
	},
	"/assets/styles-BO9hzM4C.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"28317-DGj1eN2wpE35CRHnSw8ssa5let0\"",
		"mtime": "2026-08-23T15:35:04.459Z",
		"size": 164631,
		"path": "../public/assets/styles-BO9hzM4C.css"
	},
	"/assets/typing-data-DP4iVqfE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"220a4-dRFlOcjQracsRckZMBFltLpKBEQ\"",
		"mtime": "2026-08-23T15:35:04.454Z",
		"size": 139428,
		"path": "../public/assets/typing-data-DP4iVqfE.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy__Cd0Hs = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy__Cd0Hs
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
