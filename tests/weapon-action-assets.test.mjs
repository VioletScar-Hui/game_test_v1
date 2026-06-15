import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import { WEAPON_ANIMATION_FRAMES } from '../js/config/animation-data.js';

const workspaceRoot = process.cwd();
const expectedFunctionalActions = {
  thermal_bag: ['shield'],
  freezer_gate: ['ray'],
  service_bell: ['pulse'],
  michelin_cloak: ['shield', 'revive'],
  infinite_buffet: ['ray'],
  gorgeous_moonboba: ['pulse']
};

for (const [weaponId, actions] of Object.entries(expectedFunctionalActions)) {
  assert.ok(WEAPON_ANIMATION_FRAMES[weaponId], `${weaponId} should have functional action frames`);
  for (const action of actions) {
    assert.ok(Array.isArray(WEAPON_ANIMATION_FRAMES[weaponId][action]), `${weaponId}/${action} action is registered`);
    assert.ok(WEAPON_ANIMATION_FRAMES[weaponId][action].length >= 6, `${weaponId}/${action} has enough generated frames`);
  }
}

for (const [weaponId, actions] of Object.entries(WEAPON_ANIMATION_FRAMES)) {
  for (const [action, framePaths] of Object.entries(actions)) {
    const hashes = [];
    for (const framePath of framePaths) {
      const absolutePath = path.join(workspaceRoot, framePath);
      assert.ok(fs.existsSync(absolutePath), `${weaponId}/${action} missing ${framePath}`);
      const stat = fs.statSync(absolutePath);
      assert.ok(stat.size > 10_000, `${weaponId}/${action} ${framePath} looks too small for a generated action frame`);
      hashes.push(crypto.createHash('sha1').update(fs.readFileSync(absolutePath)).digest('hex'));
    }

    assert.equal(
      new Set(hashes).size,
      hashes.length,
      `${weaponId}/${action} should contain ${hashes.length} distinct generated action frames`
    );
  }
}

const regenScript = fs.readFileSync(path.join(workspaceRoot, 'scripts/regenerate-weapon-actions.ps1'), 'utf8');
assert.ok(
  regenScript.includes("Save-SourceAction 'whip' 'slash' 'slash_energy_strip_source.png' 6 6 'green' 0 1 $null"),
  'whip slash must cut the Image-2 slash strip in forward order so the sweep travels away from the player'
);

for (const sourceName of [
  'functional_thermal_bag_shield_source.png',
  'functional_freezer_gate_ray_source.png',
  'functional_service_bell_pulse_source.png',
  'functional_michelin_cloak_revive_source.png',
  'functional_infinite_buffet_ray_source.png',
  'functional_gorgeous_moonboba_pulse_source.png'
]) {
  assert.ok(regenScript.includes(sourceName), `${sourceName} must be part of the regeneration script`);
}

console.log('weapon action asset tests passed');
