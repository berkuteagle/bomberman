import { addComponent, addEntity } from '../../bitecs.js';

import { Animation, ANIMATION_STATE } from '../animation.js';
import { Position } from '../common.js';
import { Belong, Duration, Explosive } from '../component.js';
import { TEXTURES } from '../constants.js';
import { Sprite } from '../sprite.js';

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
    addComponent(world, Sprite, bomb);
    addComponent(world, Animation, bomb);
    addComponent(world, Explosive, bomb);
    addComponent(world, Duration, bomb);
    addComponent(world, Belong, bomb);

    Belong.owner[bomb] = sapper;
    Duration.timeout[bomb] = 3000;
    Position.x[bomb] = x;
    Position.y[bomb] = y;
    Sprite.key[bomb] = TEXTURES.BOMB;
    Animation.key[bomb] = 4;
    Animation.state[bomb] = ANIMATION_STATE.PLAY;
}