export const CHARACTERS = [
  {
    id: "antonio",
    name: "Antonio Spicy",
    title: "被迫营业的长子",
    lore: "诅咒降临时他正在吃泡面，现在他拿着飞出的拖鞋战斗。",
    weapon: "Bouncing Slipper",
    startWeaponId: "bouncing_slipper",
    passive: {
      name: "想快点结束回家",
      description: "+10% 移动速度",
      effects: { moveSpeed: 0.10 }
    },
    stats: {
      maxHp: 100,
      moveSpeed: 1.10,
      power: 1.0,
      attackSpeed: 1.0,
      area: 1.0,
      magnet: 1.0,
      luck: 1.0
    }
  },
  {
    id: "imelda",
    name: "Imelda Spicy",
    title: "家族里的虔诚者（但信仰的是美食之神）",
    lore: "她本想在教堂安静祈祷，但怪物打断了她的午餐。",
    weapon: "Spinning Ladle",
    startWeaponId: "spinning_ladle",
    passive: {
      name: "好学",
      description: "+15% 经验获取",
      effects: { expGain: 0.15 }
    },
    stats: {
      maxHp: 90,
      moveSpeed: 1.0,
      power: 0.9,
      attackSpeed: 1.0,
      area: 1.0,
      magnet: 1.0,
      luck: 1.0
    }
  },
  {
    id: "gennaro",
    name: "Gennaro Spicy",
    title: "退休的屠夫，现在的\"猎手\"",
    lore: "他声称自己见过Gourmando，但所有人都知道他在撒谎。",
    weapon: "Boomerang Cleaver",
    startWeaponId: "boomerang_cleaver",
    passive: {
      name: "年纪大了",
      description: "+20% 力量，-10% 攻击速度",
      effects: { power: 0.20, attackSpeed: -0.10 }
    },
    stats: {
      maxHp: 120,
      moveSpeed: 0.95,
      power: 1.20,
      attackSpeed: 0.90,
      area: 1.0,
      magnet: 1.0,
      luck: 1.0
    }
  },
  {
    id: "little_antonio",
    name: "Little Antonio",
    title: "快递箱里的小号长子",
    lore: "箱子里永远是家族成员。他更小、更快，也更会把金币塞进口袋。",
    weapon: "随机家族武器",
    randomStartWeaponIds: [
      "bouncing_slipper",
      "spinning_ladle",
      "boomerang_cleaver",
      "throwing_chopsticks",
      "holy_toast",
      "garlic_breath",
      "rolling_pin",
      "hot_sauce_bottle"
    ],
    passive: {
      name: "小个子大钱包",
      description: "金币 +30%",
      effects: { goldGain: 0.30 }
    },
    stats: {
      maxHp: 70,
      moveSpeed: 1.20,
      power: 0.9,
      attackSpeed: 1.05,
      area: 0.9,
      magnet: 1.0,
      luck: 1.1
    }
  }
];
