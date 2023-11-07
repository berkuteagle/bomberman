import { addComponent, addEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    ArcadeSprite,
    Destructible,
    Flammable,
    Position
} from '../component.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} textureIndex
 * @param {Number} animationIndex
 * @param {Number} flammableLevel
 * @param {Number} destructibleHealth
 * @param {Number} destructibleAnimationIndex
 */
export const createObstacle = (
    world,
    x = 0,
    y = 0,
    textureIndex = 0,
    animationIndex = 0,
    flammableLevel = 0,
    destructibleHealth = 0,
    destructibleAnimationIndex = 0
) => {
    const obstacle = addEntity(world);

    addComponent(world, Position, obstacle);
    addComponent(world, ArcadeSprite, obstacle);

    Position.x[obstacle] = x;
    Position.y[obstacle] = y;
    ArcadeSprite.texture[obstacle] = textureIndex;

    if (animationIndex || destructibleHealth && destructibleAnimationIndex) {
        addComponent(world, Animation, obstacle);
        Animation.animation[obstacle] = animationIndex;
    }

    if (destructibleHealth) {
        addComponent(world, Destructible, obstacle);
        Destructible.health[obstacle] = destructibleHealth;
        Destructible.animation[obstacle] = destructibleAnimationIndex;
    }

    if (flammableLevel) {
        addComponent(world, Flammable, obstacle);
        Flammable.level[obstacle] = flammableLevel;
    }
}
