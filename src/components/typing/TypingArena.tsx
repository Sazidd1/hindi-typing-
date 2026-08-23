import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Gauge, RotateCcw, Target, Timer, TriangleAlert, Trophy, Play, ArrowRight, List, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HindiKeyboard } from "@/components/typing/HindiKeyboard";
import { useAuth } from "@/lib/auth";
import { calculateGrade, calculateXP, DEFAULT_TARGET_WPM, validateSession } from "@/lib/scoring";
import { HINDI_MAP, lessons, keyboardRows } from "@/lib/typing-data";
import { ChapterMasteryModal } from "@/components/typing/ChapterMasteryModal";

const multiCharTokens = Array.from(new Set(
  keyboardRows.flatMap(row => 
    row.flatMap(key => {
      const tokens = [];
      if (key.hi && Array.from(key.hi).length > 1) tokens.push(key.hi);
      if (key.shift && Array.from(key.shift).length > 1) tokens.push(key.shift);
      return tokens;
    })
  )
)).sort((a, b) => b.length - a.length);

export function tokenizeHindi(text: string): string[] {
  const tokens: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    let matched = false;
    for (const token of multiCharTokens) {
      if (remaining.startsWith(token)) {
        tokens.push(token);
        remaining = remaining.slice(token.length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      const char = Array.from(remaining)[0];
      if (!char) break;
      tokens.push(char);
      remaining = remaining.slice(char.length);
    }
  }
  return tokens;
}
import { toast } from "sonner";

export type TypingResult = {
  wpm: number;
  accuracy: number;
  errors: number;
  seconds: number;
};


export function TypingArena({
  lessonSlug,
  text,
  title,
  subtitle,
  timeLimit,
  showKeyboard = true,
  isParagraphMode = false,
  onComplete,
}: {
  lessonSlug?: string;
  text: string;
  title?: string;
  subtitle?: string;
  timeLimit?: number;
  showKeyboard?: boolean;
  isParagraphMode?: boolean;
  onComplete?: (result: TypingResult) => void;
}) {
  const isWordPractice = ["ch11", "ch22", "ch23", "ch24", "ch35", "ch36", "ch37"].includes(lessonSlug || "");
  const isInfiniteMode = !isWordPractice && !!lessonSlug;
  const [dynamicText, setDynamicText] = useState(text);

  useEffect(() => {
    setDynamicText(text);
  }, [text, lessonSlug]);

  // Do not add trailing space so the lesson ends exactly after the last word
  const normalizedText = useMemo(() => dynamicText.trim(), [dynamicText]);
  const chars = useMemo(() => tokenizeHindi(normalizedText), [normalizedText]);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [showExitButton, setShowExitButton] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const [forceFinish, setForceFinish] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const activeWordRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const lastActiveTimeRef = useRef<number | null>(null);
  const mouseTimeoutRef = useRef<number | null>(null);
  const cursorTimeoutRef = useRef<number | null>(null);
  const charMistakesRef = useRef<Record<string, number>>({});
  const { currentUser } = useAuth();

  // isWordPractice is now defined at the top of the component

  const typedChars = useMemo(() => tokenizeHindi(typed), [typed]);

  const validation = validateSession(
    typedChars,
    chars,
    elapsed,
    errors,
    !!isParagraphMode
  );

  const { wpm, accuracy, correctCharacters, totalAttempted } = validation;
  const progress = isInfiniteMode && timeLimit 
    ? Math.min(100, Math.round((elapsed / timeLimit) * 100))
    : Math.min(100, Math.round((typedChars.length / chars.length) * 100));
  const remaining = timeLimit ? Math.max(0, timeLimit - elapsed) : null;

  const reset = useCallback(() => {
    setTyped("");
    setStartedAt(null);
    setIsPaused(false);
    setElapsed(0);
    setErrors(0);
    setFinished(false);
    completedRef.current = false;
    charMistakesRef.current = {};
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    reset();
    
    // Auto-restore saved progress on mount or lesson change
    if (!lessonSlug || !currentUser) return;
    const savedStr = localStorage.getItem(`lesson_state_${currentUser}_${lessonSlug}`);
    if (savedStr) {
      try {
        const saved = JSON.parse(savedStr);
        if (saved.typed && saved.typed.length > 0) {
          if (saved.typed.length < text.length) {
             setTyped(saved.typed);
             if (saved.elapsed) setElapsed(saved.elapsed);
             if (saved.errors) setErrors(saved.errors);
          } else {
             // If they already finished this saved session, starting again should be fresh
             setTyped("");
             setElapsed(0);
             setErrors(0);
          }
        }
      } catch (e) {}
    }
  }, [text, reset, lessonSlug, currentUser]);

  useEffect(() => {
    if (isInfiniteMode && startedAt !== null && !finished) {
      // Generate more text when approaching the end (e.g. less than 150 chars remaining)
      if (chars.length - typedChars.length < 150) {
        const activeLesson = lessons.find(l => l.slug === lessonSlug);
        if (activeLesson) {
          // Dynamically extract the exact pool of characters used in this lesson's original text
          const tokens = tokenizeHindi(activeLesson.text.replace(/\s+/g, ''));
          const pool = Array.from(new Set(tokens));
          let newWords = [];
          for (let i = 0; i < 40; i++) {
            let w = "";
            for (let j = 0; j < 5; j++) {
              w += pool[Math.floor(Math.random() * pool.length)];
            }
            newWords.push(w);
          }
          setDynamicText(prev => prev + " " + newWords.join(' '));
        }
      }
    }
  }, [typedChars.length, chars.length, isInfiniteMode, startedAt, finished, lessonSlug]);

  const togglePause = useCallback(() => {
    if (finished) return;
    if (startedAt === null) {
      setStartedAt(Date.now());
      inputRef.current?.focus();
      return;
    }
    setIsPaused(p => {
      if (p) {
        setTimeout(() => inputRef.current?.focus(), 10);
      }
      return !p;
    });
  }, [startedAt, finished]);

  useEffect(() => {
    if (!isFocusMode) {
      setShowExitButton(false);
      return;
    }
    
    setShowExitButton(false);
    
    const handleMouseMove = () => {
      document.body.classList.remove('hide-cursor-active');
      if (cursorTimeoutRef.current) window.clearTimeout(cursorTimeoutRef.current);
      cursorTimeoutRef.current = window.setTimeout(() => {
        document.body.classList.add('hide-cursor-active');
      }, 2000);

      setShowExitButton(true);
      if (mouseTimeoutRef.current) {
        window.clearTimeout(mouseTimeoutRef.current);
      }
      mouseTimeoutRef.current = window.setTimeout(() => {
        setShowExitButton(false);
      }, 2500);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFocusMode(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    
    // Initial hide timeout for cursor
    cursorTimeoutRef.current = window.setTimeout(() => {
      document.body.classList.add('hide-cursor-active');
    }, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove("focus-mode-active");
      document.body.classList.remove("hide-cursor-active");
      if (mouseTimeoutRef.current) {
        window.clearTimeout(mouseTimeoutRef.current);
      }
      if (cursorTimeoutRef.current) {
        window.clearTimeout(cursorTimeoutRef.current);
      }
    };
  }, [isFocusMode]);

  useEffect(() => {
    if (isFocusMode) {
      document.body.classList.add("focus-mode-active");
    } else {
      document.body.classList.remove("focus-mode-active");
    }
  }, [isFocusMode]);

  useEffect(() => {
    if (startedAt === null || finished || isPaused) {
      lastActiveTimeRef.current = null;
      return;
    }
    
    lastActiveTimeRef.current = Date.now();
    const id = window.setInterval(() => {
      const now = Date.now();
      if (lastActiveTimeRef.current !== null) {
        const delta = (now - lastActiveTimeRef.current) / 1000;
        setElapsed((prev) => prev + delta);
        lastActiveTimeRef.current = now;
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [startedAt, finished, isPaused]);

  useEffect(() => {
    if (finished || completedRef.current) return;
    const timeUp = timeLimit != null && elapsed >= timeLimit && startedAt !== null;
    const done = isInfiniteMode ? false : (typedChars.length >= chars.length && chars.length > 0);
    
    if (timeUp || done || forceFinish) {
      // Final rigid validation check
      const finalValidation = validateSession(
        typedChars,
        chars,
        elapsed,
        errors,
        !!isParagraphMode
      );

      completedRef.current = true;
      setFinished(true);
      
      // Save enhanced result history to local storage ONLY if valid
      if (currentUser && finalValidation.isValid) {
        try {
          const key = "results_" + currentUser;
          const existing = JSON.parse(localStorage.getItem(key) || "[]");
          const date = new Date();
          const dateString = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
          const newResult = { 
            date: dateString, 
            lessonSlug: lessonSlug || "unknown",
            wpm: finalValidation.wpm,
            accuracy: finalValidation.accuracy,
            errors: errors,
            grade: finalValidation.grade,
            xp: finalValidation.xp,
            charMistakes: charMistakesRef.current,
            elapsedSeconds: elapsed
          };
          let updatedResults = [newResult, ...existing];
          
          // Lesson Completion Bonus Logic
          if (lessonSlug) {
             const bonusKey = `lesson_completion_bonus_${currentUser}_${lessonSlug}`;
             if (localStorage.getItem(bonusKey) !== "true") {
                localStorage.setItem(bonusKey, "true");
                newResult.xp += 100;
                finalValidation.xp += 100;
                toast.success("+100 XP 🎉", { description: "Lesson Complete!" });
                window.dispatchEvent(new Event("xpUpdated"));
             }
          }

          localStorage.setItem(key, JSON.stringify(updatedResults.slice(0, 50)));
        } catch (e) {
          console.error("Failed to save result", e);
        }
      }

      onComplete?.({ 
        wpm: finalValidation.wpm, 
        accuracy: finalValidation.accuracy, 
        errors, 
        seconds: elapsed 
      });
    }
  }, [
    elapsed,
    timeLimit,
    typedChars.length,
    chars.length,
    finished,
    startedAt,
    wpm,
    accuracy,
    errors,
    onComplete,
    currentUser,
    forceFinish,
    isInfiniteMode
  ]);

  function handleChange(value: string) {
    if (finished) return;
    if (startedAt === null) setStartedAt(Date.now());
    if (isPaused) setIsPaused(false);
    
    // Map physical English keystrokes to Hindi chars if OS keyboard is English
    // Only map the newly added characters to avoid re-mapping already typed Hindi chars
    let mappedValue = value;
    if (value.startsWith(typed) && value.length > typed.length) {
      const added = value.slice(typed.length);
      const mappedAdded = Array.from(added).map(ch => HINDI_MAP[ch] || ch).join('');
      mappedValue = typed + mappedAdded;
    } else if (value.length < typed.length) {
      // Strict Rule 1: Backspace is disabled
      return;
    } else {
      mappedValue = Array.from(value).map(ch => HINDI_MAP[ch] || ch).join('');
    }

    const next = tokenizeHindi(mappedValue).slice(0, chars.length);

    let newErrors = 0;
    let hasError = false;
    
    // Check all characters in next against chars
    for (let i = 0; i < next.length; i++) {
      if (next[i] !== chars[i]) {
        hasError = true;
        // Count as a new error only if it wasn't already recorded in typedChars
        if (i >= typedChars.length || typedChars[i] === chars[i]) {
          newErrors++;
          const targetChar = chars[i];
          if (targetChar && targetChar !== ' ') {
            charMistakesRef.current[targetChar] = (charMistakesRef.current[targetChar] || 0) + 1;
          }
        }
      }
    }

    if (newErrors > 0) {
      setErrors((e) => e + newErrors);
    }
    
    // In Bubble Mode (not paragraph), block completely on ANY wrong character
    if (hasError && !isParagraphMode) {
      return;
    }
    
    setTyped(next.join(""));
  }

  const nextChar = chars[typedChars.length];
  
  const currentLessonIndex = lessons.findIndex((l) => l.slug === lessonSlug);
  const nextLesson = currentLessonIndex !== -1 && currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;

  // Group into words for the tile layout
  const words = useMemo(() => text.split(" "), [text]);

  const wordStartIndices = useMemo(() => {
    const starts = [];
    let curr = 0;
    for (let i = 0; i < words.length; i++) {
      starts.push(curr);
      const w = words[i];
      if (w !== undefined) curr += w.length + 1; // Every word now has a trailing space
    }
    return starts;
  }, [words]);

  let currentWordIndex = 0;
  for (let i = 0; i < wordStartIndices.length; i++) {
    const startIdx = wordStartIndices[i];
    if (startIdx !== undefined && typedChars.length >= startIdx) {
      currentWordIndex = i;
    } else {
      break;
    }
  }

  // Auto-scroll paragraph mode
  useEffect(() => {
    if (isParagraphMode && activeWordRef.current) {
      activeWordRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentWordIndex, isParagraphMode]);

  const WORDS_PER_PAGE = 4;
  const pageIndex = Math.floor(currentWordIndex / WORDS_PER_PAGE);
  const startWordIdx = pageIndex * WORDS_PER_PAGE;
  const endWordIdx = Math.min(startWordIdx + WORDS_PER_PAGE, words.length);
  const visibleWords = words.slice(startWordIdx, endWordIdx);
  const pageStartCharIndex = wordStartIndices[startWordIdx] ?? 0;

  // Auto-save logic
  useEffect(() => {
    if (!lessonSlug || !currentUser) return;
    const totalUnits = isParagraphMode ? words.length : chars.length;
    const completedUnits = isParagraphMode ? currentWordIndex : typedChars.length;
    const currentProgress = totalUnits > 0 ? Math.min(100, Math.floor((completedUnits / totalUnits) * 100)) : 0;
    const isCompleted = typedChars.length >= chars.length && chars.length > 0;

    const key = `lesson_state_${currentUser}_${lessonSlug}`;
    const existingStr = localStorage.getItem(key);
    let existing = { progress: 0, completed: false, bestWpm: 0, bestAccuracy: 0 };
    if (existingStr) {
      try { existing = JSON.parse(existingStr); } catch (e) {}
    }

    const stateToSave = {
      ...existing,
      typed,
      elapsed, // Save elapsed time to prevent WPM boost on reload
      errors,  // Save errors to maintain true accuracy on reload
      progress: Math.max(existing.progress || 0, isCompleted ? 100 : currentProgress),
      completed: existing.completed || isCompleted,
    };

    localStorage.setItem(key, JSON.stringify(stateToSave));
    window.dispatchEvent(new Event('lessonProgressUpdated'));
  }, [typed, currentUser, lessonSlug, currentWordIndex, typedChars.length, chars.length, isParagraphMode, words.length]);

  // Calculate Streak
  let currentStreak = 0;
  for (let i = typedChars.length - 1; i >= 0; i--) {
    if (typedChars[i] === chars[i]) currentStreak++;
    else break;
  }

  return (
    <>
      {/* Focus Mode Exit Button */}
      <button
        onClick={() => setIsFocusMode(false)}
        className={cn(
          "fixed top-6 right-6 z-50 rounded-full bg-secondary/80 backdrop-blur-md px-6 py-2.5 text-sm font-semibold text-foreground shadow-lg border border-border transition-all duration-300",
          isFocusMode && showExitButton ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        Exit Focus (ESC)
      </button>

      <style>{`
        body.focus-mode-active header, body.focus-mode-active footer {
          max-height: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          opacity: 0 !important;
          overflow: hidden !important;
          border: none !important;
          margin: 0 !important;
        }
        header, footer {
          transition: all 0.3s ease-in-out !important;
        }
        body.hide-cursor-active, body.hide-cursor-active * {
          cursor: none !important;
        }
      `}</style>

      <div className={cn(
        "mx-auto w-[98%] max-w-[1350px] flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-4 transition-all duration-300",
        isFocusMode 
          ? "items-center justify-center min-h-[85vh]" 
          : cn("items-start min-h-0", isWordPractice ? "-mt-6 sm:-mt-8" : "-mt-4 sm:-mt-6")
      )}>
        
        {/* Left Side: Typing Area & Keyboard */}
        <div className="flex flex-col flex-1 w-full gap-0">

          {!isFocusMode && (title || subtitle) && (
            <h2 className="text-slate-900 dark:text-[#F4F7FB] text-center font-bold text-2xl sm:text-3xl leading-tight px-2 mt-0 mb-0 relative z-10">
              {title} {subtitle && <span className="font-hindi text-gray-500 dark:text-[#8FA2BC]">( {subtitle} )</span>}
            </h2>
          )}

        {/* Wrapper for Passage and Keyboard to keep their internal spacing intact */}
        <div className="flex flex-col w-full gap-6 sm:gap-8 mt-4">

      <div 
        className={cn(
          "relative mx-auto w-full cursor-text rounded-[24px] py-2 px-6 sm:py-3 sm:px-8 flex items-center justify-center bg-card/80 dark:bg-[linear-gradient(145deg,#101F34,#0D1A2D)] border border-border/60 dark:border-[rgba(255,255,255,0.09)] shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 group overflow-hidden shrink-0",
          isFocusMode && ["ch-full-practice", "ch-full-practice-2", "ch-full-practice-3", "ch-story-practice-1", "ch-story-practice-2", "ch-news-practice", "ch-dialogue-practice", "ch-adventure-story"].includes(lessonSlug || "") ? "h-[220px] sm:h-[240px]" : "h-[170px] sm:h-[190px]",
          isFocusMode ? "max-w-[1100px]" : "max-w-[1000px]"
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <div className={cn(
          "flex flex-col w-full h-full items-center overflow-y-auto overflow-x-hidden custom-scrollbar",
          isParagraphMode ? "justify-start pt-4 sm:pt-6 pb-8" : "justify-center"
        )}>
          {(() => {
            if (isParagraphMode) {
              const _dependentVowels = new Set([
                  '\u093E', '\u093F', '\u0940', '\u0941', '\u0942', '\u0947', '\u0948', '\u094B', '\u094C', '\u0943', '\u0902', '\u0901', '\u0903', '\u094D', '\u093C'
              ]);
              const _isDependentVowelSign = (s: string | undefined) => {
                  if (!s || s.length === 0) return false;
                  if (s === 'ि') return true;
                  return _dependentVowels.has(s[0] ?? '');
              };
              const _buildDisplayOrder = (hindiParts: string[]) => {
                  const order = [];
                  const buffer = [];
                  for (let ki = 0; ki < hindiParts.length; ki++) {
                      const part = hindiParts[ki];
                      if (part !== undefined && _isDependentVowelSign(part) && order.length === 0) {
                          buffer.push(ki);
                      } else {
                          order.push(ki);
                          if (part !== undefined && !_isDependentVowelSign(part)) {
                              for (const bki of buffer) order.push(bki);
                              buffer.length = 0;
                          }
                      }
                  }
                  for (const bki of buffer) order.push(bki);
                  return order;
              };

              let globalIndex = 0;
              return (
                <div className={cn(
                  "w-full text-left font-hindi select-none flex flex-wrap gap-y-2 px-2 transition-all duration-300",
                  isFocusMode 
                    ? (["ch-full-practice", "ch-full-practice-2", "ch-full-practice-3", "ch-story-practice-1", "ch-story-practice-2", "ch-news-practice", "ch-dialogue-practice", "ch-adventure-story"].includes(lessonSlug || "") ? "text-[28px] sm:text-[32px] leading-[1.8]" : "text-[28px] sm:text-[32px] leading-[2.5]") 
                    : "text-2xl sm:text-[28px] leading-[2.2]"
                )}>
                  {words.map((word, wIdx) => {
                    const wordChars = tokenizeHindi(word);
                    const charsWithSpace = [...wordChars, " "];
                    
                    // Assign global indices to characters in their true typing order
                    const mappedChars = charsWithSpace.map((ch, idxInWord) => {
                      const i = globalIndex++;
                      const typedCh = typedChars[i];
                      const isCurrent = i === typedChars.length;
                      const state = typedCh === undefined ? "pending" : typedCh === ch ? "correct" : "wrong";
                      return { ch, cIdx: idxInWord, isCurrent, state };
                    });

                    // Build display order for this word (reordering 'ि' after its consonant)
                    const displayOrder = _buildDisplayOrder(mappedChars.map(m => m.ch));

                    return (
                      <div 
                        key={wIdx} 
                        className="whitespace-pre"
                        ref={wIdx === currentWordIndex ? activeWordRef : null}
                      >
                        {displayOrder.map((displayIdx) => {
                          const mappedChar = mappedChars[displayIdx];
                          if (!mappedChar) return null;
                          const { ch, cIdx, isCurrent, state } = mappedChar;
                          return (
                            <span
                              key={cIdx}
                              className={cn(
                                "transition-colors duration-200",
                                ch === " " && "inline-block w-[0.5em]",
                                isCurrent && "text-[#F59E0B] dark:text-[#F7C843] underline decoration-2 underline-offset-4",
                                state === "correct" && !isCurrent && "text-[#16A34A] dark:text-[#12B76A]",
                                state === "wrong" && !isCurrent && "text-[#EF4444] dark:text-[#F04452]",
                                state === "pending" && !isCurrent && "text-[#94A3B8] dark:text-[#9AAAC0]"
                              )}
                            >
                              {ch}
                            </span>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            }

            let globalIndex = pageStartCharIndex;

            const renderWord = (word: string, wIdxInPage: number, isLastWordInText: boolean) => {
              const wordChars = tokenizeHindi(word);
              const charsWithSpace = isLastWordInText ? wordChars : [...wordChars, " "];
              
              return (
                <div className="flex gap-1.5 sm:gap-2 shrink-0">
                  {charsWithSpace.map((ch, cIdx) => {
                    const i = globalIndex++;
                    const typedCh = typedChars[i];
                    const isCurrent = i === typedChars.length;
                    const state = typedCh === undefined ? "pending" : typedCh === ch ? "correct" : "wrong";
                    const isSpace = ch === " ";
                    
                    return (
                      <div
                        key={cIdx}
                        className={cn(
                          "flex items-center justify-center rounded-xl bg-card dark:bg-[#1C304A] shadow-sm border border-border/50 dark:border-[rgba(255,255,255,0.05)] transition-all duration-300 shrink-0",
                          isSpace 
                            ? (isFocusMode ? "w-16 sm:w-20" : "w-14 sm:w-16") 
                            : (isFocusMode ? "size-12 sm:size-14" : "size-11 sm:size-12"),
                          
                          state === "pending" && !isCurrent && "border border-border/60 text-[#94A3B8] dark:text-[#9AAAC0]",
                          isCurrent && "outline outline-[2.5px] outline-offset-[2.5px] outline-[#F59E0B] dark:outline-[#F7C843] border-transparent z-10 shadow-[0_4px_14px_rgba(245,158,11,0.2)] dark:shadow-[0_4px_14px_rgba(247,200,67,0.25)] text-[#F59E0B] dark:text-[#F7C843] scale-105",
                          state === "correct" && !isCurrent && "border border-[#16A34A]/30 dark:border-[#12B76A]/30 bg-[#16A34A]/8 dark:bg-[#12B76A]/8 text-[#16A34A] dark:text-[#12B76A]",
                          state === "wrong" && !isCurrent && "border-2 border-[#EF4444] dark:border-[#F04452] bg-[#EF4444]/10 dark:bg-[#F04452]/10 text-[#EF4444] dark:text-[#F04452]",
                        )}
                      >
                        {isSpace ? (
                          <span className={cn(
                            "font-bold uppercase tracking-widest transition-all duration-300",
                            isFocusMode ? "text-[10px] sm:text-[11px]" : "text-[9px] sm:text-[10px]",
                            state === "pending" ? "text-[#94A3B8] dark:text-[#9AAAC0]" :
                            state === "correct" ? "text-[#16A34A]/70 dark:text-[#12B76A]/70" :
                            state === "wrong" ? "text-[#EF4444] dark:text-[#F04452]" :
                            "text-[#F59E0B] dark:text-[#F7C843]"
                          )}>
                            Space
                          </span>
                        ) : (
                          <span className={cn(
                            "font-hindi font-bold transition-all duration-300",
                            isFocusMode ? "text-2xl sm:text-[28px]" : "text-xl sm:text-2xl"
                          )}>
                            {ch}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            };

            return (
              <div className="grid grid-cols-2 gap-x-10 sm:gap-x-16 gap-y-5 sm:gap-y-7 w-max mx-auto px-2">
                {visibleWords.map((word, wIdx) => {
                  const absoluteWIdx = startWordIdx + wIdx;
                  const isLastWordInText = absoluteWIdx === words.length - 1;
                  return (
                    <div key={wIdx} className="flex justify-start shrink-0">
                      {renderWord(word, absoluteWIdx, isLastWordInText)}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        <textarea
          ref={inputRef}
          value={typed}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={() => {
            if (isPaused) {
              setIsPaused(false);
            }
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="Hindi typing input"
          className="absolute inset-0 size-full resize-none rounded-3xl bg-transparent p-12 text-transparent caret-transparent outline-none z-10"
        />

        {(!startedAt && !finished) && !isPaused && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            <span className="rounded-full bg-background/90 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-md shadow-md border border-border">
              Click anywhere to start typing
            </span>
          </div>
        )}

        {/* Minimal Premium Pause Overlay */}
        <div 
          className={cn(
            "absolute inset-0 z-20 flex items-center justify-center rounded-3xl transition-all duration-200 pointer-events-none",
            isPaused && !finished ? "bg-primary/10 backdrop-blur-[2px] opacity-100" : "bg-primary/0 backdrop-blur-none opacity-0"
          )}
        >
          <span 
            className={cn(
              "text-[18px] sm:text-[20px] font-semibold text-primary drop-shadow-sm transition-all duration-200 animate-pulse",
              isPaused && !finished ? "scale-100 opacity-100" : "scale-95 opacity-0"
            )}
          >
            ⌨️ Press any key to resume
          </span>
        </div>

        {/* Premium Chapter Mastery Modal */}
        {finished && (
          <ChapterMasteryModal 
            wpm={wpm}
            accuracy={accuracy}
            errors={errors}
            isValid={validation.isValid}
            grade={validation.grade}
            xp={validation.xp}
            nextLessonSlug={nextLesson?.slug}
            onPracticeAgain={reset}
          />
        )}
      </div>

      {/* Preserved Keyboard Component */}
      <div className={cn(
        "mx-auto w-full transition-all duration-300 ease-in-out",
        isFocusMode ? "h-0 max-w-[1050px] opacity-0 overflow-hidden m-0 p-0" : "h-auto max-w-[850px] opacity-100 -mt-2 sm:-mt-4"
      )}>
        {showKeyboard && <HindiKeyboard nextChar={nextChar} />}
      </div>
        </div> {/* Close Arena Wrapper */}

      </div> {/* Close Left Side */}

      {/* Right Side: Live Session Stats Panel */}
      <div className={cn(
        "shrink-0 transition-all duration-300 ease-in-out",
        isFocusMode 
          ? "w-0 h-0 opacity-0 overflow-hidden m-0 p-0" 
          : "w-full lg:w-[30%] lg:max-w-[320px] lg:min-w-[280px] space-y-4 sm:space-y-6 mt-6 lg:mt-0 opacity-100"
      )}>
        <div className="bg-card/60 dark:bg-[linear-gradient(145deg,#101F34,#0D1A2D)] rounded-[24px] p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] border border-border/40 dark:border-[rgba(255,255,255,0.09)] flex flex-col gap-5">
          <h3 className="text-xl font-semibold tracking-tight text-foreground dark:text-[#F4F7FB]">Live Session</h3>
          
          {/* 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
             {/* Speed */}
             <div className="bg-background/80 dark:bg-[#071426] rounded-[20px] p-4 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-1">
               <span className="text-[10px] font-bold text-muted-foreground dark:text-[#8FA2BC] uppercase tracking-wider">Speed</span>
               <div className="flex items-center gap-1">
                 <span className="text-[28px] font-semibold tracking-tight text-primary dark:text-[#4B8BFF]">{wpm}</span>
                 <span className="text-[13px] font-semibold text-muted-foreground dark:text-[#8FA2BC]">WPM</span>
               </div>
             </div>
             {/* Accuracy */}
             <div className="bg-background/80 dark:bg-[#071426] rounded-[20px] p-4 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-1">
               <span className="text-[10px] font-bold text-muted-foreground dark:text-[#8FA2BC] uppercase tracking-wider">Accuracy</span>
               <div className="flex items-center gap-1">
                 <span className="text-[28px] font-semibold tracking-tight text-success dark:text-[#12B76A]">{accuracy}</span>
                 <span className="text-[13px] font-semibold text-muted-foreground dark:text-[#8FA2BC]">%</span>
               </div>
             </div>
             {/* Time */}
             <div className="bg-background/80 dark:bg-[#071426] rounded-[20px] p-4 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-1">
               <span className="text-[10px] font-bold text-muted-foreground dark:text-[#8FA2BC] uppercase tracking-wider">Time</span>
               <div className="flex items-center gap-1">
                 <span className="text-[22px] font-semibold tracking-tight text-foreground dark:text-[#F4F7FB]">{formatTime(elapsed)}</span>
               </div>
             </div>
             {/* Streak */}
             <div className="bg-background/80 dark:bg-[#071426] rounded-[20px] p-4 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.05)] flex flex-col gap-1">
               <span className="text-[10px] font-bold text-muted-foreground dark:text-[#8FA2BC] uppercase tracking-wider">Streak</span>
               <div className="flex items-center gap-1">
                 <span className="text-[22px] font-semibold tracking-tight text-orange-500 dark:text-[#F7C843]">{currentStreak}</span>
                 <span className="text-[20px]">🔥</span>
               </div>
             </div>
          </div>



          {/* Action Button */}
          <button 
            onClick={togglePause}
            disabled={finished}
            className={cn(
              "w-full text-white rounded-[14px] py-4 flex items-center justify-center gap-2 font-semibold transition-colors shadow-sm h-[56px]",
              isPaused ? "bg-primary/80 hover:bg-primary text-white" : "bg-primary hover:bg-primary/90 dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8]",
              finished && "opacity-50 cursor-not-allowed"
            )}
          >
            {finished ? (
              <Trophy className="size-4" />
            ) : isPaused || startedAt === null ? (
              <Play className="size-4 fill-current" />
            ) : (
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-3.5 bg-white/90 rounded-sm"></span>
                <span className="w-1.5 h-3.5 bg-white/90 rounded-sm"></span>
              </div>
            )}
            {finished ? "Session Complete" : startedAt === null ? "Start Session" : isPaused ? "Resume Session" : "Pause Session"}
          </button>

          {/* Submit Button */}
          <button 
            onClick={() => setForceFinish(true)}
            disabled={finished || startedAt === null}
            className={cn(
              "w-full text-foreground rounded-[14px] py-4 flex items-center justify-center gap-2 font-semibold transition-colors shadow-sm h-[56px] border border-border/40",
              "bg-secondary/30 hover:bg-secondary/50 dark:bg-[#071426] dark:hover:bg-[#1C304A]",
              (finished || startedAt === null) && "opacity-50 cursor-not-allowed"
            )}
          >
            <CheckCircle className="size-4" />
            Submit Session
          </button>
        </div>

        {/* Focus Mode Toggle */}
        <div 
          onClick={() => setIsFocusMode(true)}
          className="bg-background/80 dark:bg-[linear-gradient(145deg,#101F34,#0D1A2D)] rounded-[24px] p-5 sm:p-6 shadow-sm border border-border/40 dark:border-[rgba(255,255,255,0.09)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.18)] flex items-center justify-between cursor-pointer hover:bg-secondary/30 dark:hover:bg-[#1C304A] transition-colors"
        >
           <div className="flex flex-col gap-0.5">
             <span className="font-semibold text-sm text-foreground dark:text-[#F4F7FB]">Focus Mode</span>
             <span className="text-[11px] text-muted-foreground dark:text-[#71839B] font-medium">Hide distractions</span>
           </div>
           {/* Toggle Switch */}
           <div className="w-11 h-6 bg-secondary/80 rounded-full relative shadow-inner border border-border/50">
             <div className="w-4 h-4 bg-muted-foreground/50 rounded-full absolute left-1 top-1 transition-all"></div>
           </div>
        </div>
      </div>
    </div>
    </>
  );
}

function formatTime(total: number) {
  const t = Math.floor(total);
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}