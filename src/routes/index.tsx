import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BarChart3, Gauge, Keyboard, Sparkles, Target } from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { HindiKeyboard } from "@/components/typing/HindiKeyboard";
import { LessonCard } from "@/components/typing/LessonCard";
import { lessons } from "@/lib/typing-data";
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
  },
  {
    icon: Gauge,
    title: "Live WPM",
    text: "हर कीस्ट्रोक पर गति, शुद्धता और त्रुटियाँ रीयल-टाइम में देखें।",
    bg: "linear-gradient(135deg, #16a34a, #22c55e)",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    text: "साप्ताहिक चार्ट, स्ट्रीक और अभ्यास समय एक ही डैशबोर्ड पर।",
    bg: "linear-gradient(135deg, #ea580c, #f97316)",
  },
  {
    icon: Award,
    title: "Achievements",
    text: "बैज और लीडरबोर्ड आपको हर दिन अभ्यास के लिए प्रेरित करते हैं।",
    bg: "linear-gradient(135deg, #ca8a04, #eab308)",
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
          <span className="en inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold tracking-wide text-primary uppercase">
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
              className="inline-flex justify-center items-center rounded-full border border-border bg-white/80 px-6 py-3.5 sm:py-3 text-[clamp(0.875rem,2vw,0.875rem)] sm:text-[1rem] font-semibold text-foreground transition-colors hover:bg-white"
            >
              पाठ देखें
            </Link>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
            {[
              { k: "40+", v: "Practice sets" },
              { k: "7", v: "Lesson tracks" },
              { k: "100%", v: "Free to use" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl px-2 py-3 sm:px-4 text-center">
                <p className="en text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary">{s.k}</p>
                <p className="en text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-[1_1_min(100%,350px)] lg:max-w-[42%]">
          <GlassCard className="animate-float-soft p-5 sm:p-6" hover={false}>
            <p className="en text-[clamp(0.7rem,1.5vw,0.75rem)] font-semibold tracking-wide text-muted-foreground uppercase">
              Live preview
            </p>
            <p className="mt-3 font-hindi text-[clamp(1.25rem,3vw,1.5rem)] leading-relaxed">
              <span className="text-success">कर कब कहा</span>{" "}
              <span className="rounded-md bg-primary px-1 text-primary-foreground">दि</span>
              <span className="text-muted-foreground">न दिया सिर सदा</span>{" "}
              <span className="bg-danger/15 text-danger underline">हरा</span>
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 text-center">
              {[
                { l: "WPM", v: "42", c: "text-primary" },
                { l: "Accuracy", v: "97%", c: "text-success" },
                { l: "Errors", v: "3", c: "text-danger" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/70 py-2 sm:py-3">
                  <p className={`en text-[clamp(1.125rem,2.5vw,1.25rem)] font-semibold ${s.c}`}>{s.v}</p>
                  <p className="en text-[clamp(0.65rem,1.5vw,0.6875rem)] tracking-wide text-muted-foreground uppercase">{s.l}</p>
                </div>
              ))}
            </div>
          </GlassCard>
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
            <div
              key={f.title}
              className="bg-[#ffffff] border border-[#e6ebf2] rounded-[16px] px-[22px] py-[26px] transition-all duration-150 ease-out hover:-translate-y-[4px] hover:shadow-[0_12px_24px_rgba(20,30,60,0.08)] animate-rise-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div
                className="flex w-[46px] h-[46px] items-center justify-center rounded-[12px] mb-[16px]"
                style={{ background: f.bg }}
              >
                <f.icon className="w-[20px] h-[20px] text-white" />
              </div>
              <h3 className="en text-[16px] font-bold text-foreground mb-[6px]">{f.title}</h3>
              <p className="font-hindi text-[13px] text-[#64748b] leading-[1.6]">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Curriculum"
          title="Seven structured lesson tracks"
          subtitle="होम रो से लेकर परीक्षा अभ्यास तक — क्रमबद्ध रूप से आगे बढ़ें।"
        />
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

