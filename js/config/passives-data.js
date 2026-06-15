export const PASSIVE_DEFS = {
  bubble_foam: {
    id: 'bubble_foam',
    name: '泡面',
    nameEn: 'Bubble Foam',
    maxLevel: 5,
    stat: 'damage',
    perLevel: 0.08,
    desc: '所有伤害提升。',
    flavor: '深夜厨房的第一信仰。'
  },
  fitness_bracer: {
    id: 'fitness_bracer',
    name: '健身护腕',
    nameEn: 'Fitness Bracer',
    maxLevel: 5,
    stat: 'cooldown',
    perLevel: 0.06,
    desc: '武器冷却缩短。',
    flavor: '厨师长说这叫备菜热身。'
  },
  magnifying_glass: {
    id: 'magnifying_glass',
    name: '放大镜',
    nameEn: 'Magnifying Glass',
    maxLevel: 5,
    stat: 'area',
    perLevel: 0.10,
    desc: '武器范围与体积提升。',
    flavor: '能看清账单上的小字。'
  },
  takeout_lid: {
    id: 'takeout_lid',
    name: '外卖头盔',
    nameEn: 'Takeout Lid',
    maxLevel: 5,
    stat: 'armor',
    perLevel: 1,
    desc: '受到的碰撞伤害降低。',
    flavor: '盖住头，假装不是你的订单。'
  },
  empty_boba_cup: {
    id: 'empty_boba_cup',
    name: '空奶茶杯',
    nameEn: 'Empty Boba Cup',
    maxLevel: 5,
    stat: 'magnet',
    perLevel: 0.18,
    desc: '拾取范围提升。',
    flavor: '吸管仍在寻找最后一颗珍珠。'
  },
  running_shoes: {
    id: 'running_shoes',
    name: '跑鞋',
    nameEn: 'Running Shoes',
    maxLevel: 5,
    stat: 'speed',
    perLevel: 0.06,
    desc: '移动速度提升。',
    flavor: '逃单不是美德，但很实用。'
  },
  lucky_cat_charm: {
    id: 'lucky_cat_charm',
    name: '幸运猫摆件',
    nameEn: 'Lucky Cat Charm',
    maxLevel: 5,
    stat: 'luck',
    perLevel: 0.10,
    desc: '幸运提升，影响额外选项和奖励。',
    flavor: '它招来的不一定是钱。'
  },
  family_recipe: {
    id: 'family_recipe',
    name: '祖传食谱',
    nameEn: 'Family Recipe',
    maxLevel: 5,
    stat: 'growth',
    perLevel: 0.08,
    desc: '经验获取提升。',
    flavor: '第一页写着：别问。'
  }
};

export function getPassiveModifier(passives, stat) {
  let total = 0;
  for (const item of Object.values(passives || {})) {
    const def = PASSIVE_DEFS[item.id];
    if (def && def.stat === stat) {
      total += def.perLevel * item.level;
    }
  }
  return total;
}
