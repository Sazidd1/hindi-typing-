import { createFileRoute, Link } from "@tanstack/react-router";
import { EnglishTypingArena } from "@/components/typing/EnglishTypingArena";
import { englishLessons } from "@/lib/english-typing-data";

export const Route = createFileRoute("/english-lessons_/$lessonId")({
  head: () => ({
    meta: [{ title: "English Typing Practice" }],
  }),
  component: EnglishPracticePage,
});

function EnglishPracticePage() {
  const { lessonId } = Route.useParams();

  const slug = lessonId; // from route e.g. /english-lessons/eng-ch1

  const activeLesson = englishLessons.find((l) => l.slug === slug);

  if (!activeLesson) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Lesson Not Found</h2>
        <p className="text-slate-600 mb-6">The English lesson you selected could not be found.</p>
        <Link
          to="/english-lessons"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Return to English Lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <EnglishTypingArena
        lessonSlug={activeLesson.slug}
        title={activeLesson.englishTitle || activeLesson.title}
        subtitle={activeLesson.description}
        text={activeLesson.text}
        timeLimit={activeLesson.minutes * 60}
        isParagraphMode={["eng-ch11", "eng-ch22", "eng-ch23", "eng-ch24", "eng-ch25", "eng-ch36", "eng-ch37", "eng-ch38", "eng-ch39", "eng-ch41", "eng-ch43", "eng-ch45", "eng-ch46", "eng-ch47", "eng-ch48", "eng-ch52", "eng-ch53", "eng-ch54", "eng-ch55", "eng-ch56", "eng-ch57", "eng-ch58", "eng-ch59", "eng-ch60"].includes(activeLesson.slug)}
      />
    </div>
  );
}
