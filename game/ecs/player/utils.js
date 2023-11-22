import { addComponent } from '../../bitecs.js';

import { addAnimationTag } from '../animation.js';
import { Destructible, ExplosionType, Sapper, Shooter } from '../component.js';
import { MOVEMENT_DIRECTION, MOVEMENT_STATE, Movement, MovementAnimation } from '../movement.js';
import { CollisionTag, SHAPE_TYPE, Shape, Velocity } from '../phy.js';
import { addPosition, addPositionBoundaries } from '../position.js';
import { addSpriteDepth, addSpriteGroup, createSprite } from '../sprite.js';

import { Player } from './Player.js';

/**
 * 
 * @param {*} world 
 * @param {Number} x 
 * @param {Number} y
 */
export const createPlayer = (x = 0, y = 0) => world => {
    const { scene } = world;

    const player = createSprite(
        { texture: 'GreenNinja', x, y },
        addSpriteDepth(10),
        addSpriteGroup('Player'),
        addPosition(x, y),
        addPositionBoundaries(64, 416, 64, 416),
        addAnimationTag()
    )(world);

    addComponent(world, Player, player);
    addComponent(world, Velocity, player);
    addComponent(world, Shooter, player);
    addComponent(world, Destructible, player);
    addComponent(world, Sapper, player);
    addComponent(world, MovementAnimation, player);
    addComponent(world, Movement, player);
    addComponent(world, Shape, player);
    addComponent(world, CollisionTag, player);

    Shape.type[player] = SHAPE_TYPE.CIRCLE;
    Shape.size[player] = 8;
    Sapper.count[player] = 3;
    Sapper.power[player] = 1;
    Sapper.type[player] = ExplosionType.DEFAULT;
    Velocity.x[player] = 0;
    Velocity.y[player] = 0;
    Velocity.max[player] = 50;
    Destructible.health[player] = 10;
    Movement.state[player] = MOVEMENT_STATE.STOP;
    Movement.direction[player] = MOVEMENT_DIRECTION.DOWN;
    MovementAnimation.keys[player] = [
        scene.ecs.anims.getIndex('GreenNinja_walk_up'),
        scene.ecs.anims.getIndex('GreenNinja_walk_down'),
        scene.ecs.anims.getIndex('GreenNinja_walk_left'),
        scene.ecs.anims.getIndex('GreenNinja_walk_right')
    ];

}
