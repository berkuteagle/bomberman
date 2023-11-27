import {
    withMovementAnimation,
    withSpriteDepth, withSpriteTag
} from '../../ecs-phaser.js';
import {
    Feature,
    withControlTag,
    withDirection,
    withPosition,
    withPositionLimits,
    withStore,
    withVelocity,
    withVelocityLimit
} from '../../ecs.js';
import { GameObjects } from '../../phaser.js';

import InputEventsSystem from './input-events-system.js';

export default class PlayerFeature extends Feature {

    /** @override */
    init() {

        const x = 64;
        const y = 64;

        const sprite = new GameObjects.Sprite(
            this.ecs.world.scene,
            x, y,
            'GreenNinja'
        );

        this.player = this.ecs.addEntity(
            withPosition(x, y),
            withSpriteTag(),
            withStore({ sprite }),
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

        this.addSystem('input-events', new InputEventsSystem(this.ecs, this.player));
    }
}
