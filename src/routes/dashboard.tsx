import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Award,
  Clock,
  Flame,
  Gauge,
  Target,
  Trophy,
  Zap,
  Star,
  Share2,
  Bell,
  Settings,
  CalendarDays,
  BookOpen,
  Play,
  ChevronRight,
} from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { StatCard } from "@/components/kit/StatCard";
import { cn } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/useLanguage";
import { lessons } from "@/lib/typing-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Typing Dashboard — Streak, WPM & Weekly Progress" },
      {
        name: "description",
        content:
          "Track your Hindi typing streak, practice minutes, WPM, accuracy, weekly progress chart and achievement badges.",
      },
      { property: "og:title", content: "Hindi Typing Dashboard" },
      {
        property: "og:description",
        content: "Streaks, weekly progress charts and achievement badges for Hindi typists.",
      },
    ],
  }),
  component: DashboardPage,
});

type ResultRecord = {
  date?: string;
  wpm?: string | number;
  acc?: string | number;
  accuracy?: string | number;
  charMistakes?: Record<string, number>;
  elapsedSeconds?: number;
  lessonSlug?: string;
  grade?: string;
  xp?: number;
};

function DashboardPage() {
  const { isEnglish } = useLanguage();
  const { currentUser, isLoaded } = useAuth();
  const [history, setHistory] = useState<ResultRecord[]>([]);

  useEffect(() => {
    const activeUser = currentUser || "Guest";
    try {
      const stored = localStorage.getItem("results_" + activeUser);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        } else {
          setHistory([]);
        }
      } else {
        setHistory([]);
      }
    } catch (e) {
      console.error("Failed to parse results from localStorage", e);
      setHistory([]);
    }
  }, [currentUser, isLoaded]);

  const userName = currentUser || "Guest";
  const userInitial = userName.trim() ? (userName.trim()[0]?.toUpperCase() ?? "G") : "G";

  // 1. Valid sessions are those with reasonable WPM (e.g., < 250) and Accuracy (0-100)
  const validHistory = useMemo(() => {
    if (!Array.isArray(history)) return [];
    return history.filter((h) => {
      if (!h || typeof h !== "object") return false;
      const w = parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0;
      const a = parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0;
      return w > 0 && w < 250 && a > 0 && a <= 100;
    });
  }, [history]);

  // 2. Practice Time (Actual Elapsed Seconds)
  const totalSeconds = useMemo(() => {
    return validHistory.reduce((sum, h) => {
      const sec =
        typeof h?.elapsedSeconds === "number" && !isNaN(h.elapsedSeconds) ? h.elapsedSeconds : 0;
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

  // 3. Average WPM & Accuracy
  const avgWpm =
    validHistory.length > 0
      ? Math.round(
          validHistory.reduce(
            (sum, h) => sum + (parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0),
            0,
          ) / validHistory.length,
        )
      : 0;
  const avgAcc =
    validHistory.length > 0
      ? Math.round(
          validHistory.reduce(
            (sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0),
            0,
          ) / validHistory.length,
        )
      : 0;

  const bestWpm =
    validHistory.length > 0
      ? Math.max(...validHistory.map((h) => parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0))
      : 0;
  const bestAcc =
    validHistory.length > 0
      ? Math.max(
          ...validHistory.map(
            (h) => parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0,
          ),
        )
      : 0;

  // 4. Streak Calculation
  const uniqueDates = useMemo(() => {
    return Array.from(
      new Set(validHistory.map((h) => h && h.date).filter((d): d is string => Boolean(d))),
    );
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

  // 5. Weak Keys
  const aggregateMistakes = useMemo(() => {
    const mistakes: Record<string, number> = {};
    validHistory.forEach((session) => {
      if (session && session.charMistakes && typeof session.charMistakes === "object") {
        Object.entries(session.charMistakes).forEach(([char, count]) => {
          if (char && typeof count === "number" && !isNaN(count)) {
            mistakes[char] = (mistakes[char] || 0) + count;
          }
        });
      }
    });
    return mistakes;
  }, [validHistory]);

  const weakKeysData = useMemo(() => {
    return Object.entries(aggregateMistakes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([char, count]) => ({ char, count }));
  }, [aggregateMistakes]);

  const weakKeys = useMemo(() => weakKeysData.map((d) => d.char), [weakKeysData]);

  // 6. Today's Goal Calculations
  const todayStr = `${new Date().getDate()} ${new Date().toLocaleString("default", { month: "short" })}`;
  const todaysSessions = useMemo(
    () => validHistory.filter((h) => h.date === todayStr),
    [validHistory, todayStr],
  );
  const todaySeconds = useMemo(
    () =>
      todaysSessions.reduce(
        (sum, h) => sum + (typeof h.elapsedSeconds === "number" ? h.elapsedSeconds : 0),
        0,
      ),
    [todaysSessions],
  );
  const todayPracticeMins = Math.floor(todaySeconds / 60);

  const todayLessonsSet = useMemo(
    () => new Set(todaysSessions.map((h) => h.lessonSlug).filter((s): s is string => Boolean(s))),
    [todaysSessions],
  );
  const todayLessonsCompleted = todayLessonsSet.size;

  const todayAvgAcc =
    todaysSessions.length > 0
      ? Math.round(
          todaysSessions.reduce(
            (sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0),
            0,
          ) / todaysSessions.length,
        )
      : 0;

  // 7. Weekly Chart Data
  const weeklyData = useMemo(() => {
    const data = [];
    const startD = new Date();
    startD.setDate(startD.getDate() - 6);
    const dayNames = isEnglish 
      ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      : ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];

    for (let i = 0; i < 7; i++) {
      const d = new Date(startD);
      d.setDate(d.getDate() + i);
      const dStr = `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`;
      const daySessions = validHistory.filter((h) => h && h.date === dStr);

      if (daySessions.length > 0) {
        const dWpm = Math.round(
          daySessions.reduce(
            (sum, h) => sum + (parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0),
            0,
          ) / daySessions.length,
        );
        const dAcc = Math.round(
          daySessions.reduce(
            (sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0),
            0,
          ) / daySessions.length,
        );
        data.push({
          day: dayNames[d.getDay()],
          dateStr: dStr,
          wpm: dWpm,
          accuracy: dAcc,
          hasData: true,
        });
      } else {
        data.push({
          day: dayNames[d.getDay()],
          dateStr: dStr,
          wpm: null,
          accuracy: null,
          hasData: false,
        });
      }
    }
    return data;
  }, [validHistory, isEnglish]);

  const activeDaysCount = useMemo(() => {
    return weeklyData.filter((d) => d.hasData).length;
  }, [weeklyData]);

  // 8. Lesson Tracks Breakdown
  const completedSlugs = useMemo(
    () => new Set(validHistory.map((h) => h.lessonSlug).filter((s): s is string => Boolean(s))),
    [validHistory],
  );
  const beginnerTotal = useMemo(
    () => (Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "शुरुआती").length : 0),
    [],
  );
  const beginnerCompleted = useMemo(
    () =>
      Array.isArray(lessons)
        ? lessons.filter((l) => l && l.level === "शुरुआती" && completedSlugs.has(l.slug)).length
        : 0,
    [completedSlugs],
  );

  const interTotalCount = useMemo(
    () => (Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "मध्यम").length : 0),
    [],
  );
  const interTotal = interTotalCount > 0 ? interTotalCount : 15;
  const interCompleted = useMemo(
    () =>
      Array.isArray(lessons)
        ? lessons.filter((l) => l && l.level === "मध्यम" && completedSlugs.has(l.slug)).length
        : 0,
    [completedSlugs],
  );

  const advTotalCount = useMemo(
    () => (Array.isArray(lessons) ? lessons.filter((l) => l && l.level === "उन्नत").length : 0),
    [],
  );
  const advTotal = advTotalCount > 0 ? advTotalCount : 10;
  const advCompleted = useMemo(
    () =>
      Array.isArray(lessons)
        ? lessons.filter((l) => l && l.level === "उन्नत" && completedSlugs.has(l.slug)).length
        : 0,
    [completedSlugs],
  );

  const tracks = useMemo(
    () => [
      {
        name: "Beginner Track",
        subName: isEnglish ? "Beginner Lessons" : "शुरुआती पाठ",
        completed: beginnerCompleted,
        total: beginnerTotal,
        color: "bg-orange-500",
        badgeColor: "text-orange-500 bg-orange-500/15 border-orange-500/25",
      },
      {
        name: "Intermediate Track",
        subName: isEnglish ? "Intermediate Lessons" : "मध्यम पाठ",
        completed: interCompleted,
        total: interTotal,
        color: "bg-accent-blue",
        badgeColor: "text-accent-blue bg-accent-blue/15 border-accent-blue/25",
      },
      {
        name: "Advanced Track",
        subName: isEnglish ? "Advanced Lessons" : "उन्नत पाठ",
        completed: advCompleted,
        total: advTotal,
        color: "bg-teal-500",
        badgeColor: "text-teal-500 bg-teal-500/15 border-teal-500/25",
      },
    ],
    [beginnerCompleted, beginnerTotal, interCompleted, interTotal, advCompleted, advTotal, isEnglish],
  );

  // 9. Badges (4 Primary Badges)
  const badges = useMemo(
    () => [
      {
        icon: Flame,
        title: isEnglish ? "7 Day Streak" : "7 दिन स्ट्रीक",
        desc: isEnglish ? "Practiced for 7 consecutive days" : "लगातार सात दिन अभ्यास",
        earned: streak >= 7,
        iconClass: "text-orange-500 bg-orange-500/10 border border-orange-500/20",
      },
      {
        icon: Zap,
        title: isEnglish ? "50 WPM Club" : "50 WPM क्लब",
        desc: isEnglish ? "Surpassed 50 words per minute" : "50 शब्द प्रति मिनट पार",
        earned: bestWpm >= 50,
        iconClass: "text-purple-500 bg-purple-500/10 border border-purple-500/20",
      },
      {
        icon: Target,
        title: isEnglish ? "Accuracy Master" : "शुद्धता मास्टर",
        desc: isEnglish ? "Achieved 98% accuracy" : "98% शुद्धता प्राप्त",
        earned: bestAcc >= 98,
        iconClass: "text-success bg-success/10 border border-success/20",
      },
      {
        icon: Trophy,
        title: isEnglish ? "Exam Ready" : "परीक्षा तैयार",
        desc: isEnglish ? "Completed exam lessons" : "परीक्षा पाठ पूर्ण करें",
        earned: completedSlugs.has("ch25") || completedSlugs.has("ch28"),
        iconClass: "text-accent-blue bg-accent-blue/10 border border-accent-blue/20",
      },
    ],
    [streak, bestWpm, bestAcc, completedSlugs, isEnglish],
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <SectionTitle
        eyebrow="Overview"
        title="Your typing dashboard"
        subtitle={isEnglish ? "Your progress at a glance — streaks, speed, accuracy, and achievements." : "आपकी प्रगति एक नज़र में — स्ट्रीक, गति, शुद्धता और उपलब्धियाँ।"}
      />

      {/* 3. 4 stat cards */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Flame} label="Daily streak" value={streak} suffix="days" tone="danger" />
        <StatCard icon={Clock} label="Practice time" value={practiceTimeStr} tone="blue" />
        <StatCard icon={Gauge} label="Average WPM" value={avgWpm} suffix="WPM" tone="purple" />
        <StatCard icon={Target} label="Accuracy" value={avgAcc} suffix="%" tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] xl:grid-cols-[1.4fr_1fr]">
        {/* 4. Weekly progress chart */}
        <GlassCard hover={false} className="flex flex-col p-6 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Weekly progress</h3>
              <p className="text-xs text-muted-foreground">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-primary" />
                <span className="text-foreground font-semibold">Speed (WPM)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-success" />
                <span className="text-foreground font-semibold">Accuracy (%)</span>
              </div>
            </div>
          </div>

          {activeDaysCount === 0 ? (
            <div className="flex flex-1 min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-secondary/20 p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
                <Gauge className="size-6" />
              </div>
              <p className="text-sm font-semibold text-foreground">No weekly session data yet</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                Complete typing lessons to automatically track your daily WPM and Accuracy trends
                here.
              </p>
            </div>
          ) : (
            <div className="flex-1 min-h-[260px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ left: -20, right: 12, top: 12, bottom: 4 }}>
                  <defs>
                    <linearGradient id="wpmFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.01} />
                    </linearGradient>
                    <linearGradient id="accFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--success)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--success)" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    opacity={0.6}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12, fontWeight: 500 }}
                    dy={8}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const d = payload[0]?.payload;
                      if (!d || !d.hasData) {
                        return (
                          <div className="rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md">
                            <p className="text-xs font-semibold text-foreground">{label}</p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              No practice sessions
                            </p>
                          </div>
                        );
                      }
                      return (
                        <div className="rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-md space-y-1.5">
                          <p className="text-xs font-semibold text-muted-foreground">
                            {label} ({d.dateStr})
                          </p>
                          {d.wpm !== null && (
                            <p className="text-xs font-bold text-primary flex items-center justify-between gap-4">
                              <span>Speed:</span> <span>{d.wpm} WPM</span>
                            </p>
                          )}
                          {d.accuracy !== null && (
                            <p className="text-xs font-bold text-success flex items-center justify-between gap-4">
                              <span>Accuracy:</span> <span>{d.accuracy}%</span>
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="wpm"
                    name="WPM"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    fill="url(#wpmFill)"
                    connectNulls={true}
                    dot={{ r: 4, stroke: "var(--primary)", strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 6, fill: "var(--primary)", stroke: "#fff", strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    name="Accuracy %"
                    stroke="var(--success)"
                    strokeWidth={2}
                    fill="url(#accFill)"
                    connectNulls={true}
                    dot={{ r: 4, stroke: "var(--success)", strokeWidth: 2, fill: "#fff" }}
                    activeDot={{ r: 6, fill: "var(--success)", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </GlassCard>

        <div className="flex flex-col gap-6 min-w-0">
          {/* 5. Daily goal card */}
          <GlassCard hover={false} className="flex-1 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Daily goal</h3>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-secondary/80 px-2.5 py-1 rounded-full border border-border/50">
                  Target
                </span>
              </div>
              <p className="font-hindi text-xs font-medium text-muted-foreground mt-0.5">
                {isEnglish ? "Today's goal: 30 minutes practice" : "आज का लक्ष्य: 30 मिनट अभ्यास"}
              </p>

              <div className="mt-5 space-y-4">
                {[
                  {
                    label: "Practice minutes",
                    value: todayPracticeMins,
                    max: 30,
                    tone: "bg-accent-blue",
                    icon: Clock,
                    iconClass: "text-accent-blue bg-accent-blue/10 border border-accent-blue/20",
                  },
                  {
                    label: "Lessons completed",
                    value: todayLessonsCompleted,
                    max: 5,
                    tone: "bg-teal-500",
                    icon: BookOpen,
                    iconClass: "text-teal-500 bg-teal-500/10 border border-teal-500/20",
                  },
                  {
                    label: "Accuracy target",
                    value: todayAvgAcc,
                    max: 98,
                    tone: "bg-success",
                    icon: Target,
                    iconClass: "text-success bg-success/10 border border-success/20",
                  },
                ].map((g) => {
                  const pct = Math.min(100, Math.round((g.value / g.max) * 100));
                  return (
                    <div key={g.label} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "flex size-6 items-center justify-center rounded-lg border",
                              g.iconClass,
                            )}
                          >
                            <g.icon className="size-3.5" />
                          </span>
                          <span className="text-foreground/90 font-semibold">{g.label}</span>
                        </div>
                        <span className="font-bold text-foreground tabular-nums bg-secondary/60 px-2 py-0.5 rounded-md border border-border/40">
                          {g.value}/{g.max}
                        </span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-secondary/80 border border-border/40 p-0.5 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-700 ease-out shadow-xs",
                            g.tone,
                          )}
                          style={{
                            width: `${pct}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60">
              <Link
                to="/practice"
                className="flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow group"
              >
                <Play className="size-4 fill-current group-hover:scale-110 transition-transform" />{" "}
                Continue Lesson
              </Link>
            </div>
          </GlassCard>

          {/* 7. Weakest keys card */}
          <GlassCard hover={false} className="flex flex-col justify-between p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Weakest keys</h3>
              </div>
              {weakKeysData.length > 0 && (
                <span className="text-[10px] font-bold text-danger bg-danger/10 px-2.5 py-1 rounded-full border border-danger/20 uppercase tracking-wider">
                  Needs Practice
                </span>
              )}
            </div>

            {weakKeysData.length > 0 ? (
              <div className="flex flex-wrap items-center gap-3">
                {weakKeysData.map(({ char, count }, i) => {
                  const accents = [
                    {
                      b: "bg-orange-500/10",
                      br: "border-orange-500/20",
                      t: "text-orange-500",
                      tb: "border-orange-500/15",
                    },
                    {
                      b: "bg-accent-blue/10",
                      br: "border-accent-blue/20",
                      t: "text-accent-blue",
                      tb: "border-accent-blue/15",
                    },
                    {
                      b: "bg-teal-500/10",
                      br: "border-teal-500/20",
                      t: "text-teal-500",
                      tb: "border-teal-500/15",
                    },
                  ];
                  const a = accents[i % accents.length];
                  if (!a) return null;
                  return (
                    <div
                      key={char}
                      className={cn(
                        "flex items-center gap-2.5 border px-3.5 py-2 rounded-2xl transition-transform hover:scale-105",
                        a.b,
                        a.br,
                      )}
                    >
                      <span className={cn("font-hindi text-2xl font-bold leading-none", a.t)}>
                        {char}
                      </span>
                      <span
                        className={cn(
                          "text-[11px] font-bold tabular-nums bg-background/80 px-2 py-0.5 rounded-lg shadow-2xs border",
                          a.t,
                          a.tb,
                        )}
                      >
                        {count} {count === 1 ? "mistake" : "mistakes"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[56px] items-center justify-center rounded-2xl bg-secondary/40 border border-border/40 px-4 py-3 text-center">
                <p className="text-xs font-medium text-muted-foreground">
                  No major weaknesses yet. Keep typing.
                </p>
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] xl:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6 min-w-0">
          {/* 6. Achievements/Badges row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Achievement badges</h3>
              <span className="text-xs font-semibold text-muted-foreground">
                {badges.filter((b) => b.earned).length}/{badges.length} Unlocked
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {badges.map((b) => (
                <GlassCard
                  key={b.title}
                  hover={false}
                  className={cn(
                    "flex items-center gap-3.5 p-4 rounded-2xl transition-all duration-300 border min-w-0",
                    b.earned
                      ? "bg-primary/5 border-primary/20 shadow-xs hover:border-primary/40"
                      : "bg-secondary/20 border-border/40 opacity-75 hover:opacity-90",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-2xl shadow-xs",
                      b.earned
                        ? b.iconClass
                        : "bg-muted/80 text-muted-foreground/60 border border-border/40",
                    )}
                  >
                    <b.icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="font-hindi font-semibold text-sm text-foreground truncate">
                        {b.title}
                      </p>
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0",
                          b.earned
                            ? "text-success bg-success/15 border-success/25"
                            : "text-muted-foreground/70 bg-secondary border-border/40",
                        )}
                      >
                        {b.earned ? "Unlocked" : "Locked"}
                      </span>
                    </div>
                    <p className="font-hindi text-xs text-muted-foreground leading-tight">
                      {b.desc}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* 9. Recent activity table */}
          <GlassCard hover={false} className="p-0 overflow-hidden flex flex-col flex-1 min-w-0">
            <div className="border-b border-border/80 px-6 py-4 flex items-center justify-between bg-background/40">
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-foreground">Recent activity</h3>
                {validHistory.length > 0 && (
                  <span className="text-[11px] font-bold text-muted-foreground bg-secondary/80 px-2.5 py-0.5 rounded-full border border-border/50 tabular-nums">
                    {validHistory.length}
                  </span>
                )}
              </div>
              <Link
                to="/profile"
                className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline group"
              >
                <span>View all</span>
                <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {validHistory.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-secondary/10 min-h-[200px]">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 shadow-xs">
                  <Clock className="size-5" />
                </div>
                <p className="text-sm font-semibold text-foreground">No recent typing sessions</p>
                <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                  Complete a lesson or practice session to build your typing history.
                </p>
                <Link
                  to="/practice"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 px-3.5 py-1.5 rounded-xl transition-colors"
                >
                  <span>Start Practice</span>
                  <ChevronRight className="size-3.5" />
                </Link>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <div className="min-w-[480px]">
                  {/* Column Headers */}
                  <div className="grid grid-cols-[1.8fr_1fr_1fr_1.1fr] items-center px-6 py-2.5 bg-secondary/40 border-b border-border/60 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    <div>Session / Lesson</div>
                    <div className="text-center">WPM</div>
                    <div className="text-center">Accuracy</div>
                    <div className="text-right">Date</div>
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-border/50 max-h-[320px] overflow-y-auto">
                    {validHistory.slice(0, 5).map((h, i) => {
                      const wpmVal = parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0;
                      const accVal =
                        parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0;

                      const lessonObj = lessons.find((l) => l.slug === h.lessonSlug);
                      const lessonName = lessonObj
                        ? lessonObj.title
                        : h.lessonSlug === "daily-challenge"
                          ? "Daily Challenge"
                          : h.lessonSlug === "custom"
                            ? "Custom Practice"
                            : h.lessonSlug
                              ? `Lesson (${h.lessonSlug})`
                              : "Practice Session";

                      const subText = lessonObj ? lessonObj.hindiTitle : null;

                      return (
                        <div
                          key={i}
                          className="grid grid-cols-[1.8fr_1fr_1fr_1.1fr] items-center px-6 py-3 transition-colors hover:bg-secondary/30"
                        >
                          {/* Session / Lesson */}
                          <div className="min-w-0 pr-2">
                            <p className="font-medium text-sm text-foreground truncate">
                              {lessonName}
                            </p>
                            {subText ? (
                              <p className="text-xs text-muted-foreground font-hindi truncate">
                                {subText}
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground truncate">
                                Free Practice
                              </p>
                            )}
                          </div>

                          {/* WPM */}
                          <div className="flex justify-center">
                            <span className="inline-flex items-center gap-1 font-semibold text-xs text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg tabular-nums">
                              {wpmVal}{" "}
                              <span className="text-[10px] opacity-75 font-normal">WPM</span>
                            </span>
                          </div>

                          {/* Accuracy */}
                          <div className="flex justify-center">
                            <span className="inline-flex items-center gap-1 font-semibold text-xs text-success bg-success/10 border border-success/20 px-2.5 py-1 rounded-lg tabular-nums">
                              {accVal}%
                            </span>
                          </div>

                          {/* Date */}
                          <div className="text-right text-xs font-medium text-muted-foreground tabular-nums whitespace-nowrap">
                            {h.date || "Today"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* 8. Lesson tracks breakdown card */}
        <GlassCard hover={false} className="h-fit flex flex-col p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-accent-blue/10 rounded-xl text-accent-blue shadow-xs border border-accent-blue/20">
              <BookOpen className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Lesson Tracks</h3>
              <p className="text-xs text-muted-foreground">Course progress by tier</p>
            </div>
          </div>

          <div className="space-y-3.5 flex-1">
            {tracks.map((track) => {
              const pct =
                track.total > 0
                  ? Math.min(100, Math.round((track.completed / track.total) * 100))
                  : 0;
              return (
                <div
                  key={track.name}
                  className="space-y-2 p-3.5 rounded-2xl bg-secondary/30 border border-border/40 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{track.name}</h4>
                      <p className="text-xs text-muted-foreground font-hindi mt-0.5">
                        {track.subName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                          track.badgeColor,
                        )}
                      >
                        {pct === 100 ? "Completed" : pct > 0 ? `${pct}%` : "Not Started"}
                      </span>
                      <span className="text-xs font-bold text-foreground tabular-nums bg-background px-2 py-0.5 rounded-md border border-border/50">
                        {track.completed}/{track.total}
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-secondary/80 rounded-full overflow-hidden border border-border/40 p-0.5">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700 ease-out shadow-xs",
                        track.color,
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border/60">
            <p className="text-xs font-medium text-muted-foreground text-center">
              Complete lessons in each tier to unlock advanced tracks
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
