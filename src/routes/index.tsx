import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BarChart3, Gauge, Keyboard, Sparkles, Target } from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { HindiKeyboard } from "@/components/typing/HindiKeyboard";
import { LessonCard } from "@/components/typing/LessonCard";
import TypingTestSettings from "@/components/typing/TypingTestSettings";
import { lessons } from "@/lib/typing-data";
import { categories } from "@/routes/lessons";
import { useAuth } from "@/lib/auth";
import { BookOpen, X, ChevronRight } from "lucide-react";

import { z } from "zod";

const searchSchema = z.object({
  test: z.boolean().optional().catch(undefined),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Hindi Typing Practice — Abhyas Studio" },
      {
        name: "description",
        content:
          "Learn Hindi Remington typing with guided lessons, live WPM, accuracy tracking and an animated virtual keyboard.",
      },
      { property: "og:title", content: "Hindi Typing Practice — Abhyas Studio" },
      {
        property: "og:description",
        content: "Guided Hindi typing lessons with live WPM, accuracy and finger guidance.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Keyboard,
    title: "Remington Keyboard",
    text: "एनिमेटेड वर्चुअल कीबोर्ड और उंगली मार्गदर्शन के साथ सही तकनीक सीखें।",
    bg: "linear-gradient(135deg, #2563eb, #3b82f6)",
    to: "/practice" as const,
  },
  {
    icon: Gauge,
    title: "Live WPM",
    text: "हर कीस्ट्रोक पर गति, शुद्धता और त्रुटियाँ रीयल-टाइम में देखें।",
    bg: "linear-gradient(135deg, #16a34a, #22c55e)",
    to: "/practice" as const,
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    text: "साप्ताहिक चार्ट, स्ट्रीक और अभ्यास समय एक ही डैशबोर्ड पर।",
    bg: "linear-gradient(135deg, #ea580c, #f97316)",
    to: "/dashboard" as const,
  },
  {
    icon: Award,
    title: "Achievements",
    text: "बैज और लीडरबोर्ड आपको हर दिन अभ्यास के लिए प्रेरित करते हैं।",
    bg: "linear-gradient(135deg, #ca8a04, #eab308)",
    to: "/profile" as const,
  },
];

function Index() {
  const { currentUser } = useAuth();
  const [progressData, setProgressData] = useState<Record<string, any>>({});
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
  const search = Route.useSearch();
  const isTestSettingsOpen = !!search.test;
  const [activeLang, setActiveLang] = useState('Hindi');
  const [isHindiExpanded, setIsHindiExpanded] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    
    const loadData = () => {
      const data: Record<string, any> = {};
      for (const l of lessons) {
         const saved = localStorage.getItem(`lesson_state_${currentUser}_${l.slug}`);
         if (saved) {
           try { data[l.slug] = JSON.parse(saved); } catch (e) {}
         }
      }
      setProgressData(data);
    };

    loadData();
    window.addEventListener('lessonProgressUpdated', loadData);
    return () => window.removeEventListener('lessonProgressUpdated', loadData);
  }, [currentUser]);

  const displayLessons = useMemo(() => {
    return lessons.slice(0, 6).map((baseItem) => {
      const saved = progressData[baseItem.slug] || { progress: 0, completed: false };
      
      const item = {
        ...baseItem,
        icon: BookOpen,
        path: "/practice",
        search: { lesson: baseItem.slug },
        progress: saved.progress || 0,
        isCompleted: saved.completed || false,
        isLocked: false,
      };

      return item;
    });
  }, [progressData]);

  if (isTestSettingsOpen) {
    return <TypingTestSettings onClose={() => window.history.back()} />;
  }

  return (
    <div className="space-y-20">
      <section className="flex flex-wrap items-center justify-between gap-10 lg:gap-12">
        <div className="flex-[1_1_min(100%,500px)] lg:max-w-[55%] flex flex-col gap-6 lg:gap-8 relative z-10 pt-4 lg:pt-0">
          <span className="en inline-flex items-center gap-2 rounded-full bg-secondary/80 border border-border/40 px-4 py-1.5 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold tracking-wide text-primary uppercase w-fit">
            <Sparkles className="size-3.5" /> Premium Hindi typing trainer
          </span>
          <h1 className="mt-5 py-1 pl-1 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.25] font-extrabold tracking-tight text-foreground">
            हिंदी टाइपिंग सीखें,
            <span className="text-gradient block mt-1">तेज़ी और शुद्धता के साथ</span>
          </h1>
          <p className="mt-5 max-w-xl font-hindi text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-muted-foreground">
            संरचित पाठ, परीक्षा-स्तरीय अभ्यास और रीयल-टाइम विश्लेषण — सब कुछ एक सुंदर,
            सहज इंटरफ़ेस में।
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/practice"
              className="btn-primary inline-flex justify-center items-center w-full sm:w-auto"
            >
              अभ्यास शुरू करें
            </Link>
            <Link
              to="/lessons"
              className="inline-flex justify-center items-center rounded-full border border-border bg-card/80 px-6 py-3.5 sm:py-3 text-[clamp(0.875rem,2vw,0.875rem)] sm:text-[1rem] font-semibold text-foreground transition-colors hover:bg-card dark:bg-[rgba(255,255,255,0.04)] dark:backdrop-blur-[16px] dark:backdrop-saturate-[120%] dark:border-[rgba(255,255,255,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:hover:bg-[rgba(255,255,255,0.06)]"
            >
              पाठ देखें
            </Link>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
            <Link to="/lessons" className="col-span-2 grid grid-cols-2 gap-3 sm:gap-4 group cursor-pointer hover:-translate-y-0.5 transition-transform duration-200">
              {[
                { k: `${lessons.length}+`, v: "Lessons" },
                { k: `${categories.length}+`, v: "Lesson Tracks" },
              ].map((s) => (
                <div key={s.v} className="bg-white/90 backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-[0_6px_18px_rgba(30,80,140,0.08)] rounded-2xl px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1 transition-colors duration-200 group-hover:bg-primary/5 group-hover:border-primary/20">
                  <p className="en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none">{s.k}</p>
                  <p className="en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance">{s.v}</p>
                </div>
              ))}
            </Link>
            <div className="bg-white/90 backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-[0_6px_18px_rgba(30,80,140,0.08)] rounded-2xl px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1">
              <p className="en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none">100%</p>
              <p className="en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance">Free to use</p>
            </div>
          </div>
        </div>

        <div className="flex-[1_1_min(100%,350px)] lg:max-w-[42%]">
          <div className="animate-float-soft p-3 sm:p-[16px] rounded-2xl bg-white/80 dark:bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] dark:backdrop-saturate-[120%] border border-[rgba(255,255,255,0.85)] dark:border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_rgba(30,80,140,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.2)] flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 size-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
            
            <p className="en text-[clamp(0.7rem,1.5vw,0.75rem)] font-bold tracking-widest text-muted-foreground dark:text-[#71839B] uppercase mb-0 px-1">
              Explore
            </p>

            {/* Option 1: Typing Tutor (Highlighted) */}
            <div className="group relative flex flex-col rounded-2xl p-3.5 bg-white dark:bg-[rgba(255,255,255,0.03)] border border-primary/30 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-[#0D203A] dark:text-[#3B82F6]">
                  <span className="text-2xl">⌨️</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="en font-bold text-slate-900 dark:text-[#F4F7FB] text-xl leading-tight">Typing Tutor</h3>
                  <p className="en text-sm text-slate-500 dark:text-[#71839B] font-medium mt-0.5">5 layouts available</p>
                </div>
              </div>
              <div className="mt-3.5 relative z-10 flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Top Primary Switcher */}
                <div className="flex bg-[#f1f5f9] dark:bg-[rgba(8,20,38,0.45)] p-1 rounded-2xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.06)]">
                  <div 
                    onClick={() => {
                      setActiveLang('Hindi');
                      setIsHindiExpanded(true);
                    }}
                    className={`flex-1 flex items-center justify-center h-[44px] rounded-xl text-sm font-bold cursor-pointer transition-all ${
                      activeLang === 'Hindi' 
                        ? 'bg-white dark:bg-[#334762] text-slate-900 dark:text-[#FFFFFF] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700 dark:text-[#91A2B8] dark:hover:bg-[rgba(255,255,255,0.05)] font-medium'
                    }`}
                  >
                    Hindi
                  </div>
                  <div 
                    onClick={() => {
                      setActiveLang('English');
                      setIsHindiExpanded(false);
                    }}
                    className={`flex-1 flex items-center justify-center h-[44px] rounded-xl text-sm font-bold cursor-pointer transition-all ${
                      activeLang === 'English' 
                        ? 'bg-white dark:bg-[#334762] text-slate-900 dark:text-[#FFFFFF] shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700 dark:text-[#91A2B8] dark:hover:bg-[rgba(255,255,255,0.05)] font-medium'
                    }`}
                  >
                    English
                  </div>
                </div>

                {/* Secondary Hindi Sub-Layouts */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${
                    isHindiExpanded ? "grid-rows-[1fr] opacity-100 mt-1.5" : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-1.5 bg-[#f1f5f9] dark:bg-transparent p-2 rounded-2xl border border-slate-200/50 dark:border-none">
                    <Link 
                      to="/lessons"
                      className="flex items-center justify-center text-center h-[54px] px-2 rounded-xl text-sm leading-tight font-bold bg-[#2563eb] dark:bg-[#2B6FFF] text-white shadow-[0_2px_8px_rgba(37,99,235,0.25)] dark:shadow-[0_8px_20px_rgba(43,111,255,0.22)] transition-all cursor-pointer hover:opacity-90"
                    >
                      Remington GAIL
                    </Link>
                    <div className="flex items-center justify-center text-center h-[54px] px-2 rounded-xl text-sm leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer">
                      Remington CBI
                    </div>
                    <Link to="/lessons/kruti-dev" className="flex items-center justify-center text-center h-[54px] px-2 rounded-xl text-sm leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer">
                      Kruti Dev
                    </Link>
                    <div className="flex items-center justify-center text-center h-[54px] px-2 rounded-xl text-sm leading-tight font-bold text-slate-700 dark:text-[#C4CFDD] dark:bg-transparent hover:bg-white dark:hover:bg-[rgba(255,255,255,0.05)] transition-all cursor-pointer">
                      Mangal InScript
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* Option 2: Typing Test */}
              <Link 
                to="/"
                search={{ test: true }}
                className="group relative flex flex-col rounded-2xl p-3 bg-white/70 dark:bg-[rgba(255,255,255,0.02)] border border-slate-200 shadow-[0_4px_12px_rgba(30,80,140,0.06)] dark:border-[rgba(255,255,255,0.06)] transition-all duration-300 hover:bg-white/90 dark:hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_6px_16px_rgba(30,80,140,0.1)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:-translate-y-1 cursor-pointer"
                style={{ textDecoration: 'none' }}
              >
                <div className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-[rgba(255,255,255,0.08)] text-slate-400 transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                  <span className="text-xs leading-none">&rarr;</span>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-[rgba(255,255,255,0.08)] text-slate-600 dark:text-[#F4F7FB] mb-2">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="en font-bold text-slate-800 dark:text-[#F4F7FB] text-base leading-tight">Typing Test</h3>
                  <p className="en text-xs text-slate-600 dark:text-[#A9B8CC] font-medium mt-0.5">Speed & Accuracy</p>
                </div>
              </Link>

              {/* Option 3: Translator */}
              <Link to="/translator" className="group relative flex flex-col rounded-2xl p-3 bg-white/70 dark:bg-[rgba(255,255,255,0.02)] border border-slate-200 shadow-[0_4px_12px_rgba(30,80,140,0.06)] dark:border-[rgba(255,255,255,0.06)] transition-all duration-300 hover:bg-white/90 dark:hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_6px_16px_rgba(30,80,140,0.1)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] hover:-translate-y-1 cursor-pointer">
                <div className="absolute top-3 right-3 flex size-6 items-center justify-center rounded-full bg-slate-100 dark:bg-[rgba(255,255,255,0.08)] text-slate-400 transition-colors group-hover:bg-[#2563eb] group-hover:text-white">
                  <span className="text-xs leading-none">&rarr;</span>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-[rgba(255,255,255,0.08)] text-slate-600 dark:text-[#F4F7FB] mb-2">
                  <span className="text-xl">🌐</span>
                </div>
                <div>
                  <h3 className="en font-bold text-slate-800 dark:text-[#F4F7FB] text-base leading-tight">Translator</h3>
                  <p className="en text-xs text-slate-600 dark:text-[#A9B8CC] font-medium mt-0.5">Hindi ↔ English</p>
                </div>
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      <section>
        <div className="mb-[32px] animate-rise-in">
          <span className="en block text-[#2563eb] font-bold text-xs tracking-[1px] uppercase mb-2">
            Why Abhyas
          </span>
          <h2 className="en text-3xl font-extrabold text-foreground leading-tight">
            A learning experience built for Hindi typists
          </h2>
          <p className="mt-3 text-sm text-[#64748b] max-w-2xl font-hindi leading-relaxed">
            हर सुविधा आपकी गति और आत्मविश्वास बढ़ाने के लिए डिज़ाइन की गई है।
          </p>
        </div>
        <div className="grid gap-[20px] grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {features.map((f, i) => (
            <Link
              to={f.to}
              key={f.title}
              className="group block bg-[#ffffff] border border-[#e6ebf2] rounded-2xl px-[22px] py-[26px] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(20,30,60,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 animate-rise-in cursor-pointer"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="flex w-[46px] h-[46px] items-center justify-center rounded-xl mb-[16px] transition-transform duration-200 group-hover:scale-110"
                style={{ background: f.bg }}
              >
                <f.icon className="w-[20px] h-[20px] text-white" />
              </div>
              <h3 className="en text-base font-bold text-foreground dark:text-[#0f172a] mb-[6px]">{f.title}</h3>
              <p className="font-hindi text-sm text-[#64748b] dark:text-[#64748b] leading-[1.6]">{f.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Curriculum"
            title="Six structured lesson tracks"
            subtitle="होम रो से लेकर परीक्षा अभ्यास तक — क्रमबद्ध रूप से आगे बढ़ें।"
          />
          <Link
            to="/lessons"
            className="group mb-1 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground shrink-0"
          >
            More <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {displayLessons.map((l) => (
            <LessonCard 
              key={l.slug} 
              item={l} 
            />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Virtual keyboard"
          title="Hindi Remington layout with finger guidance"
          subtitle="हर अक्षर के लिए सही उंगली और शिफ्ट संकेत।"
        />
        <div className="mt-8">
          <HindiKeyboard nextChar="क" />
        </div>
      </section>

      {isTutorModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md"
          style={{ animation: 'fadeIn 200ms ease-out' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsTutorModalOpen(false);
          }}
        >
          <div 
            className="relative w-full max-w-[460px] rounded-3xl bg-[rgba(255,255,255,0.65)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.75)] shadow-[0_24px_48px_rgba(30,80,140,0.12),0_0_40px_rgba(56,189,248,0.15)] p-6 sm:p-7"
            style={{ animation: 'scaleIn 200ms ease-out' }}
          >
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
            `}</style>
            
            <button 
              onClick={() => setIsTutorModalOpen(false)} 
              className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-800 hover:bg-white/40 rounded-full transition-colors focus:outline-none"
            >
              <X className="size-5" />
            </button>
            
            <h2 className="en text-xl font-extrabold text-slate-800 mb-5 px-1 tracking-tight">Choose Typing Tutor</h2>
            
            <div className="flex flex-col gap-3">
               <Link 
                 to="/lessons" 
                 onClick={() => setIsTutorModalOpen(false)}
                 className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/50 border border-white/80 shadow-sm hover:shadow-md hover:bg-white/80 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative overflow-hidden gap-3"
               >
                  <div className="absolute inset-0 bg-primary/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col">
                     <span className="en font-bold text-slate-900 text-base">Hindi Typing — Remington GAIL</span>
                     <span className="en text-sm text-slate-600 mt-0.5 font-medium">Hindi Remington GAIL typing practice</span>
                  </div>
                  <div className="relative z-10 flex items-center justify-between sm:justify-end gap-3">
                     <span className="en text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-widest">Available</span>
                     <ChevronRight className="size-4 text-primary transition-transform group-hover:translate-x-1 hidden sm:block" />
                  </div>
               </Link>

               {[
                 { title: "Hindi Typing — Remington CBI", sub: "Hindi Remington CBI typing practice" },
                 { title: "Hindi Typing — KrutiDev", sub: "KrutiDev typing practice" },
                 { title: "Hindi Typing — Mangal Inscript", sub: "Mangal Inscript typing practice" },
                 { title: "English Typing Tutor", sub: "English typing practice" }
               ].map((item) => (
                 <div key={item.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/20 border border-white/30 cursor-not-allowed gap-3">
                    <div className="flex flex-col opacity-75">
                       <span className="en font-bold text-slate-700 text-base">{item.title}</span>
                       <span className="en text-sm text-slate-600 mt-0.5 font-medium">{item.sub}</span>
                    </div>
                    <div className="flex items-center">
                       <span className="en text-xs font-bold text-slate-600 bg-white/40 px-2.5 py-1 rounded-full uppercase tracking-widest">Coming Soon</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

