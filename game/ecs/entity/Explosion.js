import { addComponent, addEntity } from '../../bitecs.js';

import { Animation, ANIMATION_STATE } from '../animation.js';
import { Position } from '../common.js';
import { Duration, Explosion, ExplosionType } from '../component.js';
import { TEXTURES } from '../constants.js';
import { Sprite, SpriteDepth } from '../sprite.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y
 */
export const createExplosion = (world, x = 0, y = 0) => {
    const explosion = addEntity(world);

    addComponent(world, Explosion, explosion);
    addComponent(world, Position, explosion);
    addComponent(world, Sprite, explosion);
    addComponent(world, SpriteDepth, explosion);
    addComponent(world, Animation, explosion);
    addComponent(world, Duration, explosion);

    Explosion.type[explosion] = ExplosionType.DEFAULT;
    Explosion.power[explosion] = 1;
    Position.x[explosion] = x;
    Position.y[explosion] = y;
    Sprite.key[explosion] = TEXTURES.EXPLOSION;
    SpriteDepth.depth[explosion] = 20;
    Animation.key[explosion] = 5;
    Animation.state[explosion] = ANIMATION_STATE.FORCE_PLAY;
    Duration.timeout[explosion] = 800;
}
