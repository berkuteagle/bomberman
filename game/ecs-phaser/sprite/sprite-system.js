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

        const { store, world } = this.ecs;

        for (const entity of this.#enterEntities(world)) {
            const sprite = store.get(entity, 'sprite');

            if (sprite) {
                world.scene.add.existing(sprite);
            }
        }
    }

    update() {

        const { store, world } = this.ecs;

        for (const entity of this.#allPositionEntities(world)) {
            const sprite = store.get(entity, 'sprite');

            if (sprite) {
                sprite.setPosition(
                    Position.x[entity],
                    Position.y[entity]
                );
            }
        }
    }

    postUpdate() {

        const { store, world } = this.ecs;

        for (const entity of this.#exitEntities(world)) {
            const sprite = store.get(entity, 'sprite');

            if (sprite) {
                store.unset(entity, 'sprite');
                sprite.destroy();
            }
        }
    }
}
