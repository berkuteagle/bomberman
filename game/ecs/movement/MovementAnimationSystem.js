import { Changed, defineQuery } from '../../bitecs.js';

import { AnimationState, createAnimationRequest } from '../animation.js';
import System from '../system.js';

import { Movement, MovementDirection } from './Movement.js';
import { MovementAnimation } from './MovementAnimation.js';

function getMovementAnimation(eid) {
    switch (Movement.direction[eid]) {
        case MovementDirection.UP:
            return MovementAnimation.up[eid];
        case MovementDirection.LEFT:
            return MovementAnimation.left[eid];
        case MovementDirection.RIGHT:
            return MovementAnimation.right[eid];
        default:
            return MovementAnimation.down[eid];
    }
}

export default class MovementAnimationSystem extends System {

    #allEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#allEntities = defineQuery([Changed(Movement), MovementAnimation]);
    }

    update() {
        for (const entity of this.#allEntities(this.ecs.world)) {

            this.ecs.emit(createAnimationRequest(
                getMovementAnimation(entity),
                Movement.state[entity] ? AnimationState.PLAY : AnimationState.STOP,
                entity
            ));

        }
    }

}
