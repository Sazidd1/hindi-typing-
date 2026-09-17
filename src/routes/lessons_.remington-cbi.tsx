import { createFileRoute } from "@tanstack/react-router";
import { Hammer } from "lucide-react";
import { SectionTitle } from "@/components/kit/GlassCard";

export const Route = createFileRoute("/lessons_/remington-cbi")({
  head: () => ({
    meta: [{ title: "Remington CBI Lessons" }],
  }),
  component: ComingSoonPage,
});

function ComingSoonPage() {
  return (
    <div className="space-y-12 pb-10">
      <SectionTitle
        eyebrow="पाठ्यक्रम"
        title="Remington CBI पाठ"
        subtitle="जल्द आ रहा है।"
      />

      <div className="flex flex-col items-center justify-center py-24 text-center animate-rise-in">
        <div className="flex size-24 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <Hammer className="size-12" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-foreground">Remington CBI लेआउट के लिए पाठ जल्द ही उपलब्ध होंगे।</h3>
        <p className="mt-2 text-muted-foreground font-hindi">
          हम आपके अभ्यास के लिए नई सामग्री तैयार कर रहे हैं।
        </p>
      </div>
    </div>
  );
}
