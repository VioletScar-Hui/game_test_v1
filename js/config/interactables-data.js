import { DROP_ITEMS } from './enemies-data.js';
import { GOURMANDO_NOTES } from './narrative-data.js';
import { RELIC_DEFS } from './relics-data.js';
import { mulberry32 } from '../systems/rng.js';

export const INTERACTABLE_DEFS = {
  picnic_campfire: {
    id: 'picnic_campfire',
    name: '野餐篝火',
    desc: '恢复 30% 最大生命，并掉落一只鸡腿。',
    color: '#ff922b'
  },
  package: {
    id: 'package',
    name: '可疑外卖包裹',
    desc: '首次打开解锁 Little Antonio，此后获得金币。',
    color: '#f08c00'
  },
  curse_altar: {
    id: 'curse_altar',
    name: '诅咒祭坛',
    desc: '献祭 20% 当前生命，幸运 +25%，下一宝箱必定三连。',
    color: '#cc5de8'
  },
  bill_pile: {
    id: 'bill_pile',
    name: '账单堆',
    desc: '获得 15 枚金币，10 秒内刷怪密度翻倍。',
    color: '#ffd43b'
  },
  wandering_merchant: {
    id: 'wandering_merchant',
    name: '流浪商人',
    desc: '打开临时商店。',
    color: '#74c0fc'
  },
  mirror: {
    id: 'mirror',
    name: '告解镜',
    desc: '凝视镜子，记录镜子圣杯卡线索。',
    color: '#91a7ff'
  }
};

const OPTIONAL_TYPES = ['curse_altar', 'bill_pile', 'wandering_merchant'];

INTERACTABLE_DEFS.gourmando_note = {
  id: 'gourmando_note',
  name: 'Gourmando 便条',
  desc: '记录 Gourmando 留下的线索。收齐 12 张会解锁 Moonboba 镜像首领。',
  color: '#f8f1d8'
};

INTERACTABLE_DEFS.relic_cache = {
  id: 'relic_cache',
  name: '遗物餐盒',
  desc: '获得一件永久遗物并解锁对应功能。',
  color: '#91f2d2'
};

export function buildInteractablePlan(levelId, seed = 1) {
  const rng = mulberry32(hashString(`${levelId}:${seed}:m3`));
  const plan = [
    makePlanned('picnic_campfire', 0.28, 0.36)
  ];

  const notes = GOURMANDO_NOTES.filter(note => note.levelId === levelId);
  notes.forEach((note, index) => {
    plan.push(makePlanned('gourmando_note', 0.22 + index * 0.48, 0.66 - index * 0.18, {
      noteId: note.id,
      name: note.title
    }));
  });

  const relicId = getRelicForLevel(levelId);
  if (relicId) {
    const relic = RELIC_DEFS[relicId];
    plan.push(makePlanned('relic_cache', 0.74, 0.32, {
      relicId,
      name: relic?.name || '遗物餐盒'
    }));
  }

  if (levelId === 'hungry_forest') {
    plan.push(makePlanned('package', 0.64, 0.46));
  }
  if (levelId === 'capella_pasta') {
    plan.push(makePlanned('mirror', 0.62, 0.40));
  }
  if (levelId === 'moonboba') {
    plan.push(makePlanned('wandering_merchant', 0.54, 0.52));
  }

  for (const type of OPTIONAL_TYPES) {
    const roll = rng();
    if (type === 'curse_altar' && roll < 0.40) plan.push(makePlanned(type, 0.30 + rng() * 0.42, 0.28 + rng() * 0.44));
    if (type === 'bill_pile' && roll < 0.30) plan.push(makePlanned(type, 0.30 + rng() * 0.42, 0.28 + rng() * 0.44));
    if (type === 'wandering_merchant' && roll < 0.20) plan.push(makePlanned(type, 0.30 + rng() * 0.42, 0.28 + rng() * 0.44));
  }

  while (plan.length < 2) {
    const type = OPTIONAL_TYPES[Math.floor(rng() * OPTIONAL_TYPES.length)];
    plan.push(makePlanned(type, 0.30 + rng() * 0.42, 0.28 + rng() * 0.44));
  }

  return plan.slice(0, 6).map((entry, index) => ({ ...entry, id: `${entry.type}_${index}` }));
}

