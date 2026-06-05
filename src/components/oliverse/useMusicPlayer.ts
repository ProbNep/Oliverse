import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { musicLibrary, type Track } from "@/lib/oliverse-config";
import { loadState, saveState } from "@/lib/oliverse-storage";

// Centralized audio engine for Oliverse.
// - Crossfades when changing playlists (planets).
// - Persists volume / mute to localStorage.
export function useMusicPlayer(playlistIndexes: number[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const initial = typeof window !== "undefined" ? loadState() : null;
  const [masterVolume, setMasterVolume] = useState(initial?.masterVolume ?? 0.8);
  const [musicVolume, setMusicVolume] = useState(initial?.musicVolume ?? 0.7);
  const [muted, setMuted] = useState(initial?.muted ?? false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // Single global playlist = full music library. Planet navigation does not
  // change the currently playing track; only the user can via skip buttons.
  const playlist: Track[] = useMemo(() => musicLibrary, []);
  const track = playlist[trackIndex];

  // Compute effective volume
  const effectiveVolume = muted ? 0 : masterVolume * musicVolume;

  // Persist
  useEffect(() => {
    saveState({ masterVolume, musicVolume, muted });
  }, [masterVolume, musicVolume, muted]);

  // Init audio element
  useEffect(() => {
    const a = new Audio();
    a.preload = "metadata";
    audioRef.current = a;
    const onTime = () => setCurrent(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnded = () => {
      if (repeat) {
        a.currentTime = 0;
        a.play().catch(() => {});
      } else {
        next();
      }
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnded);
    return () => {
      a.pause();
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load track + crossfade
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !track) return;
    const wasPlaying = isPlaying;
    // Fade out
    const startVol = a.volume;
    const steps = 12;
    let i = 0;
    if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = window.setInterval(() => {
      i++;
      a.volume = Math.max(0, startVol * (1 - i / steps));
      if (i >= steps) {
        window.clearInterval(fadeTimerRef.current!);
        a.src = track.audio;
        a.volume = 0;
        if (wasPlaying || isPlaying) {
          a.play().catch(() => setIsPlaying(false));
        }
        // Fade in
        let j = 0;
        fadeTimerRef.current = window.setInterval(() => {
          j++;
          a.volume = Math.min(effectiveVolume, effectiveVolume * (j / steps));
          if (j >= steps) window.clearInterval(fadeTimerRef.current!);
        }, 40);
      }
    }, 40);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex, playlist]);

  // React to volume changes immediately
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = effectiveVolume;
  }, [effectiveVolume]);

  const play = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.src && track) a.src = track.audio;
    a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [track]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => (isPlaying ? pause() : play()), [isPlaying, pause, play]);

  const next = useCallback(() => {
    setTrackIndex((i) => (i + 1) % Math.max(playlist.length, 1));
  }, [playlist.length]);

  const prev = useCallback(() => {
    setTrackIndex((i) => (i - 1 + playlist.length) % Math.max(playlist.length, 1));
  }, [playlist.length]);

  const seek = useCallback((t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t;
  }, []);

  // Intentionally no playlist-reset effect: switching planets must not change the track.

  return {
    track,
    playlist,
    isPlaying,
    current,
    duration,
    masterVolume,
    musicVolume,
    muted,
    repeat,
    setMasterVolume,
    setMusicVolume,
    setMuted,
    setRepeat,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
  };
}

export function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}