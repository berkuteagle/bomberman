import { defineQuery, defineSystem } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';
import { Bomb } from '../component/Bomb.js';

export const createBombSystem = () => {
    const query = defineQuery([Bomb]);

    return defineSystem(world => {

        const entries = query(world);

        return world;
    });
}
