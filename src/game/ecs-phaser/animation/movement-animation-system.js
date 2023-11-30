import {
    Changed,
    defineQuery
} from 'bitecs';

import {
    Direction,
    DirectionValue,
    System,
    Velocity,
    withStore
} from '../../ecs.js';

import {
    withPlayAnimationRequest,
    withStopAnimationRequest
} from './utils.js';

function getMovementAnimation(entity, store, direction) {
    switch (direction) {
        case DirectionValue.UP:
            return store.get(entity, 'movement-animation').up;
        case DirectionValue.DOWN:
            return store.get(entity, 'movement-animation').down;
        case DirectionValue.LEFT:
            return store.get(entity, 'movement-animation').left;
        case DirectionValue.RIGHT:
            return store.get(entity, 'movement-animation').right;
        default:
            return null;
    }
}

export default class MovementAnimationSystem extends System {

    #movementEntities;

    constructor(ecs) {
        super(ecs);

        this.#movementEntities = defineQuery([Changed(Velocity), Changed(Direction)]);
    }

    update() {

        const { world, store } = this.ecs;

        for (const entity of this.#movementEntities(world)) {
            const movementState = !!(Velocity.x[entity] || Velocity.y[entity]);

            if (movementState) {
                const animation = getMovementAnimation(entity, store, Direction.direction[entity]);
                if (animation) {
                    this.ecs.request(
                        withPlayAnimationRequest(entity),
                        withStore({ animation })
                    );
                }
            } else {
                this.ecs.request(
                    withStopAnimationRequest(entity)
                );
            }
        }
    }
}
