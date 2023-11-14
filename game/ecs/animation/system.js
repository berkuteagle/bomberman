import { defineQuery, defineSystem, hasComponent, removeEntity } from '../../bitecs.js';

import { Request } from '../common.js';
import { SpriteTag } from '../sprite.js';

import { AnimationTag } from './AnimationTag.js';
import { AnimationRequest } from './AnimationsRequest.js';

export const ANIMATION_STATE = Object.freeze({
    STOP: 0,
    PLAY: 1,
    FORCE_PLAY: 1 << 2
});

export const createAnimationPreSystem = () => {
    const allEntities = defineQuery([AnimationRequest]);

    return defineSystem(world => {
        for (const entity of allEntities(world)) {

            const toEntity = AnimationRequest.sprite[entity];

            if (hasComponent(world, AnimationTag, toEntity) && hasComponent(world, SpriteTag, toEntity)) {
                const sprite = world.scene.ecs.sprites.get(AnimationRequest.sprite[entity]);
                const animation = world.scene.ecs.anims.getKey(AnimationRequest.key[entity]);
                const state = AnimationRequest.state[entity];

                if (sprite && state) {
                    sprite.play(animation, !!(state & ANIMATION_STATE.FORCE_PLAY));
                } else if (sprite) {
                    sprite.stop();
                }
            }

        }
    });
}
