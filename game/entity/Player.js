import { addComponent, addEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import {
    Animation,
    ArcadeSprite,
    Destructible,
    Direction,
    DirectionType,
    ExplosionType,
    Player,
    Position,
    Sapper,
    Shooter,
    Velocity
} from '../component.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y
 */
export const createPlayer = (world, x = 0, y = 0) => {
    const player = addEntity(world);

    addComponent(world, Player, player);
    addComponent(world, Position, player);
    addComponent(world, ArcadeSprite, player);
    addComponent(world, Velocity, player);
    addComponent(world, Animation, player);
    addComponent(world, Direction, player);
    addComponent(world, Shooter, player);
    addComponent(world, Destructible, player);
    addComponent(world, Sapper, player);

    Sapper.count[player] = 3;
    Sapper.power[player] = 1;
    Sapper.type[player] = ExplosionType.DEFAULT;
    Player.walk_up[player] = 2;
    Player.walk_down[player] = 1;
    Player.walk_left[player] = 3;
    Player.walk_right[player] = 4;
    Player.velocity[player] = 50;
    Position.x[player] = x;
    Position.y[player] = y;
    Velocity.x[player] = 0;
    Velocity.y[player] = 0;
    ArcadeSprite.texture[player] = 1;
    Animation.animation[player] = 0;
    Direction.dir[player] = DirectionType.DOWN;
    Destructible.health[player] = 10;
}
