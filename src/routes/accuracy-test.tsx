import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { TypingArena } from "@/components/typing/TypingArena";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { accuracyTexts } from "@/lib/typing-data";

export const Route = createFileRoute("/accuracy-test")({
  head: () => ({
    meta: [
      { title: "Hindi Accuracy Test — Type Without Errors" },
      {
        name: "description",
        content:
          "Untimed Hindi accuracy test that tracks every mistyped character so you can build error-free typing habits.",
      },
      { property: "og:title", content: "Hindi Typing Accuracy Test" },
      {
        property: "og:description",
        content: "Focus on precision with character-level error tracking in Hindi.",
      },
    ],
  }),
  component: AccuracyTestPage,
});

function AccuracyTestPage() {
  const [index, setIndex] = useState(0);

  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Precision"
        title="Accuracy test"
        subtitle="बिना समय दबाव के शुद्धता पर ध्यान दें — हर त्रुटि गिनी जाती है।"
      />

      <GlassCard hover={false} className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-success/10 text-success">
            <ShieldCheck className="size-5" />
          </span>
          <p className="font-hindi text-sm text-muted-foreground">
            लक्ष्य: 98% या उससे अधिक शुद्धता।
          </p>
        </div>
        <button
          onClick={() => setIndex((i) => (i + 1) % accuracyTexts.length)}
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          Change passage
        </button>
      </GlassCard>

      <TypingArena
        key={index}
        text={accuracyTexts[index]!}
        title="Accuracy challenge"
        subtitle="शुद्धता परीक्षण"
      />
    </div>
  );
}