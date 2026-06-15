export function getWeaponPreviewSpec(entry) {
  if (!entry || entry.kind !== 'weapon') return null;
  const weapon = entry.data || {};
  const behavior = weapon.behavior || 'unknown';
  const type = previewTypeForBehavior(behavior, weapon);
  const labels = getPreviewLabels(type, weapon);
  return {
    type,
    title: labels.title,
    caption: labels.caption,
    behavior,
    spriteId: entry.spriteId || weapon.id || entry.id,
    range: weapon.baseRange || 120,
    arc: weapon.baseArc || Math.PI / 2.4,
    count: weapon.baseCount || 1,
    functional: !!weapon.functional
  };
}

function previewTypeForBehavior(behavior, weapon) {
  if (behavior === 'shield') return 'shield';
  if (behavior === 'freeze') return 'freeze';
  if (behavior === 'clear') return 'clear';
  if (behavior === 'bounce') return 'bounce';
  if (behavior === 'orbit') return 'orbit';
  if (behavior === 'boomerang') return 'boomerang';
  if (behavior === 'sweep') return 'sweep';
  if (behavior === 'aura') return 'aura';
  if (behavior === 'spray') return 'spray';
  if (behavior === 'lob') return 'lob';
  if (behavior === 'needle') return 'needle';
  if (weapon.functional) return 'clear';
  return 'unknown';
}

function getPreviewLabels(type, weapon) {
  return WEAPON_LABEL_OVERRIDES[weapon.id] || PREVIEW_LABELS[type] || PREVIEW_LABELS.unknown;
}

const PREVIEW_LABELS = {
  bounce: {
    title: '弹射轨迹',
    caption: '自动投出后在敌人之间弹射，适合清理成群目标。'
  },
  orbit: {
    title: '环绕攻击',
    caption: '围绕角色稳定旋转，持续撞击靠近的敌人。'
  },
  boomerang: {
    title: '回旋飞行',
    caption: '旋转飞出后折返，十字架与回旋菜刀会沿路径反复穿过敌群。'
  },
  sweep: {
    title: '中心挥砍',
    caption: '以角色为中心向一侧扫出弧形斩击，不是角色挥手动作。'
  },
  aura: {
    title: '范围脉冲',
    caption: '围绕角色周期性造成范围伤害，敌人靠近时会被脉冲命中。'
  },
  spray: {
    title: '扇形喷射',
    caption: '朝前方喷出扇形弹幕或火锅热浪，覆盖一片区域。'
  },
  lob: {
    title: '慢速抛射',
    caption: '向附近目标抛出慢速重型投射物，依靠较大碰撞体和穿透压制目标。'
  },
  needle: {
    title: '直线穿刺',
    caption: '朝最近敌人发射高速直线投射物，升级后增加数量和穿透。'
  },
  shield: {
    title: '护盾层',
    caption: '在角色周围生成护盾层，抵挡接触并触发防护效果。'
  },
  freeze: {
    title: '冻结扫描',
    caption: '周期性扫出冰冻射线，使路径上的敌人减速或冻结。'
  },
  clear: {
    title: '清屏脉冲',
    caption: '周期性释放大范围清屏效果，清理普通敌人和掉落。'
  },
  unknown: {
    title: '自动攻击',
    caption: '该武器会按照自身规则自动寻找目标。'
  }
};

const WEAPON_LABEL_OVERRIDES = {
  service_bell: {
    title: '清屏脉冲',
    caption: '周期性清理普通敌人；低等级会顺带清掉掉落物，后期保留掉落。'
  },
  michelin_cloak: {
    title: '护盾复苏',
    caption: '生成三层护盾，并在首次濒死时保留生命、进入短暂无敌。'
  },
  infinite_buffet: {
    title: '强化冻结',
    caption: '扫出三道冻结射线，命中时额外削去敌人当前生命。'
  },
  gorgeous_moonboba: {
    title: '清屏脉冲',
    caption: '周期性清屏普通敌人，吸取掉落，并对非普通目标洒下月光伤害。'
  }
};
