import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { TypingArena } from "@/components/typing/TypingArena";
import { lessons } from "@/lib/typing-data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { generateFullPracticeSession } from "@/lib/full-practice-generator";

const searchSchema = z.object({ lesson: z.string().optional() });

export const Route = createFileRoute("/practice")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Hindi Typing Practice Area — Abhyas Studio" },
      {
        name: "description",
        content:
          "Practice Hindi typing with highlighted characters, live WPM, accuracy, errors, timer and a virtual Remington keyboard.",
      },
      { property: "og:title", content: "Hindi Typing Practice Area" },
      {
        property: "og:description",
        content: "Live WPM, accuracy, error count and animated Hindi keyboard guidance.",
      },
    ],
  }),
  component: PracticePage,
});

function PracticePage() {
  const { lesson } = Route.useSearch();
  const active = lessons.find((l) => l.slug === lesson) ?? lessons[0]!;

  const [dynamicText, setDynamicText] = useState(active.text);

  useEffect(() => {
    if (active.slug.startsWith("ch-full-practice")) {
      const session = generateFullPracticeSession(active.slug);
      
      let title = "Full Practice";
      if (active.slug === "ch-full-practice-2") title = "Full Practice 2";
      if (active.slug === "ch-full-practice-3") title = "Full Practice 3";
      
      console.log(`[${title}]\nUnique words: ${session.totalUniqueWords}\nCoverage: ${session.coveragePercentage}%`);
      if (active.slug !== "ch-full-practice") {
        console.log(`[Full Practice Overlap]\noverlapCount: ${session.overlapCount}`);
      }
      
      setDynamicText(session.text);
    } else {
      setDynamicText(active.text);
    }
  }, [active.slug, active.text]);

  return (
    <div className="w-full">
      <TypingArena 
        lessonSlug={active.slug}
        text={dynamicText} 
        title={active.title} 
        subtitle={active.hindiTitle} 
        timeLimit={active.minutes * 60}
        isParagraphMode={active.title === "Word Practice" || ["ch11", "ch22", "ch23", "ch24", "ch35", "ch36", "ch37", "ch43", "ch44", "ch45", "ch-full-practice", "ch-full-practice-2", "ch-full-practice-3"].includes(active.slug)}
      />
    </div>
  );
}