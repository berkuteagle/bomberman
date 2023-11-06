import { addComponent, addEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import { ArcadeSprite } from '../component/ArcadeSprite.js';
import { Bomb } from '../component/Bomb.js';
import { Position } from '../component/Position.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y 
 */
export const createBomb = (world, x, y) => {
    const bomb = addEntity(world);

    addComponent(world, Bomb, bomb);
    addComponent(world, Position, bomb);
    addComponent(world, ArcadeSprite, bomb);

    Position.x[bomb] = x;
    Position.y[bomb] = y;
    ArcadeSprite.texture[bomb] = 1;
}
