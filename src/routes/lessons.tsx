import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import {
  ArrowRight,
  BookOpen,
  Search,
  Play,
  Target,
  Flame,
  Keyboard,
  Star,
  Zap,
  CheckCircle,
  Lock,
} from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { LessonCard } from "@/components/typing/LessonCard";
import { useTestDurationDisplay } from "@/lib/useTestDuration";
import { lessons } from "@/lib/typing-data";
import { generateDailyChallenge } from "@/lib/daily-challenge";
import { useLanguage } from "@/lib/useLanguage";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: [
      { title: "Hindi Typing Lessons — Home Row to Exam Practice" },
      {
        name: "description",
        content:
          "Seven structured Hindi typing lessons: home row, upper row, lower row, numbers, symbols, paragraphs and exam practice.",
      },
      { property: "og:title", content: "Hindi Typing Lessons" },
      {
        property: "og:description",
        content: "Structured Hindi typing curriculum from home row to exam-level practice.",
      },
    ],
  }),
  component: LessonsPage,
});

const extendedCurriculumBase = [
  ...lessons.map((l) => ({
    ...l,
    type: "lesson",
    path: "/practice",
    search: { lesson: l.slug },
    icon: BookOpen,
  })),
];

export const categories = ["All", "Home Row", "Top Row", "Bottom Row", "Mixed", "Tests"];

