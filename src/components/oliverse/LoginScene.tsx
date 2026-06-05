import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarField } from "./StarField";
import { Rocket } from "./Rocket";
import { CREDENTIALS } from "@/lib/oliverse-config";

type Props = { onAuthenticated: () => void };

export function LoginScene({ onAuthenticated }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [launching, setLaunching] = useState(false);
  const [hideUi, setHideUi] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username.trim() === CREDENTIALS.username && password === CREDENTIALS.password) {
      setError(null);
      setHideUi(true);
      // Give UI a moment to fade, then ignite
      setTimeout(() => setLaunching(true), 700);
      // After the rocket clears the sky, hand off to the journey
      setTimeout(() => onAuthenticated(), 4800);
    } else {
      setError("Wrong access codes — Try again My love.");
      setTimeout(() => setError(null), 3200);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Night sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, oklch(0.35 0.12 250) 0%, oklch(0.12 0.06 270) 45%, oklch(0.05 0.02 260) 100%)",
        }}
      />
      <StarField density={180} />

      {/* Drifting clouds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute h-16 w-72 rounded-full bg-white/5 blur-2xl animate-drift"
            style={{ top: `${15 + i * 18}%`, animationDuration: `${50 + i * 20}s`, animationDelay: `${i * -10}s` }}
          />
        ))}
      </div>

      {/* Earth horizon */}
      <motion.div
        className="absolute -bottom-[35vh] left-1/2 -translate-x-1/2"
        animate={launching ? { y: 600, scale: 0.6, opacity: 0.4 } : {}}
        transition={{ duration: 5, ease: "easeIn" }}
      >
        <div
          className="h-[70vh] w-[160vw] rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.55 0.18 200) 0%, oklch(0.35 0.15 230) 40%, oklch(0.18 0.08 260) 80%)",
            boxShadow: "0 -30px 120px oklch(0.6 0.2 220 / 0.4)",
          }}
        />
      </motion.div>

      {/* Rocket + pad */}
      <div className="absolute bottom-[18vh] left-1/2 -translate-x-1/2 md:left-[30%]">
        <Rocket launching={launching} />
      </div>

      {/* Login card */}
      <AnimatePresence>
        {!hideUi && (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-x-0 top-10 mx-auto w-[min(92vw,420px)] md:top-1/2 md:right-12 md:left-auto md:-translate-y-1/2 md:mx-0"
          >
            <div className="glass-panel rounded-2xl p-7">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Oliverse</p>
              <h1 className="mt-2 text-3xl font-semibold text-glow">Welcome aboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your access codes to begin the journey.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Pilot ID</label>
                  <input
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-foreground outline-none focus:border-accent transition"
                    placeholder="your call sign"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Access Code</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-border bg-input px-3 py-2.5 text-foreground outline-none focus:border-accent transition"
                    placeholder="••••••••"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="rounded-lg border border-destructive/50 bg-destructive/15 px-3 py-2 text-sm text-destructive-foreground"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  className="btn-cosmic w-full rounded-lg py-3 font-semibold tracking-wide hover:scale-[1.02] active:scale-[0.99]"
                >
                  Ignite Engines →
                </button>
              </form>
              <p className="mt-5 text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                no password reset for you!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade-to-space veil after launch */}
      <AnimatePresence>
        {launching && (
          <motion.div
            key="veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1.5 }}
            className="pointer-events-none absolute inset-0 bg-background"
          />
        )}
      </AnimatePresence>
    </div>
  );
}