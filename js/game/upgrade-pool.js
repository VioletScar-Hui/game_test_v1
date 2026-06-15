import { WEAPON_DEFS } from '../config/weapons-data.js';
import { PASSIVE_DEFS } from '../config/passives-data.js';
import { PASSIVE_SLOT_LIMIT, WEAPON_SLOT_LIMIT } from './game-balance.js';
import { mulberry32, pickWeighted } from '../systems/rng.js';

function cloneInventory(inventory) {
  return {
    ...inventory,
    weapons: clonePlain(inventory.weapons || {}),
    passives: clonePlain(inventory.passives || {})
  };
}

function clonePlain(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeInventory(inventory) {
  return {
    weapons: inventory?.weaponInventory?.weapons || inventory?.weapons || {},
    passives: inventory?.passiveInventory?.passives || inventory?.passives || {},
    gold: inventory?.gold || 0,
    hp: inventory?.hp || 0,
    maxHp: inventory?.maxHp || 0
  };
}

function makeWeaponOption(id, item, isNew) {
  const def = WEAPON_DEFS[id];
  return {
    key: `weapon:${id}`,
    kind: 'weapon',
    id,
    isNew,
    name: def.name,
    nameEn: def.nameEn,
    level: isNew ? 1 : item.level + 1,
    maxLevel: def.maxLevel,
    desc: def.levelDesc[Math.min(def.levelDesc.length - 1, isNew ? 0 : item.level)] || def.levelDesc[0],
    flavor: def.flavor
  };
}

function makePassiveOption(id, item, isNew) {
  const def = PASSIVE_DEFS[id];
  return {
    key: `passive:${id}`,
    kind: 'passive',
    id,
    isNew,
    name: def.name,
    nameEn: def.nameEn,
    level: isNew ? 1 : item.level + 1,
    maxLevel: def.maxLevel,
    desc: def.desc,
    flavor: def.flavor
  };
}

export function buildUpgradeOptions({
  inventory,
  seed = Date.now(),
  count = 3,
  banished = new Set(),
  sealed = new Set(),
  unlockedWeapons = null
}) {
  const normalized = normalizeInventory(inventory);
  const rng = mulberry32(seed);
  const pool = [];

  for (const item of Object.values(normalized.weapons)) {
    const def = WEAPON_DEFS[item.id];
    if (!def || item.level >= def.maxLevel || banished.has(item.id) || sealed.has(item.id)) continue;
    pool.push({ value: makeWeaponOption(item.id, item, false), weight: 8 });
  }

  for (const item of Object.values(normalized.passives)) {
    const def = PASSIVE_DEFS[item.id];
    if (!def || item.level >= def.maxLevel || banished.has(item.id) || sealed.has(item.id)) continue;
    pool.push({ value: makePassiveOption(item.id, item, false), weight: 8 });
  }

  if (Object.keys(normalized.weapons).length < WEAPON_SLOT_LIMIT) {
    for (const [id, def] of Object.entries(WEAPON_DEFS)) {
      if (def.hidden || normalized.weapons[id] || banished.has(id) || sealed.has(id)) continue;
      if (unlockedWeapons && !unlockedWeapons.has(id)) continue;
      pool.push({ value: makeWeaponOption(id, null, true), weight: 3 });
    }
  }

  if (Object.keys(normalized.passives).length < PASSIVE_SLOT_LIMIT) {
    for (const id of Object.keys(PASSIVE_DEFS)) {
      if (normalized.passives[id] || banished.has(id) || sealed.has(id)) continue;
      pool.push({ value: makePassiveOption(id, null, true), weight: 3 });
    }
  }

  pool.push({ value: { key: 'fallback:gold', kind: 'fallback', id: 'gold', name: '金币袋', desc: '获得 25 金币。', flavor: '小费也是生存资源。', amount: 25 }, weight: 1 });
  if (normalized.hp < normalized.maxHp) {
    pool.push({ value: { key: 'fallback:chicken', kind: 'fallback', id: 'chicken', name: '鸡腿', desc: '恢复 30 生命。', flavor: '热的。可疑地热。', amount: 30 }, weight: 1 });
  }

  const selected = [];
  const selectedKeys = new Set();

  for (const entry of pool) {
    if (selected.length >= count) break;
    if (entry.weight >= 8 && !selectedKeys.has(entry.value.key)) {
      selected.push(entry.value);
      selectedKeys.add(entry.value.key);
    }
  }

  while (selected.length < count && selectedKeys.size < pool.length) {
    const candidate = pickWeighted(pool.filter(entry => !selectedKeys.has(entry.value.key)), rng);
    if (!candidate) break;
    selected.push(candidate);
    selectedKeys.add(candidate.key);
  }

  const slotsFull = Object.keys(normalized.weapons).length >= WEAPON_SLOT_LIMIT &&
    Object.keys(normalized.passives).length >= PASSIVE_SLOT_LIMIT;
  if (slotsFull && !selected.some(option => option.kind === 'fallback')) {
    const fallback = pool.find(entry => entry.value.kind === 'fallback')?.value;
    if (fallback) {
      selected[Math.max(0, selected.length - 1)] = fallback;
    }
  }

  return selected;
}

export function applyUpgradeChoice(inventory, choice) {
  const next = cloneInventory(inventory);
  if (choice.kind === 'weapon') {
    const current = next.weapons[choice.id];
    next.weapons[choice.id] = current
      ? { ...current, level: Math.min(WEAPON_DEFS[choice.id].maxLevel, current.level + 1) }
      : { id: choice.id, level: 1 };
  } else if (choice.kind === 'passive') {
    const current = next.passives[choice.id];
    next.passives[choice.id] = current
      ? { ...current, level: Math.min(PASSIVE_DEFS[choice.id].maxLevel, current.level + 1) }
      : { id: choice.id, level: 1 };
  } else if (choice.kind === 'fallback' && choice.id === 'gold') {
    next.gold = (next.gold || 0) + (choice.amount || 25);
  } else if (choice.kind === 'fallback' && choice.id === 'chicken') {
    next.hp = Math.min(next.maxHp || 0, (next.hp || 0) + (choice.amount || 30));
  }
  return next;
}
