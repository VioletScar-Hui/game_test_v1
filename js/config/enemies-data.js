export const ENEMIES = {
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

export const DROP_ITEMS = {
  green_candy: { id: 'green_candy', name: '青涩经验糖', nameEn: 'Green Candy', type: 'exp', value: 10, color: '#69db7c', radius: 5, lifetime: 30000, autoPickupRange: 80 },
  red_candy: { id: 'red_candy', name: '爆浆经验糖', nameEn: 'Red Candy', type: 'exp', value: 100, color: '#ff6b6b', radius: 7, lifetime: 30000, autoPickupRange: 9999 },
  coin: { id: 'coin', name: '掉落的钢镚', nameEn: 'Dropped Coin', type: 'gold', value: 1, color: '#ffd43b', radius: 6, lifetime: 30000, autoPickupRange: 80 },
  chicken_leg: { id: 'chicken_leg', name: '烤鸡腿', nameEn: 'Chicken Leg', type: 'heal', value: 0.2, color: '#ffa94d', radius: 8, lifetime: 60000, autoPickupRange: 40 },
  whole_chicken: { id: 'whole_chicken', name: '整只烤鸡', nameEn: 'Whole Chicken', type: 'heal', value: 0.5, color: '#ff922b', radius: 10, lifetime: 60000, autoPickupRange: 40 },
  lunchbox: { id: 'lunchbox', name: '神秘便当盒', nameEn: 'Mystery Lunchbox', type: 'chest', value: 1, color: '#cc5de8', radius: 12, lifetime: 60000, autoPickupRange: 9999 },
  vip_card: { id: 'vip_card', name: '高曼多的黑卡', nameEn: "Gourmando's VIP Card", type: 'rare', value: 1, color: '#ffd700', radius: 14, lifetime: Infinity, autoPickupRange: 40 }
};
