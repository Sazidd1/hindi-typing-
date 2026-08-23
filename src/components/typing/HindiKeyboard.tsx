import { cn } from "@/lib/utils";
import { keyboardRows, lookupChar, type Finger } from "@/lib/typing-data";

export type KeyboardPreset = 
  | "Default" 
  | "Classic" 
  | "Dark Pro" 
  | "Minimal" 
  | "High Contrast" 
  | "Focus" 
  | "Color Zones";

function getFingerColorHex(finger: Finger | undefined): string {
  if (!finger) return "#e2e8f0";
  if (finger.includes("pinky")) return "#f97316";
  if (finger.includes("ring")) return "#eab308";
  if (finger.includes("middle")) return "#16a34a";
  if (finger.includes("index")) return "#0891b2";
  if (finger === "thumb") return "#7c3aed";
  return "#e2e8f0";
}

function getFingerBgRgba(finger: Finger | undefined, alpha: number = 0.1): string {
  if (!finger) return `rgba(226, 232, 240, ${alpha})`;
  if (finger.includes("pinky")) return `rgba(249, 115, 22, ${alpha})`;
  if (finger.includes("ring")) return `rgba(234, 179, 8, ${alpha})`;
  if (finger.includes("middle")) return `rgba(22, 163, 74, ${alpha})`;
  if (finger.includes("index")) return `rgba(8, 145, 178, ${alpha})`;
  if (finger === "thumb") return `rgba(124, 58, 237, ${alpha})`;
  return `rgba(226, 232, 240, ${alpha})`;
}

interface HindiKeyboardProps {
  nextChar?: string | undefined;
  preset?: KeyboardPreset | string;
}

