import { useEffect, useState } from "react";

export function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
  const safeValue = Number.isFinite(value) ? value : 0;
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing out function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * safeValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(safeValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [safeValue, duration]);

  return <span>{Number.isFinite(count) ? count : 0}</span>;
}
