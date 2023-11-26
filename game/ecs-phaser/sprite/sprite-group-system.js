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

        const { world, store } = this.ecs;

        for (const entity of this.#enterEntities(world)) {
            const sprite = store.get(entity, 'sprite');
            const group = store.get(SpriteGroup.key[entity], 'group');

            if (sprite && group) {
                group.add(sprite);
            }
        }
    }
}
