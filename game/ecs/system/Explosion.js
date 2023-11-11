import { defineQuery, defineSystem, enterQuery, exitQuery, removeEntity } from '../../bitecs.js';

import { Position } from '../common.js';
import { Duration, Explosion } from '../component.js';

export const createExplosionSystem = () => {
    const entitiesAll = defineQuery([Explosion, Position, Duration]);
    const entitiesEnter = enterQuery(entitiesAll);
    const entitiesExit = exitQuery(entitiesAll);

    const startTime = new Map();

    return defineSystem(world => {

        const time = world.scene.time;

        for (const entity of entitiesEnter(world)) {
            startTime.set(entity, time.now);
        }

        for (const entity of entitiesAll(world)) {
            if (Duration.timeout[entity] < (time.now - startTime.get(entity))) {
                removeEntity(world, entity);
            }
        }

        for (const entity of entitiesExit(world)) {
            startTime.delete(entity);
        }

        return world;
    });
}
