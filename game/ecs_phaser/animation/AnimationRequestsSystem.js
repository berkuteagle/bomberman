import { defineQuery } from '../../bitecs.js';
import { System } from '../../ecs.js';

import { hasSpriteTag } from '../sprite.js';

import { PlayAnimationRequest, StopAnimationRequest } from './components.js';
import { hasAnimationTag } from './utils.js';

export default class AnimationRequestsSystem extends System {

    #playAnimationQuery;
    #stopAnimationQuery;

    constructor(ecs) {
        super(ecs);

        this.#playAnimationQuery = defineQuery([PlayAnimationRequest]);
        this.#stopAnimationQuery = defineQuery([StopAnimationRequest]);
    }

    preUpdate() {
        for (const request of this.#playAnimationQuery(this.ecs.world)) {
            const entity = PlayAnimationRequest.sprite[request];

            if (hasAnimationTag(this.ecs.world, entity) && hasSpriteTag(this.ecs.world, entity)) {
                const sprite = this.ecs.store.getValue(entity, 'sprite');
                const animation = this.ecs.store.getValue(request, 'animation');

                if (sprite && animation) {
                    sprite.play(animation);
                }
            }

        }

        for (const request of this.#stopAnimationQuery(this.ecs.world)) {
            const entity = StopAnimationRequest.sprite[request];

            if (hasAnimationTag(this.ecs.world, entity) && hasSpriteTag(this.ecs.world, entity)) {
                const sprite = this.ecs.store.getValue(entity, 'sprite');

                if (sprite) {
                    sprite.stop();
                }
            }
        }
    }
}
