import { defineQuery } from '../../bitecs.js';
import { Feature } from '../../ecs.js';

import { hasSpriteTag } from '../sprite.js';

import { AnimationRequest, AnimationState } from './AnimationRequest.js';
import { hasAnimationTag } from './AnimationTag.js';

export default class AnimationFeature extends Feature {

    #allEntities = null;

    /**
     * @override
     */
    init() {
        this.ecs.store.register('animation');

        this.#allEntities = defineQuery([AnimationRequest]);
    }

    /**
     * @override
     */
    preUpdate() {
        const { world } = this.ecs;

        for (const entity of this.#allEntities?.(world)) {

            const toEntity = AnimationRequest.sprite[entity];

            if (hasAnimationTag(world, toEntity) && hasSpriteTag(world, toEntity)) {
                const sprite = this.ecs.store.getValue(AnimationRequest.sprite[entity], 'sprite');
                const animation = this.ecs.store.getValue(AnimationRequest.animation[entity], 'animation');

                const state = AnimationRequest.state[entity];

                if (sprite && state && animation) {
                    sprite.play(animation, !!(state & AnimationState.FORCE_PLAY));
                } else if (sprite) {
                    sprite.stop();
                }
            }

        }
    }

}
