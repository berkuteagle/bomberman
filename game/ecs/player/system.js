import { defineQuery, defineSystem } from '../../bitecs.js';
import { Math } from '../../phaser.js';

import { Cursor, CURSOR_STATE } from '../input.js';
import { Movement, MOVEMENT_DIRECTION, MOVEMENT_STATE } from '../movement.js';
import { Velocity } from '../phy.js';

import { Player } from './Player.js';

export const createPlayerSystem = () => {

    const cursorAll = defineQuery([Cursor]);
    const playerAll = defineQuery([Player, Velocity]);

    return defineSystem(world => {

        const [cursorEntity] = cursorAll(world);
        const state = cursorEntity !== undefined
            ? Cursor.state[cursorEntity]
            : 0;
        const velocityVector = new Math.Vector2();

        for (const entity of playerAll(world)) {
            if (!state) {
                Velocity.x[entity] = 0;
                Velocity.y[entity] = 0;
                Movement.state[entity] = MOVEMENT_STATE.STOP;
            } else {

                if (state & CURSOR_STATE.LEFT && !(state & CURSOR_STATE.RIGHT)) {
                    Velocity.x[entity] = -Velocity.max[entity];
                    Movement.direction[entity] = MOVEMENT_DIRECTION.LEFT;
                    Movement.state[entity] = MOVEMENT_STATE.WALK;
                } else if (state & CURSOR_STATE.RIGHT && !(state & CURSOR_STATE.LEFT)) {
                    Velocity.x[entity] = Velocity.max[entity];
                    Movement.direction[entity] = MOVEMENT_DIRECTION.RIGHT;
                    Movement.state[entity] = MOVEMENT_STATE.WALK;
                } else {
                    Velocity.x[entity] = 0;
                }

                if (state & CURSOR_STATE.UP && !(state & CURSOR_STATE.DOWN)) {
                    Velocity.y[entity] = -Velocity.max[entity];
                    Movement.direction[entity] = MOVEMENT_DIRECTION.UP;
                    Movement.state[entity] = MOVEMENT_STATE.WALK;
                } else if (state & CURSOR_STATE.DOWN && !(state & CURSOR_STATE.UP)) {
                    Velocity.y[entity] = Velocity.max[entity];
                    Movement.direction[entity] = MOVEMENT_DIRECTION.DOWN;
                    Movement.state[entity] = MOVEMENT_STATE.WALK;
                } else {
                    Velocity.y[entity] = 0;
                }

                velocityVector.set(Velocity.x[entity], Velocity.y[entity]);
                velocityVector.limit(Velocity.max[entity])

                Velocity.x[entity] = velocityVector.x;
                Velocity.y[entity] = velocityVector.y;
            }
        }
    });
}
