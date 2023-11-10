import { addComponent, addEntity } from '../../bitecs.js';

import { ANIMATION_STATE, Animation } from '../animation.js';
import { DIRECTION, Direction, Position } from '../common.js';
import { Destructible, ExplosionType, Sapper, Shooter } from '../component.js';
import { MOVEMENT_STATE, Movement, MovementAnimation, Velocity } from '../movement.js';
import { Sprite, SpriteDepth } from '../sprite.js';

import { Player } from './Player.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y
 */
export function createPlayer(world, x = 0, y = 0) {
    const player = addEntity(world);

    addComponent(world, Player, player);
    addComponent(world, Position, player);
    addComponent(world, Velocity, player);
    addComponent(world, Direction, player);
    addComponent(world, Shooter, player);
    addComponent(world, Destructible, player);
    addComponent(world, Sapper, player);
    addComponent(world, Animation, player);
    addComponent(world, MovementAnimation, player);
    addComponent(world, Movement, player);
    addComponent(world, Sprite, player);
    addComponent(world, SpriteDepth, player);

    Sprite.key[player] = 0;
    SpriteDepth.depth[player] = 10;
    Sapper.count[player] = 3;
    Sapper.power[player] = 1;
    Sapper.type[player] = ExplosionType.DEFAULT;
    Player.velocity[player] = 50;
    Position.x[player] = x;
    Position.y[player] = y;
    Velocity.x[player] = 0;
    Velocity.y[player] = 0;
    Direction.current[player] = DIRECTION.DOWN;
    Destructible.health[player] = 10;
    Animation.key[player] = 1;
    Animation.state[player] = ANIMATION_STATE.STOP;
    Movement.state[player] = MOVEMENT_STATE.STOP;
    MovementAnimation.keys[player] = [1, 0, 2, 3];
}
