import {
    Sprite,
    withMovementAnimation,
    withSpriteDepth,
} from '../../ecs-phaser.js';
import {
    withControlTag,
    withDirection,
    withPositionLimits,
    withVelocity,
    withVelocityLimit
} from '../../ecs.js';

export default class PlayerSprite extends Sprite {
    constructor(scene, x, y) {
        super(
            scene, x, y, 'GreenNinja',
            withControlTag(),
            withVelocity(0, 0),
            withVelocityLimit(70),
            withSpriteDepth(10),
            withPositionLimits(64, 416, 64, 416),
            withDirection(),
            withMovementAnimation({
                up: 'GreenNinja_walk_up',
                down: 'GreenNinja_walk_down',
                left: 'GreenNinja_walk_left',
                right: 'GreenNinja_walk_right'
            })
        );
    }
}
