import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat } from "lucide-react";
import { formatTime } from "./useMusicPlayer";
import type { Track } from "@/lib/oliverse-config";

type Props = {
  track?: Track;
  isPlaying: boolean;
  current: number;
  duration: number;
  musicVolume: number;
  muted: boolean;
  repeat: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (t: number) => void;
  onVolume: (v: number) => void;
  onMute: () => void;
  onRepeat: () => void;
};

export function MusicPlayer(p: Props) {
  if (!p.track) return null;
  const pct = p.duration ? (p.current / p.duration) * 100 : 0;
  return (
    <div className="glass-panel rounded-2xl p-3 flex items-center gap-3 min-w-[280px] md:min-w-[420px]">
      <div
        className="h-14 w-14 rounded-xl bg-cover bg-center flex-shrink-0 border border-border"
        style={{
          backgroundImage: `url(${p.track.cover})`,
          backgroundColor: "oklch(0.25 0.08 290)",
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{p.track.title}</p>
            <p className="truncate text-xs text-muted-foreground">{p.track.artist}</p>
          </div>
          <button
            onClick={p.onRepeat}
            className={`p-1.5 rounded-md transition ${p.repeat ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
            aria-label="Repeat"
          >
            <Repeat size={14} />
          </button>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-[10px] tabular-nums text-muted-foreground w-8 text-right">
            {formatTime(p.current)}
          </span>
          <input
            type="range"
            min={0}
            max={p.duration || 0}
            value={p.current}
            onChange={(e) => p.onSeek(Number(e.target.value))}
            className="flex-1 accent-accent h-1"
            style={{
              background: `linear-gradient(to right, oklch(0.78 0.18 35) ${pct}%, oklch(0.4 0.05 290) ${pct}%)`,
              borderRadius: 999,
              appearance: "none",
            }}
          />
          <span className="text-[10px] tabular-nums text-muted-foreground w-8">
            {formatTime(p.duration)}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <button onClick={p.onPrev} className="p-1.5 rounded-md hover:bg-white/5" aria-label="Previous">
            <SkipBack size={16} />
          </button>
          <button
            onClick={p.onToggle}
            className="btn-cosmic p-2 rounded-full hover:scale-105 transition"
            aria-label={p.isPlaying ? "Pause" : "Play"}
          >
            {p.isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={p.onNext} className="p-1.5 rounded-md hover:bg-white/5" aria-label="Next">
            <SkipForward size={16} />
          </button>
          <div className="ml-auto flex items-center gap-1.5">
            <button onClick={p.onMute} className="p-1.5 rounded-md hover:bg-white/5" aria-label="Mute">
              {p.muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={p.musicVolume}
              onChange={(e) => p.onVolume(Number(e.target.value))}
              className="w-16 accent-accent h-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}