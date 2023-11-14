import { addComponent, addEntity } from '../../bitecs.js';

import { ANIMATION_STATE, AnimationTag, sendAnimationRequest } from '../animation.js';
import { Belong, Duration, Explosive } from '../component.js';
import { Position } from '../position.js';
import { SpriteGroup, SpriteTag } from '../sprite.js';

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
    const ecs = world.scene.ecs;

    addComponent(world, Position, bomb);
    addComponent(world, SpriteTag, bomb);
    addComponent(world, SpriteGroup, bomb);
    addComponent(world, Explosive, bomb);
    addComponent(world, Duration, bomb);
    addComponent(world, Belong, bomb);
    addComponent(world, AnimationTag, bomb);

    Belong.owner[bomb] = sapper;
    Duration.timeout[bomb] = 3000;
    Position.x[bomb] = x;
    Position.y[bomb] = y;
    SpriteGroup.key[bomb] = ecs.groups.getIndex('Bombs');

    ecs.sprites.create(bomb, x, y, 'Bomb');

    sendAnimationRequest(world, ecs.anims.getIndex('Bomb'), ANIMATION_STATE.PLAY, bomb);

}
