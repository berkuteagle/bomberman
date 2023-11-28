import {
    withMovementAnimation,
    withSpriteDepth,
    withSpriteTag
} from '../../ecs-phaser.js';
import {
    withControlTag,
    withDirection,
    withPosition,
    withPositionLimits,
    withStore,
    withVelocity,
    withVelocityLimit
} from '../../ecs.js';

import { GameObjects } from '../../phaser.js';

export default class PlayerSprite extends GameObjects.Sprite {

    #eid;

    constructor(scene, x, y, ecs) {
        super(scene, x, y, 'GreenNinja');

        this.#eid = ecs.addEntity(
            withPosition(x, y),
            withSpriteTag(),
            withStore({ sprite: this }),
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

    get eid() {
        return this.#eid;
    }
}
