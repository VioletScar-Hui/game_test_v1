import { ARCANA_CHOICE_TIMES } from '../config/arcanas-data.js';

export function getArcanaChoiceForTime(gameTimeMs, claimedSlots) {
  for (const choice of ARCANA_CHOICE_TIMES) {
    if (gameTimeMs >= choice.atMs && !claimedSlots.has(choice.slot)) {
      return choice;
    }
  }
  return null;
}
