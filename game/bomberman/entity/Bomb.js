import { addComponent } from '../../bitecs.js';

import { AnimationState, createAnimationRequest, withAnimationTag } from '../../ecs/animation.js';
import { Belong, Duration, Explosive } from '../../ecs/component.js';
import { addCollisionTag } from '../../ecs/phy.js';
import { withPosition } from '../../ecs/position.js';
import { createSprite, withSpriteGroup } from '../../ecs/sprite.js';

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
        withSpriteGroup('Bombs'),
        withPosition(x, y),
        withAnimationTag(),
        addCollisionTag()
    )(world);

    addComponent(world, Explosive, bomb);
    addComponent(world, Duration, bomb);
    addComponent(world, Belong, bomb);

    Belong.owner[bomb] = sapper;
    Duration.timeout[bomb] = 3000;

    createAnimationRequest(scene.ecs.anims.getIndex('Bomb'), AnimationState.PLAY, bomb)(world);

    return bomb;
}
