import { Changed, defineQuery, defineSystem, enterQuery, exitQuery } from '../../bitecs.js';

import { Animation, ANIMATION_STATE } from '../animation.js';
import { Direction } from '../common.js';
import { Sprite } from '../sprite.js';

import { Movement } from './Movement.js';
import { MovementAnimation } from './MovementAnimation.js';
import { Velocity } from './Velocity.js';

export const createMovementSystem = () => {

    const allEntities = defineQuery([Velocity, Sprite]);
    const allChangedEntities = defineQuery([Changed(Velocity), Sprite]);
    const enterEntities = enterQuery(allEntities);
    const exitEntities = exitQuery(allEntities);

    return defineSystem(world => {

        for (const entity of enterEntities(world)) {
            world.scene.ecs.getSprite(entity)?.setVelocity(Velocity.x[entity], Velocity.y[entity]);
        }

        for (const entity of allChangedEntities(world)) {
            world.scene.ecs.getSprite(entity)?.setVelocity(Velocity.x[entity], Velocity.y[entity]);
        }

        for (const entity of exitEntities(world)) {
            world.scene.ecs.getSprite(entity)?.setVelocity(0, 0);
        }

    });
}

export const createMovementAnimationSystem = () => {

    const allEntities = defineQuery([Direction, Movement, MovementAnimation, Animation]);

    return defineSystem(world => {

        for (const entity of allEntities(world)) {
            Animation.key[entity] = MovementAnimation.keys[entity][Direction.current[entity]];
            Animation.state[entity] = Movement.state[entity] ? ANIMATION_STATE.PLAY : ANIMATION_STATE.STOP;
        }

    });
}
