import { defineQuery } from '../../bitecs.js';
import { System } from '../../ecs.js';

import { hasSpriteTag } from '../sprite.js';

import {
    PlayAnimationRequest,
    StopAnimationRequest
} from './components.js';

export default class AnimationRequestsSystem extends System {

    #playAnimationQuery;
    #stopAnimationQuery;

    constructor(ecs) {
        super(ecs);

        this.#playAnimationQuery = defineQuery([PlayAnimationRequest]);
        this.#stopAnimationQuery = defineQuery([StopAnimationRequest]);
    }

    preUpdate() {

        const { store, world } = this.ecs;

        for (const request of this.#playAnimationQuery(world)) {
            const entity = PlayAnimationRequest.sprite[request];

            if (hasSpriteTag(world, entity)) {
                const sprite = store.get(entity, 'sprite');
                const animation = store.get(request, 'animation');

                if (sprite && animation) {
                    sprite.play(animation);
                }
            }

        }

        for (const request of this.#stopAnimationQuery(world)) {
            const entity = StopAnimationRequest.sprite[request];

            if (hasSpriteTag(world, entity)) {
                const sprite = store.get(entity, 'sprite');

                if (sprite) {
                    sprite.stop();
                }
            }
        }
    }
}
