export const WEAPON_SLOT_LIMIT = 6;
export const PASSIVE_SLOT_LIMIT = 6;

export function expToNextLevel(level) {
  if (level >= 40) return 5 + 16 * (level - 1);
  if (level >= 20) return 5 + 13 * (level - 1);
  return 5 + 10 * (level - 1);
}
