import { ARCANAS } from '../config/arcanas-data.js';
import { ENEMIES } from '../config/enemies-data.js';
import { ENEMY_LORE_STAGE_TEXT, GOURMANDO_NOTES } from '../config/narrative-data.js';
import { PASSIVE_DEFS } from '../config/passives-data.js';
import { RELIC_DEFS } from '../config/relics-data.js';
import { EVOLUTION_DEFS, WEAPON_DEFS } from '../config/weapons-data.js';
import { getEnemyLoreStage, hasRelic, normalizeM4Meta } from '../game/m4-systems.js';

export const BESTIARY_CATEGORIES = [
  { id: 'enemies', label: '敌人', accent: '#ff8787' },
  { id: 'weapons', label: '武器', accent: '#ffd43b' },
  { id: 'passives', label: '被动', accent: '#a9e34b' },
  { id: 'evolutions', label: '进化', accent: '#eebefa' },
  { id: 'functional', label: '功能', accent: '#91f2d2' },
  { id: 'arcanas', label: '圣杯', accent: '#74c0fc' },
  { id: 'notes', label: '便条', accent: '#f8f1d8' },
  { id: 'relics', label: '遗物', accent: '#74c0fc' }
];

export function getBestiaryEntries(categoryId, bestiary = {}, meta = null) {
  if (categoryId === 'enemies') return getEnemyEntriesWithLore(bestiary, meta);
  if (categoryId === 'weapons') return getBaseWeaponEntries(bestiary, false, 'weapons');
  if (categoryId === 'passives') return getPassiveEntries(bestiary);
  if (categoryId === 'evolutions') return getEvolutionEntries(bestiary, null, 'evolutions');
  if (categoryId === 'functional') {
    return [
      ...getBaseWeaponEntries(bestiary, true, 'functional'),
      ...getEvolutionEntries(bestiary, true, 'functional')
    ];
  }
  if (categoryId === 'arcanas') return getArcanaEntries(bestiary);
  if (categoryId === 'notes') return getNoteEntries(meta);
  if (categoryId === 'relics') return getRelicEntries(meta);
  return [];
}

export function getBestiaryEntryByKey(categoryId, key, bestiary = {}, meta = null) {
  return getBestiaryEntries(categoryId, bestiary, meta).find(entry => entry.key === key) || null;
}

export function paginateBestiaryEntries(entries, page = 0, pageSize = 12) {
  const safePageSize = Math.max(1, pageSize || 1);
  const totalPages = Math.max(1, Math.ceil(entries.length / safePageSize));
  const safePage = Math.max(0, Math.min(totalPages - 1, page || 0));
  const start = safePage * safePageSize;
  return {
    page: safePage,
    pageSize: safePageSize,
    totalItems: entries.length,
    totalPages,
    items: entries.slice(start, start + safePageSize)
  };
}

function getEnemyEntries(bestiary) {
  const enemies = [...ENEMIES.common, ...ENEMIES.elite, ENEMIES.boss];
  return enemies.map(enemy => ({
    key: `enemy:${enemy.id}`,
    id: enemy.id,
    kind: 'enemy',
    categoryId: 'enemies',
    name: enemy.name,
    nameEn: enemy.nameEn,
    spriteId: enemy.id,
    unlocked: !!bestiary?.enemies?.[enemy.id],
    tags: [enemy.moveType, enemy.level].filter(Boolean),
    summary: enemy.deathQuote || '未知敌人。',
    stats: [
      { label: 'HP', value: enemy.hp },
      { label: 'ATK', value: enemy.atk },
      { label: 'SPD', value: enemy.speed }
    ],
    data: enemy
  }));
}

function getEnemyEntriesWithLore(bestiary, meta) {
  const enemies = [...ENEMIES.common, ...ENEMIES.elite, ENEMIES.boss];
  return enemies.map(enemy => {
    const stage = getEnemyLoreStage(meta?.m4 || meta || {}, enemy.id);
    const lore = ENEMY_LORE_STAGE_TEXT[enemy.id] || ENEMY_LORE_STAGE_TEXT.default;
    return {
      key: `enemy:${enemy.id}`,
      id: enemy.id,
      kind: 'enemy',
      categoryId: 'enemies',
      name: enemy.name,
      nameEn: enemy.nameEn,
      spriteId: enemy.id,
      unlocked: !!bestiary?.enemies?.[enemy.id] || stage > 0,
      tags: [enemy.moveType, enemy.level].filter(Boolean),
      summary: lore[Math.min(stage, lore.length - 1)] || enemy.deathQuote || '未知敌人。',
      stats: [
        { label: 'HP', value: enemy.hp },
        { label: 'ATK', value: enemy.atk },
        { label: 'SPD', value: enemy.speed },
        { label: '档案', value: `${stage}/3` }
      ],
      data: enemy
    };
  });
}

function getNoteEntries(meta) {
  const m4 = normalizeM4Meta(meta?.m4 || meta || {});
  return GOURMANDO_NOTES.map(note => {
    const unlocked = m4.notes.includes(note.id);
    return {
      key: `note:${note.id}`,
      id: note.id,
      kind: 'note',
      categoryId: 'notes',
      name: note.title,
      nameEn: note.source,
      spriteId: null,
      unlocked,
      tags: [note.levelId],
      summary: unlocked ? note.text : '尚未找到这张便条。',
      stats: [{ label: '来源', value: note.source }],
      data: note
    };
  });
}

