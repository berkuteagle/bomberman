import { defineQuery } from 'bitecs';

import { Position } from '../position.js';
import System from '../system.js';

import { Velocity } from './components.js';

export default class VelocitySystem extends System {

    #allEntities;

    constructor(ecs) {
        super(ecs);

        this.#allEntities = defineQuery([Velocity, Position]);
    }

    update(_time, delta) {
        for (const entity of this.#allEntities(this.ecs.world)) {

            Position.x[entity] += Velocity.x[entity] * delta / 1000;
            Position.y[entity] += Velocity.y[entity] * delta / 1000;

        }
    }

}
