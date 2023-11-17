import { defineQuery, defineSystem } from '../../bitecs.js';
import { Input, Math } from '../../phaser.js';

import { Sapper } from '../component.js';
import { createBomb } from '../entity.js';
import { createCollision } from '../phy.js';
import { Position } from '../position.js';

export const createSapperSystem = (bombKey) => {
    const query = defineQuery([Sapper, Position]);

    return defineSystem(world => {

        if (Input.Keyboard.JustDown(bombKey)) {
            for (const entity of query(world)) {
                if (Sapper.count[entity]) {
                    createCollision(
                        world,
                        entity,
                        createBomb(
                            world,
                            Math.Snap.To(Position.x[entity], 16),
                            Math.Snap.To(Position.y[entity], 16),
                            entity,
                            world.scene
                        )
                    );
                }
            }
        }

        return world;
    });
}
