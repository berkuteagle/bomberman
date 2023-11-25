import { defineQuery, enterQuery, exitQuery } from '../../bitecs.js';
import { Position, System } from '../../ecs.js';

import { SpriteTag } from './components.js';

export default class SpriteSystem extends System {

    #enterEntities;
    #exitEntities;
    #allPositionEntities;

    constructor(ecs) {
        super(ecs);

        const allEntities = defineQuery([SpriteTag]);

        this.#enterEntities = enterQuery(allEntities);
        this.#exitEntities = exitQuery(allEntities);
        this.#allPositionEntities = defineQuery([SpriteTag, Position]);
    }

    preUpdate() {
        for (const entity of this.#enterEntities(this.ecs.world)) {
            const sprite = this.ecs.store.getValue(entity, 'sprite');

            if (sprite) {
                this.ecs.world.scene.add.existing(sprite);
            }
        }
    }

    update() {
        for (const entity of this.#allPositionEntities(this.ecs.world)) {
            const sprite = this.ecs.store.getValue(entity, 'sprite');

            if (sprite) {
                sprite.x = Position.x[entity];
                sprite.y = Position.y[entity];
            }
        }
    }

    postUpdate() {
        for (const entity of this.#exitEntities(this.ecs.world)) {
            const sprite = this.ecs.store.getValue(entity, 'sprite');

            if (sprite) {
                this.ecs.store.removeField(entity, 'sprite');
                sprite.destroy();
            }
        }
    }
}
