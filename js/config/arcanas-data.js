export const ARCANAS = [
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

export const ARCANA_CHOICE_TIMES = [
  { slot: 0, atMs: 0, label: '开局命运' },
  { slot: 1, atMs: 11 * 60 * 1000, label: '月亮糖 11:00' },
  { slot: 2, atMs: 21 * 60 * 1000, label: '月亮糖 21:00' }
];
