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
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-rise-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
            <Sparkles className="size-3.5" /> Premium Hindi typing trainer
          </span>
          <h1 className="mt-5 text-4xl leading-tight font-semibold tracking-tight text-foreground md:text-6xl">
            हिंदी टाइपिंग सीखें,
            <span className="text-gradient block">तेज़ी और शुद्धता के साथ</span>
          </h1>
          <p className="mt-5 max-w-xl font-hindi text-base text-muted-foreground md:text-lg">
            संरचित पाठ, परीक्षा-स्तरीय अभ्यास और रीयल-टाइम विश्लेषण — सब कुछ एक सुंदर,
            सहज इंटरफ़ेस में।
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/practice"
              className="rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-105"
              style={{ background: "var(--gradient-primary)" }}
            >
              अभ्यास शुरू करें
            </Link>
            <Link
              to="/lessons"
              className="rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white"
            >
              पाठ देखें
            </Link>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              { k: "40+", v: "Practice sets" },
              { k: "7", v: "Lesson tracks" },
              { k: "100%", v: "Free to use" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-2xl px-4 py-3 text-center">
                <p className="text-2xl font-semibold text-primary">{s.k}</p>
                <p className="text-xs text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <GlassCard className="animate-float-soft p-6" hover={false}>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Live preview
          </p>
          <p className="mt-3 font-hindi text-2xl leading-relaxed">
            <span className="text-success">कर कब कहा</span>{" "}
            <span className="rounded-md bg-primary px-1 text-primary-foreground">दि</span>
            <span className="text-muted-foreground">न दिया सिर सदा</span>{" "}
            <span className="bg-danger/15 text-danger underline">हरा</span>
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { l: "WPM", v: "42", c: "text-primary" },
              { l: "Accuracy", v: "97%", c: "text-success" },
              { l: "Errors", v: "3", c: "text-danger" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white/70 py-3">
                <p className={`text-xl font-semibold ${s.c}`}>{s.v}</p>
                <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{s.l}</p>
              </div>
            ))}
          </div>
        </GlassCard>
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

      <section className="glass-strong flex flex-col items-center gap-4 rounded-3xl px-6 py-14 text-center">
        <Target className="size-8 text-primary" />
        <h2 className="max-w-2xl text-3xl font-semibold text-foreground">
          Ready to beat your personal best?
        </h2>
        <p className="max-w-xl font-hindi text-muted-foreground">
          एक मिनट का स्पीड टेस्ट लें और देखें आप कहाँ खड़े हैं।
        </p>
        <Link
          to="/speed-test"
          className="rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          style={{ background: "var(--gradient-primary)" }}
        >
          Start speed test
        </Link>
      </section>
    </div>
  );
}
