import { defineQuery, defineSystem, exitQuery, hasComponent, removeEntity } from '../../bitecs.js';
import { Math } from '../../phaser.js';

import SceneSystem from '../SceneSystem.js';
import { Position } from '../position.js';

import { Collision } from './Collision.js';
import { CollisionEntities } from './CollisionEntities.js';
import { CollisionTag } from './CollisionTag.js';
// import { CollisionTag } from './CollisionTag.js';
// import { Shape } from './Shape.js';

export default class CollisionSystem extends SceneSystem {

    #update;
    #postUpdate;
    #allEntities;
    #allCollisionTags;
    #exitCollisionTags;

    constructor(ecs, config) {
        super(ecs, config);

        // this.#allEntities = defineQuery([CollisionTag, Position, Shape]);
        this.#allEntities = defineQuery([Collision, CollisionEntities]);
        this.#allCollisionTags = defineQuery([CollisionTag]);
        this.#exitCollisionTags = exitQuery(this.#allCollisionTags);

        this.#update = defineSystem(world => {

            for (const entity of this.#allEntities(world)) {

                const eid0 = CollisionEntities.entities[entity][0];
                const eid1 = CollisionEntities.entities[entity][1];

                if (hasComponent(world, CollisionTag, eid0) && hasComponent(world, CollisionTag, eid1)) {
                    const pos0 = new Math.Vector2(Position.x[eid0], Position.y[eid0]);
                    const pos1 = new Math.Vector2(Position.x[eid1], Position.y[eid1]);

                    if (pos0.distance(pos1) < 10) {
                        if (!Collision.state[entity]) {
                            console.log('Baaam!!!');
                            Collision.state[entity] = 1;
                        }
                    } else {
                        Collision.state[entity] = 0;
                    }
                }
            }

        });

        this.#postUpdate = defineSystem(world => {
            for (const entity of this.#exitCollisionTags(world)) {

                for (const collision of this.#allEntities(world)) {
                    if (CollisionEntities.entities[collision].includes(entity)) {
                        removeEntity(world, collision);
                    }
                }

            }
        });
    }

    update(time, delta) {
        this.#update(this.ecs.world, time, delta);
    }

    postUpdate(time, delta) {
        this.#postUpdate(this.ecs.world, time, delta);
    }

}
