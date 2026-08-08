import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  tone = "primary",
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  suffix?: string;
  tone?: "primary" | "success" | "danger" | "muted";
  className?: string;
}) {
  const toneClass = {
    primary: "text-primary bg-primary/10 border border-primary/20",
    success: "text-success bg-success/10 border border-success/20",
    danger: "text-danger bg-danger/10 border border-danger/20",
    muted: "text-muted-foreground bg-muted border border-border/40",
  }[tone];

  return (
    <div className={cn("glass flex h-full items-center gap-4 rounded-3xl p-5 shadow-sm transition-all duration-300 hover:shadow-md border border-white/60", className)}>
      <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-xs", toneClass)}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase truncate mb-0.5">{label}</p>
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-2xl sm:text-3xl leading-tight font-bold tracking-tight text-foreground tabular-nums">
            {value}
          </span>
          {suffix ? (
            <span className="text-xs sm:text-sm font-semibold text-muted-foreground/80">{suffix}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}