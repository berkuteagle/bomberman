import { addComponent, addEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    ArcadeSprite,
    Bomb,
    Position
} from '../component.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} textureIndex
 * @param {Number} animationIndex
 */
export const createBomb = (world, x = 0, y = 0, textureIndex = 1, animationIndex = 9) => {
    const bomb = addEntity(world);

    addComponent(world, Bomb, bomb);
    addComponent(world, Position, bomb);
    addComponent(world, ArcadeSprite, bomb);
    addComponent(world, Animation, bomb);

    Bomb.timer[bomb] = 3000;
    Position.x[bomb] = x;
    Position.y[bomb] = y;
    ArcadeSprite.texture[bomb] = textureIndex;
    Animation.animation[bomb] = animationIndex;
}