function makePlanned(type, px, py, extra = {}) {
  return {
    type,
    name: extra.name || INTERACTABLE_DEFS[type].name,
    px,
    py,
    ...extra
  };
}

export function placeInteractablesInBounds(plan, bounds) {
  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;
  return plan.map(item => ({
    ...item,
    x: bounds.minX + width * item.px,
    y: bounds.minY + height * item.py
  }));
}

export function applyInteractableChoice(game, item, choice = 'activate') {
  if (!game || !item) return { ok: false };
  const type = item.type;
  const player = game.player;
  if (!player) return { ok: false };

  if (type === 'picnic_campfire') {
    const heal = Math.floor(player.maxHp * 0.30);
    player.hp = Math.min(player.maxHp, player.hp + heal);
    dropAt(game, item.x || player.x, item.y || player.y, DROP_ITEMS.chicken_leg);
    return { ok: true, heal };
  }

  if (type === 'package') {
    const firstOpen = !game.runFlags?.packageOpened;
    if (!game.runFlags) game.runFlags = {};
    game.runFlags.packageOpened = true;
    if (firstOpen) {
      if (!game.runUnlockFlags) game.runUnlockFlags = new Set();
      game.runUnlockFlags.add('package_opened');
      return { ok: true, unlock: 'little_antonio' };
    }
    player.gold += 35;
    return { ok: true, gold: 35 };
  }

  if (type === 'curse_altar') {
    if (choice === 'ignore') return { ok: true, ignored: true };
    const loss = Math.max(1, Math.floor(player.hp * 0.20));
    player.hp = Math.max(1, player.hp - loss);
    player.luckMultiplier *= 1.25;
    game.forceTripleChest = true;
    game.cursedAltarAccepted = true;
    if (!game.runUnlockFlags) game.runUnlockFlags = new Set();
    game.runUnlockFlags.add('shield_route');
    return { ok: true, hpLost: loss };
  }

  if (type === 'bill_pile') {
    player.gold += 15;
    game.billFrenzyTimer = 10_000;
    if (!game.runUnlockFlags) game.runUnlockFlags = new Set();
    game.runUnlockFlags.add('bill_pile');
    return { ok: true, gold: 15 };
  }

  if (type === 'wandering_merchant') {
    game.state = 'SHOP';
    if (game._generateShopItems) game._generateShopItems();
    return { ok: true, shop: true };
  }

  if (type === 'mirror') {
    if (!game.runFlags) game.runFlags = {};
    game.runFlags.mirrorSeen = true;
    game.ambientLore = {
      text: '镜子里闪过一张圣杯卡的轮廓，像是另一口锅在远处转动。',
      startTime: performance.now(),
      duration: 5000
    };
    return { ok: true, mirror: true };
  }

  if (type === 'gourmando_note') {
    if (!game.runNotesFound) game.runNotesFound = new Set();
    if (item.noteId) game.runNotesFound.add(item.noteId);
    game.ambientLore = {
      text: `发现便条：${item.name || item.noteId}`,
      startTime: performance.now(),
      duration: 5000
    };
    return { ok: true, noteId: item.noteId };
  }

  if (type === 'relic_cache') {
    if (!game.runRelicsFound) game.runRelicsFound = new Set();
    if (item.relicId) game.runRelicsFound.add(item.relicId);
    game.ambientLore = {
      text: `获得遗物：${item.name || item.relicId}`,
      startTime: performance.now(),
      duration: 5000
    };
    return { ok: true, relicId: item.relicId };
  }

  return { ok: false };
}

function getRelicForLevel(levelId) {
  if (levelId === 'hungry_forest') return 'jukebox';
  if (levelId === 'waffle_tower') return 'forbidden_menu';
  if (levelId === 'infinite_cookbook_library') return 'gourmet_magnifier';
  if (levelId === 'bubble_tea_plant') return 'family_frame';
  return null;
}

function dropAt(game, x, y, dropData) {
  if (!game.entityManager || !dropData) return;
  if (typeof game.spawnDrop === 'function') game.spawnDrop(x, y, dropData);
}

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
