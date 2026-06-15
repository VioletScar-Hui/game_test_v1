import assert from 'node:assert/strict';

import { createDefaultMeta } from '../js/game/powerup-store.js';
import { getUnlockedLevelIds, recordRunProgress } from '../js/game/unlock-manager.js';

{
  const meta = createDefaultMeta();
  const result = recordRunProgress(meta, {
    levelId: 'hungry_forest',
    time: 60_000,
    kills: 1,
    level: 2,
    won: true
  });

  assert.ok(
    getUnlockedLevelIds(result.meta).includes('waffle_tower'),
    'clearing hungry_forest boss should unlock waffle_tower without requiring 15 minutes'
  );
  assert.ok(
    result.meta.progress.bossClears.includes('hungry_forest'),
    'boss clears should be persisted in meta progress'
  );
}

{
  const meta = createDefaultMeta();
  const result = recordRunProgress(meta, {
    levelId: 'hungry_forest',
    time: 60_000,
    kills: 1,
    level: 2,
    won: false
  });

  assert.equal(
    getUnlockedLevelIds(result.meta).includes('waffle_tower'),
    false,
    'surviving briefly without boss clear should not unlock the next level'
  );
}

console.log('level unlock boss clear tests passed');
