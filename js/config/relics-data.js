export const RELIC_DEFS = {
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

export const LEGACY_RELIC_IDS = ['randomazzo'];
