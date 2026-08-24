import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { n as SectionTitle } from "./GlassCard-DIxNQspi.mjs";
import { r as lessons } from "./typing-data-D0Th4K6Z.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Award, I as ChartColumn, N as ChevronRight, P as ChevronDown, R as BookOpen, S as Gauge, U as ArrowLeft, b as Keyboard, c as Sparkles, n as X } from "../_libs/lucide-react.mjs";
import { n as categories } from "./lessons-D_j7lGJZ.mjs";
import { t as LessonCard } from "./LessonCard-Cwivbwqd.mjs";
import { t as HindiKeyboard } from "./HindiKeyboard-DGIBPTxP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CIqyEYb6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEGENDS = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"अ",
	"आ",
	"इ",
	"ई",
	"उ",
	"ऊ",
	"ऋ",
	"ए",
	"ऐ",
	"ओ",
	"औ",
	"क",
	"ख",
	"ग",
	"घ",
	"च",
	"छ",
	"ज",
	"झ",
	"ट",
	"ठ",
	"ड",
	"ढ",
	"ण",
	"त",
	"थ",
	"द",
	"ध",
	"न",
	"प",
	"फ",
	"ब",
	"भ",
	"म",
	"य",
	"र",
	"ल",
	"व",
	"श",
	"ष",
	"स",
	"ह",
	"⏎",
	"⇧",
	"␣",
	"⌫"
];
var KEY_COLORS = {
	c1: "linear-gradient(160deg,#2b52ff,#1b3ad1)",
	c2: "linear-gradient(160deg,#ff8a3d,#e06e22)",
	c3: "linear-gradient(160deg,#12b3a6,#0d8a80)",
	c4: "linear-gradient(160deg,#b8863f,#93692c)",
	c5: "linear-gradient(160deg,#e0457b,#b8305f)",
	c6: "linear-gradient(160deg,#8b5cf6,#6d3fd4)"
};
var COLOR_KEYS = Object.keys(KEY_COLORS);
var SCHEMES = [
	"Remington GAIL",
	"Remington CBI",
	"Kruti Dev",
	"Mangal InScript",
	"English"
];
function TypingTestSettings({ onClose }) {
	const [name, setName] = (0, import_react.useState)("");
	const [testTime, setTestTime] = (0, import_react.useState)("1 Minute");
	const [paraMode, setParaMode] = (0, import_react.useState)("Default");
	const [passageType, setPassageType] = (0, import_react.useState)("Random words");
	const [scheme, setScheme] = (0, import_react.useState)("Remington GAIL");
	const [backspace, setBackspace] = (0, import_react.useState)(true);
	const [highlight, setHighlight] = (0, import_react.useState)(true);
	const [wordLimitOn, setWordLimitOn] = (0, import_react.useState)(false);
	const [wordLimit, setWordLimit] = (0, import_react.useState)(35);
	const [status, setStatus] = (0, import_react.useState)("");
	const statusTimer = (0, import_react.useRef)(null);
	const containerRef = (0, import_react.useRef)(null);
	const [dims, setDims] = (0, import_react.useState)({
		w: 1200,
		h: 800
	});
	(0, import_react.useEffect)(() => {
		const el = containerRef.current;
		if (!el) return;
		const update = () => setDims({
			w: el.clientWidth,
			h: el.clientHeight
		});
		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);
	const floatingKeys = (0, import_react.useMemo)(() => {
		let count = 46;
		if (dims.w && dims.w < 1024) count = 24;
		if (dims.w && dims.w < 768) count = 12;
		if (dims.w && dims.w < 480) count = 6;
		const items = [];
		const protectedW = 620;
		const protectedH = 850;
		const minX = dims.w / 2 - protectedW / 2;
		const maxX = dims.w / 2 + protectedW / 2;
		const minY = dims.h / 2 - protectedH / 2;
		const maxY = dims.h / 2 + protectedH / 2;
		for (let i = 0; i < count; i++) {
			const size = 34 + Math.random() * 30;
			const isLeft = i % 2 === 0;
			let top = 0;
			let left = 0;
			let valid = false;
			let attempts = 0;
			while (!valid && attempts < 150) {
				top = Math.random() * dims.h;
				left = Math.random() * dims.w;
				let wrongSide = false;
				if (minX > size && maxX < dims.w - size) {
					if (isLeft && left > minX) wrongSide = true;
					if (!isLeft && left < maxX) wrongSide = true;
				}
				const isInsideX = left + size > minX && left < maxX;
				const isInsideY = top + size > minY && top < maxY;
				const overlapForm = isInsideX && isInsideY;
				let tooClose = false;
				for (const item of items) {
					const dx = item.left - left;
					const dy = item.top - top;
					if (Math.sqrt(dx * dx + dy * dy) < 70) {
						tooClose = true;
						break;
					}
				}
				if (wrongSide || overlapForm || tooClose) attempts++;
				else valid = true;
			}
			if (!valid) if (isLeft) left = Math.random() * Math.max(0, minX - size);
			else left = Math.max(maxX, maxX + Math.random() * Math.max(0, dims.w - maxX - size));
			const rot = (Math.random() * 60 - 30).toFixed(1);
			const colorKey = COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)];
			const r = Math.random();
			const opacity = r > .93 ? .26 : r > .8 ? .5 : .9;
			items.push({
				id: i,
				size,
				top,
				left,
				rot,
				colorKey,
				opacity,
				char: LEGENDS[Math.floor(Math.random() * LEGENDS.length)]
			});
		}
		return items;
	}, [dims.w, dims.h]);
	function flashStatus(msg) {
		setStatus(msg);
		if (statusTimer.current) clearTimeout(statusTimer.current);
		statusTimer.current = setTimeout(() => setStatus(""), 2200);
	}
	function handlePractice() {
		flashStatus(`Practice mode started — ${scheme}`);
	}
	function handleExam() {
		flashStatus(`Exam mode started — ${scheme}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		style: {
			position: "fixed",
			inset: 0,
			zIndex: 50,
			background: "radial-gradient(circle at center, #ffffff 20%, #f1f7fe 70%, #e6f0fa 100%)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			overflow: "hidden",
			padding: 24,
			fontFamily: "'Inter', sans-serif",
			color: "#161a2b",
			boxSizing: "border-box"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        .tts-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .tts-scroll::-webkit-scrollbar {
          display: none;
        }
        .tts-select{
          appearance:none;
          background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><path d="M0 0l5 6 5-6z" fill="%237a7f95"/></svg>');
          background-repeat:no-repeat;
          background-position:right 13px center;
        }
        .tts-input::placeholder{ color:#b7bacb; font-weight:400; }
        .tts-input:focus{ border-color:#7a94ff !important; box-shadow:0 0 0 3px rgba(122,148,255,0.15), 0 2px 6px rgba(22, 26, 43, 0.04) !important; }
        .tts-seg-btn{ transition:.15s ease; }
        .tts-chip{ transition: all .12s ease; }
        .tts-chip:not(.tts-chip-active):hover{ background: #ffffff !important; border-color: rgba(22, 26, 43, 0.15) !important; }
        .tts-chip:active { transform: translateY(3px) !important; box-shadow: 0 0 0 transparent !important; }
        .tts-primary { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .tts-primary:hover { background: #0d0f1c !important; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(22, 26, 43, 0.2), 0 2px 4px rgba(22, 26, 43, 0.1) !important; }
        .tts-primary:active { transform: translateY(1px); box-shadow: 0 2px 4px rgba(22, 26, 43, 0.15) !important; }
        .tts-outline { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .tts-outline:hover { background: #fafafa !important; border-color: rgba(22, 26, 43, 0.2) !important; color: #161a2b !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(22, 26, 43, 0.06) !important; }
        .tts-outline:active { transform: translateY(1px); box-shadow: 0 1px 2px rgba(22, 26, 43, 0.03) !important; }
        .tts-back-btn { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .tts-back-btn:hover {
          background: #ffffff !important;
          border-color: rgba(22, 26, 43, 0.15) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(22, 26, 43, 0.08) !important;
        }
        .tts-back-btn:active {
          transform: translateY(1px);
          box-shadow: 0 1px 2px rgba(22, 26, 43, 0.04) !important;
        }
        .tts-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(22, 26, 43, 0.06);
          gap: 14px;
          flex-wrap: wrap;
        }
        .tts-label {
          font-size: 13px;
          font-weight: 600;
          color: #2a2f45;
          letter-spacing: .01em;
        }
        .tts-input-main {
          width: 190px;
          text-align: right;
        }
        .tts-word-limit {
          width: 70px;
        }
        @media (max-width: 480px) {
          .tts-input-main {
            width: 100% !important;
            text-align: left !important;
          }
          .tts-row {
            padding: 10px 0 !important;
          }
        }
      ` }),
			onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: onClose,
				style: {
					position: "absolute",
					top: 24,
					left: 24,
					zIndex: 60,
					display: "flex",
					alignItems: "center",
					gap: 6,
					padding: "8px 16px 8px 14px",
					background: "rgba(255,255,255,0.7)",
					backdropFilter: "blur(8px)",
					WebkitBackdropFilter: "blur(8px)",
					border: "1px solid rgba(22, 26, 43, 0.08)",
					borderRadius: 100,
					color: "#161a2b",
					fontFamily: "'Inter', sans-serif",
					fontWeight: 600,
					fontSize: 13.5,
					letterSpacing: ".01em",
					cursor: "pointer",
					boxShadow: "0 2px 10px rgba(22, 26, 43, 0.03)"
				},
				className: "tts-back-btn",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), "Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					inset: 0,
					zIndex: 1,
					pointerEvents: "none"
				},
				children: floatingKeys.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						position: "absolute",
						top: k.top,
						left: k.left,
						width: k.size,
						height: k.size,
						fontSize: k.size * .4,
						transform: `rotate(${k.rot}deg)`,
						borderRadius: 9,
						opacity: k.opacity,
						boxShadow: "0 5px 0 rgba(0,0,0,.16)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontFamily: "'JetBrains Mono', monospace",
						fontWeight: 700,
						color: "rgba(255,255,255,.92)",
						background: KEY_COLORS[k.colorKey]
					},
					children: k.char
				}, k.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				position: "absolute",
				inset: 0,
				zIndex: 2,
				pointerEvents: "none",
				background: "radial-gradient(circle at 50% 55%, transparent 0%, transparent 26%, rgba(255,255,255,.3) 54%, rgba(255,255,255,.66) 78%)"
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "tts-scroll",
				style: {
					position: "relative",
					zIndex: 10,
					width: "100%",
					maxWidth: 460,
					background: "transparent",
					padding: "20px 24px 16px",
					maxHeight: "92vh",
					overflowY: "auto",
					boxSizing: "border-box"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						style: {
							fontFamily: "'Fraunces', serif",
							fontWeight: 700,
							fontSize: 28,
							textAlign: "center",
							margin: "0 0 2px",
							letterSpacing: "-.02em",
							lineHeight: 1.1,
							color: "#161a2b"
						},
						children: "Typing Test"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							textAlign: "center",
							color: "#828899",
							fontSize: 13,
							margin: "0 0 16px",
							letterSpacing: ".02em"
						},
						children: "Choose your layout & configure the session"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							className: "tts-input tts-input-main",
							placeholder: "Enter your name",
							value: name,
							onChange: (e) => setName(e.target.value),
							style: inputStyle()
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Test Time",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "tts-input tts-select tts-input-main",
							value: testTime,
							onChange: (e) => setTestTime(e.target.value),
							style: {
								...inputStyle(),
								textAlign: "left",
								cursor: "pointer",
								paddingRight: 30
							},
							children: [
								"1 Minute",
								"3 Minutes",
								"5 Minutes",
								"10 Minutes"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Paragraph Selection",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "tts-input-main",
							style: {
								display: "flex",
								background: "rgba(22, 26, 43, 0.05)",
								borderRadius: 9,
								padding: 3,
								height: 34,
								boxSizing: "border-box"
							},
							children: ["Default", "Custom"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "tts-seg-btn",
								onClick: () => setParaMode(v),
								style: {
									flex: 1,
									border: "none",
									background: paraMode === v ? "#161a2b" : "transparent",
									color: paraMode === v ? "#f2e6cd" : "#5a5e73",
									padding: 0,
									borderRadius: 7,
									fontSize: 12.5,
									fontWeight: 600,
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									height: "100%"
								},
								children: v
							}, v))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Paragraph Passages",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "tts-input tts-select tts-input-main",
							value: passageType,
							onChange: (e) => setPassageType(e.target.value),
							style: {
								...inputStyle(),
								textAlign: "left",
								cursor: "pointer",
								paddingRight: 30
							},
							children: [
								"Random words",
								"Common sentences",
								"News excerpts",
								"Story passages"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 5,
							padding: "10px 0 10px",
							borderBottom: "1px solid rgba(22, 26, 43, 0.06)"
						},
						children: SCHEMES.map((s) => {
							const active = scheme === s;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: `tts-chip ${active ? "tts-chip-active" : ""}`,
								onClick: () => setScheme(s),
								style: {
									gridColumn: s === "English" ? "1 / -1" : "auto",
									border: `1.5px solid ${active ? "#b8863f" : "rgba(22, 26, 43, 0.08)"}`,
									background: active ? "#161a2b" : "#fafafa",
									borderRadius: 10,
									padding: 0,
									height: 36,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontFamily: "'JetBrains Mono', monospace",
									fontSize: 12,
									fontWeight: 700,
									letterSpacing: ".01em",
									color: active ? "#f2e6cd" : "#5a5e73",
									cursor: "pointer",
									boxShadow: active ? "inset 0 3px 6px rgba(0,0,0,0.5)" : "0 3px 0 rgba(22, 26, 43, 0.06)",
									transform: active ? "translateY(3px)" : "none",
									boxSizing: "border-box"
								},
								children: s
							}, s);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Backspace:",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: backspace,
							onChange: setBackspace
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Highlight & Auto Scroll:",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: highlight,
							onChange: setHighlight
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Word Limit (",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontFamily: "'JetBrains Mono', monospace",
									color: "#93692c",
									fontWeight: 700
								},
								children: wordLimit || 0
							}),
							"):"
						] }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 10
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								checked: wordLimitOn,
								onChange: setWordLimitOn
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								className: "tts-input tts-word-limit",
								value: wordLimit,
								disabled: !wordLimitOn,
								onChange: (e) => setWordLimit(e.target.value),
								style: {
									...inputStyle(!wordLimitOn),
									textAlign: "center",
									fontFamily: "'JetBrains Mono', monospace"
								}
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "tts-primary",
						onClick: handlePractice,
						style: {
							width: "100%",
							height: 46,
							border: "none",
							borderRadius: 11,
							marginTop: 16,
							background: "#161a2b",
							color: "#f2e6cd",
							fontFamily: "'Fraunces', serif",
							fontWeight: 600,
							fontSize: 16,
							letterSpacing: ".01em",
							cursor: "pointer",
							boxShadow: "0 4px 12px rgba(22, 26, 43, 0.15), 0 2px 4px rgba(22, 26, 43, 0.1)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: "Start Practice Mode"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "tts-outline",
						onClick: handleExam,
						style: {
							width: "100%",
							height: 46,
							border: "1px solid rgba(22, 26, 43, 0.12)",
							borderRadius: 11,
							marginTop: 10,
							background: "#ffffff",
							color: "#5a5e73",
							fontFamily: "'Fraunces', serif",
							fontWeight: 600,
							fontSize: 15,
							cursor: "pointer",
							boxShadow: "0 2px 6px rgba(22, 26, 43, 0.04)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: "Start Exam Mode"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							textAlign: "center",
							fontSize: 12,
							color: "#3f7d5c",
							marginTop: 10,
							height: 14,
							opacity: status ? 1 : 0,
							transition: ".2s ease",
							fontWeight: 600,
							letterSpacing: ".02em"
						},
						children: status
					})
				]
			})
		]
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tts-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "tts-label",
			children: label
		}), children]
	});
}
function Switch({ checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		style: {
			position: "relative",
			width: 44,
			height: 25,
			flexShrink: 0,
			display: "inline-block"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked,
			onChange: (e) => onChange(e.target.checked),
			style: {
				opacity: 0,
				width: 0,
				height: 0
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				position: "absolute",
				cursor: "pointer",
				inset: 0,
				background: checked ? "#b8863f" : "rgba(22, 26, 43, 0.12)",
				borderRadius: 20,
				transition: ".2s"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: {
				content: "''",
				position: "absolute",
				height: 19,
				width: 19,
				left: checked ? 22 : 3,
				top: 3,
				background: "#fff",
				borderRadius: "50%",
				transition: ".2s",
				boxShadow: "0 1px 3px rgba(0,0,0,.3)",
				display: "block"
			} })
		})]
	});
}
function inputStyle(disabled = false) {
	return {
		border: `1px solid ${disabled ? "rgba(22, 26, 43, 0.05)" : "rgba(22, 26, 43, 0.12)"}`,
		borderRadius: 9,
		padding: "0 10px",
		height: 34,
		background: disabled ? "rgba(255,255,255,0.4)" : "#ffffff",
		fontSize: 13,
		fontFamily: "'Inter', sans-serif",
		color: disabled ? "#a1a6b8" : "#161a2b",
		outline: "none",
		boxSizing: "border-box",
		boxShadow: disabled ? "none" : "0 2px 6px rgba(22, 26, 43, 0.03)",
		transition: "all 0.2s ease"
	};
}
var features = [
	{
		icon: Keyboard,
		title: "Remington Keyboard",
		text: "एनिमेटेड वर्चुअल कीबोर्ड और उंगली मार्गदर्शन के साथ सही तकनीक सीखें।",
		bg: "linear-gradient(135deg, #2563eb, #3b82f6)",
		to: "/practice"
	},
	{
		icon: Gauge,
		title: "Live WPM",
		text: "हर कीस्ट्रोक पर गति, शुद्धता और त्रुटियाँ रीयल-टाइम में देखें।",
		bg: "linear-gradient(135deg, #16a34a, #22c55e)",
		to: "/practice"
	},
	{
		icon: ChartColumn,
		title: "Progress Analytics",
		text: "साप्ताहिक चार्ट, स्ट्रीक और अभ्यास समय एक ही डैशबोर्ड पर।",
		bg: "linear-gradient(135deg, #ea580c, #f97316)",
		to: "/dashboard"
	},
	{
		icon: Award,
		title: "Achievements",
		text: "बैज और लीडरबोर्ड आपको हर दिन अभ्यास के लिए प्रेरित करते हैं।",
		bg: "linear-gradient(135deg, #ca8a04, #eab308)",
		to: "/profile"
	}
];
function Index() {
	const { currentUser } = useAuth();
	const [progressData, setProgressData] = (0, import_react.useState)({});
	const [isTutorModalOpen, setIsTutorModalOpen] = (0, import_react.useState)(false);
	const [isTestSettingsOpen, setIsTestSettingsOpen] = (0, import_react.useState)(false);
	const [activeLang, setActiveLang] = (0, import_react.useState)("Hindi");
	const [isHindiExpanded, setIsHindiExpanded] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!currentUser) return;
		const loadData = () => {
			const data = {};
			for (const l of lessons) {
				const saved = localStorage.getItem(`lesson_state_${currentUser}_${l.slug}`);
				if (saved) try {
					data[l.slug] = JSON.parse(saved);
				} catch (e) {}
			}
			setProgressData(data);
		};
		loadData();
		window.addEventListener("lessonProgressUpdated", loadData);
		return () => window.removeEventListener("lessonProgressUpdated", loadData);
	}, [currentUser]);
	const displayLessons = (0, import_react.useMemo)(() => {
		let previousLessonCompleted = true;
		return lessons.slice(0, 6).map((baseItem) => {
			const saved = progressData[baseItem.slug] || {
				progress: 0,
				completed: false
			};
			const isLocked = !previousLessonCompleted;
			const item = {
				...baseItem,
				icon: BookOpen,
				path: "/practice",
				search: { lesson: baseItem.slug },
				progress: saved.progress || 0,
				isCompleted: saved.completed || false,
				isLocked
			};
			previousLessonCompleted = item.isCompleted;
			return item;
		});
	}, [progressData]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-wrap items-center justify-between gap-10 lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-[1_1_min(100%,500px)] lg:max-w-[55%] flex flex-col gap-6 lg:gap-8 relative z-10 pt-4 lg:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "en inline-flex items-center gap-2 rounded-full bg-secondary/80 border border-border/40 px-4 py-1.5 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold tracking-wide text-primary uppercase w-fit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Premium Hindi typing trainer"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 py-1 pl-1 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.25] font-extrabold tracking-tight text-foreground",
							children: ["हिंदी टाइपिंग सीखें,", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient block mt-1",
								children: "तेज़ी और शुद्धता के साथ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl font-hindi text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-muted-foreground",
							children: "संरचित पाठ, परीक्षा-स्तरीय अभ्यास और रीयल-टाइम विश्लेषण — सब कुछ एक सुंदर, सहज इंटरफ़ेस में।"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/practice",
								className: "btn-primary inline-flex justify-center items-center w-full sm:w-auto",
								children: "अभ्यास शुरू करें"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lessons",
								className: "inline-flex justify-center items-center rounded-full border border-border bg-card/80 px-6 py-3.5 sm:py-3 text-[clamp(0.875rem,2vw,0.875rem)] sm:text-[1rem] font-semibold text-foreground transition-colors hover:bg-card",
								children: "पाठ देखें"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 grid max-w-lg grid-cols-3 gap-3 sm:gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lessons",
								className: "col-span-2 grid grid-cols-2 gap-3 sm:gap-4 group cursor-pointer hover:-translate-y-0.5 transition-transform duration-200",
								children: [{
									k: `${lessons.length}+`,
									v: "Lessons"
								}, {
									k: `${categories.length}+`,
									v: "Lesson Tracks"
								}].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white/90 backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-[0_6px_18px_rgba(30,80,140,0.08)] rounded-[20px] px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1 transition-colors duration-200 group-hover:bg-primary/5 group-hover:border-primary/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none",
										children: s.k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance",
										children: s.v
									})]
								}, s.v))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/90 backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-[0_6px_18px_rgba(30,80,140,0.08)] rounded-[20px] px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none",
									children: "100%"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance",
									children: "Free to use"
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-[1_1_min(100%,350px)] lg:max-w-[42%]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-float-soft p-4 sm:p-[24px] rounded-[20px] bg-white/80 dark:bg-[linear-gradient(145deg,#162943,#102139)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.85)] dark:border-[rgba(80,130,220,0.28)] shadow-[0_8px_32px_rgba(30,80,140,0.12)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.18)] flex flex-col gap-3 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 -mt-10 -mr-10 size-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "en text-[clamp(0.7rem,1.5vw,0.75rem)] font-bold tracking-widest text-muted-foreground dark:text-[#71839B] uppercase mb-1 px-1",
								children: "Explore"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group relative flex flex-col rounded-[20px] p-5 bg-white dark:bg-slate-800 border border-primary/30 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 relative z-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-[#0D203A] dark:text-[#3B82F6]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[26px]",
												children: "⌨️"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 flex flex-col justify-center min-h-[56px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "en font-bold text-slate-900 dark:text-[#F4F7FB] text-[20px] leading-tight",
												children: "Typing Tutor"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "en text-[13px] text-slate-500 dark:text-[#71839B] font-medium mt-0.5",
												children: "5 layouts available"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 relative z-10 flex flex-col",
										onClick: (e) => e.stopPropagation(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex bg-[#f1f5f9] dark:bg-[rgba(8,20,38,0.45)] p-1.5 rounded-[16px] border border-slate-200/50 dark:border-[rgba(255,255,255,0.06)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												onClick: () => {
													setActiveLang("Hindi");
													setIsHindiExpanded((prev) => !prev);
												},
												className: `flex-1 flex items-center justify-center h-[44px] rounded-[12px] text-[13px] font-bold cursor-pointer transition-all ${activeLang === "Hindi" ? "bg-white dark:bg-[#334762] text-slate-900 dark:text-[#FFFFFF] shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-[#91A2B8] dark:hover:bg-[rgba(255,255,255,0.05)] font-medium"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: ["Hindi", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-3.5 opacity-80 transition-transform duration-300 ${isHindiExpanded ? "rotate-180" : ""}` })]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												onClick: () => {
													setActiveLang("English");
													setIsHindiExpanded(false);
												},
												className: `flex-1 flex items-center justify-center h-[44px] rounded-[12px] text-[13px] font-bold cursor-pointer transition-all ${activeLang === "English" ? "bg-white dark:bg-[#334762] text-slate-900 dark:text-[#FFFFFF] shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-[#91A2B8] dark:hover:bg-[rgba(255,255,255,0.05)] font-medium"}`,
												children: "English"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${isHindiExpanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-2 gap-2 bg-[#f1f5f9] dark:bg-transparent p-3 rounded-[16px] border border-slate-200/50 dark:border-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
															to: "/lessons",
															className: "flex items-center justify-center text-center h-[54px] px-2 rounded-[12px] text-[13px] leading-tight font-bold bg-[#2563eb] dark:bg-[#2B6FFF] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)] dark:shadow-[0_8px_20px_rgba(43,111,255,0.22)] transition-all cursor-pointer hover:opacity-90",
															children: "Remington GAIL"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex items-center justify-center text-center h-[54px] px-2 rounded-[12px] text-[13px] leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer",
															children: "Remington CBI"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex items-center justify-center text-center h-[54px] px-2 rounded-[12px] text-[13px] leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer",
															children: "Kruti Dev"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex items-center justify-center text-center h-[54px] px-2 rounded-[12px] text-[13px] leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer",
															children: "Mangal InScript"
														})
													]
												})
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => setIsTestSettingsOpen(true),
									className: "group relative flex flex-col rounded-[18px] p-4 bg-white/70 dark:bg-[#111F35] border border-slate-200 shadow-[0_4px_12px_rgba(30,80,140,0.06)] dark:border-[rgba(255,255,255,0.10)] transition-all duration-300 hover:bg-white/90 dark:hover:bg-[#1C304D] hover:shadow-[0_6px_16px_rgba(30,80,140,0.1)] hover:-translate-y-1 cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-[#172943] text-slate-400 transition-colors group-hover:bg-[#2563eb] group-hover:text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[12px] leading-none",
												children: "→"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-[#172943] text-slate-600 dark:text-[#F4F7FB] mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[20px]",
												children: "⚡"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "en font-bold text-slate-800 dark:text-[#F4F7FB] text-[15px] leading-tight",
											children: "Typing Test"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "en text-[12px] text-slate-600 dark:text-[#A9B8CC] font-medium mt-1",
											children: "Speed & Accuracy"
										})] })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/translator",
									className: "group relative flex flex-col rounded-[18px] p-4 bg-white/70 dark:bg-[#111F35] border border-slate-200 shadow-[0_4px_12px_rgba(30,80,140,0.06)] dark:border-[rgba(255,255,255,0.10)] transition-all duration-300 hover:bg-white/90 dark:hover:bg-[#1C304D] hover:shadow-[0_6px_16px_rgba(30,80,140,0.1)] hover:-translate-y-1 cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-4 right-4 flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-[#172943] text-slate-400 transition-colors group-hover:bg-[#2563eb] group-hover:text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[12px] leading-none",
												children: "→"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-[#172943] text-slate-600 dark:text-[#F4F7FB] mb-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[20px]",
												children: "🌐"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "en font-bold text-slate-800 dark:text-[#F4F7FB] text-[15px] leading-tight",
											children: "Translator"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "en text-[12px] text-slate-600 dark:text-[#A9B8CC] font-medium mt-1",
											children: "Hindi ↔ English"
										})] })
									]
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-[32px] animate-rise-in",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "en block text-[#2563eb] font-bold text-[12px] tracking-[1px] uppercase mb-2",
						children: "Why Abhyas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "en text-[30px] font-extrabold text-foreground leading-tight",
						children: "A learning experience built for Hindi typists"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[14.5px] text-[#64748b] max-w-2xl font-hindi leading-relaxed",
						children: "हर सुविधा आपकी गति और आत्मविश्वास बढ़ाने के लिए डिज़ाइन की गई है।"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-[20px] grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
				children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: f.to,
					className: "group block bg-[#ffffff] border border-[#e6ebf2] rounded-[16px] px-[22px] py-[26px] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(20,30,60,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 animate-rise-in cursor-pointer",
					style: { animationDelay: `${i * 60}ms` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex w-[46px] h-[46px] items-center justify-center rounded-[12px] mb-[16px] transition-transform duration-200 group-hover:scale-110",
							style: { background: f.bg },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "w-[20px] h-[20px] text-white" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "en text-[16px] font-bold text-foreground dark:text-[#0f172a] mb-[6px]",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-hindi text-[13px] text-[#64748b] dark:text-[#64748b] leading-[1.6]",
							children: f.text
						})
					]
				}, f.title))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Curriculum",
					title: "Six structured lesson tracks",
					subtitle: "होम रो से लेकर परीक्षा अभ्यास तक — क्रमबद्ध रूप से आगे बढ़ें।"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lessons",
					className: "group mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground shrink-0",
					children: ["More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "transition-transform group-hover:translate-x-0.5",
						children: "→"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
				children: displayLessons.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonCard, { item: l }, l.slug))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Virtual keyboard",
				title: "Hindi Remington layout with finger guidance",
				subtitle: "हर अक्षर के लिए सही उंगली और शिफ्ट संकेत।"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HindiKeyboard, { nextChar: "क" })
			})] }),
			isTestSettingsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingTestSettings, { onClose: () => setIsTestSettingsOpen(false) }),
			isTutorModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md",
				style: { animation: "fadeIn 200ms ease-out" },
				onClick: (e) => {
					if (e.target === e.currentTarget) setIsTutorModalOpen(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-[460px] rounded-[24px] bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.75)] shadow-[0_24px_48px_rgba(30,80,140,0.12),0_0_40px_rgba(56,189,248,0.15)] p-6 sm:p-7",
					style: { animation: "scaleIn 200ms ease-out" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
            ` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsTutorModalOpen(false),
							className: "absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-800 hover:bg-white/40 rounded-full transition-colors focus:outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "en text-[22px] font-extrabold text-slate-800 mb-5 px-1 tracking-tight",
							children: "Choose Typing Tutor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/lessons",
								onClick: () => setIsTutorModalOpen(false),
								className: "group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[18px] bg-white/50 border border-white/80 shadow-sm hover:shadow-md hover:bg-white/80 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative overflow-hidden gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 flex flex-col",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "en font-bold text-slate-900 text-[15px] sm:text-[16px]",
											children: "Hindi Typing — Remington GAIL"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "en text-[13px] text-slate-600 mt-0.5 font-medium",
											children: "Hindi Remington GAIL typing practice"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 flex items-center justify-between sm:justify-end gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "en text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-widest",
											children: "Available"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-primary transition-transform group-hover:translate-x-1 hidden sm:block" })]
									})
								]
							}), [
								{
									title: "Hindi Typing — Remington CBI",
									sub: "Hindi Remington CBI typing practice"
								},
								{
									title: "Hindi Typing — KrutiDev",
									sub: "KrutiDev typing practice"
								},
								{
									title: "Hindi Typing — Mangal Inscript",
									sub: "Mangal Inscript typing practice"
								},
								{
									title: "English Typing Tutor",
									sub: "English typing practice"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-[18px] bg-white/20 border border-white/30 cursor-not-allowed gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col opacity-75",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "en font-bold text-slate-700 text-[15px] sm:text-[16px]",
										children: item.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "en text-[13px] text-slate-600 mt-0.5 font-medium",
										children: item.sub
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "en text-[10px] font-bold text-slate-600 bg-white/40 px-2.5 py-1 rounded-full uppercase tracking-widest",
										children: "Coming Soon"
									})
								})]
							}, item.title))]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
