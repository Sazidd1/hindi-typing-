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
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    danger: "text-danger bg-danger/10",
    muted: "text-muted-foreground bg-muted",
  }[tone];

  return (
    <div className={cn("glass flex items-center gap-4 rounded-2xl px-5 py-4", className)}>
      <span className={cn("flex size-11 items-center justify-center rounded-xl", toneClass)}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className="text-2xl leading-tight font-semibold text-foreground tabular-nums">
          {value}
          {suffix ? (
            <span className="ml-1 text-sm font-medium text-muted-foreground">{suffix}</span>
          ) : null}
        </p>
      </div>
    </div>
  );
}