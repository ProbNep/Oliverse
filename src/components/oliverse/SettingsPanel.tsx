import { motion, AnimatePresence } from "framer-motion";
import { Settings, LogOut, X } from "lucide-react";
import { useState } from "react";
import type { Track } from "@/lib/oliverse-config";

type Props = {
  masterVolume: number;
  musicVolume: number;
  muted: boolean;
  track?: Track;
  onMasterVolume: (v: number) => void;
  onMusicVolume: (v: number) => void;
  onMuteToggle: () => void;
  onLogout: () => void;
};

export function SettingsPanel(p: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="glass-panel rounded-full p-2.5 hover:scale-110 transition"
        aria-label="Settings"
      >
        <Settings size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto w-[min(92vw,420px)] glass-panel rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-glow">Spaceship Settings</h2>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <X size={18} />
                </button>
              </div>

              {p.track && (
                <div className="mb-5 rounded-xl border border-border p-3 flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${p.track.cover})`, backgroundColor: "oklch(0.25 0.08 290)" }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">Now playing</p>
                    <p className="truncate text-sm font-medium">{p.track.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{p.track.artist}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Slider label="Master volume" value={p.masterVolume} onChange={p.onMasterVolume} />
                <Slider label="Music volume" value={p.musicVolume} onChange={p.onMusicVolume} />

                <button
                  onClick={p.onMuteToggle}
                  className="w-full rounded-lg border border-border bg-input py-2.5 text-sm hover:bg-white/5 transition"
                >
                  {p.muted ? "Unmute" : "Mute"} audio
                </button>

                <button
                  onClick={p.onLogout}
                  className="w-full rounded-lg border border-destructive/40 bg-destructive/15 text-destructive-foreground py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-destructive/25 transition"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>

              <p className="mt-6 text-center text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Made by · Neptune Labs
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span>{Math.round(value * 100)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-accent"
      />
    </div>
  );
}