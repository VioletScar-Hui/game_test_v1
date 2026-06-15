export const UNLOCK_RULES = {
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
