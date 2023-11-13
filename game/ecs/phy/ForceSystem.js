import { defineQuery, defineSystem, hasComponent } from '../../bitecs.js';

import SceneSystem from '../SceneSystem.js';

import { Acceleration } from './Acceleration.js';
import { Force } from './Force.js';
import { Mass } from './Mass.js';

export default class ForceSystem extends SceneSystem {

    #update;
    #allEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#allEntities = defineQuery([Acceleration, Force]);
        this.#update = defineSystem(world => {

            for (const entity of this.#allEntities(world)) {

                const mass = hasComponent(world, Mass, entity) ? Mass.mass[entity] : 1;

                Acceleration.x[entity] += Force.x[entity] / mass;
                Acceleration.y[entity] += Force.y[entity] / mass;

            }

        });
    }

    update(time, delta) {
        this.#update(this.ecs.world, time, delta);
    }

}
