import { defineQuery, defineSystem, enterQuery, exitQuery, removeEntity } from '../../bitecs.js';

import { Belong, Duration, Explosive, Sapper } from '../component.js';
import { createExplosion } from '../entity.js';
import { createCollision } from '../phy.js';
import { Position } from '../position.js';

export const createBombSystem = () => {
    const entitiesAll = defineQuery([Explosive, Duration, Position, Belong]);
    const sappersAll = defineQuery([Sapper]);
    const entitiesEnter = enterQuery(entitiesAll);
    const entitiesExit = exitQuery(entitiesAll);

    const startTime = new Map();

    return defineSystem(world => {

        const time = world.scene.time;

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
                createCollision(
                    Belong.owner[entity],
                    createExplosion(world, Position.x[entity], Position.y[entity])
                )(world);
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