export function HindiKeyboard({ nextChar, preset = "Default" }: HindiKeyboardProps) {
  const target = nextChar ? lookupChar(nextChar) : undefined;
  const activeKey = nextChar === " " ? "Space" : target?.key.en;
  const needsShift = target?.shift ?? false;

  const isDefault = preset === "Default";
  const isClassic = preset === "Classic";
  const isDarkPro = preset === "Dark Pro";
  const isMinimal = preset === "Minimal";
  const isHighContrast = preset === "High Contrast";
  const isFocus = preset === "Focus";
  const isColorZones = preset === "Color Zones";

  // Wrapper Styles
  const wrapperClass = cn(
    "mx-auto w-full flex flex-col gap-2 transition-all duration-300",
    isDefault && "glass-strong rounded-[24px] p-6 sm:p-8 border border-white/60 dark:bg-[#101F34] dark:border-[rgba(255,255,255,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.18)] shadow-sm",
    isClassic && "bg-slate-200 dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-300 dark:border-slate-700 shadow-md",
    isDarkPro && "bg-[#0a0a0a] rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-2xl",
    isMinimal && "bg-transparent p-6 sm:p-8",
    isHighContrast && "bg-black rounded-none p-6 sm:p-8 border-4 border-white",
    isFocus && "bg-background rounded-2xl p-6 sm:p-8",
    isColorZones && "bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 sm:p-8 shadow-inner"
  );

  return (
    <div className={wrapperClass}>
      <div className="flex flex-col gap-2 w-full">
        {keyboardRows.map((row, ri) => (
          <div key={ri} className="flex w-full gap-2">
            {row.map((key, ki) => {
              const isActive = activeKey === key.en;
              const isShiftHint = needsShift && key.en === "Shift";
              
              const fColor = getFingerColorHex(key.finger);
              
              // Base custom styles for layout sizing
              const customStyles: React.CSSProperties = {
                flexGrow: key.width ?? 1,
                flexBasis: `${(key.width ?? 1) * 2.25}rem`,
              };

              // Key Class Construction
              const keyClass = cn(
                "key relative flex flex-col items-center justify-center h-[58px] transition-all duration-200",
                
                // Default logic
                isDefault && cn(
                  "rounded-[10px] border",
                  isActive 
                    ? "active z-10 bg-primary border-transparent text-white dark:!bg-[#2B6FFF] dark:shadow-[0_0_0_2px_rgba(43,111,255,0.25),0_8px_20px_rgba(43,111,255,0.22)]" 
                    : "border-white/70 dark:border-white/5 dark:bg-white/5",
                  isShiftHint && "ring-2 ring-primary bg-primary/20 dark:bg-primary/40"
                ),

                // Classic logic
                isClassic && cn(
                  "rounded-md border-x border-t",
                  isActive 
                    ? "bg-primary text-white border-primary translate-y-[2px] border-b-2" 
                    : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 border-b-4 border-slate-300 dark:border-slate-900 shadow-sm",
                  isShiftHint && "ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-900"
                ),

                // Dark Pro logic
                isDarkPro && cn(
                  "rounded-lg border border-neutral-800",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] border-indigo-500 z-10" 
                    : "bg-[#171717] hover:bg-[#262626] text-neutral-300",
                  isShiftHint && "ring-1 ring-indigo-500 bg-indigo-500/20"
                ),

                // Minimal logic
                isMinimal && cn(
                  "rounded-lg border-0",
                  isActive 
                    ? "bg-primary/10 text-primary font-bold scale-110 z-10 shadow-sm" 
                    : "bg-transparent text-slate-600 dark:text-slate-300",
                  isShiftHint && "bg-primary/5 text-primary"
                ),

                // High Contrast logic
                isHighContrast && cn(
                  "rounded-none border-2",
                  isActive 
                    ? "bg-yellow-400 text-black border-yellow-400 z-10" 
                    : "bg-black text-white border-white",
                  isShiftHint && "border-yellow-400 text-yellow-400"
                ),

                // Focus logic
                isFocus && cn(
                  "rounded-xl border border-transparent",
                  isActive 
                    ? "bg-primary text-white scale-110 z-20 shadow-lg" 
                    : "bg-muted/30 text-muted-foreground opacity-20",
                  isShiftHint && "opacity-60 bg-primary/20 ring-1 ring-primary"
                ),

                // Color Zones logic
                isColorZones && cn(
                  "rounded-xl border-b-4 shadow-sm",
                  isActive 
                    ? "bg-foreground text-background border-foreground shadow-xl z-10" 
                    : "text-slate-800 dark:text-slate-200"
                )
              );

              // Inline Style overrides based on preset
              if (isDefault && !isActive) {
                customStyles.borderBottomColor = fColor;
                customStyles.borderBottomWidth = "3px";
                customStyles.borderBottomStyle = "solid";
                customStyles.backgroundColor = getFingerBgRgba(key.finger);
              }
              if (isColorZones && !isActive) {
                customStyles.backgroundColor = getFingerBgRgba(key.finger, 0.25);
                customStyles.borderBottomColor = getFingerBgRgba(key.finger, 0.6);
              }

              // Text Style Construction
              const mainTextClass = cn(
                "font-hindi leading-none",
                isDefault && (isActive ? "text-[19px] font-semibold text-white" : "text-sm sm:text-base font-semibold text-foreground dark:text-[#EAF0F7]"),
                isClassic && "text-sm sm:text-base font-bold",
                isDarkPro && "text-sm sm:text-base font-medium",
                isMinimal && "text-lg",
                isHighContrast && "text-base font-bold",
                isFocus && "text-base font-bold",
                isColorZones && "text-base font-bold"
              );

              const subTextClass = cn(
                "mt-0.5 leading-none",
                isDefault && (isActive ? "text-white/80 text-[11px]" : "text-[9px] text-muted-foreground dark:text-[#8FA2BC]"),
                isClassic && "text-[9px] opacity-70",
                isDarkPro && "text-[9px] opacity-60",
                isMinimal && "text-[10px] opacity-50",
                isHighContrast && "text-[10px]",
                isFocus && "text-[10px]",
                isColorZones && "text-[10px] opacity-80"
              );

              return (
                <div
                  key={`${ri}-${ki}`}
                  style={customStyles}
                  className={keyClass}
                >
                  <span className={mainTextClass}>
                    {isActive && needsShift && key.shift ? key.shift : key.hi || key.en}
                  </span>
                  {key.hi ? (
                    <span className={subTextClass}>
                      {key.en}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend - Only show on Default and Color Zones */}
      {(isDefault || isColorZones) && (
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
      )}
    </div>
  );
}