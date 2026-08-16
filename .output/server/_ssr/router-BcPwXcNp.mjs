import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as useAuth, t as AuthProvider } from "./auth-CcoBRp2W.mjs";
import { _ as useNavigate, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Menu, n as X, v as Keyboard } from "../_libs/lucide-react.mjs";
import { t as Route$9 } from "./lessons-DpODvTx7.mjs";
import { t as Route$10 } from "./practice-CGKuKubV.mjs";
import { t as useTheme } from "./theme-CcnM0qqy.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BcPwXcNp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CbgIhKn2.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var navItems = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/lessons",
		label: "Lessons"
	},
	{
		to: "/leaderboard",
		label: "Leaderboard"
	},
	{
		to: "/dashboard",
		label: "Dashboard"
	}
];
function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: toggleTheme,
		"aria-label": theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
		title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
		className: "inline-flex size-9 items-center justify-center rounded-xl bg-secondary/60 border border-border/60 text-foreground transition-all duration-200 hover:bg-secondary hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-base leading-none select-none",
			"aria-hidden": "true",
			children: theme === "dark" ? "☀️" : "🌙"
		})
	});
}
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		await logout();
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-grid min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-50 border-b border-white/50 dark:border-white/8 bg-white/60 dark:bg-[oklch(0.20_0.035_260/0.85)] backdrop-blur-xl shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-xl text-primary-foreground",
								style: { background: "var(--gradient-primary)" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-hindi text-base font-semibold text-foreground",
									children: "हिंदी टाइपिंग"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
									children: "Abhyas Studio"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 lg:flex",
							children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								activeOptions: { exact: item.to === "/" },
								activeProps: { className: "bg-primary text-primary-foreground" },
								inactiveProps: { className: "text-muted-foreground hover:bg-white/80 dark:hover:bg-white/10" },
								className: "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200",
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								currentUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/profile",
									className: "hidden rounded-full border border-border bg-white/80 dark:bg-white/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white dark:hover:bg-white/20 md:inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-bold uppercase",
										children: currentUser[0]
									}), "Profile"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleLogout,
									className: "hidden rounded-full px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 md:inline-flex",
									style: { background: "var(--gradient-primary)" },
									children: "Logout"
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "hidden rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 md:inline-flex",
									style: { background: "var(--gradient-primary)" },
									children: "Login"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setOpen((v) => !v),
									"aria-label": "Toggle navigation",
									className: "inline-flex size-10 items-center justify-center rounded-xl bg-white/80 dark:bg-white/10 text-foreground lg:hidden",
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							]
						})
					]
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mobile-menu-overlay animate-rise-in border-t border-white/50 dark:border-white/8 bg-white/85 dark:bg-[oklch(0.18_0.03_260/0.95)] px-5 py-3 lg:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [[...navItems, ...currentUser ? [{
							to: "/profile",
							label: "Profile"
						}] : [{
							to: "/login",
							label: "Login"
						}]].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors",
							children: item.label
						}, item.to)), currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: async () => {
								await handleLogout();
								setOpen(false);
							},
							className: "rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40",
							children: "Logout"
						})]
					})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-7xl px-5 py-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-white/50 dark:border-white/8 bg-white/60 dark:bg-[oklch(0.20_0.035_260/0.85)] backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-hindi",
						children: "हिंदी टाइपिंग अभ्यास — रोज़ अभ्यास, तेज़ प्रगति।"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Abhyas Studio. Remington (GAIL) layout."
						] })
					})]
				})
			})
		]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Hindi Typing Abhyas Studio" },
			{
				name: "description",
				content: "Premium Hindi typing practice with Remington keyboard, live WPM and lessons."
			},
			{
				name: "author",
				content: "Abhyas Studio"
			},
			{
				property: "og:title",
				content: "Hindi Typing Abhyas Studio"
			},
			{
				property: "og:description",
				content: "Premium Hindi typing practice with Remington keyboard, live WPM and lessons."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();` } }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
var $$splitComponentImporter$7 = () => import("./routes-BKd-AE8S.mjs");
var Route$7 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Hindi Typing Practice — Abhyas Studio" },
		{
			name: "description",
			content: "Learn Hindi Remington typing with guided lessons, live WPM, accuracy tracking and an animated virtual keyboard."
		},
		{
			property: "og:title",
			content: "Hindi Typing Practice — Abhyas Studio"
		},
		{
			property: "og:description",
			content: "Guided Hindi typing lessons with live WPM, accuracy and finger guidance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-Bpoj-M0O.mjs");
var Route$6 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Typing Dashboard — Streak, WPM & Weekly Progress" },
		{
			name: "description",
			content: "Track your Hindi typing streak, practice minutes, WPM, accuracy, weekly progress chart and achievement badges."
		},
		{
			property: "og:title",
			content: "Hindi Typing Dashboard"
		},
		{
			property: "og:description",
			content: "Streaks, weekly progress charts and achievement badges for Hindi typists."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./forgot-password-DDGTf5-P.mjs");
var Route$5 = createFileRoute("/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./leaderboard-BE-5S-8i.mjs");
var Route$4 = createFileRoute("/leaderboard")({
	head: () => ({ meta: [
		{ title: "Hindi Typing Leaderboard — Top Typists" },
		{
			name: "description",
			content: "See the fastest Hindi typists this week ranked by words per minute, accuracy and practice consistency."
		},
		{
			property: "og:title",
			content: "Hindi Typing Leaderboard"
		},
		{
			property: "og:description",
			content: "Weekly ranking of the fastest and most accurate Hindi typists."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./login-BRcHZyfl.mjs");
var Route$3 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./profile--ZCmIf1Z.mjs");
var Route$2 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "Typist Profile — Hindi Typing Abhyas Studio" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./settings-DztunV15.mjs");
var Route$1 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Typing Settings — Layout, Sound & Guidance" },
		{
			name: "description",
			content: "Customise your Hindi typing experience: keyboard layout, font size, sound feedback, finger guidance and test duration."
		},
		{
			property: "og:title",
			content: "Typing Settings"
		},
		{
			property: "og:description",
			content: "Customise keyboard layout, font size, sound and finger guidance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
/** Appearance section — controls the global light/dark theme. */
var $$splitComponentImporter = () => import("./signup-BVxlcOY9.mjs");
var Route = createFileRoute("/signup")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	DashboardRoute: Route$6.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$8
	}),
	ForgotPasswordRoute: Route$5.update({
		id: "/forgot-password",
		path: "/forgot-password",
		getParentRoute: () => Route$8
	}),
	LeaderboardRoute: Route$4.update({
		id: "/leaderboard",
		path: "/leaderboard",
		getParentRoute: () => Route$8
	}),
	LessonsRoute: Route$9.update({
		id: "/lessons",
		path: "/lessons",
		getParentRoute: () => Route$8
	}),
	LoginRoute: Route$3.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$8
	}),
	PracticeRoute: Route$10.update({
		id: "/practice",
		path: "/practice",
		getParentRoute: () => Route$8
	}),
	ProfileRoute: Route$2.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$8
	}),
	SettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$8
	}),
	SignupRoute: Route.update({
		id: "/signup",
		path: "/signup",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
