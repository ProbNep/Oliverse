import { motion } from "framer-motion";
import type { Planet } from "@/lib/oliverse-config";
import { X } from "lucide-react";

type Props = { planet: Planet; onClose: () => void };

export function PlanetView({ planet, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 overflow-y-auto"
      style={{
        background: `radial-gradient(ellipse at 50% -20%, ${planet.glow} 0%, oklch(0.12 0.06 280) 55%, oklch(0.06 0.02 260) 100%)`,
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-50 glass-panel rounded-full p-2 hover:scale-110 transition"
        aria-label="Return to space"
      >
        <X size={18} />
      </button>

      <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs uppercase tracking-[0.4em] text-accent"
        >
          {planet.subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="mt-3 text-4xl md:text-6xl font-semibold leading-tight text-glow"
        >
          {planet.title}
        </motion.h1>

        <div className="mt-12 space-y-7">
          {planet.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
              className="text-lg md:text-xl leading-relaxed text-foreground/90 whitespace-pre-line"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Images */}
        {planet.images && planet.images.length > 0 && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {planet.images.map((img, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="glass-panel rounded-2xl overflow-hidden"
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto" />
                {img.caption && (
                  <figcaption className="p-3 text-sm text-muted-foreground italic">
                    {img.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        )}

        {/* Decorative orbiting accents */}
        <div className="mt-20 flex justify-center">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 rounded-full border border-accent/30 animate-spin" style={{ animationDuration: "20s" }} />
            <div className="absolute inset-4 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }} />
            <div className="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent animate-pulse-glow text-accent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}