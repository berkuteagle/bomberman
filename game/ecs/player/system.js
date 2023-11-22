import { defineQuery, defineSystem } from '../../bitecs.js';
import { Math } from '../../phaser.js';

import { Cursor, CURSOR_STATE } from '../input.js';
import { Movement, MovementDirection, MovementState } from '../movement.js';
import { Velocity } from '../phy.js';

import { PlayerTag } from './PlayerTag.js';

export const createPlayerSystem = () => {

    const cursorAll = defineQuery([Cursor]);
    const playerAll = defineQuery([PlayerTag, Velocity]);

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
                Movement.state[entity] = MovementState.STOP;
            } else {

                if (state & CURSOR_STATE.LEFT && !(state & CURSOR_STATE.RIGHT)) {
                    Velocity.x[entity] = -Velocity.max[entity];
                    Movement.direction[entity] = MovementDirection.LEFT;
                    Movement.state[entity] = MovementState.WALK;
                } else if (state & CURSOR_STATE.RIGHT && !(state & CURSOR_STATE.LEFT)) {
                    Velocity.x[entity] = Velocity.max[entity];
                    Movement.direction[entity] = MovementDirection.RIGHT;
                    Movement.state[entity] = MovementState.WALK;
                } else {
                    Velocity.x[entity] = 0;
                }

                if (state & CURSOR_STATE.UP && !(state & CURSOR_STATE.DOWN)) {
                    Velocity.y[entity] = -Velocity.max[entity];
                    Movement.direction[entity] = MovementDirection.UP;
                    Movement.state[entity] = MovementState.WALK;
                } else if (state & CURSOR_STATE.DOWN && !(state & CURSOR_STATE.UP)) {
                    Velocity.y[entity] = Velocity.max[entity];
                    Movement.direction[entity] = MovementDirection.DOWN;
                    Movement.state[entity] = MovementState.WALK;
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
