import { defineQuery, enterQuery, exitQuery } from '../../bitecs.js';

import { Position } from '../position.js';
import System from '../system.js';

import { SpriteTag } from './SpriteTag.js';

export default class SpriteSystem extends System {

    #enterEntities;
    #exitEntities;
    #allPositionEntities;

    constructor(ecs, config) {
        super(ecs, config);

        const allEntities = defineQuery([SpriteTag]);

        this.#enterEntities = enterQuery(allEntities);
        this.#exitEntities = exitQuery(allEntities);
        this.#allPositionEntities = defineQuery([SpriteTag, Position]);
    }

    preUpdate() {
        for (const entity of this.#enterEntities(this.ecs.world)) {
            const sprite = this.ecs.sprites.get(entity);

            if (sprite) {
                this.ecs.world.scene.add.existing(sprite);
            }
        }
    }

    update() {
        for (const entity of this.#allPositionEntities(this.ecs.world)) {
            const sprite = this.ecs.sprites.get(entity);

            if (sprite) {
                sprite.x = Position.x[entity];
                sprite.y = Position.y[entity];
            }
        }
    }

    postUpdate() {
        for (const entity of this.#exitEntities(this.ecs.world)) {
            this.ecs.sprites.destroy(entity);
        }
    }
}
