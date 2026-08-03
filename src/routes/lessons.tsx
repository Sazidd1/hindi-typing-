import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  CheckCircle
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

const extendedCurriculum = [
  ...lessons.map((l) => ({
    ...l,
    type: "lesson",
    path: "/practice",
    search: { lesson: l.slug },
    icon: BookOpen,
    progress: 0,
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
    progress: 0,
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
    progress: 0,
  }
];

const categories = ["All", "Home Row", "Top Row", "Bottom Row", "Mixed", "Tests"];

function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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
            <div className="relative p-7 sm:p-9 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                    <Flame className="size-3.5" /> Daily Challenge
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">+50 XP</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{dailyChallenge.title}</h3>
                <p className="text-primary font-hindi text-lg font-semibold mb-3">{dailyChallenge.hindiTitle}</p>
                <p className="text-muted-foreground font-hindi text-sm max-w-md">{dailyChallenge.description}</p>
              </div>
              
              <div className="mt-8">
                <Link
                  to={dailyChallenge.path as any}
                  search={dailyChallenge.search as any}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
                >
                  Accept Challenge <Play className="size-4 fill-current" />
                </Link>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="group relative overflow-hidden border-accent-blue/20 p-0">
            <div className="relative p-7 sm:p-9 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 rounded-full bg-accent-blue/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-blue">
                    <Star className="size-3.5" /> Recommended
                  </span>
                </div>
                <div className="flex items-start gap-5">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
                    <Keyboard className="size-7" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{recommendedLesson.title}</h3>
                    <p className="text-muted-foreground font-hindi text-sm mt-1.5">{recommendedLesson.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-5">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs font-bold tracking-wide uppercase">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{recommendedLesson.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div 
                      className="h-full bg-accent-blue transition-all duration-1000 ease-out rounded-full"
                      style={{ width: `${recommendedLesson.progress}%` }}
                    />
                  </div>
                </div>
                
                <Link
                  to={recommendedLesson.path as any}
                  search={recommendedLesson.search as any}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground transition-all hover:bg-foreground hover:text-background"
                >
                  Continue Learning <ArrowRight className="size-4" />
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
            className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-foreground text-background shadow-md"
                : "bg-white/60 text-muted-foreground hover:bg-white/90 hover:text-foreground dark:bg-black/20 dark:hover:bg-black/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 animate-rise-in" style={{ animationDelay: "200ms" }}>
        {filteredItems.map((item, i) => {
          const Icon = item.icon;
          const isCompleted = item.progress === 100;
          
          return (
            <GlassCard key={item.slug} className="group flex h-full flex-col p-6 hover:border-primary/40">
              <div className="flex items-start justify-between">
                <div 
                  className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${
                    isCompleted 
                      ? "bg-success/15 text-success" 
                      : "bg-gradient-to-br from-primary to-accent-blue text-primary-foreground shadow-lg shadow-primary/20"
                  }`}
                >
                  {isCompleted ? <CheckCircle className="size-7" /> : <Icon className="size-7" />}
                </div>
                
                <div className="flex flex-col items-end gap-2.5">
                  <span className={`rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    item.level === "शुरुआती" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" :
                    item.level === "मध्यम" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400" :
                    "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                  }`}>
                    {item.level}
                  </span>
                  {item.type === "lesson" && (
                    <span className="text-xs font-bold text-muted-foreground">
                      Module {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="font-hindi text-[15px] font-semibold text-primary mb-2.5">{item.hindiTitle}</p>
                <p className="font-hindi text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-7 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5">
                  ⏱ {item.minutes} min
                </span>
                <span className="flex items-center gap-1.5 rounded-lg bg-secondary/60 px-2.5 py-1.5 font-hindi">
                  ⌨ {item.keys}
                </span>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                  <span className="text-muted-foreground">Completion</span>
                  <span className={isCompleted ? "text-success" : "text-foreground"}>{item.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      isCompleted ? "bg-success" : "bg-primary"
                    }`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-7">
                <Link
                  to={item.path as any}
                  search={item.search as any}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                    isCompleted
                      ? "bg-success/10 text-success hover:bg-success/20"
                      : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-[0_8px_16px_-6px_var(--color-primary)] hover:-translate-y-0.5"
                  }`}
                >
                  {isCompleted ? "Practice Again" : item.progress > 0 ? "Continue Lesson" : "Start Lesson"} 
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </GlassCard>
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
    </div>
  );
}