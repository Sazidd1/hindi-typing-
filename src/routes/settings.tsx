import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard, SectionTitle } from "@/components/kit/GlassCard";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Typing Settings — Layout, Sound & Guidance" },
      {
        name: "description",
        content:
          "Customise your Hindi typing experience: keyboard layout, font size, sound feedback, finger guidance and test duration.",
      },
      { property: "og:title", content: "Typing Settings" },
      {
        property: "og:description",
        content: "Customise keyboard layout, font size, sound and finger guidance.",
      },
    ],
  }),
  component: SettingsPage,
});

function Toggle({
  label,
  hint,
  defaultOn = false,
}: {
  label: string;
  hint: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="font-hindi text-sm text-muted-foreground">{hint}</p>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
          on ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-5 rounded-full bg-white shadow transition-all duration-300",
            on ? "left-6" : "left-1",
          )}
        />
      </button>
    </div>
  );
}

function OptionRow({
  label,
  options,
  initial,
}: {
  label: string;
  options: string[];
  initial: string;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div className="py-4">
      <p className="font-medium text-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setValue(o)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              o === value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Appearance section — controls the global light/dark theme. */
function AppearanceSection() {
  const { theme, setTheme } = useTheme();

  return (
    <GlassCard hover={false}>
      <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
      <p className="text-sm text-muted-foreground mt-0.5 mb-4">
        Choose how the app looks across all pages.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setTheme("light")}
          aria-pressed={theme === "light"}
          className={cn(
            "flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold border transition-all duration-200",
            theme === "light"
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-secondary/50 text-muted-foreground border-border/60 hover:bg-secondary hover:text-foreground"
          )}
        >
          <span className="text-base leading-none" aria-hidden="true">☀️</span>
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          aria-pressed={theme === "dark"}
          className={cn(
            "flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold border transition-all duration-200",
            theme === "dark"
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-secondary/50 text-muted-foreground border-border/60 hover:bg-secondary hover:text-foreground"
          )}
        >
          <span className="text-base leading-none" aria-hidden="true">🌙</span>
          Dark
        </button>
      </div>
    </GlassCard>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Preferences"
        title="Settings"
        subtitle="अपने अभ्यास अनुभव को अपने अनुसार ढालें।"
      />

      {/* Appearance — global theme control */}
      <AppearanceSection />

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassCard hover={false}>
          <h3 className="text-lg font-semibold text-foreground">Typing experience</h3>
          <div className="divide-y divide-border/60">
            <OptionRow
              label="Keyboard layout"
              options={["Remington GAIL", "Remington CBI", "Inscript"]}
              initial="Remington GAIL"
            />
            <OptionRow
              label="Text size"
              options={["Comfort", "Large", "Extra large"]}
              initial="Large"
            />
            <OptionRow
              label="Default test duration"
              options={["30 sec", "60 sec", "120 sec"]}
              initial="60 sec"
            />
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <h3 className="text-lg font-semibold text-foreground">Guidance & feedback</h3>
          <div className="divide-y divide-border/60">
            <Toggle
              label="Show virtual keyboard"
              hint="अभ्यास के दौरान वर्चुअल कीबोर्ड दिखाएँ"
              defaultOn
            />
            <Toggle label="Finger guidance" hint="सही उंगली का रंग संकेत दिखाएँ" defaultOn />
            <Toggle label="Key press sound" hint="हर कीस्ट्रोक पर हल्की ध्वनि" />
            <Toggle label="Stop on error" hint="गलती होने पर आगे बढ़ना रोकें" />
            <Toggle label="Daily practice reminder" hint="रोज़ अभ्यास की याद दिलाएँ" defaultOn />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
