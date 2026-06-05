// Tiny localStorage wrapper used throughout Oliverse.
const KEY = "oliverse:v1";

export type SaveState = {
  loggedIn: boolean;
  lastPlanet: string | null;
  masterVolume: number; // 0..1
  musicVolume: number;  // 0..1
  muted: boolean;
};

const DEFAULT: SaveState = {
  loggedIn: false,
  lastPlanet: null,
  masterVolume: 0.8,
  musicVolume: 0.7,
  muted: false,
};

export function loadState(): SaveState {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function saveState(patch: Partial<SaveState>) {
  if (typeof window === "undefined") return;
  const next = { ...loadState(), ...patch };
  window.localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}