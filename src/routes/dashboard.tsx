import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Award, Clock, Flame, Gauge, Target, Trophy, Zap, Star } from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { StatCard } from "@/components/kit/StatCard";
import { cn } from "@/lib/utils";

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

const weekly = [
  { day: "सोम", wpm: 34, accuracy: 91 },
  { day: "मंगल", wpm: 38, accuracy: 93 },
  { day: "बुध", wpm: 41, accuracy: 94 },
  { day: "गुरु", wpm: 39, accuracy: 95 },
  { day: "शुक्र", wpm: 45, accuracy: 96 },
  { day: "शनि", wpm: 48, accuracy: 97 },
  { day: "रवि", wpm: 52, accuracy: 98 },
];

const badges = [
  { icon: Flame, title: "7 दिन स्ट्रीक", desc: "लगातार सात दिन अभ्यास", earned: true },
  { icon: Zap, title: "50 WPM क्लब", desc: "50 शब्द प्रति मिनट पार", earned: true },
  { icon: Target, title: "शुद्धता मास्टर", desc: "98% शुद्धता प्राप्त", earned: true },
  { icon: Trophy, title: "परीक्षा तैयार", desc: "परीक्षा पाठ पूर्ण करें", earned: false },
  { icon: Star, title: "100 टेस्ट", desc: "सौ अभ्यास सत्र पूर्ण", earned: false },
  { icon: Award, title: "60 WPM क्लब", desc: "60 शब्द प्रति मिनट पार", earned: false },
];

function DashboardPage() {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Overview"
        title="Your typing dashboard"
        subtitle="आपकी प्रगति एक नज़र में — स्ट्रीक, गति, शुद्धता और उपलब्धियाँ।"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Flame} label="Daily streak" value={7} suffix="days" tone="danger" />
        <StatCard icon={Clock} label="Practice time" value="4h 20m" tone="muted" />
        <StatCard icon={Gauge} label="Average WPM" value={42} />
        <StatCard icon={Target} label="Accuracy" value={96} suffix="%" tone="success" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <GlassCard hover={false}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Weekly progress</h3>
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              +18 WPM this week
            </span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="wpmFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="accFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--success)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--success)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid var(--border)",
                    background: "rgba(255,255,255,0.95)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="wpm"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  fill="url(#wpmFill)"
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="var(--success)"
                  strokeWidth={2}
                  fill="url(#accFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <h3 className="text-lg font-semibold text-foreground">Daily goal</h3>
          <p className="font-hindi text-sm text-muted-foreground">आज का लक्ष्य: 30 मिनट अभ्यास</p>
          <div className="mt-6 space-y-5">
            {[
              { label: "Practice minutes", value: 22, max: 30, tone: "var(--primary)" },
              { label: "Lessons completed", value: 3, max: 5, tone: "var(--accent-blue)" },
              { label: "Accuracy target", value: 96, max: 98, tone: "var(--success)" },
            ].map((g) => (
              <div key={g.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{g.label}</span>
                  <span className="font-semibold text-foreground">
                    {g.value}/{g.max}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, (g.value / g.max) * 100)}%`,
                      background: g.tone,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground">Achievement badges</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {badges.map((b) => (
            <GlassCard
              key={b.title}
              className={cn("flex items-center gap-4", !b.earned && "opacity-60")}
            >
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-2xl",
                  b.earned ? "text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
                style={b.earned ? { background: "var(--gradient-primary)" } : undefined}
              >
                <b.icon className="size-5" />
              </span>
              <div>
                <p className="font-hindi font-semibold text-foreground">{b.title}</p>
                <p className="font-hindi text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}