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
import { Award, Clock, Flame, Gauge, Target, Trophy, Zap, Star, Share2, Bell, Settings, CalendarDays, BookOpen, Play, ChevronRight } from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { StatCard } from "@/components/kit/StatCard";
import { cn } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/lib/auth";
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
  const userInitial = userName.trim() ? userName.trim()[0].toUpperCase() : "G";

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
      const sec = typeof h?.elapsedSeconds === "number" && !isNaN(h.elapsedSeconds) ? h.elapsedSeconds : 0;
      return sum + sec;
    }, 0);
  }, [validHistory]);

  const practiceHours = Math.floor(totalSeconds / 3600);
  const practiceMins = Math.floor((totalSeconds % 3600) / 60);
  const practiceTimeStr = totalSeconds > 0 
    ? (practiceHours > 0 ? `${practiceHours}h ${practiceMins}m` : `${practiceMins}m`)
    : "0m";

  // 3. Average WPM & Accuracy
  const avgWpm = validHistory.length > 0 
    ? Math.round(validHistory.reduce((sum, h) => sum + (parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0), 0) / validHistory.length) 
    : 0;
  const avgAcc = validHistory.length > 0 
    ? Math.round(validHistory.reduce((sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0), 0) / validHistory.length) 
    : 0;
    
  const bestWpm = validHistory.length > 0 ? Math.max(...validHistory.map(h => parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0)) : 0;
  const bestAcc = validHistory.length > 0 ? Math.max(...validHistory.map(h => parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0)) : 0;

  // 4. Streak Calculation
  const uniqueDates = useMemo(() => {
    return Array.from(new Set(validHistory.map(h => h && h.date).filter((d): d is string => Boolean(d))));
  }, [validHistory]);

  const streak = useMemo(() => {
    if (uniqueDates.length === 0) return 0;
    let count = 0;
    const curr = new Date();
    for (let i = 0; i < 60; i++) {
      const dStr = `${curr.getDate()} ${curr.toLocaleString('default', { month: 'short' })}`;
      if (uniqueDates.includes(dStr)) {
        count++;
      } else if (i !== 0) {
        break;
      }
      curr.setDate(curr.getDate() - 1);
    }
    return count > 0 ? count : (uniqueDates.length > 0 ? 1 : 0);
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

  const weakKeys = useMemo(() => {
    return Object.entries(aggregateMistakes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
  }, [aggregateMistakes]);

  // 6. Today's Goal Calculations
  const todayStr = `${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'short' })}`;
  const todaysSessions = useMemo(() => validHistory.filter(h => h.date === todayStr), [validHistory, todayStr]);
  const todaySeconds = useMemo(() => todaysSessions.reduce((sum, h) => sum + (typeof h.elapsedSeconds === 'number' ? h.elapsedSeconds : 0), 0), [todaysSessions]);
  const todayPracticeMins = Math.floor(todaySeconds / 60);
  
  const todayLessonsSet = useMemo(() => new Set(todaysSessions.map(h => h.lessonSlug).filter((s): s is string => Boolean(s))), [todaysSessions]);
  const todayLessonsCompleted = todayLessonsSet.size;
  
  const todayAvgAcc = todaysSessions.length > 0 
    ? Math.round(todaysSessions.reduce((sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0), 0) / todaysSessions.length)
    : 0;

  // 7. Weekly Chart Data
  const weeklyData = useMemo(() => {
    const data = [];
    const startD = new Date();
    startD.setDate(startD.getDate() - 6);
    const dayNames = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];
    
    for (let i = 0; i < 7; i++) {
      const d = new Date(startD);
      d.setDate(d.getDate() + i);
      const dStr = `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
      const daySessions = validHistory.filter(h => h && h.date === dStr);
      
      if (daySessions.length > 0) {
        const dWpm = Math.round(
          daySessions.reduce((sum, h) => sum + (parseInt(String(h.wpm ?? 0).replace(" WPM", "")) || 0), 0) / daySessions.length
        );
        const dAcc = Math.round(
          daySessions.reduce((sum, h) => sum + (parseInt(String(h.accuracy || h.acc || "0").replace("%", "")) || 0), 0) / daySessions.length
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
  }, [validHistory]);

  const activeDaysCount = useMemo(() => {
    return weeklyData.filter((d) => d.hasData).length;
  }, [weeklyData]);

  // 8. Lesson Tracks Breakdown
  const completedSlugs = useMemo(() => new Set(validHistory.map(h => h.lessonSlug).filter((s): s is string => Boolean(s))), [validHistory]);
  const beginnerTotal = useMemo(() => Array.isArray(lessons) ? lessons.filter(l => l && l.level === "शुरुआती").length : 0, []);
  const beginnerCompleted = useMemo(() => Array.isArray(lessons) ? lessons.filter(l => l && l.level === "शुरुआती" && completedSlugs.has(l.slug)).length : 0, [completedSlugs]);

  // 9. Badges
  const badges = useMemo(() => [
    { icon: Flame, title: "7 दिन स्ट्रीक", desc: "लगातार सात दिन अभ्यास", earned: streak >= 7 },
    { icon: Zap, title: "50 WPM क्लब", desc: "50 शब्द प्रति मिनट पार", earned: bestWpm >= 50 },
    { icon: Target, title: "शुद्धता मास्टर", desc: "98% शुद्धता प्राप्त", earned: bestAcc >= 98 },
    { icon: Trophy, title: "परीक्षा तैयार", desc: "परीक्षा पाठ पूर्ण करें", earned: completedSlugs.has("ch25") || completedSlugs.has("ch28") },
    { icon: Star, title: "100 टेस्ट", desc: "सौ अभ्यास सत्र पूर्ण", earned: validHistory.length >= 100 },
    { icon: Award, title: "60 WPM क्लब", desc: "60 शब्द प्रति मिनट पार", earned: bestWpm >= 60 },
  ], [streak, bestWpm, bestAcc, completedSlugs, validHistory.length]);

  return (
    <div className="space-y-10">
      {/* 1. Top action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-background/50 backdrop-blur-md p-4 rounded-3xl border border-border shadow-sm">
        <h1 className="text-2xl font-bold font-hindi text-foreground ml-2">Dashboard</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-full text-sm font-semibold hover:bg-secondary/80 transition-colors">
            <Settings className="size-4" /> <span className="hidden sm:inline">Edit Profile</span>
          </button>
          <button className="flex items-center justify-center size-10 shrink-0 bg-secondary text-foreground rounded-full hover:bg-secondary/80 transition-colors">
            <Bell className="size-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
            <Share2 className="size-4" /> <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* 2. Profile mini-row */}
      <GlassCard hover={false} className="flex flex-col gap-6 md:flex-row md:items-center">
        <span
          className="flex size-20 items-center justify-center rounded-3xl font-bold text-4xl text-primary-foreground uppercase shadow-sm"
          style={{ background: "var(--gradient-primary)" }}
        >
          {userInitial}
        </span>
        <div className="flex-1">
          <h2 className="font-hindi text-2xl font-semibold text-foreground">{userName}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Local Typist</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <CalendarDays className="size-4 text-accent-blue" /> Account Active
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Trophy className="size-4 text-primary" /> Tests: {history.length}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* 3. 4 stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Flame} label="Daily streak" value={streak} suffix="days" tone="danger" />
        <StatCard icon={Clock} label="Practice time" value={practiceTimeStr} tone="muted" />
        <StatCard icon={Gauge} label="Average WPM" value={avgWpm} />
        <StatCard icon={Target} label="Accuracy" value={avgAcc} suffix="%" tone="success" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* 4. Weekly progress chart */}
        <GlassCard hover={false} className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
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
                Complete typing lessons to automatically track your daily WPM and Accuracy trends here.
              </p>
            </div>
          ) : (
            <div className="flex-1 min-h-[260px]">
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
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.6} vertical={false} />
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
                          <div className="rounded-2xl border border-border bg-white/95 p-3 shadow-lg backdrop-blur-md">
                            <p className="text-xs font-semibold text-foreground">{label}</p>
                            <p className="mt-1 text-xs text-muted-foreground">No practice sessions</p>
                          </div>
                        );
                      }
                      return (
                        <div className="rounded-2xl border border-border bg-white/95 p-3 shadow-lg backdrop-blur-md space-y-1.5">
                          <p className="text-xs font-semibold text-muted-foreground">{label} ({d.dateStr})</p>
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

        <div className="flex flex-col gap-6">
          {/* 5. Daily goal card */}
          <GlassCard hover={false} className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Daily goal</h3>
              <p className="font-hindi text-sm text-muted-foreground mt-1">आज का लक्ष्य: 30 मिनट अभ्यास</p>
              <div className="mt-6 space-y-5">
                {[
                  { label: "Practice minutes", value: todayPracticeMins, max: 30, tone: "var(--primary)" },
                  { label: "Lessons completed", value: todayLessonsCompleted, max: 5, tone: "var(--accent-blue)" },
                  { label: "Accuracy target", value: todayAvgAcc, max: 98, tone: "var(--success)" },
                ].map((g) => (
                  <div key={g.label}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground font-medium">{g.label}</span>
                      <span className="font-semibold text-foreground">
                        {g.value}/{g.max}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${Math.min(100, (g.value / g.max) * 100)}%`,
                          background: g.tone,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-5 border-t border-border">
              <Link to="/practice" className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-md group">
                <Play className="size-4 fill-current group-hover:scale-110 transition-transform" /> Continue Lesson
              </Link>
            </div>
          </GlassCard>

          {/* 7. Weakest keys card */}
          <GlassCard hover={false} className="flex flex-col justify-center p-6 border border-border/80">
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <span className="text-sm font-bold uppercase tracking-widest text-foreground/80">Weakest Keys</span>
            </div>
            {weakKeys.length > 0 ? (
              <div className="flex gap-3">
                {weakKeys.map(key => (
                  <span key={key} className="flex size-12 items-center justify-center rounded-xl bg-danger/10 text-2xl font-bold text-danger font-hindi border border-danger/20 shadow-sm">
                    {key}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm font-medium text-foreground bg-secondary/50 p-3 rounded-lg border border-border text-center">No major weaknesses yet. Keep typing.</p>
            )}
          </GlassCard>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
         <div className="flex flex-col gap-6">
            {/* 6. Achievements/Badges row */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Achievement badges</h3>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {badges.map((b) => (
                  <GlassCard
                    key={b.title}
                    className={cn("flex items-center gap-4 transition-all duration-300", !b.earned && "opacity-60 grayscale hover:grayscale-0")}
                  >
                    <span
                      className={cn(
                        "flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-sm",
                        b.earned ? "text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                      style={b.earned ? { background: "var(--gradient-primary)" } : undefined}
                    >
                      <b.icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-hindi font-semibold text-foreground truncate">{b.title}</p>
                      <p className="font-hindi text-xs text-muted-foreground mt-0.5 leading-tight">{b.desc}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* 9. Recent activity table */}
            <GlassCard hover={false} className="p-0 overflow-hidden flex flex-col flex-1">
              <div className="border-b border-border px-6 py-4 flex items-center justify-between bg-background/30">
                <h3 className="text-lg font-semibold text-foreground">Recent activity</h3>
                <Link to="/profile" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                  View all <ChevronRight className="size-3" />
                </Link>
              </div>
              <div className="divide-y divide-border/60 flex-1">
                {validHistory.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No recent activity found. Start typing!
                  </div>
                ) : (
                  validHistory.slice(0, 4).map((h, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-white/60"
                    >
                      <div>
                        <p className="font-medium text-foreground">Practice Session</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{h.date} • {h.lessonSlug || 'Custom'}</p>
                      </div>
                      <div className="flex gap-6 text-sm items-center">
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">WPM</span>
                           <span className="font-semibold text-primary tabular-nums text-base">{h.wpm}</span>
                        </div>
                        <div className="flex flex-col items-end">
                           <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">ACC</span>
                           <span className="font-semibold text-success tabular-nums text-base">{h.accuracy || h.acc}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </GlassCard>
         </div>

         {/* 8. Lesson tracks breakdown card */}
         <GlassCard hover={false} className="h-fit flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-accent-blue/10 rounded-xl text-accent-blue shadow-sm border border-accent-blue/20">
                <BookOpen className="size-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Lesson Tracks</h3>
            </div>
            
            <div className="space-y-7 flex-1">
               <div>
                  <div className="flex justify-between items-end mb-3">
                     <div>
                        <h4 className="font-semibold text-foreground">Beginner Track</h4>
                        <p className="text-xs text-muted-foreground font-hindi mt-0.5">शुरुआती पाठ</p>
                     </div>
                     <span className="text-sm font-semibold text-foreground bg-secondary px-2 py-0.5 rounded-md">{beginnerCompleted}/{beginnerTotal}</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted/80 rounded-full overflow-hidden shadow-inner border border-border/40">
                     <div 
                        className="h-full bg-success rounded-full transition-all duration-1000" 
                        style={{ width: `${beginnerTotal > 0 ? (beginnerCompleted / beginnerTotal) * 100 : 0}%` }}
                     />
                  </div>
               </div>

               <div>
                  <div className="flex justify-between items-end mb-3">
                     <div>
                        <h4 className="font-semibold text-foreground">Intermediate Track</h4>
                        <p className="text-xs text-muted-foreground font-hindi mt-0.5">मध्यम पाठ</p>
                     </div>
                     <span className="text-sm font-semibold text-foreground bg-secondary px-2 py-0.5 rounded-md">0/15</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted/80 rounded-full overflow-hidden shadow-inner border border-border/40">
                     <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000" 
                        style={{ width: `0%` }}
                     />
                  </div>
               </div>

               <div>
                  <div className="flex justify-between items-end mb-3">
                     <div>
                        <h4 className="font-semibold text-foreground">Advanced Track</h4>
                        <p className="text-xs text-muted-foreground font-hindi mt-0.5">उन्नत पाठ</p>
                     </div>
                     <span className="text-sm font-semibold text-foreground bg-secondary px-2 py-0.5 rounded-md">0/10</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted/80 rounded-full overflow-hidden shadow-inner border border-border/40">
                     <div 
                        className="h-full bg-orange-500 rounded-full transition-all duration-1000" 
                        style={{ width: `0%` }}
                     />
                  </div>
               </div>
            </div>
            
            <div className="mt-8 pt-5 border-t border-border">
               <p className="text-xs font-medium text-muted-foreground text-center">Complete lower tiers to unlock advanced tracks</p>
            </div>
         </GlassCard>
      </div>
    </div>
  );
}