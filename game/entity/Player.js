import { addComponent, addEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    ArcadeSprite,
    Direction,
    DirectionType,
    Player,
    Position,
    Velocity
} from '../component.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} textureIndex
 * @param {Number} animationIndex
 */
export const createPlayer = (world, x = 0, y = 0, textureIndex = 0, animationIndex = 0) => {
    const player = addEntity(world);

    addComponent(world, Player, player);
    addComponent(world, Position, player);
    addComponent(world, ArcadeSprite, player);
    addComponent(world, Velocity, player);
    addComponent(world, Animation, player);
    addComponent(world, Direction, player);

    Player.walk_up[player] = 2;
    Player.walk_down[player] = 1;
    Player.walk_left[player] = 3;
    Player.walk_right[player] = 4;
    Player.stop_up[player] = 6;
    Player.stop_down[player] = 5;
    Player.stop_left[player] = 7;
    Player.stop_right[player] = 8;
    Player.velocity[player] = 50;
    Position.x[player] = x;
    Position.y[player] = y;
    Velocity.x[player] = 0;
    Velocity.y[player] = 0;
    ArcadeSprite.texture[player] = textureIndex;
    Animation.animation[player] = animationIndex;
    Direction.dir[player] = DirectionType.DOWN;
}
