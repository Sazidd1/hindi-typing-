import { createFileRoute, Link } from "@tanstack/react-router";
import { KrutiDevTypingArena } from "@/components/typing/KrutiDevTypingArena";
import { krutiDevLessons } from "@/lib/kruti-dev-typing-data";

export const Route = createFileRoute("/lessons_/kruti-dev_/$lessonId")({
  head: () => ({
    meta: [
      { title: "Kruti Dev Typing Practice Area" },
    ],
  }),
  component: KrutiDevPracticePage,
});

function KrutiDevPracticePage() {
  const { lessonId } = Route.useParams();
  
  // E.g., if lessonId is "1", we map it to "kd-ch1"
  const slug = `kd-ch${lessonId}`;
  
  const activeLesson = krutiDevLessons.find((l) => l.slug === slug);

  if (!activeLesson) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Lesson Not Found</h2>
        <p className="text-slate-600 mb-6">The Kruti Dev lesson you selected could not be found.</p>
        <Link to="/lessons/kruti-dev" className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
          Return to Kruti Dev Lessons
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <KrutiDevTypingArena 
        lessonSlug={activeLesson.slug}
        title={activeLesson.title}
        subtitle={activeLesson.description}
        text={activeLesson.text}
        timeLimit={activeLesson.minutes * 60}
      />
    </div>
  );
}
