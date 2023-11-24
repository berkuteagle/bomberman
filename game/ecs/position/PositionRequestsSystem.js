import { defineQuery } from '../../bitecs.js';

import System from '../system.js';

import { ChangePositionRequest, SetPositionRequest, Position } from './components.js';
import { hasPosition } from './utils.js';

export default class PositionRequestsSystem extends System {

    #setPositionQuery;
    #changePositionQuery;

    constructor(ecs) {
        super(ecs);

        this.#setPositionQuery = defineQuery([SetPositionRequest]);
        this.#changePositionQuery = defineQuery([ChangePositionRequest]);
    }

    preUpdate() {
        for (const request of this.#setPositionQuery(this.ecs.world)) {
            const entity = SetPositionRequest.entity[request];

            if (hasPosition(this.ecs.world, entity)) {
                Position.x[entity] = SetPositionRequest.x[request];
                Position.y[entity] = SetPositionRequest.y[request];
            }
        }

        for (const request of this.#changePositionQuery(this.ecs.world)) {
            const entity = ChangePositionRequest.entity[request];

            if (hasPosition(this.ecs.world, entity)) {
                Position.x[entity] += ChangePositionRequest.dx[request];
                Position.y[entity] += ChangePositionRequest.dy[request];
            }
        }
    }
}
