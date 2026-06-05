import { motion } from "framer-motion";

type Props = { launching?: boolean };

// Cartoon rocket with vertical "OLIVE-3926" text.
// When `launching` is true, plays ignition + lift animation.
export function Rocket({ launching = false }: Props) {
  return (
    <motion.div
      className="relative"
      animate={
        launching
          ? { y: "-140vh", transition: { duration: 4.5, ease: [0.45, 0, 0.55, 1] } }
          : { y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }
      }
    >
      {/* Smoke / flame */}
      {launching && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <div className="w-10 h-24 rounded-b-full bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 blur-[2px] animate-pulse-glow" />
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-6 rounded-full bg-white/70"
              style={{
                left: `${Math.random() * 120 - 60}px`,
                width: `${Math.random() * 24 + 12}px`,
                height: `${Math.random() * 24 + 12}px`,
                animation: `ember ${1 + Math.random() * 1.2}s ease-out ${Math.random() * 0.6}s infinite`,
                filter: "blur(6px)",
              }}
            />
          ))}
        </div>
      )}
      <motion.svg
        viewBox="0 0 120 280"
        className="w-32 md:w-44 drop-shadow-[0_0_30px_rgba(255,180,120,0.5)]"
        animate={launching ? { rotate: [0, -1, 1, 0] } : {}}
        transition={{ duration: 0.2, repeat: launching ? Infinity : 0 }}
      >
        {/* Body */}
        <defs>
          <linearGradient id="body" x1="0" x2="1">
            <stop offset="0%" stopColor="#f5f5f5" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#bfbfbf" />
          </linearGradient>
          <linearGradient id="nose" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#c0392b" />
          </linearGradient>
        </defs>
        {/* Nose cone */}
        <path d="M60 5 C 30 60, 30 80, 30 110 L 90 110 C 90 80, 90 60, 60 5 Z" fill="url(#nose)" />
        {/* Body */}
        <rect x="30" y="105" width="60" height="120" rx="6" fill="url(#body)" />
        {/* Window */}
        <circle cx="60" cy="145" r="14" fill="#1e3a8a" stroke="#cbd5e1" strokeWidth="3" />
        <circle cx="55" cy="140" r="4" fill="#93c5fd" opacity="0.8" />
        {/* Vertical text OLIVE-3926 */}
        <text
          x="60"
          y="114"
          textAnchor="middle"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="7"
          fontWeight="700"
          fill="#8d8d8d"
          letterSpacing="1"
        >
          OLIVE-3926
        </text>
        {/* Fins */}
        <path d="M30 200 L 10 250 L 30 240 Z" fill="#c0392b" />
        <path d="M90 200 L 110 250 L 90 240 Z" fill="#c0392b" />
        <rect x="48" y="225" width="24" height="20" rx="3" fill="#475569" />
        {/* Nozzle */}
        <path d="M44 245 L 76 245 L 70 265 L 50 265 Z" fill="#1f2937" />
      </motion.svg>
      {/* Launch pad */}
      {!launching && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-48 h-3 rounded-full bg-gradient-to-r from-transparent via-zinc-500/70 to-transparent" />
      )}
    </motion.div>
  );
}