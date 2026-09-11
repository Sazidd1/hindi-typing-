import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { BookOpen } from "lucide-react";
import { KrutiDevLessonCard } from "@/components/typing/KrutiDevLessonCard";
import { krutiDevLessons } from "@/lib/kruti-dev-typing-data";

export const Route = createFileRoute("/lessons_/kruti-dev/")({
  head: () => ({
    meta: [{ title: "Kruti Dev Typing Lessons" }],
  }),
  component: KrutiDevLessonsPage,
});

export const categories = ["All", "Home Row", "Top Row", "Bottom Row", "Mixed"];

// Filter out stories and full practices to keep it simple and strictly "lessons 1-80"
const standardLessons = krutiDevLessons.filter(
  (l) =>
    l.slug.match(/^kd-ch\d+$/) ||
    (l.slug.startsWith("kd-ch") && !l.slug.includes("practice") && !l.slug.includes("story")),
);

function KrutiDevLessonsPage() {
  const { currentUser } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [progressData, setProgressData] = useState<Record<string, any>>({});
  const [lockedLessonIntent, setLockedLessonIntent] = useState<any | null>(null);

  const loadProgress = useCallback(() => {
    if (!currentUser) return;
    const data: Record<string, any> = {};
    for (const l of standardLessons) {
      const saved = localStorage.getItem(`lesson_state_${currentUser}_${l.slug}`);
      if (saved) {
        try {
          data[l.slug] = JSON.parse(saved);
        } catch (e) {}
      }
    }
    setProgressData(data);
  }, [currentUser]);

  useEffect(() => {
    loadProgress();
    window.addEventListener("lessonProgressUpdated", loadProgress);
    return () => window.removeEventListener("lessonProgressUpdated", loadProgress);
  }, [loadProgress]);

  const extendedCurriculum = useMemo(() => {
    let previousLessonCompleted = true; // First lesson is always unlocked

    return standardLessons.map((baseItem) => {
      const saved = progressData[baseItem.slug] || { progress: 0, completed: false };

      const isLocked = !previousLessonCompleted;

      // Extract lesson number for the route
      const lessonId = baseItem.slug.replace("kd-ch", "");

      const item = {
        ...baseItem,
        type: "lesson",
        path: "/lessons/kruti-dev/$lessonId",
        params: { lessonId },
        icon: BookOpen,
        progress: saved.progress || 0,
        isCompleted: saved.completed || false,
        isLocked,
      };

      previousLessonCompleted = item.isCompleted;
      return item;
    });
  }, [progressData]);

  const displayedLessons = useMemo(() => {
    if (activeCategory === "All") return extendedCurriculum;
    return extendedCurriculum.filter((l) => l.description === activeCategory);
  }, [activeCategory, extendedCurriculum]);

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2 flex items-center gap-3">
              Kruti Dev Lessons
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 text-sm font-bold tracking-normal uppercase border border-indigo-200 dark:border-indigo-500/30">
                Isolated
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
              Structured Kruti Dev typing curriculum.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white/50 dark:bg-[#111827]/50 p-2 rounded-2xl border border-slate-200/50 dark:border-white/5 backdrop-blur-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20 scale-105"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedLessons.map((item) => (
            <KrutiDevLessonCard
              key={item.slug}
              item={item as any}
              setLockedLessonIntent={() => setLockedLessonIntent(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
