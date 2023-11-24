import { defineQuery, enterQuery } from '../../bitecs.js';

import System from '../system.js';

import { SpriteGroup } from './SpriteGroup.js';
import { SpriteTag } from './SpriteTag.js';

export default class SpriteGroupSystem extends System {

    #enterEntities;

    constructor(ecs, config) {
        super(ecs, config);

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
