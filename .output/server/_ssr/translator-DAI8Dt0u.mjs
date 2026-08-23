import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { D as Copy, H as ArrowRightLeft, a as Trash2, y as Languages } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translator-DAI8Dt0u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TranslatorPage() {
	const [sourceLang, setSourceLang] = (0, import_react.useState)("Hindi");
	const [targetLang, setTargetLang] = (0, import_react.useState)("English");
	const [sourceText, setSourceText] = (0, import_react.useState)("");
	const [targetText, setTargetText] = (0, import_react.useState)("");
	const handleSwap = () => {
		setSourceLang(targetLang);
		setTargetLang(sourceLang);
		setSourceText(targetText);
		setTargetText(sourceText);
	};
	const handleClear = () => {
		setSourceText("");
		setTargetText("");
	};
	const handleCopy = () => {
		if (targetText) navigator.clipboard.writeText(targetText);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-fade-in w-full max-w-5xl mx-auto flex flex-col gap-8 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center sm:items-start gap-2 mb-2 px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "en text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center justify-center sm:justify-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "size-6" })
					}), "Hindi ↔ English Translator"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "en text-[15px] sm:text-base text-slate-600 dark:text-slate-400 font-medium",
					children: "Translate Hindi and English text quickly and easily."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-col bg-white/80 dark:bg-slate-900/60 backdrop-blur-[20px] rounded-[24px] border border-[rgba(255,255,255,0.85)] dark:border-white/10 shadow-[0_8px_32px_rgba(30,80,140,0.08)] p-2 overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 -mt-20 -mr-20 size-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 -mb-20 -ml-20 size-64 bg-cyan-400/10 blur-[80px] rounded-full pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 flex flex-col lg:flex-row min-h-[360px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex flex-col p-4 sm:p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-between mb-4 px-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "en font-bold text-slate-800 dark:text-slate-200 text-lg",
											children: sourceLang
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: sourceText,
										onChange: (e) => setSourceText(e.target.value),
										placeholder: sourceLang === "Hindi" ? "Hindi text yahan type karein..." : "Type English text here...",
										className: "flex-1 w-full resize-none bg-transparent border-0 focus:ring-0 p-1 text-slate-800 dark:text-slate-100 text-[18px] sm:text-[20px] leading-relaxed placeholder:text-slate-400 font-hindi outline-none",
										spellCheck: "false"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-white/5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "en text-[11px] font-bold text-slate-400 uppercase tracking-widest",
											children: [sourceText.length, " characters"]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex lg:flex-col items-center justify-center py-2 lg:py-0 lg:px-2 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-6 lg:inset-x-auto lg:inset-y-6 top-1/2 lg:top-auto lg:left-1/2 w-auto h-px lg:w-px lg:h-auto bg-slate-200 dark:bg-white/10 -z-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleSwap,
									title: "Swap languages",
									className: "flex size-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-sm text-primary hover:text-white hover:bg-primary transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 z-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRightLeft, { className: "size-5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex flex-col p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-[20px] lg:rounded-l-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between mb-4 px-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "en font-bold text-slate-800 dark:text-slate-200 text-lg",
										children: targetLang
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: targetText,
									onChange: (e) => setTargetText(e.target.value),
									placeholder: "Translation will appear here...",
									className: "flex-1 w-full resize-none bg-transparent border-0 focus:ring-0 p-1 text-slate-800 dark:text-slate-100 text-[18px] sm:text-[20px] leading-relaxed placeholder:text-slate-400 font-hindi outline-none",
									spellCheck: "false"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-4 flex-wrap mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleClear,
						className: "flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Clear"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "flex items-center justify-center rounded-full px-12 py-3.5 text-base font-bold text-white shadow-[0_8px_16px_rgba(30,80,140,0.2)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 active:scale-95",
						style: { background: "var(--gradient-primary)" },
						children: "Translate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleCopy,
						className: "flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Copy"]
					})
				]
			})
		]
	});
}
//#endregion
export { TranslatorPage as component };
