import { createFileRoute } from "@tanstack/react-router";
import { Crown, Medal, Trophy } from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Hindi Typing Leaderboard — Top Typists" },
      {
        name: "description",
        content:
          "See the fastest Hindi typists this week ranked by words per minute, accuracy and practice consistency.",
      },
      { property: "og:title", content: "Hindi Typing Leaderboard" },
      {
        property: "og:description",
        content: "Weekly ranking of the fastest and most accurate Hindi typists.",
      },
    ],
  }),
  component: LeaderboardPage,
});

const players = [
  { name: "आरव शर्मा", city: "जयपुर", wpm: 68, acc: 99, tests: 142 },
  { name: "मीरा वर्मा", city: "इंदौर", wpm: 64, acc: 98, tests: 128 },
  { name: "कबीर सिंह", city: "लखनऊ", wpm: 61, acc: 97, tests: 119 },
  { name: "सान्वी गुप्ता", city: "पटना", wpm: 58, acc: 98, tests: 110 },
  { name: "रोहन मिश्रा", city: "भोपाल", wpm: 55, acc: 96, tests: 104 },
  { name: "अन्विता राव", city: "पुणे", wpm: 53, acc: 97, tests: 96 },
  { name: "देव पटेल", city: "सूरत", wpm: 51, acc: 95, tests: 88 },
  { name: "इशा नायर", city: "कोच्चि", wpm: 49, acc: 96, tests: 81 },
];

const podiumIcons = [Crown, Trophy, Medal];

function LeaderboardPage() {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Community"
        title="Weekly leaderboard"
        subtitle="इस सप्ताह के सबसे तेज़ और सटीक टाइपिस्ट।"
      />

      <div className="grid gap-5 md:grid-cols-3">
        {players.slice(0, 3).map((p, i) => {
          const Icon = podiumIcons[i]!;
          return (
            <GlassCard
              key={p.name}
              className={cn("text-center", i === 0 && "md:-translate-y-3 md:scale-105")}
            >
              <span
                className="mx-auto flex size-12 items-center justify-center rounded-2xl text-primary-foreground"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Icon className="size-6" />
              </span>
              <p className="mt-4 font-hindi text-lg font-semibold text-foreground">{p.name}</p>
              <p className="font-hindi text-sm text-muted-foreground">{p.city}</p>
              <p className="mt-4 text-3xl font-semibold text-primary">{p.wpm}</p>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">WPM</p>
              <p className="mt-2 text-sm text-success">{p.acc}% accuracy</p>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard hover={false} className="overflow-x-auto p-0">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Typist</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">WPM</th>
              <th className="px-6 py-4">Accuracy</th>
              <th className="px-6 py-4">Tests</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, i) => (
              <tr
                key={p.name}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-white/60"
              >
                <td className="px-6 py-4 font-semibold text-primary">#{i + 1}</td>
                <td className="px-6 py-4 font-hindi font-medium text-foreground">{p.name}</td>
                <td className="px-6 py-4 font-hindi text-muted-foreground">{p.city}</td>
                <td className="px-6 py-4 font-semibold tabular-nums">{p.wpm}</td>
                <td className="px-6 py-4 text-success tabular-nums">{p.acc}%</td>
                <td className="px-6 py-4 text-muted-foreground tabular-nums">{p.tests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}