import { motion } from "framer-motion";
import type { Planet } from "@/lib/oliverse-config";

type Props = {
  planet: Planet;
  size?: number;
  onClick?: () => void;
  className?: string;
};

export function PlanetVisual({ planet, size = 140, onClick, className = "" }: Props) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative inline-flex flex-col items-center gap-3 outline-none ${className}`}
      style={{ width: size }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow halo */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: planet.glow }}
        />
        {/* Planet body */}
        <div
          className="absolute inset-0 rounded-full animate-float-y"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${planet.glow}, ${planet.color} 55%, oklch(0.15 0.05 280) 100%)`,
            boxShadow: `inset -20px -25px 60px oklch(0.05 0.02 260 / 0.8), 0 0 40px ${planet.glow}`,
          }}
        />
        {/* Ring */}
        {planet.ring && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: size * 1.6,
              height: size * 0.4,
              border: `2px solid ${planet.glow}`,
              transform: "translate(-50%, -50%) rotate(-18deg)",
              boxShadow: `0 0 20px ${planet.glow}`,
              opacity: 0.7,
            }}
          />
        )}
      </div>
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{planet.subtitle}</p>
        <p className="text-lg font-semibold text-glow">{planet.name}</p>
      </div>
    </motion.button>
  );
}