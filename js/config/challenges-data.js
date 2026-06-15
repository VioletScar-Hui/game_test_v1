export const CHALLENGE_DEFS = {
  inspector_parade: {
    id: 'inspector_parade',
    name: '检查员大游行',
    nameEn: 'Inspector Parade',
    type: 'boss_rush',
    unlock: 'any_hyper_clear',
    desc: '普通敌人停止刷新，每 90 秒刷新精英或首领，存活到时限即胜利。',
    profile: {
      noCommonEnemies: true,
      eliteIntervalMs: 90_000,
      durationMs: 15 * 60_000,
      spiceLevel: 3,
      hyper: true
    }
  },
  pigeon_kingdom: {
    id: 'pigeon_kingdom',
    name: '鸽子王国',
    nameEn: 'Pigeon Kingdom',
    type: 'single_enemy_swarm',
    enemyId: 'hangry_pigeon',
    unlock: 'hungry_forest_15m',
    desc: '只刷新饥饿鸽子，密度 x3，生命 x0.5。',
    profile: {
      forcedEnemyId: 'hangry_pigeon',
      densityMultiplier: 3,
      hpMultiplier: 0.5,
      durationMs: 15 * 60_000,
      spiceLevel: 2,
      hyper: false
    }
  },
  daily_special: {
    id: 'daily_special',
    name: '每日特餐',
    nameEn: 'Daily Special',
    type: 'daily_seed',
    unlock: 'default',
    desc: '按 UTC 日期生成固定角色、关卡、香料等级、Hyper 与挑战种子。',
    profile: {
      durationMs: 15 * 60_000
    }
  }
};

export const DAILY_CHARACTER_IDS = ['antonio', 'imelda', 'gennaro', 'little_antonio'];
export const DAILY_LEVEL_IDS = ['hungry_forest', 'waffle_tower', 'infinite_cookbook_library', 'bubble_tea_plant', 'capella_pasta'];
export const DAILY_CHALLENGE_IDS = ['pigeon_kingdom', 'inspector_parade'];
