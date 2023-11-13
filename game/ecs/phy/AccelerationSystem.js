import { defineQuery, defineSystem } from '../../bitecs.js';

import SceneSystem from '../SceneSystem.js';

import { Velocity } from './Velocity.js';
import { Acceleration } from './Acceleration.js';

export default class AccelerationSystem extends SceneSystem {

    #update;
    #allEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#allEntities = defineQuery([Acceleration, Velocity]);
        this.#update = defineSystem((world, _time, delta) => {

            for (const entity of this.#allEntities(world)) {

                Velocity.x[entity] += Acceleration.x[entity] * delta / 1000;
                Velocity.y[entity] += Acceleration.y[entity] * delta / 1000;

            }

        });
    }

    update(time, delta) {
        this.#update(this.ecs.world, time, delta);
    }

}
