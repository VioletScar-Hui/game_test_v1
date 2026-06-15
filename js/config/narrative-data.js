export const GOURMANDO_NOTES = [
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

export const ENDING_DEFS = {
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

export const ENEMY_LORE_STAGE_TEXT = {
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
