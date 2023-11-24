import { defineQuery, defineSystem, hasComponent } from '../../bitecs.js';
import { Math } from '../../phaser.js';

import System from '../system.js';

import { Acceleration } from './Acceleration.js';
import { Force } from './Force.js';
import { Mass } from './Mass.js';

export default class ForceSystem extends System {

    #update;
    #allEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#allEntities = defineQuery([Acceleration, Force]);
        this.#update = defineSystem(world => {

            const accelerationVector = new Math.Vector2();

            for (const entity of this.#allEntities(world)) {

                const mass = hasComponent(world, Mass, entity) ? Mass.mass[entity] : 1;

                accelerationVector.set(
                    Acceleration.x[entity] + Force.x[entity] / mass,
                    Acceleration.y[entity] + Force.y[entity] / mass
                );

                accelerationVector.limit(Acceleration.max[entity]);

                Acceleration.x[entity] = accelerationVector.x;
                Acceleration.y[entity] = accelerationVector.y;

            }

        });
    }

    update(time, delta) {
        this.#update(this.ecs.world, time, delta);
    }

}
