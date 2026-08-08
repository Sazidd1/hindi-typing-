import { cn } from "@/lib/utils";
import { keyboardRows, lookupChar, type Finger } from "@/lib/typing-data";

function getFingerColorHex(finger: Finger | undefined): string {
  if (!finger) return "#e2e8f0";
  if (finger.includes("pinky")) return "#f97316";
  if (finger.includes("ring")) return "#eab308";
  if (finger.includes("middle")) return "#16a34a";
  if (finger.includes("index")) return "#0891b2";
  if (finger === "thumb") return "#7c3aed";
  return "#e2e8f0";
}

function getFingerBgRgba(finger: Finger | undefined): string {
  if (!finger) return "rgba(226, 232, 240, 0.1)";
  if (finger.includes("pinky")) return "rgba(249, 115, 22, 0.1)";
  if (finger.includes("ring")) return "rgba(234, 179, 8, 0.1)";
  if (finger.includes("middle")) return "rgba(22, 163, 74, 0.1)";
  if (finger.includes("index")) return "rgba(8, 145, 178, 0.1)";
  if (finger === "thumb") return "rgba(124, 58, 237, 0.1)";
  return "rgba(226, 232, 240, 0.1)";
}

export function HindiKeyboard({ nextChar }: { nextChar?: string | undefined }) {
  const target = nextChar ? lookupChar(nextChar) : undefined;
  const activeKey = nextChar === " " ? "Space" : target?.key.en;
  const needsShift = target?.shift ?? false;

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8 mx-auto w-full border border-white/60 shadow-sm">
      <div className="flex flex-col gap-2 w-full">
        {keyboardRows.map((row, ri) => (
          <div key={ri} className="flex w-full gap-2">
            {row.map((key, ki) => {
              const isActive = activeKey === key.en;
              const isShiftHint = needsShift && key.en === "Shift";
              const fColor = getFingerColorHex(key.finger);
              const fBg = getFingerBgRgba(key.finger);

              return (
                <div
                  key={`${ri}-${ki}`}
                  style={{
                    flexGrow: key.width ?? 1,
                    flexBasis: `${(key.width ?? 1) * 2.25}rem`,
                    borderBottomColor: fColor,
                    borderBottomWidth: "3px",
                    borderBottomStyle: "solid",
                    backgroundColor: fBg,
                  }}
                  className={cn(
                    "key relative flex flex-col items-center justify-center rounded-[10px] h-[58px] transition-all duration-200 border border-white/70",
                    isActive && "active z-10",
                    isShiftHint && "ring-2 ring-primary bg-primary/20",
                  )}
                >
                  <span
                    className={cn(
                      "font-hindi leading-none font-semibold",
                      isActive ? "text-[19px] text-white" : "text-sm sm:text-base text-foreground",
                    )}
                  >
                    {key.hi || key.en}
                  </span>
                  {key.hi ? (
                    <span
                      className={cn(
                        "mt-0.5 leading-none",
                        isActive ? "text-white/80 text-[11px]" : "text-muted-foreground text-[9px]",
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

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-[13px] text-muted-foreground">
        {[
          { c: "#f97316", l: "Little finger" },
          { c: "#eab308", l: "Ring finger" },
          { c: "#16a34a", l: "Middle finger" },
          { c: "#0891b2", l: "Index finger" },
          { c: "#7c3aed", l: "Thumb" },
          { c: "linear-gradient(135deg, #2563eb, #1d4ed8)", l: "Current key" },
        ].map((lg) => (
          <div key={lg.l} className="flex items-center gap-2">
            <span
              className="inline-block w-[13px] h-[13px] rounded-[3px]"
              style={{ background: lg.c }}
            />
            {lg.l}
          </div>
        ))}
      </div>
    </div>
  );
}