function LessonsPage() {
  const { isEnglish } = useLanguage();
  const { currentUser } = useAuth();
  const displayDuration = useTestDurationDisplay();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [progressData, setProgressData] = useState<Record<string, any>>({});
  const [lockedLessonIntent, setLockedLessonIntent] = useState<any | null>(null);

  const loadProgress = useCallback(() => {
    if (!currentUser) return;
    const data: Record<string, any> = {};
    for (const l of extendedCurriculumBase) {
      const saved = localStorage.getItem(`lesson_state_${currentUser}_${l.slug}`);
      if (saved) {
        try {
          data[l.slug] = JSON.parse(saved);
        } catch (e) {}
      }
    }
    const savedDaily = localStorage.getItem(`lesson_state_${currentUser}_daily-challenge`);
    if (savedDaily) {
      try {
        data["daily-challenge"] = JSON.parse(savedDaily);
      } catch (e) {}
    }
    setProgressData(data);
  }, [currentUser]);

  useEffect(() => {
    loadProgress();
    window.addEventListener("lessonProgressUpdated", loadProgress);
    return () => window.removeEventListener("lessonProgressUpdated", loadProgress);
  }, [loadProgress]);

  const extendedCurriculum = useMemo(() => {
    return extendedCurriculumBase.map((baseItem) => {
      const saved = progressData[baseItem.slug] || { progress: 0, completed: false };

      const item = {
        ...baseItem,
        progress: saved.progress || 0,
        isCompleted: saved.completed || false,
        isLocked: false,
      };

      return item;
    });
  }, [progressData]);

  const filteredItems = extendedCurriculum.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === "All" || item.description === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const dailyChallenge = useMemo(() => {
    if (!currentUser) {
      const fallback =
        extendedCurriculum.find((l) => l.slug === "ch11") ||
        extendedCurriculum[10] ||
        extendedCurriculum[0];
      return { ...fallback, isLocked: false };
    }
    const challengeLesson = generateDailyChallenge(currentUser, progressData);
    const saved = progressData[challengeLesson.slug] || { progress: 0, completed: false };
    return {
      ...challengeLesson,
      type: "lesson",
      path: "/practice",
      search: { lesson: challengeLesson.slug },
      icon: Flame,
      progress: saved.progress || 0,
      isCompleted: saved.completed || false,
      isLocked: false,
    };
  }, [currentUser, progressData, extendedCurriculum]);

  const recommendedLesson = useMemo(() => {
    const nextUnfinished = extendedCurriculum.find(
      (l) => !l.isLocked && !l.isCompleted && l.type !== "test",
    );
    if (nextUnfinished) return nextUnfinished;

    const testOrMixed = extendedCurriculum.find((l) => l.slug === "ch22");
    return testOrMixed || extendedCurriculum[0];
  }, [extendedCurriculum]);

  return (
    <div className="space-y-12 pb-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between animate-rise-in">
        <SectionTitle
          eyebrow="Curriculum"
          title="Learning Center"
          subtitle={isEnglish ? "Every lesson prepares you for the next level — practice in order." : "हर पाठ आपको अगले स्तर के लिए तैयार करता है — क्रम से अभ्यास करें।"}
        />

        <div className="relative w-full md:w-72">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="h-11 w-full rounded-full border border-border bg-white/50 pl-10 pr-4 text-sm outline-none backdrop-blur-md transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:bg-black/20"
            placeholder="Search lessons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {searchQuery === "" && activeCategory === "All" && (
        <div
          className="grid gap-6 lg:grid-cols-2 animate-rise-in"
          style={{ animationDelay: "100ms" }}
        >
          <GlassCard className="group relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent-blue/5 border-primary/20 p-0">
            <div className="absolute inset-0 bg-surface-grid opacity-40"></div>
            <div className="relative p-4 sm:p-5 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                      <Flame className="size-3" /> Daily Challenge
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground">+50 XP</span>
                  </div>
                  <span className="flex items-center gap-1 bg-white/40 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-none">
                    ⏱ {displayDuration}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 leading-tight">
                  {dailyChallenge.title}
                </h3>
                <p className="text-primary font-hindi text-base font-bold mb-1.5 leading-tight">
                  {dailyChallenge.hindiTitle}
                </p>
                <p className="text-muted-foreground font-hindi text-[12px] max-w-md line-clamp-2 leading-snug">
                  {dailyChallenge.description}
                </p>
              </div>

              <div className="mt-4">
                <Link
                  to={dailyChallenge.path as any}
                  search={dailyChallenge.search as any}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-[12px] font-bold text-white shadow-sm hover:bg-blue-700 transition-all"
                >
                  Accept Challenge <Play className="size-3.5 fill-current" />
                </Link>
              </div>
            </div>
          </GlassCard>

          {recommendedLesson && (
            <GlassCard className="group relative overflow-hidden border-accent-blue/20 p-0">
              <div className="relative p-4 sm:p-5 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1 rounded-full bg-accent-blue/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-blue">
                      <Star className="size-3" /> Recommended
                    </span>
                    <span className="flex items-center gap-1 bg-white/40 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-none">
                      ⏱ {displayDuration}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                      <Keyboard className="size-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                        {recommendedLesson.title}
                      </h3>
                      <p className="text-muted-foreground font-hindi text-[12px] mt-0.5 line-clamp-2 leading-snug">
                        {recommendedLesson.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold tracking-wide uppercase items-center leading-none">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-foreground">{recommendedLesson.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-accent-blue transition-all duration-1000 ease-out rounded-full"
                        style={{ width: `${recommendedLesson.progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    to={recommendedLesson.path as any}
                    search={recommendedLesson.search as any}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[12px] font-bold text-white transition-all hover:bg-blue-700 shadow-sm"
                  >
                    Continue Learning <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      )}

      <div
        className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none animate-rise-in"
        style={{ animationDelay: "150ms" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-foreground text-background shadow-md"
                : "bg-white/60 text-muted-foreground hover:bg-white/90 hover:text-foreground dark:bg-black/20 dark:hover:bg-black/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 animate-rise-in"
        style={{ animationDelay: "200ms" }}
      >
        {filteredItems.map((item) => (
          <LessonCard key={item.slug} item={item} setLockedLessonIntent={setLockedLessonIntent} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-rise-in">
          <div className="flex size-24 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <Search className="size-12" />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-foreground">No lessons found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your search or category filters.
          </p>
        </div>
      )}

      {/* Lesson Locked Modal */}
      {lockedLessonIntent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 transition-all duration-200 animate-in fade-in"
          onClick={() => setLockedLessonIntent(null)}
        >
          <div
            className="w-[90%] max-w-[400px] bg-background border border-border rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.18)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Lock className="size-5 text-muted-foreground" />
              Lesson Locked
            </h3>

            <div className="mt-4 space-y-3 text-[14px] text-muted-foreground font-medium leading-snug">
              <p>Complete the previous lesson first to follow the recommended learning path.</p>
              <p>You can still continue if you prefer.</p>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                onClick={() => setLockedLessonIntent(null)}
                className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-muted-foreground bg-secondary hover:bg-secondary/80 transition-colors"
              >
                Go Back
              </button>
              <Link
                to={lockedLessonIntent.path as any}
                search={lockedLessonIntent.search as any}
                onClick={() => setLockedLessonIntent(null)}
                className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm"
              >
                Continue Anyway
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
