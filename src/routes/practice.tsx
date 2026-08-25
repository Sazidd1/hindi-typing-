import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { TypingArena } from "@/components/typing/TypingArena";
import { StoryReaderArena } from "@/components/typing/StoryReaderArena";
import { lessons } from "@/lib/typing-data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { generateFullPracticeSession } from "@/lib/full-practice-generator";
import { generateStoryPracticeSession } from "@/lib/story-generator";
import { generateExtendedPracticeSession } from "@/lib/extended-generator";

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
      
      let title = "Drill 1";
      if (active.slug === "ch-full-practice-2") title = "Drill 2";
      if (active.slug === "ch-full-practice-3") title = "Drill 3";
      
      console.log(`[${title}]\nUnique words: ${session.totalUniqueWords}\nCoverage: ${session.coveragePercentage}%`);
      if (active.slug !== "ch-full-practice") {
        console.log(`[Full Practice Overlap]\noverlapCount: ${session.overlapCount}`);
      }
      setDynamicText(session.text);
    } else if (active.slug.startsWith("ch-story-practice")) {
      const storyId = active.slug === "ch-story-practice-1" ? 1 : 2;
      const session = generateStoryPracticeSession(storyId);
      
      let title = `Story Practice ${storyId}`;
      console.log(`[${title}]\nword count: ${session.totalWords}\ncharacter count: ${session.totalCharacters}\ncovered mappings: ${session.coveredTargets.length}\nremaining mappings: ${session.remainingTargets.length}\ncoverage percentage: ${session.coveragePercentage}%`);
      
      setDynamicText(session.text);
    } else if (["ch-news-practice", "ch-dialogue-practice", "ch-adventure-story"].includes(active.slug)) {
      const session = generateExtendedPracticeSession(active.slug);
      
      let title = "";
      if (active.slug === "ch-news-practice") title = "News Practice";
      else if (active.slug === "ch-dialogue-practice") title = "Dialogue Practice";
      else if (active.slug === "ch-adventure-story") title = "Adventure Story";

      console.log(`[${title}]\nword count: ${session.totalWords}\ncharacter count: ${session.totalCharacters}\ncovered mappings: ${session.coveredTargets.length}\nremaining mappings: ${session.remainingTargets.length}\ncoverage percentage: ${session.coveragePercentage}%`);
      
      setDynamicText(session.text);
    } else {
      setDynamicText(active.text);
    }
  }, [active.slug, active.text]);

  const isStoryMode = active.slug.startsWith("story-");

  return (
    <div className="w-full">
      {isStoryMode ? (
        <StoryReaderArena 
          lessonSlug={active.slug}
          text={dynamicText} 
          title={active.title} 
          subtitle={active.hindiTitle} 
          timeLimit={active.minutes * 60}
        />
      ) : (
        <TypingArena 
          lessonSlug={active.slug}
          text={dynamicText} 
          title={active.title} 
          subtitle={active.hindiTitle} 
          timeLimit={active.minutes * 60}
          isParagraphMode={active.title === "Word Practice" || ["ch11", "ch22", "ch23", "ch24", "ch35", "ch36", "ch37", "ch43", "ch44", "ch45", "ch-full-practice", "ch-full-practice-2", "ch-full-practice-3", "ch-story-practice-1", "ch-story-practice-2", "ch-news-practice", "ch-dialogue-practice", "ch-adventure-story"].includes(active.slug)}
        />
      )}
    </div>
  );
}