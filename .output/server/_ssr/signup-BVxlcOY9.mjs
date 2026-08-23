import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as EyeOff, c as Sparkles, v as LoaderCircle, w as Eye } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-BVxlcOY9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignupPage() {
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const { signup } = useAuth();
	const navigate = useNavigate();
	const handleSignup = async (e) => {
		e.preventDefault();
		setError(null);
		if (!name.trim() || !email.trim() || !password.trim()) {
			setError("Please fill out all fields.");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters long.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setIsLoading(true);
		try {
			const result = await signup(name, email, password);
			if (result.error) {
				setError(result.error);
				setIsLoading(false);
			} else navigate({ to: "/" });
		} catch (err) {
			setError("An unexpected error occurred.");
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[80vh] items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "w-full max-w-md p-8 sm:p-10 text-center animate-rise-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-2 text-2xl font-bold tracking-tight text-foreground",
					children: "Create an Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-8 font-hindi text-muted-foreground",
					children: "नया खाता बनाएँ"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger text-left",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSignup,
					className: "flex flex-col gap-4 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium text-foreground ml-1",
								children: "Display Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "e.g. Rahul",
								autoFocus: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								className: "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium text-foreground ml-1",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								placeholder: "name@example.com",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium text-foreground ml-1",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showPassword ? "text" : "password",
									placeholder: "Create a password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "w-full rounded-xl border border-input bg-background/50 px-4 py-3 pr-12 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setShowPassword(!showPassword),
									className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1",
									children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-5" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium text-foreground ml-1",
								children: "Confirm Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: showPassword ? "text" : "password",
									placeholder: "Confirm your password",
									value: confirmPassword,
									onChange: (e) => setConfirmPassword(e.target.value),
									className: "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !name.trim() || !email.trim() || !password.trim() || isLoading,
							className: "w-full mt-4 flex justify-center items-center rounded-xl px-4 py-3 font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
							style: { background: "var(--gradient-primary)" },
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : "Create Account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-center text-sm text-muted-foreground",
							children: [
								"Already have an account?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "font-semibold text-primary hover:underline",
									children: "Log in"
								})
							]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { SignupPage as component };
