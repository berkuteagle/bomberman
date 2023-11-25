import { defineQuery } from '../../bitecs.js';
import { vec2 } from '../../gl-matrix.js';

import System from '../system.js';

import { Velocity, VelocityLimit } from './components.js';

export default class VelocityLimitSystem extends System {

    #velocityLimitQuery;

    constructor(ecs, config) {
        super(ecs, config);

        this.#velocityLimitQuery = defineQuery([Velocity, VelocityLimit]);
    }

    preUpdate() {
        for (const entity of this.#velocityLimitQuery(this.ecs.world)) {

            const max = VelocityLimit.max[entity];

            const velocity = vec2.fromValues(
                Velocity.x[entity],
                Velocity.y[entity]
            );

            const len = vec2.length(velocity);

            if (len && len > max) {
                vec2.scale(velocity, velocity, max / len);

                Velocity.x[entity] = velocity[0];
                Velocity.y[entity] = velocity[1];
            }

        }
    }

}
