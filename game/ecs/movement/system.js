import { Changed, defineQuery, defineSystem } from '../../bitecs.js';

import { ANIMATION_STATE, sendAnimationRequest } from '../animation.js';
import { Direction } from '../common.js';

import { Movement } from './Movement.js';
import { MovementAnimation } from './MovementAnimation.js';

export const createMovementAnimationSystem = () => {

    const allEntities = defineQuery([Changed(Direction), Movement, MovementAnimation]);

    return defineSystem(world => {

        for (const entity of allEntities(world)) {

            sendAnimationRequest(
                world,
                MovementAnimation.keys[entity][Direction.current[entity]],
                Movement.state[entity] ? ANIMATION_STATE.PLAY : ANIMATION_STATE.STOP,
                entity
            );

        }

    });
}
