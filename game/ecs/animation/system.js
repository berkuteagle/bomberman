import { Changed, defineQuery, defineSystem, exitQuery } from '../../bitecs.js';

import { Sprite } from '../sprite.js';
import { Animation, ANIMATION_STATE } from './Animation.js';

export const createAnimationSystem = (animationsMap, spritesMap) => {

    const allEntities = defineQuery([Animation, Sprite]);
    const allChangedEntities = defineQuery([Changed(Animation), Sprite]);
    const exitEntities = exitQuery(allEntities);

    return defineSystem(world => {

        for (const entity of allChangedEntities(world)) {
            const sprite = spritesMap.get(entity);
            const animation = animationsMap.get(Animation.key[entity]);
            const state = Animation.state[entity];

            if (state) {
                sprite?.play(animation, !!(state & ANIMATION_STATE.FORCE_PLAY));
            } else {
                sprite?.stop();
            }
        }

        for (const entity of exitEntities(world)) {
            spritesMap.get(entity)?.stop();
        }

    });
}
