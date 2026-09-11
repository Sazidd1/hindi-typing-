import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRightLeft, Copy, Trash2, Languages } from "lucide-react";

export const Route = createFileRoute("/translator")({
  component: TranslatorPage,
});

function TranslatorPage() {
  const [sourceLang, setSourceLang] = useState("Hindi");
  const [targetLang, setTargetLang] = useState("English");

  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(targetText);
    setTargetText(sourceText);
  };

  const handleClear = () => {
    setSourceText("");
    setTargetText("");
  };

  const handleCopy = () => {
    if (targetText) {
      navigator.clipboard.writeText(targetText);
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-5xl mx-auto flex flex-col gap-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col items-center sm:items-start gap-2 mb-2 px-2">
        <h1 className="en text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center justify-center sm:justify-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Languages className="size-6" />
          </div>
          Hindi ↔ English Translator
        </h1>
        <p className="en text-[15px] sm:text-base text-slate-600 dark:text-slate-400 font-medium">
          Translate Hindi and English text quickly and easily.
        </p>
      </div>

      {/* Translator Workspace */}
      <div className="relative flex flex-col bg-white/80 dark:bg-slate-900/60 backdrop-blur-[20px] rounded-[24px] border border-[rgba(255,255,255,0.85)] dark:border-white/10 shadow-[0_8px_32px_rgba(30,80,140,0.08)] p-2 overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 size-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 size-64 bg-cyan-400/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row min-h-[360px]">
          {/* Left Panel (Source) */}
          <div className="flex-1 flex flex-col p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="en font-bold text-slate-800 dark:text-slate-200 text-lg">
                {sourceLang}
              </span>
            </div>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={
                sourceLang === "Hindi"
                  ? "Hindi text yahan type karein..."
                  : "Type English text here..."
              }
              className="flex-1 w-full resize-none bg-transparent border-0 focus:ring-0 p-1 text-slate-800 dark:text-slate-100 text-[18px] sm:text-[20px] leading-relaxed placeholder:text-slate-400 font-hindi outline-none"
              spellCheck="false"
            />
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
              <span className="en text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {sourceText.length} characters
              </span>
            </div>
          </div>

          {/* Swap Button Divider */}
          <div className="flex lg:flex-col items-center justify-center py-2 lg:py-0 lg:px-2 relative">
            <div className="absolute inset-x-6 lg:inset-x-auto lg:inset-y-6 top-1/2 lg:top-auto lg:left-1/2 w-auto h-px lg:w-px lg:h-auto bg-slate-200 dark:bg-white/10 -z-10" />
            <button
              onClick={handleSwap}
              title="Swap languages"
              className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-sm text-primary hover:text-white hover:bg-primary transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 z-10"
            >
              <ArrowRightLeft className="size-5" />
            </button>
          </div>

          {/* Right Panel (Target) */}
          <div className="flex-1 flex flex-col p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-[20px] lg:rounded-l-none">
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="en font-bold text-slate-800 dark:text-slate-200 text-lg">
                {targetLang}
              </span>
            </div>
            <textarea
              value={targetText}
              onChange={(e) => setTargetText(e.target.value)}
              placeholder="Translation will appear here..."
              className="flex-1 w-full resize-none bg-transparent border-0 focus:ring-0 p-1 text-slate-800 dark:text-slate-100 text-[18px] sm:text-[20px] leading-relaxed placeholder:text-slate-400 font-hindi outline-none"
              spellCheck="false"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 flex-wrap mt-2">
        <button
          onClick={handleClear}
          className="flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          <Trash2 className="size-4" />
          Clear
        </button>
        <button
          className="flex items-center justify-center rounded-full px-12 py-3.5 text-base font-bold text-white shadow-[0_8px_16px_rgba(30,80,140,0.2)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 active:scale-95"
          style={{ background: "var(--gradient-primary)" }}
        >
          Translate
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 shadow-sm transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          <Copy className="size-4" />
          Copy
        </button>
      </div>
    </div>
  );
}
