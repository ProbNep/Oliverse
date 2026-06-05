import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, ChevronDown } from "lucide-react";
import { planets } from "@/lib/oliverse-config";
import { loadState, saveState } from "@/lib/oliverse-storage";
import { StarField } from "./StarField";
import { PlanetVisual } from "./PlanetVisual";
import { PlanetView } from "./PlanetView";
import { MusicPlayer } from "./MusicPlayer";
import { SettingsPanel } from "./SettingsPanel";
import { FinalStar } from "./FinalStar";
import { useMusicPlayer } from "./useMusicPlayer";

type Props = { onLogout: () => void };

export function SpaceJourney({ onLogout }: Props) {
  const initial = loadState();
  const [activeId, setActiveId] = useState<string | null>(initial.lastPlanet);
  const [overlay, setOverlay] = useState<string | null>(null);
  const [playerMinimized, setPlayerMinimized] = useState(false);

  const activePlanet = planets.find((p) => p.id === activeId);

  // Music follows the active planet's playlist; idle uses planet 0's playlist.
  const playlist = useMemo(
    () => (activePlanet ? activePlanet.playlist : planets[0].playlist),
    [activePlanet],
  );
  const player = useMusicPlayer(playlist);

  // Try auto-play after first user gesture (browsers require this).
  useEffect(() => {
    const tryStart = () => {
      player.play();
      window.removeEventListener("pointerdown", tryStart);
      window.removeEventListener("keydown", tryStart);
    };
    window.addEventListener("pointerdown", tryStart);
    window.addEventListener("keydown", tryStart);
    return () => {
      window.removeEventListener("pointerdown", tryStart);
      window.removeEventListener("keydown", tryStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openPlanet(id: string) {
    setActiveId(id);
    saveState({ lastPlanet: id });
    const planet = planets.find((p) => p.id === id);
    if (planet) {
      setOverlay(planet.id);
      setTimeout(() => setOverlay(null), 3200);
    }
  }

  function closePlanet() {
    setActiveId(null);
    saveState({ lastPlanet: null });
  }

  return (
    <div className="relative min-h-screen w-full cosmic-bg overflow-hidden">
      <StarField density={220} />

      {/* Nebulae */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 -left-32 h-[60vh] w-[60vh] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, var(--nebula-1), transparent 60%)" }}
        />
        <div
          className="absolute -bottom-40 -right-20 h-[70vh] w-[70vh] rounded-full blur-3xl opacity-35"
          style={{ background: "radial-gradient(circle, var(--nebula-2), transparent 60%)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 h-[40vh] w-[40vh] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, var(--nebula-3), transparent 60%)" }}
        />
      </div>

      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 z-40 flex items-start justify-between gap-3">
        <div className="glass-panel rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent">
          ✦ OLIVERSE  · MISSION J726
        </div>
      </div>

      {/* Bottom-right music player with minimize toggle */}
      <div className="fixed bottom-4 left-4 z-40">
        <SettingsPanel
          masterVolume={player.masterVolume}
          musicVolume={player.musicVolume}
          muted={player.muted}
          track={player.track}
          onMasterVolume={player.setMasterVolume}
          onMusicVolume={player.setMusicVolume}
          onMuteToggle={() => player.setMuted(!player.muted)}
          onLogout={onLogout}
        />
      </div>

      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
        <AnimatePresence mode="wait" initial={false}>
          {playerMinimized ? (
            <motion.button
              key="mini"
              initial={{ opacity: 0, scale: 0.7, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 10 }}
              onClick={() => setPlayerMinimized(false)}
              className="glass-panel rounded-full p-3 hover:scale-110 transition relative"
              aria-label="Expand player"
            >
              <Music2 size={18} className={player.isPlaying ? "text-accent animate-pulse-glow" : ""} />
            </motion.button>
          ) : (
            <motion.div
              key="full"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <button
                onClick={() => setPlayerMinimized(true)}
                className="absolute -top-2 -left-2 z-10 glass-panel rounded-full p-1.5 hover:scale-110 transition"
                aria-label="Minimize player"
              >
                <ChevronDown size={14} />
              </button>
              <MusicPlayer
                track={player.track}
                isPlaying={player.isPlaying}
                current={player.current}
                duration={player.duration}
                musicVolume={player.musicVolume}
                muted={player.muted}
                repeat={player.repeat}
                onToggle={player.toggle}
                onNext={player.next}
                onPrev={player.prev}
                onSeek={player.seek}
                onVolume={player.setMusicVolume}
                onMute={() => player.setMuted(!player.muted)}
                onRepeat={() => player.setRepeat(!player.repeat)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map */}
      <AnimatePresence mode="wait">
        {!activePlanet && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-32"
          >
            <p className="text-xs uppercase tracking-[0.5em] text-accent">Choose a destination</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-glow text-center max-w-2xl whitespace-pre-line">
              Four worlds. One heart.{"\n"}All yours.
            </h2>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14">
              {planets.map((p) => (
                <PlanetVisual key={p.id} planet={p} size={130} onClick={() => openPlanet(p.id)} />
              ))}
            </div>

            <p className="mt-16 text-xs text-muted-foreground text-center max-w-md">
              Tip: look up — somewhere out there a star is waiting to be discovered.
            </p>

            <FinalStar />
          </motion.div>
        )}

        {activePlanet && (
          <PlanetView key={activePlanet.id} planet={activePlanet} onClose={closePlanet} />
        )}
      </AnimatePresence>

      {/* Cinematic overlay on entry */}
      <AnimatePresence>
        {overlay && activePlanet && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none fixed top-24 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-2xl px-6 py-4 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] text-accent">Now entering</p>
            <p className="mt-1 text-2xl font-semibold text-glow">{activePlanet.name}</p>
            {player.track && (
              <p className="mt-1 text-xs text-muted-foreground">
                ♪ {player.track.title} — {player.track.artist}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}