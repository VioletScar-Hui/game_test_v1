import { WEAPON_DEFS, EVOLUTION_DEFS } from '../config/weapons-data.js';
import { getEligibleEvolutions } from './evolution.js';
import { buildUpgradeOptions, applyUpgradeChoice } from './upgrade-pool.js';

export function resolveChestReward(game) {
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
