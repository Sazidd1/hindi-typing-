import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { TypingArena } from "@/components/typing/TypingArena";
import { StoryReaderArena } from "@/components/typing/StoryReaderArena";
import { lessons } from "@/lib/typing-data";
import { typingStories } from "@/lib/typing-stories";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { generateFullPracticeSession } from "@/lib/full-practice-generator";
import { generateStoryPracticeSession } from "@/lib/story-generator";
import { generateExtendedPracticeSession } from "@/lib/extended-generator";
import { HINDI_RANDOM_WORDS } from "@/lib/random-words";
import { useLanguage } from "@/lib/useLanguage";

const searchSchema = z.object({
  lesson: z.string().optional(),
  story: z.string().optional(),
  limit: z.number().optional(),
  time: z.number().optional(),
  mode: z.string().optional(),
});

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
  const { isEnglish } = useLanguage();
  const { lesson, story, limit, time, mode } = Route.useSearch();

  const activeLesson = lesson ? lessons.find((l) => l.slug === lesson) : null;
  const activeStory = story ? typingStories.find((s) => s.slug === story) : null;

  if (story && !activeStory) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Story Not Found</h2>
        <p className="text-slate-600 mb-6">
          The typing test story you selected could not be found.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const active =
    activeStory ??
    activeLesson ??
    ((mode === "randomWords"
      ? {
          slug: "random-words",
          title: "Random Words",
          hindiTitle: isEnglish ? "Random Words Practice" : "रैंडम शब्द",
          description: "Random Words Practice",
          level: "Mixed",
          keys: "Mixed",
          minutes: time ?? 5,
          text: "",
        }
      : lessons[0]) as any);

  const [dynamicText, setDynamicText] = useState(active.text);

  useEffect(() => {
    let newText = active.text;

    if (mode === "randomWords") {
      const wordCount = limit && limit > 0 ? limit : 600;
      const words: string[] = [];
      while (words.length < wordCount) {
        const pass = [...HINDI_RANDOM_WORDS].sort(() => Math.random() - 0.5);
        words.push(...pass);
      }
      newText = words.slice(0, wordCount).join(" ");
    } else if (active.slug.startsWith("ch-full-practice")) {
      const session = generateFullPracticeSession(active.slug);

      let title = "Drill 1";
      if (active.slug === "ch-full-practice-2") title = "Drill 2";
      if (active.slug === "ch-full-practice-3") title = "Drill 3";

      console.log(
        `[${title}]\nUnique words: ${session.totalUniqueWords}\nCoverage: ${session.coveragePercentage}%`,
      );
      if (active.slug !== "ch-full-practice") {
        console.log(`[Full Practice Overlap]\noverlapCount: ${session.overlapCount}`);
      }
      newText = session.text;
    } else if (active.slug.startsWith("ch-story-practice")) {
      const storyId = active.slug === "ch-story-practice-1" ? 1 : 2;
      const session = generateStoryPracticeSession(storyId);

      const title = `Story Practice ${storyId}`;
      console.log(
        `[${title}]\nword count: ${session.totalWords}\ncharacter count: ${session.totalCharacters}\ncovered mappings: ${session.coveredTargets.length}\nremaining mappings: ${session.remainingTargets.length}\ncoverage percentage: ${session.coveragePercentage}%`,
      );

      newText = session.text;
    } else if (
      ["ch-news-practice", "ch-dialogue-practice", "ch-adventure-story"].includes(active.slug)
    ) {
      const session = generateExtendedPracticeSession(active.slug);

      let title = "";
      if (active.slug === "ch-news-practice") title = "News Practice";
      else if (active.slug === "ch-dialogue-practice") title = "Dialogue Practice";
      else if (active.slug === "ch-adventure-story") title = "Adventure Story";

      console.log(
        `[${title}]\nword count: ${session.totalWords}\ncharacter count: ${session.totalCharacters}\ncovered mappings: ${session.coveredTargets.length}\nremaining mappings: ${session.remainingTargets.length}\ncoverage percentage: ${session.coveragePercentage}%`,
      );

      newText = session.text;
    }

    if (limit && limit > 0) {
      newText = newText.split(" ").slice(0, limit).join(" ");
    }

    setDynamicText(newText);
  }, [active.slug, active.text, limit]);

  const [testDuration, setTestDuration] = useState(
    () => localStorage.getItem("settings_test_duration") || "60 sec",
  );
  useEffect(() => {
    const handleDuration = () =>
      setTestDuration(localStorage.getItem("settings_test_duration") || "60 sec");
    window.addEventListener("settings_test_duration_changed", handleDuration);
    return () => window.removeEventListener("settings_test_duration_changed", handleDuration);
  }, []);

  const isStoryMode = active.slug.startsWith("story-") || mode === "randomWords";
  const defaultSeconds = parseInt(testDuration) || 60;
  // Strictly respect user's selected default duration unless overridden by a specific URL 'time' param
  const finalTimeLimit = time ? time * 60 : defaultSeconds;

  return (
    <div className="w-full">
      {isStoryMode ? (
        <StoryReaderArena
          lessonSlug={active.slug}
          text={dynamicText}
          title={active.title}
          subtitle={active.hindiTitle}
          timeLimit={finalTimeLimit}
        />
      ) : (
        <TypingArena
          lessonSlug={active.slug}
          text={dynamicText}
          title={active.title}
          subtitle={active.hindiTitle}
          timeLimit={finalTimeLimit}
          isParagraphMode={
            active.title === "Word Practice" ||
            [
              "random-words",
              "ch11",
              "ch22",
              "ch23",
              "ch24",
              "ch35",
              "ch36",
              "ch37",
              "ch43",
              "ch44",
              "ch45",
              "ch-full-practice",
              "ch-full-practice-2",
              "ch-full-practice-3",
              "ch-story-practice-1",
              "ch-story-practice-2",
              "ch-news-practice",
              "ch-dialogue-practice",
              "ch-adventure-story",
            ].includes(active.slug)
          }
        />
      )}
    </div>
  );
}
