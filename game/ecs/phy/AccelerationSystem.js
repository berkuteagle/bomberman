import { defineQuery, defineSystem } from '../../bitecs.js';
import { Math } from '../../phaser.js';

import SceneSystem from '../SceneSystem.js';

import { Acceleration } from './Acceleration.js';
import { Velocity } from './Velocity.js';

export default class AccelerationSystem extends SceneSystem {

    #update;
    #allEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#allEntities = defineQuery([Acceleration, Velocity]);

        const velocityVector = new Math.Vector2();

        this.#update = defineSystem((world, _time, delta) => {

            for (const entity of this.#allEntities(world)) {

                velocityVector.set(
                    Velocity.x[entity] + Acceleration.x[entity] * delta / 1000,
                    Velocity.y[entity] + Acceleration.y[entity] * delta / 1000
                );

                velocityVector.limit(Velocity.max[entity])

                Velocity.x[entity] += velocityVector.x;
                Velocity.y[entity] += velocityVector.y;
            }

        });
    }

    update(time, delta) {
        this.#update(this.ecs.world, time, delta);
    }

}
