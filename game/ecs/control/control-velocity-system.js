import { defineQuery } from '../../bitecs.js';
import { System } from '../../ecs.js';

import {
    ControlKeysState,
    ControlTag
} from './components.js';

import { ControlKeyCode } from './enums.js';

import {
    Velocity,
    VelocityLimit,
    createSetVelocityRequest,
    withSetVelocityRequest
} from '../velocity.js';

export default class ControlVelocitySystem extends System {

    #controlKeysState;
    #controlledEntities;

    constructor(ecs) {
        super(ecs);

        this.#controlKeysState = defineQuery([ControlKeysState]);
        this.#controlledEntities = defineQuery([Velocity, VelocityLimit, ControlTag]);
    }

    postUpdate() {
        for (const entity of this.#controlKeysState(this.ecs.world)) {
            const state = ControlKeysState.state[entity];

            for (const controlled of this.#controlledEntities(this.ecs.world)) {

                let velocityX = 0;
                let velocityY = 0;

                if (state) {
                    if (state & ControlKeyCode.LEFT && !(state & ControlKeyCode.RIGHT)) {
                        velocityX = -VelocityLimit.max[controlled];
                    } else if (state & ControlKeyCode.RIGHT && !(state & ControlKeyCode.LEFT)) {
                        velocityX = VelocityLimit.max[controlled];
                    }

                    if (state & ControlKeyCode.UP && !(state & ControlKeyCode.DOWN)) {
                        velocityY = -VelocityLimit.max[controlled];
                    } else if (state & ControlKeyCode.DOWN && !(state & ControlKeyCode.UP)) {
                        velocityY = VelocityLimit.max[controlled];
                    }
                }

                this.request(1,
                    withSetVelocityRequest(controlled, velocityX, velocityY)
                );
            }
        }
    }
}
