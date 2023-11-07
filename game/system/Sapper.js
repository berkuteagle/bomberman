import { defineQuery, defineSystem } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';
import { Input } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';

import { Position, Sapper } from '../component.js';
import { createBomb } from '../entity.js';

export const createSapperSystem = (bombKey) => {
    const query = defineQuery([Sapper, Position]);

    return defineSystem(world => {

        if (Input.Keyboard.JustDown(bombKey)) {
            for (const entity of query(world)) {
                if (Sapper.count[entity]) {
                    const x = Math.round(Position.x[entity] / 16) * 16;
                    const y = Math.round(Position.y[entity] / 16) * 16;
                    createBomb(world, x, y, entity);
                }
            }
        }

        return world;
    });
}
