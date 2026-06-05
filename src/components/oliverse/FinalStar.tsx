import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HIDDEN_MESSAGE } from "@/lib/oliverse-config";
import { Sparkles, X } from "lucide-react";

export function FinalStar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.4 }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute right-[6%] top-[18%] rounded-full"
        aria-label="Hidden message"
        style={{
          width: 14,
          height: 14,
          background: "white",
          boxShadow: "0 0 24px white, 0 0 50px oklch(0.78 0.18 35), 0 0 90px oklch(0.72 0.2 330)",
        }}
      />
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 mx-auto z-[61] w-[min(92vw,560px)] glass-panel rounded-3xl p-8 md:p-10 text-center"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <Sparkles className="mx-auto text-accent animate-pulse-glow" size={28} />
              <p className="mt-4 text-xs uppercase tracking-[0.4em] text-accent">A hidden message</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-glow">{HIDDEN_MESSAGE.title}</h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/90">
                {HIDDEN_MESSAGE.body}
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.4em] text-accent">{HIDDEN_MESSAGE.signature}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}