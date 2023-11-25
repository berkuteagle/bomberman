import { addComponent } from '../../bitecs.js';

import { AnimationState, createAnimationRequest, withAnimationTag } from '../../ecs/animation.js';
import { Duration, Explosion, ExplosionType } from '../../ecs/component.js';
import { addCollisionTag } from '../../ecs/phy.js';
import { withPosition } from '../../ecs/position.js';
import { createSprite, withSpriteDepth, withSpriteGroup } from '../../ecs/sprite.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y
 */
export const createExplosion = (world, x = 0, y = 0) => {
    const { scene } = world;

    const explosion = createSprite(
        { texture: 'Explosion', x, y },
        withSpriteDepth(20),
        withSpriteGroup('Explosion'),
        withPosition(x, y),
        withAnimationTag(),
        addCollisionTag()
    )(world);

    addComponent(world, Explosion, explosion);
    addComponent(world, Duration, explosion);

    Explosion.type[explosion] = ExplosionType.DEFAULT;
    Explosion.power[explosion] = 1;
    Duration.timeout[explosion] = 800;

    createAnimationRequest(scene.ecs.anims.getIndex('Explosion'), AnimationState.PLAY, explosion)(world);

    return explosion;
}
