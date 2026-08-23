import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth, t as AuthProvider } from "./auth-CcoBRp2W.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Check, N as ChevronRight, P as ChevronDown, b as Keyboard, h as Menu, k as Circle, n as X } from "../_libs/lucide-react.mjs";
import { t as Route$10 } from "./lessons-DYBrTSla.mjs";
import { t as Route$11 } from "./practice-KhUoaOeI.mjs";
import { t as useTheme } from "./theme-CcnM0qqy.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BGYU_Qpn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Bps-lOOK.css";
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
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var LAYOUTS = [
	"Hindi Remington GAIL",
	"Hindi Remington CBI",
	"Kruti Dev",
	"Mangal InScript",
	"English"
];
var navItems = [
	{
		to: "/",
		label: "Home"
	},
	{
		isLayoutSelector: true,
		label: "Typing Tutor"
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
	const [layout, setLayout] = (0, import_react.useState)(() => {
		return typeof window !== "undefined" ? localStorage.getItem("selected_layout") || "Hindi Remington GAIL" : "Hindi Remington GAIL";
	});
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const handleLayoutSelect = (l) => {
		setLayout(l);
		if (typeof window !== "undefined") localStorage.setItem("selected_layout", l);
	};
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
							children: navItems.map((item) => {
								if (item.isLayoutSelector) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
									className: "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/80 dark:hover:bg-white/10 outline-none data-[state=open]:bg-white/80 dark:data-[state=open]:bg-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 opacity-50" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "start",
									className: "w-[280px] rounded-[20px] p-2",
									style: {
										backgroundColor: "rgba(255, 255, 255, 0.68)",
										backdropFilter: "blur(20px)",
										WebkitBackdropFilter: "blur(20px)",
										border: "1px solid rgba(255, 255, 255, 0.75)",
										boxShadow: "0 12px 35px rgba(15, 23, 42, 0.16)"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest",
										children: "Keyboard Layout"
									}), LAYOUTS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => handleLayoutSelect(l),
										className: cn("rounded-[14px] cursor-pointer py-2.5 px-3 transition-all duration-200 my-0.5 font-medium flex items-center justify-between", layout === l ? "bg-[rgba(59,130,246,0.12)] text-[#2563eb] hover:bg-[rgba(59,130,246,0.16)] focus:bg-[rgba(59,130,246,0.16)] hover:text-[#2563eb] focus:text-[#2563eb]" : "text-foreground hover:bg-black/5 dark:hover:bg-white/10 focus:bg-black/5 dark:focus:bg-white/10"),
										children: [l, layout === l && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-2 rounded-full bg-[#2563eb]" })]
									}, l))]
								})] }, "layout-selector");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									activeOptions: { exact: item.to === "/" },
									activeProps: { className: "bg-primary text-primary-foreground" },
									inactiveProps: { className: "text-muted-foreground hover:bg-white/80 dark:hover:bg-white/10" },
									className: "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200",
									children: item.label
								}, item.to);
							})
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
						children: [
							navItems.map((item) => {
								if (item.isLayoutSelector) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "px-3 py-2 text-sm font-semibold text-foreground/80",
										children: item.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col ml-3 pl-3 border-l-2 border-border/50",
										children: LAYOUTS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => {
												handleLayoutSelect(l);
												setOpen(false);
											},
											className: cn("text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors mb-0.5 flex items-center justify-between", layout === l ? "text-[#2563eb] bg-[rgba(59,130,246,0.1)]" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"),
											children: [l, layout === l && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-1.5 rounded-full bg-[#2563eb]" })]
										}, l))
									})]
								}, "layout-selector");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.to,
									onClick: () => setOpen(false),
									className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors mb-1",
									children: item.label
								}, item.to);
							}),
							currentUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								onClick: () => setOpen(false),
								className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors mb-1",
								children: "Profile"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								onClick: () => setOpen(false),
								className: "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors mb-1",
								children: "Login"
							}),
							currentUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									await handleLogout();
									setOpen(false);
								},
								className: "rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40",
								children: "Logout"
							})
						]
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
var Route$9 = createRootRouteWithContext()({
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
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) })
	});
}
var $$splitComponentImporter$8 = () => import("./routes-Z2zkkqN0.mjs");
var Route$8 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./dashboard-DN8Qci3G.mjs");
var Route$7 = createFileRoute("/dashboard")({
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
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./forgot-password-DDGTf5-P.mjs");
var Route$6 = createFileRoute("/forgot-password")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./leaderboard-BE-5S-8i.mjs");
var Route$5 = createFileRoute("/leaderboard")({
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
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-BXyWbaY0.mjs");
var Route$4 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./profile--ZCmIf1Z.mjs");
var Route$3 = createFileRoute("/profile")({
	head: () => ({ meta: [{ title: "Typist Profile — Hindi Typing Abhyas Studio" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-DztunV15.mjs");
var Route$2 = createFileRoute("/settings")({
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
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
/** Appearance section — controls the global light/dark theme. */
var $$splitComponentImporter$1 = () => import("./signup-BVxlcOY9.mjs");
var Route$1 = createFileRoute("/signup")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./translator-DAI8Dt0u.mjs");
var Route = createFileRoute("/translator")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	DashboardRoute: Route$7.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$9
	}),
	ForgotPasswordRoute: Route$6.update({
		id: "/forgot-password",
		path: "/forgot-password",
		getParentRoute: () => Route$9
	}),
	LeaderboardRoute: Route$5.update({
		id: "/leaderboard",
		path: "/leaderboard",
		getParentRoute: () => Route$9
	}),
	LessonsRoute: Route$10.update({
		id: "/lessons",
		path: "/lessons",
		getParentRoute: () => Route$9
	}),
	LoginRoute: Route$4.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$9
	}),
	PracticeRoute: Route$11.update({
		id: "/practice",
		path: "/practice",
		getParentRoute: () => Route$9
	}),
	ProfileRoute: Route$3.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$9
	}),
	SettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$9
	}),
	SignupRoute: Route$1.update({
		id: "/signup",
		path: "/signup",
		getParentRoute: () => Route$9
	}),
	TranslatorRoute: Route.update({
		id: "/translator",
		path: "/translator",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
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
