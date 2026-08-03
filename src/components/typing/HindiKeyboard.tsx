import { cn } from "@/lib/utils";
import { fingerColors, fingerLabels, keyboardRows, lookupChar } from "@/lib/typing-data";

export function HindiKeyboard({ nextChar }: { nextChar?: string | undefined }) {
  const target = nextChar ? lookupChar(nextChar) : undefined;
  const activeKey = nextChar === " " ? "Space" : target?.key.en;
  const needsShift = target?.shift ?? false;
  const finger = nextChar === " " ? "thumb" : target?.key.finger;

  return (
    <div className="glass-strong rounded-3xl p-4 md:p-5 mx-auto w-fit">
      <div className="flex flex-col gap-1 overflow-x-auto">
        {keyboardRows.map((row, ri) => (
          <div key={ri} className="flex min-w-max gap-1">
            {row.map((key, ki) => {
              const isActive = activeKey === key.en;
              const isShiftHint = needsShift && key.en === "Shift";
              return (
                <div
                  key={`${ri}-${ki}`}
                  style={{
                    flexGrow: key.width ?? 1,
                    flexBasis: `${(key.width ?? 1) * 2.25}rem`,
                    borderBottomColor: fingerColors[key.finger],
                  }}
                  className={cn(
                    "relative flex h-10 sm:h-11 flex-col items-center justify-center rounded-lg border border-b-2 border-white/70 bg-white/75 px-1 transition-all duration-200",
                    isActive &&
                      "animate-key-pop scale-105 border-primary bg-primary text-primary-foreground shadow-[0_8px_16px_-6px_var(--primary)]",
                    isShiftHint && "border-primary/60 bg-primary/15",
                  )}
                >
                  <span
                    className={cn(
                      "font-hindi text-sm sm:text-base leading-none font-semibold",
                      isActive ? "text-primary-foreground" : "text-foreground",
                    )}
                  >
                    {key.hi || key.en}
                  </span>
                  {key.hi ? (
                    <span
                      className={cn(
                        "mt-0.5 text-[9px] leading-none",
                        isActive ? "text-primary-foreground/80" : "text-muted-foreground",
                      )}
                    >
                      {key.en}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}