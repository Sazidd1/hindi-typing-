import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarDays, Gauge, MapPin, Target, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { StatCard } from "@/components/kit/StatCard";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Typist Profile — Hindi Typing Abhyas Studio" },
    ],
  }),
  component: ProfilePage,
});

type ResultRecord = { date: string; wpm: string | number; acc: string };

function ProfilePage() {
  const { currentUser, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ResultRecord[]>([]);

  useEffect(() => {
    if (isLoaded && !currentUser) {
      navigate({ to: "/login" });
      return;
    }
    
    if (currentUser) {
      const stored = localStorage.getItem("results_" + currentUser);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setHistory(parsed);
        } catch (e) {
          console.error("Failed to parse results");
        }
      }
    }
  }, [currentUser, isLoaded, navigate]);

  if (!isLoaded || !currentUser) {
    return null; // or loading spinner
  }

  const bestWpm = history.length > 0 
    ? Math.max(...history.map(h => parseInt(String(h.wpm).replace(' WPM', '')) || 0))
    : 0;
    
  const bestAcc = history.length > 0 
    ? Math.max(...history.map(h => parseInt(String(h.acc).replace('%', '')) || 0))
    : 0;

  return (
    <div className="space-y-10">
      <SectionTitle eyebrow="Account" title="Your profile" />

      <GlassCard hover={false} className="flex flex-col gap-6 md:flex-row md:items-center">
        <span
          className="flex size-20 items-center justify-center rounded-3xl font-bold text-4xl text-primary-foreground uppercase"
          style={{ background: "var(--gradient-primary)" }}
        >
          {currentUser[0]}
        </span>
        <div className="flex-1">
          <h2 className="font-hindi text-2xl font-semibold text-foreground">{currentUser}</h2>
          <p className="text-sm text-muted-foreground">Local Typist</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" /> Account Active
            </span>
            <span className="inline-flex items-center gap-1.5 text-primary">
              <Trophy className="size-4" /> Tests: {history.length}
            </span>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-3">
        <StatCard icon={Gauge} label="Best WPM" value={bestWpm} />
        <StatCard icon={Target} label="Best accuracy" value={bestAcc} suffix="%" tone="success" />
        <StatCard icon={Trophy} label="Tests taken" value={history.length} tone="muted" />
      </div>

      <GlassCard hover={false} className="p-0">
        <div className="border-b border-border px-6 py-4">
          <h3 className="text-lg font-semibold text-foreground">Recent activity</h3>
        </div>
        <div className="divide-y divide-border/60">
          {history.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No recent activity found. Start typing!
            </div>
          ) : (
            history.map((h, i) => (
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
                  <span className="text-success tabular-nums">{h.acc}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
}