import { Changed, defineQuery } from 'bitecs';
import { System } from '../../ecs.js';

import {
    ControlKeysState,
    ControlTag
} from './components.js';

import { ControlKeyCode } from './enums.js';

import {
    Velocity,
    VelocityLimit,
    withSetVelocityRequest
} from '../velocity.js';

import {
    Direction,
    DirectionValue,
    hasDirection,
    withSetDirectionRequest
} from '../direction.js';

export default class ControlVelocitySystem extends System {

    #controlKeysState;
    #controlledEntities;

    constructor(ecs) {
        super(ecs);

        this.#controlKeysState = defineQuery([Changed(ControlKeysState)]);
        this.#controlledEntities = defineQuery([Velocity, VelocityLimit, ControlTag]);
    }

    postUpdate() {
        for (const entity of this.#controlKeysState(this.ecs.world)) {
            const state = ControlKeysState.state[entity];

            for (const controlled of this.#controlledEntities(this.ecs.world)) {

                let velocityX = 0;
                let velocityY = 0;
                let direction = 0;

                if (state) {
                    if (state & ControlKeyCode.BUTTON_LEFT && !(state & ControlKeyCode.BUTTON_RIGHT)) {
                        velocityX = -VelocityLimit.max[controlled];
                        direction = DirectionValue.LEFT;
                    } else if (state & ControlKeyCode.BUTTON_RIGHT && !(state & ControlKeyCode.BUTTON_LEFT)) {
                        velocityX = VelocityLimit.max[controlled];
                        direction = DirectionValue.RIGHT;
                    }

                    if (state & ControlKeyCode.BUTTON_UP && !(state & ControlKeyCode.BUTTON_DOWN)) {
                        velocityY = -VelocityLimit.max[controlled];
                        direction = DirectionValue.UP;
                    } else if (state & ControlKeyCode.BUTTON_DOWN && !(state & ControlKeyCode.BUTTON_UP)) {
                        velocityY = VelocityLimit.max[controlled];
                        direction = DirectionValue.DOWN;
                    }
                }

                const needSetDirection = hasDirection(this.ecs.world, controlled) && direction && direction !== Direction.direction[controlled];

                this.ecs.request(
                    withSetVelocityRequest(controlled, velocityX, velocityY),
                    needSetDirection && withSetDirectionRequest(controlled, direction)
                );
            }
        }
    }
}
