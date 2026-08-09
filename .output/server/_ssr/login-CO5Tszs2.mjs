import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as useAuth } from "./auth-CWdKt_1e.mjs";
import { t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Keyboard } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CO5Tszs2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [name, setName] = (0, import_react.useState)("");
	const { login } = useAuth();
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		if (name.trim()) {
			login(name);
			navigate({ to: "/lessons" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[70vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "w-full max-w-md p-8 sm:p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-8" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-2 text-2xl font-bold tracking-tight text-foreground",
					children: "Welcome to Abhyas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-8 font-hindi text-muted-foreground",
					children: "कृपया अपना नाम दर्ज करें"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Enter Name...",
						autoFocus: true,
						value: name,
						onChange: (e) => setName(e.target.value),
						className: "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-center text-lg font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: !name.trim(),
						className: "w-full rounded-xl px-4 py-3 font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50",
						style: { background: "var(--gradient-primary)" },
						children: "Login"
					})]
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
