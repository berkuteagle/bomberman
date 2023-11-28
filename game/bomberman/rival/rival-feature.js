import {
    withMovementAnimation,
    withSpriteDepth,
    withSpriteTag
} from '../../ecs-phaser.js';
import {
    Feature,
    withDirection,
    withPosition,
    withPositionLimits,
    withStore,
    withVelocity,
    withVelocityLimit
} from '../../ecs.js';
import { GameObjects } from '../../phaser.js';

export default class RivalFeature extends Feature {

    /** @override */
    init() {

        const x = 416;
        const y = 416;

        const sprite = new GameObjects.Sprite(
            this.ecs.world.scene,
            x, y,
            'RedNinja'
        );

        this.rival = this.ecs.addEntity(
            withPosition(x, y),
            withSpriteTag(),
            withStore({ sprite }),
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
