import { addComponent } from '../../bitecs.js';

import { ANIMATION_STATE, addAnimationTag, sendAnimationRequest } from '../animation.js';
import { Belong, Duration, Explosive } from '../component.js';
import { addCollisionTag } from '../phy.js';
import { addPosition } from '../position.js';
import { addSpriteGroup, createSprite } from '../sprite.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} textureIndex
 * @param {Number} animationIndex
 */
export const createBomb = (world, x = 0, y = 0, sapper) => {
    const { scene } = world;

    const bomb = createSprite(
        { texture: 'Bomb', x, y },
        addSpriteGroup('Bombs'),
        addPosition(x, y),
        addAnimationTag(),
        addCollisionTag()
    )(world);

    addComponent(world, Explosive, bomb);
    addComponent(world, Duration, bomb);
    addComponent(world, Belong, bomb);

    Belong.owner[bomb] = sapper;
    Duration.timeout[bomb] = 3000;

    sendAnimationRequest(world, scene.ecs.anims.getIndex('Bomb'), ANIMATION_STATE.PLAY, bomb);

    return bomb;
}
