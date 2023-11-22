import { defineQuery, defineSystem, enterQuery, exitQuery, removeEntity } from '../../bitecs.js';
import { Math } from '../../phaser.js';

import SceneSystem from '../SceneSystem.js';
import { Position } from '../position.js';

import { CollisionEntities } from './CollisionEntities.js';
import { CollisionState } from './CollisionState.js';
import { CollisionTag, hasCollisionTag } from './CollisionTag.js';
// import { CollisionTag } from './CollisionTag.js';
// import { Shape } from './Shape.js';

export default class CollisionSystem extends SceneSystem {

    #preUpdate;
    #update;
    #postUpdate;
    #allEntities;
    #allCollisionTags;
    #exitCollisionTags;

    #allCollisionEntities;
    #enterCollisionEntities;

    constructor(ecs, config) {
        super(ecs, config);

        // this.#allEntities = defineQuery([CollisionTag, Position, Shape]);
        this.#allCollisionEntities = defineQuery([CollisionEntities]);
        this.#enterCollisionEntities = enterQuery(this.#allCollisionEntities);
        this.#allEntities = defineQuery([CollisionState, CollisionEntities]);
        this.#allCollisionTags = defineQuery([CollisionTag]);
        this.#exitCollisionTags = exitQuery(this.#allCollisionTags);

        this.#preUpdate = defineSystem(world => {

            for (const entity of this.#enterCollisionEntities(world)) {

                const first = CollisionEntities.first[entity];
                const second = CollisionEntities.second[entity];

                if (!hasCollisionTag(world, first, second)) {
                    removeEntity(world, entity);
                }
            }

        });

        this.#update = defineSystem(world => {

            for (const entity of this.#allEntities(world)) {

                const first = CollisionEntities.first[entity];
                const second = CollisionEntities.second[entity];

                const pos0 = new Math.Vector2(Position.x[first], Position.y[first]);
                const pos1 = new Math.Vector2(Position.x[second], Position.y[second]);

                if (pos0.distance(pos1) < 10) {
                    if (!CollisionState.state[entity]) {
                        world.scene.scene.sleep('UI');
                        world.scene.scene.switch('GameOver');
                        CollisionState.state[entity] = 1;
                    }
                } else {
                    CollisionState.state[entity] = 0;
                }

            }

        });

        this.#postUpdate = defineSystem(world => {
            for (const entity of this.#exitCollisionTags(world)) {

                for (const collision of this.#allEntities(world)) {
                    if (CollisionEntities.first[collision] === entity || CollisionEntities.second[collision] === entity) {
                        removeEntity(world, collision);
                    }
                }

            }
        });
    }

    preUpdate(time, delta) {
        this.#preUpdate(this.ecs.world, time, delta);
    }

    update(time, delta) {
        this.#update(this.ecs.world, time, delta);
    }

    postUpdate(time, delta) {
        this.#postUpdate(this.ecs.world, time, delta);
    }

}
