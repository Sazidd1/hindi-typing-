import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { ArrowRight, CheckCircle } from "lucide-react";
import { englishLessons } from "@/lib/english-typing-data";

export const Route = createFileRoute("/english-lessons")({
  head: () => ({
    meta: [{ title: "English Typing Lessons" }],
  }),
  component: EnglishLessonsPage,
});

const themeColors = [
  {
    bg: "bg-[#F472B6]",
    gradient: "bg-gradient-to-r from-[#818CF8] via-[#C084FC] to-[#F472B6]",
    text: "text-[#F472B6]",
    lightBg: "bg-[#F472B6]/15",
    btnText: "text-slate-900",
  },
  {
    bg: "bg-[#60A5FA]",
    gradient: "bg-gradient-to-r from-[#34D399] to-[#60A5FA]",
    text: "text-[#60A5FA]",
    lightBg: "bg-[#60A5FA]/15",
    btnText: "text-slate-900",
  },
  {
    bg: "bg-[#34D399]",
    gradient: "bg-gradient-to-r from-[#FCD34D] to-[#34D399]",
    text: "text-[#34D399]",
    lightBg: "bg-[#34D399]/15",
    btnText: "text-slate-900",
  },
  {
    bg: "bg-[#FBBF24]",
    gradient: "bg-gradient-to-r from-[#F472B6] to-[#FBBF24]",
    text: "text-[#FBBF24]",
    lightBg: "bg-[#FBBF24]/15",
    btnText: "text-slate-900",
  },
];

const filters = [
  { label: "All", id: "All", icon: "" },
  { label: "Home Row", id: "Home Row", icon: "🏠" },
  { label: "Top Row", id: "Top Row", icon: "⬆️" },
  { label: "Bottom Row", id: "Bottom Row", icon: "⬇️" },
  { label: "Mixed", id: "Mixed", icon: "🔀" },
  { label: "Completed", id: "Completed", icon: "✅" },
  { label: "In Progress", id: "In Progress", icon: "🔥" },
];

function EnglishLessonCard({ item, themeIdx }: { item: any; themeIdx: number }) {
  const isCompleted = item.progress === 100;
  const progress = item.progress || 0;
  const navigate = useNavigate();

  const lessonNum = parseInt(item.slug.replace(/\D/g, "")) || 1;
  const formattedNum = lessonNum.toString().padStart(2, "0");
  const theme = themeColors[themeIdx % themeColors.length]!;

  const levelColor =
    item.level === "Beginner"
      ? "text-[#16A34A] bg-[#16A34A]/10"
      : item.level === "Intermediate"
        ? "text-[#D97706] bg-[#D97706]/10"
        : "text-[#DC2626] bg-[#DC2626]/10";
  const levelText =
    item.level === "Beginner" ? "Easy" : item.level === "Intermediate" ? "Medium" : "Hard";

  const keysArray = item.keys.split(" ").slice(0, 4);

  return (
    <button
      onClick={() => navigate({ to: `/english-lessons/${item.slug}` })}
      className="relative text-left group flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 w-full"
    >
      <div className={`h-[6px] w-full ${theme.gradient}`} />

      {isCompleted && (
        <div className="absolute top-4 right-4 z-10 w-6 h-6 bg-[#16A34A] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          <CheckCircle className="size-3.5 text-white" />
        </div>
      )}

      <div className="p-5 flex flex-col h-full relative">
        <div className="flex justify-between items-center mb-5">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${theme.lightBg} ${theme.text}`}
          >
            LESSON {formattedNum}
          </span>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${levelColor}`}>
            {levelText}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 h-[52px] content-start">
          {keysArray.map((k: string, i: number) => (
            <div
              key={i}
              className={`w-[44px] h-[44px] rounded-full flex items-center justify-center font-extrabold text-white text-[15px] shadow-sm ${theme.bg}`}
            >
              {k.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="mt-auto mb-4">
          <h3 className="text-[17px] font-extrabold text-slate-900 leading-tight mb-1">
            {item.englishTitle || item.title}
          </h3>
          <p className="text-[13px] font-medium text-slate-500">
            {item.description} • {item.minutes} min
          </p>
        </div>

        <div className="w-full h-1 bg-slate-100 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full ${theme.bg} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-sm font-bold ${theme.text}`}>{progress}%</span>

          <div
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-colors hover:opacity-90 ${theme.bg} ${theme.btnText}`}
          >
            {progress > 0 && progress < 100 ? "Continue" : "Start"}
            <ArrowRight className="size-3.5" />
          </div>
        </div>
      </div>
    </button>
  );
}

function EnglishLessonsPage() {
  const { currentUser } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [progressData, setProgressData] = useState<Record<string, any>>({});

  const loadProgress = useCallback(() => {
    if (!currentUser) return;
    const data: Record<string, any> = {};
    for (const l of englishLessons) {
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
    return englishLessons.map((baseItem) => {
      const saved = progressData[baseItem.slug] || { progress: 0, completed: false };
      return {
        ...baseItem,
        progress: saved.progress || 0,
        isCompleted: saved.completed || false,
      };
    });
  }, [progressData]);

  const displayedLessons = useMemo(() => {
    if (activeCategory === "All") return extendedCurriculum;
    if (activeCategory === "Completed") return extendedCurriculum.filter((l) => l.progress === 100);
    if (activeCategory === "In Progress")
      return extendedCurriculum.filter((l) => l.progress > 0 && l.progress < 100);
    return extendedCurriculum.filter((l) => l.description === activeCategory);
  }, [activeCategory, extendedCurriculum]);

  // Group lessons by description (Home Row, Top Row, Bottom Row, Mixed)
  const groupedLessons = useMemo(() => {
    const groups: Record<string, typeof extendedCurriculum> = {};
    displayedLessons.forEach((lesson) => {
      if (!groups[lesson.description]) groups[lesson.description] = [];
      groups[lesson.description]!.push(lesson);
    });
    return groups;
  }, [displayedLessons]);

  const groupOrder = ["Home Row", "Top Row", "Bottom Row", "Mixed"];

  return (
    <div className="min-h-[calc(100vh-64px)] p-6 lg:p-10 bg-[#FAFAFA]">
      <div className="max-w-[1300px] mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => {
            const isActive = activeCategory === filter.id;
            const label = filter.id === "All" ? `All (${extendedCurriculum.length})` : filter.label;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-200 border ${
                  isActive
                    ? "bg-gradient-to-r from-[#A855F7] to-[#C084FC] text-white border-transparent shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                {filter.icon && <span>{filter.icon}</span>}
                {label}
              </button>
            );
          })}
        </div>

        {/* Lesson Groups */}
        <div className="space-y-12">
          {groupOrder.map((groupName) => {
            const lessonsInGroup = groupedLessons[groupName];
            if (!lessonsInGroup || lessonsInGroup.length === 0) return null;

            const groupIcon = filters.find((f) => f.id === groupName)?.icon || "";

            return (
              <div key={groupName}>
                <h2 className="flex items-center gap-2 text-[13px] font-black tracking-widest text-slate-400 uppercase mb-5">
                  {groupIcon} {groupName} ({lessonsInGroup.length} LESSONS)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {lessonsInGroup.map((item, idx) => (
                    <EnglishLessonCard key={item.slug} item={item} themeIdx={idx} />
                  ))}
                </div>
              </div>
            );
          })}

          {Object.keys(groupedLessons).length === 0 && (
            <div className="text-center py-12 text-slate-500 font-medium">
              No lessons found for this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