function getRelicEntries(meta) {
  const m4 = normalizeM4Meta(meta?.m4 || meta || {});
  return Object.values(RELIC_DEFS).map(relic => {
    const unlocked = hasRelic(m4, relic.id);
    return {
      key: `relic:${relic.id}`,
      id: relic.id,
      kind: 'relic',
      categoryId: 'relics',
      name: relic.name,
      nameEn: relic.nameEn,
      spriteId: null,
      unlocked,
      tags: relic.features || [],
      summary: unlocked ? relic.desc : '尚未取得这件遗物。',
      stats: [{ label: '功能', value: (relic.features || []).join(', ') || '-' }],
      data: relic
    };
  });
}

function getPassiveEntries(bestiary) {
  return Object.values(PASSIVE_DEFS).map(passive => ({
    key: `passive:${passive.id}`,
    id: passive.id,
    kind: 'passive',
    categoryId: 'passives',
    name: passive.name,
    nameEn: passive.nameEn,
    spriteId: passive.id,
    unlocked: !!bestiary?.passives?.[passive.id],
    tags: ['被动', passiveStatLabel(passive.stat)],
    summary: passive.flavor || passive.desc || '尚未记录。',
    stats: [
      { label: '效果', value: passive.desc },
      { label: '每级', value: formatPassiveGain(passive) },
      { label: '上限', value: `Lv.${passive.maxLevel}` }
    ],
    data: passive
  }));
}

function getArcanaEntries(bestiary) {
  return ARCANAS.map(arcana => ({
    key: `arcana:${arcana.id}`,
    id: arcana.id,
    kind: 'arcana',
    categoryId: 'arcanas',
    name: arcana.name,
    nameEn: arcana.nameEn,
    spriteId: arcana.id,
    unlocked: !!bestiary?.arcanas?.[arcana.id],
    tags: ['圣杯卡'],
    summary: arcana.desc,
    stats: [{ label: '效果', value: arcana.desc }],
    data: arcana
  }));
}

function getBaseWeaponEntries(bestiary, functionalOnly, categoryId) {
  return Object.values(WEAPON_DEFS)
    .filter(weapon => !!weapon.functional === functionalOnly)
    .map(weapon => makeWeaponEntry(weapon, bestiary, categoryId, null));
}

function getEvolutionEntries(bestiary, functionalOnly, categoryId) {
  return Object.values(EVOLUTION_DEFS)
    .filter(weapon => functionalOnly === null || !!weapon.functional === functionalOnly)
    .map(weapon => makeWeaponEntry(weapon, bestiary, categoryId, {
      baseWeaponId: weapon.baseWeaponId,
      requiredPassiveId: weapon.requiredPassiveId
    }));
}

function makeWeaponEntry(weapon, bestiary, categoryId, recipe) {
  const base = WEAPON_DEFS[weapon.baseWeaponId] || weapon;
  const stats = [];
  if (base.baseDamage !== undefined) stats.push({ label: '伤害', value: base.baseDamage });
  if (base.baseFireRate !== undefined) stats.push({ label: '冷却', value: `${base.baseFireRate}ms` });
  if (base.basePierce !== undefined) stats.push({ label: '穿透', value: base.basePierce });
  if (base.baseRange !== undefined) stats.push({ label: '范围', value: Math.round(base.baseRange) });
  if (weapon.functional || base.functional) stats.push({ label: '机制', value: behaviorLabel(weapon.behavior || base.behavior) });

  return {
    key: `${categoryId}:${weapon.id}`,
    id: weapon.id,
    kind: 'weapon',
    categoryId,
    name: weapon.name,
    nameEn: weapon.nameEn,
    spriteId: weapon.id,
    unlocked: !!bestiary?.weapons?.[weapon.id],
    tags: [
      weapon.functional || base.functional ? '功能' : null,
      recipe ? '进化' : null,
      weapon.hidden || base.hidden ? '隐藏' : null,
      ...(base.tags || [])
    ].filter(Boolean),
    summary: buildWeaponSummary(weapon, base),
    stats,
    recipe,
    data: weapon
  };
}

function buildWeaponSummary(weapon, base) {
  const behavior = behaviorLabel(weapon.behavior || base.behavior);
  const effect = weapon.levelDesc?.[0] || base.levelDesc?.[0] || '';
  if (weapon.functional || base.functional) {
    return [behavior, effect, weapon.flavor || base.flavor].filter(Boolean).join('：');
  }
  return weapon.flavor || base.flavor || effect || '尚未记录。';
}

function behaviorLabel(behavior) {
  if (behavior === 'shield') return '护盾';
  if (behavior === 'freeze') return '冰冻';
  if (behavior === 'clear') return '清屏';
  if (behavior === 'bounce') return '弹射';
  if (behavior === 'boomerang') return '回旋';
  if (behavior === 'orbit') return '环绕';
  if (behavior === 'aura') return '光环';
  if (behavior === 'sweep') return '挥砍';
  if (behavior === 'spray') return '喷射';
  if (behavior === 'lob') return '抛射';
  return behavior || '武器';
}

function passiveStatLabel(stat) {
  if (stat === 'damage') return '伤害';
  if (stat === 'cooldown') return '攻速';
  if (stat === 'area') return '范围';
  if (stat === 'armor') return '护甲';
  if (stat === 'magnet') return '磁铁';
  if (stat === 'speed') return '移速';
  if (stat === 'luck') return '幸运';
  if (stat === 'growth') return '经验';
  return stat || '被动';
}

function formatPassiveGain(passive) {
  if (!passive) return '-';
  if (passive.stat === 'armor') return `+${passive.perLevel}`;
  return `+${Math.round((passive.perLevel || 0) * 100)}%`;
}
