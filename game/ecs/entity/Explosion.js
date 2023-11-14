import { addComponent, addEntity } from '../../bitecs.js';

import { ANIMATION_STATE, AnimationTag, sendAnimationRequest } from '../animation.js';
import { Duration, Explosion, ExplosionType } from '../component.js';
import { Position } from '../position.js';
import { SpriteDepth, SpriteTag } from '../sprite.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y
 */
export const createExplosion = (world, x = 0, y = 0, scene) => {
    const explosion = addEntity(world);

    addComponent(world, Explosion, explosion);
    addComponent(world, Position, explosion);
    addComponent(world, SpriteTag, explosion);
    addComponent(world, SpriteDepth, explosion);
    addComponent(world, Duration, explosion);
    addComponent(world, AnimationTag, explosion);

    Explosion.type[explosion] = ExplosionType.DEFAULT;
    Explosion.power[explosion] = 1;
    Position.x[explosion] = x;
    Position.y[explosion] = y;
    SpriteDepth.depth[explosion] = 20;
    Duration.timeout[explosion] = 800;

    scene.ecs.sprites.create(explosion, x, y, 'Explosion');

    sendAnimationRequest(world, world.scene.ecs.anims.getIndex('Explosion'), ANIMATION_STATE.PLAY, explosion);

}
