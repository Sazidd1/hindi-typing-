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
  const [typedWord, setTypedWord] = useState("");
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

  const inputRef = useRef<HTMLInputElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const lastActiveTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const { currentUser } = useAuth();

  // Reset function
  const reset = useCallback(() => {
    setCurrentWordIndex(0);
    setTypedWord("");
    setStartedAt(null);
    setIsPaused(false);
    setElapsed(0);
    setErrors(0);
    setFinished(false);
    setForceFinish(false);
    setCorrectWordsCount(0);
    setCorrectCharsCount(0);
    setCurrentStreak(0);
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
      activeWordRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentWordIndex]);

  // Calculate Metrics
  const minutes = elapsed / 60;
  // standard WPM formula: (chars / 5) / minutes
  const wpm = minutes > 0 ? Math.round((correctCharsCount / 5) / minutes) : 0;
  const totalAttempted = currentWordIndex;
  const accuracy = totalAttempted > 0 ? Math.round((correctWordsCount / totalAttempted) * 100) : 100;

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
  }, [elapsed, timeLimit, currentWordIndex, words.length, finished, startedAt, forceFinish, wpm, accuracy, errors, onComplete]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (finished || isPaused) return;
    if (startedAt === null) setStartedAt(Date.now());
    
    const value = e.target.value;
    
    // Map physical English keystrokes to Hindi chars
    let mappedValue = value;
    if (value.startsWith(typedWord) && value.length > typedWord.length) {
      const added = value.slice(typedWord.length);
      const mappedAdded = Array.from(added).map(ch => HINDI_MAP[ch] || ch).join('');
      mappedValue = typedWord + mappedAdded;
    } else {
      mappedValue = Array.from(value).map(ch => HINDI_MAP[ch] || ch).join('');
    }
    
    setTypedWord(mappedValue);

    const targetWord = words[currentWordIndex] || "";
    if (mappedValue.trim() === targetWord) {
      submitWord(mappedValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (finished || isPaused) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      submitWord(typedWord);
    }
  };

  const submitWord = (wordToSubmit = typedWord) => {
    if (finished || isPaused || currentWordIndex >= words.length) return;
    if (wordToSubmit.trim() === '') return;

    const targetWord = words[currentWordIndex] || "";
    
    if (wordToSubmit.trim() === targetWord) {
      setCorrectWordsCount(prev => prev + 1);
      setCorrectCharsCount(prev => prev + targetWord.length + 1); // +1 for space
      setCurrentStreak(prev => prev + 1);
    } else {
      setErrors(prev => prev + 1);
      setCurrentStreak(0);
    }

    setTypedWord("");
    setCurrentWordIndex(prev => prev + 1);
  };

  const togglePause = useCallback(() => {
    if (finished) return;
    if (startedAt === null) {
      setStartedAt(Date.now());
      inputRef.current?.focus();
      return;
    }
    setIsPaused(p => {
      if (p) setTimeout(() => inputRef.current?.focus(), 10);
      return !p;
    });
  }, [startedAt, finished]);

  return (
    <div className="mx-auto w-[98%] max-w-[1350px] flex flex-col lg:flex-row gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2 sm:px-4 -mt-4 sm:-mt-6">
      
      {/* Left Side: Modern Reader Card */}
      <div className="flex flex-col flex-1 w-full gap-4">
        
        {(title || subtitle) && (
          <h2 className="text-slate-900 dark:text-[#F4F7FB] text-center font-bold text-2xl sm:text-3xl leading-tight px-2 mt-0 mb-4 relative z-10">
            {title} {subtitle && <span className="font-hindi text-gray-500 dark:text-[#8FA2BC]">( {subtitle} )</span>}
          </h2>
        )}

        {/* Reader Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col w-full relative">
          
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#5b56e8] animate-pulse shadow-[0_0_8px_rgba(91,86,232,0.4)]"></div>
              <span className="font-semibold text-slate-700 text-sm tracking-wide">Word Highlight Practice</span>
            </div>
            <div className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
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
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal',
              lineHeight: 2.2
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
                      isActive && "bg-[#eeecfd] text-[#5b56e8] font-bold px-2 py-0.5 rounded-md shadow-sm scale-105",
                      isCompleted && "text-slate-400 font-normal",
                      isPending && "text-slate-800 font-normal"
                    )}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Input Box & Toolbar Area */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-4">
            
            <input
              ref={inputRef}
              type="text"
              value={typedWord}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={finished || isPaused}
              placeholder="हाइलाइट किया हुआ शब्द टाइप करें..."
              autoComplete="off"
              spellCheck="false"
              className="w-full text-lg sm:text-xl font-hindi px-5 py-4 rounded-xl border border-slate-200 bg-white shadow-inner focus:outline-none focus:border-[#5b56e8] focus:ring-2 focus:ring-[#5b56e8]/20 transition-all placeholder:text-slate-400 placeholder:font-sans text-slate-800"
            />

            {/* Bottom Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              
              {/* Text Formatting Pills */}
              <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(f => Math.min(f + 2, 32))} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 hover:text-[#5b56e8] transition-colors shadow-sm" aria-label="Increase text size">A+</button>
                <button onClick={() => setFontSize(f => Math.max(f - 2, 14))} className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 hover:text-[#5b56e8] transition-colors shadow-sm" aria-label="Decrease text size">A-</button>
                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                <button onClick={() => setIsBold(b => !b)} className={cn("w-10 h-10 flex items-center justify-center rounded-lg border font-serif font-bold transition-colors shadow-sm", isBold ? "bg-[#eeecfd] border-[#5b56e8]/30 text-[#5b56e8]" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100")}>B</button>
                <button onClick={() => setIsItalic(i => !i)} className={cn("w-10 h-10 flex items-center justify-center rounded-lg border font-serif italic transition-colors shadow-sm", isItalic ? "bg-[#eeecfd] border-[#5b56e8]/30 text-[#5b56e8]" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100")}>I</button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={reset}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border-2 border-[#5b56e8]/20 text-[#5b56e8] font-semibold hover:bg-[#5b56e8]/5 transition-colors bg-white"
                >
                  Retake
                </button>
                <button 
                  onClick={() => submitWord(typedWord)}
                  disabled={finished || isPaused || typedWord.trim() === ''}
                  className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg bg-[#5b56e8] hover:bg-[#4a45d0] text-white font-semibold shadow-md shadow-[#5b56e8]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              isPaused && !finished ? "bg-white/60 backdrop-blur-sm opacity-100" : "bg-white/0 backdrop-blur-none opacity-0"
            )}
          >
            <span 
              className={cn(
                "text-2xl font-bold text-[#5b56e8] drop-shadow-sm transition-all duration-200 animate-pulse px-6 py-3 bg-white rounded-xl shadow-lg border border-[#5b56e8]/20",
                isPaused && !finished ? "scale-100 opacity-100" : "scale-95 opacity-0"
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
      <div className="shrink-0 transition-all duration-300 ease-in-out w-full lg:w-[30%] lg:max-w-[320px] lg:min-w-[280px] space-y-4 sm:space-y-6 mt-6 lg:mt-0 opacity-100">
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
              isPaused ? "bg-[#5b56e8]/80 hover:bg-[#5b56e8]" : "bg-[#5b56e8] hover:bg-[#4a45d0]",
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
            Finish Session
          </button>
        </div>
      </div>

    </div>
  );
}

function formatTime(total: number) {
  const t = Math.floor(total);
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
