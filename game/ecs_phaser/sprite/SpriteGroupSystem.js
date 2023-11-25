import { defineQuery, enterQuery } from '../../bitecs.js';
import { System } from '../../ecs.js';

import { SpriteGroup, SpriteTag } from './components.js';

export default class SpriteGroupSystem extends System {

    #enterEntities;

    constructor(ecs) {
        super(ecs);

        this.#enterEntities = enterQuery(defineQuery([SpriteTag, SpriteGroup]));
    }

    preUpdate() {

        const { world, sprites, groups } = this.ecs;

        for (const entity of this.#enterEntities(world)) {
            const sprite = sprites.get(entity);
            const group = groups.get(SpriteGroup.key[entity]);

            if (sprite && group) {
                group.add(sprite);
            }
        }
    }
}
