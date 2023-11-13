import { defineQuery, defineSystem } from '../../bitecs.js';

import { Animation, ANIMATION_STATE } from '../animation.js';
import { Direction } from '../common.js';

import { Movement } from './Movement.js';
import { MovementAnimation } from './MovementAnimation.js';

export const createMovementAnimationSystem = () => {

    const allEntities = defineQuery([Direction, Movement, MovementAnimation, Animation]);

    return defineSystem(world => {

        for (const entity of allEntities(world)) {
            Animation.key[entity] = MovementAnimation.keys[entity][Direction.current[entity]];
            Animation.state[entity] = Movement.state[entity] ? ANIMATION_STATE.PLAY : ANIMATION_STATE.STOP;
        }

    });
}
