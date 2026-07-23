export const PANEL_COUNT = 14;
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const COVER_DURATION = 0.7;   // seconds, per panel
export const REVEAL_DURATION = 0.65; // seconds, per panel
export const MAX_STAGGER = 0.35;     // seconds, randomized per panel
export const HOLD_DURATION = 140;    // ms pause once fully covered

export function getRandomDelays(count: number, maxStagger: number): number[] {
  return Array.from({ length: count }, () => Math.random() * maxStagger);
}

// Subtle warm-charcoal variation so panels don't read as flat/identical
export const PANEL_SHADES = [
  '#1F1F1F', '#221E1B', '#241F1A', '#211C18', '#1D1A17',
  '#231D18', '#1F1B17', '#25201B', '#1E1A16', '#221D19',
  '#201C18', '#241E19', '#1F1C18', '#221E1A', '#201B17', '#231E19',
];