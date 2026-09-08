import { Link } from "@tanstack/react-router";
import { CheckCircle, Clock, Home, ArrowRight, Bookmark } from "lucide-react";

const themeColors = [
  { bg: "bg-gradient-to-b from-[#6D28D9] to-[#5B21B6]", text: "text-[#6D28D9]", light: "bg-[#6D28D9]/15", border: "border-[#6D28D9]" },
  { bg: "bg-gradient-to-b from-[#2563EB] to-[#1D4ED8]", text: "text-[#2563EB]", light: "bg-[#2563EB]/15", border: "border-[#2563EB]" },
  { bg: "bg-gradient-to-b from-[#F97316] to-[#EA580C]", text: "text-[#F97316]", light: "bg-[#F97316]/15", border: "border-[#F97316]" },
  { bg: "bg-gradient-to-b from-[#0D9488] to-[#0F766E]", text: "text-[#0D9488]", light: "bg-[#0D9488]/15", border: "border-[#0D9488]" },
  { bg: "bg-gradient-to-b from-[#DB2777] to-[#BE185D]", text: "text-[#DB2777]", light: "bg-[#DB2777]/15", border: "border-[#DB2777]" }
];

export function KrutiDevLessonCard({ item, setLockedLessonIntent }: { item: any, setLockedLessonIntent?: (item: any) => void }) {
  const isCompleted = item.progress === 100;
  const progress = item.progress || 0;
  const isLocked = item.isLocked;

  const lessonNum = parseInt(item.slug.replace(/\D/g, '')) || 1;
  const formattedNum = lessonNum.toString().padStart(2, '0');
  const theme = themeColors[(lessonNum - 1) % themeColors.length]!;


  const cardContent = (
    <div className="group flex rounded-[16px] overflow-hidden border border-slate-200/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 h-[160px] relative w-full">
      
      {/* Left Vertical Spine */}
      <div className={`w-[90px] shrink-0 ${theme.bg} flex flex-col items-center justify-center text-white relative shadow-[inset_-4px_0_12px_rgba(0,0,0,0.15)]`}>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-100 mb-1 drop-shadow-md">LESSON</span>
          <span className="text-4xl font-extrabold tracking-tighter leading-none">{formattedNum}</span>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col justify-between p-5 relative">
        {/* Bookmark Ribbon */}
        <div className={`absolute top-0 right-6 w-6 h-8 ${theme.light} flex justify-center`}>
          <div className={`w-full h-full ${theme.text} opacity-80`} style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)", backgroundColor: "currentColor" }} />
        </div>


        {/* Middle Content */}
        <div className="flex flex-col mt-2">
          <p className="font-hindi text-2xl font-bold text-slate-800 leading-tight truncate">{item.hindiTitle}</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
              <Home className="size-3" />
              <span>{item.level || "Home Row"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-3.5" />
              <span>{item.minutes} min</span>
            </div>
          </div>
        </div>

        {/* Bottom Progress Row */}
        <div className="mt-4 flex items-center justify-between">
          {isCompleted ? (
            <div className="flex items-center gap-3 w-full">
              <span className="text-sm font-bold text-[#16A34A]">100% पूर्ण</span>
              <div className="flex-1 h-1.5 rounded-full bg-[#16A34A]" />
              <CheckCircle className="size-5 text-[#16A34A] shrink-0" fill="currentColor" color="white" />
            </div>
          ) : (
            <div className="flex flex-col w-full gap-1.5">
              <span className={`text-xs font-bold ${theme.text}`}>{progress}% पूर्ण</span>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className={`h-full rounded-full ${theme.bg}`} style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay for locked state */}
      {isLocked && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px] flex items-center justify-center z-10">
          <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-slate-700 text-sm font-bold">
            Coming Soon
          </div>
        </div>
      )}
    </div>
  );

  if (isLocked) {
    return (
      <button 
        onClick={(e) => {
          e.preventDefault();
          setLockedLessonIntent && setLockedLessonIntent(item);
        }}
        className="w-full text-left"
      >
        {cardContent}
      </button>
    );
  }

  return (
    <Link
      to={item.path as any || "/practice"}
      search={item.search || { lesson: item.slug } as any}
      params={item.params}
      className="block w-full"
    >
      {cardContent}
    </Link>
  );
}
