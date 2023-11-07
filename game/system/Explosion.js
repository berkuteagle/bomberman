import { defineQuery, defineSystem, enterQuery, exitQuery, removeEntity } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import { Duration, Explosion, Position } from '../component.js';

export const createExplosionSystem = (time) => {
    const entitiesAll = defineQuery([Explosion, Position, Duration]);
    const entitiesEnter = enterQuery(entitiesAll);
    const entitiesExit = exitQuery(entitiesAll);

    const startTime = new Map();

    return defineSystem(world => {

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
