import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { TypingArena } from "@/components/typing/TypingArena";
import { lessons } from "@/lib/typing-data";
import { cn } from "@/lib/utils";

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

  return (
    <div className="w-full">
      <TypingArena 
        lessonSlug={active.slug}
        text={active.text} 
        title={active.title} 
        subtitle={active.hindiTitle} 
        isParagraphMode={["ch11", "ch22", "ch23", "ch24", "ch35"].includes(active.slug)}
      />
    </div>
  );
}