const DEFAULT_LIMITS = {
  reroll: 4,
  skip: 4,
  banish: 3,
  seal: 3
};

function optionIdFromKey(key = '') {
  return String(key).split(':')[1] || key;
}

export function createRunLevelUpControls(meta = {}, limits = DEFAULT_LIMITS) {
  return {
    reroll: limits.reroll,
    skip: limits.skip,
    banish: limits.banish,
    seal: limits.seal,
    banished: new Set(),
    sealed: new Set(meta.sealedUpgrades || []),
    persistentSeals: new Set(meta.sealedUpgrades || [])
  };
}

export function spendLevelUpControl(controls, type) {
  if (!controls || !Object.prototype.hasOwnProperty.call(controls, type)) {
    return { ok: false, reason: 'missing' };
  }
  if (controls[type] <= 0) return { ok: false, reason: 'empty' };
  controls[type] -= 1;
  return { ok: true, remaining: controls[type] };
}

export function banishUpgrade(controls, optionKey) {
  const spent = spendLevelUpControl(controls, 'banish');
  if (!spent.ok) return spent;
  controls.banished.add(optionIdFromKey(optionKey));
  return { ok: true, remaining: controls.banish };
}

export function sealUpgrade(controls, optionKey) {
  const spent = spendLevelUpControl(controls, 'seal');
  if (!spent.ok) return spent;
  const id = optionIdFromKey(optionKey);
  controls.sealed.add(id);
  controls.persistentSeals.add(id);
  return { ok: true, remaining: controls.seal };
}

export function controlsToMetaSeals(controls) {
  return Array.from(controls?.persistentSeals || []);
}
