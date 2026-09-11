import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Trophy, Play, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { ChapterMasteryModal } from "@/components/typing/ChapterMasteryModal";
import { HINDI_MAP } from "@/lib/typing-data";

export type TypingResult = {
  wpm: number;
  accuracy: number;
  errors: number;
  seconds: number;
};

export function StoryReaderArena({
  lessonSlug,
  text,
  title,
  subtitle,
  timeLimit,
  onComplete,
}: {
  lessonSlug?: string;
  text: string;
  title?: string;
  subtitle?: string;
  timeLimit?: number;
  onComplete?: (result: TypingResult) => void;
}) {
  const [dynamicText, setDynamicText] = useState(text);

  useEffect(() => {
    setDynamicText(text);
  }, [text, lessonSlug]);

  const words = useMemo(() => dynamicText.trim().split(/\s+/), [dynamicText]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [rawVisualText, setRawVisualText] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [finished, setFinished] = useState(false);
  const [forceFinish, setForceFinish] = useState(false);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [correctCharsCount, setCorrectCharsCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Formatting state
  const [fontSize, setFontSize] = useState(20);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const lastActiveTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const { currentUser } = useAuth();

  // Reset function
  const reset = useCallback(() => {
    setCurrentWordIndex(0);
    setTypedText("");
    setStartedAt(null);
    setIsPaused(false);
    setElapsed(0);
    setErrors(0);
    setFinished(false);
    setForceFinish(false);
    setCorrectWordsCount(0);
    setCorrectCharsCount(0);
    setCurrentStreak(0);
    setRawVisualText("");
    completedRef.current = false;
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);

  // Timer logic
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

  // Auto-scroll to active word
  useEffect(() => {
    if (activeWordRef.current) {
      activeWordRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentWordIndex]);

  // Calculate Metrics
  const minutes = elapsed / 60;
  // standard WPM formula: (chars / 5) / minutes
  const wpm = minutes > 0 ? Math.round(correctCharsCount / 5 / minutes) : 0;
  const totalAttempted = currentWordIndex;
  const accuracy =
    totalAttempted > 0 ? Math.round((correctWordsCount / totalAttempted) * 100) : 100;

  // Finish logic
  useEffect(() => {
    if (finished || completedRef.current) return;
    const timeUp = timeLimit != null && elapsed >= timeLimit && startedAt !== null;
    const done = currentWordIndex >= words.length && words.length > 0;

    if (timeUp || done || forceFinish) {
      completedRef.current = true;
      setFinished(true);
      onComplete?.({ wpm, accuracy, errors, seconds: elapsed });
    }
  }, [
    elapsed,
    timeLimit,
    currentWordIndex,
    words.length,
    finished,
    startedAt,
    forceFinish,
    wpm,
    accuracy,
    errors,
    onComplete,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (finished || isPaused) return;
    if (startedAt === null) setStartedAt(Date.now());

    const value = e.target.value;

    let newRawVisual = rawVisualText;
    if (value.startsWith(typedText) && value.length > typedText.length) {
      const added = value.slice(typedText.length);
      const mappedAdded = Array.from(added)
        .map((ch) => HINDI_MAP[ch] || ch)
        .join("");
      newRawVisual = rawVisualText + mappedAdded;
    } else if (value.length < typedText.length) {
      const deletedCount = typedText.length - value.length;
      newRawVisual = rawVisualText.slice(0, Math.max(0, rawVisualText.length - deletedCount));
    } else if (!value.startsWith(typedText)) {
      newRawVisual = Array.from(value)
        .map((ch) => HINDI_MAP[ch] || ch)
        .join("");
    }

    setRawVisualText(newRawVisual);

    // Fix: Convert Kruti Dev visual order of chhoti ee ki matra to Unicode logical order
    // This swaps 'ि' with the immediately following consonant or consonant cluster
    const logicalValue = newRawVisual.replace(
      /\u093F((?:[\u0915-\u0939\u0958-\u095F]\u093C?\u094D)*[\u0915-\u0939\u0958-\u095F]\u093C?)/g,
      "$1\u093F",
    );

    setTypedText(logicalValue);

    const inputStr = logicalValue.trimStart();
    const typedWords = inputStr ? inputStr.split(/\s+/) : [];

    const activeIdx = Math.max(0, typedWords.length - 1);
    setCurrentWordIndex(activeIdx);

    let correct = 0;
    let errs = 0;
    let chars = 0;
    let streak = 0;

    const committedWords = typedWords.slice(0, -1);

    committedWords.forEach((tw, i) => {
      const target = words[i] || "";
      if (tw === target) {
        correct++;
        chars += target.length + 1; // +1 for space
        streak++;
      } else {
        errs++;
        streak = 0;
      }
    });

    setCorrectWordsCount(correct);
    setCorrectCharsCount(chars);
    setErrors(errs);
    setCurrentStreak(streak);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (finished || isPaused) return;
    if (e.key === "Enter") {
      e.preventDefault();
      const fakeEvent = {
        target: { value: typedText + " " },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      handleInputChange(fakeEvent);
    }
  };

  const togglePause = useCallback(() => {
    if (finished) return;
    if (startedAt === null) {
      setStartedAt(Date.now());
      inputRef.current?.focus();
      return;
    }
    setIsPaused((p) => {
      if (p) setTimeout(() => inputRef.current?.focus(), 10);
      return !p;
    });
  }, [startedAt, finished]);

  return (
    <>
      {/* Premium background layer for Story mode ONLY */}
      <div
        className="fixed inset-0 z-[-1]"
        style={{
          background: "radial-gradient(ellipse at top, #fffdf8 0%, #f6ecd6 100%)",
        }}
      />
      <div className="mx-auto w-[98%] max-w-[1400px] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-4 py-8 font-sans text-slate-800">
        {/* Title Centered for the entire page */}
        {(title || subtitle) && (
          <h2 className="text-[#1c1917] text-center font-bold text-2xl sm:text-3xl leading-tight px-2 mt-0 mb-6 relative z-10">
            {title}{" "}
            {subtitle && (
              <span className="font-hindi text-[#8c734b] font-medium">( {subtitle} )</span>
            )}
          </h2>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-start w-full">
          {/* Empty left column for center alignment */}
          <div className="hidden lg:block"></div>

          {/* Center Box: Modern Reader Card */}
          <div className="flex flex-col w-full lg:w-[850px] gap-4 max-w-full">
            {/* Reader Card */}
            <div className="bg-white rounded-2xl border border-[rgba(193,158,84,0.15)] shadow-[0_12px_32px_rgba(184,138,68,0.06),0_4px_12px_rgba(184,138,68,0.04)] overflow-hidden flex flex-col w-full relative">
              {/* Card Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(193,158,84,0.15)] bg-gradient-to-r from-[#fffdf8] to-[#fcfaf5]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c19e54] animate-pulse shadow-[0_0_8px_rgba(193,158,84,0.4)]"></div>
                  <span className="font-semibold text-[#1c1917] text-sm tracking-wide">
                    Word Highlight Practice
                  </span>
                </div>
                <div className="text-sm font-medium text-[#8c734b] bg-white px-3 py-1 rounded-full border border-[rgba(193,158,84,0.2)] shadow-sm">
                  Word {Math.min(currentWordIndex + 1, words.length)} of {words.length}
                </div>
              </div>

              {/* Text Display Area */}
              <div
                className="p-6 sm:p-8 overflow-y-auto custom-scrollbar transition-all duration-300"
                style={{
                  maxHeight: "220px",
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  fontSize: `${fontSize}px`,
                  fontWeight: isBold ? "bold" : "normal",
                  fontStyle: isItalic ? "italic" : "normal",
                  lineHeight: 2.2,
                }}
                onClick={() => inputRef.current?.focus()}
              >
                <div className="flex flex-wrap gap-x-[0.3em] gap-y-[0.8em]">
                  {words.map((word, idx) => {
                    const isActive = idx === currentWordIndex;
                    const isCompleted = idx < currentWordIndex;
                    const isPending = idx > currentWordIndex;

                    return (
                      <span
                        key={idx}
                        ref={isActive ? activeWordRef : null}
                        className={cn(
                          "transition-all duration-200",
                          isActive &&
                            "bg-[#f9f5ed] text-[#c19e54] font-bold px-2 py-0.5 rounded-md shadow-sm scale-105",
                          isCompleted && "text-green-600 font-medium opacity-100",
                          isPending && "text-slate-700 font-normal",
                        )}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Input Box & Toolbar Area */}
              <div className="p-6 bg-[#faf8f3] border-t border-[rgba(193,158,84,0.15)] flex flex-col gap-4">
                <textarea
                  ref={inputRef}
                  value={typedText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  disabled={finished || isPaused}
                  placeholder="हाइलाइट किया हुआ शब्द टाइप करें..."
                  autoComplete="off"
                  spellCheck="false"
                  className="w-full text-lg sm:text-xl font-hindi px-5 py-4 rounded-xl border border-[rgba(193,158,84,0.3)] bg-white shadow-inner focus:outline-none focus:border-[#c19e54] focus:ring-[3px] focus:ring-[#c19e54]/15 transition-all placeholder:text-slate-400 placeholder:font-sans text-[#1c1917] resize-none h-[120px] break-all"
                />

                {/* Bottom Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                  {/* Text Formatting Pills */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFontSize((f) => Math.min(f + 2, 32))}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-[rgba(193,158,84,0.2)] text-[#1c1917] font-bold hover:bg-[#f6ecd6] hover:text-[#c19e54] transition-colors shadow-sm"
                      aria-label="Increase text size"
                    >
                      A+
                    </button>
                    <button
                      onClick={() => setFontSize((f) => Math.max(f - 2, 14))}
                      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-[rgba(193,158,84,0.2)] text-[#1c1917] font-bold hover:bg-[#f6ecd6] hover:text-[#c19e54] transition-colors shadow-sm"
                      aria-label="Decrease text size"
                    >
                      A-
                    </button>
                    <div className="w-px h-6 bg-[rgba(193,158,84,0.2)] mx-1"></div>
                    <button
                      onClick={() => setIsBold((b) => !b)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-lg border font-serif font-bold transition-colors shadow-sm",
                        isBold
                          ? "bg-[#f9f5ed] border-[#c19e54]/40 text-[#c19e54]"
                          : "bg-white border-[rgba(193,158,84,0.2)] text-[#1c1917] hover:bg-[#f6ecd6]",
                      )}
                    >
                      B
                    </button>
                    <button
                      onClick={() => setIsItalic((i) => !i)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-lg border font-serif italic transition-colors shadow-sm",
                        isItalic
                          ? "bg-[#f9f5ed] border-[#c19e54]/40 text-[#c19e54]"
                          : "bg-white border-[rgba(193,158,84,0.2)] text-[#1c1917] hover:bg-[#f6ecd6]",
                      )}
                    >
                      I
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={reset}
                      className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border-2 border-[#c19e54]/30 text-[#c19e54] font-semibold hover:bg-[#c19e54]/5 transition-colors bg-white"
                    >
                      Retake
                    </button>
                    <button
                      onClick={() => {
                        if (finished || isPaused || !typedText || /\s$/.test(typedText)) return;
                        const fakeEvent = {
                          target: { value: typedText + " " },
                        } as React.ChangeEvent<HTMLTextAreaElement>;
                        handleInputChange(fakeEvent);
                        inputRef.current?.focus();
                      }}
                      disabled={finished || isPaused || !typedText || /\s$/.test(typedText)}
                      className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-[#c19e54] hover:bg-[#b88a44] text-white font-semibold shadow-md shadow-[#c19e54]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>

              {/* Pause Overlay */}
              <div
                className={cn(
                  "absolute inset-0 z-20 flex items-center justify-center rounded-2xl transition-all duration-200 pointer-events-none",
                  isPaused && !finished
                    ? "bg-white/60 backdrop-blur-sm opacity-100"
                    : "bg-white/0 backdrop-blur-none opacity-0",
                )}
              >
                <span
                  className={cn(
                    "text-2xl font-bold text-[#c19e54] drop-shadow-sm transition-all duration-200 animate-pulse px-6 py-3 bg-white rounded-xl shadow-lg border border-[#c19e54]/30",
                    isPaused && !finished ? "scale-100 opacity-100" : "scale-95 opacity-0",
                  )}
                >
                  ⏸️ Paused. Click to resume
                </span>
              </div>
            </div>

            {/* Chapter Mastery Modal */}
            {finished && (
              <ChapterMasteryModal
                wpm={wpm}
                accuracy={accuracy}
                errors={errors}
                isValid={true}
                grade={"A"}
                xp={100}
                onPracticeAgain={reset}
              />
            )}
          </div>

          {/* Right Side: Live Session Stats Panel */}
          <div className="transition-all duration-300 ease-in-out w-full lg:w-[320px] justify-self-end space-y-4 sm:space-y-6 opacity-100">
            <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-5 sm:p-6 shadow-[0_16px_40px_rgba(184,138,68,0.08)] border border-[rgba(193,158,84,0.15)] flex flex-col gap-5">
              <h3 className="text-xl font-semibold tracking-tight text-[#1c1917]">Live Session</h3>

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Speed */}
                <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[rgba(193,158,84,0.1)] flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#8c734b] uppercase tracking-wider">
                    Speed
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[28px] font-semibold tracking-tight text-[#c19e54]">
                      {wpm}
                    </span>
                    <span className="text-[13px] font-semibold text-[#8c734b]">WPM</span>
                  </div>
                </div>
                {/* Accuracy */}
                <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[rgba(193,158,84,0.1)] flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#8c734b] uppercase tracking-wider">
                    Accuracy
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[28px] font-semibold tracking-tight text-green-600">
                      {accuracy}
                    </span>
                    <span className="text-[13px] font-semibold text-[#8c734b]">%</span>
                  </div>
                </div>
                {/* Time */}
                <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[rgba(193,158,84,0.1)] flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#8c734b] uppercase tracking-wider">
                    Time
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[22px] font-semibold tracking-tight text-[#1c1917]">
                      {formatTime(elapsed)}
                    </span>
                  </div>
                </div>
                {/* Streak */}
                <div className="bg-white rounded-[20px] p-4 shadow-sm border border-[rgba(193,158,84,0.1)] flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-[#8c734b] uppercase tracking-wider">
                    Streak
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[22px] font-semibold tracking-tight text-orange-500">
                      {currentStreak}
                    </span>
                    <span className="text-[20px]">🔥</span>
                  </div>
                </div>
              </div>
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
