import { defineQuery, defineSystem, enterQuery, exitQuery } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';

import { Explosion, Position } from '../component.js';

export const createExplosionSystem = () => {
    const entitiesAll = defineQuery([Explosion, Position]);
    const entitiesEnter = enterQuery(entitiesAll);
    const entitiesExit = exitQuery(entitiesAll);

    return defineSystem(world => {

        for (const entity of entitiesEnter(world)) {
            console.log('Explosion add: ', entity);
        }

        for (const entity of entitiesAll(world)) {
            console.log('Explosion process: ', entity);
        }

        for (const entity of entitiesExit(world)) {
            console.log('Explosion remove: ', entity);
        }

        return world;
    });
}
