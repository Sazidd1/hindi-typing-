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
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-02T13:10:47.758Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/accuracy-test-Cl00lkix.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"685-qm9z02PZqdcA3OrCyKbkXCLrSeM\"",
		"mtime": "2026-08-06T11:21:58.905Z",
		"size": 1669,
		"path": "../public/assets/accuracy-test-Cl00lkix.js"
	},
	"/assets/award-Bj78cS18.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"107-EOVhQxE8SxBgAeQirD91Sb9xcu0\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 263,
		"path": "../public/assets/award-Bj78cS18.js"
	},
	"/assets/gauge-Ce7Jiub5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-PA5XSkiu83LEYn/FWjNR6NCK5uo\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 165,
		"path": "../public/assets/gauge-Ce7Jiub5.js"
	},
	"/assets/GlassCard-BREuwj7o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34f-BbhevFEwHFX1B4ojhr2Mx4MrH7w\"",
		"mtime": "2026-08-06T11:21:58.905Z",
		"size": 847,
		"path": "../public/assets/GlassCard-BREuwj7o.js"
	},
	"/assets/HindiKeyboard-9y47lYO_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bc-h3QmgCIaB5Zy1vNhqH5WYKLrvQ0\"",
		"mtime": "2026-08-06T11:21:58.905Z",
		"size": 1468,
		"path": "../public/assets/HindiKeyboard-9y47lYO_.js"
	},
	"/assets/dashboard-Cik3IC_D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5db17-ZmLQD5Naep74lv8jfvaSTpHDX54\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 383767,
		"path": "../public/assets/dashboard-Cik3IC_D.js"
	},
	"/assets/jsx-runtime-B-hcVAMW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216d-pcqlp1Bv4Kt7yFmWJlJC8xMXx/k\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 8557,
		"path": "../public/assets/jsx-runtime-B-hcVAMW.js"
	},
	"/assets/leaderboard-CNy_6G5N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd9-u/P+YqJ96wlQc6uXHNHT4Fp6z10\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 4057,
		"path": "../public/assets/leaderboard-CNy_6G5N.js"
	},
	"/assets/login-C5tZ_RWw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"681-7BuyFMPizM1A3u/u7aH+Rumy8Ro\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 1665,
		"path": "../public/assets/login-C5tZ_RWw.js"
	},
	"/assets/lessons-BI_dt4Wb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3130-7qUsvgMl+0AnP6j/G56/zNnr1Lk\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 12592,
		"path": "../public/assets/lessons-BI_dt4Wb.js"
	},
	"/assets/play-YoLb127h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3-fo20P8B/vO+c6EP541fjivZTIk0\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 179,
		"path": "../public/assets/play-YoLb127h.js"
	},
	"/assets/profile-CoR0i8ZZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dce-PfFEknZd1tCdfx8T4o/niNyF7T0\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 3534,
		"path": "../public/assets/profile-CoR0i8ZZ.js"
	},
	"/assets/practice-BFrQnwUu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d5-0AIbW6Ak/DG530HQFf84mbkLFPE\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 469,
		"path": "../public/assets/practice-BFrQnwUu.js"
	},
	"/assets/routes-yIGNobOX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f64-Sn1fz57ANnVbz4vnR6b57+gA0Lw\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 8036,
		"path": "../public/assets/routes-yIGNobOX.js"
	},
	"/assets/settings-BHlzTW7M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c19-dXEMnNl8AdOWwBG0O0mxVNsDElM\"",
		"mtime": "2026-08-06T11:21:58.907Z",
		"size": 3097,
		"path": "../public/assets/settings-BHlzTW7M.js"
	},
	"/assets/speed-test-BfJY1pxz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a3-ca+h5AMq1g7aXPFP8WBfc3UmMfA\"",
		"mtime": "2026-08-06T11:21:58.912Z",
		"size": 1699,
		"path": "../public/assets/speed-test-BfJY1pxz.js"
	},
	"/assets/index-COOZ9Mhc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"636f1-FP0SpcdscXPk1q4RT7kx4IeE5mI\"",
		"mtime": "2026-08-06T11:21:58.904Z",
		"size": 407281,
		"path": "../public/assets/index-COOZ9Mhc.js"
	},
	"/assets/star-B-rXrYsO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25f-X7IpF6znhCt4706CSJ90wfQIipo\"",
		"mtime": "2026-08-06T11:21:58.912Z",
		"size": 607,
		"path": "../public/assets/star-B-rXrYsO.js"
	},
	"/assets/StatCard-BhNrKbHA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ac-ARecNjt5vZGgqK8FT1FN2SAdm9k\"",
		"mtime": "2026-08-06T11:21:58.905Z",
		"size": 940,
		"path": "../public/assets/StatCard-BhNrKbHA.js"
	},
	"/assets/target-B-5aupgC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d7-Fk+M2NbQqchyXGXGZXDMGpyXs68\"",
		"mtime": "2026-08-06T11:21:58.912Z",
		"size": 215,
		"path": "../public/assets/target-B-5aupgC.js"
	},
	"/assets/trophy-BXT_CvnW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-X6AK7WLdezknQ5+sL6HjXIcFKv4\"",
		"mtime": "2026-08-06T11:21:58.912Z",
		"size": 465,
		"path": "../public/assets/trophy-BXT_CvnW.js"
	},
	"/assets/styles--9DeQIEJ.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1c20e-Mgl6Ip8PvGzWvhx6t/dJg8xK/o4\"",
		"mtime": "2026-08-06T11:21:58.914Z",
		"size": 115214,
		"path": "../public/assets/styles--9DeQIEJ.css"
	},
	"/assets/typing-data-Jz7tro-h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c23-+zn1BYTFvVxMpQ23tx9m+ga/UAM\"",
		"mtime": "2026-08-06T11:21:58.912Z",
		"size": 23587,
		"path": "../public/assets/typing-data-Jz7tro-h.js"
	},
	"/assets/TypingArena-DENKw2Bc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57ee-76YzxkCJJeh/OXu4hGHFNC5yAeU\"",
		"mtime": "2026-08-06T11:21:58.905Z",
		"size": 22510,
		"path": "../public/assets/TypingArena-DENKw2Bc.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-08-06T11:21:58.912Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/zap-DNc6HgF6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-uTg1hr1UXLudERVnkIBaxOsC2kY\"",
		"mtime": "2026-08-06T11:21:58.914Z",
		"size": 251,
		"path": "../public/assets/zap-DNc6HgF6.js"
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
