import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CircularProgress({ 
  value, 
  size = 64, 
  strokeWidth = 6, 
  className 
}: { 
  value: number; 
  size?: number; 
  strokeWidth?: number;
  className?: string;
}) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    // Small delay to allow the animation to trigger after mount
    const timer = setTimeout(() => setProgress(safeValue), 100);
    return () => clearTimeout(timer);
  }, [safeValue]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg className="-rotate-90 transform" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-slate-100"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-success transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    </div>
  );
}
