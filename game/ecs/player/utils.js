import { addComponent, addEntity } from '../../bitecs.js';

import { ANIMATION_STATE, Animation } from '../animation.js';
import { DIRECTION, Direction } from '../common.js';
import { Destructible, ExplosionType, Sapper, Shooter } from '../component.js';
import { MOVEMENT_STATE, Movement, MovementAnimation } from '../movement.js';
import { Velocity } from '../phy.js';
import { Position, PositionBoundaries } from '../position.js';
import { Sprite, SpriteDepth, SpriteGroup } from '../sprite.js';

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
    addComponent(world, Animation, player);
    addComponent(world, MovementAnimation, player);
    addComponent(world, Movement, player);
    addComponent(world, Sprite, player);
    addComponent(world, SpriteDepth, player);
    addComponent(world, SpriteGroup, player);

    Sprite.texture[player] = scene.ecs.getTextureIndex('GreenNinja');
    SpriteGroup.key[player] = scene.ecs.getGroupIndex('Player');
    SpriteDepth.depth[player] = 10;
    Sapper.count[player] = 3;
    Sapper.power[player] = 1;
    Sapper.type[player] = ExplosionType.DEFAULT;
    Player.velocity[player] = 50;
    Position.x[player] = x;
    Position.y[player] = y;
    PositionBoundaries.x[player] = [64, 640];
    PositionBoundaries.y[player] = [64, 480];
    Velocity.x[player] = 0;
    Velocity.y[player] = 0;
    Direction.current[player] = DIRECTION.DOWN;
    Destructible.health[player] = 10;
    Animation.key[player] = scene.ecs.getAnimationIndex('GreenNinja_walk_down');
    Animation.state[player] = ANIMATION_STATE.STOP;
    Movement.state[player] = MOVEMENT_STATE.STOP;
    MovementAnimation.keys[player] = [
        scene.ecs.getAnimationIndex('GreenNinja_walk_up'),
        scene.ecs.getAnimationIndex('GreenNinja_walk_down'),
        scene.ecs.getAnimationIndex('GreenNinja_walk_left'),
        scene.ecs.getAnimationIndex('GreenNinja_walk_right')
    ];
}
