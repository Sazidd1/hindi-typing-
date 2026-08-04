import { cn } from "@/lib/utils";
import { fingerColors, fingerLabels, keyboardRows, lookupChar } from "@/lib/typing-data";

export function HindiKeyboard({ nextChar }: { nextChar?: string | undefined }) {
  const target = nextChar ? lookupChar(nextChar) : undefined;
  const activeKey = nextChar === " " ? "Space" : target?.key.en;
  const needsShift = target?.shift ?? false;
  const finger = nextChar === " " ? "thumb" : target?.key.finger;

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8 mx-auto w-full border border-white/60 shadow-sm">
      <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
        {keyboardRows.map((row, ri) => {
          let rowColor = "#94A3B8"; // Default premium soft gray for number and space rows
          if (ri === 1) rowColor = "#60A5FA"; // Top Row (Soft Blue)
          if (ri === 2) rowColor = "#34D399"; // Home Row (Soft Emerald Green)
          if (ri === 3) rowColor = "#F59E0B"; // Bottom Row (Soft Amber/Orange)

          return (
          <div key={ri} className="flex w-full gap-1.5 sm:gap-2">
            {row.map((key, ki) => {
              const isActive = activeKey === key.en;
              const isShiftHint = needsShift && key.en === "Shift";
              return (
                <div
                  key={`${ri}-${ki}`}
                  style={{
                    flexGrow: key.width ?? 1,
                    flexBasis: `${(key.width ?? 1) * 2.25}rem`,
                    borderBottomColor: rowColor,
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
          );
        })}
      </div>
    </div>
  );
}