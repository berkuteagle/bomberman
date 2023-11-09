import { addComponent, addEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    ArcadeSprite,
    Duration,
    Explosion, ExplosionType,
    Position
} from '../component.js';

import { SPRITE_GROUPS, TEXTURES } from '../constants.js';

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
    addComponent(world, ArcadeSprite, explosion);
    addComponent(world, Animation, explosion);
    addComponent(world, Duration, explosion);

    Explosion.type[explosion] = ExplosionType.DEFAULT;
    Explosion.power[explosion] = 1;
    Position.x[explosion] = x;
    Position.y[explosion] = y;
    ArcadeSprite.texture[explosion] = TEXTURES.EXPLOSION;
    ArcadeSprite.group[explosion] = SPRITE_GROUPS.DAMAGE;
    ArcadeSprite.depth[explosion] = 15;
    Animation.animation[explosion] = 6;
    Duration.timeout[explosion] = 800;
}
