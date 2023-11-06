import { defineQuery, defineSystem } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';
import { Player } from '../component/Player.js';
import { Velocity } from '../component/Velocity.js';

// import { Player, Velocity, Input } from '../components'

const V = 50;

export const createPlayerSystem = (cursors) => {
    const query = defineQuery([Player, Velocity])

    return defineSystem(world => {

        for (const entity of query(world)) {

            if (cursors.left.isDown && !cursors.right.isDown) {
                Velocity.x[entity] = -V;
            } else if (cursors.right.isDown && !cursors.left.isDown) {
                Velocity.x[entity] = V;
            } else {
                Velocity.x[entity] = 0;
            }

            if (cursors.up.isDown && !cursors.down.isDown) {
                Velocity.y[entity] = -V;
            } else if (cursors.down.isDown && !cursors.up.isDown) {
                Velocity.y[entity] = V;
            } else {
                Velocity.y[entity] = 0;
            }

            if (!cursors.left.isDown &&
                !cursors.right.isDown &&
                !cursors.up.isDown &&
                !cursors.down.isDown) {
                Velocity.x[entity] = 0;
                Velocity.y[entity] = 0;
            }
        }

        return world
    })
}
