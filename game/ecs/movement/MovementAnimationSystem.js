import { defineQuery, Changed } from '../../bitecs.js';

import SceneSystem from '../SceneSystem.js';
import { AnimationState, createAnimationRequest } from '../animation.js';

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

export default class MovementAnimationSystem extends SceneSystem {

    #allEntities;

    constructor(ecs, config) {
        super(ecs, config);

        this.#allEntities = defineQuery([Changed(Movement), MovementAnimation]);
    }

    update() {
        for (const entity of this.#allEntities(this.ecs.world)) {

            this.ecs.sendRequest(createAnimationRequest(
                getMovementAnimation(entity),
                Movement.state[entity] ? AnimationState.PLAY : AnimationState.STOP,
                entity
            ));

        }
    }

}
