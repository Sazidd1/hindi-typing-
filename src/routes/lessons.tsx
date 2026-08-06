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
  Lock
} from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { lessons } from "@/lib/typing-data";

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
  {
    slug: "speed-test",
    title: "Speed Test",
    hindiTitle: "गति परीक्षण",
    description: "Tests",
    level: "उन्नत",
    keys: "पूर्ण कीबोर्ड",
    minutes: 5,
    type: "test",
    path: "/practice", // Or /speed-test if that route exists
    search: { lesson: "speed-test" },
    icon: Zap,
  },
  {
    slug: "accuracy-test",
    title: "Accuracy Test",
    hindiTitle: "शुद्धता परीक्षण",
    description: "Tests",
    level: "उन्नत",
    keys: "पूर्ण कीबोर्ड",
    minutes: 5,
    type: "test",
    path: "/practice", // Or /accuracy-test
    search: { lesson: "accuracy-test" },
    icon: Target,
  }
];

const categories = ["All", "Home Row", "Top Row", "Bottom Row", "Mixed", "Tests"];

function LessonsPage() {
  const { currentUser } = useAuth();
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
         try { data[l.slug] = JSON.parse(saved); } catch (e) {}
       }
    }
    setProgressData(data);
  }, [currentUser]);

  useEffect(() => {
    loadProgress();
    window.addEventListener('lessonProgressUpdated', loadProgress);
    return () => window.removeEventListener('lessonProgressUpdated', loadProgress);
  }, [loadProgress]);

  const extendedCurriculum = useMemo(() => {
    let previousLessonCompleted = true; // First lesson is always unlocked
    
    return extendedCurriculumBase.map((baseItem) => {
      const saved = progressData[baseItem.slug] || { progress: 0, completed: false };
      
      const isTest = baseItem.type === "test";
      const isLocked = !isTest && !previousLessonCompleted;
      
      const item = {
        ...baseItem,
        progress: saved.progress || 0,
        isCompleted: saved.completed || false,
        isLocked,
      };

      if (!isTest) {
        previousLessonCompleted = item.isCompleted;
      }
      
      return item;
    });
  }, [progressData]);

  const filteredItems = extendedCurriculum.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === "All" || 
      item.description === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const dailyChallenge = extendedCurriculum.find(l => l.slug === "ch11") || extendedCurriculum[10] || extendedCurriculum[0];
  const recommendedLesson = extendedCurriculum.find(l => l.slug === "ch22") || extendedCurriculum[21] || extendedCurriculum[0];

  return (
    <div className="space-y-12 pb-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between animate-rise-in">
        <SectionTitle
          eyebrow="Curriculum"
          title="Learning Center"
          subtitle="हर पाठ आपको अगले स्तर के लिए तैयार करता है — क्रम से अभ्यास करें।"
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
        <div className="grid gap-6 lg:grid-cols-2 animate-rise-in" style={{ animationDelay: "100ms" }}>
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
                    ⏱ {dailyChallenge.minutes}m
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 leading-tight">{dailyChallenge.title}</h3>
                <p className="text-primary font-hindi text-base font-bold mb-1.5 leading-tight">{dailyChallenge.hindiTitle}</p>
                <p className="text-muted-foreground font-hindi text-[12px] max-w-md line-clamp-2 leading-snug">{dailyChallenge.description}</p>
              </div>
              
              <div className="mt-4">
                <Link
                  to={dailyChallenge.path as any}
                  search={dailyChallenge.search as any}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-[12px] font-bold text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  Accept Challenge <Play className="size-3.5 fill-current" />
                </Link>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="group relative overflow-hidden border-accent-blue/20 p-0">
            <div className="relative p-4 sm:p-5 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1 rounded-full bg-accent-blue/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-blue">
                    <Star className="size-3" /> Recommended
                  </span>
                  <span className="flex items-center gap-1 bg-white/40 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-none">
                    ⏱ {recommendedLesson.minutes}m
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-blue/10 text-accent-blue">
                    <Keyboard className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">{recommendedLesson.title}</h3>
                    <p className="text-muted-foreground font-hindi text-[12px] mt-0.5 line-clamp-2 leading-snug">{recommendedLesson.description}</p>
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-[12px] font-bold text-secondary-foreground transition-all hover:bg-foreground hover:text-background shadow-sm"
                >
                  Continue Learning <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none animate-rise-in" style={{ animationDelay: "150ms" }}>
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

      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 animate-rise-in" style={{ animationDelay: "200ms" }}>
        {filteredItems.map((item, i) => {
          const Icon = item.icon;
          const isCompleted = item.progress === 100;
          
          return (
            <div key={item.slug} className="group flex flex-col p-3 sm:p-3.5 rounded-[22px] bg-gradient-to-br from-[#EAF6FF] to-[#E0F2FE] border border-white/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-[2px]">
              <div className="flex items-center justify-between">
                <div 
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                    isCompleted 
                      ? "bg-green-100 text-green-600" 
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {isCompleted ? <CheckCircle className="size-3.5" /> : <Icon className="size-3.5" />}
                </div>
                
                <span className="shrink-0 rounded-full px-2.5 py-[3px] text-[9px] font-bold uppercase tracking-wider leading-none bg-emerald-100/80 text-emerald-700">
                  {item.level}
                </span>
              </div>
              
              <div className="mt-1.5 flex-1 flex flex-col">
                <h3 className="text-[13px] font-bold text-slate-800 transition-colors line-clamp-1 leading-snug">{item.title}</h3>
                <p className="font-hindi text-[22px] sm:text-[25px] font-extrabold text-blue-600 leading-tight line-clamp-1 mt-0.5">{item.hindiTitle}</p>
                <p className="font-hindi text-[11px] text-slate-500 line-clamp-1 leading-snug mt-1">{item.description}</p>
              </div>

              <div className="mt-1.5 flex flex-wrap text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span className="flex items-center gap-1 bg-white/40 px-2 py-1 rounded-md leading-none">
                  ⏱ {item.minutes}m
                </span>
              </div>

              <div className="mt-1.5 space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider items-center leading-none">
                  <span className="text-slate-400">Progress</span>
                  <span className={isCompleted ? "text-green-600" : "text-slate-700"}>{item.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/15">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isCompleted ? "bg-green-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-1.5">
                {item.isLocked ? (
                  <button 
                    onClick={() => setLockedLessonIntent(item)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-bold leading-none transition-colors bg-slate-200 text-slate-500 hover:bg-slate-300 shadow-sm"
                  >
                    <span>Start Lesson</span>
                    <Lock className="size-3.5" />
                  </button>
                ) : (
                  <Link
                    to={item.path as any}
                    search={item.search as any}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-bold leading-none transition-colors ${
                      isCompleted
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                    }`}
                  >
                    <span>{isCompleted ? "Practice Again" : item.progress > 0 ? "Continue" : "Start Lesson"}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-rise-in">
          <div className="flex size-24 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <Search className="size-12" />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-foreground">No lessons found</h3>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or category filters.</p>
        </div>
      )}

      {/* Lesson Locked Modal */}
      {lockedLessonIntent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 transition-all duration-200 animate-in fade-in"
          onClick={() => setLockedLessonIntent(null)}
        >
          <div 
            className="w-[90%] max-w-[400px] bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Lock className="size-5 text-slate-400" />
              Lesson Locked
            </h3>
            
            <div className="mt-4 space-y-3 text-[14px] text-slate-600 font-medium leading-snug">
              <p>Complete the previous chapter first to follow the recommended learning path.</p>
              <p>You can still continue if you prefer.</p>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button 
                onClick={() => setLockedLessonIntent(null)}
                className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Go Back
              </button>
              <Link
                to={lockedLessonIntent.path as any}
                search={lockedLessonIntent.search as any}
                onClick={() => setLockedLessonIntent(null)}
                className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
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