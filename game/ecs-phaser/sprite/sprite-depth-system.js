import { defineQuery, enterQuery } from '../../bitecs.js';
import { System } from '../../ecs.js';

import { SpriteDepth, SpriteTag } from './components.js';

export default class SpriteDepthSystem extends System {

    #enterEntities;

    constructor(ecs) {
        super(ecs);

        this.#enterEntities = enterQuery(defineQuery([SpriteTag, SpriteDepth]));
    }

    preUpdate() {

        const { store, world } = this.ecs;

        for (const entity of this.#enterEntities(world)) {
            const sprite = store.get(entity, 'sprite');

            if (sprite) {
                sprite.setDepth(SpriteDepth.depth[entity]);
            }

        }
    }
}
