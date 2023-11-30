import { defineQuery } from 'bitecs';

import System from '../system.js';

import { Position, PositionLimits } from './components.js';

export default class PositionLimitsSystem extends System {

    #positionLimitsQuery;

    constructor(ecs, config) {
        super(ecs, config);

        this.#positionLimitsQuery = defineQuery([Position, PositionLimits]);
    }

    preUpdate() {
        for (const entity of this.#positionLimitsQuery(this.ecs.world)) {

            if (Position.x[entity] < PositionLimits.minX[entity]) {
                Position.x[entity] = PositionLimits.minX[entity];
            }

            if (Position.y[entity] < PositionLimits.minY[entity]) {
                Position.y[entity] = PositionLimits.minY[entity];
            }

            if (Position.x[entity] > PositionLimits.maxX[entity]) {
                Position.x[entity] = PositionLimits.maxX[entity];
            }

            if (Position.y[entity] > PositionLimits.maxY[entity]) {
                Position.y[entity] = PositionLimits.maxY[entity];
            }

        }
    }

}
