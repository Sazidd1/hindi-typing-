import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Flame,
  Gauge,
  Pencil,
  Share2,
  SlidersHorizontal,
  Target,
  Trophy,
  UserCog,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { StatCard } from "@/components/kit/StatCard";
import { useAuth } from "@/lib/auth";
import { calculateXP } from "@/lib/scoring";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Typist Profile — Hindi Typing Abhyas Studio" },
    ],
  }),
  component: ProfilePage,
});

type ResultRecord = {
  date?: string;
  wpm?: string | number;
  acc?: string | number;
  accuracy?: string | number;
  xp?: number;
  errors?: number;
  elapsedSeconds?: number;
  lessonSlug?: string;
};

function ProfilePage() {
  const { currentUser, isLoaded, login, logout } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ResultRecord[]>([]);

  // State for Account & Settings actions
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isLoaded && !currentUser) {
      navigate({ to: "/login" });
      return;
    }
    
    if (currentUser) {
      setNewUserName(currentUser);
      const stored = localStorage.getItem("results_" + currentUser);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setHistory(parsed);
          } else {
            setHistory([]);
          }
        } catch (e) {
          console.error("Failed to parse results");
          setHistory([]);
        }
      } else {
        setHistory([]);
      }
    }
  }, [currentUser, isLoaded, navigate]);

  const userName = currentUser || "Guest";
  const userInitial = userName.trim() ? (userName.trim()[0] || "G").toUpperCase() : "G";

  // Filter valid completed sessions only
  const validHistory = useMemo(() => {
    if (!Array.isArray(history)) return [];
    return history.filter((h) => {
      if (!h || typeof h !== "object") return false;
      const w = parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0;
      const a = parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0;
      return w > 0 && w < 250 && a > 0 && a <= 100;
    });
  }, [history]);

  // 1. Best WPM
  const bestWpm = useMemo(() => {
    return validHistory.length > 0
      ? Math.max(...validHistory.map((h) => parseInt(String(h?.wpm ?? 0).replace(" WPM", "")) || 0))
      : 0;
  }, [validHistory]);

  // 2. Best Accuracy
  const bestAcc = useMemo(() => {
    return validHistory.length > 0
      ? Math.max(...validHistory.map((h) => parseInt(String(h?.accuracy || h?.acc || "0").replace("%", "")) || 0))
      : 0;
  }, [validHistory]);

  // 3. Streak Calculation
  const uniqueDates = useMemo(() => {
    return Array.from(new Set(validHistory.map((h) => h && h.date).filter((d): d is string => Boolean(d))));
  }, [validHistory]);

  const streak = useMemo(() => {
    if (uniqueDates.length === 0) return 0;
    let count = 0;
    const curr = new Date();
    for (let i = 0; i < 60; i++) {
      const dStr = `${curr.getDate()} ${curr.toLocaleString("default", { month: "short" })}`;
      if (uniqueDates.includes(dStr)) {
        count++;
      } else if (i !== 0) {
        break;
      }
      curr.setDate(curr.getDate() - 1);
    }
    return count > 0 ? count : uniqueDates.length > 0 ? 1 : 0;
  }, [uniqueDates]);

  // 4. Practice Time (Actual Elapsed Seconds sum from valid sessions)
  const totalSeconds = useMemo(() => {
    return validHistory.reduce((sum, h) => {
      const sec = typeof h?.elapsedSeconds === "number" && !isNaN(h.elapsedSeconds) ? h.elapsedSeconds : 0;
      return sum + sec;
    }, 0);
  }, [validHistory]);

  const practiceHours = Math.floor(totalSeconds / 3600);
  const practiceMins = Math.floor((totalSeconds % 3600) / 60);
  const practiceTimeStr =
    totalSeconds > 0
      ? practiceHours > 0
        ? `${practiceHours}h ${practiceMins}m`
        : `${practiceMins}m`
      : "0m";

  // Total XP from session history
  const totalXp = useMemo(() => {
    if (!Array.isArray(validHistory)) return 0;
    return validHistory.reduce((sum, h) => {
      if (typeof h?.xp === "number" && !isNaN(h.xp)) {
        return sum + h.xp;
      }
      const w = parseInt(String(h?.wpm ?? 0).replace(" WPM", "")) || 0;
      const a = parseInt(String(h?.accuracy || h?.acc || "0").replace("%", "")) || 0;
      const errs = typeof h?.errors === "number" ? h.errors : 0;
      return sum + calculateXP(w, a, errs);
    }, 0);
  }, [validHistory]);

  // Exam completion detection for achievement
  const completedSlugs = useMemo(() => {
    return new Set(validHistory.map((h) => h.lessonSlug).filter((s): s is string => Boolean(s)));
  }, [validHistory]);

  const examCompleted = completedSlugs.has("ch25") || completedSlugs.has("ch28") ? 1 : 0;

  // 4 Badges with real progress & unlock logic
  const badges = useMemo(() => [
    {
      icon: Flame,
      title: "7 दिन स्ट्रीक",
      desc: "लगातार सात दिन अभ्यास",
      earned: streak >= 7,
      currentVal: Math.min(7, streak),
      maxVal: 7,
      unit: "days",
    },
    {
      icon: Zap,
      title: "50 WPM क्लब",
      desc: "50 शब्द प्रति मिनट पार",
      earned: bestWpm >= 50,
      currentVal: Math.min(50, bestWpm),
      maxVal: 50,
      unit: "WPM",
    },
    {
      icon: Target,
      title: "शुद्धता मास्टर",
      desc: "98% शुद्धता प्राप्त",
      earned: bestAcc >= 98,
      currentVal: Math.min(98, bestAcc),
      maxVal: 98,
      unit: "%",
    },
    {
      icon: Trophy,
      title: "परीक्षा तैयार",
      desc: "परीक्षा पाठ पूर्ण करें",
      earned: examCompleted === 1,
      currentVal: examCompleted,
      maxVal: 1,
      unit: "exam",
    },
  ], [streak, bestWpm, bestAcc, examCompleted]);

  const unlockedCount = useMemo(() => badges.filter((b) => b.earned).length, [badges]);

  // Account creation date resolution with relative time.
  // RULES:
  //  1. Read account_created_<user> from localStorage.
  //  2. If a valid ISO timestamp is found, use it as-is. NEVER overwrite it.
  //  3. If the key is missing (new feature, existing user), write today's ISO timestamp ONCE.
  //     (Session `.date` strings like "9 Aug" are display-only; do NOT use them as ISO dates.)
  //  4. Format for display: "Joined D Mon YYYY". Calculate relative time dynamically.
  const memberSinceData = useMemo(() => {
    if (!currentUser) return { fullText: "", relativeText: "" };
    const storageKey = "account_created_" + currentUser;
    let storedDate = localStorage.getItem(storageKey);

    // Only initialize if the key is completely absent.
    // We write a proper ISO timestamp so it can be parsed correctly.
    if (!storedDate) {
      storedDate = new Date().toISOString();
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
      // Verify the stored string is actually a parseable date with a valid year.
      // Display-format strings like "9 Aug" will parse to the wrong year or Invalid Date.
      if (!isNaN(d.getTime()) && d.getFullYear() > 2000) {
        const day = d.getDate();
        const month = d.toLocaleString("en-US", { month: "short" });
        const year = d.getFullYear();
        fullText = `Joined ${day} ${month} ${year}`;

        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMs < 0 || diffDays === 0) {
          relativeText = "Today";
        } else if (diffDays === 1) {
          relativeText = "1 day ago";
        } else if (diffDays < 365) {
          relativeText = `${diffDays} days ago`;
        } else {
          const years = Math.floor(diffDays / 365);
          relativeText = `${years} ${years === 1 ? "year" : "years"} ago`;
        }
      }
    } catch (e) {}

    return { fullText, relativeText };
  }, [currentUser]);

  const handleSaveName = () => {
    const trimmed = newUserName.trim();
    if (trimmed && trimmed !== currentUser) {
      login(trimmed);
      setIsEditModalOpen(false);
    }
  };

  const handleShareProgress = async () => {
    const shareText = `⌨️ ${currentUser}'s Hindi Typing Progress:\n⚡ Best WPM: ${bestWpm} WPM\n🎯 Best Accuracy: ${bestAcc}%\n🔥 Streak: ${streak} days\n⚡ XP: ${totalXp.toLocaleString()} XP\nCheck out Hindi Typing Abhyas Studio!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Typing Progress",
          text: shareText,
        });
        return;
      } catch (e) {}
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {}
  };

  if (!isLoaded || !currentUser) {
    return null;
  }

  return (
    <div className="space-y-10">
      <SectionTitle eyebrow="Account" title="Your profile" />

      {/* Profile Header */}
      <GlassCard hover={false} className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 min-w-0">
            {/* Avatar */}
            <div className="relative shrink-0">
              <span
                className="flex size-20 sm:size-22 items-center justify-center rounded-3xl font-bold text-3xl sm:text-4xl text-primary-foreground uppercase shadow-md border-2 border-white/60"
                style={{ background: "var(--gradient-primary)" }}
              >
                {userInitial}
              </span>
              <span
                className="absolute -bottom-1 -right-1 size-5 rounded-full bg-success border-2 border-white shadow-xs"
                title="Account Active"
              />
            </div>

            {/* User Identity & Subtitles */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-hindi text-2xl sm:text-3xl font-bold text-foreground truncate leading-tight">
                  {currentUser}
                </h2>
                <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Local Typist
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-success bg-success/10 border border-success/20 px-2.5 py-0.5 rounded-full">
                  <span className="size-1.5 rounded-full bg-success animate-pulse" />
                  Account Active
                </span>
              </div>

              {/* Compact Secondary Metadata (XP & Member Since with Tooltip) */}
              <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5 bg-secondary/60 border border-border/50 px-3 py-1 rounded-xl text-foreground font-semibold">
                  <Zap className="size-4 text-amber-500 fill-amber-500/20" />
                  <span>{totalXp.toLocaleString()} XP</span>
                </div>

                <div className="group relative inline-flex items-center">
                  <div className="flex items-center gap-1.5 bg-secondary/40 border border-border/40 px-3 py-1 rounded-xl cursor-default transition-colors hover:bg-secondary/60">
                    <CalendarDays className="size-4 text-primary" />
                    <span>{memberSinceData.fullText}</span>
                  </div>
                  {/* Desktop Relative Time Tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 hidden sm:block z-50">
                    <div className="rounded-lg bg-foreground/90 text-background px-2.5 py-1 text-[11px] font-semibold shadow-md whitespace-nowrap backdrop-blur-xs">
                      {memberSinceData.relativeText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action: Edit Profile */}
          <div className="shrink-0 pt-2 md:pt-0 border-t border-border/40 md:border-t-0">
            <button
              onClick={() => {
                setNewUserName(currentUser);
                setIsEditModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-4.5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-xs hover:shadow group cursor-pointer"
            >
              <Pencil className="size-4 transition-transform group-hover:rotate-12" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Quick Stats Grid (4 compact cards) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Gauge} label="Best WPM" value={bestWpm} suffix="WPM" tone="primary" />
        <StatCard icon={Target} label="Best accuracy" value={bestAcc} suffix="%" tone="success" />
        <StatCard icon={Flame} label="Longest streak" value={streak} suffix="days" tone="danger" />
        <StatCard icon={Clock} label="Practice time" value={practiceTimeStr} tone="muted" />
      </div>

      {/* Achievements Section */}
      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
            <span className="text-xs font-bold text-muted-foreground bg-secondary/80 px-2.5 py-0.5 rounded-full border border-border/50 tabular-nums">
              {unlockedCount}/{badges.length} Unlocked
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {badges.map((b) => {
            const pct = b.maxVal > 0 ? Math.min(100, Math.round((b.currentVal / b.maxVal) * 100)) : b.earned ? 100 : 0;

            return (
              <div
                key={b.title}
                className={cn(
                  "flex flex-col justify-between p-4 rounded-2xl border transition-all duration-300 gap-3.5",
                  b.earned
                    ? "bg-primary/5 border-primary/20 shadow-xs hover:border-primary/40"
                    : "bg-secondary/20 border-border/40 opacity-75 hover:opacity-90"
                )}
              >
                <div className="flex items-start gap-3.5">
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-2xl shadow-xs",
                      b.earned
                        ? "text-primary-foreground"
                        : "bg-muted/80 text-muted-foreground/60 border border-border/40"
                    )}
                    style={b.earned ? { background: "var(--gradient-primary)" } : undefined}
                  >
                    <b.icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="font-hindi font-semibold text-sm text-foreground truncate">{b.title}</p>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0",
                          b.earned
                            ? "text-success bg-success/15 border-success/25"
                            : "text-muted-foreground/70 bg-secondary border-border/40"
                        )}
                      >
                        {b.earned ? "Unlocked" : "Locked"}
                      </span>
                    </div>
                    <p className="font-hindi text-xs text-muted-foreground leading-tight">{b.desc}</p>
                  </div>
                </div>

                {/* Achievement Progress */}
                <div className="space-y-1.5 pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                    <span>Progress</span>
                    <span className="font-bold text-foreground tabular-nums">
                      {b.currentVal}/{b.maxVal} {b.unit}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary/80 rounded-full overflow-hidden border border-border/40 p-0.5">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700 ease-out shadow-xs",
                        b.earned ? "bg-success" : "bg-primary/70"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Account / Profile Settings & Quick Actions Section */}
      <GlassCard hover={false} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Account & Settings</h3>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. Edit Profile */}
          <button
            onClick={() => {
              setNewUserName(currentUser);
              setIsEditModalOpen(true);
            }}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-border/50 bg-secondary/30 hover:bg-secondary/70 hover:border-primary/30 transition-all text-left group cursor-pointer"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:scale-105 transition-transform">
              <UserCog className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                Edit Profile
              </p>
              <p className="text-xs text-muted-foreground truncate">Update display name</p>
            </div>
          </button>

          {/* 2. Notifications */}
          <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-border/50 bg-secondary/30 transition-all">
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <Bell className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-foreground truncate">Notifications</p>
                <p className="text-xs text-muted-foreground truncate">Daily reminders</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground/80 bg-muted/80 px-2 py-0.5 rounded-md shrink-0 border border-border/40">
              Disabled
            </span>
          </div>

          {/* 3. Share Progress */}
          <button
            onClick={handleShareProgress}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-border/50 bg-secondary/30 hover:bg-secondary/70 hover:border-success/30 transition-all text-left group cursor-pointer"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success border border-success/20 group-hover:scale-105 transition-transform">
              {isCopied ? <Check className="size-5" /> : <Share2 className="size-5" />}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground group-hover:text-success transition-colors">
                {isCopied ? "Copied!" : "Share Progress"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {isCopied ? "Summary in clipboard" : "Copy stats summary"}
              </p>
            </div>
          </button>

          {/* 4. Preferences / Settings */}
          <Link
            to="/settings"
            className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-border/50 bg-secondary/30 hover:bg-secondary/70 hover:border-primary/30 transition-all text-left group"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 group-hover:scale-105 transition-transform">
              <SlidersHorizontal className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground group-hover:text-indigo-600 transition-colors">
                Preferences
              </p>
              <p className="text-xs text-muted-foreground truncate">Keyboard & studio options</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </GlassCard>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-background border border-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Edit Profile</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground">Display Name</label>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary/40 px-3.5 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter new display name"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveName}
                disabled={!newUserName.trim() || newUserName.trim() === currentUser}
                className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Information */}
      <GlassCard hover={false} className="p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">Account Information</h3>
        <div className="space-y-0 divide-y divide-border/50">

          {/* Account Status */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-muted-foreground">Account status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success bg-success/10 border border-success/20 px-2.5 py-0.5 rounded-full">
              <span className="size-1.5 rounded-full bg-success" />
              Active
            </span>
          </div>

          {/* Account Type */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-muted-foreground">Account type</span>
            <span className="text-sm font-medium text-foreground">Local (Offline)</span>
          </div>

          {/* Sessions count */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-muted-foreground">Total sessions</span>
            <span className="text-sm font-semibold text-foreground tabular-nums">{validHistory.length}</span>
          </div>

          {/* Logout */}
          <div className="flex items-center justify-between pt-4 pb-1">
            <div>
              <p className="text-sm font-medium text-foreground">Sign out</p>
              <p className="text-xs text-muted-foreground">Remove your session from this device</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate({ to: "/login" });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-destructive border border-destructive/30 bg-destructive/5 rounded-xl hover:bg-destructive/10 hover:border-destructive/50 transition-all cursor-pointer"
            >
              Sign out
            </button>
          </div>

        </div>
      </GlassCard>

      {/* Recent Activity */}
      <GlassCard hover={false} className="p-0">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold text-foreground">Recent activity</h3>
        </div>
        <div className="divide-y divide-border/60">
          {validHistory.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No recent activity found. Start typing!
            </div>
          ) : (
            validHistory.map((h, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-white/60"
              >
                <div>
                  <p className="font-medium text-foreground">Practice Session</p>
                  <p className="text-sm text-muted-foreground">{h.date}</p>
                </div>
                <div className="flex gap-6 text-sm">
                  <span className="font-semibold text-primary tabular-nums">{h.wpm}</span>
                  <span className="text-success tabular-nums">{h.acc || h.accuracy}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}