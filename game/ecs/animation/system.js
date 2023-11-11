import { Changed, defineQuery, defineSystem, exitQuery } from '../../bitecs.js';

import { Sprite } from '../sprite.js';
import { Animation, ANIMATION_STATE } from './Animation.js';

export const createAnimationSystem = () => {

    const allEntities = defineQuery([Animation, Sprite]);
    const allChangedEntities = defineQuery([Changed(Animation), Sprite]);
    const exitEntities = exitQuery(allEntities);

    return defineSystem(world => {

        for (const entity of allChangedEntities(world)) {
            const sprite = world.scene.ecs.getSprite(entity);
            const animation = world.scene.ecs.getAnimationKey(Animation.key[entity]);
            const state = Animation.state[entity];

            if (state) {
                sprite?.play(animation, !!(state & ANIMATION_STATE.FORCE_PLAY));
            } else {
                sprite?.stop();
            }
        }

        for (const entity of exitEntities(world)) {
            world.scene.ecs.getSprite(entity)?.stop();
        }

    });
}
