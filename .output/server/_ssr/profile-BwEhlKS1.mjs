import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useAuth } from "./auth-CcoBRp2W.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as SectionTitle, t as GlassCard } from "./GlassCard-DIxNQspi.mjs";
import { t as StatCard } from "./StatCard-Cac9fzfv.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Flame, F as Check, L as CalendarDays, N as ChevronRight, O as Clock, S as Gauge, b as Keyboard, l as SlidersHorizontal, m as Pencil, n as X, o as Target, r as Trophy, t as Zap, u as Share2, z as Bell } from "../_libs/lucide-react.mjs";
import { n as calculateXP, t as XP_PER_LEVEL } from "./scoring-C2r0ix1P.mjs";
import { t as HindiKeyboard } from "./HindiKeyboard-DGIBPTxP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BwEhlKS1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { currentUser, isLoaded, updateProfileName, logout } = useAuth();
	const navigate = useNavigate();
	const [history, setHistory] = (0, import_react.useState)([]);
	const [isEditModalOpen, setIsEditModalOpen] = (0, import_react.useState)(false);
	const [newUserName, setNewUserName] = (0, import_react.useState)("");
	const [isCopied, setIsCopied] = (0, import_react.useState)(false);
	const [isKeyboardModalOpen, setIsKeyboardModalOpen] = (0, import_react.useState)(false);
	const presetOptions = [
		"Classic Glass",
		"Classic",
		"Dark Pro",
		"Minimal",
		"High Contrast",
		"Focus",
		"Color Zones",
		"Soft Pastel"
	];
	const [temporaryPreset, setTemporaryPreset] = (0, import_react.useState)("Color Zones");
	const openKeyboardModal = () => {
		let savedPreset = localStorage.getItem("settings_keyboard_preset");
		if (savedPreset === "Default") {
			savedPreset = "Classic Glass";
			localStorage.setItem("settings_keyboard_preset", "Classic Glass");
		}
		setTemporaryPreset(savedPreset || "Color Zones");
		setIsKeyboardModalOpen(true);
	};
	const handleApplyPreset = () => {
		localStorage.setItem("settings_keyboard_preset", temporaryPreset);
		window.dispatchEvent(new Event("keyboardPresetUpdated"));
		setIsKeyboardModalOpen(false);
	};
	(0, import_react.useEffect)(() => {
		if (isLoaded && !currentUser) {
			navigate({ to: "/login" });
			return;
		}
		if (currentUser) {
			setNewUserName(currentUser);
			const stored = localStorage.getItem("results_" + currentUser);
			if (stored) try {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed)) setHistory(parsed);
				else setHistory([]);
			} catch (e) {
				console.error("Failed to parse results");
				setHistory([]);
			}
			else setHistory([]);
		}
	}, [
		currentUser,
		isLoaded,
		navigate
	]);
	const userName = currentUser || "Guest";
	const userInitial = userName.trim() ? (userName.trim()[0] || "G").toUpperCase() : "G";
	const validHistory = (0, import_react.useMemo)(() => {
		if (!Array.isArray(history)) return [];
		return history.filter((h) => {
			if (!h || typeof h !== "object") return false;
			if (h.isBonus) return true;
			const w = parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0;
			const a = parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0;
			return w > 0 && w < 250 && a > 0 && a <= 100;
		});
	}, [history]);
	const bestWpm = (0, import_react.useMemo)(() => {
		return validHistory.length > 0 ? Math.max(...validHistory.map((h) => parseInt(String(h?.wpm ?? 0).replace(" WPM", "")) || 0)) : 0;
	}, [validHistory]);
	const bestAcc = (0, import_react.useMemo)(() => {
		return validHistory.length > 0 ? Math.max(...validHistory.map((h) => parseInt(String(h?.accuracy || h?.acc || "0").replace("%", "")) || 0)) : 0;
	}, [validHistory]);
	const uniqueDates = (0, import_react.useMemo)(() => {
		return Array.from(new Set(validHistory.map((h) => h && h.date).filter((d) => Boolean(d))));
	}, [validHistory]);
	const streak = (0, import_react.useMemo)(() => {
		if (uniqueDates.length === 0) return 0;
		let count = 0;
		const curr = /* @__PURE__ */ new Date();
		for (let i = 0; i < 60; i++) {
			const dStr = `${curr.getDate()} ${curr.toLocaleString("default", { month: "short" })}`;
			if (uniqueDates.includes(dStr)) count++;
			else if (i !== 0) break;
			curr.setDate(curr.getDate() - 1);
		}
		return count > 0 ? count : uniqueDates.length > 0 ? 1 : 0;
	}, [uniqueDates]);
	const totalSeconds = (0, import_react.useMemo)(() => {
		return validHistory.reduce((sum, h) => {
			return sum + (typeof h?.elapsedSeconds === "number" && !isNaN(h.elapsedSeconds) ? h.elapsedSeconds : 0);
		}, 0);
	}, [validHistory]);
	const practiceHours = Math.floor(totalSeconds / 3600);
	const practiceMins = Math.floor(totalSeconds % 3600 / 60);
	const practiceTimeStr = totalSeconds > 0 ? practiceHours > 0 ? `${practiceHours}h ${practiceMins}m` : `${practiceMins}m` : "0m";
	const totalXp = (0, import_react.useMemo)(() => {
		if (!Array.isArray(validHistory)) return 0;
		return validHistory.reduce((sum, h) => {
			if (typeof h?.xp === "number" && !isNaN(h.xp)) return sum + h.xp;
			const w = parseInt(String(h?.wpm ?? 0).replace(" WPM", "")) || 0;
			const a = parseInt(String(h?.accuracy || h?.acc || "0").replace("%", "")) || 0;
			const errs = typeof h?.errors === "number" ? h.errors : 0;
			return sum + calculateXP(w, a, errs);
		}, 0);
	}, [validHistory]);
	const completedSlugs = (0, import_react.useMemo)(() => {
		return new Set(validHistory.map((h) => h.lessonSlug).filter((s) => Boolean(s)));
	}, [validHistory]);
	const examCompleted = completedSlugs.has("ch25") || completedSlugs.has("ch28") ? 1 : 0;
	const badges = (0, import_react.useMemo)(() => [
		{
			icon: Flame,
			title: "7 दिन स्ट्रीक",
			desc: "लगातार सात दिन अभ्यास",
			earned: streak >= 7,
			currentVal: Math.min(7, streak),
			maxVal: 7,
			unit: "days"
		},
		{
			icon: Zap,
			title: "50 WPM क्लब",
			desc: "50 शब्द प्रति मिनट पार",
			earned: bestWpm >= 50,
			currentVal: Math.min(50, bestWpm),
			maxVal: 50,
			unit: "WPM"
		},
		{
			icon: Target,
			title: "शुद्धता मास्टर",
			desc: "98% शुद्धता प्राप्त",
			earned: bestAcc >= 98,
			currentVal: Math.min(98, bestAcc),
			maxVal: 98,
			unit: "%"
		},
		{
			icon: Trophy,
			title: "परीक्षा तैयार",
			desc: "परीक्षा पाठ पूर्ण करें",
			earned: examCompleted === 1,
			currentVal: examCompleted,
			maxVal: 1,
			unit: "exam"
		}
	], [
		streak,
		bestWpm,
		bestAcc,
		examCompleted
	]);
	const unlockedCount = (0, import_react.useMemo)(() => badges.filter((b) => b.earned).length, [badges]);
	const memberSinceData = (0, import_react.useMemo)(() => {
		if (!currentUser) return {
			fullText: "",
			relativeText: ""
		};
		const storageKey = "account_created_" + currentUser;
		let storedDate = localStorage.getItem(storageKey);
		if (!storedDate) {
			storedDate = (/* @__PURE__ */ new Date()).toISOString();
			try {
				localStorage.setItem(storageKey, storedDate);
			} catch (e) {
				console.error("Failed to save account_created date", e);
			}
		}
		let fullText = "";
		let relativeText = "Recently";
		try {
			const d = new Date(storedDate);
			if (!isNaN(d.getTime()) && d.getFullYear() > 2e3) {
				fullText = `Joined ${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
				const diffMs = (/* @__PURE__ */ new Date()).getTime() - d.getTime();
				const diffDays = Math.floor(diffMs / 864e5);
				if (diffMs < 0 || diffDays === 0) relativeText = "Today";
				else if (diffDays === 1) relativeText = "1 day ago";
				else if (diffDays < 365) relativeText = `${diffDays} days ago`;
				else {
					const years = Math.floor(diffDays / 365);
					relativeText = `${years} ${years === 1 ? "year" : "years"} ago`;
				}
			}
		} catch (e) {}
		return {
			fullText,
			relativeText
		};
	}, [currentUser]);
	const handleSaveName = () => {
		const trimmed = newUserName.trim();
		if (trimmed && trimmed !== currentUser) {
			updateProfileName(trimmed);
			setIsEditModalOpen(false);
		}
	};
	const handleShareProgress = async () => {
		const shareText = `⌨️ ${currentUser}'s Hindi Typing Progress:\n⚡ Best WPM: ${bestWpm} WPM\n🎯 Best Accuracy: ${bestAcc}%\n🔥 Streak: ${streak} days\n⚡ XP: ${totalXp.toLocaleString()} XP\nCheck out Hindi Typing Abhyas Studio!`;
		if (navigator.share) try {
			await navigator.share({
				title: "My Typing Progress",
				text: shareText
			});
			return;
		} catch (e) {}
		try {
			await navigator.clipboard.writeText(shareText);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2500);
		} catch (e) {}
	};
	if (!isLoaded || !currentUser) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Account",
				title: "Your profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				className: "p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-5 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-20 sm:size-[88px] items-center justify-center rounded-3xl font-bold text-3xl sm:text-4xl text-primary-foreground uppercase shadow-md border-2 border-white/60",
								style: { background: "var(--gradient-primary)" },
								children: userInitial
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -bottom-1 -right-1 size-5 rounded-full bg-success border-2 border-white shadow-xs",
								title: "Account Active"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-hindi text-2xl sm:text-3xl font-bold text-foreground truncate leading-tight",
										children: currentUser
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider",
										children: "Local Typist"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 text-[11px] font-semibold text-success bg-success/10 border border-success/20 px-2.5 py-0.5 rounded-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-success animate-pulse" }), "Account Active"]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-stretch gap-2.5 sm:gap-3 text-xs font-medium text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col justify-center gap-1.5 bg-secondary/30 border border-border/40 p-3 rounded-2xl min-w-[200px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[11px] font-[800] px-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5 text-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-indigo-500 fill-indigo-500/20" }),
													"Level ",
													Math.min(50, Math.floor(totalXp / XP_PER_LEVEL) + 1)
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground tracking-wider uppercase",
												children: Math.min(50, Math.floor(totalXp / 1e3) + 1) >= 50 ? `${totalXp.toLocaleString()} XP` : `${totalXp.toLocaleString()} / ${(Math.floor(totalXp / XP_PER_LEVEL) * XP_PER_LEVEL + XP_PER_LEVEL).toLocaleString()} XP`
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-[9px] w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden border border-black/5 dark:border-white/5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full transition-all duration-1000 ease-out",
												style: { width: Math.min(50, Math.floor(totalXp / 1e3) + 1) >= 50 ? "100%" : `${totalXp % XP_PER_LEVEL / XP_PER_LEVEL * 100}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] font-bold text-center text-muted-foreground mt-0.5",
											children: Math.min(50, Math.floor(totalXp / 1e3) + 1) >= 50 ? "Maximum Level" : `${Math.floor(totalXp / XP_PER_LEVEL) * XP_PER_LEVEL + XP_PER_LEVEL - totalXp} XP to next milestone`
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative inline-flex items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 bg-secondary/40 border border-border/40 px-3 py-1 rounded-xl cursor-default transition-colors hover:bg-secondary/60",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: memberSinceData.fullText })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 hidden sm:block z-50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-lg bg-foreground/90 text-background px-2.5 py-1 text-[11px] font-semibold shadow-md whitespace-nowrap backdrop-blur-xs",
											children: memberSinceData.relativeText
										})
									})]
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0 self-start sm:self-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setNewUserName(currentUser);
								setIsEditModalOpen(true);
							},
							className: "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-xs hover:shadow group cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4 transition-transform group-hover:rotate-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit Profile" })]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 pt-4 border-t border-border/50 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 bg-secondary/30 text-xs font-medium text-muted-foreground cursor-default select-none",
							title: "Daily reminders — coming soon",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3.5 text-amber-500" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Notifications" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold bg-muted/80 border border-border/40 px-1.5 py-0 rounded-md ml-0.5",
									children: "Off"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleShareProgress,
							className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 bg-secondary/30 hover:bg-success/10 hover:border-success/30 hover:text-success text-xs font-medium text-muted-foreground transition-all cursor-pointer group",
							title: "Copy your stats to clipboard",
							children: [isCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isCopied ? "Copied!" : "Share Progress" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/settings",
							className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 bg-secondary/30 hover:bg-primary/8 hover:border-primary/30 hover:text-primary text-xs font-medium text-muted-foreground transition-all group",
							title: "Keyboard layout, font size and more",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preferences" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: openKeyboardModal,
							className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border/50 bg-secondary/30 hover:bg-primary/8 hover:border-primary/30 hover:text-primary text-xs font-medium text-muted-foreground transition-all group cursor-pointer",
							title: "Change keyboard appearance",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keyboard" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Gauge,
						label: "Best WPM",
						value: bestWpm,
						suffix: "WPM",
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Target,
						label: "Best accuracy",
						value: bestAcc,
						suffix: "%",
						tone: "success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Flame,
						label: "Longest streak",
						value: streak,
						suffix: "days",
						tone: "danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Clock,
						label: "Practice time",
						value: practiceTimeStr,
						tone: "muted"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between mb-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold text-foreground",
							children: "Achievements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold text-muted-foreground bg-secondary/80 px-2.5 py-0.5 rounded-full border border-border/50 tabular-nums",
							children: [
								unlockedCount,
								"/",
								badges.length,
								" Unlocked"
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: badges.map((b) => {
						const pct = b.maxVal > 0 ? Math.min(100, Math.round(b.currentVal / b.maxVal * 100)) : b.earned ? 100 : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex flex-col justify-between p-4 rounded-2xl border transition-all duration-300 gap-3.5", b.earned ? "bg-primary/5 border-primary/20 shadow-xs hover:border-primary/40" : "bg-secondary/20 border-border/40 opacity-75 hover:opacity-90"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-11 shrink-0 items-center justify-center rounded-2xl shadow-xs", b.earned ? "text-primary-foreground" : "bg-muted/80 text-muted-foreground/60 border border-border/40"),
									style: b.earned ? { background: "var(--gradient-primary)" } : void 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "size-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-1 mb-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-hindi font-semibold text-sm text-foreground truncate",
											children: b.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0", b.earned ? "text-success bg-success/15 border-success/25" : "text-muted-foreground/70 bg-secondary border-border/40"),
											children: b.earned ? "Unlocked" : "Locked"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-hindi text-xs text-muted-foreground leading-tight",
										children: b.desc
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 pt-2 border-t border-border/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-[11px] font-medium text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-foreground tabular-nums",
										children: [
											b.currentVal,
											"/",
											b.maxVal,
											" ",
											b.unit
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-full bg-secondary/80 rounded-full overflow-hidden border border-border/40 p-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("h-full rounded-full transition-all duration-700 ease-out shadow-xs", b.earned ? "bg-success" : "bg-primary/70"),
										style: { width: `${pct}%` }
									})
								})]
							})]
						}, b.title);
					})
				})]
			}),
			isEditModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-3xl bg-background border border-border p-6 shadow-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold text-foreground",
								children: "Edit Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsEditModalOpen(false),
								className: "rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Display Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: newUserName,
								onChange: (e) => setNewUserName(e.target.value),
								className: "w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary",
								placeholder: "Enter new display name",
								autoFocus: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2.5 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsEditModalOpen(false),
								className: "px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary rounded-xl transition-colors cursor-pointer",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSaveName,
								disabled: !newUserName.trim() || newUserName.trim() === currentUser,
								className: "px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-xs cursor-pointer",
								children: "Save Changes"
							})]
						})
					]
				})
			}),
			isKeyboardModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-5xl rounded-3xl bg-background border border-border p-6 sm:p-8 shadow-2xl flex flex-col gap-6 max-h-[95vh] overflow-y-auto custom-scrollbar",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold text-foreground",
								children: "Keyboard Preset"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-1",
								children: "Choose your preferred keyboard style. The preview below updates instantly."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsKeyboardModalOpen(false),
								className: "rounded-full p-2 bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full bg-secondary/20 rounded-2xl p-4 sm:p-8 border border-border/50 flex flex-col items-center justify-center min-h-[350px] shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HindiKeyboard, {
								nextChar: "क",
								preset: temporaryPreset
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-3 pt-2 shrink-0",
							children: presetOptions.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setTemporaryPreset(o),
								"aria-pressed": temporaryPreset === o,
								className: cn("rounded-2xl px-5 py-3 text-sm font-semibold border transition-all duration-200 cursor-pointer", temporaryPreset === o ? "bg-primary text-primary-foreground border-primary shadow-md scale-105" : "bg-secondary/50 text-muted-foreground border-border/60 hover:bg-secondary hover:text-foreground"),
								children: [o, temporaryPreset === o && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "inline-block ml-2 size-4" })]
							}, o))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-3 pt-4 border-t border-border/50 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsKeyboardModalOpen(false),
								className: "px-6 py-2.5 text-sm font-semibold text-muted-foreground hover:bg-secondary rounded-xl transition-colors cursor-pointer",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleApplyPreset,
								className: "px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-xs cursor-pointer",
								children: "Apply Keyboard"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				className: "p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-semibold text-foreground mb-4",
					children: "Account Information"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-0 divide-y divide-border/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "Account status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 border border-success/20 px-2.5 py-0.5 rounded-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-success" }), "Active"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "Account type"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-foreground",
								children: "Local (Offline)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "Total sessions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold text-foreground tabular-nums",
								children: validHistory.length
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-4 pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-foreground",
								children: "Sign out"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Remove your session from this device"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									await logout();
									navigate({ to: "/login" });
								},
								className: "inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-destructive border border-destructive/30 bg-destructive/5 rounded-xl hover:bg-destructive/10 hover:border-destructive/50 transition-all cursor-pointer",
								children: "Sign out"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
				hover: false,
				className: "p-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-border px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold text-foreground",
						children: "Recent activity"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border/60",
					children: validHistory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-muted-foreground",
						children: "No recent activity found. Start typing!"
					}) : validHistory.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-secondary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: "Practice Session"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: h.date
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-6 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-primary tabular-nums",
								children: h.wpm
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-success tabular-nums",
								children: h.acc || h.accuracy
							})]
						})]
					}, i))
				})]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
