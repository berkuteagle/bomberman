import { addComponent } from '../../bitecs.js';

import { AnimationState, addAnimationTag, createAnimationRequest } from '../animation.js';
import { Duration, Explosion, ExplosionType } from '../component.js';
import { addCollisionTag } from '../phy.js';
import { addPosition } from '../position.js';
import { addSpriteDepth, addSpriteGroup, createSprite } from '../sprite.js';

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
        addSpriteDepth(20),
        addSpriteGroup('Explosion'),
        addPosition(x, y),
        addAnimationTag(),
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
