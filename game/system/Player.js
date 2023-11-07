import { defineQuery, defineSystem } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    Direction,
    DirectionType,
    Player,
    Velocity
} from '../component.js';

export const createPlayerSystem = (cursors) => {
    const query = defineQuery([Player, Velocity])

    return defineSystem(world => {

        for (const entity of query(world)) {

            if (cursors.left.isDown && !cursors.right.isDown) {
                Velocity.x[entity] = -Player.velocity[entity];
                Animation.animation[entity] = Player.walk_left[entity];
                Direction.dir[entity] = DirectionType.LEFT;
            } else if (cursors.right.isDown && !cursors.left.isDown) {
                Velocity.x[entity] = Player.velocity[entity];
                Animation.animation[entity] = Player.walk_right[entity];
                Direction.dir[entity] = DirectionType.RIGHT;
            } else {
                Velocity.x[entity] = 0;
            }

            if (cursors.up.isDown && !cursors.down.isDown) {
                Velocity.y[entity] = -Player.velocity[entity];
                Animation.animation[entity] = Player.walk_up[entity];
                Direction.dir[entity] = DirectionType.UP;
            } else if (cursors.down.isDown && !cursors.up.isDown) {
                Velocity.y[entity] = Player.velocity[entity];
                Animation.animation[entity] = Player.walk_down[entity];
                Direction.dir[entity] = DirectionType.DOWN;
            } else {
                Velocity.y[entity] = 0;
            }

            if (!cursors.left.isDown &&
                !cursors.right.isDown &&
                !cursors.up.isDown &&
                !cursors.down.isDown) {
                Velocity.x[entity] = 0;
                Velocity.y[entity] = 0;

                switch (Direction.dir[entity]) {
                    case DirectionType.UP:
                        Animation.animation[entity] = Player.stop_up[entity];
                        break;
                    case DirectionType.DOWN:
                        Animation.animation[entity] = Player.stop_down[entity];
                        break;
                    case DirectionType.LEFT:
                        Animation.animation[entity] = Player.stop_left[entity];
                        break;
                    case DirectionType.RIGHT:
                        Animation.animation[entity] = Player.stop_right[entity];
                        break;
                }
            }
        }

        return world
    })
}
