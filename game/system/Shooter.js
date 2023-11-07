import { defineQuery, defineSystem } from 'https://cdn.jsdelivr.net/npm/bitecs/+esm';
import { Input } from 'https://cdn.jsdelivr.net/npm/phaser/+esm';

import { Position, Shooter } from '../component.js';
import { createBomb } from '../entity.js';

export const createShooterSystem = (shotKey) => {
    const query = defineQuery([Shooter, Position]);

    return defineSystem(world => {

        if (Input.Keyboard.JustDown(shotKey)) {
            for (const entity of query(world)) {
                const x = Math.round(Position.x[entity] / 16) * 16;
                const y = Math.round(Position.y[entity] / 16) * 16;
                createBomb(world, x, y);
            }
        }

        return world;
    });
}
