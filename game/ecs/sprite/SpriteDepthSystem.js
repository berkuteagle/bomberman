import { defineQuery, enterQuery } from '../../bitecs.js';

import SceneSystem from '../SceneSystem.js';

import { SpriteTag } from './SpriteTag.js';
import { SpriteDepth } from './SpriteDepth.js';

export default class SpriteDepthSystem extends SceneSystem {

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
