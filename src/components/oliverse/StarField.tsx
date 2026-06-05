import { useMemo } from "react";

type Props = { density?: number; className?: string };

// Twinkling background stars. Pure CSS, no canvas.
export function StarField({ density = 140, className = "" }: Props) {
  const stars = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 0.4,
        d: Math.random() * 4 + 1,
        delay: Math.random() * 5,
      })),
    [density],
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.s}px`,
            height: `${s.s}px`,
            animationDuration: `${s.d}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: `0 0 ${s.s * 3}px rgba(255,255,255,0.7)`,
          }}
        />
      ))}
    </div>
  );
}