import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as ArrowLeft, v as LoaderCircle, x as KeyRound } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forgot-password-DDGTf5-P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ForgotPasswordPage() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const { resetPassword } = useAuth();
	const handleReset = async (e) => {
		e.preventDefault();
		setError(null);
		if (!email.trim()) {
			setError("Please enter your email address.");
			return;
		}
		setIsLoading(true);
		try {
			const result = await resetPassword(email);
			if (result.error) {
				setError(result.error);
				setIsLoading(false);
			} else {
				setSuccess(true);
				setIsLoading(false);
			}
		} catch (err) {
			setError("An unexpected error occurred.");
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "w-full max-w-md p-8 sm:p-10 text-center animate-rise-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-2 text-2xl font-bold tracking-tight text-foreground",
					children: "Reset Password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-8 font-hindi text-muted-foreground",
					children: "पासवर्ड रीसेट करें"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 rounded-xl bg-danger/10 px-4 py-3 text-sm font-medium text-danger text-left",
					children: error
				}),
				success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-left animate-in fade-in zoom-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 rounded-xl bg-success/10 px-4 py-4 text-sm font-medium text-success",
						children: [
							"Password reset link has been sent to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: email }),
							" if an account exists."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/login",
						className: "w-full flex justify-center items-center rounded-xl border border-input bg-background/50 px-4 py-3 font-semibold text-foreground hover:bg-muted transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 mr-2" }), "Back to Login"]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleReset,
					className: "flex flex-col gap-4 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-sm font-medium text-foreground ml-1",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								placeholder: "Enter your email",
								autoFocus: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !email.trim() || isLoading,
							className: "w-full mt-4 flex justify-center items-center rounded-xl px-4 py-3 font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
							style: { background: "var(--gradient-primary)" },
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : "Send Reset Link"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								className: "inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 mr-1.5" }), "Back to Login"]
							})
						})
					]
				})
			]
		})
	});
}
//#endregion
export { ForgotPasswordPage as component };
