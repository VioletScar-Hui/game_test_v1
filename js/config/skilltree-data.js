export const TALENT_BRANCHES = [
  { id: 'attack', name: '火力', accent: '#ff8787' },
  { id: 'defense', name: '韧性', accent: '#91f2d2' },
  { id: 'wealth', name: '财富', accent: '#ffd43b' }
];

export const TALENT_TREE = {
  rootCurrencyName: '星级评价',
  nodes: {
    attack_1: {
      id: 'attack_1',
      branch: 'attack',
      name: '辣油热身',
      cost: 1,
      prerequisites: [],
      desc: '武器伤害 +4%。',
      effects: { powerMultiplier: 1.04 }
    },
    attack_2: {
      id: 'attack_2',
      branch: 'attack',
      name: '猛火翻锅',
      cost: 2,
      prerequisites: ['attack_1'],
      desc: '攻击速度 +5%。',
      effects: { attackSpeedMultiplier: 1.05 }
    },
    attack_keystone: {
      id: 'attack_keystone',
      branch: 'attack',
      name: '火候掌控',
      cost: 3,
      prerequisites: ['attack_1', 'attack_2'],
      keystone: true,
      desc: '武器伤害额外 +8%，投射物节奏更稳定。',
      effects: { powerMultiplier: 1.08, attackSpeedMultiplier: 1.04 }
    },
    defense_1: {
      id: 'defense_1',
      branch: 'defense',
      name: '厚围裙',
      cost: 1,
      prerequisites: [],
      desc: '最大生命 +6%。',
      effects: { maxHpMultiplier: 1.06 }
    },
    defense_2: {
      id: 'defense_2',
      branch: 'defense',
      name: '稳住锅盖',
      cost: 2,
      prerequisites: ['defense_1'],
      desc: '护甲 +1。',
      effects: { armor: 1 }
    },
    defense_keystone: {
      id: 'defense_keystone',
      branch: 'defense',
      name: '绝不翻车',
      cost: 3,
      prerequisites: ['defense_1', 'defense_2'],
      keystone: true,
      desc: '每局额外复活 1 次，最大生命 +6%。',
      effects: { revivals: 1, maxHpMultiplier: 1.06 }
    },
    wealth_1: {
      id: 'wealth_1',
      branch: 'wealth',
      name: '找零直觉',
      cost: 1,
      prerequisites: [],
      desc: '金币收益 +8%。',
      effects: { goldGainMultiplier: 1.08 }
    },
    wealth_2: {
      id: 'wealth_2',
      branch: 'wealth',
      name: '吸管磁场',
      cost: 2,
      prerequisites: ['wealth_1'],
      desc: '拾取范围 +8%。',
      effects: { magnetMultiplier: 1.08 }
    },
    wealth_keystone: {
      id: 'wealth_keystone',
      branch: 'wealth',
      name: '小票归档',
      cost: 3,
      prerequisites: ['wealth_1', 'wealth_2'],
      keystone: true,
      desc: '金币收益 +10%，幸运 +5%。',
      effects: { goldGainMultiplier: 1.10, luckMultiplier: 1.05 }
    }
  }
};
