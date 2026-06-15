export function mulberry32(seed) {
  let t = seed >>> 0;
  return function nextRandom() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickWeighted(entries, rng) {
  const total = entries.reduce((sum, entry) => sum + Math.max(0, entry.weight || 0), 0);
  if (total <= 0) return null;
  let roll = rng() * total;
  for (const entry of entries) {
    roll -= Math.max(0, entry.weight || 0);
    if (roll <= 0) return entry.value;
  }
  return entries[entries.length - 1]?.value || null;
}
