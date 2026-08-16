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
	"/assets/auth-BZUzAUNI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e0d-ENx3oEG7Nyob9VUoHO6vQjOuBpY\"",
		"mtime": "2026-08-16T03:10:32.520Z",
		"size": 3597,
		"path": "../public/assets/auth-BZUzAUNI.js"
	},
	"/assets/book-open-C3JQO3gI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10b-lX4SwMqlfiRxtx5KT9rWKNSg1vo\"",
		"mtime": "2026-08-16T03:10:32.520Z",
		"size": 267,
		"path": "../public/assets/book-open-C3JQO3gI.js"
	},
	"/assets/eye-eBBdQJ0p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-98tJqKMMT7pTHILrNNtwd/aA868\"",
		"mtime": "2026-08-16T03:10:32.520Z",
		"size": 621,
		"path": "../public/assets/eye-eBBdQJ0p.js"
	},
	"/assets/flame-CwByE2ZF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bb-l1QEo4LidREwJbSygoryYS3LYDk\"",
		"mtime": "2026-08-16T03:10:32.524Z",
		"size": 187,
		"path": "../public/assets/flame-CwByE2ZF.js"
	},
	"/assets/forgot-password-CUoCgoYw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e10-r7CB2HzAGUTNvsEVsezAmApkNh4\"",
		"mtime": "2026-08-16T03:10:32.524Z",
		"size": 3600,
		"path": "../public/assets/forgot-password-CUoCgoYw.js"
	},
	"/assets/gauge-C3yVds9W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-NW9peg67Z3Msfj9mYft7d5Qd1UY\"",
		"mtime": "2026-08-16T03:10:32.524Z",
		"size": 164,
		"path": "../public/assets/gauge-C3yVds9W.js"
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
	"/assets/dashboard-bUUQcuMl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61d95-COV7T1anWpKeaXVkEirNVUeU7gk\"",
		"mtime": "2026-08-16T03:10:32.520Z",
		"size": 400789,
		"path": "../public/assets/dashboard-bUUQcuMl.js"
	},
	"/assets/GlassCard-DTkfYs2Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355-uomnzwOA1ahJaX5H+iXP5zAZUCk\"",
		"mtime": "2026-08-16T03:10:32.513Z",
		"size": 853,
		"path": "../public/assets/GlassCard-DTkfYs2Z.js"
	},
	"/assets/HindiKeyboard-hOtstHN9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"93b-RUD2BQ7p3H/XDRWmIzX/vmSKvdQ\"",
		"mtime": "2026-08-16T03:10:32.520Z",
		"size": 2363,
		"path": "../public/assets/HindiKeyboard-hOtstHN9.js"
	},
	"/assets/jsx-runtime-B-hcVAMW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216d-pcqlp1Bv4Kt7yFmWJlJC8xMXx/k\"",
		"mtime": "2026-08-16T03:10:32.524Z",
		"size": 8557,
		"path": "../public/assets/jsx-runtime-B-hcVAMW.js"
	},
	"/assets/keyboard-DBC5cXCE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-r77aZZSxbsQ1DjPNTeP9Cz9F1dw\"",
		"mtime": "2026-08-16T03:10:32.524Z",
		"size": 441,
		"path": "../public/assets/keyboard-DBC5cXCE.js"
	},
	"/assets/leaderboard-Bk9xA3SD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f53-pGgzpnx2L/3fCtDNp13ztHgIXgA\"",
		"mtime": "2026-08-16T03:10:32.524Z",
		"size": 8019,
		"path": "../public/assets/leaderboard-Bk9xA3SD.js"
	},
	"/assets/LessonCard-BmL6teNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f13-/P4s0NHOyExkotwFcNMhK5THdr0\"",
		"mtime": "2026-08-16T03:10:32.520Z",
		"size": 3859,
		"path": "../public/assets/LessonCard-BmL6teNW.js"
	},
	"/assets/lessons-BbvjFaFd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"451-lpjQgRs6qk1MWHmFUfOrgqgzTgU\"",
		"mtime": "2026-08-16T03:10:32.526Z",
		"size": 1105,
		"path": "../public/assets/lessons-BbvjFaFd.js"
	},
	"/assets/lessons-DwHF2kwk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f3f-zd6o8QugqiPo+epQ+0Yqk7viaoM\"",
		"mtime": "2026-08-16T03:10:32.526Z",
		"size": 12095,
		"path": "../public/assets/lessons-DwHF2kwk.js"
	},
	"/assets/index-DA9xmB2G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d22a-7NrOJ9jerYuuOKHdV6y1hm5m+yc\"",
		"mtime": "2026-08-16T03:10:32.513Z",
		"size": 315946,
		"path": "../public/assets/index-DA9xmB2G.js"
	},
	"/assets/link-CsMjSmXU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68b3-8pZGg/wvXHu9mV9k61ZFFW9AFKA\"",
		"mtime": "2026-08-16T03:10:32.528Z",
		"size": 26803,
		"path": "../public/assets/link-CsMjSmXU.js"
	},
	"/assets/loader-circle-Dczt6D68.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"84-/TMjrsFI1MHQ0U8RxM0wrMlTjXM\"",
		"mtime": "2026-08-16T03:10:32.529Z",
		"size": 132,
		"path": "../public/assets/loader-circle-Dczt6D68.js"
	},
	"/assets/login-C7JbrkdK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ef6-b69w/EFg1PZ/BwLpg3lMfBikqqI\"",
		"mtime": "2026-08-16T03:10:32.535Z",
		"size": 3830,
		"path": "../public/assets/login-C7JbrkdK.js"
	},
	"/assets/play-D8W9AHUY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-FPOaIQ++jQKrVDi+MqZiZ1bQOks\"",
		"mtime": "2026-08-16T03:10:32.552Z",
		"size": 178,
		"path": "../public/assets/play-D8W9AHUY.js"
	},
	"/assets/practice-B7-COBNc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aae0-SZru+M/dhgLdcGhSOb1ZnUg6v90\"",
		"mtime": "2026-08-16T03:10:32.554Z",
		"size": 43744,
		"path": "../public/assets/practice-B7-COBNc.js"
	},
	"/assets/preload-helper-BBP0IWJy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1827-hledfJguf2x0xv5mftd7jdUD9QI\"",
		"mtime": "2026-08-16T03:10:32.556Z",
		"size": 6183,
		"path": "../public/assets/preload-helper-BBP0IWJy.js"
	},
	"/assets/practice-CbYo5WG_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dff0-37ngieOFmp+OMCBpela9PEyAnAk\"",
		"mtime": "2026-08-16T03:10:32.556Z",
		"size": 57328,
		"path": "../public/assets/practice-CbYo5WG_.js"
	},
	"/assets/profile-BLLYgXTk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4adc-SJoWlgilfhy6Kn36OIDLYnzML20\"",
		"mtime": "2026-08-16T03:10:32.556Z",
		"size": 19164,
		"path": "../public/assets/profile-BLLYgXTk.js"
	},
	"/assets/routes-DUuBpZP-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2677-wc9pPj4SmpG/fck21ancrR9nlUA\"",
		"mtime": "2026-08-16T03:10:32.558Z",
		"size": 9847,
		"path": "../public/assets/routes-DUuBpZP-.js"
	},
	"/assets/settings-BDzqT05A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1188-GZTk6YqozxEprYQZeEeWHQKk2Z8\"",
		"mtime": "2026-08-16T03:10:32.558Z",
		"size": 4488,
		"path": "../public/assets/settings-BDzqT05A.js"
	},
	"/assets/scoring-Df3_lJnT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31a-eehKMXUwLzs6AhLa9dS4TwsuRPU\"",
		"mtime": "2026-08-16T03:10:32.558Z",
		"size": 794,
		"path": "../public/assets/scoring-Df3_lJnT.js"
	},
	"/assets/signup-DmMMQ_M5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12b9-d1zlNQ0ibJweZbIAnJRAgrCz+PA\"",
		"mtime": "2026-08-16T03:10:32.560Z",
		"size": 4793,
		"path": "../public/assets/signup-DmMMQ_M5.js"
	},
	"/assets/sparkles-sdTgP09J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-iqB7pFsjTIRYYRFrgLbnrOKMLik\"",
		"mtime": "2026-08-16T03:10:32.560Z",
		"size": 482,
		"path": "../public/assets/sparkles-sdTgP09J.js"
	},
	"/assets/StatCard-D_uSTejz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66f-7KzVZe0blNP89rcn6tZUEaTVKkA\"",
		"mtime": "2026-08-16T03:10:32.520Z",
		"size": 1647,
		"path": "../public/assets/StatCard-D_uSTejz.js"
	},
	"/assets/theme-DQKZaIZ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33a-dRZfFfa4TyCDik1WUtNEvFxACG0\"",
		"mtime": "2026-08-16T03:10:32.560Z",
		"size": 826,
		"path": "../public/assets/theme-DQKZaIZ_.js"
	},
	"/assets/styles-CbgIhKn2.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"22a00-S/k23reIeHspcU4/wDNkpsbwS7k\"",
		"mtime": "2026-08-16T03:10:32.603Z",
		"size": 141824,
		"path": "../public/assets/styles-CbgIhKn2.css"
	},
	"/assets/trophy-M0P1skZv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d0-/q2IzIlaN52HZC0SJF+6fObfkaE\"",
		"mtime": "2026-08-16T03:10:32.560Z",
		"size": 464,
		"path": "../public/assets/trophy-M0P1skZv.js"
	},
	"/assets/useNavigate-BF8GIkt7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df-/NY7Pkp09RYCHvvRuxrVAR3vtZg\"",
		"mtime": "2026-08-16T03:10:32.597Z",
		"size": 223,
		"path": "../public/assets/useNavigate-BF8GIkt7.js"
	},
	"/assets/typing-data-BV5N9Jpj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1d2-Z3OQgY7hKpeJPsleV11G3B3hRCM\"",
		"mtime": "2026-08-16T03:10:32.590Z",
		"size": 123346,
		"path": "../public/assets/typing-data-BV5N9Jpj.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-08-16T03:10:32.598Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/x-B7eXmPkX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-L85C88C6pu5pGE7ARzhOZX5t5S0\"",
		"mtime": "2026-08-16T03:10:32.603Z",
		"size": 142,
		"path": "../public/assets/x-B7eXmPkX.js"
	},
	"/assets/zap-BoyKEXh7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a7-bcFs1pXY1Ycc/ufoTVYfBFwhBXc\"",
		"mtime": "2026-08-16T03:10:32.603Z",
		"size": 423,
		"path": "../public/assets/zap-BoyKEXh7.js"
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
