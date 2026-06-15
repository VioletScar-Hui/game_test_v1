// --- config/constants.js ---
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const TARGET_FPS = 60;
const FIXED_DT = 1000 / TARGET_FPS;

const INTRO_SUBTITLES = [
  { text: "20XX年，Spiceland。", style: "title" },
  { text: "" },
  { text: "Gourmando Feastó——前米其林三星主厨，", style: "name" },
  { text: "现任世界级躲猫猫冠军——", style: "name" },
  { text: "对这片土地下了\"永恒饥饿诅咒\"。", style: "emphasis" },
  { text: "" },
  { text: "效果是灾难性的：", style: "emphasis" },
  { text: "烤鸡在街道上奔跑。" },
  { text: "珍珠奶茶从地底喷涌。" },
  { text: "泡面在月光下跳起了弗朗明戈。" },
  { text: "但没有人，能真正吃饱。", style: "emphasis" },
  { text: "" },
  { text: "The Spicy家族挺身而出。", style: "title" },
  { text: "" },
  { text: "\"我们要找到Gourmando！\"" },
  { text: "\"我们要终结诅咒！\"" },
  { text: "\"我们要……呃，有人知道他到底在哪吗？\"", style: "emphasis" }
];


// --- config/characters.js ---
const CHARACTERS = [
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


// --- config/enemies-data.js ---
const ENEMIES = {
  common: [
    { id: 'hangry_pigeon', name: '饥饿鸽子', nameEn: 'Hangry Pigeon', hp: 30, atk: 8, speed: 0.35, moveType: 'dash', spawnInterval: 800, spawnCount: [1, 2], level: 'hungry_forest', deathQuote: '咕——！那块掉在地上的五秒定律披萨……我还没吃到……' },
    { id: 'crispy_squirrel', name: '酥脆松鼠', nameEn: 'Crispy Squirrel', hp: 45, atk: 12, speed: 0.22, moveType: 'zigzag', spawnInterval: 2000, spawnCount: [1, 1], level: 'waffle_tower', deathQuote: '咔嚓。告诉你个秘密，我其实是一片华夫饼伪装的……' },
    { id: 'sleepy_moth', name: '困倦飞蛾', nameEn: 'Sleepy Moth', hp: 25, atk: 6, speed: 0.15, moveType: 'wander', spawnInterval: 1000, spawnCount: [2, 2], level: 'infinite_cookbook_library', deathQuote: 'zzZZ……别翻页……我还没……读完……这一……段……' },
    { id: 'bouncy_toad', name: '弹跳蟾蜍', nameEn: 'Bouncy Toad', hp: 60, atk: 15, speed: 0.2, moveType: 'jump', spawnInterval: 1500, spawnCount: [1, 1], level: 'bubble_tea_plant', deathQuote: '嗝——我体内的珍珠正在申请独立……它们成功了……' },
    { id: 'guilty_cricket', name: '内疚蟋蟀', nameEn: 'Guilty Cricket', hp: 35, atk: 10, speed: 0.4, moveType: 'rush', spawnInterval: 1000, spawnCount: [2, 2], level: 'capella_pasta', deathQuote: '对不起！我发誓下次弥撒一定开静音模式……' }
  ],
  elite: [
    { id: 'sous_chef_zombie', name: '副厨僵尸', nameEn: 'Sous Chef Zombie', hp: 400, atk: 30, speed: 0.08, moveType: 'slow', spawnInterval: 80000, spawnCount: [1, 1], level: 'hungry_forest', deathQuote: 'Gourmando说实习期满就转正……我已经死了三十年了……' },
    { id: 'pastry_architect_golem', name: '糕点建筑师魔像', nameEn: 'Pastry Architect Golem', hp: 600, atk: 25, speed: 0.05, moveType: 'slow', spawnInterval: 90000, spawnCount: [1, 1], level: 'waffle_tower', deathQuote: '这座塔的结构缺陷……是糖浆承重不足……不是我的锅……' },
    { id: 'librarian_ghost', name: '图书管理员幽灵', nameEn: 'Librarian Ghost', hp: 350, atk: 35, speed: 0.12, moveType: 'float', spawnInterval: 70000, spawnCount: [1, 1], level: 'infinite_cookbook_library', deathQuote: '请帮我把这本书还到……算了，我已经死了，超期费免了吧？' },
    { id: 'quality_control_robot', name: '品控机器人', nameEn: 'Quality Control Robot', hp: 500, atk: 40, speed: 0.18, moveType: 'charge', spawnInterval: 85000, spawnCount: [1, 1], level: 'bubble_tea_plant', deathQuote: '检测到宿主死亡。正在自动生成差评……网络连接失败。' },
    { id: 'sommelier_poltergeist', name: '侍酒师骚灵', nameEn: 'Sommelier Poltergeist', hp: 450, atk: 30, speed: 0.25, moveType: 'float', spawnInterval: 75000, spawnCount: [1, 1], level: 'capella_pasta', deathQuote: '这杯圣酒的保质期……是上一个世纪……请慢用……' }
  ],
  boss: {
    id: 'health_inspector', name: '卫生检查员', nameEn: 'The Health Inspector', hp: 15000, atk: 80, speed: 0.06, moveType: 'boss',
    spawnQuote: '我是The Health Inspector。根据《Spiceland食品安全法》第114条，你在这个没有任何卫生许可的荒野里煮了30分钟怪物——这严重违规。现在，我要给你开张罚单。金额是：你的生命。',
    deathQuote: '……我注意到你的厨房……哦，你根本没有厨房。你在野外煮了30分钟怪物，居然还没食物中毒？这不合规。这是罚单，请签收——哦，你死了？那我会寄给你家族里还活着的人。B-，下次努力。'
  }
};

const DROP_ITEMS = {
  green_candy: { id: 'green_candy', name: '青涩经验糖', nameEn: 'Green Candy', type: 'exp', value: 10, color: '#69db7c', radius: 5, lifetime: 30000, autoPickupRange: 80 },
  red_candy: { id: 'red_candy', name: '爆浆经验糖', nameEn: 'Red Candy', type: 'exp', value: 100, color: '#ff6b6b', radius: 7, lifetime: 30000, autoPickupRange: 9999 },
  coin: { id: 'coin', name: '掉落的钢镚', nameEn: 'Dropped Coin', type: 'gold', value: 1, color: '#ffd43b', radius: 6, lifetime: 30000, autoPickupRange: 80 },
  chicken_leg: { id: 'chicken_leg', name: '烤鸡腿', nameEn: 'Chicken Leg', type: 'heal', value: 0.2, color: '#ffa94d', radius: 8, lifetime: 60000, autoPickupRange: 40 },
  whole_chicken: { id: 'whole_chicken', name: '整只烤鸡', nameEn: 'Whole Chicken', type: 'heal', value: 0.5, color: '#ff922b', radius: 10, lifetime: 60000, autoPickupRange: 40 },
  lunchbox: { id: 'lunchbox', name: '神秘便当盒', nameEn: 'Mystery Lunchbox', type: 'chest', value: 1, color: '#cc5de8', radius: 12, lifetime: 60000, autoPickupRange: 9999 },
  vip_card: { id: 'vip_card', name: '高曼多的黑卡', nameEn: "Gourmando's VIP Card", type: 'rare', value: 1, color: '#ffd700', radius: 14, lifetime: Infinity, autoPickupRange: 40 }
};


// --- config/passives-data.js ---
const PASSIVE_DEFS = {
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

function getPassiveModifier(passives, stat) {
  let total = 0;
  for (const item of Object.values(passives || {})) {
    const def = PASSIVE_DEFS[item.id];
    if (def && def.stat === stat) {
      total += def.perLevel * item.level;
    }
  }
  return total;
}


// --- config/weapons-data.js ---
const WEAPON_DEFS = {
  bouncing_slipper: {
    id: 'bouncing_slipper',
    name: '弹跳拖鞋',
    nameEn: 'Bouncing Slipper',
    type: 'ranged',
    behavior: 'bounce',
    baseDamage: 14,
    baseFireRate: 900,
    baseRange: 360,
    baseCount: 1,
    basePierce: 1,
    maxLevel: 8,
    tags: ['ricochet'],
    levelDesc: ['投出会弹跳的家族拖鞋', '数量+1', '伤害+30%', '冷却-15%', '弹跳+1', '伤害+30%', '范围+25%', '数量+1，弹跳+1'],
    flavor: '据说它会自己找到欠账的人。'
  },
  spinning_ladle: {
    id: 'spinning_ladle',
    name: '旋转汤勺',
    nameEn: 'Spinning Ladle',
    type: 'orbit',
    behavior: 'orbit',
    baseDamage: 10,
    baseFireRate: 0,
    baseRange: 92,
    baseCount: 1,
    maxLevel: 8,
    tags: ['orbit'],
    levelDesc: ['环绕玩家旋转', '数量+1', '伤害+30%', '半径+15%', '数量+1', '伤害+30%', '旋转速度+25%', '数量+1'],
    flavor: '锅里没有汤，只有审判。'
  },
  boomerang_cleaver: {
    id: 'boomerang_cleaver',
    name: '回旋菜刀',
    nameEn: 'Boomerang Cleaver',
    type: 'ranged',
    behavior: 'boomerang',
    baseDamage: 18,
    baseFireRate: 1300,
    baseRange: 320,
    baseCount: 1,
    basePierce: 2,
    maxLevel: 8,
    tags: ['ricochet', 'heavy'],
    levelDesc: ['飞出后折返', '数量+1', '伤害+30%', '冷却-15%', '穿透+1', '伤害+30%', '距离+25%', '数量+1'],
    flavor: 'Gennaro 坚称这是餐具。'
  },
  throwing_chopsticks: {
    id: 'throwing_chopsticks',
    name: '投掷筷子',
    nameEn: 'Throwing Chopsticks',
    type: 'ranged',
    behavior: 'needle',
    baseDamage: 11,
    baseFireRate: 520,
    baseRange: 420,
    baseCount: 1,
    basePierce: 1,
    maxLevel: 8,
    tags: ['ricochet'],
    levelDesc: ['朝最近敌人穿刺', '数量+1', '伤害+30%', '冷却-15%', '穿透+1', '伤害+30%', '速度+25%', '数量+1'],
    flavor: '一双找不到饭碗的筷子。'
  },
  holy_toast: {
    id: 'holy_toast',
    name: '神圣吐司',
    nameEn: 'Holy Toast',
    type: 'lob',
    behavior: 'lob',
    baseDamage: 22,
    baseFireRate: 1500,
    baseRange: 300,
    baseCount: 1,
    maxLevel: 8,
    tags: ['heavy'],
    levelDesc: ['抛物线落地溅射', '范围+20%', '伤害+30%', '冷却-15%', '数量+1', '伤害+30%', '溅射+25%', '数量+1'],
    flavor: '烤焦边缘像圣光一样发黑。'
  },
  garlic_breath: {
    id: 'garlic_breath',
    name: '大蒜气息',
    nameEn: 'Garlic Breath',
    type: 'aura',
    behavior: 'aura',
    baseDamage: 4,
    baseFireRate: 420,
    baseRange: 70,
    baseCount: 1,
    maxLevel: 8,
    tags: ['hot', 'orbit'],
    levelDesc: ['持续伤害光环', '范围+20%', '伤害+30%', '冷却-15%', '范围+20%', '伤害+30%', '击退+15%', '范围+25%'],
    flavor: '餐桌社交的终极防御。'
  },
  rolling_pin: {
    id: 'rolling_pin',
    name: '擀面杖',
    nameEn: 'Rolling Pin',
    type: 'melee',
    behavior: 'sweep',
    baseDamage: 16,
    baseFireRate: 720,
    baseRange: 86,
    baseArc: Math.PI / 2.6,
    baseCount: 1,
    maxLevel: 8,
    tags: ['heavy'],
    levelDesc: ['近身横扫', '范围+20%', '伤害+30%', '冷却-15%', '反向横扫', '伤害+30%', '弧度+20%', '二连横扫'],
    flavor: '家族会议通常由它主持。'
  },
  hot_sauce_bottle: {
    id: 'hot_sauce_bottle',
    name: '辣酱瓶',
    nameEn: 'Hot Sauce Bottle',
    type: 'spray',
    behavior: 'spray',
    baseDamage: 8,
    baseFireRate: 1800,
    baseRange: 240,
    baseCount: 1,
    basePierce: 0,
    maxLevel: 8,
    tags: ['hot'],
    levelDesc: ['扇形喷射辣酱', '喷射+1', '伤害+30%', '冷却-15%', '地面灼烧延长', '伤害+30%', '范围+25%', '喷射+1'],
    flavor: '标签写着温和。标签在说谎。'
  },
  thermal_bag: {
    id: 'thermal_bag',
    name: '保温袋',
    nameEn: 'Thermal Bag',
    type: 'functional',
    behavior: 'shield',
    functional: true,
    baseFireRate: 8000,
    maxLevel: 8,
    tags: ['shield'],
    levelDesc: ['周期性获得 1 层护盾', '充能稍快', '护盾韧性提升', '最多 2 层', '充能稍快', '护盾韧性提升', '充能更快', '最多 3 层'],
    flavor: '保护外卖，也保护你。'
  },
  freezer_gate: {
    id: 'freezer_gate',
    name: '冷柜门',
    nameEn: 'Freezer Gate',
    type: 'functional',
    behavior: 'freeze',
    functional: true,
    baseFireRate: 6200,
    maxLevel: 8,
    tags: ['freeze'],
    levelDesc: ['发射一道冻结射线', '冻结更久', '扫射更快', '射线 +1', '冻结更久', '扫射更快', '冻结更久', '射线 +1'],
    flavor: '后厨里最不讲道理的一扇门。'
  },
  service_bell: {
    id: 'service_bell',
    name: '服务铃',
    nameEn: 'Service Bell',
    type: 'functional',
    behavior: 'clear',
    functional: true,
    baseFireRate: 90000,
    maxLevel: 8,
    tags: ['clear'],
    levelDesc: ['周期性清理普通敌人和掉落物', '冷却缩短', '冷却缩短', '冷却缩短', '冷却缩短', '保留掉落物', '冷却缩短', '冷却降至 45 秒'],
    flavor: '叮。现在轮到怪物排队。'
  },
  whip: {
    id: 'whip',
    name: '鞭子',
    nameEn: 'Whip',
    type: 'melee',
    behavior: 'sweep',
    hidden: true,
    baseDamage: 15,
    baseFireRate: 600,
    baseRange: 80,
    baseArc: Math.PI / 3,
    maxLevel: 8,
    tags: ['heavy'],
    levelDesc: ['隐藏彩蛋武器', '范围+20%', '伤害+30%', '冷却-15%', '反向斩击', '伤害+30%', '范围+20%', '二连斩击'],
    flavor: '不该出现在厨房里的经典遗物。'
  },
  cross: {
    id: 'cross',
    name: '十字架',
    nameEn: 'Cross',
    type: 'ranged',
    behavior: 'boomerang',
    hidden: true,
    baseDamage: 12,
    baseFireRate: 1200,
    baseRange: 300,
    baseCount: 1,
    maxLevel: 8,
    tags: ['ricochet'],
    levelDesc: ['隐藏彩蛋武器', '数量+1', '飞行距离+30%', '伤害+25%', '数量+1，穿透+1', '伤害+30%', '冷却-15%', '数量+1'],
    flavor: '适合驱逐账单，也适合驱逐别的东西。'
  }
};

const EVOLUTION_DEFS = {
  divine_slipper: {
    id: 'divine_slipper',
    name: '神圣拖鞋',
    nameEn: 'Divine Slipper',
    baseWeaponId: 'bouncing_slipper',
    requiredPassiveId: 'running_shoes',
    baseDamageMultiplier: 1.8,
    behavior: 'bounce',
    flavor: '它终于学会了带着神圣怒气回家。'
  },
  excalibur_ladle: {
    id: 'excalibur_ladle',
    name: '圣剑汤勺',
    nameEn: 'Excalibur Ladle',
    baseWeaponId: 'spinning_ladle',
    requiredPassiveId: 'bubble_foam',
    baseDamageMultiplier: 1.7,
    behavior: 'orbit',
    flavor: '每一次搅拌都像拔剑。'
  },
  meat_grinder: {
    id: 'meat_grinder',
    name: '绞肉机',
    nameEn: 'Meat Grinder',
    baseWeaponId: 'boomerang_cleaver',
    requiredPassiveId: 'fitness_bracer',
    baseDamageMultiplier: 2.0,
    behavior: 'boomerang',
    flavor: '它不问肉从哪里来。'
  },
  infinite_hot_pot: {
    id: 'infinite_hot_pot',
    name: '无限火锅',
    nameEn: 'Infinite Hot Pot',
    baseWeaponId: 'hot_sauce_bottle',
    requiredPassiveId: 'magnifying_glass',
    baseDamageMultiplier: 1.9,
    behavior: 'spray',
    flavor: '锅底永远不见底。'
  },
  michelin_cloak: {
    id: 'michelin_cloak',
    name: '米其林披风',
    nameEn: 'Michelin Cloak',
    baseWeaponId: 'thermal_bag',
    requiredPassiveId: 'takeout_lid',
    baseDamageMultiplier: 1,
    behavior: 'shield',
    functional: true,
    flavor: '满层护盾会反弹接触伤害，并在濒死时替你挡一次。'
  },
  infinite_buffet: {
    id: 'infinite_buffet',
    name: '无限自助餐',
    nameEn: 'Infinite Buffet',
    baseWeaponId: 'freezer_gate',
    requiredPassiveId: 'empty_boba_cup',
    baseDamageMultiplier: 1,
    behavior: 'freeze',
    functional: true,
    flavor: '冻结扫射还会削去敌人当前生命。'
  },
  gorgeous_moonboba: {
    id: 'gorgeous_moonboba',
    name: '华丽月亮珍珠',
    nameEn: 'Gorgeous Moonboba',
    baseWeaponId: 'service_bell',
    requiredPassiveId: 'family_recipe',
    baseDamageMultiplier: 1,
    behavior: 'clear',
    functional: true,
    flavor: '清屏、牵引经验糖，并洒下月光弹幕。'
  }
};


// --- config/arcanas-data.js ---
const ARCANAS = [
  { id: 'fool', name: '愚者', nameEn: 'The Fool', desc: '所有投射物获得 1 次弹射或穿透。', icon: 'F', color: '#a9e34b' },
  { id: 'gemini', name: '双子星', nameEn: 'Gemini', desc: '所有“数量”型武器 +1 个单位。', icon: 'II', color: '#e599f7' },
  { id: 'priestess', name: '祭司', nameEn: 'The Priestess', desc: '攻速提升，但受伤也会更疼。', icon: 'P', color: '#74c0fc' },
  { id: 'emperor', name: '皇帝', nameEn: 'The Emperor', desc: '投射物体积与范围大幅提升，移速降低。', icon: 'E', color: '#ff922b' },
  { id: 'hanged_man', name: '倒吊人', nameEn: 'The Hanged Man', desc: 'HP 低于 50% 时伤害 +50%。', icon: 'H', color: '#ff6b6b' },
  { id: 'glutton', name: '暴食', nameEn: 'The Glutton', desc: '食物溢出治疗转化为护盾。', icon: 'G', color: '#ffa94d' },
  { id: 'hourglass', name: '沙漏', nameEn: 'The Hourglass', desc: '武器冷却越久，下次伤害越高。', icon: 'T', color: '#ffd43b' },
  { id: 'banquet', name: '宴会', nameEn: 'The Banquet', desc: '敌人死亡小概率掉鸡腿。', icon: 'B', color: '#69db7c' },
  { id: 'mirror', name: '镜子', nameEn: 'The Mirror', desc: '轨道/光环武器获得镜像判定。', icon: 'M', color: '#91a7ff' },
  { id: 'bill', name: '账单', nameEn: 'The Bill', desc: '金币拾取时对周围敌人造成等额伤害。', icon: '$', color: '#fcc419' },
  { id: 'delivery', name: '外卖', nameEn: 'The Delivery', desc: '每 60 秒天降一个随机补给箱。', icon: 'D', color: '#66d9e8' },
  { id: 'empty_plate', name: '空盘', nameEn: 'The Empty Plate', desc: '少带武器时，其余武器伤害提高。', icon: 'O', color: '#ced4da' }
];

const ARCANA_CHOICE_TIMES = [
  { slot: 0, atMs: 0, label: '开局命运' },
  { slot: 1, atMs: 11 * 60 * 1000, label: '月亮糖 11:00' },
  { slot: 2, atMs: 21 * 60 * 1000, label: '月亮糖 21:00' }
];


// --- config/unlocks-data.js ---
const UNLOCK_RULES = {
  characters: [
    {
      id: 'imelda',
      desc: '任意角色达到 10 级。',
      test: meta => (meta.progress.maxCharacterLevel || 1) >= 10
    },
    {
      id: 'gennaro',
      desc: '累计击败 3000 个敌人。',
      test: meta => (meta.progress.totalKills || 0) >= 3000
    },
    {
      id: 'little_antonio',
      desc: '在饥饿森林打开外卖包裹。',
      test: meta => !!meta.progress.packageOpened
    }
  ],
  levels: [
    {
      id: 'waffle_tower',
      previousLevelId: 'hungry_forest',
      desc: '击败饥饿森林 Boss。'
    },
    {
      id: 'infinite_cookbook_library',
      previousLevelId: 'waffle_tower',
      desc: '击败华夫饼塔 Boss。'
    },
    {
      id: 'bubble_tea_plant',
      previousLevelId: 'infinite_cookbook_library',
      desc: '击败无限食谱图书馆 Boss。'
    },
    {
      id: 'capella_pasta',
      previousLevelId: 'bubble_tea_plant',
      desc: '击败奶茶工厂 Boss。'
    },
    {
      id: 'moonboba',
      desc: '击败前五关 Boss。',
      test: meta => [
        'hungry_forest',
        'waffle_tower',
        'infinite_cookbook_library',
        'bubble_tea_plant',
        'capella_pasta'
      ].every(id => (meta.progress.bossClears || []).includes(id) || (meta.progress.levelBestTime[id] || 0) >= 15 * 60 * 1000)
    }
  ],
  arcanas: [
    {
      id: 'hourglass',
      desc: '完成任意武器进化。',
      test: meta => (meta.progress.evolvedWeapons || []).length >= 1
    },
    {
      id: 'banquet',
      desc: '累计击败 3000 个敌人。',
      test: meta => (meta.progress.totalKills || 0) >= 3000
    },
    {
      id: 'mirror',
      desc: '在神圣意面堂凝视镜子。',
      test: meta => !!meta.progress.mirrorSeen
    },
    {
      id: 'bill',
      desc: '在一局中拾取账单堆。',
      test: meta => (meta.progress.weaponUnlockFlags || []).includes('bill_pile')
    },
    {
      id: 'delivery',
      desc: '解锁 Little Antonio。',
      test: meta => !!meta.progress.packageOpened
    },
    {
      id: 'empty_plate',
      desc: '完成任意功能武器进化。',
      test: meta => (meta.progress.evolvedWeapons || []).some(id => [
        'michelin_cloak',
        'infinite_buffet',
        'gorgeous_moonboba'
      ].includes(id))
    }
  ],
  weapons: [
    {
      id: 'thermal_bag',
      desc: '完成一次护盾路线选择。',
      test: meta => (meta.progress.weaponUnlockFlags || []).includes('shield_route')
    },
    {
      id: 'freezer_gate',
      desc: '冻结任意敌人。',
      test: meta => (meta.progress.weaponUnlockFlags || []).includes('frozen_ticket')
    },
    {
      id: 'service_bell',
      desc: '在一局中清屏一次。',
      test: meta => (meta.progress.weaponUnlockFlags || []).includes('service_shift')
    }
  ]
};


// --- config/waves-data.js ---
const LEVEL_IDS = ['hungry_forest', 'waffle_tower', 'infinite_cookbook_library', 'bubble_tea_plant', 'capella_pasta'];

const LEVEL_COMMONS = {
  hungry_forest: ['hangry_pigeon', 'crispy_squirrel', 'sleepy_moth'],
  waffle_tower: ['bouncy_toad', 'guilty_cricket'],
  infinite_cookbook_library: ['sleepy_moth', 'hangry_pigeon'],
  bubble_tea_plant: ['bouncy_toad', 'crispy_squirrel'],
  capella_pasta: ['guilty_cricket', 'sleepy_moth']
};

const LEVEL_ELITES = {
  hungry_forest: 'sous_chef_zombie',
  waffle_tower: 'pastry_architect_golem',
  infinite_cookbook_library: 'librarian_ghost',
  bubble_tea_plant: 'quality_control_robot',
  capella_pasta: 'sommelier_poltergeist'
};

function makeWave(levelId, minute) {
  const common = LEVEL_COMMONS[levelId];
  const event = minute === 29 ? 'boss' : ([5, 10, 15, 20, 25].includes(minute) ? 'elite' : (minute === 12 || minute === 22 ? 'swarm' : null));
  const density = Math.min(300, 32 + minute * 8);
  const intervalBase = Math.max(180, 900 - minute * 20);
  const enemies = event === 'boss'
    ? []
    : common.slice(0, minute < 6 ? 1 : (minute < 15 ? 2 : 3)).map((id, index) => ({
        id,
        interval: intervalBase + index * 180,
        count: 1 + Math.floor(minute / 8)
      }));
  return {
    minute,
    event,
    eliteId: event === 'elite' ? LEVEL_ELITES[levelId] : null,
    enemies,
    maxOnScreen: density
  };
}

const WAVES = Object.fromEntries(
  LEVEL_IDS.map(levelId => [levelId, Array.from({ length: 30 }, (_, minute) => makeWave(levelId, minute))])
);

function getWaveForTime(levelId, gameTimeMs) {
  const waves = WAVES[levelId] || WAVES.hungry_forest;
  const minute = Math.max(0, Math.min(waves.length - 1, Math.floor(gameTimeMs / 60000)));
  return waves[minute];
}

function shouldTriggerWaveEvent(wave, eventName) {
  return wave?.event === eventName;
}


// --- config/levels.js ---
const LEVELS = [
  {
    id: 'hungry_forest',
    name: '饥饿森林',
    nameEn: 'Hungry Forest',
    loadText: 'Spicy家族踏入了一片诡异的森林。树木的枝条像意大利面一样垂下，地面上的蘑菇散发着番茄酱的气味。远处传来咀嚼声——不是动物，是森林本身在进食。Gourmando Feastó的诅咒让这里的一切都变得饥饿，包括空气。',
    ambientLore: [
      '树干上的树液是温热的马苏里拉芝士。',
      '灌木丛中偶尔传来"嗝——"的声音，像是某个吃撑了的精灵。',
      '地上的落叶踩上去会发出"咔嚓"声，像是在咬薯片。',
      '远处的蘑菇在发光，靠近才发现它们在烤自己。',
      '一只松鼠抱着华夫饼跑过，它的眼神充满了罪恶感。'
    ],
    bossHint: '森林深处传来沉重的脚步声……那是副厨僵尸，他还在等Gourmando给他转正。',
    clearText: '森林安静了下来。副厨僵尸倒下时，口袋里掉出一张皱巴巴的转正申请书，上面盖着"已过期"的章。Gourmando从未签过这张表。'
  },
  {
    id: 'waffle_tower',
    name: '华夫饼塔',
    nameEn: 'Waffle Tower',
    loadText: '一座由华夫饼堆砌的高塔矗立在前方。糖浆从塔顶倾泻而下，形成一道道黏稠的瀑布。空气中弥漫着黄油和焦糖的甜腻气息。塔内传来机械运转的声音——有人在批量生产什么。Spicy家族决定登塔，寻找Gourmando留下的线索。',
    ambientLore: [
      '墙壁上的砖块是华夫饼，每块都烤得恰到好处。',
      '楼梯扶手是凝固的焦糖，摸上去又黏又甜。',
      '每层楼都有不同的甜点主题，第三层是提拉米苏风格。',
      '电梯按钮上写着"仅限Gourmando使用"，按了没反应。',
      '窗外能看到糖浆河流，有姜饼人在上面划船。'
    ],
    bossHint: '塔顶传来轰鸣声……糕点建筑师魔像正在建造新的楼层，设计图上写着"Gourmando的私人甜点天堂"。',
    clearText: '塔顶的魔像碎裂了，散落成无数华夫饼碎屑。它的核心是一张建筑许可证，申请人：Gourmando Feastó，审批状态：被拒——理由是"太甜了"。'
  },
  {
    id: 'infinite_cookbook_library',
    name: '无限食谱图书馆',
    nameEn: 'Infinite Cookbook Library',
    loadText: '书架延伸到视线尽头，每一本书都是一本食谱。有些书在自动翻页，有些书在低声吟唱烹饪步骤。空气中弥漫着旧书页和香料的混合气味。Spicy家族穿行在书架之间，寻找关于诅咒的线索。图书管理员似乎不太欢迎访客——尤其是活着的访客。',
    ambientLore: [
      '书架上的书按菜系分类，但"诅咒"那一栏被锁住了。',
      '有些书会飞起来，在空中自动烹饪书中的菜品。',
      '走廊尽头有一扇门，上面写着"Gourmando的私人收藏——禁止入内"。',
      '每翻一页，空气中就多一种食材的气味。',
      '角落里有只猫在啃一本《如何烹饪老鼠》，它看起来很纠结。'
    ],
    bossHint: '禁书区传来疯狂的翻书声……那是Gourmando的食谱在自动更新——新增了一道"辛辣家族炖汤"。',
    clearText: '图书馆闭馆音乐响起，是煮面计时器的"叮"声。Gourmando的借书卡显示已过期十年，最后一本借阅的书叫《如何永远不被找到》。'
  },
  {
    id: 'bubble_tea_plant',
    name: '奶茶工厂',
    nameEn: 'Bubble Tea Plant',
    loadText: '这里曾是Spiceland最大的珍珠奶茶生产基地。现在，传送带输送的不是杯装饮品，而是蹦蹦跳跳的怪物。广播循环播放："请注意，Gourmando Feastó先生不在本厂，重复，不在本厂。"Spicy家族在厂长室门口发现了一份考勤表——Gourmando请了事假，理由是"去教堂忏悔"。',
    ambientLore: [
      '巨大的珍珠在玻璃罐体里沉浮，每个都有人头大小。',
      '传送带尽头不是包装机，而是一张巨大的、永远吃不饱的嘴。',
      '墙上的员工荣誉照里，Gourmando每个月都戴着不同的伪装领奖。',
      '安全出口的绿灯其实是发光的抹茶粉，指引方向是锅炉房。',
      '地上散落着无数吸管，每一根都插着一张"外卖已送达"的小票。'
    ],
    bossHint: '厂长室的门缓缓打开……走出来的是一台自动摇奶茶机，屏幕上闪烁着"今日店长：Gourmando（离线）"。',
    clearText: '工厂下班铃响了，是珍珠落入杯底的"啵啵"声。Gourmando的打卡记录显示他于三十年前请了无限期事假，审批人签名是他自己。'
  },
  {
    id: 'capella_pasta',
    name: '神圣意面堂',
    nameEn: 'Capella Pasta',
    loadText: '这是最后的希望。哥特式尖顶直插云霄，彩色玻璃在月光下泛着番茄酱的红。Spicy家族推开沉重的橡木门，祭坛上烛光摇曳——供奉着的不是圣徒像，而是一碗永远吃不完的意面。祭坛正中央，放着一面镜子。镜子里只有你自己。',
    ambientLore: [
      '彩色玻璃描绘的不是圣经故事，而是Spicy家族祖先吃面的场景。',
      '管风琴演奏的其实是煮面计时器的倒计时声。',
      '祭坛上的圣杯里装的不是红酒，是过期三个月的番茄酱。',
      '忏悔室的帘子后面传来咀嚼声，拉开发现是一只会说人话的仓鼠。',
      '长椅上的圣经被换成了《Gourmando的厨房日记》，每一页都是空白。'
    ],
    bossHint: '祭坛后的帷幕无风自动……一只老鼠叼走了祭坛上的最后一块饼干，留下一张名片：Gourmando Feastó，职业：幽灵。',
    clearText: '神圣意面堂的钟声敲响，是微波炉"叮"的混响。Gourmando的忏悔录里只有一句话："盐放多了，但我不会道歉。"他从未在这里——也许他从未在任何地方。'
  },
  {
    id: 'moonboba',
    name: '月光珍珠',
    nameEn: 'Moonboba',
    loadText: '五处错误的目的地之后，月亮终于像一颗珍珠一样沉入杯底。奶茶色的雾从废墟间升起，所有怪物都泛着不合时宜的月光。这里不像 Gourmando 的藏身处，更像他留下的一道甜到发苦的谜题。',
    ambientLore: [
      '珍珠漂在半空，每一颗都映出不同的晚餐。',
      '地面的奶茶涟漪会倒映出你刚刚错过的路线。',
      '废墟钟楼的指针停在 15:00，像是在等待某个迟到的人。',
      '商人的全息投影偶尔闪烁，问你要不要加一份布丁。',
      '远处的红月像被吸管戳破，慢慢漏出甜味的光。'
    ],
    bossHint: '月光里的珍珠开始倒转……有什么东西正在用你的脚步声学会走路。',
    clearText: '月光珍珠沉回杯底。你听见一声很轻的叹息，像有人终于承认：这顿饭，确实做砸了。'
  }
];


// --- config/narrative-data.js ---
const GOURMANDO_NOTES = [
  {
    id: 'note_01',
    levelId: 'hungry_forest',
    title: '森林账单',
    source: 'Hungry Forest',
    text: '第一张账单写着三份番茄酱、两份华夫饼和一行小字：不要再相信会自己补货的冰箱。'
  },
  {
    id: 'note_02',
    levelId: 'hungry_forest',
    title: '橡树菜单',
    source: 'Hungry Forest',
    text: '树皮里夹着一份菜单，所有菜名都被划掉，只剩下 Gourmando 用红笔写的“还不够辣”。'
  },
  {
    id: 'note_03',
    levelId: 'waffle_tower',
    title: '塔顶许可',
    source: 'Waffle Tower',
    text: '许可证盖了五十七个章，最后一个章写着：建筑材料可食用，因此不属于建筑。'
  },
  {
    id: 'note_04',
    levelId: 'waffle_tower',
    title: '糖浆电梯',
    source: 'Waffle Tower',
    text: '电梯按钮黏住了十五层。旁边贴着字条：如果到不了顶层，请先把焦糖舔干净。'
  },
  {
    id: 'note_05',
    levelId: 'infinite_cookbook_library',
    title: '逾期书卡',
    source: 'Infinite Cookbook Library',
    text: '借书卡上最后一本书叫《如何在每道菜里藏一面镜子》，归还日期停在 15:00。'
  },
  {
    id: 'note_06',
    levelId: 'infinite_cookbook_library',
    title: '禁书批注',
    source: 'Infinite Cookbook Library',
    text: '批注反复强调同一句话：如果你看见月光里的珍珠，不要数它们，数完就会被它们记住。'
  },
  {
    id: 'note_07',
    levelId: 'bubble_tea_plant',
    title: '工厂打卡',
    source: 'Bubble Tea Plant',
    text: '考勤表上 Gourmando 每天都打卡，打卡地点却是不同年代的同一家奶茶店。'
  },
  {
    id: 'note_08',
    levelId: 'bubble_tea_plant',
    title: '珍珠质检',
    source: 'Bubble Tea Plant',
    text: '质检机器人报告：珍珠过圆，疑似月亮碎片。建议停止饮用，或至少加冰。'
  },
  {
    id: 'note_09',
    levelId: 'capella_pasta',
    title: '祭坛餐巾',
    source: 'Capella Pasta',
    text: '餐巾上画着三条结局路线：付清账单、烧掉菜谱、把最后一碗面留给镜子。'
  },
  {
    id: 'note_10',
    levelId: 'capella_pasta',
    title: '圣杯背面',
    source: 'Capella Pasta',
    text: '圣杯背面刻着一串坐标，指向月光珍珠。旁边还有一句抱怨：盐真的放多了。'
  },
  {
    id: 'note_11',
    levelId: 'moonboba',
    title: '月光配方',
    source: 'Moonboba',
    text: '配方没有食材，只有时间：15:00、15:00、15:00。像有人把钟表熬成了汤底。'
  },
  {
    id: 'note_12',
    levelId: 'moonboba',
    title: '镜中欠条',
    source: 'Moonboba',
    text: '欠条签名处不是 Gourmando，而是玩家自己的名字。镜子在等一场真正的结账。'
  }
];

const ENDING_DEFS = {
  invoice_paid: {
    id: 'invoice_paid',
    name: '结清账单',
    desc: '击败镜中账单并保留至少 500 金币。'
  },
  recipe_burned: {
    id: 'recipe_burned',
    name: '烧掉菜谱',
    desc: '击败镜像首领时携带至少 3 件进化武器。'
  },
  last_bowl_shared: {
    id: 'last_bowl_shared',
    name: '最后一碗',
    desc: '收齐全部便条后在 Moonboba 存活到 15:00。'
  }
};

const ENEMY_LORE_STAGE_TEXT = {
  default: [
    '尚未记录。',
    '第一次目击记录已经写入。',
    '已整理出稳定习性与弱点。',
    '完整档案完成，含高危行为与战术备注。'
  ],
  hangry_pigeon: [
    '一团会飞的饥饿。',
    '它会为了地上的面包屑改道俯冲。',
    '成群出现时会逼迫玩家横向走位。',
    '完整记录：饥饿让它忽略恐惧，也忽略方向感。'
  ],
  crispy_squirrel: [
    '尾巴像焦糖饼干的影子。',
    '移动时会突然改变角度。',
    '弱点是持续压制，别让它绕到侧面。',
    '完整记录：它收藏的不是坚果，是还没付钱的小费。'
  ],
  sleepy_moth: [
    '飞得很慢，看起来快睡着了。',
    '会用迟缓路线制造密集包围。',
    '数量堆叠后比高速敌人更危险。',
    '完整记录：它的梦话能让图书馆自动翻页。'
  ],
  bouncy_toad: [
    '一只过度自信的弹跳物。',
    '起跳前会短暂停顿。',
    '贴身时优先拉开距离。',
    '完整记录：它体内的珍珠似乎有自己的考勤表。'
  ],
  guilty_cricket: [
    '每次冲过来都像在道歉。',
    '速度很快，路线直。',
    '用障碍式走位能让它错过冲锋角度。',
    '完整记录：它从不逃班，只是总在错误的地方上班。'
  ]
};


// --- config/relics-data.js ---
const RELIC_DEFS = {
  randomazzo: {
    id: 'randomazzo',
    name: 'Randomazzo',
    nameEn: 'Randomazzo',
    features: ['arcana'],
    desc: '解锁塔罗牌/Arcana 系统。旧存档会默认视为已经取得。'
  },
  jukebox: {
    id: 'jukebox',
    name: '点唱机',
    nameEn: 'Jukebox',
    features: ['musicPlayer'],
    desc: '解锁音乐播放器入口。M4 先保留功能开关，不迁移音频资产。'
  },
  forbidden_menu: {
    id: 'forbidden_menu',
    name: '禁忠菜单',
    nameEn: 'Forbidden Menu',
    features: ['secrets', 'seal'],
    desc: '解锁秘密页与 Seal 封印能力。'
  },
  gourmet_magnifier: {
    id: 'gourmet_magnifier',
    name: '美食放大镜',
    nameEn: 'Gourmet Magnifier',
    features: ['chestIntel'],
    desc: '显示宝箱跳过与掉落详情。'
  },
  family_frame: {
    id: 'family_frame',
    name: '全家福相框',
    nameEn: 'Family Frame',
    features: ['familyRestaurant'],
    desc: '解锁家族餐厅与后续经营线入口。'
  }
};

const LEGACY_RELIC_IDS = ['randomazzo'];


// --- config/challenges-data.js ---
const CHALLENGE_DEFS = {
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

const DAILY_CHARACTER_IDS = ['antonio', 'imelda', 'gennaro', 'little_antonio'];
const DAILY_LEVEL_IDS = ['hungry_forest', 'waffle_tower', 'infinite_cookbook_library', 'bubble_tea_plant', 'capella_pasta'];
const DAILY_CHALLENGE_IDS = ['pigeon_kingdom', 'inspector_parade'];


// --- config/skilltree-data.js ---
const TALENT_BRANCHES = [
  { id: 'attack', name: '火力', accent: '#ff8787' },
  { id: 'defense', name: '韧性', accent: '#91f2d2' },
  { id: 'wealth', name: '财富', accent: '#ffd43b' }
];

const TALENT_TREE = {
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


// --- config/interactables-data.js ---




const INTERACTABLE_DEFS = {
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

function buildInteractablePlan(levelId, seed = 1) {
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

function placeInteractablesInBounds(plan, bounds) {
  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;
  return plan.map(item => ({
    ...item,
    x: bounds.minX + width * item.px,
    y: bounds.minY + height * item.py
  }));
}

function applyInteractableChoice(game, item, choice = 'activate') {
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


// --- config/animation-data.js ---
const ANIMATION_FRAME_SIZE = 362;

const ANIMATION_DEFS = {
  idle: {
    cols: 4,
    rows: 3,
    frames: 6,
    frameDuration: 120,
    loop: true,
    priority: 0,
    transitionMs: 140
  },
  walk: {
    cols: 6,
    rows: 8,
    frames: 6,
    frameDuration: 80,
    loop: true,
    priority: 1,
    transitionMs: 120
  },
  run: {
    cols: 6,
    rows: 7,
    frames: 6,
    frameDuration: 60,
    loop: true,
    priority: 2,
    transitionMs: 100
  },
  hit: {
    cols: 6,
    rows: 1,
    frames: 6,
    frameDuration: 100,
    loop: false,
    priority: 6,
    transitionMs: 70
  },
  skill: {
    cols: 6,
    rows: 1,
    frames: 6,
    frameDuration: 80,
    loop: false,
    priority: 8,
    transitionMs: 90
  },
  death: {
    cols: 6,
    rows: 1,
    frames: 6,
    frameDuration: 150,
    loop: false,
    priority: 10,
    transitionMs: 60
  }
};

const NORMAL_ACTIONS = new Set(['idle', 'walk', 'run']);
const CHARACTER_MOVE_DIRECTIONS = [
  'up',
  'down',
  'left',
  'right',
  'up_left',
  'up_right',
  'down_left',
  'down_right'
];

const CHARACTER_IDS = ['antonio', 'imelda', 'gennaro'];
const ENEMY_IDS = [
  'hangry_pigeon',
  'crispy_squirrel',
  'sleepy_moth',
  'bouncy_toad',
  'guilty_cricket',
  'sous_chef_zombie',
  'pastry_architect_golem',
  'librarian_ghost',
  'quality_control_robot',
  'sommelier_poltergeist',
  'health_inspector'
];

const WEAPON_ACTION_COUNTS = {
  bouncing_slipper: { fly: 4, impact: 4 },
  spinning_ladle: { loop: 6 },
  boomerang_cleaver: { fly: 6, return: 4, impact: 4 },
  throwing_chopsticks: { fly: 4, impact: 4 },
  holy_toast: { lob: 4, splash: 4 },
  garlic_breath: { loop: 6 },
  rolling_pin: { slash: 6 },
  hot_sauce_bottle: { spray: 6, burn: 4 },
  whip: { slash: 6 },
  cross: { fly: 6, return: 4, impact: 4 },
  divine_slipper: { fly: 4, impact: 4 },
  excalibur_ladle: { loop: 6, slash: 6 },
  meat_grinder: { fly: 6, return: 4, impact: 4 },
  infinite_hot_pot: { spray: 6, burn: 4, splash: 4 },
  thermal_bag: { shield: 6 },
  freezer_gate: { ray: 6 },
  service_bell: { pulse: 6 },
  michelin_cloak: { shield: 6, revive: 6 },
  infinite_buffet: { ray: 6 },
  gorgeous_moonboba: { pulse: 6 }
};

function makeCharacterFramePaths(charId, action, direction = null) {
  const count = ANIMATION_DEFS[action].frames;
  const segment = direction ? `${action}/${direction}` : action;
  return Array.from({ length: count }, (_, index) => (
    `assest/characters/${charId}/${segment}/frame_${String(index).padStart(2, '0')}.png`
  ));
}

function makeCharacterFrameSet(charId) {
  const makeDirectionalSet = action => ({
    default: makeCharacterFramePaths(charId, action, 'down'),
    ...Object.fromEntries(
      CHARACTER_MOVE_DIRECTIONS.map(direction => [
        direction,
        makeCharacterFramePaths(charId, action, direction)
      ])
    )
  });

  return {
    idle: makeCharacterFramePaths(charId, 'idle'),
    walk: makeDirectionalSet('walk'),
    run: makeDirectionalSet('run'),
    hit: makeCharacterFramePaths(charId, 'hit'),
    skill: makeCharacterFramePaths(charId, 'skill'),
    death: makeCharacterFramePaths(charId, 'death')
  };
}

function makeEnemyFramePaths(enemyId, action, count) {
  return Array.from({ length: count }, (_, index) => (
    `assest/enemies/${enemyId}/${action}/frame_${String(index).padStart(2, '0')}.png`
  ));
}

function makeWeaponFramePaths(weaponId, action, count) {
  return Array.from({ length: count }, (_, index) => (
    `assest/weapon_actions/${weaponId}/${action}/frame_${String(index).padStart(2, '0')}.png`
  ));
}

const CHARACTER_ANIMATION_FRAMES = Object.fromEntries(
  CHARACTER_IDS.map(charId => [charId, makeCharacterFrameSet(charId)])
);
CHARACTER_ANIMATION_FRAMES.little_antonio = makeCharacterFrameSet('antonio');

const ENEMY_ANIMATION_FRAMES = Object.fromEntries(
  ENEMY_IDS.map(enemyId => [enemyId, {
    idle: makeEnemyFramePaths(enemyId, 'idle', 4),
    move: makeEnemyFramePaths(enemyId, 'move', 4),
    hit: makeEnemyFramePaths(enemyId, 'hit', 2),
    death: makeEnemyFramePaths(enemyId, 'death', 2)
  }])
);

const WEAPON_ANIMATION_FRAMES = Object.fromEntries(
  Object.entries(WEAPON_ACTION_COUNTS).map(([weaponId, actions]) => [
    weaponId,
    Object.fromEntries(
      Object.entries(actions).map(([action, count]) => [
        action,
        makeWeaponFramePaths(weaponId, action, count)
      ])
    )
  ])
);

function resolveEnemyAnimationAction({ active = true, isMoving = false, hitFlash = 0 } = {}) {
  if (!active) return 'death';
  if (hitFlash > 0) return 'hit';
  return isMoving ? 'move' : 'idle';
}

function getWeaponActionFrames(weaponId, action = 'fly') {
  const actions = WEAPON_ANIMATION_FRAMES[weaponId];
  if (!actions) return null;
  if (actions[action]) return actions[action];
  const fallbackOrder = ['fly', 'loop', 'slash', 'spray', 'lob', 'ray', 'shield', 'pulse', 'revive', 'return', 'impact', 'splash', 'burn'];
  for (const fallback of fallbackOrder) {
    if (actions[fallback]) return actions[fallback];
  }
  return null;
}

function createAnimationParams(player, inputManager) {
  const input = inputManager ? inputManager.getDirection() : { x: 0, y: 0 };
  const moveX = input.x || 0;
  const moveY = input.y || 0;
  const speed = Math.hypot(moveX, moveY);
  const isMoving = speed > 0;
  const shiftRunning = !!(
    inputManager &&
    (inputManager.isKeyDown('ShiftLeft') || inputManager.isKeyDown('ShiftRight'))
  );

  let direction = player._animDirection || 'down';
  if (isMoving) {
    const deadzone = 0.28;
    if (moveY < -deadzone && moveX < -deadzone) {
      direction = 'up_left';
    } else if (moveY < -deadzone && moveX > deadzone) {
      direction = 'up_right';
    } else if (moveY > deadzone && moveX < -deadzone) {
      direction = 'down_left';
    } else if (moveY > deadzone && moveX > deadzone) {
      direction = 'down_right';
    } else if (Math.abs(moveX) >= Math.abs(moveY)) {
      direction = moveX < 0 ? 'left' : 'right';
    } else {
      direction = moveY < 0 ? 'up' : 'down';
    }
  }

  return {
    isDead: !player.active || player.hp <= 0,
    isUsingSkill: !!player._isUsingSkill,
    isHit: !!player._hitAnim,
    isDashing: !!player.isDashing,
    isMoving,
    isRunning: !!player.isDashing || (isMoving && shiftRunning),
    direction,
    moveX,
    moveY,
    speed
  };
}

function resolveAnimationState(params) {
  if (params.isDead) return 'death';
  if (params.isUsingSkill) return 'skill';
  if (params.isHit) return 'hit';
  if (params.isDashing || params.isRunning) return 'run';
  if (params.isMoving) return 'walk';
  return 'idle';
}

function canTransitionAnimation(current, next, currentFinished = false) {
  if (!ANIMATION_DEFS[current] || !ANIMATION_DEFS[next]) return false;
  if (current === next) return currentFinished;
  if (current === 'death') return false;
  if (next === 'death') return true;
  if (current === 'skill' && !currentFinished) return false;
  if (next === 'skill') return true;
  if (current === 'hit' && !currentFinished) return false;
  if (next === 'hit') return NORMAL_ACTIONS.has(current) || currentFinished;
  if (NORMAL_ACTIONS.has(current) && NORMAL_ACTIONS.has(next)) return true;
  if (currentFinished) return true;

  return ANIMATION_DEFS[next].priority >= ANIMATION_DEFS[current].priority;
}


// --- config/render-scale.js ---
const PLAYER_ANIM_SIZE_MULTIPLIER = 4.4;
const PLAYER_STATIC_SIZE_MULTIPLIER = 3.4;

const PROJECTILE_SPRITE_SIZE_MULTIPLIER = 5.2;
const PROJECTILE_MIN_SPRITE_SIZE = 28;

const CROSS_PROJECTILE_SPRITE_SIZE_MULTIPLIER = 5.8;
const CROSS_PROJECTILE_MIN_SPRITE_SIZE = 32;

const WHIP_SLASH_SIZE_MULTIPLIER = 1.7;


// --- config/assets.js ---

const MENU_BG_IMAGE = new Image();
MENU_BG_IMAGE.src = 'assest/backgrounds/main_backgroud.png';

const CHARACTER_BG_IMAGES = {
  antonio: new Image(),
  imelda: new Image(),
  gennaro: new Image(),
  little_antonio: new Image()
};
CHARACTER_BG_IMAGES.antonio.src = 'assest/characters/Antonio Spicy.png';
CHARACTER_BG_IMAGES.imelda.src = 'assest/characters/Imelda Spicy.png';
CHARACTER_BG_IMAGES.gennaro.src = 'assest/characters/Gennaro Spicy.png';
CHARACTER_BG_IMAGES.little_antonio.src = 'assest/characters/Little Antonio Spicy.png';

const CHARACTER_SPRITES = {};
const ENEMY_SPRITES = {};
const WEAPON_SPRITES = {};
const PASSIVE_SPRITES = {};
const POWERUP_SPRITES = {};
const INTERACTABLE_SPRITES = {};
const DROP_SPRITES = {};
const CHARACTER_ANIM_SHEETS = {};
const ENEMY_ANIM_SHEETS = {};
const WEAPON_ACTION_SHEETS = {};

const LEVEL_BG_IMAGES = {
  hungry_forest: new Image(),
  waffle_tower: new Image(),
  infinite_cookbook_library: new Image(),
  bubble_tea_plant: new Image(),
  capella_pasta: new Image(),
  moonboba: new Image()
};
LEVEL_BG_IMAGES.hungry_forest.src = 'assest/backgrounds/hungry_forest.png';
LEVEL_BG_IMAGES.waffle_tower.src = 'assest/backgrounds/waffle_tower.png';
LEVEL_BG_IMAGES.infinite_cookbook_library.src = 'assest/backgrounds/infinite_cookbook_library.png';
LEVEL_BG_IMAGES.bubble_tea_plant.src = 'assest/backgrounds/bubble_tea_plant.png';
LEVEL_BG_IMAGES.capella_pasta.src = 'assest/backgrounds/capella_pasta.png';
LEVEL_BG_IMAGES.moonboba.src = 'assest/backgrounds/moonboba.png';

const LEVEL_TILE_IMAGES = {
  hungry_forest: new Image(),
  waffle_tower: new Image(),
  infinite_cookbook_library: new Image(),
  bubble_tea_plant: new Image(),
  capella_pasta: new Image(),
  moonboba: new Image()
};
LEVEL_TILE_IMAGES.hungry_forest.src = 'assest/tiles/hungry_forest_tile.png';
LEVEL_TILE_IMAGES.waffle_tower.src = 'assest/tiles/waffle_tower_tile.png';
LEVEL_TILE_IMAGES.infinite_cookbook_library.src = 'assest/tiles/infinite_cookbook_library_tile.png';
LEVEL_TILE_IMAGES.bubble_tea_plant.src = 'assest/tiles/bubble_tea_plant_tile.png';
LEVEL_TILE_IMAGES.capella_pasta.src = 'assest/tiles/capella_pasta_tile.png';
LEVEL_TILE_IMAGES.moonboba.src = 'assest/tiles/bubble_tea_plant_tile.png';

const LEVEL_PROP_PATHS = {
  hungry_forest: [
    'assest/props/hungry_forest/prop_00.png',
    'assest/props/hungry_forest/prop_01.png',
    'assest/props/hungry_forest/prop_02.png',
    'assest/props/hungry_forest/prop_03.png',
    'assest/props/hungry_forest/prop_04.png'
  ],
  waffle_tower: [
    'assest/props/waffle_tower/prop_00.png',
    'assest/props/waffle_tower/prop_01.png',
    'assest/props/waffle_tower/prop_02.png',
    'assest/props/waffle_tower/prop_03.png',
    'assest/props/waffle_tower/prop_04.png'
  ],
  infinite_cookbook_library: [
    'assest/props/infinite_cookbook_library/prop_00.png',
    'assest/props/infinite_cookbook_library/prop_01.png',
    'assest/props/infinite_cookbook_library/prop_02.png',
    'assest/props/infinite_cookbook_library/prop_03.png',
    'assest/props/infinite_cookbook_library/prop_04.png'
  ],
  bubble_tea_plant: [
    'assest/props/bubble_tea_plant/prop_00.png',
    'assest/props/bubble_tea_plant/prop_01.png',
    'assest/props/bubble_tea_plant/prop_02.png',
    'assest/props/bubble_tea_plant/prop_03.png',
    'assest/props/bubble_tea_plant/prop_04.png'
  ],
  moonboba: [
    'assest/props/bubble_tea_plant/prop_00.png',
    'assest/props/bubble_tea_plant/prop_01.png',
    'assest/props/bubble_tea_plant/prop_02.png',
    'assest/props/bubble_tea_plant/prop_03.png',
    'assest/props/bubble_tea_plant/prop_04.png'
  ],
  capella_pasta: [
    'assest/props/capella_pasta/prop_00.png',
    'assest/props/capella_pasta/prop_01.png',
    'assest/props/capella_pasta/prop_02.png',
    'assest/props/capella_pasta/prop_03.png',
    'assest/props/capella_pasta/prop_04.png'
  ]
};

const LEVEL_PROP_SPRITES = {};

const SHOP_MERCHANT_IMAGE = new Image();
SHOP_MERCHANT_IMAGE.src = 'assest/ui/1.png';

const ARCANA_ATLAS_IMAGE = new Image();
ARCANA_ATLAS_IMAGE.src = 'assest/ui/arcana_atlas.png';

function processSpriteImage(img) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth || img.width;
  c.height = img.naturalHeight || img.height;
  const cx = c.getContext('2d');
  cx.drawImage(img, 0, 0);
  const id = cx.getImageData(0, 0, c.width, c.height);
  const d = id.data;
  const w = c.width, h = c.height;
  const visited = new Uint8Array(w * h);
  const stack = [];
  const thr = 230;
  for (let x = 0; x < w; x++) { stack.push(x); stack.push((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { stack.push(y * w); stack.push(y * w + w - 1); }
  while (stack.length > 0) {
    const idx = stack.pop();
    if (visited[idx]) continue;
    visited[idx] = 1;
    const px = idx * 4;
    if (d[px] >= thr && d[px + 1] >= thr && d[px + 2] >= thr && d[px + 3] > 128) {
      d[px + 3] = 0;
      d[px] = 0; d[px + 1] = 0; d[px + 2] = 0;
      const x = idx % w, y = (idx - x) / w;
      if (x > 0) stack.push(idx - 1);
      if (x < w - 1) stack.push(idx + 1);
      if (y > 0) stack.push(idx - w);
      if (y < h - 1) stack.push(idx + w);
    }
  }
  for (let i = 0; i < w * h; i++) {
    const px = i * 4;
    if (d[px + 3] === 0) continue;
    const hasTransparentNeighbor = (
      (i % w > 0 && d[(i - 1) * 4 + 3] === 0) ||
      (i % w < w - 1 && d[(i + 1) * 4 + 3] === 0) ||
      (i >= w && d[(i - w) * 4 + 3] === 0) ||
      (i < (h - 1) * w && d[(i + w) * 4 + 3] === 0)
    );
    if (hasTransparentNeighbor && d[px] >= 200 && d[px + 1] >= 200 && d[px + 2] >= 200) {
      const maxC = Math.max(d[px], d[px + 1], d[px + 2]);
      const minC = Math.min(d[px], d[px + 1], d[px + 2]);
      if (maxC - minC < 30) {
        const whiteness = (d[px] + d[px + 1] + d[px + 2]) / 3;
        const alpha = Math.max(0, Math.round(d[px + 3] * (1 - (whiteness - 200) / 55)));
        d[px + 3] = alpha;
        if (alpha === 0) { d[px] = 0; d[px + 1] = 0; d[px + 2] = 0; }
      }
    }
  }
  cx.putImageData(id, 0, 0);
  return c;
}

function removeWhiteFromRegion(d, w, rx, ry, rw, rh) {
  const visited = new Uint8Array(rw * rh);
  const stack = [];
  const thr = 230;
  for (let x = 0; x < rw; x++) { stack.push(x); stack.push((rh - 1) * rw + x); }
  for (let y = 0; y < rh; y++) { stack.push(y * rw); stack.push(y * rw + rw - 1); }
  while (stack.length > 0) {
    const li = stack.pop();
    const lx = stack.pop();
    if (lx < 0 || lx >= rw || li < 0 || li >= rh) continue;
    const vi = li * rw + lx;
    if (visited[vi]) continue;
    visited[vi] = 1;
    const gx = rx + lx, gy = ry + li;
    const px = (gy * w + gx) * 4;
    if (d[px] >= thr && d[px + 1] >= thr && d[px + 2] >= thr && d[px + 3] > 128) {
      d[px + 3] = 0;
      d[px] = 0; d[px + 1] = 0; d[px + 2] = 0;
      stack.push(lx - 1, li); stack.push(lx + 1, li);
      stack.push(lx, li - 1); stack.push(lx, li + 1);
    }
  }
  for (let ly = 0; ly < rh; ly++) {
    for (let lx = 0; lx < rw; lx++) {
      const gx = rx + lx, gy = ry + ly;
      const i = gy * w + gx;
      const px = i * 4;
      if (d[px + 3] === 0) continue;
      const hasT = (
        (gx > 0 && d[(i - 1) * 4 + 3] === 0) ||
        (gx < w - 1 && d[(i + 1) * 4 + 3] === 0) ||
        (gy > 0 && d[(i - w) * 4 + 3] === 0) ||
        (gy < w * (d.length / 4 / w) - 1 && d[(i + w) * 4 + 3] === 0)
      );
      if (hasT && d[px] >= 200 && d[px + 1] >= 200 && d[px + 2] >= 200) {
        const maxC = Math.max(d[px], d[px + 1], d[px + 2]);
        const minC = Math.min(d[px], d[px + 1], d[px + 2]);
        if (maxC - minC < 30) {
          const wh = (d[px] + d[px + 1] + d[px + 2]) / 3;
          const alpha = Math.max(0, Math.round(d[px + 3] * (1 - (wh - 200) / 55)));
          d[px + 3] = alpha;
          if (alpha === 0) { d[px] = 0; d[px + 1] = 0; d[px + 2] = 0; }
        }
      }
    }
  }
}

function processSpriteSheet(img, frameSize) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth || img.width;
  c.height = img.naturalHeight || img.height;
  const cx = c.getContext('2d');
  cx.drawImage(img, 0, 0);
  const id = cx.getImageData(0, 0, c.width, c.height);
  const d = id.data;
  const w = c.width;
  const cols = Math.floor(c.width / frameSize);
  const rows = Math.floor(c.height / frameSize);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      removeWhiteFromRegion(d, w, col * frameSize, row * frameSize, frameSize, frameSize);
    }
  }
  cx.putImageData(id, 0, 0);
  return c;
}

function loadSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    CHARACTER_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  CHARACTER_SPRITES[key] = img;
}

loadSprite('antonio', 'assest/characters/Antonio Spicy1.png');
loadSprite('imelda', 'assest/characters/Imelda Spicy1.png');
loadSprite('gennaro', 'assest/characters/Gennaro Spicy1.png');
loadSprite('little_antonio', 'assest/characters/Little Antonio Spicy1.png');

function loadAnimSheet(charId, action, src) {
  if (!CHARACTER_ANIM_SHEETS[charId]) CHARACTER_ANIM_SHEETS[charId] = {};
  const img = new Image();
  img.onload = function () {
    CHARACTER_ANIM_SHEETS[charId][action] = processSpriteSheet(img, ANIMATION_FRAME_SIZE);
  };
  img.src = src;
  CHARACTER_ANIM_SHEETS[charId][action] = img;
}

const processedTargets = new WeakMap();

function loadFrameSequence(framePaths, processWhite = false) {
  const sequence = framePaths.map(src => {
    const img = new Image();
    if (processWhite) {
      img.onload = function () {
        const processed = processSpriteImage(img);
        processed.sourcePath = src;
        const target = processedTargets.get(img);
        if (target) target.list[target.index] = processed;
      };
    }
    img.src = src;
    return img;
  });
  if (processWhite) {
    sequence.forEach((img, index) => processedTargets.set(img, { list: sequence, index }));
  }
  return sequence;
}

function loadAnimFrames(charId, action, frameSource) {
  if (!CHARACTER_ANIM_SHEETS[charId]) CHARACTER_ANIM_SHEETS[charId] = {};
  if (Array.isArray(frameSource)) {
    CHARACTER_ANIM_SHEETS[charId][action] = loadFrameSequence(frameSource, true);
    return;
  }

  const directions = {};
  for (const [direction, framePaths] of Object.entries(frameSource)) {
    directions[direction] = loadFrameSequence(framePaths, true);
  }
  CHARACTER_ANIM_SHEETS[charId][action] = directions;
}

for (const [levelId, paths] of Object.entries(LEVEL_PROP_PATHS)) {
  LEVEL_PROP_SPRITES[levelId] = loadFrameSequence(paths, true);
}

for (const [charId, actions] of Object.entries(CHARACTER_ANIMATION_FRAMES)) {
  for (const [action, frameSource] of Object.entries(actions)) {
    loadAnimFrames(charId, action, frameSource);
  }
}

for (const [enemyId, actions] of Object.entries(ENEMY_ANIMATION_FRAMES)) {
  ENEMY_ANIM_SHEETS[enemyId] = {};
  for (const [action, framePaths] of Object.entries(actions)) {
    ENEMY_ANIM_SHEETS[enemyId][action] = loadFrameSequence(framePaths, true);
  }
}

for (const [weaponId, actions] of Object.entries(WEAPON_ANIMATION_FRAMES)) {
  WEAPON_ACTION_SHEETS[weaponId] = {};
  for (const [action, framePaths] of Object.entries(actions)) {
    WEAPON_ACTION_SHEETS[weaponId][action] = loadFrameSequence(framePaths, true);
  }
}

function loadEnemySprite(key, src) {
  const img = new Image();
  img.onload = function () {
    ENEMY_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  ENEMY_SPRITES[key] = img;
}

loadEnemySprite('hangry_pigeon', 'assest/enemies/Hangry Pigeon.png');
loadEnemySprite('crispy_squirrel', 'assest/enemies/Crispy Squirrel.png');
loadEnemySprite('sleepy_moth', 'assest/enemies/Sleepy Moth.png');
loadEnemySprite('bouncy_toad', 'assest/enemies/Bouncy Toad.png');
loadEnemySprite('guilty_cricket', 'assest/enemies/Guilty Cricket.png');
loadEnemySprite('sous_chef_zombie', 'assest/enemies/Sous Chef Zombie.png');
loadEnemySprite('pastry_architect_golem', 'assest/enemies/Pastry Architect Golem.png');
loadEnemySprite('librarian_ghost', 'assest/enemies/Librarian Ghost.png');
loadEnemySprite('quality_control_robot', 'assest/enemies/Quality Control Robot.png');
loadEnemySprite('sommelier_poltergeist', 'assest/enemies/Sommelier Poltergeist.png');
loadEnemySprite('health_inspector', 'assest/enemies/The Health Inspector.png');

function loadDropSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    DROP_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  DROP_SPRITES[key] = img;
}

loadDropSprite('green_candy', 'assest/drops/Green Candy.png');
loadDropSprite('red_candy', 'assest/drops/Red Candy.png');
loadDropSprite('coin', 'assest/drops/Dropped Coin.png');
loadDropSprite('chicken_leg', 'assest/drops/Chicken Leg.png');
loadDropSprite('whole_chicken', 'assest/drops/Whole Chicken.png');
loadDropSprite('lunchbox', 'assest/drops/Mystery Lunchbox.png');
loadDropSprite('vip_card', 'assest/drops/Gourmando\'s VIP Card.png');

function loadWeaponSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    WEAPON_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  WEAPON_SPRITES[key] = img;
}

loadWeaponSprite('whip', 'assest/weapons/Whip.png');
loadWeaponSprite('cross', 'assest/weapons/Cross.png');
loadWeaponSprite('bouncing_slipper', 'assest/weapons/Bouncing Slipper.png');
loadWeaponSprite('spinning_ladle', 'assest/weapons/Spinning Ladle.png');
loadWeaponSprite('boomerang_cleaver', 'assest/weapons/Boomerang Cleaver.png');
loadWeaponSprite('throwing_chopsticks', 'assest/weapons/Throwing Chopsticks.png');
loadWeaponSprite('holy_toast', 'assest/weapons/Holy Toast.png');
loadWeaponSprite('garlic_breath', 'assest/weapons/Garlic Breath.png');
loadWeaponSprite('rolling_pin', 'assest/weapons/Rolling Pin.png');
loadWeaponSprite('hot_sauce_bottle', 'assest/weapons/Hot Sauce Bottle.png');
loadWeaponSprite('divine_slipper', 'assest/weapons/Divine Slipper.png');
loadWeaponSprite('excalibur_ladle', 'assest/weapons/Excalibur Ladle.png');
loadWeaponSprite('meat_grinder', 'assest/weapons/Meat Grinder.png');
loadWeaponSprite('infinite_hot_pot', 'assest/weapons/Infinite Hot Pot.png');
loadWeaponSprite('thermal_bag', 'assest/weapons/Thermal Bag.png');
loadWeaponSprite('freezer_gate', 'assest/weapons/Freezer Gate.png');
loadWeaponSprite('service_bell', 'assest/weapons/Service Bell.png');
loadWeaponSprite('michelin_cloak', 'assest/weapons/Michelin Cloak.png');
loadWeaponSprite('infinite_buffet', 'assest/weapons/Infinite Buffet.png');
loadWeaponSprite('gorgeous_moonboba', 'assest/weapons/Gorgeous Moonboba.png');

function loadPassiveSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    PASSIVE_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  PASSIVE_SPRITES[key] = img;
}

loadPassiveSprite('bubble_foam', 'assest/passives/Bubble Foam.png');
loadPassiveSprite('fitness_bracer', 'assest/passives/Fitness Bracer.png');
loadPassiveSprite('magnifying_glass', 'assest/passives/Magnifying Glass.png');
loadPassiveSprite('takeout_lid', 'assest/passives/Takeout Lid.png');
loadPassiveSprite('empty_boba_cup', 'assest/passives/Empty Boba Cup.png');
loadPassiveSprite('running_shoes', 'assest/passives/Running Shoes.png');
loadPassiveSprite('lucky_cat_charm', 'assest/passives/Lucky Cat Charm.png');
loadPassiveSprite('family_recipe', 'assest/passives/Family Recipe.png');

function loadPowerUpSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    POWERUP_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  POWERUP_SPRITES[key] = img;
}

loadPowerUpSprite('max_health', 'assest/powerups/max_health.png');
loadPowerUpSprite('damage', 'assest/powerups/damage.png');
loadPowerUpSprite('attack_speed', 'assest/powerups/attack_speed.png');
loadPowerUpSprite('move_speed', 'assest/powerups/move_speed.png');
loadPowerUpSprite('magnet', 'assest/powerups/magnet.png');
loadPowerUpSprite('luck', 'assest/powerups/luck.png');
loadPowerUpSprite('gold_gain', 'assest/powerups/gold_gain.png');
loadPowerUpSprite('revival', 'assest/powerups/revival.png');

function loadInteractableSprite(key, src) {
  const img = new Image();
  img.onload = function () {
    INTERACTABLE_SPRITES[key] = processSpriteImage(img);
  };
  img.src = src;
  INTERACTABLE_SPRITES[key] = img;
}

loadInteractableSprite('picnic_campfire', 'assest/interactables/picnic_campfire.png');
loadInteractableSprite('package', 'assest/interactables/package.png');
loadInteractableSprite('curse_altar', 'assest/interactables/curse_altar.png');
loadInteractableSprite('bill_pile', 'assest/interactables/bill_pile.png');
loadInteractableSprite('mirror', 'assest/interactables/mirror.png');


// --- entities/entity.js ---
class Entity {
  constructor(x = 0, y = 0, radius = 10) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = radius;
    this.active = true;
    this.type = 'entity';
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }
}


// --- entities/items.js ---



class DropItem extends Entity {
  constructor(x, y, dropData) {
    super(x, y, dropData.radius || 6);
    this.type = 'drop';
    this.dropData = dropData;
    this.lifetime = dropData.lifetime || 30000;
    this.born = performance.now();
    this.magnetRange = dropData.autoPickupRange || 80;
    this.picked = false;
  }

  update(dt, player) {
    if (this.picked) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) {
        this.active = false;
        return this.dropData;
      }
      const speed = 0.5;
      this.vx = (dx / dist) * speed;
      this.vy = (dy / dist) * speed;
      super.update(dt);
      return null;
    }
    const now = performance.now();
    if (this.lifetime !== Infinity && now - this.born > this.lifetime) {
      this.active = false;
      return;
    }
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < this.magnetRange) {
      this.picked = true;
    }
    if (dist < this.magnetRange + 60) {
      const speed = 0.3;
      this.vx = (dx / dist) * speed;
      this.vy = (dy / dist) * speed;
      super.update(dt);
    }
  }

  render(ctx) {
    ctx.save();
    const sprite = DROP_SPRITES[this.dropData.id];
    const isReady = sprite && (sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0));
    if (isReady) {
      const size = this.radius * 2.5;
      ctx.shadowColor = this.dropData.color;
      ctx.shadowBlur = 6;
      ctx.drawImage(sprite, this.x - size / 2, this.y - size / 2, size, size);
      ctx.shadowBlur = 0;
    } else {
      ctx.shadowColor = this.dropData.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.dropData.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }
}

class BurstSkill {
  constructor() {
    this.cooldown = 5000;
    this.cooldownTimer = 0;
    this.ready = true;
  }

  update(dt) {
    if (!this.ready) {
      this.cooldownTimer -= dt;
      if (this.cooldownTimer <= 0) {
        this.cooldownTimer = 0;
        this.ready = true;
      }
    }
  }

  fire(player, entityManager) {
    if (!this.ready) return false;
    this.ready = false;
    this.cooldownTimer = this.cooldown;
    const bulletCount = 8 + player.getLevel();
    const speed = 0.6;
    const damage = player.getAttack() * 1.5;
    for (let i = 0; i < bulletCount; i++) {
      const angle = (Math.PI * 2 * i) / bulletCount;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const proj = new BurstProjectile(player.x, player.y, vx, vy, damage);
      entityManager.add(proj);
    }
    return true;
  }

  getCooldownPercent() {
    if (this.ready) return 1;
    return 1 - (this.cooldownTimer / this.cooldown);
  }
}


// --- entities/interactable.js ---



class Interactable extends Entity {
  constructor(data) {
    super(data.x, data.y, 24);
    this.type = 'interactable';
    this.interactableType = data.type;
    this.name = data.name || INTERACTABLE_DEFS[data.type]?.name || data.type;
    this.data = data;
    this.focusTimer = 0;
    this.used = false;
    this.promptTimer = 0;
  }

  update(dt, game) {
    if (!game?.player || this.used) return;
    const dx = game.player.x - this.x;
    const dy = game.player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const near = dist < this.radius + game.player.radius + 28;
    if (!near) {
      this.focusTimer = 0;
      return;
    }
    this.promptTimer = 600;
    if (this.interactableType === 'curse_altar') {
      game.pendingInteractableChoice = this;
      game.setState('INTERACTABLE_CHOICE');
      return;
    }
    if (this.interactableType === 'mirror') {
      this.focusTimer += dt;
      if (this.focusTimer < 3000) return;
    }
    applyInteractableChoice(game, this.dataWithPosition());
    this.used = true;
    this.active = false;
  }

  dataWithPosition() {
    return {
      ...this.data,
      x: this.x,
      y: this.y
    };
  }

  render(ctx) {
    if (!this.active) return;
    const def = INTERACTABLE_DEFS[this.interactableType] || {};
    const t = performance.now() * 0.004;
    const pulse = 1 + Math.sin(t) * 0.08;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(pulse, pulse);
    ctx.shadowColor = def.color || '#ffd43b';
    ctx.shadowBlur = 14;
    const sprite = INTERACTABLE_SPRITES[this.interactableType];
    if (isDrawableImage(sprite)) {
      ctx.drawImage(sprite, -34, -34, 68, 68);
    } else {
      drawIcon(ctx, this.interactableType, def.color || '#ffd43b');
    }
    ctx.restore();

    if (this.promptTimer > 0 || this.focusTimer > 0) {
      ctx.save();
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      roundRect(ctx, this.x - 70, this.y - 58, 140, 28, 6);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const text = this.interactableType === 'mirror' && this.focusTimer > 0
        ? `凝视 ${Math.ceil((3000 - this.focusTimer) / 1000)}`
        : this.name;
      ctx.fillText(text, this.x, this.y - 44);
      ctx.restore();
      this.promptTimer = Math.max(0, this.promptTimer - 16);
    }
  }
}

function isDrawableImage(sprite) {
  return sprite && (
    sprite instanceof HTMLCanvasElement ||
    (sprite.complete && sprite.naturalWidth > 0)
  );
}

function drawIcon(ctx, type, color) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(0,0,0,0.55)';
  ctx.fillStyle = color;
  if (type === 'picnic_campfire') {
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.quadraticCurveTo(24, -2, 5, 24);
    ctx.quadraticCurveTo(-18, 6, 0, -25);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff3bf';
    ctx.beginPath();
    ctx.arc(0, 7, 7, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'package') {
    roundRect(ctx, -24, -20, 48, 40, 6);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-24, -4);
    ctx.lineTo(24, -4);
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 20);
    ctx.stroke();
  } else if (type === 'curse_altar') {
    ctx.beginPath();
    ctx.moveTo(0, -26);
    ctx.lineTo(25, 18);
    ctx.lineTo(-25, 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, 5, 6, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'bill_pile') {
    ctx.rotate(-0.18);
    roundRect(ctx, -24, -16, 48, 32, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#3b2f05';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', 0, 0);
  } else if (type === 'wandering_merchant') {
    ctx.beginPath();
    ctx.arc(0, -8, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, -20, 5, 40, 24, 5);
    ctx.fill();
    ctx.stroke();
  } else if (type === 'mirror') {
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath();
    ctx.arc(-5, -7, 7, 0.3, 2.1);
    ctx.stroke();
  } else if (type === 'gourmando_note') {
    ctx.rotate(-0.12);
    roundRect(ctx, -22, -26, 44, 52, 4);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(60,45,20,0.45)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(-12, -12 + i * 9);
      ctx.lineTo(12, -12 + i * 9);
      ctx.stroke();
    }
  } else if (type === 'relic_cache') {
    roundRect(ctx, -25, -18, 50, 36, 7);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-25, -4);
    ctx.lineTo(25, -4);
    ctx.moveTo(0, -18);
    ctx.lineTo(0, 18);
    ctx.stroke();
    ctx.fillStyle = '#fff8dc';
    ctx.beginPath();
    ctx.arc(0, -4, 6, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}


// --- entities/projectile.js ---





class Projectile extends Entity {
  constructor(x, y, vx, vy, damage, weaponName, options = {}) {
    super(x, y, options.radius || 4);
    this.type = 'projectile';
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.lifetime = options.lifetime || 2000;
    this.weaponName = weaponName || null;
    this.angle = Math.atan2(vy, vx);
    this.pierceLeft = options.pierce || 0;
    this.sizeMultiplier = options.sizeMultiplier || 1;
    this.hitEnemies = new Set();
    this._expireEffectShown = false;
  }

  update(dt, game) {
    super.update(dt);
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this._spawnExpireEffect(game);
      this.active = false;
    }
    const bounds = game?.mapBounds || { minX: -50, minY: -50, maxX: GAME_WIDTH + 50, maxY: GAME_HEIGHT + 50 };
    if (this.x < bounds.minX - 100 || this.x > bounds.maxX + 100 || this.y < bounds.minY - 100 || this.y > bounds.maxY + 100) {
      this.active = false;
    }
  }

  handleHit(enemy, enemies = [], game = globalThis.window?.game) {
    this.hitEnemies.add(enemy);
    this._spawnImpactEffect(game, enemy);
    if (this.pierceLeft !== undefined && this.pierceLeft > 0) {
      this.pierceLeft--;
      return true;
    }
    this.active = false;
    return false;
  }

  render(ctx) {
    const sprite = this._getActionFrame() || (this.weaponName ? WEAPON_SPRITES[this.weaponName] : null);
    const isReady = sprite && (sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0));
    if (isReady) {
      const size = Math.max(
        PROJECTILE_MIN_SPRITE_SIZE,
        this.radius * PROJECTILE_SPRITE_SIZE_MULTIPLIER * this.sizeMultiplier
      );
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffd43b';
      ctx.fill();
      ctx.shadowColor = '#ffd43b';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  _getActionFrame() {
    if (!this.weaponName) return null;
    const actions = WEAPON_ACTION_SHEETS[this.weaponName];
    if (!actions) return null;
    const preferred = this._preferredAction();
    const frames = actions[preferred] || actions.fly || actions.loop || actions.spray || actions.lob;
    if (!Array.isArray(frames) || frames.length === 0) return null;
    const index = Math.floor(performance.now() / 90) % frames.length;
    const frame = frames[index];
    const ready = frame instanceof HTMLCanvasElement || (frame && frame.complete && frame.naturalWidth > 0);
    return ready ? frame : null;
  }

  _preferredAction() {
    if (this.weaponName === 'holy_toast') return 'lob';
    if (this.weaponName === 'hot_sauce_bottle' || this.weaponName === 'infinite_hot_pot') return 'spray';
    if (this.weaponName === 'spinning_ladle' || this.weaponName === 'garlic_breath' || this.weaponName === 'excalibur_ladle') return 'loop';
    return 'fly';
  }

  _spawnImpactEffect(game, enemy = null) {
    const action = this._preferredImpactAction();
    if (!action) return;
    addWeaponActionEffect(game, this.weaponName, action, {
      x: Number.isFinite(enemy?.x) ? enemy.x : this.x,
      y: Number.isFinite(enemy?.y) ? enemy.y : this.y,
      size: this._impactSize(action),
      life: action === 'splash' ? 300 : 260,
      rotation: this.angle,
      alpha: this._impactAlpha(action)
    });
  }

  _spawnExpireEffect(game) {
    if (this._expireEffectShown) return;
    const action = this._preferredExpireAction();
    if (!action) return;
    this._expireEffectShown = true;
    addWeaponActionEffect(game, this.weaponName, action, {
      x: this.x,
      y: this.y,
      size: this._impactSize(action),
      life: action === 'splash' ? 300 : 260,
      rotation: this.angle,
      alpha: this._impactAlpha(action)
    });
  }

  _preferredImpactAction() {
    if (!this.weaponName) return null;
    let action = 'impact';
    if (this.weaponName === 'holy_toast') action = 'splash';
    if (this.weaponName === 'hot_sauce_bottle') action = 'burn';
    if (this.weaponName === 'infinite_hot_pot') action = 'splash';
    return this._hasAction(action) ? action : null;
  }

  _preferredExpireAction() {
    if (this.weaponName === 'holy_toast') return this._hasAction('splash') ? 'splash' : null;
    if (this.weaponName === 'hot_sauce_bottle') return this._hasAction('burn') ? 'burn' : null;
    if (this.weaponName === 'infinite_hot_pot') return this._hasAction('burn') ? 'burn' : null;
    return null;
  }

  _hasAction(action) {
    return !!(this.weaponName && WEAPON_ACTION_SHEETS[this.weaponName]?.[action]);
  }

  _impactSize(action) {
    if (action === 'splash') return 138;
    if (action === 'burn') return 124;
    return 112;
  }

  _impactAlpha(action) {
    if (action === 'splash') return 0.72;
    if (action === 'burn') return 0.68;
    return 0.68;
  }
}

class BurstProjectile extends Entity {
  constructor(x, y, vx, vy, damage) {
    super(x, y, 5);
    this.type = 'projectile';
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.lifetime = 1500;
    this.born = performance.now();
  }

  update(dt) {
    super.update(dt);
    this.lifetime -= dt;
    if (this.lifetime <= 0) this.active = false;
    if (this.x < -50 || this.x > GAME_WIDTH + 50 || this.y < -50 || this.y > GAME_HEIGHT + 50) {
      this.active = false;
    }
  }

  render(ctx) {
    const elapsed = performance.now() - this.born;
    const pulse = 1 + 0.3 * Math.sin(elapsed * 0.02);
    const r = this.radius * pulse;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ff6b6b';
    ctx.fill();
    ctx.shadowColor = '#ff4500';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffd43b';
    ctx.fill();
  }
}


// --- entities/cross-projectile.js ---





class WhipSlash extends Entity {
  constructor(x, y, angle, arc, range, damage, isReverse, weaponName = 'whip') {
    super(x, y, 4);
    this.type = 'whip_slash';
    this.slashAngle = angle + (isReverse ? Math.PI : 0);
    this.arc = arc;
    this.range = range;
    this.damage = damage;
    this.lifetime = 100;
    this.born = performance.now();
    this.hasHit = new Set();
    this.isReverse = isReverse;
    this.weaponName = weaponName;
  }

  update(dt, entityManager) {
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this.active = false;
      return;
    }
    if (!entityManager) return;
    const enemies = entityManager.getAll().filter(e => e.type === 'enemy' && e.active);
    for (const enemy of enemies) {
      if (this.hasHit.has(enemy)) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > this.range + enemy.radius) continue;
      let angleToEnemy = Math.atan2(dy, dx);
      let diff = angleToEnemy - this.slashAngle;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      if (Math.abs(diff) <= this.arc / 2) {
        this.hasHit.add(enemy);
        enemy.takeDamage(this.damage);
        if (window.game) {
          window.game.audio.playHit();
        }
      }
    }
  }

  render(ctx) {
    const elapsed = performance.now() - this.born;
    const progress = Math.min(1, elapsed / 100);
    const alpha = 1 - progress;
    const sprite = this._getSlashFrame(progress);
    if (sprite) {
      ctx.save();
      ctx.globalAlpha = Math.max(0.25, alpha);
      ctx.translate(this.x, this.y);
      ctx.rotate(this.slashAngle);
      if (this.isReverse) ctx.scale(1, -1);
      const size = this.range * WHIP_SLASH_SIZE_MULTIPLIER;
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
      ctx.restore();
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.slashAngle);
    const arcColor = this.isReverse ? `rgba(255, 150, 80, ${alpha})` : `rgba(255, 80, 80, ${alpha})`;
    ctx.strokeStyle = arcColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, this.range, -this.arc / 2, this.arc / 2);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, this.range * 0.7, -this.arc / 3, this.arc / 3);
    ctx.stroke();
    ctx.restore();
  }

  _getSlashFrame(progress) {
    const frames = WEAPON_ACTION_SHEETS[this.weaponName]?.slash || WEAPON_ACTION_SHEETS.whip?.slash;
    if (!Array.isArray(frames) || frames.length === 0) return null;
    const index = Math.min(frames.length - 1, Math.floor(progress * frames.length));
    const frame = frames[index];
    const ready = frame instanceof HTMLCanvasElement || (frame && frame.complete && frame.naturalWidth > 0);
    return ready ? frame : null;
  }
}

class CrossProjectile extends Entity {
  constructor(x, y, vx, vy, damage, maxDist, pierceCount, options = {}) {
    super(x, y, options.radius || 8);
    this.type = 'projectile';
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.startX = x;
    this.startY = y;
    this.maxDist = maxDist;
    this.returning = false;
    this.pierceCount = pierceCount;
    this.pierceLeft = pierceCount;
    this.lifetime = 5000;
    this.angle = Math.atan2(vy, vx);
    this.hitEnemies = new Set();
    this.weaponName = options.weaponName || null;
    this.returnSpeed = options.returnSpeed || 0.6;
    this.mode = options.mode || 'boomerang';
    this.bounceLeft = options.bounceLeft ?? pierceCount;
  }

  update(dt, game) {
    super.update(dt);
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this.active = false;
      return;
    }
    const dx = this.x - this.startX;
    const dy = this.y - this.startY;
    const distTraveled = Math.sqrt(dx * dx + dy * dy);
    if (!this.returning && distTraveled >= this.maxDist) {
      this.returning = true;
    }
    if (this.returning) {
      const player = window.game ? window.game.player : null;
      if (player) {
        const pdx = player.x - this.x;
        const pdy = player.y - this.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < 20) {
          this.active = false;
          return;
        }
        const speed = this.returnSpeed;
        this.vx = (pdx / pdist) * speed;
        this.vy = (pdy / pdist) * speed;
        this.angle = Math.atan2(this.vy, this.vx);
      }
    }
    const bounds = game?.mapBounds || { minX: -100, minY: -100, maxX: GAME_WIDTH + 100, maxY: GAME_HEIGHT + 100 };
    if (this.x < bounds.minX - 140 || this.x > bounds.maxX + 140 || this.y < bounds.minY - 140 || this.y > bounds.maxY + 140) {
      this.active = false;
    }
  }

  render(ctx) {
    const sprite = this._getActionFrame();
    if (sprite) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle + performance.now() * 0.005);
      const size = Math.max(
        CROSS_PROJECTILE_MIN_SPRITE_SIZE,
        this.radius * CROSS_PROJECTILE_SPRITE_SIZE_MULTIPLIER
      );
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
      ctx.restore();
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + performance.now() * 0.005);
    const s = this.radius * 2;
    ctx.strokeStyle = this.returning ? '#ffd43b' : '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(0, s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-s, 0);
    ctx.lineTo(s, 0);
    ctx.stroke();
    ctx.fillStyle = this.returning ? '#ffd43b' : '#fff';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    if (this.returning) {
      ctx.shadowColor = '#ffd43b';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
  }

  _getActionFrame() {
    if (!this.weaponName) return null;
    const action = this.returning ? 'return' : 'fly';
    const frames = WEAPON_ACTION_SHEETS[this.weaponName]?.[action] || WEAPON_ACTION_SHEETS[this.weaponName]?.fly;
    if (!Array.isArray(frames) || frames.length === 0) return null;
    const index = Math.floor(performance.now() / 80) % frames.length;
    const frame = frames[index];
    const ready = frame instanceof HTMLCanvasElement || (frame && frame.complete && frame.naturalWidth > 0);
    return ready ? frame : null;
  }

  handleHit(enemy, enemies = [], game = globalThis.window?.game) {
    this.hitEnemies.add(enemy);
    this._spawnImpactEffect(game, enemy);
    if (this.mode === 'bounce') {
      if (this.bounceLeft > 0) {
        const next = this._findBounceTarget(enemy, enemies);
        if (next) {
          this.bounceLeft--;
          const dx = next.x - this.x;
          const dy = next.y - this.y;
          const dist = Math.max(1, Math.sqrt(dx * dx + dy * dy));
          const speed = Math.max(0.35, Math.sqrt(this.vx * this.vx + this.vy * this.vy) || 0.45);
          this.vx = (dx / dist) * speed;
          this.vy = (dy / dist) * speed;
          this.angle = Math.atan2(this.vy, this.vx);
          this.returning = false;
          return true;
        }
      }
      this.returning = true;
      return true;
    }

    if (this.pierceLeft !== undefined && this.pierceLeft > 0) {
      this.pierceLeft--;
      return true;
    }
    this.active = false;
    return false;
  }

  _findBounceTarget(currentEnemy, enemies) {
    let target = null;
    let bestDist = Infinity;
    for (const enemy of enemies) {
      if (!enemy.active || enemy === currentEnemy || this.hitEnemies.has(enemy)) continue;
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 420 && dist < bestDist) {
        target = enemy;
        bestDist = dist;
      }
    }
    return target;
  }

  _spawnImpactEffect(game, enemy = null) {
    if (!this.weaponName || !WEAPON_ACTION_SHEETS[this.weaponName]?.impact) return;
    addWeaponActionEffect(game, this.weaponName, 'impact', {
      x: Number.isFinite(enemy?.x) ? enemy.x : this.x,
      y: Number.isFinite(enemy?.y) ? enemy.y : this.y,
      size: 116,
      life: 260,
      rotation: this.angle,
      alpha: 0.68
    });
  }
}


// --- entities/weapon-system.js ---






class Weapon {
  constructor(data) {
    this.data = data;
    this.fireRate = 200;
    this.fireTimer = 0;
    this.damage = 20;
    this.range = 600;
  }

  update(dt, owner, entityManager) {
    this.fireTimer += dt;
    if (this.fireTimer < this.fireRate) return;
    const enemies = entityManager.getAll().filter(e => e.type === 'enemy' && e.active);
    if (enemies.length === 0) return;
    let nearest = null;
    let nearestDist = Infinity;
    for (const enemy of enemies) {
      const dx = enemy.x - owner.x;
      const dy = enemy.y - owner.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.range && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
      }
    }
    if (!nearest) return;
    this.fireTimer = 0;
    const dx = nearest.x - owner.x;
    const dy = nearest.y - owner.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 0.5;
    const vx = (dx / dist) * speed;
    const vy = (dy / dist) * speed;
    const proj = new Projectile(owner.x, owner.y, vx, vy, this.damage, this.data.id || this.data.name);
    if (window.game) {
      const empCount = window.game.player.arcanaInventory.getCount('emperor');
      if (empCount > 0) proj.radius = Math.round(proj.radius * (1 + 0.25 * empCount));
    }
    entityManager.add(proj);
    if (window.game) window.game.audio.playShoot();
  }
}

class ArcanaInventory {
  constructor() {
    this.counts = {};
    this.maxPerCard = 5;
  }

  add(arcanaId) {
    const cur = this.counts[arcanaId] || 0;
    if (cur >= this.maxPerCard) return false;
    this.counts[arcanaId] = cur + 1;
    return true;
  }

  has(arcanaId) {
    return (this.counts[arcanaId] || 0) > 0;
  }

  getCount(arcanaId) {
    return this.counts[arcanaId] || 0;
  }

  canAdd(arcanaId) {
    return (this.counts[arcanaId] || 0) < this.maxPerCard;
  }

  canSelect() {
    for (const a of ARCANAS) {
      if (this.canAdd(a.id)) return true;
    }
    return false;
  }

  getTotalCount() {
    let total = 0;
    for (const id in this.counts) total += this.counts[id];
    return total;
  }

  getAll() {
    const result = [];
    for (const id in this.counts) {
      if (this.counts[id] > 0) {
        const def = ARCANAS.find(a => a.id === id);
        if (def) result.push({ ...def, count: this.counts[id] });
      }
    }
    return result;
  }
}

class WeaponInventory {
  constructor() {
    this.weapons = {};
  }

  add(weaponId) {
    if (this.weapons[weaponId]) return false;
    this.weapons[weaponId] = { id: weaponId, level: 1 };
    return true;
  }

  has(weaponId) {
    return !!this.weapons[weaponId];
  }

  getLevel(weaponId) {
    return this.weapons[weaponId] ? this.weapons[weaponId].level : 0;
  }

  upgrade(weaponId) {
    if (!this.weapons[weaponId]) return false;
    const def = WEAPON_DEFS[weaponId];
    if (!def) return false;
    if (this.weapons[weaponId].level >= def.maxLevel) return false;
    this.weapons[weaponId].level++;
    return true;
  }

  canUpgrade(weaponId) {
    if (!this.weapons[weaponId]) return false;
    const def = WEAPON_DEFS[weaponId];
    if (!def) return false;
    return this.weapons[weaponId].level < def.maxLevel;
  }

  getAll() {
    return Object.values(this.weapons);
  }
}


// --- entities/passive-inventory.js ---

class PassiveInventory {
  constructor() {
    this.passives = {};
  }

  add(passiveId) {
    if (this.passives[passiveId]) return false;
    if (!PASSIVE_DEFS[passiveId]) return false;
    this.passives[passiveId] = { id: passiveId, level: 1 };
    return true;
  }

  has(passiveId) {
    return !!this.passives[passiveId];
  }

  getLevel(passiveId) {
    return this.passives[passiveId]?.level || 0;
  }

  upgrade(passiveId) {
    const item = this.passives[passiveId];
    const def = PASSIVE_DEFS[passiveId];
    if (!item || !def || item.level >= def.maxLevel) return false;
    item.level++;
    return true;
  }

  canUpgrade(passiveId) {
    const item = this.passives[passiveId];
    const def = PASSIVE_DEFS[passiveId];
    return !!item && !!def && item.level < def.maxLevel;
  }

  getModifier(stat) {
    return getPassiveModifier(this.passives, stat);
  }

  getAll() {
    return Object.values(this.passives);
  }
}


// --- entities/player.js ---















class Player extends Entity {
  constructor(x, y) {
    super(x, y, 25);
    this.type = 'player';
    this.speed = 0.4;
    this.maxHp = 1000;
    this.hp = 1000;
    this.shield = 0;
    this.sprite = null;
    this.bounds = { minX: 0, minY: 0, maxX: GAME_WIDTH, maxY: GAME_HEIGHT };
    this.exp = 0;
    this.gold = 0;
    this.baseAttack = 20;
    this.attackBonus = 0;
    this.kills = 0;
    this.level = 1;
    this.pendingLevelUps = 0;
    this.invincibleTimer = 0;
    this.burstSkill = new BurstSkill();
    this.charData = null;
    this.moveSpeedMultiplier = 1.0;
    this.powerMultiplier = 1.0;
    this.attackSpeedMultiplier = 1.0;
    this.areaMultiplier = 1.0;
    this.magnetMultiplier = 1.0;
    this.luckMultiplier = 1.0;
    this.armorBonus = 0;
    this.expGainMultiplier = 1.0;
    this.goldGainMultiplier = 1.0;
    this.revivals = 0;
    this.functionalState = {};
    this.powerUpModifiers = {
      maxHp: 1,
      damage: 1,
      attackSpeed: 1,
      moveSpeed: 1,
      magnet: 1,
      luck: 1,
      goldGain: 1,
      revivals: 0
    };
    this.weaponInventory = new WeaponInventory();
    this.passiveInventory = new PassiveInventory();
    this.weaponTimers = {};
    this.orbitAngles = {};
    this.facingAngle = 0;
    this.dashCooldown = 0;
    this.dashCooldownMax = 1500;
    this.dashSpeed = 3.0;
    this.dashDuration = 0;
    this.dashDurationMax = 120;
    this.dashDirX = 0;
    this.dashDirY = 0;
    this.isDashing = false;
    this.arcanaInventory = null;
    this.anim = new AnimationController();
    this._hitAnim = false;
    this._hitAnimTimer = 0;
    this._isUsingSkill = false;
    this._skillAnimTimer = 0;
    this._facingLeft = false;
    this._animDirection = 'down';
    this.animParams = null;
  }

  applyCharacterStats(char) {
    if (!char) return;
    this.charData = char;
    this.maxHp = Math.floor(1000 * (char.stats.maxHp / 100));
    this.hp = this.maxHp;
    this.moveSpeedMultiplier = char.stats.moveSpeed;
    this.powerMultiplier = char.stats.power;
    this.attackSpeedMultiplier = char.stats.attackSpeed;
    this.areaMultiplier = char.stats.area || 1;
    this.magnetMultiplier = char.stats.magnet || 1;
    this.luckMultiplier = char.stats.luck || 1;
    this.expGainMultiplier = 1.0 + (char.passive.effects.expGain || 0);
    const randomStartWeaponIds = Array.isArray(char.randomStartWeaponIds)
      ? char.randomStartWeaponIds.filter(Boolean)
      : [];
    if (randomStartWeaponIds.length > 0) {
      const index = Math.floor(Math.random() * randomStartWeaponIds.length);
      this.weaponInventory.add(randomStartWeaponIds[index]);
    } else if (char.startWeaponId) {
      this.weaponInventory.add(char.startWeaponId);
    }
    this.recalcStats();
  }

  getLevel() { return this.level; }

  expToNextLevel() {
    return expToNextLevel(this.level);
  }

  getAttack() {
    return Math.floor((this.baseAttack + this.attackBonus) * this.powerMultiplier);
  }

  getArmor() {
    return this.armorBonus;
  }

  recalcStats() {
    const char = this.charData;
    if (!char) return;
    const hpRatio = this.maxHp > 0 ? this.hp / this.maxHp : 1;
    this.maxHp = Math.floor(1000 * ((char.stats.maxHp || 100) / 100) * (this.powerUpModifiers.maxHp || 1));
    this.hp = Math.max(1, Math.min(this.maxHp, Math.floor(this.maxHp * hpRatio)));
    this.moveSpeedMultiplier = (char.stats.moveSpeed || 1) * (1 + this.passiveInventory.getModifier('speed')) * (this.powerUpModifiers.moveSpeed || 1);
    this.powerMultiplier = (char.stats.power || 1) * (1 + this.passiveInventory.getModifier('damage')) * (this.powerUpModifiers.damage || 1);
    this.attackSpeedMultiplier = (char.stats.attackSpeed || 1) * (1 + this.passiveInventory.getModifier('cooldown')) * (this.powerUpModifiers.attackSpeed || 1);
    this.areaMultiplier = (char.stats.area || 1) * (1 + this.passiveInventory.getModifier('area'));
    this.magnetMultiplier = (char.stats.magnet || 1) * (1 + this.passiveInventory.getModifier('magnet')) * (this.powerUpModifiers.magnet || 1);
    this.luckMultiplier = (char.stats.luck || 1) * (1 + this.passiveInventory.getModifier('luck')) * (this.powerUpModifiers.luck || 1);
    this.armorBonus = Math.floor(this.passiveInventory.getModifier('armor') + (this.powerUpModifiers.armor || 0));
    this.expGainMultiplier = 1.0 + (char.passive.effects.expGain || 0) + this.passiveInventory.getModifier('growth');
    this.goldGainMultiplier = (1 + (char.passive.effects.goldGain || 0)) * (this.powerUpModifiers.goldGain || 1);
    this.revivals = this.powerUpModifiers.revivals || 0;
  }

  addExp(amount) {
    this.exp += Math.floor(amount * this.expGainMultiplier);
    while (this.exp >= this.expToNextLevel()) {
      this.exp -= this.expToNextLevel();
      this.level++;
      this.pendingLevelUps++;
    }
    if (this.pendingLevelUps > 0 && window.game && window.game.state === 'PLAYING') {
      window.game.requestLevelUp();
    }
  }

  setSprite(img) { this.sprite = img; }

  loadAnimSheets(sheets) {
    if (!sheets) return;
    for (const [action, sheet] of Object.entries(sheets)) {
      const isFrameSet = Array.isArray(sheet) ||
        (sheet && typeof sheet === 'object' && Object.values(sheet).some(value => Array.isArray(value)));
      if (isFrameSet) {
        this.anim.loadFrames(action, sheet);
      } else {
        this.anim.loadSpriteSheet(action, sheet);
      }
    }
  }

  setWeapon(weaponData) {
    if (weaponData?.id) this.weaponInventory.add(weaponData.id);
  }

  setBounds(minX, minY, maxX, maxY) {
    this.bounds = { minX, minY, maxX, maxY };
  }

  getUpgradeInventory() {
    return {
      weapons: cloneInventoryPlain(this.weaponInventory.weapons),
      passives: cloneInventoryPlain(this.passiveInventory.passives),
      gold: this.gold,
      hp: this.hp,
      maxHp: this.maxHp
    };
  }

  applyUpgradeInventory(inventory) {
    this.weaponInventory.weapons = cloneInventoryPlain(inventory.weapons || {});
    this.passiveInventory.passives = cloneInventoryPlain(inventory.passives || {});
    this.gold = inventory.gold ?? this.gold;
    this.hp = inventory.hp ?? this.hp;
    this.recalcStats();
  }

  update(dt) {
    if (this.invincibleTimer > 0) this.invincibleTimer -= dt;
    if (this.dashCooldown > 0) this.dashCooldown -= dt;

    if (this._hitAnim) {
      this._hitAnimTimer -= dt;
      if (this._hitAnimTimer <= 0) this._hitAnim = false;
    }
    if (this._isUsingSkill) {
      this._skillAnimTimer -= dt;
      if (this._skillAnimTimer <= 0) this._isUsingSkill = false;
    }

    if (this.isDashing) {
      this.dashDuration -= dt;
      this.vx = this.dashDirX * this.dashSpeed;
      this.vy = this.dashDirY * this.dashSpeed;
      if (this.dashDuration <= 0) this.isDashing = false;
    } else {
      const input = window.game.inputManager.getDirection();
      if (input.x !== 0 || input.y !== 0) {
        this.facingAngle = Math.atan2(input.y, input.x);
        if (input.x < 0) this._facingLeft = true;
        if (input.x > 0) this._facingLeft = false;
      }
      this.vx = input.x * this.speed * this.moveSpeedMultiplier;
      this.vy = input.y * this.speed * this.moveSpeedMultiplier;
    }

    super.update(dt);
    this.x = Math.max(this.bounds.minX + this.radius, Math.min(this.bounds.maxX - this.radius, this.x));
    this.y = Math.max(this.bounds.minY + this.radius, Math.min(this.bounds.maxY - this.radius, this.y));

    this._updateWeapons(dt);
    this.burstSkill.update(dt);

    this.animParams = createAnimationParams(this, window.game.inputManager);
    this._animDirection = this.animParams.direction;
    this.anim.setDirection(this._animDirection);
    const animState = resolveAnimationState(this.animParams);
    this.anim.play(animState);
    this.anim.update(dt);
  }

  _updateWeapons(dt) {
    const em = window.game.entityManager;
    for (const weapon of this.weaponInventory.getAll()) {
      const def = WEAPON_DEFS[weapon.id] || EVOLUTION_DEFS[weapon.id];
      if (!def) continue;
      const behavior = def.behavior || WEAPON_DEFS[def.baseWeaponId]?.behavior;
      if (def.functional || ['shield', 'freeze', 'clear'].includes(behavior)) {
        applyFunctionalWeaponTick(window.game, weapon, dt);
        continue;
      }
      if (behavior === 'orbit' || behavior === 'aura') {
        this._updateAreaWeapon(dt, weapon, def, behavior, em);
      } else {
        this._updateTimedWeapon(dt, weapon, def, behavior, em);
      }
    }
  }

  _updateTimedWeapon(dt, weapon, def, behavior, em) {
    const baseDef = WEAPON_DEFS[def.baseWeaponId] || def;
    const timerKey = weapon.id;
    this.weaponTimers[timerKey] = (this.weaponTimers[timerKey] || 0) + dt;
    let fireRate = this._weaponFireRate(baseDef, weapon);
    if (this.weaponTimers[timerKey] < fireRate) return;
    const chargedTime = this.weaponTimers[timerKey];
    this.weaponTimers[timerKey] = 0;

    const count = this._weaponCount(baseDef, weapon);
    const damage = this._weaponDamage(baseDef, weapon, def, chargedTime);
    const range = this._weaponRange(baseDef, weapon);
    const pierce = this._weaponPierce(baseDef, weapon);
    const nearest = this._findNearestEnemy(range);
    if (!nearest && behavior !== 'sweep') return;

    if (behavior === 'sweep') {
      const arc = (baseDef.baseArc || Math.PI / 3) * (weapon.level >= 7 ? 1.2 : 1);
      em.add(new WhipSlash(this.x, this.y, this.facingAngle, arc, range, damage, false, weapon.id));
      if (weapon.level >= 5) em.add(new WhipSlash(this.x, this.y, this.facingAngle, arc, range, damage, true, weapon.id));
    } else if (behavior === 'boomerang' || behavior === 'bounce') {
      for (let i = 0; i < count; i++) {
        const angle = this._spreadAngle(nearest, count, i, Math.PI / 7);
        em.add(new CrossProjectile(
          this.x,
          this.y,
          Math.cos(angle) * 0.45,
          Math.sin(angle) * 0.45,
          damage,
          range,
          pierce,
          {
            radius: Math.round(7 * this.areaMultiplier),
            weaponName: weapon.id,
            mode: behavior,
            bounceLeft: pierce
          }
        ));
      }
    } else if (behavior === 'lob') {
      for (let i = 0; i < count; i++) {
        const angle = this._spreadAngle(nearest, count, i, Math.PI / 5);
        em.add(new Projectile(this.x, this.y, Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, damage, weapon.id, {
          radius: Math.round(10 * this.areaMultiplier),
          lifetime: 1400,
          pierce,
          sizeMultiplier: 1.16
        }));
      }
    } else if (behavior === 'spray') {
      const sprayCount = count + 2;
      for (let i = 0; i < sprayCount; i++) {
        const angle = this.facingAngle - Math.PI / 5 + (Math.PI / 5) * (sprayCount === 1 ? 0 : (2 * i / (sprayCount - 1)));
        em.add(new Projectile(this.x, this.y, Math.cos(angle) * 0.38, Math.sin(angle) * 0.38, damage, weapon.id, {
          radius: Math.round(5 * this.areaMultiplier),
          lifetime: 900,
          pierce,
          sizeMultiplier: 1.22
        }));
      }
    } else {
      for (let i = 0; i < count; i++) {
        const angle = this._spreadAngle(nearest, count, i, Math.PI / 9);
        em.add(new Projectile(this.x, this.y, Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, damage, weapon.id, {
          radius: Math.round(4 * this.areaMultiplier),
          lifetime: 1800,
          pierce,
          sizeMultiplier: weapon.id === 'throwing_chopsticks' ? 1.2 : 1
        }));
      }
    }
    window.game.audio.playShoot();
  }

  _updateAreaWeapon(dt, weapon, def, behavior, em) {
    const baseDef = WEAPON_DEFS[def.baseWeaponId] || def;
    const timerKey = weapon.id;
    this.weaponTimers[timerKey] = (this.weaponTimers[timerKey] || 0) + dt;
    const damage = this._weaponDamage(baseDef, weapon, def, this.weaponTimers[timerKey] || 0);
    const range = this._weaponRange(baseDef, weapon);

    if (behavior === 'orbit') {
      const count = this._weaponCount(baseDef, weapon);
      this.orbitAngles[timerKey] = (this.orbitAngles[timerKey] || 0) + dt * 0.003 * (1 + weapon.level * 0.04);
      if (this.weaponTimers[timerKey] < 180) return;
      this.weaponTimers[timerKey] = 0;
      const enemies = window.game.entityManager.getByType('enemy');
      for (let i = 0; i < count; i++) {
        const angle = this.orbitAngles[timerKey] + (Math.PI * 2 * i) / count;
        const ox = this.x + Math.cos(angle) * range;
        const oy = this.y + Math.sin(angle) * range;
        em.add(new Projectile(ox, oy, Math.cos(angle + Math.PI / 2) * 0.01, Math.sin(angle + Math.PI / 2) * 0.01, damage, weapon.id, {
          radius: Math.round(10 * this.areaMultiplier),
          lifetime: 260,
          pierce: 999,
          sizeMultiplier: 1.12
        }));
      }
      for (const enemy of enemies) {
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < range + enemy.radius + 12) enemy.takeDamage(damage);
        if (this.arcanaInventory?.has('mirror')) {
          const mirrorX = window.game.camera.x + GAME_WIDTH - (this.x - window.game.camera.x);
          const mirrorY = window.game.camera.y + GAME_HEIGHT - (this.y - window.game.camera.y);
          const mdx = enemy.x - mirrorX;
          const mdy = enemy.y - mirrorY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < range + enemy.radius + 12) enemy.takeDamage(damage);
        }
      }
    } else {
      const pulseRate = this._weaponFireRate(baseDef, weapon);
      if (this.weaponTimers[timerKey] < pulseRate) return;
      this.weaponTimers[timerKey] = 0;
      for (const enemy of window.game.entityManager.getByType('enemy')) {
        const dx = enemy.x - this.x;
        const dy = enemy.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < range + enemy.radius) enemy.takeDamage(damage);
        if (this.arcanaInventory?.has('mirror')) {
          const mirrorX = window.game.camera.x + GAME_WIDTH - (this.x - window.game.camera.x);
          const mirrorY = window.game.camera.y + GAME_HEIGHT - (this.y - window.game.camera.y);
          const mdx = enemy.x - mirrorX;
          const mdy = enemy.y - mirrorY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < range + enemy.radius) enemy.takeDamage(damage);
        }
      }
      addWeaponActionEffect(window.game, weapon.id, 'loop', {
        x: this.x,
        y: this.y,
        size: Math.max(220, range * 3.15),
        life: pulseRate + 140,
        alpha: 0.72
      });
    }
  }

  _findNearestEnemy(range) {
    let nearest = null;
    let nearestDist = Infinity;
    for (const enemy of window.game.entityManager.getByType('enemy')) {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < range && dist < nearestDist) {
        nearest = enemy;
        nearestDist = dist;
      }
    }
    return nearest;
  }

  _spreadAngle(target, count, index, spread) {
    const base = target ? Math.atan2(target.y - this.y, target.x - this.x) : this.facingAngle;
    if (count <= 1) return base;
    return base - spread / 2 + (spread * index) / (count - 1);
  }

  _weaponDamage(def, weapon, evolutionDef, chargedTime = 0) {
    let damage = def.baseDamage || 10;
    if (weapon.level >= 3) damage *= 1.3;
    if (weapon.level >= 6) damage *= 1.3;
    if (evolutionDef?.baseDamageMultiplier) damage *= evolutionDef.baseDamageMultiplier;
    if (this.arcanaInventory?.has('hanged_man') && this.hp < this.maxHp * 0.5) damage *= 1.5;
    if (this.arcanaInventory?.has('empty_plate') && this.weaponInventory.getAll().length <= 4) damage *= 1.25;
    if (this.arcanaInventory?.has('hourglass')) {
      const charge = Math.min(0.6, (chargedTime / 1000) * 0.02);
      damage *= 1 + charge;
    }
    return Math.max(1, Math.floor(damage * this.powerMultiplier));
  }

  _weaponFireRate(def, weapon) {
    let rate = def.baseFireRate || 500;
    if (weapon.level >= 4) rate *= 0.85;
    if (weapon.level >= 8) rate *= 0.9;
    const priestess = window.game?.player?.arcanaInventory?.getCount('priestess') || 0;
    if (priestess > 0) rate /= Math.pow(1.5, priestess);
    return Math.max(120, rate / this.attackSpeedMultiplier);
  }

  _weaponRange(def, weapon) {
    let range = def.baseRange || 240;
    if (weapon.level >= 2) range *= 1.12;
    if (weapon.level >= 7) range *= 1.25;
    const emperor = window.game?.player?.arcanaInventory?.getCount('emperor') || 0;
    if (emperor > 0) range *= (1 + 0.6 * emperor);
    return range * this.areaMultiplier;
  }

  _weaponCount(def, weapon) {
    let count = def.baseCount || 1;
    if (weapon.level >= 2 && ['bounce', 'needle', 'spray'].includes(def.behavior)) count++;
    if (weapon.level >= 5) count++;
    if (weapon.level >= 8) count++;
    const gemini = window.game?.player?.arcanaInventory?.getCount('gemini') || 0;
    if (gemini > 0 && ['bounce', 'boomerang', 'orbit', 'needle', 'spray'].includes(def.behavior)) count += gemini;
    return Math.min(8, count);
  }

  _weaponPierce(def, weapon) {
    let pierce = def.basePierce || 0;
    if (weapon.level >= 5) pierce++;
    const fool = window.game?.player?.arcanaInventory?.getCount('fool') || 0;
    return pierce + fool;
  }

  startDash() {
    if (this.isDashing || this.dashCooldown > 0) return false;
    this.isDashing = true;
    this.dashDuration = this.dashDurationMax;
    this.dashCooldown = this.dashCooldownMax;
    this.dashDirX = Math.cos(this.facingAngle);
    this.dashDirY = Math.sin(this.facingAngle);
    this.invincibleTimer = this.dashDurationMax;
    return true;
  }

  triggerHitAnim() {
    if (this.anim.isPlaying('death')) return;
    if (!this.anim.play('hit', true)) return false;
    this._hitAnim = true;
    this._hitAnimTimer = 600;
    return true;
  }

  triggerSkillAnim(duration = 600) {
    if (this.anim.isPlaying('death')) return;
    if (!this.anim.play('skill', true)) return false;
    this._isUsingSkill = true;
    this._skillAnimTimer = duration;
    return true;
  }

  render(ctx) {
    if (this.isDashing) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(this.x - this.dashDirX * 15, this.y - this.dashDirY * 15, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#74c0fc';
      ctx.fill();
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.arc(this.x - this.dashDirX * 30, this.y - this.dashDirY * 30, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#74c0fc';
      ctx.fill();
      ctx.restore();
    }
    if (this.invincibleTimer > 0 && !this.isDashing && Math.floor(this.invincibleTimer / 60) % 2 === 0) return;

    const hasAnimSheets = Object.keys(this.anim.spriteSheets).length > 0;

    if (hasAnimSheets) {
      const size = this.radius * PLAYER_ANIM_SIZE_MULTIPLIER;
      const drawX = this.x - size / 2;
      const drawY = this.y - size / 2;
      this.anim.render(ctx, drawX, drawY, size, false);
    } else if (this.sprite) {
      const isReady = this.sprite instanceof HTMLCanvasElement ||
                      (this.sprite.complete && this.sprite.naturalWidth > 0);
      if (isReady) {
        const size = this.radius * PLAYER_STATIC_SIZE_MULTIPLIER;
        ctx.drawImage(this.sprite, this.x - size / 2, this.y - size / 2, size, size);
      }
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#4dabf7';
      ctx.fill();
      ctx.strokeStyle = '#228be6';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

function cloneInventoryPlain(value) {
  return JSON.parse(JSON.stringify(value));
}


// --- entities/enemy.js ---






class Enemy extends Entity {
  constructor(x, y, data, enemyType = 'common') {
    super(x, y, 16);
    this.type = 'enemy';
    this.enemyType = enemyType;
    this.data = data;
    this.hp = data.hp;
    this.maxHp = data.hp;
    this.atk = data.atk;
    this.speed = data.speed;
    this.moveType = data.moveType;
    this.target = null;
    this.zigzagTimer = 0;
    this.zigzagDir = 1;
    this.rushTimer = 0;
    this.rushing = false;
    this.jumpTimer = 0;
    this.jumping = false;
    this.bossTeleportTimer = 0;
    this.hitFlash = 0;
    this.frozenTimer = 0;
    this.spriteKey = data.id;
    this._isMovingFrame = false;
  }

  getColor() {
    let color = '#ff6b6b';
    if (this.data.id.includes('zombie') || this.data.id.includes('golem')) color = '#8b5a2b';
    if (this.data.id.includes('ghost') || this.data.id.includes('poltergeist')) color = '#a9a9a9';
    if (this.data.id.includes('robot')) color = '#74c0fc';
    if (this.data.id === 'health_inspector') color = '#ffd43b';
    return color;
  }

  setTarget(target) { this.target = target; }

  update(dt) {
    this._isMovingFrame = false;
    if (!this.target || !this.target.active) return;
    if (this.frozenTimer > 0) {
      this.frozenTimer -= dt;
      return;
    }
    const dx = this.target.x - this.x;
    const dy = this.target.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1) return;
    let vx = 0, vy = 0;
    switch (this.moveType) {
      case 'dash':
        vx = (dx / dist) * this.speed;
        vy = (dy / dist) * this.speed;
        break;
      case 'zigzag':
        this.zigzagTimer += dt;
        const angle = Math.atan2(dy, dx) + Math.sin(this.zigzagTimer * 0.005) * 0.8;
        vx = Math.cos(angle) * this.speed;
        vy = Math.sin(angle) * this.speed;
        break;
      case 'wander':
        this.zigzagTimer += dt;
        const wanderAngle = Math.atan2(dy, dx) + Math.sin(this.zigzagTimer * 0.003) * 1.2;
        vx = Math.cos(wanderAngle) * this.speed;
        vy = Math.sin(wanderAngle) * this.speed;
        break;
      case 'jump':
        this.jumpTimer += dt;
        if (!this.jumping && this.jumpTimer > 1500) {
          this.jumping = true;
          this.jumpTimer = 0;
        }
        if (this.jumping) {
          vx = (dx / dist) * this.speed * 2.5;
          vy = (dy / dist) * this.speed * 2.5;
          if (this.jumpTimer > 400) { this.jumping = false; this.jumpTimer = 0; }
        } else {
          vx = (dx / dist) * this.speed * 0.3;
          vy = (dy / dist) * this.speed * 0.3;
        }
        break;
      case 'rush':
        this.rushTimer += dt;
        if (!this.rushing && this.rushTimer > 3000) {
          this.rushing = true;
          this.rushTimer = 0;
        }
        if (this.rushing) {
          vx = (dx / dist) * this.speed * 3;
          vy = (dy / dist) * this.speed * 3;
          if (this.rushTimer > 500) { this.rushing = false; this.rushTimer = 0; }
        } else {
          vx = (dx / dist) * this.speed * 0.2;
          vy = (dy / dist) * this.speed * 0.2;
        }
        break;
      case 'slow':
        vx = (dx / dist) * this.speed;
        vy = (dy / dist) * this.speed;
        break;
      case 'float':
        this.zigzagTimer += dt;
        const floatAngle = Math.atan2(dy, dx) + Math.sin(this.zigzagTimer * 0.002) * 0.5;
        vx = Math.cos(floatAngle) * this.speed;
        vy = Math.sin(floatAngle) * this.speed;
        break;
      case 'charge':
        this.rushTimer += dt;
        if (this.rushTimer > 2000) {
          vx = (dx / dist) * this.speed * 2;
          vy = (dy / dist) * this.speed * 2;
          if (this.rushTimer > 2500) this.rushTimer = 0;
        } else {
          vx = (dx / dist) * this.speed * 0.5;
          vy = (dy / dist) * this.speed * 0.5;
        }
        break;
      case 'boss':
        this.bossTeleportTimer += dt;
        if (this.bossTeleportTimer > 10000) {
          const tAngle = Math.random() * Math.PI * 2;
          const tDist = 150 + Math.random() * 100;
          this.x = this.target.x + Math.cos(tAngle) * tDist;
          this.y = this.target.y + Math.sin(tAngle) * tDist;
          this.bossTeleportTimer = 0;
        } else {
          vx = (dx / dist) * this.speed;
          vy = (dy / dist) * this.speed;
        }
        break;
      default:
        vx = (dx / dist) * this.speed;
        vy = (dy / dist) * this.speed;
    }
    this._isMovingFrame = Math.abs(vx) + Math.abs(vy) > 0.0001;
    this.x += vx * dt;
    this.y += vy * dt;
    const bounds = window.game?.mapBounds || { minX: 0, minY: 0, maxX: GAME_WIDTH, maxY: GAME_HEIGHT };
    this.x = Math.max(bounds.minX + this.radius, Math.min(bounds.maxX - this.radius, this.x));
    this.y = Math.max(bounds.minY + this.radius, Math.min(bounds.maxY - this.radius, this.y));
  }

  takeDamage(amount) {
    this.hp -= amount;
    this.hitFlash = 100;
    if (window.game) window.game.addDamageNumber(this.x, this.y - this.radius, amount);
    if (this.hp <= 0) {
      this.active = false;
      if (window.game && window.game.player) window.game.player.kills++;
      if (window.game) {
        if (!window.game.runEnemyKills) window.game.runEnemyKills = {};
        if (this.data?.id) {
          window.game.runEnemyKills[this.data.id] = (window.game.runEnemyKills[this.data.id] || 0) + 1;
        }
        if (window.game.juice) window.game.juice.recordKill(this.enemyType);
        let pts = 1;
        if (this.enemyType === 'elite') pts = 10;
        else if (this.enemyType === 'boss') pts = 100;
        window.game.score += pts;
      }
      if (window.game) window.game.addDeathExplosion(this.x, this.y, this.getColor());
      if (window.game?.player?.arcanaInventory?.has('banquet') && Math.random() < 0.03) {
        window.game.entityManager.add(new DropItem(this.x, this.y, DROP_ITEMS.chicken_leg));
      }
      if (this.data && this.data.deathQuote) {
        let shouldShow = this.enemyType !== 'common' || Math.random() < 0.1;
        if (shouldShow) window.game.showDeathQuote(this.x, this.y, this.data.deathQuote);
      }
      if (this.enemyType === 'boss' && window.game) {
        window.game.victory();
      }
      this._spawnDrops();
    }
  }

  _spawnDrops() {
    const rng = Math.random();
    const x = this.x, y = this.y;
    if (this.enemyType === 'common') {
      if (rng < 0.72) {
        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
          const ddx = (Math.random() - 0.5) * 30, ddy = (Math.random() - 0.5) * 30;
          window.game.entityManager.add(new DropItem(x + ddx, y + ddy, DROP_ITEMS.green_candy));
        }
      } else if (rng < 0.90) {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.coin));
      } else if (rng < 0.98) {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.chicken_leg));
      } else if (rng < 0.995) {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.red_candy));
      } else {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.lunchbox));
      }
    } else if (this.enemyType === 'elite') {
      window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.lunchbox));
      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const ddx = (Math.random() - 0.5) * 30, ddy = (Math.random() - 0.5) * 30;
        window.game.entityManager.add(new DropItem(x + ddx, y + ddy, rng < 0.55 ? DROP_ITEMS.red_candy : DROP_ITEMS.coin));
      }
    } else if (this.enemyType === 'boss') {
      const redCount = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < redCount; i++) {
        const a = (Math.PI * 2 * i) / redCount, d = 20 + Math.random() * 40;
        window.game.entityManager.add(new DropItem(x + Math.cos(a) * d, y + Math.sin(a) * d, DROP_ITEMS.red_candy));
      }
      const lunchCount = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < lunchCount; i++) {
        const a = (Math.PI * 2 * i) / lunchCount + 0.5, d = 30 + Math.random() * 30;
        window.game.entityManager.add(new DropItem(x + Math.cos(a) * d, y + Math.sin(a) * d, DROP_ITEMS.lunchbox));
      }
      for (let i = 0; i < 2; i++) {
        const a = (Math.PI * 2 * i) / 2 + 1, d = 25 + Math.random() * 25;
        window.game.entityManager.add(new DropItem(x + Math.cos(a) * d, y + Math.sin(a) * d, DROP_ITEMS.whole_chicken));
      }
      if (Math.random() < 0.35) {
        window.game.entityManager.add(new DropItem(x, y, DROP_ITEMS.vip_card));
      }
    }
  }

  render(ctx) {
    const hpRatio = this.hp / this.maxHp;
    const size = this.radius * 2.5;
    const sprite = this._getAnimationFrame() || (this.spriteKey ? ENEMY_SPRITES[this.spriteKey] : null);
    const glowColor = this.enemyType === 'boss' ? '#ffd43b' : (this.enemyType === 'elite' ? '#cc5de8' : '#ff6b6b');
    ctx.save();
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = this.enemyType === 'boss' ? 18 : (this.enemyType === 'elite' ? 12 : 6);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fill();
    ctx.restore();
    if (sprite) {
      const isReady = sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0);
      if (isReady) {
        if (this.hitFlash > 0) {
          ctx.save();
          ctx.globalAlpha = 0.4;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          this.hitFlash -= 2;
        }
        ctx.drawImage(sprite, this.x - size / 2, this.y - size / 2, size, size);
      } else {
        this._drawCircle(ctx, size);
      }
    } else {
      this._drawCircle(ctx, size);
    }
    if (this.maxHp > 100) {
      const barW = this.radius * 2.5, barH = 4;
      const barX = this.x - barW / 2, barY = this.y - size / 2 - 8;
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = hpRatio > 0.5 ? '#69db7c' : (hpRatio > 0.25 ? '#ffd43b' : '#ff6b6b');
      ctx.fillRect(barX, barY, barW * hpRatio, barH);
    }
  }

  _drawCircle(ctx, size) {
    let color = this.getColor();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (this.hitFlash > 0) {
      ctx.fillStyle = '#ffffff';
      this.hitFlash -= 2;
    } else {
      ctx.fillStyle = color;
    }
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  _getAnimationFrame() {
    if (!this.spriteKey) return null;
    const action = resolveEnemyAnimationAction({
      active: this.active,
      isMoving: this._isMovingFrame,
      hitFlash: this.hitFlash
    });
    const frames = ENEMY_ANIM_SHEETS[this.spriteKey]?.[action];
    if (!Array.isArray(frames) || frames.length === 0) return null;
    const frameDuration = action === 'hit' ? 70 : 130;
    const index = Math.floor(performance.now() / frameDuration) % frames.length;
    const frame = frames[index];
    const ready = frame instanceof HTMLCanvasElement || (frame && frame.complete && frame.naturalWidth > 0);
    return ready ? frame : null;
  }
}


// --- systems/audio.js ---




class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.musicGain = null;
    this.currentMusic = null;
    this.musicVolume = 0.3;
    this.sfxVolume = 0.5;
    this.initialized = false;
    this._musicPlaying = false;
    this._musicTrack = null;
    this._pendingTrack = null;
    this._musicNodes = [];
    this._musicTimers = [];
    this._musicMasterGain = null;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = this.sfxVolume;
      this.sfxGain.connect(this.masterGain);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.musicVolume;
      this.musicGain.connect(this.masterGain);
      this.initialized = true;
    } catch (e) {
      console.warn('AudioContext not available');
    }
  }

  _ensureCtx() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  playTone(freq, type, duration, volume) {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(Math.min(volume, 1), this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  }

  playShoot() {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playHit() { this.playTone(800, 'square', 0.05, 0.15); }

  playPickup() {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playExpPickup() {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playLevelUp() {
    this._ensureCtx();
    if (!this.ctx) return;
    const notes = [523, 659, 784];
    for (let i = 0; i < notes.length; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const t = this.ctx.currentTime + i * 0.12;
      osc.frequency.setValueAtTime(notes[i], t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.3);
    }
  }

  playDamage() { this.playTone(150, 'sawtooth', 0.2, 0.2); }

  playDeath() {
    this._ensureCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.5);
  }

  playBossWarning() {
    this._ensureCtx();
    if (!this.ctx) return;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = 150;
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime + i * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.3 + 0.2);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(this.ctx.currentTime + i * 0.3);
      osc.stop(this.ctx.currentTime + i * 0.3 + 0.2);
    }
  }

  playMenuClick() { this.playTone(660, 'sine', 0.06, 0.08); }

  startMusic(track) {
    if (!this.initialized) {
      this._pendingTrack = track;
      this.init();
      return;
    }
    this._ensureCtx();
    if (!this.ctx) return;
    if (this._musicTrack === track && this._musicPlaying) return;
    this.stopMusic();
    this._musicTrack = track;
    this._musicPlaying = true;
    this._musicNodes = [];
    this._musicTimers = [];

    const ctx = this.ctx;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.3);
    masterGain.connect(this.musicGain);
    this._musicMasterGain = masterGain;
    this._musicNodes.push(masterGain);

    if (track === 'intro') playIntroMusic(ctx, masterGain, this._musicNodes, this._scheduleLoop.bind(this));
    else if (track === 'menu') playMenuMusic(ctx, masterGain, this._musicNodes, this._scheduleLoop.bind(this));
    else if (track === 'game') playGameMusic(ctx, masterGain, this._musicNodes, this._scheduleLoop.bind(this));
    else if (track === 'boss') playBossMusic(ctx, masterGain, this._musicNodes, this._scheduleLoop.bind(this));
  }

  stopMusic() {
    this._musicPlaying = false;
    this._musicTrack = null;
    this._pendingTrack = null;
    if (this._musicTimers) {
      this._musicTimers.forEach(t => clearTimeout(t));
      this._musicTimers = [];
    }
    if (this._musicMasterGain && this.ctx) {
      try {
        this._musicMasterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
        const nodes = this._musicNodes;
        setTimeout(() => { nodes.forEach(n => { try { n.disconnect(); } catch(e){} }); }, 600);
      } catch(e) {}
    }
    this._musicNodes = [];
  }

  _scheduleLoop(ctx, masterGain, buildFn, interval) {
    const play = () => {
      if (!this._musicPlaying) return;
      buildFn(ctx, masterGain);
      if (this._musicNodes.length > 200) this._musicNodes = this._musicNodes.slice(-50);
      if (this._musicTimers.length > 100) this._musicTimers = this._musicTimers.slice(-20);
      const timer = setTimeout(play, interval);
      this._musicTimers.push(timer);
    };
    play();
  }

  setMusicVolume(v) {
    this.musicVolume = v;
    if (this.musicGain) this.musicGain.gain.value = v;
  }

  setSfxVolume(v) {
    this.sfxVolume = v;
    if (this.sfxGain) this.sfxGain.gain.value = v;
  }

  get masterVolume() { return this.masterGain ? this.masterGain.gain.value : 1; }
  set masterVolume(v) { if (this.masterGain) this.masterGain.gain.value = v; }

  unlock() {
    this._ensureCtx();
    if (this._pendingTrack) {
      this.startMusic(this._pendingTrack);
      this._pendingTrack = null;
    }
  }
}


// --- systems/music-intro.js ---
function playIntroMusic(ctx, masterGain, nodes, scheduleLoop) {
  const reverb = ctx.createConvolver();
  const reverbLen = ctx.sampleRate * 2;
  const reverbBuf = ctx.createBuffer(2, reverbLen, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = reverbBuf.getChannelData(ch);
    for (let i = 0; i < reverbLen; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLen, 2.5);
  }
  reverb.buffer = reverbBuf;
  const reverbGain = ctx.createGain();
  reverbGain.gain.value = 0.4;
  reverb.connect(reverbGain);
  reverbGain.connect(masterGain);
  nodes.push(reverb, reverbGain);

  const melody = [130.81, 146.83, 155.56, 174.61, 196.00, 207.65, 233.08, 261.63,
                  233.08, 207.65, 196.00, 174.61, 155.56, 146.83, 130.81, 116.54];
  const bass = [65.41, 73.42, 77.78, 87.31, 98.00, 103.83, 116.54, 130.81];
  let step = 0;

  scheduleLoop(ctx, masterGain, (ctx, mg) => {
    const now = ctx.currentTime;
    const pad = ctx.createOscillator();
    const padGain = ctx.createGain();
    pad.type = 'sine';
    pad.frequency.setValueAtTime(melody[step % melody.length], now);
    padGain.gain.setValueAtTime(0.35, now);
    padGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    pad.connect(padGain);
    padGain.connect(mg);
    padGain.connect(reverb);
    pad.start(now);
    pad.stop(now + 1.8);
    nodes.push(pad, padGain);

    if (step % 2 === 0) {
      const b = ctx.createOscillator();
      const bGain = ctx.createGain();
      b.type = 'triangle';
      b.frequency.setValueAtTime(bass[(step / 2 | 0) % bass.length], now);
      bGain.gain.setValueAtTime(0.28, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      b.connect(bGain);
      bGain.connect(mg);
      b.start(now);
      b.stop(now + 2.5);
      nodes.push(b, bGain);
    }

    if (step % 4 === 0) {
      const choir = ctx.createOscillator();
      const choirGain = ctx.createGain();
      choir.type = 'sine';
      choir.frequency.setValueAtTime(melody[step % melody.length] * 2, now);
      choir.frequency.linearRampToValueAtTime(melody[step % melody.length] * 1.5, now + 2);
      choirGain.gain.setValueAtTime(0.15, now);
      choirGain.gain.exponentialRampToValueAtTime(0.001, now + 2);
      choir.connect(choirGain);
      choirGain.connect(reverb);
      choir.start(now);
      choir.stop(now + 2);
      nodes.push(choir, choirGain);
    }
    step++;
  }, 1200);
}


// --- systems/music-menu.js ---
function playMenuMusic(ctx, masterGain, nodes, scheduleLoop) {
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 800;
  filter.Q.value = 2;
  const filterGain = ctx.createGain();
  filterGain.gain.value = 0.7;
  filter.connect(filterGain);
  filterGain.connect(masterGain);
  nodes.push(filter, filterGain);

  const melody = [196.00, 220.00, 233.08, 261.63, 293.66, 261.63, 233.08, 220.00,
                  196.00, 174.61, 164.81, 146.83, 130.81, 146.83, 164.81, 174.61];
  const bassLine = [98.00, 110.00, 116.54, 130.81, 146.83, 130.81, 116.54, 110.00];
  const waltz = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];
  let step = 0;

  scheduleLoop(ctx, masterGain, (ctx, mg) => {
    const now = ctx.currentTime;
    const m = ctx.createOscillator();
    const mGain = ctx.createGain();
    m.type = 'sine';
    m.frequency.setValueAtTime(melody[step % melody.length], now);
    mGain.gain.setValueAtTime(0.3, now);
    mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    m.connect(mGain);
    mGain.connect(mg);
    m.start(now);
    m.stop(now + 0.6);
    nodes.push(m, mGain);

    if (step % 2 === 0) {
      const b = ctx.createOscillator();
      const bGain = ctx.createGain();
      b.type = 'triangle';
      b.frequency.setValueAtTime(bassLine[(step / 2 | 0) % bassLine.length], now);
      bGain.gain.setValueAtTime(0.22, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      b.connect(bGain);
      bGain.connect(mg);
      b.start(now);
      b.stop(now + 0.8);
      nodes.push(b, bGain);
    }

    if (waltz[step % waltz.length]) {
      const perc = ctx.createOscillator();
      const pGain = ctx.createGain();
      perc.type = 'square';
      perc.frequency.setValueAtTime(80, now);
      pGain.gain.setValueAtTime(0.12, now);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      perc.connect(pGain);
      pGain.connect(filter);
      perc.start(now);
      perc.stop(now + 0.08);
      nodes.push(perc, pGain);
    }

    if (step % 8 === 0) {
      const harm = ctx.createOscillator();
      const hGain = ctx.createGain();
      harm.type = 'sine';
      harm.frequency.setValueAtTime(melody[step % melody.length] * 1.5, now);
      hGain.gain.setValueAtTime(0.1, now);
      hGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      harm.connect(hGain);
      hGain.connect(mg);
      harm.start(now);
      harm.stop(now + 1.5);
      nodes.push(harm, hGain);
    }
    step++;
  }, 400);
}


// --- systems/music-game.js ---
function playGameMusic(ctx, masterGain, nodes, scheduleLoop) {
  const compFilter = ctx.createBiquadFilter();
  compFilter.type = 'lowpass';
  compFilter.frequency.value = 1200;
  compFilter.Q.value = 1;
  const compGain = ctx.createGain();
  compGain.gain.value = 0.5;
  compFilter.connect(compGain);
  compGain.connect(masterGain);
  nodes.push(compFilter, compGain);

  const melody = [329.63, 349.23, 392.00, 440.00, 493.88, 440.00, 392.00, 349.23,
                  329.63, 293.66, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00];
  const bassLine = [82.41, 87.31, 98.00, 110.00, 123.47, 110.00, 98.00, 87.31];
  const arp = [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0];
  let step = 0;

  scheduleLoop(ctx, masterGain, (ctx, mg) => {
    const now = ctx.currentTime;
    const m = ctx.createOscillator();
    const mGain = ctx.createGain();
    m.type = 'sawtooth';
    m.frequency.setValueAtTime(melody[step % melody.length], now);
    mGain.gain.setValueAtTime(0.16, now);
    mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    m.connect(mGain);
    mGain.connect(compFilter);
    m.start(now);
    m.stop(now + 0.35);
    nodes.push(m, mGain);

    if (step % 4 === 0) {
      const b = ctx.createOscillator();
      const bGain = ctx.createGain();
      b.type = 'square';
      b.frequency.setValueAtTime(bassLine[(step / 4 | 0) % bassLine.length], now);
      bGain.gain.setValueAtTime(0.18, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      b.connect(bGain);
      bGain.connect(mg);
      b.start(now);
      b.stop(now + 0.3);
      nodes.push(b, bGain);
    }

    if (arp[step % arp.length]) {
      const a = ctx.createOscillator();
      const aGain = ctx.createGain();
      a.type = 'square';
      a.frequency.setValueAtTime(melody[step % melody.length] * 2, now);
      aGain.gain.setValueAtTime(0.1, now);
      aGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      a.connect(aGain);
      aGain.connect(compFilter);
      a.start(now);
      a.stop(now + 0.1);
      nodes.push(a, aGain);
    }

    if (step % 8 === 0) {
      const kick = ctx.createOscillator();
      const kGain = ctx.createGain();
      kick.type = 'sine';
      kick.frequency.setValueAtTime(150, now);
      kick.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      kGain.gain.setValueAtTime(0.35, now);
      kGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      kick.connect(kGain);
      kGain.connect(mg);
      kick.start(now);
      kick.stop(now + 0.15);
      nodes.push(kick, kGain);
    }

    if (step % 8 === 4) {
      const snare = ctx.createOscillator();
      const sGain = ctx.createGain();
      snare.type = 'triangle';
      snare.frequency.setValueAtTime(200, now);
      sGain.gain.setValueAtTime(0.14, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      snare.connect(sGain);
      sGain.connect(compFilter);
      snare.start(now);
      snare.stop(now + 0.08);
      nodes.push(snare, sGain);
    }
    step++;
  }, 200);
}


// --- systems/music-boss.js ---
function playBossMusic(ctx, masterGain, nodes, scheduleLoop) {
  const distortion = ctx.createWaveShaper();
  const distCurve = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const x = (i * 2) / 256 - 1;
    distCurve[i] = (Math.PI + 4) * x / (Math.PI + 4 * Math.abs(x));
  }
  distortion.curve = distCurve;
  const distGain = ctx.createGain();
  distGain.gain.value = 0.6;
  distortion.connect(distGain);
  distGain.connect(masterGain);
  nodes.push(distortion, distGain);

  const subFilter = ctx.createBiquadFilter();
  subFilter.type = 'lowpass';
  subFilter.frequency.value = 300;
  subFilter.Q.value = 5;
  const subGain = ctx.createGain();
  subGain.gain.value = 0.8;
  subFilter.connect(subGain);
  subGain.connect(masterGain);
  nodes.push(subFilter, subGain);

  const melody = [146.83, 155.56, 174.61, 164.81, 146.83, 130.81, 123.47, 116.54,
                  130.81, 146.83, 155.56, 174.61, 196.00, 185.00, 174.61, 155.56];
  const bassLine = [36.71, 41.20, 43.65, 49.00, 55.00, 49.00, 43.65, 41.20];
  const alarm = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
  let step = 0;

  scheduleLoop(ctx, masterGain, (ctx, mg) => {
    const now = ctx.currentTime;
    const m = ctx.createOscillator();
    const mGain = ctx.createGain();
    m.type = 'sawtooth';
    m.frequency.setValueAtTime(melody[step % melody.length], now);
    mGain.gain.setValueAtTime(0.22, now);
    mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    m.connect(mGain);
    mGain.connect(distortion);
    m.start(now);
    m.stop(now + 0.25);
    nodes.push(m, mGain);

    if (step % 2 === 0) {
      const b = ctx.createOscillator();
      const bGain = ctx.createGain();
      b.type = 'square';
      b.frequency.setValueAtTime(bassLine[(step / 2 | 0) % bassLine.length], now);
      bGain.gain.setValueAtTime(0.3, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      b.connect(bGain);
      bGain.connect(subFilter);
      b.start(now);
      b.stop(now + 0.4);
      nodes.push(b, bGain);
    }

    if (step % 4 === 0) {
      const sub = ctx.createOscillator();
      const subG = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(bassLine[(step / 4 | 0) % bassLine.length] / 2, now);
      subG.gain.setValueAtTime(0.4, now);
      subG.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      sub.connect(subG);
      subG.connect(mg);
      sub.start(now);
      sub.stop(now + 0.5);
      nodes.push(sub, subG);
    }

    if (step % 8 === 0) {
      const impact = ctx.createOscillator();
      const iGain = ctx.createGain();
      impact.type = 'sine';
      impact.frequency.setValueAtTime(80, now);
      impact.frequency.exponentialRampToValueAtTime(20, now + 0.3);
      iGain.gain.setValueAtTime(0.5, now);
      iGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      impact.connect(iGain);
      iGain.connect(mg);
      impact.start(now);
      impact.stop(now + 0.35);
      nodes.push(impact, iGain);
    }

    if (step % 8 === 4) {
      const snare = ctx.createOscillator();
      const sGain = ctx.createGain();
      snare.type = 'triangle';
      snare.frequency.setValueAtTime(300, now);
      snare.frequency.exponentialRampToValueAtTime(100, now + 0.06);
      sGain.gain.setValueAtTime(0.2, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      snare.connect(sGain);
      sGain.connect(distortion);
      snare.start(now);
      snare.stop(now + 0.08);
      nodes.push(snare, sGain);
    }

    if (alarm[step % alarm.length]) {
      const a = ctx.createOscillator();
      const aGain = ctx.createGain();
      a.type = 'square';
      a.frequency.setValueAtTime(880, now);
      a.frequency.setValueAtTime(660, now + 0.05);
      aGain.gain.setValueAtTime(0.08, now);
      aGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      a.connect(aGain);
      aGain.connect(distortion);
      a.start(now);
      a.stop(now + 0.1);
      nodes.push(a, aGain);
    }

    if (step % 16 === 0) {
      const choir = ctx.createOscillator();
      const cGain = ctx.createGain();
      choir.type = 'sine';
      choir.frequency.setValueAtTime(melody[step % melody.length] * 0.5, now);
      choir.frequency.linearRampToValueAtTime(melody[step % melody.length] * 0.75, now + 2);
      cGain.gain.setValueAtTime(0.12, now);
      cGain.gain.exponentialRampToValueAtTime(0.001, now + 2);
      choir.connect(cGain);
      cGain.connect(mg);
      choir.start(now);
      choir.stop(now + 2);
      nodes.push(choir, cGain);
    }
    step++;
  }, 150);
}


// --- systems/camera.js ---

class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.smoothing = 0.08;
  }

  follow(target) {
    const targetX = target.x - GAME_WIDTH / 2;
    const targetY = target.y - GAME_HEIGHT / 2;
    this.x += (targetX - this.x) * this.smoothing;
    this.y += (targetY - this.y) * this.smoothing;
    const bounds = window.game?.mapBounds;
    if (bounds) {
      this.x = Math.max(bounds.minX, Math.min(bounds.maxX - GAME_WIDTH, this.x));
      this.y = Math.max(bounds.minY, Math.min(bounds.maxY - GAME_HEIGHT, this.y));
    }
  }

  apply(ctx) {
    ctx.translate(-this.x, -this.y);
  }

  screenToWorld(sx, sy) {
    return { x: sx + this.x, y: sy + this.y };
  }

  worldToScreen(wx, wy) {
    return { x: wx - this.x, y: wy - this.y };
  }
}

class CameraShake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.intensity = 0;
    this.duration = 0;
    this.timer = 0;
  }

  shake(intensity, duration) {
    this.intensity = intensity;
    this.duration = duration;
    this.timer = duration;
  }

  update(dt) {
    if (this.timer > 0) {
      this.timer -= dt;
      const progress = this.timer / this.duration;
      const currentIntensity = this.intensity * progress;
      this.x = (Math.random() - 0.5) * 2 * currentIntensity;
      this.y = (Math.random() - 0.5) * 2 * currentIntensity;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
}

class GestureHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.joystick = null;
    this.joystickActive = false;
    this.joystickOrigin = null;
    this.joystickPos = null;
    this.joystickRadius = 50;
    this._bound = false;
  }

  bind() {
    if (this._bound) return;
    this._bound = true;
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
        if (x < GAME_WIDTH / 2) {
          this.joystickActive = true;
          this.joystickOrigin = { x, y };
          this.joystickPos = { x, y };
        }
      }
    }, { passive: true });
    this.canvas.addEventListener('touchmove', (e) => {
      if (this.joystickActive && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (touch.clientY - rect.top) * (this.canvas.height / rect.height);
        this.joystickPos = { x, y };
      }
    }, { passive: true });
    this.canvas.addEventListener('touchend', () => {
      this.joystickActive = false;
      this.joystickOrigin = null;
      this.joystickPos = null;
    }, { passive: true });
  }

  getDirection() {
    if (!this.joystickActive || !this.joystickOrigin || !this.joystickPos) return { x: 0, y: 0 };
    const dx = this.joystickPos.x - this.joystickOrigin.x;
    const dy = this.joystickPos.y - this.joystickOrigin.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 5) return { x: 0, y: 0 };
    const clampedDist = Math.min(dist, this.joystickRadius);
    return { x: (dx / dist) * (clampedDist / this.joystickRadius), y: (dy / dist) * (clampedDist / this.joystickRadius) };
  }

  render(ctx) {
    if (!this.joystickActive || !this.joystickOrigin) return;
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.arc(this.joystickOrigin.x, this.joystickOrigin.y, this.joystickRadius, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    if (this.joystickPos) {
      const dx = this.joystickPos.x - this.joystickOrigin.x;
      const dy = this.joystickPos.y - this.joystickOrigin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clampedDist = Math.min(dist, this.joystickRadius);
      const nx = dist > 0 ? (dx / dist) * clampedDist + this.joystickOrigin.x : this.joystickOrigin.x;
      const ny = dist > 0 ? (dy / dist) * clampedDist + this.joystickOrigin.y : this.joystickOrigin.y;
      ctx.beginPath();
      ctx.arc(nx, ny, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
    ctx.restore();
  }
}


// --- systems/entity-manager.js ---

class EntityManager {
  constructor() {
    this.entities = [];
  }

  add(entity) {
    this.entities.push(entity);
  }

  remove(entity) {
    entity.active = false;
  }

  getAll() {
    return this.entities.filter(e => e.active);
  }

  getByType(type) {
    return this.entities.filter(e => e.active && e.type === type);
  }

  update(dt, game) {
    for (let i = this.entities.length - 1; i >= 0; i--) {
      const e = this.entities[i];
      if (!e.active) {
        this.entities.splice(i, 1);
        continue;
      }
      if (e.type === 'drop') {
        const result = e.update(dt, game.player);
        if (result) {
          game.handleDropPickup(result);
          e.active = false;
          this.entities.splice(i, 1);
          continue;
        }
      } else if (e.type === 'whip_slash') {
        e.update(dt, this);
        if (!e.active) {
          this.entities.splice(i, 1);
          continue;
        }
      } else {
        e.update(dt, game);
      }
    }
    this._checkCollisions(game);
  }

  _checkCollisions(game) {
    const enemies = this.getByType('enemy');
    const projectiles = this.getByType('projectile');
    const player = game.player;

    for (const proj of projectiles) {
      if (!proj.active) continue;
      for (const enemy of enemies) {
        if (!enemy.active) continue;
        if (proj.hitEnemies?.has(enemy)) continue;
        const dx = proj.x - enemy.x;
        const dy = proj.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < proj.radius + enemy.radius) {
          enemy.takeDamage(proj.damage);
          if (!proj.hitEnemies) proj.hitEnemies = new Set();
          if (typeof proj.handleHit === 'function') {
            proj.handleHit(enemy, enemies, game);
          } else if (proj.pierceLeft !== undefined && proj.pierceLeft > 0) {
            proj.hitEnemies.add(enemy);
            proj.pierceLeft--;
          } else {
            proj.active = false;
          }
          break;
        }
      }
    }

    if (player && player.active) {
      for (const enemy of enemies) {
        if (!enemy.active) continue;
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < player.radius + enemy.radius) {
          if (player.invincibleTimer <= 0) {
            const armor = player.getArmor ? player.getArmor() : 0;
            let damage = Math.max(1, enemy.atk - armor);
            if (player.arcanaInventory?.has('priestess')) damage = Math.ceil(damage * 1.2);
            if (player.shield > 0) {
              const absorbed = Math.min(player.shield, damage);
              player.shield -= absorbed;
              damage -= absorbed;
              reduceShieldLayer(player, absorbed);
            }
            const cloakState = player.functionalState?.michelin_cloak;
            if (cloakState && cloakState.layers >= 3 && enemy.takeDamage) {
              enemy.takeDamage(Math.max(8, Math.floor(enemy.atk * 1.2)));
            }
            player.hp -= damage;
            player.invincibleTimer = 500;
            player.triggerHitAnim();
            game.cameraShake.shake(5, 200);
            game.audio.playHit();
            if (player.hp <= 0) {
              if (player.revivals > 0) {
                player.revivals--;
                player.hp = Math.max(1, Math.floor(player.maxHp * 0.5));
                player.invincibleTimer = 1600;
                game.cameraShake.shake(10, 260);
                return;
              }
              if (consumeMichelinDeathPrevent(player)) {
                addFunctionalActionEffect(game, 'michelin_cloak', 'revive', { size: 340, life: 760 });
                return;
              }
              player.hp = 0;
              player.active = false;
              player.anim.play('death', true);
              game.gameOver();
            }
          }
        }
      }
    }
  }

  render(ctx) {
    const drops = [];
    const enemies = [];
    const projectiles = [];
    const slashes = [];
    const others = [];

    for (const e of this.entities) {
      if (!e.active) continue;
      if (e.type === 'drop') drops.push(e);
      else if (e.type === 'enemy') enemies.push(e);
      else if (e.type === 'projectile') projectiles.push(e);
      else if (e.type === 'whip_slash') slashes.push(e);
      else others.push(e);
    }

    drops.forEach(e => e.render(ctx));
    slashes.forEach(e => e.render(ctx));
    projectiles.forEach(e => e.render(ctx));
    enemies.forEach(e => e.render(ctx));
    others.forEach(e => e.render(ctx));
  }

  clear() {
    this.entities = [];
  }

  count() {
    return this.entities.filter(e => e.active).length;
  }
}

function reduceShieldLayer(player, absorbed) {
  if (!player.functionalState || absorbed <= 0) return;
  for (const id of ['thermal_bag', 'michelin_cloak']) {
    const state = player.functionalState[id];
    if (!state || state.layers <= 0) continue;
    const perLayer = id === 'michelin_cloak' ? 90 : 55;
    state.layers = Math.max(0, Math.ceil((player.shield || 0) / perLayer));
  }
}


// --- systems/input.js ---
class InputManager {
  constructor() {
    this.keys = {};
    this.dir = { x: 0, y: 0 };
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.wheelDelta = 0;
    this._bound = false;
    this._game = null;
  }

  bind(canvas, game) {
    if (this._bound) return;
    this._bound = true;
    this._game = game;
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      this._updateDir();
    });
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      this._updateDir();
    });
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      this.mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
    });
    canvas.addEventListener('mousedown', () => { this.mouseDown = true; });
    canvas.addEventListener('mouseup', () => { this.mouseDown = false; });
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.wheelDelta += Math.sign(e.deltaY);
    }, { passive: false });
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      this.mouseX = (touch.clientX - rect.left) * (canvas.width / rect.width);
      this.mouseY = (touch.clientY - rect.top) * (canvas.height / rect.height);
      this.mouseDown = true;
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      this.mouseX = (touch.clientX - rect.left) * (canvas.width / rect.width);
      this.mouseY = (touch.clientY - rect.top) * (canvas.height / rect.height);
    }, { passive: false });
    canvas.addEventListener('touchend', () => { this.mouseDown = false; });
  }

  _updateDir() {
    let x = 0, y = 0;
    if (this.keys['KeyW'] || this.keys['ArrowUp']) y -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) y += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) x -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) x += 1;
    const len = Math.sqrt(x * x + y * y);
    if (len > 0) { x /= len; y /= len; }
    this.dir = { x, y };
  }

  getDirection() {
    if (this.mouseDown && this._game && this._game.player && this._game.camera) {
      const cam = this._game.camera;
      const player = this._game.player;
      const screenPos = cam.worldToScreen(player.x, player.y);
      let dx = this.mouseX - screenPos.x;
      let dy = this.mouseY - screenPos.y;
      const len = Math.hypot(dx, dy);
      if (len > 0) { dx /= len; dy /= len; }
      return { x: dx, y: dy };
    }
    return this.dir;
  }

  isKeyDown(code) { return !!this.keys[code]; }
  getMousePos() { return { x: this.mouseX, y: this.mouseY }; }
  isMouseDown() { return this.mouseDown; }
  consumeMouseDown() { const v = this.mouseDown; this.mouseDown = false; return v; }
  consumeWheelDelta() {
    const value = this.wheelDelta;
    this.wheelDelta = 0;
    return value;
  }
}


// --- systems/rng.js ---
function mulberry32(seed) {
  let t = seed >>> 0;
  return function nextRandom() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pickWeighted(entries, rng) {
  const total = entries.reduce((sum, entry) => sum + Math.max(0, entry.weight || 0), 0);
  if (total <= 0) return null;
  let roll = rng() * total;
  for (const entry of entries) {
    roll -= Math.max(0, entry.weight || 0);
    if (roll <= 0) return entry.value;
  }
  return entries[entries.length - 1]?.value || null;
}


// --- systems/juice.js ---
class JuiceSystem {
  constructor() {
    this.hitStopTimer = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.pickupChain = 0;
    this.pickupTimer = 0;
  }

  update(dt) {
    if (this.hitStopTimer > 0) this.hitStopTimer -= dt;
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.combo = 0;
    }
    if (this.pickupTimer > 0) {
      this.pickupTimer -= dt;
      if (this.pickupTimer <= 0) this.pickupChain = 0;
    }
  }

  getTimeScale() {
    return this.hitStopTimer > 0 ? 0 : 1;
  }

  hitStop(duration) {
    this.hitStopTimer = Math.max(this.hitStopTimer, duration);
  }

  recordKill(enemyType) {
    this.combo++;
    this.comboTimer = 3000;
    if (typeof window !== 'undefined' && window.game) {
      const intensity = enemyType === 'boss' ? 12 : (enemyType === 'elite' ? 6 : 2);
      const duration = enemyType === 'boss' ? 500 : (enemyType === 'elite' ? 150 : 80);
      window.game.cameraShake.shake(intensity, duration);
      this.hitStop(enemyType === 'boss' ? 50 : (enemyType === 'elite' ? 33 : 16));
    }
  }

  recordPickup() {
    this.pickupChain++;
    this.pickupTimer = 1000;
    return Math.min(12, this.pickupChain - 1);
  }
}


// --- systems/animation.js ---

class AnimationController {
  constructor() {
    this.current = 'idle';
    this.direction = 'down';
    this.frame = 0;
    this.elapsed = 0;
    this.finished = false;
    this.transitionFrom = null;
    this.transitionAlpha = 0;
    this.transitionDuration = 100;
    this.clips = {};
    this.spriteSheets = this.clips;
  }

  loadFrames(action, frames) {
    const def = ANIMATION_DEFS[action];
    if (!def || !frames) return;
    const frameSets = Array.isArray(frames) ? { default: frames } : frames;
    this.clips[action] = {
      ...def,
      frameSets,
      usesFrameImages: true
    };
  }

  loadSpriteSheet(action, img) {
    const def = ANIMATION_DEFS[action];
    if (!def || !img) return;
    this.clips[action] = {
      ...def,
      img,
      usesFrameImages: false
    };
  }

  setDirection(direction) {
    if (direction) this.direction = direction;
  }

  play(action, forceRestart = false) {
    if (!this.clips[action]) return false;

    const sameAction = this.current === action;
    if (sameAction && !forceRestart && !this.finished) return false;
    if (!sameAction && !canTransitionAnimation(this.current, action, this.finished)) return false;
    if (sameAction && action === 'death' && !this.finished) return false;

    if (!sameAction && this.clips[this.current]) {
      this.transitionFrom = {
        action: this.current,
        frame: this.frame,
        direction: this.direction
      };
      this.transitionAlpha = 1;
      this.transitionDuration = this.clips[action].transitionMs || 100;
    }

    this.current = action;
    this.frame = 0;
    this.elapsed = 0;
    this.finished = false;
    return true;
  }

  update(dt) {
    const clip = this.clips[this.current];
    if (!clip) return;

    if (this.transitionAlpha > 0) {
      this.transitionAlpha -= dt / this.transitionDuration;
      if (this.transitionAlpha <= 0) {
        this.transitionAlpha = 0;
        this.transitionFrom = null;
      }
    }

    if (this.finished) return;

    this.elapsed += dt;
    const frameDuration = clip.frameDuration || clip.speed || 100;
    if (this.elapsed >= frameDuration) {
      this.elapsed -= frameDuration;
      this.frame++;
      const frameCount = this._getFrameCount(this.current, this.direction);
      if (this.frame >= frameCount) {
        if (clip.loop) {
          this.frame = 0;
        } else {
          this.frame = Math.max(0, frameCount - 1);
          this.finished = true;
        }
      }
    }
  }

  _getFrameSet(action, direction = this.direction) {
    const clip = this.clips[action];
    if (!clip || !clip.usesFrameImages) return null;
    return clip.frameSets[direction] ||
           clip.frameSets.default ||
           clip.frameSets.right ||
           clip.frameSets.down ||
           null;
  }

  _getFrameCount(action, direction = this.direction) {
    const clip = this.clips[action];
    if (!clip) return 0;
    const frameSet = this._getFrameSet(action, direction);
    if (frameSet) return frameSet.length;
    return clip.frames || 1;
  }

  _drawFrame(ctx, action, frame, x, y, size, flipX, direction = this.direction) {
    const clip = this.clips[action];
    if (!clip) return;

    ctx.save();
    if (flipX) {
      ctx.translate(x + size / 2, 0);
      ctx.scale(-1, 1);
      ctx.translate(-(x + size / 2), 0);
    }

    if (clip.usesFrameImages) {
      const frameSet = this._getFrameSet(action, direction);
      if (frameSet && frameSet.length > 0) {
        const image = frameSet[Math.min(frame, frameSet.length - 1)];
        ctx.drawImage(image, x, y, size, size);
      }
    } else if (clip.img) {
      const col = frame % clip.cols;
      const row = Math.floor(frame / clip.cols);
      const sx = col * ANIMATION_FRAME_SIZE;
      const sy = row * ANIMATION_FRAME_SIZE;
      ctx.drawImage(clip.img, sx, sy, ANIMATION_FRAME_SIZE, ANIMATION_FRAME_SIZE, x, y, size, size);
    }

    ctx.restore();
  }

  render(ctx, x, y, size, flipX = false) {
    if (this.transitionFrom && this.transitionAlpha > 0) {
      this._drawFrame(
        ctx,
        this.transitionFrom.action,
        this.transitionFrom.frame,
        x,
        y,
        size,
        flipX,
        this.transitionFrom.direction
      );
      ctx.save();
      ctx.globalAlpha = 1 - this.transitionAlpha;
      this._drawFrame(ctx, this.current, this.frame, x, y, size, flipX, this.direction);
      ctx.restore();
    } else {
      this._drawFrame(ctx, this.current, this.frame, x, y, size, flipX, this.direction);
    }
  }

  hasClips() {
    return Object.keys(this.clips).length > 0;
  }

  isPlaying(action) {
    return this.current === action;
  }

  isFinished() {
    return this.finished;
  }
}

function determineAnimState(player, inputManager) {
  const manager = inputManager ||
    (typeof window !== 'undefined' && window.game ? window.game.inputManager : null);
  return resolveAnimationState(createAnimationParams(player, manager));
}


// --- systems/intro.js ---


class IntroSequence {
  constructor() {
    this.active = true;
    this.currentLine = 0;
    this.lineProgress = 0;
    this.scrollY = GAME_HEIGHT;
    this.speed = 0.06;
    this.lineDelay = 1200;
    this.lastLineTime = 0;
    this.alpha = 0;
    this.fadeState = 'in';
    this.finished = false;
    this.waitingForInput = false;
    this.waitAlpha = 0;
  }

  start() {
    this.active = true;
    this.currentLine = 0;
    this.lineProgress = 0;
    this.scrollY = GAME_HEIGHT;
    this.lastLineTime = performance.now();
    this.alpha = 0;
    this.fadeState = 'in';
    this.finished = false;
    this.waitingForInput = false;
    this.waitAlpha = 0;
  }

  update(dt) {
    if (!this.active || this.finished) return;

    if (this.waitingForInput) {
      this.waitAlpha = 0.5 + Math.sin(performance.now() * 0.004) * 0.4;
      return;
    }

    if (this.fadeState === 'in') {
      this.alpha = Math.min(1, this.alpha + dt * 0.002);
      if (this.alpha >= 1) this.fadeState = 'scroll';
    } else if (this.fadeState === 'out') {
      this.alpha = Math.max(0, this.alpha - dt * 0.003);
      if (this.alpha <= 0) {
        this.active = false;
        this.finished = true;
      }
      return;
    }

    this.scrollY -= this.speed * dt;

    const lineHeight = 42;
    const totalHeight = INTRO_SUBTITLES.length * lineHeight;
    const endY = GAME_HEIGHT / 2 - totalHeight / 2;

    if (this.scrollY < endY - 100) {
      this.fadeState = 'hold';
      this.waitingForInput = true;
    }
  }

  skip() {
    if (!this.active) return;
    if (this.waitingForInput) {
      this.waitingForInput = false;
      this.fadeState = 'out';
      return;
    }
    if (this.fadeState !== 'out') {
      this.fadeState = 'out';
    }
  }

  render(ctx) {
    if (!this.active) return;

    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.save();
    ctx.globalAlpha = this.alpha;

    const lineHeight = 42;
    const centerX = GAME_WIDTH / 2;
    let currentY = this.scrollY;

    for (let i = 0; i < INTRO_SUBTITLES.length; i++) {
      const line = INTRO_SUBTITLES[i];
      if (!line.text) {
        currentY += lineHeight * 0.6;
        continue;
      }

      let fontSize = 24;
      let color = '#e8e8e8';
      let fontWeight = 'normal';

      if (line.style === 'title') {
        fontSize = 32;
        color = '#ffd43b';
        fontWeight = 'bold';
      } else if (line.style === 'name') {
        fontSize = 26;
        color = '#ff8787';
      } else if (line.style === 'emphasis') {
        fontSize = 24;
        color = '#74c0fc';
        fontWeight = 'bold';
      }

      const distFromCenter = Math.abs(currentY - GAME_HEIGHT / 2);
      const lineAlpha = Math.max(0, 1 - distFromCenter / 280);

      ctx.globalAlpha = this.alpha * lineAlpha;
      ctx.font = `${fontWeight} ${fontSize}px "Segoe UI", "Microsoft YaHei", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = color;
      ctx.fillText(line.text, centerX, currentY);

      currentY += lineHeight;
    }

    if (this.waitingForInput) {
      ctx.globalAlpha = this.waitAlpha;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('按任意键继续', GAME_WIDTH / 2, GAME_HEIGHT - 80);
    } else if (!this.waitingForInput && this.fadeState !== 'out') {
      ctx.globalAlpha = 0.5 + Math.sin(performance.now() * 0.004) * 0.3;
      ctx.fillStyle = '#888';
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('点击或按空格跳过', GAME_WIDTH / 2, GAME_HEIGHT - 40);
    }

    ctx.restore();
  }
}


// --- systems/loading.js ---

class LoadingScreen {
  constructor() {
    this.active = false;
    this.text = '';
    this.subText = '';
    this.progress = 0;
    this.startTime = 0;
    this.minDuration = 2000;
  }

  show(text, subText) {
    this.active = true;
    this.text = text || '加载中...';
    this.subText = subText || '';
    this.progress = 0;
    this.startTime = performance.now();
  }

  hide() {
    this.active = false;
  }

  update() {
    if (!this.active) return;
    const elapsed = performance.now() - this.startTime;
    this.progress = Math.min(1, elapsed / this.minDuration);
    if (this.progress >= 1 && elapsed >= this.minDuration) {
      this.active = false;
    }
  }

  render(ctx) {
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 32px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40);

    if (this.subText) {
      ctx.fillStyle = '#aaa';
      ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(this.subText, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 10);
    }

    const barW = 300, barH = 6;
    const barX = (GAME_WIDTH - barW) / 2;
    const barY = GAME_HEIGHT / 2 + 50;
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = '#ffd43b';
    ctx.fillRect(barX, barY, barW * this.progress, barH);
  }
}


// --- systems/menu-button.js ---

class MenuButton {
  constructor(x, y, w, h, text, action) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.action = action;
    this.hovered = false;
  }

  containsPoint(px, py) {
    return px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h;
  }

  render(ctx) {
    const r = 8;
    ctx.save();
    ctx.shadowColor = this.hovered ? 'rgba(255, 212, 59, 0.34)' : 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = this.hovered ? 16 : 8;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = this.hovered ? 'rgba(56, 39, 9, 0.92)' : 'rgba(12, 14, 21, 0.88)';
    ctx.strokeStyle = this.hovered ? '#ffd43b' : 'rgba(248, 241, 216, 0.22)';
    ctx.lineWidth = this.hovered ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.moveTo(this.x + r, this.y);
    ctx.lineTo(this.x + this.w - r, this.y);
    ctx.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + r);
    ctx.lineTo(this.x + this.w, this.y + this.h - r);
    ctx.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - r, this.y + this.h);
    ctx.lineTo(this.x + r, this.y + this.h);
    ctx.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - r);
    ctx.lineTo(this.x, this.y + r);
    ctx.quadraticCurveTo(this.x, this.y, this.x + r, this.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = this.hovered ? '#ffd43b' : '#f8f1d8';
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x + 26, this.y + this.h / 2);
    ctx.strokeStyle = this.hovered ? '#ffd43b' : 'rgba(248, 241, 216, 0.34)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(this.x + this.w - 34, this.y + this.h / 2);
    ctx.lineTo(this.x + this.w - 22, this.y + this.h / 2);
    ctx.lineTo(this.x + this.w - 28, this.y + this.h / 2 - 6);
    ctx.moveTo(this.x + this.w - 22, this.y + this.h / 2);
    ctx.lineTo(this.x + this.w - 28, this.y + this.h / 2 + 6);
    ctx.stroke();
    ctx.restore();
  }
}


// --- ui/helpers.js ---



function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawButton(ctx, x, y, w, h, text, hovered, opts = {}) {
  const r = opts.radius || 8;
  const fillColor = hovered ? (opts.hoverFill || 'rgba(255, 212, 59, 0.25)') : (opts.fill || 'rgba(255, 255, 255, 0.08)');
  const strokeColor = hovered ? (opts.hoverStroke || '#ffd43b') : (opts.stroke || 'rgba(255, 255, 255, 0.3)');
  const textColor = hovered ? (opts.hoverText || '#ffd43b') : (opts.text || '#ccc');
  const font = opts.font || 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';

  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = opts.lineWidth || 2;
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + w / 2, y + h / 2);
}

function pointInRect(px, py, rx, ry, rw, rh) {
  return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

function drawCoverImage(ctx, img, x, y, w, h) {
  if (!img || !img.complete || img.naturalWidth === 0) return false;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = w / h;
  let sx, sy, sWidth, sHeight;
  if (imgRatio > canvasRatio) {
    sHeight = img.naturalHeight;
    sWidth = sHeight * canvasRatio;
    sx = (img.naturalWidth - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = img.naturalWidth;
    sHeight = sWidth / canvasRatio;
    sx = 0;
    sy = (img.naturalHeight - sHeight) / 2;
  }
  ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
  return true;
}

function drawArcanaIcon(ctx, arcana, cx, cy, size, opts = {}) {
  const ready = ARCANA_ATLAS_IMAGE &&
    ARCANA_ATLAS_IMAGE.complete &&
    ARCANA_ATLAS_IMAGE.naturalWidth > 0 &&
    ARCANA_ATLAS_IMAGE.naturalHeight > 0;
  const index = ARCANAS.findIndex(item => item.id === arcana?.id);
  if (ready && index >= 0) {
    const cols = 4;
    const rows = 3;
    const cellW = ARCANA_ATLAS_IMAGE.naturalWidth / cols;
    const cellH = ARCANA_ATLAS_IMAGE.naturalHeight / rows;
    const col = index % cols;
    const row = Math.floor(index / cols);
    ctx.save();
    if (opts.locked) ctx.filter = 'grayscale(1) brightness(0.45)';
    ctx.globalAlpha = opts.alpha ?? 1;
    ctx.drawImage(
      ARCANA_ATLAS_IMAGE,
      col * cellW,
      row * cellH,
      cellW,
      cellH,
      cx - size / 2,
      cy - size / 2,
      size,
      size
    );
    ctx.restore();
    return true;
  }

  ctx.save();
  ctx.globalAlpha = opts.alpha ?? 1;
  ctx.fillStyle = arcana?.color || '#ffd43b';
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#111';
  ctx.font = `bold ${Math.max(11, Math.floor(size * 0.34))}px "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(arcana?.icon || '?', cx, cy + 1);
  ctx.restore();
  return false;
}


// --- ui/render-world.js ---




function renderWorld(ctx, game) {
  ctx.save();
  ctx.translate(game.cameraShake.x, game.cameraShake.y);
  game.camera.apply(ctx);

  const level = LEVELS[game.selectedLevelIndex] || LEVELS[0];
  const levelTile = LEVEL_TILE_IMAGES[level.id];
  const levelBg = LEVEL_BG_IMAGES[level.id];
  if (!drawTiledBackground(ctx, levelTile, game) && !drawTiledBackground(ctx, levelBg, game)) {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(game.camera.x, game.camera.y, GAME_WIDTH, GAME_HEIGHT);
  }
  renderLevelProps(ctx, game, level.id);

  game.entityManager.render(ctx);
  if (game.player && game.player.active) {
    game.player.render(ctx);
  }
  renderParticles(ctx, game);
  renderDamageNumbers(ctx, game);

  ctx.restore();
}

function drawTiledBackground(ctx, img, game) {
  const ready = img && img.complete && img.naturalWidth > 0;
  if (!ready) return false;
  const tileW = 1024;
  const tileH = 1024;
  const crop = 8;
  const srcW = Math.max(1, img.naturalWidth - crop * 2);
  const srcH = Math.max(1, img.naturalHeight - crop * 2);
  const startX = Math.floor(game.camera.x / tileW) * tileW - tileW;
  const startY = Math.floor(game.camera.y / tileH) * tileH - tileH;
  const previousSmoothing = ctx.imageSmoothingEnabled;
  ctx.imageSmoothingEnabled = false;
  const offsetX = game.camera.x - Math.floor(game.camera.x);
  const offsetY = game.camera.y - Math.floor(game.camera.y);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  for (let y = startY; y < game.camera.y + GAME_HEIGHT + tileH; y += tileH) {
    for (let x = startX; x < game.camera.x + GAME_WIDTH + tileW; x += tileW) {
      const drawW = tileW + 2;
      const drawH = tileH + 2;
      const flipX = Math.abs(Math.floor(x / tileW)) % 2 === 1;
      const flipY = Math.abs(Math.floor(y / tileH)) % 2 === 1;
      if (flipX || flipY) {
        ctx.save();
        ctx.translate(x + drawW / 2, y + drawH / 2);
        ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
        ctx.drawImage(img, crop, crop, srcW, srcH, -drawW / 2, -drawH / 2, drawW, drawH);
        ctx.restore();
      } else {
        ctx.drawImage(img, crop, crop, srcW, srcH, x, y, drawW, drawH);
      }
    }
  }
  ctx.restore();
  ctx.imageSmoothingEnabled = previousSmoothing;
  const b = game.mapBounds;
  ctx.save();
  ctx.strokeStyle = 'rgba(0,0,0,0.28)';
  ctx.lineWidth = 12;
  ctx.strokeRect(b.minX, b.minY, b.maxX - b.minX, b.maxY - b.minY);
  ctx.restore();
  return true;
}

function renderLevelProps(ctx, game, levelId) {
  const sprites = LEVEL_PROP_SPRITES[levelId] || [];
  if (sprites.length === 0 || !game.mapBounds) return;
  const instances = getLevelPropInstances(game, levelId, sprites.length);
  const pad = 180;
  const minX = game.camera.x - pad;
  const minY = game.camera.y - pad;
  const maxX = game.camera.x + GAME_WIDTH + pad;
  const maxY = game.camera.y + GAME_HEIGHT + pad;
  for (const prop of instances) {
    if (prop.x < minX || prop.x > maxX || prop.y < minY || prop.y > maxY) continue;
    const sprite = sprites[prop.spriteIndex % sprites.length];
    const ready = sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0);
    if (!ready) continue;
    ctx.save();
    ctx.translate(prop.x, prop.y);
    ctx.rotate(prop.rotation);
    ctx.globalAlpha = prop.alpha;
    ctx.drawImage(sprite, -prop.size / 2, -prop.size / 2, prop.size, prop.size);
    ctx.restore();
  }
}

function getLevelPropInstances(game, levelId, spriteCount) {
  const b = game.mapBounds;
  const seed = game.runSeed || 1;
  const key = `${levelId}:${seed}:${b.minX},${b.minY},${b.maxX},${b.maxY}:${spriteCount}`;
  if (game._levelPropCache && game._levelPropCache.key === key) return game._levelPropCache.instances;
  const rng = mulberry32(hashWorldString(key));
  const area = Math.max(1, (b.maxX - b.minX) * (b.maxY - b.minY));
  const count = Math.max(40, Math.min(140, Math.floor(area / 65000)));
  const instances = [];
  for (let i = 0; i < count; i++) {
    instances.push({
      x: b.minX + rng() * (b.maxX - b.minX),
      y: b.minY + rng() * (b.maxY - b.minY),
      size: 42 + rng() * 70,
      rotation: rng() * Math.PI * 2,
      alpha: 0.42 + rng() * 0.28,
      spriteIndex: Math.floor(rng() * spriteCount)
    });
  }
  game._levelPropCache = { key, instances };
  return instances;
}

function hashWorldString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}


function renderParticles(ctx, game) {
  if (!game.particles) return;
  for (const p of game.particles) {
    if (!p.active) continue;
    ctx.save();
    ctx.globalAlpha = p.alpha || 1;
    if (!drawParticleActionFrame(ctx, p)) {
      ctx.fillStyle = p.color || '#fff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size || 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawParticleActionFrame(ctx, particle) {
  const action = particle.weaponAction;
  if (!action) return false;
  const frames = WEAPON_ACTION_SHEETS[action.weaponId]?.[action.action];
  if (!Array.isArray(frames) || frames.length === 0) return false;
  const progress = 1 - Math.max(0, Math.min(1, (particle.life || 0) / (particle.maxLife || 1)));
  const index = Math.min(frames.length - 1, Math.floor(progress * frames.length));
  const frame = frames[index];
  const canvasReady = typeof HTMLCanvasElement !== 'undefined' && frame instanceof HTMLCanvasElement;
  const imageReady = frame && frame.complete && frame.naturalWidth > 0;
  if (!canvasReady && !imageReady) return false;
  const size = particle.size || 320;
  ctx.translate(particle.x, particle.y);
  ctx.rotate(particle.rotation || 0);
  ctx.drawImage(frame, -size / 2, -size / 2, size, size);
  return true;
}

function renderDamageNumbers(ctx, game) {
  if (!game.damageNumbers) return;
  for (const dn of game.damageNumbers) {
    if (!dn.active) continue;
    ctx.save();
    ctx.globalAlpha = dn.alpha || 1;
    ctx.fillStyle = dn.color || '#fff';
    ctx.font = `bold ${dn.fontSize || 14}px "Segoe UI", "Microsoft YaHei", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dn.text, dn.x, dn.y);
    ctx.restore();
  }
}

function renderDeathQuotes(ctx, game) {
  if (!game.deathQuotes) return;
  const now = performance.now();
  for (const dq of game.deathQuotes) {
    if (!dq.active) continue;
    const elapsed = now - dq.startTime;
    const duration = 3000;
    if (elapsed > duration) { dq.active = false; continue; }
    let alpha = 1;
    if (elapsed < 300) alpha = elapsed / 300;
    else if (elapsed > duration - 500) alpha = (duration - elapsed) / 500;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#fff';
    ctx.font = 'italic 12px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`"${dq.text}"`, dq.x, dq.y - (elapsed * 0.02));
    ctx.restore();
  }
}

function renderDamageVignette(ctx, game) {
  if (!game.player || game.player.hp >= game.player.maxHp) return;
  const hpRatio = game.player.hp / game.player.maxHp;
  if (hpRatio > 0.5) return;
  const intensity = (0.5 - hpRatio) * 2;
  const pulse = hpRatio < 0.25 ? 0.65 + Math.sin(performance.now() * 0.006) * 0.25 : 1;
  const gradient = ctx.createRadialGradient(
    GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH * 0.3,
    GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH * 0.7
  );
  gradient.addColorStop(0, 'rgba(255,0,0,0)');
  gradient.addColorStop(1, `rgba(255,0,0,${0.3 * intensity * pulse})`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function renderBossSpawnQuote(ctx, game) {
  if (!game.bossSpawnQuote) return;
  const now = performance.now();
  const elapsed = now - game.bossSpawnQuote.startTime;
  const duration = game.bossSpawnQuote.duration;
  if (elapsed > duration) {
    game.bossSpawnQuote = null;
    return;
  }
  let alpha = 1;
  if (elapsed < 500) alpha = elapsed / 500;
  else if (elapsed > duration - 800) alpha = (duration - elapsed) / 800;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, GAME_HEIGHT / 2 - 60, GAME_WIDTH, 120);

  ctx.fillStyle = '#ff6b6b';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText('⚠ BOSS 出现 ⚠', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#fff';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  const text = game.bossSpawnQuote.text;
  const maxW = GAME_WIDTH - 100;
  const lines = wrapTextForBoss(text, maxW);
  lines.forEach((line, i) => {
    ctx.fillText(line, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 5 + i * 20);
  });
  ctx.restore();
}

function wrapTextForBoss(text, maxWidth) {
  const chars = text.split('');
  const lines = [];
  let current = '';
  for (const ch of chars) {
    current += ch;
    if (current.length * 14 > maxWidth) {
      lines.push(current);
      current = '';
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}


// --- ui/render-hud.js ---




function renderHUD(ctx, game) {
  const p = game.player;
  if (!p) return;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(10, 10, 240, 90);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Lv.${p.level}  ${p.charData ? p.charData.name : 'Player'}`, 20, 16);

  ctx.fillStyle = '#888';
  ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`FPS: ${game.fps}`, 240, 16);

  const hpBarW = 220, hpBarH = 14;
  const hpBarX = 20, hpBarY = 36;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(hpBarX, hpBarY, hpBarW, hpBarH);
  const hpRatio = p.hp / p.maxHp;
  ctx.fillStyle = hpRatio > 0.5 ? '#69db7c' : (hpRatio > 0.25 ? '#ffd43b' : '#ff6b6b');
  ctx.fillRect(hpBarX, hpBarY, hpBarW * hpRatio, hpBarH);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(hpBarX, hpBarY, hpBarW, hpBarH);
  ctx.fillStyle = '#fff';
  ctx.font = '10px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${p.hp}/${p.maxHp}`, hpBarX + hpBarW / 2, hpBarY + hpBarH / 2 + 1);

  const expBarW = 220, expBarH = 6;
  const expBarX = 20, expBarY = 55;
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(expBarX, expBarY, expBarW, expBarH);
  ctx.fillStyle = '#74c0fc';
  ctx.fillRect(expBarX, expBarY, expBarW * (p.exp / p.expToNextLevel()), expBarH);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`💰 ${p.gold}`, 20, 68);

  ctx.fillStyle = '#fff';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`击杀: ${p.kills}`, 240, 68);

  ctx.fillStyle = '#aaa';
  ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`分数: ${game.score}  时间: ${formatTime(game.gameTime)}`, 20, 84);
  ctx.textAlign = 'right';
  ctx.fillText(`波次: ${game.waveNumber}`, 240, 84);

  renderWeaponList(ctx, game);
  renderPassiveList(ctx, game);
  renderArcanaList(ctx, game);
  renderCombo(ctx, game);
  renderSkillIndicators(ctx, game);

  if (game.ambientLore) {
    const now = performance.now();
    const elapsed = now - game.ambientLore.startTime;
    const duration = game.ambientLore.duration;
    let alpha = 1;
    if (elapsed < 800) alpha = elapsed / 800;
    else if (elapsed > duration - 1000) alpha = (duration - elapsed) / 1000;
    alpha = Math.max(0, Math.min(1, alpha));

    ctx.save();
    ctx.globalAlpha = alpha * 0.7;
    ctx.fillStyle = '#aaa';
    ctx.font = 'italic 13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(game.ambientLore.text, GAME_WIDTH / 2, GAME_HEIGHT - 30);
    ctx.restore();
  }

  if (game.difficultyNotifTimer > 0) {
    const notifAlpha = Math.min(1, game.difficultyNotifTimer / 500);
    const notifScale = 1 + Math.max(0, (game.difficultyNotifTimer - 2500) / 500) * 0.3;
    ctx.save();
    ctx.globalAlpha = notifAlpha;
    ctx.fillStyle = '#ff922b';
    ctx.font = `bold ${Math.round(24 * notifScale)}px "Segoe UI", "Microsoft YaHei", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 8;
    ctx.fillText(`⚠ 难度提升！波次 ${game.waveNumber} ⚠`, GAME_WIDTH / 2, 100);
    ctx.shadowBlur = 0;
    ctx.restore();
  }
}

function renderWeaponList(ctx, game) {
  const p = game.player;
  if (!p) return;
  const weapons = p.weaponInventory.getAll();
  if (weapons.length === 0) return;

  const startX = 10;
  const startY = 108;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(startX, startY, 190, 18 + weapons.length * 18);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('武器', startX + 8, startY + 3);

  for (let i = 0; i < weapons.length; i++) {
    const w = weapons[i];
    const def = WEAPON_DEFS[w.id] || EVOLUTION_DEFS[w.id];
    if (!def) continue;
    const y = startY + 20 + i * 18;
    ctx.fillStyle = '#fff';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${def.name} Lv.${w.level}${w.evolvedFrom ? '★' : ''}`, startX + 8, y);
    ctx.fillStyle = '#888';
    ctx.font = '10px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'right';
    const baseDef = WEAPON_DEFS[def.baseWeaponId] || def;
    ctx.fillText(`DMG:${baseDef.baseDamage || '-'}`, startX + 180, y);
    ctx.textAlign = 'left';
  }
}

function renderPassiveList(ctx, game) {
  const p = game.player;
  if (!p) return;
  const passives = p.passiveInventory.getAll();
  if (passives.length === 0) return;

  const startX = 10;
  const startY = 108 + 18 + p.weaponInventory.getAll().length * 18 + 6;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(startX, startY, 190, 18 + passives.length * 18);

  ctx.fillStyle = '#74c0fc';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('被动', startX + 8, startY + 3);

  for (let i = 0; i < passives.length; i++) {
    const item = passives[i];
    const def = PASSIVE_DEFS[item.id];
    if (!def) continue;
    const y = startY + 20 + i * 18;
    ctx.fillStyle = '#fff';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${def.name} Lv.${item.level}`, startX + 8, y);
  }
}

function renderArcanaList(ctx, game) {
  const p = game.player;
  if (!p) return;
  const arcanas = p.arcanaInventory.getAll();
  if (arcanas.length === 0) return;

  const startX = 10;
  const passiveCount = p.passiveInventory ? p.passiveInventory.getAll().length : 0;
  const startY = 108 + 18 + p.weaponInventory.getAll().length * 18 + 6 +
    (passiveCount > 0 ? 18 + passiveCount * 18 + 6 : 0);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(startX, startY, 160, 18 + arcanas.length * 18);

  ctx.fillStyle = '#e599f7';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('塔罗牌', startX + 8, startY + 3);

  for (let i = 0; i < arcanas.length; i++) {
    const a = arcanas[i];
    const y = startY + 20 + i * 18;
    drawArcanaIcon(ctx, a, startX + 16, y + 6, 15, { alpha: 0.95 });
    ctx.fillStyle = a.color || '#fff';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${a.name} x${a.count}`, startX + 28, y);
  }
}

function renderCombo(ctx, game) {
  if (!game.juice || game.juice.combo < 10) return;
  ctx.save();
  ctx.fillStyle = 'rgba(80, 0, 0, 0.35)';
  ctx.fillRect(GAME_WIDTH - 200, 226, 180, 42);
  ctx.fillStyle = '#ff922b';
  ctx.font = 'bold 22px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${game.juice.combo} 连击`, GAME_WIDTH - 110, 247);
  ctx.restore();
}

function renderSkillIndicators(ctx, game) {
  const p = game.player;
  if (!p) return;

  const burstPct = p.burstSkill.getCooldownPercent();
  const burstCX = GAME_WIDTH - 55;
  const burstCY = GAME_HEIGHT - 55;
  const burstR = 28;

  ctx.save();
  ctx.beginPath();
  ctx.arc(burstCX, burstCY, burstR, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fill();
  ctx.strokeStyle = burstPct >= 1 ? '#ff6b6b' : 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (burstPct < 1) {
    ctx.beginPath();
    ctx.moveTo(burstCX, burstCY);
    ctx.arc(burstCX, burstCY, burstR - 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * burstPct);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255, 107, 107, 0.3)';
    ctx.fill();
  }

  ctx.fillStyle = burstPct >= 1 ? '#ff6b6b' : '#666';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('爆裂', burstCX, burstCY - 6);
  if (burstPct >= 1) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = '9px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText('Space', burstCX, burstCY + 10);
  } else {
    ctx.fillStyle = '#888';
    ctx.font = '9px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${Math.ceil(p.burstSkill.cooldownTimer / 1000)}s`, burstCX, burstCY + 10);
  }
  ctx.restore();

  const dashPct = p.dashCooldown > 0 ? (1 - p.dashCooldown / p.dashCooldownMax) : 1;
  const dashCX = GAME_WIDTH - 55;
  const dashCY = GAME_HEIGHT - 120;
  const dashR = 28;

  ctx.save();
  ctx.beginPath();
  ctx.arc(dashCX, dashCY, dashR, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fill();
  ctx.strokeStyle = dashPct >= 1 ? '#74c0fc' : 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (dashPct < 1) {
    ctx.beginPath();
    ctx.moveTo(dashCX, dashCY);
    ctx.arc(dashCX, dashCY, dashR - 3, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * dashPct);
    ctx.closePath();
    ctx.fillStyle = 'rgba(116, 192, 252, 0.3)';
    ctx.fill();
  }

  ctx.fillStyle = dashPct >= 1 ? '#74c0fc' : '#666';
  ctx.font = 'bold 11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('闪避', dashCX, dashCY - 6);
  if (dashPct >= 1) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = '9px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText('Shift', dashCX, dashCY + 10);
  } else {
    ctx.fillStyle = '#888';
    ctx.font = '9px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${(p.dashCooldown / 1000).toFixed(1)}s`, dashCX, dashCY + 10);
  }
  ctx.restore();
}


// --- ui/render-paused.js ---


function renderPaused(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 48px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 12;
  ctx.fillText('游戏暂停', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 200);
  ctx.shadowBlur = 0;

  game.pauseMenuButtons.forEach(b => b.render(ctx));

  if (game._showSaveSlotSelect) {
    renderSaveSlotOverlay(ctx, game);
  }
}

function renderSaveSlotOverlay(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 28px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('选择保存位置', GAME_WIDTH / 2, 100);

  const saves = game._getAllSaves();
  const slotW = 280, slotH = 160, gap = 24;
  const totalW = 3 * slotW + 2 * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const startY = 130;

  game._pauseSaveSlotBounds = [];

  for (let i = 0; i < 3; i++) {
    const sx = startX + i * (slotW + gap);
    const sy = startY;
    const save = saves[i];
    const hov = game._pauseSaveSlotHovered === i;

    game._pauseSaveSlotBounds.push({ x: sx, y: sy, w: slotW, h: slotH, slot: i });

    ctx.save();
    const cr = 10;
    drawRoundedRect(ctx, sx, sy, slotW, slotH, cr);
    ctx.fillStyle = hov ? 'rgba(255, 212, 59, 0.15)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = hov ? '#ffd43b' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`存档 ${i + 1}`, sx + slotW / 2, sy + 30);

    if (save) {
      ctx.fillStyle = '#ccc';
      ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(`${save.characterName || '未知'}`, sx + slotW / 2, sy + 55);
      ctx.fillText(`等级: ${save.level || 1}  击杀: ${save.kills || 0}`, sx + slotW / 2, sy + 75);
      ctx.fillText(`分数: ${save.score || 0}  时间: ${save.time || '0:00'}`, sx + slotW / 2, sy + 95);
      ctx.fillStyle = '#888';
      ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(save.date || '', sx + slotW / 2, sy + 115);

      const delBtnX = sx + slotW - 60, delBtnY = sy + slotH - 35;
      const delHov = game._pauseDeleteHovered === i;
      drawButton(ctx, delBtnX, delBtnY, 50, 25, '删除', delHov, {
        fill: 'rgba(255,0,0,0.1)', hoverFill: 'rgba(255,0,0,0.3)',
        stroke: 'rgba(255,0,0,0.4)', hoverStroke: '#ff6b6b',
        text: '#ff6b6b', hoverText: '#ff6b6b',
        font: '12px "Segoe UI", "Microsoft YaHei", sans-serif', radius: 4
      });
    } else {
      ctx.fillStyle = '#666';
      ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('空存档', sx + slotW / 2, sy + slotH / 2 + 5);
    }
    ctx.restore();
  }

  const cancelBtnY = startY + slotH + 30;
  const cancelHov = game._pauseCancelHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, cancelBtnY, 160, 40, '取消', cancelHov);
}


// --- ui/render-shop.js ---





function renderShop(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const panelW = 620, panelH = 520;
  const panelX = (GAME_WIDTH - panelW - 180) / 2;
  const panelY = (GAME_HEIGHT - panelH) / 2;

  drawRoundedRect(ctx, panelX, panelY, panelW, panelH, 12);
  ctx.fillStyle = 'rgba(20, 20, 40, 0.95)';
  ctx.fill();
  ctx.strokeStyle = '#ffd43b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 24px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('商店', panelX + panelW / 2, panelY + 35);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`💰 ${game.player.gold}`, panelX + 20, panelY + 60);

  const shopAreaW = panelW - 20;
  const items = game.shopItems;
  const cols = 2;
  const itemGapX = 12, itemGapY = 8;
  const itemH = 70;
  const itemW = (shopAreaW - itemGapX) / cols;
  const itemStartX = panelX + 10;
  const itemStartY = panelY + 82;

  game._shopItemBounds = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const ix = itemStartX + col * (itemW + itemGapX);
    const iy = itemStartY + row * (itemH + itemGapY);
    const hov = game._shopItemHovered === i;
    const canBuy = _canBuyItem(game, item);

    game._shopItemBounds.push({ x: ix, y: iy, w: itemW, h: itemH, index: i });

    drawRoundedRect(ctx, ix, iy, itemW, itemH, 6);
    ctx.fillStyle = hov ? (canBuy ? 'rgba(255, 212, 59, 0.15)' : 'rgba(255, 0, 0, 0.1)') : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = hov ? (canBuy ? '#ffd43b' : '#ff6b6b') : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = canBuy ? '#fff' : '#888';
    ctx.font = 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(item.name, ix + 10, iy + 8);

    ctx.fillStyle = canBuy ? '#ccc' : '#666';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(item.desc, ix + 10, iy + 28);

    ctx.fillStyle = canBuy ? '#ffd43b' : '#ff6b6b';
    ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`💰 ${item.price}`, ix + itemW - 10, iy + 8);

    if (item.type === 'arcana') {
      const arcana = ARCANAS.find(a => a.id === item.arcanaId);
      if (arcana) {
        drawArcanaIcon(ctx, arcana, ix + 18, iy + 55, 24);
      }
    } else if (item.type === 'weapon') {
      const def = WEAPON_DEFS[item.weaponId];
      if (def) {
        const lvl = game.player.weaponInventory.getLevel(item.weaponId);
        const hasWeapon = game.player.weaponInventory.has(item.weaponId);
        ctx.fillStyle = hasWeapon ? '#69db7c' : '#74c0fc';
        ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(hasWeapon ? `已拥有 Lv.${lvl} → Lv.${lvl + 1}` : '未拥有', ix + 10, iy + 48);
      }
    }
  }

  const merchantAreaW = 180;
  const merchantAreaX = panelX + panelW + 10;
  const merchantAreaY = panelY;

  drawRoundedRect(ctx, merchantAreaX, merchantAreaY, merchantAreaW, panelH, 12);
  ctx.fillStyle = 'rgba(20, 20, 40, 0.95)';
  ctx.fill();
  ctx.strokeStyle = '#ffd43b';
  ctx.lineWidth = 2;
  ctx.stroke();

  const merchantImgSize = 160;
  const merchantImgX = merchantAreaX + (merchantAreaW - merchantImgSize) / 2;
  const merchantImgY = merchantAreaY + 30;
  const mIsReady = SHOP_MERCHANT_IMAGE.complete && SHOP_MERCHANT_IMAGE.naturalWidth > 0;
  if (mIsReady) {
    ctx.drawImage(SHOP_MERCHANT_IMAGE, merchantImgX, merchantImgY, merchantImgSize, merchantImgSize);
  } else {
    ctx.fillStyle = 'rgba(255, 212, 59, 0.2)';
    ctx.fillRect(merchantImgX, merchantImgY, merchantImgSize, merchantImgSize);
  }

  const bubbleW = 200, bubbleH = 50;
  const bubbleX = merchantAreaX + (merchantAreaW - bubbleW) / 2;
  const bubbleY = merchantImgY + merchantImgSize + 20;

  drawRoundedRect(ctx, bubbleX, bubbleY, bubbleW, bubbleH, 10);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill();
  ctx.strokeStyle = '#ffd43b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#333';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('嘿！想买点什么呢', bubbleX + bubbleW / 2, bubbleY + bubbleH / 2);

  const closeBtnX = panelX + panelW / 2 - 60;
  const closeBtnY = panelY + panelH - 50;
  const closeHov = game._shopCloseHovered;
  drawButton(ctx, closeBtnX, closeBtnY, 120, 36, '关闭', closeHov);
}

function _canBuyItem(game, item) {
  if (game.player.gold < item.price) return false;
  if (item.type === 'weapon') {
    const has = game.player.weaponInventory.has(item.weaponId);
    if (has) {
      return game.player.weaponInventory.canUpgrade(item.weaponId);
    }
    return true;
  }
  if (item.type === 'arcana') {
    return game.player.arcanaInventory.canAdd(item.arcanaId);
  }
  return true;
}

function handleShopPurchase(game, item) {
  if (game.player.gold < item.price) return false;

  if (item.type === 'weapon') {
    const has = game.player.weaponInventory.has(item.weaponId);
    if (has) {
      if (!game.player.weaponInventory.canUpgrade(item.weaponId)) return false;
      game.player.weaponInventory.upgrade(item.weaponId);
    } else {
      game.player.weaponInventory.add(item.weaponId);
      game.bestiary.unlockWeapon(item.weaponId);
    }
    if (typeof game._syncBestiaryInventory === 'function') game._syncBestiaryInventory();
  } else if (item.type === 'arcana') {
    if (!game.player.arcanaInventory.canAdd(item.arcanaId)) return false;
    game.player.arcanaInventory.add(item.arcanaId);
    if (typeof game._syncBestiaryInventory === 'function') game._syncBestiaryInventory();
  } else if (item.type === 'hp_boost') {
    game.player.maxHp += 10;
    game.player.hp = Math.min(game.player.maxHp, game.player.hp + 10);
  } else if (item.type === 'atk_boost') {
    game.player.attackBonus += 1;
    if (game.player.weapon) {
      game.player.weapon.damage = game.player.getAttack();
    }
  }

  game.player.gold -= item.price;
  game.audio.playPickup();
  return true;
}


// --- ui/render-game-over.js ---


function renderGameOver(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#ff6b6b';
  ctx.font = 'bold 56px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255, 0, 0, 0.5)';
  ctx.shadowBlur = 20;
  ctx.fillText('游戏结束', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 160);
  ctx.shadowBlur = 0;

  const p = game.player;
  ctx.fillStyle = '#fff';
  ctx.font = '22px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`角色: ${p.charData ? p.charData.name : '未知'}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 90);
  ctx.fillText(`等级: ${p.level}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60);
  ctx.fillText(`击杀: ${p.kills}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30);
  ctx.fillText(`分数: ${game.score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2);
  ctx.fillText(`存活时间: ${formatTime(game.gameTime)}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);

  const isNewTime = game.gameTime >= game.bestTime && game.gameTime > 0;
  const isNewScore = game.score >= game.bestScore && game.score > 0;

  ctx.fillStyle = '#888';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`最佳分数: ${game.bestScore}${isNewScore ? ' ★NEW RECORD' : ''}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 70);
  ctx.fillText(`最佳时间: ${formatTime(game.bestTime)}${isNewTime ? ' ★NEW RECORD' : ''}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 95);

  if (isNewScore || isNewTime) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.shadowColor = 'rgba(255, 212, 59, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText('🏆 新纪录！', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 130);
    ctx.shadowBlur = 0;
  }

  const retryHov = game.gameOverBtnHovered === 'retry';
  drawButton(ctx, GAME_WIDTH / 2 - 120, GAME_HEIGHT / 2 + 155, 110, 40, '重新开始', retryHov, {
    fill: 'rgba(255, 107, 107, 0.15)', hoverFill: 'rgba(255, 107, 107, 0.3)',
    stroke: '#ff6b6b', hoverStroke: '#ff6b6b',
    text: '#ff8787', hoverText: '#ff6b6b'
  });

  const menuHov = game.gameOverBtnHovered === 'menu';
  drawButton(ctx, GAME_WIDTH / 2 + 10, GAME_HEIGHT / 2 + 155, 110, 40, '返回菜单', menuHov, {
    fill: 'rgba(255, 255, 255, 0.08)', hoverFill: 'rgba(255, 255, 255, 0.15)',
    stroke: 'rgba(255, 255, 255, 0.3)', hoverStroke: '#ffd43b',
    text: '#ccc', hoverText: '#ffd43b'
  });
}


// --- ui/render-victory.js ---


let fireworks = [];
let lastFireworkTime = 0;

function spawnFirework() {
  const x = 100 + Math.random() * (GAME_WIDTH - 200);
  const y = 50 + Math.random() * (GAME_HEIGHT / 2);
  const colors = ['#ff6b6b', '#ffd43b', '#74c0fc', '#69db7c', '#da77f2', '#ff922b'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < 20; i++) {
    const angle = (Math.PI * 2 * i) / 20;
    const speed = 0.05 + Math.random() * 0.15;
    fireworks.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color, size: 2 + Math.random() * 3,
      alpha: 1, life: 800 + Math.random() * 400,
      maxLife: 800 + Math.random() * 400
    });
  }
}

function updateFireworks(dt) {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const f = fireworks[i];
    f.x += f.vx * dt;
    f.y += f.vy * dt;
    f.vy += 0.00005 * dt;
    f.life -= dt;
    f.alpha = Math.max(0, f.life / f.maxLife);
    if (f.life <= 0) fireworks.splice(i, 1);
  }
}

function renderFireworksParticles(ctx) {
  for (const f of fireworks) {
    ctx.save();
    ctx.globalAlpha = f.alpha;
    ctx.fillStyle = f.color;
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.size * f.alpha, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function renderVictory(ctx, game) {
  const now = performance.now();
  if (now - lastFireworkTime > 600) {
    spawnFirework();
    lastFireworkTime = now;
  }
  updateFireworks(16);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  renderFireworksParticles(ctx);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 56px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255, 212, 59, 0.5)';
  ctx.shadowBlur = 20;
  ctx.fillText('胜利！', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 160);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#fff';
  ctx.font = '18px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText('诅咒已被终结！', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 110);

  const p = game.player;
  ctx.fillStyle = '#fff';
  ctx.font = '22px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`角色: ${p.charData ? p.charData.name : '未知'}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 70);
  ctx.fillText(`等级: ${p.level}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40);
  ctx.fillText(`击杀: ${p.kills}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10);
  ctx.fillText(`分数: ${game.score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
  ctx.fillText(`存活时间: ${formatTime(game.gameTime)}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);

  const isNewTime = game.gameTime >= game.bestTime && game.gameTime > 0;
  const isNewScore = game.score >= game.bestScore && game.score > 0;

  ctx.fillStyle = '#888';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`最佳分数: ${game.bestScore}${isNewScore ? ' ★NEW RECORD' : ''}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 85);
  ctx.fillText(`最佳时间: ${formatTime(game.bestTime)}${isNewTime ? ' ★NEW RECORD' : ''}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 110);

  if (isNewScore || isNewTime) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.shadowColor = 'rgba(255, 212, 59, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText('🏆 新纪录！', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 140);
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = '#888';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText('按 Esc 返回主菜单', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 175);
}


// --- ui/render-level-select.js ---







const CARD_W = 190, CARD_H = 280, CARD_GAP = 16, CARD_START_Y = 140;
const CONFIRM_W = 200, CONFIRM_H = 52;
const BACK_X = 40, BACK_Y = GAME_HEIGHT - 70, BACK_W = 120, BACK_H = 44;
const CHALLENGE_ORDER = [null, 'pigeon_kingdom', 'inspector_parade'];

function getCardPositions() {
  const totalW = LEVELS.length * CARD_W + (LEVELS.length - 1) * CARD_GAP;
  const startX = (GAME_WIDTH - totalW) / 2;
  const positions = [];
  for (let i = 0; i < LEVELS.length; i++) {
    positions.push({ x: startX + i * (CARD_W + CARD_GAP), y: CARD_START_Y });
  }
  return positions;
}

function renderLevelSelect(ctx, game) {
  renderRunProfileControls(ctx, game);

  if (game.selectedLevelIndex >= 0) {
    const lvl = LEVELS[game.selectedLevelIndex];
    const bgImg = LEVEL_BG_IMAGES[lvl.id];
    if (!drawCoverImage(ctx, bgImg, 0, 0, GAME_WIDTH, GAME_HEIGHT)) {
      ctx.fillStyle = '#0a0a14';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  } else {
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('选择关卡', GAME_WIDTH / 2, 70);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#bbb';
  ctx.font = '16px sans-serif';
  ctx.fillText('点击关卡卡片查看详情，确认后点击继续', GAME_WIDTH / 2, 105);

  const positions = getCardPositions();
  game._levelCardBounds = [];

  for (let i = 0; i < LEVELS.length; i++) {
    const lvl = LEVELS[i];
    const px = positions[i].x;
    const py = positions[i].y;
    const hov = game._levelHovered === i;
    const selected = game.selectedLevelIndex === i;
    const locked = !isLevelUnlocked(game.meta, lvl.id);

    game._levelCardBounds.push({ x: px, y: py, w: CARD_W, h: CARD_H, index: i, locked });

    const glow = selected ? 20 : (hov ? 12 : 0);
    if (glow > 0) {
      ctx.shadowColor = selected ? '#ffd43b' : 'rgba(255,255,255,0.3)';
      ctx.shadowBlur = glow;
    }

    drawRoundedRect(ctx, px, py, CARD_W, CARD_H, 12);
    ctx.fillStyle = locked ? 'rgba(18,18,24,0.82)' : (selected ? 'rgba(255, 212, 59, 0.12)' : 'rgba(255,255,255,0.06)');
    ctx.fill();
    ctx.strokeStyle = selected ? '#ffd43b' : (hov ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)');
    ctx.lineWidth = selected ? 3 : 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    let ty = py + 30;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(lvl.name, px + CARD_W / 2, ty);

    ty += 22;
    ctx.fillStyle = '#888';
    ctx.font = 'italic 14px sans-serif';
    ctx.fillText(lvl.nameEn, px + CARD_W / 2, ty);

    ty += 36;
    ctx.fillStyle = '#aaa';
    ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(locked ? '未解锁' : '点击查看详情', px + CARD_W / 2, ty);

    if (locked) {
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(px + 12, py + 92, CARD_W - 24, 120);
      ctx.fillStyle = '#ffd43b';
      ctx.font = 'bold 15px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('锁定条件', px + CARD_W / 2, py + 120);
      ctx.fillStyle = '#eee';
      ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
      wrapLevelSelectText(ctx, getLevelUnlockText(lvl.id), px + 24, py + 150, CARD_W - 48, 18, 3);
    }
  }

  if (game.selectedLevelIndex >= 0) {
    const confirmX = (GAME_WIDTH - CONFIRM_W) / 2;
    const confirmY = GAME_HEIGHT - 80;
    const confirmHov = game._levelConfirmHovered;

    drawRoundedRect(ctx, confirmX, confirmY, CONFIRM_W, CONFIRM_H, 10);
    ctx.fillStyle = confirmHov ? 'rgba(255, 212, 59, 0.25)' : 'rgba(255, 212, 59, 0.12)';
    ctx.fill();
    ctx.strokeStyle = confirmHov ? '#ffd43b' : 'rgba(255, 212, 59, 0.5)';
    ctx.lineWidth = confirmHov ? 3 : 2;
    ctx.stroke();

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const selectedLevel = LEVELS[game.selectedLevelIndex] || LEVELS[0];
    const selectedLocked = !isLevelUnlocked(game.meta, selectedLevel.id);
    ctx.fillText(selectedLocked ? '关卡未解锁' : '选择此关卡', confirmX + CONFIRM_W / 2, confirmY + CONFIRM_H / 2);

    game._levelConfirmBounds = { x: confirmX, y: confirmY, w: CONFIRM_W, h: CONFIRM_H };
  } else {
    game._levelConfirmBounds = null;
  }

  const backHov = game._levelBackHovered;
  drawRoundedRect(ctx, BACK_X, BACK_Y, BACK_W, BACK_H, 8);
  ctx.fillStyle = backHov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)';
  ctx.fill();
  ctx.strokeStyle = backHov ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#ccc';
  ctx.font = '16px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('← 返回', BACK_X + BACK_W / 2, BACK_Y + BACK_H / 2);

  game._levelBackBounds = { x: BACK_X, y: BACK_Y, w: BACK_W, h: BACK_H };
}

function handleLevelSelectClick(game, mx, my) {
  if (game._levelSpiceMinusBounds && pointInRect(mx, my, game._levelSpiceMinusBounds.x, game._levelSpiceMinusBounds.y, game._levelSpiceMinusBounds.w, game._levelSpiceMinusBounds.h)) {
    game.selectedSpiceLevel = Math.max(0, (game.selectedSpiceLevel || 0) - 1);
    game.audio.playMenuClick();
    return true;
  }
  if (game._levelSpicePlusBounds && pointInRect(mx, my, game._levelSpicePlusBounds.x, game._levelSpicePlusBounds.y, game._levelSpicePlusBounds.w, game._levelSpicePlusBounds.h)) {
    game.selectedSpiceLevel = Math.min(5, (game.selectedSpiceLevel || 0) + 1);
    game.audio.playMenuClick();
    return true;
  }
  if (game._levelHyperBounds && pointInRect(mx, my, game._levelHyperBounds.x, game._levelHyperBounds.y, game._levelHyperBounds.w, game._levelHyperBounds.h)) {
    game.selectedHyper = !game.selectedHyper;
    game.audio.playMenuClick();
    return true;
  }
  if (game._levelChallengeBounds && pointInRect(mx, my, game._levelChallengeBounds.x, game._levelChallengeBounds.y, game._levelChallengeBounds.w, game._levelChallengeBounds.h)) {
    const current = CHALLENGE_ORDER.indexOf(game.selectedChallengeId || null);
    game.selectedChallengeId = CHALLENGE_ORDER[(current + 1 + CHALLENGE_ORDER.length) % CHALLENGE_ORDER.length];
    game.audio.playMenuClick();
    return true;
  }
  if (game._levelDailyBounds && pointInRect(mx, my, game._levelDailyBounds.x, game._levelDailyBounds.y, game._levelDailyBounds.w, game._levelDailyBounds.h)) {
    game.selectedDaily = !game.selectedDaily;
    game.dailyChallenge = game.selectedDaily ? getDailyChallengeForDate() : null;
    game.audio.playMenuClick();
    return true;
  }

  for (const c of game._levelCardBounds) {
    if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
      game.selectedLevelIndex = c.index;
      game.audio.playMenuClick();
      return true;
    }
  }
  if (game._levelConfirmBounds && game.selectedLevelIndex >= 0) {
    const b = game._levelConfirmBounds;
    if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
      const lvl = LEVELS[game.selectedLevelIndex];
      if (!isLevelUnlocked(game.meta, lvl.id)) return true;
      game.setState('CHARACTER_SELECT');
      game.audio.playMenuClick();
      return true;
    }
  }
  if (game._levelBackBounds) {
    const b = game._levelBackBounds;
    if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
      game.setState('MENU');
      game.audio.playMenuClick();
      return true;
    }
  }
  return false;
}

function renderRunProfileControls(ctx, game) {
  const y = GAME_HEIGHT - 146;
  const centerX = GAME_WIDTH / 2;
  const panelW = 760;
  const panelH = 48;
  const x = centerX - panelW / 2;
  drawRoundedRect(ctx, x, y, panelW, panelH, 10);
  ctx.fillStyle = 'rgba(10, 10, 18, 0.62)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#e8dfc6';
  ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('M4', x + 16, y + panelH / 2);

  const spice = Math.max(0, Math.min(5, game.selectedSpiceLevel || 0));
  game._levelSpiceMinusBounds = { x: x + 58, y: y + 10, w: 34, h: 28 };
  game._levelSpicePlusBounds = { x: x + 176, y: y + 10, w: 34, h: 28 };
  drawProfileButton(ctx, game._levelSpiceMinusBounds, '-', game._levelSpiceMinusHovered, spice <= 0);
  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`香料 ${spice}`, x + 134, y + panelH / 2);
  drawProfileButton(ctx, game._levelSpicePlusBounds, '+', game._levelSpicePlusHovered, spice >= 5);

  game._levelHyperBounds = { x: x + 230, y: y + 10, w: 102, h: 28 };
  drawProfileButton(ctx, game._levelHyperBounds, game.selectedHyper ? 'Hyper ON' : 'Hyper OFF', game._levelHyperHovered, false, game.selectedHyper);

  const challengeName = game.selectedChallengeId ? CHALLENGE_DEFS[game.selectedChallengeId]?.name || game.selectedChallengeId : '普通模式';
  game._levelChallengeBounds = { x: x + 348, y: y + 10, w: 176, h: 28 };
  drawProfileButton(ctx, game._levelChallengeBounds, challengeName, game._levelChallengeHovered, false, !!game.selectedChallengeId);

  const daily = game.selectedDaily ? (game.dailyChallenge || getDailyChallengeForDate()) : null;
  if (daily && !game.dailyChallenge) game.dailyChallenge = daily;
  const dailyLabel = daily ? `每日 ${daily.spiceLevel}${daily.hyper ? 'H' : ''}` : '每日挑战';
  game._levelDailyBounds = { x: x + 540, y: y + 10, w: 132, h: 28 };
  drawProfileButton(ctx, game._levelDailyBounds, dailyLabel, game._levelDailyHovered, false, !!daily);

  if (daily) {
    ctx.fillStyle = '#9d9788';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`${daily.levelId} / ${daily.characterId}`, x + 676, y + panelH / 2);
  }
}

function drawProfileButton(ctx, bounds, label, hovered, disabled = false, active = false) {
  drawRoundedRect(ctx, bounds.x, bounds.y, bounds.w, bounds.h, 7);
  ctx.fillStyle = disabled
    ? 'rgba(255,255,255,0.04)'
    : (active ? 'rgba(255, 212, 59, 0.22)' : (hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.065)'));
  ctx.fill();
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.08)' : (active ? '#ffd43b' : 'rgba(255,255,255,0.22)');
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = disabled ? '#666' : (active ? '#ffd43b' : '#d8d0bd');
  ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
}

function wrapLevelSelectText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = '';
  let lineCount = 0;
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x + maxWidth / 2, y + lineCount * lineHeight);
      line = ch;
      lineCount++;
      if (lineCount >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && lineCount < maxLines) ctx.fillText(line, x + maxWidth / 2, y + lineCount * lineHeight);
}

function handleLevelSelectHover(game, mx, my) {
  game._levelHovered = -1;
  game._levelConfirmHovered = false;
  game._levelBackHovered = false;
  game._levelSpiceMinusHovered = false;
  game._levelSpicePlusHovered = false;
  game._levelHyperHovered = false;
  game._levelChallengeHovered = false;
  game._levelDailyHovered = false;
  for (const c of game._levelCardBounds) {
    if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
      game._levelHovered = c.index;
      break;
    }
  }
  if (game._levelConfirmBounds && game.selectedLevelIndex >= 0) {
    const b = game._levelConfirmBounds;
    game._levelConfirmHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelBackBounds) {
    const b = game._levelBackBounds;
    game._levelBackHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelSpiceMinusBounds) {
    const b = game._levelSpiceMinusBounds;
    game._levelSpiceMinusHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelSpicePlusBounds) {
    const b = game._levelSpicePlusBounds;
    game._levelSpicePlusHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelHyperBounds) {
    const b = game._levelHyperBounds;
    game._levelHyperHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelChallengeBounds) {
    const b = game._levelChallengeBounds;
    game._levelChallengeHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
  if (game._levelDailyBounds) {
    const b = game._levelDailyBounds;
    game._levelDailyHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
}


// --- ui/render-character-select.js ---





function renderCharacterSelect(ctx, game) {
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('选择角色', GAME_WIDTH / 2, 60);
  ctx.shadowBlur = 0;

  const cardW = 280, cardH = 440, gap = 20;
  const totalW = CHARACTERS.length * cardW + (CHARACTERS.length - 1) * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const startY = 90;

  game._charCardBounds = [];

  for (let i = 0; i < CHARACTERS.length; i++) {
    const char = CHARACTERS[i];
    const cx = startX + i * (cardW + gap);
    const cy = startY;
    const hov = game._charHovered === i;
    const selected = game.selectedCharacterIndex === i;
    const locked = !isCharacterUnlocked(game.meta, char.id);

    game._charCardBounds.push({ x: cx, y: cy, w: cardW, h: cardH, index: i, locked });

    drawRoundedRect(ctx, cx, cy, cardW, cardH, 10);
    ctx.fillStyle = locked ? 'rgba(20, 20, 28, 0.82)' : (selected ? 'rgba(255, 212, 59, 0.12)' : (hov ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.03)'));
    ctx.fill();
    ctx.strokeStyle = selected ? '#ffd43b' : (hov ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)');
    ctx.lineWidth = selected ? 2 : 1;
    ctx.stroke();

    const bgImg = CHARACTER_BG_IMAGES[char.id];
    const bgAreaH = 100;
    const bgAreaY = cy + 10;
    if (!drawCoverImage(ctx, bgImg, cx + 10, bgAreaY, cardW - 20, bgAreaH)) {
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(cx + 10, bgAreaY, cardW - 20, bgAreaH);
    }
    ctx.fillStyle = 'rgba(10, 10, 20, 0.55)';
    ctx.fillRect(cx + 10, bgAreaY, cardW - 20, bgAreaH);

    const sprite = CHARACTER_SPRITES[char.id];
    const isReady = sprite && (sprite instanceof HTMLCanvasElement || (sprite.complete && sprite.naturalWidth > 0));
    if (isReady) {
      const spriteSize = 80;
      const spriteY = bgAreaY + bgAreaH + 8;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 8;
      ctx.drawImage(sprite, cx + cardW / 2 - spriteSize / 2, spriteY, spriteSize, spriteSize);
      ctx.restore();
    }

    ctx.fillStyle = selected ? '#ffd43b' : '#fff';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(char.name, cx + cardW / 2, cy + 200);

    ctx.fillStyle = '#aaa';
    ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(char.title, cx + cardW / 2, cy + 225);

    ctx.fillStyle = '#888';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    const loreLines = wrapCharacterText(char.lore, cardW - 30);
    loreLines.forEach((line, li) => {
      ctx.fillText(line, cx + cardW / 2, cy + 250 + li * 16);
    });

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`武器: ${char.weapon}`, cx + cardW / 2, cy + 310);

    ctx.fillStyle = '#74c0fc';
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`${char.passive.name}: ${char.passive.description}`, cx + cardW / 2, cy + 335);

    ctx.fillStyle = '#ccc';
    ctx.font = '10px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(`HP:${char.stats.maxHp} 速度:${char.stats.moveSpeed} 力量:${char.stats.power}`, cx + cardW / 2, cy + 360);

    if (locked) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.58)';
      ctx.fillRect(cx + 12, cy + 12, cardW - 24, cardH - 24);
      ctx.fillStyle = '#ffd43b';
      ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('未解锁', cx + cardW / 2, cy + 178);
      ctx.fillStyle = '#eee';
      ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
      wrapCharacterText(getCharacterUnlockText(char.id), cardW - 52).forEach((line, li) => {
        ctx.fillText(line, cx + cardW / 2, cy + 212 + li * 18);
      });
    }
  }

  const btnY = startY + cardH + 20;
  const confirmHov = game._charConfirmHovered;
  const selectedChar = CHARACTERS[game.selectedCharacterIndex];
  const selectedLocked = selectedChar && !isCharacterUnlocked(game.meta, selectedChar.id);
  drawButton(ctx, GAME_WIDTH / 2 - 80, btnY, 160, 44, selectedLocked ? '未解锁' : '确认选择', confirmHov && !selectedLocked);
  game._charConfirmBounds = { x: GAME_WIDTH / 2 - 80, y: btnY, w: 160, h: 44 };

  const backHov = game._charBackHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, btnY + 56, 160, 44, '返回', backHov);
  game._charBackBounds = { x: GAME_WIDTH / 2 - 80, y: btnY + 56, w: 160, h: 44 };
}

function wrapCharacterText(text, maxWidth) {
  const chars = text.split('');
  const lines = [];
  let current = '';
  for (const ch of chars) {
    current += ch;
    if (current.length * 11 > maxWidth) {
      lines.push(current);
      current = '';
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}


// --- ui/render-save-select.js ---


function renderSaveSelect(ctx, game) {
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('选择存档', GAME_WIDTH / 2, 60);
  ctx.shadowBlur = 0;

  const saves = game._getAllSaves();
  const slotW = 320, slotH = 200, gap = 30;
  const totalW = 3 * slotW + 2 * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const startY = 100;

  game._saveSlotBounds = [];

  for (let i = 0; i < 3; i++) {
    const sx = startX + i * (slotW + gap);
    const sy = startY;
    const save = saves[i];
    const hov = game._saveSlotHovered === i;

    game._saveSlotBounds.push({ x: sx, y: sy, w: slotW, h: slotH, slot: i });

    drawRoundedRect(ctx, sx, sy, slotW, slotH, 10);
    ctx.fillStyle = hov ? 'rgba(255, 212, 59, 0.12)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = hov ? '#ffd43b' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 22px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`存档 ${i + 1}`, sx + slotW / 2, sy + 35);

    if (save) {
      ctx.fillStyle = '#ccc';
      ctx.font = '15px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(`${save.characterName || '未知'}`, sx + slotW / 2, sy + 65);
      ctx.fillText(`等级: ${save.level || 1}  击杀: ${save.kills || 0}`, sx + slotW / 2, sy + 90);
      ctx.fillText(`分数: ${save.score || 0}  时间: ${save.time || '0:00'}`, sx + slotW / 2, sy + 115);
      ctx.fillStyle = '#888';
      ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(save.date || '', sx + slotW / 2, sy + 140);

      const delBtnX = sx + slotW / 2 - 40, delBtnY = sy + slotH - 45;
      const delHov = game._saveDeleteHovered === i;
      drawButton(ctx, delBtnX, delBtnY, 80, 30, '删除', delHov, {
        fill: 'rgba(255,0,0,0.1)', hoverFill: 'rgba(255,0,0,0.3)',
        stroke: 'rgba(255,0,0,0.4)', hoverStroke: '#ff6b6b',
        text: '#ff6b6b', hoverText: '#ff6b6b', radius: 4
      });
    } else {
      ctx.fillStyle = '#666';
      ctx.font = '18px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('空存档', sx + slotW / 2, sy + slotH / 2);
    }
  }

  const backHov = game._saveBackHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, startY + slotH + 30, 160, 44, '返回', backHov);
}


// --- ui/bestiary-model.js ---







const BESTIARY_CATEGORIES = [
  { id: 'enemies', label: '敌人', accent: '#ff8787' },
  { id: 'weapons', label: '武器', accent: '#ffd43b' },
  { id: 'passives', label: '被动', accent: '#a9e34b' },
  { id: 'evolutions', label: '进化', accent: '#eebefa' },
  { id: 'functional', label: '功能', accent: '#91f2d2' },
  { id: 'arcanas', label: '圣杯', accent: '#74c0fc' },
  { id: 'notes', label: '便条', accent: '#f8f1d8' },
  { id: 'relics', label: '遗物', accent: '#74c0fc' }
];

function getBestiaryEntries(categoryId, bestiary = {}, meta = null) {
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

function getBestiaryEntryByKey(categoryId, key, bestiary = {}, meta = null) {
  return getBestiaryEntries(categoryId, bestiary, meta).find(entry => entry.key === key) || null;
}

function paginateBestiaryEntries(entries, page = 0, pageSize = 12) {
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


// --- ui/weapon-preview-model.js ---
function getWeaponPreviewSpec(entry) {
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


// --- ui/render-settings.js ---







const CODEX_TOP = 140;
const CODEX_BOTTOM = GAME_HEIGHT - 92;
const CODEX_MARGIN_X = 44;
const CODEX_GAP = 16;
const CODEX_LEFT_W = 158;
const CODEX_DETAIL_W = 318;

function renderSettings(ctx, game) {
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText('游戏设置', GAME_WIDTH / 2, 60);
  ctx.shadowBlur = 0;

  const tabY = 90, tabW = 120, tabH = 36, tabGap = 8;
  const tabCenterX = GAME_WIDTH / 2;
  const tabs = [
    { id: 'controls', label: '控制' },
    { id: 'bestiary', label: '图鉴' }
  ];
  game._settingsTabBounds = [];
  for (let i = 0; i < tabs.length; i++) {
    const tx = tabCenterX - (tabs.length * tabW + (tabs.length - 1) * tabGap) / 2 + i * (tabW + tabGap);
    const active = game.settingsTab === tabs[i].id;
    const hovered = game._settingsTabHovered === i;
    drawRoundedRect(ctx, tx, tabY, tabW, tabH, 6);
    ctx.fillStyle = active ? 'rgba(255, 212, 59, 0.2)' : (hovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)');
    ctx.fill();
    ctx.strokeStyle = active ? '#ffd43b' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = active ? 2 : 1;
    ctx.stroke();
    ctx.fillStyle = active ? '#ffd43b' : '#ccc';
    ctx.font = 'bold 16px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tabs[i].label, tx + tabW / 2, tabY + tabH / 2);
    game._settingsTabBounds.push({ x: tx, y: tabY, w: tabW, h: tabH, id: tabs[i].id });
  }

  if (game.settingsTab === 'controls') {
    renderControlsTab(ctx, game);
  } else if (game.settingsTab === 'bestiary') {
    renderBestiaryTab(ctx, game);
  }

  const backHov = game._settingsBackHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 70, 160, 44, '返回', backHov);
}

function renderControlsTab(ctx, game) {
  const startY = 150;
  const controls = [
    { key: 'WASD / 方向键', desc: '移动' },
    { key: 'Space', desc: '爆裂技能' },
    { key: 'Shift', desc: '闪避' },
    { key: 'Esc', desc: '暂停' },
    { key: '鼠标点击', desc: '菜单交互' }
  ];

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('操作说明', GAME_WIDTH / 2, startY);

  controls.forEach((ctrl, i) => {
    const y = startY + 40 + i * 40;
    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 16px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(ctrl.key, GAME_WIDTH / 2 - 20, y);
    ctx.fillStyle = '#ccc';
    ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(ctrl.desc, GAME_WIDTH / 2 + 20, y);
  });

  const sliderStartY = startY + 40 + controls.length * 40 + 30;
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('音量设置', GAME_WIDTH / 2, sliderStartY);

  const sliderW = 300, sliderH = 8;
  const sliderX = (GAME_WIDTH - sliderW) / 2;

  const musicY = sliderStartY + 40;
  ctx.fillStyle = '#ccc';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`音乐音量: ${Math.round(game.audio.musicVolume * 100)}%`, GAME_WIDTH / 2, musicY - 10);

  drawRoundedRect(ctx, sliderX, musicY, sliderW, sliderH, 4);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fill();
  const musicPct = game.audio.musicVolume;
  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(sliderX, musicY, sliderW * musicPct, sliderH);
  ctx.beginPath();
  ctx.arc(sliderX + sliderW * musicPct, musicY + sliderH / 2, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#ffd43b';
  ctx.fill();
  game._volumeSlider = { musicX: sliderX, musicY: musicY, musicW: sliderW, musicH: sliderH };

  const sfxY = musicY + 50;
  ctx.fillStyle = '#ccc';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`音效音量: ${Math.round(game.audio.sfxVolume * 100)}%`, GAME_WIDTH / 2, sfxY - 10);

  drawRoundedRect(ctx, sliderX, sfxY, sliderW, sliderH, 4);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fill();
  const sfxPct = game.audio.sfxVolume;
  ctx.fillStyle = '#74c0fc';
  ctx.fillRect(sliderX, sfxY, sliderW * sfxPct, sliderH);
  ctx.beginPath();
  ctx.arc(sliderX + sliderW * sfxPct, sfxY + sliderH / 2, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#74c0fc';
  ctx.fill();
  if (game._volumeSlider) {
    game._volumeSlider.sfxX = sliderX;
    game._volumeSlider.sfxY = sfxY;
    game._volumeSlider.sfxW = sliderW;
    game._volumeSlider.sfxH = sliderH;
  }
}

function renderBestiaryTab(ctx, game) {
  const categoryId = BESTIARY_CATEGORIES.some(category => category.id === game._bestiaryCategory)
    ? game._bestiaryCategory
    : 'weapons';
  game._bestiaryCategory = categoryId;

  const leftX = CODEX_MARGIN_X;
  const leftY = CODEX_TOP;
  const leftH = CODEX_BOTTOM - CODEX_TOP;
  const gridX = leftX + CODEX_LEFT_W + CODEX_GAP;
  const detailX = GAME_WIDTH - CODEX_MARGIN_X - CODEX_DETAIL_W;
  const gridW = detailX - gridX - CODEX_GAP;
  const gridH = leftH;
  const cardGap = 12;
  const cardW = 126;
  const cardH = 132;
  const pageControlsH = 48;
  const gridAreaH = gridH - pageControlsH;
  const cols = Math.max(1, Math.floor((gridW + cardGap) / (cardW + cardGap)));
  const rows = Math.max(1, Math.floor((gridAreaH + cardGap) / (cardH + cardGap)));
  const pageSize = cols * rows;
  const entries = getBestiaryEntries(categoryId, game.bestiary, game.meta);
  const pageInfo = paginateBestiaryEntries(entries, game._bestiaryPage || 0, pageSize);

  game._bestiaryPage = pageInfo.page;
  game._bestiaryPageInfo = pageInfo;
  game._bestiaryCategoryBounds = [];
  game._bestiaryCardBounds = [];
  game._bestiaryPageBounds = null;

  drawPanel(ctx, leftX, leftY, CODEX_LEFT_W, leftH);
  drawPanel(ctx, gridX, CODEX_TOP, gridW, gridH);
  drawPanel(ctx, detailX, CODEX_TOP, CODEX_DETAIL_W, gridH);

  renderBestiaryCategories(ctx, game, leftX, leftY, CODEX_LEFT_W, entries);

  const visibleKeys = new Set(pageInfo.items.map(entry => entry.key));
  let selected = getBestiaryEntryByKey(categoryId, game._bestiarySelectedKey, game.bestiary, game.meta);
  if (!selected || !visibleKeys.has(selected.key)) {
    selected = pageInfo.items[0] || entries[0] || null;
    game._bestiarySelectedKey = selected ? selected.key : null;
  }

  renderBestiaryGrid(ctx, game, gridX, CODEX_TOP, gridW, gridH, pageInfo, cols, cardW, cardH, cardGap);
  renderBestiaryDetails(ctx, game, detailX, CODEX_TOP, CODEX_DETAIL_W, gridH, selected);
}

function renderBestiaryCategories(ctx, game, x, y, w) {
  ctx.fillStyle = '#f8f1d8';
  ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('分类', x + 18, y + 32);

  let cy = y + 54;
  const compact = BESTIARY_CATEGORIES.length > 6;
  const rowH = compact ? 46 : 58;
  const rowGap = compact ? 7 : 10;
  for (let i = 0; i < BESTIARY_CATEGORIES.length; i++) {
    const category = BESTIARY_CATEGORIES[i];
    const categoryEntries = getBestiaryEntries(category.id, game.bestiary, game.meta);
    const active = game._bestiaryCategory === category.id;
    const hovered = game._bestiaryCategoryHovered === i;
    const bx = x + 12;
    const by = cy;
    const bw = w - 24;
    const bh = rowH;

    game._bestiaryCategoryBounds.push({ x: bx, y: by, w: bw, h: bh, id: category.id });
    drawRoundedRect(ctx, bx, by, bw, bh, 8);
    ctx.fillStyle = active
      ? hexToRgba(category.accent, 0.20)
      : (hovered ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.045)');
    ctx.fill();
    ctx.strokeStyle = active ? category.accent : 'rgba(255,255,255,0.16)';
    ctx.lineWidth = active ? 2 : 1;
    ctx.stroke();

    ctx.fillStyle = active ? category.accent : '#e8dfc6';
    ctx.font = 'bold 16px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(category.label, bx + 14, by + (compact ? 17 : 22));
    ctx.fillStyle = '#9d9788';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    const unlocked = categoryEntries.filter(entry => entry.unlocked).length;
    ctx.fillText(`${unlocked}/${categoryEntries.length}`, bx + 14, by + (compact ? 34 : 42));

    cy += bh + rowGap;
  }

  if (!compact) {
    ctx.fillStyle = '#8f8878';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    drawWrappedText(ctx, '鼠标滚轮、左右方向键或底部按钮可翻页。', x + 16, y + 360, w - 32, 18, 4);
  }
}

function renderBestiaryGrid(ctx, game, x, y, w, h, pageInfo, cols, cardW, cardH, gap) {
  const category = BESTIARY_CATEGORIES.find(item => item.id === game._bestiaryCategory) || BESTIARY_CATEGORIES[1];
  ctx.fillStyle = '#f8f1d8';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(category.label, x + 18, y + 32);

  ctx.fillStyle = '#8f8878';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`第 ${pageInfo.page + 1}/${pageInfo.totalPages} 页`, x + w - 18, y + 30);

  const totalCardW = cols * cardW + (cols - 1) * gap;
  const startX = x + Math.max(16, (w - totalCardW) / 2);
  const startY = y + 52;
  for (let i = 0; i < pageInfo.items.length; i++) {
    const entry = pageInfo.items[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = startX + col * (cardW + gap);
    const cy = startY + row * (cardH + gap);
    drawBestiaryCard(ctx, game, entry, cx, cy, cardW, cardH, category.accent);
  }

  const controlsY = y + h - 38;
  const prev = { x: x + 18, y: controlsY, w: 88, h: 28, disabled: pageInfo.page <= 0 };
  const next = { x: x + w - 106, y: controlsY, w: 88, h: 28, disabled: pageInfo.page >= pageInfo.totalPages - 1 };
  game._bestiaryPageBounds = { prev, next };
  drawPagerButton(ctx, prev, '上一页', game._bestiaryPageHovered === 'prev');
  drawPagerButton(ctx, next, '下一页', game._bestiaryPageHovered === 'next');

  ctx.fillStyle = '#b9b09d';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const firstIndex = pageInfo.items.length === 0 ? 0 : pageInfo.page * pageInfo.pageSize + 1;
  const lastIndex = pageInfo.page * pageInfo.pageSize + pageInfo.items.length;
  ctx.fillText(`${firstIndex}-${lastIndex} / ${pageInfo.totalItems}`, x + w / 2, controlsY + 14);
}

function drawBestiaryCard(ctx, game, entry, x, y, w, h, accent) {
  const selected = game._bestiarySelectedKey === entry.key;
  const hovered = game._bestiaryHoveredKey === entry.key;
  game._bestiaryCardBounds.push({ x, y, w, h, key: entry.key });

  drawRoundedRect(ctx, x, y, w, h, 8);
  ctx.fillStyle = selected
    ? hexToRgba(accent, 0.17)
    : (hovered ? 'rgba(255,255,255,0.095)' : 'rgba(255,255,255,0.055)');
  ctx.fill();
  ctx.strokeStyle = selected ? accent : (hovered ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.14)');
  ctx.lineWidth = selected ? 2 : 1;
  ctx.stroke();

  const sprite = getEntrySprite(entry);
  if (sprite) {
    drawEntrySprite(ctx, sprite, x + w / 2 - 34, y + 14, 68, entry.unlocked);
  } else {
    drawEntryGlyph(ctx, entry, x + w / 2 - 34, y + 14, 68, getEntryAccent(entry));
  }

  ctx.fillStyle = entry.unlocked ? '#f7f1df' : '#8c8678';
  ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  drawTruncatedText(ctx, entry.name, x + w / 2, y + 98, w - 16);

  const tagText = entry.unlocked ? (entry.tags[0] || entry.nameEn || '') : '未解锁';
  ctx.fillStyle = entry.unlocked ? hexToRgba(accent, 0.26) : 'rgba(0,0,0,0.26)';
  drawRoundedRect(ctx, x + 14, y + h - 24, w - 28, 18, 9);
  ctx.fill();
  ctx.fillStyle = entry.unlocked ? accent : '#746f65';
  ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  drawTruncatedText(ctx, tagText, x + w / 2, y + h - 15, w - 36);
}

function renderBestiaryDetails(ctx, game, x, y, w, h, entry) {
  ctx.fillStyle = '#f8f1d8';
  ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('详情', x + 18, y + 32);

  if (!entry) {
    ctx.fillStyle = '#888';
    ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText('暂无记录', x + 18, y + 72);
    return;
  }

  const accent = getEntryAccent(entry);
  const sprite = getEntrySprite(entry);
  const previewSpec = entry.kind === 'weapon' ? getWeaponPreviewSpec(entry) : null;
  game._bestiaryDetailPreview = previewSpec;
  if (previewSpec) {
    renderWeaponEffectPreview(ctx, x + 18, y + 48, w - 36, 176, entry, sprite, previewSpec, accent);
  } else {
    drawRoundedRect(ctx, x + 58, y + 50, 202, 164, 12);
    ctx.fillStyle = entry.unlocked ? hexToRgba(accent, 0.12) : 'rgba(0,0,0,0.24)';
    ctx.fill();
    ctx.strokeStyle = entry.unlocked ? hexToRgba(accent, 0.58) : 'rgba(255,255,255,0.10)';
    ctx.lineWidth = 1;
    ctx.stroke();
    if (sprite) {
      drawEntrySprite(ctx, sprite, x + 92, y + 66, 134, entry.unlocked);
    } else {
      drawEntryGlyph(ctx, entry, x + 92, y + 66, 134, accent);
    }
  }

  ctx.fillStyle = entry.unlocked ? '#fff6dc' : '#8c8678';
  ctx.font = 'bold 22px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  drawTruncatedText(ctx, entry.name, x + w / 2, y + 250, w - 32);

  ctx.fillStyle = '#9d9788';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  drawTruncatedText(ctx, entry.nameEn || entry.id, x + w / 2, y + 270, w - 36);

  let cursorY = y + 298;
  if (!entry.unlocked) {
    ctx.fillStyle = '#8f8878';
    ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    cursorY = drawWrappedText(ctx, '尚未解锁。图标先以暗色剪影显示，解锁后会记录完整资料。', x + 22, cursorY, w - 44, 19, 3) + 10;
  }

  if (entry.tags.length > 0) {
    cursorY = drawTagRow(ctx, entry.tags, x + 22, cursorY, w - 44, accent) + 14;
  }

  if (entry.recipe) {
    ctx.fillStyle = '#ffd43b';
    ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('进化条件', x + 22, cursorY);
    cursorY += 20;
    ctx.fillStyle = '#ddd3ba';
    ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
    const baseName = WEAPON_DEFS[entry.recipe.baseWeaponId]?.name || EVOLUTION_DEFS[entry.recipe.baseWeaponId]?.name || entry.recipe.baseWeaponId;
    const passiveName = PASSIVE_DEFS[entry.recipe.requiredPassiveId]?.name || entry.recipe.requiredPassiveId;
    cursorY = drawWrappedText(ctx, `${baseName} + ${passiveName}`, x + 22, cursorY, w - 44, 18, 2) + 12;
  }

  if (entry.stats.length > 0) {
    ctx.fillStyle = '#f1e7ce';
    ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('参数', x + 22, cursorY);
    cursorY += 18;
    cursorY = drawStats(ctx, entry.stats, x + 22, cursorY, w - 44) + 14;
  }

  ctx.fillStyle = '#f1e7ce';
  ctx.font = 'bold 13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('记录', x + 22, cursorY);
  cursorY += 20;
  ctx.fillStyle = entry.unlocked ? '#cfc5ad' : '#827c70';
  ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
  drawWrappedText(ctx, entry.summary, x + 22, cursorY, w - 44, 19, 5);
}

function renderWeaponEffectPreview(ctx, x, y, w, h, entry, sprite, previewSpec, accent) {
  drawRoundedRect(ctx, x, y, w, h, 12);
  ctx.fillStyle = 'rgba(5, 8, 13, 0.96)';
  ctx.fill();
  ctx.strokeStyle = entry.unlocked ? hexToRgba(accent, 0.48) : 'rgba(255,255,255,0.10)';
  ctx.lineWidth = 1;
  ctx.stroke();

  const now = getPreviewTime();
  const arena = { x: x + 10, y: y + 26, w: w - 20, h: h - 58 };
  ctx.save();
  drawWeaponPreviewGrid(ctx, arena, accent);
  drawRoundedRect(ctx, arena.x, arena.y, arena.w, arena.h, 8);
  ctx.clip();

  const cx = arena.x + arena.w * 0.38;
  const cy = arena.y + arena.h * 0.54;
  drawWeaponPreviewType(ctx, previewSpec, sprite, cx, cy, arena, now, accent, entry.unlocked);
  drawWeaponPreviewPlayer(ctx, cx, cy, accent);
  ctx.restore();

  ctx.fillStyle = entry.unlocked ? accent : '#8c8678';
  ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  drawTruncatedText(ctx, previewSpec.title, x + 14, y + 18, w - 28);

  ctx.fillStyle = entry.unlocked ? '#bfb59e' : '#746f65';
  ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  drawWrappedText(ctx, previewSpec.caption, x + 14, y + h - 22, w - 28, 14, 1);
}

function drawWeaponPreviewType(ctx, spec, sprite, cx, cy, arena, now, accent, unlocked) {
  if (spec.type === 'sweep') {
    drawWeaponPreviewSweep(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'orbit') {
    drawWeaponPreviewOrbit(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'boomerang') {
    drawWeaponPreviewBoomerang(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'bounce') {
    drawWeaponPreviewBounce(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'needle') {
    drawWeaponPreviewNeedle(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'aura') {
    drawWeaponPreviewAura(ctx, cx, cy, now, accent);
  } else if (spec.type === 'spray') {
    drawWeaponPreviewSpray(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'lob') {
    drawWeaponPreviewLob(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'shield') {
    drawWeaponPreviewShield(ctx, sprite, cx, cy, now, accent, unlocked);
  } else if (spec.type === 'freeze') {
    drawWeaponPreviewFreeze(ctx, sprite, cx, cy, arena, now, accent, unlocked);
  } else if (spec.type === 'clear') {
    drawWeaponPreviewClear(ctx, sprite, cx, cy, arena, now, accent, unlocked);
  } else {
    drawWeaponPreviewOrbit(ctx, sprite, cx, cy, now, accent, unlocked);
  }
}

function drawWeaponPreviewSweep(ctx, sprite, cx, cy, now, accent, unlocked) {
  const p = (Math.sin(now * 3.6) + 1) / 2;
  const start = -Math.PI * 0.92 + p * 0.36;
  const end = start + Math.PI * 0.72;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, 46 + i * 5, start - i * 0.05, end - i * 0.03);
    ctx.strokeStyle = hexToRgba(accent, 0.45 - i * 0.08);
    ctx.lineWidth = 8 - i;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  const sx = cx + Math.cos(end) * 58;
  const sy = cy + Math.sin(end) * 58;
  drawWeaponPreviewSprite(ctx, sprite, sx, sy, 34, end + Math.PI / 2, unlocked, 0.92);
}

function drawWeaponPreviewOrbit(ctx, sprite, cx, cy, now, accent, unlocked) {
  const radius = 52;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = hexToRgba(accent, 0.24);
  ctx.lineWidth = 2;
  ctx.stroke();
  for (let i = 0; i < 3; i++) {
    const a = now * 1.8 + i * Math.PI * 2 / 3;
    drawWeaponPreviewSprite(ctx, sprite, cx + Math.cos(a) * radius, cy + Math.sin(a) * radius, 30, a + Math.PI / 2, unlocked, 0.9);
  }
}

function drawWeaponPreviewBoomerang(ctx, sprite, cx, cy, now, accent, unlocked) {
  ctx.beginPath();
  ctx.ellipse(cx + 46, cy, 78, 28, 0, 0, Math.PI * 2);
  ctx.strokeStyle = hexToRgba(accent, 0.24);
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.stroke();
  ctx.setLineDash([]);
  const a = now * 1.7;
  const px = cx + 46 + Math.cos(a) * 78;
  const py = cy + Math.sin(a) * 28;
  drawWeaponPreviewTrail(ctx, px, py, accent);
  drawWeaponPreviewSprite(ctx, sprite, px, py, 34, a * 3.2, unlocked, 0.96);
}

function drawWeaponPreviewBounce(ctx, sprite, cx, cy, now, accent, unlocked) {
  const points = [
    { x: cx - 4, y: cy },
    { x: cx + 70, y: cy - 34 },
    { x: cx + 102, y: cy + 30 },
    { x: cx + 38, y: cy + 44 },
    { x: cx + 92, y: cy - 2 }
  ];
  ctx.strokeStyle = hexToRgba(accent, 0.28);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
  ctx.stroke();
  for (const point of points.slice(1)) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fill();
  }
  const moving = interpolatePreviewPath(points, (now * 0.75) % 1);
  drawWeaponPreviewTrail(ctx, moving.x, moving.y, accent);
  drawWeaponPreviewSprite(ctx, sprite, moving.x, moving.y, 32, moving.angle, unlocked, 0.96);
}

function drawWeaponPreviewNeedle(ctx, sprite, cx, cy, now, accent, unlocked) {
  const lanes = [-16, 0, 16];
  const angle = -0.08;
  const progress = (now * 1.45) % 1;
  ctx.lineCap = 'round';
  for (let i = 0; i < lanes.length; i++) {
    const y = cy + lanes[i] + Math.sin(now * 2.4 + i) * 2;
    ctx.strokeStyle = hexToRgba(accent, i === 1 ? 0.26 : 0.14);
    ctx.lineWidth = i === 1 ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(cx + 8, y);
    ctx.lineTo(cx + 116, y - 8);
    ctx.stroke();
  }
  for (let i = 0; i < 2; i++) {
    const p = (progress + i * 0.38) % 1;
    const x = cx + 16 + p * 106;
    const y = cy - 4 - p * 8 + Math.sin(p * Math.PI * 2) * 3;
    drawWeaponPreviewTrail(ctx, x - 2, y, accent);
    drawWeaponPreviewSprite(ctx, sprite, x, y, 30, angle, unlocked, 0.96);
  }
}

function drawWeaponPreviewAura(ctx, cx, cy, now, accent) {
  for (let i = 0; i < 3; i++) {
    const p = (now * 0.8 + i / 3) % 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 34 + p * 44, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(accent, 0.34 * (1 - p));
    ctx.lineWidth = 8 - p * 5;
    ctx.stroke();
  }
}

function drawWeaponPreviewSpray(ctx, sprite, cx, cy, now, accent, unlocked) {
  const spread = Math.PI / 3.3;
  const dir = -0.12 + Math.sin(now * 1.6) * 0.08;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, 112, dir - spread / 2, dir + spread / 2);
  ctx.closePath();
  ctx.fillStyle = hexToRgba(accent, 0.16);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(accent, 0.34);
  ctx.lineWidth = 2;
  ctx.stroke();
  for (let i = 0; i < 11; i++) {
    const p = (now * 1.3 + i * 0.17) % 1;
    const a = dir - spread / 2 + spread * ((i % 5) / 4);
    const d = 22 + p * 88;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 3 + p * 2, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accent, 0.62 * (1 - p * 0.35));
    ctx.fill();
  }
  drawWeaponPreviewSprite(ctx, sprite, cx + 22, cy - 10, 28, -0.7, unlocked, 0.9);
}

function drawWeaponPreviewLob(ctx, sprite, cx, cy, now, accent, unlocked) {
  const p = (now * 0.65) % 1;
  const tx = cx + 96;
  const ty = cy + 30;
  ctx.strokeStyle = hexToRgba(accent, 0.26);
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 6]);
  ctx.beginPath();
  ctx.moveTo(cx + 12, cy - 8);
  ctx.quadraticCurveTo(cx + 54, cy - 74, tx, ty);
  ctx.stroke();
  ctx.setLineDash([]);
  const px = cx + 12 + (tx - cx - 12) * p;
  const py = (cy - 8) * (1 - p) + ty * p - Math.sin(p * Math.PI) * 58;
  ctx.beginPath();
  ctx.arc(tx, ty, 20 + Math.sin(now * 4) * 3, 0, Math.PI * 2);
  ctx.fillStyle = hexToRgba(accent, 0.13);
  ctx.fill();
  drawWeaponPreviewSprite(ctx, sprite, px, py, 30, p * Math.PI * 2, unlocked, 0.95);
}

function drawWeaponPreviewShield(ctx, sprite, cx, cy, now, accent, unlocked) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, 36 + i * 12 + Math.sin(now * 3 + i) * 2, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(accent, 0.34 - i * 0.07);
    ctx.lineWidth = 3;
    ctx.stroke();
  }
  for (let i = 0; i < 6; i++) {
    const a = now * 0.9 + i * Math.PI / 3;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * 62, cy + Math.sin(a) * 62, 3, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accent, 0.58);
    ctx.fill();
  }
  drawWeaponPreviewSprite(ctx, sprite, cx + 72, cy - 36, 28, now, unlocked, 0.82);
}

function drawWeaponPreviewFreeze(ctx, sprite, cx, cy, arena, now, accent, unlocked) {
  const sweep = (Math.sin(now * 1.6) + 1) / 2;
  const angle = -0.48 + sweep * 0.96;
  const endX = cx + Math.cos(angle) * (arena.w * 0.62);
  const endY = cy + Math.sin(angle) * (arena.w * 0.62);
  const gradient = ctx.createLinearGradient(cx, cy, endX, endY);
  gradient.addColorStop(0, 'rgba(145, 242, 210, 0.06)');
  gradient.addColorStop(1, 'rgba(116, 192, 252, 0.48)');
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 18;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(226, 250, 255, 0.68)';
  ctx.lineWidth = 2;
  ctx.stroke();
  drawWeaponPreviewSprite(ctx, sprite, cx + 20, cy - 24, 30, angle, unlocked, 0.84);
}

function drawWeaponPreviewClear(ctx, sprite, cx, cy, arena, now, accent, unlocked) {
  for (let i = 0; i < 3; i++) {
    const p = (now * 0.55 + i / 3) % 1;
    ctx.beginPath();
    ctx.arc(cx, cy, p * arena.w * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = hexToRgba(accent, 0.42 * (1 - p));
    ctx.lineWidth = 7 - p * 4;
    ctx.stroke();
  }
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI * 2 / 12 + now * 0.4;
    const d = 46 + Math.sin(now * 2 + i) * 7;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accent, 0.54);
    ctx.fill();
  }
  drawWeaponPreviewSprite(ctx, sprite, cx + 78, cy - 20, 30, Math.sin(now) * 0.2, unlocked, 0.84);
}

function drawWeaponPreviewGrid(ctx, arena, accent) {
  drawRoundedRect(ctx, arena.x, arena.y, arena.w, arena.h, 8);
  ctx.fillStyle = 'rgba(255,255,255,0.035)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 1;
  for (let gx = arena.x + 20; gx < arena.x + arena.w; gx += 28) {
    ctx.beginPath();
    ctx.moveTo(gx, arena.y);
    ctx.lineTo(gx, arena.y + arena.h);
    ctx.stroke();
  }
  for (let gy = arena.y + 20; gy < arena.y + arena.h; gy += 28) {
    ctx.beginPath();
    ctx.moveTo(arena.x, gy);
    ctx.lineTo(arena.x + arena.w, gy);
    ctx.stroke();
  }
  ctx.strokeStyle = hexToRgba(accent, 0.18);
  ctx.strokeRect(arena.x + 0.5, arena.y + 0.5, arena.w - 1, arena.h - 1);
}

function drawWeaponPreviewPlayer(ctx, cx, cy, accent) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 16, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(8, 10, 15, 0.96)';
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#fff4cf';
  ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('P', cx, cy + 0.5);
  ctx.restore();
}

function drawWeaponPreviewSprite(ctx, sprite, cx, cy, size, rotation, unlocked, alpha) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation || 0);
  ctx.globalAlpha = alpha;
  if (!unlocked) ctx.filter = 'grayscale(1) brightness(0.55) contrast(1.2)';
  if (isSpriteReady(sprite)) {
    drawContainImage(ctx, sprite, -size / 2, -size / 2, size, size);
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.34, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fill();
  }
  ctx.restore();
}

function drawWeaponPreviewTrail(ctx, x, y, accent) {
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(x - i * 10, y + i * 2, 12 - i * 3, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accent, 0.16 - i * 0.04);
    ctx.fill();
  }
}

function interpolatePreviewPath(points, progress) {
  const scaled = progress * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(scaled));
  const local = scaled - index;
  const a = points[index];
  const b = points[index + 1];
  return {
    x: a.x + (b.x - a.x) * local,
    y: a.y + (b.y - a.y) * local,
    angle: Math.atan2(b.y - a.y, b.x - a.x)
  };
}

function getPreviewTime() {
  if (typeof performance !== 'undefined' && performance.now) return performance.now() / 1000;
  return Date.now() / 1000;
}

function drawPanel(ctx, x, y, w, h) {
  drawRoundedRect(ctx, x, y, w, h, 10);
  ctx.fillStyle = 'rgba(11, 13, 18, 0.78)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawPagerButton(ctx, bounds, label, hovered) {
  drawRoundedRect(ctx, bounds.x, bounds.y, bounds.w, bounds.h, 6);
  ctx.fillStyle = bounds.disabled
    ? 'rgba(255,255,255,0.035)'
    : (hovered ? 'rgba(255,212,59,0.20)' : 'rgba(255,255,255,0.065)');
  ctx.fill();
  ctx.strokeStyle = bounds.disabled ? 'rgba(255,255,255,0.08)' : (hovered ? '#ffd43b' : 'rgba(255,255,255,0.22)');
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = bounds.disabled ? '#555' : (hovered ? '#ffd43b' : '#d8d0bd');
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, bounds.x + bounds.w / 2, bounds.y + bounds.h / 2);
}

function getEntrySprite(entry) {
  if (entry.kind === 'enemy') return ENEMY_SPRITES[entry.spriteId];
  if (entry.kind === 'weapon') return WEAPON_SPRITES[entry.spriteId];
  if (entry.kind === 'passive') return PASSIVE_SPRITES[entry.spriteId];
  return null;
}

function drawEntryGlyph(ctx, entry, x, y, size, accent) {
  ctx.save();
  if (!entry.unlocked) ctx.globalAlpha = 0.48;
  if (entry.kind === 'arcana') {
    drawArcanaIcon(ctx, entry.data, x + size / 2, y + size / 2, size * 0.82, {
      locked: !entry.unlocked,
      alpha: entry.unlocked ? 1 : 0.5
    });
    ctx.restore();
    return;
  }
  const cx = x + size / 2;
  const cy = y + size / 2;
  ctx.fillStyle = entry.unlocked ? hexToRgba(accent, 0.18) : 'rgba(0,0,0,0.35)';
  ctx.strokeStyle = entry.unlocked ? accent : '#6d675f';
  ctx.lineWidth = Math.max(2, size * 0.035);
  if (entry.kind === 'note') {
    ctx.translate(cx, cy);
    ctx.rotate(-0.12);
    drawRoundedRect(ctx, -size * 0.28, -size * 0.34, size * 0.56, size * 0.68, size * 0.05);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = entry.unlocked ? hexToRgba(accent, 0.65) : '#6d675f';
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(-size * 0.18, -size * 0.16 + i * size * 0.1);
      ctx.lineTo(size * 0.18, -size * 0.16 + i * size * 0.1);
      ctx.stroke();
    }
  } else if (entry.kind === 'relic') {
    ctx.translate(cx, cy);
    drawRoundedRect(ctx, -size * 0.32, -size * 0.22, size * 0.64, size * 0.44, size * 0.08);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-size * 0.32, -size * 0.05);
    ctx.lineTo(size * 0.32, -size * 0.05);
    ctx.moveTo(0, -size * 0.22);
    ctx.lineTo(0, size * 0.22);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -size * 0.05, size * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = entry.unlocked ? '#fff8dc' : '#777';
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawEntrySprite(ctx, sprite, x, y, size, unlocked) {
  if (!unlocked) {
    ctx.save();
    ctx.fillStyle = 'rgba(3, 4, 7, 0.28)';
    ctx.beginPath();
    ctx.ellipse(x + size / 2, y + size / 2, size * 0.44, size * 0.38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  if (!unlocked) {
    ctx.globalAlpha = 0.58;
    ctx.filter = 'grayscale(1) brightness(0.45) contrast(1.25)';
  }

  if (isSpriteReady(sprite)) {
    drawContainImage(ctx, sprite, x, y, size, size);
  } else {
    ctx.filter = 'none';
    ctx.globalAlpha = unlocked ? 1 : 0.42;
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size * 0.34, 0, Math.PI * 2);
    ctx.fillStyle = unlocked ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.45)';
    ctx.fill();
    ctx.fillStyle = unlocked ? '#ddd' : '#666';
    ctx.font = `bold ${Math.round(size * 0.34)}px "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('?', x + size / 2, y + size / 2);
  }
  ctx.restore();
}

function drawContainImage(ctx, img, x, y, w, h) {
  const iw = img.naturalWidth || img.width || w;
  const ih = img.naturalHeight || img.height || h;
  const ratio = Math.min(w / iw, h / ih);
  const dw = iw * ratio;
  const dh = ih * ratio;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
}

function isSpriteReady(sprite) {
  if (!sprite) return false;
  if (typeof HTMLCanvasElement !== 'undefined' && sprite instanceof HTMLCanvasElement) return true;
  return !!(sprite.complete && sprite.naturalWidth > 0);
}

function drawStats(ctx, stats, x, y, w) {
  const colW = Math.floor(w / 2) - 6;
  for (let i = 0; i < stats.length; i++) {
    const stat = stats[i];
    const col = i % 2;
    const row = Math.floor(i / 2);
    const sx = x + col * (colW + 12);
    const sy = y + row * 34;
    drawRoundedRect(ctx, sx, sy, colW, 26, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.055)';
    ctx.fill();
    ctx.fillStyle = '#9d9788';
    ctx.font = '10px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    drawTruncatedText(ctx, stat.label, sx + 8, sy + 11, colW - 16);
    ctx.fillStyle = '#f2e7cc';
    ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
    drawTruncatedText(ctx, String(stat.value), sx + 8, sy + 23, colW - 16);
  }
  return y + Math.ceil(stats.length / 2) * 34;
}

function drawTagRow(ctx, tags, x, y, w, accent) {
  let tx = x;
  let ty = y;
  for (const tag of tags.slice(0, 6)) {
    const label = String(tag);
    const tw = Math.min(96, Math.max(48, ctx.measureText(label).width + 20));
    if (tx + tw > x + w) {
      tx = x;
      ty += 26;
    }
    drawRoundedRect(ctx, tx, ty, tw, 20, 10);
    ctx.fillStyle = hexToRgba(accent, 0.18);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.font = '11px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, tx + tw / 2, ty + 10);
    tx += tw + 6;
  }
  return ty + 20;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const chars = String(text || '').split('');
  let line = '';
  let lineCount = 0;
  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lineCount++;
      if (lineCount >= maxLines) {
        drawTruncatedText(ctx, line, x, y, maxWidth);
        return y + lineHeight;
      }
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = chars[i];
    } else {
      line = testLine;
    }
  }
  if (line && lineCount < maxLines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

function drawTruncatedText(ctx, text, x, y, maxWidth) {
  const value = String(text || '');
  if (ctx.measureText(value).width <= maxWidth) {
    ctx.fillText(value, x, y);
    return;
  }
  let trimmed = value;
  while (trimmed.length > 1 && ctx.measureText(`${trimmed}...`).width > maxWidth) {
    trimmed = trimmed.slice(0, -1);
  }
  ctx.fillText(`${trimmed}...`, x, y);
}

function getEntryAccent(entry) {
  const category = BESTIARY_CATEGORIES.find(item => item.id === entry.categoryId);
  if (category) return category.accent;
  if (entry.kind === 'enemy') return '#ff8787';
  return '#ffd43b';
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace('#', '');
  const value = parseInt(normalized, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


// --- ui/render-skilltree.js ---





const NODE_W = 190;
const NODE_H = 82;
const START_X = 260;
const START_Y = 158;
const COL_GAP = 220;
const ROW_GAP = 122;

function renderSkillTree(ctx, game) {
  ctx.fillStyle = '#080a10';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff6dc';
  ctx.font = 'bold 40px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('天赋树', GAME_WIDTH / 2, 62);

  const m4 = game.meta?.m4 || {};
  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`星级评价: ${m4.starCurrency || 0}`, GAME_WIDTH / 2, 96);

  game._talentNodeBounds = [];

  TALENT_BRANCHES.forEach((branch, col) => {
    const x = START_X + col * COL_GAP;
    ctx.fillStyle = branch.accent;
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(branch.name, x + NODE_W / 2, START_Y - 28);

    const branchNodes = Object.values(TALENT_TREE.nodes).filter(node => node.branch === branch.id);
    branchNodes.forEach((node, row) => {
      drawTalentNode(ctx, game, node, x, START_Y + row * ROW_GAP, branch.accent);
      if (row < branchNodes.length - 1) {
        ctx.strokeStyle = skillTreeHexToRgba(branch.accent, 0.45);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + NODE_W / 2, START_Y + row * ROW_GAP + NODE_H);
        ctx.lineTo(x + NODE_W / 2, START_Y + (row + 1) * ROW_GAP);
        ctx.stroke();
      }
    });
  });

  game._talentBackBounds = { x: GAME_WIDTH / 2 - 80, y: GAME_HEIGHT - 72, w: 160, h: 44 };
  drawButton(ctx, game._talentBackBounds.x, game._talentBackBounds.y, game._talentBackBounds.w, game._talentBackBounds.h, '返回', game._talentBackHovered);
}

function handleSkillTreeClick(game, mx, my) {
  for (const node of game._talentNodeBounds || []) {
    if (!pointInRect(mx, my, node.x, node.y, node.w, node.h)) continue;
    const result = unlockTalent(game.meta.m4, node.id);
    if (result.ok) {
      game.meta.m4 = result.meta;
      game.meta = saveMeta(game.meta);
      game.audio.playLevelUp();
    } else {
      game.audio.playMenuClick();
    }
    return true;
  }
  if (game._talentBackBounds && pointInRect(mx, my, game._talentBackBounds.x, game._talentBackBounds.y, game._talentBackBounds.w, game._talentBackBounds.h)) {
    game.setState('MENU');
    game.audio.playMenuClick();
    return true;
  }
  return false;
}

function handleSkillTreeHover(game, mx, my) {
  game._talentNodeHovered = null;
  game._talentBackHovered = false;
  for (const node of game._talentNodeBounds || []) {
    if (pointInRect(mx, my, node.x, node.y, node.w, node.h)) {
      game._talentNodeHovered = node.id;
      break;
    }
  }
  if (game._talentBackBounds) {
    const b = game._talentBackBounds;
    game._talentBackHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
  }
}

function drawTalentNode(ctx, game, node, x, y, accent) {
  const m4 = game.meta?.m4 || {};
  const owned = (m4.talents || []).includes(node.id);
  const check = canUnlockTalent(m4, node.id);
  const hovered = game._talentNodeHovered === node.id;
  const locked = !owned && !check.ok;

  game._talentNodeBounds.push({ x, y, w: NODE_W, h: NODE_H, id: node.id });

  drawRoundedRect(ctx, x, y, NODE_W, NODE_H, 8);
  ctx.fillStyle = owned
    ? skillTreeHexToRgba(accent, 0.24)
    : (hovered && !locked ? 'rgba(255,255,255,0.11)' : 'rgba(255,255,255,0.055)');
  ctx.fill();
  ctx.strokeStyle = owned ? accent : (locked ? 'rgba(255,255,255,0.12)' : '#ffd43b');
  ctx.lineWidth = owned ? 2 : 1;
  ctx.stroke();

  ctx.fillStyle = owned ? accent : (locked ? '#8d877a' : '#fff6dc');
  ctx.font = 'bold 15px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(node.name, x + 14, y + 12);

  ctx.fillStyle = locked ? '#746f65' : '#cfc5ad';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  drawWrapped(ctx, node.desc, x + 14, y + 34, NODE_W - 28, 15, 2);

  ctx.fillStyle = owned ? accent : (check.ok ? '#ffd43b' : '#746f65');
  ctx.font = 'bold 12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(owned ? '已解锁' : `${node.cost}★`, x + NODE_W - 14, y + NODE_H - 12);
}

function drawWrapped(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = '';
  let count = 0;
  for (const ch of String(text || '')) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + count * lineHeight);
      line = ch;
      count++;
      if (count >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && count < maxLines) ctx.fillText(line, x, y + count * lineHeight);
}

function skillTreeHexToRgba(hex, alpha) {
  const clean = String(hex || '#ffffff').replace('#', '');
  const value = parseInt(clean.length === 3 ? clean.split('').map(ch => ch + ch).join('') : clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


// --- ui/render-arcana.js ---



function renderArcanaSelect(ctx, game) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 32px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(255, 212, 59, 0.5)';
  ctx.shadowBlur = 15;
  ctx.fillText('选择塔罗牌', GAME_WIDTH / 2, 80);
  ctx.shadowBlur = 0;

  const options = game.arcanaOptions && game.arcanaOptions.length > 0 ? game.arcanaOptions : ARCANAS.slice(0, 3);
  const cardW = 240, cardH = 280, gap = 34;
  const totalW = options.length * cardW + (options.length - 1) * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const startY = 120;

  game._arcanaCardBounds = [];

  for (let i = 0; i < options.length; i++) {
    const arcana = options[i];
    const cx = startX + i * (cardW + gap);
    const cy = startY;
    const hov = game._arcanaHovered === i;
    const canSelect = game.player.arcanaInventory.canAdd(arcana.id);
    const currentCount = game.player.arcanaInventory.getCount(arcana.id);

    game._arcanaCardBounds.push({ x: cx, y: cy, w: cardW, h: cardH, index: i });

    drawRoundedRect(ctx, cx, cy, cardW, cardH, 10);
    ctx.fillStyle = hov && canSelect ? 'rgba(255, 212, 59, 0.15)' : 'rgba(255, 255, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = hov && canSelect ? '#ffd43b' : (canSelect ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)');
    ctx.lineWidth = hov && canSelect ? 2 : 1;
    ctx.stroke();

    drawArcanaIcon(ctx, arcana, cx + cardW / 2, cy + 62, 110, { locked: !canSelect });

    ctx.fillStyle = canSelect ? '#fff' : '#555';
    ctx.font = 'bold 20px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(arcana.name, cx + cardW / 2, cy + 120);

    ctx.fillStyle = canSelect ? '#aaa' : '#444';
    ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(arcana.nameEn, cx + cardW / 2, cy + 142);

    ctx.fillStyle = canSelect ? '#ccc' : '#444';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    const descLines = wrapArcanaText(arcana.desc, cardW - 30);
    descLines.forEach((line, li) => {
      ctx.fillText(line, cx + cardW / 2, cy + 170 + li * 18);
    });

    if (currentCount > 0) {
      ctx.fillStyle = '#ffd43b';
      ctx.font = 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText(`已拥有 x${currentCount}`, cx + cardW / 2, cy + cardH - 40);
    }

    if (!canSelect) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      drawRoundedRect(ctx, cx, cy, cardW, cardH, 10);
      ctx.fill();
      ctx.fillStyle = '#888';
      ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
      ctx.fillText('已满', cx + cardW / 2, cy + cardH - 20);
    }
  }

  const skipHov = game._arcanaSkipHovered;
  drawButton(ctx, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 80, 160, 44, '跳过', skipHov);
}

function wrapArcanaText(text, maxWidth) {
  const chars = text.split('');
  const lines = [];
  let current = '';
  for (const ch of chars) {
    current += ch;
    if (current.length * 12 > maxWidth) {
      lines.push(current);
      current = '';
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}


// --- ui/render-levelup.js ---

function renderLevelUp(ctx, game) {
  const options = game.levelUpOptions || [];
  game._levelUpCardBounds = [];
  game._levelUpControlBounds = {};

  ctx.save();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.72)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 34px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('选择一道升级', GAME_WIDTH / 2, 110);

  const cardW = 290;
  const cardH = 250;
  const gap = 28;
  const totalW = options.length * cardW + Math.max(0, options.length - 1) * gap;
  const startX = (GAME_WIDTH - totalW) / 2;
  const y = 190;

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const x = startX + i * (cardW + gap);
    const hovered = game._levelUpHovered === i;
    const banishRect = { x: x + cardW - 78, y: y + 14, w: 28, h: 26 };
    const sealRect = { x: x + cardW - 42, y: y + 14, w: 28, h: 26 };
    game._levelUpCardBounds.push({
      x, y, w: cardW, h: cardH, index: i,
      banishX: banishRect.x, banishY: banishRect.y, banishW: banishRect.w, banishH: banishRect.h,
      sealX: sealRect.x, sealY: sealRect.y, sealW: sealRect.w, sealH: sealRect.h
    });

    ctx.fillStyle = hovered ? 'rgba(80, 52, 24, 0.96)' : 'rgba(28, 24, 30, 0.96)';
    ctx.fillRect(x, y, cardW, cardH);
    ctx.strokeStyle = hovered ? '#ffd43b' : 'rgba(255,255,255,0.26)';
    ctx.lineWidth = hovered ? 3 : 1;
    ctx.strokeRect(x, y, cardW, cardH);

    ctx.fillStyle = option.kind === 'passive' ? '#74c0fc' : (option.kind === 'fallback' ? '#69db7c' : '#ff922b');
    ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(option.name, x + 22, y + 34);

    if (option.kind !== 'fallback') {
      drawMiniButton(ctx, banishRect, 'B', game._levelUpBanishHovered === i, game.levelUpControls?.banish <= 0);
      drawMiniButton(ctx, sealRect, 'S', game._levelUpSealHovered === i, game.levelUpControls?.seal <= 0);
    }

    ctx.fillStyle = '#ffd43b';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    const levelText = option.kind === 'fallback' ? '保底' : (option.isNew ? 'NEW' : `Lv.${option.level}`);
    ctx.fillText(levelText, x + 22, y + 64);

    ctx.fillStyle = '#fff';
    ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
    wrapLevelUpText(ctx, option.desc, x + 22, y + 104, cardW - 44, 22, 3);

    ctx.fillStyle = '#aaa';
    ctx.font = 'italic 12px "Segoe UI", "Microsoft YaHei", sans-serif';
    wrapLevelUpText(ctx, option.flavor || '', x + 22, y + 188, cardW - 44, 18, 2);
  }

  const controlsY = GAME_HEIGHT - 118;
  const reroll = { x: GAME_WIDTH / 2 - 180, y: controlsY, w: 160, h: 42 };
  const skip = { x: GAME_WIDTH / 2 + 20, y: controlsY, w: 160, h: 42 };
  game._levelUpControlBounds.reroll = reroll;
  game._levelUpControlBounds.skip = skip;
  drawControlButton(ctx, reroll, `重抽 ${game.levelUpControls?.reroll ?? 0}`, game._levelUpControlHovered === 'reroll', (game.levelUpControls?.reroll ?? 0) <= 0);
  drawControlButton(ctx, skip, `跳过 +10G ${game.levelUpControls?.skip ?? 0}`, game._levelUpControlHovered === 'skip', (game.levelUpControls?.skip ?? 0) <= 0);

  ctx.fillStyle = '#aaa';
  ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`B 放逐本局剩余 ${game.levelUpControls?.banish ?? 0}   S 永久封印剩余 ${game.levelUpControls?.seal ?? 0}`, GAME_WIDTH / 2, GAME_HEIGHT - 58);
  ctx.restore();
}

function drawMiniButton(ctx, rect, label, hovered, disabled) {
  ctx.save();
  ctx.fillStyle = disabled ? 'rgba(70,70,70,0.8)' : (hovered ? 'rgba(255, 212, 59, 0.9)' : 'rgba(255,255,255,0.13)');
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.15)' : (hovered ? '#fff3bf' : 'rgba(255,255,255,0.28)');
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.fillStyle = disabled ? '#999' : (hovered ? '#1b1300' : '#eee');
  ctx.font = 'bold 13px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.restore();
}

function drawControlButton(ctx, rect, label, hovered, disabled) {
  ctx.save();
  ctx.fillStyle = disabled ? 'rgba(45,45,55,0.9)' : (hovered ? 'rgba(255, 212, 59, 0.25)' : 'rgba(255,255,255,0.08)');
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.12)' : (hovered ? '#ffd43b' : 'rgba(255,255,255,0.28)');
  ctx.lineWidth = hovered ? 2 : 1;
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  ctx.fillStyle = disabled ? '#777' : '#fff';
  ctx.font = 'bold 15px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
  ctx.restore();
}

function wrapLevelUpText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = '';
  let lineCount = 0;
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y + lineCount * lineHeight);
      line = ch;
      lineCount++;
      if (lineCount >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && lineCount < maxLines) ctx.fillText(line, x, y + lineCount * lineHeight);
}


// --- ui/render-chest.js ---

function renderChest(ctx, game) {
  const reward = game.chestReward;
  const elapsed = performance.now() - (game.chestOpenedAt || performance.now());
  const pulse = 1 + Math.sin(elapsed * 0.01) * 0.05;

  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.78)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.translate(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = '#7b3f00';
  ctx.fillRect(-90, -50, 180, 100);
  ctx.fillStyle = '#b56b16';
  ctx.fillRect(-100, -68, 200, 36);
  ctx.strokeStyle = '#ffd43b';
  ctx.lineWidth = 6;
  ctx.strokeRect(-100, -68, 200, 118);
  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(-12, -24, 24, 38);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 34px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(reward?.name || '神秘便当盒', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100);

  ctx.fillStyle = '#fff';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(reward?.desc || '正在打开...', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 136);

  ctx.fillStyle = '#aaa';
  ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText('点击或按 Esc 跳过', GAME_WIDTH / 2, GAME_HEIGHT - 70);
  ctx.restore();
}


// --- ui/render-powerup.js ---




function renderPowerUp(ctx, game) {
  const meta = game.meta;
  ctx.fillStyle = '#0b0b14';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 38px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('能力强化', GAME_WIDTH / 2, 58);

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 19px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`跨局金币：${meta.goldBank}`, GAME_WIDTH / 2, 96);

  game._powerUpRowBounds = [];
  const ids = Object.keys(POWERUP_DEFS);
  const startX = 190;
  const startY = 132;
  const rowW = GAME_WIDTH - 380;
  const rowH = 54;
  const gap = 12;

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const def = POWERUP_DEFS[id];
    const entry = meta.powerUps[id] || { level: 0 };
    const y = startY + i * (rowH + gap);
    const hovered = game._powerUpHovered === i;
    const maxed = entry.level >= def.maxLevel;
    const cost = getPowerUpCost(id, entry.level);
    const canBuy = !maxed && meta.goldBank >= cost;

    ctx.fillStyle = hovered ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.045)';
    roundPowerUpRect(ctx, startX, y, rowW, rowH, 8);
    ctx.fill();
    ctx.strokeStyle = hovered ? 'rgba(255,212,59,0.45)' : 'rgba(255,255,255,0.14)';
    ctx.stroke();

    const sprite = POWERUP_SPRITES[id];
    if (isPowerUpDrawableImage(sprite)) {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.45)';
      ctx.shadowBlur = 8;
      ctx.drawImage(sprite, startX + 14, y + 7, 40, 40);
      ctx.restore();
    }

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 17px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(def.name, startX + 68, y + 19);

    ctx.fillStyle = '#aaa';
    ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.fillText(def.desc, startX + 68, y + 39);

    const dotsX = startX + rowW - 310;
    for (let lv = 0; lv < def.maxLevel; lv++) {
      ctx.beginPath();
      ctx.arc(dotsX + lv * 18, y + rowH / 2, 6, 0, Math.PI * 2);
      ctx.fillStyle = lv < entry.level ? '#ffd43b' : 'rgba(255,255,255,0.16)';
      ctx.fill();
    }

    const buyX = startX + rowW - 148;
    const buyY = y + 10;
    const buyW = 116;
    const buyH = 34;
    game._powerUpRowBounds.push({ id, x: startX, y, w: rowW, h: rowH, buyX, buyY, buyW, buyH });
    drawSmallButton(ctx, buyX, buyY, buyW, buyH, maxed ? '已满' : `${cost}G`, hovered && canBuy, !canBuy);
  }

  const refund = getPowerUpTotalCost(meta.powerUps);
  game._powerUpRefundBounds = { x: GAME_WIDTH / 2 - 190, y: GAME_HEIGHT - 82, w: 160, h: 44 };
  game._powerUpBackBounds = { x: GAME_WIDTH / 2 + 30, y: GAME_HEIGHT - 82, w: 160, h: 44 };
  drawButton(ctx, game._powerUpRefundBounds.x, game._powerUpRefundBounds.y, game._powerUpRefundBounds.w, game._powerUpRefundBounds.h, `退款 ${refund}G`, game._powerUpRefundHovered);
  drawButton(ctx, game._powerUpBackBounds.x, game._powerUpBackBounds.y, game._powerUpBackBounds.w, game._powerUpBackBounds.h, '返回', game._powerUpBackHovered);
}

function isPowerUpDrawableImage(sprite) {
  return sprite && (
    sprite instanceof HTMLCanvasElement ||
    (sprite.complete && sprite.naturalWidth > 0)
  );
}

function drawSmallButton(ctx, x, y, w, h, label, hovered, disabled) {
  ctx.save();
  roundPowerUpRect(ctx, x, y, w, h, 7);
  ctx.fillStyle = disabled ? 'rgba(80,80,90,0.8)' : (hovered ? 'rgba(255, 212, 59, 0.92)' : 'rgba(255, 212, 59, 0.18)');
  ctx.fill();
  ctx.strokeStyle = disabled ? 'rgba(255,255,255,0.12)' : '#ffd43b';
  ctx.stroke();
  ctx.fillStyle = disabled ? '#888' : (hovered ? '#1d1600' : '#ffd43b');
  ctx.font = 'bold 14px "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + w / 2, y + h / 2);
  ctx.restore();
}

function roundPowerUpRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}


// --- ui/render-interactable-choice.js ---



function renderInteractableChoice(ctx, game) {
  const item = game.pendingInteractableChoice;
  if (!item) return;
  const def = INTERACTABLE_DEFS[item.interactableType] || {};
  game._interactableChoiceBounds = [];

  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.68)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const panelW = 520;
  const panelH = 260;
  const x = (GAME_WIDTH - panelW) / 2;
  const y = (GAME_HEIGHT - panelH) / 2;
  roundInteractableChoiceRect(ctx, x, y, panelW, panelH, 10);
  ctx.fillStyle = 'rgba(22, 18, 30, 0.96)';
  ctx.fill();
  ctx.strokeStyle = def.color || '#ffd43b';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = def.color || '#ffd43b';
  ctx.font = 'bold 28px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(def.name || '互动物', GAME_WIDTH / 2, y + 56);

  ctx.fillStyle = '#fff';
  ctx.font = '15px "Segoe UI", "Microsoft YaHei", sans-serif';
  wrapInteractableText(ctx, def.desc || '', x + 52, y + 100, panelW - 104, 24, 3);

  const accept = { id: 'sacrifice', x: x + 78, y: y + panelH - 76, w: 160, h: 44 };
  const ignore = { id: 'ignore', x: x + panelW - 238, y: y + panelH - 76, w: 160, h: 44 };
  game._interactableChoiceBounds.push(accept, ignore);
  drawButton(ctx, accept.x, accept.y, accept.w, accept.h, '献祭生命', game._interactableChoiceHovered === 0);
  drawButton(ctx, ignore.x, ignore.y, ignore.w, ignore.h, '忽略', game._interactableChoiceHovered === 1);
  ctx.restore();
}

function wrapInteractableText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  let line = '';
  let count = 0;
  ctx.textAlign = 'center';
  for (const ch of text) {
    const test = line + ch;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x + maxWidth / 2, y + count * lineHeight);
      line = ch;
      count++;
      if (count >= maxLines) return;
    } else {
      line = test;
    }
  }
  if (line && count < maxLines) ctx.fillText(line, x + maxWidth / 2, y + count * lineHeight);
}

function roundInteractableChoiceRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}


// --- ui/render-playing-buttons.js ---


function renderPlayingButtons(ctx, game) {
  const bossBtn = { x: GAME_WIDTH - 160, y: 20, w: 140, h: 44 };
  const hovered = game.bossButtonHovered;
  drawButton(ctx, bossBtn.x, bossBtn.y, bossBtn.w, bossBtn.h,
    game.bossSpawned ? 'Boss 已召唤' : '召唤 Boss', hovered, {
      fill: 'rgba(255, 0, 0, 0.15)', hoverFill: 'rgba(255, 0, 0, 0.25)',
      stroke: 'rgba(255, 107, 107, 0.6)', hoverStroke: '#ff6b6b',
      text: '#ff8787', hoverText: '#ff6b6b'
    });

  const shopBtn = { x: GAME_WIDTH - 160, y: 72, w: 140, h: 44 };
  const shopHovered = game.shopButtonHovered;
  drawButton(ctx, shopBtn.x, shopBtn.y, shopBtn.w, shopBtn.h, '商店', shopHovered, {
    fill: 'rgba(255, 212, 59, 0.15)', hoverFill: 'rgba(255, 212, 59, 0.25)',
    stroke: 'rgba(255, 212, 59, 0.6)', hoverStroke: '#ffd43b',
    text: '#ffe066', hoverText: '#ffd43b'
  });

  const diffBtn = { x: GAME_WIDTH - 160, y: 124, w: 140, h: 44 };
  const diffHovered = game.diffButtonHovered;
  drawButton(ctx, diffBtn.x, diffBtn.y, diffBtn.w, diffBtn.h,
    `难度up x${game.difficultyMultiplier.toFixed(1)}`, diffHovered, {
      fill: 'rgba(255, 146, 43, 0.15)', hoverFill: 'rgba(255, 146, 43, 0.25)',
      stroke: 'rgba(255, 146, 43, 0.6)', hoverStroke: '#ff922b',
      text: '#ffa94d', hoverText: '#ff922b',
      font: 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif'
    });

  const goldBtn = { x: GAME_WIDTH - 160, y: 176, w: 140, h: 44 };
  const goldHovered = game.goldButtonHovered;
  drawButton(ctx, goldBtn.x, goldBtn.y, goldBtn.w, goldBtn.h, '金币 +100', goldHovered, {
    fill: 'rgba(255, 212, 59, 0.15)', hoverFill: 'rgba(255, 212, 59, 0.25)',
    stroke: 'rgba(255, 212, 59, 0.6)', hoverStroke: '#ffd43b',
    text: '#ffe066', hoverText: '#ffd43b',
    font: 'bold 14px "Segoe UI", "Microsoft YaHei", sans-serif'
  });
}


// --- ui/render-level-loading.js ---




function renderLevelLoading(ctx, game) {
  const level = LEVELS[game.selectedLevelIndex] || LEVELS[0];
  const elapsed = performance.now() - game._levelLoadStart;
  const progress = Math.min(1, elapsed / game._levelLoadDuration);

  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const bgImg = LEVEL_BG_IMAGES[level.id];
  if (drawCoverImage(ctx, bgImg, 0, 0, GAME_WIDTH, GAME_HEIGHT)) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  let alpha = 1;
  if (elapsed < 600) alpha = elapsed / 600;
  else if (elapsed > game._levelLoadDuration - 500) alpha = (game._levelLoadDuration - elapsed) / 500;
  alpha = Math.max(0, Math.min(1, alpha));

  ctx.save();
  ctx.globalAlpha = alpha;

  ctx.fillStyle = '#ffd43b';
  ctx.font = 'bold 36px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText(level.name, GAME_WIDTH / 2, 120);
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#aaa';
  ctx.font = '16px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(level.nameEn, GAME_WIDTH / 2, 150);

  ctx.fillStyle = '#ccc';
  ctx.font = '14px "Segoe UI", "Microsoft YaHei", sans-serif';
  const descLines = wrapLevelText(level.loadText, GAME_WIDTH - 120);
  descLines.forEach((line, i) => {
    ctx.fillText(line, GAME_WIDTH / 2, 200 + i * 22);
  });

  const barW = 300, barH = 6;
  const barX = (GAME_WIDTH - barW) / 2;
  const barY = GAME_HEIGHT - 80;
  ctx.fillStyle = 'rgba(255,255,255,0.1)';
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(barX, barY, barW * progress, barH);

  ctx.fillStyle = '#888';
  ctx.font = '13px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText('点击任意位置跳过', GAME_WIDTH / 2, GAME_HEIGHT - 50);

  ctx.restore();
}

function wrapLevelText(text, maxWidth) {
  const chars = text.split('');
  const lines = [];
  let current = '';
  for (const ch of chars) {
    current += ch;
    if (current.length * 14 > maxWidth) {
      lines.push(current);
      current = '';
    }
  }
  if (current) lines.push(current);
  return lines;
}


// --- game/save-system.js ---
class SaveSystem {
  constructor() {
    this.SAVE_KEY_PREFIX = 'vampire_survivors_save_';
  }

  getSave(slot) {
    try {
      const data = localStorage.getItem(this.SAVE_KEY_PREFIX + slot);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return null;
  }

  setSave(slot, data) {
    try {
      localStorage.setItem(this.SAVE_KEY_PREFIX + slot, JSON.stringify(data));
      return true;
    } catch (e) {}
    return false;
  }

  deleteSave(slot) {
    try {
      localStorage.removeItem(this.SAVE_KEY_PREFIX + slot);
      return true;
    } catch (e) {}
    return false;
  }

  getAllSaves() {
    return [0, 1, 2].map(i => this.getSave(i));
  }

  createSaveData(game) {
    const p = game.player;
    const now = new Date();
    return {
      characterId: p.charData ? p.charData.id : null,
      characterName: p.charData ? p.charData.name : '未知',
      level: p.level,
      hp: p.hp,
      maxHp: p.maxHp,
      exp: p.exp,
      gold: p.gold,
      kills: p.kills,
      score: game.score,
      gameTime: game.gameTime,
      playerX: p.x,
      playerY: p.y,
      mapBounds: { ...game.mapBounds },
      time: this.formatTime(game.gameTime),
      waveNumber: game.waveNumber,
      selectedLevelIndex: game.selectedLevelIndex,
      weaponInventory: p.weaponInventory.getAll(),
      passiveInventory: p.passiveInventory.getAll(),
      arcanaInventory: p.arcanaInventory.getAll(),
      date: `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };
  }

  formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
}


// --- game/bestiary.js ---
class Bestiary {
  constructor() {
    this.enemies = {};
    this.weapons = {};
    this.passives = {};
    this.arcanas = {};
    this._load();
  }

  _load() {
    try {
      const saved = localStorage.getItem('vampire_survivors_bestiary');
      if (saved) {
        const data = JSON.parse(saved);
        this.enemies = data.enemies || {};
        this.weapons = data.weapons || {};
        this.passives = data.passives || {};
        this.arcanas = data.arcanas || {};
      }
    } catch (e) {}
  }

  _save() {
    try {
      localStorage.setItem('vampire_survivors_bestiary', JSON.stringify({
        enemies: this.enemies,
        weapons: this.weapons,
        passives: this.passives,
        arcanas: this.arcanas
      }));
    } catch (e) {}
  }

  unlockEnemy(enemyId) {
    if (!this.enemies[enemyId]) {
      this.enemies[enemyId] = true;
      this._save();
    }
  }

  unlockWeapon(weaponId) {
    if (!this.weapons[weaponId]) {
      this.weapons[weaponId] = true;
      this._save();
    }
  }

  unlockPassive(passiveId) {
    if (!this.passives[passiveId]) {
      this.passives[passiveId] = true;
      this._save();
    }
  }

  unlockArcana(arcanaId) {
    if (!this.arcanas[arcanaId]) {
      this.arcanas[arcanaId] = true;
      this._save();
    }
  }

  isEnemyUnlocked(enemyId) {
    return !!this.enemies[enemyId];
  }

  isWeaponUnlocked(weaponId) {
    return !!this.weapons[weaponId];
  }

  isPassiveUnlocked(passiveId) {
    return !!this.passives[passiveId];
  }

  isArcanaUnlocked(arcanaId) {
    return !!this.arcanas[arcanaId];
  }
}

function syncBestiaryInventory(bestiary, inventory) {
  syncBestiaryWeaponsFromInventory(bestiary, inventory);
  syncBestiaryPassivesFromInventory(bestiary, inventory);
  syncBestiaryArcanasFromInventory(bestiary, inventory);
}

function syncBestiaryWeaponsFromInventory(bestiary, inventory) {
  if (!bestiary || !inventory) return;
  const weapons = inventory.weaponInventory?.weapons || inventory.weapons || {};
  for (const item of Object.values(weapons)) {
    const id = item?.id;
    if (id) bestiary.unlockWeapon(id);
  }
}

function syncBestiaryPassivesFromInventory(bestiary, inventory) {
  if (!bestiary || !inventory) return;
  const passives = inventory.passiveInventory?.passives || inventory.passives || {};
  for (const item of Object.values(passives)) {
    const id = item?.id;
    if (id) bestiary.unlockPassive(id);
  }
}

function syncBestiaryArcanasFromInventory(bestiary, inventory) {
  if (!bestiary || !inventory) return;
  const arcanaInventory = inventory.arcanaInventory || {};
  const counts = arcanaInventory.counts || inventory.arcanaCounts || inventory.arcanas || {};
  for (const [id, count] of Object.entries(counts)) {
    if (count > 0) bestiary.unlockArcana(id);
  }
  if (Array.isArray(inventory.arcanaInventory)) {
    for (const item of inventory.arcanaInventory) {
      if (item?.id && (item.count ?? 1) > 0) bestiary.unlockArcana(item.id);
    }
  }
}


// --- game/game-balance.js ---
const WEAPON_SLOT_LIMIT = 6;
const PASSIVE_SLOT_LIMIT = 6;

function expToNextLevel(level) {
  if (level >= 40) return 5 + 16 * (level - 1);
  if (level >= 20) return 5 + 13 * (level - 1);
  return 5 + 10 * (level - 1);
}


// --- game/m4-systems.js ---




const NOTE_IDS = new Set(GOURMANDO_NOTES.map(note => note.id));
const RELIC_IDS = new Set(Object.keys(RELIC_DEFS));
const LORE_THRESHOLDS = [1, 25, 100];

function createDefaultM4Meta() {
  return {
    version: 1,
    notes: [],
    relics: [...LEGACY_RELIC_IDS],
    unlocks: {
      arcana: true,
      musicPlayer: false,
      secrets: false,
      seal: false,
      chestIntel: false,
      familyRestaurant: false,
      mirrorBoss: false
    },
    challengeRecords: {},
    dailyRecords: {},
    talents: [],
    starCurrency: 0,
    endings: [],
    bestiaryKills: {},
    bestiaryLore: {},
    spiceHighest: 0,
    hyperClears: [],
    selectedRunProfile: {
      spiceLevel: 0,
      hyper: false,
      challengeId: null,
      dailyKey: null,
      seed: null
    }
  };
}

function normalizeM4Meta(meta = {}) {
  const defaults = createDefaultM4Meta();
  const source = meta?.m4 ? meta.m4 : meta;
  const next = {
    ...defaults,
    ...(source || {}),
    unlocks: {
      ...defaults.unlocks,
      ...(source?.unlocks || {})
    },
    challengeRecords: {
      ...defaults.challengeRecords,
      ...(source?.challengeRecords || {})
    },
    dailyRecords: {
      ...defaults.dailyRecords,
      ...(source?.dailyRecords || {})
    },
    bestiaryKills: {
      ...defaults.bestiaryKills,
      ...(source?.bestiaryKills || {})
    },
    bestiaryLore: {
      ...defaults.bestiaryLore,
      ...(source?.bestiaryLore || {})
    },
    selectedRunProfile: {
      ...defaults.selectedRunProfile,
      ...(source?.selectedRunProfile || {})
    }
  };

  next.notes = uniqueValid(source?.notes || [], NOTE_IDS);
  next.relics = uniqueValid([...(source?.relics || []), ...LEGACY_RELIC_IDS], RELIC_IDS);
  next.talents = uniqueValid(source?.talents || [], new Set(Object.keys(TALENT_TREE.nodes)));
  next.endings = Array.from(new Set(source?.endings || []));
  next.hyperClears = Array.from(new Set(source?.hyperClears || []));
  next.starCurrency = Math.max(0, Math.floor(Number(source?.starCurrency) || 0));
  next.spiceHighest = Math.max(0, Math.min(5, Math.floor(Number(source?.spiceHighest) || 0)));

  for (const [enemyId, count] of Object.entries(next.bestiaryKills)) {
    next.bestiaryKills[enemyId] = Math.max(0, Math.floor(Number(count) || 0));
    next.bestiaryLore[enemyId] = getLoreStageFromKills(next.bestiaryKills[enemyId]);
  }

  const flags = getM4FeatureFlags(next);
  next.unlocks = { ...next.unlocks, ...flags };
  next.unlocks.mirrorBoss = hasAllNotes(next);
  return next;
}

function getM4FeatureFlags(meta) {
  const m4 = meta?.notes ? meta : normalizeM4Meta(meta);
  const flags = {
    arcana: false,
    musicPlayer: false,
    secrets: false,
    seal: false,
    chestIntel: false,
    familyRestaurant: false,
    mirrorBoss: false
  };
  for (const relicId of m4.relics || []) {
    const relic = RELIC_DEFS[relicId];
    for (const feature of relic?.features || []) {
      flags[feature] = true;
    }
  }
  flags.mirrorBoss = hasAllNotes(m4);
  return flags;
}

function hasRelic(meta, relicId) {
  const m4 = normalizeM4Meta(meta);
  return m4.relics.includes(relicId);
}

function grantRelic(meta, relicId) {
  const m4 = normalizeM4Meta(meta);
  if (!RELIC_IDS.has(relicId)) return m4;
  if (!m4.relics.includes(relicId)) m4.relics.push(relicId);
  m4.unlocks = { ...m4.unlocks, ...getM4FeatureFlags(m4) };
  return m4;
}

function collectNote(meta, noteId) {
  const m4 = normalizeM4Meta(meta);
  if (!NOTE_IDS.has(noteId)) return m4;
  if (!m4.notes.includes(noteId)) m4.notes.push(noteId);
  m4.unlocks.mirrorBoss = hasAllNotes(m4);
  return m4;
}

function hasAllNotes(meta) {
  const notes = meta?.notes || [];
  return GOURMANDO_NOTES.every(note => notes.includes(note.id));
}

function getDailyChallengeForDate(dateKey = getUtcDateKey(new Date())) {
  const normalizedDate = normalizeDateKey(dateKey);
  const seed = hashM4String(`daily:${normalizedDate}`);
  return {
    id: 'daily_special',
    key: normalizedDate,
    date: normalizedDate,
    seed,
    characterId: pickDeterministic(DAILY_CHARACTER_IDS, seed),
    levelId: pickDeterministic(DAILY_LEVEL_IDS, rotateSeed(seed, 7)),
    challengeId: pickDeterministic(DAILY_CHALLENGE_IDS, rotateSeed(seed, 13)),
    spiceLevel: (rotateSeed(seed, 19) % 5) + 1,
    hyper: (rotateSeed(seed, 23) % 2) === 0
  };
}

function applyRunProfileToDifficulty(base, profile = {}) {
  const spiceLevel = clampSpice(profile.spiceLevel);
  const hyper = !!profile.hyper;
  const hpMultiplier = (profile.hpMultiplier ?? 1) * (1 + spiceLevel * 0.15) * (hyper ? 1.17 : 1);
  const atkMultiplier = (profile.atkMultiplier ?? 1) * (1 + spiceLevel * 0.08) * (hyper ? 1.15 : 1);
  const speedMultiplier = (profile.speedMultiplier ?? 1) * (1 + spiceLevel * 0.03) * (hyper ? 1.12 : 1);
  const goldMultiplier = (profile.goldMultiplier ?? 1) * (1 + spiceLevel * 0.10) * (hyper ? 1.25 : 1);
  return {
    ...base,
    hp: Math.max(1, Math.round((base.hp || 1) * hpMultiplier)),
    atk: Math.max(0, Math.round((base.atk || 0) * atkMultiplier)),
    speed: Math.max(0, Number(((base.speed || 0) * speedMultiplier).toFixed(3))),
    gold: Math.max(0, Math.round((base.gold || 0) * goldMultiplier)),
    multipliers: {
      hp: hpMultiplier,
      atk: atkMultiplier,
      speed: speedMultiplier,
      gold: goldMultiplier
    }
  };
}

function canUnlockTalent(meta, talentId) {
  const m4 = normalizeM4Meta(meta);
  const node = TALENT_TREE.nodes[talentId];
  if (!node) return { ok: false, reason: 'missing' };
  if (m4.talents.includes(talentId)) return { ok: false, reason: 'owned' };
  if (m4.starCurrency < node.cost) return { ok: false, reason: 'stars' };
  const missing = (node.prerequisites || []).filter(id => !m4.talents.includes(id));
  if (missing.length > 0) return { ok: false, reason: 'prerequisite', missing };
  return { ok: true, cost: node.cost, node };
}

function unlockTalent(meta, talentId) {
  const m4 = normalizeM4Meta(meta);
  const check = canUnlockTalent(m4, talentId);
  if (!check.ok) return { ok: false, reason: check.reason, meta: m4 };
  m4.starCurrency -= check.cost;
  m4.talents.push(talentId);
  return { ok: true, meta: m4, cost: check.cost };
}

function getTalentEffects(meta) {
  const m4 = normalizeM4Meta(meta);
  const effects = {
    maxHpMultiplier: 1,
    powerMultiplier: 1,
    attackSpeedMultiplier: 1,
    moveSpeedMultiplier: 1,
    magnetMultiplier: 1,
    luckMultiplier: 1,
    goldGainMultiplier: 1,
    revivals: 0,
    armor: 0
  };
  for (const talentId of m4.talents) {
    const nodeEffects = TALENT_TREE.nodes[talentId]?.effects || {};
    for (const [key, value] of Object.entries(nodeEffects)) {
      if (key.endsWith('Multiplier')) {
        effects[key] *= Number(value) || 1;
      } else {
        effects[key] = (effects[key] || 0) + (Number(value) || 0);
      }
    }
  }
  return effects;
}

function recordBestiaryKill(meta, enemyId, amount = 1) {
  const m4 = normalizeM4Meta(meta);
  const add = Math.max(0, Math.floor(Number(amount) || 0));
  if (!enemyId || add <= 0) return m4;
  m4.bestiaryKills[enemyId] = Math.max(0, (m4.bestiaryKills[enemyId] || 0) + add);
  m4.bestiaryLore[enemyId] = getLoreStageFromKills(m4.bestiaryKills[enemyId]);
  return m4;
}

function getEnemyLoreStage(meta, enemyId) {
  const m4 = normalizeM4Meta(meta);
  return getLoreStageFromKills(m4.bestiaryKills[enemyId] || 0);
}

function recordM4Run(meta, run = {}) {
  let m4 = normalizeM4Meta(meta);

  for (const noteId of run.notesFound || []) {
    m4 = collectNote(m4, noteId);
  }
  for (const relicId of run.relicsFound || []) {
    m4 = grantRelic(m4, relicId);
  }
  if (run.endingId && !m4.endings.includes(run.endingId)) {
    m4.endings.push(run.endingId);
  }
  if (run.spiceLevel !== undefined) {
    m4.spiceHighest = Math.max(m4.spiceHighest || 0, clampSpice(run.spiceLevel));
  }
  if (run.hyper && run.levelId && !m4.hyperClears.includes(run.levelId)) {
    m4.hyperClears.push(run.levelId);
  }
  if (run.challengeId) {
    const current = m4.challengeRecords[run.challengeId] || {};
    m4.challengeRecords[run.challengeId] = {
      bestTime: Math.max(current.bestTime || 0, run.time || 0),
      bestKills: Math.max(current.bestKills || 0, run.kills || 0),
      cleared: !!(current.cleared || run.won),
      lastPlayedAt: Date.now()
    };
  }
  if (run.dailyKey) {
    const current = m4.dailyRecords[run.dailyKey] || {};
    m4.dailyRecords[run.dailyKey] = {
      bestTime: Math.max(current.bestTime || 0, run.time || 0),
      bestKills: Math.max(current.bestKills || 0, run.kills || 0),
      cleared: !!(current.cleared || run.won),
      seed: run.dailySeed ?? current.seed ?? null,
      lastPlayedAt: Date.now()
    };
  }
  for (const [enemyId, count] of Object.entries(run.enemyKills || {})) {
    m4 = recordBestiaryKill(m4, enemyId, count);
  }
  m4.starCurrency += calculateStarReward(run);
  m4.unlocks = { ...m4.unlocks, ...getM4FeatureFlags(m4), mirrorBoss: hasAllNotes(m4) };
  return m4;
}

function calculateStarReward(run = {}) {
  let stars = Math.floor((run.time || 0) / (5 * 60_000));
  stars += Math.floor((run.kills || 0) / 100);
  if (run.won) stars += 3;
  stars += clampSpice(run.spiceLevel);
  if (run.hyper) stars += 2;
  if (run.challengeId) stars += 2;
  if (run.dailyKey) stars += 2;
  if (run.endingId) stars += 3;
  return Math.max(0, stars);
}

function getLoreStageFromKills(kills) {
  let stage = 0;
  for (const threshold of LORE_THRESHOLDS) {
    if (kills >= threshold) stage++;
  }
  return stage;
}

function uniqueValid(values, validIds) {
  return Array.from(new Set(values || [])).filter(id => validIds.has(id));
}

function clampSpice(value) {
  return Math.max(0, Math.min(5, Math.floor(Number(value) || 0)));
}

function normalizeDateKey(dateKey) {
  if (dateKey instanceof Date) return getUtcDateKey(dateKey);
  const text = String(dateKey || '').trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;
  return getUtcDateKey(new Date(text || Date.now()));
}

function getUtcDateKey(date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

function pickDeterministic(items, seed) {
  return items[Math.abs(seed) % items.length];
}

function rotateSeed(seed, salt) {
  return hashM4String(`${seed}:${salt}`);
}

function hashM4String(value) {
  let hash = 2166136261;
  const text = String(value);
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}


// --- game/powerup-store.js ---

const POWERUP_DEFS = {
  max_health: {
    id: 'max_health',
    name: '生命上限',
    maxLevel: 5,
    baseCost: 80,
    perLevel: 0.08,
    desc: '每级最大生命 +8%。'
  },
  damage: {
    id: 'damage',
    name: '伤害',
    maxLevel: 5,
    baseCost: 120,
    perLevel: 0.06,
    desc: '每级武器伤害 +6%。'
  },
  attack_speed: {
    id: 'attack_speed',
    name: '攻击速度',
    maxLevel: 5,
    baseCost: 120,
    perLevel: 0.05,
    desc: '每级武器冷却缩短。'
  },
  move_speed: {
    id: 'move_speed',
    name: '移动速度',
    maxLevel: 5,
    baseCost: 90,
    perLevel: 0.04,
    desc: '每级移动速度 +4%。'
  },
  magnet: {
    id: 'magnet',
    name: '拾取范围',
    maxLevel: 5,
    baseCost: 90,
    perLevel: 0.10,
    desc: '每级拾取范围 +10%。'
  },
  luck: {
    id: 'luck',
    name: '幸运',
    maxLevel: 5,
    baseCost: 110,
    perLevel: 0.06,
    desc: '每级幸运 +6%。'
  },
  gold_gain: {
    id: 'gold_gain',
    name: '金币收益',
    maxLevel: 5,
    baseCost: 100,
    perLevel: 0.10,
    desc: '每级跨局金币收益 +10%。'
  },
  revival: {
    id: 'revival',
    name: '复活',
    maxLevel: 1,
    baseCost: 450,
    perLevel: 1,
    desc: '每局获得一次额外复活。'
  }
};

const META_KEY = 'vs_meta';

function createDefaultPowerUps() {
  return Object.fromEntries(Object.keys(POWERUP_DEFS).map(id => [id, { id, level: 0 }]));
}

function createDefaultMeta() {
  return {
    version: 4,
    goldBank: 0,
    powerUps: createDefaultPowerUps(),
    unlockedCharacters: ['antonio'],
    unlockedLevels: ['hungry_forest'],
    unlockedWeapons: [
      'bouncing_slipper',
      'spinning_ladle',
      'boomerang_cleaver',
      'throwing_chopsticks',
      'holy_toast',
      'garlic_breath',
      'rolling_pin',
      'hot_sauce_bottle',
      'thermal_bag',
      'freezer_gate',
      'service_bell'
    ],
    unlockedArcanas: ['fool', 'gemini', 'priestess', 'emperor', 'hanged_man', 'glutton'],
    sealedUpgrades: [],
    progress: {
      totalKills: 0,
      maxCharacterLevel: 1,
      levelBestTime: {},
      packageOpened: false,
      mirrorSeen: false,
      bossClears: [],
      evolvedWeapons: [],
      weaponUnlockFlags: []
    },
    m4: createDefaultM4Meta()
  };
}

function normalizeMeta(meta) {
  const defaults = createDefaultMeta();
  const merged = {
    ...defaults,
    ...(meta || {}),
    powerUps: {
      ...defaults.powerUps,
      ...(meta?.powerUps || {})
    },
    progress: {
      ...defaults.progress,
      ...(meta?.progress || {}),
      levelBestTime: {
        ...defaults.progress.levelBestTime,
        ...(meta?.progress?.levelBestTime || {})
      },
      bossClears: Array.from(new Set([
        ...defaults.progress.bossClears,
        ...(meta?.progress?.bossClears || [])
      ])),
      evolvedWeapons: Array.from(new Set([
        ...defaults.progress.evolvedWeapons,
        ...(meta?.progress?.evolvedWeapons || [])
      ])),
      weaponUnlockFlags: Array.from(new Set([
        ...defaults.progress.weaponUnlockFlags,
        ...(meta?.progress?.weaponUnlockFlags || [])
      ]))
    },
    m4: normalizeM4Meta(meta?.m4 || defaults.m4)
  };
  merged.version = Math.max(defaults.version, Number(merged.version) || defaults.version);
  merged.unlockedCharacters = Array.from(new Set(merged.unlockedCharacters || defaults.unlockedCharacters));
  merged.unlockedLevels = Array.from(new Set(merged.unlockedLevels || defaults.unlockedLevels));
  merged.unlockedWeapons = Array.from(new Set(merged.unlockedWeapons || defaults.unlockedWeapons));
  merged.unlockedArcanas = Array.from(new Set(merged.unlockedArcanas || defaults.unlockedArcanas));
  merged.sealedUpgrades = Array.from(new Set(merged.sealedUpgrades || []));
  for (const id of Object.keys(POWERUP_DEFS)) {
    const def = POWERUP_DEFS[id];
    const current = merged.powerUps[id] || { id, level: 0 };
    merged.powerUps[id] = {
      id,
      level: Math.max(0, Math.min(def.maxLevel, Number(current.level) || 0))
    };
  }
  return merged;
}

function loadMeta(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem?.(META_KEY);
    return normalizeMeta(raw ? JSON.parse(raw) : null);
  } catch (e) {
    return createDefaultMeta();
  }
}

function saveMeta(meta, storage = globalThis.localStorage) {
  try {
    const normalized = normalizeMeta(meta);
    storage?.setItem?.(META_KEY, JSON.stringify(normalized));
    return normalized;
  } catch (e) {
    return normalizeMeta(meta);
  }
}

function getPowerUpCost(id, currentLevel = 0) {
  const def = POWERUP_DEFS[id];
  if (!def || currentLevel >= def.maxLevel) return Infinity;
  return Math.round(def.baseCost * Math.pow(1.45, currentLevel));
}

function getPowerUpTotalCost(powerUps = {}) {
  let total = 0;
  for (const [id, entry] of Object.entries(powerUps)) {
    const level = Math.max(0, Number(entry?.level) || 0);
    for (let i = 0; i < level; i++) total += getPowerUpCost(id, i);
  }
  return total;
}

function buyPowerUp(meta, id) {
  const next = normalizeMeta(meta);
  const def = POWERUP_DEFS[id];
  if (!def) return { ok: false, reason: 'missing', meta: next };
  const current = next.powerUps[id]?.level || 0;
  if (current >= def.maxLevel) return { ok: false, reason: 'max', meta: next };
  const cost = getPowerUpCost(id, current);
  if (next.goldBank < cost) return { ok: false, reason: 'gold', meta: next, cost };
  next.goldBank -= cost;
  next.powerUps[id] = { id, level: current + 1 };
  return { ok: true, meta: next, cost };
}

function refundPowerUps(meta) {
  const next = normalizeMeta(meta);
  const refund = getPowerUpTotalCost(next.powerUps);
  next.goldBank += refund;
  next.powerUps = createDefaultPowerUps();
  return { ok: true, meta: next, refund };
}

function grantRunGold(meta, runGold = 0, powerUps = meta?.powerUps) {
  const next = normalizeMeta(meta);
  const goldGainLevel = powerUps?.gold_gain?.level || 0;
  const multiplier = 1 + goldGainLevel * POWERUP_DEFS.gold_gain.perLevel;
  next.goldBank += Math.max(0, Math.floor(runGold * multiplier));
  return next;
}

function applyPowerUpsToStats(stats, powerUps = {}, m4Meta = null) {
  const next = { ...stats };
  const level = id => Math.max(0, powerUps[id]?.level || 0);
  next.maxHp = Math.floor((next.maxHp || 0) * (1 + level('max_health') * POWERUP_DEFS.max_health.perLevel));
  next.powerMultiplier = (next.powerMultiplier || 1) * (1 + level('damage') * POWERUP_DEFS.damage.perLevel);
  next.attackSpeedMultiplier = (next.attackSpeedMultiplier || 1) * (1 + level('attack_speed') * POWERUP_DEFS.attack_speed.perLevel);
  next.moveSpeedMultiplier = (next.moveSpeedMultiplier || 1) * (1 + level('move_speed') * POWERUP_DEFS.move_speed.perLevel);
  next.magnetMultiplier = (next.magnetMultiplier || 1) * (1 + level('magnet') * POWERUP_DEFS.magnet.perLevel);
  next.luckMultiplier = (next.luckMultiplier || 1) * (1 + level('luck') * POWERUP_DEFS.luck.perLevel);
  next.goldGainMultiplier = (next.goldGainMultiplier || 1) * (1 + level('gold_gain') * POWERUP_DEFS.gold_gain.perLevel);
  next.revivals = (next.revivals || 0) + level('revival');
  const talentEffects = getTalentEffects(m4Meta);
  next.maxHp = Math.floor((next.maxHp || 0) * talentEffects.maxHpMultiplier);
  next.powerMultiplier = (next.powerMultiplier || 1) * talentEffects.powerMultiplier;
  next.attackSpeedMultiplier = (next.attackSpeedMultiplier || 1) * talentEffects.attackSpeedMultiplier;
  next.moveSpeedMultiplier = (next.moveSpeedMultiplier || 1) * talentEffects.moveSpeedMultiplier;
  next.magnetMultiplier = (next.magnetMultiplier || 1) * talentEffects.magnetMultiplier;
  next.luckMultiplier = (next.luckMultiplier || 1) * talentEffects.luckMultiplier;
  next.goldGainMultiplier = (next.goldGainMultiplier || 1) * talentEffects.goldGainMultiplier;
  next.revivals = (next.revivals || 0) + talentEffects.revivals;
  next.armor = (next.armor || 0) + talentEffects.armor;
  return next;
}

function applyPowerUpsToPlayer(player, powerUps = {}, m4Meta = null) {
  if (!player) return;
  const level = id => Math.max(0, powerUps[id]?.level || 0);
  const talentEffects = getTalentEffects(m4Meta);
  player.powerUpModifiers = {
    maxHp: (1 + level('max_health') * POWERUP_DEFS.max_health.perLevel) * talentEffects.maxHpMultiplier,
    damage: (1 + level('damage') * POWERUP_DEFS.damage.perLevel) * talentEffects.powerMultiplier,
    attackSpeed: (1 + level('attack_speed') * POWERUP_DEFS.attack_speed.perLevel) * talentEffects.attackSpeedMultiplier,
    moveSpeed: (1 + level('move_speed') * POWERUP_DEFS.move_speed.perLevel) * talentEffects.moveSpeedMultiplier,
    magnet: (1 + level('magnet') * POWERUP_DEFS.magnet.perLevel) * talentEffects.magnetMultiplier,
    luck: (1 + level('luck') * POWERUP_DEFS.luck.perLevel) * talentEffects.luckMultiplier,
    goldGain: (1 + level('gold_gain') * POWERUP_DEFS.gold_gain.perLevel) * talentEffects.goldGainMultiplier,
    revivals: level('revival') + talentEffects.revivals,
    armor: talentEffects.armor
  };
  player.recalcStats();
}


// --- game/unlock-manager.js ---






const SURVIVAL_UNLOCK_MS = 15 * 60 * 1000;

function getUnlockedCharacterIds(meta) {
  return normalizeMeta(meta).unlockedCharacters;
}

function getUnlockedLevelIds(meta) {
  return normalizeMeta(meta).unlockedLevels;
}

function getUnlockedWeaponIds(meta) {
  return normalizeMeta(meta).unlockedWeapons;
}

function getUnlockedArcanaIds(meta) {
  return normalizeMeta(meta).unlockedArcanas;
}

function isCharacterUnlocked(meta, characterId) {
  return getUnlockedCharacterIds(meta).includes(characterId);
}

function isLevelUnlocked(meta, levelId) {
  return getUnlockedLevelIds(meta).includes(levelId);
}

function isArcanaUnlocked(meta, arcanaId) {
  return getUnlockedArcanaIds(meta).includes(arcanaId);
}

function getCharacterUnlockText(characterId) {
  if (characterId === 'antonio') return '默认可用';
  return UNLOCK_RULES.characters.find(rule => rule.id === characterId)?.desc || '达成隐藏条件';
}

function getLevelUnlockText(levelId) {
  if (levelId === 'hungry_forest') return '默认可用';
  return UNLOCK_RULES.levels.find(rule => rule.id === levelId)?.desc || '完成前置关卡';
}

function evaluateUnlocks(meta) {
  const next = normalizeMeta(meta);
  const added = {
    characters: [],
    levels: [],
    weapons: [],
    arcanas: []
  };

  for (const rule of UNLOCK_RULES.characters) {
    if (!next.unlockedCharacters.includes(rule.id) && rule.test(next)) {
      next.unlockedCharacters.push(rule.id);
      added.characters.push(rule.id);
    }
  }

  for (const rule of UNLOCK_RULES.levels) {
    const unlocked = rule.test
      ? rule.test(next)
      : hasBossClear(next, rule.previousLevelId) ||
        (next.progress.levelBestTime[rule.previousLevelId] || 0) >= SURVIVAL_UNLOCK_MS;
    if (!next.unlockedLevels.includes(rule.id) && unlocked) {
      next.unlockedLevels.push(rule.id);
      added.levels.push(rule.id);
    }
  }

  for (const rule of UNLOCK_RULES.weapons) {
    if (!next.unlockedWeapons.includes(rule.id) && rule.test(next)) {
      next.unlockedWeapons.push(rule.id);
      added.weapons.push(rule.id);
    }
  }

  for (const rule of UNLOCK_RULES.arcanas) {
    if (!next.unlockedArcanas.includes(rule.id) && rule.test(next)) {
      next.unlockedArcanas.push(rule.id);
      added.arcanas.push(rule.id);
    }
  }

  next.unlockedCharacters = next.unlockedCharacters.filter(id => CHARACTERS.some(char => char.id === id) || id === 'little_antonio');
  next.unlockedLevels = next.unlockedLevels.filter(id => LEVELS.some(level => level.id === id) || id === 'moonboba');
  next.unlockedArcanas = next.unlockedArcanas.filter(id => ARCANAS.some(arcana => arcana.id === id));
  return { meta: next, added };
}

function recordRunProgress(meta, run) {
  const next = normalizeMeta(meta);
  next.progress.totalKills += Math.max(0, run.kills || 0);
  next.progress.maxCharacterLevel = Math.max(next.progress.maxCharacterLevel || 1, run.level || 1);
  if (run.levelId) {
    const previous = next.progress.levelBestTime[run.levelId] || 0;
    next.progress.levelBestTime[run.levelId] = Math.max(previous, run.time || 0);
    if (run.won || run.bossKilled) {
      next.progress.bossClears = Array.from(new Set([
        ...(next.progress.bossClears || []),
        run.levelId
      ]));
    }
  }
  if (run.packageOpened) next.progress.packageOpened = true;
  if (run.mirrorSeen) next.progress.mirrorSeen = true;
  if (run.evolvedWeapons) {
    next.progress.evolvedWeapons = Array.from(new Set([
      ...next.progress.evolvedWeapons,
      ...run.evolvedWeapons
    ]));
  }
  if (run.weaponUnlockFlags) {
    next.progress.weaponUnlockFlags = Array.from(new Set([
      ...next.progress.weaponUnlockFlags,
      ...run.weaponUnlockFlags
    ]));
  }
  next.m4 = recordM4Run(next.m4, run);
  return evaluateUnlocks(next);
}

function hasBossClear(meta, levelId) {
  return !!levelId && (meta.progress.bossClears || []).includes(levelId);
}


// --- game/levelup-controls.js ---
const DEFAULT_LIMITS = {
  reroll: 4,
  skip: 4,
  banish: 3,
  seal: 3
};

function optionIdFromKey(key = '') {
  return String(key).split(':')[1] || key;
}

function createRunLevelUpControls(meta = {}, limits = DEFAULT_LIMITS) {
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

function spendLevelUpControl(controls, type) {
  if (!controls || !Object.prototype.hasOwnProperty.call(controls, type)) {
    return { ok: false, reason: 'missing' };
  }
  if (controls[type] <= 0) return { ok: false, reason: 'empty' };
  controls[type] -= 1;
  return { ok: true, remaining: controls[type] };
}

function banishUpgrade(controls, optionKey) {
  const spent = spendLevelUpControl(controls, 'banish');
  if (!spent.ok) return spent;
  controls.banished.add(optionIdFromKey(optionKey));
  return { ok: true, remaining: controls.banish };
}

function sealUpgrade(controls, optionKey) {
  const spent = spendLevelUpControl(controls, 'seal');
  if (!spent.ok) return spent;
  const id = optionIdFromKey(optionKey);
  controls.sealed.add(id);
  controls.persistentSeals.add(id);
  return { ok: true, remaining: controls.seal };
}

function controlsToMetaSeals(controls) {
  return Array.from(controls?.persistentSeals || []);
}


// --- game/functional-weapons.js ---
function applyFunctionalWeaponTick(game, weapon, dt) {
  if (!game?.player || !weapon) return false;
  const behavior = getFunctionalBehavior(weapon.id);
  if (!behavior) return false;
  if (!game.player.functionalState) game.player.functionalState = {};
  if (!game.player.functionalState[weapon.id]) {
    game.player.functionalState[weapon.id] = {
      timer: 0,
      layers: 0,
      deathPreventUsed: false,
      angle: 0
    };
  }
  const state = game.player.functionalState[weapon.id];
  state.timer += dt;

  if (behavior === 'shield') return tickThermalBag(game, weapon, state);
  if (behavior === 'freeze') return tickFreezerGate(game, weapon, state);
  if (behavior === 'clear') return tickServiceBell(game, weapon, state);
  return false;
}

function getFunctionalWeaponSummary(weapon) {
  const behavior = getFunctionalBehavior(weapon.id);
  if (behavior === 'shield') {
    return `护盾 ${getShieldLayers(weapon)} 层，${Math.round(getShieldChargeMs(weapon) / 1000)} 秒充能`;
  }
  if (behavior === 'freeze') {
    return `${getFreezeRays(weapon)} 道冻结射线，冻结 ${Math.round(getFreezeDurationMs(weapon) / 1000)} 秒`;
  }
  if (behavior === 'clear') {
    return `${Math.round(getBellCooldownMs(weapon) / 1000)} 秒清理普通敌人`;
  }
  return '';
}

function isDeathPreventWeapon(weaponId) {
  return weaponId === 'michelin_cloak';
}

function consumeMichelinDeathPrevent(player) {
  const state = player?.functionalState?.michelin_cloak;
  if (!state || state.deathPreventUsed) return false;
  state.deathPreventUsed = true;
  state.layers = Math.max(state.layers || 0, 1);
  player.hp = Math.max(1, Math.floor(player.maxHp * 0.35));
  player.invincibleTimer = Math.max(player.invincibleTimer || 0, 1800);
  return true;
}

function tickThermalBag(game, weapon, state) {
  const chargeMs = getShieldChargeMs(weapon);
  const maxLayers = getShieldLayers(weapon);
  let changed = false;
  if (state.timer >= chargeMs && state.layers < maxLayers) {
    state.timer -= chargeMs;
    state.layers = maxLayers;
    changed = true;
  }
  const shieldPerLayer = weapon.id === 'michelin_cloak' ? 90 : 55;
  const targetShield = state.layers * shieldPerLayer;
  if ((game.player.shield || 0) < targetShield) {
    game.player.shield = targetShield;
    changed = true;
  }
  if (changed) {
    addRingParticles(game, '#91f2d2', 9);
    addFunctionalActionEffect(game, weapon.id, 'shield', {
      size: weapon.id === 'michelin_cloak' ? 300 : 260,
      life: weapon.id === 'michelin_cloak' ? 620 : 520
    });
  }
  return changed;
}

function tickFreezerGate(game, weapon, state) {
  const interval = getFreezeIntervalMs(weapon);
  if (state.timer < interval) return false;
  state.timer = 0;
  state.angle = (state.angle || 0) + Math.PI / Math.max(2, getFreezeRays(weapon));
  const rays = getFreezeRays(weapon);
  const duration = getFreezeDurationMs(weapon);
  const range = weapon.id === 'infinite_buffet' ? 620 : 520;
  const enemies = game.entityManager?.getByType?.('enemy') || [];
  let hit = 0;
  for (let i = 0; i < rays; i++) {
    const angle = state.angle + (Math.PI * 2 * i) / rays;
    for (const enemy of enemies) {
      if (!enemy.active && enemy.active !== undefined) continue;
      if (isEnemyInRay(game.player, enemy, angle, range)) {
        enemy.frozenTimer = Math.max(enemy.frozenTimer || 0, duration);
        if (weapon.id === 'infinite_buffet') {
          const damage = Math.max(1, Math.floor((enemy.hp || 1) * 0.08));
          if (enemy.takeDamage) enemy.takeDamage(damage);
          else enemy.hp = Math.max(0, (enemy.hp || 0) - damage);
        }
        hit++;
      }
    }
  }
  if (hit > 0 && game.runUnlockFlags) game.runUnlockFlags.add('frozen_ticket');
  addRayParticles(game, '#9bdfff', rays, range, state.angle);
  addFunctionalActionEffect(game, weapon.id, 'ray', {
    size: weapon.id === 'infinite_buffet' ? 420 : 360,
    life: weapon.id === 'infinite_buffet' ? 620 : 520,
    rotation: weapon.id === 'infinite_buffet' ? state.angle * 0.35 : state.angle
  });
  return true;
}

function tickServiceBell(game, weapon, state) {
  const cooldown = getBellCooldownMs(weapon);
  if (state.timer < cooldown) return false;
  state.timer = 0;
  const enemies = game.entityManager?.getByType?.('enemy') || [];
  let cleared = 0;
  for (const enemy of enemies) {
    if (enemy.enemyType !== 'common') continue;
    if (weapon.id === 'gorgeous_moonboba') {
      if (enemy.takeDamage) enemy.takeDamage(Math.max(enemy.hp || 1, 1));
      else enemy.active = false;
    } else {
      enemy.active = false;
    }
    cleared++;
  }
  if (weapon.level < 6) {
    const drops = game.entityManager?.getByType?.('drop') || [];
    for (const drop of drops) drop.active = false;
  } else if (weapon.id === 'gorgeous_moonboba') {
    const drops = game.entityManager?.getByType?.('drop') || [];
    for (const drop of drops) drop.picked = true;
  }
  if (weapon.id === 'gorgeous_moonboba') {
    for (const enemy of enemies) {
      if (!enemy.active || enemy.enemyType === 'common') continue;
      if (enemy.takeDamage) enemy.takeDamage(Math.max(20, Math.floor((enemy.maxHp || 100) * 0.12)));
    }
  }
  if (cleared > 0 && game.runUnlockFlags) game.runUnlockFlags.add('service_shift');
  addRingParticles(game, weapon.id === 'gorgeous_moonboba' ? '#eebefa' : '#ffd43b', 18);
  addFunctionalActionEffect(game, weapon.id, 'pulse', {
    size: weapon.id === 'gorgeous_moonboba' ? 430 : 380,
    life: weapon.id === 'gorgeous_moonboba' ? 720 : 620
  });
  return true;
}

function getFunctionalBehavior(id) {
  if (id === 'thermal_bag' || id === 'michelin_cloak') return 'shield';
  if (id === 'freezer_gate' || id === 'infinite_buffet') return 'freeze';
  if (id === 'service_bell' || id === 'gorgeous_moonboba') return 'clear';
  return null;
}

function getLevel(weapon) {
  return Math.max(1, Math.min(8, weapon.level || 1));
}

function getShieldChargeMs(weapon) {
  if (weapon.id === 'michelin_cloak') return 3500;
  return Math.round(8000 - ((getLevel(weapon) - 1) / 7) * 4000);
}

function getShieldLayers(weapon) {
  if (weapon.id === 'michelin_cloak') return 3;
  return getLevel(weapon) >= 8 ? 3 : (getLevel(weapon) >= 4 ? 2 : 1);
}

function getFreezeIntervalMs(weapon) {
  if (weapon.id === 'infinite_buffet') return 2800;
  return Math.round(6200 - ((getLevel(weapon) - 1) / 7) * 2400);
}

function getFreezeDurationMs(weapon) {
  if (weapon.id === 'infinite_buffet') return 4200;
  return Math.round(1000 + ((getLevel(weapon) - 1) / 7) * 3000);
}

function getFreezeRays(weapon) {
  if (weapon.id === 'infinite_buffet') return 3;
  return getLevel(weapon) >= 8 ? 3 : (getLevel(weapon) >= 4 ? 2 : 1);
}

function getBellCooldownMs(weapon) {
  if (weapon.id === 'gorgeous_moonboba') return 38_000;
  return Math.round(90_000 - ((getLevel(weapon) - 1) / 7) * 45_000);
}

function isEnemyInRay(player, enemy, angle, range) {
  if (!Number.isFinite(enemy.x) || !Number.isFinite(enemy.y)) return true;
  const dx = enemy.x - player.x;
  const dy = enemy.y - player.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > range) return false;
  if (dist < 80) return true;
  const enemyAngle = Math.atan2(dy, dx);
  const diff = Math.abs(wrapAngle(enemyAngle - angle));
  return diff < Math.PI / 9;
}

function wrapAngle(angle) {
  while (angle > Math.PI) angle -= Math.PI * 2;
  while (angle < -Math.PI) angle += Math.PI * 2;
  return angle;
}

function addRingParticles(game, color, count) {
  if (!game.particles || !game.player) return;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    game.particles.push({
      x: game.player.x,
      y: game.player.y,
      vx: Math.cos(angle) * 0.12,
      vy: Math.sin(angle) * 0.12,
      color,
      size: 4,
      alpha: 0.85,
      life: 520,
      maxLife: 520,
      active: true
    });
  }
}

function addFunctionalActionEffect(game, weaponId, action, options = {}) {
  addWeaponActionEffect(game, weaponId, action, options);
}

function addWeaponActionEffect(game, weaponId, action, options = {}) {
  if (!game?.particles || !game.player) return;
  const life = options.life || 560;
  const x = Number.isFinite(options.x) ? options.x : game.player.x + (options.offsetX || 0);
  const y = Number.isFinite(options.y) ? options.y : game.player.y + (options.offsetY || 0);
  game.particles.push({
    x,
    y,
    vx: 0,
    vy: 0,
    color: options.color || '#fff',
    size: options.size || 320,
    alpha: options.alpha || 0.92,
    life,
    maxLife: life,
    active: true,
    rotation: options.rotation || 0,
    weaponAction: {
      weaponId,
      action,
      frameMs: options.frameMs || 86
    }
  });
}

function addRayParticles(game, color, rays, range, baseAngle) {
  if (!game.particles || !game.player) return;
  for (let i = 0; i < rays; i++) {
    const angle = baseAngle + (Math.PI * 2 * i) / rays;
    for (let step = 1; step <= 5; step++) {
      game.particles.push({
        x: game.player.x + Math.cos(angle) * range * (step / 6),
        y: game.player.y + Math.sin(angle) * range * (step / 6),
        vx: 0,
        vy: 0,
        color,
        size: 5 - step * 0.45,
        alpha: 0.65,
        life: 360,
        maxLife: 360,
        active: true
      });
    }
  }
}


// --- game/evolution.js ---

function getWeapons(inventory) {
  if (inventory?.weaponInventory?.weapons) return inventory.weaponInventory.weapons;
  return inventory?.weapons || {};
}

function getPassives(inventory) {
  if (inventory?.passiveInventory?.passives) return inventory.passiveInventory.passives;
  return inventory?.passives || {};
}

function canEvolveWeapon(inventory, weaponId) {
  const weapons = getWeapons(inventory);
  const passives = getPassives(inventory);
  const weapon = weapons[weaponId];
  const weaponDef = WEAPON_DEFS[weaponId];
  if (!weapon || !weaponDef || weapon.level < weaponDef.maxLevel) return false;

  const evolution = Object.values(EVOLUTION_DEFS).find(def => def.baseWeaponId === weaponId);
  if (!evolution) return false;
  return !!passives[evolution.requiredPassiveId];
}

function getEligibleEvolutions(inventory) {
  return Object.values(EVOLUTION_DEFS)
    .filter(def => canEvolveWeapon(inventory, def.baseWeaponId))
    .map(def => def.id);
}

function getEvolutionForWeapon(weaponId) {
  return Object.values(EVOLUTION_DEFS).find(def => def.baseWeaponId === weaponId) || null;
}


// --- game/upgrade-pool.js ---




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

function buildUpgradeOptions({
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

function applyUpgradeChoice(inventory, choice) {
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


// --- game/arcana-schedule.js ---

function getArcanaChoiceForTime(gameTimeMs, claimedSlots) {
  for (const choice of ARCANA_CHOICE_TIMES) {
    if (gameTimeMs >= choice.atMs && !claimedSlots.has(choice.slot)) {
      return choice;
    }
  }
  return null;
}


// --- game/chest-rewards.js ---



function resolveChestReward(game) {
  if (game.forceTripleChest) {
    game.forceTripleChest = false;
    const rewards = [];
    for (let i = 0; i < 3; i++) rewards.push(resolveSingleChestReward(game, i));
    return {
      type: 'triple',
      id: 'triple_chest',
      name: '三连便当盒',
      desc: rewards.map(reward => reward.name).join(' / '),
      gold: rewards.reduce((sum, reward) => sum + (reward.gold || 0), 0),
      rewards
    };
  }
  return resolveSingleChestReward(game, 0);
}

function resolveSingleChestReward(game, offset = 0) {
  const player = game.player;
  const eligible = getEligibleEvolutions(player);
  if (eligible.length > 0) {
    const evolutionId = eligible[0];
    const evolution = EVOLUTION_DEFS[evolutionId];
    if (evolution) {
      const current = player.weaponInventory.weapons[evolution.baseWeaponId];
      delete player.weaponInventory.weapons[evolution.baseWeaponId];
      player.weaponInventory.weapons[evolutionId] = {
        id: evolutionId,
        level: Math.max(1, current?.level || WEAPON_DEFS[evolution.baseWeaponId]?.maxLevel || 8),
        evolvedFrom: evolution.baseWeaponId
      };
      if (!game.runEvolvedWeapons) game.runEvolvedWeapons = new Set();
      game.runEvolvedWeapons.add(evolutionId);
      return {
        type: 'evolution',
        id: evolutionId,
        name: evolution.name,
        desc: `${WEAPON_DEFS[evolution.baseWeaponId].name} 进化为 ${evolution.name}`,
        gold: 50
      };
    }
  }

  const inventory = player.getUpgradeInventory();
  const [choice] = buildUpgradeOptions({
    inventory,
    seed: Math.floor(game.runSeed + game.gameTime + player.kills + offset * 97),
    count: 1,
    banished: game.levelUpControls?.banished || new Set(),
    sealed: game.levelUpControls?.sealed || new Set(),
    unlockedWeapons: game.unlockedWeaponsSet || null
  });
  if (choice) {
    const next = applyUpgradeChoice(inventory, choice);
    player.applyUpgradeInventory(next);
    return {
      type: 'upgrade',
      id: choice.id,
      name: choice.name,
      desc: choice.desc,
      gold: 25
    };
  }

  player.gold += 25;
  return {
    type: 'gold',
    id: 'gold',
    name: '金币袋',
    desc: '获得 25 金币',
    gold: 25
  };
}


// --- game/game-update.js ---











const MAP_EXPAND_MARGIN = 520;
const MAP_EXPAND_STEP = 1024;

function updateGameLogic(game, dt) {
  if (game.juice) game.juice.update(dt);
  if (_maybeTriggerArcana(game)) return;

  const scaledDt = dt * (game.juice ? game.juice.getTimeScale() : 1);
  if (scaledDt <= 0) return;

  game.gameTime += scaledDt;
  game.waveTimer += scaledDt;
  if (game.billFrenzyTimer > 0) game.billFrenzyTimer = Math.max(0, game.billFrenzyTimer - scaledDt);
  if (_maybeCompleteTimedChallenge(game)) return;

  if (game.waveTimer >= 60000) {
    game.waveTimer = 0;
    game.waveNumber++;
    game.difficultyMultiplier += 0.1;
    game.difficultyNotifTimer = 3000;
  }

  expandMapAroundPlayer(game);
  game.player.update(scaledDt);
  expandMapAroundPlayer(game);
  game.camera.follow(game.player);
  game.cameraShake.update(scaledDt);
  game.entityManager.update(scaledDt, game);
  if (game.difficultyNotifTimer > 0) game.difficultyNotifTimer -= scaledDt;

  _maybeTriggerMirrorBoss(game);
  _spawnEnemies(game, scaledDt);
  _updateArcanaDelivery(game);
  _recycleFarEnemies(game);
  _updateParticles(game, scaledDt);
  _updateDamageNumbers(game, scaledDt);
  _updateDeathQuotes(game, scaledDt);
  _updateAmbientLore(game, scaledDt);
}

function expandMapAroundPlayer(game, margin = MAP_EXPAND_MARGIN, step = MAP_EXPAND_STEP) {
  if (!game?.player || !game.mapBounds) return false;
  const b = game.mapBounds;
  let changed = false;
  if (game.player.x - b.minX < margin) {
    b.minX -= step;
    changed = true;
  }
  if (b.maxX - game.player.x < margin) {
    b.maxX += step;
    changed = true;
  }
  if (game.player.y - b.minY < margin) {
    b.minY -= step;
    changed = true;
  }
  if (b.maxY - game.player.y < margin) {
    b.maxY += step;
    changed = true;
  }
  if (!changed) return false;
  game.player.setBounds(b.minX, b.minY, b.maxX, b.maxY);
  game._levelPropCache = null;
  return true;
}

function _updateArcanaDelivery(game) {
  if (!game.player?.arcanaInventory?.has('delivery')) return;
  if (!game._nextDeliveryAt) game._nextDeliveryAt = 60000;
  if (game.gameTime < game._nextDeliveryAt) return;
  game._nextDeliveryAt += 60000;
  const pos = {
    x: Math.max(game.mapBounds.minX + 40, Math.min(game.mapBounds.maxX - 40, game.player.x + (Math.random() - 0.5) * 220)),
    y: Math.max(game.mapBounds.minY + 40, Math.min(game.mapBounds.maxY - 40, game.player.y + (Math.random() - 0.5) * 220))
  };
  const drop = Math.random() < 0.15 ? DROP_ITEMS.lunchbox : (Math.random() < 0.5 ? DROP_ITEMS.whole_chicken : DROP_ITEMS.red_candy);
  game.entityManager.add(new DropItem(pos.x, pos.y, drop));
}

function _spawnEnemies(game, dt) {
  const levelIndex = Math.max(0, game.selectedLevelIndex || 0);
  const level = LEVELS[levelIndex] || LEVELS[0];
  const wave = getWaveForTime(level.id, game.gameTime);
  const minuteKey = `${level.id}:${wave.minute}`;
  const currentEnemies = game.entityManager.getByType('enemy').length;
  const profile = game.runProfile || {};
  const profileDensity = profile.densityMultiplier || 1;
  const maxOnScreen = Math.floor(wave.maxOnScreen * (game.billFrenzyTimer > 0 ? 2 : 1) * profileDensity);

  if (profile.noCommonEnemies) {
    _spawnChallengeElite(game, dt, wave, minuteKey, maxOnScreen);
    return;
  }

  if (shouldTriggerWaveEvent(wave, 'elite') && !game.triggeredWaveEvents.has(`${minuteKey}:elite`)) {
    game.triggeredWaveEvents.add(`${minuteKey}:elite`);
    const eliteData = ENEMIES.elite.find(e => e.id === wave.eliteId) || ENEMIES.elite.find(e => e.level === level.id);
    if (eliteData) _spawnEnemy(game, eliteData, 'elite', wave.minute);
  }

  if (shouldTriggerWaveEvent(wave, 'boss') && !game.bossSpawned) {
    game.spawnBoss();
    return;
  }

  if (currentEnemies >= maxOnScreen) return;

  const entries = profile.forcedEnemyId
    ? [{ id: profile.forcedEnemyId, interval: Math.max(160, 620 - wave.minute * 14), count: Math.max(1, Math.floor(1 + wave.minute / 8)) }]
    : wave.enemies;

  for (const entry of entries) {
    const data = ENEMIES.common.find(e => e.id === entry.id);
    if (!data) continue;
    const key = `${wave.minute}:${entry.id}`;
    if (!game.spawnTimers[key]) game.spawnTimers[key] = 0;
    game.spawnTimers[key] += dt;
    const density = (game.billFrenzyTimer > 0 ? 2 : 1) * profileDensity;
    const interval = Math.max(140, entry.interval / game.difficultyMultiplier / density);
    if (game.spawnTimers[key] >= interval) {
      game.spawnTimers[key] -= interval;
      const count = Math.min(entry.count * density, maxOnScreen - game.entityManager.getByType('enemy').length);
      for (let n = 0; n < count; n++) _spawnEnemy(game, data, 'common', wave.minute);
    }
  }
}

function _maybeTriggerMirrorBoss(game) {
  if (game.bossSpawned || !game.meta?.m4?.unlocks?.mirrorBoss) return;
  const level = LEVELS[Math.max(0, game.selectedLevelIndex || 0)] || LEVELS[0];
  if (level.id !== 'moonboba') return;
  if (game.gameTime < 15 * 60_000) return;
  if (typeof game.spawnMirrorBoss === 'function') game.spawnMirrorBoss();
}

function _spawnEnemy(game, data, enemyType, minute) {
  const pos = _randomSpawnAroundCamera(game);
  const enemy = new Enemy(pos.x, pos.y, data, enemyType);
  const hpScale = (1 + 0.10 * minute) * game.difficultyMultiplier;
  const atkScale = 1 + 0.05 * minute;
  const scaled = applyRunProfileToDifficulty({
    hp: Math.ceil(enemy.hp * hpScale),
    atk: Math.ceil(enemy.atk * atkScale),
    speed: enemy.speed,
    gold: 1
  }, game.runProfile || {});
  enemy.hp = scaled.hp;
  enemy.maxHp = enemy.hp;
  enemy.atk = scaled.atk;
  enemy.speed = scaled.speed;
  if (enemyType === 'elite') enemy.radius = 24;
  if (enemyType === 'boss') enemy.radius = 50;
  enemy.setTarget(game.player);
  game.entityManager.add(enemy);
  game.bestiary.unlockEnemy(data.id);
}

function _spawnChallengeElite(game, dt, wave, minuteKey, maxOnScreen) {
  if (game.entityManager.getByType('enemy').length >= Math.max(1, maxOnScreen)) return;
  const interval = game.runProfile?.eliteIntervalMs || 90_000;
  const key = 'challenge_elite';
  if (!game.spawnTimers[key]) game.spawnTimers[key] = interval - 1000;
  game.spawnTimers[key] += dt;
  if (game.spawnTimers[key] < interval) return;
  game.spawnTimers[key] = 0;
  const eliteData = ENEMIES.elite[wave.minute % ENEMIES.elite.length] || ENEMIES.boss;
  _spawnEnemy(game, eliteData, 'elite', wave.minute);
  game.triggeredWaveEvents.add(`${minuteKey}:challenge_elite`);
}

function _maybeCompleteTimedChallenge(game) {
  const duration = game.runProfile?.durationMs;
  if (!duration || game._runFinished || game.state !== 'PLAYING') return false;
  if (game.gameTime < duration) return false;
  game.victory();
  return true;
}

function _randomSpawnAroundCamera(game) {
  const marginMin = 100;
  const marginMax = 300;
  const side = Math.floor(Math.random() * 4);
  const offset = marginMin + Math.random() * (marginMax - marginMin);
  let x;
  let y;
  if (side === 0) {
    x = game.camera.x + Math.random() * GAME_WIDTH;
    y = game.camera.y - offset;
  } else if (side === 1) {
    x = game.camera.x + GAME_WIDTH + offset;
    y = game.camera.y + Math.random() * GAME_HEIGHT;
  } else if (side === 2) {
    x = game.camera.x + Math.random() * GAME_WIDTH;
    y = game.camera.y + GAME_HEIGHT + offset;
  } else {
    x = game.camera.x - offset;
    y = game.camera.y + Math.random() * GAME_HEIGHT;
  }
  const b = game.mapBounds;
  return {
    x: Math.max(b.minX + 20, Math.min(b.maxX - 20, x)),
    y: Math.max(b.minY + 20, Math.min(b.maxY - 20, y))
  };
}

function _recycleFarEnemies(game) {
  for (const enemy of game.entityManager.getByType('enemy')) {
    const sx = enemy.x - game.camera.x;
    const sy = enemy.y - game.camera.y;
    if (sx > -800 && sx < GAME_WIDTH + 800 && sy > -800 && sy < GAME_HEIGHT + 800) continue;
    const pos = _randomSpawnAroundCamera(game);
    enemy.x = pos.x;
    enemy.y = pos.y;
  }
}

function _maybeTriggerArcana(game) {
  if (!game.player || !game.player.arcanaInventory) return false;
  const choice = getArcanaChoiceForTime(game.gameTime, game.claimedArcanaSlots);
  if (!choice) return false;
  game.pendingArcanaSlot = choice.slot;
  game.claimedArcanaSlots.add(choice.slot);
  const rng = mulberry32((game.runSeed + choice.slot * 1013904223) >>> 0);
  const unlocked = new Set(game.meta?.unlockedArcanas || ARCANAS.slice(0, 6).map(arcana => arcana.id));
  const available = ARCANAS.filter(arcana => unlocked.has(arcana.id) && game.player.arcanaInventory.canAdd(arcana.id));
  game.arcanaOptions = [];
  while (game.arcanaOptions.length < 3 && available.length > 0) {
    const index = Math.floor(rng() * available.length);
    game.arcanaOptions.push(available.splice(index, 1)[0]);
  }
  game.setState('ARCANA_SELECT');
  game.audio.playLevelUp();
  return true;
}

function _updateParticles(game, dt) {
  if (!game.particles) return;
  for (let i = game.particles.length - 1; i >= 0; i--) {
    const p = game.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    if (p.life <= 0) {
      game.particles.splice(i, 1);
    } else {
      p.alpha = p.life / p.maxLife;
      p.size *= 0.98;
    }
  }
}

function _updateDamageNumbers(game, dt) {
  if (!game.damageNumbers) return;
  for (let i = game.damageNumbers.length - 1; i >= 0; i--) {
    const dn = game.damageNumbers[i];
    dn.y -= 0.03 * dt;
    dn.life -= dt;
    if (dn.life <= 0) {
      game.damageNumbers.splice(i, 1);
    } else {
      dn.alpha = dn.life / dn.maxLife;
    }
  }
}

function _updateDeathQuotes(game, dt) {
  if (!game.deathQuotes) return;
  for (let i = game.deathQuotes.length - 1; i >= 0; i--) {
    if (!game.deathQuotes[i].active) {
      game.deathQuotes.splice(i, 1);
    }
  }
}

function _updateAmbientLore(game, dt) {
  if (game.ambientLore) {
    const elapsed = performance.now() - game.ambientLore.startTime;
    if (elapsed > game.ambientLore.duration) {
      game.ambientLore = null;
    }
    return;
  }
  game.ambientLoreTimer += dt;
  if (game.ambientLoreTimer >= 15000) {
    game.ambientLoreTimer = 0;
    const level = LEVELS[game.selectedLevelIndex] || LEVELS[0];
    if (level.ambientLore && level.ambientLore.length > 0) {
      const idx = Math.floor(Math.random() * level.ambientLore.length);
      game.ambientLore = {
        text: level.ambientLore[idx],
        startTime: performance.now(),
        duration: 5000
      };
    }
  }
}


// --- game/game-render.js ---





















function renderMainMenuChrome(ctx, game) {
  if (!drawCoverImage(ctx, MENU_BG_IMAGE, 0, 0, GAME_WIDTH, GAME_HEIGHT)) {
    ctx.fillStyle = '#05060a';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  const sideShade = ctx.createLinearGradient(0, 0, GAME_WIDTH, 0);
  sideShade.addColorStop(0, 'rgba(0, 0, 0, 0.72)');
  sideShade.addColorStop(0.32, 'rgba(0, 0, 0, 0.42)');
  sideShade.addColorStop(0.62, 'rgba(0, 0, 0, 0.20)');
  sideShade.addColorStop(1, 'rgba(0, 0, 0, 0.50)');
  ctx.fillStyle = sideShade;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const bottomShade = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
  bottomShade.addColorStop(0, 'rgba(0, 0, 0, 0.16)');
  bottomShade.addColorStop(0.58, 'rgba(0, 0, 0, 0.08)');
  bottomShade.addColorStop(1, 'rgba(0, 0, 0, 0.46)');
  ctx.fillStyle = bottomShade;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  const panelX = 58;
  const panelY = 270;
  const panelW = 344;
  const panelH = 400;
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.65)';
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 10;
  drawRoundedRect(ctx, panelX, panelY, panelW, panelH, 8);
  ctx.fillStyle = 'rgba(7, 9, 15, 0.78)';
  ctx.fill();
  ctx.restore();

  drawRoundedRect(ctx, panelX, panelY, panelW, panelH, 8);
  ctx.strokeStyle = 'rgba(255, 212, 59, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#ffd43b';
  ctx.fillRect(panelX, panelY + 20, 4, 42);

  ctx.fillStyle = '#f8f1d8';
  ctx.font = 'bold 18px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('MAIN MENU', panelX + 22, panelY + 38);

  const notes = game.meta?.m4?.notes?.length || 0;
  const stars = game.meta?.m4?.starCurrency || 0;
  ctx.fillStyle = '#9d9788';
  ctx.font = '12px "Segoe UI", "Microsoft YaHei", sans-serif';
  ctx.fillText(`Notes ${notes}/12   Stars ${stars}`, panelX + 22, panelY + 58);
}

function renderGame(game) {
  const ctx = game.ctx;
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  if (game.intro.active) {
    game.intro.render(ctx);
    return;
  }

  if (game.loading.active) {
    game.loading.render(ctx);
    return;
  }

  if (game.state === 'MENU') {
    if (!drawCoverImage(ctx, MENU_BG_IMAGE, 0, 0, GAME_WIDTH, GAME_HEIGHT)) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 52px "Segoe UI", "Microsoft YaHei", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 12;
    ctx.fillText('Vampire Survivors', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 120);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ccc';
    ctx.font = '18px sans-serif';
    ctx.fillText('Spiceland 的永恒饥饿诅咒', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 70);
    renderMainMenuChrome(ctx, game);
    game.menuButtons.forEach(b => b.render(ctx));
    return;
  }

  if (game.state === 'LEVEL_SELECT') { renderLevelSelect(ctx, game); return; }
  if (game.state === 'CHARACTER_SELECT') { renderCharacterSelect(ctx, game); return; }
  if (game.state === 'SAVE_SELECT') { renderSaveSelect(ctx, game); return; }
  if (game.state === 'POWERUP') { renderPowerUp(ctx, game); return; }
  if (game.state === 'SKILLTREE') { renderSkillTree(ctx, game); return; }
  if (game.state === 'SETTINGS') { renderSettings(ctx, game); return; }

  if (game.state === 'LEVEL_LOADING') {
    renderLevelLoading(ctx, game);
    return;
  }

  renderWorld(ctx, game);
  renderDeathQuotes(ctx, game);
  renderDamageVignette(ctx, game);
  renderBossSpawnQuote(ctx, game);
  renderHUD(ctx, game);

  if (game.state === 'PLAYING') {
    renderPlayingButtons(ctx, game);
  }

  if (game.state === 'PAUSED') {
    renderPaused(ctx, game);
  }

  if (game.state === 'SHOP') {
    renderShop(ctx, game);
  }

  if (game.state === 'ARCANA_SELECT') {
    renderArcanaSelect(ctx, game);
  }

  if (game.state === 'LEVEL_UP') {
    renderLevelUp(ctx, game);
  }

  if (game.state === 'CHEST_OPEN') {
    renderChest(ctx, game);
  }

  if (game.state === 'INTERACTABLE_CHOICE') {
    renderInteractableChoice(ctx, game);
  }

  if (game.state === 'GAME_OVER') {
    renderGameOver(ctx, game);
  }

  if (game.state === 'VICTORY') {
    renderVictory(ctx, game);
  }
}


// --- game/input-click.js ---











function handleClick(game) {
  game.audio.unlock();

  if (game.intro.active) {
    game.intro.skip();
    return;
  }

  const pos = game.inputManager.getMousePos();
  const mx = pos.x, my = pos.y;

  if (game.state === 'MENU') {
    for (const btn of game.menuButtons) {
      if (pointInRect(mx, my, btn.x, btn.y, btn.w, btn.h)) {
        btn.action();
        return;
      }
    }
  } else if (game.state === 'LEVEL_SELECT') {
    if (handleLevelSelectClick(game, mx, my)) return;
  } else if (game.state === 'CHARACTER_SELECT') {
    for (const c of game._charCardBounds) {
      if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
        if (c.locked) return;
        game.selectedCharacterIndex = c.index;
        game.audio.playMenuClick();
        return;
      }
    }
    if (game._charConfirmBounds) {
      const b = game._charConfirmBounds;
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        const char = CHARACTERS[game.selectedCharacterIndex];
        if (!isCharacterUnlocked(game.meta, char.id)) return;
        game.startGame();
        return;
      }
    }
    if (game._charBackBounds) {
      const b = game._charBackBounds;
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        game.setState('LEVEL_SELECT');
        game.audio.playMenuClick();
        return;
      }
    }
  } else if (game.state === 'SAVE_SELECT') {
    for (let i = 0; i < game._saveSlotBounds.length; i++) {
      const s = game._saveSlotBounds[i];
      if (pointInRect(mx, my, s.x, s.y, s.w, s.h)) {
        const save = game.saveSystem.getSave(s.slot);
        if (save) {
          const delBtnX = s.x + s.w / 2 - 40, delBtnY = s.y + s.h - 45;
          if (pointInRect(mx, my, delBtnX, delBtnY, 80, 30)) {
            game._deleteSave(s.slot);
            game.audio.playMenuClick();
            return;
          }
        }
        if (save) {
          game._restoreFromSave(save);
          game.audio.playMenuClick();
        }
        return;
      }
    }
    if (pointInRect(mx, my, GAME_WIDTH / 2 - 80, 100 + 200 + 30, 160, 44)) {
      game.state = 'MENU';
      game.audio.playMenuClick();
    }
  } else if (game.state === 'LEVEL_LOADING') {
    game.state = 'PLAYING';
    return;
  } else if (game.state === 'PLAYING') {
    if (pointInRect(mx, my, GAME_WIDTH - 160, 20, 140, 44)) {
      if (!game.bossSpawned) {
        game.spawnBoss();
      }
      return;
    }
    if (pointInRect(mx, my, GAME_WIDTH - 160, 72, 140, 44)) {
      game.state = 'SHOP';
      game._generateShopItems();
      return;
    }
    if (pointInRect(mx, my, GAME_WIDTH - 160, 124, 140, 44)) {
      game.difficultyMultiplier += 0.5;
      return;
    }
    if (pointInRect(mx, my, GAME_WIDTH - 160, 176, 140, 44)) {
      game.player.gold += 100;
      return;
    }
  } else if (game.state === 'PAUSED') {
    if (game._showSaveSlotSelect) {
      for (let i = 0; i < game._pauseSaveSlotBounds.length; i++) {
        const s = game._pauseSaveSlotBounds[i];
        if (pointInRect(mx, my, s.x, s.y, s.w, s.h)) {
          const save = game.saveSystem.getSave(s.slot);
          if (save) {
            const delBtnX = s.x + s.w - 60, delBtnY = s.y + s.h - 35;
            if (pointInRect(mx, my, delBtnX, delBtnY, 50, 25)) {
              game._deleteSave(s.slot);
              game.audio.playMenuClick();
              return;
            }
          }
          const saveData = game.saveSystem.createSaveData(game);
          game.saveSystem.setSave(s.slot, saveData);
          game._showSaveSlotSelect = false;
          game.state = 'MENU';
          game.audio.stopMusic();
          game.audio.playMenuClick();
          return;
        }
      }
      const cancelBtnY = 130 + 160 + 30;
      if (pointInRect(mx, my, GAME_WIDTH / 2 - 80, cancelBtnY, 160, 40)) {
        game._showSaveSlotSelect = false;
        return;
      }
      return;
    }
    for (const btn of game.pauseMenuButtons) {
      if (pointInRect(mx, my, btn.x, btn.y, btn.w, btn.h)) {
        btn.action();
        return;
      }
    }
  } else if (game.state === 'SHOP') {
    if (game._shopItemHovered >= 0 && game._shopItemHovered < game.shopItems.length) {
      const item = game.shopItems[game._shopItemHovered];
      handleShopPurchase(game, item);
      return;
    }
    const panelW = 620, panelH = 520;
    const panelX = (GAME_WIDTH - panelW - 180) / 2;
    const panelY = (GAME_HEIGHT - panelH) / 2;
    if (pointInRect(mx, my, panelX + panelW / 2 - 60, panelY + panelH - 50, 120, 36)) {
      game.state = 'PLAYING';
      return;
    }
  } else if (game.state === 'SETTINGS') {
    if (game._volumeSlider) {
      const vs = game._volumeSlider;
      if (mx >= vs.musicX - 10 && mx <= vs.musicX + vs.musicW + 10 &&
          my >= vs.musicY - 15 && my <= vs.musicY + vs.musicH + 15) {
        const pct = Math.max(0, Math.min(1, (mx - vs.musicX) / vs.musicW));
        game.audio.setMusicVolume(pct);
        return;
      }
      if (vs.sfxX !== undefined && mx >= vs.sfxX - 10 && mx <= vs.sfxX + vs.sfxW + 10 &&
          my >= vs.sfxY - 15 && my <= vs.sfxY + vs.sfxH + 15) {
        const pct = Math.max(0, Math.min(1, (mx - vs.sfxX) / vs.sfxW));
        game.audio.setSfxVolume(pct);
        return;
      }
    }
    for (const t of game._settingsTabBounds) {
      if (pointInRect(mx, my, t.x, t.y, t.w, t.h)) {
        game.settingsTab = t.id;
        game.audio.playMenuClick();
        return;
      }
    }
    if (game.settingsTab === 'bestiary') {
      for (const category of game._bestiaryCategoryBounds || []) {
        if (pointInRect(mx, my, category.x, category.y, category.w, category.h)) {
          game._bestiaryCategory = category.id;
          game._bestiaryPage = 0;
          game._bestiarySelectedKey = null;
          game.audio.playMenuClick();
          return;
        }
      }
      const pageBounds = game._bestiaryPageBounds;
      if (pageBounds?.prev && !pageBounds.prev.disabled && pointInRect(mx, my, pageBounds.prev.x, pageBounds.prev.y, pageBounds.prev.w, pageBounds.prev.h)) {
        game._bestiaryPage = Math.max(0, (game._bestiaryPage || 0) - 1);
        game._bestiarySelectedKey = null;
        game.audio.playMenuClick();
        return;
      }
      if (pageBounds?.next && !pageBounds.next.disabled && pointInRect(mx, my, pageBounds.next.x, pageBounds.next.y, pageBounds.next.w, pageBounds.next.h)) {
        const maxPage = Math.max(0, (game._bestiaryPageInfo?.totalPages || 1) - 1);
        game._bestiaryPage = Math.min(maxPage, (game._bestiaryPage || 0) + 1);
        game._bestiarySelectedKey = null;
        game.audio.playMenuClick();
        return;
      }
      for (const card of game._bestiaryCardBounds || []) {
        if (pointInRect(mx, my, card.x, card.y, card.w, card.h)) {
          game._bestiarySelectedKey = card.key;
          game.audio.playMenuClick();
          return;
        }
      }
    }
    if (pointInRect(mx, my, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 70, 160, 44)) {
      game.state = 'MENU';
      game.audio.playMenuClick();
    }
  } else if (game.state === 'POWERUP') {
    if (game._powerUpBackBounds && pointInRect(mx, my, game._powerUpBackBounds.x, game._powerUpBackBounds.y, game._powerUpBackBounds.w, game._powerUpBackBounds.h)) {
      game.setState('MENU');
      game.audio.playMenuClick();
      return;
    }
    if (game._powerUpRefundBounds && pointInRect(mx, my, game._powerUpRefundBounds.x, game._powerUpRefundBounds.y, game._powerUpRefundBounds.w, game._powerUpRefundBounds.h)) {
      const result = refundPowerUps(game.meta);
      game.meta = saveMeta(result.meta);
      game.audio.playMenuClick();
      return;
    }
    for (const row of game._powerUpRowBounds || []) {
      if (pointInRect(mx, my, row.buyX, row.buyY, row.buyW, row.buyH)) {
        const result = buyPowerUp(game.meta, row.id);
        if (result.ok) {
          game.meta = saveMeta(result.meta);
          game.unlockedWeaponsSet = new Set(game.meta.unlockedWeapons);
          game.audio.playLevelUp();
        } else {
          game.audio.playMenuClick();
        }
        return;
      }
    }
  } else if (game.state === 'SKILLTREE') {
    if (handleSkillTreeClick(game, mx, my)) return;
  } else if (game.state === 'ARCANA_SELECT') {
    const arcanaOptions = game.arcanaOptions && game.arcanaOptions.length > 0 ? game.arcanaOptions : ARCANAS.slice(0, 3);
    if (game._arcanaHovered >= 0 && game._arcanaHovered < arcanaOptions.length) {
      const arcana = arcanaOptions[game._arcanaHovered];
      if (game.player.arcanaInventory.canAdd(arcana.id)) {
        game.player.arcanaInventory.add(arcana.id);
        applyArcanaImmediateEffect(game, arcana.id);
        if (typeof game._syncBestiaryInventory === 'function') game._syncBestiaryInventory();
        game.arcanaOptions = [];
        game.state = 'PLAYING';
        game.audio.playLevelUp();
      }
      return;
    }
    if (pointInRect(mx, my, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 80, 160, 44)) {
      game.arcanaOptions = [];
      game.state = 'PLAYING';
    }
  } else if (game.state === 'LEVEL_UP') {
    if (game._levelUpControlBounds?.reroll && pointInRect(mx, my, game._levelUpControlBounds.reroll.x, game._levelUpControlBounds.reroll.y, game._levelUpControlBounds.reroll.w, game._levelUpControlBounds.reroll.h)) {
      game.rerollLevelUpOptions();
      return;
    }
    if (game._levelUpControlBounds?.skip && pointInRect(mx, my, game._levelUpControlBounds.skip.x, game._levelUpControlBounds.skip.y, game._levelUpControlBounds.skip.w, game._levelUpControlBounds.skip.h)) {
      game.skipLevelUp();
      return;
    }
    for (const card of game._levelUpCardBounds) {
      if (pointInRect(mx, my, card.banishX, card.banishY, card.banishW, card.banishH)) {
        game.banishLevelUpOption(card.index);
        return;
      }
      if (pointInRect(mx, my, card.sealX, card.sealY, card.sealW, card.sealH)) {
        game.sealLevelUpOption(card.index);
        return;
      }
      if (pointInRect(mx, my, card.x, card.y, card.w, card.h)) {
        game.chooseLevelUpOption(card.index);
        return;
      }
    }
  } else if (game.state === 'INTERACTABLE_CHOICE') {
    for (const choice of game._interactableChoiceBounds || []) {
      if (pointInRect(mx, my, choice.x, choice.y, choice.w, choice.h)) {
        if (game.pendingInteractableChoice) {
          applyInteractableChoice(game, game.pendingInteractableChoice.dataWithPosition(), choice.id);
          game.pendingInteractableChoice.used = true;
          game.pendingInteractableChoice.active = false;
        }
        game.pendingInteractableChoice = null;
        game.setState('PLAYING');
        game.audio.playMenuClick();
        return;
      }
    }
  } else if (game.state === 'CHEST_OPEN') {
    game.closeChest();
  } else if (game.state === 'GAME_OVER') {
    const retryX = GAME_WIDTH / 2 - 120, retryY = GAME_HEIGHT / 2 + 155;
    if (pointInRect(mx, my, retryX, retryY, 110, 40)) {
      game._restartGame();
      return;
    }
    const menuX = GAME_WIDTH / 2 + 10, menuY = GAME_HEIGHT / 2 + 155;
    if (pointInRect(mx, my, menuX, menuY, 110, 40)) {
      game.state = 'MENU';
      game.audio.playMenuClick();
      return;
    }
  }
}

function applyArcanaImmediateEffect(game, arcanaId) {
  if (!game.player) return;
  if (arcanaId === 'empty_plate') {
    const weapons = game.player.weaponInventory.getAll();
    if (weapons.length > 1) {
      const weakest = weapons
        .map(item => ({ item, def: WEAPON_DEFS[item.id] }))
        .filter(entry => entry.def)
        .sort((a, b) => (a.def.baseDamage || 0) - (b.def.baseDamage || 0))[0];
      if (weakest) delete game.player.weaponInventory.weapons[weakest.item.id];
    }
  }
  if (arcanaId === 'emperor') {
    game.player.moveSpeedMultiplier *= 0.9;
  }
}


// --- game/input-hover.js ---




function handleHover(game) {
  const pos = game.inputManager.getMousePos();
  const mx = pos.x, my = pos.y;

  game.bossButtonHovered = false;
  game.shopButtonHovered = false;
  game.diffButtonHovered = false;
  game.goldButtonHovered = false;
  game._shopItemHovered = -1;
  game._shopCloseHovered = false;
  game._levelHovered = -1;
  game._levelConfirmHovered = false;
  game._levelBackHovered = false;
  game._levelSpiceMinusHovered = false;
  game._levelSpicePlusHovered = false;
  game._levelHyperHovered = false;
  game._levelChallengeHovered = false;
  game._levelDailyHovered = false;
  game._charHovered = -1;
  game._charConfirmHovered = false;
  game._charBackHovered = false;
  game._saveSlotHovered = -1;
  game._saveDeleteHovered = -1;
  game._saveBackHovered = false;
  game._pauseSaveSlotHovered = -1;
  game._pauseDeleteHovered = -1;
  game._pauseCancelHovered = false;
  game._settingsTabHovered = -1;
  game._settingsBackHovered = false;
  game._bestiaryCategoryHovered = -1;
  game._bestiaryHoveredKey = null;
  game._bestiaryPageHovered = null;
  game._arcanaHovered = -1;
  game._arcanaSkipHovered = false;
  game._levelUpHovered = -1;
  game._levelUpControlHovered = null;
  game._levelUpBanishHovered = -1;
  game._levelUpSealHovered = -1;
  game._powerUpHovered = -1;
  game._powerUpBackHovered = false;
  game._powerUpRefundHovered = false;
  game._talentNodeHovered = null;
  game._talentBackHovered = false;
  game._interactableChoiceHovered = -1;

  if (game.state === 'MENU') {
    game.menuButtons.forEach(b => {
      b.hovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    });
  } else if (game.state === 'PLAYING') {
    if (pointInRect(mx, my, GAME_WIDTH - 160, 20, 140, 44)) game.bossButtonHovered = true;
    if (pointInRect(mx, my, GAME_WIDTH - 160, 72, 140, 44)) game.shopButtonHovered = true;
    if (pointInRect(mx, my, GAME_WIDTH - 160, 124, 140, 44)) game.diffButtonHovered = true;
    if (pointInRect(mx, my, GAME_WIDTH - 160, 176, 140, 44)) game.goldButtonHovered = true;
  } else if (game.state === 'PAUSED') {
    game.pauseMenuButtons.forEach(b => {
      b.hovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    });
    if (game._showSaveSlotSelect && game._pauseSaveSlotBounds) {
      for (let i = 0; i < game._pauseSaveSlotBounds.length; i++) {
        const s = game._pauseSaveSlotBounds[i];
        if (pointInRect(mx, my, s.x, s.y, s.w, s.h)) {
          game._pauseSaveSlotHovered = i;
          break;
        }
      }
      const cancelBtnY = 130 + 160 + 30;
      game._pauseCancelHovered = pointInRect(mx, my, GAME_WIDTH / 2 - 80, cancelBtnY, 160, 40);
    }
  } else if (game.state === 'SHOP') {
    for (let i = 0; i < game._shopItemBounds.length; i++) {
      const b = game._shopItemBounds[i];
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        game._shopItemHovered = i;
        break;
      }
    }
    const panelW = 620, panelH = 520;
    const panelX = (GAME_WIDTH - panelW - 180) / 2;
    const panelY = (GAME_HEIGHT - panelH) / 2;
    game._shopCloseHovered = pointInRect(mx, my, panelX + panelW / 2 - 60, panelY + panelH - 50, 120, 36);
  } else if (game.state === 'LEVEL_SELECT') {
    handleLevelSelectHover(game, mx, my);
  } else if (game.state === 'CHARACTER_SELECT') {
    for (let i = 0; i < game._charCardBounds.length; i++) {
      const c = game._charCardBounds[i];
      if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
        game._charHovered = i;
        break;
      }
    }
    if (game._charConfirmBounds) {
      const b = game._charConfirmBounds;
      game._charConfirmHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    }
    if (game._charBackBounds) {
      const b = game._charBackBounds;
      game._charBackHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    }
  } else if (game.state === 'SAVE_SELECT') {
    for (let i = 0; i < game._saveSlotBounds.length; i++) {
      const s = game._saveSlotBounds[i];
      if (pointInRect(mx, my, s.x, s.y, s.w, s.h)) {
        game._saveSlotHovered = i;
        break;
      }
    }
    game._saveBackHovered = pointInRect(mx, my, GAME_WIDTH / 2 - 80, 100 + 200 + 30, 160, 44);
  } else if (game.state === 'SETTINGS') {
    for (let i = 0; i < game._settingsTabBounds.length; i++) {
      const t = game._settingsTabBounds[i];
      if (pointInRect(mx, my, t.x, t.y, t.w, t.h)) {
        game._settingsTabHovered = i;
        break;
      }
    }
    game._settingsBackHovered = pointInRect(mx, my, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 70, 160, 44);
    if (game.settingsTab === 'bestiary') {
      for (let i = 0; i < (game._bestiaryCategoryBounds || []).length; i++) {
        const category = game._bestiaryCategoryBounds[i];
        if (pointInRect(mx, my, category.x, category.y, category.w, category.h)) {
          game._bestiaryCategoryHovered = i;
          break;
        }
      }
      for (const card of game._bestiaryCardBounds || []) {
        if (pointInRect(mx, my, card.x, card.y, card.w, card.h)) {
          game._bestiaryHoveredKey = card.key;
          break;
        }
      }
      const pageBounds = game._bestiaryPageBounds;
      if (pageBounds?.prev && pointInRect(mx, my, pageBounds.prev.x, pageBounds.prev.y, pageBounds.prev.w, pageBounds.prev.h)) {
        game._bestiaryPageHovered = 'prev';
      } else if (pageBounds?.next && pointInRect(mx, my, pageBounds.next.x, pageBounds.next.y, pageBounds.next.w, pageBounds.next.h)) {
        game._bestiaryPageHovered = 'next';
      }
    }
  } else if (game.state === 'POWERUP') {
    for (let i = 0; i < (game._powerUpRowBounds || []).length; i++) {
      const row = game._powerUpRowBounds[i];
      if (pointInRect(mx, my, row.x, row.y, row.w, row.h)) {
        game._powerUpHovered = i;
        break;
      }
    }
    if (game._powerUpBackBounds) {
      const b = game._powerUpBackBounds;
      game._powerUpBackHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    }
    if (game._powerUpRefundBounds) {
      const b = game._powerUpRefundBounds;
      game._powerUpRefundHovered = pointInRect(mx, my, b.x, b.y, b.w, b.h);
    }
  } else if (game.state === 'SKILLTREE') {
    handleSkillTreeHover(game, mx, my);
  } else if (game.state === 'ARCANA_SELECT') {
    for (let i = 0; i < game._arcanaCardBounds.length; i++) {
      const c = game._arcanaCardBounds[i];
      if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
        game._arcanaHovered = i;
        break;
      }
    }
    game._arcanaSkipHovered = pointInRect(mx, my, GAME_WIDTH / 2 - 80, GAME_HEIGHT - 80, 160, 44);
  } else if (game.state === 'LEVEL_UP') {
    for (const [id, b] of Object.entries(game._levelUpControlBounds || {})) {
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        game._levelUpControlHovered = id;
        break;
      }
    }
    for (let i = 0; i < game._levelUpCardBounds.length; i++) {
      const c = game._levelUpCardBounds[i];
      if (pointInRect(mx, my, c.banishX, c.banishY, c.banishW, c.banishH)) {
        game._levelUpBanishHovered = i;
        break;
      }
      if (pointInRect(mx, my, c.sealX, c.sealY, c.sealW, c.sealH)) {
        game._levelUpSealHovered = i;
        break;
      }
      if (pointInRect(mx, my, c.x, c.y, c.w, c.h)) {
        game._levelUpHovered = i;
        break;
      }
    }
  } else if (game.state === 'INTERACTABLE_CHOICE') {
    for (let i = 0; i < (game._interactableChoiceBounds || []).length; i++) {
      const b = game._interactableChoiceBounds[i];
      if (pointInRect(mx, my, b.x, b.y, b.w, b.h)) {
        game._interactableChoiceHovered = i;
        break;
      }
    }
  } else if (game.state === 'GAME_OVER') {
    const retryX = GAME_WIDTH / 2 - 120, retryY = GAME_HEIGHT / 2 + 155;
    const menuX = GAME_WIDTH / 2 + 10, menuY = GAME_HEIGHT / 2 + 155;
    if (pointInRect(mx, my, retryX, retryY, 110, 40)) game.gameOverBtnHovered = 'retry';
    else if (pointInRect(mx, my, menuX, menuY, 110, 40)) game.gameOverBtnHovered = 'menu';
    else game.gameOverBtnHovered = null;
  }
}


// --- game/input-keyboard.js ---
function handleKeyboard(game) {
  const input = game.inputManager;

  if (input.isKeyDown('Escape')) {
    input.keys['Escape'] = false;
    if (game.state === 'PLAYING') {
      game.state = 'PAUSED';
      game._initPauseMenu();
      game._showSaveSlotSelect = false;
    } else if (game.state === 'PAUSED') {
      if (game._showSaveSlotSelect) {
        game._showSaveSlotSelect = false;
      } else {
        game.state = 'PLAYING';
      }
    } else if (game.state === 'SHOP') {
      game.state = 'PLAYING';
    } else if (game.state === 'GAME_OVER') {
      game.state = 'MENU';
    } else if (game.state === 'VICTORY') {
      game.state = 'MENU';
    } else if (game.state === 'SETTINGS') {
      game.state = 'MENU';
    } else if (game.state === 'POWERUP') {
      game.state = 'MENU';
    } else if (game.state === 'SKILLTREE') {
      game.state = 'MENU';
    } else if (game.state === 'LEVEL_SELECT') {
      game.state = 'MENU';
    } else if (game.state === 'CHARACTER_SELECT') {
      game.state = 'LEVEL_SELECT';
    } else if (game.state === 'SAVE_SELECT') {
      game.state = 'MENU';
    } else if (game.state === 'ARCANA_SELECT') {
      game.state = 'PLAYING';
    } else if (game.state === 'CHEST_OPEN') {
      game.closeChest();
    } else if (game.state === 'INTERACTABLE_CHOICE') {
      game.pendingInteractableChoice = null;
      game.state = 'PLAYING';
    }
  }

  if (game.state === 'SETTINGS' && game.settingsTab === 'bestiary') {
    const wheelDelta = input.consumeWheelDelta ? input.consumeWheelDelta() : 0;
    if (wheelDelta !== 0) {
      turnBestiaryPage(game, wheelDelta > 0 ? 1 : -1);
    }
    if (input.isKeyDown('ArrowLeft') || input.isKeyDown('PageUp') || input.isKeyDown('KeyA')) {
      input.keys['ArrowLeft'] = false;
      input.keys['PageUp'] = false;
      input.keys['KeyA'] = false;
      turnBestiaryPage(game, -1);
    }
    if (input.isKeyDown('ArrowRight') || input.isKeyDown('PageDown') || input.isKeyDown('KeyD')) {
      input.keys['ArrowRight'] = false;
      input.keys['PageDown'] = false;
      input.keys['KeyD'] = false;
      turnBestiaryPage(game, 1);
    }
  }

  if (game.state === 'PLAYING' && game.player) {
    if (input.isKeyDown('Space')) {
      input.keys['Space'] = false;
      if (game.player.burstSkill.fire(game.player, game.entityManager)) {
        game.player.triggerSkillAnim();
      }
    }
    if (input.isKeyDown('ShiftLeft') || input.isKeyDown('ShiftRight')) {
      input.keys['ShiftLeft'] = false;
      input.keys['ShiftRight'] = false;
      game.player.startDash();
    }
  }

  if (game.state === 'LEVEL_LOADING') {
    if (input.isKeyDown('Space') || input.isKeyDown('Enter') || input.isKeyDown('Escape')) {
      input.keys['Space'] = false;
      input.keys['Enter'] = false;
      input.keys['Escape'] = false;
      game.state = 'PLAYING';
    }
  }

  if (game.state === 'CHEST_OPEN') {
    if (input.isKeyDown('Space') || input.isKeyDown('Enter')) {
      input.keys['Space'] = false;
      input.keys['Enter'] = false;
      game.closeChest();
    }
  }

  if (game.intro.active) {
    const anyKey = Object.values(input.keys).some(v => v);
    if (anyKey) {
      Object.keys(input.keys).forEach(k => input.keys[k] = false);
      game.intro.skip();
    }
  }
}

function turnBestiaryPage(game, delta) {
  const totalPages = game._bestiaryPageInfo?.totalPages || 1;
  const maxPage = Math.max(0, totalPages - 1);
  const nextPage = Math.max(0, Math.min(maxPage, (game._bestiaryPage || 0) + delta));
  if (nextPage !== game._bestiaryPage) {
    game._bestiaryPage = nextPage;
    game._bestiarySelectedKey = null;
    if (game.audio) game.audio.playMenuClick();
  }
}


// --- game/game-helpers.js ---







function restoreFromSave(game, save) {
  const char = CHARACTERS.find(c => c.id === save.characterId);
  if (!char) return;
  game.selectedLevelIndex = save.selectedLevelIndex || 0;
  game.selectedCharacterIndex = CHARACTERS.indexOf(char);
  if (save.mapBounds) {
    game.mapBounds = { ...save.mapBounds };
  } else {
    game.mapBounds = expandBoundsToPoint(game.mapBounds, save.playerX, save.playerY);
  }
  game.player = new Player(save.playerX || game.mapBounds.maxX / 2, save.playerY || game.mapBounds.maxY / 2);
  game.player.applyCharacterStats(char);
  game.meta = loadMeta();
  applyPowerUpsToPlayer(game.player, game.meta.powerUps);
  game.player.arcanaInventory = new ArcanaInventory();
  const sprite = CHARACTER_SPRITES[char.id];
  if (sprite) game.player.setSprite(sprite);
  const animSheets = CHARACTER_ANIM_SHEETS[char.id];
  if (animSheets) game.player.loadAnimSheets(animSheets);
  game.player.setBounds(game.mapBounds.minX, game.mapBounds.minY, game.mapBounds.maxX, game.mapBounds.maxY);
  game.player.hp = save.hp;
  game.player.maxHp = save.maxHp;
  game.player.exp = save.exp;
  game.player.gold = save.gold;
  game.player.kills = save.kills;
  game.player.level = save.level;
  if (char.startWeaponId) {
    game.player.setWeapon(WEAPON_DEFS[char.startWeaponId]);
  }
  if (save.weaponInventory) {
    for (const w of save.weaponInventory) {
      game.player.weaponInventory.add(w.id);
      if (w.level > 1) {
        for (let l = 1; l < w.level; l++) {
          game.player.weaponInventory.upgrade(w.id);
        }
      }
    }
  }
  if (save.passiveInventory) {
    for (const passive of save.passiveInventory) {
      game.player.passiveInventory.add(passive.id);
      for (let l = 1; l < passive.level; l++) {
        game.player.passiveInventory.upgrade(passive.id);
      }
    }
    game.player.recalcStats();
  }
  if (save.arcanaInventory) {
    for (const a of save.arcanaInventory) {
      for (let c = 0; c < a.count; c++) {
        game.player.arcanaInventory.add(a.id);
      }
    }
  }
  game.entityManager.clear();
  game.score = save.score || 0;
  game.gameTime = save.gameTime || 0;
  game.waveNumber = save.waveNumber || 1;
  game.difficultyMultiplier = 1.0 + (game.waveNumber - 1) * 0.1;
  game.bossSpawned = false;
  game.spawnTimers = {};
  game.particles = [];
  game.damageNumbers = [];
  game.deathQuotes = [];
  game.bossSpawnQuote = null;
  game.ambientLore = null;
  game.ambientLoreTimer = 0;
  game._generateShopItems();
  game.state = 'PLAYING';
  game.audio.init();
  game.audio.startMusic('game');
}

function expandBoundsToPoint(bounds, x, y) {
  const b = { ...bounds };
  const pad = 512;
  if (Number.isFinite(x)) {
    while (x < b.minX + pad) b.minX -= 1024;
    while (x > b.maxX - pad) b.maxX += 1024;
  }
  if (Number.isFinite(y)) {
    while (y < b.minY + pad) b.minY -= 1024;
    while (y > b.maxY - pad) b.maxY += 1024;
  }
  return b;
}

function applyDropPickup(game, dropData) {
  if (!game.player) return;
  switch (dropData.type) {
    case 'exp':
      game.player.addExp(dropData.value);
      if (game.juice) game.juice.recordPickup();
      game.audio.playPickup();
      break;
    case 'gold':
      game.player.gold += dropData.value;
      if (game.player.arcanaInventory?.has('bill')) {
        for (const enemy of game.entityManager.getByType('enemy')) {
          const dx = enemy.x - game.player.x;
          const dy = enemy.y - game.player.y;
          if (Math.sqrt(dx * dx + dy * dy) < 160) enemy.takeDamage(dropData.value);
        }
      }
      if (game.juice) game.juice.recordPickup();
      game.audio.playPickup();
      break;
    case 'heal':
      const healAmount = Math.floor(game.player.maxHp * dropData.value);
      const missing = game.player.maxHp - game.player.hp;
      const overflow = Math.max(0, healAmount - missing);
      game.player.hp = Math.min(game.player.maxHp, game.player.hp + healAmount);
      if (overflow > 0 && game.player.arcanaInventory?.has('glutton')) {
        game.player.shield = Math.min(50, (game.player.shield || 0) + overflow);
      }
      game.audio.playPickup();
      break;
    case 'chest':
      game.openChest();
      game.audio.playExpPickup();
      break;
    case 'rare':
      game.player.gold += 50;
      game.audio.playExpPickup();
      break;
  }
}

function createDamageNumber(game, x, y, amount) {
  let color = '#fff';
  let fontSize = 13;
  if (amount >= 100) {
    color = '#ff922b';
    fontSize = 20;
  } else if (amount >= 20) {
    color = '#ffd43b';
    fontSize = 16;
  }
  game.damageNumbers.push({
    x, y, text: `-${amount}${amount >= 100 ? '!' : ''}`, color,
    alpha: 1, life: 800, maxLife: 800, fontSize
  });
}

function createDeathExplosion(game, x, y, color) {
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8;
    const speed = 0.1 + Math.random() * 0.1;
    game.particles.push({
      x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      color, size: 3 + Math.random() * 3, alpha: 1, life: 500, maxLife: 500
    });
  }
}

function createDeathQuote(game, x, y, text) {
  game.deathQuotes.push({ x, y, text, active: true, startTime: performance.now() });
}

function createBossSpawnQuote(game, text) {
  game.bossSpawnQuote = { text, startTime: performance.now(), duration: 5000 };
}


// --- game/game-core.js ---
































class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.state = 'MENU';
    this.previousState = 'MENU';
    this.player = null;
    this.entityManager = new EntityManager();
    this.audio = new AudioManager();
    this.inputManager = new InputManager();
    this.camera = new Camera();
    this.cameraShake = new CameraShake();
    this.juice = new JuiceSystem();
    this.gestureHandler = new GestureHandler(canvas);
    this.intro = new IntroSequence();
    this.loading = new LoadingScreen();
    this.saveSystem = new SaveSystem();
    this.bestiary = new Bestiary();
    this.meta = evaluateUnlocks(loadMeta()).meta;
    saveMeta(this.meta);
    this.unlockedWeaponsSet = new Set(this.meta.unlockedWeapons);
    this.score = 0;
    this.bestScore = this._loadBestScore();
    this.gameTime = 0;
    this.runSeed = Date.now() & 0xffffffff;
    this.mapBounds = { minX: 0, minY: 0, maxX: 3840, maxY: 2160 };
    this.bestTime = this._loadBestTime();
    this.waveNumber = 1;
    this.waveTimer = 0;
    this.difficultyMultiplier = 1.0;
    this.bossSpawned = false;
    this.bossKilled = false;
    this.spawnTimers = {};
    this.triggeredWaveEvents = new Set();
    this.claimedArcanaSlots = new Set();
    this.arcanaOptions = [];
    this.levelUpOptions = [];
    this.levelUpControls = createRunLevelUpControls(this.meta);
    this._levelUpCardBounds = [];
    this._levelUpControlBounds = {};
    this._levelUpHovered = -1;
    this._levelUpControlHovered = null;
    this._levelUpBanishHovered = -1;
    this._levelUpSealHovered = -1;
    this.chestReward = null;
    this.chestOpenedAt = 0;
    this.selectedLevelIndex = -1;
    this.selectedCharacterIndex = 0;
    this.settingsTab = 'controls';
    this.shopItems = [];
    this.particles = [];
    this.damageNumbers = [];
    this.deathQuotes = [];
    this.bossSpawnQuote = null;
    this.ambientLore = null;
    this.ambientLoreTimer = 0;
    this.difficultyNotifTimer = 0;
    this.fps = 0;
    this.lastFpsTime = 0;
    this.frameCount = 0;
    this.menuButtons = [];
    this.pauseMenuButtons = [];
    this.gameOverBtnHovered = null;
    this.arcanaSelectCount = 0;
    this.arcanaFirstChoice = true;
    this.arcanaSelectPending = false;
    this.arcanaTimer = 0;
    this.pendingInteractableChoice = null;
    this._interactableChoiceBounds = [];
    this._interactableChoiceHovered = -1;
    this.forceTripleChest = false;
    this.cursedAltarAccepted = false;
    this.billFrenzyTimer = 0;
    this.runFlags = {};
    this.runUnlockFlags = new Set();
    this.runEvolvedWeapons = new Set();
    this.runNotesFound = new Set();
    this.runRelicsFound = new Set();
    this.runEnemyKills = {};
    this.runProfile = { spiceLevel: 0, hyper: false, challengeId: null, dailyKey: null, seed: null };
    this.selectedSpiceLevel = 0;
    this.selectedHyper = false;
    this.selectedChallengeId = null;
    this.selectedDaily = false;
    this.dailyChallenge = null;
    this._runWon = false;
    this._runFinished = false;
    this._powerUpRowBounds = [];
    this._powerUpHovered = -1;
    this._powerUpBackHovered = false;
    this._powerUpRefundHovered = false;
    this._showSaveSlotSelect = false;
    this._volumeSlider = null;
    this._volumeDragging = false;
    this._shopItemBounds = [];
    this._shopItemHovered = -1;
    this._shopCloseHovered = false;
    this.bossButtonHovered = false;
    this.shopButtonHovered = false;
    this.diffButtonHovered = false;
    this.goldButtonHovered = false;
    this._levelCardBounds = [];
    this._levelHovered = -1;
    this._levelConfirmHovered = false;
    this._levelBackHovered = false;
    this._levelSpiceMinusHovered = false;
    this._levelSpicePlusHovered = false;
    this._levelHyperHovered = false;
    this._levelChallengeHovered = false;
    this._levelDailyHovered = false;
    this._charCardBounds = [];
    this._charHovered = -1;
    this._charConfirmHovered = false;
    this._charBackHovered = false;
    this._saveSlotBounds = [];
    this._saveSlotHovered = -1;
    this._saveDeleteHovered = -1;
    this._saveBackHovered = false;
    this._pauseSaveSlotBounds = [];
    this._pauseSaveSlotHovered = -1;
    this._pauseDeleteHovered = -1;
    this._pauseCancelHovered = false;
    this._settingsTabBounds = [];
    this._settingsTabHovered = -1;
    this._settingsBackHovered = false;
    this._bestiaryCategory = 'weapons';
    this._bestiaryCategoryBounds = [];
    this._bestiaryCategoryHovered = -1;
    this._bestiaryCardBounds = [];
    this._bestiaryHoveredKey = null;
    this._bestiarySelectedKey = null;
    this._bestiaryPage = 0;
    this._bestiaryPageInfo = null;
    this._bestiaryPageBounds = null;
    this._bestiaryPageHovered = null;
    this._arcanaCardBounds = [];
    this._arcanaHovered = -1;
    this._arcanaSkipHovered = false;
    this._talentNodeBounds = [];
    this._talentNodeHovered = null;
    this._talentBackHovered = false;
    this._initMenu();
  }

  _initMenu() {
    const btnW = 276, btnH = 48, gap = 12;
    const startY = 348;
    const cx = 230;
    this.menuButtons = [
      new MenuButton(cx - btnW / 2, startY, btnW, btnH, '开始游戏', () => { this.setState('LEVEL_SELECT'); this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + btnH + gap, btnW, btnH, '继续游戏', () => { this.setState('SAVE_SELECT'); this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + 2 * (btnH + gap), btnW, btnH, '能力强化', () => { this.meta = evaluateUnlocks(loadMeta()).meta; this.setState('POWERUP'); this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + 3 * (btnH + gap), btnW, btnH, '设置', () => { this.setState('SETTINGS'); this.settingsTab = 'controls'; this.audio.playMenuClick(); })
    ];
    this.menuButtons.splice(3, 0, new MenuButton(cx - btnW / 2, startY + 3 * (btnH + gap), btnW, btnH, '天赋树', () => {
      this.meta = evaluateUnlocks(loadMeta()).meta;
      this.setState('SKILLTREE');
      this.audio.playMenuClick();
    }));
    for (let i = 4; i < this.menuButtons.length; i++) {
      this.menuButtons[i].y = startY + i * (btnH + gap);
    }
    for (let i = 0; i < this.menuButtons.length; i++) {
      this.menuButtons[i].x = cx - btnW / 2;
      this.menuButtons[i].y = startY + i * (btnH + gap);
      this.menuButtons[i].w = btnW;
      this.menuButtons[i].h = btnH;
    }
  }

  _initPauseMenu() {
    const btnW = 200, btnH = 44, gap = 12;
    const startY = GAME_HEIGHT / 2 - 80;
    const cx = GAME_WIDTH / 2;
    this.pauseMenuButtons = [
      new MenuButton(cx - btnW / 2, startY, btnW, btnH, '继续游戏', () => { this.setState('PLAYING'); this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + btnH + gap, btnW, btnH, '保存并返回', () => { this._showSaveSlotSelect = true; this.audio.playMenuClick(); }),
      new MenuButton(cx - btnW / 2, startY + 2 * (btnH + gap), btnW, btnH, '设置', () => { this.previousState = 'PAUSED'; this.setState('SETTINGS'); this.settingsTab = 'controls'; this.audio.playMenuClick(); })
    ];
  }

  setState(newState) {
    if (this.state !== 'SETTINGS') this.previousState = this.state;
    this.state = newState;
    if (newState === 'MENU') {
      this.audio.startMusic('menu');
    } else if (newState === 'PLAYING') {
      if (this.bossSpawned && !this.bossKilled) {
        this.audio.startMusic('boss');
      } else {
        this.audio.startMusic('game');
      }
    } else if (newState === 'GAME_OVER' || newState === 'VICTORY') {
      this.audio.stopMusic();
    } else if (newState === 'PAUSED') {
      this.audio.stopMusic();
    } else if (newState === 'SHOP') {
      this.audio.stopMusic();
    } else if (newState === 'LEVEL_SELECT' || newState === 'CHARACTER_SELECT' || newState === 'SAVE_SELECT' || newState === 'POWERUP' || newState === 'SKILLTREE') {
      this.audio.startMusic('menu');
    }
  }

  startGame() {
    this.meta = evaluateUnlocks(loadMeta()).meta;
    saveMeta(this.meta);
    this.unlockedWeaponsSet = new Set(this.meta.unlockedWeapons);
    this.dailyChallenge = this.selectedDaily ? getDailyChallengeForDate() : null;
    if (this.dailyChallenge) {
      const dailyLevelIndex = LEVELS.findIndex(level => level.id === this.dailyChallenge.levelId);
      const dailyCharacterIndex = CHARACTERS.findIndex(char => char.id === this.dailyChallenge.characterId);
      if (dailyLevelIndex >= 0 && isLevelUnlocked(this.meta, LEVELS[dailyLevelIndex].id)) this.selectedLevelIndex = dailyLevelIndex;
      if (dailyCharacterIndex >= 0 && isCharacterUnlocked(this.meta, CHARACTERS[dailyCharacterIndex].id)) this.selectedCharacterIndex = dailyCharacterIndex;
    }
    this.runProfile = this._buildRunProfile(this.dailyChallenge);
    if (this.selectedLevelIndex < 0 || !isLevelUnlocked(this.meta, LEVELS[this.selectedLevelIndex]?.id)) {
      this.selectedLevelIndex = LEVELS.findIndex(level => isLevelUnlocked(this.meta, level.id));
      if (this.selectedLevelIndex < 0) this.selectedLevelIndex = 0;
    }
    if (!isCharacterUnlocked(this.meta, CHARACTERS[this.selectedCharacterIndex]?.id)) {
      this.selectedCharacterIndex = Math.max(0, CHARACTERS.findIndex(char => char.id === 'antonio'));
    }
    const char = CHARACTERS[this.selectedCharacterIndex];
    this.mapBounds = { minX: 0, minY: 0, maxX: 3840, maxY: 2160 };
    this._levelPropCache = null;
    this.player = new Player(this.mapBounds.maxX / 2, this.mapBounds.maxY / 2);
    this.player.applyCharacterStats(char);
    applyPowerUpsToPlayer(this.player, this.meta.powerUps, this.meta.m4);
    this.player.arcanaInventory = new ArcanaInventory();
    const sprite = CHARACTER_SPRITES[char.id];
    if (sprite) this.player.setSprite(sprite);
    const animSheets = CHARACTER_ANIM_SHEETS[char.id];
    if (animSheets) this.player.loadAnimSheets(animSheets);
    this.player.setBounds(this.mapBounds.minX, this.mapBounds.minY, this.mapBounds.maxX, this.mapBounds.maxY);
    if (char.startWeaponId) {
      this.player.setWeapon(WEAPON_DEFS[char.startWeaponId]);
    }
    this._syncBestiaryInventory();
    this.runSeed = this.runProfile.seed ?? ((Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0);
    this.entityManager.clear();
    this._spawnLevelInteractables();
    this.score = 0;
    this.gameTime = 0;
    this.waveNumber = 1;
    this.waveTimer = 0;
    this.difficultyMultiplier = 1.0;
    this.bossSpawned = false;
    this.bossKilled = false;
    this.spawnTimers = {};
    this.triggeredWaveEvents = new Set();
    this.claimedArcanaSlots = new Set();
    this.arcanaOptions = [];
    this.levelUpOptions = [];
    this.levelUpControls = createRunLevelUpControls(this.meta);
    this._levelUpHovered = -1;
    this._levelUpControlHovered = null;
    this._levelUpBanishHovered = -1;
    this._levelUpSealHovered = -1;
    this.chestReward = null;
    this.chestOpenedAt = 0;
    this.forceTripleChest = false;
    this.cursedAltarAccepted = false;
    this.billFrenzyTimer = 0;
    this.pendingInteractableChoice = null;
    this.runFlags = {};
    this.runUnlockFlags = new Set();
    this.runEvolvedWeapons = new Set();
    this.runNotesFound = new Set();
    this.runRelicsFound = new Set();
    this.runEnemyKills = {};
    this._runWon = false;
    this._runFinished = false;
    this.juice = new JuiceSystem();
    this.particles = [];
    this.damageNumbers = [];
    this.deathQuotes = [];
    this._generateShopItems();
    this.state = 'LEVEL_LOADING';
    this._levelLoadStart = performance.now();
    this._levelLoadDuration = 4000;
    this.audio.init();
    this.audio.startMusic('game');
  }

  _spawnLevelInteractables() {
    const level = LEVELS[this.selectedLevelIndex] || LEVELS[0];
    const plan = buildInteractablePlan(level.id, this.runSeed || Date.now());
    const visiblePlan = plan.filter(item => {
      if (item.noteId && this.meta?.m4?.notes?.includes(item.noteId)) return false;
      if (item.relicId && hasRelic(this.meta?.m4, item.relicId)) return false;
      return true;
    });
    const placed = placeInteractablesInBounds(visiblePlan, this.mapBounds);
    for (const item of placed) {
      this.entityManager.add(new Interactable(item));
    }
  }

  _buildRunProfile(dailyChallenge = null) {
    const challengeId = dailyChallenge?.challengeId || this.selectedChallengeId || null;
    const challengeProfile = challengeId ? (CHALLENGE_DEFS[challengeId]?.profile || {}) : {};
    const profile = {
      ...challengeProfile,
      spiceLevel: dailyChallenge ? dailyChallenge.spiceLevel : this.selectedSpiceLevel,
      hyper: dailyChallenge ? dailyChallenge.hyper : this.selectedHyper,
      challengeId,
      dailyKey: dailyChallenge?.key || null,
      seed: dailyChallenge?.seed ?? null
    };
    return profile;
  }

  _restartGame() { this.startGame(); }

  spawnBoss() {
    if (this.bossSpawned) return;
    this.bossSpawned = true;
    this.audio.startMusic('boss');
    const bossData = ENEMIES.boss;
    const enemy = new Enemy(this.player.x, Math.max(this.mapBounds.minY + 60, this.player.y - 260), bossData, 'boss');
    enemy.radius = 50;
    enemy.setTarget(this.player);
    this.entityManager.add(enemy);
    this.bestiary.unlockEnemy(bossData.id);
    if (bossData.spawnQuote) this.showBossSpawnQuote(bossData.spawnQuote);
  }

  spawnMirrorBoss() {
    if (this.bossSpawned) return;
    this.bossSpawned = true;
    if (!this.runFlags) this.runFlags = {};
    this.runFlags.mirrorBoss = true;
    this.audio.startMusic('boss');
    const bossData = {
      ...ENEMIES.boss,
      id: 'mirror_gourmando',
      name: '镜中 Gourmando',
      nameEn: 'Mirror Gourmando',
      hp: 18000,
      atk: 90,
      speed: 0.075,
      spawnQuote: '镜子终于开始结账了。它照出的不是敌人，而是 Gourmando 留在你身后的那一串欠单。'
    };
    const enemy = new Enemy(this.player.x, Math.max(this.mapBounds.minY + 60, this.player.y - 280), bossData, 'boss');
    enemy.radius = 54;
    enemy.spriteKey = 'health_inspector';
    enemy.setTarget(this.player);
    this.entityManager.add(enemy);
    this.showBossSpawnQuote(bossData.spawnQuote);
  }

  _generateShopItems() {
    this.shopItems = [
      { type: 'hp_boost', name: '生命强化', desc: '最大HP+10, 恢复10HP', price: 10 },
      { type: 'atk_boost', name: '攻击强化', desc: '攻击力+1', price: 100 },
      { type: 'weapon', weaponId: 'whip', name: '鞭子', desc: '购买/升级鞭子', price: 10 },
      { type: 'weapon', weaponId: 'cross', name: '十字架', desc: '购买/升级十字架', price: 10 },
      { type: 'arcana', arcanaId: 'fool', name: '愚者', desc: '所有子弹增加弹射效果', price: 100 },
      { type: 'arcana', arcanaId: 'gemini', name: '双子星', desc: '十字架数量+1', price: 100 },
      { type: 'arcana', arcanaId: 'priestess', name: '祭司', desc: '攻击速率提升1.5倍', price: 100 },
      { type: 'arcana', arcanaId: 'emperor', name: '皇帝', desc: '十字架和子弹体积增加', price: 100 }
    ];
  }

  gameOver() {
    this._runWon = false;
    this._finishRun();
    this.state = 'GAME_OVER';
    this.audio.playDeath();
    this.audio.stopMusic();
    if (this.gameTime > this.bestTime) { this.bestTime = this.gameTime; this._saveBestTime(this.bestTime); }
    if (this.score > this.bestScore) { this.bestScore = this.score; this._saveBestScore(this.bestScore); }
  }

  victory() {
    this._runWon = true;
    this._finishRun();
    this.state = 'VICTORY';
    this.audio.playLevelUp();
    this.audio.stopMusic();
    if (this.gameTime > this.bestTime) { this.bestTime = this.gameTime; this._saveBestTime(this.bestTime); }
    if (this.score > this.bestScore) { this.bestScore = this.score; this._saveBestScore(this.bestScore); }
  }

  _loadBestTime() { const v = localStorage.getItem('vs_bestTime'); return v ? parseInt(v, 10) : 0; }
  _saveBestTime(t) { localStorage.setItem('vs_bestTime', String(t)); }
  _loadBestScore() { const v = localStorage.getItem('vs_bestScore'); return v ? parseInt(v, 10) : 0; }
  _saveBestScore(s) { localStorage.setItem('vs_bestScore', String(s)); }

  _finishRun() {
    if (this._runFinished || !this.player) return;
    this._runFinished = true;
    this.meta = grantRunGold(this.meta, this.player.gold, this.meta.powerUps);
    this.meta.sealedUpgrades = controlsToMetaSeals(this.levelUpControls);
    const level = LEVELS[this.selectedLevelIndex] || LEVELS[0];
    const result = recordRunProgress(this.meta, {
      levelId: level.id,
      time: this.gameTime,
      kills: this.player.kills,
      level: this.player.level,
      packageOpened: !!this.runFlags.packageOpened,
      mirrorSeen: !!this.runFlags.mirrorSeen,
      evolvedWeapons: Array.from(this.runEvolvedWeapons || []),
      weaponUnlockFlags: Array.from(this.runUnlockFlags || []),
      won: this._runWon,
      hyper: !!this.runProfile?.hyper,
      spiceLevel: this.runProfile?.spiceLevel || 0,
      challengeId: this.runProfile?.challengeId || null,
      dailyKey: this.runProfile?.dailyKey || null,
      dailySeed: this.runProfile?.seed ?? null,
      notesFound: Array.from(this.runNotesFound || []),
      relicsFound: Array.from(this.runRelicsFound || []),
      endingId: this._resolveEnding(level),
      enemyKills: { ...(this.runEnemyKills || {}) }
    });
    this.meta = result.meta;
    saveMeta(this.meta);
    this.unlockedWeaponsSet = new Set(this.meta.unlockedWeapons);
  }

  _resolveEnding(level) {
    if (!this._runWon) return null;
    if (level.id !== 'moonboba' && !this.runFlags.mirrorBoss) return null;
    if ((this.player?.gold || 0) >= 500) return 'invoice_paid';
    if ((this.runEvolvedWeapons?.size || 0) >= 3) return 'recipe_burned';
    return 'last_bowl_shared';
  }

  handleDropPickup(dropData) { applyDropPickup(this, dropData); }
  requestLevelUp() {
    if (!this.player || this.player.pendingLevelUps <= 0) return;
    const seed = (this.runSeed + this.player.level * 2654435761 + this.player.kills) >>> 0;
    this.levelUpOptions = buildUpgradeOptions({
      inventory: this.player.getUpgradeInventory(),
      seed,
      count: this.player.luckMultiplier >= 1.5 ? 4 : 3,
      banished: this.levelUpControls?.banished || new Set(),
      sealed: this.levelUpControls?.sealed || new Set(),
      unlockedWeapons: this.unlockedWeaponsSet
    });
    this.setState('LEVEL_UP');
    this.audio.playLevelUp();
  }

  chooseLevelUpOption(index) {
    const choice = this.levelUpOptions[index];
    if (!choice || !this.player) return;
    const next = applyUpgradeChoice(this.player.getUpgradeInventory(), choice);
    this.player.applyUpgradeInventory(next);
    this._syncBestiaryInventory();
    this.player.pendingLevelUps = Math.max(0, this.player.pendingLevelUps - 1);
    this.levelUpOptions = [];
    this._continueAfterLevelChoice();
  }

  rerollLevelUpOptions() {
    if (!this.player || this.state !== 'LEVEL_UP') return;
    const spent = spendLevelUpControl(this.levelUpControls, 'reroll');
    if (!spent.ok) return;
    const seed = (this.runSeed + this.player.level * 1103515245 + this.player.kills + performance.now()) >>> 0;
    this.levelUpOptions = buildUpgradeOptions({
      inventory: this.player.getUpgradeInventory(),
      seed,
      count: this.player.luckMultiplier >= 1.5 ? 4 : 3,
      banished: this.levelUpControls.banished,
      sealed: this.levelUpControls.sealed,
      unlockedWeapons: this.unlockedWeaponsSet
    });
    this.audio.playMenuClick();
  }

  skipLevelUp() {
    if (!this.player || this.state !== 'LEVEL_UP') return;
    const spent = spendLevelUpControl(this.levelUpControls, 'skip');
    if (!spent.ok) return;
    this.player.gold += 10;
    this.player.pendingLevelUps = Math.max(0, this.player.pendingLevelUps - 1);
    this.levelUpOptions = [];
    this._continueAfterLevelChoice();
  }

  banishLevelUpOption(index) {
    const choice = this.levelUpOptions[index];
    if (!choice || choice.kind === 'fallback') return;
    const result = banishUpgrade(this.levelUpControls, choice.key);
    if (!result.ok) return;
    this.requestLevelUp();
  }

  sealLevelUpOption(index) {
    const choice = this.levelUpOptions[index];
    if (!choice || choice.kind === 'fallback') return;
    const result = sealUpgrade(this.levelUpControls, choice.key);
    if (!result.ok) return;
    this.meta.sealedUpgrades = controlsToMetaSeals(this.levelUpControls);
    saveMeta(this.meta);
    this.requestLevelUp();
  }

  _continueAfterLevelChoice() {
    if (this.player.pendingLevelUps > 0) {
      this.requestLevelUp();
    } else {
      this.setState('PLAYING');
    }
  }

  openChest() {
    if (!this.player) return;
    this.chestReward = resolveChestReward(this);
    this._syncBestiaryInventory();
    if (this.chestReward?.gold) this.player.gold += this.chestReward.gold;
    this.chestOpenedAt = performance.now();
    this.cameraShake.shake(8, 300);
    this.setState('CHEST_OPEN');
    this.audio.playLevelUp();
  }

  closeChest() {
    this.chestReward = null;
    this.setState('PLAYING');
  }

  addDamageNumber(x, y, amount) { createDamageNumber(this, x, y, amount); }
  addDeathExplosion(x, y, color) { createDeathExplosion(this, x, y, color); }
  showDeathQuote(x, y, text) { createDeathQuote(this, x, y, text); }
  showBossSpawnQuote(text) { createBossSpawnQuote(this, text); }
  spawnDrop(x, y, dropData) { this.entityManager.add(new DropItem(x, y, dropData)); }

  _getAllSaves() { return this.saveSystem.getAllSaves(); }
  _loadGame(slot) { return this.saveSystem.getSave(slot); }
  _saveGame(slot) { const d = this.saveSystem.createSaveData(this); this.saveSystem.setSave(slot, d); }
  _deleteSave(slot) { this.saveSystem.deleteSave(slot); }
  _restoreFromSave(save) {
    restoreFromSave(this, save);
    this._syncBestiaryInventory();
  }

  _syncBestiaryInventory() {
    syncBestiaryInventory(this.bestiary, this.player);
  }

  update(dt) {
    if (this.intro.active) {
      this.intro.update(dt);
      if (this.intro.finished) {
        this.setState('MENU');
      }
      return;
    }
    if (this.loading.active) { this.loading.update(); return; }
    if (this.state === 'PLAYING') { updateGameLogic(this, dt); }
    if (this.state === 'LEVEL_LOADING') {
      const elapsed = performance.now() - this._levelLoadStart;
      if (elapsed >= this._levelLoadDuration) this.state = 'PLAYING';
    }
  }

  render() { renderGame(this); }
}


// --- main.js ---





const canvas = document.getElementById('gameCanvas');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const game = new Game(canvas);
game.inputManager.bind(canvas, game);
game.gestureHandler.bind();

window.game = game;

let lastTime = performance.now();
let accumulator = 0;

function gameLoop(currentTime) {
  requestAnimationFrame(gameLoop);

  const frameTime = currentTime - lastTime;
  lastTime = currentTime;

  game.frameCount++;
  if (currentTime - game.lastFpsTime >= 1000) {
    game.fps = game.frameCount;
    game.frameCount = 0;
    game.lastFpsTime = currentTime;
  }

  handleKeyboard(game);
  handleHover(game);

  if (game.inputManager.consumeMouseDown()) {
    handleClick(game);
  }

  accumulator += frameTime;
  while (accumulator >= FIXED_DT) {
    game.update(FIXED_DT);
    accumulator -= FIXED_DT;
  }

  game.render();

  game.gestureHandler.render(game.ctx);
}

game.intro.start();
game.audio.startMusic('intro');
requestAnimationFrame(gameLoop);


