import { defineQuery } from 'bitecs';

import System from '../system.js';

import { ChangeVelocityRequest, SetVelocityRequest, Velocity } from './components.js';
import { hasVelocity } from './utils.js';

export default class VelocityRequestsSystem extends System {

    #setVelocityQuery;
    #changeVelocityQuery;

    constructor(ecs) {
        super(ecs);

        this.#setVelocityQuery = defineQuery([SetVelocityRequest]);
        this.#changeVelocityQuery = defineQuery([ChangeVelocityRequest]);
    }

    preUpdate() {
        for (const request of this.#setVelocityQuery(this.ecs.world)) {
            const entity = SetVelocityRequest.entity[request];

            if (hasVelocity(this.ecs.world, entity)) {
                Velocity.x[entity] = SetVelocityRequest.x[request];
                Velocity.y[entity] = SetVelocityRequest.y[request];
            }
        }

        for (const request of this.#changeVelocityQuery(this.ecs.world)) {
            const entity = ChangeVelocityRequest.entity[request];

            if (hasVelocity(this.ecs.world, entity)) {
                Velocity.x[entity] += ChangeVelocityRequest.dx[request];
                Velocity.y[entity] += ChangeVelocityRequest.dy[request];
            }
        }
    }

}
