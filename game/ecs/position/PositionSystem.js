import { defineQuery, defineSystem } from '../../bitecs.js';

import SceneSystem from '../SceneSystem.js';

import { Position } from './Position.js';
import { PositionBoundaries } from './PositionBoundaries.js';

const MIN = 0;
const MAX = 1;

export default class PositionSystem extends SceneSystem {

    #update;
    #allEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#allEntities = defineQuery([Position, PositionBoundaries]);
        this.#update = defineSystem(world => {

            for (const entity of this.#allEntities(world)) {

                if (Position.x[entity] < PositionBoundaries.x[entity][MIN]) {
                    Position.x[entity] = PositionBoundaries.x[entity][MIN];
                }

                if (Position.y[entity] < PositionBoundaries.y[entity][MIN]) {
                    Position.y[entity] = PositionBoundaries.y[entity][MIN];
                }

                if (Position.x[entity] > PositionBoundaries.x[entity][MAX]) {
                    Position.x[entity] = PositionBoundaries.x[entity][MAX];
                }

                if (Position.y[entity] > PositionBoundaries.y[entity][MAX]) {
                    Position.y[entity] = PositionBoundaries.y[entity][MAX];
                }

            }

        });
    }

    update() {
        this.#update(this.ecs.world);
    }

}
