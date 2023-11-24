import { defineQuery, enterQuery } from '../../bitecs.js';

import System from '../system.js';

import { SpriteDepth } from './SpriteDepth.js';
import { SpriteTag } from './SpriteTag.js';

export default class SpriteDepthSystem extends System {

    #enterEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#enterEntities = enterQuery(defineQuery([SpriteTag, SpriteDepth]));
    }

    preUpdate() {
        for (const entity of this.#enterEntities(this.ecs.world)) {
            this.ecs.sprites.get(entity)?.setDepth(SpriteDepth.depth[entity]);
        }
    }
}
