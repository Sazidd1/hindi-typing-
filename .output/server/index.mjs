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
	"/assets/book-open-ILW5vYP4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10c-NObNGfVUzWIt7Ki3cFPae+3TA48\"",
		"mtime": "2026-08-09T13:32:15.264Z",
		"size": 268,
		"path": "../public/assets/book-open-ILW5vYP4.js"
	},
	"/assets/flame-0AGuNgBF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-zFAUMfN/DGfZoKG9c5/+2FyOdSQ\"",
		"mtime": "2026-08-09T13:32:15.268Z",
		"size": 188,
		"path": "../public/assets/flame-0AGuNgBF.js"
	},
	"/assets/gauge-DikowCXQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-ZvVHifV9YxUTcC5ebuIMLKkMlgM\"",
		"mtime": "2026-08-09T13:32:15.268Z",
		"size": 165,
		"path": "../public/assets/gauge-DikowCXQ.js"
	},
	"/assets/dashboard-R4Q2XwMe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"61d76-yIyRqL7sEPaxCtoVHyjVGBs2jIY\"",
		"mtime": "2026-08-09T13:32:15.268Z",
		"size": 400758,
		"path": "../public/assets/dashboard-R4Q2XwMe.js"
	},
	"/assets/GlassCard-DTkfYs2Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"355-uomnzwOA1ahJaX5H+iXP5zAZUCk\"",
		"mtime": "2026-08-09T13:32:15.260Z",
		"size": 853,
		"path": "../public/assets/GlassCard-DTkfYs2Z.js"
	},
	"/assets/HindiKeyboard-C56Pdzyu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"925-8Vp0Lc4VTWcrPOgvC8Dt5sxn/Hg\"",
		"mtime": "2026-08-09T13:32:15.264Z",
		"size": 2341,
		"path": "../public/assets/HindiKeyboard-C56Pdzyu.js"
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
	"/assets/jsx-runtime-B-hcVAMW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216d-pcqlp1Bv4Kt7yFmWJlJC8xMXx/k\"",
		"mtime": "2026-08-09T13:32:15.271Z",
		"size": 8557,
		"path": "../public/assets/jsx-runtime-B-hcVAMW.js"
	},
	"/assets/leaderboard-DKOnHQ-0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f6d-9nl0GFbLq6mdr6VHe9EBpZ9AQMs\"",
		"mtime": "2026-08-09T13:32:15.281Z",
		"size": 8045,
		"path": "../public/assets/leaderboard-DKOnHQ-0.js"
	},
	"/assets/LessonCard-Bsq7FoYP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1522-BDd3nVbms6ruHUBBHzdW4k5LKKg\"",
		"mtime": "2026-08-09T13:32:15.264Z",
		"size": 5410,
		"path": "../public/assets/LessonCard-Bsq7FoYP.js"
	},
	"/assets/lessons-DNr5D8cG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f57-ZBNZfLZ2qiij8Zzt8w0IOhFdySU\"",
		"mtime": "2026-08-09T13:32:15.281Z",
		"size": 12119,
		"path": "../public/assets/lessons-DNr5D8cG.js"
	},
	"/assets/login-CSKjxYW9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"681-af8jPF0YZe8UzkYOxm9Au9jOy+w\"",
		"mtime": "2026-08-09T13:32:15.293Z",
		"size": 1665,
		"path": "../public/assets/login-CSKjxYW9.js"
	},
	"/assets/play-C07P1Igg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3-BBd9fpkAS9kdPdjF5/BfXhWunEY\"",
		"mtime": "2026-08-09T13:32:15.293Z",
		"size": 179,
		"path": "../public/assets/play-C07P1Igg.js"
	},
	"/assets/index-DIvJjnOq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"639cb-Au1cwNDcLO3ejqKj1USoG/hfF0E\"",
		"mtime": "2026-08-09T13:32:15.260Z",
		"size": 408011,
		"path": "../public/assets/index-DIvJjnOq.js"
	},
	"/assets/practice-BqwWLWsk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cb8-Xc4u4wetZYBMKyV8QA3H9Wdg6K0\"",
		"mtime": "2026-08-09T13:32:15.293Z",
		"size": 23736,
		"path": "../public/assets/practice-BqwWLWsk.js"
	},
	"/assets/profile-hX9DpgCS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a62-VqrxBBLU10I3zPvGtQEMjKPTag8\"",
		"mtime": "2026-08-09T13:32:15.295Z",
		"size": 19042,
		"path": "../public/assets/profile-hX9DpgCS.js"
	},
	"/assets/routes-9ph-ToPE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23d5-aqrZEQfPFaefd06zgCLDzTefCgM\"",
		"mtime": "2026-08-09T13:32:15.297Z",
		"size": 9173,
		"path": "../public/assets/routes-9ph-ToPE.js"
	},
	"/assets/scoring-Df3_lJnT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31a-eehKMXUwLzs6AhLa9dS4TwsuRPU\"",
		"mtime": "2026-08-09T13:32:15.312Z",
		"size": 794,
		"path": "../public/assets/scoring-Df3_lJnT.js"
	},
	"/assets/settings-C0PLX8ZB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1188-5ujbVFfIN3MSqV3zs2QHSKTOKfU\"",
		"mtime": "2026-08-09T13:32:15.312Z",
		"size": 4488,
		"path": "../public/assets/settings-C0PLX8ZB.js"
	},
	"/assets/StatCard-BiCRtRXZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"670-cGBhoz4i1affPOZ5CRGyYX+Q9Bc\"",
		"mtime": "2026-08-09T13:32:15.264Z",
		"size": 1648,
		"path": "../public/assets/StatCard-BiCRtRXZ.js"
	},
	"/assets/trophy-Bj01cksa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-3e2W9jQo7hm0ebg0L0h17fA412s\"",
		"mtime": "2026-08-09T13:32:15.312Z",
		"size": 465,
		"path": "../public/assets/trophy-Bj01cksa.js"
	},
	"/assets/typing-data-CK-7RF_r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55ce-kFvfomoSGvMIRr+E5CNM3u2AQzc\"",
		"mtime": "2026-08-09T13:32:15.312Z",
		"size": 21966,
		"path": "../public/assets/typing-data-CK-7RF_r.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-08-09T13:32:15.333Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/styles-CiDIv9Nv.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"22958-CJpX2V68jiorPb+7Aro8MZbfzFo\"",
		"mtime": "2026-08-09T13:32:15.335Z",
		"size": 141656,
		"path": "../public/assets/styles-CiDIv9Nv.css"
	},
	"/assets/zap-BfStE5H6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8-AAeJeUNz6yFPK53NsY6CLo2J3zk\"",
		"mtime": "2026-08-09T13:32:15.335Z",
		"size": 424,
		"path": "../public/assets/zap-BfStE5H6.js"
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
