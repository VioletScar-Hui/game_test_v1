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

export const WAVES = Object.fromEntries(
  LEVEL_IDS.map(levelId => [levelId, Array.from({ length: 30 }, (_, minute) => makeWave(levelId, minute))])
);

export function getWaveForTime(levelId, gameTimeMs) {
  const waves = WAVES[levelId] || WAVES.hungry_forest;
  const minute = Math.max(0, Math.min(waves.length - 1, Math.floor(gameTimeMs / 60000)));
  return waves[minute];
}

export function shouldTriggerWaveEvent(wave, eventName) {
  return wave?.event === eventName;
}
