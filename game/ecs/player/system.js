import { defineQuery, defineSystem } from '../../bitecs.js';

import { Direction, DIRECTION } from '../common.js';
import { Cursor, CURSOR_MASK } from '../input.js';
import { Movement, MOVEMENT_STATE, Velocity } from '../movement.js';

import { Player } from './Player.js';

export const createPlayerSystem = () => {

    const cursorAll = defineQuery([Cursor]);
    const playerAll = defineQuery([Player, Velocity]);

    return defineSystem(world => {

        const [cursorEntity] = cursorAll(world);
        const state = cursorEntity !== undefined
            ? Cursor.state[cursorEntity]
            : 0;

        for (const entity of playerAll(world)) {

            if (state & CURSOR_MASK.LEFT && !(state & CURSOR_MASK.RIGHT)) {
                Velocity.x[entity] = -Player.velocity[entity];
                Direction.current[entity] = DIRECTION.LEFT;
                Movement.state[entity] = MOVEMENT_STATE.WALK;
            } else if (state & CURSOR_MASK.RIGHT && !(state & CURSOR_MASK.LEFT)) {
                Velocity.x[entity] = Player.velocity[entity];
                Direction.current[entity] = DIRECTION.RIGHT;
                Movement.state[entity] = MOVEMENT_STATE.WALK;
            } else {
                Velocity.x[entity] = 0;
            }

            if (state & CURSOR_MASK.UP && !(state & CURSOR_MASK.DOWN)) {
                Velocity.y[entity] = -Player.velocity[entity];
                Direction.current[entity] = DIRECTION.UP;
                Movement.state[entity] = MOVEMENT_STATE.WALK;
            } else if (state & CURSOR_MASK.DOWN && !(state & CURSOR_MASK.UP)) {
                Velocity.y[entity] = Player.velocity[entity];
                Direction.current[entity] = DIRECTION.DOWN;
                Movement.state[entity] = MOVEMENT_STATE.WALK;
            } else {
                Velocity.y[entity] = 0;
            }

            if (!state) {
                Velocity.x[entity] = 0;
                Velocity.y[entity] = 0;
                Movement.state[entity] = MOVEMENT_STATE.STOP;
            }
        }

    });
}
