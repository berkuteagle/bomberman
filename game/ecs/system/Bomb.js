import { defineQuery, defineSystem, enterQuery, exitQuery, removeEntity } from '../../bitecs.js';

import { Position } from '../common.js';
import { Belong, Duration, Explosive, Sapper } from '../component.js';
import { createExplosion } from '../entity.js';

export const createBombSystem = (time) => {
    const entitiesAll = defineQuery([Explosive, Duration, Position, Belong]);
    const sappersAll = defineQuery([Sapper]);
    const entitiesEnter = enterQuery(entitiesAll);
    const entitiesExit = exitQuery(entitiesAll);

    const startTime = new Map();

    return defineSystem(world => {

        for (const entity of entitiesEnter(world)) {
            startTime.set(entity, time.now);
            for (const sapper of sappersAll(world)) {
                if (sapper === Belong.owner[entity]) {
                    Sapper.count[sapper]--;
                }
            }
        }

        for (const entity of entitiesAll(world)) {
            if (Duration.timeout[entity] < (time.now - startTime.get(entity))) {
                removeEntity(world, entity);
                createExplosion(world, Position.x[entity], Position.y[entity]);
            }
        }

        for (const entity of entitiesExit(world)) {
            startTime.delete(entity);
            for (const sapper of sappersAll(world)) {
                if (sapper === Belong.owner[entity]) {
                    Sapper.count[sapper]++;
                }
            }
        }

        return world;
    });
}
