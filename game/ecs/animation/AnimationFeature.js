import { defineQuery } from '../../bitecs.js';

import Feature from '../feature.js';
import { hasSpriteTag } from '../sprite.js';

import { AnimationRequest, AnimationState } from './AnimationRequest.js';
import { hasAnimationTag } from './AnimationTag.js';

export default class AnimationFeature extends Feature {

    #allEntities = null;

    /**
     * @override
     */
    init() {
        this.#allEntities = defineQuery([AnimationRequest]);
    }

    /**
     * @override
     */
    preUpdate() {
        const { world, sprites, anims } = this.ecs;

        for (const entity of this.#allEntities?.(world)) {

            const toEntity = AnimationRequest.sprite[entity];

            if (hasAnimationTag(world, toEntity) && hasSpriteTag(world, toEntity)) {
                const sprite = sprites.get(AnimationRequest.sprite[entity]);
                const animation = anims.getKey(AnimationRequest.animation[entity]);
                const state = AnimationRequest.state[entity];

                if (sprite && state) {
                    sprite.play(animation, !!(state & AnimationState.FORCE_PLAY));
                } else if (sprite) {
                    sprite.stop();
                }
            }

        }
    }

}
