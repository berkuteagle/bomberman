import { addComponent, addEntity } from '../../bitecs.js';

import { Animation, ANIMATION_STATE } from '../animation.js';
import { Position } from '../position.js';
import { Belong, Duration, Explosive } from '../component.js';
import { Sprite, SpriteGroup } from '../sprite.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} textureIndex
 * @param {Number} animationIndex
 */
export const createBomb = (world, x = 0, y = 0, sapper, scene) => {
    const bomb = addEntity(world);

    addComponent(world, Position, bomb);
    addComponent(world, Sprite, bomb);
    addComponent(world, SpriteGroup, bomb);
    addComponent(world, Animation, bomb);
    addComponent(world, Explosive, bomb);
    addComponent(world, Duration, bomb);
    addComponent(world, Belong, bomb);

    Belong.owner[bomb] = sapper;
    Duration.timeout[bomb] = 3000;
    Position.x[bomb] = x;
    Position.y[bomb] = y;
    Sprite.texture[bomb] = scene.ecs.getTextureIndex('Bomb');
    SpriteGroup.key[bomb] = scene.ecs.getGroupIndex('Bombs')
    Animation.key[bomb] = scene.ecs.getAnimationIndex('Bomb');
    Animation.state[bomb] = ANIMATION_STATE.PLAY;
}
