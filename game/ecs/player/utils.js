import { addComponent, addEntity } from '../../bitecs.js';

import { AnimationTag } from '../animation.js';
import { DIRECTION, Direction } from '../common.js';
import { Destructible, ExplosionType, Sapper, Shooter } from '../component.js';
import { MOVEMENT_STATE, Movement, MovementAnimation } from '../movement.js';
import { Velocity } from '../phy.js';
import { Position, PositionBoundaries } from '../position.js';
import { SpriteDepth, SpriteGroup, SpriteTag } from '../sprite.js';

import { Player } from './Player.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y
 */
export function createPlayer(scene, x = 0, y = 0) {
    const world = scene.ecs.world;
    const player = addEntity(world);

    addComponent(world, Player, player);
    addComponent(world, Position, player);
    addComponent(world, PositionBoundaries, player);
    addComponent(world, Velocity, player);
    addComponent(world, Direction, player);
    addComponent(world, Shooter, player);
    addComponent(world, Destructible, player);
    addComponent(world, Sapper, player);
    addComponent(world, MovementAnimation, player);
    addComponent(world, Movement, player);
    addComponent(world, SpriteTag, player);
    addComponent(world, SpriteDepth, player);
    addComponent(world, SpriteGroup, player);
    addComponent(world, AnimationTag, player);

    SpriteGroup.key[player] = scene.ecs.groups.getIndex('Player');
    SpriteDepth.depth[player] = 10;
    Sapper.count[player] = 3;
    Sapper.power[player] = 1;
    Sapper.type[player] = ExplosionType.DEFAULT;
    Position.x[player] = x;
    Position.y[player] = y;
    PositionBoundaries.x[player] = [64, 416];
    PositionBoundaries.y[player] = [64, 416];
    Velocity.x[player] = 0;
    Velocity.y[player] = 0;
    Velocity.max[player] = 50;
    Direction.current[player] = DIRECTION.DOWN;
    Destructible.health[player] = 10;
    Movement.state[player] = MOVEMENT_STATE.STOP;
    MovementAnimation.keys[player] = [
        scene.ecs.anims.getIndex('GreenNinja_walk_up'),
        scene.ecs.anims.getIndex('GreenNinja_walk_down'),
        scene.ecs.anims.getIndex('GreenNinja_walk_left'),
        scene.ecs.anims.getIndex('GreenNinja_walk_right')
    ];

    scene.ecs.sprites.create(player, x, y, 'GreenNinja');
}
