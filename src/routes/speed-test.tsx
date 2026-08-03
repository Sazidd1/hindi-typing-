import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shuffle } from "lucide-react";
import { TypingArena } from "@/components/typing/TypingArena";
import { SectionTitle } from "@/components/kit/GlassCard";
import { speedTexts } from "@/lib/typing-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/speed-test")({
  head: () => ({
    meta: [
      { title: "Hindi Speed Test — Measure Your WPM" },
      {
        name: "description",
        content:
          "Take a timed Hindi typing speed test in 30, 60 or 120 seconds and track your words per minute.",
      },
      { property: "og:title", content: "Hindi Typing Speed Test" },
      {
        property: "og:description",
        content: "Timed Hindi WPM tests with live stats and instant results.",
      },
    ],
  }),
  component: SpeedTestPage,
});

const durations = [30, 60, 120];

function SpeedTestPage() {
  const [duration, setDuration] = useState(60);
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Speed"
        title="Hindi speed test"
        subtitle="निर्धारित समय में अधिकतम शब्द टाइप करें और अपना WPM जानें।"
      />

      <div className="flex flex-wrap items-center gap-3">
        {durations.map((d) => (
          <button
            key={d}
            onClick={() => setDuration(d)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200",
              d === duration
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-glass)]"
                : "glass text-muted-foreground hover:text-foreground",
            )}
          >
            {d} sec
          </button>
        ))}
        <button
          onClick={() => setIndex((i) => (i + 1) % speedTexts.length)}
          className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-foreground"
        >
          <Shuffle className="size-4" /> New passage
        </button>
      </div>

      <TypingArena
        key={`${duration}-${index}`}
        text={speedTexts[index]!}
        title={`${duration} second speed test`}
        subtitle="गति परीक्षण"
        timeLimit={duration}
      />
    </div>
  );
}