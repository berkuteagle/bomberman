import { addComponent, addEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    ArcadeSprite,
    Belong,
    Duration,
    Explosive,
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
export const createBomb = (world, x = 0, y = 0, sapper) => {
    const bomb = addEntity(world);

    addComponent(world, Position, bomb);
    addComponent(world, ArcadeSprite, bomb);
    addComponent(world, Animation, bomb);
    addComponent(world, Explosive, bomb);
    addComponent(world, Duration, bomb);
    addComponent(world, Belong, bomb);

    Belong.owner[bomb] = sapper;
    Duration.timeout[bomb] = 3000;
    Position.x[bomb] = x;
    Position.y[bomb] = y;
    ArcadeSprite.texture[bomb] = 2;
    Animation.animation[bomb] = 5;
}
