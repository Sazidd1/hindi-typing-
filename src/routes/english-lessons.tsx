import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useTestDurationDisplay } from "@/lib/useTestDuration";
import { ArrowRight, CheckCircle } from "lucide-react";
import { englishLessons } from "@/lib/english-typing-data";

export const Route = createFileRoute("/english-lessons")({
  head: () => ({
    meta: [{ title: "English Typing Lessons" }],
  }),
  component: EnglishLessonsPage,
});

const THEMES = [
  { gradient: 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400',     bg: 'bg-pink-400',    text: 'text-pink-400',    lightBg: 'bg-pink-50',    btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400',       bg: 'bg-blue-400',    text: 'text-blue-500',    lightBg: 'bg-blue-50',    btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400',      bg: 'bg-green-500',   text: 'text-green-500',   lightBg: 'bg-green-50',   btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400',   bg: 'bg-yellow-400',  text: 'text-yellow-500',  lightBg: 'bg-yellow-50',  btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400',      bg: 'bg-purple-500',  text: 'text-purple-500',  lightBg: 'bg-purple-50',  btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-orange-400 via-red-400 to-pink-400',      bg: 'bg-orange-400',  text: 'text-orange-500',  lightBg: 'bg-orange-50',  btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-teal-400 via-green-400 to-lime-400',      bg: 'bg-teal-500',    text: 'text-teal-500',    lightBg: 'bg-teal-50',    btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-red-400 via-pink-400 to-purple-400',      bg: 'bg-red-400',     text: 'text-red-500',     lightBg: 'bg-red-50',     btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400',     bg: 'bg-cyan-500',    text: 'text-cyan-500',    lightBg: 'bg-cyan-50',    btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-lime-400 via-green-400 to-teal-400',      bg: 'bg-lime-500',    text: 'text-lime-600',    lightBg: 'bg-lime-50',    btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400',   bg: 'bg-indigo-500',  text: 'text-indigo-500',  lightBg: 'bg-indigo-50',  btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-400',    bg: 'bg-fuchsia-500', text: 'text-fuchsia-500', lightBg: 'bg-fuchsia-50', btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-rose-400 via-orange-400 to-yellow-400',   bg: 'bg-rose-400',    text: 'text-rose-500',    lightBg: 'bg-rose-50',    btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-lime-400',    bg: 'bg-amber-400',   text: 'text-amber-500',   lightBg: 'bg-amber-50',   btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400',   bg: 'bg-violet-500',  text: 'text-violet-500',  lightBg: 'bg-violet-50',  btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400',        bg: 'bg-sky-500',     text: 'text-sky-500',     lightBg: 'bg-sky-50',     btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400',    bg: 'bg-emerald-500', text: 'text-emerald-500', lightBg: 'bg-emerald-50', btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-pink-400 via-rose-400 to-red-400',        bg: 'bg-pink-500',    text: 'text-pink-500',    lightBg: 'bg-pink-50',    btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400',   bg: 'bg-blue-500',    text: 'text-blue-600',    lightBg: 'bg-blue-50',    btnText: 'text-white' },
  { gradient: 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400',   bg: 'bg-green-400',   text: 'text-green-600',   lightBg: 'bg-green-50',   btnText: 'text-white' },
];

const filters = [
  { label: "All", id: "All", icon: "" },
  { label: "Home Row", id: "Home Row", icon: "🏠" },
  { label: "Top Row", id: "Top Row", icon: "⬆️" },
  { label: "Bottom Row", id: "Bottom Row", icon: "⬇️" },
  { label: "Shift Key", id: "Shift Key", icon: "⌨️" },
  { label: "Number Row", id: "Number Row", icon: "🔢" },
  { label: "Full Keyboard Master", id: "Full Keyboard Master", icon: "🔀" },
  { label: "Completed", id: "Completed", icon: "✅" },
  { label: "In Progress", id: "In Progress", icon: "🔥" },
];

function EnglishLessonCard({ item, themeIdx }: { item: any; themeIdx: number }) {
  const displayDuration = useTestDurationDisplay();
  const isCompleted = item.progress === 100;
  const progress = item.progress || 0;
  const navigate = useNavigate();

  const lessonNum = parseInt(item.slug.replace(/\D/g, "")) || 1;
  const formattedNum = lessonNum.toString().padStart(2, "0");
  const theme = THEMES[themeIdx % THEMES.length]!;

  const levelColor =
    item.level === "Beginner"
      ? "text-[#16A34A] bg-[#16A34A]/10"
      : item.level === "Intermediate"
        ? "text-[#D97706] bg-[#D97706]/10"
        : "text-[#DC2626] bg-[#DC2626]/10";
  const levelText =
    item.level === "Beginner" ? "Easy" : item.level === "Intermediate" ? "Medium" : "Hard";

  // Use pill if keys contain 'words', 'L-', or 'ROW'
  const isWords =
    item.keys.toLowerCase().includes("words") || 
    item.keys.toUpperCase().includes("L-") ||
    item.keys.toUpperCase().includes("MIXED") ||
    item.keys.toUpperCase().includes("DRILL") ||
    item.keys.toUpperCase().includes("SHIFT") ||
    item.keys.toUpperCase().includes("CAPITAL") ||
    item.keys.toUpperCase().includes("PARAGRAPH") ||
    item.keys.toUpperCase().includes("STORY") ||
    item.keys.toUpperCase().includes("NUMBER") ||
    item.keys.toUpperCase().includes("ADVANCED") ||
    item.keys.toUpperCase().includes("ROW");
  const keysArray = item.keys.split(" ").filter(Boolean);

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

      <div className="p-4 flex flex-col h-full relative">
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

        <div className="flex flex-nowrap gap-1 sm:gap-1.5 mb-6 min-h-[40px] items-center">
          {isWords ? (
            <div
              className={`px-3 h-[38px] rounded-full flex items-center justify-center font-extrabold text-white text-[12px] tracking-wide shadow-sm whitespace-nowrap text-ellipsis overflow-hidden ${theme.bg}`}
            >
              {item.keys.toUpperCase()}
            </div>
          ) : (
            keysArray.map((k: string, i: number) => (
              <div
                key={i}
                className={`w-8 h-8 sm:w-[38px] sm:h-[38px] shrink-0 rounded-full flex items-center justify-center font-extrabold text-white text-[13px] sm:text-[14px] shadow-sm ${theme.bg}`}
              >
                {k.toLowerCase()}
              </div>
            ))
          )}
        </div>

        <div className="mt-auto mb-4">
          <h3 className="text-[17px] font-extrabold text-slate-900 leading-tight mb-1">
            {item.englishTitle || item.title}
          </h3>
          <p className="text-[13px] font-medium text-slate-500">
            {item.description} • {displayDuration}
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

  const groupOrder = ["Home Row", "Top Row", "Bottom Row", "Shift Key", "Number Row", "Full Keyboard Master"];

  return (
    <div className="min-h-[calc(100vh-64px)] px-6 lg:px-10 pb-6 lg:pb-10 pt-0">
      <div className="max-w-[1300px] mx-auto">
        {/* Filters */}
        <div className="py-4 mb-6 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = activeCategory === filter.id;
            const label = filter.id === "All" ? `All (${extendedCurriculum.length})` : filter.label;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all duration-200 border whitespace-nowrap ${
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
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
