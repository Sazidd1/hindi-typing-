import { Link } from "@tanstack/react-router";
import { CheckCircle, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function LessonCard({ item, setLockedLessonIntent }: { item: any, setLockedLessonIntent?: (item: any) => void }) {
  const Icon = item.icon;
  const isCompleted = item.progress === 100;
  
  const headerBg = isCompleted 
    ? "bg-gradient-to-br from-[#16a34a] to-[#22c55e]"
    : "bg-gradient-to-br from-[#2563eb] to-[#1d4ed8]";
  
  const headerTextColor = "text-white";
  
  const { currentUser } = useAuth();

  return (
    <div className="group flex flex-col rounded-[16px] overflow-hidden border border-[#e6ebf2] bg-[#ffffff] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(20,30,60,0.08)] h-full">
      
      {/* HEADER STRIP */}
      <div className={`px-[20px] py-[10px] ${headerBg}`}>
        <span className={`font-bold text-[11px] uppercase tracking-[0.5px] ${headerTextColor}`}>
          {item.slug ? `Lesson ${item.slug.replace('ch', '')}` : item.title}
        </span>
      </div>

      {/* BODY SECTION (Preserved original styling) */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <div 
            className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
              isCompleted 
                ? "bg-green-100 text-green-600" 
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {isCompleted ? <CheckCircle className="size-3.5" /> : Icon ? <Icon className="size-3.5" /> : null}
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
          <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md leading-none text-slate-500">
            ⏱ {item.minutes}m
          </span>
        </div>

        <div className="mt-1.5 space-y-1.5">
          <div className="flex justify-between text-[9px] font-bold uppercase tracking-wider items-center leading-none">
            <span className="text-slate-400">Progress</span>
            <span className={isCompleted ? "text-green-600" : "text-slate-700"}>{item.progress || 0}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/15">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                isCompleted ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ width: `${item.progress || 0}%` }}
            />
          </div>
        </div>

        <div className="mt-2.5">

          
          {item.isLocked ? (
            <button 
              onClick={(e) => {
                e.preventDefault();
                setLockedLessonIntent && setLockedLessonIntent(item);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-bold leading-none transition-colors bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              <span>Start Lesson</span>
              <Lock className="size-3.5" />
            </button>
          ) : (
            <Link
              to={item.path as any || "/practice"}
              search={item.search || { lesson: item.slug } as any}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-bold leading-none transition-colors ${
                isCompleted
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              }`}
            >
              <span>{isCompleted ? "Practice Again" : (item.progress || 0) > 0 ? "Continue" : "Start Lesson"}</span>
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
