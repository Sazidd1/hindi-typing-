import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BarChart3, Gauge, Keyboard, Sparkles, Target } from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { HindiKeyboard } from "@/components/typing/HindiKeyboard";
import { LessonCard } from "@/components/typing/LessonCard";
import { lessons } from "@/lib/typing-data";
import { categories } from "@/routes/lessons";
import { useAuth } from "@/lib/auth";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/")({
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
    let previousLessonCompleted = true; // First lesson always unlocked
    
    return lessons.slice(0, 6).map((baseItem) => {
      const saved = progressData[baseItem.slug] || { progress: 0, completed: false };
      const isLocked = !previousLessonCompleted;
      
      const item = {
        ...baseItem,
        icon: BookOpen,
        path: "/practice",
        search: { lesson: baseItem.slug },
        progress: saved.progress || 0,
        isCompleted: saved.completed || false,
        isLocked,
      };

      previousLessonCompleted = item.isCompleted;
      return item;
    });
  }, [progressData]);

  return (
    <div className="space-y-20">
      <section className="flex flex-wrap items-center justify-between gap-10 lg:gap-12">
        <div className="flex-[1_1_min(100%,450px)] lg:max-w-[55%] animate-rise-in">
          <span className="en inline-flex items-center gap-2 rounded-full bg-secondary/80 border border-border/40 px-4 py-1.5 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold tracking-wide text-primary uppercase">
            <Sparkles className="size-3.5" /> Premium Hindi typing trainer
          </span>
          <h1 className="mt-5 py-1 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.25] font-extrabold tracking-tight text-foreground">
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
              className="inline-flex justify-center items-center rounded-full border border-border bg-card/80 px-6 py-3.5 sm:py-3 text-[clamp(0.875rem,2vw,0.875rem)] sm:text-[1rem] font-semibold text-foreground transition-colors hover:bg-card"
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
                <div key={s.v} className="bg-white/90 backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-[0_6px_18px_rgba(30,80,140,0.08)] rounded-[20px] px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1 transition-colors duration-200 group-hover:bg-primary/5 group-hover:border-primary/20">
                  <p className="en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none">{s.k}</p>
                  <p className="en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance">{s.v}</p>
                </div>
              ))}
            </Link>
            <div className="bg-white/90 backdrop-blur-md border border-[rgba(255,255,255,0.9)] shadow-[0_6px_18px_rgba(30,80,140,0.08)] rounded-[20px] px-2 py-3.5 sm:px-4 text-center flex flex-col justify-center gap-1">
              <p className="en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary leading-none">100%</p>
              <p className="en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground leading-snug text-balance">Free to use</p>
            </div>
          </div>
        </div>

        <div className="flex-[1_1_min(100%,350px)] lg:max-w-[42%]">
          <div className="animate-float-soft p-4 sm:p-5 rounded-[24px] bg-white/80 dark:bg-slate-900/60 backdrop-blur-[20px] border border-[rgba(255,255,255,0.85)] dark:border-white/20 shadow-[0_8px_32px_rgba(30,80,140,0.12)] flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 size-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
            
            <p className="en text-[clamp(0.7rem,1.5vw,0.75rem)] font-bold tracking-widest text-muted-foreground uppercase mb-1 px-1">
              Explore
            </p>

            {/* Option 1: Typing Tutor (Highlighted) */}
            <Link to="/practice" className="group relative flex flex-col rounded-[20px] p-5 bg-white dark:bg-slate-800 border border-primary/30 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <span className="text-[26px]">⌨️</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="en font-bold text-slate-900 dark:text-slate-100 text-[18px] leading-tight">Typing Tutor</h3>
                  </div>
                  <p className="font-hindi text-[14px] text-primary font-medium mt-1 mb-0.5">Hindi Remington</p>
                  <p className="en text-[13px] text-slate-500 dark:text-slate-400">Structured lessons & practice</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end relative z-10">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                  Start Learning <span className="text-lg leading-none">&rarr;</span>
                </span>
              </div>
            </Link>

            <div className="grid grid-cols-2 gap-3">
              {/* Option 2: Typing Test */}
              <Link to="/practice" className="group relative flex flex-col rounded-[18px] p-4 bg-white/70 dark:bg-slate-800/60 border border-slate-200 shadow-[0_4px_12px_rgba(30,80,140,0.06)] dark:border-white/10 transition-all duration-300 hover:bg-white/90 dark:hover:bg-slate-800/80 hover:shadow-[0_6px_16px_rgba(30,80,140,0.1)] hover:-translate-y-1 cursor-pointer">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-3">
                  <span className="text-[20px]">⚡</span>
                </div>
                <div>
                  <h3 className="en font-bold text-slate-800 dark:text-slate-200 text-[15px] leading-tight">Typing Test</h3>
                  <p className="en text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-1">Speed & Accuracy</p>
                </div>
              </Link>

              {/* Option 3: Translator */}
              <div className="group relative flex flex-col rounded-[18px] p-4 bg-white/70 dark:bg-slate-800/60 border border-slate-200 shadow-[0_4px_12px_rgba(30,80,140,0.06)] dark:border-white/10 transition-all duration-300 hover:bg-white/90 dark:hover:bg-slate-800/80 hover:shadow-[0_6px_16px_rgba(30,80,140,0.1)] hover:-translate-y-1 cursor-pointer">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-3">
                  <span className="text-[20px]">🌐</span>
                </div>
                <div>
                  <h3 className="en font-bold text-slate-800 dark:text-slate-200 text-[15px] leading-tight">Translator</h3>
                  <p className="en text-[12px] text-slate-600 dark:text-slate-400 font-medium mt-1">Hindi ↔ English</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section>
        <div className="mb-[32px] animate-rise-in">
          <span className="en block text-[#2563eb] font-bold text-[12px] tracking-[1px] uppercase mb-2">
            Why Abhyas
          </span>
          <h2 className="en text-[30px] font-extrabold text-foreground leading-tight">
            A learning experience built for Hindi typists
          </h2>
          <p className="mt-3 text-[14.5px] text-[#64748b] max-w-2xl font-hindi leading-relaxed">
            हर सुविधा आपकी गति और आत्मविश्वास बढ़ाने के लिए डिज़ाइन की गई है।
          </p>
        </div>
        <div className="grid gap-[20px] grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {features.map((f, i) => (
            <Link
              to={f.to}
              key={f.title}
              className="group block bg-[#ffffff] border border-[#e6ebf2] rounded-[16px] px-[22px] py-[26px] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_14px_28px_rgba(20,30,60,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 animate-rise-in cursor-pointer"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="flex w-[46px] h-[46px] items-center justify-center rounded-[12px] mb-[16px] transition-transform duration-200 group-hover:scale-110"
                style={{ background: f.bg }}
              >
                <f.icon className="w-[20px] h-[20px] text-white" />
              </div>
              <h3 className="en text-[16px] font-bold text-foreground mb-[6px]">{f.title}</h3>
              <p className="font-hindi text-[13px] text-[#64748b] leading-[1.6]">{f.text}</p>
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
    </div>
  );
}

