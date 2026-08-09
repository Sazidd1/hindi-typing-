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
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-02T13:10:47.766Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/_headers": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"3e-W6P+hMLSiXbt1kmPTgkl2e6wmcE\"",
		"mtime": "2026-08-09T13:16:04.976Z",
		"size": 62,
		"path": "../public/_headers"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-02T13:10:47.758Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/book-open-CfogZ0KZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c-E8joGWI1aFnM/X1qIbvs3Ui3Kj0\"",
		"mtime": "2026-08-09T13:16:04.261Z",
		"size": 268,
		"path": "../public/assets/book-open-CfogZ0KZ.js"
	},
	"/assets/dashboard-DdNalqeX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61d76-YmFz71ewOkrvCaob7Sv8V5/aZ8M\"",
		"mtime": "2026-08-09T13:16:04.263Z",
		"size": 400758,
		"path": "../public/assets/dashboard-DdNalqeX.js"
	},
	"/assets/flame-C_pK2v5-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-EShqQDXSBB+9VEXSNJ5ZUG5Q8yY\"",
		"mtime": "2026-08-09T13:16:04.263Z",
		"size": 188,
		"path": "../public/assets/flame-C_pK2v5-.js"
	},
	"/assets/gauge-CapyqiQz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-XKcf0CnE+2bIBYYoEMi2kOLsb0U\"",
		"mtime": "2026-08-09T13:16:04.263Z",
		"size": 165,
		"path": "../public/assets/gauge-CapyqiQz.js"
	},
	"/assets/GlassCard-DTkfYs2Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355-uomnzwOA1ahJaX5H+iXP5zAZUCk\"",
		"mtime": "2026-08-09T13:16:04.261Z",
		"size": 853,
		"path": "../public/assets/GlassCard-DTkfYs2Z.js"
	},
	"/assets/HindiKeyboard-C56Pdzyu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"925-8Vp0Lc4VTWcrPOgvC8Dt5sxn/Hg\"",
		"mtime": "2026-08-09T13:16:04.261Z",
		"size": 2341,
		"path": "../public/assets/HindiKeyboard-C56Pdzyu.js"
	},
	"/assets/index-CiZCchlm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"639c8-S5+txSthGUpzpN8d6fJOHq9pLUg\"",
		"mtime": "2026-08-09T13:16:04.259Z",
		"size": 408008,
		"path": "../public/assets/index-CiZCchlm.js"
	},
	"/assets/jsx-runtime-B-hcVAMW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216d-pcqlp1Bv4Kt7yFmWJlJC8xMXx/k\"",
		"mtime": "2026-08-09T13:16:04.263Z",
		"size": 8557,
		"path": "../public/assets/jsx-runtime-B-hcVAMW.js"
	},
	"/assets/leaderboard-Ck10ToU7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a6b-sDxDDLl/vpjCXkUPEPgDfSXhQPY\"",
		"mtime": "2026-08-09T13:16:04.263Z",
		"size": 6763,
		"path": "../public/assets/leaderboard-Ck10ToU7.js"
	},
	"/assets/LessonCard-DNekLl1S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f83-wA8SX/qXKVERsm/CmmtYF1YD4mI\"",
		"mtime": "2026-08-09T13:16:04.261Z",
		"size": 3971,
		"path": "../public/assets/LessonCard-DNekLl1S.js"
	},
	"/assets/lessons-pLDTQp5g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f57-+dKDkjh0jI6/qg7GpQjrJN4lo58\"",
		"mtime": "2026-08-09T13:16:04.265Z",
		"size": 12119,
		"path": "../public/assets/lessons-pLDTQp5g.js"
	},
	"/assets/login-DJTYYPTu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"681-zZsFh0U/Ah7IcDAioWll/VR0eeQ\"",
		"mtime": "2026-08-09T13:16:04.265Z",
		"size": 1665,
		"path": "../public/assets/login-DJTYYPTu.js"
	},
	"/assets/play-DH-5PLgE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3-tzabfUo98v3HvnMLXqUcO5YOid0\"",
		"mtime": "2026-08-09T13:16:04.265Z",
		"size": 179,
		"path": "../public/assets/play-DH-5PLgE.js"
	},
	"/assets/practice-BdOoF4tj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5beb-HiI6rh2VEq6Y6lLcL+HShYiz87A\"",
		"mtime": "2026-08-09T13:16:04.265Z",
		"size": 23531,
		"path": "../public/assets/practice-BdOoF4tj.js"
	},
	"/assets/profile-BFxhScXZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4687-TaiJWivpjnvdGpO7oN6hEGAwq8k\"",
		"mtime": "2026-08-09T13:16:04.267Z",
		"size": 18055,
		"path": "../public/assets/profile-BFxhScXZ.js"
	},
	"/assets/routes-Do7ljyVe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23d5-y63aRt9prLxrDr/gx4pGmiZI1kA\"",
		"mtime": "2026-08-09T13:16:04.267Z",
		"size": 9173,
		"path": "../public/assets/routes-Do7ljyVe.js"
	},
	"/assets/scoring-C7ZkEj2M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"304-O8tiTrqr631icNOtcSbcFnIIpQQ\"",
		"mtime": "2026-08-09T13:16:04.267Z",
		"size": 772,
		"path": "../public/assets/scoring-C7ZkEj2M.js"
	},
	"/assets/settings-CxY3Gz-E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1188-wEseLCWV8I5r6e/Y7nMjrvPgOzY\"",
		"mtime": "2026-08-09T13:16:04.267Z",
		"size": 4488,
		"path": "../public/assets/settings-CxY3Gz-E.js"
	},
	"/assets/StatCard-DSzFccXX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"670-7y5cFDeqGEVSChZ4NVzQSLExvZY\"",
		"mtime": "2026-08-09T13:16:04.261Z",
		"size": 1648,
		"path": "../public/assets/StatCard-DSzFccXX.js"
	},
	"/assets/trophy-ahA9YrR-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-8RO7yDMpqij4hol68qIOSlG6BjY\"",
		"mtime": "2026-08-09T13:16:04.267Z",
		"size": 465,
		"path": "../public/assets/trophy-ahA9YrR-.js"
	},
	"/assets/typing-data-CK-7RF_r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55ce-kFvfomoSGvMIRr+E5CNM3u2AQzc\"",
		"mtime": "2026-08-09T13:16:04.269Z",
		"size": 21966,
		"path": "../public/assets/typing-data-CK-7RF_r.js"
	},
	"/assets/styles-augYaucm.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"222ca-3KyqK8B8u7TNrFoqjzXBVQtKnm8\"",
		"mtime": "2026-08-09T13:16:04.269Z",
		"size": 139978,
		"path": "../public/assets/styles-augYaucm.css"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-08-09T13:16:04.269Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/zap-CbA78_QS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-P1yy/n5DJ8I8noczNJSRuLEJnrA\"",
		"mtime": "2026-08-09T13:16:04.269Z",
		"size": 424,
		"path": "../public/assets/zap-CbA78_QS.js"
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
