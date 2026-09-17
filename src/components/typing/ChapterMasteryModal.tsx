import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, RotateCcw, Target, TriangleAlert, Trophy, XCircle, Zap } from "lucide-react";
import { calculateGrade, calculateXP, DEFAULT_TARGET_WPM, Grade } from "@/lib/scoring";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/useLanguage";

interface ChapterMasteryModalProps {
  wpm: number;
  accuracy: number;
  errors: number;
  isValid: boolean;
  grade: Grade | null;
  xp: number;
  nextLessonSlug?: string | null | undefined;
  onPracticeAgain: () => void;
}

export function ChapterMasteryModal({
  wpm,
  accuracy,
  errors,
  isValid,
  grade,
  xp,
  nextLessonSlug,
  onPracticeAgain,
}: ChapterMasteryModalProps) {
  const { isEnglish } = useLanguage();
  const safeWpm = Number.isFinite(wpm) ? wpm : 0;
  const safeAccuracy = Number.isFinite(accuracy) ? accuracy : 0;
  const safeErrors = Number.isFinite(errors) ? errors : 0;

  const targetCompleted = isValid && safeWpm >= DEFAULT_TARGET_WPM && safeAccuracy >= 70;

  const modalContent = (
    <div className="wc-overlay animate-in fade-in duration-300">
      <div className="wc-stage animate-in zoom-in-95 duration-300">
        <div className="wc-blob wc-blob-pink"></div>
        <div className="wc-blob wc-blob-yellow"></div>
        <div className="wc-blob wc-blob-blue"></div>

        <div className="wc-card">
          <div className="flex flex-col items-center">
            <h2 className="wc-title">{isEnglish ? "Home Row, done" : "पाठ पूरा हुआ"}</h2>
            <p className="wc-subtitle">
              {isEnglish ? "Lesson Mastery" : "पाठ की महारत"} •{" "}
              {isEnglish ? `Grade ${grade || "C"}` : `ग्रेड ${grade || "C"}`}
            </p>
          </div>

          <div className="wc-stats-grid">
            <div className="flex flex-col items-center">
              <span className="wc-stat-num">
                <AnimatedCounter value={safeWpm} />
              </span>
              <span className="wc-stat-label">{isEnglish ? "Speed" : "गति"}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="wc-stat-num">
                <AnimatedCounter value={safeAccuracy} />%
              </span>
              <span className="wc-stat-label">{isEnglish ? "Accuracy" : "सटीकता"}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="wc-stat-num">
                <AnimatedCounter value={safeErrors} />
              </span>
              <span className="wc-stat-label">{isEnglish ? "Errors" : "गलतियां"}</span>
            </div>
          </div>

          <p className="wc-comment">
            {targetCompleted
              ? isEnglish
                ? "amazing work ✨"
                : "बहुत बढ़िया ✨"
              : isEnglish
                ? `so close to ${DEFAULT_TARGET_WPM} wpm ✨`
                : `${DEFAULT_TARGET_WPM} wpm के बहुत करीब ✨`}
          </p>

          <div className="flex flex-col gap-3">
            {nextLessonSlug && isValid && (
              <Link
                to={"/practice" as any}
                search={{ lesson: nextLessonSlug } as any}
                className="wc-btn-primary"
              >
                {isEnglish ? "Next Lesson" : "अगला पाठ"}
              </Link>
            )}

            <button onClick={onPracticeAgain} className="wc-btn-secondary">
              {isEnglish ? "Practice Again" : "फिर से अभ्यास करें"}
            </button>

            <Link to={"/lessons" as any} className="wc-link">
              {isEnglish ? "Back to Lesson List" : "पाठ सूची पर वापस जाएं"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(modalContent, document.body);
}
