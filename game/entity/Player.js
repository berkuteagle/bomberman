import { addComponent, addEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import { ArcadeSprite } from '../component/ArcadeSprite.js';
import { Player } from '../component/Player.js';
import { Position } from '../component/Position.js';
import { Velocity } from '../component/Velocity.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y 
 */
export const createPlayer = (world, x, y) => {
    const player = addEntity(world);

    addComponent(world, Player, player);
    addComponent(world, Position, player);
    addComponent(world, ArcadeSprite, player);
    addComponent(world, Velocity, player);

    Position.x[player] = x;
    Position.y[player] = y;
    ArcadeSprite.texture[player] = 0;
    Velocity.x[player] = 0;
    Velocity.y[player] = 0;
}
