import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, RotateCcw, Target, TriangleAlert, Trophy, XCircle, Zap } from "lucide-react";
import { calculateGrade, calculateXP, DEFAULT_TARGET_WPM, Grade } from "@/lib/scoring";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { cn } from "@/lib/utils";

interface ChapterMasteryModalProps {
  wpm: number;
  accuracy: number;
  errors: number;
  nextLessonSlug?: string | null | undefined;
  onPracticeAgain: () => void;
}

export function ChapterMasteryModal({ wpm, accuracy, errors, nextLessonSlug, onPracticeAgain }: ChapterMasteryModalProps) {
  const safeWpm = Number.isFinite(wpm) ? wpm : 0;
  const safeAccuracy = Number.isFinite(accuracy) ? accuracy : 0;
  const safeErrors = Number.isFinite(errors) ? errors : 0;
  
  const [grade, setGrade] = useState<Grade>("C");
  const [xp, setXp] = useState(0);
  const targetCompleted = safeWpm >= DEFAULT_TARGET_WPM;

  useEffect(() => {
    setGrade(calculateGrade(safeWpm, safeAccuracy, DEFAULT_TARGET_WPM));
    setXp(calculateXP(safeWpm, safeAccuracy, safeErrors));
  }, [safeWpm, safeAccuracy, safeErrors]);

  const modalContent = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15, 23, 42, 0.12)",
      }}
      className="animate-in fade-in duration-300"
    >
      <div className="relative w-[90%] max-w-[480px] bg-white rounded-[28px] p-8 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden flex flex-col gap-6">
        
        {/* Subtle CSS Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute size-2 rounded-full bg-yellow-400 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Top Area */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 border border-yellow-200/50 shadow-sm mb-4 animate-bounce" style={{ animationIterationCount: 1, animationDuration: "0.8s" }}>
            <Trophy className="size-8 text-yellow-600 drop-shadow-sm" />
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Chapter Mastery</h2>
            <span className={cn(
              "px-3 py-1 text-sm font-bold rounded-full leading-none shadow-sm",
              grade === "A+" && "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
              grade === "A" && "bg-gradient-to-r from-emerald-400 to-emerald-500 text-white",
              grade === "B" && "bg-blue-500 text-white",
              grade === "C" && "bg-slate-400 text-white"
            )}>
              Grade {grade}
            </span>
          </div>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-3 gap-3 relative z-10">
          <div className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-slate-50 border border-slate-100">
            <Zap className="size-5 text-blue-500 mb-2" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Speed</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-slate-800"><AnimatedCounter value={safeWpm} /></span>
              <span className="text-xs font-bold text-slate-500">WPM</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-slate-50 border border-slate-100">
            <Target className="size-5 text-emerald-500 mb-2" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Accuracy</span>
            <div className="relative flex items-center justify-center size-[46px]">
              <CircularProgress value={safeAccuracy} size={46} strokeWidth={4} className="absolute inset-0" />
              <div className="flex items-baseline font-extrabold text-slate-800 text-sm z-10">
                <AnimatedCounter value={safeAccuracy} />%
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-4 rounded-[20px] bg-slate-50 border border-slate-100">
            <TriangleAlert className="size-5 text-rose-500 mb-2" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Errors</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-slate-800"><AnimatedCounter value={safeErrors} /></span>
            </div>
          </div>
        </div>

        {/* Target Section */}
        <div className={cn(
          "flex items-center justify-between p-4 rounded-[20px] border relative z-10 transition-colors",
          targetCompleted ? "bg-emerald-50 border-emerald-100" : "bg-orange-50 border-orange-100"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex size-10 rounded-full items-center justify-center",
              targetCompleted ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-500"
            )}>
              {targetCompleted ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Target: {DEFAULT_TARGET_WPM} WPM</p>
              <p className={cn(
                "text-[13px] font-semibold",
                targetCompleted ? "text-emerald-600" : "text-orange-600"
              )}>
                {targetCompleted ? "Target Completed!" : "Keep practicing to hit the target"}
              </p>
            </div>
          </div>
        </div>

        {/* Reward Section */}
        <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-[20px] border border-indigo-100 relative z-10 animate-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both">
          <span className="text-sm font-extrabold text-indigo-900">
            +<AnimatedCounter value={xp} /> XP Earned
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 mt-2 relative z-10">
          {nextLessonSlug && (
            <Link
              to={"/practice" as any}
              search={{ lesson: nextLessonSlug } as any}
              className="w-full inline-flex justify-center items-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-bold text-white transition-all hover:scale-[1.02] shadow-md shadow-blue-500/25 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
            >
              Next Chapter
            </Link>
          )}
          
          <button
            onClick={onPracticeAgain}
            className="w-full inline-flex justify-center items-center gap-2 rounded-2xl px-6 py-4 text-[15px] font-bold text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="size-4" />
            Practice Again
          </button>
          
          <Link
            to={"/lessons" as any}
            className="w-full inline-flex justify-center items-center rounded-2xl px-6 py-3 text-[14px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors mt-1"
          >
            Back to Chapter List
          </Link>
        </div>

      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
}
