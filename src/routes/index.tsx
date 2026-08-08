import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BarChart3, Gauge, Keyboard, Sparkles, Target } from "lucide-react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { HindiKeyboard } from "@/components/typing/HindiKeyboard";
import { lessons } from "@/lib/typing-data";

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
  },
  {
    icon: Gauge,
    title: "Live WPM",
    text: "हर कीस्ट्रोक पर गति, शुद्धता और त्रुटियाँ रीयल-टाइम में देखें।",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    text: "साप्ताहिक चार्ट, स्ट्रीक और अभ्यास समय एक ही डैशबोर्ड पर।",
  },
  {
    icon: Award,
    title: "Achievements",
    text: "बैज और लीडरबोर्ड आपको हर दिन अभ्यास के लिए प्रेरित करते हैं।",
  },
];

function Index() {
  return (
    <div className="space-y-20">
      <section className="flex flex-wrap items-center justify-between gap-10 lg:gap-12">
        <div className="flex-[1_1_min(100%,450px)] lg:max-w-[55%] animate-rise-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-[clamp(0.7rem,2vw,0.75rem)] font-semibold tracking-wide text-primary uppercase">
            <Sparkles className="size-3.5" /> Premium Hindi typing trainer
          </span>
          <h1 className="mt-5 py-1 text-[clamp(1.875rem,4.5vw,3.25rem)] leading-[1.35] font-semibold tracking-tight text-foreground">
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
              className="inline-flex justify-center items-center rounded-full px-6 py-3.5 sm:py-3 text-[clamp(0.875rem,2vw,0.875rem)] sm:text-[1rem] font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-105"
              style={{ background: "var(--gradient-primary)" }}
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
                <p className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-primary">{s.k}</p>
                <p className="text-[clamp(0.65rem,1.5vw,0.75rem)] text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-[1_1_min(100%,350px)] lg:max-w-[42%]">
          <GlassCard className="animate-float-soft p-5 sm:p-6" hover={false}>
            <p className="text-[clamp(0.7rem,1.5vw,0.75rem)] font-semibold tracking-wide text-muted-foreground uppercase">
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
                  <p className={`text-[clamp(1.125rem,2.5vw,1.25rem)] font-semibold ${s.c}`}>{s.v}</p>
                  <p className="text-[clamp(0.65rem,1.5vw,0.6875rem)] tracking-wide text-muted-foreground uppercase">{s.l}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Why Abhyas"
          title="A learning experience built for Hindi typists"
          subtitle="हर सुविधा आपकी गति और आत्मविश्वास बढ़ाने के लिए डिज़ाइन की गई है।"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((f, i) => (
            <GlassCard key={f.title} className="animate-rise-in" >
              <div
                className="flex size-11 items-center justify-center rounded-xl text-primary-foreground"
                style={{ background: "var(--gradient-primary)", animationDelay: `${i * 60}ms` }}
              >
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 font-hindi text-sm text-muted-foreground">{f.text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Curriculum"
          title="Seven structured lesson tracks"
          subtitle="होम रो से लेकर परीक्षा अभ्यास तक — क्रमबद्ध रूप से आगे बढ़ें।"
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {lessons.slice(0, 6).map((l) => (
            <Link key={l.slug} to="/practice" search={{ lesson: l.slug }}>
              <GlassCard className="h-full">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-hindi text-xs font-semibold text-primary">
                    {l.level}
                  </span>
                  <span className="text-xs text-muted-foreground">{l.minutes} min</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{l.title}</h3>
                <p className="font-hindi text-sm text-primary">{l.hindiTitle}</p>
                <p className="mt-2 font-hindi text-sm text-muted-foreground">{l.description}</p>
              </GlassCard>
            </Link>
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
