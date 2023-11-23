import { addComponent } from '../bitecs.js';

import { addAnimationTag } from '../ecs/animation.js';
import { Destructible } from '../ecs/component.js';
import { addMovement, addMovementAnimation } from '../ecs/movement.js';
import { Velocity, addCollisionTag } from '../ecs/phy.js';
import { addPlayerTag } from '../ecs/player.js';
import { addPosition, addPositionBoundaries } from '../ecs/position.js';
import { addSapper } from '../ecs/sapper.js';
import { addSpriteDepth, addSpriteGroup, createSprite } from '../ecs/sprite.js';

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
        addPlayerTag(),
        addSpriteDepth(10),
        addSpriteGroup('Player'),
        addPosition(x, y),
        addPositionBoundaries(64, 416, 64, 416),
        addAnimationTag(),
        addCollisionTag(),
        addSapper(),
        addMovement(),
        addMovementAnimation(
            scene.ecs.anims.getIndex('GreenNinja_walk_up'),
            scene.ecs.anims.getIndex('GreenNinja_walk_down'),
            scene.ecs.anims.getIndex('GreenNinja_walk_left'),
            scene.ecs.anims.getIndex('GreenNinja_walk_right')
        )
    )(world);

    addComponent(world, Velocity, player);
    addComponent(world, Destructible, player);

    Velocity.x[player] = 0;
    Velocity.y[player] = 0;
    Velocity.max[player] = 50;
    Destructible.health[player] = 10;
}
